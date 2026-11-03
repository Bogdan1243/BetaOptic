import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'src/assets');
const BACKUP_DIR = path.join(ROOT, 'src/assets_backup/pre-optimize-seo');
const PUBLIC_DIR = path.join(ROOT, 'public');

const JOBS = [
  {
    src: 'PozaBuna.jpg',
    dest: 'PozaBuna.webp',
    maxWidth: 1920,
    quality: 65,
  },
  {
    src: 'outlet-exterior.jpg',
    dest: 'outlet-exterior.webp',
    maxWidth: 1920,
    quality: 80,
  },
  {
    src: 'outlet-interior.jpg',
    dest: 'outlet-interior.webp',
    maxWidth: 1440,
    quality: 80,
  },
  {
    src: 'A-53.jpg',
    dest: 'A-53.webp',
    maxWidth: 1200,
    quality: 80,
  },
  {
    src: 'oferta-lunii-nikon.jpg',
    dest: 'oferta-lunii-nikon.webp',
    maxWidth: 1200,
    quality: 82,
  },
  {
    src: 'doctors/doctor-placeholder.jpg',
    dest: 'doctors/doctor-placeholder.webp',
    maxWidth: 600,
    quality: 82,
  },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  await ensureDir(BACKUP_DIR);
  await ensureDir(path.join(BACKUP_DIR, 'doctors'));
  await ensureDir(PUBLIC_DIR);

  // Create public/og-image.jpg (1200x630, under 300 KB) from PozaBuna.jpg
  const ogSource = await fs
    .access(path.join(ASSETS_DIR, 'PozaBuna.jpg'))
    .then(() => path.join(ASSETS_DIR, 'PozaBuna.jpg'))
    .catch(() => path.join(BACKUP_DIR, 'PozaBuna.jpg'));
  const ogDest = path.join(PUBLIC_DIR, 'og-image.jpg');
  await sharp(ogSource)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(ogDest);
  const ogStat = await fs.stat(ogDest);
  console.log(`Created public/og-image.jpg (1200x630): ${await formatKB(ogStat.size)}`);

  for (const job of JOBS) {
    const assetSrcPath = path.join(ASSETS_DIR, job.src);
    const destPath = path.join(ASSETS_DIR, job.dest);
    const backupPath = path.join(BACKUP_DIR, job.src);

    let hasAssetSrc = true;
    try {
      await fs.access(assetSrcPath);
    } catch {
      hasAssetSrc = false;
    }

    if (hasAssetSrc) {
      await fs.copyFile(assetSrcPath, backupPath);
    }

    const srcPath = hasAssetSrc ? assetSrcPath : backupPath;
    const beforeStat = await fs.stat(srcPath);

    const image = sharp(srcPath);
    const meta = await image.metadata();
    await image
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(destPath);

    const afterStat = await fs.stat(destPath);
    const afterMeta = await sharp(destPath).metadata();
    console.log(
      `${job.src} (${meta.width}x${meta.height}, ${await formatKB(beforeStat.size)}) -> ${job.dest} (${afterMeta.width}x${afterMeta.height}, ${await formatKB(afterStat.size)})`
    );

    if (hasAssetSrc) {
      await fs.unlink(assetSrcPath);
    }
  }

  // Also move unused 8.5 MB PozaAfara.jpg out of src/assets into backup if present
  const unusedOriginal = path.join(ASSETS_DIR, 'PozaAfara.jpg');
  try {
    const stat = await fs.stat(unusedOriginal);
    await fs.rename(unusedOriginal, path.join(BACKUP_DIR, 'PozaAfara.jpg'));
    console.log(`Moved unused PozaAfara.jpg (${await formatKB(stat.size)}) to src/assets_backup/`);
  } catch {
    // ignore if already moved
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
