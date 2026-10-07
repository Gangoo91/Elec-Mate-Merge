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
 *   3. Stat strip — streak / this week's hours / course % / awaiting sign-off
 *   4. Quick actions — log hours · capture evidence · continue · quick quiz
 *   5. FROM YOUR COLLEGE row (college-linked only) + quiet wellbeing footer
 *
 * Capture evidence doesn't mount its own sheet — it dispatches
 * `elecmate:open-capture`, which ApprenticeTabBar listens for, so there is
 * exactly one UnifiedCaptureSheet in the tree.
 *
 * Layout: max-w-6xl, not the 672px column this used to be — on a laptop that
 * left two thirds of the screen empty and squeezed the quick actions two-up
 * into a strip barely wider than a phone. Greeting, What's next, the AM2
 * milestone and the stat strip run full width; below them the page splits into
 * today's work (plate + quick actions) and standing context (next badge, your
 * college) in a sticky sidebar. It stacks back to a single column on a phone.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  BookOpen,
  Camera,
  Clock,
  ClipboardList,
  FileCheck,
  Flame,
  GraduationCap,
  HeartHandshake,
  MessageSquare,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
import { HubKpi, HubKpiRow, HubQuickStart } from '@/components/hub/HubPrimitives';
import { DoNextList } from '@/components/apprentice-hub/do-next/DoNextList';
import type { DoNextItem } from '@/hooks/useMyDoNext';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { buttonPrimaryCn } from '@/components/forms/fieldStyles';

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

  // ── Stat strip cells ─────────────────────────────────────────────────
  const statCells = [
    {
      label: 'Streak',
      value: (
        <span className="inline-flex items-center gap-1">
          {streak >= 2 && <Flame className="h-4 w-4 text-elec-yellow" />}
          {streak}
        </span>
      ),
    },
    { label: 'This week', value: <>{Math.round(thisWeekHours * 10) / 10}h</> },
    { label: 'Course', value: <>{stats.progress.overallPercent}%</> },
    { label: 'With assessor', value: <>{stats.portfolio.pendingReview}</> },
  ];

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
  const quickActions = [
    {
      label: 'Log hours',
      description: 'Add today’s off-the-job time',
      icon: Clock,
      onClick: () => navigate('/apprentice/ojt-hub'),
    },
    {
      label: 'Capture evidence',
      description: 'Photo or file straight into your portfolio',
      icon: Camera,
      onClick: () => window.dispatchEvent(new CustomEvent('elecmate:open-capture')),
    },
    {
      label: 'Continue course',
      description: lastLocation?.title
        ? `Back to ${lastLocation.title}`
        : 'Pick up where you left off',
      icon: BookOpen,
      onClick: () => navigate(continuePath),
    },
    // When the learner has missed questions banked, this becomes their
    // personal weak-spot session instead of a generic quiz pointer.
    missedCount > 0
      ? {
          label: 'Quick revision',
          description: `Drill the ${missedCount} you’ve missed`,
          icon: ClipboardList,
          // Pass the origin so the session's Back returns here rather than
          // to a hardcoded default.
          onClick: () =>
            navigate('/apprentice/revision', {
              state: { from: '/apprentice/today', label: 'Today' },
            }),
        }
      : {
          label: 'Quick quiz',
          description: 'Ten questions, five minutes',
          icon: ClipboardList,
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

  return (
    <HubSubPage title="Today" backTo="/apprentice">
      {/* 1 · Greeting — the one editorial line the daily front door keeps */}
      <header className="space-y-1">
        <p className="text-[13px] text-white">{eyebrow}</p>
        <h1 className="text-[22px] font-semibold tracking-tight leading-tight text-white sm:text-[26px]">
          {salutation}, {apprentice.firstName}
        </h1>
      </header>

      {/* 2 · DO NEXT (ELE-1896) — the learner's one ranked list: plan items,
          referred criteria, hours to confirm, quizzes, goals, messages,
          reviews, witnesses, the next class. Same list as the Apprentice Hub
          and the college area. Empty → the one thing that helps most. */}
      <DoNextList extra={revisionExtra} />

      {/* 2b · AM2 milestone — countdown + readiness (only when relevant).
          Red is reserved for a date that is genuinely close; otherwise the
          card sits in the same neutral surface as everything else. */}
      {am2Visible && (
        <section aria-label="AM2 readiness">
          <button
            type="button"
            onClick={() => navigate('/apprentice/am2-simulator')}
            className={cn(
              CARD_BASE,
              CARD_NEUTRAL,
              'w-full flex-row items-center gap-4 p-4',
              am2Urgent && 'border-red-400/40 hover:border-red-400/60'
            )}
          >
            <div className="min-w-0 flex-1">
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.18em]',
                  am2Urgent ? 'text-red-300' : 'text-elec-yellow'
                )}
              >
                {am2Counting ? 'Your AM2' : 'AM2 practical'}
              </span>
              {am2Counting ? (
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[22px] font-semibold tabular-nums tracking-tight text-white">
                    {am2DayLabel}
                  </span>
                  <span className="text-[12.5px] text-white">to go</span>
                </div>
              ) : (
                <div className="mt-1 text-[15px] font-semibold text-white">
                  Keep your practice going
                </div>
              )}
              {am2.sessionsCount > 0 ? (
                <p className="mt-1 text-[12px] text-white">
                  <span className="font-medium tabular-nums text-white">
                    {am2.readyCount} of {am2.sectionCount}
                  </span>{' '}
                  sections ready · {am2.sessionsCount} run{am2.sessionsCount === 1 ? '' : 's'}
                </p>
              ) : (
                <p className="mt-1 text-[12px] text-white">Try a section to see where you stand</p>
              )}
              {am2.sessionsCount > 0 && (
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      am2Urgent ? 'bg-red-400' : 'bg-elec-yellow'
                    )}
                    style={{ width: `${(am2.readyCount / am2.sectionCount) * 100}%` }}
                  />
                </div>
              )}
            </div>
            {am2.sessionsCount > 0 && (
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border',
                  am2Urgent ? 'border-red-400/40' : 'border-elec-yellow/35'
                )}
              >
                <span
                  className={cn(
                    'text-[15px] font-semibold leading-none tabular-nums',
                    am2Urgent ? 'text-red-300' : 'text-elec-yellow'
                  )}
                >
                  {am2.readyCount}/{am2.sectionCount}
                </span>
                <span className="mt-0.5 text-[8px] uppercase tracking-wider text-white">ready</span>
              </div>
            )}
            <ChevronRight className="h-4 w-4 shrink-0 text-white" />
          </button>
        </section>
      )}

      {/* 3 · KPI row — same primitive as the hub landing, so the figures read
          the same way on both screens. Only the first carries volt. */}
      <HubKpiRow>
        <HubKpi
          label="Streak"
          value={isLoading ? '—' : `${streak}`}
          context={streak === 1 ? 'day' : 'days'}
          accent
        />
        <HubKpi
          label="This week"
          value={isLoading ? '—' : `${Math.round(thisWeekHours * 10) / 10}h`}
          context="off-the-job"
        />
        <HubKpi
          label="Course"
          value={isLoading ? '—' : `${stats.progress.overallPercent}%`}
          context="criteria passed"
        />
        <HubKpi
          label="With assessor"
          value={isLoading ? '—' : `${stats.portfolio.pendingReview}`}
          context={stats.portfolio.pendingReview === 1 ? 'criterion' : 'criteria'}
        />
      </HubKpiRow>

      {/* Working grid — today's work on the left, standing context on the
          right. Stacks on a phone, where the sidebar simply follows. */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0 space-y-8">
          {/* 4 · Quick actions */}
          <HubQuickStart
            label="Quick actions"
            items={quickActions.map(({ label, description, onClick }, i) => ({
              title: label,
              description,
              onClick,
              primary: i === 1,
            }))}
          />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          {/* 4b · NEXT BADGE — the closest locked achievement, live progress */}
          {nextBadge && (
            <section aria-label="Next achievement">
              <button
                type="button"
                onClick={() => navigate('/apprentice/hub?tab=progress')}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'w-full flex-row items-center gap-3 px-4 py-3.5'
                )}
              >
                <Trophy className="h-5 w-5 shrink-0 text-elec-yellow" strokeWidth={2} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13.5px] font-medium text-white">
                      {nextBadge.title}
                    </span>
                    <span className="shrink-0 text-[11px] tabular-nums text-white">
                      {nextBadge.current}/{nextBadge.target}
                    </span>
                  </span>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/[0.08]">
                    <span
                      className="block h-full rounded-full bg-elec-yellow transition-all"
                      style={{ width: `${nextBadge.pct}%` }}
                    />
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white" />
              </button>
            </section>
          )}

          {/* 5 · FROM YOUR COLLEGE — college-linked apprentices only */}
          {hasCollegeLink && (
            <section aria-label="From your college">
              <button
                type="button"
                onClick={() => navigate('/apprentice/college-plan')}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'w-full flex-row items-center gap-3 px-4 py-3.5'
                )}
              >
                <GraduationCap className="h-5 w-5 shrink-0 text-elec-yellow" strokeWidth={2} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    From your college
                  </span>
                  <span className="block truncate text-[13.5px] font-medium text-white">
                    {collegeLearner
                      ? `${collegeLearner.college_name}${collegeLearner.cohort_name ? ` · ${collegeLearner.cohort_name}` : ''}`
                      : 'Goals & quizzes from your tutor'}
                  </span>
                </span>
                {overdueQuizzes.length > 0 ? (
                  <span className="shrink-0 text-[12px] font-semibold tabular-nums text-red-300">
                    {overdueQuizzes.length} overdue
                  </span>
                ) : newCount > 0 ? (
                  <span className="shrink-0 text-[12px] font-semibold tabular-nums text-elec-yellow">
                    {newCount} new
                  </span>
                ) : null}
                <ChevronRight className="h-4 w-4 shrink-0 text-white" />
              </button>
            </section>
          )}
        </aside>
      </div>

      {/* 6 · Quiet wellbeing footer */}
      <button
        type="button"
        onClick={() => navigate('/apprentice/mental-health')}
        className="flex h-11 w-full items-center justify-center gap-2 text-[12.5px] text-white transition-colors hover:text-elec-yellow touch-manipulation"
      >
        <HeartHandshake className="h-4 w-4" />
        Struggling or need to talk?
      </button>

      <WeeklyRecapSheet open={showRecap && !hideReminders} onClose={dismissRecap} recap={recap} />
    </HubSubPage>
  );
}
