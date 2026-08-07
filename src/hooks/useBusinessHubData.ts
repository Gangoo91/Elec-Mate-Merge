import { useMemo, useCallback } from 'react';
import { useQuoteStorage } from './useQuoteStorage';
import { useInvoiceStorage } from './useInvoiceStorage';
import { Quote } from '@/types/quote';
import { isInvoiceOverdue } from '@/utils/invoice-status';

export interface BusinessHubData {
  revenue: number;
  paidThisMonth: number;
  outstanding: number;
  overdueAmount: number;
  overdueCount: number;
  latePaymentCount: number;
  winRate: number | null;
  quotes: Quote[];
  invoices: Quote[];
  isLoading: boolean;
  lastUpdated: Date;
  refresh: () => Promise<void>;
  formatCurrency: (amount: number) => string;
}

function gbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function useBusinessHubData(): BusinessHubData {
  const {
    savedQuotes,
    loading: quotesLoading,
    refreshQuotes,
    lastUpdated: quotesLastUpdated,
  } = useQuoteStorage();
  const {
    invoices,
    isLoading: invoicesLoading,
    fetchInvoices,
    lastUpdated: invoicesLastUpdated,
  } = useInvoiceStorage();

  // All KPIs derived from the electrician's own quotes + invoices
  const kpis = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Paid this month — invoices marked paid with invoice_paid_at in current month
    const paidThisMonth = invoices
      .filter(
        (inv) =>
          inv.invoice_status === 'paid' &&
          inv.invoice_paid_at &&
          new Date(inv.invoice_paid_at) >= startOfMonth
      )
      .reduce((sum, inv) => sum + (inv.total || 0), 0);

    // Remaining balance on an invoice = total minus anything already paid
    // (e.g. a Xero deposit recorded in total_paid). Clamp at 0 (ELE-1041).
    const remaining = (inv: { total?: number | null; total_paid?: number | null }) =>
      Math.max(0, (inv.total || 0) - (inv.total_paid || 0));

    // Outstanding — sent but not yet paid, net of any deposit already taken
    const outstandingInvoices = invoices.filter(
      (inv) => inv.invoice_status === 'sent' || inv.invoice_status === 'overdue'
    );
    const outstanding = outstandingInvoices.reduce((sum, inv) => sum + remaining(inv), 0);

    // Overdue — the SHARED rule (utils/invoice-status), not a fourth local copy.
    // The hand-rolled version here required `invoice_status === 'sent'` for the
    // due-date case, so an invoice sitting in any other non-paid state was
    // silently never overdue on this page while it was on others.
    const overdueInvoices = invoices.filter(isInvoiceOverdue);
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + remaining(inv), 0);
    const overdueCount = overdueInvoices.length;

    // Total revenue — all paid invoices ever
    const revenue = invoices
      .filter((inv) => inv.invoice_status === 'paid')
      .reduce((sum, inv) => sum + (inv.total || 0), 0);

    // Late payments — invoices paid after due date
    const latePaymentCount = invoices.filter((inv) => {
      if (inv.invoice_status !== 'paid' || !inv.invoice_paid_at || !inv.invoice_due_date) return false;
      return new Date(inv.invoice_paid_at) > new Date(inv.invoice_due_date);
    }).length;

    return { paidThisMonth, outstanding, overdueAmount, overdueCount, latePaymentCount, revenue };
  }, [invoices]);

  /**
   * Win rate — or null when the data cannot honestly support one.
   *
   * Two things were wrong. `decided` counted `status === 'sent'`, but sent is
   * a SENDING state: a quote awaiting a reply has not been decided, and every
   * accepted quote already matched the accepted clause anyway, so the
   * denominator collapsed onto the numerator.
   *
   * The deeper problem is that nobody ever marks a quote rejected. On the
   * account this was found on: 30 accepted, 10 pending, ZERO rejected — so the
   * ratio was structurally pinned at 100% no matter what happened. Losses are
   * simply left as pending forever. A "100% win rate" that cannot fall is not
   * a statistic, it is a rendering artefact, and putting it on the hub next to
   * real money invites the user to trust it.
   *
   * So: only decisions count, and we return null unless at least one quote has
   * actually been rejected — without a single loss on record there is no way
   * to tell "wins everything" from "never writes down a loss".
   */
  const winRate = useMemo<number | null>(() => {
    const accepted = savedQuotes.filter((q) => q.acceptance_status === 'accepted').length;
    const rejected = savedQuotes.filter((q) => q.acceptance_status === 'rejected').length;
    const decided = accepted + rejected;
    if (decided < 5 || rejected === 0) return null;
    return Math.round((accepted / decided) * 100);
  }, [savedQuotes]);

  const isLoading = quotesLoading || invoicesLoading;

  const lastUpdated = useMemo(() => {
    const dates = [quotesLastUpdated, invoicesLastUpdated].filter(Boolean) as Date[];
    if (dates.length === 0) return new Date();
    return new Date(Math.max(...dates.map((d) => d.getTime())));
  }, [quotesLastUpdated, invoicesLastUpdated]);

  const refresh = useCallback(async () => {
    await Promise.all([refreshQuotes(), fetchInvoices()]);
  }, [refreshQuotes, fetchInvoices]);

  return {
    revenue: kpis.revenue,
    paidThisMonth: kpis.paidThisMonth,
    outstanding: kpis.outstanding,
    overdueAmount: kpis.overdueAmount,
    overdueCount: kpis.overdueCount,
    latePaymentCount: kpis.latePaymentCount,
    winRate,
    quotes: savedQuotes,
    invoices,
    isLoading,
    lastUpdated,
    refresh,
    formatCurrency: gbp,
  };
}
