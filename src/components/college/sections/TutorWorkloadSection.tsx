/**
 * TutorWorkloadSection — "who is overloaded?" (College Hub kit, 7 Oct 2026).
 *
 * Header with "?" → four figures → a chart of marking waiting and lessons
 * this week per tutor → one row per tutor with cohorts, lessons, marking and
 * when they were last observed. Red is an overloaded tutor or no observation
 * on record; orange is heavy; balanced is quiet.
 *
 * Bands come from `useTutorWorkload` unchanged:
 *   red   — more than 6 cohorts or more than 10 pieces of marking waiting
 *   amber — more than 4 cohorts or more than 3 waiting
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTutorWorkload, type WorkloadBand } from '@/hooks/useTutorWorkload';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { ListLoading, NameBadge, PeopleListHead, PeopleRow, plural } from '@/components/college/people/peopleKit';

const BAND_LABEL: Record<WorkloadBand, string> = { red: 'Overloaded', amber: 'Heavy', green: 'Balanced' };
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
    { title: 'Look at the orange and red', body: 'Overloaded tutors are at the top. Move a cohort or some marking to someone balanced.' },
    { title: 'Check observations', body: 'A tutor with no observation in a year is flagged. Book one; inspectors ask for it.' },
    { title: 'Go to the person', body: 'Tap a tutor to open the Tutors page, where their profile and cohorts are.' },
  ],
  legend: [
    { swatch: 'bg-red-400', label: 'Overloaded', body: 'More than 6 cohorts or more than 10 pieces of marking waiting.' },
    { swatch: 'bg-orange-400', label: 'Heavy', body: 'More than 4 cohorts or more than 3 waiting.' },
    { swatch: 'bg-white/30', label: 'Balanced', body: 'Room to take on more.' },
  ],
};

export function TutorWorkloadSection() {
  const navigate = useNavigate();
  const { rows, loading, error } = useTutorWorkload();

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.load_band] += 1;
      return acc;
    },
    { red: 0, amber: 0, green: 0 } as Record<WorkloadBand, number>
  );
  const overdueObsCount = rows.filter((r) => r.last_observed_days_ago === null || r.last_observed_days_ago > 365).length;
  const toMark = rows.reduce((s, r) => s + r.pending_grading, 0);

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const band = BAND_ORDER[a.load_band] - BAND_ORDER[b.load_band];
        return band !== 0 ? band : b.pending_grading - a.pending_grading;
      }),
    [rows]
  );
  const chart = sorted.slice(0, 12).map((r) => ({
    name: r.name.split(' ')[0],
    full: r.name,
    'To mark': r.pending_grading,
    'Lessons this week': r.lessons_this_week,
    Cohorts: r.active_cohorts,
  }));

  const noFigures = loading || !!error || rows.length === 0;
  const noFiguresSub = loading ? 'Loading…' : error ? 'Could not load' : 'No tutors yet';

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      <CollegePageHeader
        eyebrow="People"
        title="Tutor workload"
        description={
          loading
            ? 'Working out each tutor’s load…'
            : counts.red > 0
              ? `${plural(counts.red, 'tutor')} overloaded. Move some work before it tips over.`
              : 'Cohorts, lessons, marking and observations for every tutor, side by side.'
        }
        help={HELP}
        actions={
          <button type="button" className={COLLEGE_BTN} onClick={() => navigate('/college?section=tutors')}>
            Tutors
          </button>
        }
      />

      <CollegeStats
        items={[
          // While loading, on an error or with no tutors there is nothing to
          // judge, so show a dash rather than "Nobody overloaded".
          { label: 'Overloaded', value: noFigures ? '—' : String(counts.red), sub: noFigures ? noFiguresSub : counts.red > 0 ? 'Move work off them this week' : 'Nobody overloaded', warn: !noFigures && counts.red > 0 },
          { label: 'Heavy', value: noFigures ? '—' : String(counts.amber), sub: noFigures ? noFiguresSub : counts.amber > 0 ? 'Watch before it tips over' : 'No one running heavy', warn: !noFigures && counts.amber > 0 },
          { label: 'Marking waiting', value: noFigures ? '—' : String(toMark), sub: noFigures ? noFiguresSub : `Across ${plural(rows.length, 'tutor')}` },
          {
            label: 'Not observed in a year',
            value: noFigures ? '—' : String(overdueObsCount),
            sub: noFigures ? noFiguresSub : overdueObsCount > 0 ? 'Book an observation' : 'Every tutor observed',
            warn: !noFigures && overdueObsCount > 0,
          },
        ]}
      />

      {!loading && !error && rows.length > 0 && (
        <motion.div variants={itemVariants} className={VIS_CARD}>
          <VisHead title="Load by tutor" sub="Marking waiting, lessons this week and cohorts, heaviest first" />
          <div className="mt-4 h-[240px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barGap={2}>
                <CartesianGrid stroke={AXIS} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: WHITE }} tickLine={false} axisLine={false} interval={0} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: WHITE }} tickLine={false} axisLine={false} width={40} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                  contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '0.75rem', fontSize: 12 }}
                  labelStyle={{ color: WHITE }}
                  itemStyle={{ color: WHITE }}
                  labelFormatter={(_, p) => (p?.[0]?.payload as { full?: string } | undefined)?.full ?? ''}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: WHITE }} iconType="circle" iconSize={8} />
                <Bar dataKey="To mark" fill={VOLT} radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="Lessons this week" fill={WHITE} radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="Cohorts" fill={SOFT} radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle title="By load" sub={!loading && rows.length > 0 ? `${plural(rows.length, 'tutor')}, heaviest first` : undefined} />
        {loading ? (
          <div className={COLLEGE_LIST}>
            <ListLoading label="Working out each tutor’s load…" />
          </div>
        ) : error ? (
          <CollegeEmpty title="Couldn’t load workload" body={error} />
        ) : rows.length === 0 ? (
          <CollegeEmpty title="No active tutors" body="Add tutors under People and their load appears here." />
        ) : (
          <div className={COLLEGE_LIST}>
            <PeopleListHead title="Tutor" figures={['Cohorts', 'This week', 'To mark', 'Observed']} menu={false} />
            <ul className="divide-y divide-white/[0.06]">
              {sorted.map((r) => {
                const obsProblem = r.last_observed_days_ago === null || r.last_observed_days_ago > 365;
                return (
                  <PeopleRow
                    key={r.tutor_staff_id}
                    headed
                    title={r.name}
                    badge={r.load_band !== 'green' ? <NameBadge tone="warn">{BAND_LABEL[r.load_band]}</NameBadge> : undefined}
                    sub={[r.role.replace(/_/g, ' '), `${r.comments_last_7d} comments in 7 days`].join(' · ')}
                    tone={r.load_band === 'red' ? 'critical' : r.load_band === 'amber' ? 'warn' : 'quiet'}
                    onOpen={() => navigate('/college?section=tutors')}
                    openLabel={`Open tutors for ${r.name}`}
                    figures={[
                      { label: 'cohorts', value: String(r.active_cohorts), warn: r.active_cohorts > 4 },
                      { label: 'lessons', value: String(r.lessons_this_week) },
                      { label: 'to mark', value: String(r.pending_grading), warn: r.pending_grading > 3 },
                      {
                        label: 'observed',
                        value: r.last_observed_days_ago === null ? 'Never' : `${r.last_observed_days_ago}d ago`,
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
