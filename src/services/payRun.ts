/**
 * The one pay run (gap #4). Pure functions only.
 *
 * Takes the database's pay run (get_payroll_run: approved hours not yet sent,
 * approved expense claims, approved leave) and adds, per person:
 *   - holiday hours and pay, 12.07% accrual for irregular-hours and part-year
 *     workers, rolled-up holiday pay, SSP days and pay (src/lib/payLaw, the
 *     same maths the person sheet and Worker Tools use),
 *   - a minimum wage check for each day worked (age band or apprentice rate),
 * and then lays the run out for the firm's payroll package.
 *
 * Subcontractors are never in this file. They are paid by self-bill statement
 * with CIS, and get their own CIS file (cisCsv).
 *
 * File layouts, checked 10 Oct 2026 against what each product publishes:
 *   BrightPay      Payroll > Import > Import Hourly Payments from CSV File,
 *                  "Match Header Row" maps these column names.
 *                  https://brightpay.co.uk/docs/bpol/importing-pay-data-using-csv-file/importing-hourly-payments-using-csv-file
 *   QuickBooks     Advanced Payroll (UK) > Import Timesheets > custom file: one
 *                  timesheet entry per line, Employee + Date + Units.
 *                  https://quickbooks.intuit.com/learn-support/en-uk/help-article/time-tracking/importing-timesheets-quickbooks-online-advanced/L5RR0QwSw_GB_en_GB
 *   Sage 50        File > Advanced Data Import > Timesheet Payments, header row
 *                  ticked, columns mapped. Sage does not publish the layout
 *                  openly; this follows a published integration guide.
 *   Moneysoft      Pay > Pay Details > Import CSV, columns mapped, Works Number
 *                  to Employee Works Number. Same: from an integration guide.
 *   Xero Payroll   No file import in Xero Payroll UK (Xero Product Ideas,
 *                  "Accepted" 9 Jun 2026), so the file is laid out to key in.
 *   Generic        Everything on one row per person, for anything else.
 */
import { format, parseISO } from 'date-fns';
import type { PayrollFileKind, PayrollLine } from '@/services/payrollRun';
import {
  BAND_LABEL,
  apprenticeRateEnds,
  minimumWageOn,
  type MinimumWage,
  type PayrollExtras,
  type StatutoryRate,
} from '@/lib/payLaw';

/* ── Presets ───────────────────────────────────────────────────────────── */

export type PayPresetId =
  'brightpay' | 'quickbooks' | 'sage' | 'moneysoft' | 'xero' | 'generic' | 'hours';

/** How sure we are of the layout. */
export type PresetBasis = 'published' | 'guide' | 'key_in' | 'generic';

export interface PayPreset {
  id: PayPresetId;
  name: string;
  /** The kind the old run log keeps (its check allows five values). */
  kind: PayrollFileKind;
  basis: PresetBasis;
  /** Where to import it, in their words. */
  how: string;
  /** What the file does not carry, to key in from the review. */
  keyIn: string | null;
  source: { label: string; url: string } | null;
}

