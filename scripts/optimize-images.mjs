import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'src/assets');
const BACKUP_DIR = path.join(ROOT, 'src/assets_backup/pre-optimize-seo');
const PUBLIC_DIR = path.join(ROOT, 'public');

// Global 3-minute watchdog so image/video optimization can never hang
const watchdog = setTimeout(() => {
  console.error('[WATCHDOG] optimize-images.mjs timed out after 180s');
  process.exit(1);
}, 180000);
watchdog.unref();

const JOBS = [
  {
    src: 'PozaBuna.jpg',
    dest: 'PozaBuna.webp',
    maxWidth: 1920,
    quality: 65,
    responsiveWidths: [640, 960, 1280],
    responsiveQuality: 65,
  },
  {
    src: 'outlet-exterior.jpg',
    dest: 'outlet-exterior.webp',
    maxWidth: 1920,
    quality: 80,
    responsiveWidths: [640, 960, 1280],
    responsiveQuality: 75,
  },
  {
    src: 'outlet-interior.jpg',
    dest: 'outlet-interior.webp',
    maxWidth: 1440,
    quality: 80,
    responsiveWidths: [640, 960, 1280],
    responsiveQuality: 75,
  },
  {
    src: 'A-53.jpg',
    dest: 'A-53.webp',
    maxWidth: 1200,
    quality: 80,
    responsiveWidths: [640, 960],
    responsiveQuality: 78,
  },
  {
    src: 'oferta-lunii-nikon.jpg',
    dest: 'oferta-lunii-nikon.webp',
    maxWidth: 1200,
    quality: 82,
    responsiveWidths: [640, 960],
    responsiveQuality: 80,
  },
  {
    src: 'doctors/doctor-placeholder.jpg',
    dest: 'doctors/doctor-placeholder.webp',
    maxWidth: 600,
    quality: 82,
  },
];

const VIDEO_JOBS = [
  {
    src: 'Video_Atelier_Card_Dreapta.mp4',
    dest: 'Video_Atelier_Card_Dreapta-mobile.mp4',
    scale: 'scale=-2:720',
  },
  {
    src: 'Video_Atelier.mp4',
    dest: 'Video_Atelier-mobile.mp4',
    scale: 'scale=720:-2',
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

  // Create public/og-image.jpg (1200x630, under 300 KB) from PozaBuna.jpg if needed
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
  console.log(`Verified public/og-image.jpg (1200x630): ${await formatKB(ogStat.size)}`);

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

    // Only regenerate the base desktop WebP if it does not already exist so desktop bytes remain 100% identical
    let hasBaseDest = true;
    try {
      await fs.access(destPath);
    } catch {
      hasBaseDest = false;
    }

    if (!hasBaseDest) {
      await sharp(srcPath)
        .resize({ width: job.maxWidth, withoutEnlargement: true })
        .webp({ quality: job.quality })
        .toFile(destPath);
    }

    // Generate responsive WebP variants (640w, 960w, 1280w)
    if (job.responsiveWidths && job.responsiveWidths.length > 0) {
      const parsed = path.parse(destPath);
      for (const w of job.responsiveWidths) {
        const variantPath = path.join(parsed.dir, `${parsed.name}-${w}w.webp`);
        await sharp(srcPath)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: job.responsiveQuality || job.quality })
          .toFile(variantPath);
        const vStat = await fs.stat(variantPath);
        const vMeta = await sharp(variantPath).metadata();
        console.log(
          `  -> ${path.relative(ASSETS_DIR, variantPath)} (${vMeta.width}x${vMeta.height}, ${await formatKB(vStat.size)})`
        );
      }
    }

    if (hasAssetSrc) {
      await fs.unlink(assetSrcPath);
    }
  }

  // Generate lighter 720p mobile MP4 variants via ffmpeg if available
  for (const vJob of VIDEO_JOBS) {
    const srcVideo = path.join(ASSETS_DIR, vJob.src);
    const destVideo = path.join(ASSETS_DIR, vJob.dest);
    try {
      execFileSync(
        'ffmpeg',
        [
          '-y',
          '-i',
          srcVideo,
          '-vf',
          vJob.scale,
          '-c:v',
          'libx264',
          '-preset',
          'fast',
          '-crf',
          '30',
          '-pix_fmt',
          'yuv420p',
          '-movflags',
          '+faststart',
          '-an',
          destVideo,
        ],
        { stdio: 'ignore', timeout: 60000 }
      );
      const beforeStat = await fs.stat(srcVideo);
      const afterStat = await fs.stat(destVideo);
      console.log(
        `Video ${vJob.src} (${await formatKB(beforeStat.size)}) -> ${vJob.dest} (${await formatKB(afterStat.size)})`
      );
    } catch (err) {
      console.warn(`Skipping mobile video ${vJob.dest}: ${err?.message || err}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
