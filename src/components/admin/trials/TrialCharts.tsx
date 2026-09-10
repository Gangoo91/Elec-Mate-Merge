/**
 * The three charts on the Trials page.
 *
 * House style is `MrrChart`: hairline gridlines one step off the surface, no
 * axis lines, white tick text, a dark tooltip card, and a click-to-pin tooltip
 * on a phone because a hover that only exists under a finger is useless.
 *
 * Colours are the overview palette's categorical slots, assigned to outcomes in
 * fixed order and never cycled — converted is aqua, expired is orange, live is
 * blue, everywhere on the page including the legends and the list pills.
 * Validated as a set against the dark surface:
 *   node scripts/validate_palette.js "#199E70,#D95926,#3987E5" \
 *     --mode dark --surface "#1C1C1C"
 * All six checks pass; the red the page used before this sat at ΔE 6.5 against
 * the green under protanopia, which is the floor band, not a pass.
 */

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { AQUA, BLUE, GRID, HAIRLINE, ORANGE, SURFACE } from '@/components/admin/overview/primitives';
import type { TrialBand, TrialCurvePoint, TrialWeek } from '@/hooks/useTrialInsights';
import { BAND_MIN_DECIDED, bandRates, returnCurve, weeklySeries } from '@/hooks/useTrialInsights';

export const TRIAL_COLOURS = {
  converted: AQUA,
  expired: ORANGE,
  live: BLUE,
} as const;

/** Quiet grey for a band that has not earned an accent. */
const MUTED = 'rgba(255,255,255,0.30)';

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

