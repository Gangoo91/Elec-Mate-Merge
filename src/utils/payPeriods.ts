/**
 * Pay periods and paydays from the firm's settings (ELE-2009).
 *
 * One pure module used by BOTH sides so the office preview and the worker's
 * My pay page can never disagree:
 *   - Employer Hub → Timesheets → Pay period & payday (the setter's preview)
 *   - Worker Tools → My pay
 *
 * Settings live on company_profiles (set_firm_pay_settings / get_firm_pay_settings):
 *   weekly | fortnightly | four_weekly — periods of 7/14/28 days counted from
 *     pay_period_anchor; payday = period end + payday_offset_days.
 *   monthly — periods start on the anchor's day of the month (1 = calendar
 *     month); payday is payday_day_of_month (0 = last working day) of the month
 *     the period ends in, or the month after when payday_next_month.
 * A payday on a Saturday or Sunday moves to the Friday before. Bank holidays
 * are not allowed for — every screen calls the date an estimate.
 */
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  format,
  getDaysInMonth,
  parseISO,
  startOfDay,
} from 'date-fns';

export type PayFrequency = 'weekly' | 'fortnightly' | 'four_weekly' | 'monthly';

export interface FirmPaySettings {
  has_profile: boolean;
  pay_frequency: PayFrequency | null;
  pay_period_anchor: string | null;
  payday_offset_days: number | null;
  payday_day_of_month: number | null;
  payday_next_month: boolean | null;
  mileage_rate_pence: number | null;
}

export interface PayPeriod {
  start: Date;
  end: Date;
  payday: Date;
}

export const PAY_FREQUENCY_LABEL: Record<PayFrequency, string> = {
  weekly: 'Weekly',
  fortnightly: 'Fortnightly',
  four_weekly: 'Every 4 weeks',
  monthly: 'Monthly',
};

const PERIOD_DAYS: Record<Exclude<PayFrequency, 'monthly'>, number> = {
  weekly: 7,
  fortnightly: 14,
  four_weekly: 28,
};

/** Saturday/Sunday → the Friday before. */
export function rollBackWeekend(d: Date): Date {
  const dow = d.getDay();
  if (dow === 6) return addDays(d, -1);
  if (dow === 0) return addDays(d, -2);
  return d;
}

/** Last Monday–Friday of the month containing `d`. */
export function lastWorkingDayOfMonth(d: Date): Date {
  return rollBackWeekend(startOfDay(endOfMonth(d)));
}

/** True when the firm has set enough to work a pay period out. */
export function isPaySettingsComplete(s: FirmPaySettings | null | undefined): boolean {
  if (!s?.pay_frequency || !s.pay_period_anchor) return false;
  if (s.pay_frequency === 'monthly') return s.payday_day_of_month != null;
  return s.payday_offset_days != null;
}

function monthlyPayday(periodEnd: Date, dayOfMonth: number, nextMonth: boolean): Date {
  const month = nextMonth ? addMonths(periodEnd, 1) : periodEnd;
  if (dayOfMonth <= 0) return lastWorkingDayOfMonth(month);
  const day = Math.min(dayOfMonth, getDaysInMonth(month));
  return rollBackWeekend(new Date(month.getFullYear(), month.getMonth(), day));
}

/** The pay period containing `date`, or null when the firm hasn't set one. */
export function payPeriodContaining(
  s: FirmPaySettings | null | undefined,
  date: Date = new Date()
): PayPeriod | null {
  if (!s || !isPaySettingsComplete(s)) return null;
  const anchor = startOfDay(parseISO(s.pay_period_anchor!));
  const day = startOfDay(date);

  if (s.pay_frequency === 'monthly') {
    const startDay = Math.min(anchor.getDate(), 28);
    let start = new Date(day.getFullYear(), day.getMonth(), startDay);
    if (day < start) start = new Date(day.getFullYear(), day.getMonth() - 1, startDay);
    const end = addDays(addMonths(start, 1), -1);
    return {
      start,
      end,
      payday: monthlyPayday(end, s.payday_day_of_month ?? 0, !!s.payday_next_month),
    };
  }

  const len = PERIOD_DAYS[s.pay_frequency as Exclude<PayFrequency, 'monthly'>];
  const diff = differenceInCalendarDays(day, anchor);
  const k = Math.floor(diff / len);
  const start = addDays(anchor, k * len);
  const end = addDays(start, len - 1);
  return { start, end, payday: rollBackWeekend(addDays(end, s.payday_offset_days ?? 0)) };
}

/** The period before `p`. */
export function previousPayPeriod(
  s: FirmPaySettings | null | undefined,
  p: PayPeriod
): PayPeriod | null {
  return payPeriodContaining(s, addDays(p.start, -1));
}

/** "1–31 Oct" / "28 Sep – 4 Oct" / "29 Dec 2026 – 4 Jan 2027". */
export function formatPeriodRange(start: Date, end: Date): string {
  if (start.getFullYear() !== end.getFullYear()) {
    return `${format(start, 'd MMM yyyy')} – ${format(end, 'd MMM yyyy')}`;
  }
  if (start.getMonth() === end.getMonth()) {
    return `${format(start, 'd')}–${format(end, 'd MMM')}`;
  }
  return `${format(start, 'd MMM')} – ${format(end, 'd MMM')}`;
}

/** Plain-English description of the firm's rule, for settings and help text. */
export function describePayRule(s: FirmPaySettings | null | undefined): string | null {
  if (!s || !isPaySettingsComplete(s)) return null;
  if (s.pay_frequency === 'monthly') {
    const anchorDay = parseISO(s.pay_period_anchor!).getDate();
    const period = anchorDay === 1 ? 'calendar month' : `month from the ${ordinal(anchorDay)}`;
    const dom = s.payday_day_of_month ?? 0;
    const when =
      dom <= 0 ? 'the last working day' : `the ${ordinal(dom)}`;
    const which = s.payday_next_month ? 'of the next month' : 'of the month';
    return `Monthly (${period}), paid ${when} ${which}`;
  }
  const off = s.payday_offset_days ?? 0;
  const lag =
    off === 0
      ? 'on the last day of the period'
      : off > 0
        ? `${off} day${off === 1 ? '' : 's'} after the period ends`
        : `${-off} day${off === -1 ? '' : 's'} before the period ends`;
  return `${PAY_FREQUENCY_LABEL[s.pay_frequency!]}, paid ${lag}`;
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

/** Inclusive date-only test on yyyy-MM-dd strings. */
export function isoInRange(iso: string | null | undefined, start: Date, end: Date): boolean {
  if (!iso) return false;
  const d = iso.slice(0, 10);
  return d >= format(start, 'yyyy-MM-dd') && d <= format(end, 'yyyy-MM-dd');
}
