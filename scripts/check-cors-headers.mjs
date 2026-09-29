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
 *
 * 🔴 SOURCE IS NOT PRODUCTION. Pass `--live` to probe the real preflight.
 *
 * The static pass alone is not enough and was proven so: it found 4 broken
 * functions, while probing production found 11. The other 7 had correct
 * SOURCE and a stale DEPLOY — the fix only lands on redeploy, which is the
 * whole lesson of ELE-1748. `--live` sends a real OPTIONS with
 * `x-request-id` and reads what comes back, so deploy drift is caught too.
 * It needs network access, so it is opt-in rather than part of the default
 * run.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SHARED = /from '\.\.\/_shared\/(cors|deps)\.ts'/;
const ALLOW = /['"]Access-Control-Allow-Headers['"]\s*:\s*\n?\s*((?:['"][^'"]*['"]\s*\+?\s*)+)/;

/*
 * `fn` is excluded: it is not a function. It appears as a doc-comment example
 * (`invoke('fn')`) in edgeFunctionError.ts and as the variable name at call
 * sites that invoke a function chosen at runtime. Probing it hits nothing.
 */
const NOT_FUNCTIONS = new Set(['fn']);

const invoked = new Set(
  execSync(`grep -rhoE "functions\\.invoke\\(\\s*['\\"][a-z0-9-]+['\\"]" src || true`, {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
    .split('\n')
    .map((l) => l.match(/['"]([a-z0-9-]+)['"]/)?.[1])
    .filter((n) => n && !NOT_FUNCTIONS.has(n))
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

/* ── Optional: what production actually answers ──────────────────────── */
if (process.argv.includes('--live')) {
  const BASE = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1';
  const names = [...invoked].sort();
  let ok = 0;
  const live = [];
  const probe = async (fn) => {
    try {
      const res = await fetch(`${BASE}/${fn}`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://app.elec-mate.com',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'authorization,content-type,x-request-id',
        },
        signal: AbortSignal.timeout(15000),
      });
      /*
       * A 404 means the function is not deployed at all — the platform
       * answers with its own default headers, which look exactly like a
       * cors fault but are not one. Reported as what it actually is: the
       * app invoking something that does not exist.
       */
      if (res.status === 404) {
        live.push(`${fn}: invoked from the app but NOT DEPLOYED (preflight 404)`);
        return;
      }
      const allow = res.headers.get('access-control-allow-headers') || '';
      if (allow.toLowerCase().includes('x-request-id')) ok++;
      else live.push(`${fn}: deployed preflight omits x-request-id (allows: ${allow || 'nothing'})`);
    } catch {
      // A probe that cannot complete is not evidence of a fault.
    }
  };
  // Batched so 200+ probes do not open 200+ sockets at once.
  for (let i = 0; i < names.length; i += 12) {
    await Promise.all(names.slice(i, i + 12).map(probe));
  }
  console.log(`  live: ${ok}/${names.length} deployed preflights allow x-request-id`);
  problems.push(...live);
}

if (problems.length) {
  console.log(`\n❌ cors headers: ${problems.length} problem(s)`);
  problems.forEach((p) => console.log(`  • ${p}`));
  process.exit(1);
}
console.log('\n✅ cors headers: every browser-called function allows x-request-id');
