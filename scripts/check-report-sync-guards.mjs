#!/usr/bin/env node
/**
 * The blank-overwrite guard must actually fire, for every certificate type.
 *
 * ── WHY THIS EXISTS ───────────────────────────────────────────────────────
 *
 * `useReportSync` refuses a write when the last known remote state was
 * populated and the outgoing payload is near-empty. That guard is the only
 * thing between a component remounting into blank form state and a finished
 * certificate. It is decided by two functions, and for most of the app's
 * lifetime those functions were not merely inaccurate for specialist types —
 * they were INVERTED:
 *
 *   isSubstantiallyPopulated('smoke-co-alarm', <cert with 21 alarms>)  false
 *   isNearEmpty            ('smoke-co-alarm', <cert with 21 alarms>)   true
 *
 * because everything outside a five-type switch fell to a `default` branch
 * counting circuits, schedule-of-test rows and distribution boards — EICR
 * fields that no smoke alarm certificate has ever had. The guard fires only on
 * populated-then-near-empty, so on those types it could never fire at all. A
 * user reported it as "I filled it out once and then when I went back into it,
 * it deleted everything I input and I had to start again."
 *
 * Reading the table is not enough to know it works: the keys have been wrong
 * before too (`fire-alarm` was checked for `devices` and `testSchedule`,
 * `solar-pv` for `panels`, none of which any saved report has ever had). So
 * this RUNS the real functions, lifted out of the hook with esbuild, against
 * shapes taken from live data.
 *
 * ⚠️ The EICR/EIC/minor-works cases are not decoration. Those thresholds must
 * keep matching `prevent_blank_report_overwrite` in the database; a payload the
 * client lets through and the trigger rejects is a 400 on every autosave for
 * ever. Do not "tidy" them to match the specialist rule.
 */
import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { execFileSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const SRC = 'src/hooks/useReportSync.ts';
const src = readFileSync(SRC, 'utf8');

/** Lift a top-level function out of the hook by brace matching. */
const fn = (signature) => {
  const start = src.indexOf(signature);
  if (start < 0) throw new Error(`${SRC}: ${signature} is gone — this check needs updating`);
  let i = src.indexOf('{', start);
  for (let depth = 0; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) break;
  }
  return src.slice(start, i + 1);
};

/** Lift a top-level const literal, up to its closing token. */
const block = (name, close) => {
  const start = src.indexOf(`const ${name}`);
  if (start < 0) throw new Error(`${SRC}: ${name} is gone — this check needs updating`);
  return src.slice(start, src.indexOf(close, start) + close.length);
};

const lifted = [
  block('BODY_ARRAYS', '\n};'),
  fn('function bodyRowCount'),
  block('IDENTITY_FIELDS', '\n];'),
  fn('function hasIdentity'),
  block('SCALAR_TELLS', '\n};'),
  fn('function hasMinimumDataForCloud'),
  fn('function isSubstantiallyPopulated'),
  fn('function isNearEmpty'),
].join('\n\n');

/*
 * Shapes taken from real rows, not from the forms' TypeScript defaults — the
 * defaults are what was wrong. `alarms`/`detectors`/`circuits` are the keys live
 * reports actually store.
 */
const CASES = [
  // [label, reportType, data, expectPopulated, expectNearEmpty]
  ['smoke-co-alarm  4 alarms + address', 'smoke-co-alarm',
    { alarms: [1, 2, 3, 4], propertyAddress: 'Rivervale Barn' }, true, false],
  ['smoke-co-alarm  blank remount', 'smoke-co-alarm',
    { alarms: [{ alarmType: '' }] }, false, true],
  ['smoke-co-alarm  deleted to 1, address kept', 'smoke-co-alarm',
    { alarms: [1], propertyAddress: 'Rivervale Barn' }, true, false],
  ['fire-alarm      5 detectors', 'fire-alarm',
    { detectors: [1, 2, 3, 4, 5], premisesAddress: '1 High St' }, true, false],
  ['fire-alarm      blank remount', 'fire-alarm',
    { detectors: [], zones: [], callPoints: [] }, false, true],
  ['pat-testing     102 appliances', 'pat-testing',
    { appliances: Array(102).fill(1), siteAddress: 'Depot' }, true, false],
  ['emergency-light 28 luminaires', 'emergency-lighting',
    { luminaires: Array(28).fill(1), premisesAddress: 'Block A' }, true, false],
  ['solar-pv        2 arrays', 'solar-pv',
    { arrays: [1, 2], inverters: [1], clientAddress: 'Roof' }, true, false],
  ['ev-charging     make + model, no rows', 'ev-charging',
    { chargerMake: 'Zappi', chargerModel: 'v2' }, true, false],
  // 🔴 EICR family — MUST stay exactly as it was; the DB trigger mirrors it.
  ['eicr            4 circuits', 'eicr',
    { circuits: [1, 2, 3, 4], scheduleOfTests: [1, 2, 3], distributionBoards: [1, 2] }, true, false],
  ['eicr            blank remount', 'eicr',
    { circuits: [], scheduleOfTests: [{}], distributionBoards: [] }, false, true],
];

const harness = `${lifted}

const CASES = ${JSON.stringify(CASES)};
const out = CASES.map(([label, type, data, wantPop, wantEmpty]) => {
  const pop = isSubstantiallyPopulated(type, data);
  const empty = isNearEmpty(type, data);
  return { label, ok: pop === wantPop && empty === wantEmpty, pop, empty, wantPop, wantEmpty };
});
// A smoke certificate with real rows must reach the cloud before an address is typed.
const cloudsWithoutAddress = hasMinimumDataForCloud('smoke-co-alarm', { alarms: [1, 2, 3, 4] });
console.log(JSON.stringify({ out, cloudsWithoutAddress }));
`;

const dir = mkdtempSync(join(tmpdir(), 'sync-guards-'));
writeFileSync(join(dir, 'h.ts'), harness);
const esbuild = execFileSync('node', [
  '-e',
  "process.stdout.write(require('esbuild').transformSync(require('fs').readFileSync(process.argv[1],'utf8'),{loader:'ts'}).code)",
  join(dir, 'h.ts'),
]).toString();
writeFileSync(join(dir, 'h.mjs'), esbuild);
const { out, cloudsWithoutAddress } = JSON.parse(
  execFileSync('node', [join(dir, 'h.mjs')]).toString()
);

const failed = out.filter((r) => !r.ok);
for (const r of failed)
  console.error(
    `  ✗ ${r.label}: populated=${r.pop} nearEmpty=${r.empty} (expected ${r.wantPop} / ${r.wantEmpty})`
  );
if (!cloudsWithoutAddress)
  console.error(
    '  ✗ a smoke certificate with 4 alarms does not pass hasMinimumDataForCloud without an address — that work would live only in the browser'
  );

if (failed.length || !cloudsWithoutAddress) {
  console.error(
    `\n✗ report sync guards: ${failed.length} case(s) wrong. The blank-overwrite guard protects\n  only what these functions call "populated". See the header of this file.`
  );
  process.exit(1);
}
console.log(
  `✓ report sync guards: ${out.length} shapes classified correctly across ${new Set(CASES.map((c) => c[1])).size} certificate types`
);
