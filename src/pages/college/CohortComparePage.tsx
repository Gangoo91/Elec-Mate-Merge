import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import {
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import {
  useAvailableCohorts,
  useCohortComparison,
  type CohortStats,
} from '@/hooks/useCohortComparison';
import {
  passedOf,
  useCollegePortfolioOverview,
} from '@/components/college/portfolio/useCollegePortfolioOverview';
import { cn } from '@/lib/utils';
import { ChoiceGrid } from '@/components/college/quality/QualityChoices';

/* ==========================================================================
   CohortComparePage — /college/compare (College Hub kit, 7 Oct 2026).

   Pick up to three cohorts (the first three are picked for you) → a chart
   of the percentages side by side → one row per measure with each cohort's
   figure, the best in green and the weakest in orange. On a phone the
   measures stack with the cohorts as columns, so nothing scrolls sideways.

   8 Oct 2026: progress is criteria passed (passed or IQA confirmed, from
   get_portfolio_ac_state via college_portfolio_overview), averaged over the
   learners who have criteria to count. college_cohort_summaries'
   avg_progress_pct averaged the typed-in progress_percent instead. Off-the-
   job hours read per learner, so a bigger cohort is not "best" for being
   bigger, and the EPA verdicts read as words.
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
    {
      title: 'Pick the cohorts',
      body: 'Tap up to three. The first three are picked for you; tap one to take it out and another to add it.',
    },
    {
      title: 'Read across a row',
      body: 'Each row is one measure. Green is the best of the selection, orange the weakest. Off-the-job hours are compared per learner.',
    },
    {
      title: 'Go to the cohort',
      body: 'Open a cohort from the Cohorts page to see its learners and act on what you found.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'Best of the selection' },
    { swatch: 'bg-orange-400', label: 'Weakest of the selection' },
  ],
  notes: [
    {
      title: 'Criteria passed',
      body: 'Each learner\u2019s share of their qualification\u2019s criteria that an assessor has passed or an IQA has confirmed, averaged across the cohort\u2019s learners who have joined. The same count as their portfolio.',
    },
    {
      title: 'At risk',
      body: 'Lower is better: the cohort with the smallest share of learners at risk is green.',
    },
  ],
};

type Rank = 'best' | 'worst' | undefined;

function rank(
  rows: CohortStats[],
  pick: (r: CohortStats) => number | null,
  lowerIsBetter = false
): Record<string, Rank> {
  const valid = rows
    .map((r) => ({ id: r.cohort_id, v: pick(r) }))
    .filter((x): x is { id: string; v: number } => x.v !== null);
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
  const { cohorts: available, loading: cohortsLoading } = useAvailableCohorts();
  const [selected, setSelected] = useState<string[] | null>(null);
  const picked = selected ?? [];
  const { rows, loading } = useCohortComparison(picked);
  const { data: overview } = useCollegePortfolioOverview();

  // Criteria passed per cohort: the mean of each joined learner's share passed.
  const criteriaByCohort = useMemo(() => {
    const m = new Map<string, { pct: number | null; counted: number }>();
    const gone = new Set(['withdrawn', 'completed', 'archived']);
    const acc = new Map<string, { sum: number; n: number }>();
    for (const l of overview?.learners ?? []) {
      if (!l.cohort_id || gone.has((l.status ?? '').toLowerCase())) continue;
      if (!l.criteria || l.criteria.total === 0) continue;
      const a = acc.get(l.cohort_id) ?? { sum: 0, n: 0 };
      a.sum += passedOf(l.criteria) / l.criteria.total;
      a.n += 1;
      acc.set(l.cohort_id, a);
    }
    for (const [id, a] of acc) m.set(id, { pct: Math.round((a.sum / a.n) * 100), counted: a.n });
    return m;
  }, [overview]);
  const critPct = (r: CohortStats) => criteriaByCohort.get(r.cohort_id)?.pct ?? null;
  const perLearnerOtj = (r: CohortStats) =>
    r.apprentice_count > 0 ? Math.round(r.otj_total_hours / r.apprentice_count) : null;

  // Start with the first three picked, so the page opens on an answer.
  useEffect(() => {
    if (selected === null && available.length > 0)
      setSelected(available.slice(0, MAX_COHORTS).map((c) => c.id));
  }, [available, selected]);

  const toggle = (id: string) =>
    setSelected((cur) => {
      const c = cur ?? [];
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= MAX_COHORTS) return c;
      return [...c, id];
    });

  const ordered = useMemo(
    () =>
      picked.map((id) => rows.find((r) => r.cohort_id === id)).filter((r): r is CohortStats => !!r),
    [picked, rows]
  );

  const measures: Array<{
    label: string;
    sub?: string;
    value: (r: CohortStats) => string;
    /** A second, quieter line under the figure. */
    detail?: (r: CohortStats) => string | null;
    ranks: Record<string, Rank>;
  }> = useMemo(
    () => [
      { label: 'Learners', value: (r) => String(r.apprentice_count), ranks: {} },
      {
        label: 'Criteria passed',
        sub: 'Average share per joined learner',
        value: (r) => {
          const c = criteriaByCohort.get(r.cohort_id);
          return c?.pct != null ? `${c.pct}%` : 'Nobody joined yet';
        },
        detail: (r) => {
          const c = criteriaByCohort.get(r.cohort_id);
          return c?.pct != null ? `${c.counted} of ${r.apprentice_count} learners joined` : null;
        },
        ranks: rank(ordered, critPct),
      },
      {
        label: 'Average attendance',
        value: (r) => (r.avg_attendance_pct != null ? `${r.avg_attendance_pct}%` : 'No marks yet'),
        ranks: rank(ordered, (r) => r.avg_attendance_pct),
      },
      {
        label: 'Off-the-job hours',
        sub: 'Per learner, then the cohort total',
        value: (r) => {
          const per = perLearnerOtj(r);
          return per === null ? 'No learners' : `${per}h each`;
        },
        detail: (r) =>
          r.apprentice_count > 0
            ? `${Math.round(r.otj_total_hours).toLocaleString('en-GB')}h in all, ${Math.round(r.otj_verified_hours).toLocaleString('en-GB')}h verified`
            : null,
        ranks: rank(ordered, perLearnerOtj),
      },
      {
        label: 'EPA verdicts',
        sub: 'Tutor verdict, else the prediction',
        value: (r) => `${r.epa_ready} ready`,
        detail: (r) =>
          [
            r.epa_almost ? `${r.epa_almost} almost` : null,
            r.epa_not_yet ? `${r.epa_not_yet} not yet` : null,
            r.epa_no_verdict ? `${r.epa_no_verdict} no verdict` : null,
          ]
            .filter(Boolean)
            .join(', ') || null,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ordered, criteriaByCohort]
  );

  // A missing figure stays null (no bar), never a 0% bar that reads as "none".
  // Series are keyed by cohort_id so two cohorts with the same name never merge;
  // the name is only the label.
  const chart = [
    { measure: 'Criteria passed', key: critPct },
    { measure: 'Attendance', key: (r: CohortStats) => r.avg_attendance_pct ?? null },
    { measure: 'EPA ready', key: (r: CohortStats) => pct(r.epa_ready, r.apprentice_count) },
    { measure: 'At risk', key: (r: CohortStats) => pct(r.at_risk, r.apprentice_count) },
  ].map((m) => {
    const row: Record<string, string | number | null> = { measure: m.measure };
    for (const r of ordered) row[r.cohort_id] = m.key(r);
    return row;
  });

  const cell = (rk: Rank) =>
    rk === 'best' ? 'text-emerald-400' : rk === 'worst' ? 'text-orange-400' : 'text-white';

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Compare cohorts" backTo="/college?section=cohorts" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <CollegePageHeader
          eyebrow="Cohorts"
          title="Compare cohorts"
          description={`Up to ${MAX_COHORTS} cohorts side by side. The best figure in each row is green, the weakest orange.`}
          help={HELP}
        />

        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <CollegeSectionTitle
            title="Cohorts to compare"
            sub={`${picked.length} of ${MAX_COHORTS} picked`}
          />
          {cohortsLoading ? (
            <p className="text-[13px] text-white">Loading cohorts…</p>
          ) : available.length === 0 ? (
            <CollegeEmpty
              title="No cohorts in this college yet"
              body="Create cohorts under People, then compare them here."
            />
          ) : (
            <ChoiceGrid
              multiple
              className="lg:grid-cols-4"
              label="Cohorts to compare"
              options={available.map((c) => ({
                key: c.id,
                label: c.name,
                disabled: !picked.includes(c.id) && picked.length >= MAX_COHORTS,
              }))}
              selected={picked}
              onToggle={toggle}
            />
          )}
        </motion.section>

        {picked.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {loading && ordered.length === 0 ? (
              <p className="text-[13px] text-white">Working out the figures…</p>
            ) : (
              <>
                <motion.div variants={itemVariants} className={VIS_CARD}>
                  <VisHead
                    title="Side by side"
                    sub="Percentages, so cohorts of different sizes compare fairly. Lower is better for at risk."
                  />
                  <div className="mt-4 h-[240px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chart}
                        margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                        barGap={3}
                      >
                        <CartesianGrid stroke={AXIS} vertical={false} />
                        <XAxis
                          dataKey="measure"
                          tick={{ fontSize: 12, fill: WHITE }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fontSize: 12, fill: WHITE }}
                          tickLine={false}
                          axisLine={false}
                          width={48}
                          unit="%"
                        />
                        <Tooltip
                          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                          contentStyle={{
                            backgroundColor: 'hsl(0 0% 8%)',
                            border: '1px solid rgba(255,255,255,0.14)',
                            borderRadius: '0.75rem',
                            fontSize: 12,
                          }}
                          labelStyle={{ color: WHITE }}
                          itemStyle={{ color: WHITE }}
                          formatter={(v: number | null) => (v == null ? 'No figure yet' : `${v}%`)}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: 12, color: WHITE }}
                          iconType="circle"
                          iconSize={8}
                        />
                        {ordered.map((r, i) => (
                          <Bar
                            key={r.cohort_id}
                            dataKey={r.cohort_id}
                            name={r.cohort_name ?? 'Untitled'}
                            fill={SERIES[i % SERIES.length]}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={28}
                            isAnimationActive={false}
                          />
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
                      style={{
                        gridTemplateColumns: `minmax(0,1.2fr) repeat(${ordered.length}, minmax(0,1fr))`,
                      }}
                    >
                      <span className="text-[13px] font-semibold text-white">Measure</span>
                      {ordered.map((r) => (
                        <span
                          key={r.cohort_id}
                          className="truncate text-right text-[13px] font-semibold text-white"
                        >
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
                            style={{
                              gridTemplateColumns: `minmax(0,1.2fr) repeat(${ordered.length}, minmax(0,1fr))`,
                            }}
                          >
                            <div>
                              <p className="text-[14px] font-semibold text-white">{m.label}</p>
                              {m.sub && <p className="text-[12px] text-white">{m.sub}</p>}
                            </div>
                            {ordered.map((r) => (
                              <div key={r.cohort_id} className="text-right">
                                <p
                                  className={cn(
                                    'text-[15px] font-semibold tabular-nums',
                                    cell(m.ranks[r.cohort_id])
                                  )}
                                >
                                  {m.value(r)}
                                </p>
                                {m.detail?.(r) && (
                                  <p className="mt-0.5 text-[12px] text-white">{m.detail(r)}</p>
                                )}
                              </div>
                            ))}
                          </div>
                          {/* Phone: one line per cohort, the full name beside its figure. */}
                          <ul className="divide-y divide-white/[0.06] md:hidden">
                            {ordered.map((r) => (
                              <li
                                key={r.cohort_id}
                                className="flex items-start justify-between gap-3 py-2"
                              >
                                <span className="min-w-0 text-[13px] text-white">
                                  {r.cohort_name ?? 'Untitled'}
                                </span>
                                <span className="shrink-0 text-right">
                                  <span
                                    className={cn(
                                      'block text-[15px] font-semibold tabular-nums',
                                      cell(m.ranks[r.cohort_id])
                                    )}
                                  >
                                    {m.value(r)}
                                  </span>
                                  {m.detail?.(r) && (
                                    <span className="block max-w-[11rem] text-[12px] text-white">
                                      {m.detail(r)}
                                    </span>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
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
