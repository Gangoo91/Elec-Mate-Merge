/**
 * Pay law for the Employer Hub and Worker Tools (ELE-2062, ELE-2063).
 *
 * Pure functions only, so the office screens, the payroll file and Worker
 * Tools all use the same maths. Rates come from public.statutory_pay_rates
 * (the same table the daily alerts read); FALLBACK_RATES is only used if that
 * read fails.
 *
 * Sources (checked 10 Oct 2026):
 *   NMW            https://www.gov.uk/national-minimum-wage-rates
 *   NMW age/rate   NMW Regulations 2015 reg 4B (the rate that applies on the first day of the pay
 *                  reference period), reg 5 (apprentice rate only while employed under a contract
 *                  of apprenticeship, and under 19 or in its first 12 months)
 *   SSP            https://www.legislation.gov.uk/ukpga/1992/4/section/157 (lower of £123.25 or 80% of
 *                  normal weekly earnings), s.155(1) omitted and s.152(2) one day from 6 Apr 2026
 *                  (no waiting days), SSP (General) Regulations 1982 reg 19 (normal weekly
 *                  earnings over the relevant period between paydays, the new-starter rule),
 *                  https://www.gov.uk/employers-sick-pay (28 weeks, fit note after 7 days)
 *   Irregular hrs  WTR 1998 reg 15B (12.07% of hours worked in each pay period, fraction under
 *                  30 minutes is dropped, 30 minutes or more is an hour), reg 15C (accrual during
 *                  sick leave and statutory leave from average weekly hours), reg 16A (rolled-up
 *                  pay), gov.uk "Holiday pay and entitlement reforms from 1 January 2024" (52-week
 *                  reference)
 *   Records        WTR reg 16B (6 years)
 *   Young workers  WTR reg 5A (8 hours a day, 40 a week; week starts Monday), reg 12(4)
 *                  (30 minutes when working more than 4.5 hours)
 *   Funding        DfE apprenticeship funding rules 2026 to 2027 v3: 125, 127.2, 128, 129, 133, 137, 214
 */
import {
  addDays,
  addYears,
  differenceInCalendarDays,
  format,
  parseISO,
  startOfWeek,
} from 'date-fns';

export type RateKey =
  'nmw_21_plus' | 'nmw_18_20' | 'nmw_under_18' | 'nmw_apprentice' | 'ssp_weekly';
export interface StatutoryRate {
  key: RateKey;
  effective_from: string;
  amount: number;
}

export const FALLBACK_RATES: StatutoryRate[] = [
  { key: 'nmw_21_plus', effective_from: '2025-04-01', amount: 12.21 },
  { key: 'nmw_18_20', effective_from: '2025-04-01', amount: 10.0 },
  { key: 'nmw_under_18', effective_from: '2025-04-01', amount: 7.55 },
  { key: 'nmw_apprentice', effective_from: '2025-04-01', amount: 7.55 },
  { key: 'nmw_21_plus', effective_from: '2026-04-01', amount: 12.71 },
  { key: 'nmw_18_20', effective_from: '2026-04-01', amount: 10.85 },
  { key: 'nmw_under_18', effective_from: '2026-04-01', amount: 8.0 },
  { key: 'nmw_apprentice', effective_from: '2026-04-01', amount: 8.0 },
  { key: 'ssp_weekly', effective_from: '2025-04-06', amount: 118.75 },
  { key: 'ssp_weekly', effective_from: '2026-04-06', amount: 123.25 },
];

/** The day SSP became payable from the first day, with no earnings limit. */
export const SSP_DAY_ONE_FROM = '2026-04-06';
export const HOLIDAY_ACCRUAL_PCT = 12.07;
export const SSP_MAX_WEEKS = 28;

export const BAND_LABEL: Record<Exclude<RateKey, 'ssp_weekly'>, string> = {
  nmw_21_plus: '21 and over',
  nmw_18_20: '18 to 20',
  nmw_under_18: 'Under 18',
  nmw_apprentice: 'Apprentice',
};

const iso = (d: Date) => format(d, 'yyyy-MM-dd');
const toDate = (s: string) => parseISO(s.slice(0, 10));
const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function rateOn(rates: StatutoryRate[], key: RateKey, on: string): number | null {
  const rows = rates
    .filter((r) => r.key === key && r.effective_from <= on)
    .sort((a, b) => b.effective_from.localeCompare(a.effective_from));
  return rows.length ? Number(rows[0].amount) : null;
}

/** Whole years between two ISO dates. */
export function ageOn(dob: string, on: string): number {
  const b = toDate(dob);
  const d = toDate(on);
  let age = d.getFullYear() - b.getFullYear();
  if (d.getMonth() < b.getMonth() || (d.getMonth() === b.getMonth() && d.getDate() < b.getDate())) {
    age -= 1;
  }
  return age;
}

/* ── National Minimum Wage ─────────────────────────────────────────────── */

export interface MinimumWage {
  band: Exclude<RateKey, 'ssp_weekly'>;
  rate: number;
}

/**
 * The legal minimum hourly rate on a date. The apprentice rate applies while
 * they are employed under the apprenticeship (from its start, to its end date
 * when one is set) and they are under 19 or in its first year (NMW Regs 2015
 * reg 5). Null when we can't tell (no date of birth and not in an
 * apprenticeship's first year). Same rule as public.nmw_minimum_at.
 *
 * For pay, `on` is the FIRST DAY of the pay reference period (reg 4B): a
 * birthday or the April uprating part-way through a period takes effect from
 * the next period.
 */
export function minimumWageOn(
  rates: StatutoryRate[],
  dob: string | null | undefined,
  apprenticeshipStart: string | null | undefined,
  on: string,
  apprenticeshipEnd?: string | null
): MinimumWage | null {
  const age = dob ? ageOn(dob, on) : null;
  let band: MinimumWage['band'];
  if (
    apprenticeshipStart &&
    on >= apprenticeshipStart &&
    (!apprenticeshipEnd || on <= apprenticeshipEnd) &&
    ((age !== null && age < 19) || on < iso(addYears(toDate(apprenticeshipStart), 1)))
  ) {
    band = 'nmw_apprentice';
  } else if (age === null) {
    return null;
  } else if (age >= 21) band = 'nmw_21_plus';
  else if (age >= 18) band = 'nmw_18_20';
  else band = 'nmw_under_18';
  const rate = rateOn(rates, band, on);
  return rate === null ? null : { band, rate };
}

/**
 * The day an apprentice stops being on the apprentice rate: 19 and past year
 * one, or the day after the apprenticeship ends if that is sooner.
 */
