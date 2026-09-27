#!/usr/bin/env node
/**
 * The client guard and the database trigger must agree, key for key.
 *
 * The blank-overwrite protection lives in two places on purpose: the client
 * (`useReportSync` — refuses before the request leaves the device) and the
 * database (`prevent_blank_report_overwrite` — refuses whatever arrives). If
 * their body-array tables drift, one of two things happens: the client lets a
 * payload through that the trigger rejects, and every autosave 400s for ever;
 * or the trigger lets through what the client would have blocked, and the
 * server-side guard is silently blind for that type — which is exactly how 21
 * of 24 types went unprotected until 27 Sep 2026.
 *
 * So this parses both — the TypeScript table and the migration's CASE — and
 * fails on any difference in types, keys, or key order. The identity fields
 * and the EICR thresholds are checked the same way.
 */
import { readFileSync, readdirSync } from 'fs';

const CLIENT = 'src/hooks/useReportSync.ts';
const migration = readdirSync('supabase/migrations')
  .filter((f) => f.includes('type_aware_blank_overwrite_guard'))
  .sort()
  .pop();
if (!migration) {
  console.error('✗ blank-overwrite parity: no type_aware_blank_overwrite_guard migration found');
  process.exit(1);
}
const SQL = `supabase/migrations/${migration}`;

const problems = [];
const client = readFileSync(CLIENT, 'utf8');
const sql = readFileSync(SQL, 'utf8');

// ── body arrays ──
const tsBlock = client.slice(client.indexOf('const BODY_ARRAYS'), client.indexOf('\n};', client.indexOf('const BODY_ARRAYS')));
const tsMap = new Map();
for (const m of tsBlock.matchAll(/'([a-z0-9-]+)':\s*\[([^\]]*)\]/gs)) {
  tsMap.set(m[1], [...m[2].matchAll(/'([A-Za-z]+)'/g)].map((k) => k[1]));
}
const sqlMap = new Map();
for (const m of sql.matchAll(/when '([a-z0-9-]+)'\s+then array\[([^\]]*)\]/g)) {
  sqlMap.set(m[1], [...m[2].matchAll(/'([A-Za-z]+)'/g)].map((k) => k[1]));
}
for (const [type, keys] of tsMap) {
  if (!sqlMap.has(type)) problems.push(`${type}: in the client table but not the trigger — server-side guard is blind for it`);
  else if (sqlMap.get(type).join(',') !== keys.join(','))
    problems.push(`${type}: keys differ — client [${keys}] vs trigger [${sqlMap.get(type)}]`);
}
for (const type of sqlMap.keys())
  if (!tsMap.has(type)) problems.push(`${type}: in the trigger but not the client table — client would send what the server rejects`);

// ── identity fields ──
const tsIdent = [...client.slice(client.indexOf('const IDENTITY_FIELDS'), client.indexOf('];', client.indexOf('const IDENTITY_FIELDS'))).matchAll(/'([A-Za-z]+)'/g)].map((m) => m[1]);
for (const f of tsIdent)
  if (!sql.includes(`old.data->>'${f}'`) || !sql.includes(`new.data->>'${f}'`))
    problems.push(`identity field ${f} is in the client but not tested by the trigger`);

// ── EICR thresholds (must stay exactly as the original trigger had them) ──
for (const needle of ['old_sot_count >= 3', 'old_circ_count >= 3', 'old_board_count >= 2', 'new_sot_count <= 1 and new_circ_count = 0 and new_board_count = 0'])
  if (!sql.includes(needle)) problems.push(`EICR threshold "${needle}" missing from the trigger — the client default branch was written to match it`);
for (const needle of ['>= 3', '<= 1'])
  if (!client.includes(needle)) problems.push(`client EICR threshold "${needle}" missing`);

// ── the populated / near-empty rule ──
if (!sql.includes('v_old_rows >= 2 or (v_old_rows >= 1 and v_old_ident)'))
  problems.push('trigger populated rule is not "rows >= 2 or (rows >= 1 and identity)"');
if (!sql.includes('v_new_rows = 0 or (v_new_rows <= 1 and not v_new_ident)'))
  problems.push('trigger near-empty rule is not "rows = 0 or (rows <= 1 and no identity)"');
if (!client.includes('rows >= 2 || (rows >= 1 && hasIdentity(data))'))
  problems.push('client populated rule changed — update the trigger to match');
if (!client.includes('rows === 0 || (rows <= 1 && !hasIdentity(data))'))
  problems.push('client near-empty rule changed — update the trigger to match');

if (problems.length) {
  console.error('✗ blank-overwrite parity (client vs trigger):\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ blank-overwrite parity: ${tsMap.size} types, ${tsIdent.length} identity fields, EICR thresholds and the populated/near-empty rules agree between ${CLIENT} and ${migration}`);
