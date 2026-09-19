#!/usr/bin/env node
/**
 * check:mw-footer
 * ─────────────────────────────────────────────────────────────────────────────
 * ELE-1750. Mounts the Minor Works Sign off footer at real phone and desktop
 * widths and fails on a crash, a missing action, or a button a thumb cannot
 * use.
 *
 * WHY THIS EXISTS. The footer gained a fifth action (View PDF), and five
 * `flex-1` buttons on a 390px screen is how a footer stops being usable
 * without anything failing: tsc, eslint and the dev server are all silent on a
 * 60px button with a clipped label. Only rendering catches it, and only at a
 * real width — the width the electrician is holding.
 *
 * 🔴 PLAYWRIGHT, NOT `chrome --headless --window-size` — and this repo already
 * knew that. `check:routine-mobile` carries the same warning, because Chrome
 * enforces a minimum window width of about 485px on macOS: a `--window-size=390`
 * run lays out at ~500 and then crops the screenshot to 390.
 *
 * It is repeated here because the first version of this harness was modelled on
 * `check:routine-render` — the sibling that checks the DOM, where the viewport
 * does not matter — instead of `check:routine-mobile`, the one that measures.
 * Every case then reported `window.innerWidth` of 500 while claiming 390, and
 * "passed" four widths it had never rendered. Hence the width in the PASS line:
 * a harness that certifies the wrong viewport is worse than no harness, so it
 * now states which one it used and you can see the runner was obeyed.
 *
 * What is NOT in `check:routine-mobile` is the opacity rule below; that one is
 * new here and worth lifting into it.
 *
 * ⚠️ `--resolve-extensions` MATCHES VITE'S ORDER AND MUST STAY THAT WAY.
 * esbuild resolves `.tsx` before `.ts`; Vite resolves `.ts` first. The repo has
 * a stray empty `src/hooks/use-mobile.tsx` shadowing the real `.ts`. Same note
 * as check:routine-render, same reason.
 */
import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/mw-footer-render');

/*
 * 🔴 THE STYLESHEET IS BUILT, NEVER COMMITTED.
 *
 * The first version of this harness copied a prebuilt `app.css` from a sibling
 * harness. Tailwind only emits the classes that existed when it ran, so the
 * `min-w-[96px]` and `flex-wrap` added for this very fix were absent — the
 * buttons rendered 65px wide and the harness reported a real failure against
 * code that was already correct. A stale stylesheet turns a renderer into a
 * liar in both directions: it invents failures, and it certifies layouts that
 * depend on classes it has never heard of.
 *
 * So it is regenerated whenever the config, the entry CSS, or the component
 * under test is newer than it. Roughly 25s cold, instant otherwise.
 */
const CSS_OUT = resolve(here, 'app.css');
const CSS_SOURCES = [
  resolve(root, 'tailwind.config.ts'),
  resolve(root, 'src/index.css'),
  resolve(root, 'src/components/minor-works/MWStickyFooter.tsx'),
];
const cssAge = existsSync(CSS_OUT) ? statSync(CSS_OUT).mtimeMs : 0;
if (CSS_SOURCES.some((f) => existsSync(f) && statSync(f).mtimeMs > cssAge)) {
  process.stdout.write('  building the harness stylesheet… ');
  await execFileP(
    'npx',
    ['tailwindcss', '--input', 'src/index.css', '--output', CSS_OUT, '--minify'],
    { cwd: root, maxBuffer: 64 * 1024 * 1024 }
  );
  console.log('done');
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('• check:mw-footer skipped — playwright is not installed.');
  process.exit(0);
}

await build({
  entryPoints: [resolve(here, 'harness.tsx')],
  outfile: resolve(here, 'bundle.js'),
  bundle: true,
  jsx: 'automatic',
  resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  alias: {
    '@': resolve(root, 'src'),
    '@/integrations/supabase/client': resolve(here, 'stub-supabase.ts'),
  },
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'error',
  absWorkingDir: root,
});

/*
 * 390 is the iPhone 14/15 logical width and the narrowest worth designing for;
 * 360 is the commonest Android. Both sit below the `lg` breakpoint where the
 * buttons stop stretching, so both exercise the wrapping. 1280 proves the
 * desktop row did not regress into two lines.
 */
const CASES = [
  { name: 'phone-390-saved', w: 390, h: 844, query: '' },
  { name: 'phone-360-saved', w: 360, h: 800, query: '' },
  { name: 'phone-390-unsaved', w: 390, h: 844, query: '?reportId=none' },
  { name: 'desktop-1280-saved', w: 1280, h: 900, query: '' },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch {
  try {
    browser = await chromium.launch();
  } catch {
    console.log('• check:mw-footer skipped — no Chrome/Chromium available to Playwright.');
    process.exit(0);
  }
}

const failures = [];
const passes = [];

for (const c of CASES) {
  const page = await browser.newPage({ viewport: { width: c.w, height: c.h } });
  await page.goto(pathToFileURL(resolve(here, 'index.html')).href + c.query);
  await page.waitForFunction(() => document.getElementById('res')?.textContent !== 'running', {
    timeout: 15000,
  });
  const result = await page.textContent('#res');
  await page.screenshot({ path: resolve(here, `shot_${c.name}.png`), fullPage: false });
  await page.close();

  if (result.startsWith('PASS::')) passes.push(`${c.name}: ${result.slice(6)}`);
  else
    failures.push([
      c.name,
      result.replace(/^FAIL::/, '') || '(no result — the harness did not run)',
    ]);
}

await browser.close();

if (!failures.length) {
  console.log(`✔ check:mw-footer — ${CASES.length} widths, every action reachable and thumb-sized`);
  for (const p of passes) console.log(`    ${p}`);
  process.exit(0);
}

console.error('\n✖ check:mw-footer — the Sign off footer does not hold up\n');
for (const [name, detail] of failures) {
  console.error(`  ${name}`);
  for (const line of detail.split(' ||| ')) console.error(`    ${line}`);
}
console.error('');
process.exit(1);
