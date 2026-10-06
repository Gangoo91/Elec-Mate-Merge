import { useMemo, type ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { useStudentOtjTrajectory } from '@/hooks/useStudentOtjTrajectory';
import { useAppLearningBreakdown } from '@/hooks/useOtjSummary';
import type { AcCoverageRow, AttendanceRow } from '@/hooks/useStudent360';

/* ==========================================================================
   Student 360 visuals (ELE-2015). Andrew, 6 Oct: "this looks bare as hell,
   this should be visually excellent, nice graphs and the lot". Every chart
   reads a figure the page already holds or the same RPC the area page uses,
   so the picture and the detail can never disagree.
   ========================================================================== */

const VOLT = 'hsl(47 100% 50%)';
const ORANGE = 'hsl(27 96% 61%)';
const GREEN = 'hsl(142 69% 58%)';
const WHITE = 'rgba(255,255,255,0.95)';
const GUIDE = 'rgba(255,255,255,0.3)';
const AXIS = 'rgba(255,255,255,0.08)';
const TRACK = 'rgba(255,255,255,0.08)';

export const VIS_CARD =
  '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6 h-full';

const TOOLTIP = {
  contentStyle: {
    backgroundColor: 'hsl(0 0% 8%)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '0.75rem',
    fontSize: 12,
  },
  labelStyle: { color: WHITE },
  itemStyle: { color: WHITE },
};

function fmtShort(iso: string) {
  return new Date(`${iso.slice(0, 10)}T12:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function VisHead({ title, sub, aside, onOpen }: { title: string; sub?: string; aside?: ReactNode; onOpen?: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {sub && <p className="mt-0.5 text-[12.5px] leading-snug text-white">{sub}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {aside}
        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            className="-my-2 h-11 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
          >
            Open
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Ring gauge ─────────────────────────────────────────────────────── */

export function Ring({
  pct,
  value,
  label,
  sub,
  warn,
  onClick,
}: {
  pct: number | null;
  value: string;
  label: string;
  sub: string;
  warn?: boolean;
  onClick?: () => void;
}) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const p = pct === null ? 0 : Math.max(0, Math.min(100, pct));
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-w-0 flex-col items-center gap-3 rounded-2xl p-2 text-center touch-manipulation transition-colors hover:bg-white/[0.04]"
    >
      <span className="relative block h-[88px] w-[88px] shrink-0 sm:h-[104px] sm:w-[104px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke={TRACK} strokeWidth="9" />
          <motion.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={warn ? ORANGE : VOLT}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (c * p) / 100 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </svg>
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center text-[20px] font-bold tabular-nums sm:text-[23px]',
            warn ? 'text-orange-400' : 'text-white'
          )}
        >
          {value}
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold text-white">{label}</span>
        <span className="mt-0.5 block text-[12px] leading-snug text-white">{sub}</span>
      </span>
    </button>
  );
}

/* ── Programme journey: start → today → planned end ─────────────────── */

export function ProgrammeJourney({
  start,
  end,
  reviewDueBy,
}: {
  start: string | null;
  end: string | null;
  reviewDueBy: string | null;
}) {
  if (!start || !end) {
    return (
      <p className="text-[13px] text-white">
        No start and planned end dates on the record yet, so there is no programme timeline.
      </p>
    );
  }
  const s = Date.parse(start);
  const e = Date.parse(end);
  const now = Date.now();
  const span = Math.max(1, e - s);
  const at = (t: number) => Math.max(0, Math.min(100, ((t - s) / span) * 100));
  const through = Math.round(at(now));
  const monthsLeft = Math.max(0, Math.round((e - now) / (30.44 * 86_400_000)));
  const review = reviewDueBy ? Date.parse(reviewDueBy) : null;
  const reviewLate = review !== null && review < now;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] text-white">
          <span className="text-[22px] font-bold tabular-nums text-white">{through}%</span> through the programme
        </p>
        <p className="text-[12.5px] text-white">{monthsLeft} months to go</p>
      </div>
      <div className="relative mt-4 h-3 rounded-full bg-white/[0.08]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-elec-yellow/60 to-elec-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${through}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <span
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-background bg-white"
          style={{ left: `${through}%` }}
          aria-hidden
        />
        {review !== null && review >= s && review <= e && (
          <span
            className={cn(
              'absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] border-2 border-background',
              reviewLate ? 'bg-orange-400' : 'bg-white'
            )}
            style={{ left: `${at(review)}%` }}
            title="Next progress review due"
            aria-hidden
          />
        )}
      </div>
      <div className="mt-2.5 flex justify-between text-[12px] text-white">
        <span>Started {fmtShort(start)} {new Date(start).getFullYear()}</span>
        {review !== null && (
          <span className={cn('hidden sm:inline', reviewLate && 'text-orange-300')}>
            ◆ Review {reviewLate ? 'was due' : 'due'} {fmtShort(reviewDueBy!)}
          </span>
        )}
        <span>Ends {fmtShort(end)} {new Date(end).getFullYear()}</span>
      </div>
    </div>
  );
}

/* ── Off-the-job hours against the planned line ─────────────────────── */

export function HoursChart({
  collegeStudentId,
  userId,
  first,
  onOpen,
}: {
  collegeStudentId: string;
  userId: string | null;
  first: string;
  onOpen?: () => void;
}) {
  const t = useStudentOtjTrajectory({ collegeStudentId, userId });
  const data = useMemo(
    () => t.points.map((p) => ({ ...p, label: fmtShort(p.week_ending) })),
    [t.points]
  );
  const behind = t.current_delta < -10;
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead
        title="Off-the-job hours"
        sub={t.required_total ? `Counted against the planned line · goal ${t.required_total}h` : 'Counted hours over time'}
        onOpen={onOpen}
      />
      {!userId ? (
        <NotLinked text={`${first} hasn't signed in to the app with their college email yet, so off-the-job time and app learning can't be counted.`} />
      ) : !t.loading && data.length === 0 ? (
        <NotLinked text="Needs a programme start date and some off-the-job time before there is a line to draw." />
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            <Figure label="Counted" value={`${t.current_actual}h`} />
            <Figure label="Planned by now" value={`${t.current_required}h`} />
            <Figure label={t.current_delta >= 0 ? 'Ahead' : 'Behind'} value={`${Math.abs(t.current_delta)}h`} warn={behind} />
          </div>
          <div className="-mx-2 mt-4 h-56 sm:h-64">
            {t.loading ? (
              <div className="h-full animate-pulse rounded-2xl bg-white/[0.04]" />
            ) : (
              <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 8, right: 12, left: -14, bottom: 0 }}>
                  <defs>
                    <linearGradient id="s360-hours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={VOLT} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={VOLT} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={AXIS} vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: WHITE }} tickLine={false} axisLine={false} minTickGap={28} />
                  <YAxis tick={{ fontSize: 11, fill: WHITE }} tickLine={false} axisLine={false} width={44} />
                  <Tooltip {...TOOLTIP} formatter={(v: number, n: string) => [`${v}h`, n]} />
                  <Area type="monotone" dataKey="required_hours" name="Planned" stroke={GUIDE} strokeDasharray="5 5" strokeWidth={1.5} fill="none" />
                  <Area type="monotone" dataKey="cumulative_hours" name="Counted" stroke={VOLT} strokeWidth={2.5} fill="url(#s360-hours)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-[12px] text-white">
            <Key swatch="bg-elec-yellow" label="Counted" />
            <Key swatch="bg-white/30" label="Planned" dashed />
          </div>
        </>
      )}
    </motion.section>
  );
}

/* ── Learning in the app, last 30 days ──────────────────────────────── */

const AREA_NAME: Record<string, string> = {
  am2: 'AM2 simulator',
  am2_simulator: 'AM2 simulator',
  mock_exams: 'Mock exams',
  mock: 'Mock exams',
  study_centre: 'Study Centre',
  flashcards: 'Flashcards',
  epa: 'EPA practice',
  epa_practice: 'EPA practice',
  videos: 'Videos',
  quizzes: 'Quizzes',
};

function areaName(a: string) {
  return AREA_NAME[a] ?? a.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

function fmtMins(m: number) {
  const h = Math.floor(m / 60);
  const r = Math.round(m % 60);
  return h ? `${h}h ${r}m` : `${r}m`;
}

export function ActivityChart({ userId, first, onOpen }: { userId: string | null; first: string; onOpen?: () => void }) {
  const { data, loading } = useAppLearningBreakdown(userId, 30);
  const days = useMemo(() => {
    const byDay = new Map((data?.days ?? []).map((d) => [d.day.slice(0, 10), d.minutes]));
    const out: Array<{ day: string; label: string; minutes: number }> = [];
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - 29);
    for (let i = 0; i < 30; i++) {
      const iso = d.toLocaleDateString('en-CA');
      out.push({ day: iso, label: fmtShort(iso), minutes: Math.round(byDay.get(iso) ?? 0) });
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, [data]);
  const active = days.filter((d) => d.minutes > 0).length;
  const total = data?.total_minutes ?? 0;
  const areas = (data?.areas ?? []).slice().sort((a, b) => b.minutes - a.minutes).slice(0, 4);
  const max = Math.max(1, ...areas.map((a) => a.minutes));
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead title="Learning in the app" sub="Last 30 days, every minute recorded automatically" onOpen={onOpen} />
      {!userId ? (
        <NotLinked text={`Once ${first} signs in to the app, every minute of learning shows here by day and by area.`} />
      ) : (
      <>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        <Figure label="Time learning" value={fmtMins(total)} />
        <Figure label="Active days" value={`${active} of 30`} warn={active < 4} />
      </div>
      <div className={cn('-mx-2 mt-4', !loading && total === 0 ? 'h-20' : 'h-36')}>
        {loading ? (
          <div className="h-full animate-pulse rounded-2xl bg-white/[0.04]" />
        ) : total === 0 ? (
          <Empty text={`No learning in the app in the last 30 days.`} />
        ) : (
          <ResponsiveContainer>
            <BarChart data={days} margin={{ top: 4, right: 14, left: 14, bottom: 0 }}>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: WHITE }} tickLine={false} axisLine={false} interval={6} />
              <Tooltip {...TOOLTIP} cursor={{ fill: 'rgba(255,255,255,0.05)' }} formatter={(v: number) => [fmtMins(v), 'Learning']} />
              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {days.map((d) => (
                  <Cell key={d.day} fill={d.minutes > 0 ? VOLT : TRACK} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {areas.length > 0 && (
        <ul className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
          {areas.map((a) => (
            <li key={a.area} className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3">
              <span className="truncate text-[12.5px] text-white">{areaName(a.area)}</span>
              <span className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <span className="block h-full rounded-full bg-elec-yellow" style={{ width: `${(a.minutes / max) * 100}%` }} />
              </span>
              <span className="text-right text-[12.5px] font-semibold tabular-nums text-white">{fmtMins(a.minutes)}</span>
            </li>
          ))}
        </ul>
      )}
      </>
      )}
    </motion.section>
  );
}

/* ── Criteria by unit ───────────────────────────────────────────────── */

const AC_STATES: Array<{ key: AcCoverageRow['status']; label: string; cls: string }> = [
  { key: 'confirmed', label: 'IQA confirmed', cls: 'bg-emerald-400' },
  { key: 'assessed', label: 'Assessed', cls: 'bg-elec-yellow' },
  { key: 'evidenced', label: 'Evidenced', cls: 'bg-elec-yellow/50' },
  { key: 'in_progress', label: 'In progress', cls: 'bg-white/40' },
];

export function CriteriaByUnit({ rows, onOpen, limit = 8 }: { rows: AcCoverageRow[]; onOpen?: () => void; limit?: number }) {
  const units = useMemo(() => {
    const m = new Map<string, Record<string, number>>();
    for (const r of rows) {
      const u = m.get(r.unit_code) ?? { total: 0 };
      u.total += 1;
      u[r.status] = (u[r.status] ?? 0) + 1;
      m.set(r.unit_code, u);
    }
    return [...m.entries()]
      .map(([code, c]) => ({
        code,
        total: c.total,
        counts: c,
        done: (c.evidenced ?? 0) + (c.assessed ?? 0) + (c.confirmed ?? 0),
      }))
      .sort((a, b) => b.done / b.total - a.done / a.total || a.code.localeCompare(b.code, undefined, { numeric: true }));
  }, [rows]);
  const shown = units.slice(0, limit);
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead
        title="Criteria by unit"
        sub={units.length ? `${units.length} units · furthest along first` : undefined}
        onOpen={onOpen}
      />
      {units.length === 0 ? (
        <div className="mt-4 h-28">
          <Empty text="No criteria list yet. Seed it from the course on the criteria page." />
        </div>
      ) : (
        <>
          <ul className="mt-4 space-y-3">
            {shown.map((u) => (
              <li key={u.code}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[12.5px] font-semibold text-white">Unit {u.code}</span>
                  <span className="shrink-0 text-[12px] tabular-nums text-white">
                    {u.done} / {u.total}
                  </span>
                </div>
                <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
                  {AC_STATES.map((s) => {
                    const n = u.counts[s.key] ?? 0;
                    return n ? (
                      <motion.span
                        key={s.key}
                        className={cn('h-full', s.cls)}
                        initial={{ width: 0 }}
                        animate={{ width: `${(n / u.total) * 100}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    ) : null;
                  })}
                </div>
              </li>
            ))}
          </ul>
          {units.length > shown.length && (
            <p className="mt-3 text-[12px] text-white">and {units.length - shown.length} more units</p>
          )}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-white">
            {AC_STATES.map((s) => (
              <Key key={s.key} swatch={s.cls} label={s.label} />
            ))}
          </div>
        </>
      )}
    </motion.section>
  );
}

