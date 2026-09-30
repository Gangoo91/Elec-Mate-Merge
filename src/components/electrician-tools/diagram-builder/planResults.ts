/**
 * Test results on the drawing (30 Sep 2026).
 *
 * A certificate started from the plan (planToCertificate) carries, on each
 * row, the plan circuit it came from. Once the readings are in, they come back
 * here and each circuit on the plan gets a status — so "way 7 is high in
 * bedroom 3" is something you see on the drawing, not something you work out.
 *
 * The judgement is the certificate's own schedule validator
 * (utils/testValidation): Zs against the limit it prints, TT against the RCD,
 * insulation, polarity, RCD times. The plan has no rules of its own. ⚠️ The
 * phone schedule also runs utils/regulationChecker, a second rule set — where
 * the two differ, fix them there, never by adding a rule here. Values the
 * certificate treats as "not measured" (N/A, LIM, —) are not judged.
 *
 * Rows are matched to plan circuits by the origin recorded on them; rows added
 * on the certificate by hand, which carry none, by board and way number.
 */
import type { TestResult } from '@/types/testResult';
import type { DistributionBoard } from '@/types/distributionBoard';
import { validateTestResult, type TestValidationResults } from '@/utils/testValidation';
import { parseCircuitNumberBase } from '@/utils/circuitNumbering';
import { hasReading } from '@/utils/validation/applicability';
import type { Way } from './boardWays';

export type CircuitStatus = 'untested' | 'partial' | 'pass' | 'check' | 'fail';

export interface CircuitResult {
  status: CircuitStatus;
  /** Measured and limit, as the certificate holds them ("0.84", "1.37"). */
  zs: string;
  maxZs: string;
  r1r2: string;
  /** Insulation resistance, line–earth (the lower-reading pair on most circuits). */
  ir: string;
  /** The reading that decided a fail or check, in the certificate's words. */
  reason?: string;
  /** Which reading that was ('zs', 'polarity'…) — the sheet words a Zs one itself. */
  decidedBy?: keyof TestValidationResults;
  /** In progress: the readings still to take, in plain words. */
  missing?: string[];
}

export interface LinkedCertificate {
  id: string;
  certificateNumber: string;
  updatedAt: string;
  rows: TestResult[];
  boards: DistributionBoard[];
  earthing: string;
}

/** Any of these entered means testing has started on the circuit. */
const MEASURED = [
  'zs',
  'r1r2',
  'insulationLiveEarth',
  'insulationLiveNeutral',
  'insulationResistance',
  'polarity',
  'rcdOneX',
] as const;
/** Without these a circuit isn't finished, whatever else is filled in. */
const REQUIRED = ['zs', 'r1r2', 'insulationLiveEarth', 'polarity'] as const;
const REQUIRED_WORDS: Record<(typeof REQUIRED)[number], string> = {
  zs: 'Zs',
  r1r2: 'R1+R2',
  insulationLiveEarth: 'insulation',
  polarity: 'polarity',
};

/**
 * A reading, as the certificate counts one: "N/A", "LIM", "—" are recorded
 * decisions not to measure, never judged as a value (applicability.ts).
 */
const has = (v: unknown) => hasReading(v);
/** Left blank — still to do. A recorded "N/A" or "LIM" is not. */
const blank = (v: unknown) => String(v ?? '').trim() === '';
const isTT = (arrangement: string) => arrangement.toLowerCase().replace(/[^a-z]/g, '') === 'tt';

/** One row's status, judged by the certificate's own rules. */
export function rowResult(input: TestResult, earthing: string): CircuitResult {
  // An older row may carry its insulation reading only in the legacy field.
  const row =
    !input.insulationLiveEarth && input.insulationResistance
      ? { ...input, insulationLiveEarth: input.insulationResistance }
      : input;
  const out: CircuitResult = {
    status: 'untested',
    zs: row.zs?.trim() ?? '',
    // On TT the limit comes from the RCD (Reg 411.5.3), not the tabulated
    // figure the row carries — so that figure is not shown against it.
    maxZs: isTT(earthing) ? '' : (row.maxZs?.trim() ?? ''),
    r1r2: row.r1r2?.trim() ?? '',
    ir: (row.insulationLiveEarth || row.insulationResistance || '').trim(),
  };

  if (!MEASURED.some((k) => has(row[k]))) return out;

  const v = validateTestResult(row, earthing);
  // Only readings actually entered are judged — the validator reports an
  // empty field as a "required" warning, which isn't a finding on the plan.
  const filled = (Object.keys(v) as (keyof TestValidationResults)[]).filter((k) => {
    const field = FIELD_OF[k];
    return field.some((f) => has(row[f]));
  });
  const fail = filled.find((k) => v[k].level === 'fail');
  if (fail) return { ...out, status: 'fail', reason: v[fail].message, decidedBy: fail };
  const missing = REQUIRED.filter((k) => blank(row[k])).map((k) => REQUIRED_WORDS[k]);
  if (missing.length) return { ...out, status: 'partial', missing };
  // A caution only from a measured value — the polarity and functional
  // checks warn on wordings the certificate itself writes ("Satisfactory").
  const check = filled.find((k) => v[k].level === 'warning' && CAUTIONS.has(k));
  if (check) return { ...out, status: 'check', reason: v[check].message, decidedBy: check };
  return { ...out, status: 'pass' };
}

