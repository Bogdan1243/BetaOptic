import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

async function prerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  const template = await fs.readFile(indexHtmlPath, 'utf8');

  const serverEntryPath = path.join(SSR_DIR, 'entry-server.js');
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  const appHtml = render();
  const renderedHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  await fs.writeFile(indexHtmlPath, renderedHtml, 'utf8');
  await fs.rm(SSR_DIR, { recursive: true, force: true });
  console.log('Prerendered dist/index.html successfully.');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
