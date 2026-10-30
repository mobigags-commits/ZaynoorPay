import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Simple minimal PNG encoder in pure JS
function createPng(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // CRC table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image scanlines: filter byte (0) + width * 4 bytes per row
  const rowLength = 1 + width * 4;
  const rawData = Buffer.alloc(rowLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.45;
  const innerRadius = width * 0.28;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Crimson gradient background with Gold Z symbol
      if (dist <= radius) {
        // Red Crimson with gradient
        const factor = 1 - (dist / radius) * 0.35;
        let pr = Math.min(255, Math.floor(r * factor));
        let pg = Math.min(255, Math.floor(g * factor));
        let pb = Math.min(255, Math.floor(b * factor));
        let pa = 255;

        // Draw Stylized Gold Z pattern in center
        const relX = (x - cx) / (innerRadius);
        const relY = (y - cy) / (innerRadius);
        
        // Z horizontal top bar
        const isTopBar = Math.abs(relY - (-0.5)) < 0.16 && relX >= -0.7 && relX <= 0.7;
        // Z horizontal bottom bar
        const isBottomBar = Math.abs(relY - (0.5)) < 0.16 && relX >= -0.7 && relX <= 0.7;
        // Z diagonal
        const isDiag = Math.abs((relX * 0.7) + (relY * 0.7)) < 0.15 && relY >= -0.5 && relY <= 0.5;

        if (isTopBar || isBottomBar || isDiag) {
          // Gold #D6B36A
          pr = 214;
          pg = 179;
          pb = 106;
        }

        rawData[pxOffset] = pr;
        rawData[pxOffset + 1] = pg;
        rawData[pxOffset + 2] = pb;
        rawData[pxOffset + 3] = pa;
      } else {
        // Outside circle: rounded corner squircle or transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PWA icons in #C8102E (200, 16, 46)
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 200, 16, 46));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 200, 16, 46));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 180, 12, 38));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 200, 16, 46));

console.log('Successfully generated PWA PNG icons in /public: 192x192, 512x512, maskable, apple-touch-icon');