const CAUTIONS = new Set<keyof TestValidationResults>([
  'zs',
  'r1r2',
  'insulationLiveEarth',
  'insulationLiveNeutral',
  'insulationNeutralEarth',
  'rcdTiming',
]);

/** Which row fields each validation reads, to tell entered from empty. */
const FIELD_OF: Record<keyof TestValidationResults, (keyof TestResult)[]> = {
  r1r2: ['r1r2'],
  ringContinuityLive: ['ringContinuityLive', 'ringR1'],
  ringContinuityNeutral: ['ringContinuityNeutral', 'ringRn'],
  insulationLiveNeutral: ['insulationLiveNeutral'],
  insulationLiveEarth: ['insulationLiveEarth'],
  insulationNeutralEarth: ['insulationNeutralEarth'],
  polarity: ['polarity'],
  zs: ['zs'],
  rcdTiming: ['rcdOneX'],
  pfcLiveNeutral: ['pfcLiveNeutral'],
  pfcLiveEarth: ['pfcLiveEarth'],
  functionalTesting: ['functionalTesting'],
};

/** A row's way as the plan labels it: "3", "1L2", "1 TPN". */
function planLabel(row: TestResult): string {
  const way =
    typeof row.wayNumber === 'number' ? row.wayNumber : parseCircuitNumberBase(row.circuitNumber);
  if (row.phaseAssignment === 'L1,L2,L3') return `${way} TPN`;
  if (row.phaseAssignment && way !== null) return `${way}${row.phaseAssignment}`;
  return String(row.circuitNumber ?? '').trim();
}

/**
 * Each plan circuit's result, keyed by its job ref.
 *
 * @param ways    the job's numbering (jobNumbering.ways)
 * @param originOf the job's origin keys (jobNumbering.originOf)
 */
export function planResults(
  cert: LinkedCertificate,
  ways: Map<string, Way>,
  originOf: (jobRef: string) => string
): Map<string, CircuitResult> {
  const byOrigin = new Map<string, string>();
  const byWay = new Map<string, string>();
  ways.forEach((w, ref) => {
    byOrigin.set(originOf(ref), ref);
    byWay.set(`${w.board}|${w.label}`, ref);
  });
  const boardRef = new Map(cert.boards.map((b) => [b.id, b.reference || b.name || 'CU']));
  const onlyBoard = cert.boards.length <= 1;

  const out = new Map<string, CircuitResult>();
  const rows = cert.rows.filter((row) => !row.isSpare && !row.isDeviceRow);
  // Rows that name their plan circuit first: a row added by hand on the
  // certificate, matched by its way number, must never take a circuit whose
  // own row says where it belongs.
  rows.forEach((row) => {
    if (!row.planOrigin) return;
    // An origin that no longer resolves is a circuit taken off the plan: it
    // has no place on the drawing. Never guess it onto another by number.
    const ref = byOrigin.get(row.planOrigin);
    if (ref && !out.has(ref)) out.set(ref, rowResult(row, cert.earthing));
  });
  rows.forEach((row) => {
    if (row.planOrigin) return;
    const ref = byWay.get(
      `${onlyBoard ? 'CU' : (boardRef.get(row.boardId ?? '') ?? 'CU')}|${planLabel(row)}`
    );
    if (ref && !out.has(ref)) out.set(ref, rowResult(row, cert.earthing));
  });
  return out;
}

/** Counts for the summary line. */
export function resultCounts(results: Map<string, CircuitResult>, total: number) {
  const c = { pass: 0, check: 0, fail: 0, partial: 0, untested: 0 };
  results.forEach((r) => c[r.status]++);
  c.untested += Math.max(0, total - results.size);
  return c;
}

/** Badge colours on the white drawing — deep enough to carry white text. */
export const STATUS_COLOUR: Record<CircuitStatus, string> = {
  pass: '#15803d',
  check: '#b45309',
  fail: '#b91c1c',
  partial: '#1d4ed8',
  untested: '#6b7280',
};

/** The same statuses as dots on the app's dark surfaces. */
export const STATUS_DOT: Record<CircuitStatus, string> = {
  pass: '#4ade80',
  check: '#fbbf24',
  fail: '#f87171',
  partial: '#60a5fa',
  untested: '#9ca3af',
};

export const STATUS_TEXT: Record<CircuitStatus, string> = {
  pass: 'Pass',
  check: 'Check',
  fail: 'Fail',
  partial: 'In progress',
  untested: 'Not tested',
};
