import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([len, typeAndData, crc]);
}

function createPng(width, height, drawFn) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // Deflate
  ihdr.writeUInt8(0, 11); // Filter 0
  ihdr.writeUInt8(0, 12); // Interlace 0

  const ihdrChunk = writeChunk('IHDR', ihdr);

  // Raw image data: height rows, each starting with filter byte 0, followed by width * 4 bytes
  const rowLen = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowLen);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter byte: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = writeChunk('IDAT', compressedData);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Draw sacred IBD icon: Dark cosmic background (#080705), golden lotus ring, radiant center
function drawSacredIcon(x, y, width, height, isMaskable = false) {
  const cx = width / 2;
  const cy = height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const maxR = width / 2;

  // Maskable keeps graphic within central 75% safe area
  const scale = isMaskable ? 0.72 : 0.88;
  const outerR = maxR * scale;
  const innerR = outerR * 0.86;
  const ringR = outerR * 0.65;
  const coreR = outerR * 0.45;

  // Background: Rich sacred midnight obsidian (#080705)
  let r = 8;
  let g = 7;
  let b = 5;
  let a = 255;

  // Soft ambient golden aura in center
  const aura = Math.max(0, 1 - dist / (outerR * 1.15));
  if (aura > 0) {
    r = Math.min(255, Math.round(r + aura * 55));
    g = Math.min(255, Math.round(g + aura * 35));
    b = Math.min(255, Math.round(b + aura * 8));
  }

  // Outer Golden Ring
  if (dist <= outerR && dist >= innerR) {
    const ringT = (dist - innerR) / (outerR - innerR);
    // Gold gradient (#F59E0B / #D97706 / #FCD34D)
    r = Math.round(217 + ringT * 38);
    g = Math.round(150 + ringT * 50);
    b = Math.round(40 + ringT * 40);
  }

  // Concentric Sacred Geometry Ring
  if (Math.abs(dist - ringR) <= width * 0.015) {
    r = 254;
    g = 215;
    b = 80;
  }

  // Sacred Radiating Rays (8 directions)
  const angle = Math.atan2(dy, dx);
  const rayAngle = ((angle + Math.PI) / (Math.PI / 4)) % 1;
  if (dist < outerR && dist > coreR && Math.abs(rayAngle - 0.5) < 0.08) {
    const rayStrength = (1 - (dist - coreR) / (outerR - coreR)) * 0.7;
    r = Math.min(255, Math.round(r + rayStrength * 180));
    g = Math.min(255, Math.round(g + rayStrength * 130));
    b = Math.min(255, Math.round(b + rayStrength * 20));
  }

  // Central Sacred Medallion / Disc
  if (dist <= coreR) {
    const coreGrad = 1 - dist / coreR;
    // Deep temple vermilion-amber center with gold rim
    r = Math.round(180 * (1 - coreGrad) + 245 * coreGrad);
    g = Math.round(80 * (1 - coreGrad) + 160 * coreGrad);
    b = Math.round(20 * (1 - coreGrad) + 30 * coreGrad);

    // Golden Core Point (Bindu)
    if (dist <= coreR * 0.28) {
      const binduGrad = 1 - dist / (coreR * 0.28);
      r = Math.min(255, Math.round(250 + binduGrad * 5));
      g = Math.min(255, Math.round(220 + binduGrad * 35));
      b = Math.min(255, Math.round(110 + binduGrad * 120));
    }
  }

  // Rounded outer boundary for non-maskable icon
  if (!isMaskable && dist > maxR - 1) {
    a = 0; // Transparent outside square bounds if any
  }

  return [r, g, b, a];
}

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate icon.svg
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#451a03" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#1c1917" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#080705" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="25%" stop-color="#f59e0b"/>
      <stop offset="60%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <filter id="divineGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="512" height="512" rx="100" fill="url(#bgGlow)"/>
  <!-- Outer Sacred Border -->
  <circle cx="256" cy="256" r="210" fill="none" stroke="url(#goldGrad)" stroke-width="4" opacity="0.6"/>
  <circle cx="256" cy="256" r="198" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="8 6" opacity="0.8"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="url(#goldGrad)" stroke-width="3" opacity="0.9"/>
  <!-- Radiating Sacred Rays -->
  <g stroke="url(#goldGrad)" stroke-width="2" opacity="0.5">
    <line x1="256" y1="60" x2="256" y2="90"/>
    <line x1="256" y1="422" x2="256" y2="452"/>
    <line x1="60" y1="256" x2="90" y2="256"/>
    <line x1="422" y1="256" x2="452" y2="256"/>
    <line x1="118" y1="118" x2="140" y2="140"/>
    <line x1="372" y1="372" x2="394" y2="394"/>
    <line x1="118" y1="394" x2="140" y2="372"/>
    <line x1="372" y1="140" x2="394" y2="118"/>
  </g>
  <!-- Center Sacred Trishul & Om Emblem -->
  <g filter="url(#divineGlow)" fill="url(#goldGrad)">
    <!-- Trishul prongs -->
    <path d="M 256 120 L 256 360" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
    <path d="M 256 110 L 244 145 L 268 145 Z"/>
    <path d="M 220 180 C 220 250 256 260 256 260 C 256 260 292 250 292 180" fill="none" stroke="url(#goldGrad)" stroke-width="9" stroke-linecap="round"/>
    <path d="M 220 170 L 210 195 L 230 195 Z"/>
    <path d="M 292 170 L 282 195 L 302 195 Z"/>
    <!-- Damru motif -->
    <polygon points="236,290 276,290 244,320 268,320" fill="url(#goldGrad)"/>
    <!-- Central Lotus Base -->
    <path d="M 180 370 Q 256 420 332 370 Q 256 395 180 370 Z" fill="url(#goldGrad)"/>
  </g>
  <!-- Text Label -->
  <text x="256" y="445" text-anchor="middle" font-family="'Cinzel', serif" font-weight="bold" font-size="28" fill="#fcd34d" letter-spacing="4">IBD STUDIO</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');
console.log('Created public/icon.svg');

// 2. Generate PNGs
console.log('Generating PNG icons...');

const pwa192 = createPng(192, 192, (x, y, w, h) => drawSacredIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pwa192);
console.log('Created public/pwa-192x192.png');

const pwa512 = createPng(512, 512, (x, y, w, h) => drawSacredIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pwa512);
console.log('Created public/pwa-512x512.png');

const pwaMaskable = createPng(512, 512, (x, y, w, h) => drawSacredIcon(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pwaMaskable);
console.log('Created public/pwa-maskable-512x512.png');

const appleTouchIcon = createPng(180, 180, (x, y, w, h) => drawSacredIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);
console.log('Created public/apple-touch-icon.png');

// Copy pwa-192 to favicon.ico fallback
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pwa192);
console.log('Created public/favicon.ico');

console.log('All PWA assets successfully generated!');
