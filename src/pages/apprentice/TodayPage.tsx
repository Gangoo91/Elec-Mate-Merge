/**
 * TodayPage — the apprentice's daily front door (/apprentice/today).
 *
 * One screen, five sections:
 *   1. Greeting (date eyebrow + time-of-day salutation)
 *   2. WHAT'S NEXT — single recommendation chosen by a priority chain:
 *        a. overdue tutor quizzes        → open college plan
 *        b. new (not started) quiz       → straight into that quiz
 *        c. behind on OTJ pace (Thu-Sun) → log hours
 *        d. live streak (≥2 days)        → continue learning
 *        e. fallback                     → start today's learning
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
import { useOtjProgramme } from '@/hooks/useOtjProgramme';
import { useApprenticeOtj } from '@/hooks/useApprenticeOtj';
import { useAm2Readiness } from '@/hooks/useAm2Readiness';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useWeeklyRecap } from '@/hooks/useWeeklyRecap';
import { WeeklyRecapSheet } from '@/components/apprentice-hub/WeeklyRecapSheet';
import { getCount as getMissedCount } from '@/lib/missedQuestions';
import { cn } from '@/lib/utils';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { HubKpi, HubKpiRow, HubQuickStart, HubWorkList } from '@/components/hub/HubPrimitives';
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

type NextUpKind = 'overdue' | 'newquiz' | 'hours' | 'streak' | 'fallback';
interface NextUp {
  /** Matches a plate-item id so the plate can drop the exact item the hero
      already owns (route-based dedup over-filters — overdue/newquiz/feedback
      all point at college-plan). */
  kind: NextUpKind;
  title: string;
  verdict: string;
  ctaLabel: string;
  to: string;
}

