import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Quote } from '@/types/quote';
import { ChevronRight } from 'lucide-react';
import {
  differenceInDays,
  subDays,
  isAfter,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachMonthOfInterval,
  subMonths,
  formatDistanceToNow,
} from 'date-fns';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface QuoteInvoiceAnalyticsProps {
  quotes: Quote[];
  invoices?: Quote[];
  formatCurrency: (value: number) => string;
  lastUpdated?: Date;
  onRefresh?: () => Promise<void>;
  isLoading?: boolean;
}

type DateRange = '7d' | '30d' | '90d' | '12m';

export const QuoteInvoiceAnalytics: React.FC<QuoteInvoiceAnalyticsProps> = ({
  quotes,
  invoices = [],
  formatCurrency,
  lastUpdated,
  onRefresh,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const getDateThreshold = (range: DateRange) => {
    switch (range) {
      case '7d': return subDays(new Date(), 7);
      case '30d': return subDays(new Date(), 30);
      case '90d': return subDays(new Date(), 90);
      case '12m': return subMonths(new Date(), 12);
    }
  };

  const filteredQuotes = useMemo(() => {
    const threshold = getDateThreshold(dateRange);
    return quotes.filter((q) => isAfter(new Date(q.createdAt), threshold));
  }, [quotes, dateRange]);

  const filteredInvoices = useMemo(() => {
    const threshold = getDateThreshold(dateRange);
    return invoices.filter((i) => i.invoice_date && isAfter(new Date(i.invoice_date), threshold));
  }, [invoices, dateRange]);

  const metrics = useMemo(() => {
    const sentQuotes = filteredQuotes.filter((q) => q.status === 'sent' || q.acceptance_status);
    const acceptedQuotes = filteredQuotes.filter((q) => q.acceptance_status === 'accepted');
    const paidInvoices = filteredInvoices.filter((i) => i.invoice_status === 'paid');
    const unpaidInvoices = filteredInvoices.filter((i) => i.invoice_status !== 'paid');
    const overdueInvoices = filteredInvoices.filter(
      (i) => i.invoice_status !== 'paid' && i.invoice_due_date && isAfter(new Date(), new Date(i.invoice_due_date))
    );

    const winRate = sentQuotes.length > 0 ? Math.round((acceptedQuotes.length / sentQuotes.length) * 100) : 0;
    const avgQuoteValue = filteredQuotes.length > 0 ? filteredQuotes.reduce((sum, q) => sum + q.total, 0) / filteredQuotes.length : 0;
    const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0);
    const pipelineValue = acceptedQuotes.filter((q) => !q.invoice_raised).reduce((sum, q) => sum + q.total, 0);
    const outstandingAmount = unpaidInvoices.reduce((sum, i) => sum + i.total, 0);

    const paidWithDates = paidInvoices.filter((i) => i.invoice_date && i.invoice_paid_at);
    const avgDaysToPayment = paidWithDates.length > 0
      ? Math.round(paidWithDates.reduce((sum, i) => sum + differenceInDays(new Date(i.invoice_paid_at!), new Date(i.invoice_date!)), 0) / paidWithDates.length)
      : 0;

    return { winRate, avgQuoteValue, totalRevenue, pipelineValue, outstandingAmount, avgDaysToPayment, overdueCount: overdueInvoices.length, paidCount: paidInvoices.length, acceptedCount: acceptedQuotes.length };
  }, [filteredQuotes, filteredInvoices]);

  const chartData = useMemo(() => {
    const threshold = getDateThreshold(dateRange);
    const now = new Date();

    if (dateRange === '12m') {
      const months = eachMonthOfInterval({ start: threshold, end: now });
      return months.map((month) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const monthInvoices = invoices.filter((i) => i.invoice_paid_at && new Date(i.invoice_paid_at) >= monthStart && new Date(i.invoice_paid_at) <= monthEnd);
        const monthQuotes = quotes.filter((q) => new Date(q.createdAt) >= monthStart && new Date(q.createdAt) <= monthEnd);
        return { date: format(month, 'MMM'), revenue: monthInvoices.reduce((s, i) => s + i.total, 0), quotes: monthQuotes.length };
      });
    }

    const days = eachDayOfInterval({ start: threshold, end: now });
    return days.map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayInvoices = invoices.filter((i) => i.invoice_paid_at && format(new Date(i.invoice_paid_at), 'yyyy-MM-dd') === dayStr);
      const dayQuotes = quotes.filter((q) => format(new Date(q.createdAt), 'yyyy-MM-dd') === dayStr);
      return { date: format(day, dateRange === '7d' ? 'EEE' : 'dd/MM'), revenue: dayInvoices.reduce((s, i) => s + i.total, 0), quotes: dayQuotes.length };
    });
  }, [quotes, invoices, dateRange]);

  const hasRevenueData = chartData.some((d) => d.revenue > 0);
  const hasQuoteData = chartData.some((d) => d.quotes > 0);

  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
    { value: '12m', label: '12M' },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger — clean, no icon box */}
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between py-2 touch-manipulation">
          <span className="text-xs font-medium text-white uppercase tracking-wider">Analytics</span>
          <ChevronRight className={cn('w-4 h-4 text-white transition-transform', isOpen && 'rotate-90')} />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3 space-y-4">
        {/* Date range pills */}
        <div className="flex gap-1.5">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setDateRange(option.value)}
              className={cn(
                'h-8 px-3 rounded-lg text-[12px] font-medium transition-all touch-manipulation active:scale-[0.98]',
                dateRange === option.value
                  ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                  : 'bg-white/[0.04] text-white border border-white/[0.08]'
              )}
            >
              {option.label}
            </button>
          ))}
          {lastUpdated && (
            <span className="ml-auto text-[11px] text-white self-center">
              {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </span>
          )}
        </div>

        {/* Metrics — clean text grid, no icons */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white uppercase tracking-wider">Win Rate</p>
            <p className={cn('text-[20px] font-bold mt-1', metrics.winRate >= 50 ? 'text-emerald-400' : 'text-white')}>
              {metrics.winRate}%
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white uppercase tracking-wider">Avg Quote</p>
            <p className="text-[20px] font-bold text-white mt-1">
              {formatCurrency(metrics.avgQuoteValue)}
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white uppercase tracking-wider">Revenue</p>
            <p className="text-[20px] font-bold text-emerald-400 mt-1">
              {formatCurrency(metrics.totalRevenue)}
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white uppercase tracking-wider">Pipeline</p>
            <p className="text-[20px] font-bold text-elec-yellow mt-1">
              {formatCurrency(metrics.pipelineValue)}
            </p>
            {metrics.acceptedCount > 0 && (
              <p className="text-[10px] text-white mt-0.5">{metrics.acceptedCount} accepted</p>
            )}
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white uppercase tracking-wider">Outstanding</p>
            <p className={cn('text-[20px] font-bold mt-1', metrics.overdueCount > 0 ? 'text-red-400' : 'text-white')}>
              {formatCurrency(metrics.outstandingAmount)}
            </p>
            {metrics.overdueCount > 0 && (
              <p className="text-[10px] text-red-400 mt-0.5">{metrics.overdueCount} overdue</p>
            )}
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white uppercase tracking-wider">Days to Pay</p>
            <p className={cn(
              'text-[20px] font-bold mt-1',
              metrics.avgDaysToPayment <= 14 ? 'text-emerald-400' : metrics.avgDaysToPayment <= 30 ? 'text-amber-400' : 'text-red-400'
            )}>
              {metrics.avgDaysToPayment > 0 ? `${metrics.avgDaysToPayment}d` : '—'}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="px-4 pt-3 pb-1">
            <p className="text-[11px] text-white font-medium uppercase tracking-wider">Revenue & Activity</p>
          </div>
          {!hasRevenueData && !hasQuoteData ? (
            <div className="h-36 flex items-center justify-center">
              <p className="text-[12px] text-white">No data for this period</p>
            </div>
          ) : (
            <div className="h-40 px-2 pb-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: '#fff', fontSize: 10 }} axisLine={{ stroke: '#333' }} tickLine={false} interval="preserveStartEnd" />
                  <YAxis yAxisId="revenue" tick={{ fill: '#fff', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`} />
                  <YAxis yAxisId="quotes" orientation="right" hide />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number, name: string) => name === 'revenue' ? [formatCurrency(value), 'Revenue'] : [value, 'Quotes']}
                  />
                  <Bar yAxisId="quotes" dataKey="quotes" fill="#facc15" fillOpacity={0.2} radius={[2, 2, 0, 0]} />
                  <Area yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#revenueGrad)" animationDuration={1000} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
          {(hasRevenueData || hasQuoteData) && (
            <div className="flex items-center justify-center gap-4 pb-3 text-[10px] text-white">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Revenue
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-yellow-400/30" />
                Quotes
              </span>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
