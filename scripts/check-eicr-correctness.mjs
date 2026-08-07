/**
 * EICR correctness guard.
 *
 * Every assertion here exists because the thing it checks was already broken in
 * production, shipped, and survived for months — not because it seemed like a
 * good idea. If you are tempted to delete one, read the note above it first.
 *
 * Runs in the repo's own idiom: a standalone `check:*` script, no test runner,
 * no new dependencies. It bundles the real source with esbuild (already a
 * dependency) so it exercises the actual validators and formatter rather than a
 * reimplementation of them — a test that reimplements the rule cannot catch the
 * rule being wrong.
 *
 *   npm run check:eicr            # human output
 *   npm run check:eicr:ci         # exits 1 on any failure
 */
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const CI = process.argv.includes('--ci');
const failures = [];
const passes = [];

const check = (name, fn) => {
  try {
    const problem = fn();
    if (problem) failures.push(`${name}\n      ${problem}`);
    else passes.push(name);
  } catch (err) {
    failures.push(`${name}\n      threw: ${err.message}`);
  }
};

/* ── Load the real modules ──────────────────────────────────────────────────
 * The Supabase client is stubbed: the formatter reaches out for defect photos,
 * which is irrelevant to whether it drops fields and would make this script
 * depend on the network.
 */
const tmp = mkdtempSync(join(tmpdir(), 'eicr-check-'));
const reactStub = join(tmp, 'react-stub.ts');
writeFileSync(
  reactStub,
  // useEICRValidation is a hook, but the only hook it uses is useMemo — so the
  // gate can be exercised directly without a renderer. If it ever gains
  // useState or useEffect this stub will throw rather than lie.
  `export const useMemo = (fn: any) => fn();
   export const useState = () => { throw new Error('useState in the gate — this stub is no longer safe'); };
   export const useEffect = () => { throw new Error('useEffect in the gate — this stub is no longer safe'); };
   export default { useMemo, useState, useEffect };`
);

const stub = join(tmp, 'supabase-stub.ts');
writeFileSync(
  stub,
  `const make = () => new Proxy(function () {}, {
     get(_t, p) {
       if (p === 'then') return (r) => Promise.resolve({ data: [], error: null }).then(r);
       if (p === 'data') return [];
       if (p === 'error') return null;
       return () => make();
     },
     apply: () => make(),
   });
   export const supabase = make();
   export default supabase;`
);

const entry = join(tmp, 'entry.ts');
writeFileSync(
  entry,
  `export { checkRegulationCompliance } from '@/utils/regulationChecker';
   export { checkZsCompliance } from '@/utils/regulationChecker/zsValidator';
   export { formatEICRJson } from '@/utils/eicrJsonFormatter';
   export { useEICRValidation } from '@/hooks/useEICRValidation';`
);

const out = join(tmp, 'bundle.mjs');
await build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: out,
  logLevel: 'silent',
  alias: { '@/integrations/supabase/client': stub, react: reactStub, '@': './src' },
});
const { checkRegulationCompliance, checkZsCompliance, formatEICRJson, useEICRValidation } =
  await import(pathToFileURL(out).href);

/** The issue gate, for a certificate that is otherwise complete. */
const COMPLETE_CERT = {
  clientName: 'A Client',
  installationAddress: '1 Test Street',
  inspectionDate: '2026-08-07',
  supplyVoltage: '230',
  phases: '1',
  earthingArrangement: 'TN-C-S',
  mainProtectiveDevice: '100A BS 88-3',
  inspectorName: 'An Inspector',
  inspectorQualifications: 'C&G 2391',
  inspectorSignature: 'data:image/png;base64,AAAA',
  overallAssessment: 'unsatisfactory',
  nextInspectionDate: '2031-08-07',
  bondingCompliance: 'satisfactory',
  // A certificate is not complete without something inspected and something
  // tested. The first draft of this fixture omitted both, which made the "does
  // a complete cert pass" check fail — and quietly made the C1 check pass for
  // the wrong reason, since any error at all satisfied it.
  inspectionItems: [{ id: 'i1', item: 'Consumer unit condition', outcome: 'satisfactory' }],
  scheduleOfTests: [
    {
      id: 'c1',
      circuitNumber: '1',
      circuitDesignation: '1',
      circuitDescription: 'Lighting',
      bsStandard: 'RCBO (BS EN 61009)',
      protectiveDeviceCurve: 'B',
      protectiveDeviceRating: '6',
      rcdRating: '30',
      liveSize: '1.5',
      cpcSize: '1.0',
      referenceMethod: 'C',
      typeOfWiring: 'A',
      zs: '0.8',
      r1r2: '0.4',
      insulationLiveNeutral: '299',
      insulationLiveEarth: '299',
      insulationTestVoltage: '500',
      polarity: '✓',
      rcdOneX: '28',
    },
  ],
};
const gate = (over = {}) => useEICRValidation({ ...COMPLETE_CERT, ...over });
const blocks = (over, re) => gate(over).errors.some((e) => re.test(e.message));
const warns = (over, re) => gate(over).warnings.some((w) => re.test(w.message));

