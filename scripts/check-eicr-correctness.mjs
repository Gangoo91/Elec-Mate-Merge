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
   export { useEICRValidation } from '@/hooks/useEICRValidation';
   export { BS3871_ZS_LIMITS, BS3871_TRIP_MULTIPLES, getBs3871ZsLimit } from '@/data/zsLimits';
   export { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
   export { getZsLimitFromDeviceString } from '@/data/zsLimits';
   export { curveFillApplies, getCurveOptionsForStandard, clearOnStandardChange, curveMatchesStandard } from '@/types/protectiveDeviceTypes';
   export { planColumnFill, describeColumnFill } from '@/utils/columnFill';
   export { hasAnyReading, hasCoreResults, READING_FIELDS } from '@/utils/testReadings';
   export { getScheduleProgress, isCircuitTested, isTestableRow } from '@/utils/scheduleProgress';
   export { printableBoardLocation, isCustomBoardLocation, BOARD_LOCATIONS } from '@/types/distributionBoard';`
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
const {
  checkRegulationCompliance,
  checkZsCompliance,
  formatEICRJson,
  useEICRValidation,
  BS3871_ZS_LIMITS,
  BS3871_TRIP_MULTIPLES,
  getBs3871ZsLimit,
  getMaxZsFromDeviceDetails,
  getZsLimitFromDeviceString,
  curveFillApplies,
  getCurveOptionsForStandard,
  clearOnStandardChange,
  curveMatchesStandard,
  planColumnFill,
  describeColumnFill,
  hasAnyReading,
  hasCoreResults,
  READING_FIELDS,
  getScheduleProgress,
  isCircuitTested,
  isTestableRow,
  printableBoardLocation,
  isCustomBoardLocation,
  BOARD_LOCATIONS,
} = await import(pathToFileURL(out).href);

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
  // A partially-tested board. Missing readings are advisory in every case now
  // (see check 13a) — this check is about warnings reaching a surface at all.
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

/* ── 13a. A missing test reading must never block issue ─────────────────────
 * Andrew, 24 Aug 2026: "I don't want this to be a blocker as some circuits
 * won't be tested." An EICR is routinely carried out with agreed limitations,
 * so a blank column is a legitimate outcome rather than unfinished work — and
 * the formatter prints every empty cell as N/A, so the document stays coherent.
 *
 * This also pins the bug that caused it. The old check looked at five fields,
 * one of which (`insulationResistance`) is the legacy consolidated field the
 * grid never writes — so a properly tested ring final with r₁/rₙ/r₂, insulation
 * L-L and an RCD time recorded counted as *untested*, and the certificate would
 * not generate.
 */
check('missing test readings warn but never block issue', () => {
  const fails = [];

  // Nothing measured anywhere — advisory, not blocking.
  const bare = [
    { id: 'c1', circuitNumber: '1', circuitDesignation: '1', circuitDescription: 'Lighting' },
  ];
  const none = gate({ scheduleOfTests: bare });
  if (none.errors.length)
    fails.push(`an untested schedule blocked: ${none.errors.map((e) => e.message).join(', ')}`);
  if (!none.warnings.some((w) => /No test readings recorded/i.test(w.message)))
    fails.push('an untested schedule produced no advisory');

  // Every column the schedule can hold a reading in must count as tested. Each
  // is checked on its own, so a field dropped from the list is caught by name.
  const columns = [
    'ringR1', 'ringRn', 'ringR2', 'r1r2', 'r2',
    'ringContinuityLive', 'ringContinuityNeutral',
    'insulationTestVoltage', 'insulationLiveNeutral', 'insulationLiveEarth',
    'insulationNeutralEarth', 'insulationResistance',
    'polarity', 'zs',
    'rcdOneX', 'rcdTestButton', 'afddTest', 'rcdHalfX', 'rcdFiveX',
    'pfc', 'functionalTesting',
  ];
  for (const field of columns) {
    const g = gate({ scheduleOfTests: [{ ...bare[0], [field]: '1' }] });
    // Both lists: on the old gate an unrecognised column produced a blocking
    // *error*, so checking warnings alone would have let it pass silently.
    if ([...g.errors, ...g.warnings].some((x) => /test readings/i.test(x.message)))
      fails.push(`a reading in "${field}" did not count as tested`);
  }

  // The real-world case that started this: ring continuity + insulation L-L +
  // RCD time recorded, Zs / polarity / L-E / R1+R2 left blank.
  const ringOnly = gate({
    scheduleOfTests: [
      { ...bare[0], ringR1: '0.5', ringRn: '0.5', ringR2: '0.8', insulationLiveNeutral: '>999', rcdOneX: '28' },
    ],
  });
  if ([...ringOnly.errors, ...ringOnly.warnings].some((x) => /test readings/i.test(x.message)))
    fails.push('a ring final tested on continuity/insulation/RCD was still called untested');

  // Spare ways and device rows (an incoming RCD, an SPD, a main switch) have
  // nothing to test — counting them only inflates the advisory.
  const withSpares = gate({
    scheduleOfTests: [
      ...COMPLETE_CERT.scheduleOfTests,
      { id: 's1', circuitNumber: '2', circuitDescription: 'Spare', isSpare: true },
      { id: 'd1', circuitNumber: '3', circuitDescription: 'Incoming RCD', isDeviceRow: true },
    ],
  });
  if (withSpares.warnings.some((w) => /test readings/i.test(w.message)))
    fails.push('a spare way or device row was counted as an untested circuit');

  // An empty schedule is a different thing and still blocks.
  if (!gate({ scheduleOfTests: [] }).errors.some((e) => /No circuits/i.test(e.message)))
    fails.push('an empty schedule of tests no longer blocks');

  return fails.length ? fails.join('; ') : null;
});

/* ── 13b. BS 3871 Max Zs must match the printed On-Site Guide table ─────────
 * ELE-1604. BS 7671 dropped the BS 3871 time/current characteristics, so
 * Table 41.3 has no row for these devices and the values in `zsLimits.ts` are
 * derived rather than transcribed. That is only safe while the derivation is
 * checkable — so it is checked here against the figures actually printed in
 * IET On-Site Guide Appendix B, Table B6(ii), read off the held PDF.
 *
 * OSG B6 prints MEASURED impedances at ambient (10 °C); we store the 70 °C
 * DESIGN figures so the app's existing 100%/80% Zs basis toggle behaves the
 * same for these devices as for BS EN 60898. The bridge between the two is the
 * OSG's 0.8 ambient factor, and all 60 cells must reconcile through it. If
 * someone "tidies" a value here, this fails and names the cell.
 */
const OSG_TABLE_B6_II = {
  // In:            5     6     10    15    16    20    25    30    32    40    45    50    60    63    100
  type1: [8.74, 7.28, 4.37, 2.91, 2.73, 2.19, 1.75, 1.46, 1.37, 1.09, 0.97, 0.87, 0.73, 0.69, 0.44],
  type2: [4.99, 4.16, 2.5, 1.66, 1.56, 1.25, 1.0, 0.83, 0.78, 0.62, 0.55, 0.5, 0.42, 0.4, 0.25],
  type3: [3.5, 2.91, 1.75, 1.17, 1.09, 0.87, 0.7, 0.58, 0.55, 0.44, 0.39, 0.35, 0.29, 0.28, 0.17],
  type4: [0.7, 0.58, 0.35, 0.23, 0.22, 0.17, 0.14, 0.12, 0.11, 0.09, 0.08, 0.07, 0.06, 0.06, 0.03],
};
const BS3871_RATINGS = [5, 6, 10, 15, 16, 20, 25, 30, 32, 40, 45, 50, 60, 63, 100];

check('BS 3871 Max Zs reconciles with the printed On-Site Guide Table B6', () => {
  const fails = [];
  const round2 = (n) => Math.round(n * 100) / 100;

  for (const [type, printed] of Object.entries(OSG_TABLE_B6_II)) {
    const k = BS3871_TRIP_MULTIPLES[type];
    if (!k) {
      fails.push(`no trip multiple recorded for ${type}`);
      continue;
    }
    BS3871_RATINGS.forEach((In, i) => {
      const stored = BS3871_ZS_LIMITS[type]?.[In];
      if (stored === undefined) {
        fails.push(`${type} ${In}A missing from BS3871_ZS_LIMITS`);
        return;
      }
      // Stored value must be the Cmin = 0.95 design figure for this multiple…
      const expected = round2((230 * 0.95) / (k * In));
      if (Math.abs(stored - expected) > 0.005)
        fails.push(`${type} ${In}A stored ${stored}, formula gives ${expected}`);
      // …and the unrounded design figure, at the OSG's 0.8 ambient factor,
      // must reproduce the printed cell exactly.
      const measured = round2(((230 * 0.95) / (k * In)) * 0.8);
      if (Math.abs(measured - printed[i]) > 0.005)
        fails.push(`${type} ${In}A → ${measured} Ω but OSG B6 prints ${printed[i]} Ω`);
    });
  }

  // The multiples themselves are the claim that matters most — a Type 1 read as
  // a Type B understates its permitted Zs by 20%.
  const expectedK = { type1: 4, type2: 7, type3: 10, type4: 50 };
  for (const [type, k] of Object.entries(expectedK))
    if (BS3871_TRIP_MULTIPLES[type] !== k)
      fails.push(`${type} trip multiple is ${BS3871_TRIP_MULTIPLES[type]}×In, should be ${k}×In`);

  return fails.length ? fails.slice(0, 4).join('; ') : null;
});

/* ── 13c. A BS 3871 device must never be judged by the Table 41.3 curves ────
 * The failure this prevents: a row whose standard says BS 3871 falling through
 * to the BS EN 60898 lookup and being handed a Type B/C/D limit. A blank Max Zs
 * is recoverable; a confidently wrong one prints on a signed certificate.
 */
check('BS 3871 rows are never given a BS EN 60898 Max Zs', () => {
  const fails = [];

  // Type 1 at 32 A is 1.71 Ω; the Type B 32 A value is 1.37 Ω. If the lookup
  // leaks, this is the number that comes back.
  const t1 = getMaxZsFromDeviceDetails('MCB (BS 3871)', '1', '32', 'Lighting');
  if (t1 !== 1.71) fails.push(`BS 3871 Type 1 32A returned ${t1}, expected 1.71`);
  if (t1 === 1.37) fails.push('BS 3871 Type 1 32A returned the Type B value — the lookup leaked');

  // Type 3 shares 10×In with Type C, so the two genuinely coincide (0.68 Ω at
  // 32 A). That is a real shared formula, not a leak — assert it stays.
  const t3 = getMaxZsFromDeviceDetails('MCB (BS 3871)', '3', '32', 'Lighting');
  const c = getMaxZsFromDeviceDetails('MCB (BS EN 60898)', 'C', '32', 'Lighting');
  if (t3 !== c) fails.push(`BS 3871 Type 3 (${t3}) and Type C (${c}) both use 10×In and must agree`);

  // Ratings that exist only in the BS 3871 series must resolve.
  for (const In of ['15', '30', '45', '60'])
    if (getMaxZsFromDeviceDetails('MCB (BS 3871)', '2', In, '') == null)
      fails.push(`BS 3871 Type 2 ${In}A has no Max Zs — the rating series is incomplete`);

  // No Type selected: refuse rather than guess which breaker it is.
  if (getMaxZsFromDeviceDetails('MCB (BS 3871)', '', '32', '') !== null)
    fails.push('a BS 3871 row with no Type returned a Max Zs — it must not guess');
  // A B/C/D curve on a BS 3871 row is a mis-selection, not a lookup key.
  if (getMaxZsFromDeviceDetails('MCB (BS 3871)', 'B', '32', '') !== null)
    fails.push('a BS 3871 row carrying curve "B" returned a value instead of refusing');

  /*
   * 🔴 The SECOND parser. `zsValidator` and `verificationValidator` do not call
   * `getMaxZsFromDeviceDetails` — they build a device STRING
   * ("MCB MCB (BS 3871) Type 1") and hand it to `getZsLimitFromDeviceString`,
   * whose MCB branch matches the word "mcb" and defaults to Type B. Guarding
   * only the first parser left every BS 3871 circuit judged against Table 41.3.
   *
   * Both directions matter, and the lenient one is the dangerous one: a Type 4
   * trips at 50x In, so its real 32 A limit is 0.14 Ω. Judged as a Type B it
   * would have been passed at up to 1.37 Ω — a circuit nearly ten times over
   * the limit, declared satisfactory.
   */
  const viaString = (s, r) => getZsLimitFromDeviceString(s, r, '')?.maxZs ?? null;
  if (viaString('MCB MCB (BS 3871) Type 1', 32) !== 1.71)
    fails.push(`validator string parser gave ${viaString('MCB MCB (BS 3871) Type 1', 32)} for BS 3871 Type 1 32A, expected 1.71`);
  if (viaString('MCB MCB (BS 3871) Type 4', 32) !== 0.14)
    fails.push(`validator string parser gave ${viaString('MCB MCB (BS 3871) Type 4', 32)} for BS 3871 Type 4 32A, expected 0.14 — a Type B verdict here passes a dangerous circuit`);
  if (viaString('MCB MCB (BS 3871)', 32) !== null)
    fails.push('validator string parser guessed a limit for a BS 3871 row with no type');
  // …and the BS EN path must be untouched by the new branch.
  if (viaString('MCB MCB (BS EN 60898) Type B', 32) !== 1.37)
    fails.push('the BS 3871 branch broke the BS EN 60898 Type B lookup');
  if (viaString('MCB MCB (BS EN 60898) Type D', 32) !== 0.34)
    fails.push('the BS 3871 branch broke the BS EN 60898 Type D lookup');

  // The Type column must offer the right vocabulary per family…
  const bs3871Values = getCurveOptionsForStandard('MCB (BS 3871)').map((o) => o.value);
  const en60898Values = getCurveOptionsForStandard('MCB (BS EN 60898)').map((o) => o.value);
  if (!['1', '2', '3', '4'].every((v) => bs3871Values.includes(v)))
    fails.push('the BS 3871 Type column does not offer Types 1–4');
  if (bs3871Values.some((v) => ['B', 'C', 'D'].includes(v)))
    fails.push('the BS 3871 Type column offers B/C/D');
  if (en60898Values.some((v) => ['1', '2', '3', '4'].includes(v)))
    fails.push('the BS EN 60898 curve column offers BS 3871 types');

  /*
   * Switching families must not leave the old Type (and its Max Zs) behind.
   *
   * 🔴 This is here because it actually happened, in this change: the rule was
   * added to the desktop cells and the two mobile surfaces were missed, so a
   * row switched from BS 3871 to BS EN 60898 kept `Type 1` and its 1.71 Ω
   * while the Type cell rendered blank — a certificate carrying a Max Zs
   * derived from a device the row no longer claims. Caught by driving the
   * mobile row in the running app, not by reading the code.
   */
  const away = clearOnStandardChange('MCB (BS EN 60898)', '1');
  if (!away || away.protectiveDeviceCurve !== '' || away.maxZs !== '')
    fails.push('leaving BS 3871 did not clear the Type 1 curve and its Max Zs');
  if (!clearOnStandardChange('MCB (BS 3871)', 'B'))
    fails.push('moving to BS 3871 did not clear a B curve');
  // A compatible curve, a blank one, and N/A must all survive untouched.
  if (clearOnStandardChange('MCB (BS EN 60898)', 'C') !== null)
    fails.push('switching between BS EN standards wrongly cleared a valid curve');
  if (clearOnStandardChange('MCB (BS 3871)', '') !== null)
    fails.push('a blank curve was treated as a mismatch');
  if (clearOnStandardChange('MCB (BS 3871)', 'N/A') !== null)
    fails.push('an N/A curve was treated as a mismatch');
  if (!curveMatchesStandard('3', 'MCB (BS 3871)') || curveMatchesStandard('3', 'MCB (BS EN 60898)'))
    fails.push('curveMatchesStandard does not separate the two families');

  // …and a bulk fill must not cross the boundary.
  if (curveFillApplies('B', 'MCB (BS 3871)')) fails.push('fill-all wrote curve B onto a BS 3871 row');
  if (curveFillApplies('1', 'MCB (BS EN 60898)'))
    fails.push('fill-all wrote Type 1 onto a BS EN 60898 row');
  if (!curveFillApplies('1', 'MCB (BS 3871)')) fails.push('fill-all skips BS 3871 rows entirely');
  if (!curveFillApplies('B', 'MCB (BS EN 60898)')) fails.push('fill-all skips BS EN 60898 rows');

  return fails.length ? fails.slice(0, 4).join('; ') : null;
});

/* ── 13c-ii. A BS 3871 circuit must be JUDGED on its own limit ──────────────
 * The lookup being right is not the same as the verdict being right. This is
 * the end of the chain: a real circuit through `checkRegulationCompliance`.
 *
 * 1.60 Ω on a Type 1 32 A complies (limit 1.71) but EXCEEDS the Type B limit
 * of 1.37 — so if anything still resolves this row as a Type B, the
 * electrician is told a compliant circuit fails.
 *
 * 1.80 Ω genuinely exceeds 1.71 and must still be caught, so this cannot pass
 * by the checker having quietly stopped judging BS 3871 rows at all.
 */
check('a BS 3871 circuit is judged on its own limit, not the Type B column', () => {
  const fails = [];
  const bs3871 = (over) =>
    circuit({
      circuitDescription: 'Lighting',
      bsStandard: 'MCB (BS 3871)',
      protectiveDeviceType: 'MCB',
      protectiveDeviceCurve: '1',
      protectiveDeviceRating: '32',
      ...over,
    });
  const exceeds = (c) => titles(c).some((t) => /Exceeds|Maximum Zs|Zs/i.test(t) && /Exceed/i.test(t));

  // Complies on its own table, would fail on Type B's.
  if (exceeds(bs3871({ zs: '1.60' })))
    fails.push('1.60 Ω on a Type 1 32 A was flagged — it is judged against the Type B limit');
  // Genuinely over its own limit — must still be caught.
  if (!exceeds(bs3871({ zs: '1.80' })))
    fails.push('1.80 Ω on a Type 1 32 A was NOT flagged — BS 3871 rows are no longer judged at all');
  // Type 4 is the dangerous direction: real limit 0.14 Ω at 32 A.
  if (!exceeds(bs3871({ protectiveDeviceCurve: '4', zs: '0.90' })))
    fails.push('0.90 Ω on a Type 4 32 A was NOT flagged — a Type B verdict would pass it');

  // A recorded Max Zs of 1.71 is the correct tabulated figure and must not be
  // queried back at the electrician.
  const queried = titles(bs3871({ zs: '1.60', maxZs: '1.71' })).some((t) =>
    /Recorded Maximum Zs/i.test(t)
  );
  if (queried) fails.push('the correct BS 3871 Max Zs of 1.71 Ω was reported as not matching the table');

  // No type recorded: say so rather than guess, and cite the OSG not Table 41.3.
  const noType = checkRegulationCompliance(
    bs3871({ protectiveDeviceCurve: '', zs: '1.60' }),
    'TN-C-S'
  ).warnings;
  const notVerified = noType.find((w) => /Not Recorded — Zs Not Verified/i.test(w.title));
  if (!notVerified) fails.push('a BS 3871 row with no type did not warn that Zs is unverified');
  else {
    if (/B, C\s*and D|\(B, C or D\)/i.test(`${notVerified.description} ${notVerified.suggestion}`))
      fails.push('the BS 3871 "no type" warning asks for a B/C/D curve');
    if (/Table 41\.3/.test(notVerified.regulation || ''))
      fails.push('the BS 3871 warning cites BS 7671 Table 41.3, which does not tabulate BS 3871');
  }

  return fails.length ? fails.slice(0, 4).join('; ') : null;
});

/* ── 13d. A column fill must not destroy a recorded reading ─────────────────
 * ELE-1605. The fill exists because Sean was copy-pasting N/A down a column by
 * hand. The thing that makes it worth having is also the thing that makes it
 * dangerous: one tap writes every row. On a legal document a fill that
 * replaces a measured 0.35 Ω with N/A costs far more than the typing it saved.
 *
 * Three rules, all asserted here rather than trusted to the component:
 * scope to the board, skip spare ways, and leave existing readings alone
 * unless overwrite was explicitly chosen.
 */
const FILL_BOARD = [
  { id: 'a1', circuitDescription: 'Lighting', boardId: 'b1', zs: '0.35' },
  { id: 'a2', circuitDescription: 'Sockets', boardId: 'b1', zs: '' },
  { id: 'a3', circuitDescription: 'Spare', boardId: 'b1', zs: '' },
  { id: 'a4', circuitDescription: 'Cooker', boardId: 'b1', zs: '—' },
  // A second board — the schedule holds every board in ONE array.
  { id: 'b1c1', circuitDescription: 'Sub-board lighting', boardId: 'b2', zs: '' },
];
const BOARD_ONE = ['a1', 'a2', 'a3', 'a4'];

check('a column fill is board-scoped, skips spares, and spares recorded readings', () => {
  const fails = [];

  const blank = planColumnFill(FILL_BOARD, 'zs', 'blank', BOARD_ONE);
  // a2 blank, a4 '—' counts as blank; a1 has a reading; a3 is a spare.
  if (blank.fillIds.join(',') !== 'a2,a4')
    fails.push(`blank fill targeted [${blank.fillIds.join(',')}], expected [a2,a4]`);
  if (blank.fillIds.includes('a1'))
    fails.push('blank fill would overwrite a recorded Zs of 0.35 Ω');
  if (blank.fillIds.includes('a3')) fails.push('blank fill would write into a spare way');
  if (blank.fillIds.includes('b1c1'))
    fails.push('fill crossed the board boundary — another consumer unit would be rewritten');
  if (blank.kept !== 1) fails.push(`kept ${blank.kept} readings, expected 1`);
  if (blank.skipped !== 1) fails.push(`skipped ${blank.skipped} spares, expected 1`);

  // Overwrite reaches the populated cell, and still never the spare or the
  // other board.
  const over = planColumnFill(FILL_BOARD, 'zs', 'overwrite', BOARD_ONE);
  if (!over.fillIds.includes('a1')) fails.push('overwrite did not reach the populated cell');
  if (over.fillIds.includes('a3')) fails.push('overwrite wrote into a spare way');
  if (over.fillIds.includes('b1c1')) fails.push('overwrite crossed the board boundary');
  if (over.kept !== 0) fails.push('overwrite reported readings kept');

  // No scope = every circuit passed in. The desktop table hands over exactly
  // the board it renders, so "no scope" must not silently mean "all boards"
  // for a caller that forgot — it means "the list you gave me".
  const unscoped = planColumnFill(FILL_BOARD.filter((c) => c.boardId === 'b1'), 'zs', 'blank');
  if (unscoped.fillIds.includes('b1c1')) fails.push('an unscoped fill reached a circuit not passed in');

  // What the user is told must mention anything left untouched — a fill that
  // wrote 2 of 4 cells reads as a fill that wrote all 4.
  const message = describeColumnFill(blank, 'N/A');
  if (!/left unchanged/i.test(message))
    fails.push(`the toast does not mention untouched readings: "${message}"`);
  if (!/spare/i.test(message)) fails.push(`the toast does not mention skipped spares: "${message}"`);

  return fails.length ? fails.slice(0, 4).join('; ') : null;
});

/* ── 13e. One definition of "tested", shared by every counter ───────────────
 * ELE-1610. The schedule had FOUR answers to "is this circuit tested" and they
 * disagreed on screen: a board with a tick on every circuit showed
 * "Complete 9" of 10, "Progress 100%", "TOTAL 10" and "1 Pass / 9 Warn".
 *
 * The two faults every completion rule shared:
 *   · `insulationResistance` is the legacy field no cell writes, so offering it
 *     as an alternative offered nothing;
 *   · none of them recognised continuity, so a ring final measured properly
 *     (r₁, rₙ, r₂, insulation L-L) counted as untested.
 */
check('a properly tested ring final counts as tested by every counter', () => {
  const fails = [];
  const ring = {
    id: 'r1',
    circuitNumber: '1',
    circuitDescription: 'Ring final — sockets',
    ringR1: '0.52',
    ringRn: '0.53',
    ringR2: '0.86',
    r1r2: '0.35',
    insulationLiveNeutral: '>999',
    insulationTestVoltage: '500',
    polarity: '✓',
    zs: '0.42',
  };
  if (!hasAnyReading(ring)) fails.push('the gate does not see a tested ring final as touched');
  if (!hasCoreResults(ring)) fails.push('a fully measured ring final is not "complete"');
  if (!isCircuitTested(ring)) fails.push('the progress counter calls a tested ring final untested');

  // The dead field must not be the only way to satisfy insulation.
  const lEarthOnly = { ...ring, insulationLiveNeutral: '', insulationTestVoltage: '', insulationLiveEarth: '299' };
  if (!hasCoreResults(lEarthOnly)) fails.push('L-E alone no longer satisfies insulation');
  const lLineOnly = { ...ring, insulationLiveEarth: '' };
  if (!hasCoreResults(lLineOnly)) fails.push('L-L alone does not satisfy insulation — the reported bug');

  // Genuinely missing a core test is still incomplete.
  for (const [field, label] of [['polarity', 'polarity'], ['zs', 'Zs']]) {
    if (hasCoreResults({ ...ring, [field]: '' }))
      fails.push(`a circuit with no ${label} is reported complete`);
  }
  const noContinuity = { ...ring, ringR1: '', ringRn: '', ringR2: '', r1r2: '' };
  if (hasCoreResults(noContinuity)) fails.push('a circuit with no continuity reading is reported complete');

  // RCD/AFDD/functional must NOT be required — plenty of circuits have none.
  const noRcd = { ...ring, rcdOneX: '', rcdTestButton: '', afddTest: '', functionalTesting: '' };
  if (!hasCoreResults(noRcd))
    fails.push('a circuit with no RCD/AFDD can never complete — the old TestAnalytics rule');

  // A recorded limitation is an answer, not a gap.
  const allNa = { ...ring, polarity: 'N/A', zs: 'LIM', insulationLiveNeutral: 'N/V' };
  if (!hasCoreResults(allNa)) fails.push('N/A, LIM and N/V are not being counted as recorded');

  // The dead field is listed only for old certificates — it must not be the
  // sole insulation route for anything written today.
  if (!READING_FIELDS.includes('insulationLiveNeutral'))
    fails.push('the reading columns omit insulation L-L');

  return fails.length ? fails.join('; ') : null;
});

check('progress and analytics agree, and exclude the same rows', () => {
  const fails = [];
  const tested = (id) => ({
    id, circuitNumber: id, circuitDescription: 'Lighting',
    r1r2: '0.4', insulationLiveEarth: '299', polarity: '✓', zs: '0.8',
  });
  const rows = [
    tested('a'), tested('b'),
    { id: 'sp', circuitNumber: '3', circuitDescription: 'Spare', isSpare: true },
    { id: 'dev', circuitNumber: '4', circuitDescription: 'Incoming RCD', isDeviceRow: true },
  ];
  const p = getScheduleProgress(rows);
  if (p.circuits !== 2) fails.push(`progress counted ${p.circuits} circuits, expected 2 (spare + device row excluded)`);
  if (p.tested !== 2) fails.push(`progress counted ${p.tested} tested, expected 2`);
  if (p.percent !== 100) fails.push(`progress read ${p.percent}%, expected 100 — the reported "9/10 at 100%" mismatch`);
  if (p.excluded !== 2) fails.push(`progress excluded ${p.excluded} rows, expected 2`);
  if (!p.isComplete) fails.push('a fully tested board with a spare does not read as complete');

  // The analytics denominator must use the same row set — a spare validated as
  // a circuit is where most of the reported "9 warnings" came from.
  const analyticsRows = rows.filter(isTestableRow);
  if (analyticsRows.length !== p.circuits)
    fails.push(`analytics would judge ${analyticsRows.length} rows against progress's ${p.circuits}`);

  return fails.length ? fails.join('; ') : null;
});