export const PAY_PRESETS: PayPreset[] = [
  {
    id: 'brightpay',
    name: 'BrightPay',
    kind: 'csv',
    basis: 'published',
    how: 'In BrightPay: Payroll, Import, Import Hourly Payments from CSV File, then Match Header Row.',
    keyIn:
      'Holiday pay, SSP, rolled-up holiday pay and repayments are in the file as extra columns. Leave them unmatched and add them as payments or additions.',
    source: {
      label: 'BrightPay: importing hourly payments',
      url: 'https://brightpay.co.uk/docs/bpol/importing-pay-data-using-csv-file/importing-hourly-payments-using-csv-file',
    },
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Payroll',
    kind: 'quickbooks',
    basis: 'published',
    how: 'In QuickBooks Advanced Payroll: Import Timesheets, custom file, then match the columns. One line per person per day.',
    keyIn:
      'The timesheet import carries hours only. Key in holiday pay, SSP, rolled-up holiday pay and repayments from the review, or save the summary file too.',
    source: {
      label: 'QuickBooks UK: importing timesheets',
      url: 'https://quickbooks.intuit.com/learn-support/en-uk/help-article/time-tracking/importing-timesheets-quickbooks-online-advanced/L5RR0QwSw_GB_en_GB',
    },
  },
  {
    id: 'sage',
    name: 'Sage 50 Payroll',
    kind: 'sage',
    basis: 'guide',
    how: 'In Sage 50 Payroll: File, Advanced Data Import, Timesheet Payments. Tick that the file has a header row, then match the columns.',
    keyIn:
      'Sage does not publish this layout openly, so check the column match the first time. Extra columns carry holiday pay, SSP and repayments.',
    source: null,
  },
  {
    id: 'moneysoft',
    name: 'Moneysoft',
    kind: 'csv',
    basis: 'guide',
    how: 'In Moneysoft Payroll Manager: Pay, Pay Details, Import CSV. Match Works Number to Employee Works Number and the hours to Rate 1 and Rate 2.',
    keyIn:
      'Moneysoft does not publish this layout openly, so check the column match the first time. Extra columns carry holiday pay, SSP and repayments.',
    source: null,
  },
  {
    id: 'xero',
    name: 'Xero Payroll',
    kind: 'xero',
    basis: 'key_in',
    how: 'Xero Payroll UK has no file import yet, so this file is set out in pay run order to type in.',
    keyIn: null,
    source: {
      label: 'Xero Product Ideas: UK payroll import',
      url: 'https://productideas.xero.com/forums/967118-payroll-expenses/suggestions/49965465-uk-payroll-import-pay-run-timesheet-information',
    },
  },
  {
    id: 'generic',
    name: 'Other payroll',
    kind: 'csv',
    basis: 'generic',
    how: 'One row per person with everything on it. Opens in Excel, Numbers or Sheets, or send it to your bookkeeper.',
    keyIn: null,
    source: null,
  },
];

export const HOURS_PRESET: PayPreset = {
  id: 'hours',
  name: 'Hours only',
  kind: 'hours',
  basis: 'generic',
  how: 'Hours, overtime, holiday hours and SSP days for each person. No pay. The owner adds pay in payroll.',
  keyIn: null,
  source: null,
};

export const presetById = (id: string | null | undefined): PayPreset =>
  PAY_PRESETS.find((p) => p.id === id) ?? (id === 'hours' ? HOURS_PRESET : PAY_PRESETS[5]);

export const PRESET_BASIS_LABEL: Record<PresetBasis, string> = {
  published: 'Matches their published import',
  guide: 'Columns to match on import',
  key_in: 'To type in',
  generic: 'General layout',
};

/** The preset for an old run (made before presets were stored). */
export function presetForKind(kind: string | null | undefined): PayPresetId {
  if (kind === 'xero' || kind === 'sage' || kind === 'quickbooks' || kind === 'hours') return kind;
  return 'generic';
}

/* ── Minimum wage check ────────────────────────────────────────────────── */

export type WageCheckStatus =
  'ok' | 'below' | 'no_birth_date' | 'salary_check' | 'no_rate' | 'not_checked';

export interface WageCheck {
  status: WageCheckStatus;
  /** The highest minimum on any day worked in the run. */
  minimum: MinimumWage | null;
  apprentice: boolean;
  /** Apprentice rate ends inside the period (they turn 19 and are past year one). */
  apprenticeEnds: string | null;
  /** The minimum rises during the period (birthday, 1 April, apprentice year one). */
  risesOn: string | null;
  effectiveRate: number | null;
  /** One line for the review. */
  text: string;
}

export interface PersonPayFacts {
  dateOfBirth: string | null;
  apprenticeshipStart: string | null;
  /** Last day of the apprenticeship; after it the age band applies (NMW Regs 2015 reg 5). */
  apprenticeshipEnd?: string | null;
  annualSalary: number | null;
  teamRole: string | null;
}

const money = (n: number) => `£${n.toFixed(2)}`;
const nice = (d: string) => format(parseISO(d), 'd MMM yyyy');

/**
 * Checks the basic hourly rate against the minimum for the hours worked. The
 * overtime premium, holiday pay, SSP and repaid expenses never count towards
 * minimum wage pay, so the basic rate is the right thing to check.
 *
 * The minimum is the one that applies on the first day of the pay reference
 * period the work falls in (NMW Regulations 2015 reg 4B), so a birthday or a
 * new rate part-way through a period starts with the next one. `prpStartOf`
 * gives that first day (the firm's pay periods); without it, days inside the
 * run's period use the period's first day and earlier days (late approvals)
 * use the day itself, which can only over-warn. Same rule as
 * public._pay_run_below_minimum.
 */
