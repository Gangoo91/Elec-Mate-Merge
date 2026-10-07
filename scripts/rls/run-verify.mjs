#!/usr/bin/env node
/**
 * rls:verify — run the access-control suites in scripts/rls/ against the live
 * database and fail if any check fails (ELE-1914).
 *
 *   npm run rls:verify                       every scripts/rls/verify_*.sql
 *   npm run rls:verify -- verify_roles.sql   just the named file(s)
 *
 * Each suite is ONE transaction that never commits: it ends either with
 * `rollback` (after a final SELECT of the results) or by raising an exception
 * whose message starts `RESULTS:` — which aborts the transaction by itself, so
 * nothing a suite writes can survive even if the client drops the rollback.
 * Both shapes are read here; every result line must start with PASS.
 *
 * Runs through the Supabase CLI's Management API path (`db query --linked`),
 * so it needs a logged-in CLI locally or SUPABASE_ACCESS_TOKEN in CI. Where
 * neither is available it SKIPS with exit 0 (like check:fns-versioned) unless
 * RLS_VERIFY_REQUIRED=1, in which case it fails.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdirSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const execFileP = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'jtwygbeceundfgnkirof';
const required = process.env.RLS_VERIFY_REQUIRED === '1';

const args = process.argv.slice(2);
const files = (args.length ? args.map((a) => basename(a)) : readdirSync(here).filter((f) => /^verify_.*\.sql$/.test(f)).sort())
  .map((f) => resolve(here, f));

function skip(why) {
  const msg = `• rls:verify skipped — ${why}`;
  if (required) {
    console.error(msg.replace('skipped', 'FAILED (RLS_VERIFY_REQUIRED=1)'));
    process.exit(1);
  }
  console.log(msg);
  process.exit(0);
}

/** Pull "PASS | name" / "FAIL … | name" lines out of either output shape. */
function parse(out) {
  const raised = out.match(/RESULTS:([\s\S]*?)(?:\\nCONTEXT:|\nCONTEXT:|"\}|$)/);
  if (raised) {
    return raised[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const i = l.lastIndexOf(' | ');
        return i === -1 ? { result: l, check: '' } : { result: l.slice(0, i), check: l.slice(i + 3) };
      });
  }
  const start = out.indexOf('{');
  if (start === -1) return null;
  try {
    const json = JSON.parse(out.slice(start, out.lastIndexOf('}') + 1));
    if (!Array.isArray(json.rows)) return null;
    return json.rows
      .filter((r) => 'result' in r)
      .map((r) => ({ result: String(r.result), check: String(r.check_name ?? r.check ?? '') }));
  } catch {
    return null;
  }
}

let totalPass = 0;
let totalFail = 0;
const failures = [];

for (const file of files) {
  let out = '';
  try {
    const { stdout, stderr } = await execFileP(
      'npx',
      ['--yes', 'supabase', 'db', 'query', '--linked', '--project-ref', PROJECT_REF, '-o', 'json', '-f', file],
      { cwd: root, maxBuffer: 64 * 1024 * 1024, env: process.env }
    );
    out = stdout + '\n' + stderr;
  } catch (e) {
    // A RESULTS: raise exits non-zero by design.
    out = String(e.stdout ?? '') + '\n' + String(e.stderr ?? '');
    if (!/RESULTS:/.test(out)) {
      if (/access token|not logged in|Unauthorized|401|ENOENT|could not resolve|network/i.test(out)) {
        skip('could not reach Supabase (no CLI login / SUPABASE_ACCESS_TOKEN, or no network).');
      }
      console.error(`✗ ${basename(file)}: the suite did not run to the end:\n${out.slice(-1500)}`);
      totalFail++;
      failures.push({ file: basename(file), result: 'ERROR', check: 'suite crashed before RESULTS' });
      continue;
    }
  }
  const rows = parse(out);
  if (!rows || rows.length === 0) {
    console.error(`✗ ${basename(file)}: no results found in output:\n${out.slice(-1500)}`);
    totalFail++;
    failures.push({ file: basename(file), result: 'ERROR', check: 'no results' });
    continue;
  }
  const pass = rows.filter((r) => r.result.startsWith('PASS')).length;
  const fail = rows.length - pass;
  totalPass += pass;
  totalFail += fail;
  console.log(`${fail ? '✗' : '✓'} ${basename(file)}: ${pass}/${rows.length} pass`);
  for (const r of rows) if (!r.result.startsWith('PASS')) failures.push({ file: basename(file), ...r });
}

if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log(`  ${f.file}  ${f.check}\n      → ${f.result}`);
}
console.log(`\nrls:verify — ${totalPass} pass, ${totalFail} fail across ${files.length} suite(s)`);
process.exit(totalFail ? 1 : 0);