export function apprenticeRateEnds(
  dob: string,
  apprenticeshipStart: string,
  apprenticeshipEnd?: string | null
): string {
  const nineteen = iso(addYears(toDate(dob), 19));
  const yearOne = iso(addYears(toDate(apprenticeshipStart), 1));
  const byAge = nineteen > yearOne ? nineteen : yearOne;
  if (!apprenticeshipEnd) return byAge;
  const after = iso(addDays(toDate(apprenticeshipEnd), 1));
  return after < byAge ? after : byAge;
}

export interface PayCheck {
  today: MinimumWage | null;
  /** The next date in the coming `lookaheadDays` when the minimum goes above the rate. */
  riseDue: { on: string; min: MinimumWage } | null;
  belowNow: boolean;
}

export function checkPay(
  rates: StatutoryRate[],
  hourlyRate: number | null,
  dob: string | null | undefined,
  apprenticeshipStart: string | null | undefined,
  today: string,
  lookaheadDays = 30,
  apprenticeshipEnd?: string | null
): PayCheck {
  const now = minimumWageOn(rates, dob, apprenticeshipStart, today, apprenticeshipEnd);
  const belowNow = !!now && hourlyRate !== null && hourlyRate > 0 && hourlyRate < now.rate;
  let riseDue: PayCheck['riseDue'] = null;
  if (!belowNow && hourlyRate !== null && hourlyRate > 0) {
    for (let i = 1; i <= lookaheadDays; i++) {
      const d = iso(addDays(toDate(today), i));
      const m = minimumWageOn(rates, dob, apprenticeshipStart, d, apprenticeshipEnd);
      if (m && hourlyRate < m.rate) {
        riseDue = { on: d, min: m };
        break;
      }
    }
  }
  return { today: now, riseDue, belowNow };
}

/* ── Holiday: irregular hours and part-year workers ────────────────────── */

/** Reg 15B rounding: a fraction under 30 minutes is dropped, 30 minutes or more is an hour. */
function roundAccrual(raw: number): number {
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  const whole = Math.floor(raw + 1e-9);
  const minutes = Math.round((raw - whole) * 60 * 1000) / 1000;
  return minutes >= 30 ? whole + 1 : whole;
}

/**
 * Hours of holiday accrued in one pay period: 12.07% of hours worked, then a
 * fraction under 30 minutes is dropped and 30 minutes or more is a whole hour
 * (reg 15B). gov.uk worked example: 68 hours in June → 8.2076 → 8 hours.
 */
export function accrualForPeriod(hoursWorked: number, pct = HOLIDAY_ACCRUAL_PCT): number {
  if (!Number.isFinite(hoursWorked) || hoursWorked <= 0) return 0;
  return roundAccrual((hoursWorked * pct) / 100);
}

/**
 * Rolled-up holiday pay for a pay period: a 12.07% uplift on the pay for work
 * done (reg 16A), to the nearest penny. gov.uk worked example: £460 → £55.52.
 */
export function rolledUpHolidayPay(periodPay: number, pct = HOLIDAY_ACCRUAL_PCT): number {
  if (!Number.isFinite(periodPay) || periodPay <= 0) return 0;
  return round2((periodPay * pct) / 100);
}

export interface PeriodHours {
  start: string;
  end: string;
  hours: number;
}

/** A run of sick leave or statutory leave (inclusive dates). A half day counts as half. */
export interface LeaveSpan {
  start: string;
  end: string;
  halfDay?: boolean;
}

export interface AccrualOptions {
  /**
   * Sick leave and statutory leave (WTR reg 2: leave under Parts 8 and 8B of
   * the Employment Rights Act 1996, such as maternity, paternity, adoption and
   * shared parental leave). Holiday accrues during it under reg 15C.
   */
  leave?: LeaveSpan[];
  /** Approved hours to average from (defaults to `entries`); needs the 52 weeks before each leave. */
  history?: Array<{ date: string; hours: number }>;
  /** First day of employment: a relevant period shorter than 52 weeks (reg 15C(3)(b)). */
  employedFrom?: string | null;
  /** Leave days before this date are not counted (the caller's window). */
  from?: string | null;
}

/** What the app does not record, so is not in the figure (shown with it). */
export const ACCRUAL_LEAVE_NOTE =
  'Includes holiday built up while off sick (reg 15C). Maternity, paternity, adoption and other family leave are not recorded here, so holiday built up during them is not included: add it by hand.';

export interface AverageWeeklyHours {
  hours: number;
  weeksUsed: number;
}

/**
 * Reg 15C step 1: average hours a week worked in the relevant period before
 * the leave started. The relevant period is the 52 weeks before the leave (or
 * the time employed, if shorter). Weeks with any sick or statutory leave are
 * left out and earlier weeks used instead, back no further than 104 weeks.
 * Weeks with no work for any other reason count, as nought. Weeks are
 * Monday to Sunday.
 */
export function averageWeeklyHoursBefore(
  history: Array<{ date: string; hours: number }>,
  leave: LeaveSpan[],
  leaveStart: string,
  employedFrom?: string | null
): AverageWeeklyHours {
  const firstWorked = history.reduce<string | null>(
    (m, e) => (e.hours > 0 && (!m || e.date.slice(0, 10) < m) ? e.date.slice(0, 10) : m),
    null
  );
  const from = employedFrom || firstWorked;
  if (!from) return { hours: 0, weeksUsed: 0 };
  const byWeek = new Map<string, number>();
  for (const e of history) {
    if (!(e.hours > 0)) continue;
    const w = isoWeekOf(e.date.slice(0, 10)).start;
    byWeek.set(w, (byWeek.get(w) ?? 0) + e.hours);
  }
  const thisWeek = isoWeekOf(leaveStart).start;
  let total = 0;
  let used = 0;
  for (let k = 1; k <= 104 && used < 52; k++) {
    const ws = iso(addDays(toDate(thisWeek), -7 * k));
    const we = iso(addDays(toDate(ws), 6));
    if (we < from) break; // before they were employed
    const onLeave = leave.some((l) => l.start <= we && l.end >= ws);
    if (onLeave) continue;
    total += byWeek.get(ws) ?? 0;
    used += 1;
  }
  return { hours: used ? round2(total / used) : 0, weeksUsed: used };
}

/** Weekdays (Mon–Fri) of a leave span inside [from, to]; a half day counts 0.5. */
function leaveWeekdays(l: LeaveSpan, from: string, to: string): number {
  const a = l.start > from ? l.start : from;
  const b = l.end < to ? l.end : to;
  let n = 0;
  for (let d = toDate(a); iso(d) <= b; d = addDays(d, 1)) {
    if (![0, 6].includes(d.getDay())) n += 1;
  }
  return l.halfDay ? Math.min(n, 0.5) : n;
}

