/**
 * certTestSummary — a certificate's schedule of tests, judged by the app's own
 * BS 7671 checks, for the Employer Hub Testing view (ELE-1973).
 *
 * Nothing here holds a limit. Every verdict comes from the same engine the
 * certificate forms use (`validateTestResult` + `getOverallCompliance` in
 * testValidation.ts, which reads Table 41.3 / Table 64 / the RCD limits and the
 * circuit's own printed max Zs), and "tested" uses the shared ELE-1610 rule
 * (`hasCoreResults`). So the office sees exactly what the electrician's
 * schedule would flag, never a second opinion.
 *
 * Minor Works stores its one circuit as flat fields; it is folded into a
 * schedule row with the same mapper the MW → EICR export uses.
 */
import type { TestResult } from '@/types/testResult';
import { validateTestResult, getOverallCompliance } from '@/utils/testValidation';
import { isTestableRow } from '@/utils/scheduleProgress';
import { hasCoreResults, missingCoreTests } from '@/utils/testReadings';
import { mwCircuitToEICR } from '@/utils/mwToEicrExport';

export interface CircuitCheck {
  key: string;
  label: string;
  status: 'pass' | 'warning' | 'fail';
  /** Out-of-limit or invalid readings, worded by the validator. */
  fails: string[];
  /** Core tests with nothing recorded (continuity, insulation, polarity, Zs). */
  missing: string[];
  readings: { label: string; value: string }[];
}

export interface CertTestSummary {
  circuits: number;
  tested: number;
  failed: number;
  warnings: number;
  incomplete: number;
  checks: CircuitCheck[];
  earthing: string | null;
  instrument: { make: string | null; serial: string | null } | null;
}

const MISSING_LABEL: Record<string, string> = {
  continuity: 'Continuity',
  insulation: 'Insulation',
  polarity: 'Polarity',
  zs: 'Zs',
};

const clean = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  return String(v).trim();
};

/** Validator wording uses spaced dashes; the hub reads plain sentences. */
const tidy = (message: string): string => message.replace(/\s+[—–]\s+/g, ': ');

function readingsOf(c: TestResult): { label: string; value: string }[] {
  const r = c as unknown as Record<string, unknown>;
  const out: { label: string; value: string }[] = [];
  const add = (label: string, value: unknown, unit = '') => {
    const v = clean(value);
    if (v) out.push({ label, value: /[a-zΩ]$/i.test(v) || !unit ? v : `${v}${unit}` });
  };
  const device = [clean(r.protectiveDeviceType), clean(r.protectiveDeviceCurve)]
    .filter((x, i, a) => x && a.indexOf(x) === i)
    .join(' ');
  const rating = clean(r.protectiveDeviceRating);
  if (device || rating) out.push({ label: 'Device', value: `${device} ${rating ? `${rating}A` : ''}`.trim() });
  add('Zs', r.zs, 'Ω');
  add('Max Zs', r.maxZs, 'Ω');
  add('R1+R2', r.r1r2, 'Ω');
  add('IR L-E', r.insulationLiveEarth, 'MΩ');
  add('IR L-N', r.insulationLiveNeutral, 'MΩ');
  add('RCD', r.rcdOneX, 'ms');
  add('Polarity', r.polarity);
  return out;
}

function circuitRows(reportType: string, data: Record<string, unknown>): TestResult[] {
  if (reportType === 'minor-works') {
    return [mwCircuitToEICR(data as Parameters<typeof mwCircuitToEICR>[0])];
  }
  const rows = data?.scheduleOfTests;
  return Array.isArray(rows) ? (rows as TestResult[]) : [];
}

export function summariseCertTests(
  reportType: string,
  data: Record<string, unknown> | null | undefined
): CertTestSummary {
  const d = (data ?? {}) as Record<string, unknown>;
  const earthing = clean(d.earthingArrangement) || null;
  const make = clean(d.testInstrumentMake) || clean(d.testEquipmentModel) || null;
  const serial =
    clean(d.testInstrumentSerial) || clean(d.testEquipmentSerial) || clean(d.loopTesterSerial) || null;

  const rows = circuitRows(reportType, d).filter((c) => c && isTestableRow(c));
  const checks: CircuitCheck[] = rows.map((c, i) => {
    const r = c as unknown as Record<string, unknown>;
    const validation = validateTestResult(c, earthing ?? undefined);
    const compliance = getOverallCompliance(validation);
    const fails = Object.values(validation)
      .filter((v) => v.level === 'fail')
      .map((v) => tidy(v.message));
    const missing = hasCoreResults(c) ? [] : missingCoreTests(c).map((g) => MISSING_LABEL[g] ?? g);
    const label =
      [clean(r.circuitNumber), clean(r.circuitDescription) || clean(r.circuitDesignation)]
        .filter(Boolean)
        .join(' ') || `Circuit ${i + 1}`;
    return {
      key: clean(r.id) || `${i}`,
      label,
      status: fails.length > 0 ? 'fail' : compliance.status,
      fails,
      missing,
      readings: readingsOf(c),
    };
  });

  return {
    circuits: checks.length,
    tested: checks.filter((c) => c.missing.length === 0).length,
    failed: checks.filter((c) => c.status === 'fail').length,
    warnings: checks.filter((c) => c.status === 'warning').length,
    incomplete: checks.filter((c) => c.missing.length > 0).length,
    checks,
    earthing,
    instrument: make || serial ? { make, serial } : null,
  };
}