export default function TodayPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, isLoading, user: apprentice } = useApprenticeData();
  const { quizzes, loading: quizzesLoading } = useMyAssignedQuizzes();
  const { hasCollegeLink, rollUp, loading: ilpLoading } = useMyIlp();
  const programme = useOtjProgramme();
  const { breakdown } = useApprenticeOtj(user?.id ?? null);
  const am2 = useAm2Readiness();
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

  const thisWeekHours = breakdown.this_week_minutes / 60;
  const streak = stats.learning.currentStreak;
  const continuePath = lastLocation?.path ?? '/study-centre';

  // Once-a-week "your week" moment — only fires for a week with real activity.
  const {
    recap,
    show: showRecap,
    dismiss: dismissRecap,
  } = useWeeklyRecap(user?.id ?? null, streak);

  const heroLoading = isLoading || quizzesLoading || ilpLoading || programme.loading;

  // ── WHAT'S NEXT — priority chain ─────────────────────────────────────
  const nextUp = useMemo((): NextUp => {
    // a. Overdue tutor work trumps everything.
    if (overdueQuizzes.length > 0) {
      return {
        kind: 'overdue',
        title: `${overdueQuizzes.length} overdue from your tutor`,
        verdict: 'Catch up now to keep your college plan on track.',
        ctaLabel: 'Open college plan',
        to: '/apprentice/college-plan',
      };
    }
    // b. Fresh quiz waiting — take them straight into it.
    if (notStartedQuizzes.length > 0) {
      const quiz = notStartedQuizzes[0];
      return {
        kind: 'newquiz',
        title: `New quiz from your tutor: ${quiz.title}`,
        verdict: 'Set this week — best done while the topic is fresh.',
        ctaLabel: 'Start quiz',
        to: `/apprentice/college/quiz/${quiz.id}`,
      };
    }
    // c. Behind on hours, and the week is running out (Thu-Sun).
    const day = new Date().getDay(); // Sun=0 … Sat=6
    const lateInWeek = day === 0 || day >= 4;
    if (
      lateInWeek &&
      programme.weeklyTargetHours > 0 &&
      thisWeekHours < programme.weeklyTargetHours * 0.5
    ) {
      return {
        kind: 'hours',
        title: "You're behind on hours this week",
        verdict: 'Logging an entry takes 30 seconds — keep your pace defensible.',
        ctaLabel: 'Log hours now',
        to: '/apprentice/ojt-hub',
      };
    }
    // d. Streak alive — protect it.
    if (streak >= 2) {
      return {
        kind: 'streak',
        title: `Day ${streak} of your streak`,
        verdict: 'One section keeps it alive.',
        ctaLabel: 'Continue learning',
        to: continuePath,
      };
    }
    // e. Fallback.
    return {
      kind: 'fallback',
      title: "Start today's learning",
      verdict: 'Five minutes counts towards your off-the-job hours.',
      ctaLabel: 'Open Study Centre',
      to: '/study-centre',
    };
  }, [
    overdueQuizzes.length,
    notStartedQuizzes,
    programme.weeklyTargetHours,
    thisWeekHours,
    streak,
    continuePath,
  ]);

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
    { label: 'Sign-off', value: <>{stats.portfolio.pendingReview}</> },
  ];

  // ── On your plate — every open item worth doing, prioritised ─────────
  // The hero ("What's next") already calls out the single top thing; this is
  // everything ELSE that's actually waiting, deduped against it so nothing
  // repeats. Empty plate → the section doesn't render (Today stays calm).
  interface PlateItem {
    id: string;
    label: string;
    icon: LucideIcon;
    to: string;
    count?: number;
    urgent?: boolean;
  }
  const plateItems = useMemo<PlateItem[]>(() => {
    const items: PlateItem[] = [];
    if (overdueQuizzes.length > 0) {
      items.push({
        id: 'overdue',
        label: 'Catch up on overdue work',
        icon: ClipboardList,
        to: '/apprentice/college-plan',
        count: overdueQuizzes.length,
        urgent: true,
      });
    }
    if (notStartedQuizzes.length > 0) {
      items.push({
        id: 'newquiz',
        label:
          notStartedQuizzes.length === 1
            ? 'New quiz from your tutor'
            : 'New quizzes from your tutor',
        icon: ClipboardList,
        to: hasCollegeLink ? '/apprentice/college-plan' : '/study-centre',
        count: notStartedQuizzes.length,
      });
    }
    if (rollUp.unread_tutor_comments > 0) {
      items.push({
        id: 'feedback',
        label: 'Read your tutor’s feedback',
        icon: MessageSquare,
        to: '/apprentice/college-plan',
        count: rollUp.unread_tutor_comments,
      });
    }
    if (stats.portfolio.pendingReview > 0) {
      items.push({
        id: 'signoff',
        label: 'Evidence waiting for sign-off',
        icon: FileCheck,
        to: '/apprentice/hub?tab=work',
        count: stats.portfolio.pendingReview,
      });
    }
    {
      const day = new Date().getDay();
      const behind =
        (day === 0 || day >= 4) &&
        programme.weeklyTargetHours > 0 &&
        thisWeekHours < programme.weeklyTargetHours * 0.75;
      if (behind) {
        items.push({
          id: 'hours',
          label: 'Log this week’s hours',
          icon: Clock,
          to: '/apprentice/ojt-hub',
        });
      }
    }
    if (missedCount > 0) {
      items.push({
        id: 'revision',
        label: 'Revise the questions you missed',
        icon: RotateCcw,
        to: '/apprentice/revision',
        count: missedCount,
      });
    }
    // Drop the exact item the hero already owns (by kind, not route — several
    // items share /apprentice/college-plan), then cap.
    return items.filter((i) => i.id !== nextUp.kind).slice(0, 5);
  }, [
    overdueQuizzes.length,
    notStartedQuizzes.length,
    rollUp.unread_tutor_comments,
    stats.portfolio.pendingReview,
    programme.weeklyTargetHours,
    thisWeekHours,
    missedCount,
    hasCollegeLink,
    nextUp.kind,
  ]);

  // ── AM2 milestone chip ───────────────────────────────────────────────
  // The practical exam is the apprentice's biggest milestone. Surface it on
  // Today ONLY when it's real: a booked exam date still ahead, or at least one
  // completed timed run. Otherwise it stays off the page (anti-clutter).
  const am2Counting = am2.daysToGo !== null && am2.daysToGo >= 0;
  const am2Visible = !am2.loading && (am2Counting || am2.sessionsCount > 0);
  const am2Urgent =
    am2Counting && (am2.daysToGo as number) <= 14 && (am2.score === null || am2.score < 60);
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

  // Why each plate item is on the list — HubWorkList wants a reason, not a
  // restatement of the title.
  const PLATE_REASON: Record<string, string> = {
    overdue: 'Past the date your tutor set',
    newquiz: 'Set by your tutor, not started yet',
    feedback: 'Unread comments on your evidence',
    signoff: 'Waiting on a supervisor signature',
    hours: 'Behind this week’s off-the-job pace',
    revision: 'Questions you got wrong last time',
  };

  return (
    <HubSubPage title="Today" backTo="/apprentice">
      {/* 1 · Greeting — the one editorial line the daily front door keeps */}
      <header className="space-y-1">
        <p className="text-[13px] text-white">{eyebrow}</p>
        <h1 className="text-[22px] font-semibold tracking-tight leading-tight text-white sm:text-[26px]">
          {salutation}, {apprentice.firstName}
        </h1>
      </header>

      {/* 2 · WHAT'S NEXT — the one thing to do, so it keeps the full width.
          On a wide screen the copy and the action sit side by side rather
          than the button stretching to 1100px, which read as a banner. */}
      <section
        className={cn('rounded-2xl border border-elec-yellow/35 p-5 sm:p-6', CARD_SURFACE)}
        aria-label="What's next"
      >
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          What's next
        </span>
        {heroLoading ? (
          <div className="mt-3 space-y-3" aria-hidden>
            <div className="h-6 w-3/4 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/[0.05]" />
            <div className="h-11 w-full animate-pulse rounded-xl bg-white/[0.04]" />
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 space-y-2">
              <h2 className="text-[20px] font-semibold leading-snug tracking-tight text-white sm:text-[24px]">
                {nextUp.title}
              </h2>
              <p className="max-w-[60ch] text-[13.5px] leading-relaxed text-white">
                {nextUp.verdict}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(nextUp.to)}
              className={cn(
                buttonPrimaryCn,
                'inline-flex shrink-0 items-center justify-center gap-2 px-6 lg:h-12'
              )}
            >
              {nextUp.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

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
                  Keep your match fitness up
                </div>
              )}
              {am2.score !== null ? (
                <p className="mt-1 text-[12px] text-white">
                  Readiness{' '}
                  <span className="font-medium tabular-nums text-white">{am2.score}%</span> ·{' '}
                  {am2.sessionsCount} timed run{am2.sessionsCount === 1 ? '' : 's'}
                </p>
              ) : (
                <p className="mt-1 text-[12px] text-white">
                  Take your first timed run to see your readiness
                </p>
              )}
              {am2.score !== null && (
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      am2Urgent ? 'bg-red-400' : 'bg-elec-yellow'
                    )}
                    style={{ width: `${am2.score}%` }}
                  />
                </div>
              )}
            </div>
            {am2.score !== null && (
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
                  {am2.score}
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
        <HubKpi label="Course" value={isLoading ? '—' : `${stats.progress.overallPercent}%`} />
        <HubKpi
          label="Sign-off"
          value={isLoading ? '—' : `${stats.portfolio.pendingReview}`}
          context="waiting"
        />
      </HubKpiRow>

      {/* Working grid — today's work on the left, standing context on the
          right. Stacks on a phone, where the sidebar simply follows. */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="min-w-0 space-y-8">
          {/* 3b · ON YOUR PLATE — the rest of today's open items */}
          {!heroLoading && plateItems.length > 0 && (
            <HubWorkList
              label="On your plate"
              unit="item"
              items={plateItems.map(({ id, label, to, count, urgent }) => ({
                id,
                title: label,
                reason: PLATE_REASON[id] ?? '',
                trailing: count != null && count > 0 ? `${count}` : undefined,
                urgent,
                to,
              }))}
            />
          )}

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
                    Goals &amp; quizzes from your tutor
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

      <WeeklyRecapSheet open={showRecap} onClose={dismissRecap} recap={recap} />
    </HubSubPage>
  );
}
