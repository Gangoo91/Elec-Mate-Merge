#!/usr/bin/env node
/**
 * check:fns-versioned
 * ─────────────────────────────────────────────────────────────────────────────
 * Every DEPLOYED edge function must exist in this repository.
 *
 * WHY THIS EXISTS. On 20 Sep 2026 a reconciliation found **16 functions live in
 * production with no source in the repo**. Two of them are called by the app on
 * a user's behalf right now — `text-to-speech` and `scan-inspection-photo` —
 * and one is `stripe-webhook`.
 *
 * Code in that state is invisible to everything: no lint, no typecheck, no CI,
 * no code review, no git history, no blame. Nobody finds it by reading the
 * codebase, because it is not in the codebase. And a redeploy from a clean
 * checkout erases it with no way back.
 *
 * `lti-deep-link` is what it costs. It sat deployed for eight months and
 * carried an unsigned `{"alg":"none"}` JWT path that was not a fallback but the
 * ONLY path — the condition guarding the real signing branch tested a column
 * that does not exist on the table. No reviewer could have caught it. No tool
 * we run looks at code that is not here.
 *
 * The repo having MORE functions than are deployed is fine and expected — work
 * in progress, things retired from production but kept. This checks one
 * direction only: deployed ⊆ repo.
 *
 * Needs the Supabase CLI and a linked project, so it SKIPS rather than fails
 * where those are absent — a check that cannot run in a given environment must
 * not block it.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const execFileP = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fnDir = resolve(root, 'supabase/functions');
const PROJECT_REF = 'jtwygbeceundfgnkirof';

if (!existsSync(fnDir)) {
  console.log('• check:fns-versioned skipped — no supabase/functions directory.');
  process.exit(0);
}

let raw;
try {
  const { stdout } = await execFileP(
    'npx',
    ['supabase', 'functions', 'list', '--project-ref', PROJECT_REF],
    { cwd: root, maxBuffer: 32 * 1024 * 1024 }
  );
  raw = stdout;
} catch {
  console.log(
    '• check:fns-versioned skipped — could not reach Supabase (no CLI, token or network).'
  );
  process.exit(0);
}

let deployed;
try {
  deployed = JSON.parse(raw.slice(raw.indexOf('{"functions"'))).functions;
} catch {
  console.log('• check:fns-versioned skipped — unexpected CLI output.');
  process.exit(0);
}

const inRepo = new Set(readdirSync(fnDir).filter((n) => statSync(resolve(fnDir, n)).isDirectory()));
const missing = deployed
  .filter((f) => f.status === 'ACTIVE' && !inRepo.has(f.slug))
  .map((f) => `${f.slug} (v${f.version})`)
  .sort();

if (missing.length === 0) {
  console.log(
    `✔ check:fns-versioned — all ${deployed.length} deployed functions exist in the repo`
  );
  process.exit(0);
}

console.error(
  `\n✖ check:fns-versioned — ${missing.length} function(s) deployed with NO source in the repo\n`
);
for (const m of missing) console.error(`    ${m}`);
console.error(`
  Recover each with:
      npx supabase functions download <slug> --project-ref ${PROJECT_REF}

  Then read it before trusting it. The last one found this way had an unsigned
  JWT path in production that no review could ever have caught.
`);
process.exit(1);