export function wageCheck(
  rates: StatutoryRate[],
  line: Pick<PayrollLine, 'payType' | 'rate' | 'totalHours'> & { dates: string[] },
  facts: PersonPayFacts | null,
  period: { start: string; end: string },
  prpStartOf?: (date: string) => string
): WageCheck {
  const dob = facts?.dateOfBirth ?? null;
  const app = facts?.apprenticeshipStart ?? null;
  const appEnd = facts?.apprenticeshipEnd ?? null;
  const dates = line.dates.length ? line.dates : [period.end];
  const prp = (d: string) =>
    prpStartOf ? prpStartOf(d) : d >= period.start && d <= period.end ? period.start : d;
  let top: MinimumWage | null = null;
  let first: MinimumWage | null = null;
  let risesOn: string | null = null;
  for (const d of [...dates].sort()) {
    const m = minimumWageOn(rates, dob, app, prp(d), appEnd);
    if (!m) continue;
    if (!first) first = m;
    else if (m.rate > first.rate && !risesOn) risesOn = d;
    if (!top || m.rate > top.rate) top = m;
  }
  const apprentice = !!app || facts?.teamRole === 'Apprentice';
  let apprenticeEnds: string | null = null;
  if (dob && app) {
    const ends = apprenticeRateEnds(dob, app, appEnd);
    if (ends >= period.start && ends <= period.end) apprenticeEnds = ends;
  }
  const base = { minimum: top, apprentice, apprenticeEnds, risesOn };
  const bandText = top ? `${BAND_LABEL[top.band].toLowerCase()} minimum ${money(top.rate)}` : '';

  if (line.payType === 'annual') {
    const salary = facts?.annualSalary ?? null;
    if (!salary || !top || line.totalHours <= 0) {
      return {
        ...base,
        status: !top && !dob ? 'no_birth_date' : 'not_checked',
        effectiveRate: null,
        text:
          !top && !dob
            ? 'Add a date of birth to check their minimum wage'
            : 'Salaried: check against hours over the year',
      };
    }
    const days =
      (parseISO(period.end).getTime() - parseISO(period.start).getTime()) / 86_400_000 + 1;
    const eff = (salary * (days / 365)) / line.totalHours;
    return {
      ...base,
      status: eff < top.rate ? 'salary_check' : 'ok',
      effectiveRate: Math.round(eff * 100) / 100,
      text:
        eff < top.rate
          ? `Salary works out at ${money(eff)} an hour for these hours, under the ${bandText}. Salaried hours are checked over the year, so check it.`
          : `Salary works out at ${money(eff)} an hour, ${bandText}`,
    };
  }
  if (line.payType !== 'hourly') {
    return {
      ...base,
      status: 'not_checked',
      effectiveRate: null,
      text: 'Day rate: check the hours worked each day',
    };
  }
  if (line.rate == null) {
    return {
      ...base,
      status: 'no_rate',
      effectiveRate: null,
      text: 'No hourly rate on the team record',
    };
  }
  if (!top) {
    return {
      ...base,
      status: 'no_birth_date',
      effectiveRate: line.rate,
      text: 'Add a date of birth to check their minimum wage',
    };
  }
  if (line.rate < top.rate) {
    return {
      ...base,
      status: 'below',
      effectiveRate: line.rate,
      text: `${money(line.rate)} an hour is below the ${bandText}${risesOn ? ` from ${nice(risesOn)}` : ''}`,
    };
  }
  const extra = apprenticeEnds
    ? `. Apprentice rate ends ${nice(apprenticeEnds)}`
    : risesOn
      ? `. Minimum rises on ${nice(risesOn)}`
      : '';
  return {
    ...base,
    status: 'ok',
    effectiveRate: line.rate,
    text: `${money(line.rate)} an hour, ${bandText}${extra}`,
  };
}

/* ── Lines ─────────────────────────────────────────────────────────────── */

