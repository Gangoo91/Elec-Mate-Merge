/**
 * DiaryEntriesDetailSheet
 *
 * Purple-themed 85vh bottom sheet with:
 * - Spring-animated hero icon with glow
 * - Total entries + streak + today indicator
 * - Animated week comparison cards with gradient accents
 * - Average mood with emoji + animated mood trend bars
 * - Most productive day + average entries/week stats
 * - Top sites with animated visit frequency bars
 * - Skill diversity animated gauge + interactive skill pills
 * - Tappable learning highlights
 * - Personalised insight card with decorative blob
 * - Smart recommendations
 * - Empty state CTA
 */

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  GraduationCap,
  Lightbulb,
  BarChart3,
  BookOpen,
  CalendarDays,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryInsights } from '@/hooks/apprentice-stats/useDiaryInsights';
import { RecommendationCard } from './RecommendationCard';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

const moodEmojis: Record<number, string> = {
  1: '\uD83D\uDE22',
  2: '\uD83D\uDE14',
  3: '\uD83D\uDE10',
  4: '\uD83D\uDE42',
  5: '\uD83D\uDE0A',
};

function moodBg(mood: number): string {
  if (mood >= 4) return 'bg-green-500';
  if (mood === 3) return 'bg-amber-500';
  return 'bg-red-500';
}

function moodLabel(mood: number): string {
  if (mood >= 4.5) return 'Great';
  if (mood >= 3.5) return 'Good';
  if (mood >= 2.5) return 'Okay';
  if (mood >= 1.5) return 'Low';
  return 'Tough';
}

const skillColours: Record<string, string> = {
  'Practical Skills': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Health & Safety': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Testing & Inspection': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Wiring & Containment': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Regulations': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Tools & Equipment': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Communication': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'Problem Solving': 'bg-green-500/20 text-green-300 border-green-500/30',
};

interface DiaryEntriesDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: SiteDiaryEntry[];
}

