/**
 * StudyStreakDetailSheet
 *
 * Orange-themed 85vh bottom sheet with:
 * - Glowing flame hero with spring animation
 * - Staggered milestone badges
 * - Stats row with gradient accents
 * - Animated weekly consistency bars
 * - Real multi-source activity heatmap
 * - Personalised insight card with decorative blob
 * - Prioritised recommendations
 * - Empty state CTA
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  Flame,
  Trophy,
  BookOpen,
  Clock,
  ChevronDown,
  ChevronRight,
  Zap,
  Brain,
  Lightbulb,
  CalendarDays,
  Star,
  RotateCcw,
  Layers,
  ClipboardCheck,
  ArrowRight,
  PenLine,
  TrendingUp,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStreakInsights } from '@/hooks/apprentice-stats/useStreakInsights';
import { useSmartRecommendations } from '@/hooks/useSmartRecommendations';
import { ActivityGrid } from './ActivityGrid';
import { RecommendationCard, type RecommendationVariant } from './RecommendationCard';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

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
    loading,
  } = useStreakInsights();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetTitle className="sr-only">Study Streak Details</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-1.5 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
            {/* ── Hero: big flame + streak number with glow ── */}
            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative"
              >
                <div className="relative w-24 h-24 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                  <Flame className="h-10 w-10 text-elec-yellow" />
                </div>
                {studiedToday && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center ring-2 ring-[hsl(240,5.9%,10%)]">
                    <Zap className="h-3 w-3 text-black" />
                  </div>
                )}
              </motion.div>
              <div className="mt-3">
                <AnimatedCounter
                  value={currentStreak}
                  className="text-5xl font-bold text-elec-yellow"
                />
                <span className="text-xl text-elec-yellow/80 ml-1.5">
                  day{currentStreak !== 1 ? 's' : ''}
                </span>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white mt-1.5"
              >
                {studiedToday ? 'Studied today' : `Last studied: ${lastStudiedText}`}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={goToStudyCentre}
                className="mt-4 flex items-center gap-2 px-6 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
              >
                <BookOpen className="h-4 w-4" />
                Go to Study Centre
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>

            {/* ── Milestone badges (staggered) ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Milestones</span>
                {nextMilestone && (
                  <span className="text-xs text-elec-yellow ml-auto">
                    Next: {nextMilestone.emoji} {nextMilestone.label}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-1.5">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.days}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                    className={cn(
                      'flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl border transition-all',
                      m.unlocked
                        ? 'bg-elec-yellow/[0.06] border-elec-yellow/20'
                        : 'bg-white/[0.02] border-white/[0.06] opacity-40'
                    )}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <span
                      className={cn(
                        'text-[10px] font-semibold',
                        m.unlocked ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {m.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Stats row with gradient accents ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { icon: Trophy, label: 'Longest', value: longestStreak, suffix: ' days' },
                { icon: BookOpen, label: 'Sessions', value: totalSessions, suffix: '' },
                { icon: Brain, label: 'Cards', value: totalCardsReviewed, suffix: '' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-center"
                >
                  <stat.icon className="h-4 w-4 text-white/55 mx-auto mb-1.5" />
                  <div className="flex items-baseline justify-center">
                    <AnimatedCounter value={stat.value} className="text-xl font-bold text-white" />
                    {stat.suffix && (
                      <span className="text-[12px] text-white/55 ml-0.5">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* ── Weekly consistency + best day with animated fill ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex gap-3"
            >
              <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Last 7 days
                </span>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                      className={cn(
                        'h-2 flex-1 rounded-full origin-bottom',
                        i < daysStudiedLast7 ? 'bg-elec-yellow' : 'bg-white/[0.08]'
                      )}
                    />
                  ))}
                </div>
                <p className="text-[13px] text-white/85">
                  <span className="font-bold text-white">{daysStudiedLast7}</span>
                  <span className="text-white/55"> of 7 days active</span>
                </p>
              </div>
              {bestStudyDay && (
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Best day
                  </span>
                  <p className="text-[16px] font-semibold text-white">{bestStudyDay}</p>
                  <p className="text-[12px] text-white/55">Most active day</p>
                </div>
              )}
            </motion.div>

            {/* ── Activity grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-3">
                Study activity
              </span>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <ActivityGrid activityMap={activityMap} variant="yellow" />
              </div>
            </motion.div>

            {/* ── Personalised insight with decorative blob ── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Insight
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{insightText}</p>
              </motion.div>
            )}

            {/* ── Empty state when no streak and not studied today ── */}
            {currentStreak === 0 && !studiedToday && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-4">
                  <Flame className="h-7 w-7 text-elec-yellow" />
                </div>
                <h3 className="text-[16px] font-semibold text-white mb-1">Start your streak</h3>
                <p className="text-[14px] text-white/70 max-w-[260px] mb-5 leading-relaxed">
                  Study flashcards or take a quiz today to begin building your study streak
                </p>
                <button
                  onClick={goToStudyCentre}
                  className="flex items-center gap-2 px-6 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Start studying
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* ── Smart recommendations ── */}
            {(smartRecs.length > 0 || recommendations.length > 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 pt-1 mb-4">
                  <div className="flex-1 border-t border-white/[0.06]" />
                  <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
                    What to do next
                  </span>
                  <div className="flex-1 border-t border-white/[0.06]" />
                </div>

                <div className="space-y-3 pb-6">
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
              </motion.div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
