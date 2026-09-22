/**
 * The number the page exists to report, with its history.
 *
 * One line, one accent, no legend: the title names the series. Gridlines are
 * solid hairlines one step off the surface; the y-axis sits on the right so
 * the line can run to the edge; a faint rule marks 30 days ago so the delta
 * beside the figure has a visible anchor. The tooltip is a crosshair with the
 * day and both rails.
 */

import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ACCENT, GRID, HAIRLINE, SURFACE, gbp } from './primitives';
import { formatAxisTick, mrrScale } from './mrrScale';

export interface MrrPoint {
  day: string;
  total: number;
  stripe: number | null;
  rc: number | null;
}

/**
 * The window the dashboard is showing. `'all'` is every day we hold rather
 * than a fixed number of them, so anything doing arithmetic on a range has to
 * resolve it against the data first — see `spanDays` below and `rangeDays` in
 * AdminDashboard. Treating 'all' as a number is the bug this type prevents.
 */
export type Range = 7 | 30 | 90 | 'ytd' | 'all';

/**
 * First day of the year-to-date window, as an ISO day.
 *
 * Normally 1 January of the current year, so the axis reads "January to
 * today" and the window grows through the year. In January that would be a
 * chart of a fortnight, so it falls back to eleven months back — the view
 * slides rather than resetting to nothing the moment the year turns.
 *
 * The same fallback covers early February for the same reason; by March there
 * is enough of the new year to stand on its own.
 */
export function ytdStartDay(now: Date = new Date()): string {
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  // Months 0 and 1 are January and February.
  if (now.getMonth() <= 1) {
    const back = new Date(now);
    back.setMonth(back.getMonth() - 11);
    return iso(back);
  }
  return `${now.getFullYear()}-01-01`;
}

/** How many of `days` (ascending ISO days) fall inside the window. */
export function daysInRange(range: Range, days: string[]): number {
  if (!days.length) return 0;
  if (range === 'all') return days.length - 1;
  if (range === 'ytd') {
    const from = ytdStartDay();
    return Math.max(0, days.filter((d) => d >= from).length - 1);
  }
  return range;
}