export interface AccrualPeriod extends PeriodHours {
  accrued: number;
  complete: boolean;
  /** Weeks of sick or statutory leave in the period (weekdays ÷ 5). */
  leaveWeeks: number;
  /** Unrounded hours built up during that leave (reg 15C). */
  leaveAccrual: number;
}

export interface AccrualSummary {
  periods: AccrualPeriod[];
  /** Accrued in finished pay periods (reg 15B accrues on the last day of each). */
  accruedHours: number;
  /** What the period still running would add if it ended now. */
  accruingNow: number;
  workedHours: number;
  /** Weeks of leave counted under reg 15C. */
  leaveWeeks: number;
}

/**
 * Sums accrual over pay periods. `entries` are approved timesheets
 * ({date, hours}); `periodOf` maps a date to its pay period (the firm's own,
 * or Monday–Sunday weeks when none is set).
 *
 * With `opts.leave`, each period also accrues for its sick or statutory
 * leave (reg 15C): 12.07% of the average weekly hours before that leave
 * started, times the weeks of leave in the period (weekdays off ÷ 5, as the
 * gov.uk example "2.268 × 3 ÷ 5"). The period's total is then rounded once
 * (reg 15B; gov.uk: 107.36 becomes 107).
 */
export function accrueOverPeriods(
  entries: Array<{ date: string; hours: number }>,
  periodOf: (date: string) => { start: string; end: string },
  today: string,
  pct = HOLIDAY_ACCRUAL_PCT,
  opts: AccrualOptions = {}
): AccrualSummary {
  const byPeriod = new Map<string, PeriodHours & { leaveWeeks: number; leaveAccrual: number }>();
  const row = (date: string) => {
    const p = periodOf(date);
    const key = `${p.start}|${p.end}`;
    const r = byPeriod.get(key) ?? {
      start: p.start,
      end: p.end,
      hours: 0,
      leaveWeeks: 0,
      leaveAccrual: 0,
    };
    byPeriod.set(key, r);
    return r;
  };
  for (const e of entries) {
    if (!(e.hours > 0)) continue;
    row(e.date.slice(0, 10)).hours += e.hours;
  }
  const leave = opts.leave ?? [];
  if (leave.length) {
    const history = opts.history ?? entries;
    // Leave counts up to yesterday: today has not ended.
    const lastDay = iso(addDays(toDate(today), -1));
    for (const l of leave) {
      const avg = averageWeeklyHoursBefore(history, leave, l.start, opts.employedFrom);
      if (avg.hours <= 0) continue;
      const weekly = (avg.hours * pct) / 100;
      const from = opts.from && opts.from > l.start ? opts.from : l.start;
      const to = l.end < lastDay ? l.end : lastDay;
      // Walk the span period by period.
      for (let d = from; d <= to;) {
        const p = periodOf(d);
        const segEnd = p.end < to ? p.end : to;
        const days = leaveWeekdays(l, d, segEnd);
        if (days > 0) {
          const r = row(d);
          r.leaveWeeks += days / 5;
          r.leaveAccrual += (weekly * days) / 5;
        }
        d = iso(addDays(toDate(p.end), 1));
      }
    }
  }
  const periods = [...byPeriod.values()]
    .sort((a, b) => a.start.localeCompare(b.start))
    .map((p) => ({
      ...p,
      hours: round2(p.hours),
      leaveWeeks: round2(p.leaveWeeks),
      leaveAccrual: Math.round(p.leaveAccrual * 1000) / 1000,
      accrued: roundAccrual((p.hours * pct) / 100 + p.leaveAccrual),
      complete: p.end < today,
    }));
  return {
    periods,
    accruedHours: periods.filter((p) => p.complete).reduce((s, p) => s + p.accrued, 0),
    accruingNow: periods.filter((p) => !p.complete).reduce((s, p) => s + p.accrued, 0),
    workedHours: round2(periods.reduce((s, p) => s + p.hours, 0)),
    leaveWeeks: round2(periods.reduce((s, p) => s + p.leaveWeeks, 0)),
  };
}

/** Monday–Sunday week containing a date, for firms without a pay period set. */
export function isoWeekOf(date: string): { start: string; end: string } {
  const s = startOfWeek(toDate(date), { weekStartsOn: 1 });
  return { start: iso(s), end: iso(addDays(s, 6)) };
}

/* ── Holiday pay: the 52-week reference period ─────────────────────────── */

export interface WeekPay {
  /** Monday of the week. */
  weekStart: string;
  pay: number;
  hours: number;
  /** A week with sick or statutory leave in it is left out (gov.uk guidance). */
  hadLeave?: boolean;
}

export interface ReferenceAverage {
  weeklyPay: number;
  weeklyHours: number;
  weeksUsed: number;
  /** Fewer than 52 paid weeks were available, so it is the average of what there is. */
  short: boolean;
}

/**
 * Average weekly pay over the last 52 paid weeks before `before`, looking back
 * no more than 104 weeks, skipping weeks with no pay or with sick/statutory
 * leave. Fewer than 52 → the average of the weeks there are.
 */
export function referenceAverage(weeks: WeekPay[], before: string): ReferenceAverage | null {
  const earliest = iso(addDays(toDate(before), -7 * 104));
  const used = weeks
    .filter((w) => w.weekStart < before && w.weekStart >= earliest && w.pay > 0 && !w.hadLeave)
    .sort((a, b) => b.weekStart.localeCompare(a.weekStart))
    .slice(0, 52);
  if (used.length === 0) return null;
  const pay = used.reduce((s, w) => s + w.pay, 0);
  const hours = used.reduce((s, w) => s + w.hours, 0);
  return {
    weeklyPay: round2(pay / used.length),
    weeklyHours: round2(hours / used.length),
    weeksUsed: used.length,
    short: used.length < 52,
  };
}

/* ── Statutory Sick Pay ────────────────────────────────────────────────── */

export interface SspWeekly {
  weekly: number;
  capRate: number;
  /** Which limb applied: the flat rate, or 80% of earnings. */
  limitedBy: 'flat_rate' | 'earnings';
}

/** SSP a week: the lower of the flat rate and 80% of normal weekly earnings (s.157). */
export function sspWeekly(rates: StatutoryRate[], awe: number, on: string): SspWeekly | null {
  const cap = rateOn(rates, 'ssp_weekly', on);
  if (cap === null || !Number.isFinite(awe) || awe < 0) return null;
  const pct = round2(awe * 0.8);
  return pct < cap
    ? { weekly: pct, capRate: cap, limitedBy: 'earnings' }
    : { weekly: cap, capRate: cap, limitedBy: 'flat_rate' };
}

