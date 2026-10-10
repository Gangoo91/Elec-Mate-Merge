/**
 * TutorWorkloadSection — "who is overloaded?" (College Hub kit, 7 Oct 2026).
 *
 * Header with "?" → four figures → a chart of marking waiting and lessons
 * this week per tutor → one row per tutor with cohorts, lessons, marking and
 * when they were last observed. Red is an overloaded tutor or no observation
 * on record; orange is heavy; balanced is quiet.
 *
 * 8 Oct 2026: useTutorWorkload only reads observations from the last 90
 * days, so a tutor observed in April read "Never" here while Lesson
 * observations listed them as observed. "Last observed" now comes from the
 * observations rollup (12 months), the same source as that page.
 *
 * Bands come from `useTutorWorkload` unchanged:
 *   red   — more than 6 cohorts or more than 10 pieces of marking waiting
 *   amber — more than 4 cohorts or more than 3 waiting
 */
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
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
import { useTutorWorkload, type WorkloadBand } from '@/hooks/useTutorWorkload';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { VisHead } from '@/components/college/student360/Student360Visuals';
import { useTutorObservations } from '@/hooks/useTutorObservations';
import {
  QBTN,
  QCARD as VIS_CARD,
  QLIST as COLLEGE_LIST,
  QualityHeader,
} from '@/components/college/quality/QualityHubKit';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeEmpty, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  ListLoading,
  NameBadge,
  PeopleListHead,
  PeopleRow,
  plural,
} from '@/components/college/people/peopleKit';

const BAND_LABEL: Record<WorkloadBand, string> = {
  red: 'Overloaded',
  amber: 'Heavy',
  green: 'Balanced',
};
const BAND_ORDER: Record<WorkloadBand, number> = { red: 0, amber: 1, green: 2 };

const VOLT = 'hsl(47 100% 50%)';
const WHITE = 'rgba(255,255,255,0.95)';
const SOFT = 'rgba(255,255,255,0.35)';
const AXIS = 'rgba(255,255,255,0.08)';

const HELP: PageHelpContent = {
  id: 'college-tutor-workload',
  title: 'Tutor workload',
  what: 'How much each tutor is carrying: cohorts, lessons this week, marking waiting and how long since they were observed. Use it to spread the load before someone tips over.',
  steps: [
    {
      title: 'Look at the orange and red',
      body: 'Overloaded tutors are at the top. Move a cohort or some marking to someone balanced.',
    },
    {
      title: 'Check observations',
      body: 'A tutor with no observation in a year is flagged. Book one; inspectors ask for it.',
    },
    {
      title: 'Go to the person',
      body: 'Tap a tutor to open the Tutors page, where their profile and cohorts are.',
    },
  ],
  legend: [
    {
      swatch: 'bg-red-400',
      label: 'Overloaded',
      body: 'More than 6 cohorts or more than 10 pieces of marking waiting.',
    },
    {
      swatch: 'bg-orange-400',
      label: 'Heavy',
      body: 'More than 4 cohorts or more than 3 waiting.',
    },
    { swatch: 'bg-white/30', label: 'Balanced', body: 'Room to take on more.' },
  ],
};

