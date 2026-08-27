#!/usr/bin/env node
/**
 * gen-zs-ze-pdf.mjs — build the "Earth Fault Loop Impedance (Ze & Zs)" reference PDF.
 *
 * Why this exists
 * ---------------
 * GSC, 28 days to 24 Aug 2026 (GBR only): `/guides/maximum-zs-values-bs-7671` went from 22 to
 * 3,271 impressions in a month and earned 23 clicks — 0.7% CTR at position ~6. The query detail
 * says why, and what to do:
 *
 *     max zs values                             541 imp   9 clicks   pos 6.4
 *     max zs values 18th edition table pdf free  24 imp   1 click    pos 7.7
 *
 * It is a lookup query, and 167k of the site's 605k monthly impressions now sit behind Google's
 * generative-AI features — an AI Overview answers "max zs values" above the fold, so nobody
 * clicks through. A downloadable table is the one thing an AI Overview cannot be. Same play as
 * the symbols chart, which came from the identical signal ("iec 60617 electrical symbols pdf")
 * and is now the site's best-performing SEO page.
 *
 * 🔴 Every figure is READ FROM `src/data/zsLimits.ts`, never retyped.
 * That file is the same source the EICR schedule uses to judge a measured Zs, and it is covered
 * by `npm run check:eicr` (which asserts, among other things, that the BS 3871 values reconcile
 * exactly with the printed On-Site Guide Table B6). Retyping the numbers here would create a
 * second copy that could drift from the app — and this sheet is going on van walls.
 *
 * Layout lives in PDFMonkey (template `Elec-Mate — Zs & Ze Reference`), data is the payload, so
 * the design can be adjusted without a repo deploy.
 *
 * Usage:
 *   PDFMONKEY_API_KEY=... node scripts/seo-engine/gen-zs-ze-pdf.mjs [--template <id>] [--no-upload]
 *
 * Publishes to the public `lead-magnets` bucket, which is the served copy for both the page
 * download and the emailed attachment (see project_seo_impressions_vs_clicks_2026_08_23).
 */
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const API = 'https://api.pdfmonkey.io/api/v1';
const KEY = process.env.PDFMONKEY_API_KEY;
const arg = (f) => {
  const i = process.argv.indexOf(f);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const TEMPLATE_ID = arg('--template') || process.env.ZS_PDF_TEMPLATE_ID;
const FILENAME = 'elec-mate-zs-ze-reference.pdf';

if (!KEY) {
  console.error('Missing PDFMONKEY_API_KEY');
  process.exit(1);
}

/** Load the real tables out of the app, bundled so the TS resolves. */
async function loadZsLimits() {
  const tmp = mkdtempSync(join(tmpdir(), 'zs-pdf-'));
  const entry = join(tmp, 'entry.ts');
  writeFileSync(entry, `export * from '@/data/zsLimits';`);
  const out = join(tmp, 'bundle.mjs');
  await build({
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: out,
    logLevel: 'silent',
    absWorkingDir: ROOT,
    alias: { '@': './src' },
  });
  return import(pathToFileURL(out).href);
}

/** Union of every rating present across the given rate-maps, numerically sorted. */
const ratingsOf = (...maps) =>
  [...new Set(maps.flatMap((m) => Object.keys(m)))].map(Number).sort((a, b) => a - b);

/**
 * A row of values aligned to `ratings`, with a gap where the device has no
 * entry at that rating.
 *
 * 🔴 The gap MUST be `''`, never `null`. Liquid's `{% for %}` **skips nil
 * entries**, so a row padded with nulls renders short: BS 88-3 has 12 gaps and
 * printed only its first 6 cells, silently shifting nothing — the row just
 * stopped early under the wrong column headers. An empty string is iterated,
 * falsey to `{% if v %}`, and comes out as the intended em dash.
 */
const rowFor = (map, ratings) => ratings.map((r) => map[r] ?? '');

const m = await loadZsLimits();

// ── Circuit-breakers, Table 41.3 ────────────────────────────────────────────
const mcbRatings = ratingsOf(
  m.MCB_RCBO_ZS_LIMITS.typeB['0.4s'],
  m.MCB_RCBO_ZS_LIMITS.typeC['0.4s'],
  m.MCB_RCBO_ZS_LIMITS.typeD['0.4s']
);
const mcb_tables = [
  {
    caption: 'Maximum Zs (Ω) — BS EN 60898 / BS EN 61009, 230 V',
    ratings: mcbRatings,
    rows: [
      { label: 'Type B — 5×In', values: rowFor(m.MCB_RCBO_ZS_LIMITS.typeB['0.4s'], mcbRatings) },
      { label: 'Type C — 10×In', values: rowFor(m.MCB_RCBO_ZS_LIMITS.typeC['0.4s'], mcbRatings) },
      { label: 'Type D — 20×In (0.4 s)', values: rowFor(m.MCB_RCBO_ZS_LIMITS.typeD['0.4s'], mcbRatings) },
      { label: 'Type D — 10×In (5 s)', values: rowFor(m.MCB_RCBO_ZS_LIMITS.typeD['5s'], mcbRatings) },
    ],
  },
];

// ── Fuses, Tables 41.2 and 41.4 ─────────────────────────────────────────────
const FUSE_LABELS = {
  bs88_2: 'BS 88-2 / BS 88-6 (gG)',
  bs88_3: 'BS 88-3 (system C)',
  bs3036: 'BS 3036 (rewirable)',
  bs1362: 'BS 1362 (plug-top)',
};
/**
 * One compact block per fuse standard, carrying only the ratings that standard
 * is actually made in.
 *
 * The obvious layout — one wide table, columns = the union of every rating —
 * was tried and is unreadable on paper: the four standards overlap barely at
 * all, so BS 1362 showed two figures against sixteen em dashes. Nothing was
 * wrong with it; there was just no signal left in it.
 */
const fuseSection = (source, time, reg) => ({
  time,
  reg,
  standards: Object.entries(source).map(([k, map]) => ({
    label: FUSE_LABELS[k] ?? k,
    cols: Object.keys(map)
      .map(Number)
      .sort((a, b) => a - b)
      .map((r) => ({ r, v: map[r] })),
  })),
});
const fuse_sections = [
  fuseSection(m.FUSE_ZS_LIMITS_04S, '0.4 s', 'BS 7671 Table 41.2'),
  fuseSection(m.FUSE_ZS_LIMITS_5S, '5 s', 'BS 7671 Table 41.4'),
];

// ── BS 3871, On-Site Guide Table B6 ─────────────────────────────────────────
const bs3871Ratings = ratingsOf(...Object.values(m.BS3871_ZS_LIMITS));
const bs3871 = {
  ratings: bs3871Ratings,
  rows: [1, 2, 3, 4].map((n) => ({
    type: n,
    multiple: m.BS3871_TRIP_MULTIPLES[`type${n}`],
    values: rowFor(m.BS3871_ZS_LIMITS[`type${n}`], bs3871Ratings),
  })),
};

// ── Ze. NOT in zsLimits.ts — these are distributor-quoted typical maximums, ──
// worded to match /guides/ze-values-uk exactly so the page and the sheet cannot disagree.
const ze = [
  { system: 'TN-S', max: '0.80', note: 'Cable sheath / armour return' },
  { system: 'TN-C-S (PME)', max: '0.35', note: 'Combined PEN conductor' },
  { system: 'TT', max: '21', note: 'Earth electrode — RCD required' },
];

const disconnection = [
  { circuit: 'Final circuit ≤ 63 A with one or more socket-outlets', time: '0.4 s', reg: '411.3.2.2' },
  { circuit: 'Final circuit ≤ 32 A supplying only fixed equipment', time: '0.4 s', reg: '411.3.2.2' },
  { circuit: 'Distribution circuit, or final circuit above those ratings', time: '5 s', reg: '411.3.2.3' },
];

const rcd = Object.entries(m.RCD_ZS_LIMITS).map(([ma, max]) => ({ ma, max }));

/**
 * How many figures the document actually prints — the cover states it, the way
 * the symbols chart's cover states its symbol count.
 *
 * COUNTED, never typed. A hardcoded number on a cover is a claim that silently
 * goes wrong the moment the tables change, and it is the first thing a reader
 * checks.
 */
const valueCount =
  mcb_tables.reduce((n, t) => n + t.rows.reduce((m, r) => m + r.values.filter((v) => v !== '').length, 0), 0) +
  fuse_sections.reduce((n, s) => n + s.standards.reduce((m, st) => m + st.cols.length, 0), 0) +
  bs3871.rows.reduce((n, r) => n + r.values.filter((v) => v !== '').length, 0) +
  rcd.length;

const payload = {
  meta: {
    title: 'Earth Fault Loop Impedance Reference',
    edition_note: 'values as tabulated, Cmin 0.95',
    value_count: valueCount,
    // Passed in rather than computed, so a rebuild with unchanged data is byte-identical.
    generated: process.env.PDF_DATE || new Date().toISOString().slice(0, 10),
  },
  ze,
  disconnection,
  mcb_tables,
  fuse_sections,
  bs3871,
  rcd,
};

if (process.argv.includes('--payload-only')) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

if (!TEMPLATE_ID) {
  console.error('Missing template id — pass --template <id> or set ZS_PDF_TEMPLATE_ID');
  process.exit(1);
}

const res = await fetch(`${API}/documents`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    document: {
      document_template_id: TEMPLATE_ID,
      status: 'pending',
      meta: { _filename: FILENAME },
      payload,
    },
  }),
});
if (!res.ok) {
  console.error('create failed', res.status, await res.text());
  process.exit(1);
}
const docId = (await res.json()).document.id;
console.log('documentId', docId);

