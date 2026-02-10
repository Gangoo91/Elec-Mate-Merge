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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
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
  improving: 'text-green-400',
  declining: 'text-red-400',
  stable: 'text-white/50',
  'no-data': 'text-white/30',
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
function getSmartVariant(rec: SmartRecommendation): 'green' | 'orange' | 'purple' | 'yellow' | 'blue' {
  switch (rec.type) {
    case 'spaced-rep': return 'orange';
    case 'flashcard': return 'yellow';
    case 'quiz': return 'green';
    case 'diary': return 'purple';
    case 'ojt': return 'blue';
    case 'portfolio': return 'yellow';
    default: return 'green';
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
    'Regulations': 'bg-green-500',
    'Safety': 'bg-blue-500',
    'Testing': 'bg-orange-500',
    'Design': 'bg-purple-500',
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
              <ChevronDown className="h-5 w-5 text-white/60" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
            {/* ── Hero: XP ring + overall progress ── */}
            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/15 rounded-full blur-2xl scale-125" />
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
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/25">
                  <Target className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-sm font-bold text-green-400">{overallPercent}%</span>
                  <span className="text-xs text-green-400/70">overall</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08]">
                  <span className="text-xs text-white/50">{xp.xpToday}/{xp.dailyGoal} XP today</span>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-white/50 mt-2"
              >
                Quizzes · Flashcards · OJT · Portfolio · Streak · EPA
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={goToStudyCentre}
                className="mt-4 flex items-center gap-2 px-6 h-12 rounded-xl bg-green-500 text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all shadow-lg shadow-green-500/20"
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
                <Target className="h-4 w-4 text-white/50" />
                <span className="text-sm font-semibold text-white">
                  Quiz Performance
                </span>
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
                    <span className="text-xs text-white/40">
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
                          className="text-sm text-white/80 font-medium touch-manipulation active:text-green-400 transition-colors"
                        >
                          {cat.subject}
                        </button>
                        {strongestCategory?.subject === cat.subject && cat.score > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-semibold">Best</span>
                        )}
                        {weakestCategory?.subject === cat.subject && cat.score > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold">Focus</span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-white">{cat.score}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/[0.08] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + catIndex * 0.1 }}
                        className={cn('h-full rounded-full', quizBarColours[cat.subject] || 'bg-white/30')}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {daysSinceLastQuiz !== null && daysSinceLastQuiz >= 7 && (
                <div className="flex items-center gap-2 mt-4 px-4 py-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/20">
                  <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-amber-300">
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
                <BookOpen className="h-4 w-4 text-white/50" />
                <span className="text-sm font-semibold text-white">
                  Flashcard Mastery
                </span>
                <span className="text-xs text-white/50 ml-auto">
                  {totalMasteredCards} / {totalFlashcards} mastered
                </span>
              </div>
              <div className="space-y-3">
                {flashcardInsights.map((set, setIndex) => (
                  <div key={set.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80">{set.title}</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <div className="w-24 h-2.5 rounded-full bg-white/[0.08] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${set.progressPercent}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 + setIndex * 0.08 }}
                          className={cn(
                            'h-full rounded-full',
                            set.progressPercent >= 80 ? 'bg-green-400' : set.progressPercent >= 40 ? 'bg-amber-400' : 'bg-white/25'
                          )}
                        />
                      </div>
                      <span className="text-xs font-bold text-white w-9 text-right">{set.progressPercent}%</span>
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
                <Clock className="h-4 w-4 text-white/50" />
                <span className="text-sm font-semibold text-white">
                  On-the-Job Hours
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.08] p-4">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-500/0 via-green-400/40 to-green-500/0" />
                <div className="flex items-baseline justify-between mb-2.5">
                  <div className="flex items-baseline gap-1.5">
                    <AnimatedCounter value={ojtHours.logged} className="text-2xl font-bold text-white" />
                    <span className="text-sm text-white/50">/ {ojtHours.target.toLocaleString('en-GB')} hrs</span>
                  </div>
                  <span className="text-sm font-bold text-green-400">{ojtHours.percentComplete}%</span>
                </div>
                <div className="h-3.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(ojtHours.percentComplete, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                    className="h-full rounded-full bg-green-400"
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
                className="relative rounded-2xl overflow-hidden bg-green-500/[0.08] border border-green-500/20 p-4"
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-green-500/15 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{insightText}</p>
                </div>
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
                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 mb-4">
                  <Target className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Start learning</h3>
                <p className="text-sm text-white/50 max-w-[260px] mb-5">
                  Take a quiz, review flashcards, or log your on-the-job hours to track your progress
                </p>
                <button
                  onClick={goToStudyCentre}
                  className="flex items-center gap-2 px-6 h-12 rounded-xl bg-green-500 text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
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
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">What to do next</span>
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
