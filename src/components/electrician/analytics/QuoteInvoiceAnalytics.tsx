import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Quote } from '@/types/quote';
import { MetricCard } from './MetricCard';
import { ConversionFunnel } from './ConversionFunnel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Receipt,
  Clock,
  PoundSterling,
  Percent,
  BarChart3,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Wallet,
  Timer,
  FileText
} from 'lucide-react';
import { differenceInDays, subDays, isAfter, format, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, subMonths, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, ComposedChart, Bar } from 'recharts';
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(lastUpdated || new Date());

  // Update the last update time when data changes
  useEffect(() => {
    if (lastUpdated) {
      setLastUpdateTime(lastUpdated);
      // Show pulse animation for 3 seconds when data updates
      setIsUpdating(true);
      const timer = setTimeout(() => setIsUpdating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdated, quotes.length, invoices.length]);

  // Format relative time for "Updated X mins ago"
  const relativeUpdateTime = useMemo(() => {
    return formatDistanceToNow(lastUpdateTime, { addSuffix: true });
  }, [lastUpdateTime]);

  // Handle manual refresh
  const handleRefresh = useCallback(async () => {
    if (onRefresh && !isLoading) {
      await onRefresh();
      setLastUpdateTime(new Date());
    }
  }, [onRefresh, isLoading]);

  // Filter data by date range
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
    return quotes.filter(q => isAfter(new Date(q.createdAt), threshold));
  }, [quotes, dateRange]);

  const filteredInvoices = useMemo(() => {
    const threshold = getDateThreshold(dateRange);
    return invoices.filter(i => i.invoice_date && isAfter(new Date(i.invoice_date), threshold));
  }, [invoices, dateRange]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const sentQuotes = filteredQuotes.filter(q => q.status === 'sent' || q.acceptance_status);
    const acceptedQuotes = filteredQuotes.filter(q => q.acceptance_status === 'accepted');
    const rejectedQuotes = filteredQuotes.filter(q => q.acceptance_status === 'rejected');
    const draftQuotes = filteredQuotes.filter(q => q.status === 'draft');

    const paidInvoices = filteredInvoices.filter(i => i.invoice_status === 'paid');
    const unpaidInvoices = filteredInvoices.filter(i => i.invoice_status !== 'paid');
    const overdueInvoices = filteredInvoices.filter(i =>
      i.invoice_status !== 'paid' &&
      i.invoice_due_date &&
      isAfter(new Date(), new Date(i.invoice_due_date))
    );

    // Win rate
    const winRate = sentQuotes.length > 0
      ? Math.round((acceptedQuotes.length / sentQuotes.length) * 100)
      : 0;

    // Average quote value
    const avgQuoteValue = filteredQuotes.length > 0
      ? filteredQuotes.reduce((sum, q) => sum + q.total, 0) / filteredQuotes.length
      : 0;

    // Total revenue (paid invoices)
    const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0);

    // Pipeline value (accepted quotes that haven't been invoiced yet OR unpaid invoices)
    const pipelineFromQuotes = acceptedQuotes
      .filter(q => !q.invoice_raised)
      .reduce((sum, q) => sum + q.total, 0);
    const pipelineValue = pipelineFromQuotes;

    // Outstanding amount (unpaid invoices)
    const outstandingAmount = unpaidInvoices.reduce((sum, i) => sum + i.total, 0);

    // Average days to payment
    const paidWithDates = paidInvoices.filter(i => i.invoice_date && i.invoice_paid_at);
    const avgDaysToPayment = paidWithDates.length > 0
      ? Math.round(
          paidWithDates.reduce((sum, i) => {
            const days = differenceInDays(
              new Date(i.invoice_paid_at!),
              new Date(i.invoice_date!)
            );
            return sum + days;
          }, 0) / paidWithDates.length
        )
      : 0;

    // Pipeline values for funnel
    const invoicedQuotes = filteredQuotes.filter(q => q.invoice_number);

    return {
      winRate,
      avgQuoteValue,
      totalRevenue,
      pipelineValue,
      outstandingAmount,
      avgDaysToPayment,
      counts: {
        drafts: draftQuotes.length,
        sent: sentQuotes.length - acceptedQuotes.length - rejectedQuotes.length,
        accepted: acceptedQuotes.length - invoicedQuotes.length,
        invoiced: invoicedQuotes.length,
        paid: paidInvoices.length,
        quotes: filteredQuotes.length,
        invoices: filteredInvoices.length,
      },
      values: {
        drafts: draftQuotes.reduce((s, q) => s + q.total, 0),
        sent: (sentQuotes.length - acceptedQuotes.length - rejectedQuotes.length) > 0
          ? filteredQuotes.filter(q => q.status === 'sent' && !q.acceptance_status).reduce((s, q) => s + q.total, 0)
          : 0,
        accepted: acceptedQuotes.filter(q => !q.invoice_number).reduce((s, q) => s + q.total, 0),
        invoiced: invoicedQuotes.reduce((s, q) => s + q.total, 0),
        paid: totalRevenue,
      },
      overdueCount: overdueInvoices.length,
    };
  }, [filteredQuotes, filteredInvoices]);

  // Generate chart data with quote volume overlay
  const chartData = useMemo(() => {
    const threshold = getDateThreshold(dateRange);
    const now = new Date();

    if (dateRange === '12m') {
      // Monthly data for 12 months
      const months = eachMonthOfInterval({ start: threshold, end: now });
      return months.map(month => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);

        const monthInvoices = invoices.filter(i => {
          if (!i.invoice_paid_at) return false;
          const paidDate = new Date(i.invoice_paid_at);
          return paidDate >= monthStart && paidDate <= monthEnd;
        });

        const monthQuotes = quotes.filter(q => {
          const created = new Date(q.createdAt);
          return created >= monthStart && created <= monthEnd;
        });

        return {
          date: format(month, 'MMM'),
          revenue: monthInvoices.reduce((s, i) => s + i.total, 0),
          quotes: monthQuotes.length,
        };
      });
    } else {
      // Daily data
      const days = eachDayOfInterval({ start: threshold, end: now });
      return days.map(day => {
        const dayStr = format(day, 'yyyy-MM-dd');

        const dayInvoices = invoices.filter(i => {
          if (!i.invoice_paid_at) return false;
          return format(new Date(i.invoice_paid_at), 'yyyy-MM-dd') === dayStr;
        });

        const dayQuotes = quotes.filter(q =>
          format(new Date(q.createdAt), 'yyyy-MM-dd') === dayStr
        );

        return {
          date: format(day, dateRange === '7d' ? 'EEE' : 'dd/MM'),
          revenue: dayInvoices.reduce((s, i) => s + i.total, 0),
          quotes: dayQuotes.length,
        };
      });
    }
  }, [quotes, invoices, dateRange]);

  // Check if chart has any revenue data
  const hasRevenueData = useMemo(() => {
    return chartData.some(d => d.revenue > 0);
  }, [chartData]);

  const hasQuoteData = useMemo(() => {
    return chartData.some(d => d.quotes > 0);
  }, [chartData]);

  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
    { value: '12m', label: '12M' },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.05] active:scale-[0.98] transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center relative">
              <BarChart3 className="h-5 w-5 text-black" />
              {isUpdating && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="text-[15px] font-medium text-white">Analytics Dashboard</p>
              <p className="text-[13px] text-white/70">
                {metrics.winRate}% win rate • {formatCurrency(metrics.totalRevenue)} revenue
              </p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-white/70" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white/70" />
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4 space-y-4">
        {/* Date Range Selector + Refresh */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {dateRangeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setDateRange(option.value)}
                className={cn(
                  "px-3 sm:px-4 py-2 sm:py-2.5 h-10 sm:h-11 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all touch-manipulation active:scale-[0.98]",
                  dateRange === option.value
                    ? "bg-elec-yellow text-black font-semibold"
                    : "bg-white/[0.05] text-white border border-white/[0.06]"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Refresh button + Last updated */}
          <div className="flex items-center gap-2 text-xs text-white/50 shrink-0">
            <span className="hidden sm:inline">{relativeUpdateTime}</span>
            {onRefresh && (
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className={cn(
                  "p-2 rounded-lg bg-white/[0.05] border border-white/[0.06] touch-manipulation active:scale-[0.95] transition-all",
                  isLoading && "opacity-50"
                )}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile: Show last updated below date range */}
        <p className="text-[11px] text-white/40 sm:hidden -mt-2">
          Updated {relativeUpdateTime}
        </p>

        {/* Metric Cards Grid - 6 cards in 3x2 on mobile, 2x3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <MetricCard
            label="Win Rate"
            value={`${metrics.winRate}%`}
            icon={<Percent className="h-5 w-5" />}
            color="emerald"
            trend={metrics.winRate >= 50 ? { value: 'Good', isPositive: true } : undefined}
            isUpdating={isUpdating}
            compact
          />
          <MetricCard
            label="Avg Quote"
            value={formatCurrency(metrics.avgQuoteValue)}
            icon={<Receipt className="h-5 w-5" />}
            color="blue"
            isUpdating={isUpdating}
            compact
          />
          <MetricCard
            label="Pipeline"
            value={formatCurrency(metrics.pipelineValue)}
            icon={<FileText className="h-5 w-5" />}
            color="purple"
            trend={metrics.pipelineValue > 0 ? { value: `${metrics.counts.accepted} jobs`, isPositive: true } : undefined}
            isUpdating={isUpdating}
            compact
          />
          <MetricCard
            label="Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            icon={<PoundSterling className="h-5 w-5" />}
            color="green"
            trend={metrics.counts.paid > 0 ? { value: `${metrics.counts.paid} paid`, isPositive: true } : undefined}
            isUpdating={isUpdating}
            compact
          />
          <MetricCard
            label="Outstanding"
            value={formatCurrency(metrics.outstandingAmount)}
            icon={<Wallet className="h-5 w-5" />}
            color={metrics.overdueCount > 0 ? 'red' : 'amber'}
            trend={metrics.overdueCount > 0 ? { value: `${metrics.overdueCount} overdue`, isPositive: false } : undefined}
            isUpdating={isUpdating}
            compact
          />
          <MetricCard
            label="Days to Pay"
            value={metrics.avgDaysToPayment > 0 ? `${metrics.avgDaysToPayment}d` : '—'}
            icon={<Timer className="h-5 w-5" />}
            color={metrics.avgDaysToPayment <= 14 ? 'emerald' : metrics.avgDaysToPayment <= 30 ? 'amber' : 'red'}
            isUpdating={isUpdating}
            compact
          />
        </div>

        {/* Revenue Chart with Quote Volume Overlay */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
            <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              Revenue & Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 pb-3 sm:pb-4">
            {!hasRevenueData && !hasQuoteData ? (
              // No data state
              <div className="h-40 sm:h-48 flex flex-col items-center justify-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-3">
                  <BarChart3 className="h-6 w-6 text-white/30" />
                </div>
                <p className="text-sm text-white/50 font-medium">No data yet</p>
                <p className="text-xs text-white/30 mt-1">
                  Revenue will appear here when invoices are paid
                </p>
              </div>
            ) : (
              <div className="h-40 sm:h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#888', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      yAxisId="revenue"
                      tick={{ fill: '#888', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                      tickLine={false}
                      tickFormatter={(value) => value >= 1000 ? `£${(value / 1000).toFixed(0)}k` : `£${value}`}
                    />
                    <YAxis
                      yAxisId="quotes"
                      orientation="right"
                      tick={{ fill: '#888', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      hide
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: '#888' }}
                      formatter={(value: number, name: string) => {
                        if (name === 'revenue') return [formatCurrency(value), 'Revenue'];
                        return [value, 'Quotes'];
                      }}
                    />
                    {/* Quote volume as subtle bars */}
                    <Bar
                      yAxisId="quotes"
                      dataKey="quotes"
                      fill="#facc15"
                      fillOpacity={0.2}
                      radius={[2, 2, 0, 0]}
                    />
                    {/* Revenue as main area */}
                    <Area
                      yAxisId="revenue"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      animationDuration={1000}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            {/* Legend */}
            {(hasRevenueData || hasQuoteData) && (
              <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-white/50">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Revenue
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm bg-yellow-400/30" />
                  Quotes Created
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <ConversionFunnel
          stages={metrics.counts}
          values={metrics.values}
          formatCurrency={formatCurrency}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default QuoteInvoiceAnalytics;