/** Qualifying days: the weekdays they normally work. Default Monday–Friday. */
export function qualifyingWeekdays(daysPerWeek: number | null | undefined): number[] {
  const n = Math.max(1, Math.min(7, Math.round(daysPerWeek ?? 5)));
  // Mon..Sun as getDay() numbers, first n of them
  return [1, 2, 3, 4, 5, 6, 0].slice(0, n);
}

export interface SspPeriod {
  days: number;
  pay: number;
  dailyRate: number;
  weekly: SspWeekly | null;
  /** Qualifying days already paid in this sickness before the period. */
  daysBefore: number;
  /** Days left before the 28-week limit. */
  capped: boolean;
  /** Some of the days fall before 6 Apr 2026, when waiting days and the earnings limit still applied. */
  oldRules: boolean;
}

/**
 * SSP for the part of one sickness that falls in a pay period, from the first
 * qualifying day (6 Apr 2026 onwards). Daily rate = weekly rate / qualifying
 * days in a week. Capped at 28 weeks of qualifying days for this sickness.
 * (Linked periods of sickness across separate absences are not joined up.)
 */
export function sspForPeriod(opts: {
  rates: StatutoryRate[];
  sickStart: string;
  sickEnd: string;
  periodStart: string;
  periodEnd: string;
  awe: number;
  daysPerWeek?: number | null;
}): SspPeriod {
  const qd = qualifyingWeekdays(opts.daysPerWeek);
  const weekly = sspWeekly(
    opts.rates,
    opts.awe,
    opts.sickStart < SSP_DAY_ONE_FROM ? SSP_DAY_ONE_FROM : opts.sickStart
  );
  const dailyRate = weekly ? weekly.weekly / qd.length : 0;
  const cap = SSP_MAX_WEEKS * qd.length;
  let before = 0;
  let days = 0;
  let oldRules = false;
  const end = opts.sickEnd;
  for (let d = toDate(opts.sickStart); iso(d) <= end; d = addDays(d, 1)) {
    const s = iso(d);
    if (!qd.includes(d.getDay())) continue;
    if (s < opts.periodStart) {
      before += 1;
      continue;
    }
    if (s > opts.periodEnd) break;
    if (before + days >= cap) continue;
    if (s < SSP_DAY_ONE_FROM) oldRules = true;
    days += 1;
  }
  return {
    days,
    pay: round2(days * dailyRate),
    dailyRate: Math.round(dailyRate * 10000) / 10000,
    weekly,
    daysBefore: before,
    capped: before + days >= cap,
    oldRules,
  };
}

/** A pay period with its payday (the payday defaults to the last day of the period). */
export interface PayPeriodDates {
  start: string;
  end: string;
  payday?: string;
}

export interface SspAverage {
  /** Normal weekly earnings for SSP, or null when there is nothing to work it from. */
  awe: number | null;
  basis: 'relevant_period' | 'new_starter' | 'salary' | 'no_payday' | 'no_rate';
  method: string;
}

/**
 * Normal weekly earnings for SSP (SSP (General) Regulations 1982 reg 19).
 *
 * The relevant period runs between the last normal payday before the
 * sickness starts (included) and the last payday at least 8 weeks before that
 * one (excluded). Earnings in it ÷ days × 7, or for monthly pay ÷ months ×
 * 12 ÷ 52. Someone employed too short a time to have that earlier payday
 * (reg 19(7)): everything paid before the sickness, over the time it covers.
 * No payday yet (reg 19(8)): their contractual weekly pay, which the app
 * can't know for hourly pay, so null.
 *
 * Earnings are worked out from approved hours at the current rate and
 * overtime terms, and each payday is taken to pay for its own pay period.
 */
export function sspAverageWeeklyEarnings(p: {
  entries: TimeEntry[];
  payType: string;
  hourlyRate: number | null;
  annualSalary: number | null;
  overtime: { multiplier: number; threshold: number };
  periodOf: (date: string) => PayPeriodDates;
  sickStart: string;
  employedFrom?: string | null;
}): SspAverage {
  if (p.payType === 'annual' && p.annualSalary && p.annualSalary > 0) {
    const awe = round2(p.annualSalary / 52);
    return {
      awe,
      basis: 'salary',
      method: `salary £${p.annualSalary.toFixed(2)} ÷ 52 = £${awe.toFixed(2)} a week`,
    };
  }
  const rate = p.hourlyRate && p.hourlyRate > 0 ? p.hourlyRate : null;
  if (!rate) return { awe: null, basis: 'no_rate', method: 'no pay rate' };
  const firstWorked = p.entries.reduce<string | null>(
    (m, e) => (e.hours > 0 && (!m || e.date.slice(0, 10) < m) ? e.date.slice(0, 10) : m),
    null
  );
  const employedFrom = p.employedFrom || firstWorked;

  // Pay periods back from the one the sickness starts in.
  const periods: Array<{ start: string; end: string; payday: string }> = [];
  let cur = p.periodOf(p.sickStart);
  for (let i = 0; i < 60; i++) {
    periods.push({ start: cur.start, end: cur.end, payday: cur.payday ?? cur.end });
    cur = p.periodOf(iso(addDays(toDate(cur.start), -1)));
  }
  const employed = (payday: string) => !!employedFrom && payday >= employedFrom;
  const paid = periods
    .filter((x) => x.payday < p.sickStart && employed(x.payday))
    .sort((a, b) => b.payday.localeCompare(a.payday));
  if (!paid.length) {
    return { awe: null, basis: 'no_payday', method: 'not paid yet before the sickness' };
  }
  const a = paid[0];
  const eightWeeksBefore = iso(addDays(toDate(a.payday), -56));
  const b = paid.find((x) => x.payday <= eightWeeksBefore) ?? null;

  const payFor = (xs: typeof paid) => {
    const inThem = p.entries.filter((e) =>
      xs.some((x) => e.date.slice(0, 10) >= x.start && e.date.slice(0, 10) <= x.end)
    );
    return round2(weeklyPayFromEntries(inThem, rate, p.overtime).reduce((s, w) => s + w.pay, 0));
  };
  const nice = (d: string) => format(toDate(d), 'd MMM yyyy');

  if (!b) {
    // Reg 19(7): employed under 8 weeks before the last payday.
    const xs = paid;
    const earnings = payFor(xs);
    const from = employedFrom as string;
    const days = differenceInCalendarDays(toDate(a.end), toDate(from)) + 1;
    const awe = days > 0 ? round2((earnings / days) * 7) : null;
    return {
      awe,
      basis: 'new_starter',
      method: `£${earnings.toFixed(2)} earned from ${nice(from)} to ${nice(a.end)} (${days} days, employed under 8 weeks) ÷ ${days} × 7 = £${(awe ?? 0).toFixed(2)} a week`,
    };
  }
  const xs = paid.filter((x) => x.payday > b.payday && x.payday <= a.payday);
  const earnings = payFor(xs);
  const dayOfMonth = (d: string) => toDate(d).getDate();
  const monthly = xs.every((x) => {
    const len = differenceInCalendarDays(toDate(x.end), toDate(x.start)) + 1;
    return len >= 28 && len <= 31 && dayOfMonth(x.start) === dayOfMonth(a.start);
  });
  if (monthly) {
    const awe = round2(((earnings / xs.length) * 12) / 52);
    return {
      awe,
      basis: 'relevant_period',
      method: `£${earnings.toFixed(2)} paid on ${xs.length} monthly paydays to ${nice(a.payday)} ÷ ${xs.length} × 12 ÷ 52 = £${awe.toFixed(2)} a week`,
    };
  }
  const days = differenceInCalendarDays(toDate(a.payday), toDate(b.payday));
  const awe = round2((earnings / days) * 7);
  return {
    awe,
    basis: 'relevant_period',
    method: `£${earnings.toFixed(2)} paid after ${nice(b.payday)} up to ${nice(a.payday)} (${days} days) ÷ ${days} × 7 = £${awe.toFixed(2)} a week`,
  };
}

