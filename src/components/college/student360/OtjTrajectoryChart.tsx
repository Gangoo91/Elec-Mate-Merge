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
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useStudentOtjTrajectory } from '@/hooks/useStudentOtjTrajectory';

/* ==========================================================================
   OtjTrajectoryChart — cumulative OTJ hours against the linear required
   ramp, inside the Student 360 OTJ panel.

   Three lines: logged (every college_otj_entries row, whatever its status),
   verified (the subset a tutor or employer has signed off), and required
   (a straight ramp from start_date to expected_end_date hitting the
   programme's required hours). A tutor sees at a glance whether the learner
   is ahead, on or behind.

   Palette: verified is the volt stroke because it is the figure that
   counts for gateway; logged is white; required is the /25 guide. The old
   chart drew logged in blue and verified in a translucent emerald.
   ========================================================================== */

const VOLT = 'hsl(47 100% 50%)';
const WHITE = 'rgba(255,255,255,0.95)';
const GUIDE = 'rgba(255,255,255,0.25)';
const AXIS = 'rgba(255,255,255,0.10)';

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

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
      <div className={cn(CARD, 'animate-pulse px-4 py-4 sm:px-5')}>
        <div className="h-3 w-32 rounded bg-white/[0.10]" />
        <div className="mt-4 h-48 rounded bg-white/[0.06]" />
      </div>
    );
  }

  if (!t.start_date || chartData.length === 0) {
    return (
      <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
        <div className="text-[13px] font-semibold text-white">Trajectory</div>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          Needs a programme start date and at least one logged entry. Once both are set, this shows
          whether the learner is ahead, on or behind the required line.
        </p>
      </div>
    );
  }

  const last = t.points[t.points.length - 1];
  const verifiedNow = last?.cumulative_verified_hours ?? 0;
  // More than ten hours behind is a real problem; anything else is a figure.
  const behind = t.current_delta < -10;

  return (
    <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-white">Trajectory</div>
          <div className="mt-0.5 text-[12px] leading-snug text-white">
            Cumulative hours against the required line · goal {t.required_total}h
          </div>
        </div>
        <div className="flex items-start gap-4 sm:gap-5">
          <Stat label="Verified" value={`${verifiedNow}h`} accent />
          <Stat
            label="Logged"
            value={`${t.current_actual}h`}
            sub={`of ${t.current_required}h due`}
          />
          <Stat
            label={t.current_delta >= 0 ? 'Ahead' : 'Behind'}
            value={`${Math.abs(t.current_delta)}h`}
            tone={behind ? 'bad' : 'neutral'}
          />
        </div>
      </div>

      <div className="-mx-1 mt-3 h-56 w-full sm:h-64">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid stroke={AXIS} strokeDasharray="2 4" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: WHITE }}
              tickLine={false}
              axisLine={{ stroke: AXIS }}
              minTickGap={20}
            />
            <YAxis
              tick={{ fontSize: 10, fill: WHITE }}
              tickLine={false}
              axisLine={{ stroke: AXIS }}
              label={{
                value: 'Hours',
                angle: -90,
                position: 'insideLeft',
                offset: 14,
                style: { fontSize: 10, fill: WHITE },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 8%)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '0.5rem',
                fontSize: 11,
              }}
              labelStyle={{ color: WHITE }}
              itemStyle={{ color: WHITE }}
              formatter={(v: number) => `${v}h`}
            />
            <ReferenceLine
              y={t.required_total}
              stroke={GUIDE}
              strokeDasharray="3 4"
              label={{
                value: `${t.required_total}h`,
                position: 'right',
                fill: WHITE,
                fontSize: 9,
              }}
            />
            <Line
              type="monotone"
              dataKey="required_hours"
              stroke={GUIDE}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              name="Required"
            />
            <Line
              type="monotone"
              dataKey="cumulative_hours"
              stroke={WHITE}
              strokeWidth={1.5}
              dot={false}
              name="Logged"
            />
            <Line
              type="monotone"
              dataKey="cumulative_verified_hours"
              stroke={VOLT}
              strokeWidth={2.2}
              dot={false}
              name="Verified"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11.5px] text-white">
        <Legend swatch="bg-elec-yellow" label="Verified" />
        <Legend swatch="bg-white" label="Logged (all statuses)" />
        <Legend swatch="bg-white/[0.25]" label="Required" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent = false,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  tone?: 'neutral' | 'bad';
}) {
  return (
    <div className="text-right">
      <div className="text-[11px] font-medium text-white">{label}</div>
      <div
        className={cn(
          'mt-0.5 text-[15px] font-semibold leading-none tabular-nums',
          accent ? 'text-elec-yellow' : tone === 'bad' ? 'text-red-300' : 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] tabular-nums text-white">{sub}</div>}
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={cn('inline-block h-[3px] w-4 rounded-full', swatch)} />
      {label}
    </div>
  );
}
