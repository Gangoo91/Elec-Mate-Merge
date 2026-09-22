/**
 * check:kpi-strip
 * ─────────────────────────────────────────────────────────────────────────────
 * The six-figure KPI strip under the MRR hero.
 *
 * THE BUG THIS EXISTS FOR: "Churn, September so far" wrapped onto two lines, so
 * that tile's number and footnote sat lower than the five beside it and the
 * strip read as five tiles and a mistake. Nothing catches that — tsc and eslint
 * have no opinion about a title one word too long, and the tiles are correct in
 * isolation. Only measuring them together shows it.
 *
 * It also checks the sparklines carry meaning rather than decoration: a falling
 * series must not wear the "good" colour, churn falling MUST (down is the good
 * outcome there, and `invert` is what makes green never mean "churn rose"), and
 * every one draws the dotted baseline at its starting value.
 *
 * 🔴 PLAYWRIGHT, NOT `chrome --headless --window-size` — Chrome enforces a
 * ~485px minimum window width on macOS and crops instead. Same note as
 * check:routine-mobile, check:mw-footer and check:mrr-chart.
 */
import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/kpi-strip-render');

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
  resolve(root, 'src/components/admin/overview/primitives.tsx'),
  resolve(root, 'src/components/admin/overview/primitives.tsx'),
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
  console.log('• check:kpi-strip skipped — playwright is not installed.');
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
 * 1440 and 1180 are the two desktop widths the admin is actually used at, and
 * `lg:` (1024) is where the strip goes six-across, so both draw the real row.
 *
 * `?long=1` at 1024 is the one that matters. At the shipped labels NO title
 * wraps at any of these widths, so the height floors that keep the six numbers
 * on one baseline are never under load — delete them and 1440/1180 still pass.
 * The long-label case restores the titles as they were when the bug shipped
 * ("Churn, September so far"), at the narrowest six-across width, which is the
 * only combination that actually puts the floors to work.
 */
const CASES = [
  { name: 'desktop-1440', w: 1440, h: 520, query: '' },
  { name: 'laptop-1180', w: 1180, h: 520, query: '' },
  { name: 'six-across-1024-long-labels', w: 1024, h: 520, query: '?long=1' },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch {
  try {
    browser = await chromium.launch();
  } catch {
    console.log('• check:kpi-strip skipped — no Chrome/Chromium available to Playwright.');
    process.exit(0);
  }
}

const failures = [];
const passes = [];

/*
 * The render harness proves the COMPONENT honours `invert`; it cannot prove the
 * dashboard uses it, because the fixture hardcodes the flag. Churn is the one
 * inverted series on the strip — falling churn is good news and must wear the
 * good colour — so the wiring is asserted against the real source. Dropping
 * `invert` from AdminDashboard is invisible to the harness and silently paints
 * an improving month in the warning colour.
 */
{
  const dash = await readFile(resolve(root, 'src/pages/Admin/AdminDashboard.tsx'), 'utf8');
  const churnViz = dash.match(/viz=\{<Sparkline series=\{churn\?\.daily[^}]*\}[^/]*\/>\}/);
  if (!churnViz) {
    failures.push(['churn-wiring', 'could not find the churn Sparkline in AdminDashboard.tsx']);
  } else if (!/\binvert\b/.test(churnViz[0])) {
    failures.push([
      'churn-wiring',
      'the churn Sparkline does not pass `invert` — a falling (improving) churn ' +
        'series will be drawn in the warning colour: ' +
        churnViz[0],
    ]);
  } else {
    passes.push('churn-wiring: AdminDashboard passes `invert` for churn');
  }
}

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
    `✔ check:kpi-strip — ${CASES.length} widths, values aligned and sparklines carry direction`
  );
  for (const p of passes) console.log(`    ${p}`);
  process.exit(0);
}

console.error('\n✖ check:kpi-strip — the strip does not line up or the colours lie\n');
for (const [name, detail] of failures) {
  console.error(`  ${name}`);
  for (const line of detail.split(' ||| ')) console.error(`    ${line}`);
}
console.error('');
process.exit(1);
