/**
 * Business insights — rebuilt.
 *
 * The panel this replaces was correct and useless. It defaulted to a 30-day
 * window, and an account whose most recent invoice was 7 July looked at a wall
 * of £0 and four empty grey bars on 6 August under a header reading "£13,946
 * revenue". Nothing was broken; the window simply had nothing in it, and the
 * page had no way of saying so. Looking broken while being right is worse than
 * being wrong, because you cannot tell the difference from the outside.
 *
 * So the range now FINDS the data: it opens on the smallest window that
 * actually contains activity, and when a window is empty but there is history
 * outside it, it says which window to try instead of rendering zeros.
 *
 * It also answers a better question. Revenue alone cannot tell a sole trader
 * whether the business works — that needs money out and hours in, which is why
 * expenses and time sessions are now pulled in alongside quotes and invoices:
 *
 *   1. Am I making money?      cash in vs out, profit line
 *   2. When do I get paid?     outstanding, aged
 *   3. Is my selling working?  the quote funnel, with drop-off named
 *   4. What is an hour worth?  revenue ÷ hours logged
 *
 * Everything is text-white; the old panel ran on white/40–60 greys and a raw
 * <select> that rendered the browser's blue focus ring on a black page.
 */
import React, { useMemo, useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  differenceInDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { Quote } from '@/types/quote';
import { isQuoteWon as isWon } from '@/utils/quote-status';
import { isInvoiceOverdue } from '@/utils/invoice-status';
import { useBusinessInsights } from '@/hooks/useBusinessInsights';

type RangeKey = '7d' | '30d' | '90d' | '12m';

const RANGES: { key: RangeKey; label: string; days: number }[] = [
  { key: '7d', label: '7D', days: 7 },
  { key: '30d', label: '30D', days: 30 },
  { key: '90d', label: '90D', days: 90 },
  { key: '12m', label: '12M', days: 365 },
];

const VOLT = '#EAB308';
const GREEN = '#34D399';
const RED = '#F87171';

/**
 * An invoice's effective date. `invoice_date` is null on a small number of
 * rows (3 of 712 raised at the time of writing), and the old panel dropped
 * those entirely rather than falling back — so paid money silently vanished
 * from the charts.
 */
const invoiceAt = (i: Quote): Date | null => {
  const raw = i.invoice_date ?? i.invoice_paid_at ?? i.createdAt;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
};

const hasLeftDraft = (q: Quote) =>
  Boolean(q.first_sent_at) ||
  ['sent', 'pending', 'approved', 'rejected'].includes(q.status) ||
  Boolean(q.acceptance_status);

const money = (v: number) =>
  `£${Math.round(v).toLocaleString('en-GB')}`;

/**
 * Sign goes OUTSIDE the currency symbol. Expense bars are plotted negative, so
 * the naive version rendered the Y axis as "£-2.0k".
 */
const moneyShort = (v: number) => {
  const a = Math.abs(v);
  const sign = v < 0 ? '−' : '';
  if (a >= 1000) return `${sign}£${(a / 1000).toFixed(a >= 10000 ? 0 : 1)}k`;
  return `${sign}£${Math.round(a)}`;
};

interface Props {
  quotes: Quote[];
  invoices?: Quote[];
  lastUpdated?: Date;
}

export const BusinessInsights: React.FC<Props> = ({ quotes, invoices = [], lastUpdated }) => {
  const { expenses, hours } = useBusinessInsights();

  // ── Pick the opening range ───────────────────────────────────────────
  // The smallest window that contains something. Anchored on the data rather
  // than on a fixed 30 days, so the panel never opens on an empty period when
  // there is history to show.
  const activity = useMemo(
    () =>
      [
        ...quotes.map((q) => (q.createdAt ? new Date(q.createdAt) : null)),
        ...invoices.map(invoiceAt),
        ...expenses.map((e) => e.at),
      ].filter((d): d is Date => !!d && !Number.isNaN(d.getTime())),
    [quotes, invoices, expenses]
  );

  const [override, setOverride] = useState<RangeKey | null>(null);

  const autoRange: RangeKey = useMemo(() => {
    if (activity.length === 0) return '30d';
    const newest = Math.max(...activity.map((d) => d.getTime()));
    const age = differenceInDays(new Date(), new Date(newest));
    return (RANGES.find((r) => age <= r.days) ?? RANGES[RANGES.length - 1]).key;
  }, [activity]);

  const range = override ?? autoRange;
  const rangeDef = RANGES.find((r) => r.key === range)!;
  const from = range === '12m' ? subMonths(new Date(), 12) : subDays(new Date(), rangeDef.days);

  // ── Window the data ──────────────────────────────────────────────────
  const inRange = useMemo(() => {
    const q = quotes.filter((x) => x.createdAt && isAfter(new Date(x.createdAt), from));
    const inv = invoices.filter((x) => {
      const d = invoiceAt(x);
      return d && isAfter(d, from);
    });
    const exp = expenses.filter((e) => isAfter(e.at, from));
    const hrs = hours.filter((h) => isAfter(h.at, from));
    return { q, inv, exp, hrs };
  }, [quotes, invoices, expenses, hours, from]);

  const isEmpty =
    inRange.q.length === 0 && inRange.inv.length === 0 && inRange.exp.length === 0;
  const hasHistory = activity.length > 0;

  // ── Headline figures ─────────────────────────────────────────────────
  const totals = useMemo(() => {
    const paid = inRange.inv.filter((i) => i.invoice_status === 'paid');
    const cashIn = paid.reduce((s, i) => s + (i.total || 0), 0);
    const cashOut = inRange.exp.reduce((s, e) => s + e.amount, 0);

    const unpaid = inRange.inv.filter(
      (i) => i.invoice_status && i.invoice_status !== 'paid' && i.invoice_status !== 'draft'
    );
    const outstanding = unpaid.reduce((s, i) => s + (i.total || 0), 0);
    const overdue = inRange.inv.filter(isInvoiceOverdue).reduce((s, i) => s + (i.total || 0), 0);

    const seconds = inRange.hrs.reduce((s, h) => s + h.seconds, 0);
    const hoursWorked = seconds / 3600;

    return {
      cashIn,
      cashOut,
      profit: cashIn - cashOut,
      outstanding,
      overdue,
      hoursWorked,
      perHour: hoursWorked > 0 ? cashIn / hoursWorked : null,
    };
  }, [inRange]);

  // ── Funnel ───────────────────────────────────────────────────────────
  const funnel = useMemo(() => {
    const created = inRange.q;
    const sent = created.filter(hasLeftDraft);
    const viewed = sent.filter((q) => (q.email_open_count ?? 0) > 0);
    const won = created.filter(isWon);
    const sum = (l: Quote[]) => l.reduce((s, q) => s + (q.total || 0), 0);
    return [
      { label: 'Created', count: created.length, value: sum(created) },
      { label: 'Sent', count: sent.length, value: sum(sent) },
      { label: 'Viewed', count: viewed.length, value: sum(viewed) },
      { label: 'Won', count: won.length, value: sum(won) },
    ];
  }, [inRange.q]);

  const winRate =
    funnel[1].count > 0 ? Math.round((funnel[3].count / funnel[1].count) * 100) : null;

  const avgQuote =
    inRange.q.length > 0
      ? inRange.q.reduce((s, q) => s + (q.total || 0), 0) / inRange.q.length
      : 0;

  const daysToWin = useMemo(() => {
    const wonWithDates = inRange.q
      .filter(isWon)
      .filter((q) => q.first_sent_at && (q.accepted_at || q.updatedAt));
    if (wonWithDates.length === 0) return null;
    const total = wonWithDates.reduce(
      (s, q) =>
        s +
        Math.max(
          0,
          differenceInDays(new Date(q.accepted_at || q.updatedAt!), new Date(q.first_sent_at!))
        ),
      0
    );
    return Math.round(total / wonWithDates.length);
  }, [inRange.q]);

  // ── Cash in / out series ─────────────────────────────────────────────
  const series = useMemo(() => {
    const byMonth = range === '12m' || range === '90d';
    const buckets = byMonth
      ? eachMonthOfInterval({ start: from, end: new Date() })
      : eachDayOfInterval({ start: from, end: new Date() });

    const match = (d: Date, b: Date) => (byMonth ? isSameMonth(d, b) : isSameDay(d, b));

    let running = 0;
    return buckets.map((b) => {
      const paidIn = inRange.inv
        .filter((i) => i.invoice_status === 'paid')
        .filter((i) => {
          const d = invoiceAt(i);
          return d && match(d, b);
        })
        .reduce((s, i) => s + (i.total || 0), 0);
      const out = inRange.exp
        .filter((e) => match(e.at, b))
        .reduce((s, e) => s + e.amount, 0);
      running += paidIn - out;
      return {
        label: byMonth ? format(b, 'MMM') : format(b, 'd MMM'),
        in: Math.round(paidIn),
        out: -Math.round(out),
        profit: Math.round(running),
      };
    });
  }, [inRange.inv, inRange.exp, from, range]);

  const hasChartData = series.some((p) => p.in !== 0 || p.out !== 0);

  // ─────────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl border border-white/[0.18] bg-gradient-to-b from-white/[0.12] to-white/[0.06] p-4 sm:p-5">
      {/* Range switcher — chips, not a raw <select>. The previous control was
          a native select, which paints the browser's own blue focus ring on a
          black page and is disallowed for 2–4 options anyway. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5" role="tablist" aria-label="Date range">
          {RANGES.map((r) => {
            const active = r.key === range;
            return (
              <button
                key={r.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setOverride(r.key)}
                className={cn(
                  'h-9 rounded-lg px-3 text-[12px] font-semibold transition-colors touch-manipulation',
                  active
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.12] bg-white/[0.04] text-white hover:border-white/[0.25]'
                )}
              >
                {r.label}
              </button>
            );
          })}
        </div>
        {lastUpdated && (
          <span className="text-[11px] text-white tabular-nums">
            Updated {format(lastUpdated, 'HH:mm')}
          </span>
        )}
      </div>

      {/* Empty window — name the gap and offer the window that has the data,
          rather than rendering a grid of £0 that reads as a broken page. */}
      {isEmpty ? (
        <div className="mt-6 rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-6 text-center">
          <p className="text-[14px] font-semibold text-white">
            {hasHistory
              ? `Nothing in the last ${rangeDef.label === '12M' ? '12 months' : rangeDef.label.replace('D', ' days')}`
              : 'No quotes or invoices yet'}
          </p>
          {hasHistory && autoRange !== range && (
            <button
              type="button"
              onClick={() => setOverride(autoRange)}
              className="mt-3 h-11 rounded-lg bg-elec-yellow px-4 text-[13px] font-bold text-black touch-manipulation active:scale-[0.97]"
            >
              Show {RANGES.find((r) => r.key === autoRange)?.label}
            </button>
          )}
          {hasHistory && (
            <p className="mt-3 text-[12px] text-white">
              Last activity{' '}
              {format(new Date(Math.max(...activity.map((d) => d.getTime()))), 'd MMM yyyy')}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* ── Money in / out ─────────────────────────────────────────── */}
          <div className="mt-5">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-[13px] font-semibold text-white">Money in and out</h3>
              <span className="text-[12px] tabular-nums text-white">
                <span style={{ color: GREEN }}>{money(totals.cashIn)} in</span>
                {' · '}
                <span style={{ color: RED }}>{money(totals.cashOut)} out</span>
              </span>
            </div>

            <p className="mt-1 text-[28px] font-semibold leading-none tabular-nums text-white sm:text-[34px]">
              {totals.profit >= 0 ? '' : '−'}
              {money(Math.abs(totals.profit))}
              <span className="ml-2 text-[12px] font-medium text-white">profit</span>
            </p>

            {hasChartData ? (
              <div className="mt-3 h-[180px] w-full sm:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={series} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
                    <defs>
                      <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={VOLT} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={VOLT} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#fff', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                      minTickGap={24}
                    />
                    <YAxis
                      tick={{ fill: '#fff', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      width={44}
                      tickFormatter={(v: number) => moneyShort(v)}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{
                        background: '#111',
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderRadius: 12,
                        color: '#fff',
                        fontSize: 12,
                      }}
                      formatter={(v: number, name: string) => [money(Math.abs(v)), name]}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      name="Running profit"
                      stroke="none"
                      fill="url(#profitFill)"
                    />
                    <Bar dataKey="in" name="In" fill={GREEN} radius={[3, 3, 0, 0]} maxBarSize={22} />
                    <Bar dataKey="out" name="Out" fill={RED} radius={[0, 0, 3, 3]} maxBarSize={22} />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="Running profit"
                      stroke={VOLT}
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="mt-3 text-[12px] text-white">
                No payments or expenses recorded in this period.
              </p>
            )}
          </div>

          {/* ── Getting paid ───────────────────────────────────────────── */}
          {(totals.outstanding > 0 || totals.overdue > 0) && (
            <div className="mt-6 border-t border-white/[0.10] pt-4">
              <h3 className="text-[13px] font-semibold text-white">Getting paid</h3>
              {/* One denominator for both segments. Written with two different
                  ones first, so the bars did not sum to the track — and since
                  `isInvoiceOverdue` can flag rows the `unpaid` filter excludes,
                  overdue can exceed outstanding and drive a negative width. */}
              {(() => {
                const track = Math.max(totals.outstanding, totals.overdue);
                const onTime = Math.max(0, totals.outstanding - totals.overdue);
                const pct = (v: number) => (track > 0 ? (v / track) * 100 : 0);
                return (
                  <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
                    {onTime > 0 && (
                      <div className="h-full" style={{ width: `${pct(onTime)}%`, background: GREEN }} />
                    )}
                    {totals.overdue > 0 && (
                      <div
                        className="h-full"
                        style={{ width: `${pct(totals.overdue)}%`, background: VOLT }}
                      />
                    )}
                  </div>
                );
              })()}
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] tabular-nums text-white">
                <span>{money(totals.outstanding)} out for payment</span>
                {totals.overdue > 0 && (
                  <span className="font-semibold text-elec-yellow">
                    {money(totals.overdue)} overdue
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ── Funnel ─────────────────────────────────────────────────── */}
          {funnel[0].count > 0 && (
            <div className="mt-6 border-t border-white/[0.10] pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[13px] font-semibold text-white">Quotes</h3>
                {winRate != null && (
                  <span className="text-[12px] font-semibold tabular-nums text-elec-yellow">
                    {winRate}% win rate
                  </span>
                )}
              </div>

              {/* Proportional — each bar is its share of Created. The old
                  version drew four identical full-width bars, so the shape of
                  the funnel (the entire point of a funnel) was invisible. */}
              <div className="mt-3 space-y-2">
                {funnel.map((step, i) => {
                  const pct = funnel[0].count > 0 ? (step.count / funnel[0].count) * 100 : 0;
                  const prev = i > 0 ? funnel[i - 1] : null;
                  const drop =
                    prev && prev.count > 0 ? Math.round(((prev.count - step.count) / prev.count) * 100) : 0;
                  return (
                    <div key={step.label} className="flex items-center gap-3">
                      <span className="w-[52px] shrink-0 text-[11.5px] text-white">{step.label}</span>
                      <div className="h-6 flex-1 overflow-hidden rounded-md bg-white/[0.06]">
                        <div
                          className="h-full rounded-md transition-[width] duration-500"
                          style={{
                            width: `${Math.max(pct, step.count > 0 ? 4 : 0)}%`,
                            background: i === funnel.length - 1 ? GREEN : VOLT,
                            opacity: i === funnel.length - 1 ? 1 : 0.35 + i * 0.2,
                          }}
                        />
                      </div>
                      <span className="w-[92px] shrink-0 text-right text-[11.5px] tabular-nums text-white">
                        {step.count} · {moneyShort(step.value)}
                      </span>
                      <span className="hidden w-[56px] shrink-0 text-right text-[11px] tabular-nums text-white sm:block">
                        {i > 0 && drop > 0 ? `−${drop}%` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── The rest ───────────────────────────────────────────────── */}
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/[0.10] pt-4 sm:grid-cols-4">
            <Metric label="Avg quote" value={avgQuote > 0 ? money(avgQuote) : '—'} />
            <Metric label="Days to win" value={daysToWin != null ? `${daysToWin}` : '—'} />
            <Metric
              label="Per hour"
              value={totals.perHour != null ? money(totals.perHour) : '—'}
              hint={
                totals.hoursWorked > 0
                  ? `${totals.hoursWorked.toFixed(1)}h logged`
                  : 'Log hours to see this'
              }
            />
            <Metric
              label="Money out"
              value={totals.cashOut > 0 ? money(totals.cashOut) : '—'}
              hint={inRange.exp.length > 0 ? `${inRange.exp.length} expenses` : 'No expenses logged'}
            />
          </dl>
        </>
      )}
    </div>
  );
};

const Metric = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div>
    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{label}</dt>
    <dd className="mt-1 text-[20px] font-semibold leading-none tabular-nums text-white">{value}</dd>
    {hint && <p className="mt-1 text-[11px] text-white">{hint}</p>}
  </div>
);