export interface PayRunLine extends PayrollLine {
  payrollId: string | null;
  days: Array<{ date: string; hours: number }>;
  overtimeThreshold: number;
  holidayDays: number;
  holidayHours: number | null;
  holidayPay: number | null;
  accruedHours: number | null;
  rolledUpPay: number | null;
  sspDays: number;
  sspPay: number | null;
  estimate: boolean;
  notes: string[];
  basis: PayrollExtras['basis'] | null;
  check: WageCheck | null;
  /** Gross for work plus holiday pay, rolled-up pay and SSP. Null when money is hidden. */
  totalPay: number | null;
}

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** What earlier runs in the same period already carried for one person. */
export interface EarlierInPeriod {
  /** Holiday record lines written by earlier pay runs (owner/admin can read them). */
  records: Array<{
    kind: string;
    period_start: string | null;
    period_end: string | null;
    hours: number | null;
    amount: number | null;
    /** Days of holiday the line paid (older reads may not have it). */
    days?: number | null;
  }>;
  /** SSP days already sent for this period (from earlier runs' pay check). */
  sspDays: number;
}

/**
 * A second run in the same pay period (late approvals) must not pay holiday
 * or SSP twice, or record holiday built up twice. Takes the full-period
 * figures and leaves only what earlier runs did not carry.
 */
export function afterEarlierRuns(
  x: PayrollExtras | null,
  earlier: EarlierInPeriod | null,
  window: { start: string; end: string }
): PayrollExtras | null {
  if (!x || !earlier) return x;
  const recs = earlier.records;
  if (recs.length === 0 && earlier.sspDays <= 0) return x;
  const notes = [...x.notes];
  const sameWindow = (r: { period_start: string | null; period_end: string | null }) =>
    r.period_start === window.start && r.period_end === window.end;

  // Holiday pay: the full-period figure less what earlier runs paid, as for
  // SSP below. Leave approved after the first run is paid in this one.
  let holidayPay = x.holidayPay;
  let holidayDays = x.holidayDays;
  let holidayHours = x.holidayHours;
  const priorHoliday = recs.filter((r) => r.kind === 'holiday_pay' && sameWindow(r));
  const paidHoliday = priorHoliday.length > 0;
  let holidayRecord: { days: number; hours: number | null; amount: number | null } | null = null;
  if (paidHoliday && x.holidayDays > 0) {
    const priorAmount = priorHoliday.reduce((s, r) => s + Number(r.amount ?? 0), 0);
    const priorHours = priorHoliday.reduce((s, r) => s + Number(r.hours ?? 0), 0);
    // Days paid before; a line with no days is worked out from its share of the pay.
    const priorDays = priorHoliday.reduce((s, r) => {
      if (r.days != null) return s + Number(r.days);
      if (x.holidayPay && x.holidayPay > 0 && r.amount != null)
        return s + (x.holidayDays * Number(r.amount)) / x.holidayPay;
      return s + x.holidayDays;
    }, 0);
    const leftDays = Math.max(0, r2(x.holidayDays - priorDays));
    holidayDays = leftDays;
    holidayHours =
      leftDays === 0 || x.holidayHours == null
        ? null
        : r2(Math.max(0, x.holidayHours - priorHours));
    holidayPay =
      x.holidayPay == null || leftDays === 0 ? null : r2(Math.max(0, x.holidayPay - priorAmount));
    holidayRecord =
      leftDays > 0 ? { days: leftDays, hours: holidayHours, amount: holidayPay } : null;
    notes.push(
      leftDays === 0
        ? 'Holiday pay for this period went in an earlier run'
        : `Holiday: ${r2(priorDays)} day(s) went in an earlier run`
    );
  }

  const priorRolled = recs
    .filter((r) => r.kind === 'rolled_up_pay' && sameWindow(r))
    .reduce((s, r) => s + Number(r.amount ?? 0), 0);
  const rolledUpPay = x.rolledUpPay == null ? null : r2(Math.max(0, x.rolledUpPay - priorRolled));
  if (priorRolled > 0) notes.push('Rolled-up holiday pay is only on hours since the earlier run');

  // Accrual: per pay period, only hours above what is already recorded.
  const records: PayrollExtras['records'] = [];
  let accruedHours: number | null = x.accruedHours == null ? null : 0;
  for (const r of x.records) {
    if (r.kind === 'accrual') {
      const before = recs
        .filter(
          (e) =>
            e.kind === 'accrual' &&
            e.period_start === r.period_start &&
            e.period_end === r.period_end
        )
        .reduce((s, e) => s + Number(e.hours ?? 0), 0);
      const extra = Math.max(0, Number(r.hours ?? 0) - before);
      if (accruedHours != null) accruedHours += extra;
      // The full figure goes to the database, which tops up only the hours
      // not yet recorded for that pay period (send_pay_run).
      if (extra > 0) records.push(r);
    } else if (r.kind === 'holiday_pay') {
      if (!paidHoliday) records.push(r);
      else if (holidayRecord)
        records.push({
          ...r,
          days: holidayRecord.days,
          hours: holidayRecord.hours,
          amount: holidayRecord.amount,
          method: `${r.method} Less what an earlier run in this period paid.`,
        });
    } else if (r.kind === 'rolled_up_pay') {
      if (rolledUpPay && rolledUpPay > 0) records.push({ ...r, amount: rolledUpPay });
    }
  }

  let sspDays = x.sspDays;
  let sspPay = x.sspPay;
  if (earlier.sspDays > 0 && x.sspDays > 0) {
    const left = Math.max(0, x.sspDays - earlier.sspDays);
    sspPay = sspPay == null ? null : r2((sspPay * left) / x.sspDays);
    sspDays = left;
    notes.push(
      left === 0
        ? 'SSP for this period went in an earlier run'
        : `SSP: ${earlier.sspDays} day(s) went in an earlier run`
    );
  }

  // Nothing left to carry: the earlier run's estimates are not this run's.
  const carries =
    (holidayPay ?? 0) > 0 || sspDays > 0 || (rolledUpPay ?? 0) > 0 || (accruedHours ?? 0) > 0;
  return {
    ...x,
    holidayDays,
    holidayHours,
    holidayPay,
    rolledUpPay,
    accruedHours,
    sspDays,
    sspPay: sspDays === 0 ? null : sspPay,
    estimate: carries ? x.estimate : false,
    notes: [...new Set(carries ? notes : notes.filter((n) => n.includes('earlier run')))],
    records,
  };
}