/* ── 13f. The app must not invent a measured value ──────────────────────────
 * ELE-1612. `updateSmartFieldDependencies` seeded `mainSwitchRating` from the
 * property type — domestic 100 A, commercial 200 A, industrial 400 A — plus a
 * main bonding conductor size. Those are read off the installation by the
 * inspector and signed for; a property type cannot imply either.
 *
 * Reported only as "the defaults look inconsistent". The real fault was that a
 * 200 A rating nobody measured sat one un-touched field away from printing on
 * a certificate.
 *
 * Source-level check: this helper is plain data, and the thing worth pinning is
 * that nobody adds a measurement back to it.
 */
check('property-type defaults never fabricate a measured value', () => {
  const src = readFileSync('src/utils/inspectionFiltering.ts', 'utf8');
  const block = src.slice(src.indexOf('const dependencies = {'), src.indexOf('const dependencies = {') + 1600);
  const banned = [
    ['mainSwitchRating', 'the main switch rating'],
    ['mainBondingSize', 'the main bonding conductor size'],
    ['supplyDeviceRating', 'the supply device rating'],
    ['breakingCapacity', 'the breaking capacity'],
    ['ze', 'Ze'],
    ['ipf', 'the prospective fault current'],
  ];
  const found = banned.filter(([f]) => new RegExp(`\\b${f}\\s*:`).test(block));
  if (found.length)
    return `property type now seeds ${found.map(([, l]) => l).join(', ')} — that is a measurement, not a default`;

  // And the component-level backstop must still be wired.
  const guard = readFileSync('src/components/eic/SmartFieldDependencies.tsx', 'utf8');
  if (!/NEVER_AUTOFILL\.has\(field\)/.test(guard))
    return 'the NEVER_AUTOFILL guard is no longer applied in SmartFieldDependencies';
  for (const [f] of banned)
    if (!new RegExp(`'${f}'`).test(guard)) return `${f} is missing from NEVER_AUTOFILL`;
  return null;
});