/** Days off in a row including non-working days; a fit note can be asked for when this is more than 7. */
export function calendarDaysOff(start: string, end: string): number {
  return differenceInCalendarDays(toDate(end), toDate(start)) + 1;
}

export type FitNoteState = 'not_needed' | 'needed' | 'on_file';
export function fitNoteState(
  start: string,
  end: string,
  hasFitNote: boolean,
  today: string
): FitNoteState {
  if (hasFitNote) return 'on_file';
  const lastDay = end < today ? end : today;
  return calendarDaysOff(start, lastDay) > 7 || calendarDaysOff(start, end) > 7
    ? 'needed'
    : 'not_needed';
}

/* ── Young workers (under 18) ──────────────────────────────────────────── */

export const YOUNG_DAY_LIMIT = 8;
export const YOUNG_WEEK_LIMIT = 40;
export const YOUNG_BREAK_AFTER = 4.5;
export const YOUNG_BREAK_MINUTES = 30;

export interface YoungEntry {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  breakMins: number;
}

/**
 * Flags per entry for anyone under 18 on the day worked: over 8 hours in the
 * day, over 40 in the Monday–Sunday week, or more than 4.5 hours with under
 * 30 minutes of break. `adultFrom` maps employee id → the date they turn 18.
 */
export function youngWorkerFlags(
  entries: YoungEntry[],
  adultFrom: Map<string, string>
): Map<string, string[]> {
  const out = new Map<string, string[]>();
  const young = entries.filter((e) => {
    const a = adultFrom.get(e.employeeId);
    return !!a && e.date.slice(0, 10) < a && e.hours > 0;
  });
  const day = new Map<string, { hours: number; breaks: number; ids: string[] }>();
  const week = new Map<string, { hours: number; ids: string[] }>();
  for (const e of young) {
    const d = e.date.slice(0, 10);
    const dk = `${e.employeeId}|${d}`;
    const dr = day.get(dk) ?? { hours: 0, breaks: 0, ids: [] };
    dr.hours += e.hours;
    dr.breaks += e.breakMins || 0;
    dr.ids.push(e.id);
    day.set(dk, dr);
    const wk = `${e.employeeId}|${isoWeekOf(d).start}`;
    const wr = week.get(wk) ?? { hours: 0, ids: [] };
    wr.hours += e.hours;
    wr.ids.push(e.id);
    week.set(wk, wr);
  }
  const add = (id: string, f: string) => out.set(id, [...(out.get(id) ?? []), f]);
  const fmt = (n: number) => `${Math.round(n * 10) / 10}h`;
  day.forEach((r) => {
    if (r.hours > YOUNG_DAY_LIMIT + 1e-9)
      r.ids.forEach((id) => add(id, `Under 18: ${fmt(r.hours)} day`));
    if (r.hours > YOUNG_BREAK_AFTER && r.breaks < YOUNG_BREAK_MINUTES)
      r.ids.forEach((id) => add(id, 'Under 18: break under 30 min'));
  });
  week.forEach((r) => {
    if (r.hours > YOUNG_WEEK_LIMIT + 1e-9)
      r.ids.forEach((id) => add(id, `Under 18: ${fmt(r.hours)} week`));
  });
  return out;
}

/** Diary: would booking these hours put an under-18 over 8h a day or 40h a week? */
export function youngScheduleWarnings(opts: {
  adultFrom: string | null | undefined;
  /** Hours already booked per day (yyyy-MM-dd → hours), not counting this booking. */
  bookedByDay: Map<string, number>;
  start: string;
  end: string;
  hoursPerDay: number;
}): string[] {
  if (!opts.adultFrom) return [];
  const days: string[] = [];
  for (let d = toDate(opts.start); iso(d) <= opts.end; d = addDays(d, 1)) {
    if (iso(d) < opts.adultFrom) days.push(iso(d));
  }
  if (days.length === 0) return [];
  const totals = new Map(opts.bookedByDay);
  days.forEach((d) => totals.set(d, (totals.get(d) ?? 0) + opts.hoursPerDay));
  const out: string[] = [];
  const overDays = days.filter((d) => (totals.get(d) ?? 0) > YOUNG_DAY_LIMIT + 1e-9);
  if (overDays.length) {
    out.push(
      `${overDays.length === 1 ? format(toDate(overDays[0]), 'EEE d MMM') : `${overDays.length} days`} over 8 hours`
    );
  }
  const weeks = new Map<string, number>();
  totals.forEach((h, d) => {
    if (d >= opts.adultFrom!) return;
    const w = isoWeekOf(d).start;
    weeks.set(w, (weeks.get(w) ?? 0) + h);
  });
  const touched = new Set(days.map((d) => isoWeekOf(d).start));
  weeks.forEach((h, w) => {
    if (touched.has(w) && h > YOUNG_WEEK_LIMIT + 1e-9) {
      out.push(`${Math.round(h * 10) / 10} hours in the week of ${format(toDate(w), 'd MMM')}`);
    }
  });
  return out;
}

/* ── Apprentice funding (England, non-levy employer) ───────────────────── */

export type FundingStatus = 'eligible' | 'check' | 'not_eligible';
export interface FundingItem {
  id: 'hiring_payment' | 'incentive' | 'training_cost' | 'care_leaver_bursary';
  title: string;
  amount: string;
  status: FundingStatus;
  /** Why, in a line. */
  reason: string;
  /** When the money comes, if eligible. */
  when: string | null;
  /** Who gets it. */
  paidTo: 'firm' | 'apprentice';
  rule: string;
}

