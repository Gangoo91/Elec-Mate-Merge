#!/usr/bin/env node
/**
 * check:routine-render
 * ─────────────────────────────────────────────────────────────────────────────
 * Mounts every step of the routine inspection form in a real browser and fails
 * on any crash or console error.
 *
 * WHY THIS EXISTS. `npm run build` is `vite build` with no tsc step, and eslint
 * and a dev server both pass on a component that is `undefined` at runtime — a
 * bad import, a renamed export, a required prop that is suddenly missing. The
 * repo's own SEO rules record three such shapes that reached main. tsc catches
 * some of it; only rendering catches the rest.
 *
 * It mounts TWENTY cases: every step × both visit types × empty and
 * fully-populated state. Empty and full both matter — a component that only
 * breaks with real data in it is the one that reaches a user, and a component
 * that only breaks when a field is blank is the one that greets a new report.
 *
 * ⚠️ `--resolve-extensions` MATCHES VITE'S ORDER AND MUST STAY THAT WAY.
 * esbuild resolves `.tsx` before `.ts`; Vite resolves `.ts` first. The repo has
 * a stray empty `src/hooks/use-mobile.tsx` shadowing the real
 * `src/hooks/use-mobile.ts`, which 180 files import. With esbuild's own order
 * the harness pulled in the empty one, `useIsMobile` came back undefined, and
 * every screen carrying a select died with "(void 0) is not a function" —
 * failing against code that is perfectly healthy in the app. A harness that
 * cries wolf gets deleted, and then the thing it guards breaks for real.
 */

import { build } from 'esbuild';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const here = resolve(root, 'scripts/routine-render');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
if (!existsSync(CHROME)) {
  console.log('• check:routine-render skipped — Google Chrome not found at the expected path.');
  process.exit(0);
}

await build({
  entryPoints: [resolve(here, 'harness.tsx')],
  outfile: resolve(here, 'bundle.js'),
  bundle: true,
  jsx: 'automatic',
  // See the header — this order is Vite's, deliberately, not esbuild's default.
  resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  alias: {
    '@': resolve(root, 'src'),
    '@/integrations/supabase/client': resolve(here, 'stub-supabase.ts'),
  },
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'error',
  absWorkingDir: root,
});

const { stdout } = await execFileP(
  CHROME,
  ['--headless', '--disable-gpu', '--virtual-time-budget=10000', '--dump-dom', `file://${resolve(here, 'index.html')}`],
  { maxBuffer: 64 * 1024 * 1024 }
);

const m = stdout.match(/id="res">([^<]*)/);
const result = m ? m[1] : '';

if (result.startsWith('PASS::')) {
  console.log(`✓ check:routine-render — ${result.slice(6)}`);
  process.exit(0);
}

console.error('\n✖ check:routine-render — the form does not mount cleanly\n');
for (const line of (result.replace(/^FAIL::/, '') || '(no result — the harness did not run)').split(' ||| ')) {
  console.error(`  ${line}`);
}
console.error('');
process.exit(1);
