/**
 * One source of truth for pay maths across every surface that prices hours —
 * the employer Timesheets page, payroll exports, and the worker's My Pay page.
 * Overtime is per person per DAY: hours over the worker's daily threshold pay
 * at their own multiplier (1×, 1.2×, 1.5×…).
 */

export interface TimeEntryLike {
  /** yyyy-MM-dd */
  date: string;
  totalHours: number;
}

export interface OvertimeTerms {
  /** Pay multiplier for overtime hours — 1 = flat rate. */
  multiplier: number;
  /** Daily hours above which time counts as overtime. */
  threshold: number;
}

export const DEFAULT_OVERTIME_TERMS: OvertimeTerms = { multiplier: 1.5, threshold: 8 };

/** Split a worker's entries into regular vs overtime hours, per day. */
export function splitDailyOvertime(
  entries: TimeEntryLike[],
  threshold: number
): { regularHours: number; overtimeHours: number } {
  const hoursByDay = new Map<string, number>();
  for (const entry of entries) {
    hoursByDay.set(entry.date, (hoursByDay.get(entry.date) ?? 0) + entry.totalHours);
  }
  let regularHours = 0;
  let overtimeHours = 0;
  hoursByDay.forEach((dayHours) => {
    // Clamp against bad data (negative hours from imports/corrections, or a
    // negative threshold) — payroll maths must never go below zero.
    const day = Math.max(0, dayHours);
    const limit = Math.max(0, threshold);
    regularHours += Math.min(day, limit);
    overtimeHours += Math.max(day - limit, 0);
  });
  return { regularHours, overtimeHours };
}

/** Gross pay for a regular/overtime split at the worker's rate and terms. */
export function grossPay(
  regularHours: number,
  overtimeHours: number,
  hourlyRate: number,
  multiplier: number
): number {
  return regularHours * hourlyRate + overtimeHours * hourlyRate * multiplier;
}

/** Overtime-aware cost of a worker's entries in one call. */
export function labourCost(
  entries: TimeEntryLike[],
  hourlyRate: number,
  terms: OvertimeTerms
): number {
  const { regularHours, overtimeHours } = splitDailyOvertime(entries, terms.threshold);
  return grossPay(regularHours, overtimeHours, hourlyRate, terms.multiplier);
}
