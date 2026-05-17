import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudentOtjTrajectory } from '@/hooks/useStudentOtjTrajectory';

/* ==========================================================================
   OtjTrajectoryChart — cumulative actual OTJ vs linear required target.

   Used inside the Student 360 OTJ panel. Two lines: actual (cumulative
   hours from college_otj_entries) and required (linear ramp from
   start_date to expected_end_date hitting otj_required_hours).
   Tutors instantly see whether the learner is ahead/on/behind for the
   ESFA 20% rule.
   ========================================================================== */

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export function OtjTrajectoryChart({
  collegeStudentId,
  userId,
}: {
  collegeStudentId: string | null;
  userId: string | null;
}) {
  const t = useStudentOtjTrajectory({ collegeStudentId, userId });

  const chartData = useMemo(
    () =>
      t.points.map((p) => ({
        ...p,
        label: fmtDate(p.week_ending),
      })),
    [t.points]
  );

  if (t.loading) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 animate-pulse">
        <div className="h-3 w-32 rounded bg-white/[0.06]" />
        <div className="mt-4 h-48 rounded bg-white/[0.04]" />
      </div>
    );
  }

  if (!t.start_date || chartData.length === 0) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-6 text-[12.5px] text-white/55 leading-snug">
        Trajectory needs a programme start date and at least one logged OTJ entry.
        Once both are set, this chart shows whether the learner is ahead, on or
        behind the ESFA 20% line.
      </div>
    );
  }

  const deltaTone =
    t.current_delta >= 0
      ? 'text-emerald-300'
      : t.current_delta >= -10
        ? 'text-amber-300'
        : 'text-red-300';
  const TrendIcon = t.current_delta >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            OTJ trajectory
          </div>
          <div className="mt-0.5 text-[13.5px] text-white/85 leading-snug">
            Cumulative hours vs ESFA 20% ramp
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Stat
            label="Now"
            value={`${t.current_actual}h`}
            sub={`/ ${t.current_required}h target`}
          />
          <Stat label="Goal" value={`${t.required_total}h`} icon={<Target className="h-3 w-3" />} />
          <div
            className={cn(
              'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[11px] font-semibold tabular-nums',
              t.current_delta >= 0
                ? 'bg-emerald-500/[0.10] border border-emerald-400/30 text-emerald-200'
                : t.current_delta >= -10
                  ? 'bg-amber-500/[0.10] border border-amber-400/30 text-amber-200'
                  : 'bg-red-500/[0.10] border border-red-400/30 text-red-200'
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {t.current_delta >= 0 ? '+' : ''}
            {t.current_delta}h
          </div>
        </div>
      </div>

      <div className="h-56 sm:h-64 w-full -mx-1">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.45)' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              minTickGap={20}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.45)' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              label={{
                value: 'Hours',
                angle: -90,
                position: 'insideLeft',
                offset: 14,
                style: { fontSize: 10, fill: 'rgba(255,255,255,0.45)' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 8%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '0.5rem',
                fontSize: 11,
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.55)' }}
              itemStyle={{ color: 'rgba(255,255,255,0.85)' }}
              formatter={(v: number) => `${v}h`}
            />
            <ReferenceLine
              y={t.required_total}
              stroke="rgba(252,211,77,0.35)"
              strokeDasharray="3 4"
              label={{
                value: `${t.required_total}h`,
                position: 'right',
                fill: 'rgba(252,211,77,0.7)',
                fontSize: 9,
              }}
            />
            <Line
              type="monotone"
              dataKey="required_hours"
              stroke="rgba(252,211,77,0.6)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              name="Required"
            />
            <Line
              type="monotone"
              dataKey="cumulative_verified_hours"
              stroke="rgba(52,211,153,0.55)"
              strokeWidth={1.5}
              dot={false}
              name="Verified"
            />
            <Line
              type="monotone"
              dataKey="cumulative_hours"
              stroke="rgb(96,165,250)"
              strokeWidth={2.2}
              dot={false}
              name="Actual"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-4 text-[10.5px] text-white/55 flex-wrap">
        <Legend dot="bg-blue-400" label="Actual cumulative" />
        <Legend dot="bg-emerald-400/70" label="Verified" />
        <Legend dot="bg-elec-yellow/70" label="Required (linear)" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="text-right">
      <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/50 inline-flex items-center gap-1 justify-end">
        {icon}
        {label}
      </div>
      <div className="text-[13.5px] font-semibold text-white tabular-nums leading-none mt-0.5">
        {value}
      </div>
      {sub && <div className="text-[10px] text-white/45 mt-0.5">{sub}</div>}
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', dot)} />
      {label}
    </div>
  );
}
