// One-off integrity sweep: parse every JS file in node_modules and report
// any that fail. Catches files left truncated by an interrupted npm install.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { transformSync } from 'esbuild';

const ROOT = 'node_modules';
const EXTS = new Set(['.js', '.mjs', '.cjs']);
const bad = [];
let checked = 0;

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (e.isFile() && EXTS.has(extname(e.name))) {
      let size;
      try {
        size = statSync(p).size;
      } catch {
        continue;
      }
      if (size === 0) continue;
      checked++;
      try {
        transformSync(readFileSync(p, 'utf8'), {
          loader: 'js',
          format: undefined,
          sourcefile: p,
        });
      } catch (err) {
        bad.push({ p, size, msg: (err.errors?.[0]?.text ?? err.message).slice(0, 90) });
      }
    }
  }
}

walk(ROOT);

console.log(`checked ${checked} files`);
console.log(`parse failures: ${bad.length}`);
for (const b of bad.slice(0, 40)) {
  console.log(`  ${b.p}  (${b.size}B)  ${b.msg}`);
}
