#!/usr/bin/env node
/**
 * check:elec-ai-welcome
 * ─────────────────────────────────────────────────────────────────────────────
 * The Elec-AI welcome screen has TWO states and the wrong one is invisible to
 * every other tool.
 *
 * The one-line explanation and the four "Try asking" cards are onboarding:
 * worth roughly 400px of a phone screen exactly once. For someone who has used
 * the tool they are furniture between them and the composer, and they push
 * that user's own conversations below the fold. So a returning user gets
 * neither — they get their own chats and the input.
 *
 * Nothing in tsc or eslint can tell you which layout rendered, and a
 * conditional that silently stops matching is exactly the kind of regression
 * that survives for months. This asserts on the rendered text.
 *
 * The `loading` case is not padding. Without the `sessionsLoading` gate the
 * first-run layout draws while history is in flight, so a returning user
 * watches four cards appear and vanish EVERY time they open Elec-AI — which
 * reads as a bug rather than a design.
 *
 * 🔴 PLAYWRIGHT, NOT `chrome --headless --window-size` — Chrome enforces a
 * ~485px minimum window width on macOS and crops the screenshot instead, so
 * the flag certifies a viewport it never rendered. Same note as
 * check:routine-mobile and check:mw-footer.
 */
import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/elec-ai-render');

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
  resolve(root, 'src/components/electrician-tools/ai-tools/chat/WelcomeScreen.tsx'),
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
  console.log('• check:elec-ai-welcome skipped — playwright is not installed.');
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
  { name: 'phone-390-first-run', w: 390, h: 844, query: '?mode=first-run' },
  { name: 'phone-390-returning', w: 390, h: 844, query: '?mode=returning' },
  { name: 'phone-390-loading', w: 390, h: 844, query: '?mode=loading' },
  { name: 'phone-390-after-new', w: 390, h: 844, query: '?mode=after-new' },
  { name: 'desktop-1280-returning', w: 1280, h: 900, query: '?mode=returning' },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch {
  try {
    browser = await chromium.launch();
  } catch {
    console.log('• check:elec-ai-welcome skipped — no Chrome/Chromium available to Playwright.');
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
  console.log(`✔ check:elec-ai-welcome — ${CASES.length} cases, first run teaches, return gets out of the way`);
  for (const p of passes) console.log(`    ${p}`);
  process.exit(0);
}

console.error('\n✖ check:elec-ai-welcome — the welcome screen shows the wrong state\n');
for (const [name, detail] of failures) {
  console.error(`  ${name}`);
  for (const line of detail.split(' ||| ')) console.error(`    ${line}`);
}
console.error('');
process.exit(1);
