#!/usr/bin/env node
/**
 * check:quote-lifecycle
 * ─────────────────────────────────────────────────────────────────────────────
 * Drives the REAL `useQuoteBuilder` through add → edit → delete and asserts
 * the derived labour follows.
 *
 * The unit checks cover the pure helpers. This covers the wiring between them,
 * which is the part that can be plausibly wrong while every unit test passes:
 * the parent id must be minted before its child, an edit must recompute, and a
 * delete must take the child with it.
 *
 *   npm run check:quote-lifecycle
 */
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/stripe-render');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('• check:quote-lifecycle skipped — playwright is not installed.');
  process.exit(0);
}

await build({
  entryPoints: [resolve(here, 'lifecycle-harness.tsx')],
  outfile: resolve(here, 'lifecycle.js'),
  bundle: true,
  jsx: 'automatic',
  resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  alias: {
    '@': resolve(root, 'src'),
    '@/integrations/supabase/client': resolve(here, 'stub-supabase.ts'),
    '@/contexts/AuthContext': resolve(here, 'stub-auth.tsx'),
  },
  define: {
    'process.env.NODE_ENV': '"development"',
    'import.meta.env': JSON.stringify({
      DEV: false,
      VITE_SUPABASE_URL: 'https://harness.invalid',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'harness',
    }),
  },
  logLevel: 'error',
  absWorkingDir: root,
});

const problems = [];
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));

await page.goto(`file://${resolve(here, 'lifecycle.html')}`);

const read = async () => ({
  step: await page.$eval('#step', (e) => e.textContent),
  items: await page.$eval('#items', (e) => e.textContent),
  count: await page.$eval('#count', (e) => e.textContent),
});

// 1 — after the add
await page.waitForFunction(() => document.querySelector('#step')?.textContent === 'step:1', { timeout: 5000 }).catch(() => {});
const afterAdd = await read();
console.log('  after add   :', afterAdd.items);
if (!/count:2/.test(afterAdd.count)) {
  problems.push(`add did not emit derived labour (${afterAdd.count})`);
}
if (!/labour\|Labour — Double socket outlet.*derived=yes/.test(afterAdd.items)) {
  problems.push('the derived labour line is missing or not linked');
}
if (!/qty=5\b/.test(afterAdd.items)) {
  problems.push('derived labour is not 0.5h × 10 = 5h');
}

// 2 — after the quantity edit
await page.waitForFunction(() => document.querySelector('#step')?.textContent === 'step:2', { timeout: 5000 }).catch(() => {});
const afterEdit = await read();
console.log('  after edit  :', afterEdit.items);
if (!/count:2/.test(afterEdit.count)) {
  problems.push(`editing the parent changed the line count (${afterEdit.count}) — labour was stacked or lost`);
}
if (!/qty=10\b/.test(afterEdit.items)) {
  problems.push('derived labour did not follow the quantity to 0.5 × 20 = 10h');
}

// 3 — after the delete
await page.waitForFunction(() => document.querySelector('#step')?.textContent === 'step:3', { timeout: 5000 }).catch(() => {});
await page.waitForTimeout(200);
const afterDelete = await read();
console.log('  after delete:', afterDelete.count, afterDelete.items || '(empty)');
if (!/count:0/.test(afterDelete.count)) {
  problems.push(`deleting the parent left ${afterDelete.count} — the labour was orphaned`);
}

if (errors.length) problems.push(...errors.map((e) => `page error: ${e}`));
await browser.close();

if (problems.length) {
  console.log(`\n❌ quote lifecycle: ${problems.length} problem(s)\n`);
  problems.forEach((p) => console.log('  • ' + p));
  process.exitCode = 1;
} else {
  console.log('\n✅ quote lifecycle: add, edit and delete all keep derived labour in step\n');
}
