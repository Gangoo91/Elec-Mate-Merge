/**
 * ProgressDetailSheet
 *
 * Green-themed 85vh bottom sheet with:
 * - XP ring hero with level + daily goal progress
 * - Overall progress from unified 6-factor formula
 * - Quiz performance bars with trend indicators + navigation
 * - Strongest/weakest category highlights
 * - Flashcard mastery with animated bars
 * - OJT hours animated progress
 * - Personalised insight card with decorative blob
 * - Smart cross-feature recommendations
 * - Go to Study Centre CTA
 * - Empty state CTA
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  Target,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  Brain,
  AlertCircle,
  RotateCcw,
  Layers,
  ClipboardCheck,
  ArrowRight,
  PenLine,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUnifiedProgress, type QuizTrend } from '@/hooks/useUnifiedProgress';
import { useSmartRecommendations, type SmartRecommendation } from '@/hooks/useSmartRecommendations';
import { XPProgressRing } from '@/components/apprentice/XPProgressRing';
import { RecommendationCard } from './RecommendationCard';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import type { LucideIcon } from 'lucide-react';

interface ProgressDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const trendIcons: Record<QuizTrend, LucideIcon> = {
  improving: TrendingUp,
  declining: TrendingDown,
  stable: Minus,
  'no-data': Minus,
};

const trendColours: Record<QuizTrend, string> = {
  improving: 'text-elec-yellow',
  declining: 'text-red-300',
  stable: 'text-white/55',
  'no-data': 'text-white/55',
};

const trendLabels: Record<QuizTrend, string> = {
  improving: 'Improving',
  declining: 'Needs attention',
  stable: 'Stable',
  'no-data': '',
};

/** Map smart recommendation icon strings to Lucide components */
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
};

function getSmartIcon(rec: SmartRecommendation): LucideIcon {
  return smartIconMap[rec.icon] || BookOpen;
}

/** Map smart recommendation type to card variant colour */
function getSmartVariant(
  rec: SmartRecommendation
): 'green' | 'orange' | 'purple' | 'yellow' | 'blue' {
  switch (rec.type) {
    case 'spaced-rep':
      return 'orange';
    case 'flashcard':
      return 'yellow';
    case 'quiz':
      return 'green';
    case 'diary':
      return 'purple';
    case 'ojt':
      return 'blue';
    case 'portfolio':
      return 'yellow';
    default:
      return 'green';
  }
}