const circuit = (o) => ({
  id: 'x',
  circuitNumber: '1',
  circuitDesignation: '1',
  boardId: 'main',
  ...o,
});
const titles = (c, earthing = 'TN-C-S', basis) =>
  checkRegulationCompliance(c, earthing, basis).warnings.map((w) => w.title);
const text = (c, earthing = 'TN-C-S') =>
  checkRegulationCompliance(c, earthing).warnings
    .map((w) => `${w.title} ${w.description} ${w.suggestion ?? ''}`)
    .join(' ');

/* ── 1. Limitation markers must never be judged as values ───────────────────
 * Shipped bug: `parseInt('N/A')` is NaN, and every comparison in
 * circuitTypeValidator is `!==` or `<` — both true for NaN. Electricians were
 * shown "Ring final circuits typically use 32A protection, but NaNA is
 * specified" on circuits they had deliberately marked not-applicable.
 */
const MARKERS = ['N/A', 'n/a', 'LIM', 'NV', '—', '-'];
const NUMERIC_FIELDS = [
  'protectiveDeviceRating',
  'liveSize',
  'cpcSize',
  'zs',
  'r1r2',
  'rcdRating',
  'maxZs',
];
check('limitation markers never produce NaN or are quoted back as a value', () => {
  const bad = [];
  for (const field of NUMERIC_FIELDS) {
    for (const marker of MARKERS) {
      const t = text(
        circuit({
          circuitDescription: 'Socket outlets',
          bsStandard: 'MCB (BS EN 60898)',
          protectiveDeviceCurve: 'B',
          [field]: marker,
        })
      );
      if (/NaN|undefined/.test(t)) bad.push(`${field}="${marker}" produced NaN/undefined`);
      if (new RegExp(`but ${marker.replace(/[-—]/g, '.')}\\b`, 'i').test(t))
        bad.push(`${field}="${marker}" quoted the marker back as a value`);
    }
  }
  return bad.length ? bad.slice(0, 3).join('; ') : null;
});

/* ── 2. A4:2026 Reg 411.3.4 — lighting circuits need a 30 mA RCD ────────────
 * Was entirely absent. Domestic lighting is the second-commonest circuit type
 * on an EICR and nothing raised it, in any phrasing.
 */
check('Reg 411.3.4 — a domestic lighting circuit with no RCD is raised', () => {
  const missed = ['Lighting', 'Downstairs lighting', 'Kitchen lights', 'Luminaires'].filter(
    (d) =>
      !titles(
        circuit({
          circuitDescription: d,
          protectiveDeviceRating: '6',
          bsStandard: 'MCB (BS EN 60898)',
          protectiveDeviceCurve: 'B',
        })
      ).some((t) => /Lighting Circuit Without RCD/.test(t))
  );
  return missed.length ? `not raised for: ${missed.join(', ')}` : null;
});

check('Reg 411.3.4 does not fire on emergency lighting or an RCD-protected circuit', () => {
  const wrong = [];
  const fires = (o) =>
    titles(
      circuit({
        protectiveDeviceRating: '6',
        bsStandard: 'MCB (BS EN 60898)',
        protectiveDeviceCurve: 'B',
        ...o,
      })
    ).some((t) => /Lighting Circuit Without RCD/.test(t));
  // Emergency lighting is a safety service and is often intentionally not RCD'd.
  if (fires({ circuitDescription: 'Emergency lighting' })) wrong.push('emergency lighting');
  if (fires({ circuitDescription: 'Lighting', rcdRating: '30' })) wrong.push('RCD already recorded');
  if (fires({ circuitDescription: 'Cooker' })) wrong.push('cooker');
  return wrong.length ? `false positive on: ${wrong.join(', ')}` : null;
});

