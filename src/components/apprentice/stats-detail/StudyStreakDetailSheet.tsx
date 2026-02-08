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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStreakInsights } from '@/hooks/apprentice-stats/useStreakInsights';
import { ActivityGrid } from './ActivityGrid';
import { RecommendationCard } from './RecommendationCard';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

interface StudyStreakDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudyStreakDetailSheet({ open, onOpenChange }: StudyStreakDetailSheetProps) {
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
              <ChevronDown className="h-5 w-5 text-white/60" />
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
                <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-2xl scale-110" />
                <div className="relative w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center ring-2 ring-orange-500/30">
                  <Flame className="h-12 w-12 text-orange-400" />
                </div>
                {studiedToday && (
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center ring-2 ring-[hsl(240,5.9%,10%)]">
                    <Zap className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </motion.div>
              <div className="mt-3">
                <AnimatedCounter
                  value={currentStreak}
                  className="text-5xl font-bold text-orange-400"
                />
                <span className="text-xl text-orange-400/80 ml-1.5">day{currentStreak !== 1 ? 's' : ''}</span>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white/70 mt-1.5"
              >
                {studiedToday ? 'Studied today' : `Last studied: ${lastStudiedText}`}
              </motion.p>
            </div>

            {/* ── Milestone badges (staggered) ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-white/50" />
                <span className="text-sm font-semibold text-white">Milestones</span>
                {nextMilestone && (
                  <span className="text-xs text-orange-400 ml-auto">
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
                        ? 'bg-orange-500/15 border-orange-500/25'
                        : 'bg-white/[0.03] border-white/[0.06] opacity-40'
                    )}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <span className={cn('text-[10px] font-semibold', m.unlocked ? 'text-orange-400' : 'text-white/40')}>
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
                <div key={stat.label} className="relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.08] p-3.5 text-center">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-400/40 to-orange-500/0" />
                  <stat.icon className="h-5 w-5 text-orange-400 mx-auto mb-1.5" />
                  <div className="flex items-baseline justify-center">
                    <AnimatedCounter value={stat.value} className="text-xl font-bold text-white" />
                    {stat.suffix && <span className="text-xs text-white/50 ml-0.5">{stat.suffix}</span>}
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
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
              <div className="flex-1 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="h-4 w-4 text-orange-400" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Last 7 days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                      className={cn(
                        'h-3 flex-1 rounded-full origin-bottom',
                        i < daysStudiedLast7 ? 'bg-orange-400' : 'bg-white/[0.08]'
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/80 mt-2">
                  <span className="font-bold text-white">{daysStudiedLast7}</span> of 7 days active
                </p>
              </div>
              {bestStudyDay && (
                <div className="flex-1 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-orange-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Best day</span>
                  </div>
                  <p className="text-lg font-bold text-white">{bestStudyDay}</p>
                  <p className="text-xs text-white/60 mt-1">Most active day</p>
                </div>
              )}
            </motion.div>

            {/* ── Activity grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="h-4 w-4 text-white/50" />
                <span className="text-sm font-semibold text-white">Study Activity</span>
              </div>
              <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-4">
                <ActivityGrid activityMap={activityMap} variant="orange" />
              </div>
            </motion.div>

            {/* ── Personalised insight with decorative blob ── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="relative rounded-2xl overflow-hidden bg-orange-500/[0.08] border border-orange-500/20 p-4"
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/15 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-orange-400" />
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{insightText}</p>
                </div>
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
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
                  <Flame className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Start your streak</h3>
                <p className="text-sm text-white/50 max-w-[260px] mb-5">
                  Study flashcards or take a quiz today to begin building your study streak
                </p>
                <button
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-2 px-6 h-12 rounded-xl bg-orange-500 text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Start studying
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* ── Recommendations divider ── */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 pt-1 mb-4">
                  <div className="flex-1 border-t border-white/[0.06]" />
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">What to do next</span>
                  <div className="flex-1 border-t border-white/[0.06]" />
                </div>

                <div className="space-y-3 pb-6">
                  {recommendations.map((rec) => (
                    <RecommendationCard
                      key={rec.id}
                      icon={rec.id === 'study-today' ? Flame : rec.id === 'due-cards' ? Brain : rec.id === 'milestone-chase' ? Star : rec.id === 'weak-category' ? BookOpen : Clock}
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