export function withPayLaw(
  line: PayrollLine,
  opts: {
    days: Array<{ date: string; hours: number }>;
    overtimeThreshold: number;
    extras: PayrollExtras | null;
    payrollId: string | null;
    check: WageCheck | null;
    money: boolean;
  }
): PayRunLine {
  const x = opts.extras;
  const holidayPay = x?.holidayPay ?? null;
  const rolledUpPay = x?.rolledUpPay ?? null;
  const sspPay = x?.sspPay ?? null;
  return {
    ...line,
    payrollId: opts.payrollId,
    days: opts.days,
    overtimeThreshold: opts.overtimeThreshold,
    holidayDays: x?.holidayDays ?? 0,
    holidayHours: x?.holidayHours ?? null,
    holidayPay,
    accruedHours: x?.accruedHours ?? null,
    rolledUpPay,
    sspDays: x?.sspDays ?? 0,
    sspPay,
    estimate: x?.estimate ?? false,
    notes: x?.notes ?? [],
    basis: x?.basis ?? null,
    check: opts.check,
    totalPay: opts.money
      ? r2((line.gross ?? 0) + (holidayPay ?? 0) + (rolledUpPay ?? 0) + (sspPay ?? 0))
      : null,
  };
}

/** Holiday record rows for the run (accrual, holiday pay, rolled-up pay). */
export function holidayRows(
  lines: Array<{ employeeId: string }>,
  extrasFor: (id: string) => PayrollExtras | null,
  money: boolean
): Array<Record<string, unknown>> {
  return lines.flatMap((l) =>
    (extrasFor(l.employeeId)?.records ?? [])
      .filter((r) => money || r.kind === 'accrual')
      .map((r) => ({
        ...r,
        amount: money ? (r.amount ?? null) : null,
        employee_id: l.employeeId,
      }))
  );
}

export interface PayRunTotals {
  people: number;
  hours: number;
  overtime: number;
  gross: number | null;
  holidayPay: number | null;
  rolledUp: number | null;
  ssp: number | null;
  totalPay: number | null;
  reimbursement: number | null;
  miles: number;
  holidayHours: number;
  accruedHours: number;
  sspDays: number;
  below: string[];
  noBirthDate: string[];
  checks: string[];
  estimates: number;
}

