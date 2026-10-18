/**
 * Static brand assets:
 *   public/og-image.png      1200×630 social card (bird composited in)
 *   public/favicon.svg       + PNG sizes
 *   public/site.webmanifest
 *
 * Run with `npm run og`.
 */
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const PAPER = '#0A0A0B';
const INK = '#EDEAE3';
const ACCENT = '#C6FF3D';
const MUTED = '#8A8882';
const STAMP = '#FF5C2E';

const GRAIN = `
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0"/>
  </filter>
`;

const grid = (step, opacity, width, height) => {
  const lines = [];
  for (let x = step; x < width; x += step) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${INK}" stroke-opacity="${opacity}"/>`);
  }
  for (let y = step; y < height; y += step) {
    lines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="${INK}" stroke-opacity="${opacity}"/>`);
  }
  return lines.join('');
};

/* ------------------------------------------------------------------ OG card */
const ogBase = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="76%" cy="45%" r="42%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="70%" stop-color="${ACCENT}" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${grid(60, 0.035, 1200, 630)}
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- header -->
  <g fill="${INK}" font-family="Segoe UI, Arial, sans-serif">
    <text x="64" y="72" font-size="17" letter-spacing="5" fill="${MUTED}">SPECIMEN № 042</text>
    <text x="1136" y="72" font-size="13" letter-spacing="4" text-anchor="end" fill="${MUTED}">LAGOS, NIGERIA</text>
  </g>
  <line x1="64" y1="92" x2="1136" y2="92" stroke="${INK}" stroke-opacity="0.15"/>

  <!-- type -->
  <g font-family="Segoe UI, Arial, sans-serif" fill="${INK}">
    <text x="60" y="255" font-size="142" font-weight="800" letter-spacing="-8">RAVEN</text>
    <text x="60" y="368" font-size="142" font-weight="800" letter-spacing="-8" fill="none" stroke="${INK}" stroke-opacity="0.55" stroke-width="1.5">MAKES</text>
  </g>
  <text x="60" y="492" font-family="Georgia, serif" font-style="italic" font-size="146" letter-spacing="-6" fill="${ACCENT}">things.</text>

  <!-- footer -->
  <line x1="64" y1="536" x2="1136" y2="536" stroke="${INK}" stroke-opacity="0.15"/>
  <g font-family="Segoe UI, Arial, sans-serif">
    <text x="64" y="572" font-size="17" fill="${INK}">Websites · bots · games · scripts</text>
    <text x="64" y="600" font-size="12" letter-spacing="3" fill="${MUTED}">REACT · TYPESCRIPT · FIREBASE</text>
    <text x="1136" y="572" font-size="16" text-anchor="end" fill="${INK}">0xjave@gmail.com</text>
    <text x="1136" y="600" font-size="12" letter-spacing="3" text-anchor="end" fill="${MUTED}">6.5244° N, 3.3792° E</text>
  </g>
  <rect x="0" y="0" width="8" height="630" fill="${ACCENT}"/>
</svg>`;

const ogOverlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${GRAIN}</defs>
  <rect width="1200" height="630" filter="url(#grain)" opacity="0.05"/>
</svg>`;

await mkdir(PUBLIC, { recursive: true });

// The bird sits on the right, fading into the page.
const bird = await sharp(path.join(PUBLIC, 'bird/raven-portrait.webp'))
  .resize({ height: 520, fit: 'inside' })
  .grayscale()
  .linear(1.15, -8)
  .png()
  .toBuffer();
const birdMeta = await sharp(bird).metadata();

const card = await sharp(Buffer.from(ogBase))
  .composite([
    { input: bird, left: 1200 - (birdMeta.width ?? 500) - 40, top: 630 - (birdMeta.height ?? 480) - 74 },
    { input: Buffer.from(ogOverlay), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUBLIC, 'og-image.png'));

console.log(`og-image.png ${card.width}x${card.height}`);

/* ------------------------------------------------------------------ icons */
// The favicons are the original Raven mark, committed as static files in
// public/ (favicon.png, favicon-32x32.png, favicon-192.png, apple-touch-icon.png).
// Only the manifest is generated here so its colours stay in sync.

const manifest = {
  name: 'Raven — web developer',
  short_name: 'Raven',
  description: 'Websites, booking systems, catalogues and brand. Lagos, Nigeria.',
  start_url: '/',
  display: 'standalone',
  background_color: '#0A0A0B',
  theme_color: '#0A0A0B',
  icons: [
    { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
  ],
};
await writeFile(path.join(PUBLIC, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

// fail loudly if the artwork went missing
await readFile(path.join(PUBLIC, 'bird/raven-portrait.webp'));
console.log('assets → og-image.png, site.webmanifest');
