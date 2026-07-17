/**
 * Promise View Acres — brand asset generator.
 *
 * Produces, from the master emblem (src/app/icon.png):
 *   - src/app/opengraph-image.png  (1200x630 social card, all routes)
 *   - src/app/twitter-image.png    (same card, Twitter/X)
 *   - src/app/icon.png             (re-optimized 512x512 favicon)
 *   - src/app/apple-icon.png       (180x180 iOS home-screen icon)
 *   - public/icons/icon-192.png    (PWA manifest)
 *   - public/icons/icon-512.png    (PWA manifest)
 *   - public/icons/maskable-512.png(PWA maskable, cream safe-area)
 *   - src/app/favicon.ico          (multi-size .ico via png fallback)
 *
 * Re-run after the logo changes:  node scripts/generate-brand-assets.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(root, "src", "app");
const ICONS = join(root, "public", "icons");

// Brand palette (mirrors src/app/globals.css).
const CREAM = "#f2eadc";
const EARTH = "#6a5643";
const EVERGREEN = "#246b03";
const SAGE = "#72b030";

const MASTER = join(APP, "icon.png"); // full emblem: framed scene + wordmark

async function run() {
  await mkdir(ICONS, { recursive: true });

  // Master emblem trimmed of surrounding whitespace, then knock the white
  // background out to transparent so the line-art sits directly on cream.
  const trimmed = await sharp(MASTER)
    .trim({ threshold: 10 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = trimmed;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Near-white → fully transparent; light-gray edges → proportional alpha
    // so the ink strokes keep smooth anti-aliased edges on cream.
    const min = Math.min(r, g, b);
    if (min > 235) {
      data[i + 3] = 0;
    } else if (min > 180) {
      data[i + 3] = Math.round(((235 - min) / 55) * 255);
    }
  }
  const emblem = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer();

  // ---- Social card (1200x630) --------------------------------------------
  // Cream field, emblem centered, tagline + domain in brand type.
  const W = 1200;
  const H = 630;

  const emblemOnCard = await sharp(emblem)
    .resize({ height: 372, fit: "inside" })
    .toBuffer();
  const em = await sharp(emblemOnCard).metadata();

  const tagline = "Rooted in Faith. Growing in Stewardship.";
  const domain = "promiseviewacres.com";

  const textSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .tag { font-family: Georgia, 'Times New Roman', serif; font-style: italic;
                 font-size: 40px; fill: ${EARTH}; }
          .dom { font-family: Arial, Helvetica, sans-serif; font-weight: 700;
                 letter-spacing: 6px; font-size: 22px; fill: ${EVERGREEN};
                 text-transform: uppercase; }
        </style>
      </defs>
      <text x="${W / 2}" y="536" text-anchor="middle" class="tag">${tagline}</text>
      <text x="${W / 2}" y="592" text-anchor="middle" class="dom">${domain}</text>
      <rect x="${W / 2 - 60}" y="556" width="120" height="2" fill="${SAGE}" />
    </svg>`;

  const card = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: CREAM,
    },
  })
    .composite([
      {
        input: emblemOnCard,
        top: 70,
        left: Math.round((W - (em.width ?? 372)) / 2),
      },
      { input: Buffer.from(textSvg), top: 0, left: 0 },
    ])
    .png()
    .toBuffer();

  await writeFile(join(APP, "opengraph-image.png"), card);
  await writeFile(join(APP, "twitter-image.png"), card);

  // ---- Favicons / app icons ----------------------------------------------
  // Emblem on a cream square so the dark line-art stays legible in tabs.
  const toPng = async (size, safeScale = 0.86) => {
    const inner = await sharp(emblem)
      .resize({
        width: Math.round(size * safeScale),
        height: Math.round(size * safeScale),
        fit: "inside",
      })
      .toBuffer();
    return sharp({
      create: { width: size, height: size, channels: 4, background: CREAM },
    })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toBuffer();
  };

  await writeFile(join(APP, "icon.png"), await toPng(512));
  await writeFile(join(APP, "apple-icon.png"), await toPng(180));
  await writeFile(join(ICONS, "icon-192.png"), await toPng(192));
  await writeFile(join(ICONS, "icon-512.png"), await toPng(512));
  // Maskable: emblem smaller so it survives the platform mask crop.
  await writeFile(join(ICONS, "maskable-512.png"), await toPng(512, 0.62));
  // .ico fallback for legacy crawlers/Google — 48px is plenty.
  await writeFile(join(APP, "favicon.ico"), await toPng(48));

  console.log("✓ Brand assets generated:");
  console.log("  src/app/opengraph-image.png (1200x630)");
  console.log("  src/app/twitter-image.png (1200x630)");
  console.log("  src/app/icon.png (512), apple-icon.png (180), favicon.ico (48)");
  console.log("  public/icons/{icon-192,icon-512,maskable-512}.png");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
