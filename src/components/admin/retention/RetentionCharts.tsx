import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { BLUE, DE_EMPHASIS, GRID, SURFACE } from '@/components/admin/overview/primitives';
import {
  pct,
  TARGET_3IN7,
  RETENTION_COLOURS,
  type RetentionWeek,
} from '@/hooks/useRetentionMetrics';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekLabel = (iso: string) =>
  `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

const tooltipStyle = {
  background: 'hsl(0 0% 10%)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  color: '#ffffff',
  fontSize: 12,
  padding: '8px 10px',
} as const;

interface Point {
  week: string;
  electrician: number | null;
  apprentice: number | null;
  electricianN: number;
  apprenticeN: number;
}

/** Weekly 3-in-7 rate, both roles, with the plan's targets as dashed rules. */
export function ActivationTrendChart({
  weekly,
  height = 220,
}: {
  weekly: RetentionWeek[];
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo<Point[]>(() => {
    const weeks = [...new Set(weekly.map((w) => w.wk))].sort();
    const shown = weeks.slice(isMobile ? -8 : -12);
    return shown.map((wk) => {
      const e = weekly.find((w) => w.wk === wk && w.role === 'electrician');
      const a = weekly.find((w) => w.wk === wk && w.role === 'apprentice');
      return {
        week: wk,
        // Fewer than 5 carded in a week is noise, not a rate: leave the gap.
        electrician: e && e.carded >= 5 ? pct(e.hit_3in7, e.carded) : null,
        apprentice: a && a.carded >= 5 ? pct(a.hit_3in7, a.carded) : null,
        electricianN: e?.carded ?? 0,
        apprenticeN: a?.carded ?? 0,
      };
    });
  }, [weekly, isMobile]);

  if (data.length < 3) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Not enough weeks to draw a trend yet.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 14, right: 8, left: 4, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="week"
            tickFormatter={weekLabel}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis
            orientation="right"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={34}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ stroke: 'rgba(255,255,255,0.18)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(iso) => `Signed up week of ${weekLabel(String(iso))}`}
            formatter={(v: number | null, name: string, item) => {
              const p = item?.payload as Point | undefined;
              const n = name === 'Electricians' ? p?.electricianN : p?.apprenticeN;
              return [v === null ? 'too few' : `${v}% of ${n}`, name];
            }}
          />
          <ReferenceLine
            y={TARGET_3IN7.electrician}
            stroke={DE_EMPHASIS}
            strokeDasharray="4 4"
            label={{
              value: `Electrician target ${TARGET_3IN7.electrician}%`,
              fill: '#ffffff',
              fontSize: 10,
              position: 'insideBottomLeft',
            }}
          />
          <ReferenceLine
            y={TARGET_3IN7.apprentice}
            stroke={DE_EMPHASIS}
            strokeDasharray="4 4"
            label={{
              value: `Apprentice target ${TARGET_3IN7.apprentice}%`,
              fill: '#ffffff',
              fontSize: 10,
              // The two targets sit ten points apart, so both labels on the
              // left collide. Electricians read from the left, apprentices
              // from the right.
              position: 'insideTopRight',
            }}
          />
          <Line
            type="monotone"
            dataKey="electrician"
            name="Electricians"
            stroke={RETENTION_COLOURS.electrician}
            strokeWidth={2}
            dot={{ r: 3, fill: RETENTION_COLOURS.electrician, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{
              r: 5,
              fill: RETENTION_COLOURS.electrician,
              stroke: SURFACE,
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="apprentice"
            name="Apprentices"
            stroke={RETENTION_COLOURS.apprentice}
            strokeWidth={2}
            dot={{ r: 3, fill: RETENTION_COLOURS.apprentice, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{
              r: 5,
              fill: RETENTION_COLOURS.apprentice,
              stroke: SURFACE,
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Legend swatches — two series always carry one, so identity is never colour alone. */
export function RetentionLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white">
      <span className="inline-flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: RETENTION_COLOURS.electrician }}
        />
        Electricians
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: RETENTION_COLOURS.apprentice }}
        />
        Apprentices
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-0 w-4 border-t border-dashed" style={{ borderColor: DE_EMPHASIS }} />
        12-week target
      </span>
    </div>
  );
}

/**
 * Cancel reasons as one-hue bars with direct labels. Magnitude, not identity,
 * so every bar is the same blue; the label carries the name.
 */
export function ReasonBars({ reasons }: { reasons: Array<{ reason: string; n: number }> }) {
  const total = reasons.reduce((a, r) => a + r.n, 0);
  const max = Math.max(1, ...reasons.map((r) => r.n));
  if (total === 0) {
    return <p className="text-[13px] text-white">No cancellations in the last 28 days.</p>;
  }
  return (
    <ul className="space-y-2.5">
      {reasons.map((r) => (
        <li key={r.reason} className="text-[13px] text-white">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="truncate">{r.reason}</span>
            <span className="shrink-0 tabular-nums">
              {r.n} <span className="text-[11px]">· {Math.round((100 * r.n) / total)}%</span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(2, (100 * r.n) / max)}%`, background: BLUE }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