/* ── 2b. RCD findings must not depend on a Zs reading ───────────────────────
 * Shipped bug, found by this script's own first run: every RCD check lived
 * below `if (!result.zs) return warnings;` inside checkZsCompliance, so a
 * circuit with no loop reading produced no RCD finding at all — including the
 * TT case, which is a critical. On an EICR that is backwards: an untested
 * circuit is exactly when you are recording what is installed.
 */
check('RCD findings are raised on a circuit with no Zs recorded', () => {
  const base = {
    bsStandard: 'MCB (BS EN 60898)',
    protectiveDeviceCurve: 'B',
    protectiveDeviceRating: '32',
  };
  const missing = [];
  if (
    !titles(circuit({ ...base, circuitDescription: 'Socket outlets' })).includes(
      'RCD Protection Required'
    )
  )
    missing.push('sockets (411.3.3)');
  if (
    !checkRegulationCompliance(circuit({ ...base, circuitDescription: 'Socket outlets' }), 'TT')
      .warnings.map((w) => w.title)
      .includes('TT System Requires RCD Protection')
  )
    missing.push('TT (411.5.2, critical)');
  return missing.length ? `no RCD finding without a Zs reading for: ${missing.join(', ')}` : null;
});

check('no finding is reported twice for the same circuit', () => {
  const dupes = [];
  for (const earthing of ['TN-C-S', 'TT']) {
    for (const zs of ['0.8', '']) {
      const t = checkRegulationCompliance(
        circuit({
          circuitDescription: 'Socket outlets',
          bsStandard: 'MCB (BS EN 60898)',
          protectiveDeviceCurve: 'B',
          protectiveDeviceRating: '32',
          zs,
        }),
        earthing
      ).warnings.map((w) => w.title);
      const d = t.filter((x, i) => t.indexOf(x) !== i);
      if (d.length) dupes.push(`${earthing}/zs="${zs}": ${[...new Set(d)].join(', ')}`);
    }
  }
  return dupes.length ? dupes.join(' | ') : null;
});

/* ── 3. Zs basis — Reg 411.4.4's 0.8 correction ─────────────────────────────
 * The toggle must change the verdict, not the wording. 32 A Type B tabulates at
 * 1.37 Ω, so 0.8 × = 1.096 Ω: a 1.10 Ω reading passes at 100% and fails at 80%.
 * If this ever stops discriminating, the toggle has silently become decorative.
 */
check('Zs 80% basis fails a reading that passes at 100%', () => {
  const c = circuit({
    circuitDescription: 'Socket outlets',
    bsStandard: 'MCB (BS EN 60898)',
    protectiveDeviceCurve: 'B',
    protectiveDeviceRating: '32',
    zs: '1.10',
  });
  const at100 = checkZsCompliance(c, 'TN-C-S', 100).some((w) => /Exceeds/.test(w.title));
  const at80 = checkZsCompliance(c, 'TN-C-S', 80).some((w) => /Exceeds/.test(w.title));
  if (at100) return '1.10 Ω should pass at the 100% basis but failed';
  if (!at80) return '1.10 Ω should fail at the 80% basis but passed';
  return null;
});

/* ── 4. The formatter must not drop what was typed ──────────────────────────
 * Shipped bug class: the R₂ column bound to `ringContinuityLive` while the
 * formatter read `r2`, so 1,918 circuits printed a blank R₂. A field reaching
 * the form and not the payload is invisible until someone reads a PDF.
 */
const PROBES = {
  clientName: 'PROBE_clientName',
  installationAddress: 'PROBE_installationAddress',
  inspectorName: 'PROBE_inspectorName',
  inspectorSignature: 'PROBE_inspectorSignature',
  registrationNumber: 'PROBE_registrationNumber',
  insuranceProvider: 'PROBE_insuranceProvider',
  additionalComments: 'PROBE_additionalComments',
  overallAssessment: 'satisfactory',
};
const probePayload = await formatEICRJson(
  {
    ...PROBES,
    earthingArrangement: 'TN-C-S',
    inspectionDate: '2026-08-07',
    scheduleOfTests: [
      {
        id: '1',
        circuitNumber: '1',
        circuitDesignation: '1',
        circuitDescription: 'PROBE_circuitDescription',
        zs: '0.42',
        r2: 'PROBE_r2',
        functionalTesting: '✓',
      },
    ],
    defectObservations: [
      { item: 'PROBE_obsItem', defectCode: 'C2', description: 'PROBE_obsDescription' },
    ],
  },
  'EICR-PROBE'
);
const payloadJson = JSON.stringify(probePayload);

