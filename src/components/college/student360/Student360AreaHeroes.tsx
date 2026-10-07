import { useMemo, type ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { AC_STATE_BAR, VIS_CARD, barCount } from '@/components/college/student360/Student360Visuals';
import { STATE_LABEL, STATE_SWATCH, type AcState } from '@/hooks/portfolio/usePortfolioAcState';
import type { AttendanceRow, GradeRow, PastoralNote } from '@/hooks/useStudent360';
import type { CollegeObservation } from '@/hooks/useCollegeObservations';

/* ==========================================================================
   Area page headers for Student 360 (ELE-2015). Each area page opens with the
   same shape as the overview: the figures that answer "how is this going",
   then one chart, then the detail underneath. Andrew, 7 Oct: "continue and
   make it excellent" after the area pages were called bare.
   ========================================================================== */

const VOLT = 'hsl(47 100% 50%)';
const ORANGE = 'hsl(27 96% 61%)';
const GREEN = 'hsl(142 69% 58%)';
const WHITE = 'rgba(255,255,255,0.95)';
const AXIS = 'rgba(255,255,255,0.08)';
const TRACK = 'rgba(255,255,255,0.1)';

const TOOLTIP = {
  contentStyle: {
    backgroundColor: 'hsl(0 0% 8%)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '0.75rem',
    fontSize: 12,
  },
  labelStyle: { color: WHITE },
  itemStyle: { color: WHITE },
  cursor: { fill: 'rgba(255,255,255,0.05)' },
};

const DAY = 86_400_000;

function daysAgo(iso: string | null | undefined) {
  if (!iso) return null;
  return Math.max(0, Math.floor((Date.now() - Date.parse(iso)) / DAY));
}

function agoLabel(d: number | null) {
  if (d === null) return '—';
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  return `${d} days ago`;
}

function monday(d: Date) {
  const m = new Date(d);
  m.setHours(12, 0, 0, 0);
  m.setDate(m.getDate() - ((m.getDay() + 6) % 7));
  return m;
}

function shortDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/* ── The shell every area header shares ─────────────────────────────── */

export interface HeroFigure {
  label: string;
  value: string;
  sub?: string;
  warn?: boolean;
  good?: boolean;
}

export function AreaHero({
  figures,
  chartTitle,
  chart,
  side,
}: {
  figures: HeroFigure[];
  chartTitle?: string;
  chart?: ReactNode;
  side?: ReactNode;
}) {
  return (
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className={VIS_CARD}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        {figures.map((f) => (
          <div key={f.label} className="min-w-0">
            <dt className="text-[12.5px] text-white">{f.label}</dt>
            <dd
              className={cn(
                'mt-1 truncate text-[28px] font-bold leading-none tabular-nums',
                f.warn ? 'text-orange-400' : f.good ? 'text-emerald-400' : 'text-white'
              )}
            >
              {f.value}
            </dd>
            {f.sub && <dd className="mt-1.5 text-[12px] leading-snug text-white">{f.sub}</dd>}
          </div>
        ))}
      </dl>
      {(chart || side) && (
        <div
          className={cn(
            'mt-6 grid grid-cols-1 gap-6 border-t border-white/[0.06] pt-5',
            chart && side && 'lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'
          )}
        >
          {chart && (
            <div className="min-w-0">
              {chartTitle && <p className="mb-3 text-[13px] font-semibold text-white">{chartTitle}</p>}
              {chart}
            </div>
          )}
          {side && <div className="min-w-0">{side}</div>}
        </div>
      )}
    </motion.section>
  );
}

function ChartEmpty({ text }: { text: string }) {
  return (
    <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-white/[0.12] px-4 text-center text-[12.5px] text-white">
      {text}
    </div>
  );
}

function Bars({ rows }: { rows: Array<{ label: string; n: number; cls: string }> }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[minmax(0,7.5rem)_1fr_2rem] items-center gap-3">
          <span className="truncate text-[12.5px] text-white">{r.label}</span>
          <span className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.span
              className={cn('block h-full rounded-full', r.cls)}
              initial={{ width: 0 }}
              animate={{ width: `${(r.n / max) * 100}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </span>
          <span className="text-right text-[13px] font-semibold tabular-nums text-white">{r.n}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Attendance ─────────────────────────────────────────────────────── */

const norm = (s: string | null | undefined) => (s ?? '').toLowerCase();

export function AttendanceHero({ rows }: { rows: AttendanceRow[] }) {
  const last = rows.slice(0, 28);
  const present = last.filter((r) => norm(r.status) === 'present').length;
  const late = last.filter((r) => norm(r.status) === 'late').length;
  const absent = last.filter((r) => norm(r.status) === 'absent').length;
  const rate = last.length ? Math.round(((present + late) / last.length) * 100) : null;
  let streak = 0;
  for (const r of rows) {
    if (norm(r.status) === 'absent') streak += 1;
    else break;
  }

  // Attendance rate by week, last twelve weeks, oldest first.
  const weeks = useMemo(() => {
    const start = monday(new Date());
    start.setDate(start.getDate() - 7 * 11);
    const out = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i * 7);
      return { from: d.getTime(), label: shortDate(d), sessions: 0, attended: 0 };
    });
    for (const r of rows) {
      const t = Date.parse(`${r.date.slice(0, 10)}T12:00`);
      const i = Math.floor((t - out[0].from) / (7 * DAY));
      if (i < 0 || i > 11) continue;
      out[i].sessions += 1;
      if (['present', 'late'].includes(norm(r.status))) out[i].attended += 1;
    }
    return out.map((w) => ({ ...w, pct: w.sessions ? Math.round((w.attended / w.sessions) * 100) : null }));
  }, [rows]);
  const anyWeeks = weeks.some((w) => w.sessions > 0);

  return (
    <AreaHero
      figures={[
        { label: 'Attendance', value: rate === null ? '—' : `${rate}%`, sub: last.length ? `Last ${last.length} sessions` : 'No register yet', warn: rate !== null && rate < 85, good: rate !== null && rate >= 95 },
        { label: 'Present', value: String(present) },
        { label: 'Late', value: String(late), warn: late >= 3 },
        { label: 'Absent', value: String(absent), sub: streak >= 2 ? `${streak} in a row` : undefined, warn: absent > 0 && streak >= 2 },
      ]}
      chartTitle="Attendance by week, last 12 weeks"
      chart={
        anyWeeks ? (
          <div className="-mx-2 h-44">
            <ResponsiveContainer>
              <BarChart data={weeks} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke={AXIS} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: WHITE }} tickLine={false} axisLine={false} interval={1} />
                <YAxis domain={[0, 100]} ticks={[0, 50, 85, 100]} tick={{ fontSize: 10.5, fill: WHITE }} tickLine={false} axisLine={false} />
                <Tooltip
                  {...TOOLTIP}
                  formatter={(v: number, _n, p) => [v == null ? 'No sessions' : `${v}% (${p.payload.attended} of ${p.payload.sessions})`, 'Attended']}
                />
                <Bar dataKey="pct" radius={[5, 5, 0, 0]}>
                  {weeks.map((w) => (
                    <Cell key={w.from} fill={w.pct === null ? TRACK : w.pct >= 95 ? GREEN : w.pct >= 85 ? VOLT : ORANGE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <ChartEmpty text="No sessions in the last 12 weeks." />
        )
      }
      side={
        <div>
          <p className="mb-3 text-[13px] font-semibold text-white">Colour key</p>
          <ul className="space-y-2.5 text-[12.5px] text-white">
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />95% or more</li>
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-elec-yellow" />85% to 94%</li>
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-400" />Under 85%, worth a conversation</li>
          </ul>
        </div>
      }
    />
  );
}

/* ── Grades ─────────────────────────────────────────────────────────── */

const BAND_RANK: Record<string, number> = { fail: 1, refer: 1, referred: 1, pass: 2, merit: 3, distinction: 4 };

export function GradesHero({ rows }: { rows: GradeRow[] }) {
  const scored = rows.filter((r) => r.score !== null && r.assessed_at);
  const avg = scored.length ? Math.round(scored.reduce((s, r) => s + (r.score ?? 0), 0) / scored.length) : null;
  const best = scored.length ? Math.max(...scored.map((r) => r.score ?? 0)) : null;
  const ranks = rows.map((r) => BAND_RANK[norm(r.grade)]).filter((n): n is number => !!n);
  const fails = ranks.filter((n) => n === 1).length;
  const counts = ['Distinction', 'Merit', 'Pass', 'Fail'].map((b) => ({
    label: b,
    n: rows.filter((r) => {
      const k = BAND_RANK[norm(r.grade)];
      return b === 'Fail' ? k === 1 : k === BAND_RANK[b.toLowerCase()];
    }).length,
    cls: b === 'Distinction' ? 'bg-emerald-400' : b === 'Merit' ? 'bg-elec-yellow' : b === 'Pass' ? 'bg-white/60' : 'bg-red-400',
  }));
  const data = scored
    .slice()
    .sort((a, b) => (a.assessed_at ?? '').localeCompare(b.assessed_at ?? ''))
    .map((r) => ({ label: shortDate(new Date(r.assessed_at!)), score: r.score, name: r.unit_name ?? r.assessment_type ?? 'Result' }));

  return (
    <AreaHero
      figures={[
        { label: 'Results', value: String(rows.length) },
        { label: 'Average score', value: avg === null ? '—' : `${avg}%`, warn: avg !== null && avg < 50 },
        { label: 'Best score', value: best === null ? '—' : `${best}%` },
        { label: 'Fails or referrals', value: String(fails), warn: fails > 0 },
      ]}
      chartTitle="Scores over time"
      chart={
        data.length >= 2 ? (
          <div className="-mx-2 h-44">
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid stroke={AXIS} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: WHITE }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10.5, fill: WHITE }} tickLine={false} axisLine={false} />
                <Tooltip {...TOOLTIP} formatter={(v: number, _n, p) => [`${v}%`, p.payload.name]} />
                <Line type="monotone" dataKey="score" stroke={VOLT} strokeWidth={2.5} dot={{ r: 4, fill: VOLT, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <ChartEmpty text={data.length === 1 ? 'One scored result so far. A trend appears from the second.' : 'No scored results yet.'} />
        )
      }
      side={
        <div>
          <p className="mb-3 text-[13px] font-semibold text-white">Grades</p>
          <Bars rows={counts} />
        </div>
      }
    />
  );
}

/* ── Observations ───────────────────────────────────────────────────── */

export function ObservationsHero({ rows }: { rows: CollegeObservation[] }) {
  const last = rows[0]?.observed_at ?? null;
  const since = daysAgo(last);
  const passed = rows.filter((r) => r.outcome === 'passed').length;
  const followUps = rows.filter((r) => r.follow_up_required).length;
  const acs = new Set(rows.flatMap((r) => r.acs_evidenced ?? [])).size;

  // Observations per month, last 12 months, stacked by outcome.
  const months = useMemo(() => {
    const now = new Date();
    const out = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString('en-GB', { month: 'short' }), passed: 0, partial: 0, other: 0 };
    });
    for (const r of rows) {
      const d = new Date(r.observed_at);
      const m = out.find((o) => o.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (!m) continue;
      if (r.outcome === 'passed') m.passed += 1;
      else if (r.outcome === 'partial') m.partial += 1;
      else m.other += 1;
    }
    return out;
  }, [rows]);

  return (
    <AreaHero
      figures={[
        { label: 'Observations', value: String(rows.length) },
        { label: 'Last observed', value: since === null ? '—' : since > 60 ? `${since}d` : agoLabel(since), sub: since !== null && since > 60 ? 'Over two months ago' : undefined, warn: since === null || since > 60 },
        { label: 'Passed', value: String(passed), good: passed > 0 },
        { label: 'Criteria evidenced', value: String(acs), sub: followUps ? `${followUps} need a follow-up` : undefined, warn: followUps > 0 },
      ]}
      chartTitle="Observations by month, last 12 months"
      chart={
        rows.length ? (
          <div className="-mx-2 h-44">
            <ResponsiveContainer>
              <BarChart data={months} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke={AXIS} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: WHITE }} tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10.5, fill: WHITE }} tickLine={false} axisLine={false} />
                <Tooltip {...TOOLTIP} />
                <Bar dataKey="passed" name="Passed" stackId="o" fill={GREEN} />
                <Bar dataKey="partial" name="Partial" stackId="o" fill={VOLT} />
                <Bar dataKey="other" name="Referred or not yet" stackId="o" fill={ORANGE} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <ChartEmpty text="No observations recorded yet. Record one from Start something on the overview." />
        )
      }
      side={
        <div>
          <p className="mb-3 text-[13px] font-semibold text-white">Outcomes</p>
          <Bars
            rows={[
              { label: 'Passed', n: passed, cls: 'bg-emerald-400' },
              { label: 'Partial', n: rows.filter((r) => r.outcome === 'partial').length, cls: 'bg-elec-yellow' },
              { label: 'Referred', n: rows.filter((r) => r.outcome === 'referred').length, cls: 'bg-orange-400' },
              { label: 'Not yet', n: rows.filter((r) => r.outcome === 'not_yet').length, cls: 'bg-white/50' },
            ]}
          />
        </div>
      }
    />
  );
}

/* ── Notes and one-to-ones ──────────────────────────────────────────── */

const KIND_LABEL: Record<string, string> = {
  note: 'Notes',
  one_to_one: '1-2-1s',
  flag: 'Flags',
  concern: 'Concerns',
  safeguarding: 'Safeguarding',
  praise: 'Praise',
  intervention: 'Interventions',
};

export function NotesHero({ notes }: { notes: PastoralNote[] }) {
  const open = notes.filter((n) => n.action_required && !n.action_completed_at);
  const overdue = open.filter((n) => n.action_by_date && n.action_by_date < new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })).length;
  const oneToOnes = notes.filter((n) => n.kind === 'one_to_one');
  const lastContact = daysAgo(oneToOnes[0]?.created_at ?? null);
  const kinds = Object.keys(KIND_LABEL)
    .map((k) => ({ label: KIND_LABEL[k], n: notes.filter((n) => n.kind === k).length, cls: k === 'praise' ? 'bg-emerald-400' : k === 'flag' || k === 'concern' || k === 'safeguarding' ? 'bg-orange-400' : 'bg-elec-yellow' }))
    .filter((k) => k.n > 0);

  return (
    <AreaHero
      figures={[
        { label: 'Notes', value: String(notes.length) },
        { label: '1-2-1s', value: String(oneToOnes.length) },
        { label: 'Last 1-2-1', value: lastContact === null ? 'None' : lastContact > 42 ? `${lastContact}d` : agoLabel(lastContact), sub: lastContact !== null && lastContact > 42 ? 'Over six weeks ago' : undefined, warn: lastContact === null || lastContact > 42 },
        { label: 'Open actions', value: String(open.length), sub: overdue ? `${overdue} past their date` : undefined, warn: overdue > 0 },
      ]}
      chartTitle="What has been recorded"
      chart={kinds.length ? <Bars rows={kinds} /> : <ChartEmpty text="Nothing recorded yet." />}
    />
  );
}

/* ── Criteria and assessment ────────────────────────────────────────── */

/**
 * ELE-1917: the criteria hero for a learner with an account, from
 * get_portfolio_ac_state — the same counts the learner reads on their
 * portfolio. "Passed" includes IQA-confirmed criteria.
 */
export function AcStateHero({ totals }: { totals: Record<AcState, number> & { total: number; passedAll: number } }) {
  const t = totals;
  const needMore = t.referred + t.not_yet + t.iqa_rejected;
  const pct = t.total ? Math.round((t.passedAll / t.total) * 100) : null;
  return (
    <AreaHero
      figures={[
        {
          label: 'Passed',
          value: pct === null ? '—' : `${pct}%`,
          sub: `${t.passedAll} of ${t.total} criteria`,
          good: t.passedAll > 0,
        },
        { label: 'Waiting for you', value: String(t.submitted), sub: 'Submitted for a decision' },
        { label: 'Needs more', value: String(needMore), sub: 'Sent back to the learner', warn: needMore > 0 },
        { label: 'Not started', value: String(t.not_started), sub: `${t.claimed} claimed, not yet submitted` },
      ]}
      chartTitle="Every criterion, by where it is"
      chart={
        t.total ? (
          <div>
            <div className="flex h-4 overflow-hidden rounded-full bg-white/[0.08]">
              {AC_STATE_BAR.map((s) => {
                const n = barCount(t, s);
                return n ? (
                  <motion.span
                    key={s}
                    className={cn('h-full', STATE_SWATCH[s])}
                    initial={{ width: 0 }}
                    animate={{ width: `${(n / t.total) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                ) : null;
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-white">
              {AC_STATE_BAR.map((s) => (
                <span key={s} className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full', STATE_SWATCH[s])} />
                  {STATE_LABEL[s]} <span className="font-semibold tabular-nums">{barCount(t, s)}</span>
                </span>
              ))}
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                Not started <span className="font-semibold tabular-nums">{t.not_started}</span>
              </span>
            </div>
          </div>
        ) : (
          <ChartEmpty text="No criteria list yet. Set the learner's course to see their criteria." />
        )
      }
    />
  );
}