/* ── 13g. The word "Other" must never print as a board location ─────────────
 * ELE-1609. The location picker offered "Other" with nowhere to type the real
 * place, and `board.location` is rendered straight onto the certificate
 * ({{board.location}} / {{distribution_board.board_location}}).
 *
 * 🔴 **86 boards across 60 live certificates already hold the literal
 * "Other"** — they print "Location: Other" today. The form no longer stores
 * it; this covers everything already saved.
 */
/** ELE-1611 fixtures — the formatter is async, so awaited at top level. */
const nextInspectionPayload = await formatEICRJson(
  {
    inspectionDate: '2026-08-25',
    nextInspectionDate: '2029-08-25',
    inspectionInterval: '3',
    installationUse: 'Rented domestic dwelling',
    reinspectOnOccupancyChange: 'yes',
    scheduleOfTests: [],
  },
  'EICR-PROBE'
);
const offPayload = await formatEICRJson(
  { inspectionInterval: '3', installationUse: 'Retail unit', scheduleOfTests: [] },
  'EICR-PROBE'
);

/** Awaited once — `check` bodies cannot await, and the formatter is async. */
const locationPayload = await formatEICRJson(
  {
    distributionBoards: [
      { id: 'main-cu', reference: 'DB1', location: 'Other', order: 0 },
      { id: 'b2', reference: 'DB2', location: 'Riser', order: 1 },
    ],
    // Boards are emitted with their circuits, so each needs one to appear.
    scheduleOfTests: [
      { id: 'c1', circuitNumber: '1', circuitDescription: 'Lighting', boardId: 'main-cu' },
      { id: 'c2', circuitNumber: '1', circuitDescription: 'Sockets', boardId: 'b2' },
    ],
  },
  'EICR-PROBE'
);

