/**
 * Single source of truth for an invoice's effective state.
 *
 * The overdue business rule: paid always wins; an explicit
 * invoice_status === 'overdue' (set by the reminder cron) counts; otherwise
 * an invoice is overdue once its due date is more than 24 hours past
 * (the grace period the whole app promises).
 */
import { isPast, addHours, differenceInDays } from 'date-fns';

export interface InvoiceStatusLike {
  invoice_status?: string;
  invoice_due_date?: string | Date | null;
  total?: number;
  total_paid?: number;
}

export const isInvoicePaid = (inv: InvoiceStatusLike): boolean =>
  inv.invoice_status === 'paid';

export const isInvoiceOverdue = (inv: InvoiceStatusLike): boolean => {
  if (isInvoicePaid(inv)) return false;
  if (inv.invoice_status === 'overdue') return true;
  return !!inv.invoice_due_date && isPast(addHours(new Date(inv.invoice_due_date), 24));
};

/** Whole days past the due date (0 when not overdue / no due date). */
export const getInvoiceDaysOverdue = (inv: InvoiceStatusLike): number => {
  if (!isInvoiceOverdue(inv) || !inv.invoice_due_date) return 0;
  return Math.max(1, differenceInDays(new Date(), new Date(inv.invoice_due_date)));
};

/** What's actually still owed once part-payments are netted off. */
export const getInvoiceOutstanding = (inv: InvoiceStatusLike): number =>
  Math.max(0, (inv.total || 0) - (inv.total_paid || 0));