export function payRunTotals(
  lines: PayRunLine[],
  includeExpenses: boolean,
  money: boolean
): PayRunTotals {
  const sum = (f: (l: PayRunLine) => number | null) =>
    r2(lines.reduce((s, l) => s + (f(l) ?? 0), 0));
  return {
    people: lines.length,
    hours: sum((l) => l.totalHours),
    overtime: sum((l) => l.overtimeHours),
    gross: money ? sum((l) => l.gross) : null,
    holidayPay: money ? sum((l) => l.holidayPay) : null,
    rolledUp: money ? sum((l) => l.rolledUpPay) : null,
    ssp: money ? sum((l) => l.sspPay) : null,
    totalPay: money ? sum((l) => l.totalPay) : null,
    reimbursement: money && includeExpenses ? sum((l) => l.reimbursement) : null,
    miles: includeExpenses ? sum((l) => l.mileageMiles) : 0,
    holidayHours: sum((l) => l.holidayHours),
    accruedHours: sum((l) => l.accruedHours),
    sspDays: sum((l) => l.sspDays),
    below: lines.filter((l) => l.check?.status === 'below').map((l) => l.name),
    noBirthDate: lines.filter((l) => l.check?.status === 'no_birth_date').map((l) => l.name),
    checks: lines.filter((l) => l.check?.status === 'salary_check').map((l) => l.name),
    estimates: lines.filter((l) => l.estimate).length,
  };
}

/* ── Files ─────────────────────────────────────────────────────────────── */

type Cell = string | number | null | undefined;

/** Quote text; neutralise a leading = + - @ so a name never runs as a formula. */
export function csvCell(v: Cell): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : '';
  if (v === '') return '';
  // Plain figures and dates go bare, so every package reads them as numbers.
  // A code with a leading zero (UTR, works number "007") stays quoted text.
  if (
    (/^-?\d+(\.\d+)?$/.test(v) && !/^-?0\d/.test(v) && v.replace(/\D/g, '').length < 10) ||
    /^\d{2}\/\d{2}\/\d{4}$/.test(v)
  )
    return v;
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
}
const join = (rows: Cell[][]) => rows.map((r) => r.map(csvCell).join(',')).join('\n');
const h2 = (n: number | null | undefined) => (n == null ? '' : n.toFixed(2));
const m2 = (n: number | null | undefined) => (n == null ? '' : n.toFixed(2));
const uk = (iso: string) => format(parseISO(iso), 'dd/MM/yyyy');

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { first: parts[0] ?? '', last: '' };
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] };
}

/** BrightPay names one column per overtime multiplier. */
function brightPayOvertimeColumn(mult: number): string | null {
  const near = (a: number) => Math.abs(mult - a) < 0.01;
  if (near(1.5)) return 'Number of time and a half hours';
  if (near(2)) return 'Number of double time hours';
  if (near(1.25)) return 'Number of time and a quarter hours';
  if (near(4 / 3)) return 'Number of time and a third hours';
  if (near(3)) return 'Number of triple time hours';
  if (near(4)) return 'Number of quadruple time hours';
  return null;
}

const checkText = (l: PayRunLine) =>
  l.check
    ? l.check.status === 'ok'
      ? 'OK'
      : l.check.status === 'below'
        ? 'BELOW MINIMUM'
        : l.check.status === 'no_birth_date'
          ? 'No date of birth'
          : l.check.status === 'salary_check'
            ? 'Check salary'
            : l.check.status === 'no_rate'
              ? 'No rate'
              : 'Not checked'
    : '';
const notesText = (l: PayRunLine, withExp: boolean) =>
  [
    l.leaveDetail ? `Leave: ${l.leaveDetail}` : '',
    l.estimate ? 'Estimate' : '',
    ...l.notes,
    l.check && l.check.status !== 'ok' ? l.check.text : '',
    withExp ? l.expenseDetail : '',
  ]
    .filter(Boolean)
    .join('; ');

/** The columns every money layout ends with, so nothing is left out. */
const EXTRA_HEAD = [
  'Holiday Hours Taken',
  'Holiday Pay',
  'Holiday Accrued (hours)',
  'Rolled-up Holiday Pay',
  'SSP Days',
  'SSP',
  'Mileage (miles)',
  'Mileage Allowance',
  'Expenses to Repay',
  'Total to Repay',
  'Minimum Wage Check',
  'Notes',
];
function extraCells(l: PayRunLine, withExp: boolean): Cell[] {
  return [
    h2(l.holidayHours),
    m2(l.holidayPay),
    l.accruedHours == null ? '' : h2(l.accruedHours),
    m2(l.rolledUpPay),
    l.sspDays ? String(l.sspDays) : '',
    m2(l.sspPay),
    withExp ? h2(l.mileageMiles) : '',
    withExp ? m2(l.mileagePay) : '',
    withExp ? m2(l.expensesPay) : '',
    withExp ? m2(l.reimbursement) : '',
    checkText(l),
    notesText(l, withExp),
  ];
}

