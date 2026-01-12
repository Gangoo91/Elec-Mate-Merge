import React, { useMemo, useState } from 'react';
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
  Calendar,
  BarChart3,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { differenceInDays, subDays, isAfter, format, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface QuoteInvoiceAnalyticsProps {
  quotes: Quote[];
  invoices?: Quote[];
  formatCurrency: (value: number) => string;
}

type DateRange = '7d' | '30d' | '90d' | '12m';

export const QuoteInvoiceAnalytics: React.FC<QuoteInvoiceAnalyticsProps> = ({
  quotes,
  invoices = [],
  formatCurrency,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>('30d');

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

    // Outstanding amount
    const outstandingAmount = filteredInvoices
      .filter(i => i.invoice_status !== 'paid')
      .reduce((sum, i) => sum + i.total, 0);

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

    // Pipeline values
    const invoicedQuotes = filteredQuotes.filter(q => q.invoice_number);

    return {
      winRate,
      avgQuoteValue,
      totalRevenue,
      outstandingAmount,
      avgDaysToPayment,
      counts: {
        drafts: draftQuotes.length,
        sent: sentQuotes.length - acceptedQuotes.length - rejectedQuotes.length,
        accepted: acceptedQuotes.length - invoicedQuotes.length,
        invoiced: invoicedQuotes.length,
        paid: paidInvoices.length,
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

  // Generate chart data
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

  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '12m', label: '12 Months' },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-colors touch-manipulation">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Analytics Dashboard</p>
              <p className="text-xs text-muted-foreground">
                {metrics.winRate}% win rate • {formatCurrency(metrics.totalRevenue)} revenue
              </p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4 space-y-4">
        {/* Date Range Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dateRangeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setDateRange(option.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors touch-manipulation",
                dateRange === option.value
                  ? "bg-elec-yellow text-elec-dark"
                  : "bg-card/50 text-muted-foreground hover:bg-card"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            label="Win Rate"
            value={`${metrics.winRate}%`}
            icon={<Percent className="h-5 w-5" />}
            color="emerald"
            trend={metrics.winRate >= 50 ? { value: 'Good', isPositive: true } : undefined}
          />
          <MetricCard
            label="Avg Quote"
            value={formatCurrency(metrics.avgQuoteValue)}
            icon={<Receipt className="h-5 w-5" />}
            color="blue"
          />
          <MetricCard
            label="Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            icon={<PoundSterling className="h-5 w-5" />}
            color="green"
          />
          <MetricCard
            label="Avg Days to Pay"
            value={`${metrics.avgDaysToPayment}d`}
            icon={<Clock className="h-5 w-5" />}
            color={metrics.avgDaysToPayment <= 14 ? 'emerald' : metrics.avgDaysToPayment <= 30 ? 'amber' : 'red'}
          />
        </div>

        {/* Outstanding Alert */}
        {metrics.outstandingAmount > 0 && (
          <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-amber-400">Outstanding Invoices</p>
                <p className="text-xs text-muted-foreground">
                  {metrics.overdueCount > 0 ? `${metrics.overdueCount} overdue` : 'Awaiting payment'}
                </p>
              </div>
            </div>
            <p className="text-xl font-bold text-amber-400">{formatCurrency(metrics.outstandingAmount)}</p>
          </div>
        )}

        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              Revenue Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                  />
                  <YAxis
                    tick={{ fill: '#888', fontSize: 10 }}
                    axisLine={{ stroke: '#333' }}
                    tickLine={false}
                    tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#888' }}
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
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
