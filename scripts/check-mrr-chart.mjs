/**
 * check:mrr-chart
 * ─────────────────────────────────────────────────────────────────────────────
 * The admin MRR chart, rendered at real and future figures.
 *
 * THE BUG THIS EXISTS FOR: at £4,652 MRR the y-axis labelled £4.5k as its
 * highest gridline and the line ran above it. The domain was already £5,000 —
 * the tick loop just excluded its own ceiling, so the axis never said so. tsc,
 * eslint and every unit test passed on a chart that was visibly lying.
 *
 * `check:mrr-scale` proves the arithmetic. This proves the PICTURE: that the
 * top label is at or above the peak, that the target line is on the canvas
 * rather than off the top of it, and that both rails are actually drawn rather
 * than merely accepted as props.
 *
 * Cases walk the ladder — today's £4,652, just past £5k, the £9,800 boundary
 * where a percentage pad used to overshoot to £15k, and £12.4k in the coarse
 * band — plus a phone, where the axis column is 44px and a clipped tick is how
 * this class of defect usually arrives.
 *
 * 🔴 PLAYWRIGHT, NOT `chrome --headless --window-size` — Chrome enforces a
 * ~485px minimum window width on macOS and crops instead. Same note as
 * check:routine-mobile, check:mw-footer and check:app-shell.
 */
import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/mrr-chart-render');

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
  resolve(root, 'src/components/admin/overview/MrrHero.tsx'),
  resolve(root, 'src/components/admin/overview/mrrScale.ts'),
  resolve(root, 'src/components/admin/overview/MrrHero.tsx'),
  resolve(root, 'src/components/admin/overview/mrrScale.ts'),
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
  console.log('• check:mrr-chart skipped — playwright is not installed.');
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
  { name: 'today-4652', w: 1280, h: 700, query: '?peak=4652' },
  { name: 'past-5k-5200', w: 1280, h: 700, query: '?peak=5200' },
  { name: 'at-9800', w: 1280, h: 700, query: '?peak=9800' },
  { name: 'at-12400', w: 1280, h: 700, query: '?peak=12400' },
  { name: 'phone-390', w: 390, h: 700, query: '?peak=4652' },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch {
  try {
    browser = await chromium.launch();
  } catch {
    console.log('• check:mrr-chart skipped — no Chrome/Chromium available to Playwright.');
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
  console.log(
    `✔ check:mrr-chart — ${CASES.length} cases, the axis labels its ceiling and the target is on-canvas`
  );
  for (const p of passes) console.log(`    ${p}`);
  process.exit(0);
}

console.error('\n✖ check:mrr-chart — the chart does not show what it claims\n');
for (const [name, detail] of failures) {
  console.error(`  ${name}`);
  for (const line of detail.split(' ||| ')) console.error(`    ${line}`);
}
console.error('');
process.exit(1);
