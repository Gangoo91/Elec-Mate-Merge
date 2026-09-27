#!/usr/bin/env node
/**
 * The offline sync queue must never merge two different certificates.
 *
 * ELE-1600 made `enqueue()` replace a pending snapshot of the SAME certificate
 * instead of adding another row. The whole safety of that rests on
 * `syncIdentity()` returning equal strings only for the same certificate and
 * null whenever it cannot be sure. These are user records: a false merge loses
 * one of two certificates, silently. A missed merge costs one extra request.
 *
 * So this runs the real function, lifted out of the module with esbuild, over
 * the cases that matter, and refuses to pass if any of them could merge.
 */
import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { execFileSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const SRC = 'src/utils/syncQueue.ts';
const src = readFileSync(SRC, 'utf8');

const start = src.indexOf('export function syncIdentity');
if (start < 0) throw new Error(`${SRC}: syncIdentity is gone — this check needs updating`);
let i = src.indexOf('{', start);
for (let depth = 0; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}' && --depth === 0) break;
}
const fn = src.slice(start, i + 1);

const harness = `${fn}
const u = 'user-a', v = 'user-b';
const out = {
  // creates
  createNoIdentity:      syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{}, userId:u }),
  createOnlyAttemptKey:  syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{ __createReportId:'EICR-123-abc' }, userId:u }),
  createBlankCertId:     syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{ _clientCertId:'  ' }, userId:u }),
  createA1:              syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{ _clientCertId:'cert-1', clientName:'old' }, userId:u }),
  createA1again:         syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{ _clientCertId:'cert-1', clientName:'new' }, userId:u }),
  createA2:              syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{ _clientCertId:'cert-2' }, userId:u }),
  createA1otherUser:     syncIdentity({ type:'create', reportType:'eicr', reportId:null, data:{ _clientCertId:'cert-1' }, userId:v }),
  createA1otherType:     syncIdentity({ type:'create', reportType:'eic',  reportId:null, data:{ _clientCertId:'cert-1' }, userId:u }),
  // updates
  updateNoId:            syncIdentity({ type:'update', reportType:'eicr', reportId:null, data:{ _clientCertId:'cert-1' }, userId:u }),
  updateR1:              syncIdentity({ type:'update', reportType:'eicr', reportId:'EICR-1', data:{}, userId:u }),
  updateR1again:         syncIdentity({ type:'update', reportType:'eicr', reportId:'EICR-1', data:{ x:1 }, userId:u }),
  updateR2:              syncIdentity({ type:'update', reportType:'eicr', reportId:'EICR-2', data:{}, userId:u }),
  updateR1otherUser:     syncIdentity({ type:'update', reportType:'eicr', reportId:'EICR-1', data:{}, userId:v }),
};
console.log(JSON.stringify(out));
`;
const dir = mkdtempSync(join(tmpdir(), 'sync-identity-'));
writeFileSync(join(dir, 'h.ts'), harness);
const js = execFileSync('node', [
  '-e',
  "process.stdout.write(require('esbuild').transformSync(require('fs').readFileSync(process.argv[1],'utf8'),{loader:'ts'}).code)",
  join(dir, 'h.ts'),
]).toString();
writeFileSync(join(dir, 'h.mjs'), js);
const r = JSON.parse(execFileSync('node', [join(dir, 'h.mjs')]).toString());

const problems = [];
const mustBeNull = (k, why) => r[k] !== null && problems.push(`${k} must be null — ${why} (got ${JSON.stringify(r[k])})`);
const mustEqual = (a, b, why) => r[a] !== r[b] && problems.push(`${a} and ${b} must match — ${why}`);
const mustDiffer = (a, b, why) =>
  (r[a] === null || r[a] === r[b]) && problems.push(`${a} and ${b} must differ — ${why}`);

mustBeNull('createNoIdentity', 'a create with nothing to name it must get its own row');
mustBeNull('createOnlyAttemptKey', '__createReportId is minted per ATTEMPT when there is no _clientCertId; it is not a certificate identity');
mustBeNull('createBlankCertId', 'a whitespace _clientCertId is no identity');
mustBeNull('updateNoId', 'an update with no report_id cannot be placed');
mustEqual('createA1', 'createA1again', 'two snapshots of one new certificate are one row');
mustEqual('updateR1', 'updateR1again', 'two snapshots of one saved certificate are one row');
mustDiffer('createA1', 'createA2', 'two different new certificates from one user');
mustDiffer('createA1', 'createA1otherUser', 'same client id on two accounts is two certificates');
mustDiffer('createA1', 'createA1otherType', 'same client id, different certificate type');
mustDiffer('updateR1', 'updateR2', 'two different saved certificates');
mustDiffer('updateR1', 'updateR1otherUser', 'same report_id would be an RLS breach, but never merge on it');
mustDiffer('createA1', 'updateR1', 'a create and an update are never the same row');

// Structural: enqueue must consult the identity and replace-in-place only on a hit.
const enq = src.slice(src.indexOf('async enqueue('), src.indexOf('async getPending('));
if (!enq.includes('syncIdentity(operation)'))
  problems.push('enqueue() no longer calls syncIdentity(operation) — the dedupe is gone');
if (!/existing \? store\.put\(queueOp\) : store\.add\(queueOp\)/.test(enq))
  problems.push('enqueue() must put() over an existing row and add() otherwise');
if (!/retryCount: 0/.test(enq))
  problems.push('a replaced payload must reset retryCount — otherwise fresh data inherits an exhausted backoff');

if (problems.length) {
  console.error('✗ sync queue identity:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ sync queue identity: ${Object.keys(r).length} cases — same certificate merges, anything else never does`);
