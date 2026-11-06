import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'outlet', path: '/outlet' },
  { name: 'medici', path: '/medici' },
];
const PORT = 4173;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;
const LH_BIN = path.join(ROOT, 'node_modules', '.bin', 'lighthouse');

let activeServer = null;
let activeChild = null;
let heartbeatTimer = null;
let currentTaskDesc = 'initializing';
const scriptStartTime = Date.now();

function cleanupAll() {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  if (activeChild) {
    try {
      activeChild.kill('SIGKILL');
    } catch {
      // ignore
    }
    activeChild = null;
  }
  if (activeServer) {
    try {
      activeServer.kill('SIGKILL');
    } catch {
      // ignore
    }
    activeServer = null;
  }
  try {
    execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore' });
  } catch {
    // ignore
  }
}

process.on('SIGINT', () => {
  console.error('\n[SIGINT] Cleaning up Lighthouse and server...');
  cleanupAll();
  process.exit(130);
});

process.on('SIGTERM', () => {
  console.error('\n[SIGTERM] Cleaning up Lighthouse and server...');
  cleanupAll();
  process.exit(143);
});

// Rule 3: Global 8-minute watchdog for Lighthouse script
const GLOBAL_WATCHDOG_MS = 8 * 60 * 1000;
const watchdog = setTimeout(() => {
  console.error(
    `\n[WATCHDOG] Lighthouse script exceeded ${GLOBAL_WATCHDOG_MS / 1000}s limit (stuck on: ${currentTaskDesc}). Killing all processes.`
  );
  cleanupAll();
  process.exit(1);
}, GLOBAL_WATCHDOG_MS);
watchdog.unref();

// Rule 1: Progress line at least every 25 seconds
heartbeatTimer = setInterval(() => {
  const elapsed = ((Date.now() - scriptStartTime) / 1000).toFixed(1);
  console.log(`[heartbeat ${elapsed}s] Running: ${currentTaskDesc}`);
}, 25000);
heartbeatTimer.unref();

function killPortAndStaleProcesses() {
  try {
    execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`, { stdio: 'ignore' });
    execSync(`pkill -9 -f "vite preview" 2>/dev/null || true`, { stdio: 'ignore' });
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

function runSingleLighthouse(url, outPath, chromePath, tag) {
  const SINGLE_RUN_TIMEOUT_MS = 150 * 1000; // 150s hard kill
  return new Promise((resolve, reject) => {
    const args = [
      url,
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage',
      '--max-wait-for-load=45000',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      `--output-path=${outPath}`,
    ];

    const child = spawn(LH_BIN, args, {
      cwd: ROOT,
      env: {
        ...process.env,
        CI: '1',
        CHROME_PATH: chromePath,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    activeChild = child;

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    const timer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {
        // ignore
      }
      activeChild = null;
      reject(new Error(`Timeout after ${SINGLE_RUN_TIMEOUT_MS / 1000}s on ${tag}`));
    }, SINGLE_RUN_TIMEOUT_MS);

    child.on('error', (err) => {
      clearTimeout(timer);
      activeChild = null;
      reject(err);
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      activeChild = null;
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Lighthouse exited with code ${code}: ${stderr.slice(-400)}`));
      }
    });
  });
}

async function runLighthouseSuite(label = 'before') {
  const outDir = path.join(ROOT, 'screenshots', label);
  await fs.mkdir(outDir, { recursive: true });

  killPortAndStaleProcesses();

  const chromePath = chromium.executablePath();
  console.log(`Using Chromium executable: ${chromePath}`);

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

  const summary = [];

  try {
    await waitForServer(BASE_URL, 20000);
    console.log('Preview server ready. Running Lighthouse mobile audits...');

    for (let i = 0; i < PAGES.length; i++) {
      const pg = PAGES[i];
      const tag = `[${i + 1}/${PAGES.length}] Lighthouse ${pg.path}`;
      currentTaskDesc = tag;
      const url = `${BASE_URL}${pg.path}`;
      const jsonPath = path.join(outDir, `lighthouse-${pg.name}.json`);
      const itemStart = Date.now();

      let parsed = null;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`${tag} (attempt ${attempt}) starting...`);
          await runSingleLighthouse(url, jsonPath, chromePath, tag);
          const raw = await fs.readFile(jsonPath, 'utf8');
          const lhr = JSON.parse(raw);

          const scores = {
            performance: Math.round((lhr.categories?.performance?.score ?? 0) * 100),
            accessibility: Math.round((lhr.categories?.accessibility?.score ?? 0) * 100),
            bestPractices: Math.round((lhr.categories?.['best-practices']?.score ?? 0) * 100),
            seo: Math.round((lhr.categories?.seo?.score ?? 0) * 100),
          };
          const metrics = {
            LCP_ms: Math.round(lhr.audits?.['largest-contentful-paint']?.numericValue ?? 0),
            LCP_display: lhr.audits?.['largest-contentful-paint']?.displayValue ?? 'N/A',
            CLS: Number((lhr.audits?.['cumulative-layout-shift']?.numericValue ?? 0).toFixed(4)),
            TBT_ms: Math.round(lhr.audits?.['total-blocking-time']?.numericValue ?? 0),
            totalByteWeight_bytes: Math.round(lhr.audits?.['total-byte-weight']?.numericValue ?? 0),
            totalByteWeight_KiB: Math.round((lhr.audits?.['total-byte-weight']?.numericValue ?? 0) / 1024),
          };

          parsed = { page: pg.path, name: pg.name, status: 'ok', scores, metrics };
          const elapsed = ((Date.now() - itemStart) / 1000).toFixed(1);
          console.log(
            `${tag} — ${elapsed}s | Perf=${scores.performance} A11y=${scores.accessibility} BP=${scores.bestPractices} SEO=${scores.seo} | LCP=${metrics.LCP_display} CLS=${metrics.CLS} TBT=${metrics.TBT_ms}ms Bytes=${metrics.totalByteWeight_KiB}KiB`
          );
          break;
        } catch (err) {
          console.warn(`${tag} attempt ${attempt} failed: ${err?.message || err}`);
          if (attempt === 1) {
            console.log(`${tag} retrying once...`);
          }
        }
      }

      if (parsed) {
        summary.push(parsed);
      } else {
        console.error(`${tag} SKIPPED after 2 failed attempts.`);
        summary.push({ page: pg.path, name: pg.name, status: 'skipped' });
      }
    }

    const summaryPath = path.join(outDir, 'lighthouse-summary.json');
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`Saved Lighthouse summary to ${path.relative(ROOT, summaryPath)}`);
  } finally {
    cleanupAll();
  }
}

const label = process.argv[2] || 'before';
runLighthouseSuite(label)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    cleanupAll();
    process.exit(1);
  });