check('every probed form field reaches the PDF payload', () => {
  const dropped = [
    ...Object.entries(PROBES)
      .filter(([, v]) => v.startsWith('PROBE_'))
      .map(([k, v]) => [k, v]),
    ['circuitDescription', 'PROBE_circuitDescription'],
    ['r2', 'PROBE_r2'],
    ['observation.item', 'PROBE_obsItem'],
    ['observation.description', 'PROBE_obsDescription'],
  ]
    .filter(([, v]) => !payloadJson.includes(v))
    .map(([k]) => k);
  return dropped.length ? `never reached the payload: ${dropped.join(', ')}` : null;
});

/* ── 5. Template ↔ payload contract for the schedule ────────────────────────
 * The other half of the R₂ bug: the template asking for a field the payload
 * never sends prints a blank column, and nothing anywhere reports it.
 */
const TEMPLATE = 'docs/templates/eicr-certificate-template.html';
check('template asks for no circuit field the payload does not send', () => {
  let html;
  try {
    html = readFileSync(TEMPLATE, 'utf8');
  } catch {
    return `${TEMPLATE} is missing — the field map tells people to paste it into PDFMonkey`;
  }
  const loop = html.indexOf('{% for circuit in board.circuits');
  if (loop === -1) return 'no `{% for circuit in board.circuits %}` loop found';
  const wanted = [
    ...new Set([...html.slice(loop, loop + 6000).matchAll(/\{\{\s*circuit\.([a-z0-9_]+)/g)].map((m) => m[1])),
  ];
  const board = probePayload?.boards_with_schedules?.[0];
  const sent = new Set(Object.keys(board?.circuits?.[0] ?? {}));
  if (!sent.size) return 'payload sent no circuits to compare against';
  const absent = wanted.filter((f) => !sent.has(f));
  return absent.length ? `template renders but payload omits: ${absent.join(', ')}` : null;
});

/* ── 6. Functional testing prints ───────────────────────────────────────────
 * It was a live grid column with its own bulk "Fill all" action, reached the
 * payload, and the template rendered it nowhere.
 */
check('the functional testing column is printed', () => {
  let html;
  try {
    html = readFileSync(TEMPLATE, 'utf8');
  } catch {
    return `${TEMPLATE} is missing`;
  }
  return html.includes('circuit.functional_testing')
    ? null
    : 'template never renders circuit.functional_testing';
});

/* ── 7. Schedule table geometry ─────────────────────────────────────────────
 * Adding a column to one row and not the others silently shears every cell
 * after it — the readings print under the wrong headings, which is worse than
 * not printing at all.
 */
check('printed schedule header and body column counts agree', () => {
  let html;
  try {
    html = readFileSync(TEMPLATE, 'utf8');
  } catch {
    return `${TEMPLATE} is missing`;
  }
  const loop = html.indexOf('{% for circuit in board.circuits');
  const thead = html.lastIndexOf('<thead', loop);
  const rows = [...html.slice(thead, loop).matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  if (rows.length < 2) return 'could not find the two-row schedule header';
  const width = (r) =>
    [...r.matchAll(/<th([^>]*)>/g)].reduce((n, m) => {
      const c = /colspan="(\d+)"/.exec(m[1]);
      return n + (c ? Number(c[1]) : 1);
    }, 0);
  const carried = [...rows[0].matchAll(/<th([^>]*)>/g)].filter((m) =>
    /rowspan="2"/.test(m[1])
  ).length;
  const bodyRow = /<tr[^>]*>([\s\S]*?)<\/tr>/.exec(html.slice(loop, loop + 8000));
  const cells = bodyRow
    ? [...bodyRow[1].matchAll(/<td([^>]*)>/g)].reduce((n, m) => {
        const c = /colspan="(\d+)"/.exec(m[1]);
        return n + (c ? Number(c[1]) : 1);
      }, 0)
    : 0;
  const head = width(rows[0]);
  if (width(rows[1]) + carried !== head)
    return `header rows disagree: ${head} vs ${width(rows[1])} + ${carried} carried`;
  if (cells !== head) return `body has ${cells} cells, header has ${head} columns`;
  return null;
});


/* ═══ The issue gate ═══════════════════════════════════════════════════════
 * Everything past this point is about the moment a finding becomes a document
 * someone puts their name to.
 */

/* ── 8. A complete certificate must not be blocked ──────────────────────────
 * The control that fires on everything teaches people to click through it.
 */
check('a complete certificate raises no blocking errors', () => {
  const errs = gate().errors.map((e) => e.message);
  return errs.length ? `blocked a complete cert: ${errs.join(', ')}` : null;
});

/* ── 9. C1 or C2 forces an unsatisfactory assessment ────────────────────────
 * BS 7671 Appendix 6. A "satisfactory" EICR carrying a C1 is a document that
 * says the installation is safe while listing a danger present on it.
 */
check('C1/C2 anywhere blocks a "satisfactory" assessment', () => {
  const missed = [];
  for (const code of ['C1', 'C2']) {
    if (
      !blocks(
        {
          overallAssessment: 'satisfactory',
          defectObservations: [
            { item: 'Exposed live part', defectCode: code, description: 'd', recommendation: 'r' },
          ],
        },
        /must be Unsatisfactory/i
      )
    )
      missed.push(`${code} in observations`);
  }
  // C3 is "improvement recommended" and does NOT force unsatisfactory.
  if (
    blocks(
      {
        overallAssessment: 'satisfactory',
        defectObservations: [
          { item: 'No RCD on lighting', defectCode: 'C3', description: 'd', recommendation: 'r' },
        ],
      },
      /must be Unsatisfactory/i
    )
  )
    missed.push('C3 wrongly forced unsatisfactory');
  return missed.length ? missed.join('; ') : null;
});

/* ── 10. A coded observation must actually say something ────────────────────
 * Observations used to arrive pre-filled with boilerplate, which satisfied the
 * C1 wording check vacuously — the gate passed on text nobody wrote.
 */
check('a fully-worded C1 on an unsatisfactory certificate issues normally', () => {
  const errs = gate({
    overallAssessment: 'unsatisfactory',
    defectObservations: [
      {
        id: 'o1',
        item: 'Exposed live conductor at consumer unit',
        defectCode: 'C1',
        description: 'Cover missing, live busbar accessible',
        recommendation: 'Isolate and fit cover immediately',
      },
    ],
  }).errors.map((e) => e.message);
  // A C1 belongs on a signed certificate — it is what makes the report
  // unsatisfactory. Only a C1 with no wording is stopped.
  return errs.length ? `a properly recorded C1 was blocked: ${errs.join(', ')}` : null;
});

check('a C1 with no wording is blocked; C2/C3/FI are warned, not blocked', () => {
  const problems = [];
  const obs = (code) => ({
    defectObservations: [{ item: 'Something', defectCode: code, description: '', recommendation: '' }],
  });
  if (!gate(obs('C1')).errors.length) problems.push('C1 with no description was not blocked');
  for (const code of ['C2', 'C3', 'FI']) {
    const g = gate(obs(code));
    const named = [...g.errors, ...g.warnings].some((x) => new RegExp(code).test(x.message));
    if (!named) problems.push(`${code} with no description was neither warned nor blocked`);
  }
  return problems.length ? problems.join('; ') : null;
});

/* ── 11. Credentials that had lapsed on the day of the inspection ───────────
 * Judged against the inspection date, not today: writing a certificate up a
 * fortnight after the visit is normal, and the question is whether the cover
 * was in force when the work was done.
 */
check('registration/insurance lapsed at the inspection date blocks issue', () => {
  const problems = [];
  if (!blocks({ registrationExpiry: '2019-01-01' }, /registration had expired/i))
    problems.push('lapsed registration did not block');
  if (!blocks({ insuranceExpiry: '2019-01-01' }, /Insurance had expired/i))
    problems.push('lapsed insurance did not block');
  // In force on the day, and expiring later — neither is a finding.
  if (blocks({ registrationExpiry: '2027-01-01' }, /expired/i))
    problems.push('in-force registration was wrongly blocked');
  // No inspection date means nothing to judge against — must not guess.
  if (blocks({ inspectionDate: '', registrationExpiry: '2019-01-01' }, /expired/i))
    problems.push('judged an expiry with no inspection date to compare against');
  return problems.length ? problems.join('; ') : null;
});

/* ── 12. An undeliverable email warns, never blocks ─────────────────────────
 * A certificate handed over on paper is valid, and an empty email field is
 * normal. What is not normal is typing an address, issuing, and believing it
 * was delivered.
 */
check('a malformed client email warns but does not block', () => {
  const bad = { clientEmail: 'definitely!not@an@email' };
  if (blocks(bad, /email/i)) return 'a bad email blocked issue — it should only warn';
  if (!warns(bad, /will not receive/i)) return 'a bad email produced no warning at all';
  if (warns({ clientEmail: 'real@example.com' }, /will not receive/i))
    return 'a valid address was flagged';
  if (warns({ clientEmail: '' }, /will not receive/i)) return 'an empty email field was nagged';
  return null;
});

/* ── 13. The gate's warnings must reach a surface ───────────────────────────
 * Seven advisory checks were computed and rendered nowhere for months, because
 * the pre-issue sheet read `errors` only. A warning nobody sees is not a check.
 */
check('advisory warnings are produced and are distinct from blocking errors', () => {
  // A partially-tested board, not an untested one: with NO readings anywhere the
  // gate blocks outright, which is right and is a different check.
  const g = gate({
    scheduleOfTests: [
      ...COMPLETE_CERT.scheduleOfTests,
      { id: 'c2', circuitNumber: '2', circuitDesignation: '2', circuitDescription: 'Sockets' },
    ],
  });
  if (!g.warnings.length)
    return 'a partially-tested board produced no advisory warning';
  const overlap = g.warnings.filter((w) => g.errors.some((e) => e.message === w.message));
  if (overlap.length) return `the same message is both blocking and advisory: ${overlap[0].message}`;
  const untabbed = g.warnings.filter((w) => !w.tab);
  return untabbed.length
    ? `warning has no tab, so the checklist cannot say where to go: "${untabbed[0].message}"`
    : null;
});

/* ── 14. Observations reach the certificate ─────────────────────────────────
 * The whole point of the flow: a finding an electrician raised must appear on
 * the document, with its code and its wording intact.
 */
check('an observation and its code reach the PDF payload', () => {
  const missing = [];
  const json = JSON.stringify(probePayload);
  if (!json.includes('PROBE_obsItem')) missing.push('item');
  if (!json.includes('PROBE_obsDescription')) missing.push('description');
  if (!json.includes('C2')) missing.push('defect code');
  return missing.length ? `observation lost on the way to the payload: ${missing.join(', ')}` : null;
});

/* ── 15. The template renders observations ──────────────────────────────────
 * The payload carrying them is only half of it.
 */
check('the template renders observation item, code and description', () => {
  let html;
  try {
    html = readFileSync(TEMPLATE, 'utf8');
  } catch {
    return `${TEMPLATE} is missing`;
  }
  const absent = ['observation.item', 'observation.defect_code', 'observation.description'].filter(
    (f) => !html.includes(f)
  );
  return absent.length ? `template never renders: ${absent.join(', ')}` : null;
});


/* ── 16. The blank-overwrite guards must agree ─────────────────────────────
 * There are two: `isNearEmpty` in useReportSync, and the database trigger
 * `prevent_blank_report_overwrite`. The trigger is not in this repo — it was
 * applied straight to the database — so it cannot be diffed automatically.
 *
 * They disagreed. The client used `scheduleOfTests === 0` while the trigger
 * uses `<= 1`, so a payload with exactly one schedule row and no boards passed
 * the client and was rejected by Postgres with P0001. That is a 400 on every
 * autosave, for ever, in the most ordinary state there is — a fresh or
 * remounted session holding one blank circuit row.
 *
 * This pins the client to the trigger's thresholds. If it fails, the client was
 * edited: change the trigger to match, or change it back.
 *
 *   Trigger (as deployed): empty-ish = scheduleOfTests <= 1
 *                                      AND circuits = 0 AND boards = 0
 */
check('the client blank-overwrite guard matches the database trigger', () => {
  const src = readFileSync('src/hooks/useReportSync.ts', 'utf8');
  const start = src.indexOf('function isNearEmpty');
  if (start === -1) return 'isNearEmpty has gone — the client-side guard is missing';
  const body = src.slice(start, src.indexOf('\n}', start));
  const dflt = body.slice(body.indexOf('default:'));
  const expected = [
    [/\(data\.circuits\?\.length \?\? 0\) === 0/, 'circuits === 0'],
    [/\(data\.scheduleOfTests\?\.length \?\? 0\) <= 1/, 'scheduleOfTests <= 1'],
    [/\(data\.distributionBoards\?\.length \?\? 0\) === 0/, 'distributionBoards === 0'],
  ];
  const wrong = expected.filter(([re]) => !re.test(dflt)).map(([, label]) => label);
  return wrong.length
    ? `client guard no longer matches the trigger — expected ${wrong.join(', ')}`
    : null;
});

/* ── 17. A permanent rejection must not be retried ─────────────────────────
 * P0001 from that trigger can never succeed. It was retried on every tick and,
 * after five attempts, told the electrician "we'll keep trying" while their
 * device diverged from the certificate on record.
 */
check('a blank-overwrite rejection is treated as permanent, not retried', () => {
  const src = readFileSync('src/hooks/useReportSync.ts', 'utf8');
  // Assert the guard EXPRESSION, not proximity — the first mention of P0001 in
  // this file is a comment, which is what made an earlier version of this check
  // fail against correct code.
  const guarded = src
    .split('\n')
    .some((line) => /code === 'P0001'/.test(line) && /blank-overwrite/i.test(line));
  if (!guarded)
    return 'no single condition tests P0001 together with the blank-overwrite message';
  if (!/syncQueue\.complete/.test(src))
    return 'the rejected operation is never removed from the queue — it will retry for ever';
  // The Supabase error must survive to be classified — wrapping it in
  // `new Error(obj)` stringifies it to "[object Object]" and loses the code.
  if (/throw new Error\(result\.error/.test(src))
    return 'the Supabase error is stringified into new Error() — its code is lost';
  return null;
});


/* ── 18. Part 6 verification results ───────────────────────────────────────
 * The checker read 19 of the 61 fields on a circuit, so an RCD disconnecting in
 * 900 ms, a failed functional test and a 6 kA device on a 10 kA supply all
 * passed in silence. Each rule below quotes the clause it enforces.
 */
check('Part 6 verification results are judged, and only when they should be', () => {
  const ring = {
    circuitDescription: 'Kitchen ring final',
    bsStandard: 'RCBO (BS EN 61009)',
    protectiveDeviceCurve: 'B',
    protectiveDeviceRating: '32',
    rcdRating: '30',
    liveSize: '2.5',
    cpcSize: '1.5',
    referenceMethod: 'C',
    typeOfWiring: 'A',
    zs: '0.42',
  };
  const fires = (over, re) => titles(circuit({ ...ring, ...over })).some((t) => re.test(t));
  const cases = [
    // 643.8 — general non-delay RCD, 300 ms at IΔn
    ['RCD over 300ms flagged', fires({ rcdOneX: '900' }, /Disconnection Time Too Long/)],
    ['RCD within 300ms silent', !fires({ rcdOneX: '28' }, /Disconnection Time Too Long/)],
    // S-type delays on purpose; the standard states the limit for non-delay type
    ['S-type not judged', !fires({ rcdOneX: '900', rcdType: 'S' }, /Disconnection Time Too Long/)],
    // 643.10 functional testing
    ['functional failure flagged', fires({ functionalTesting: '✗' }, /Functional Test Failed/)],
    ['functional pass silent', !fires({ functionalTesting: '✓' }, /Functional Test Failed/)],
    // 432.1 breaking capacity vs prospective fault current
    ['pfc above kA rating flagged', fires({ pfc: '10', protectiveDeviceKaRating: '6' }, /Breaking Capacity/)],
    ['pfc below kA rating silent', !fires({ pfc: '3', protectiveDeviceKaRating: '6' }, /Breaking Capacity/)],
    // 643.3.1(b) — the line-to-earth reading, which was never inspected
    ['L-E insulation judged', fires({ insulationLiveEarth: '0.4', insulationTestVoltage: '500' }, /earth Insulation Below/)],
    ['healthy L-E silent', !fires({ insulationLiveEarth: '299', insulationTestVoltage: '500' }, /earth Insulation/)],
    // 643.2.1(b) ring continuity — GN3 arithmetic, labelled as such
    ['mismatched ring legs flagged', fires({ ringR1: '0.4', ringRn: '0.9' }, /Legs Do Not Match/)],
    ['matched ring legs silent', !fires({ ringR1: '0.4', ringRn: '0.41' }, /Legs Do Not Match/)],
    // limitation markers must never be judged as readings
    ['N/A never judged', !fires({ rcdOneX: 'N/A', pfc: 'N/A', functionalTesting: 'N/A' }, /Disconnection|Breaking|Functional/)],
  ];
  const failed = cases.filter(([, ok]) => !ok).map(([name]) => name);
  return failed.length ? failed.join('; ') : null;
});


/* ── 19. Standard twin and earth is not a finding ──────────────────────────
 * A 2.5/1.5 ring is the ring final of nearly every house in the country. The
 * ring branch used to warn on all of them, and told the electrician to "verify
 * (R1+R2) ≤ 1.67Ω" — 1.67 is the r2/r1 RATIO for 2.5/1.5, not a resistance
 * limit; R1+R2 in ohms depends on the length of the circuit.
 *
 * A check that fires on the commonest correct installation teaches people to
 * ignore the column it fires in.
 */
check('standard twin-and-earth ring CPCs are not flagged', () => {
  const ring = (liveSize, cpcSize) =>
    titles(
      circuit({
        circuitDescription: 'Kitchen ring final',
        bsStandard: 'RCBO (BS EN 61009)',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        rcdRating: '30',
        referenceMethod: 'C',
        typeOfWiring: 'A',
        zs: '0.42',
        liveSize,
        cpcSize,
      })
    ).some((t) => /Ring CPC|Ring Circuit CPC/.test(t));

  const wrong = [];
  // BS 6004 flat twin and earth pairings — all normal, none a finding
  for (const [live, cpc] of [['2.5', '1.5'], ['4', '1.5'], ['6', '2.5'], ['10', '4']])
    if (ring(live, cpc)) wrong.push(`${live}/${cpc} flagged but is standard cable`);
  // genuinely undersized against the standard pairing
  if (!ring('2.5', '1.0')) wrong.push('2.5/1.0 not flagged');
  if (!ring('6', '1.5')) wrong.push('6/1.5 not flagged');

  // Strip comments first: the fix's own note quotes the old wording to explain
  // why it went, and an earlier version of this check matched that quotation
  // and failed against correct code. Assert on the code, not the prose.
  const code = readFileSync('src/utils/regulationChecker/earthingValidator.ts', 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  if (/R1\+R2\)\s*≤\s*1\.67Ω/.test(code)) wrong.push('the 1.67Ω resistance claim is back');

  return wrong.length ? wrong.join('; ') : null;
});


/* ── 20. Phase sequence, and the maximum Zs that gets printed ──────────────
 * `maxZs` is Column 12 — it appears on the certificate. Nothing compared it to
 * the published figure for the device beside it, so a mistyped limit reached a
 * signed document and every later reader judged the measured Zs against the
 * wrong number.
 */
check('recorded maxZs is checked against the device, on both bases', () => {
  const base = {
    circuitDescription: 'Socket outlets',
    bsStandard: 'MCB (BS EN 60898)',
    protectiveDeviceCurve: 'B',
    protectiveDeviceRating: '32',
    rcdRating: '30',
    liveSize: '2.5',
    cpcSize: '1.5',
    referenceMethod: 'C',
    typeOfWiring: 'A',
    zs: '0.42',
  };
  const fires = (over) =>
    titles(circuit({ ...base, ...over })).some((t) => /Recorded Maximum Zs/.test(t));
  const wrong = [];
  // 32 A Type B tabulates at 1.37 Ω; 0.8 x that is 1.10 Ω. Both are legitimate
  // things for an electrician to write down — flagging the 0.8 basis would
  // punish someone for applying Reg 411.4.4 correctly.
  if (fires({ maxZs: '1.37' })) wrong.push('tabulated value flagged');
  if (fires({ maxZs: '1.10' })) wrong.push('0.8-basis value flagged');
  if (!fires({ maxZs: '2.40' })) wrong.push('a wrong limit was not flagged');
  if (fires({ maxZs: 'N/A' })) wrong.push('a limitation marker was judged');
  return wrong.length ? wrong.join('; ') : null;
});

check('phase sequence is judged on three-phase circuits only', () => {
  const base = {
    circuitDescription: 'Three-phase supply',
    bsStandard: 'MCB (BS EN 60898)',
    protectiveDeviceCurve: 'B',
    protectiveDeviceRating: '32',
    liveSize: '2.5',
    cpcSize: '1.5',
    zs: '0.42',
  };
  const fires = (over) =>
    titles(circuit({ ...base, ...over })).some((t) => /Phase Sequence/.test(t));
  const wrong = [];
  if (!fires({ phaseType: '3P', phaseRotation: 'reversed' })) wrong.push('3P reversal not flagged');
  if (fires({ phaseType: '3P', phaseRotation: 'L1-L2-L3' })) wrong.push('correct sequence flagged');
  // 643.9 applies to polyphase circuits — a single-phase row has no sequence
  if (fires({ phaseType: '1P', phaseRotation: 'reversed' })) wrong.push('judged a 1P circuit');
  return wrong.length ? wrong.join('; ') : null;
});

rmSync(tmp, { recursive: true, force: true });

/* ── Report ─────────────────────────────────────────────────────────────── */
console.log('\nEICR correctness\n');
for (const p of passes) console.log(`  ok    ${p}`);
for (const f of failures) console.log(`  FAIL  ${f}`);
console.log(`\n  ${passes.length} passed, ${failures.length} failed\n`);
if (failures.length && CI) process.exit(1);