/**
 * What a non-levy firm can claim for one apprentice, from the 2026/27 funding
 * rules. Missing dates make an item "check" rather than guessing.
 */
export function apprenticeFunding(p: {
  dob: string | null | undefined;
  apprenticeshipStart: string | null | undefined;
  joinDate: string | null | undefined;
  careLeaver?: boolean;
  ehcp?: boolean;
  today: string;
}): FundingItem[] {
  const start = p.apprenticeshipStart ?? null;
  const age = p.dob && start ? ageOn(p.dob, start) : null;
  const plus = (days: number) => (start ? format(addDays(toDate(start), days), 'd MMM yyyy') : '');
  const items: FundingItem[] = [];

  // £2,000 hiring payment (rules 133, 137)
  {
    let status: FundingStatus = 'check';
    let reason = 'Add their date of birth and apprenticeship start date to check.';
    if (start && age !== null) {
      const employedDays = p.joinDate
        ? differenceInCalendarDays(toDate(start), toDate(p.joinDate))
        : null;
      if (start < '2026-10-01') {
        status = 'not_eligible';
        reason = 'Only for practical periods starting on or after 1 Oct 2026.';
      } else if (age < 16 || age > 24) {
        status = 'not_eligible';
        reason = `Only for apprentices aged 16 to 24 at the start. They were ${age}.`;
      } else if (employedDays !== null && employedDays > 90) {
        status = 'not_eligible';
        reason = `They had worked for you ${employedDays} days before starting. The limit is 90.`;
      } else if (employedDays === null) {
        status = 'check';
        reason =
          'Add the date they joined you: they must not have worked for you more than 90 days before the start.';
      } else {
        status = 'eligible';
        reason =
          employedDays <= 0
            ? `Aged ${age} at the start, started on or after 1 Oct 2026, and joined you on or after the start.`
            : `Aged ${age} at the start, started on or after 1 Oct 2026, and with you ${employedDays} days before (the limit is 90).`;
      }
    }
    items.push({
      id: 'hiring_payment',
      title: 'Hiring payment',
      amount: '£2,000',
      status,
      reason,
      when:
        status === 'eligible'
          ? `£1,000 after 90 days (${plus(90)}) and £1,000 after 365 days (${plus(365)}), paid through the training provider the month after.`
          : null,
      paidTo: 'firm',
      rule: 'Funding rules 133 and 137. For employers who do not pay the apprenticeship levy.',
    });
  }

  // £1,000 employer incentive (rules 125, 128)
  {
    let status: FundingStatus = 'check';
    let reason = 'Add their date of birth and apprenticeship start date to check.';
    if (age !== null) {
      if (age >= 16 && age <= 18) {
        status = 'eligible';
        reason = `Aged ${age} at the start.`;
      } else if (age >= 19 && age <= 24 && (p.careLeaver || p.ehcp)) {
        status = 'eligible';
        reason = `Aged ${age} at the start, with ${p.ehcp ? 'an EHC plan' : 'care leaver status'} they agreed to share.`;
      } else if (age >= 19 && age <= 24) {
        status = 'check';
        reason =
          'Aged 19 to 24: only if they have an EHC plan or are a care leaver and agree to tell you.';
      } else {
        status = 'not_eligible';
        reason = `Only for 16 to 18 year olds, or 19 to 24 with an EHC plan or care leaver status. They were ${age}.`;
      }
    }
    items.push({
      id: 'incentive',
      title: 'Employer incentive',
      amount: '£1,000',
      status,
      reason,
      when:
        status === 'eligible'
          ? `£500 after 90 days (${plus(90)}) and £500 after 365 days (${plus(365)}), paid through the training provider.`
          : null,
      paidTo: 'firm',
      rule: 'Funding rules 125 and 128. The provider gets its own £1,000 too.',
    });
  }

  // Training cost (rule 214)
  {
    let status: FundingStatus = 'check';
    let reason = 'Add their date of birth and apprenticeship start date to check.';
    if (age !== null && start) {
      if (start >= '2026-08-01' && age >= 16 && age <= 24) {
        status = 'eligible';
        reason = `Aged ${age} at a start on or after 1 Aug 2026, so the government pays all the training and assessment, up to the funding band.`;
      } else if (start >= '2026-08-01' && age >= 25) {
        status = 'not_eligible';
        reason = 'Aged 25 or over: you pay 5% of the training and assessment cost.';
      } else {
        status = 'check';
        reason =
          'Started before 1 Aug 2026: the rules at their start date apply. Ask the training provider.';
      }
    }
    items.push({
      id: 'training_cost',
      title: 'Training paid in full',
      amount: 'No 5% to pay',
      status,
      reason,
      when: null,
      paidTo: 'firm',
      rule: 'Funding rule 214. Anything above the funding band maximum is still yours to pay.',
    });
  }

  // Care leaver bursary (rules 127.2, 129) — paid to the apprentice
  items.push({
    id: 'care_leaver_bursary',
    title: 'Care leaver bursary',
    amount: '£3,000',
    status: p.careLeaver ? 'eligible' : 'check',
    reason: p.careLeaver
      ? 'They told you they are a care leaver.'
      : 'Paid to the apprentice, not the firm. They do not have to tell you. The training provider asks every apprentice under 25.',
    when:
      p.careLeaver && start
        ? `£1,000 each at 60, 120 and 300 days (${plus(60)}, ${plus(120)}, ${plus(300)}).`
        : null,
    paidTo: 'apprentice',
    rule: 'Funding rules 127.2 and 129.',
  });

  return items;
}

/* ── CSV ───────────────────────────────────────────────────────────────── */

export function csvRow(cells: Array<string | number | null | undefined | boolean>): string {
  return cells
    .map((c) => {
      if (c === null || c === undefined) return '';
      if (typeof c === 'number') return String(c);
      if (typeof c === 'boolean') return c ? 'Yes' : 'No';
      return `"${c.replace(/"/g, '""')}"`;
    })
    .join(',');
}

/* ── Weekly pay from approved timesheets ───────────────────────────────── */

export interface TimeEntry {
  date: string;
  hours: number;
}

/**
 * Gross pay per Monday–Sunday week from approved hours at the person's
 * current rate and overtime terms (overtime is per day over the threshold,
 * the same maths as the payroll file). Weeks with sick days are marked.
 */
