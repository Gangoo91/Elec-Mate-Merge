import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { useAuth } from '@/contexts/AuthContext';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  TeachingEmpty,
  TeachingHeader,
  TeachingLoading,
  TeachingScreen,
  plural,
} from '@/components/college/teaching/TeachingKit';
import { CriteriaGapsView, gapsHeadline } from '@/components/college/teaching/CriteriaGaps';
import { useCohortCriteriaGaps } from '@/hooks/college/useCohortCriteriaGaps';

/**
 * Criteria gaps (8 Oct 2026): for one cohort, or every cohort you teach,
 * which criteria of the qualification the class is weakest on. One sentence
 * with the real counts, units weakest first, each opening to its criteria;
 * tick criteria and plan a lesson for them in one tap.
 *
 * `?cohortId=<id>` picks the cohort; without it the tutor's own cohorts
 * together ("My cohorts"), or the first active cohort for someone who
 * teaches none. Renders content only, under the CollegeDashboard masthead.
 */

const HELP: PageHelpContent = {
  id: 'college-criteria-gaps',
  title: 'Criteria gaps',
  what: 'Every assessment criterion of the class’s qualification, with how many learners have it passed, with the assessor, sent back, claimed or nothing yet. The weakest unit comes first, so you can see in seconds what to teach next.',
  steps: [
    {
      title: 'Pick the class',
      body: 'My cohorts puts every cohort you are the tutor on together. Tap a cohort to look at just that class.',
    },
    {
      title: 'Open the weakest unit',
      body: 'Units are ordered by the share of criteria passed, lowest first. Each criterion shows a bar and, in words, how many have nothing yet.',
    },
    {
      title: 'Plan a lesson for the gaps',
      body: 'Tick the criteria you want to teach and tap Plan a lesson for these. The lesson planner opens with those criteria and the cohort already picked. A lesson covers one unit, so ticking a criterion in another unit starts a new selection.',
    },
    {
      title: 'See who is where',
      body: 'Tap a criterion for the learners and where each one is on it. Tap a learner for their profile.',
    },
  ],
  notes: [
    {
      title: 'Where the figures come from',
      body: 'Each learner’s portfolio record of every criterion, the same one their portfolio and the assessor use. Passed includes IQA confirmed. With the assessor includes a pass an IQA has queried. Sent back is referred or not yet. Claimed means the learner tagged evidence but has not sent it. Nothing yet includes criteria with only an AI suggestion.',
    },
    {
      title: 'Who is counted',
      body: 'Learners on the cohort who have joined the app and are not withdrawn or completed. Learners you are not allowed to see are left out and said so.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'Passed' },
    { swatch: 'bg-sky-400', label: 'With the assessor' },
    { swatch: 'bg-orange-400', label: 'Sent back' },
    { swatch: 'bg-white/70', label: 'Claimed, not sent' },
    { swatch: 'bg-white/[0.12]', label: 'Nothing yet' },
  ],
};

const chip = (on: boolean) =>
  cn(
    'h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] transition-colors touch-manipulation',
    on
      ? 'border-elec-yellow font-semibold text-elec-yellow'
      : 'border-white/[0.16] font-medium text-white hover:border-white/[0.35]'
  );

const lc = (s: string | null | undefined) => (s ?? '').toLowerCase();

export function CriteriaGapsSection() {
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const { cohorts, staff, students, isLoading: ctxLoading } = useCollegeSupabase();

  const me = useMemo(() => staff.find((s) => user && s.user_id === user.id) ?? null, [staff, user]);
  const active = useMemo(
    () =>
      cohorts
        .filter((c) => !['archived', 'completed', 'closed'].includes(lc(c.status)))
        .filter((c) => students.some((s) => s.cohort_id === c.id))
        .sort((a, b) => a.name.localeCompare(b.name, 'en-GB')),
    [cohorts, students]
  );
  const mine = useMemo(() => (me ? active.filter((c) => c.tutor_id === me.id) : []), [active, me]);

  const param = params.get('cohortId');
  // No cohort named: your cohorts together, or the first cohort if you teach none.
  const cohortId = param ?? (mine.length > 0 ? null : (active[0]?.id ?? null));
  const ready = !ctxLoading && (param !== null || mine.length > 0 || active.length > 0);

  const pick = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('cohortId', id);
    else next.delete('cohortId');
    setParams(next, { replace: true });
  };

  const { data, isLoading, error } = useCohortCriteriaGaps(cohortId, ready);

  const label =
    cohortId === null
      ? mine.length === 1
        ? mine[0].name
        : 'your cohorts'
      : (cohorts.find((c) => c.id === cohortId)?.name ??
        data?.cohorts.find((c) => c.id === cohortId)?.name ??
        'this cohort');

  const learners = data?.qualifications.reduce((n, q) => n + q.learners.length, 0) ?? 0;

  // Keep the page title honest when a stale ?cohortId= points nowhere.
  useEffect(() => {
    if (param && !ctxLoading && cohorts.length > 0 && !cohorts.some((c) => c.id === param)) {
      pick(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, ctxLoading, cohorts]);

  const sub = data
    ? [
        learners > 0 ? `${plural(learners, 'learner')} counted` : null,
        data.hidden > 0 ? `${data.hidden} you cannot see left out` : null,
        data.no_qualification > 0
          ? `${data.no_qualification} not yet on a qualification with criteria`
          : null,
      ]
        .filter(Boolean)
        .join(' · ') || undefined
    : undefined;

  return (
    <TeachingScreen>
      <TeachingHeader
        eyebrow="Teaching"
        title="Criteria gaps"
        help={HELP}
        summary={
          !ready || isLoading
            ? 'Reading every learner’s criteria…'
            : error
              ? 'Could not read the criteria just now. Try again in a moment.'
              : gapsHeadline(data, label)
        }
        sub={sub}
      />

      {(mine.length > 0 || active.length > 1) && (
        <motion.div
          variants={itemVariants}
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          role="group"
          aria-label="Which class"
        >
          {mine.length > 0 && (
            <button
              type="button"
              className={chip(cohortId === null)}
              aria-pressed={cohortId === null}
              onClick={() => pick(null)}
            >
              My cohorts
            </button>
          )}
          {active.map((c) => (
            <button
              key={c.id}
              type="button"
              className={chip(cohortId === c.id)}
              aria-pressed={cohortId === c.id}
              onClick={() => pick(c.id)}
            >
              {c.name}
            </button>
          ))}
        </motion.div>
      )}

      {!ready && !ctxLoading ? (
        <TeachingEmpty
          title="No cohorts yet"
          body="Criteria gaps fill in once a cohort has learners on a qualification."
        />
      ) : !ready || isLoading ? (
        <TeachingLoading />
      ) : error ? (
        <TeachingEmpty title="Could not load criteria gaps" body={String(error.message)} />
      ) : !data || learners === 0 ? (
        <TeachingEmpty
          title="Nothing to show yet"
          body="When learners in this class are on a qualification with criteria, each criterion shows here with where they are on it."
        />
      ) : (
        <CriteriaGapsView key={cohortId ?? 'mine'} data={data} cohortId={cohortId} />
      )}
    </TeachingScreen>
  );
}