check('a board location never prints as the literal "Other"', () => {
  const fails = [];
  if (printableBoardLocation('Other') !== '') fails.push('"Other" survives to the payload');
  if (printableBoardLocation('other') !== '') fails.push('lowercase "other" survives');
  if (printableBoardLocation(' Other ') !== '') fails.push('padded "Other" survives');
  // A real place that merely contains the word must be kept.
  for (const real of ['Other building', 'Plant Room', 'Sub-station 2, north elevation'])
    if (printableBoardLocation(real) !== real.trim())
      fails.push(`a real location "${real}" was stripped`);

  // The form must be able to tell a typed location from a picked one.
  if (isCustomBoardLocation('Plant Room')) fails.push('a listed location is treated as custom');
  if (!isCustomBoardLocation('Sub-station 2')) fails.push('a typed location is not treated as custom');
  if (isCustomBoardLocation('')) fails.push('an empty location is treated as custom');
  if (isCustomBoardLocation('Other'))
    fails.push('"Other" is treated as a custom value — it would be stored and printed');

  // End to end through the real formatter. `formatEICRJson` is async — awaited
  // above, because `check` bodies are synchronous. Forgetting that made this
  // assertion compare a Promise and report a fix that had actually worked.
  const asText = JSON.stringify(locationPayload);
  if (/"(board_)?location":\s*"Other"/i.test(asText))
    fails.push('the formatter still emits "Other" as a location');
  if (!/Riser/.test(asText)) fails.push('a real location was lost by the formatter');

  return fails.length ? fails.slice(0, 4).join('; ') : null;
});

