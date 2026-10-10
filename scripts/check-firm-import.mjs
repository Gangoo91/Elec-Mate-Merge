#!/usr/bin/env node
/**
 * check:firm-import (ELE-2067)
 * ─────────────────────────────────────────────────────────────────────────────
 * Arithmetic the import and export get right or quietly get wrong:
 *
 *   1. Excel dates in British Summer Time. Reading a sheet with cellDates gave
 *      a JS Date at local midnight, and toISOString moved it to the day
 *      before: 5 June 2026 (serial 46178) came in as 4 June.
 *   2. VAT when a file has Subtotal and Total but no VAT column (100 / 120
 *      came in with VAT 0).
 *   3. An invoices file with nothing about payment is never assumed unpaid:
 *      the wizard's answer decides.
 *   4. CSV export cells a spreadsheet would run as a formula.
 *
 * Runs in Europe/London whatever the machine is set to.
 *   node scripts/check-firm-import.mjs
 */
process.env.TZ = 'Europe/London';
import { build } from 'esbuild';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import * as XLSX from 'xlsx';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = mkdtempSync(resolve(tmpdir(), 'firm-import-check-'));
const entry = resolve(out, 'entry.ts');
writeFileSync(
  entry,
  `export * from ${JSON.stringify(resolve(root, 'src/lib/firmImport/normalise.ts'))};
   export { datesToIso } from ${JSON.stringify(resolve(root, 'src/lib/firmImport/parse.ts'))};
   export { safeCsvText } from ${JSON.stringify(resolve(root, 'src/lib/firmExport/buildExport.ts'))};`
);
await build({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: resolve(out, 'bundle.mjs'),
  nodePaths: [resolve(root, 'node_modules')],
  alias: { '@': resolve(root, 'src') },
  // buildExport pulls in the Supabase client; stub it.
  plugins: [
    {
      name: 'stub-supabase',
      setup(b) {
        b.onResolve({ filter: /integrations\/supabase\/client$/ }, () => ({
          path: 'supabase-stub',
          namespace: 'stub',
        }));
        b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
          contents: 'export const supabase = {};',
          loader: 'js',
        }));
      },
    },
  ],
  logLevel: 'error',
});
const m = await import(pathToFileURL(resolve(out, 'bundle.mjs')).href);

let failed = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failed++;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${name}${ok ? '' : `: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`
  );
};

// 1. Dates. A real .xlsx with a date cell, written and read back.
const ws = XLSX.utils.aoa_to_sheet([['Invoice date'], [46178]]);
ws.A2.z = 'dd/mm/yyyy';
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Invoices');
const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

const old = XLSX.read(buf, { type: 'array', cellDates: true });
const oldVal = XLSX.utils.sheet_to_json(old.Sheets.Invoices, { header: 1, raw: true })[1][0];
eq(
  'the old cellDates path really was a day early in BST (guards this test)',
  oldVal.toISOString().slice(0, 10),
  '2026-06-04'
);

const wb2 = XLSX.read(buf, { type: 'array', cellDates: false, cellNF: true });
m.datesToIso(wb2.Sheets.Invoices, XLSX.SSF);
const cell = XLSX.utils.sheet_to_json(wb2.Sheets.Invoices, {
  header: 1,
  raw: true,
  defval: '',
})[1][0];
eq('Excel serial 46178 read as 5 June 2026', cell, '2026-06-05');
eq('parseDate of that cell', m.parseDate(cell), '2026-06-05');
eq('parseDate of the bare serial', m.parseDate(46178), '2026-06-05');
eq('parseDate of a serial with a time (46178.75)', m.parseDate(46178.75), '2026-06-05');
eq('a local-midnight Date keeps its day', m.parseDate(new Date(2026, 5, 5)), '2026-06-05');
eq('winter date unchanged (serial 46023 = 1 Jan 2026)', m.parseDate(46023), '2026-01-01');

// 2 and 3. Invoices.
const file = {
  id: 'f1',
  name: 'invoices.csv',
  size: 1,
  headers: ['No', 'Customer', 'Net', 'Gross'],
  rows: [{ No: 'INV-1', Customer: 'A Person', Net: '100.00', Gross: '120.00' }],
};
const map = { number: ['No'], customer_name: ['Customer'], subtotal: ['Net'], total: ['Gross'] };
const [owed] = m.normaliseFile(file, 'invoices', map, {
  dateOrder: 'dmy',
  invoiceStatus: 'unpaid',
});
eq('VAT = total − subtotal when there is no VAT column', owed.vat, 20);
eq(
  'an explicit VAT column wins',
  m.normaliseFile(
    { ...file, headers: [...file.headers, 'Tax'], rows: [{ ...file.rows[0], Tax: '0' }] },
    'invoices',
    { ...map, vat: ['Tax'] },
    { dateOrder: 'dmy' }
  )[0].vat,
  0
);
eq('no payment columns: the wizard asks', m.invoicesNeedStatusAnswer(map), true);
eq('answered "still owed"', owed.status, 'unpaid');
eq(
  'answered "all paid"',
  m.normaliseFile(file, 'invoices', map, { dateOrder: 'dmy', invoiceStatus: 'paid' })[0].status,
  'paid'
);
eq(
  'a status column means no question',
  m.invoicesNeedStatusAnswer({ ...map, status: ['Status'] }),
  false
);
eq(
  'an amount due column means no question',
  m.invoicesNeedStatusAnswer({ ...map, amount_due: ['Due'] }),
  false
);

// 4. CSV formula cells.
eq('=formula escaped', m.safeCsvText('=HYPERLINK("http://x")'), `'=HYPERLINK("http://x")`);
eq('+ escaped', m.safeCsvText('+44 7700 900000'), "'+44 7700 900000");
eq('@ escaped', m.safeCsvText('@SUM(A1)'), "'@SUM(A1)");
eq('tab escaped', m.safeCsvText('\tx'), "'\tx");
eq('a negative number left alone', m.safeCsvText('-12.50'), '-12.50');
eq('plain text left alone', m.safeCsvText('Smith & Sons'), 'Smith & Sons');

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log('\nAll firm import checks passed.');