export function payRunCsv(
  preset: PayPresetId,
  lines: PayRunLine[],
  start: string,
  end: string,
  includeExpenses: boolean
): string {
  const exp = includeExpenses;
  const otRate = (l: PayRunLine) => (l.rate == null ? '' : h2(l.rate * l.overtimeMultiplier));
  const rows: Cell[][] = [];

  switch (preset) {
    case 'brightpay': {
      // Matching: works number when set, otherwise first name + surname.
      const otCols = new Set<string>();
      lines.forEach((l) => {
        if (l.overtimeHours > 0) {
          const c = brightPayOvertimeColumn(l.overtimeMultiplier);
          if (c) otCols.add(c);
        }
      });
      const ot = [...otCols];
      const other = lines.some(
        (l) => l.overtimeHours > 0 && !brightPayOvertimeColumn(l.overtimeMultiplier)
      );
      rows.push([
        'Employee works number',
        'Employee first name',
        'Employee surname',
        'Number of normal hours',
        ...ot,
        ...(other ? ['Overtime hours at another rate'] : []),
        ...EXTRA_HEAD,
      ]);
      lines.forEach((l) => {
        const { first, last } = splitName(l.name);
        const col = brightPayOvertimeColumn(l.overtimeMultiplier);
        rows.push([
          l.payrollId ?? '',
          first,
          last,
          h2(l.regularHours),
          ...ot.map((c) => (c === col && l.overtimeHours > 0 ? h2(l.overtimeHours) : '')),
          ...(other ? [!col && l.overtimeHours > 0 ? h2(l.overtimeHours) : ''] : []),
          ...extraCells(l, exp),
        ]);
      });
      break;
    }
    case 'quickbooks': {
      // One timesheet entry per line: Date + Units, per day, ordinary and overtime split.
      rows.push(['Employee External ID', 'Employee', 'Date', 'Units', 'Work Type']);
      lines.forEach((l) => {
        const id = l.payrollId ?? '';
        [...l.days]
          .sort((a, b) => a.date.localeCompare(b.date))
          .forEach((d) => {
            const h = Math.max(0, d.hours);
            const lim = Math.max(0, l.overtimeThreshold);
            const reg = Math.min(h, lim);
            const ot = Math.max(0, h - lim);
            if (reg > 0) rows.push([id, l.name, uk(d.date), h2(reg), 'Ordinary hours']);
            if (ot > 0) rows.push([id, l.name, uk(d.date), h2(ot), 'Overtime']);
          });
        if ((l.holidayHours ?? 0) > 0) {
          rows.push([id, l.name, uk(end), h2(l.holidayHours), 'Holiday']);
        }
      });
      break;
    }
    case 'sage':
      rows.push([
        'Employee Reference',
        'Employee Name',
        'Period Start',
        'Period End',
        'Standard Hours',
        'Overtime Hours',
        'Rate',
        'Overtime Rate',
        'Gross for Hours Worked',
        ...EXTRA_HEAD,
      ]);
      lines.forEach((l) =>
        rows.push([
          l.payrollId ?? '',
          l.name,
          uk(start),
          uk(end),
          h2(l.regularHours),
          h2(l.overtimeHours),
          m2(l.rate),
          otRate(l),
          m2(l.gross),
          ...extraCells(l, exp),
        ])
      );
      break;
    case 'moneysoft':
      rows.push([
        'Works Number',
        'Employee',
        'Period Start',
        'Period End',
        'Rate 1 Hours',
        'Rate 2 Hours',
        'Rate 1',
        'Rate 2',
        'Gross for Hours Worked',
        ...EXTRA_HEAD,
      ]);
      lines.forEach((l) =>
        rows.push([
          l.payrollId ?? '',
          l.name,
          uk(start),
          uk(end),
          h2(l.regularHours),
          h2(l.overtimeHours),
          m2(l.rate),
          otRate(l),
          m2(l.gross),
          ...extraCells(l, exp),
        ])
      );
      break;
    case 'xero':
      rows.push([
        'Employee',
        'Payroll ID',
        'Pay Period Start',
        'Pay Period End',
        'Ordinary Hours',
        'Overtime Hours',
        'Hourly Rate',
        'Overtime Rate',
        'Gross for Hours Worked',
        ...EXTRA_HEAD,
      ]);
      lines.forEach((l) =>
        rows.push([
          l.name,
          l.payrollId ?? '',
          uk(start),
          uk(end),
          h2(l.regularHours),
          h2(l.overtimeHours),
          m2(l.rate),
          otRate(l),
          m2(l.gross),
          ...extraCells(l, exp),
        ])
      );
      break;
    case 'hours':
      rows.push([
        'Employee',
        'Payroll ID',
        'Period Start',
        'Period End',
        'Regular Hours',
        'Overtime Hours',
        'Total Hours',
        'Of which approved late (earlier dates)',
        'Holiday Hours Taken',
        'Holiday Accrued (hours)',
        'SSP Days',
        'Leave Days',
        'Leave Detail',
        'Notes',
      ]);
      lines.forEach((l) =>
        rows.push([
          l.name,
          l.payrollId ?? '',
          uk(start),
          uk(end),
          h2(l.regularHours),
          h2(l.overtimeHours),
          h2(l.totalHours),
          h2(l.earlierHours),
          h2(l.holidayHours),
          l.accruedHours == null ? '' : h2(l.accruedHours),
          l.sspDays ? String(l.sspDays) : '',
          l.leaveDays.toFixed(1),
          l.leaveDetail,
          [l.estimate ? 'Estimate' : '', ...l.notes].filter(Boolean).join('; '),
        ])
      );
      break;
    case 'generic':
    default:
      rows.push([
        'Employee',
        'Payroll ID',
        'Pay Type',
        'Period Start',
        'Period End',
        'Regular Hours',
        'Overtime Hours',
        'Total Hours',
        'Approved Late (earlier dates)',
        'Hourly Rate',
        'Overtime Rate',
        'Gross for Hours Worked',
        'Total Pay (before tax)',
        ...EXTRA_HEAD,
      ]);
      lines.forEach((l) =>
        rows.push([
          l.name,
          l.payrollId ?? '',
          l.payType,
          uk(start),
          uk(end),
          h2(l.regularHours),
          h2(l.overtimeHours),
          h2(l.totalHours),
          h2(l.earlierHours),
          m2(l.rate),
          otRate(l),
          m2(l.gross),
          m2(l.totalPay),
          ...extraCells(l, exp),
        ])
      );
  }
  return join(rows);
}

