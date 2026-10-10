/**
 * TodayPage — the apprentice's daily front door (/apprentice/today).
 *
 * One screen, five sections:
 *   1. Greeting (date eyebrow + time-of-day salutation)
 *   2. DO NEXT (ELE-1896) — the one ranked list from get_my_do_next()
 *      (DoNextList), shared with the Apprentice Hub and the college area.
 *      It replaced the "What's next" hero and the "On your plate" list,
 *      which ranked a subset of the same things on the client. Empty → the
 *      one thing that would help most this week.
 *   3. Status line — streak / this week's hours / course % / with assessor
 *   4. Quick actions — log hours · capture evidence · continue · quick quiz
 *   5. AM2 countdown, next badge and the college row + quiet wellbeing footer
 *
 * Capture evidence doesn't mount its own sheet — it dispatches
 * `elecmate:open-capture`, which ApprenticeTabBar listens for, so there is
 * exactly one UnifiedCaptureSheet in the tree.
 *
 * Layout (10 Oct 2026): the College Hub home's language. Greeting with one
 * status line of figures, then full-width sections; the standing context
 * (AM2, next badge, college) is a two-column row on desktop and stacks on a
 * phone.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { useAchievementChecker } from '@/hooks/useAchievementChecker';
import { useMyAssignedQuizzes } from '@/hooks/useMyAssignedQuizzes';
import { useMyIlp } from '@/hooks/useMyIlp';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useOtjProgramme } from '@/hooks/useOtjProgramme';
import { useOtjSummary } from '@/hooks/useOtjSummary';
import { useAm2ExamDate } from '@/hooks/useAm2Readiness';
import { useAM2Sections } from '@/hooks/am2/useAM2Sections';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useWeeklyRecap } from '@/hooks/useWeeklyRecap';
import { useLoggingReminders } from '@/hooks/useLoggingReminders';
import { WeeklyRecapSheet } from '@/components/apprentice-hub/WeeklyRecapSheet';
import { getCount as getMissedCount } from '@/lib/missedQuestions';
import { cn } from '@/lib/utils';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { DoNextList } from '@/components/apprentice-hub/do-next/DoNextList';
import { ImportedEvidenceReviewCard } from '@/components/apprentice-hub/ImportedEvidenceReviewCard';
import type { DoNextItem } from '@/hooks/useMyDoNext';
import {
  HomeRowCard,
  HomeSectionTitle,
  ProgressPanel,
  StartCards,
  type ProgressCell,
  type StartCard,
} from '@/components/apprentice/ApprenticeHomeUi';

const partOfDay = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
};

const dateEyebrow = (): string =>
  new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

export default function TodayPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, isLoading, user: apprentice } = useApprenticeData();
  const { quizzes, loading: quizzesLoading } = useMyAssignedQuizzes();
  const { hasCollegeLink, rollUp, loading: ilpLoading } = useMyIlp();
  const { learner: collegeLearner } = useMyCollegeContext();
  const programme = useOtjProgramme();
  const { data: otjSummary } = useOtjSummary(user?.id ?? null);
  const am2Sections = useAM2Sections();
  const am2Date = useAm2ExamDate();
  const am2 = {
    loading: am2Sections.isLoading,
    daysToGo: am2Date.daysToGo,
    // Every run, Learn and Practise included — someone who has only practised
    // still sees their AM2 card.
    sessionsCount:
      am2Sections.data?.allRuns ?? am2Sections.data?.sections.reduce((n, s) => n + s.runs, 0) ?? 0,
    readyCount: am2Sections.data?.readyCount ?? 0,
    sectionCount: am2Sections.data?.sections.length ?? 5,
  };
  const { lastLocation } = useLastStudyLocation();
  const { nextUp: nextBadge } = useAchievementChecker();
  // Cheap localStorage read — recomputed on focus/visibility so graduating
  // the pile (this tab or another) doesn't leave a stale "Quick revision"
  // tile pointing at an empty pile.
  const [missedCount, setMissedCount] = useState(0);
  useEffect(() => {
    const uid = user?.id;
    if (!uid) {
      setMissedCount(0);
      return;
    }
    const update = () => setMissedCount(getMissedCount(uid));
    update();
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, [user?.id]);

  const eyebrow = useMemo(() => dateEyebrow(), []);
  // "ANDREW" reads as shouting; show the name as a name.
  const rawName =
    apprentice.firstName && apprentice.firstName !== 'there' ? apprentice.firstName.trim() : '';
  const firstName =
    rawName.length > 1 && rawName === rawName.toUpperCase()
      ? rawName.charAt(0) + rawName.slice(1).toLowerCase()
      : rawName;
  const salutation = useMemo(() => partOfDay(), []);

  const overdueQuizzes = quizzes.filter((q) => q.status === 'overdue');
  const notStartedQuizzes = quizzes.filter((q) => q.status === 'not_started');
  const newCount =
    notStartedQuizzes.length + rollUp.unread_tutor_comments + (rollUp.needs_acknowledgement || 0);

  // Measured learning in the app this week, from the one off-the-job figure.
  const thisWeekHours = otjSummary?.app_learning_this_week_hours ?? 0;
  const streak = stats.learning.currentStreak;
  const continuePath = lastLocation?.path ?? '/study-centre';

  // Once-a-week "your week" moment — only fires for a week with real activity.
  const {
    recap,
    show: showRecap,
    dismiss: dismissRecap,
  } = useWeeklyRecap(user?.id ?? null, streak);

  // Settings → Reminders. Hides the nagging (behind-on-hours, streak, weekly
  // recap); the Log hours buttons stay (ELE-1804).
  const { hidden: hideReminders } = useLoggingReminders();

  const heroLoading = isLoading || quizzesLoading || ilpLoading || programme.loading;

  // ── AM2 milestone chip ───────────────────────────────────────────────
  // The practical exam is the apprentice's biggest milestone. Surface it on
  // Today ONLY when it's real: a booked exam date still ahead, or at least one
  // completed timed run. Otherwise it stays off the page (anti-clutter).
  const am2Counting = am2.daysToGo !== null && am2.daysToGo >= 0;
  const am2Visible = !am2.loading && (am2Counting || am2.sessionsCount > 0);
  const am2Urgent =
    am2Counting && (am2.daysToGo as number) <= 14 && am2.readyCount < am2.sectionCount;
  const am2DayLabel =
    am2.daysToGo === 0 ? 'Today' : am2.daysToGo === 1 ? 'Tomorrow' : `${am2.daysToGo} days`;

  // ── Quick actions ────────────────────────────────────────────────────
  const quickActions: StartCard[] = [
    {
      title: 'Log hours',
      detail: 'Add today’s off-the-job time',
      onClick: () => navigate('/apprentice/ojt-hub'),
    },
    {
      title: 'Capture evidence',
      detail: 'Photo or file straight into your portfolio',
      onClick: () => window.dispatchEvent(new CustomEvent('elecmate:open-capture')),
    },
    {
      title: 'Continue course',
      detail: lastLocation?.title ? `Back to ${lastLocation.title}` : 'Pick up where you left off',
      onClick: () => navigate(continuePath),
    },
    // When the learner has missed questions banked, this becomes their
    // personal weak-spot session instead of a generic quiz pointer.
    missedCount > 0
      ? {
          title: 'Quick revision',
          detail: `Drill the ${missedCount} you’ve missed`,
          // Pass the origin so the session's Back returns here rather than
          // to a hardcoded default.
          onClick: () =>
            navigate('/apprentice/revision', {
              state: { from: '/apprentice/today', label: 'Today' },
            }),
        }
      : {
          title: 'Quick quiz',
          detail: 'Ten questions, five minutes',
          onClick: () => navigate(hasCollegeLink ? '/apprentice/college-plan' : '/study-centre'),
        },
  ];

  // Missed questions banked on this device/account are a learning nudge the
  // server list does not know about — added to "Do next" as a later item.
  const revisionExtra = useMemo<DoNextItem[]>(
    () =>
      missedCount > 0
        ? [
            {
              key: 'revision:missed',
              kind: 'revision',
              id: 'missed',
              title: `Revise the ${missedCount} question${missedCount === 1 ? '' : 's'} you missed`,
              detail: 'Questions you got wrong last time, in one short session.',
              due: null,
              urgency: 'later',
              action: 'Revise',
              href: '/apprentice/revision',
            },
          ]
        : [],
    [missedCount]
  );

  // ── Progress: the four figures as one strip ──────────────────────────
  const pct = stats.progress.overallPercent;
  const statusFigures: ProgressCell[] = [
    {
      colour: 'bg-orange-400',
      value: streak === 1 ? '1 day' : `${streak} days`,
      label: 'Study streak',
    },
    {
      colour: 'bg-sky-400',
      value: `${Math.round(thisWeekHours * 10) / 10}h`,
      label: 'Learning this week',
    },
    {
      colour: 'bg-emerald-400',
      pct,
      value: `${pct}%`,
      label: 'Criteria signed off',
    },
    {
      colour: 'bg-teal-300',
      value: `${stats.portfolio.pendingReview}`,
      label: 'With your assessor',
    },
  ];

  return (
    <HubSubPage title="Today" backTo="/apprentice">
      {/* 1 · Greeting and the four figures as one status line */}
      <header className="min-w-0">
        <p className="text-[13px] font-medium text-white">{eyebrow}</p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[34px]">
          {salutation}
          {firstName ? `, ${firstName}` : ''}
        </h1>
      </header>
      <ProgressPanel items={statusFigures} loading={isLoading} />

      {/* 2 · DO NEXT (ELE-1896) — the learner's one ranked list: plan items,
          referred criteria, hours to confirm, quizzes, goals, messages,
          reviews, witnesses, the next class. Same list as the Apprentice Hub
          and the college area. Empty → the one thing that helps most. */}
      <DoNextList extra={revisionExtra} />

      {/* 2a · Evidence the college brought across from a previous e-portfolio,
          waiting for the learner to check (ELE-1974). Renders nothing otherwise. */}
      <ImportedEvidenceReviewCard />

      {/* 3 · Quick actions — outlined, same size; the one yellow action on
          this screen is the first row of Do next. */}
      <section className="space-y-3" aria-label="Quick actions">
        <HomeSectionTitle title="Quick actions" />
        <StartCards items={quickActions} className="lg:grid-cols-4" />
      </section>

      {/* 4 · Standing context: AM2 countdown (only when real), the next
          badge and the college. Two columns on desktop. */}
      {(am2Visible || nextBadge || hasCollegeLink) && (
        <div className="grid gap-3 lg:grid-cols-2">
          {am2Visible && (
            <HomeRowCard
              title={
                am2Counting ? (
                  <>
                    {am2DayLabel}
                    {am2.daysToGo !== 0 && am2.daysToGo !== 1 ? ' to your AM2' : ': your AM2'}
                  </>
                ) : (
                  'AM2 practical: keep your practice going'
                )
              }
              detail={
                am2.sessionsCount > 0 ? (
                  <>
                    {am2.readyCount} of {am2.sectionCount} sections ready · {am2.sessionsCount} run
                    {am2.sessionsCount === 1 ? '' : 's'}
                  </>
                ) : (
                  'Try a section to see where you stand'
                )
              }
              trailing={
                am2.sessionsCount > 0 ? (
                  <span
                    className={cn(
                      'shrink-0 text-[15px] font-semibold tabular-nums',
                      am2Urgent ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {am2.readyCount}/{am2.sectionCount}
                  </span>
                ) : null
              }
              onClick={() => navigate('/apprentice/am2-simulator')}
              className={cn(am2Urgent && 'border-orange-400/40')}
            />
          )}

          {/* The closest locked achievement, live progress */}
          {nextBadge && (
            <HomeRowCard
              title={nextBadge.title}
              detail={
                <span className="flex items-center gap-3">
                  <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                    <span
                      className="block h-full rounded-full bg-elec-yellow transition-all"
                      style={{ width: `${nextBadge.pct}%` }}
                    />
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {nextBadge.current} of {nextBadge.target}
                  </span>
                </span>
              }
              onClick={() => navigate('/apprentice/hub?tab=progress')}
            />
          )}

          {/* College-linked apprentices only */}
          {hasCollegeLink && (
            <HomeRowCard
              title={collegeLearner?.college_name ?? 'From your college'}
              detail={collegeLearner?.cohort_name ?? 'Goals and quizzes from your tutor'}
              trailing={
                overdueQuizzes.length > 0 ? (
                  <span className="shrink-0 text-[13px] font-semibold tabular-nums text-orange-300">
                    {overdueQuizzes.length} overdue
                  </span>
                ) : newCount > 0 ? (
                  <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                    {newCount} new
                  </span>
                ) : null
              }
              onClick={() => navigate('/apprentice/college-plan')}
            />
          )}
        </div>
      )}

      {/* 5 · Quiet wellbeing footer */}
      <button
        type="button"
        onClick={() => navigate('/apprentice/mental-health')}
        className="mx-auto flex h-11 items-center justify-center gap-2 px-3 text-[13px] font-medium text-white transition-colors hover:text-elec-yellow touch-manipulation"
      >
        <HeartHandshake className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        Struggling or need to talk?
      </button>

      <WeeklyRecapSheet open={showRecap && !hideReminders} onClose={dismissRecap} recap={recap} />
    </HubSubPage>
  );
}