/* ── Attendance: the last sessions as a strip ───────────────────────── */

function attTone(status: string) {
  const s = status.toLowerCase();
  if (s === 'present') return { cls: 'bg-emerald-400', label: 'Present' };
  if (s === 'late') return { cls: 'bg-elec-yellow', label: 'Late' };
  if (s === 'absent') return { cls: 'bg-red-400', label: 'Absent' };
  return { cls: 'bg-white/40', label: status.replace(/_/g, ' ') };
}

export function AttendanceStrip({ rows, rate, onOpen }: { rows: AttendanceRow[]; rate: number | null; onOpen?: () => void }) {
  const last = rows.slice(0, 28).reverse();
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead title="Attendance" sub={last.length ? `Last ${last.length === 1 ? 'session' : `${last.length} sessions, oldest first`}` : undefined} onOpen={onOpen} />
      <p className={cn('mt-4 text-[32px] font-bold leading-none tabular-nums', rate !== null && rate < 85 ? 'text-orange-400' : 'text-white')}>
        {rate === null ? '—' : `${rate}%`}
      </p>
      {last.length === 0 ? (
        <p className="mt-3 text-[13px] text-white">No register taken yet.</p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5">
            {last.map((r) => {
              const t = attTone(r.status);
              return (
                <span
                  key={r.id}
                  title={`${fmtShort(r.date)} · ${t.label}`}
                  className={cn('aspect-square rounded-[5px]', t.cls)}
                />
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-white">
            <Key swatch="bg-emerald-400" label="Present" />
            <Key swatch="bg-elec-yellow" label="Late" />
            <Key swatch="bg-red-400" label="Absent" />
          </div>
        </>
      )}
    </motion.section>
  );
}

/* ── Portfolio: where the submissions are ───────────────────────────── */

export function PortfolioDonut({
  byStatus,
  items,
  verifiedItems,
  onOpen,
}: {
  byStatus: Record<string, number>;
  items: number;
  verifiedItems: number;
  onOpen?: () => void;
}) {
  const slices = [
    { name: 'Signed off', value: (byStatus.approved ?? 0) + (byStatus.signed_off ?? 0) + (byStatus.iqa_verified ?? 0) + (byStatus.iqa_sampled ?? 0), fill: GREEN },
    { name: 'Waiting on you', value: (byStatus.submitted ?? 0) + (byStatus.in_review ?? 0) + (byStatus.under_review ?? 0) + (byStatus.resubmitted ?? 0), fill: VOLT },
    { name: 'With the learner', value: (byStatus.feedback_given ?? 0) + (byStatus.returned ?? 0) + (byStatus.rejected ?? 0), fill: ORANGE },
  ];
  const total = slices.reduce((n, s) => n + s.value, 0);
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead title="Portfolio" sub={`${items} evidence items · ${verifiedItems} supervisor verified`} onOpen={onOpen} />
      <div className="mt-2 flex items-center gap-5">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={total ? slices : [{ name: 'None', value: 1, fill: TRACK }]}
                dataKey="value"
                innerRadius="68%"
                outerRadius="100%"
                stroke="none"
                startAngle={90}
                endAngle={-270}
                isAnimationActive
              >
                {(total ? slices : [{ fill: TRACK }]).map((s, i) => (
                  <Cell key={i} fill={s.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[24px] font-bold leading-none tabular-nums text-white">{total}</span>
            <span className="mt-1 text-[11px] text-white">submitted</span>
          </span>
        </div>
        <ul className="min-w-0 flex-1 space-y-2.5">
          {slices.map((s) => (
            <li key={s.name} className="flex items-center justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 text-[12.5px] text-white">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.fill }} />
                <span className="truncate">{s.name}</span>
              </span>
              <span className="text-[14px] font-semibold tabular-nums text-white">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

/* ── Risk score over time ───────────────────────────────────────────── */

export function RiskTrend({
  history,
  level,
  factor,
  onOpen,
}: {
  history: { computed_at: string; score: number }[];
  level: string | null;
  factor: string | null;
  onOpen?: () => void;
}) {
  const data = useMemo(
    () =>
      history
        .slice()
        .sort((a, b) => a.computed_at.localeCompare(b.computed_at))
        .map((h) => ({ label: fmtShort(h.computed_at), score: Math.round(h.score) })),
    [history]
  );
  const bad = level === 'high' || level === 'critical';
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead title="Risk" sub={factor ?? 'Score from attendance, progress, hours and contact'} onOpen={onOpen} />
      <p className={cn('mt-4 text-[32px] font-bold capitalize leading-none', bad ? 'text-orange-400' : 'text-white')}>
        {level ?? '—'}
      </p>
      <div className="-mx-2 mt-3 h-24">
        {data.length < 2 ? (
          <Empty text="A trend appears after the score has been worked out twice." />
        ) : (
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 6, right: 8, left: 8, bottom: 0 }}>
              <XAxis dataKey="label" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip {...TOOLTIP} formatter={(v: number) => [v, 'Score']} />
              <Line type="monotone" dataKey="score" stroke={bad ? ORANGE : VOLT} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.section>
  );
}

/* ── Learning plan goals ─────────────────────────────────────────────── */

export function GoalsCard({
  total,
  completed,
  inProgress,
  notStarted,
  blocked,
  overdueStatus,
  overdue,
  onOpen,
}: {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  blocked: number;
  /** Goals whose status is 'overdue' (they fit no other segment). */
  overdueStatus: number;
  /** Goals past their target date, whatever their status. */
  overdue: number;
  onOpen?: () => void;
}) {
  const parts = [
    { label: 'Met', n: completed, cls: 'bg-emerald-400' },
    { label: 'In progress', n: inProgress, cls: 'bg-elec-yellow' },
    { label: 'Not started', n: notStarted, cls: 'bg-white/40' },
    { label: 'Blocked', n: blocked, cls: 'bg-red-400' },
    ...(overdueStatus > 0 ? [{ label: 'Overdue', n: overdueStatus, cls: 'bg-orange-400' }] : []),
  ];
  return (
    <motion.section variants={itemVariants} className={VIS_CARD}>
      <VisHead title="Learning plan goals" sub={overdue ? `${overdue} past their target date` : 'Goals set in the learning plan'} onOpen={onOpen} />
      <p className="mt-4 text-[32px] font-bold leading-none tabular-nums text-white">
        {completed}
        <span className="text-[16px] font-semibold"> of {total} met</span>
      </p>
      {total === 0 ? (
        <p className="mt-3 text-[13px] text-white">No goals set yet.</p>
      ) : (
        <>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/[0.08]">
            {parts.map((p) =>
              p.n ? (
                <motion.span
                  key={p.label}
                  className={cn('h-full', p.cls)}
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.n / total) * 100}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              ) : null
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {parts.map((p) => (
              <div key={p.label} className="flex items-center justify-between gap-2 text-[12.5px] text-white">
                <span className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full', p.cls)} />
                  {p.label}
                </span>
                <span className="font-semibold tabular-nums">{p.n}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.section>
  );
}

/* ── Small parts ────────────────────────────────────────────────────── */

function Figure({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div>
      <p className="text-[12px] text-white">{label}</p>
      <p className={cn('mt-0.5 text-[22px] font-bold leading-none tabular-nums', warn ? 'text-orange-400' : 'text-white')}>{value}</p>
    </div>
  );
}

function Key({ swatch, label, dashed }: { swatch: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn('h-2 w-4 rounded-full', swatch, dashed && 'h-0.5 rounded-none')} aria-hidden />
      {label}
    </span>
  );
}

function NotLinked({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-white/[0.14] px-5 py-6 text-[13px] leading-relaxed text-white">
      {text}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/[0.12] px-4 text-center text-[12.5px] text-white">
      {text}
    </div>
  );
}