export function weeklyPayFromEntries(
  entries: TimeEntry[],
  hourlyRate: number,
  overtime: { multiplier: number; threshold: number },
  sickDays: Set<string> = new Set()
): WeekPay[] {
  const byDay = new Map<string, number>();
  for (const e of entries) {
    if (!(e.hours > 0)) continue;
    const d = e.date.slice(0, 10);
    byDay.set(d, (byDay.get(d) ?? 0) + e.hours);
  }
  const weeks = new Map<string, WeekPay>();
  byDay.forEach((h, d) => {
    const w = isoWeekOf(d).start;
    const row = weeks.get(w) ?? { weekStart: w, pay: 0, hours: 0, hadLeave: false };
    const reg = Math.min(h, Math.max(0, overtime.threshold));
    const ot = Math.max(0, h - Math.max(0, overtime.threshold));
    row.pay += reg * hourlyRate + ot * hourlyRate * overtime.multiplier;
    row.hours += h;
    weeks.set(w, row);
  });
  sickDays.forEach((d) => {
    const w = isoWeekOf(d).start;
    const row = weeks.get(w);
    if (row) row.hadLeave = true;
  });
  return [...weeks.values()].map((w) => ({ ...w, pay: round2(w.pay), hours: round2(w.hours) }));
}

/** Weekdays (Mon–Fri) a leave request covers inside a window; a half day counts 0.5. */
export function leaveDaysInWindow(
  lr: { startDate: string; endDate: string; halfDay?: string | null },
  start: string,
  end: string
): number {
  if (lr.halfDay) {
    return lr.startDate >= start &&
      lr.startDate <= end &&
      ![0, 6].includes(toDate(lr.startDate).getDay())
      ? 0.5
      : 0;
  }
  const from = lr.startDate > start ? lr.startDate : start;
  const to = lr.endDate < end ? lr.endDate : end;
  let n = 0;
  for (let d = toDate(from); iso(d) <= to; d = addDays(d, 1)) {
    if (![0, 6].includes(d.getDay())) n += 1;
  }
  return n;
}

export type HolidayBasis = 'fixed' | 'irregular' | 'part_year';

export const HOLIDAY_BASIS_LABEL: Record<HolidayBasis, string> = {
  fixed: 'Fixed days',
  irregular: 'Irregular hours',
  part_year: 'Part-year',
};

export interface PayrollExtras {
  holidayDays: number;
  holidayHours: number | null;
  holidayPay: number | null;
  /** Irregular / part-year, not rolled up: hours accrued in pay periods ending in this window. */
  accruedHours: number | null;
  rolledUpPay: number | null;
  sspDays: number;
  sspPay: number | null;
  sspWeekly: number | null;
  estimate: boolean;
  notes: string[];
  basis: HolidayBasis;
  /** Rows for the 6-year holiday record. */
  records: Array<{
    kind: 'accrual' | 'holiday_pay' | 'rolled_up_pay';
    period_start: string;
    period_end: string;
    hours?: number | null;
    days?: number | null;
    amount?: number | null;
    basis: HolidayBasis;
    method: string;
    is_estimate: boolean;
  }>;
}

/**
 * Holiday and SSP figures for one person for one export window (the payroll
 * file). Money is only worked out when `withMoney`; office managers get the
 * days and hours.
 */