export function ProgressDetailSheet({ open, onOpenChange }: ProgressDetailSheetProps) {
  const navigate = useNavigate();

  const goToStudyCentre = () => {
    navigate('/study-centre/apprentice');
    setTimeout(() => onOpenChange(false), 50);
  };

  const {
    overallPercent,
    quizCategories,
    quizStats,
    quizTrend,
    strongestCategory,
    weakestCategory,
    daysSinceLastQuiz,
    flashcardInsights,
    totalMasteredCards,
    totalFlashcards,
    ojtHours,
    insightText,
    xp,
    loading,
  } = useUnifiedProgress();

  const { recommendations: smartRecs } = useSmartRecommendations(4);

  const quizBarColours: Record<string, string> = {
    Regulations: 'bg-elec-yellow',
    Safety: 'bg-elec-yellow',
    Testing: 'bg-elec-yellow',
    Design: 'bg-elec-yellow',
  };

  const TrendIcon = trendIcons[quizTrend];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetTitle className="sr-only">Progress Details</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-1.5 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
            {/* ── Hero: XP ring + overall progress ── */}
            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <div className="relative">
                <XPProgressRing
                  xpToday={xp.xpToday}
                  dailyGoal={xp.dailyGoal}
                  level={xp.level}
                  levelTitle={xp.levelTitle}
                  totalXP={xp.totalXP}
                  size={140}
                  showLevel
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-3 flex items-center gap-3"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.06]">
                  <span className="text-[12px] font-bold text-elec-yellow">{overallPercent}%</span>
                  <span className="text-[12px] text-elec-yellow/70">overall</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03]">
                  <span className="text-[12px] text-white/85">
                    {xp.xpToday}/{xp.dailyGoal} XP today
                  </span>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-white mt-2"
              >
                Quizzes · Flashcards · OJT · Portfolio · Streak · EPA
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

            {/* ── Quiz Performance with trend ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Quiz Performance</span>
                <div className="flex items-center gap-1.5 ml-auto">
                  {quizTrend !== 'no-data' && (
                    <>
                      <TrendIcon className={cn('h-3.5 w-3.5', trendColours[quizTrend])} />
                      <span className={cn('text-xs font-medium', trendColours[quizTrend])}>
                        {trendLabels[quizTrend]}
                      </span>
                    </>
                  )}
                  {quizStats.totalQuizzes > 0 && quizTrend === 'no-data' && (
                    <span className="text-xs text-white">
                      {quizStats.totalQuizzes} quiz{quizStats.totalQuizzes !== 1 ? 'zes' : ''}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3.5">
                {quizCategories.map((cat, catIndex) => (
                  <div key={cat.subject}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={goToStudyCentre}
                          className="text-sm text-white font-medium touch-manipulation active:text-elec-yellow transition-colors"
                        >
                          {cat.subject}
                        </button>
                        {strongestCategory?.subject === cat.subject && cat.score > 0 && (
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                            Best
                          </span>
                        )}
                        {weakestCategory?.subject === cat.subject && cat.score > 0 && (
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                            Focus
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-white">{cat.score}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/[0.08] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + catIndex * 0.1 }}
                        className={cn(
                          'h-full rounded-full',
                          quizBarColours[cat.subject] || 'bg-white/30'
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {daysSinceLastQuiz !== null && daysSinceLastQuiz >= 7 && (
                <div className="flex items-center gap-2 mt-4 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <AlertCircle className="h-4 w-4 text-white/55 flex-shrink-0" />
                  <span className="text-[13px] text-white/85">
                    Last quiz was {daysSinceLastQuiz} days ago
                  </span>
                </div>
              )}
            </motion.div>

            {/* ── Flashcard Mastery ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">Flashcard Mastery</span>
                <span className="text-xs text-white ml-auto">
                  {totalMasteredCards} / {totalFlashcards} mastered
                </span>
              </div>
              <div className="space-y-3">
                {flashcardInsights.map((set, setIndex) => (
                  <div key={set.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{set.title}</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <div className="w-24 h-2.5 rounded-full bg-white/[0.08] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${set.progressPercent}%` }}
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: 0.4 + setIndex * 0.08,
                          }}
                          className={cn(
                            'h-full rounded-full',
                            set.progressPercent >= 80
                              ? 'bg-elec-yellow'
                              : set.progressPercent >= 40
                                ? 'bg-elec-yellow/60'
                                : 'bg-white/25'
                          )}
                        />
                      </div>
                      <span className="text-xs font-bold text-white w-9 text-right">
                        {set.progressPercent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── OJT Hours ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">On-the-Job Hours</span>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-baseline justify-between mb-2.5">
                  <div className="flex items-baseline gap-1.5">
                    <AnimatedCounter
                      value={ojtHours.logged}
                      className="text-2xl font-bold text-white"
                    />
                    <span className="text-sm text-white">
                      / {ojtHours.target.toLocaleString('en-GB')} hrs
                    </span>
                  </div>
                  <span className="text-sm font-bold text-elec-yellow">
                    {ojtHours.percentComplete}%
                  </span>
                </div>
                <div className="h-3.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(ojtHours.percentComplete, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                    className="h-full rounded-full bg-elec-yellow"
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Personalised insight ── */}
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

            {/* ── Empty state CTA ── */}
            {overallPercent === 0 && quizCategories.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-4">
                  <Target className="h-7 w-7 text-elec-yellow" />
                </div>
                <h3 className="text-[16px] font-semibold text-white mb-1">Start learning</h3>
                <p className="text-[14px] text-white/70 max-w-[260px] mb-5 leading-relaxed">
                  Take a quiz, review flashcards, or log your on-the-job hours to track your
                  progress
                </p>
                <button
                  onClick={goToStudyCentre}
                  className="flex items-center gap-2 px-6 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Go to Study Centre
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* ── Smart Recommendations ── */}
            {smartRecs.length > 0 && (
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
                  {smartRecs.map((rec) => (
                    <RecommendationCard
                      key={rec.id}
                      icon={getSmartIcon(rec)}
                      title={rec.title}
                      description={rec.description}
                      actionLabel={rec.actionLabel}
                      actionPath={rec.actionPath}
                      variant={getSmartVariant(rec)}
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
