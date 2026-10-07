/** Pay-period draft helpers for PayPeriodFields (ELE-2009). */
import { format, startOfWeek } from 'date-fns';
import type { FirmPaySettings, PayFrequency } from '@/utils/payPeriods';

export interface PayDraft {
  frequency: PayFrequency | null;
  /** yyyy-MM-dd — first day of any one pay period. */
  anchor: string;
  /** weekly-type: payday = period end + N days */
  offsetDays: number;
  /** monthly: 0 = last working day */
  dayOfMonth: number;
  /** monthly: payday falls in the month after the period ends */
  nextMonth: boolean;
}

export const thisMonday = () => format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');

export function draftFromSettings(s: FirmPaySettings | null | undefined): PayDraft {
  return {
    frequency: s?.pay_frequency ?? null,
    anchor:
      s?.pay_period_anchor ??
      (s?.pay_frequency === 'monthly' ? format(new Date(), 'yyyy-MM-01') : thisMonday()),
    offsetDays: s?.payday_offset_days ?? 5,
    dayOfMonth: s?.payday_day_of_month ?? 0,
    nextMonth: !!s?.payday_next_month,
  };
}

export function draftToSettings(d: PayDraft): FirmPaySettings {
  const monthly = d.frequency === 'monthly';
  return {
    has_profile: true,
    pay_frequency: d.frequency,
    pay_period_anchor: d.frequency ? d.anchor : null,
    payday_offset_days: d.frequency && !monthly ? d.offsetDays : null,
    payday_day_of_month: monthly ? d.dayOfMonth : null,
    payday_next_month: monthly ? d.nextMonth : null,
    mileage_rate_pence: null,
  };
}

export function draftsEqual(a: PayDraft, b: PayDraft): boolean {
  const x = draftToSettings(a);
  const y = draftToSettings(b);
  return (
    x.pay_frequency === y.pay_frequency &&
    x.pay_period_anchor === y.pay_period_anchor &&
    x.payday_offset_days === y.payday_offset_days &&
    x.payday_day_of_month === y.payday_day_of_month &&
    !!x.payday_next_month === !!y.payday_next_month
  );
}

export function draftValid(d: PayDraft): boolean {
  if (!d.frequency) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.anchor)) return false;
  if (d.frequency === 'monthly') {
    const day = Number(d.anchor.slice(8, 10));
    return day >= 1 && day <= 28 && d.dayOfMonth >= 0 && d.dayOfMonth <= 31;
  }
  return Number.isInteger(d.offsetDays) && d.offsetDays >= -13 && d.offsetDays <= 35;
}