export function AssessHero({
  total,
  evidenced,
  assessed,
  confirmed,
  inProgress,
}: {
  total: number;
  evidenced: number;
  assessed: number;
  confirmed: number;
  inProgress: number;
}) {
  const done = evidenced + assessed + confirmed;
  const pct = total ? Math.round((done / total) * 100) : null;
  const segs = [
    { label: 'IQA confirmed', n: confirmed, cls: 'bg-emerald-400' },
    { label: 'Assessed', n: assessed, cls: 'bg-elec-yellow' },
    { label: 'Evidenced', n: evidenced, cls: 'bg-white/70' },
    { label: 'In progress', n: inProgress, cls: 'bg-white/40' },
  ];
  return (
    <AreaHero
      figures={[
        { label: 'Covered', value: pct === null ? '—' : `${pct}%`, sub: total ? `${done} of ${total} criteria` : 'No criteria list yet' },
        { label: 'Assessed', value: String(assessed) },
        { label: 'IQA confirmed', value: String(confirmed), good: confirmed > 0 },
        { label: 'Not started', value: String(Math.max(0, total - done - inProgress)) },
      ]}
      chartTitle="Every criterion, by where it is"
      chart={
        total ? (
          <div>
            <div className="flex h-4 overflow-hidden rounded-full bg-white/[0.08]">
              {segs.map((s) =>
                s.n ? (
                  <motion.span
                    key={s.label}
                    className={cn('h-full', s.cls)}
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.n / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                ) : null
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-white">
              {segs.map((s) => (
                <span key={s.label} className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full', s.cls)} />
                  {s.label} <span className="font-semibold tabular-nums">{s.n}</span>
                </span>
              ))}
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                Not started <span className="font-semibold tabular-nums">{Math.max(0, total - done - inProgress)}</span>
              </span>
            </div>
          </div>
        ) : (
          <ChartEmpty text="Seed the criteria list from the course below to start tracking coverage." />
        )
      }
    />
  );
}

/* ── Portfolio ──────────────────────────────────────────────────────── */

export function PortfolioHero({
  submissions,
  waiting,
  signedOff,
  items,
  verified,
  iqaSampled,
  openReqs,
  overdueReqs,
  side,
}: {
  submissions: number;
  waiting: number;
  signedOff: number;
  items: number;
  verified: number;
  iqaSampled: number;
  openReqs: number;
  overdueReqs: number;
  side?: ReactNode;
}) {
  return (
    <AreaHero
      figures={[
        { label: 'Submissions', value: String(submissions), sub: `${signedOff} signed off` },
        { label: 'Waiting on you', value: String(waiting), warn: waiting > 0 },
        { label: 'Evidence items', value: String(items), sub: `${verified} supervisor verified` },
        { label: 'Requirements open', value: String(openReqs), sub: overdueReqs ? `${overdueReqs} overdue` : `${iqaSampled} IQA sampled`, warn: overdueReqs > 0 },
      ]}
      chartTitle="Evidence items checked by the supervisor"
      chart={
        items ? (
          <div>
            <div className="flex h-4 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.span
                className="h-full bg-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${(verified / items) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-3 text-[12.5px] text-white">
              {verified} of {items} items verified by the workplace supervisor
            </p>
          </div>
        ) : (
          <ChartEmpty text="No evidence items uploaded yet." />
        )
      }
      side={side}
    />
  );
}

