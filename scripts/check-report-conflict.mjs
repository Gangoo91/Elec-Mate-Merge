#!/usr/bin/env node
/**
 * Safety proof for phantom-conflict auto-healing (isServerContainedInLocal).
 *
 *   npx tsx scripts/check-report-conflict.mjs
 *
 * This function decides whether a certificate save may overwrite the server
 * copy without asking the user. A wrong `true` is silent data loss on a legal
 * document, so every scenario below is enforced. The invariant it must hold:
 *
 *   returns true  ⇒  local contains every committed server value
 *                    ⇒  overwriting the server with local loses nothing
 *   returns false ⇒  play safe, show the resolution dialog
 *
 * The dangerous direction is a false positive (heal when we should not), so the
 * suite leans on the concurrent-edit cases: a QS changing a field, editing a
 * schedule row, or adding an observation must NEVER auto-heal.
 */
import { isServerContainedInLocal as contained } from '../src/utils/reportConflict.ts';

let failed = 0;
const check = (name, got, want) => {
  if (got !== want) {
    console.error(`  ✘ ${name}: expected ${want}, got ${got}`);
    failed++;
  }
};

// ── Phantom / safe-to-heal cases: expect TRUE ──────────────────────────────
check('identical data (pure lost-ack echo)', contained({ a: '1', b: '2' }, { a: '1', b: '2' }), true);
check('local superset — extra scalar field', contained({ a: '1' }, { a: '1', b: '2' }), true);
check(
  'local appended a schedule row (Craig)',
  contained(
    { scheduleOfTests: [{ id: 1, r1: '0.5' }] },
    { scheduleOfTests: [{ id: 1, r1: '0.5' }, { id: 2, r1: '0.3' }] }
  ),
  true
);
check('server key empty-ish, skipped', contained({ a: '', b: [], c: {}, d: null }, {}), true);
check('server entirely empty', contained({}, { a: '1' }), true);
check('server null', contained(null, { a: '1' }), true);
check(
  'nested object — local superset',
  contained({ company: { name: 'A' } }, { company: { name: 'A', phone: '1' } }),
  true
);
check(
  'server array is a reordered subset',
  contained({ xs: [{ id: 2 }] }, { xs: [{ id: 1 }, { id: 2 }] }),
  true
);

// ── Genuine concurrent-edit cases: expect FALSE (must show the dialog) ──────
check('QS changed a scalar field', contained({ a: '1' }, { a: '2' }), false);
check('server has a key local lacks', contained({ a: '1', b: '2' }, { a: '1' }), false);
check('local blanked a field the server has', contained({ a: '1' }, { a: '' }), false);
check(
  'QS edited an existing schedule row',
  contained(
    { scheduleOfTests: [{ id: 1, r1: '0.9' }] },
    { scheduleOfTests: [{ id: 1, r1: '0.5' }, { id: 2, r1: '0.3' }] }
  ),
  false
);
check(
  'QS added an observation the user never had',
  contained(
    { observations: [{ id: 9, code: 'C2', text: 'exposed live part' }] },
    { observations: [] }
  ),
  false
);
check(
  'nested object — server changed a nested value',
  contained({ company: { name: 'A' } }, { company: { name: 'B' } }),
  false
);
check('type mismatch — server object vs local scalar', contained({ a: { x: 1 } }, { a: '1' }), false);
check('type mismatch — server array vs local scalar', contained({ a: [1] }, { a: '1' }), false);

// ── Hard / adversarial cases ───────────────────────────────────────────────
// Craig reconstructed: his landed write (server) is a subset of what he has
// locally after appending more rows → must heal.
check(
  'Craig: server is an older subset of the full local board',
  contained(
    {
      earthingArrangement: 'TN-C-S',
      supplyVoltage: '230',
      scheduleOfTests: [{ id: 1, desc: 'Cooker' }, { id: 2, desc: 'House Sockets' }],
    },
    {
      earthingArrangement: 'TN-C-S',
      supplyVoltage: '230',
      scheduleOfTests: [
        { id: 1, desc: 'Cooker' },
        { id: 2, desc: 'House Sockets' },
        { id: 3, desc: 'Boiler' },
        { id: 4, desc: 'Smoke Detectors' },
      ],
      inspectorName: 'Craig Soper',
    }
  ),
  true
);
// The trap: a real QS edit hiding behind a local append. Local grew the array
// AND the QS changed row 1 — the changed row 1 is a server element local lacks,
// so it must NOT heal even though local is "bigger".
check(
  'mixed: QS edited row 1 while local appended row 3 → still blocks',
  contained(
    { scheduleOfTests: [{ id: 1, r1: '9.9' }, { id: 2, r1: '0.3' }] },
    { scheduleOfTests: [{ id: 1, r1: '0.5' }, { id: 2, r1: '0.3' }, { id: 3, r1: '0.7' }] }
  ),
  false
);

if (failed) {
  console.error(`\n✘ isServerContainedInLocal: ${failed} case(s) failed — DO NOT SHIP.`);
  process.exit(1);
}
console.log('✔ isServerContainedInLocal — all phantom/heal and concurrent-edit cases hold');
