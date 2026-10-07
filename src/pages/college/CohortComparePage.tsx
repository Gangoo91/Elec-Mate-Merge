import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import {
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { useAvailableCohorts, useCohortComparison, type CohortStats } from '@/hooks/useCohortComparison';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CohortComparePage — /college/compare (College Hub kit, 7 Oct 2026).

   Pick up to three cohorts (the first three are picked for you) → a chart
   of the percentages side by side → one row per measure with each cohort's
   figure, the best in green and the weakest in orange. On a phone the
   measures stack with the cohorts as columns, so nothing scrolls sideways.
   ========================================================================== */

const MAX_COHORTS = 3;
const SERIES = ['hsl(47 100% 50%)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,0.4)'];
const WHITE = 'rgba(255,255,255,0.95)';
const AXIS = 'rgba(255,255,255,0.08)';

const HELP: PageHelpContent = {
  id: 'college-cohort-compare',
  title: 'Compare cohorts',
  what: 'Up to three cohorts side by side: progress, attendance, off-the-job hours, EPA readiness and who is at risk. The best figure in each row is green and the weakest is orange, so the outlier stands out.',
  steps: [
    { title: 'Pick the cohorts', body: 'Tap up to three. The first three are picked for you; tap one to take it out and another to add it.' },
    { title: 'Read across a row', body: 'Each row is one measure. Green is the best of the selection, orange the weakest.' },
    { title: 'Go to the cohort', body: 'Open a cohort from the Cohorts page to see its learners and act on what you found.' },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'Best of the selection' },
    { swatch: 'bg-orange-400', label: 'Weakest of the selection' },
  ],
  notes: [
    { title: 'At risk', body: 'Lower is better: the cohort with the smallest share of learners at risk is green.' },
  ],
};

type Rank = 'best' | 'worst' | undefined;

function rank(rows: CohortStats[], pick: (r: CohortStats) => number | null, lowerIsBetter = false): Record<string, Rank> {
  const valid = rows.map((r) => ({ id: r.cohort_id, v: pick(r) })).filter((x): x is { id: string; v: number } => x.v !== null);
  if (valid.length < 2) return {};
  const vs = valid.map((x) => x.v);
  const best = lowerIsBetter ? Math.min(...vs) : Math.max(...vs);
  const worst = lowerIsBetter ? Math.max(...vs) : Math.min(...vs);
  if (best === worst) return {};
  // Ties share the mark: two cohorts on the same best figure are both green.
  const out: Record<string, Rank> = {};
  for (const x of valid) out[x.id] = x.v === best ? 'best' : x.v === worst ? 'worst' : undefined;
  return out;
}

const pct = (n: number, d: number) => (d > 0 ? Math.round((100 * n) / d) : null);

