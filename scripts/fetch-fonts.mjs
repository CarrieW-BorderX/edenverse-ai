#!/usr/bin/env node
/**
 * Fetches Satoshi (woff2) from Fontshare and places the four weights we use
 * into public/fonts/satoshi/. Re-run is idempotent — skips existing files.
 *
 * Usage: `npm run build:fonts`
 *
 * Strategy: Fontshare's CSS endpoint at /v2/css?f[]=satoshi@<weights> returns
 * an @font-face stylesheet with direct woff2 URLs. We parse it and download
 * each weight.
 */
import { createWriteStream, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "fonts", "satoshi");

const WEIGHTS = [
  { weight: 300, filename: "Satoshi-Light.woff2" },
  { weight: 400, filename: "Satoshi-Regular.woff2" },
  { weight: 500, filename: "Satoshi-Medium.woff2" },
  { weight: 700, filename: "Satoshi-Bold.woff2" },
];

const CSS_URL = `https://api.fontshare.com/v2/css?f%5B%5D=satoshi@${WEIGHTS.map((w) => w.weight).join(",")}&display=swap`;

async function getCss() {
  const res = await fetch(CSS_URL, {
    headers: {
      // Pretend to be a normal browser so Fontshare returns woff2 (not legacy)
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`Fontshare CSS fetch failed: ${res.status}`);
  return res.text();
}

function parseWoff2Urls(css) {
  // Fontshare returns protocol-relative URLs with multiple formats in one
  // src: list. Extract the first woff2 url within each @font-face block and
  // normalise the protocol.
  const faceRe = /@font-face\s*{[\s\S]*?}/g;
  const weightRe = /font-weight:\s*(\d+)/;
  const urlRe = /url\(['"]?(\/\/[^'"\)]+\.woff2)['"]?\)/;
  const out = new Map();
  for (const block of css.match(faceRe) ?? []) {
    const weight = Number(block.match(weightRe)?.[1]);
    const rawUrl = block.match(urlRe)?.[1];
    if (weight && rawUrl && !out.has(weight)) {
      out.set(weight, `https:${rawUrl}`);
    }
  }
  return out;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`Fetch ${url} failed: ${res.status} ${res.statusText}`);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const targets = WEIGHTS.filter((w) => !existsSync(path.join(OUT_DIR, w.filename)));
  if (targets.length === 0) {
    console.log("All Satoshi weights already present. Nothing to do.");
    return;
  }

  console.log(`Fetching Fontshare CSS for ${targets.length} weight(s)…`);
  const css = await getCss();
  const urlsByWeight = parseWoff2Urls(css);

  let wrote = 0;
  for (const { weight, filename } of targets) {
    const url = urlsByWeight.get(weight);
    if (!url) throw new Error(`No woff2 URL found for weight ${weight} in Fontshare CSS`);
    const dest = path.join(OUT_DIR, filename);
    console.log(`  download ${filename}`);
    await download(url, dest);
    wrote++;
  }
  console.log(`Done. ${wrote} file(s) written to public/fonts/satoshi/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