// en-GB gives "Sept", which is the one month nobody abbreviates that way.
/*
 * The rail colours are the ones the hero's own split bar already uses — blue
 * for Stripe, green for the stores. A chart that colours them differently from
 * the legend six inches above it is worse than one with no colour at all.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthOf = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1];
const dayLabel = (iso: string) => `${Number(iso.slice(8, 10))} ${monthOf(iso)}`;

export function MrrChart({
  points,
  range,
  height = 232,
  compact = false,
  goal = null,
}: {
  points: MrrPoint[];
  range: Range;
  height?: number;
  compact?: boolean;
  /**
   * A target to mark on the chart, e.g. the next round thousand. Kept inside
   * the domain by `mrrScale` so it can never be drawn off the top — it is
   * passed INTO the scale, which lifts the ceiling to the next rung above it.
   */
  goal?: number | null;
  /**
   * Split the total into its two rails — Stripe and the app stores.
   *
   * Every point has carried `stripe` and `rc` since this chart was written and
   * neither was ever drawn: the hero said £3,136 Stripe and £1,516 stores, and
   * the chart showed one line, so you could see the split today but never
   * which half was GROWING. Off by default — the compact copies on the
   * dashboard are too short to carry three series legibly.
   */
}) {
  // A tooltip that only exists under a finger is useless: on a phone a tap pins it.
  const isMobile = useIsMobile();
  const data = useMemo(() => {
    if (range === 'all') return points;
    if (range === 'ytd') {
      const from = ytdStartDay();
      const win = points.filter((p) => p.day >= from);
      // A brand-new account can have nothing this year yet; showing an empty
      // panel would be worse than showing everything we do have.
      return win.length >= 2 ? win : points;
    }
    return points.slice(-(range + 1));
  }, [points, range]);
  // How many days are actually on screen, which is what the tick and label
  // decisions below are really about.
  const spanDays = data.length - 1;
  const last = data[data.length - 1];
  const anchor = spanDays >= 30 ? data[Math.max(0, data.length - 31)] : null;

  // See `mrrScale` for why this is not inline any more: the old version sized
  // gridlines from how far the line MOVED and never labelled its own ceiling.
  /*
    Sized by the DATA, not the target.

    Letting the goal lift the ceiling put £4,914 of MRR on a £10,000 axis, and
    a year of growth then occupied the bottom 40% of the panel and read as
    flat. The target is drawn wherever it falls — on the top gridline, or off
    the top of a chart that has not reached it yet, which is information too.
  */
  const { lo, hi, ticks } = useMemo(() => mrrScale(data.map((p) => p.total)), [data]);

  // Month names at the first day of each month in view; days for short ranges.
  const xTicks = useMemo(() => {
    if (spanDays <= 7) return data.map((p) => p.day);
    if (spanDays <= 30) return data.filter((_, i) => i % 7 === 0).map((p) => p.day);
    /*
      One label per month. Over a long enough span those crowd too, so past
      roughly a year only every other month is labelled — otherwise 'all time'
      renders an unreadable smear of month names.
    */
    const firsts = data.filter((p, i) => i === 0 || p.day.endsWith('-01'));
    return (firsts.length > 14 ? firsts.filter((_, i) => i % 2 === 0) : firsts).map((p) => p.day);
  }, [data, spanDays]);
  const xFormat = (iso: string) => (spanDays > 30 ? monthOf(iso) : dayLabel(iso));

  if (data.length < 2) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        History starts collecting from today.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 14, right: 8, left: 14, bottom: 0 }}>
          <defs>
            {/*
              Heavier than it was. With two rails crossing it the fill had to
              stay faint or the panel turned to mud; as the only series it can
              carry the weight, and a solid wedge reads as growth far better
              than a hairline does.
            */}
            <linearGradient id="overviewMrrFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.3} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="day"
            ticks={xTicks}
            tickFormatter={xFormat}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            minTickGap={24}
          />
          <YAxis
            orientation="right"
            domain={[lo, hi]}
            ticks={ticks}
            tickFormatter={formatAxisTick}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            // 34 clipped "£4.25k" on a phone: the compact width was set for
            // three-character ticks and this ladder reaches five. The overview's
            // mobile chart takes the same branch.
            width={44}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ stroke: HAIRLINE }}
            contentStyle={{
              background: 'hsl(0 0% 10%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              color: '#ffffff',
              fontSize: 12,
              padding: '8px 10px',
            }}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(iso) => dayLabel(String(iso))}
            /*
              One row, because there is one line. With three series recharts
              called this formatter once PER SERIES and each call appended the
              same Stripe/Stores breakdown, so the tooltip printed "MRR" three
              times over with three different numbers against it.
            */
            formatter={(v: number) => [gbp(v), 'MRR']}
          />
          {anchor && (
            <ReferenceLine
              x={anchor.day}
              stroke={HAIRLINE}
              label={
                compact
                  ? undefined
                  : {
                      value: `30 days ago · ${gbp(anchor.total)}`,
                      position: 'insideTopRight',
                      fill: '#ffffff',
                      fontSize: 11,
                    }
              }
            />
          )}
          {/*
            The target, drawn BEFORE the series so the line sits over it rather
            than the other way round — a dashed rule on top of the data reads
            as a defect.
          */}
          {/* Only when it fits: a target above the ceiling would be clipped off the
              top, and stretching the axis to reach it squashes the data. */}
          {goal != null && Number.isFinite(goal) && goal <= hi && (
            <ReferenceLine
              y={goal}
              stroke={ACCENT}
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              label={
                compact
                  ? undefined
                  : {
                      value: `target ${gbp(goal)}`,
                      position: 'insideTopLeft',
                      fill: '#ffffff',
                      fontSize: 11,
                    }
              }
            />
          )}
          <Area
            type="monotone"
            dataKey="total"
            stroke={ACCENT}
            strokeWidth={2.5}
            fill="url(#overviewMrrFill)"
            dot={false}
            activeDot={{ r: 4, fill: ACCENT, stroke: SURFACE, strokeWidth: 2 }}
            isAnimationActive={false}
          />
          {last && (
            <ReferenceDot
              x={last.day}
              y={last.total}
              r={4}
              fill={ACCENT}
              stroke={SURFACE}
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