export const payRunFilename = (preset: PayPresetId, start: string, end: string) =>
  preset === 'hours' ? `hours-${start}-to-${end}.csv` : `pay-run-${preset}-${start}-to-${end}.csv`;

/* ── CIS (subcontractors, never in the PAYE file) ─────────────────────── */

export interface CisStatementLike {
  statement_number: string;
  name?: string | null;
  trading_name?: string | null;
  utr?: string | null;
  cis_verification_number?: string | null;
  cis_status?: string | null;
  period_start: string;
  period_end: string;
  labour_amount?: number;
  materials_amount?: number;
  other_costs?: number;
  gross_amount?: number;
  cis_rate?: number;
  cis_deduction?: number;
  net_payable?: number;
  voided_at?: string | null;
}

export function cisCsv(statements: CisStatementLike[]): string {
  const rows: Cell[][] = [
    [
      'Statement',
      'Subcontractor',
      'Trading Name',
      'UTR',
      'Verification Number',
      'CIS Status',
      'Period Start',
      'Period End',
      'Labour',
      'Materials',
      'Other Costs',
      'Gross',
      'CIS Rate',
      'CIS Deducted',
      'Net Paid',
    ],
  ];
  statements
    .filter((s) => !s.voided_at)
    .forEach((s) =>
      rows.push([
        s.statement_number,
        s.name ?? '',
        s.trading_name ?? '',
        s.utr ?? '',
        s.cis_verification_number ?? '',
        s.cis_status ?? '',
        uk(s.period_start),
        uk(s.period_end),
        m2(s.labour_amount),
        m2(s.materials_amount),
        m2(s.other_costs),
        m2(s.gross_amount),
        s.cis_rate == null ? '' : `${Math.round(Number(s.cis_rate) * 100)}%`,
        m2(s.cis_deduction),
        m2(s.net_payable),
      ])
    );
  return join(rows);
}

export const cisFilename = (start: string, end: string) =>
  `cis-subcontractors-${start}-to-${end}.csv`;
