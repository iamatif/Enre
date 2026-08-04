import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcRoot = path.join(root, 'assets', 'gallery');
const outRoot = path.join(srcRoot, 'optimized');

const categories = [
  { dir: 'Exteriors', slug: 'exterior' },
  { dir: 'Apartment', slug: 'apartment' },
  { dir: 'Club House', slug: 'club-house' },
  { dir: 'Gym', slug: 'gym' },
  { dir: 'Lobby', slug: 'lobby' },
];

const EXT = /\.(jpe?g|png|tiff?|webp)$/i;
const WIDTH = 800;
const QUALITY = 78;

async function main() {
  for (const { dir, slug } of categories) {
    const srcDir = path.join(srcRoot, dir);
    const outDir = path.join(outRoot, slug);
    if (!fs.existsSync(srcDir)) {
      console.warn(`Skipping missing dir: ${srcDir}`);
      continue;
    }
    fs.mkdirSync(outDir, { recursive: true });
    const files = fs
      .readdirSync(srcDir)
      .filter((f) => EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    console.log(`\n[${dir}] -> optimized/${slug} (${files.length} files)`);
    for (let i = 0; i < files.length; i++) {
      const src = path.join(srcDir, files[i]);
      const out = path.join(outDir, `${String(i + 1).padStart(2, '0')}.webp`);
      try {
        const buf = await sharp(src)
          .rotate()
          .resize({ width: WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 5 })
          .toBuffer();
        fs.writeFileSync(out, buf);
        console.log(`  ok ${files[i]} -> ${path.relative(root, out)} (${(buf.length / 1024).toFixed(0)} KB)`);
      } catch (err) {
        console.error(`  FAIL ${files[i]}: ${err.message}`);
      }
    }
  }
}

main();