/* ── 13h. "No main switch" must be sayable, and must clear the whole panel ──
 * ELE-1608. On a three-phase service head with BS 88 fuses feeding DB1 direct
 * there is no isolator, switch or RCD to record. The EIC gave no way to say so
 * — "there is no where to say N/A. Cant work it out?" — so the user either
 * invented values or left the section broken.
 *
 * The trap this pins: `MAIN_SWITCH_FIELDS` is the list stamped 'N/A' when the
 * panel is marked not applicable. A field rendered in the panel but missing
 * from that list keeps whatever was in it, so the certificate would print a
 * rating next to a section declaring there is no device — the two halves of
 * one panel contradicting each other.
 */
check('marking the main switch N/A clears every field the panel renders', () => {
  const src = readFileSync('src/components/eic/EICElectricalInstallationSection.tsx', 'utf8');

  const listMatch = src.match(/const MAIN_SWITCH_FIELDS = \[([\s\S]*?)\] as const;/);
  if (!listMatch) return 'MAIN_SWITCH_FIELDS is gone — the N/A toggle cannot clear the panel';
  const declared = new Set([...listMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));

  // The panel is the card between its own heading and the next section.
  const start = src.indexOf('Main switch / circuit-breaker / RCD');
  if (start === -1) return 'the main switch panel heading has been renamed — this check is now blind';
  const after = src.indexOf('<SectionHeading title=', start);
  const panel = src.slice(start, after === -1 ? src.length : after);

  const rendered = new Set([...panel.matchAll(/onUpdate\('([a-zA-Z]+)'/g)].map((m) => m[1]))
  rendered.delete('mainProtectiveDeviceLimit'); // the marker itself

  const missing = [...rendered].filter((f) => !declared.has(f));
  if (missing.length)
    return `the panel writes ${missing.join(', ')} but N/A does not clear ${missing.length === 1 ? 'it' : 'them'} — a stale value would print beside "N/A"`;

  // And the controls must actually lock, or the section reads as answered
  // while behaving as unanswered.
  if (!/disabled=\{mainSwitchNA\}/.test(panel))
    return 'the main switch panel does not disable its controls when marked N/A';

  return null;
});

check('the EICR main protective device locks on N/A as well as LIM', () => {
  const src = readFileSync('src/components/SupplyCharacteristicsSection.tsx', 'utf8');
  if (!/const mpdLocked = mpdLimit === 'LIM' \|\| mpdLimit === 'N\/A';/.test(src))
    return 'mpdLocked is gone — N/A would stamp the fields and leave them editable';
  // Nothing should gate a control on LIM alone any more; the only remaining
  // 'LIM' comparisons are the chip's own on/off state.
  const gates = [...src.matchAll(/disabled=\{mpdLimit === 'LIM'\}/g)];
  if (gates.length) return `${gates.length} control(s) still lock on LIM only, so N/A leaves them editable`;
  if (/mpdLimit === 'LIM' && 'opacity-40'/.test(src))
    return 'a control still dims on LIM only';
  return null;
});

/* ── 13i. The next-inspection additions reach the certificate ───────────────
 * ELE-1611. Requested by a user on site: intended use, and a recommendation
 * that a change of occupancy triggers re-inspection ("if they leave then it
 * needs to be looked at again but dont think the report covers that?").
 *
 * 🔴 The failure mode this pins is the one this repo has hit four times in a
 * single batch: a field captured on the form, carried in the payload, and
 * rendered nowhere. Adding a payload key without the template is half a
 * feature that looks like a whole one.
 *
 * ⚠️ Citation: the advice is IET Guidance Note 3 §3.1 — periodic inspection
 * should be considered on a change of occupancy (especially rented domestic)
 * or change of use. NOT a BS 7671 regulation; 651.1 makes the duty conditional
 * on requirements set out elsewhere, so a 65x number here would be false.
 */
check('intended use and the change-of-occupancy note reach the PDF', () => {
  const fails = [];
  const details = nextInspectionPayload.installation_details || {};

  if (details.installation_use !== 'Rented domestic dwelling')
    fails.push(`installation_use came through as ${JSON.stringify(details.installation_use)}`);
  if (!/change of occupancy/i.test(details.reinspect_on_occupancy_change_note || ''))
    fails.push('the change-of-occupancy sentence is not in the payload');
  if (details.inspection_interval_display !== '3 years')
    fails.push(`interval display came through as ${JSON.stringify(details.inspection_interval_display)}`);

  // The template must actually render all three.
  const tpl = readFileSync('docs/templates/eicr-certificate-template.html', 'utf8');
  for (const key of [
    'installation_details.installation_use',
    'installation_details.reinspect_on_occupancy_change_note',
    'installation_details.inspection_interval_display',
  ])
    if (!tpl.includes(`{{${key}}}`)) fails.push(`the template never renders ${key}`);

  // "1 year", not "1 years" — the old template hard-coded the plural.
  if (/\{\{installation_details\.inspection_interval\}\} years/.test(tpl))
    fails.push('the template still hard-codes "years" after the raw interval');

  // Off unless the electrician asked for it: advice must not appear over a
  // signature by default.
  const off = offPayload.installation_details || {};
  if (off.reinspect_on_occupancy_change_note)
    fails.push('the recommendation prints even when it was not selected');

  return fails.length ? fails.slice(0, 4).join('; ') : null;
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
