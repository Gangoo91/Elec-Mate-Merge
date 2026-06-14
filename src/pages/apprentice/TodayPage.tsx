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
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
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
  const { recap, show: showRecap, dismiss: dismissRecap } = useWeeklyRecap(
    user?.id ?? null,
    streak
  );

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
        label: notStartedQuizzes.length === 1 ? 'New quiz from your tutor' : 'New quizzes from your tutor',
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
      icon: Clock,
      onClick: () => navigate('/apprentice/ojt-hub'),
    },
    {
      label: 'Capture evidence',
      icon: Camera,
      onClick: () => window.dispatchEvent(new CustomEvent('elecmate:open-capture')),
    },
    {
      label: 'Continue course',
      icon: BookOpen,
      onClick: () => navigate(continuePath),
    },
    // When the learner has missed questions banked, this becomes their
    // personal weak-spot session instead of a generic quiz pointer.
    missedCount > 0
      ? {
          label: 'Quick revision',
          icon: ClipboardList,
          onClick: () => navigate('/apprentice/revision'),
        }
      : {
          label: 'Quick quiz',
          icon: ClipboardList,
          onClick: () => navigate(hasCollegeLink ? '/apprentice/college-plan' : '/study-centre'),
        },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      {/* House masthead — Today is the tab-bar home, but the rest of the
          apprentice world lives off /apprentice; without this there was no
          route back to the dashboard. */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex items-center h-12 gap-4">
            <button
              type="button"
              onClick={() => navigate('/apprentice')}
              className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
            >
              ← Back
            </button>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Apprentice · Today
            </span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="px-4 pt-6 pb-28 max-w-2xl mx-auto space-y-6"
      >
        {/* 1 · Greeting */}
        <header className="space-y-1">
          <p className="text-[13px] text-white/55">{eyebrow}</p>
          <h1 className="text-[24px] font-semibold tracking-tight leading-tight">
            {salutation}, {apprentice.firstName}
          </h1>
        </header>

        {/* 2 · WHAT'S NEXT */}
        <section
          className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden"
          aria-label="What's next"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
          <div className="p-5 space-y-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              What's next
            </span>
            {heroLoading ? (
              <div className="space-y-3" aria-hidden>
                <div className="h-6 w-3/4 rounded bg-white/[0.06] animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-white/[0.05] animate-pulse" />
                <div className="h-11 w-full rounded-xl bg-white/[0.04] animate-pulse" />
              </div>
            ) : (
              <>
                <h2 className="text-[20px] font-semibold tracking-tight leading-snug text-white">
                  {nextUp.title}
                </h2>
                <p className="text-[13px] text-white/60 leading-relaxed">{nextUp.verdict}</p>
                <button
                  type="button"
                  onClick={() => navigate(nextUp.to)}
                  className="w-full h-11 rounded-xl border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow text-[13px] font-medium inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
                >
                  {nextUp.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </section>

        {/* 2b · AM2 milestone — countdown + readiness (only when relevant) */}
        {am2Visible && (
          <section aria-label="AM2 readiness">
            <button
              type="button"
              onClick={() => navigate('/apprentice/am2-simulator')}
              className={cn(
                'group relative w-full text-left bg-[hsl(0_0%_10%)] border rounded-2xl overflow-hidden p-4 touch-manipulation transition-colors',
                am2Urgent
                  ? 'border-red-400/25 hover:bg-red-500/[0.04]'
                  : 'border-white/[0.08] hover:bg-elec-yellow/[0.03]'
              )}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-[0.18em]',
                      am2Urgent ? 'text-red-300/80' : 'text-elec-yellow/80'
                    )}
                  >
                    {am2Counting ? 'Your AM2' : 'AM2 practical'}
                  </span>
                  {am2Counting ? (
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-[22px] font-semibold tracking-tight tabular-nums text-white">
                        {am2DayLabel}
                      </span>
                      <span className="text-[12.5px] text-white/55">to go</span>
                    </div>
                  ) : (
                    <div className="mt-1 text-[15px] font-semibold text-white">
                      Keep your match fitness up
                    </div>
                  )}
                  {am2.score !== null ? (
                    <p className="mt-1 text-[12px] text-white/55">
                      Readiness{' '}
                      <span className="text-white/80 font-medium tabular-nums">{am2.score}%</span> ·{' '}
                      {am2.sessionsCount} timed run{am2.sessionsCount === 1 ? '' : 's'}
                    </p>
                  ) : (
                    <p className="mt-1 text-[12px] text-white/55">
                      Take your first timed run to see your readiness
                    </p>
                  )}
                </div>
                {am2.score !== null && (
                  <div
                    className={cn(
                      'shrink-0 flex flex-col items-center justify-center h-12 w-12 rounded-xl border',
                      am2Urgent
                        ? 'border-red-400/30 bg-red-500/10'
                        : 'border-elec-yellow/25 bg-elec-yellow/[0.07]'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[15px] font-semibold leading-none tabular-nums',
                        am2Urgent ? 'text-red-200' : 'text-elec-yellow'
                      )}
                    >
                      {am2.score}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-white/45 mt-0.5">
                      ready
                    </span>
                  </div>
                )}
                <ArrowRight
                  className={cn(
                    'h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5',
                    am2Urgent ? 'text-red-300/70' : 'text-white/35 group-hover:text-elec-yellow'
                  )}
                />
              </div>
              {am2.score !== null && (
                <div className="mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      am2Urgent ? 'bg-red-400/70' : 'bg-elec-yellow/70'
                    )}
                    style={{ width: `${am2.score}%` }}
                  />
                </div>
              )}
            </button>
          </section>
        )}

        {/* 3 · Stat strip */}
        <section
          className="grid grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
          aria-label="Today's stats"
        >
          {statCells.map((cell) => (
            <div
              key={cell.label}
              className="bg-[hsl(0_0%_10%)] px-2 py-3.5 flex flex-col items-center justify-center gap-1 text-center"
            >
              {isLoading ? (
                <div className="h-5 w-8 rounded bg-white/[0.06] animate-pulse" aria-hidden />
              ) : (
                <span className="text-[18px] font-semibold tabular-nums leading-none text-white">
                  {cell.value}
                </span>
              )}
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/55">
                {cell.label}
              </span>
            </div>
          ))}
        </section>

        {/* 3b · ON YOUR PLATE — the rest of today's open items */}
        {!heroLoading && plateItems.length > 0 && (
          <section className="space-y-3" aria-label="On your plate">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              On your plate
            </span>
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.05]">
              {plateItems.map(({ id, label, icon: Icon, to, count, urgent }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => navigate(to)}
                  className="group w-full flex items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-elec-yellow/[0.04] transition-colors"
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
                      urgent
                        ? 'border-red-400/25 bg-red-500/[0.08]'
                        : 'border-elec-yellow/20 bg-elec-yellow/[0.06]'
                    )}
                  >
                    <Icon
                      className={cn('h-4 w-4', urgent ? 'text-red-300' : 'text-elec-yellow')}
                      strokeWidth={2}
                    />
                  </span>
                  <span className="flex-1 min-w-0 text-[13.5px] font-medium text-white truncate">
                    {label}
                  </span>
                  {count != null && count > 0 && (
                    <span
                      className={cn(
                        'shrink-0 text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded border',
                        urgent
                          ? 'text-red-300 border-red-400/30 bg-red-500/10'
                          : 'text-elec-yellow border-elec-yellow/30 bg-elec-yellow/10'
                      )}
                    >
                      {count}
                    </span>
                  )}
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/35 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 4 · Quick actions */}
        <section className="space-y-3" aria-label="Quick actions">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Quick actions
          </span>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className={cn(
                  'h-[72px] rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)]',
                  'flex flex-col items-center justify-center gap-1.5 touch-manipulation',
                  'hover:bg-elec-yellow/[0.04] active:scale-[0.98] transition-all'
                )}
              >
                <Icon className="h-5 w-5 text-elec-yellow" strokeWidth={2} />
                <span className="text-[12px] font-medium text-white/85">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 4b · NEXT BADGE — the closest locked achievement, live progress */}
        {nextBadge && (
          <section aria-label="Next achievement">
            <button
              type="button"
              onClick={() => navigate('/apprentice/hub?tab=progress')}
              className="group w-full flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3.5 text-left touch-manipulation hover:bg-elec-yellow/[0.04] transition-colors"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.06]">
                <Trophy className="h-4 w-4 text-elec-yellow" strokeWidth={2} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-[13.5px] font-medium text-white truncate">
                    {nextBadge.title}
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-white/55 shrink-0">
                    {nextBadge.current}/{nextBadge.target}
                  </span>
                </span>
                <span className="mt-1.5 block h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-elec-yellow transition-all"
                    style={{ width: `${nextBadge.pct}%` }}
                  />
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/35 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all" />
            </button>
          </section>
        )}

        {/* 5 · FROM YOUR COLLEGE — college-linked apprentices only */}
        {hasCollegeLink && (
          <section aria-label="From your college">
            <button
              type="button"
              onClick={() => navigate('/apprentice/college-plan')}
              className="group w-full flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3.5 text-left touch-manipulation hover:bg-elec-yellow/[0.04] transition-colors"
            >
              <GraduationCap className="h-5 w-5 shrink-0 text-elec-yellow" strokeWidth={2} />
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  From your college
                </span>
                <span className="block text-[13.5px] font-medium text-white truncate">
                  Goals &amp; quizzes from your tutor
                </span>
              </span>
              {overdueQuizzes.length > 0 ? (
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-400/30 bg-red-500/10 px-1.5 py-0.5 rounded shrink-0">
                  {overdueQuizzes.length} overdue
                </span>
              ) : newCount > 0 ? (
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/10 px-1.5 py-0.5 rounded shrink-0">
                  {newCount} new
                </span>
              ) : null}
              <ArrowRight className="h-4 w-4 shrink-0 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </section>
        )}

        {/* 6 · Quiet wellbeing footer */}
        <button
          type="button"
          onClick={() => navigate('/apprentice/mental-health')}
          className="w-full h-11 flex items-center justify-center gap-2 text-[12px] text-white/45 hover:text-white/70 touch-manipulation transition-colors"
        >
          <HeartHandshake className="h-4 w-4" />
          Struggling or need to talk?
        </button>
      </motion.div>

      <WeeklyRecapSheet open={showRecap} onClose={dismissRecap} recap={recap} />
    </div>
  );
}