/** Legend swatches. Two or three series always carry one — identity is never colour alone. */
export function ChartLegend({
  items,
}: {
  items: Array<{ label: string; colour: string; value?: string | number }>;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
      {items.map((it) => (
        <span
          key={it.label}
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] text-white"
        >
          <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: it.colour }} />
          {it.label}
          {it.value != null && <b className="font-semibold tabular-nums">{it.value}</b>}
        </span>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   1. Weekly intake, stacked by how each week ended
   ─────────────────────────────────────────────────────────── */

/**
 * How many trials started each week, and what became of them.
 *
 * One y-axis — a count. The conversion rate deliberately does NOT ride along on
 * a second scale: a dual axis lets you place two unrelated series wherever the
 * story needs them, and the rate is stated as a figure beside the chart instead.
 *
 * Recent weeks are legitimately all-blue: those trials have not finished yet.
 */
export function WeeklyIntakeChart({ weekly, height = 220 }: { weekly: TrialWeek[]; height?: number }) {
  const isMobile = useIsMobile();
  const data = useMemo(() => weeklySeries(weekly, isMobile ? 10 : 16), [weekly, isMobile]);

  if (data.length < 2) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Not enough weeks of trials to draw a trend yet.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 6, left: 6, bottom: 0 }} barCategoryGap="22%">
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="week"
            tickFormatter={weekLabel}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={22}
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
            labelFormatter={(iso) => `Week of ${weekLabel(String(iso))}`}
            formatter={(v: number, name: string) => [v, name]}
          />
          {/*
            A 2px surface-coloured stroke, because recharts has no gap between
            stacked segments. It reads as the gap the house style wants; a
            transparent stroke would let the fills touch.
          */}
          <Bar dataKey="converted" name="Converted" stackId="a" fill={TRIAL_COLOURS.converted} stroke={SURFACE} strokeWidth={2} isAnimationActive={false} />
          <Bar dataKey="expired" name="Expired" stackId="a" fill={TRIAL_COLOURS.expired} stroke={SURFACE} strokeWidth={2} isAnimationActive={false} />
          <Bar dataKey="live" name="Still running" stackId="a" fill={TRIAL_COLOURS.live} stroke={SURFACE} strokeWidth={2} radius={[3, 3, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   2. The return curve — the one with a real effect size
   ─────────────────────────────────────────────────────────── */

/**
 * What share of each outcome group was still opening the app on day N.
 *
 * Both series are a percentage of their own group, so they share one axis and
 * the comparison is fair even though there are six times as many expired trials
 * as converted ones. Day 0 is 100% by construction — everybody is active on the
 * day they sign up — so the story is entirely in how fast each line falls.
 */
export function ReturnCurveChart({
  curve,
  height = 240,
}: {
  curve: TrialCurvePoint[];
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo(() => returnCurve(curve), [curve]);

  if (data.length < 3) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Not enough finished trials to draw the return curve yet.
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        {/* The y-axis sits on the right, so the left margin exists only to give
            the "Signup" tick room — at 6px it rendered as "gnup". */}
        <LineChart data={data} margin={{ top: 14, right: 10, left: 24, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={(d: number) => (d === 0 ? 'Signup' : `Day ${d}`)}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={isMobile ? 1 : 0}
            minTickGap={8}
          />
          <YAxis
            orientation="right"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          {/* Day 1 is where the cohort splits — mark it so the gap has an anchor. */}
          <ReferenceLine x={1} stroke={HAIRLINE} />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ stroke: HAIRLINE }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(d) => (Number(d) === 0 ? 'Signup day' : `Day ${d} of the trial`)}
            formatter={(v: number, name: string, p) => {
              const row = p?.payload as (typeof data)[number] | undefined;
              const isConv = name === 'Converted';
              const active = isConv ? row?.convertedActive : row?.expiredActive;
              const total = isConv ? row?.convertedN : row?.expiredN;
              return [`${v.toFixed(0)}% · ${active} of ${total}`, name];
            }}
          />
          <Line
            type="monotone"
            dataKey="convertedPct"
            name="Converted"
            stroke={TRIAL_COLOURS.converted}
            strokeWidth={2}
            dot={{ r: 3, fill: TRIAL_COLOURS.converted, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{ r: 5, fill: TRIAL_COLOURS.converted, stroke: SURFACE, strokeWidth: 2 }}
            connectNulls
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="expiredPct"
            name="Expired"
            stroke={TRIAL_COLOURS.expired}
            strokeWidth={2}
            dot={{ r: 3, fill: TRIAL_COLOURS.expired, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{ r: 5, fill: TRIAL_COLOURS.expired, stroke: SURFACE, strokeWidth: 2 }}
            connectNulls
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   3. Conversion by trial score
   ─────────────────────────────────────────────────────────── */

/**
 * Does the score the list sorts by actually predict anything?
 *
 * One series, one axis, six ordered bands. Colour is not a second copy of the
 * bar height — it marks the engaged threshold (45), so the chart says the same
 * thing as the Engaged/Quiet pill on every row. `n` sits above each bar because
 * the top two bands are single figures and a 60% built on five trials must not
 * read like a 60% built on fifty.
 */
export function ScoreBandChart({
  bands,
  engagedAt = 45,
  height = 220,
}: {
  bands: TrialBand[];
  engagedAt?: number;
  height?: number;
}) {
  const isMobile = useIsMobile();
  const data = useMemo(
    () => bandRates(bands).filter((b) => b.decided >= BAND_MIN_DECIDED),
    [bands]
  );

  if (data.length < 3) {
    return (
      <div className="flex items-center text-[13px] text-white" style={{ height }}>
        Not enough finished trials to band by score yet.
      </div>
    );
  }

  const engagedBand = Math.floor(engagedAt / 15);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 6, left: 6, bottom: 0 }} barCategoryGap="26%">
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            orientation="right"
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fill: '#ffffff', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={34}
          />
          <Tooltip
            trigger={isMobile ? 'click' : 'hover'}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: '#ffffff', fontWeight: 600 }}
            itemStyle={{ color: '#ffffff' }}
            labelFormatter={(l) => `Score ${l}`}
            formatter={(v: number, _n, p) => {
              const row = p?.payload as (typeof data)[number] | undefined;
              return [`${v.toFixed(1)}% · ${row?.converted} of ${row?.decided} finished`, 'Converted'];
            }}
          />
          <Bar
            dataKey="cvr"
            name="Converted"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
            label={{
              position: 'top',
              fill: '#ffffff',
              fontSize: 10,
              formatter: (v: unknown) => (typeof v === 'number' ? `${Math.round(v)}%` : ''),
            }}
          >
            {data.map((d) => (
              <Cell key={d.band} fill={d.band >= engagedBand ? TRIAL_COLOURS.converted : MUTED} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
