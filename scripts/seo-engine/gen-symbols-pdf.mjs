#!/usr/bin/env node
/**
 * gen-symbols-pdf.mjs — build the free downloadable IEC 60617 symbols chart PDF.
 *
 * WHY: /guides/electrical-symbols-chart is the site's biggest page by
 * impressions (21k/28d) but sits at position ~8.6, and its own query data shows
 * people explicitly searching "iec 60617 electrical symbols pdf". Nobody is
 * serving that. A free, branded, genuinely useful PDF both captures the query
 * and gives the page the linkable asset it needs to climb.
 *
 * Reads the 114 symbols from src/data/electricalSymbols.ts (the source of
 * truth), inlines each SVG, lays them out by category, and prints to
 * public/downloads/elec-mate-electrical-symbols-chart.pdf via headless Chrome.
 *
 * Usage:  node scripts/seo-engine/gen-symbols-pdf.mjs
 * Re-run whenever electricalSymbols.ts or the SVG files change.
 *
 * NOTE ON NAMING: the standard is IEC 60617. BS EN 60617 was withdrawn — never
 * label the chart with the withdrawn designation.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const DATA = join(ROOT, 'src/data/electricalSymbols.ts');
const SYMBOL_DIR = join(ROOT, 'public/symbols');
const OUT_DIR = join(ROOT, 'public/downloads');
const OUT_PDF = join(OUT_DIR, 'elec-mate-electrical-symbols-chart.pdf');
const TMP_HTML = join(OUT_DIR, '.symbols-chart.tmp.html');

const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/* ---------------------------------------------- parse the symbol source */

const src = readFileSync(DATA, 'utf-8');

// Category definitions come first in the file (id + label pairs, no `file:`).
const categories = [];
const catRe = /\{\s*id:\s*'([^']+)',\s*label:\s*'([^']+)',\s*slug:/g;
let m;
while ((m = catRe.exec(src))) categories.push({ id: m[1], label: m[2] });

// Symbol records: id, name, category, file (+ optional iec60617).
const symbols = [];
const symRe =
  /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*file:\s*'([^']+)'/g;
while ((m = symRe.exec(src))) {
  const [, id, name, category, file] = m;
  // iec60617 sits within the same record — look ahead a bounded window.
  const tail = src.slice(symRe.lastIndex, symRe.lastIndex + 900);
  const iecMatch = /iec60617:\s*'([^']+)'/.exec(tail.split(/\n\s*\{\s*\n/)[0] || '');
  symbols.push({ id, name, category, file, iec: iecMatch ? iecMatch[1] : '' });
}

if (symbols.length === 0) {
  console.error('No symbols parsed from electricalSymbols.ts — aborting.');
  process.exit(1);
}

