import { useMemo, useCallback } from 'react';
import { useProfitabilitySummary, useCashFlowSummary, formatCurrency } from './useFinanceReports';
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

export function useBusinessHubData(): BusinessHubData {
  const { data: profitability, isLoading: profitLoading } = useProfitabilitySummary();
  const { data: cashFlow, isLoading: cashLoading } = useCashFlowSummary();
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

  // Win rate: (accepted / (sent + accepted)) * 100
  const winRate = useMemo(() => {
    const sent = savedQuotes.filter(
      (q) => q.status === 'sent' || q.acceptance_status === 'accepted' || q.acceptance_status === 'rejected'
    );
    const accepted = savedQuotes.filter((q) => q.acceptance_status === 'accepted');
    if (sent.length === 0) return 0;
    return Math.round((accepted.length / sent.length) * 100);
  }, [savedQuotes]);

  const isLoading = profitLoading || cashLoading || quotesLoading || invoicesLoading;

  const lastUpdated = useMemo(() => {
    const dates = [quotesLastUpdated, invoicesLastUpdated].filter(Boolean) as Date[];
    if (dates.length === 0) return new Date();
    return new Date(Math.max(...dates.map((d) => d.getTime())));
  }, [quotesLastUpdated, invoicesLastUpdated]);

  const refresh = useCallback(async () => {
    await Promise.all([refreshQuotes(), fetchInvoices()]);
  }, [refreshQuotes, fetchInvoices]);

  return {
    revenue: profitability.totalRevenue,
    paidThisMonth: cashFlow.paidThisMonth,
    outstanding: cashFlow.totalOutstanding,
    overdueAmount: cashFlow.overdueAmount,
    overdueCount: cashFlow.overdueCount,
    winRate,
    quotes: savedQuotes,
    invoices,
    isLoading,
    lastUpdated,
    refresh,
    formatCurrency,
  };
}