export function payrollExtras(p: {
  rates: StatutoryRate[];
  basis: HolidayBasis;
  rolledUp: boolean;
  payType: 'hourly' | 'annual' | 'day_rate' | string;
  hourlyRate: number | null;
  annualSalary: number | null;
  daysPerWeek: number | null;
  overtime: { multiplier: number; threshold: number };
  /** Approved timesheets, about two years back to the window end. */
  entries: TimeEntry[];
  windowStart: string;
  windowEnd: string;
  /** Pay periods for accrual and SSP paydays (the firm's, or Monday–Sunday). */
  periodOf: (date: string) => PayPeriodDates;
  /** First day of employment (join date), for the SSP and reg 15C new-starter rules. */
  employedFrom?: string | null;
  holidayLeave: Array<{
    startDate: string;
    endDate: string;
    halfDay?: string | null;
    hours?: number | null;
  }>;
  sickLeave: Array<{ id: string; startDate: string; endDate: string }>;
  sickness: Map<string, { awe: number | null; qualifyingDaysPerWeek: number | null }>;
  withMoney: boolean;
}): PayrollExtras {
  const notes: string[] = [];
  let estimate = false;
  const dpw = p.daysPerWeek && p.daysPerWeek > 0 ? p.daysPerWeek : 5;
  const rate = p.hourlyRate && p.hourlyRate > 0 ? p.hourlyRate : null;
  const irregular = p.basis !== 'fixed';
  const records: PayrollExtras['records'] = [];

  // Sick days, for leaving those weeks out of the reference period.
  const sickDays = new Set<string>();
  p.sickLeave.forEach((s) => {
    for (let d = toDate(s.startDate); iso(d) <= s.endDate; d = addDays(d, 1)) sickDays.add(iso(d));
  });
  const weeks = rate ? weeklyPayFromEntries(p.entries, rate, p.overtime, sickDays) : [];
  const ref = referenceAverage(weeks, isoWeekOf(p.windowStart).start);

  // Holiday taken in the window
  let holidayDays = 0;
  let holidayHours: number | null = 0;
  let hoursDerived = false;
  p.holidayLeave.forEach((lr) => {
    const d = leaveDaysInWindow(lr, p.windowStart, p.windowEnd);
    if (d <= 0) return;
    holidayDays += d;
    const whole =
      lr.startDate >= p.windowStart && (lr.halfDay ? lr.startDate : lr.endDate) <= p.windowEnd;
    if (lr.hours != null && whole) {
      holidayHours = (holidayHours ?? 0) + Number(lr.hours);
    } else if (ref && ref.weeklyHours > 0) {
      holidayHours = (holidayHours ?? 0) + (d * ref.weeklyHours) / dpw;
      hoursDerived = true;
    } else {
      holidayHours = null;
    }
  });
  if (holidayHours !== null) holidayHours = round2(holidayHours);
  if (holidayDays > 0 && hoursDerived) {
    estimate = true;
    notes.push('Holiday hours worked out from their average day');
  }

  // Holiday pay for leave taken
  let holidayPay: number | null = null;
  let rolledUpPay: number | null = null;
  if (p.withMoney) {
    if (irregular && p.rolledUp) {
      // Paid as a 12.07% uplift each period instead (reg 16A).
      const inWindow = p.entries.filter((e) => e.date >= p.windowStart && e.date <= p.windowEnd);
      if (rate) {
        const wk = weeklyPayFromEntries(inWindow, rate, p.overtime);
        const pay = wk.reduce((s, w) => s + w.pay, 0);
        rolledUpPay = rolledUpHolidayPay(pay);
        if (rolledUpPay > 0) {
          records.push({
            kind: 'rolled_up_pay',
            period_start: p.windowStart,
            period_end: p.windowEnd,
            amount: rolledUpPay,
            basis: p.basis,
            is_estimate: false,
            method: `12.07% of £${pay.toFixed(2)} pay for the period. Show it as its own line on the payslip.`,
          });
        }
      } else {
        estimate = true;
        notes.push('No pay rate, so no rolled-up holiday pay');
      }
      holidayPay = holidayDays > 0 ? 0 : null;
      if (holidayDays > 0)
        notes.push('Holiday taken is already paid through rolled-up holiday pay');
    } else if (holidayDays > 0) {
      let method = '';
      if (p.payType === 'annual' && p.annualSalary && p.annualSalary > 0) {
        const day = p.annualSalary / 52 / dpw;
        holidayPay = round2(holidayDays * day);
        method = `${holidayDays} day(s) × £${day.toFixed(2)} (salary ÷ 52 ÷ ${dpw} days a week)`;
      } else if (ref && rate) {
        if (irregular && holidayHours !== null && ref.weeklyHours > 0) {
          const perHour = ref.weeklyPay / ref.weeklyHours;
          holidayPay = round2(holidayHours * perHour);
          method = `${holidayHours}h × £${perHour.toFixed(2)} (average pay per hour over ${ref.weeksUsed} paid weeks)`;
        } else {
          const day = ref.weeklyPay / dpw;
          holidayPay = round2(holidayDays * day);
          method = `${holidayDays} day(s) × £${day.toFixed(2)} (average week £${ref.weeklyPay.toFixed(2)} over ${ref.weeksUsed} paid weeks ÷ ${dpw} days)`;
        }
        if (ref.short) {
          estimate = true;
          notes.push(`Holiday pay from ${ref.weeksUsed} paid weeks, not 52`);
        }
      } else if (rate) {
        const day = rate * 8;
        holidayPay = round2(holidayDays * day);
        method = `${holidayDays} day(s) × 8h × £${rate.toFixed(2)} (no approved hours to average yet)`;
        estimate = true;
        notes.push('No paid weeks to average, so 8 hours a day at their rate');
      } else {
        estimate = true;
        notes.push('No pay rate, so no holiday pay');
      }
      if (holidayPay !== null) {
        records.push({
          kind: 'holiday_pay',
          period_start: p.windowStart,
          period_end: p.windowEnd,
          days: holidayDays,
          hours: holidayHours,
          amount: holidayPay,
          basis: p.basis,
          is_estimate: estimate,
          method: `${method}. Hours from approved timesheets at the current rate.`,
        });
      }
    }
  }

  // Accrual for irregular / part-year (not rolled up): pay periods ending in the window.
  let accruedHours: number | null = null;
  if (irregular && !p.rolledUp) {
    const summary = accrueOverPeriods(
      p.entries.filter((e) => e.date <= p.windowEnd),
      p.periodOf,
      iso(addDays(toDate(p.windowEnd), 1)),
      HOLIDAY_ACCRUAL_PCT,
      {
        leave: p.sickLeave.map((l) => ({ start: l.startDate, end: l.endDate })),
        employedFrom: p.employedFrom,
      }
    );
    const ending = summary.periods.filter((x) => x.end >= p.windowStart && x.end <= p.windowEnd);
    accruedHours = ending.reduce((s, x) => s + x.accrued, 0);
    ending.forEach((x) =>
      records.push({
        kind: 'accrual',
        period_start: x.start,
        period_end: x.end,
        hours: x.accrued,
        basis: p.basis,
        is_estimate: false,
        method:
          `12.07% of ${x.hours}h worked = ${((x.hours * 12.07) / 100).toFixed(3)}h` +
          (x.leaveWeeks > 0
            ? `, plus ${x.leaveAccrual.toFixed(3)}h for ${x.leaveWeeks} week(s) off sick (reg 15C, 12.07% of their average week)`
            : '') +
          `, rounded to ${x.accrued}h. Family leave is not recorded here and is not included`,
      })
    );
    if (ending.length === 0) notes.push('Holiday accrues at the end of the pay period');
  }

  // SSP
  let sspDays = 0;
  let sspPay: number | null = p.withMoney ? 0 : null;
  let sspWeeklyRate: number | null = null;
  p.sickLeave.forEach((s) => {
    if (s.endDate < p.windowStart || s.startDate > p.windowEnd) return;
    const rec = p.sickness.get(s.id);
    let awe = rec?.awe ?? null;
    if (awe === null && p.withMoney) {
      const avg = sspAverageWeeklyEarnings({
        entries: p.entries,
        payType: p.payType,
        hourlyRate: rate,
        annualSalary: p.annualSalary,
        overtime: p.overtime,
        periodOf: p.periodOf,
        sickStart: s.startDate,
        employedFrom: p.employedFrom,
      });
      awe = avg.awe;
      estimate = true;
      if (avg.basis === 'no_payday') {
        notes.push(
          'SSP: not paid yet before the sickness, so enter their contracted weekly pay as average earnings on the sickness record'
        );
      } else if (avg.awe !== null) {
        notes.push(
          `SSP average earnings from approved hours: ${avg.method}. Enter the payroll figure on the sickness record if it differs`
        );
      }
    }
    const res = sspForPeriod({
      rates: p.rates,
      sickStart: s.startDate,
      sickEnd: s.endDate,
      periodStart: p.windowStart,
      periodEnd: p.windowEnd,
      awe: awe ?? 0,
      daysPerWeek: rec?.qualifyingDaysPerWeek ?? dpw,
    });
    sspDays += res.days;
    if (p.withMoney) {
      if (awe === null) {
        sspPay = null;
        estimate = true;
        notes.push('No average earnings or pay rate, so no SSP figure');
      } else if (sspPay !== null) {
        sspPay = round2(sspPay + res.pay);
        sspWeeklyRate = res.weekly?.weekly ?? null;
      }
    }
    if (res.oldRules) {
      estimate = true;
      notes.push('Some sick days are before 6 Apr 2026, when the old SSP rules applied');
    }
    if (res.capped) notes.push('28 weeks of SSP reached');
  });
  if (sspDays === 0 && sspPay === 0) sspPay = null;

  return {
    holidayDays,
    holidayHours: holidayDays > 0 ? holidayHours : null,
    holidayPay,
    accruedHours,
    rolledUpPay,
    sspDays,
    sspPay,
    sspWeekly: sspWeeklyRate,
    estimate,
    notes: [...new Set(notes)],
    basis: p.basis,
    records,
  };
}