// The record regex assumes the exact key order id/name/category/file. A field
// inserted between them, or an escaped apostrophe in a name, silently drops
// records — and the cover would then confidently print the wrong total. Compare
// against a simple count of `file:` keys and refuse to build on a mismatch.
const declaredFiles = (src.match(/^\s*file: '/gm) || []).length;
if (declaredFiles !== symbols.length) {
  console.error(
    `Parse mismatch: ${symbols.length} records parsed but ${declaredFiles} \`file:\` keys in ` +
      `electricalSymbols.ts. The record regex is out of step with the data — aborting rather ` +
      `than shipping a truncated chart.`
  );
  process.exit(1);
}
console.log(`Parsed ${symbols.length} symbols across ${categories.length} categories.`);

/* ---------------------------------------------- inline the SVGs */

let missing = 0;
for (const s of symbols) {
  const p = join(SYMBOL_DIR, s.file);
  if (!existsSync(p)) {
    missing++;
    s.svg = '';
    continue;
  }
  // Strip XML prologue and force the SVG to scale to its box.
  s.svg = readFileSync(p, 'utf-8')
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .replace(/<svg([^>]*)>/, (full, attrs) => {
      const cleaned = attrs
        .replace(/\swidth="[^"]*"/g, '')
        .replace(/\sheight="[^"]*"/g, '');
      return `<svg${cleaned} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
    })
    .trim();
}
if (missing) console.warn(`WARN: ${missing} symbol SVG file(s) missing on disk.`);

/* ---------------------------------------------- build the HTML */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const byCategory = categories
  .map((c) => ({ ...c, items: symbols.filter((s) => s.category === c.id) }))
  .filter((c) => c.items.length);

// Any symbol whose category is not in the category list still gets printed.
const known = new Set(byCategory.flatMap((c) => c.items.map((s) => s.id)));
const orphans = symbols.filter((s) => !known.has(s.id));
if (orphans.length) byCategory.push({ id: 'other', label: 'Other Symbols', items: orphans });

const sectionsHtml = byCategory
  .map(
    (c) => `
  <section class="cat">
    <h2>${esc(c.label)} <span class="count">${c.items.length}</span></h2>
    <div class="grid">
      ${c.items
        .map(
          (s) => `<figure class="sym">
            <div class="art">${s.svg || '<span class="na">—</span>'}</div>
            <figcaption>
              <span class="nm">${esc(s.name)}</span>
              ${s.iec ? `<span class="iec">${esc(s.iec)}</span>` : ''}
            </figcaption>
          </figure>`
        )
        .join('')}
    </div>
  </section>`
  )
  .join('');

const today = new Date().toISOString().slice(0, 10);
const printedOn = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const html = `<!DOCTYPE html>
<html lang="en-GB"><head><meta charset="utf-8">
<title>UK Electrical Symbols Chart (IEC 60617) — Elec-Mate</title>
<style>
  /* Cover is full-bleed; the reference pages keep a print margin.
     Colour language matches the EIC / certificate covers exactly:
     navy gradient hero, 6px gold rail, gold eyebrow, 80x4 title rule. */
  @page { size: A4; margin: 14mm 10mm 16mm; }
  @page cover { size: A4; margin: 0; }

  :root { --navy: #0a1628; --navy-2: #152238; --navy-3: #1c2e4a; --gold: #fbbf24; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color:#0f172a; }

  /* ---------- cover ---------- */
  .cover-page { page: cover; width:100%; min-height:297mm; display:flex; flex-direction:column;
                color:#0a1628; page-break-after: always; }
  .cover-hero { position:relative; background:linear-gradient(160deg,#0a1628 0%,#152238 60%,#1c2e4a 100%);
                color:#fff; padding:22mm 18mm 16mm; }
  .cover-hero::before { content:''; position:absolute; top:0; left:0; right:0; height:6px;
                        background:linear-gradient(90deg,var(--gold),#fbbf24,var(--gold)); }
  .cover-logos { display:flex; justify-content:space-between; align-items:center; margin-bottom:18mm; min-height:60px; }
  .cover-band-name { color:#fbbf24; font-weight:700; font-size:20px; letter-spacing:0.3px; }
  .cover-band-name span { color:#fff; }
  .cover-eyebrow { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#fbbf24; font-weight:700; margin-bottom:12px; }
  .cover-title { font-size:38px; line-height:1.08; font-weight:800; letter-spacing:-0.5px; color:#fff; margin:0; }
  .cover-title-rule { width:80px; height:4px; background:linear-gradient(90deg,var(--gold),#fbbf24); margin-top:16px; border-radius:2px; }
  .cover-subtitle { margin-top:16px; font-size:11px; color:#cbd5e1; letter-spacing:0.3px; }

  .cover-status { padding:14px 18mm; display:flex; align-items:center; justify-content:space-between; background:#152238; color:#fff; }
  .cover-status-label { font-size:11px; text-transform:uppercase; letter-spacing:1.5px; font-weight:600; opacity:.95; }
  .cover-status-value { font-size:20px; font-weight:800; letter-spacing:1.5px; color:#fbbf24; }

  .cover-details { flex:1; padding:14mm 18mm; border-left:4px solid #fbbf24; }
  .cover-details-h { font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#94a3b8; font-weight:700; margin-bottom:6px; }
  .cover-row { display:flex; border-bottom:1px solid #e2e8f0; }
  .cover-row:last-child { border-bottom:0; }
  .cover-k { width:185px; flex-shrink:0; color:#0a1628; font-weight:700; text-transform:uppercase; font-size:9.5px; letter-spacing:.5px; padding:11px 0; align-self:center; }
  .cover-v { flex:1; color:#0f172a; font-weight:600; font-size:12px; padding:11px 0; align-self:center; }
  .cover-v .muted { color:#64748b; font-weight:500; }
  .cover-footer { background:#0a1628; color:#94a3b8; font-size:8.5px; font-style:italic; padding:11px 18mm; }

  /* ---------- reference pages ---------- */
  .cat { margin-bottom:9mm; }
  h2 { font-size:13pt; margin:0 0 4mm; padding:0 0 2mm; border-bottom:2px solid var(--navy);
       page-break-after: avoid; letter-spacing:-.2px; color:var(--navy); }
  /* Chrome's print engine repeats position:fixed elements unpredictably across
     pages (it bled into the middle of page 3), so there is deliberately NO
     running footer. Branding lives on the cover and in this masthead. */
  .masthead { display:flex; justify-content:space-between; align-items:baseline;
              border-bottom:3px solid var(--gold); padding-bottom:2.5mm; margin-bottom:6mm; }
  .masthead .mh-brand { font-size:11pt; font-weight:800; color:var(--navy); letter-spacing:-.2px; }
  .masthead .mh-brand em { color:#b45309; font-style:normal; }
  .masthead .mh-meta { font-size:8pt; color:#64748b; }

  /* Closing panel — fills the tail of the final page, which otherwise ran
     ~90% white after the last (small) category. Deliberate, useful, branded. */
  .closing { margin-top:10mm; page-break-inside: avoid; border:1px solid #e2e8f0;
             border-top:4px solid var(--gold); border-radius:3px; overflow:hidden; }
  .closing-head { background:var(--navy); color:#fff; padding:4mm 6mm; }
  .closing-head h3 { margin:0; font-size:11.5pt; font-weight:800; letter-spacing:-.2px; }
  .closing-head p { margin:1mm 0 0; font-size:8pt; color:#cbd5e1; }
  .closing-body { display:grid; grid-template-columns:1fr 1fr; gap:6mm; padding:5mm 6mm; }
  .closing-body h4 { margin:0 0 2mm; font-size:8pt; text-transform:uppercase; letter-spacing:1px;
                     color:#64748b; font-weight:700; }
  .closing-body p, .closing-body li { font-size:8.5pt; line-height:1.55; color:#334155; margin:0 0 1.5mm; }
  .closing-body ul { margin:0; padding-left:4mm; }
  .closing-foot { border-top:1px solid #e2e8f0; background:#f8fafc; padding:3.5mm 6mm;
                  display:flex; justify-content:space-between; align-items:center; }
  .closing-foot .cf-brand { font-size:9.5pt; font-weight:800; color:var(--navy); }
  .closing-foot .cf-brand em { color:#b45309; font-style:normal; }
  .closing-foot .cf-url { font-size:8pt; color:#64748b; }
  h2 .count { float:right; font-size:9pt; font-weight:600; color:#94a3b8; }

  .grid { display:grid; grid-template-columns: repeat(6, 1fr); gap:4mm; }
  .sym { margin:0; page-break-inside: avoid; text-align:center; }
  .art { height:16mm; border:1px solid #e2e8f0; border-top:2px solid var(--gold); border-radius:3px;
         padding:2mm; background:#fff; display:flex; align-items:center; justify-content:center; }
  .art svg { max-width:100%; max-height:100%; }
  .na { color:#cbd5e1; }
  figcaption { margin-top:1.4mm; line-height:1.2; }
  .nm { display:block; font-size:6.6pt; color:#0f172a; font-weight:600; }
  .iec { display:block; font-size:5.8pt; color:#94a3b8; margin-top:.4mm; }

</style></head>
<body>

  <!-- COVER — matches the EIC / certificate cover language -->
  <div class="cover-page">
    <div class="cover-hero">
      <div class="cover-logos">
        <span class="cover-band-name">Elec-<span>Mate</span></span>
      </div>
      <div class="cover-eyebrow">IEC 60617 &middot; BS 7671:2018 + Amendment 4:2026</div>
      <h1 class="cover-title">UK Electrical<br />Symbols Chart</h1>
      <div class="cover-title-rule"></div>
      <div class="cover-subtitle">The complete reference set for installation drawings, distribution board schedules and certificates</div>
    </div>

    <div class="cover-status">
      <span class="cover-status-label">Symbols included</span>
      <span class="cover-status-value">${symbols.length}</span>
    </div>

    <div class="cover-details">
      <div class="cover-details-h">About this chart</div>
      <div class="cover-row">
        <div class="cover-k">Standard</div>
        <div class="cover-v">IEC 60617 <span class="muted">— the graphical symbol standard referenced by BS 7671 Regulation 514.9.1</span></div>
      </div>
      <div class="cover-row">
        <div class="cover-k">Categories</div>
        <div class="cover-v">${byCategory.length} <span class="muted">— ${byCategory
          .map((c) => c.label.replace(/ Symbols$/, '').toLowerCase())
          .join(', ')}</span></div>
      </div>
      <div class="cover-row">
        <div class="cover-k">Use</div>
        <div class="cover-v">Free to print, share and pin up <span class="muted">— on site, in the van or in the office</span></div>
      </div>
      <div class="cover-row">
        <div class="cover-k">Issued</div>
        <div class="cover-v">${printedOn}</div>
      </div>
      <div class="cover-row">
        <div class="cover-k">Full reference</div>
        <div class="cover-v">elec-mate.com/guides/electrical-symbols-chart <span class="muted">— per-symbol pages with wiring context</span></div>
      </div>
    </div>

    <div class="cover-footer">
      Produced by Elec-Mate — the all-in-one app for UK electricians. Symbols are reproduced for reference on installation drawings; always work to the current edition of BS 7671.
    </div>
  </div>

  <div class="masthead">
    <span class="mh-brand">Elec-<em>Mate</em> &middot; UK Electrical Symbols Chart</span>
    <span class="mh-meta">${symbols.length} symbols to IEC 60617 &middot; elec-mate.com</span>
  </div>
  ${sectionsHtml}

  <section class="closing">
    <div class="closing-head">
      <h3>Using these symbols on site</h3>
      <p>Reference notes — IEC 60617 as applied to UK installation drawings</p>
    </div>
    <div class="closing-body">
      <div>
        <h4>Where the standard sits</h4>
        <p>BS 7671 Regulation 514.9.1 requires that diagrams, charts, tables or schedules are provided
           for every installation, showing the type and composition of circuits and the information
           needed to identify protective devices. IEC 60617 is the graphical symbol set those drawings
           use.</p>
        <p>BS EN 60617 was withdrawn — IEC 60617 is the current designation.</p>
      </div>
      <div>
        <h4>Reading a drawing</h4>
        <ul>
          <li>Always check the drawing&rsquo;s own legend first — practice varies between packages
              and a project legend overrides any general chart.</li>
          <li>Symbols show function, not physical appearance or size.</li>
          <li>Where a symbol is annotated (2xEM, 45A, IP66), the annotation is part of the meaning.</li>
          <li>This chart is a reference aid. Always work to the current edition of BS 7671.</li>
        </ul>
      </div>
    </div>
    <div class="closing-foot">
      <span class="cf-brand">Elec-<em>Mate</em></span>
      <span class="cf-url">Per-symbol reference pages, wiring context and free mock exams &middot; elec-mate.com/guides/electrical-symbols-chart</span>
    </div>
  </section>
</body></html>`;

/* ---------------------------------------------- print */

mkdirSync(OUT_DIR, { recursive: true });
// Remove any previous build first: Chrome can exit 0 without writing (flag
// drift, sandbox refusal) and the existsSync check below would then pass on the
// stale file and report success for a PDF that was never regenerated.
if (existsSync(OUT_PDF)) unlinkSync(OUT_PDF);
writeFileSync(TMP_HTML, html);

try {
  execFileSync(
    CHROME,
    [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${OUT_PDF}`,
      `file://${TMP_HTML}`,
    ],
    { stdio: 'ignore' }
  );
} catch (err) {
  console.error('Chrome failed to print the PDF. Set CHROME_PATH if Chrome is elsewhere.');
  console.error(err.message);
  process.exit(1);
} finally {
  if (existsSync(TMP_HTML)) unlinkSync(TMP_HTML);
}

if (!existsSync(OUT_PDF)) {
  console.error('PDF was not produced.');
  process.exit(1);
}

// Chrome embeds a full font for the ~130 labels, which roughly doubles the
// file. Ghostscript subsets it — visually identical vector output at ~40% less,
// which matters because this PDF is emailed as an attachment as well as served.
// Skipped silently if ghostscript isn't installed.
try {
  const tmp = OUT_PDF.replace(/\.pdf$/, '.opt.pdf');
  execFileSync(
    'gs',
    [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.5',
      '-dPDFSETTINGS=/ebook',
      '-dSubsetFonts=true',
      '-dCompressFonts=true',
      '-dEmbedAllFonts=true',
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${tmp}`,
      OUT_PDF,
    ],
    { stdio: 'ignore' }
  );
  const beforeKb = Math.round(readFileSync(OUT_PDF).length / 1024);
  const afterKb = Math.round(readFileSync(tmp).length / 1024);
  // Only adopt it if it actually helped and looks sane (never accept a tiny
  // output — that would mean ghostscript produced a broken file).
  if (afterKb > 50 && afterKb < beforeKb) {
    writeFileSync(OUT_PDF, readFileSync(tmp));
    console.log(`  ↳ compressed ${beforeKb} KB → ${afterKb} KB`);
  }
  if (existsSync(tmp)) unlinkSync(tmp);
} catch {
  console.log('  ↳ ghostscript not available, shipping uncompressed');
}
const kb = Math.round(readFileSync(OUT_PDF).length / 1024);

// Keep the size and symbol count advertised on the page in sync with the file
// we just produced — a stale "423 KB" next to a 663 KB download is exactly the
// kind of small inaccuracy that erodes trust in everything else on the page.
const PAGE = join(ROOT, 'src/pages/seo/ElectricalSymbolsChartPage.tsx');
if (existsSync(PAGE)) {
  const before = readFileSync(PAGE, 'utf-8');
  const after = before.replace(/meta="\d+(?:\.\d+)? ?KB"/, `meta="${kb} KB"`);
  if (after !== before) {
    writeFileSync(PAGE, after);
    console.log(`  ↳ updated meta="${kb} KB" in ElectricalSymbolsChartPage.tsx`);
  }
}

console.log(`✓ ${OUT_PDF.replace(ROOT + '/', '')} — ${kb} KB (${symbols.length} symbols, ${today})`);

/* ------------------------------------------------ publish to the bucket
   The SERVED copy lives in the public `lead-magnets` Supabase bucket, not in
   /public — the symbols page links it there and the delivery email fetches the
   same URL to build its attachment, so one copy backs both and neither can
   drift. The file written above is the build artefact.

   Uploads automatically when a service-role key is resolvable via the authed
   Supabase CLI token; otherwise prints the command so it is never silently
   skipped. */
const BUCKET_PATH = 'lead-magnets/elec-mate-electrical-symbols-chart.pdf';
const PROJECT = 'jtwygbeceundfgnkirof';
const uploadCmd =
  `curl -X POST -H "Authorization: Bearer $SERVICE_ROLE_KEY" -H "Content-Type: application/pdf" ` +
  `-H "x-upsert: true" --data-binary @${OUT_PDF.replace(ROOT + '/', '')} ` +
  `"https://${PROJECT}.supabase.co/storage/v1/object/${BUCKET_PATH}"`;

try {
  const token = execFileSync('security', ['find-generic-password', '-s', 'Supabase CLI', '-w'], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
  const keysJson = execFileSync(
    'curl',
    ['-s', '-H', `Authorization: Bearer ${token}`, `https://api.supabase.com/v1/projects/${PROJECT}/api-keys`],
    { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
  );
  const serviceRole = JSON.parse(keysJson).find((k) => k.name === 'service_role')?.api_key;
  if (!serviceRole) throw new Error('service_role key not found');

  execFileSync(
    'curl',
    ['-s', '-X', 'POST',
      '-H', `Authorization: Bearer ${serviceRole}`,
      '-H', 'Content-Type: application/pdf',
      '-H', 'x-upsert: true',
      '--data-binary', `@${OUT_PDF}`,
      '-o', '/dev/null', '-w', '%{http_code}',
      `https://${PROJECT}.supabase.co/storage/v1/object/${BUCKET_PATH}`],
    { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'inherit'] }
  );
  console.log(`  ↳ published to the public lead-magnets bucket (the served copy)`);
} catch {
  console.log('  ↳ NOT published — the served copy is the bucket, so upload it:');
  console.log(`     ${uploadCmd}`);
}