export function TutorWorkloadSection() {
  const navigate = useNavigate();
  const { rows: rawRows, loading, error } = useTutorWorkload();
  const { rollup: obsRollup } = useTutorObservations();
  // Days since last observed, over 12 months (see the header note).
  const rows = useMemo(() => {
    const last = new Map(obsRollup.map((r) => [r.tutor_staff_id, r.last_observed_at]));
    return rawRows.map((r) => {
      const at = last.get(r.tutor_staff_id);
      const days = at
        ? Math.max(
            0,
            Math.round(
              (new Date().setHours(0, 0, 0, 0) - new Date(at).setHours(0, 0, 0, 0)) / 86_400_000
            )
          )
        : r.last_observed_days_ago;
      return { ...r, last_observed_days_ago: days };
    });
  }, [rawRows, obsRollup]);

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.load_band] += 1;
      return acc;
    },
    { red: 0, amber: 0, green: 0 } as Record<WorkloadBand, number>
  );
  const overdueObsCount = rows.filter(
    (r) => r.last_observed_days_ago === null || r.last_observed_days_ago > 365
  ).length;
  const toMark = rows.reduce((s, r) => s + r.pending_grading, 0);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const band = BAND_ORDER[a.load_band] - BAND_ORDER[b.load_band];
        return band !== 0 ? band : b.pending_grading - a.pending_grading;
      }),
    [rows]
  );
  // First names repeat (two Andrews, two Jameses): add the surname initial.
  const firstNames = sorted.map((r) => r.name.split(' ')[0]);
  const chart = sorted.slice(0, 12).map((r, i) => ({
    name:
      firstNames.filter((f) => f === firstNames[i]).length > 1
        ? `${firstNames[i]} ${(r.name.split(' ')[1] ?? '').charAt(0)}`.trim()
        : firstNames[i],
    full: r.name,
    'To mark': r.pending_grading,
    'Lessons this week': r.lessons_this_week,
    Cohorts: r.active_cohorts,
  }));

  const summary = loading
    ? 'Working out each tutor’s load…'
    : error
      ? 'Could not load workload.'
      : rows.length === 0
        ? 'No active tutors yet.'
        : `${counts.red > 0 ? `${plural(counts.red, 'tutor')} overloaded` : 'Nobody overloaded'}${
            counts.amber > 0 ? `, ${counts.amber} running heavy` : ''
          }. ${plural(toMark, 'piece', 'pieces')} of marking waiting across ${plural(rows.length, 'tutor')}.`;
  const summarySub =
    !loading && !error && rows.length > 0
      ? overdueObsCount > 0
        ? `${plural(overdueObsCount, 'tutor')} not observed in the last 12 months. Book an observation; inspectors ask for it.`
        : 'Every tutor has been observed in the last 12 months.'
      : undefined;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-10"
    >
      <QualityHeader
        eyebrow="People"
        title="Tutor workload"
        summary={summary}
        sub={summarySub}
        help={HELP}
        actions={
          <button
            type="button"
            className={QBTN}
            onClick={() => navigate('/college?section=tutors')}
          >
            Tutors
          </button>
        }
      />

      {/* Desktop only: seven names collide on a 390px axis, and the list below carries the same figures. */}
      {!loading && !error && rows.length > 0 && (
        <motion.div variants={itemVariants} className={cn(VIS_CARD, 'hidden sm:block')}>
          <VisHead
            title="Load by tutor"
            sub="Marking waiting, lessons this week and cohorts, heaviest first"
          />
          <div className="mt-4 h-[240px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barGap={2}>
                <CartesianGrid stroke={AXIS} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: WHITE }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: WHITE }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
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
                  labelFormatter={(_, p) =>
                    (p?.[0]?.payload as { full?: string } | undefined)?.full ?? ''
                  }
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: WHITE }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="To mark" fill={VOLT} radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar
                  dataKey="Lessons this week"
                  fill={WHITE}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={22}
                />
                <Bar dataKey="Cohorts" fill={SOFT} radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle
          title="By load"
          sub={
            !loading && rows.length > 0
              ? `${plural(rows.length, 'tutor')}, heaviest first`
              : undefined
          }
        />
        {loading ? (
          <div className={COLLEGE_LIST}>
            <ListLoading label="Working out each tutor’s load…" />
          </div>
        ) : error ? (
          <CollegeEmpty title="Couldn’t load workload" body={error} />
        ) : rows.length === 0 ? (
          <CollegeEmpty
            title="No active tutors"
            body="Add tutors under People and their load appears here."
          />
        ) : (
          <div className={COLLEGE_LIST}>
            <PeopleListHead
              title="Tutor"
              figures={['Cohorts', 'This week', 'To mark', 'Observed']}
              menu={false}
            />
            <ul className="divide-y divide-white/[0.06]">
              {sorted.map((r) => {
                const obsProblem =
                  r.last_observed_days_ago === null || r.last_observed_days_ago > 365;
                return (
                  <PeopleRow
                    key={r.tutor_staff_id}
                    headed
                    title={r.name}
                    badge={
                      r.load_band !== 'green' ? (
                        <NameBadge tone="warn">{BAND_LABEL[r.load_band]}</NameBadge>
                      ) : undefined
                    }
                    sub={[
                      r.role === 'head_of_department'
                        ? 'Head of department'
                        : r.role.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()),
                      r.comments_last_7d > 0
                        ? `${plural(r.comments_last_7d, 'portfolio comment')} in 7 days`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                    tone={
                      r.load_band === 'red'
                        ? 'critical'
                        : r.load_band === 'amber'
                          ? 'warn'
                          : 'quiet'
                    }
                    onOpen={() => navigate('/college?section=tutors')}
                    openLabel={`Open tutors for ${r.name}`}
                    figures={[
                      {
                        label: 'cohorts',
                        value: String(r.active_cohorts),
                        warn: r.active_cohorts > 4,
                      },
                      { label: 'lessons', value: String(r.lessons_this_week) },
                      {
                        label: 'to mark',
                        value: String(r.pending_grading),
                        warn: r.pending_grading > 3,
                      },
                      {
                        label: 'observed',
                        // Short enough for the 92px figure column on desktop.
                        value:
                          r.last_observed_days_ago === null || r.last_observed_days_ago > 365
                            ? 'Over a year'
                            : r.last_observed_days_ago === 0
                              ? 'Today'
                              : r.last_observed_days_ago <= 30
                                ? `${r.last_observed_days_ago}d ago`
                                : `${Math.floor(r.last_observed_days_ago / 30)} mo ago`,
                        critical: obsProblem,
                      },
                    ]}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
