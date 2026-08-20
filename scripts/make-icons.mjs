// Renders the SVG favicon to the raster sizes browsers and iOS still need.
// Run with: node scripts/make-icons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg');

const targets = [
  { file: 'public/favicon-32.png', size: 32 },
  { file: 'public/favicon-192.png', size: 192 },
  { file: 'public/favicon-512.png', size: 512 },
  // iOS ignores transparency and squares the corners itself.
  { file: 'public/apple-touch-icon.png', size: 180 },
];

for (const { file, size } of targets) {
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(file, buf);
  console.log(`${file}  ${size}x${size}  ${buf.length}B`);
}
