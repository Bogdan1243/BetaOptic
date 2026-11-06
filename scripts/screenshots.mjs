import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const ROOT = process.cwd();
const WIDTHS = [360, 390, 414, 768, 1024, 1440, 1920];
const DESKTOP_DIFF_WIDTHS = [1024, 1440, 1920];
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'outlet', path: '/outlet' },
  { name: 'medici', path: '/medici' },
];
const PORT = 4173;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;

const MOBILE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Global state for clean shutdown
let activeServer = null;
let activeBrowser = null;
let heartbeatTimer = null;
let currentTaskDesc = 'initializing';
const scriptStartTime = Date.now();

function cleanupSync() {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  if (activeServer) {
    try {
      activeServer.kill('SIGKILL');
    } catch {
      // ignore
    }
    activeServer = null;
  }
}

async function cleanupAll() {
  cleanupSync();
  if (activeBrowser) {
    try {
      await Promise.race([
        activeBrowser.close(),
        new Promise((r) => setTimeout(r, 3000)),
      ]);
    } catch {
      // ignore
    }
    activeBrowser = null;
  }
  try {
    execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore' });
  } catch {
    // ignore
  }
}

process.on('SIGINT', async () => {
  console.error('\n[SIGINT] Shutting down server and browser...');
  await cleanupAll();
  process.exit(130);
});

process.on('SIGTERM', async () => {
  console.error('\n[SIGTERM] Shutting down server and browser...');
  await cleanupAll();
  process.exit(143);
});

// Rule 3: Global 6-minute watchdog for screenshots script
const GLOBAL_WATCHDOG_MS = 6 * 60 * 1000;
const watchdog = setTimeout(async () => {
  console.error(
    `\n[WATCHDOG] Screenshots script exceeded ${GLOBAL_WATCHDOG_MS / 1000}s limit (stuck on: ${currentTaskDesc}). Killing all processes.`
  );
  await cleanupAll();
  process.exit(1);
}, GLOBAL_WATCHDOG_MS);
watchdog.unref();

// Rule 1: Progress heartbeat at least every 25 seconds
heartbeatTimer = setInterval(() => {
  const elapsed = ((Date.now() - scriptStartTime) / 1000).toFixed(1);
  console.log(`[heartbeat ${elapsed}s] Running: ${currentTaskDesc}`);
}, 25000);
heartbeatTimer.unref();

function withTimeout(promise, ms, label) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms in ${label}`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

function killPortAndStaleProcesses() {
  try {
    execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore' });
    execSync(`pkill -9 -f "vite preview" 2>/dev/null || true`, { stdio: 'ignore' });
    execSync(`pkill -9 -f "ms-playwright/chromium" 2>/dev/null || true`, { stdio: 'ignore' });
  } catch {
    // ignore
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(t);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Preview server did not respond at ${url} within ${timeoutMs}ms`);
}

