// Generates Joflor's favicon set from one source design.
// Run: node scripts/gen-icons.mjs
// Outputs: src/app/icon.svg, src/app/favicon.ico, src/app/apple-icon.png
//
// The mark echoes the Joflor logo: a metallic-gold badge with a black "J".
// Brand gold tokens (joflor.css): #B5830D #D29A15 #E8C26A #A1770C #F2E7C9.
// Ink: #121D16 (--inkt). Sheen band uses a light gold for the metal look.

import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, "src", "app");

const INK = "#121D16";

// Diagonal metallic-gold gradient with a bright sheen band through the middle.
const goldGradient = (id) => `
    <linearGradient id="${id}" x1="0" y1="0" x2="0.82" y2="1">
      <stop offset="0"    stop-color="#A1770C"/>
      <stop offset="0.37" stop-color="#D29A15"/>
      <stop offset="0.50" stop-color="#F5E1A6"/>
      <stop offset="0.63" stop-color="#E8C26A"/>
      <stop offset="1"    stop-color="#9C7209"/>
    </linearGradient>`;

// The "J": bold, slightly italic, round terminals + a top serif bar.
// Authored as strokes (font-independent) so it rasterizes identically everywhere.
const J = `
    <g transform="translate(5,0) skewX(-8)" fill="none" stroke="${INK}"
       stroke-linecap="round" stroke-linejoin="round">
      <path d="M37 18 L37 39 Q37 47 28.5 47 Q20 47 19 38.5" stroke-width="7"/>
      <path d="M28.5 18 L45.5 18" stroke-width="4.5"/>
    </g>`;

// Tab/browser favicon: a gold badge (transparent corners).
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Joflor">
  <defs>${goldGradient("g")}</defs>
  <circle cx="32" cy="32" r="31" fill="url(#g)"/>
  ${J}
</svg>
`;

// iOS home-screen icon: full-bleed gold (iOS applies its own rounded mask).
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>${goldGradient("g")}</defs>
  <rect width="64" height="64" fill="url(#g)"/>
  ${J}
</svg>
`;

const png = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size, { fit: "fill" }).png().toBuffer();

// Build a single .ico containing PNG-encoded entries at the given sizes.
function buildIco(buffers, sizes) {
  const count = buffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0); // width
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buffers[i].length, 8); // data size
    e.writeUInt32LE(offset, 12); // data offset
    offset += buffers[i].length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...buffers]);
}

// --- write outputs ---
writeFileSync(join(APP, "icon.svg"), iconSvg);

const icoSizes = [16, 32, 48];
const icoBufs = await Promise.all(icoSizes.map((s) => png(iconSvg, s)));
writeFileSync(join(APP, "favicon.ico"), buildIco(icoBufs, icoSizes));

await sharp(Buffer.from(appleSvg))
  .resize(180, 180, { fit: "fill" })
  .png()
  .toFile(join(APP, "apple-icon.png"));

// --- previews for visual review (not committed) ---
if (process.env.PREVIEW) {
  for (const s of [16, 32, 64, 180]) {
    await sharp(Buffer.from(iconSvg)).resize(s, s).png().toFile(`/tmp/jf-icon-${s}.png`);
  }
  await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(`/tmp/jf-apple.png`);
  // a strip showing 16 and 32 scaled up so detail is visible
  const up = (b) => sharp(b).resize(160, 160, { kernel: "nearest" }).png().toBuffer();
  const s16 = await up(await png(iconSvg, 16));
  const s32 = await up(await png(iconSvg, 32));
  await sharp({ create: { width: 340, height: 160, channels: 4, background: "#ffffff" } })
    .composite([{ input: s16, left: 0, top: 0 }, { input: s32, left: 180, top: 0 }])
    .png()
    .toFile("/tmp/jf-strip.png");
}

console.log("icons written to src/app/{icon.svg,favicon.ico,apple-icon.png}");
