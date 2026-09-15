// Renders the Open Graph / Twitter share card to public/og.png.
// Run with: node scripts/make-og.mjs
//
// Deliberately a committed static file rather than a build-time render: the
// card is typography, and the Vercel build image does not have the same fonts
// as this machine. Re-run it by hand if the hero line or the domain changes.
import sharp from 'sharp';

const W = 1200;
const H = 630; // the 1.91:1 that LinkedIn, X and Slack all crop to

// Dark-theme tokens, copied from global.css so the card and the site agree.
const BG = '#0D1116';
const ACCENT = '#F0A02E';
const INK = '#EDF1F5';
const INK2 = '#A9B4C0';

// Generic families only. librsvg resolves these against the system, and a
// missing family falls back silently to something unrelated.
const sans = 'Segoe UI, Helvetica, Arial, sans-serif';
const mono = 'Consolas, Courier New, monospace';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="18%" cy="12%" r="78%">
      <stop offset="0%" stop-color="#1C8288" stop-opacity=".55"/>
      <stop offset="55%" stop-color="#16537A" stop-opacity=".22"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="warm" cx="88%" cy="88%" r="60%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity=".20"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#warm)"/>

  <!-- The accent dot from the nav mark, so the card is recognisably the site. -->
  <circle cx="86" cy="92" r="9" fill="${ACCENT}"/>
  <circle cx="86" cy="92" r="20" fill="${ACCENT}" opacity=".18"/>
  <text x="122" y="101" font-family="${mono}" font-size="23" letter-spacing="5"
        fill="${INK2}">KOKIRALA VIDHYA SAGAR</text>

  <text x="86" y="266" font-family="${sans}" font-size="88" font-weight="700"
        letter-spacing="-3" fill="${INK}">I build agents that</text>
  <text x="86" y="368" font-family="${sans}" font-size="88" font-weight="700"
        letter-spacing="-3" fill="${ACCENT}">finish the work.</text>

  <rect x="86" y="430" width="132" height="3" fill="${ACCENT}" opacity=".85"/>

  <text x="86" y="494" font-family="${sans}" font-size="30" fill="${INK}">AI Engineer</text>
  <text x="86" y="544" font-family="${mono}" font-size="23" letter-spacing="1.5"
        fill="${INK2}">RAG · Multi-agent systems · LLM evaluation</text>

  <text x="${W - 86}" y="544" text-anchor="end" font-family="${mono}" font-size="21"
        letter-spacing="1" fill="${ACCENT}" opacity=".9">portfolio-vidhyasagar.vercel.app</text>
</svg>`;

const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
const { writeFileSync } = await import('node:fs');
writeFileSync('public/og.png', buf);
console.log(`public/og.png  ${W}x${H}  ${buf.length}B`);
