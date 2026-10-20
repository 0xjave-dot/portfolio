/**
 * Optimise the recon screenshots into the WebP set the site ships.
 *
 * Source: a folder of `<slug>/{hero,full,mobile}.png` captures.
 * Output: public/projects/<slug>/{hero,full,mobile}.webp  + docs/image-manifest.json
 *
 * Usage:
 *   node scripts/optimise-images.mjs                 # SOURCE defaults to ../recon/shots/out
 *   SOURCE=C:/path/to/out node scripts/optimise-images.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile, stat, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE = process.env.SOURCE || path.resolve(ROOT, '../recon/shots/out');
const OUT = path.resolve(ROOT, 'public/projects');

const SLUGS = ['zanori', 'apreeltree', 'fitables', 'dudja', 'gic'];

/** Colour probe points, as fractions of the hero screenshot, per project. */
const PROBES = {
  zanori: {
    surface: [0.5, 0.045],
    accent: [0.856, 0.043],
    page: [0.02, 0.16],
    ink: [0.09, 0.043],
  },
  apreeltree: {
    surface: [0.5, 0.017],
    accent: [0.163, 0.716],
    page: [0.5, 0.29],
    ink: [0.75, 0.5],
  },
  fitables: {
    surface: [0.5, 0.06],
    accent: [0.163, 0.636],
    page: [0.99, 0.2],
    ink: [0.03, 0.25],
  },
  dudja: {
    surface: [0.02, 0.5],
    accent: [0.21, 0.836],
    page: [0.5, 0.02],
    ink: [0.9, 0.9],
  },
  // Kingdom Comms admin — light shell, indigo sidebar, purple actions.
  gic: {
    surface: [0.5, 0.02],
    accent: [0.0437, 0.041],
    page: [0.72, 0.3],
    ink: [0.16, 0.108],
  },
};

const toHex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

async function probe(file, points) {
  const img = sharp(file);
  const meta = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const out = {};
  for (const [name, [fx, fy]] of Object.entries(points)) {
    const x = Math.min(info.width - 1, Math.round(fx * info.width));
    const y = Math.min(info.height - 1, Math.round(fy * info.height));
    // average a 5px box so we don't land on an anti-aliased edge
    let r = 0;
    let g = 0;
    let b = 0;
    let n = 0;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        const px = Math.min(info.width - 1, Math.max(0, x + dx));
        const py = Math.min(info.height - 1, Math.max(0, y + dy));
        const i = (py * info.width + px) * info.channels;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        n++;
      }
    }
    out[name] = toHex(r / n, g / n, b / n);
  }
  out._src = `${meta.width}x${meta.height}`;
  return out;
}

await mkdir(OUT, { recursive: true });

// Merge into the existing manifest so a partial re-capture (one slug only)
// never wipes the entries for the projects it did not touch.
const MANIFEST_PATH = path.join(ROOT, 'docs/image-manifest.json');
const manifest = {};
try {
  const previous = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  for (const [slug, entry] of Object.entries(previous)) manifest[slug] = entry;
} catch {
  // No previous manifest — start from scratch.
}

for (const slug of SLUGS) {
  const src = path.join(SOURCE, slug);
  const dest = path.join(OUT, slug);

  // Nothing captured for this slug yet: keep whatever the manifest already
  // says and leave the shipped WebP files alone.
  if (!existsSync(path.join(src, 'hero.png'))) {
    console.log(`skip ${slug} — no capture at ${src}`);
    continue;
  }

  await mkdir(dest, { recursive: true });

  const jobs = [
    { name: 'hero', width: 1440, height: 900, fit: 'inside' },
    { name: 'full', width: 1200, height: 11000, fit: 'inside' },
    { name: 'mobile', width: 780, height: 4000, fit: 'inside' },
  ];

  const entry = { slug, images: {} };
  for (const job of jobs) {
    const input = path.join(src, `${job.name}.png`);
    const output = path.join(dest, `${job.name}.webp`);
    try {
      const info = await sharp(input)
        .resize({ width: job.width, height: job.height, fit: job.fit, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6, smartSubsample: true })
        .toFile(output);
      const bytes = (await stat(output)).size;
      entry.images[job.name] = { width: info.width, height: info.height, bytes };
      console.log(`${slug}/${job.name}.webp  ${info.width}x${info.height}  ${Math.round(bytes / 1024)}KB`);
    } catch (error) {
      console.error(`FAILED ${slug}/${job.name}: ${error.message}`);
      entry.images[job.name] = null;
    }
  }

  try {
    entry.probe = await probe(path.join(src, 'hero.png'), PROBES[slug]);
    console.log(`${slug} probe`, entry.probe);
  } catch (error) {
    console.error(`probe failed for ${slug}: ${error.message}`);
  }

  manifest[slug] = entry;
}

await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log('\nmanifest ->', path.join('docs', 'image-manifest.json'));
