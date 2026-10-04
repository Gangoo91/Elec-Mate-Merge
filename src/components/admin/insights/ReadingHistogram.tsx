import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { BLUE, GRID } from '@/components/admin/overview/primitives';
import type { ReadingBucket } from '@/hooks/useCertificateInsights';

const tooltipStyle = {
  background: 'hsl(0 0% 10%)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  color: '#ffffff',
  fontSize: 12,
  padding: '8px 10px',
} as const;

const edge = (v: number | null) => (v === null ? '' : Number(v).toString());

/**
 * Where the readings fall, on the fixed bucket edges the refresh uses. Bars
 * are counts of readings; the label is the bucket's range in the measurement's
 * unit, with the top bucket open-ended.
 */
export default function ReadingHistogram({
  buckets,
  unit,
  height = 240,
}: {
  buckets: ReadingBucket[];
  unit: string;
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo(
    () =>
      buckets.map((b) => ({
        label: b.hi === null ? `${edge(b.lo)}+` : `${edge(b.lo)}–${edge(b.hi)}`,
        n: b.n,
      })),
    [buckets]
  );

  if (data.length === 0) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Fewer than five certificates behind this selection.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#ffffff', fontSize: isMobile ? 10 : 11 }}
            axisLine={false}
            tickLine={false}
            interval={isMobile ? 1 : 0}
            angle={-40}
            textAnchor="end"
            height={58}
          />
          <YAxis
            tick={{ fill: '#ffffff', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={48}
            tickFormatter={(v: number) => v.toLocaleString()}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            formatter={(v: number) => [`${v.toLocaleString()} readings`, '']}
            labelFormatter={(l) => `${l} ${unit}`}
          />
          <Bar dataKey="n" fill={BLUE} radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
