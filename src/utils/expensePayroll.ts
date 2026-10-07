/**
 * Expenses paid on payday (ELE-1825 / ELE-2009 follow-up).
 *
 * When Accounting sends a payroll run with expenses, each claim carries the
 * run (payroll_export_id) and its payday (payroll_payday). It reads "In
 * payroll · paid on 30 Oct" until the daily job marks it Paid with
 * paid_date = payday. One helper so the office Expenses page, Accounting and
 * the worker's Expenses and My pay pages all say the same thing.
 */
import { format, parseISO } from 'date-fns';

export interface PayrollClaimFields {
  status?: string | null;
  paid_date?: string | null;
  payroll_export_id?: string | null;
  payroll_payday?: string | null;
}

export type ExpensePayState =
  | { kind: 'in_payroll'; payday: string }
  | { kind: 'paid'; date: string; viaPayroll: boolean }
  | null;

export function expensePayState(c: PayrollClaimFields): ExpensePayState {
  const st = (c.status || '').toLowerCase();
  if (st === 'paid' && c.paid_date) {
    return { kind: 'paid', date: c.paid_date, viaPayroll: !!c.payroll_export_id };
  }
  if (st === 'approved' && c.payroll_export_id && c.payroll_payday) {
    return { kind: 'in_payroll', payday: c.payroll_payday };
  }
  return null;
}

/** "30 Oct" (or "30 Oct 2025" when not this year). */
export function shortPayday(iso: string): string {
  try {
    const d = parseISO(iso.slice(0, 10));
    return format(d, d.getFullYear() === new Date().getFullYear() ? 'd MMM' : 'd MMM yyyy');
  } catch {
    return iso;
  }
}

/** "In payroll · paid on 30 Oct" / "Paid on 30 Oct" / null. */
export function expensePayLabel(c: PayrollClaimFields): string | null {
  const s = expensePayState(c);
  if (!s) return null;
  return s.kind === 'in_payroll'
    ? `In payroll · paid on ${shortPayday(s.payday)}`
    : `Paid on ${shortPayday(s.date)}`;
}

export const isInPayroll = (c: PayrollClaimFields) => expensePayState(c)?.kind === 'in_payroll';
