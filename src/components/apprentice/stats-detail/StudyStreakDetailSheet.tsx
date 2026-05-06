/**
 * StudyStreakDetailSheet
 *
 * Editorial detail sheet for the study streak stat tile.
 *
 * Layout: header → editorial hero with streak number + subtitle → KPI strip
 * → milestones → last-7-days + best day → activity heatmap → insight → recs.
 *
 * Drops the centered flame-in-circle hero for the same editorial pattern
 * used across Portfolio / OJT Hub / Diary.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  Flame,
  Trophy,
  BookOpen,
  Clock,
  ChevronRight,
  Brain,
  Star,
  RotateCcw,
  Layers,
  ClipboardCheck,
  ArrowRight,
  PenLine,
  TrendingUp,
  Target,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStreakInsights } from '@/hooks/apprentice-stats/useStreakInsights';
import { useSmartRecommendations } from '@/hooks/useSmartRecommendations';
import { ActivityGrid } from './ActivityGrid';
import { RecommendationCard, type RecommendationVariant } from './RecommendationCard';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface StudyStreakDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const smartIconMap: Record<string, LucideIcon> = {
  RotateCcw,
  Layers,
  ClipboardCheck,
  ArrowRight,
  PenLine,
  Clock,
  TrendingUp,
  Target,
  Brain,
  BookOpen,
  Flame,
  Star,
};

const smartVariantMap: Record<string, RecommendationVariant> = {
  'spaced-rep': 'orange',
  flashcard: 'yellow',
  quiz: 'green',
  diary: 'purple',
  ojt: 'blue',
  portfolio: 'blue',
  general: 'orange',
};

export function StudyStreakDetailSheet({ open, onOpenChange }: StudyStreakDetailSheetProps) {
  const navigate = useNavigate();

  const goToStudyCentre = () => {
    navigate('/study-centre/apprentice');
    setTimeout(() => onOpenChange(false), 50);
  };

  const { recommendations: smartRecs } = useSmartRecommendations(4);

  const {
    currentStreak,
    longestStreak,
    totalSessions,
    totalCardsReviewed,
    studiedToday,
    lastStudiedText,
    activityMap,
    daysStudiedLast7,
    bestStudyDay,
    milestones,
    nextMilestone,
    insightText,
    recommendations,
  } = useStreakInsights();

  const subtitleParts: string[] = [];
  if (studiedToday) subtitleParts.push('Studied today');
  else if (currentStreak > 0) subtitleParts.push(`Last studied ${lastStudiedText}`);
  else if (lastStudiedText) subtitleParts.push(`Last studied ${lastStudiedText}`);
  if (longestStreak > currentStreak)
    subtitleParts.push(`Personal best ${longestStreak}d`);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[85vh] p-0 rounded-t-3xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>
            <SheetTitle className="sr-only">Study streak detail</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-2 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white/70" />
            </button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-2 pb-10 space-y-7 sm:space-y-8">
            {/* ── Editorial hero ──────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-2 pt-1"
            >
              <div className="flex items-center gap-2">
                <Eyebrow>Study streak</Eyebrow>
                {studiedToday && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
                    <Flame className="h-3 w-3" />
                    Active today
                  </span>
                )}
              </div>
              <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold tracking-tight text-white leading-[1.05]">
                {currentStreak === 0 ? (
                  'No streak — yet'
                ) : (
                  <>
                    <span className="font-mono tabular-nums">{currentStreak}</span>{' '}
                    day{currentStreak === 1 ? '' : 's'} on the trot
                  </>
                )}
              </h2>
              {subtitleParts.length > 0 && (
                <p className="text-[13.5px] text-white/70 leading-relaxed">
                  {subtitleParts.join(' · ')}
                </p>
              )}
              <button
                onClick={goToStudyCentre}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation mt-1"
              >
                <BookOpen className="h-4 w-4" />
                Study Centre
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.section>

            {/* ── KPI strip ───────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              <KpiCell
                label="Current"
                value={currentStreak}
                sub={currentStreak === 0 ? 'Start today' : 'Days in a row'}
                highlight={currentStreak > 0}
              />
              <KpiCell
                label="Longest"
                value={longestStreak}
                sub="Personal best"
                icon={Trophy}
              />
              <KpiCell
                label="Sessions"
                value={totalSessions}
                sub="Lifetime"
                icon={BookOpen}
              />
              <KpiCell
                label="Cards"
                value={totalCardsReviewed}
                sub="Reviewed"
                icon={Brain}
              />
            </div>

            {/* ── Milestones ──────────────────────────────────────── */}
            <section className="space-y-3">
              <SectionHeader
                eyebrow="Milestones"
                title={
                  nextMilestone
                    ? `Next: ${nextMilestone.label}`
                    : 'All unlocked'
                }
                meta={
                  nextMilestone
                    ? `${nextMilestone.days - currentStreak} more day${nextMilestone.days - currentStreak === 1 ? '' : 's'} to go`
                    : 'Legendary streaker'
                }
                action={
                  nextMilestone && (
                    <span className="text-[18px]">{nextMilestone.emoji}</span>
                  )
                }
              />
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.days}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, delay: 0.05 * i }}
                    className={cn(
                      'flex flex-col items-center gap-1 py-2.5 rounded-lg border transition-all',
                      m.unlocked
                        ? 'border-elec-yellow/25 bg-elec-yellow/[0.06]'
                        : 'border-white/[0.06] bg-white/[0.02] opacity-50'
                    )}
                  >
                    <span className="text-[16px] sm:text-[18px]">{m.emoji}</span>
                    <span
                      className={cn(
                        'text-[9.5px] font-medium uppercase tracking-[0.12em]',
                        m.unlocked ? 'text-elec-yellow' : 'text-white/55'
                      )}
                    >
                      {m.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Last 7 days + best day ──────────────────────────── */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <Eyebrow>Last 7 days</Eyebrow>
                  <span className="text-[12px] font-mono text-white/85 tabular-nums">
                    {daysStudiedLast7} / 7
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-8">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className={cn(
                        'h-full flex-1 rounded-sm origin-bottom',
                        i < daysStudiedLast7 ? 'bg-elec-yellow' : 'bg-white/[0.06]'
                      )}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-white/55 block leading-snug">
                  {daysStudiedLast7 >= 5
                    ? 'Strong consistency'
                    : daysStudiedLast7 >= 3
                      ? 'Decent rhythm'
                      : 'Build the cadence'}
                </span>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-1.5">
                <Eyebrow>Best day</Eyebrow>
                <p className="text-[22px] sm:text-[24px] font-semibold tracking-tight text-white leading-none">
                  {bestStudyDay || '—'}
                </p>
                <span className="text-[11px] text-white/55 block leading-snug">
                  {bestStudyDay
                    ? 'Your most consistent day of the week'
                    : 'Need more sessions to surface'}
                </span>
              </div>
            </section>

            {/* ── Activity heatmap ────────────────────────────────── */}
            <section className="space-y-3">
              <SectionHeader
                eyebrow="Activity"
                title="Last 90 days"
                meta="Quizzes · flashcards · diary · OJT all roll up here"
              />
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
                <ActivityGrid activityMap={activityMap} variant="yellow" />
              </div>
            </section>

            {/* ── Insight ─────────────────────────────────────────── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5"
              >
                <Eyebrow className="text-elec-yellow/85">Insight</Eyebrow>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  {insightText}
                </p>
              </motion.div>
            )}

            {/* ── Empty state ─────────────────────────────────────── */}
            {currentStreak === 0 && !studiedToday && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-7 text-center space-y-3">
                <Eyebrow>No streak yet</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed max-w-[300px] mx-auto">
                  A streak builds the moment you take a quiz, review a flashcard
                  set, or log a diary entry. Five minutes is enough.
                </p>
                <button
                  onClick={goToStudyCentre}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Start now
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ── Recommendations ─────────────────────────────────── */}
            {(smartRecs.length > 0 || recommendations.length > 0) && (
              <section className="space-y-3">
                <SectionHeader eyebrow="What to do next" title="Smart suggestions" />
                <div className="space-y-2.5">
                  {smartRecs.length > 0
                    ? smartRecs.map((rec) => {
                        const Icon = smartIconMap[rec.icon] || BookOpen;
                        const variant = smartVariantMap[rec.type] || 'orange';
                        return (
                          <RecommendationCard
                            key={rec.id}
                            icon={Icon}
                            title={rec.title}
                            description={rec.description}
                            actionLabel={rec.actionLabel}
                            actionPath={rec.actionPath}
                            variant={variant}
                            onClose={() => onOpenChange(false)}
                          />
                        );
                      })
                    : recommendations.map((rec) => (
                        <RecommendationCard
                          key={rec.id}
                          icon={
                            rec.id === 'study-today'
                              ? Flame
                              : rec.id === 'due-cards'
                                ? Brain
                                : rec.id === 'milestone-chase'
                                  ? Star
                                  : rec.id === 'weak-category'
                                    ? BookOpen
                                    : Clock
                          }
                          title={rec.title}
                          description={rec.description}
                          actionLabel={rec.actionLabel}
                          actionPath={rec.actionPath}
                          variant="orange"
                          onClose={() => onOpenChange(false)}
                        />
                      ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─────────────────── KPI cell ─────────────────── */

function KpiCell({
  label,
  value,
  sub,
  highlight,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5 sm:p-5 space-y-1.5">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3 text-white/40" />}
        <Eyebrow className="text-[9.5px] sm:text-[10px]">{label}</Eyebrow>
      </div>
      <div
        className={cn(
          'text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none',
          highlight ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </div>
      {sub && (
        <span className="text-[10.5px] sm:text-[11px] text-white/55 block leading-snug">
          {sub}
        </span>
      )}
    </div>
  );
}
