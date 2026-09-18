#!/usr/bin/env node
/**
 * Every dynamic import on a certificate path must survive a deploy.
 *
 *   npm run check:cert-imports
 *
 * WHY THIS EXISTS
 * ELE-1750. Craig Soper could not issue a Minor Works certificate:
 *
 *   "Failed to fetch dynamically imported module:
 *    https://www.elec-mate.com/assets/IqsReviewPdf-C2wOb7K7.js"
 *
 * That asset returned 404. His browser was on a build from before a deploy and
 * asked for a chunk hash that no longer existed. The import lived in
 * `minorWorksJsonFormatter` as a plain `await import()`, so none of the
 * recovery in `lazyWithRetry` applied — that only ever wrapped React route
 * components. The certificate simply failed, and the "email not sending" half
 * of the same report was the identical failure one call deeper: the send path
 * catches the formatter error and falls back to a stored payload that was
 * missing for the same reason.
 *
 * This is not a rare condition. It happens to somebody on every deploy — the
 * window is "had the app open when the build finished".
 *
 * The rule is narrow on purpose. There are ~249 bare `await import()` calls in
 * the codebase and most are harmless: a settings panel that fails to open is a
 * nuisance. A certificate that cannot be generated, previewed or emailed stops
 * an electrician issuing a legal document on site, which is the product's
 * entire job. So only the certificate and PDF payload paths are guarded, and
 * they are guarded absolutely.
 *
 * Neither tsc nor eslint has anything to say about any of this: a bare
 * `await import()` is perfectly valid code that works on every machine where
 * the chunk still exists — which is every developer's.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

/*
 * Scanned roots. `src/utils` alone was not enough: the first cut of this guard
 * missed `components/reports/ReportPdfViewer.tsx`, which renders the preview
 * for EVERY certificate type and carried its own unprotected
 * `await import('@/utils/qsReviewPdf')` — the same module, on the same
 * certificate path, that took Craig Soper's Minor Works certificate down.
 * A guard that only watches the folder the first bug happened to live in is
 * not a guard.
 */
const ROOTS = ['src/utils', 'src/components/reports', 'src/components/pdf'];

/** Files whose failure means a certificate cannot be produced. */
const isCertPath = (name) =>
  /JsonFormatter\.ts$/.test(name) ||
  /^Report(Pdf|.*Pdf)Viewer\.tsx$/.test(name) ||
  /PdfGenerator\.tsx$/.test(name) ||
  ['certBranding.ts', 'certCoverPayload.ts', 'certDate.ts', 'qsReviewPdf.ts'].includes(name);

/** Every candidate file across the scanned roots. */
function collect() {
  const out = [];
  for (const root of ROOTS) {
    let entries;
    try {
      entries = readdirSync(root);
    } catch {
      continue;
    }
    for (const name of entries) {
      const full = join(root, name);
      if (statSync(full).isDirectory()) continue;
      if (!/\.tsx?$/.test(name)) continue;
      if (!isCertPath(name)) continue;
      out.push(full);
    }
  }
  return out;
}

const problems = [];

/**
 * A bare dynamic import — `await import('…')` not wrapped in importWithRetry.
 *
 * Matched on `await import(` specifically: `await importWithRetry(() =>
 * import('…'))` contains `import(` too, so a looser pattern reports the fix
 * as the defect.
 */
const BARE_IMPORT = /await\s+import\(\s*(['"])([^'"]+)\1\s*\)/g;

for (const file of collect()) {
  const src = readFileSync(file, 'utf8');

  // Comments describe this defect — this script's own header quotes it — so
  // they come out before matching, or the explanation is reported as the bug.
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');

  for (const m of code.matchAll(BARE_IMPORT)) {
    problems.push({
      file,
      module: m[2],
      detail:
        `\`await import('${m[2]}')\` is unprotected — a client on a pre-deploy ` +
        `build gets a 404 and the certificate fails. Wrap it: ` +
        `\`await importWithRetry(() => import('${m[2]}'))\``,
    });
  }
}

const checked = collect().length;

if (problems.length === 0) {
  console.log(`✔ ${checked} certificate path modules checked — every dynamic import is retried`);
  process.exit(0);
}

console.error(`\n✖ ${problems.length} unprotected dynamic import(s) on certificate paths\n`);
for (const p of problems) console.error(`  ${p.file}\n    ${p.detail}\n`);
process.exit(1);