// Poll. PDFMonkey is usually done inside a few seconds.
let card;
for (let i = 0; i < 20; i++) {
  await new Promise((r) => setTimeout(r, 2000));
  const c = await fetch(`${API}/document_cards/${docId}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  card = (await c.json()).document_card;
  if (card.status === 'success' || card.status === 'failure') break;
}
if (card?.status !== 'success') {
  console.error('render failed:', card?.status, card?.failure_cause);
  process.exit(1);
}

const pdf = Buffer.from(await (await fetch(card.download_url)).arrayBuffer());
const outPath = join(ROOT, 'public', 'downloads', FILENAME);
writeFileSync(outPath, pdf);
console.log(`wrote ${outPath} (${(pdf.length / 1024).toFixed(0)} KB)`);

/* ------------------------------------------------ keep the advertised size honest
   `PdfDownloadCard` prints a `meta="NNN KB"` label. Hand-maintaining it means it
   silently drifts the moment the PDF is rebuilt — the symbols chart's had already
   gone 423 → 664 KB before anyone noticed. Rewrite it from the real file. */
const sizeKb = `${Math.round(pdf.length / 1024)} KB`;
// Anchored on the trackAs that follows it, so a page carrying more than one
// download card can never have the wrong one rewritten.
const META_RE = /meta="\d+ KB"(\s*\n\s*trackAs="zs_ze_reference_pdf")/g;
for (const page of ['MaximumZsValuesPage.tsx', 'ZeValuesUKPage.tsx']) {
  const file = join(ROOT, 'src', 'pages', 'seo', page);
  const before = readFileSync(file, 'utf-8');
  const after = before.replace(META_RE, `meta="${sizeKb}"$1`);
  if (after === before && !META_RE.test(before)) {
    // Fail loudly: a silent no-op here ships a wrong number on a public page.
    console.error(`WARNING: no zs_ze_reference_pdf card found in ${page} — meta not synced`);
  } else if (after !== before) {
    writeFileSync(file, after);
    console.log(`synced ${page} → meta="${sizeKb}"`);
  }
}

/* ------------------------------------------------ publish to the bucket
   The SERVED copy is the public `lead-magnets` bucket, not /public — the guide
   pages link it there and `newsletter-subscribe` fetches the same URL to build
   the email attachment, so one file backs both and neither can drift. What was
   written above is the build artefact.

   Skipped entirely with --no-upload. */
const BUCKET_PATH = `lead-magnets/${FILENAME}`;
const PROJECT = 'jtwygbeceundfgnkirof';

if (process.argv.includes('--no-upload')) {
  console.log('--no-upload — bucket left untouched');
} else {
  try {
    const token = execFileSync('security', ['find-generic-password', '-s', 'Supabase CLI', '-w'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const keys = JSON.parse(
      execFileSync(
        'curl',
        ['-s', '-H', `Authorization: Bearer ${token}`,
          `https://api.supabase.com/v1/projects/${PROJECT}/api-keys`],
        { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
      )
    );
    const serviceRole = keys.find((k) => k.name === 'service_role')?.api_key;
    if (!serviceRole) throw new Error('service_role key not found');

    // ⚠️ Check the status. Storage answers 4xx with a JSON body and curl still
    // exits 0, so an upload that never happened otherwise prints "published".
    const status = execFileSync(
      'curl',
      ['-s', '-X', 'POST',
        '-H', `Authorization: Bearer ${serviceRole}`,
        '-H', 'Content-Type: application/pdf',
        '-H', 'x-upsert: true',
        '--data-binary', `@${outPath}`,
        '-o', '/dev/null', '-w', '%{http_code}',
        `https://${PROJECT}.supabase.co/storage/v1/object/${BUCKET_PATH}`],
      { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'inherit'] }
    ).trim();
    if (!status.startsWith('2')) throw new Error(`storage returned HTTP ${status}`);

    // Read it back from the public URL — the only proof the served copy is the
    // file just built, rather than a stale object still sitting under the name.
    //
    // ⚠️ Retry. The public URL is CDN-fronted and does not reflect the write
    // instantly; a single immediate read returns the PREVIOUS object and makes
    // a successful upload look like a failure (it did, first time out). The
    // cache-buster stops an edge copy satisfying the read.
    let liveBytes = 0;
    for (let attempt = 1; attempt <= 5; attempt++) {
      const live = await fetch(
        `https://${PROJECT}.supabase.co/storage/v1/object/public/${BUCKET_PATH}?cb=${status}${attempt}`,
        { cache: 'no-store' }
      );
      liveBytes = (await live.arrayBuffer()).byteLength;
      if (liveBytes === pdf.length) break;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
    if (liveBytes !== pdf.length) {
      throw new Error(
        `served copy is ${liveBytes} B, built copy is ${pdf.length} B after 5 reads`
      );
    }
    console.log(`published to lead-magnets (HTTP ${status}, ${liveBytes} B verified live)`);

    /* ---- the delivery email's preview image, rebuilt from THIS pdf ----------
       `lead-magnet-email.ts` shows a fan of the sheets. Built by hand the first
       time, it went stale the moment the sheets were corrected — the email was
       advertising a page that no longer existed. Regenerating it here is the
       only way the two cannot diverge.
       Needs pdftoppm (poppler) and magick (ImageMagick); skips loudly without. */
    const previewPath = join(tmpdir(), 'zs-ze-preview.jpg');
    try {
      const work = mkdtempSync(join(tmpdir(), 'zs-fan-'));
      execFileSync('pdftoppm', ['-r', '100', '-png', outPath, join(work, 'sheet')]);
      const shots = [1, 2, 3].map((n) => join(work, `sheet-${n}.png`));
      for (const [i, src] of shots.entries()) {
        execFileSync('magick', [src, '-resize', '300x',
          '-bordercolor', '#D8DEE6', '-border', '1',
          '(', '+clone', '-background', '#00000030', '-shadow', '30x8+0+4', ')',
          '+swap', '-background', 'none', '-layers', 'merge', '+repage',
          join(work, `p${i + 1}.png`)]);
      }
      execFileSync('magick', ['-size', '1040x520', 'xc:none',
        join(work, 'p3.png'), '-geometry', '+560+40', '-composite',
        join(work, 'p2.png'), '-geometry', '+300+22', '-composite',
        join(work, 'p1.png'), '-geometry', '+40+4', '-composite',
        '-trim', '+repage',
        // Matches the cream highlight panel the image sits in.
        '-background', '#FFFAEC', '-alpha', 'remove', '-alpha', 'off',
        '-strip', '-quality', '82', previewPath]);

      const pStatus = execFileSync('curl',
        ['-s', '-X', 'POST',
          '-H', `Authorization: Bearer ${serviceRole}`,
          '-H', 'Content-Type: image/jpeg',
          '-H', 'x-upsert: true',
          '--data-binary', `@${previewPath}`,
          '-o', '/dev/null', '-w', '%{http_code}',
          `https://${PROJECT}.supabase.co/storage/v1/object/lead-magnets/elec-mate-zs-ze-reference-preview.jpg`],
        { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
      if (!pStatus.startsWith('2')) throw new Error(`preview upload HTTP ${pStatus}`);
      console.log('rebuilt + published the email preview image');
    } catch (e) {
      console.error(`WARNING: email preview image NOT rebuilt (${e.message}).`);
      console.error('The delivery email will keep showing the previous sheets.');
    }
  } catch (e) {
    console.error('NOT published —', e.message);
    console.error('The served copy is the bucket, so the pages would link a stale file. Upload it:');
    console.error(
      `  curl -X POST -H "Authorization: Bearer $SERVICE_ROLE_KEY" -H "Content-Type: application/pdf" ` +
        `-H "x-upsert: true" --data-binary @${outPath.replace(ROOT + '/', '')} ` +
        `"https://${PROJECT}.supabase.co/storage/v1/object/${BUCKET_PATH}"`
    );
    process.exit(1);
  }
}
