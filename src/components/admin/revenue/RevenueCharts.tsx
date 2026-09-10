/**
 * Charts for the Revenue page.
 *
 * Same house style as `MrrChart` and the Trials charts: hairline gridlines one
 * step off the surface, no axis lines, white tick text, a dark tooltip card,
 * and a click-to-pin tooltip on a phone.
 *
 * Price kinds get three categorical slots plus a grey. Validated as a set on
 * the dark surface:
 *   node scripts/validate_palette.js "#199E70,#3987E5,#C98500" \
 *     --mode dark --surface "#1C1C1C"
 * All six checks pass. Legacy deliberately takes the neutral grey rather than a
 * fourth hue: it is the absence of a deliberate pricing decision, and it reads
 * correctly as the recessive category.
 */

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { AQUA, BLUE, GRID, SURFACE, YELLOW, gbp } from '@/components/admin/overview/primitives';
import type { PriceLadderRow, RenewalRow } from '@/hooks/useAdminStripeStats';

export const PRICE_KIND_COLOURS = {
  current: AQUA,
  winback: BLUE,
  founder: YELLOW,
  legacy: 'rgba(255,255,255,0.34)',
} as const;

export const PRICE_KIND_LABELS = {
  current: 'Current price',
  winback: 'Win-back offer',
  founder: 'Founder',
  legacy: 'Legacy, grandfathered',
} as const;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const tooltipStyle = {
  background: 'hsl(0 0% 10%)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  color: '#ffffff',
  fontSize: 12,
  padding: '8px 10px',
} as const;

/** A price, written the way you would say it. */
export function priceLabel(r: PriceLadderRow): string {
  return `£${r.unitAmount}${r.interval === 'year' ? '/yr' : '/mo'}`;
}

/* ───────────────────────────────────────────────────────────
   1. The price ladder
   ─────────────────────────────────────────────────────────── */

/**
 * Every price in use, by the monthly revenue sitting on it.
 *
 * Horizontal, because the labels are prices and tiers rather than dates and a
 * vertical axis would turn them on their side. One measure, one axis; colour
 * carries the kind, which is a separate fact from the height and so is not a
 * second encoding of the same thing.
 */
