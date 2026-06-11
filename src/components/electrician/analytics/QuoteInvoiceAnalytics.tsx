import React, { useMemo, useState } from 'react';
import { Quote } from '@/types/quote';
import { ChevronRight } from 'lucide-react';
import {
  differenceInDays,
  subDays,
  isAfter,
  isPast,
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
  trigger?: (isOpen: boolean) => React.ReactNode;
}

type DateRange = '7d' | '30d' | '90d' | '12m';

import { isQuoteWon as isWon, isQuoteLost as isLost } from '@/utils/quote-status';

const hasLeftDraft = (q: Quote) =>
  Boolean(q.first_sent_at) ||
  ['sent', 'pending', 'approved', 'rejected'].includes(q.status) ||
  Boolean(q.acceptance_status);

const fmtCompact = (value: number) =>
  `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export const QuoteInvoiceAnalytics: React.FC<QuoteInvoiceAnalyticsProps> = ({
  quotes,
  invoices = [],
  formatCurrency,
  lastUpdated,
  onRefresh,
  isLoading = false,
  trigger,
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

  // Funnel: Created → Sent → Viewed → Won
  const funnel = useMemo(() => {
    const created = filteredQuotes;
    const sent = filteredQuotes.filter(hasLeftDraft);
    const viewed = sent.filter((q) => (q.email_open_count ?? 0) > 0);
    const won = filteredQuotes.filter(isWon);
    const sum = (list: Quote[]) => list.reduce((s, q) => s + (q.total || 0), 0);
    return [
      { label: 'Created', count: created.length, value: sum(created), bar: 'bg-white/40' },
      { label: 'Sent', count: sent.length, value: sum(sent), bar: 'bg-amber-400' },
      { label: 'Viewed', count: viewed.length, value: sum(viewed), bar: 'bg-blue-400' },
      { label: 'Won', count: won.length, value: sum(won), bar: 'bg-emerald-400' },
    ];
  }, [filteredQuotes]);

  const metrics = useMemo(() => {
    const sentQuotes = filteredQuotes.filter(hasLeftDraft);
    const wonQuotes = filteredQuotes.filter(isWon);
    const viewedQuotes = sentQuotes.filter((q) => (q.email_open_count ?? 0) > 0);
    const lostQuotes = filteredQuotes.filter(isLost);
    const expiredQuotes = filteredQuotes.filter(
      (q) =>
        !isWon(q) && !isLost(q) && !q.invoice_raised &&
        q.expiryDate && isPast(new Date(q.expiryDate))
    );

    const winRate =
      sentQuotes.length > 0 ? Math.round((wonQuotes.length / sentQuotes.length) * 100) : 0;
    const viewRate =
      sentQuotes.length > 0 ? Math.round((viewedQuotes.length / sentQuotes.length) * 100) : 0;
    const avgQuoteValue =
      filteredQuotes.length > 0
        ? filteredQuotes.reduce((s, q) => s + (q.total || 0), 0) / filteredQuotes.length
        : 0;

    // Sent → won speed
    const wonWithDates = wonQuotes.filter((q) => q.first_sent_at && (q.accepted_at || q.updatedAt));
    const avgDaysToWin =
      wonWithDates.length > 0
        ? Math.round(
            wonWithDates.reduce(
              (s, q) =>
                s +
                Math.max(
                  0,
                  differenceInDays(
                    new Date(q.accepted_at || q.updatedAt!),
                    new Date(q.first_sent_at!)
                  )
                ),
              0
            ) / wonWithDates.length
          )
        : null;

    const awaiting = sentQuotes.filter((q) => !isWon(q) && !isLost(q) && !q.invoice_raised);
    const awaitingValue = awaiting.reduce((s, q) => s + (q.total || 0), 0);
    const lostValue = [...lostQuotes, ...expiredQuotes].reduce((s, q) => s + (q.total || 0), 0);

    // Invoice metrics
    const paidInvoices = filteredInvoices.filter((i) => i.invoice_status === 'paid');
    const unpaidInvoices = filteredInvoices.filter((i) => i.invoice_status !== 'paid');
    const overdueInvoices = filteredInvoices.filter(
      (i) =>
        i.invoice_status !== 'paid' &&
        i.invoice_due_date &&
        isAfter(new Date(), new Date(i.invoice_due_date))
    );
    const totalRevenue = paidInvoices.reduce((s, i) => s + (i.total || 0), 0);
    const outstandingAmount = unpaidInvoices.reduce((s, i) => s + (i.total || 0), 0);
    const paidWithDates = paidInvoices.filter((i) => i.invoice_date && i.invoice_paid_at);
    const avgDaysToPayment =
      paidWithDates.length > 0
        ? Math.round(
            paidWithDates.reduce(
              (s, i) =>
                s + differenceInDays(new Date(i.invoice_paid_at!), new Date(i.invoice_date!)),
              0
            ) / paidWithDates.length
          )
        : 0;

    return {
      winRate,
      viewRate,
      avgQuoteValue,
      avgDaysToWin,
      awaiting,
      awaitingValue,
      lostValue,
      lostCount: lostQuotes.length + expiredQuotes.length,
      unviewedSent: sentQuotes.filter(
        (q) => !isWon(q) && !isLost(q) && !q.invoice_raised && (q.email_open_count ?? 0) === 0
      ),
      totalRevenue,
      outstandingAmount,
      overdueCount: overdueInvoices.length,
      avgDaysToPayment,
    };
  }, [filteredQuotes, filteredInvoices]);

  // Plain-English insights — top 3, most actionable first
  const insights = useMemo(() => {
    const list: { dot: string; text: React.ReactNode }[] = [];
    // Money on the table: won but never converted to an invoice
    const wonUninvoiced = filteredQuotes.filter((q) => isWon(q) && !q.invoice_raised);
    if (wonUninvoiced.length > 0) {
      list.push({
        dot: 'bg-emerald-400',
        text: (
          <>
            <span className="font-semibold text-white">
              {fmtCompact(wonUninvoiced.reduce((s, q) => s + (q.total || 0), 0))}
            </span>{' '}
            won but not yet invoiced — convert{' '}
            {wonUninvoiced.length === 1 ? 'it' : `${wonUninvoiced.length} quotes`} to get paid
          </>
        ),
      });
    }
    if (metrics.unviewedSent.length > 0) {
      list.push({
        dot: 'bg-amber-400',
        text: (
          <>
            <span className="font-semibold text-white">{metrics.unviewedSent.length}</span> sent{' '}
            {metrics.unviewedSent.length === 1 ? 'quote hasn’t' : 'quotes haven’t'} been opened —
            worth a chase
          </>
        ),
      });
    }
    const expiringSoon = filteredQuotes.filter((q) => {
      if (isWon(q) || isLost(q) || q.invoice_raised || !q.expiryDate) return false;
      const days = differenceInDays(new Date(q.expiryDate), new Date());
      return days >= 0 && days <= 7;
    });
    if (expiringSoon.length > 0) {
      list.push({
        dot: 'bg-orange-400',
        text: (
          <>
            <span className="font-semibold text-white">
              {fmtCompact(expiringSoon.reduce((s, q) => s + (q.total || 0), 0))}
            </span>{' '}
            expires within 7 days
          </>
        ),
      });
    }
    const biggest = [...metrics.awaiting].sort((a, b) => (b.total || 0) - (a.total || 0))[0];
    if (biggest) {
      list.push({
        dot: 'bg-elec-yellow',
        text: (
          <>
            Largest awaiting decision:{' '}
            <span className="font-semibold text-white">{fmtCompact(biggest.total || 0)}</span>
            {biggest.client?.name ? ` — ${biggest.client.name}` : ''}
          </>
        ),
      });
    }
    if (metrics.avgDaysToWin !== null) {
      list.push({
        dot: 'bg-emerald-400',
        text: (
          <>
            Clients take{' '}
            <span className="font-semibold text-white">
              {metrics.avgDaysToWin === 0 ? 'under a day' : `~${metrics.avgDaysToWin}d`}
            </span>{' '}
            to accept
          </>
        ),
      });
    }
    return list.slice(0, 3);
  }, [filteredQuotes, metrics]);

  const chartData = useMemo(() => {
    if (!isOpen) return [];
    const threshold = getDateThreshold(dateRange);
    const now = new Date();

    const bucket = (start: Date, end: Date, label: string) => {
      const inRange = (d?: string | Date) =>
        d && new Date(d) >= start && new Date(d) <= end;
      const bucketQuotes = quotes.filter((q) => inRange(q.createdAt));
      const bucketWon = quotes.filter((q) => isWon(q) && inRange(q.accepted_at || q.updatedAt));
      const bucketRevenue = invoices.filter((i) => inRange(i.invoice_paid_at));
      return {
        date: label,
        quoted: bucketQuotes.reduce((s, q) => s + (q.total || 0), 0),
        won: bucketWon.reduce((s, q) => s + (q.total || 0), 0),
        revenue: bucketRevenue.reduce((s, i) => s + (i.total || 0), 0),
      };
    };

    if (dateRange === '12m') {
      return eachMonthOfInterval({ start: threshold, end: now }).map((m) =>
        bucket(startOfMonth(m), endOfMonth(m), format(m, 'MMM'))
      );
    }
    return eachDayOfInterval({ start: threshold, end: now }).map((day) => {
      const start = new Date(day);
      start.setHours(0, 0, 0, 0);
      const end = new Date(day);
      end.setHours(23, 59, 59, 999);
      return bucket(start, end, format(day, dateRange === '7d' ? 'EEE' : 'dd/MM'));
    });
  }, [quotes, invoices, dateRange, isOpen]);

  const hasQuoteData = chartData.some((d) => d.quoted > 0 || d.won > 0);
  const hasRevenueData = chartData.some((d) => d.revenue > 0);
  const areaKey = invoices.length > 0 ? 'revenue' : 'won';
  const areaLabel = invoices.length > 0 ? 'Revenue' : 'Won';

  const dateRangeOptions: { value: DateRange; label: string }[] = [
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
    { value: '12m', label: '12M' },
  ];

  const showQuoteMetrics = quotes.length > 0;
  const showInvoiceMetrics = invoices.length > 0;

  // Open hairline metric grid cells
  const cells: { label: string; value: string; cls: string; sub?: string }[] = [];
  if (showQuoteMetrics) {
    cells.push(
      {
        label: 'Win rate',
        value: `${metrics.winRate}%`,
        cls: metrics.winRate >= 50 ? 'text-emerald-400' : 'text-white',
      },
      { label: 'Avg quote', value: fmtCompact(metrics.avgQuoteValue), cls: 'text-white' },
      {
        label: 'Days to win',
        value: metrics.avgDaysToWin !== null ? `${metrics.avgDaysToWin}d` : '—',
        cls: 'text-white',
      },
      {
        label: 'View rate',
        value: `${metrics.viewRate}%`,
        cls: metrics.viewRate >= 60 ? 'text-emerald-400' : 'text-white',
      },
      {
        label: 'Awaiting',
        value: fmtCompact(metrics.awaitingValue),
        cls: 'text-elec-yellow',
        sub: metrics.awaiting.length > 0 ? `${metrics.awaiting.length} open` : undefined,
      },
      {
        label: 'Lost',
        value: fmtCompact(metrics.lostValue),
        cls: metrics.lostValue > 0 ? 'text-red-400' : 'text-white',
        sub: metrics.lostCount > 0 ? `${metrics.lostCount} quotes` : undefined,
      }
    );
  }
  if (showInvoiceMetrics) {
    cells.push(
      { label: 'Revenue', value: fmtCompact(metrics.totalRevenue), cls: 'text-emerald-400' },
      {
        label: 'Outstanding',
        value: fmtCompact(metrics.outstandingAmount),
        cls: metrics.overdueCount > 0 ? 'text-red-400' : 'text-white',
        sub: metrics.overdueCount > 0 ? `${metrics.overdueCount} overdue` : undefined,
      },
      {
        label: 'Days to pay',
        value: metrics.avgDaysToPayment > 0 ? `${metrics.avgDaysToPayment}d` : '—',
        cls:
          metrics.avgDaysToPayment <= 14
            ? 'text-emerald-400'
            : metrics.avgDaysToPayment <= 30
              ? 'text-amber-400'
              : 'text-red-400',
      }
    );
  }
  const rows = Math.ceil(cells.length / 3);

  const maxFunnelCount = Math.max(funnel[0]?.count ?? 0, 1);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        {trigger ? (
          trigger(isOpen)
        ) : (
          <button className="w-full flex items-center justify-between py-2 touch-manipulation">
            <span className="text-xs font-medium text-white uppercase tracking-wider">Analytics</span>
            <ChevronRight className={cn('w-4 h-4 text-white transition-transform', isOpen && 'rotate-90')} />
          </button>
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 space-y-5">
        {/* Range — underline tabs */}
        <div className="flex items-center gap-5">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setDateRange(option.value)}
              className="relative pb-2 text-[12px] font-medium touch-manipulation"
            >
              <span className={dateRange === option.value ? 'text-white' : 'text-white/60'}>
                {option.label}
              </span>
              {dateRange === option.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-elec-yellow" />
              )}
            </button>
          ))}
          {lastUpdated && (
            <span className="ml-auto text-[11px] text-white/55 self-start">
              {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </span>
          )}
        </div>

        {/* Funnel — where quotes are won and lost */}
        {showQuoteMetrics && (
          <div className="space-y-2.5">
            {funnel.map((stage, i) => {
              const prev = funnel[i - 1];
              const conv =
                prev && prev.count > 0 && i > 0
                  ? Math.round((stage.count / prev.count) * 100)
                  : null;
              return (
                <div key={stage.label} className="flex items-center gap-3">
                  <span className="w-14 flex-shrink-0 text-[11px] text-white/80">
                    {stage.label}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-500', stage.bar)}
                      style={{ width: `${Math.max((stage.count / maxFunnelCount) * 100, stage.count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className="w-24 flex-shrink-0 text-right text-[11px] tabular-nums">
                    <span className="font-semibold text-white">{stage.count}</span>
                    <span className="text-white/65"> · {fmtCompact(stage.value)}</span>
                  </span>
                  <span className="w-9 flex-shrink-0 text-right text-[10px] tabular-nums text-white/55">
                    {conv !== null ? `${conv}%` : ''}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Metrics — open hairline grid */}
        {cells.length > 0 && (
          <div className="grid grid-cols-3">
            {cells.map((cell, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              return (
                <div
                  key={cell.label}
                  className={cn(
                    'py-3',
                    col === 0 ? 'pr-3' : col === 1 ? 'px-3' : 'pl-3',
                    col < 2 && 'border-r border-white/[0.14]',
                    row < rows - 1 && 'border-b border-white/[0.14]'
                  )}
                >
                  <p className="text-[10px] text-white/65 uppercase tracking-wider">{cell.label}</p>
                  <p className={cn('text-[19px] font-bold mt-1 tabular-nums leading-none tracking-tight', cell.cls)}>
                    {cell.value}
                  </p>
                  {cell.sub && <p className="text-[10px] text-white/55 mt-1">{cell.sub}</p>}
                </div>
              );
            })}
          </div>
        )}

        {/* Insights — plain English */}
        {insights.length > 0 && (
          <div className="space-y-2">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className={cn('h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0', insight.dot)} />
                <p className="text-[12px] text-white/80 leading-snug">{insight.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Chart — quoted vs won/revenue */}
        <div className="border-t border-white/[0.14] pt-3">
          {!hasQuoteData && !hasRevenueData ? (
            <div className="h-28 flex items-center justify-center">
              <p className="text-[12px] text-white/60">No activity in this period</p>
            </div>
          ) : (
            <>
              <div className="h-40 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="wonGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 10 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.14)' }}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.65)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => (v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value: number, name: string) => [
                        fmtCompact(value),
                        name === 'quoted' ? 'Quoted' : areaLabel,
                      ]}
                    />
                    <Bar dataKey="quoted" fill="#facc15" fillOpacity={0.4} radius={[2, 2, 0, 0]} />
                    <Area
                      type="monotone"
                      dataKey={areaKey}
                      stroke="#34d399"
                      strokeWidth={2}
                      fill="url(#wonGrad)"
                      animationDuration={800}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-1 text-[10px] text-white/65">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-yellow-400/60" />
                  Quoted
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {areaLabel}
                </span>
              </div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