export default function CohortComparePage() {
  const navigate = useNavigate();
  const { cohorts: available, loading: cohortsLoading } = useAvailableCohorts();
  const [selected, setSelected] = useState<string[] | null>(null);
  const picked = selected ?? [];
  const { rows, loading } = useCohortComparison(picked);

  // Start with the first three picked, so the page opens on an answer.
  useEffect(() => {
    if (selected === null && available.length > 0) setSelected(available.slice(0, MAX_COHORTS).map((c) => c.id));
  }, [available, selected]);

  const toggle = (id: string) =>
    setSelected((cur) => {
      const c = cur ?? [];
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= MAX_COHORTS) return c;
      return [...c, id];
    });

  const ordered = useMemo(
    () => picked.map((id) => rows.find((r) => r.cohort_id === id)).filter((r): r is CohortStats => !!r),
    [picked, rows]
  );

  const measures: Array<{
    label: string;
    sub?: string;
    value: (r: CohortStats) => string;
    ranks: Record<string, Rank>;
  }> = useMemo(
    () => [
      { label: 'Learners', value: (r) => String(r.apprentice_count), ranks: {} },
      {
        label: 'Average progress',
        value: (r) => (r.avg_progress_pct != null ? `${r.avg_progress_pct}%` : '—'),
        ranks: rank(ordered, (r) => r.avg_progress_pct),
      },
      {
        label: 'Average attendance',
        value: (r) => (r.avg_attendance_pct != null ? `${r.avg_attendance_pct}%` : '—'),
        ranks: rank(ordered, (r) => r.avg_attendance_pct),
      },
      {
        label: 'Off-the-job hours',
        sub: 'Total, with verified',
        value: (r) => `${r.otj_total_hours}h${r.otj_verified_hours > 0 ? ` (${r.otj_verified_hours}h verified)` : ''}`,
        ranks: rank(ordered, (r) => (r.apprentice_count > 0 ? r.otj_total_hours / r.apprentice_count : null)),
      },
      {
        label: 'EPA ready',
        sub: 'Ready · almost · not yet · no verdict',
        value: (r) => `${r.epa_ready} · ${r.epa_almost} · ${r.epa_not_yet} · ${r.epa_no_verdict}`,
        ranks: rank(ordered, (r) => pct(r.epa_ready, r.apprentice_count)),
      },
      {
        label: 'At risk',
        value: (r) => {
          const p = pct(r.at_risk, r.apprentice_count);
          return `${r.at_risk}${p != null ? ` (${p}%)` : ''}`;
        },
        ranks: rank(ordered, (r) => pct(r.at_risk, r.apprentice_count), true),
      },
    ],
    [ordered]
  );

  // A missing figure stays null (no bar), never a 0% bar that reads as "none".
  // Series are keyed by cohort_id so two cohorts with the same name never merge;
  // the name is only the label.
  const chart = [
    { measure: 'Progress', key: (r: CohortStats) => r.avg_progress_pct ?? null },
    { measure: 'Attendance', key: (r: CohortStats) => r.avg_attendance_pct ?? null },
    { measure: 'EPA ready', key: (r: CohortStats) => pct(r.epa_ready, r.apprentice_count) },
    { measure: 'At risk', key: (r: CohortStats) => pct(r.at_risk, r.apprentice_count) },
  ].map((m) => {
    const row: Record<string, string | number | null> = { measure: m.measure };
    for (const r of ordered) row[r.cohort_id] = m.key(r);
    return row;
  });

  const cell = (rk: Rank) => (rk === 'best' ? 'text-emerald-400' : rk === 'worst' ? 'text-orange-400' : 'text-white');

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Compare cohorts"
        onBack={() => navigate(-1)}
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <CollegePageHeader
          eyebrow="Cohorts"
          title="Compare cohorts"
          description={`Up to ${MAX_COHORTS} cohorts side by side. The best figure in each row is green, the weakest orange.`}
        />

        <motion.section variants={itemVariants} initial="hidden" animate="visible" className="space-y-3">
          <CollegeSectionTitle title="Cohorts to compare" sub={`${picked.length} of ${MAX_COHORTS} picked`} />
          {cohortsLoading ? (
            <p className="text-[13px] text-white">Loading cohorts…</p>
          ) : available.length === 0 ? (
            <CollegeEmpty title="No cohorts in this college yet" body="Create cohorts under People, then compare them here." />
          ) : (
            <div className="flex flex-wrap gap-2">
              {available.map((c) => {
                const on = picked.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c.id)}
                    disabled={!on && picked.length >= MAX_COHORTS}
                    className={cn(chipCn(on), 'h-11 disabled:opacity-40')}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          )}
        </motion.section>

        {picked.length > 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {loading && ordered.length === 0 ? (
              <p className="text-[13px] text-white">Working out the figures…</p>
            ) : (
              <>
                <motion.div variants={itemVariants} className={VIS_CARD}>
                  <VisHead title="Side by side" sub="Percentages, so cohorts of different sizes compare fairly. Lower is better for at risk." />
                  <div className="mt-4 h-[240px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chart} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={3}>
                        <CartesianGrid stroke={AXIS} vertical={false} />
                        <XAxis dataKey="measure" tick={{ fontSize: 11, fill: WHITE }} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: WHITE }} tickLine={false} axisLine={false} width={48} unit="%" />
                        <Tooltip
                          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                          contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.75rem', fontSize: 12 }}
                          labelStyle={{ color: WHITE }}
                          itemStyle={{ color: WHITE }}
                          formatter={(v: number | null) => (v == null ? 'No figure yet' : `${v}%`)}
                        />
                        <Legend wrapperStyle={{ fontSize: 12, color: WHITE }} iconType="circle" iconSize={8} />
                        {ordered.map((r, i) => (
                          <Bar key={r.cohort_id} dataKey={r.cohort_id} name={r.cohort_name ?? 'Untitled'} fill={SERIES[i % SERIES.length]} radius={[4, 4, 0, 0]} maxBarSize={28} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.section variants={itemVariants} className="space-y-3">
                  <CollegeSectionTitle title="Measure by measure" />
                  <div className={COLLEGE_LIST}>
                    <div
                      className="hidden gap-4 border-b border-white/[0.06] px-6 py-3 md:grid"
                      style={{ gridTemplateColumns: `minmax(0,1.2fr) repeat(${ordered.length}, minmax(0,1fr))` }}
                    >
                      <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white">Measure</span>
                      {ordered.map((r) => (
                        <span key={r.cohort_id} className="truncate text-right text-[13px] font-semibold text-white">
                          {r.cohort_name ?? 'Untitled'}
                        </span>
                      ))}
                    </div>
                    {measures.map((m) => (
                      <div key={m.label} className="px-5 py-3.5 sm:px-6">
                        <div className="grid gap-y-2">
                          <div className="md:hidden">
                            <p className="text-[14px] font-semibold text-white">{m.label}</p>
                            {m.sub && <p className="text-[12px] text-white">{m.sub}</p>}
                          </div>
                          <div
                            className="hidden md:grid md:gap-4"
                            style={{ gridTemplateColumns: `minmax(0,1.2fr) repeat(${ordered.length}, minmax(0,1fr))` }}
                          >
                            <div>
                              <p className="text-[14px] font-semibold text-white">{m.label}</p>
                              {m.sub && <p className="text-[12px] text-white">{m.sub}</p>}
                            </div>
                            {ordered.map((r) => (
                              <p key={r.cohort_id} className={cn('text-right text-[15px] font-semibold tabular-nums', cell(m.ranks[r.cohort_id]))}>
                                {m.value(r)}
                              </p>
                            ))}
                          </div>
                          <div className="grid gap-2 md:hidden" style={{ gridTemplateColumns: `repeat(${ordered.length}, minmax(0,1fr))` }}>
                            {ordered.map((r) => (
                              <div key={r.cohort_id} className="min-w-0">
                                <p className={cn('text-[15px] font-semibold tabular-nums', cell(m.ranks[r.cohort_id]))}>{m.value(r)}</p>
                                <p className="truncate text-[11.5px] text-white">{r.cohort_name ?? 'Untitled'}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </>
            )}
          </motion.div>
        )}
      </HubBody>
    </HubPage>
  );
}
