import { useMemo, useCallback } from 'react';
import { useQuoteStorage } from './useQuoteStorage';
import { useInvoiceStorage } from './useInvoiceStorage';
import { Quote } from '@/types/quote';

export interface BusinessHubData {
  revenue: number;
  paidThisMonth: number;
  outstanding: number;
  overdueAmount: number;
  overdueCount: number;
  winRate: number;
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

    // Outstanding — sent but not yet paid
    const outstandingInvoices = invoices.filter(
      (inv) => inv.invoice_status === 'sent' || inv.invoice_status === 'overdue'
    );
    const outstanding = outstandingInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);

    // Overdue — explicitly overdue OR due date has passed and not paid
    const overdueInvoices = invoices.filter((inv) => {
      if (inv.invoice_status === 'paid') return false;
      if (inv.invoice_status === 'overdue') return true;
      if (
        inv.invoice_due_date &&
        new Date(inv.invoice_due_date) < now &&
        inv.invoice_status === 'sent'
      )
        return true;
      return false;
    });
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const overdueCount = overdueInvoices.length;

    // Total revenue — all paid invoices ever
    const revenue = invoices
      .filter((inv) => inv.invoice_status === 'paid')
      .reduce((sum, inv) => sum + (inv.total || 0), 0);

    return { paidThisMonth, outstanding, overdueAmount, overdueCount, revenue };
  }, [invoices]);

  // Win rate: (accepted / total decided) * 100
  const winRate = useMemo(() => {
    const decided = savedQuotes.filter(
      (q) =>
        q.status === 'sent' ||
        q.acceptance_status === 'accepted' ||
        q.acceptance_status === 'rejected'
    );
    const accepted = savedQuotes.filter((q) => q.acceptance_status === 'accepted');
    if (decided.length === 0) return 0;
    return Math.round((accepted.length / decided.length) * 100);
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
    winRate,
    quotes: savedQuotes,
    invoices,
    isLoading,
    lastUpdated,
    refresh,
    formatCurrency: gbp,
  };
}