export function DiaryEntriesDetailSheet({ open, onOpenChange, entries }: DiaryEntriesDetailSheetProps) {
  const navigate = useNavigate();

  const goToDiary = () => {
    navigate('/apprentice/site-diary');
    setTimeout(() => onOpenChange(false), 50);
  };

  const {
    totalEntries,
    weekComparison,
    moodTrend,
    averageMood,
    moodDeclining,
    mostProductiveDay,
    topSites,
    uniqueSitesCount,
    skillFrequency,
    skillDiversityPercent,
    learningHighlights,
    hasEntryToday,
    diaryStreak,
    avgEntriesPerWeek,
    firstEntryDate,
    insightText,
    recommendations,
  } = useDiaryInsights(entries);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetTitle className="sr-only">Diary Entries Details</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-1.5 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
            >
              <ChevronDown className="h-5 w-5 text-white/60" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
            {/* ── Hero: total entries with spring animation ── */}
            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-2xl scale-110" />
                <div className="relative w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center ring-2 ring-purple-500/30">
                  <Calendar className="h-12 w-12 text-purple-400" />
                </div>
              </motion.div>
              <div className="mt-3 flex items-baseline">
                <AnimatedCounter
                  value={totalEntries}
                  className="text-5xl font-bold text-purple-400"
                />
                <span className="text-xl text-purple-400/80 ml-1.5">entr{totalEntries !== 1 ? 'ies' : 'y'}</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mt-2"
              >
                {hasEntryToday ? (
                  <span className="text-sm text-green-400 font-medium">Logged today</span>
                ) : (
                  <span className="text-sm text-white/50">No entry today</span>
                )}
                {diaryStreak > 1 && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-sm text-purple-400 font-medium">{diaryStreak}-day streak</span>
                  </>
                )}
              </motion.div>
              {firstEntryDate && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-white/40 mt-1.5"
                >
                  Recording since {firstEntryDate}
                </motion.p>
              )}
            </div>

            {/* ── This week vs last week with gradient accents ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-3"
            >
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.08] p-3.5 text-center">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-400/40 to-purple-500/0" />
                <p className="text-xs text-white/50 mb-1 font-medium">This week</p>
                <p className="text-xl font-bold text-white">{weekComparison.thisWeek}</p>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.08] p-3.5 text-center">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-300/30 to-purple-500/0" />
                <p className="text-xs text-white/50 mb-1 font-medium">Last week</p>
                <p className="text-xl font-bold text-white">{weekComparison.lastWeek}</p>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.08] p-3.5 text-center">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-300/30 to-purple-500/0" />
                <p className="text-xs text-white/50 mb-1 font-medium">Change</p>
                <div className="flex items-center justify-center gap-1">
                  {weekComparison.delta > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : weekComparison.delta < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/50" />
                  )}
                  <p className={cn(
                    'text-xl font-bold',
                    weekComparison.delta > 0 ? 'text-green-400' : weekComparison.delta < 0 ? 'text-red-400' : 'text-white/50'
                  )}>
                    {weekComparison.delta > 0 ? '+' : ''}{weekComparison.delta}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Mood + stats row ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex gap-3"
            >
              {/* Average mood */}
              {averageMood !== null && (
                <div className="flex-1 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-purple-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Avg Mood</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{moodEmojis[Math.round(averageMood)]}</span>
                    <div>
                      <p className="text-lg font-bold text-white">{averageMood}</p>
                      <p className={cn(
                        'text-xs font-semibold',
                        averageMood >= 4 ? 'text-green-400' : averageMood >= 3 ? 'text-amber-400' : 'text-red-400'
                      )}>
                        {moodLabel(averageMood)}
                        {moodDeclining && ' (declining)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick stats */}
              <div className="flex-1 rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Stats</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Per week</span>
                    <span className="text-sm font-bold text-white">{avgEntriesPerWeek}</span>
                  </div>
                  {mostProductiveDay && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Best day</span>
                      <span className="text-sm font-bold text-white">{mostProductiveDay}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Sites</span>
                    <span className="text-sm font-bold text-white">{uniqueSitesCount}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Mood trend with animated bars ── */}
            {moodTrend.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">Mood Trend</span>
                  <span className="text-xs text-white/50 ml-auto">Last {moodTrend.length} entries</span>
                </div>
                <div className="flex items-end gap-2.5 justify-center px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.08]">
                  {moodTrend.map((m, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(m.mood * 10, 16)}px` }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 + i * 0.05 }}
                        className={cn('w-full max-w-[32px] rounded-lg flex items-center justify-center', moodBg(m.mood))}
                      />
                      <span className="text-sm">{moodEmojis[m.mood]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Top sites with animated bars ── */}
            {topSites.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">Top Sites</span>
                  <span className="text-xs text-white/50 ml-auto">{uniqueSitesCount} total</span>
                </div>
                <div className="space-y-2.5">
                  {topSites.map((site, i) => {
                    const maxCount = topSites[0]?.count || 1;
                    const barWidth = Math.round((site.count / maxCount) * 100);
                    return (
                      <div key={site.name} className="flex items-center gap-3">
                        <span className="text-xs text-purple-400 w-5 text-right font-bold">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white font-medium truncate">{site.name}</span>
                            <span className="text-xs text-purple-400 font-semibold flex-shrink-0 ml-2">
                              {site.count}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${barWidth}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 + i * 0.08 }}
                              className="h-full rounded-full bg-purple-400"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Skill diversity + frequency with animated gauge ── */}
            {skillFrequency.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">Skills Practised</span>
                  <span className="text-xs text-white/50 ml-auto">
                    {skillDiversityPercent}% diversity
                  </span>
                </div>
                {/* Diversity gauge */}
                <div className="mb-4">
                  <div className="h-3 rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skillDiversityPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      className={cn(
                        'h-full rounded-full',
                        skillDiversityPercent >= 75 ? 'bg-green-400' : skillDiversityPercent >= 40 ? 'bg-purple-400' : 'bg-white/25'
                      )}
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-1.5">
                    {skillFrequency.length} of 8 skill categories logged
                  </p>
                </div>
                {/* Interactive skill pills */}
                <div className="flex flex-wrap gap-2">
                  {skillFrequency.map(({ skill, count }) => (
                    <button
                      key={skill}
                      onClick={goToDiary}
                      className={cn(
                        'px-3 py-1.5 rounded-xl text-xs font-semibold border',
                        'touch-manipulation active:scale-95 transition-all',
                        skillColours[skill] || 'bg-white/10 text-white/70 border-white/15'
                      )}
                    >
                      {skill} ({count})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Learning highlights (tappable) ── */}
            {learningHighlights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">What You Learned</span>
                </div>
                <div className="space-y-2.5">
                  {learningHighlights.map((h, i) => (
                    <button
                      key={i}
                      onClick={goToDiary}
                      className="w-full text-left rounded-xl bg-white/[0.05] border border-white/[0.08] p-4 touch-manipulation active:scale-[0.98] active:bg-white/[0.08] transition-all"
                    >
                      <p className="text-sm text-white/80 leading-relaxed">{h.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-purple-400 font-medium">{h.site}</span>
                        <span className="text-white/20">·</span>
                        <span className="text-xs text-white/40">{h.date}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Personalised insight with decorative blob ── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative rounded-2xl overflow-hidden bg-purple-500/[0.08] border border-purple-500/20 p-4"
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/15 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{insightText}</p>
                </div>
              </motion.div>
            )}

            {/* ── Empty state CTA ── */}
            {totalEntries === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Start your diary</h3>
                <p className="text-sm text-white/50 max-w-[260px] mb-5">
                  Record what you learn on site each day to track your apprenticeship progress
                </p>
                <button
                  onClick={goToDiary}
                  className="flex items-center gap-2 px-6 h-12 rounded-xl bg-purple-500 text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Create first entry
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* ── Recommendations ── */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
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
                      icon={rec.id === 'log-today' ? Calendar : rec.id === 'mood-check' ? Heart : rec.id === 'keep-up' ? TrendingUp : GraduationCap}
                      title={rec.title}
                      description={rec.description}
                      actionLabel={rec.actionLabel}
                      actionPath={rec.actionPath}
                      variant="purple"
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
