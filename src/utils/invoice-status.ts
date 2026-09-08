/**
 * Single source of truth for an invoice's effective state.
 *
 * The overdue business rule: a draft is never overdue; paid always wins; an
 * explicit invoice_status === 'overdue' (set by the reminder cron) counts;
 * otherwise an invoice is overdue once its due date is more than 24 hours
 * past (the grace period the whole app promises).
 *
 * DRAFTS: an invoice nobody has been sent cannot be late. This rule used to
 * live outside the helper, which meant every caller had to remember it and
 * most did not — so the two hubs disagreed with each other on screen. The
 * Electrician Hub read `invoice_status !== 'paid'` and reported exactly twice
 * the overdue count the Business Hub did, because the drafts were the other
 * half. Both were "correct"; a user comparing them can only conclude the app
 * cannot count.
 *
 * It also had teeth beyond display. InvoicesPage's "Chase payment" action ran
 * this predicate to generate tasks, so it produced chase-ups for invoices the
 * client had never been sent; and QuoteInvoiceAnalytics excluded drafts from
 * outstanding but not from overdue in adjacent lines, letting overdue exceed
 * the outstanding it is a subset of.
 *
 * Putting the rule here fixes all of them at once, and stops the next caller
 * having to know.
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

/** Raised but never issued — no client has seen it, so nothing is owed yet. */
export const isInvoiceDraft = (inv: InvoiceStatusLike): boolean =>
  inv.invoice_status === 'draft';

export const isInvoiceOverdue = (inv: InvoiceStatusLike): boolean => {
  if (isInvoiceDraft(inv)) return false;
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

/**
 * Payment terms → days until due. ONE parser for every surface.
 *
 * `company_profiles.payment_terms` is free text chosen from a list — "30 days",
 * "On receipt", "Due on receipt", and since ELE-1684 "On completion". Three
 * places used to parse it with three slightly different regexes, so a profile
 * set to "On completion" produced a due date of today on one screen and thirty
 * days out on the next. Anything with no number and no recognised phrase falls
 * back to 30, the historical default.
 */
export const paymentTermsToDays = (terms: string | null | undefined): number => {
  const t = (terms ?? '').trim();
  if (!t) return 30;
  if (/receipt|completion|immediate/i.test(t)) return 0;
  const m = /(\d+)/.exec(t);
  return m ? parseInt(m[1], 10) : 30;
};

/** Due date for an invoice raised now (or at `from`) under the given terms. */
export const dueDateForTerms = (terms: string | null | undefined, from: Date = new Date()): Date =>
  new Date(from.getTime() + paymentTermsToDays(terms) * 86400000);
