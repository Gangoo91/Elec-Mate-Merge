/**
 * Every browser-called edge function must allow `x-request-id` — ELE-1748.
 *
 * The Supabase client's `global.fetch` wrapper sets `x-request-id` on EVERY
 * request. A preflight that does not list it makes the browser refuse to send
 * the real call: the function is never reached, its logs show OPTIONS with no
 * POSTs behind them, and the app shows a bare "TypeError: Failed to fetch".
 * That is how `admin-stripe-stats` sat unreachable while being perfectly
 * healthy, and it had already bitten `ai-apprentice-today` before that.
 *
 * Four more had drifted the same way by 29 Sep — each a local copy of the
 * header block taken before `x-request-id` existed. Copies are the failure
 * mode, so this fails on a local copy that omits it rather than waiting for
 * someone to notice a dead feature.
 *
 * ⚠️ Deliberately resolves the SHARED list through `_shared/cors.ts` AND
 * `_shared/deps.ts`, which re-exports it. An earlier hand-rolled version of
 * this sweep matched only the former and reported 54 false positives,
 * including `create-checkout` — a function demonstrably serving live traffic.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SHARED = /from '\.\.\/_shared\/(cors|deps)\.ts'/;
const ALLOW = /['"]Access-Control-Allow-Headers['"]\s*:\s*\n?\s*((?:['"][^'"]*['"]\s*\+?\s*)+)/;

const invoked = new Set(
  execSync(`grep -rhoE "functions\\.invoke\\(\\s*['\\"][a-z0-9-]+['\\"]" src || true`, {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
    .split('\n')
    .map((l) => l.match(/['"]([a-z0-9-]+)['"]/)?.[1])
    .filter(Boolean)
);

const problems = [];
let shared = 0;
let noSource = 0;

for (const fn of [...invoked].sort()) {
  const path = `supabase/functions/${fn}/index.ts`;
  if (!existsSync(path)) {
    noSource++;
    continue;
  }
  const src = readFileSync(path, 'utf8');
  if (SHARED.test(src) && /\bcorsHeaders\b/.test(src)) {
    shared++;
    continue;
  }
  const headers = src.match(ALLOW)?.[1] ?? '';
  if (!headers) {
    problems.push(`${fn}: browser-called but declares no Access-Control-Allow-Headers`);
  } else if (!headers.includes('x-request-id')) {
    problems.push(`${fn}: own header list omits x-request-id — unreachable from the browser`);
  }
}

console.log(
  `  ${invoked.size} browser-called functions · ${shared} use the shared list · ${noSource} without repo source`
);

if (problems.length) {
  console.log(`\n❌ cors headers: ${problems.length} problem(s)`);
  problems.forEach((p) => console.log(`  • ${p}`));
  process.exit(1);
}
console.log('\n✅ cors headers: every browser-called function allows x-request-id');