async function captureSingleItem(browser, outDir, pg, width, index, total) {
  const itemStart = Date.now();
  const isMobile = width <= 414;
  const height = isMobile ? 844 : width === 768 ? 1024 : 900;
  const tag = `[${index}/${total}] ${pg.path} @ ${width}px`;
  currentTaskDesc = tag;

  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
    isMobile,
    hasTouch: isMobile,
    userAgent: isMobile ? MOBILE_UA : undefined,
    deviceScaleFactor: 1,
  });

  try {
    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);

    // Block .mp4 in both before and after runs so videos never hang network or cause frame diffs
    await page.route('**/*.mp4', (route) => route.abort());

    // Replace Google Maps iframe with deterministic static placeholder so external network never hangs
    await page.route('https://www.google.com/maps/**', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body style="margin:0;background:#1E293B;display:flex;align-items:center;justify-content:center;color:#FAF8F5;font-family:sans-serif;font-size:14px;">Google Maps Embed</body></html>',
      })
    );

    const url = `${BASE_URL}${pg.path}`;
    // Step timeout: Page load 30s, waitUntil: 'load'
    await withTimeout(
      page.goto(url, { waitUntil: 'load', timeout: 30000 }),
      30000,
      `${tag} page.goto`
    );

    // Force eager loading on all images so lazy images load during scroll and stay loaded
    await withTimeout(
      page.evaluate(() => {
        for (const img of document.querySelectorAll('img')) {
          img.loading = 'eager';
        }
      }),
      5000,
      `${tag} eager-imgs`
    );

    // Scroll down in steps (~600px every 150ms) to trigger framer-motion whileInView animations
    await withTimeout(
      page.evaluate(async () => {
        const step = 600;
        const delay = 150;
        const maxSteps = 40;
        let currentY = 0;
        for (let i = 0; i < maxSteps; i++) {
          const maxScroll = document.documentElement.scrollHeight;
          currentY = Math.min(currentY + step, maxScroll);
          window.scrollTo(0, currentY);
          await new Promise((r) => setTimeout(r, delay));
          if (currentY >= maxScroll) break;
        }
      }),
      20000,
      `${tag} scroll-down`
    );

    // Wait 1s at bottom
    await page.waitForTimeout(1000);

    // Wait for fonts (10s timeout)
    await withTimeout(
      page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await Promise.race([
            document.fonts.ready,
            new Promise((r) => setTimeout(r, 9500)),
          ]);
        }
      }),
      10000,
      `${tag} fonts.ready`
    );

    // Wait for all <img> to be complete (10s timeout)
    await withTimeout(
      page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        await Promise.race([
          Promise.all(
            imgs.map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((res) => {
                img.addEventListener('load', res, { once: true });
                img.addEventListener('error', res, { once: true });
              });
            })
          ),
          new Promise((r) => setTimeout(r, 9500)),
        ]);
      }),
      10000,
      `${tag} images-complete`
    );

    // Scroll back to top and wait 500ms
    await withTimeout(
      page.evaluate(() => {
        window.scrollTo(0, 0);
      }),
      3000,
      `${tag} scroll-top`
    );
    await page.waitForTimeout(500);

    // Freeze any ongoing CSS animations/transitions right before capture for deterministic pixels
    await withTimeout(
      page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `,
      }),
      5000,
      `${tag} freeze-styles`
    );

    // Collect layout audit metrics while page is open
    const metrics = await withTimeout(
      page.evaluate((vw) => {
        const docScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const hasHorizontalOverflow = docScrollWidth > vw || bodyScrollWidth > vw;

        const overflowingElements = [];
        for (const el of document.querySelectorAll('*')) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue;
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
          if (rect.right > vw + 1.5 || rect.left < -1.5) {
            // Check if clipped by an ancestor with overflow-x: hidden/clip/auto/scroll
            let clipped = false;
            let parent = el.parentElement;
            while (parent && parent !== document.documentElement) {
              const ps = window.getComputedStyle(parent);
              if (['hidden', 'clip', 'auto', 'scroll'].includes(ps.overflowX)) {
                const pr = parent.getBoundingClientRect();
                if (pr.right <= vw + 1.5 && pr.left >= -1.5) {
                  clipped = true;
                  break;
                }
              }
              parent = parent.parentElement;
            }
            if (!clipped) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                className: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
                text: (el.innerText || '').trim().slice(0, 50),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              });
            }
          }
        }

        const smallTapTargets = [];
        if (vw <= 414) {
          for (const el of document.querySelectorAll('a, button, input, select, textarea, [role="button"]')) {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            if (rect.width === 0 || rect.height === 0 || style.display === 'none' || style.visibility === 'hidden') {
              continue;
            }
            if (rect.width < 44 || rect.height < 44) {
              smallTapTargets.push({
                tag: el.tagName.toLowerCase(),
                text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 40),
                className: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              });
            }
          }
        }

        return {
          viewportWidth: vw,
          docScrollWidth,
          bodyScrollWidth,
          hasHorizontalOverflow,
          overflowingElements: overflowingElements.slice(0, 20),
          smallTapTargets: smallTapTargets.slice(0, 30),
        };
      }, width),
      10000,
      `${tag} layout-metrics`
    );

    const filePath = path.join(outDir, `${pg.name}-${width}.png`);
    // Step timeout: one screenshot 45s
    await withTimeout(
      page.screenshot({ path: filePath, fullPage: true, timeout: 45000 }),
      45000,
      `${tag} page.screenshot`
    );

    const elapsed = ((Date.now() - itemStart) / 1000).toFixed(1);
    console.log(`${tag} — ${elapsed}s -> ${path.relative(ROOT, filePath)} (scrollW=${metrics.docScrollWidth})`);
    return { page: pg.path, name: pg.name, width, status: 'ok', metrics };
  } finally {
    await Promise.race([context.close(), new Promise((r) => setTimeout(r, 3000))]).catch(() => {});
  }
}

async function captureScreenshots(label = 'before') {
  const outDir = path.join(ROOT, 'screenshots', label);
  await fs.mkdir(outDir, { recursive: true });

  killPortAndStaleProcesses();

  currentTaskDesc = 'npm run build';
  console.log('Building project (non-interactive)...');
  execSync('CI=1 npm run build', { stdio: 'inherit', cwd: ROOT, timeout: 120000 });

  currentTaskDesc = 'starting vite preview';
  console.log(`Starting vite preview on ${BASE_URL}...`);
  activeServer = spawn(
    'npx',
    ['--yes', 'vite', 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'],
    {
      cwd: ROOT,
      stdio: 'ignore',
      env: { ...process.env, CI: '1' },
    }
  );

  const results = [];
  try {
    await waitForServer(BASE_URL, 20000);
    console.log('Preview server ready. Launching single Chromium instance...');
    activeBrowser = await withTimeout(
      chromium.launch({ headless: true }),
      30000,
      'chromium.launch'
    );

    const total = PAGES.length * WIDTHS.length;
    let index = 0;

    for (const pg of PAGES) {
      for (const width of WIDTHS) {
        index++;
        const tag = `[${index}/${total}] ${pg.path} @ ${width}px`;
        let success = false;
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const res = await captureSingleItem(activeBrowser, outDir, pg, width, index, total);
            results.push(res);
            success = true;
            break;
          } catch (err) {
            console.warn(
              `${tag} attempt ${attempt} failed: ${err?.message || err}`
            );
            if (attempt === 1) {
              console.log(`${tag} retrying once...`);
            }
          }
        }
        if (!success) {
          console.error(`${tag} SKIPPED after 2 failed attempts.`);
          results.push({ page: pg.path, name: pg.name, width, status: 'skipped' });
        }
      }
    }

    const metricsPath = path.join(outDir, 'layout-metrics.json');
    await fs.writeFile(metricsPath, JSON.stringify(results, null, 2));
    console.log(`Saved layout audit metrics to ${path.relative(ROOT, metricsPath)}`);
  } finally {
    await cleanupAll();
  }
}

async function compareDesktopScreenshots() {
  const beforeDir = path.join(ROOT, 'screenshots', 'before');
  const afterDir = path.join(ROOT, 'screenshots', 'after');
  const diffDir = path.join(ROOT, 'screenshots', 'diff');
  await fs.mkdir(diffDir, { recursive: true });

  console.log('\nComparing desktop screenshots (1024, 1440, 1920):');
  const report = [];

  for (const pg of PAGES) {
    for (const width of DESKTOP_DIFF_WIDTHS) {
      const fileName = `${pg.name}-${width}.png`;
      const beforePath = path.join(beforeDir, fileName);
      const afterPath = path.join(afterDir, fileName);

      const beforeBuf = await fs.readFile(beforePath);
      const afterBuf = await fs.readFile(afterPath);

      const img1 = PNG.sync.read(beforeBuf);
      const img2 = PNG.sync.read(afterBuf);

      if (img1.width !== img2.width || img1.height !== img2.height) {
        console.error(
          `[DIFF] ${fileName}: dimension mismatch (${img1.width}x${img1.height} vs ${img2.width}x${img2.height})`
        );
        report.push({
          page: pg.path,
          width,
          dimensionsBefore: `${img1.width}x${img1.height}`,
          dimensionsAfter: `${img2.width}x${img2.height}`,
          diffPixels: -1,
          pct: 'dimension-mismatch',
        });
        continue;
      }

      const diff = new PNG({ width: img1.width, height: img1.height });
      const diffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold: 0.1 }
      );
      const totalPixels = img1.width * img1.height;
      const pct = ((diffPixels / totalPixels) * 100).toFixed(4);

      if (diffPixels > 0) {
        await fs.writeFile(path.join(diffDir, `diff-${fileName}`), PNG.sync.write(diff));
      }

      console.log(
        `${pg.name.padEnd(8)} (${pg.path.padEnd(7)}) @ ${width}px (${img1.width}x${img1.height}): ${diffPixels} diff pixels (${pct}%)`
      );
      report.push({
        page: pg.path,
        width,
        dimensions: `${img1.width}x${img1.height}`,
        diffPixels,
        pct: `${pct}%`,
      });
    }
  }

  await fs.writeFile(path.join(diffDir, 'diff-report.json'), JSON.stringify(report, null, 2));
}

const mode = process.argv[2] || 'before';
if (mode === 'diff') {
  compareDesktopScreenshots()
    .then(() => process.exit(0))
    .catch(async (err) => {
      console.error(err);
      await cleanupAll();
      process.exit(1);
    });
} else {
  captureScreenshots(mode)
    .then(() => process.exit(0))
    .catch(async (err) => {
      console.error(err);
      await cleanupAll();
      process.exit(1);
    });
}
