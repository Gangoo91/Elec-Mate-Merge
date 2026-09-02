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

export interface MrrPoint {
  day: string;
  total: number;
  stripe: number | null;
  rc: number | null;
}

export type Range = 7 | 30 | 90;

// en-GB gives "Sept", which is the one month nobody abbreviates that way.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthOf = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1];
const dayLabel = (iso: string) => `${Number(iso.slice(8, 10))} ${monthOf(iso)}`;

export function MrrChart({
  points,
  range,
  height = 232,
  compact = false,
}: {
  points: MrrPoint[];
  range: Range;
  height?: number;
  compact?: boolean;
}) {
  // A tooltip that only exists under a finger is useless: on a phone a tap pins it.
  const isMobile = useIsMobile();
  const data = useMemo(() => points.slice(-(range + 1)), [points, range]);
  const last = data[data.length - 1];
  const anchor = range >= 30 ? data[Math.max(0, data.length - 31)] : null;

  const { lo, hi, ticks } = useMemo(() => {
    const vals = data.map((p) => p.total);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const step = max - min > 1500 ? 500 : max - min > 600 ? 250 : 100;
    const lo = Math.floor((min - step * 0.4) / step) * step;
    const hi = Math.ceil((max + step * 0.4) / step) * step;
    const ticks: number[] = [];
    for (let t = lo + step; t < hi; t += step) ticks.push(t);
    return { lo, hi, ticks };
  }, [data]);

  // Month names at the first day of each month in view; days for short ranges.
  const xTicks = useMemo(() => {
    if (range <= 7) return data.map((p) => p.day);
    if (range <= 30) return data.filter((_, i) => i % 7 === 0).map((p) => p.day);
    return data.filter((p, i) => i === 0 || p.day.endsWith('-01')).map((p) => p.day);
  }, [data, range]);
  const xFormat = (iso: string) => (range > 30 ? monthOf(iso) : dayLabel(iso));

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
            <linearGradient id="overviewMrrFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.14} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0.04} />
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
            tickFormatter={(v: number) => `£${v / 1000}k`}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={compact ? 34 : 40}
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
            formatter={(v: number, _n, p) => {
              const row = p?.payload as MrrPoint | undefined;
              const parts = [gbp(v)];
              if (row?.stripe != null) parts.push(`Stripe ${gbp(row.stripe)}`);
              if (row?.rc != null) parts.push(`Stores ${gbp(row.rc)}`);
              return [parts.join(' · '), 'MRR'];
            }}
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
          <Area
            type="monotone"
            dataKey="total"
            stroke={ACCENT}
            strokeWidth={2}
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
