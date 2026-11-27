#!/usr/bin/env node
/**
 * Generates the replaceable SAMPLE illustrations in public/images/samples/.
 *
 * These are stylised architectural renders, not photographs of completed
 * Velluto Interiors projects. Replace them with real project photography by
 * dropping new files into public/images/ and updating src/data/*.ts.
 *
 *   npm run images
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'samples');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;
// back wall rectangle (one-point perspective)
const BW = { x1: 400, y1: 230, x2: 1200, y2: 700 };

const palettes = {
  noir: { ceil: '#1a1917', wallA: '#232220', wallB: '#2b2a27', back: '#2f2d29', floorA: '#3a3026', floorB: '#251f19', cab: '#1b1b1a', cabLine: '#3b3936', top: '#e9e3d8', splash: '#d9d2c4', metal: '#c2a46c', glow: '#f6d9a1', island: '#1f1e1c' },
  ivory: { ceil: '#e8e2d7', wallA: '#d8d0c2', wallB: '#e0d9cc', back: '#ebe5da', floorA: '#9b7b5a', floorB: '#6f5640', cab: '#efe9de', cabLine: '#cfc6b6', top: '#f7f4ee', splash: '#e4ddd0', metal: '#b08f57', glow: '#fff1cf', island: '#5a4535' },
  sage: { ceil: '#dcd8cf', wallA: '#c9c5ba', wallB: '#d3cfc4', back: '#e2ded4', floorA: '#8c7358', floorB: '#5e4c3a', cab: '#6f7a68', cabLine: '#59634f', top: '#f1ede6', splash: '#e8e3da', metal: '#b89a64', glow: '#fff0cc', island: '#6f7a68' },
  walnut: { ceil: '#2a2622', wallA: '#3a342e', wallB: '#433c35', back: '#4a423a', floorA: '#3a2f25', floorB: '#211a14', cab: '#6b4a31', cabLine: '#4e3522', top: '#ece6dc', splash: '#2c2a27', metal: '#cfae72', glow: '#ffd99a', island: '#2a2826' },
  dated: { ceil: '#e9e4d6', wallA: '#d9cfae', wallB: '#e0d7b9', back: '#e6ddc0', floorA: '#c9bba0', floorB: '#b3a385', cab: '#b98d5a', cabLine: '#94693d', top: '#d8c9a3', splash: '#efe8d2', metal: '#9a9a9a', glow: '#f4f6f8', island: '#b98d5a' },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function room(p, { dated = false } = {}) {
  const { x1, y1, x2, y2 } = BW;
  let s = `
  <defs>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.floorA}"/><stop offset="1" stop-color="${p.floorB}"/></linearGradient>
    <linearGradient id="lwall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${p.wallA}"/><stop offset="1" stop-color="${p.wallB}"/></linearGradient>
    <linearGradient id="rwall" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${p.wallA}"/><stop offset="1" stop-color="${p.wallB}"/></linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${p.glow}" stop-opacity="0.9"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${dated ? 0.12 : 0.45}"/></radialGradient>
    <clipPath id="floorclip"><polygon points="0,${H} ${x1},${y2} ${x2},${y2} ${W},${H}"/></clipPath>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.glow}" stop-opacity="${dated ? 0 : 0.18}"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${p.back}"/>
  <polygon points="0,0 ${W},0 ${x2},${y1} ${x1},${y1}" fill="${p.ceil}"/>
  <polygon points="0,0 ${x1},${y1} ${x1},${y2} 0,${H}" fill="url(#lwall)"/>
  <polygon points="${W},0 ${x2},${y1} ${x2},${y2} ${W},${H}" fill="url(#rwall)"/>
  <polygon points="0,${H} ${x1},${y2} ${x2},${y2} ${W},${H}" fill="url(#floor)"/>
  <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" fill="${p.back}"/>`;
  // floor planks converging to vanishing point
  s += '<g clip-path="url(#floorclip)">';
  const vx = 800;
  const vy = 465;
  for (let i = -12; i <= 12; i++) {
    const fx = vx + i * 140;
    const bx = vx + ((fx - vx) * (y2 - vy)) / (H - vy);
    s += `<line x1="${bx}" y1="${y2}" x2="${fx}" y2="${H}" stroke="#000" stroke-opacity="0.12" stroke-width="1.5"/>`;
  }
  s += '</g>';
  return s;
}

function kitchen(p, opts = {}) {
  const { x1, y1, x2, y2 } = BW;
  const dated = !!opts.dated;
  let s = room(p, opts);
  // ceiling light
  if (dated) {
    s += `<polygon points="700,60 900,60 880,110 720,110" fill="#f7f9fb" stroke="#ccc"/>`;
  } else {
    for (let i = 0; i < 5; i++) s += `<circle cx="${560 + i * 120}" cy="${120 + (i % 2) * 6}" r="7" fill="${p.glow}"/>`;
  }
  // upper cabinets
  const uTop = y1 + 20;
  const uBot = y1 + (dated ? 170 : 190);
  const doors = dated ? 8 : 6;
  const hoodW = dated ? 0 : 150;
  const span = x2 - x1 - 40 - hoodW;
  const dw = span / doors;
  let x = x1 + 20;
  for (let i = 0; i < doors; i++) {
    if (!dated && i === doors / 2) {
      // range hood
      s += `<polygon points="${x + 10},${uTop} ${x + hoodW - 10},${uTop} ${x + hoodW + 10},${uBot + 40} ${x - 10},${uBot + 40}" fill="${p.metal}" opacity="0.85"/>`;
      s += `<rect x="${x - 14}" y="${uBot + 40}" width="${hoodW + 28}" height="10" fill="${p.metal}"/>`;
      x += hoodW;
    }
    s += `<rect x="${x + 3}" y="${uTop}" width="${dw - 6}" height="${uBot - uTop}" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="2"/>`;
    if (dated) {
      s += `<path d="M${x + 14} ${uBot - 10} V${uTop + 30} Q${x + dw / 2} ${uTop + 6} ${x + dw - 14} ${uTop + 30} V${uBot - 10} Z" fill="none" stroke="${p.cabLine}" stroke-width="2"/>`;
      s += `<circle cx="${x + dw - 16}" cy="${uBot - 22}" r="4" fill="#777"/>`;
    } else {
      s += `<rect x="${x + 14}" y="${uTop + 12}" width="${dw - 28}" height="${uBot - uTop - 24}" fill="none" stroke="${p.cabLine}" stroke-width="1.5"/>`;
      s += `<rect x="${x + dw - 16}" y="${uBot - 70}" width="3" height="46" fill="${p.metal}"/>`;
    }
    x += dw;
  }
  // backsplash
  const cTop = y2 - 150;
  s += `<rect x="${x1}" y="${uBot}" width="${x2 - x1}" height="${cTop - uBot}" fill="${p.splash}"/>`;
  if (!dated) {
    for (let yy = uBot + 14; yy < cTop; yy += 14) s += `<line x1="${x1}" y1="${yy}" x2="${x2}" y2="${yy}" stroke="#000" stroke-opacity="0.05"/>`;
    s += `<rect x="${x1}" y="${uBot}" width="${x2 - x1}" height="${cTop - uBot}" fill="url(#wash)"/>`;
  } else {
    for (let yy = uBot; yy < cTop; yy += 36) for (let xx = x1; xx + 36 <= x2; xx += 36) s += `<rect x="${xx}" y="${yy}" width="36" height="36" fill="none" stroke="#cfc4a2"/>`;
  }
  // counter + lower cabinets
  s += `<rect x="${x1}" y="${cTop}" width="${x2 - x1}" height="14" fill="${p.top}"/>`;
  const lDoors = dated ? 8 : 5;
  const lw = (x2 - x1) / lDoors;
  for (let i = 0; i < lDoors; i++) {
    const lx = x1 + i * lw;
    s += `<rect x="${lx + 2}" y="${cTop + 16}" width="${lw - 4}" height="${y2 - cTop - 26}" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="2"/>`;
    if (!dated) {
      s += `<line x1="${lx + 2}" y1="${cTop + 70}" x2="${lx + lw - 2}" y2="${cTop + 70}" stroke="${p.cabLine}" stroke-width="2"/>`;
      s += `<rect x="${lx + lw / 2 - 30}" y="${cTop + 36}" width="60" height="3" fill="${p.metal}"/>`;
    } else {
      s += `<circle cx="${lx + lw / 2}" cy="${cTop + 50}" r="4" fill="#777"/>`;
    }
  }
  if (!dated) {
    // island
    const iy = 760;
    s += `<polygon points="470,${iy - 34} 1130,${iy - 34} 1170,${iy} 430,${iy}" fill="${p.top}"/>`;
    s += `<rect x="430" y="${iy}" width="740" height="14" fill="${p.top}" opacity="0.9"/>`;
    s += `<rect x="440" y="${iy + 14}" width="720" height="150" fill="${p.island}"/>`;
    for (let i = 1; i < 6; i++) s += `<line x1="${440 + i * 120}" y1="${iy + 14}" x2="${440 + i * 120}" y2="${iy + 164}" stroke="#000" stroke-opacity="0.25" stroke-width="2"/>`;
    s += `<rect x="440" y="${iy + 160}" width="720" height="6" fill="#000" opacity="0.35"/>`;
    // pendants
    for (const px of [600, 800, 1000]) {
      s += `<line x1="${px}" y1="0" x2="${px}" y2="470" stroke="${p.metal}" stroke-width="1.5"/>`;
      s += `<ellipse cx="${px}" cy="520" rx="140" ry="110" fill="url(#glow)" opacity="0.55"/>`;
      s += `<path d="M${px - 44} 512 Q${px} 452 ${px + 44} 512 Z" fill="${p.metal}"/>`;
      s += `<ellipse cx="${px}" cy="513" rx="40" ry="6" fill="${p.glow}"/>`;
    }
    // stools
    for (const sx of [560, 720, 880, 1040]) {
      s += `<rect x="${sx - 26}" y="${iy + 60}" width="52" height="10" rx="5" fill="${p.metal}" opacity="0.9"/>`;
      s += `<line x1="${sx - 18}" y1="${iy + 70}" x2="${sx - 26}" y2="${iy + 200}" stroke="${p.metal}" stroke-width="3"/>`;
      s += `<line x1="${sx + 18}" y1="${iy + 70}" x2="${sx + 26}" y2="${iy + 200}" stroke="${p.metal}" stroke-width="3"/>`;
    }
  } else {
    s += `<rect x="560" y="790" width="480" height="20" fill="${p.top}"/><rect x="580" y="810" width="440" height="130" fill="${p.cab}" stroke="${p.cabLine}"/>`;
  }
  // tall pantry column on right wall
  if (!dated) {
    s += `<polygon points="1230,200 1340,140 1340,860 1230,740" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="2"/>`;
    s += `<line x1="1285" y1="170" x2="1285" y2="800" stroke="${p.cabLine}" stroke-width="2"/>`;
  }
  return s;
}

function bath(p) {
  const { x1, y1, x2, y2 } = BW;
  let s = room(p);
  // stone slab wall
  s += `<rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" fill="${p.splash}"/>`;
  s += `<path d="M${x1} ${y1 + 120} C 600 ${y1 + 60}, 760 ${y1 + 260}, ${x2} ${y1 + 180}" stroke="#000" stroke-opacity="0.07" stroke-width="3" fill="none"/>`;
  s += `<path d="M${x1} ${y1 + 330} C 700 ${y1 + 280}, 900 ${y1 + 420}, ${x2} ${y1 + 360}" stroke="#000" stroke-opacity="0.06" stroke-width="2" fill="none"/>`;
  // mirrors with glow
  for (const mx of [560, 840]) {
    s += `<ellipse cx="${mx + 100}" cy="360" rx="190" ry="150" fill="url(#glow)" opacity="0.4"/>`;
    s += `<rect x="${mx}" y="270" width="200" height="200" rx="100" fill="${p.back}" stroke="${p.metal}" stroke-width="4"/>`;
  }
  // floating vanity
  s += `<rect x="480" y="540" width="640" height="16" fill="${p.top}"/>`;
  s += `<rect x="490" y="556" width="620" height="90" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="2"/>`;
  s += `<line x1="800" y1="556" x2="800" y2="646" stroke="${p.cabLine}" stroke-width="2"/>`;
  for (const fx of [660, 940]) s += `<path d="M${fx} 540 V512 H${fx + 26}" stroke="${p.metal}" stroke-width="5" fill="none"/>`;
  // freestanding tub
  s += `<path d="M200 790 Q200 720 300 720 H700 Q790 720 790 790 Q780 880 680 890 H320 Q210 880 200 790 Z" fill="${p.top}" stroke="#000" stroke-opacity="0.12" stroke-width="2"/>`;
  s += `<ellipse cx="495" cy="738" rx="270" ry="14" fill="#000" opacity="0.08"/>`;
  s += `<path d="M820 900 V680 Q820 650 790 650" stroke="${p.metal}" stroke-width="5" fill="none"/>`;
  // glass shower right
  s += `<polygon points="1210,230 1420,110 1420,900 1210,710" fill="#ffffff" opacity="0.08" stroke="${p.metal}" stroke-width="2"/>`;
  return s;
}

function closet(p) {
  const { x1, y1, x2, y2 } = BW;
  let s = room(p);
  const cols = 5;
  const cw = (x2 - x1) / cols;
  for (let i = 0; i < cols; i++) {
    const cx = x1 + i * cw;
    s += `<rect x="${cx + 4}" y="${y1 + 10}" width="${cw - 8}" height="${y2 - y1 - 20}" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="2"/>`;
    s += `<rect x="${cx + 14}" y="${y1 + 20}" width="${cw - 28}" height="${y2 - y1 - 40}" fill="url(#wash)"/>`;
    if (i % 2 === 0) {
      s += `<line x1="${cx + 14}" y1="${y1 + 60}" x2="${cx + cw - 14}" y2="${y1 + 60}" stroke="${p.metal}" stroke-width="4"/>`;
      for (let h = 0; h < 6; h++) s += `<rect x="${cx + 22 + h * ((cw - 44) / 6)}" y="${y1 + 64}" width="${(cw - 44) / 6 - 6}" height="${160 + (h % 3) * 30}" fill="${['#3d3a35', '#8a7a66', '#d8d0c4', '#5a4b3c'][h % 4]}" opacity="0.85"/>`;
    } else {
      for (let sh = 0; sh < 6; sh++) {
        const sy = y1 + 50 + sh * 70;
        s += `<rect x="${cx + 12}" y="${sy}" width="${cw - 24}" height="5" fill="${p.metal}" opacity="0.8"/>`;
        s += `<rect x="${cx + 30}" y="${sy - 30}" width="${cw / 3}" height="30" fill="${['#2d2b28', '#7d6a52', '#c9bfae'][sh % 3]}"/>`;
      }
    }
  }
  // central island with drawers
  s += `<rect x="560" y="740" width="480" height="18" fill="${p.top}"/>`;
  s += `<rect x="570" y="758" width="460" height="150" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="2"/>`;
  for (let d = 1; d < 4; d++) s += `<line x1="570" y1="${758 + d * 37}" x2="1030" y2="${758 + d * 37}" stroke="${p.cabLine}" stroke-width="2"/>`;
  for (let d = 0; d < 4; d++) s += `<rect x="770" y="${770 + d * 37}" width="60" height="3" fill="${p.metal}"/>`;
  s += `<ellipse cx="800" cy="120" rx="120" ry="18" fill="${p.glow}" opacity="0.8"/>`;
  return s;
}

function living(p) {
  const { x1, y1, x2, y2 } = BW;
  let s = room(p);
  // large window
  s += `<rect x="${x1 + 60}" y="${y1 + 30}" width="${x2 - x1 - 120}" height="${y2 - y1 - 60}" fill="#c9d3d6"/>`;
  s += `<rect x="${x1 + 60}" y="${y1 + 30}" width="${x2 - x1 - 120}" height="${(y2 - y1 - 60) * 0.55}" fill="#e7ecec"/>`;
  s += `<rect x="${x1 + 60}" y="${y1 + 30 + (y2 - y1 - 60) * 0.55}" width="${x2 - x1 - 120}" height="40" fill="#7f9ea8"/>`;
  for (let i = 1; i < 4; i++) s += `<line x1="${x1 + 60 + i * ((x2 - x1 - 120) / 4)}" y1="${y1 + 30}" x2="${x1 + 60 + i * ((x2 - x1 - 120) / 4)}" y2="${y2 - 30}" stroke="${p.cab}" stroke-width="8"/>`;
  // sofa
  s += `<rect x="440" y="720" width="720" height="120" rx="20" fill="${p.top}"/>`;
  s += `<rect x="420" y="660" width="760" height="90" rx="24" fill="${p.splash}"/>`;
  s += `<rect x="560" y="870" width="480" height="18" fill="${p.metal}"/>`;
  s += `<rect x="580" y="888" width="440" height="60" fill="${p.island}"/>`;
  return s;
}

function plan(p) {
  // architectural floor plan drawing
  let s = `<rect width="${W}" height="${H}" fill="${p.ceil}"/>`;
  const g = p.metal;
  for (let x = 0; x < W; x += 40) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${g}" stroke-opacity="0.06"/>`;
  for (let y = 0; y < H; y += 40) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${g}" stroke-opacity="0.06"/>`;
  s += `<rect x="240" y="160" width="1120" height="680" fill="none" stroke="${p.top}" stroke-width="10"/>`;
  s += `<rect x="260" y="180" width="1080" height="90" fill="none" stroke="${g}" stroke-width="2"/>`;
  for (let i = 1; i < 12; i++) s += `<line x1="${260 + i * 90}" y1="180" x2="${260 + i * 90}" y2="270" stroke="${g}" stroke-width="1"/>`;
  s += `<rect x="260" y="270" width="90" height="420" fill="none" stroke="${g}" stroke-width="2"/>`;
  s += `<rect x="560" y="440" width="480" height="160" fill="none" stroke="${p.top}" stroke-width="3"/>`;
  for (let i = 0; i < 4; i++) s += `<circle cx="${620 + i * 120}" cy="640" r="18" fill="none" stroke="${g}" stroke-width="2"/>`;
  s += `<path d="M1200 840 A120 120 0 0 1 1320 720" fill="none" stroke="${g}" stroke-width="2"/>`;
  s += `<line x1="240" y1="900" x2="1360" y2="900" stroke="${g}" stroke-width="1.5"/>`;
  s += `<line x1="240" y1="888" x2="240" y2="912" stroke="${g}" stroke-width="1.5"/><line x1="1360" y1="888" x2="1360" y2="912" stroke="${g}" stroke-width="1.5"/>`;
  s += `<text x="800" y="890" fill="${g}" font-family="Georgia, serif" font-size="22" text-anchor="middle" letter-spacing="6">SPACE PLAN · SAMPLE</text>`;
  s += `<circle cx="800" cy="520" r="8" fill="${g}"/>`;
  return s;
}

function detail(p) {
  // cabinet door profile / joinery detail
  let s = `<rect width="${W}" height="${H}" fill="${p.back}"/>`;
  s += `<rect width="${W}" height="${H}" fill="url(#vg2)"/>`;
  s = `<defs><radialGradient id="vg2" cx="0.3" cy="0.3" r="0.9"><stop offset="0" stop-color="${p.glow}" stop-opacity="0.18"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/></radialGradient></defs>` + s;
  // stacked door fronts at angle
  for (let i = 0; i < 4; i++) {
    const ox = 260 + i * 260;
    const oy = 180 + i * 40;
    s += `<g transform="translate(${ox} ${oy}) skewY(-8)">`;
    s += `<rect width="360" height="620" fill="${p.cab}" stroke="${p.cabLine}" stroke-width="3"/>`;
    s += `<rect x="40" y="40" width="280" height="540" fill="none" stroke="${p.cabLine}" stroke-width="2"/>`;
    s += `<rect x="52" y="52" width="256" height="516" fill="none" stroke="${p.cabLine}" stroke-opacity="0.6"/>`;
    s += `<rect x="320" y="260" width="6" height="120" fill="${p.metal}"/>`;
    s += `</g>`;
  }
  return s;
}

function svg(body, label, { mark = true } = {}) {
  const tag = mark
    ? `<g opacity="0.75"><rect x="${W - 330}" y="${H - 58}" width="300" height="34" fill="#000" opacity="0.35"/><text x="${W - 180}" y="${H - 35}" fill="#f3eee4" font-family="Arial, sans-serif" font-size="14" letter-spacing="3" text-anchor="middle">SAMPLE ILLUSTRATION</text></g>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid slice">${body}<rect width="${W}" height="${H}" fill="url(#vignette)"/>${tag}</svg>\n`;
}

const images = {
  'hero-kitchen': [kitchen(palettes.noir), 'Sample illustration of a dark luxury kitchen with brass pendant lights over a stone island'],
  'kitchen-noir': [kitchen(palettes.noir), 'Sample illustration of a charcoal kitchen with brass hardware'],
  'kitchen-ivory': [kitchen(palettes.ivory), 'Sample illustration of an ivory kitchen with walnut island'],
  'kitchen-sage': [kitchen(palettes.sage), 'Sample illustration of a sage green kitchen with brass accents'],
  'kitchen-walnut': [kitchen(palettes.walnut), 'Sample illustration of a walnut kitchen with dark stone backsplash'],
  'before-kitchen': [kitchen(palettes.dated, { dated: true }), 'Sample illustration of a dated kitchen before renovation'],
  'bath-ivory': [bath(palettes.ivory), 'Sample illustration of an ivory stone bathroom with freestanding tub'],
  'bath-noir': [bath(palettes.noir), 'Sample illustration of a dark marble bathroom with brass fixtures'],
  'closet-walnut': [closet(palettes.walnut), 'Sample illustration of a walnut dressing room with island'],
  'closet-ivory': [closet(palettes.ivory), 'Sample illustration of an ivory custom closet with open shelving'],
  'interior-ivory': [living(palettes.ivory), 'Sample illustration of a renovated living space with large windows'],
  'space-plan': [plan(palettes.noir), 'Sample kitchen space plan drawing'],
  'craft-detail': [detail(palettes.walnut), 'Sample illustration of cabinet door profiles and brass pulls'],
};

for (const [name, [body, label]] of Object.entries(images)) {
  writeFileSync(join(OUT, `${name}.svg`), svg(body, label, { mark: name !== 'space-plan' }));
}
// Open Graph image (no watermark, logo lockup)
writeFileSync(
  join(OUT, '..', 'og-default.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#121212"/><rect x="40" y="40" width="1120" height="550" fill="none" stroke="#b89a64" stroke-opacity="0.5"/><text x="600" y="300" fill="#f3eee4" font-family="Georgia, serif" font-size="84" letter-spacing="18" text-anchor="middle">VELLUTO</text><text x="600" y="360" fill="#b89a64" font-family="Arial, sans-serif" font-size="22" letter-spacing="12" text-anchor="middle">INTERIORS · SOUTH FLORIDA</text></svg>\n`,
);
console.log(`Generated ${Object.keys(images).length} sample illustrations in ${OUT}`);
