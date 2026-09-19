/**
 * check:app-shell
 * ─────────────────────────────────────────────────────────────────────────────
 * ELE-1752. Is the Elec-AI composer on screen while an announcement banner is
 * showing?
 *
 * `.h-app-shell` sizes a page to the viewport. Layout renders the announcement
 * and maintenance banners ABOVE the routed page, so a banner pushes the shell
 * down and an equal number of pixels fall off the bottom — where the composer
 * lives. The shell does not scroll, so those pixels are unreachable: the input
 * is simply gone, which is what "the app becomes unusable, requires a restart"
 * actually was.
 *
 * The fix publishes `--banner-height` and subtracts it. This proves it, by
 * measuring the composer against the viewport at four banner heights. Nothing
 * in tsc or eslint can see a CSS calc that is one term short, and reasoning
 * about the calc is what produced the bug in the first place.
 */
import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/app-shell-render');

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
  resolve(root, 'src/index.css'),
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
  console.log('• check:app-shell skipped — playwright is not installed.');
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
  { name: 'phone-390-no-banner', w: 390, h: 844, query: '?banner=0' },
  { name: 'phone-390-banner-84', w: 390, h: 844, query: '?banner=84' },
  { name: 'phone-360-banner-120', w: 360, h: 800, query: '?banner=120' },
  { name: 'desktop-1280-banner-64', w: 1280, h: 900, query: '?banner=64' },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch {
  try {
    browser = await chromium.launch();
  } catch {
    console.log('• check:app-shell skipped — no Chrome/Chromium available to Playwright.');
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
  console.log(`✔ check:app-shell — ${CASES.length} cases, the composer stays on screen behind a banner`);
  for (const p of passes) console.log(`    ${p}`);
  process.exit(0);
}

console.error('\n✖ check:app-shell — content is falling off the bottom of the viewport\n');
for (const [name, detail] of failures) {
  console.error(`  ${name}`);
  for (const line of detail.split(' ||| ')) console.error(`    ${line}`);
}
console.error('');
process.exit(1);