export function PriceLadderChart({
  rows,
  height,
}: {
  rows: PriceLadderRow[];
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo(
    () =>
      rows.map((r) => ({
        ...r,
        label: `${priceLabel(r)} · ${r.tier === 'business_ai' ? 'mate' : r.tier}`,
      })),
    [rows]
  );

  if (data.length === 0) {
    return (
      <div className="flex h-24 items-center text-[13px] text-white">
        No active subscriptions to break down.
      </div>
    );
  }

  // 30px a bar keeps the labels legible however many prices are in play.
  const h = height ?? Math.max(180, data.length * 30 + 24);

  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 4, bottom: 0 }}
          barCategoryGap="24%"
        >
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v: number) => gbp(v)}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 104 : 148}
            interval={0}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            formatter={(v: number, _n, p) => {
              const row = p?.payload as (typeof data)[number] | undefined;
              if (!row) return [gbp(v), 'MRR'];
              const bits = [`${row.count} subscriber${row.count === 1 ? '' : 's'}`];
              bits.push(PRICE_KIND_LABELS[row.kind]);
              if (row.belowCurrent > 0) bits.push(`${gbp(row.belowCurrent)}/mo below list`);
              return [`${gbp(v)} · ${bits.join(' · ')}`, 'MRR'];
            }}
          />
          <Bar dataKey="mrr" radius={[0, 4, 4, 0]} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.priceId} fill={PRICE_KIND_COLOURS[d.kind]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   2. Win-back sends by week
   ─────────────────────────────────────────────────────────── */

export function WinbackWeeklyChart({
  weekly,
  height = 160,
}: {
  weekly: Array<{ week: string; sent: number }>;
  height?: number;
}) {
  const isMobile = useIsMobile();
  const label = (iso: string) =>
    `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

  if (weekly.length < 2) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Not enough weeks of sending to draw a trend.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weekly} margin={{ top: 10, right: 6, left: 6, bottom: 0 }} barCategoryGap="26%">
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="week"
            tickFormatter={label}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis
            orientation="right"
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={28}
            allowDecimals={false}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(iso) => `Week of ${label(String(iso))}`}
            formatter={(v: number) => [v, 'emails sent']}
          />
          <Bar
            dataKey="sent"
            fill={BLUE}
            stroke={SURFACE}
            strokeWidth={2}
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   3. Annual renewals ahead
   ─────────────────────────────────────────────────────────── */

/**
 * Annual renewals bucketed by the month they land in.
 *
 * A yearly plan pays a twelfth into MRR each month and then arrives as one
 * lump, so the month it lands in is the thing worth seeing. Subscriptions
 * already set to cancel are drawn separately rather than netted off — the
 * difference between the two totals is the money at stake.
 */
export function RenewalMonthsChart({
  rows,
  height = 180,
}: {
  rows: RenewalRow[];
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo(() => {
    const byMonth = new Map<string, { month: string; renewing: number; cancelling: number }>();
    rows.forEach((r) => {
      const key = r.renewsAt.slice(0, 7);
      const cur = byMonth.get(key) ?? { month: key, renewing: 0, cancelling: 0 };
      if (r.willCancel) cur.cancelling += r.amount;
      else cur.renewing += r.amount;
      byMonth.set(key, cur);
    });
    return [...byMonth.values()].sort((a, b) => a.month.localeCompare(b.month));
  }, [rows]);

  const label = (m: string) => `${MONTHS[Number(m.slice(5, 7)) - 1]} ${m.slice(2, 4)}`;

  if (data.length === 0) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        No annual subscriptions renewing in the next twelve months.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 6, left: 6, bottom: 0 }} barCategoryGap="26%">
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="month"
            tickFormatter={label}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            minTickGap={8}
          />
          <YAxis
            orientation="right"
            tickFormatter={(v: number) => gbp(v)}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(m) => label(String(m))}
            formatter={(v: number, name: string) => [gbp(v), name]}
          />
          <Bar
            dataKey="renewing"
            name="Due to renew"
            stackId="a"
            fill={AQUA}
            stroke={SURFACE}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Bar
            dataKey="cancelling"
            name="Already cancelling"
            stackId="a"
            fill={PRICE_KIND_COLOURS.legacy}
            stroke={SURFACE}
            strokeWidth={2}
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


/* ───────────────────────────────────────────────────────────
   4. Cash in, by day
   ─────────────────────────────────────────────────────────── */

/**
 * What actually landed each day, both rails, net of refunds.
 *
 * Deliberately a bar per day rather than a smoothed line: this is discrete
 * events (someone paid), not a continuous quantity, and a line between two
 * days implies values that never existed. Weekends and quiet days reading zero
 * is information, not a gap to interpolate over.
 */
export function DailyCashChart({
  stripeDaily,
  storeDaily,
  days = 60,
  height = 190,
}: {
  stripeDaily: Array<{ day: string; amount: number }>;
  storeDaily: Array<{ day: string; amount: number }>;
  days?: number;
  height?: number;
}) {
  const isMobile = useIsMobile();

  /*
    Both rails on one stack, joined on the day.

    Stripe and the stores are the same measure in the same currency, so they
    stack rather than sitting on two axes. Days present in one series and not
    the other are filled with zero, not skipped: a day the stores took nothing
    is a real zero, and dropping it would slide Stripe's bars onto the wrong
    dates.
  */
  const data = useMemo(() => {
    const byDay = new Map<string, { day: string; stripe: number; store: number }>();
    for (const r of stripeDaily) {
      byDay.set(r.day, { day: r.day, stripe: r.amount, store: 0 });
    }
    for (const r of storeDaily) {
      const cur = byDay.get(r.day);
      if (cur) cur.store = r.amount;
      else byDay.set(r.day, { day: r.day, stripe: 0, store: r.amount });
    }
    return [...byDay.values()]
      .sort((a, b) => a.day.localeCompare(b.day))
      .slice(-(isMobile ? 30 : days));
  }, [stripeDaily, storeDaily, days, isMobile]);

  const label = (iso: string) =>
    `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

  if (data.length < 2) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Not enough days of takings to draw yet.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 6, left: 6, bottom: 0 }} barCategoryGap="12%">
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={label}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            orientation="right"
            tickFormatter={(v: number) => gbp(v)}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={46}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(iso) => label(String(iso))}
            formatter={(v: number, name: string) => [gbp(v, 2), name]}
          />
          <Bar
            dataKey="stripe"
            name="Stripe"
            stackId="cash"
            fill={BLUE}
            isAnimationActive={false}
          />
          <Bar
            dataKey="store"
            name="Stores"
            stackId="cash"
            fill={AQUA}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


/* ───────────────────────────────────────────────────────────
   5. New MRR won, by day
   ─────────────────────────────────────────────────────────── */

/**
 * Gross new MRR by the day it started, last 14 days.
 *
 * Two stacks: what is still active, and what has already cancelled. Netting the
 * cancellations off instead would make a good sales week and a quiet one look
 * the same — the point is what was won, with the attrition shown honestly
 * beside it rather than deducted from it.
 */
export function NewMrrChart({
  starts,
  height = 180,
}: {
  starts: Array<{ created: string; monthlyAmount: number; stillActive: boolean }>;
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo(() => {
    const byDay = new Map<string, { day: string; kept: number; lost: number }>();
    // Fourteen slots, so a day nobody signed up reads as a real zero.
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      byDay.set(d, { day: d, kept: 0, lost: 0 });
    }
    for (const s of starts) {
      const day = s.created.slice(0, 10);
      const row = byDay.get(day);
      if (!row) continue;
      if (s.stillActive) row.kept += s.monthlyAmount;
      else row.lost += s.monthlyAmount;
    }
    return [...byDay.values()];
  }, [starts]);

  const label = (iso: string) =>
    `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 6, left: 6, bottom: 0 }} barCategoryGap="26%">
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={label}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis
            orientation="right"
            tickFormatter={(v: number) => gbp(v)}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(iso) => label(String(iso))}
            formatter={(v: number, name: string) => [gbp(v, 2), name]}
          />
          <Bar dataKey="kept" name="Still active" stackId="new" fill={AQUA} isAnimationActive={false} />
          <Bar
            dataKey="lost"
            name="Since cancelled"
            stackId="new"
            fill="rgba(255,255,255,0.28)"
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
