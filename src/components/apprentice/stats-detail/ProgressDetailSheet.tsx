/**
 * ProgressDetailSheet
 *
 * Editorial detail sheet for the apprentice progress stat tile.
 *
 * Layout: header → editorial hero (XP ring + headline + subtitle) → KPI strip
 * → quiz performance → flashcards → OJT hours → insight → empty/recs.
 *
 * Drops the centered icon hero and chunky stat cards for the same editorial
 * pattern used across Portfolio / OJT Hub / Diary.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  Target,
  ChevronRight,
  BookOpen,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Brain,
  AlertCircle,
  RotateCcw,
  Layers,
  ClipboardCheck,
  ArrowRight,
  PenLine,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUnifiedProgress, type QuizTrend } from '@/hooks/useUnifiedProgress';
import { useSmartRecommendations, type SmartRecommendation } from '@/hooks/useSmartRecommendations';
import { XPProgressRing } from '@/components/apprentice/XPProgressRing';
import { RecommendationCard } from './RecommendationCard';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
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
  } = useUnifiedProgress();

  const { recommendations: smartRecs } = useSmartRecommendations(4);

  const TrendIcon = trendIcons[quizTrend];

  // Quiz average (skip categories with 0 score)
  const scoredCats = quizCategories.filter((c) => c.score > 0);
  const quizAvg =
    scoredCats.length > 0
      ? Math.round(scoredCats.reduce((s, c) => s + c.score, 0) / scoredCats.length)
      : 0;

  const flashPct =
    totalFlashcards > 0 ? Math.round((totalMasteredCards / totalFlashcards) * 100) : 0;

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
            <SheetTitle className="sr-only">Progress detail</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-2 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white/70" />
            </button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-2 pb-10 space-y-7 sm:space-y-8">
            {/* ── Editorial hero with XP ring on the right ────────── */}
            <motion.section
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-start gap-4 sm:gap-6 pt-1"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <Eyebrow>Apprenticeship progress</Eyebrow>
                <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold tracking-tight text-white leading-[1.05]">
                  <span className="font-mono tabular-nums">{overallPercent}%</span>{' '}
                  through the programme
                </h2>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Quizzes · flashcards · OJT · portfolio · streak · EPA — combined
                  into one signal.
                </p>
                <button
                  onClick={goToStudyCentre}
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation mt-1"
                >
                  <BookOpen className="h-4 w-4" />
                  Study Centre
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-shrink-0">
                <XPProgressRing
                  xpToday={xp.xpToday}
                  dailyGoal={xp.dailyGoal}
                  level={xp.level}
                  levelTitle={xp.levelTitle}
                  totalXP={xp.totalXP}
                  size={108}
                  showLevel
                />
              </div>
            </motion.section>

            {/* ── KPI strip ───────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              <KpiCell
                label="Overall"
                value={`${overallPercent}%`}
                sub="6-factor signal"
                bar={overallPercent}
                highlight={overallPercent >= 50}
              />
              <KpiCell
                label="Quiz avg"
                value={quizAvg > 0 ? `${quizAvg}%` : '—'}
                sub={
                  quizStats.totalQuizzes > 0
                    ? `${quizStats.totalQuizzes} quiz${quizStats.totalQuizzes === 1 ? '' : 'zes'}`
                    : 'Take your first'
                }
                bar={quizAvg}
                highlight={quizAvg >= 70}
              />
              <KpiCell
                label="Flashcards"
                value={`${totalMasteredCards}`}
                sub={`of ${totalFlashcards} mastered`}
                bar={flashPct}
                highlight={flashPct >= 60}
              />
              <KpiCell
                label="OJT hours"
                value={ojtHours.logged}
                sub={`${ojtHours.percentComplete}% of ${ojtHours.target}h`}
                bar={Math.min(ojtHours.percentComplete, 100)}
                highlight={ojtHours.percentComplete >= 50}
              />
            </div>

            {/* ── Quiz performance ────────────────────────────────── */}
            <section className="space-y-3">
              <SectionHeader
                eyebrow="Quiz performance"
                title={
                  quizStats.totalQuizzes === 0
                    ? 'No quizzes yet'
                    : strongestCategory && strongestCategory.score > 0
                      ? `Strongest in ${strongestCategory.subject}`
                      : 'Mixed signal'
                }
                meta={
                  quizTrend !== 'no-data'
                    ? trendLabels[quizTrend]
                    : `${quizStats.totalQuizzes} attempt${quizStats.totalQuizzes === 1 ? '' : 's'}`
                }
                action={
                  quizTrend !== 'no-data' && (
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 text-[11px] font-medium',
                        trendColours[quizTrend]
                      )}
                    >
                      <TrendIcon className="h-3.5 w-3.5" />
                      {trendLabels[quizTrend]}
                    </span>
                  )
                }
              />
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
                {quizCategories.length === 0 ? (
                  <p className="text-[13px] text-white/55 leading-relaxed">
                    No quiz data yet. Take a topic quiz from the Study Centre to
                    seed this panel.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {quizCategories.map((cat, i) => (
                      <li key={cat.subject} className="space-y-1.5">
                        <div className="flex items-baseline justify-between gap-3">
                          <button
                            onClick={goToStudyCentre}
                            className="text-[13.5px] text-white text-left flex items-baseline gap-2 min-w-0 truncate touch-manipulation active:text-elec-yellow transition-colors"
                          >
                            <span className="truncate">{cat.subject}</span>
                            {strongestCategory?.subject === cat.subject &&
                              cat.score > 0 && (
                                <span className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-elec-yellow flex-shrink-0">
                                  Best
                                </span>
                              )}
                            {weakestCategory?.subject === cat.subject &&
                              cat.score > 0 && (
                                <span className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-red-300 flex-shrink-0">
                                  Focus
                                </span>
                              )}
                          </button>
                          <span className="text-[12.5px] font-mono text-white tabular-nums flex-shrink-0">
                            {cat.score}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.score}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 * i }}
                            className={cn(
                              'h-full rounded-full',
                              cat.score >= 70 ? 'bg-elec-yellow' : 'bg-white/30'
                            )}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {daysSinceLastQuiz !== null && daysSinceLastQuiz >= 7 && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-white/[0.06] bg-white/[0.02]">
                    <AlertCircle className="h-3.5 w-3.5 text-white/55 flex-shrink-0" />
                    <span className="text-[12px] text-white/85">
                      Last quiz was {daysSinceLastQuiz} days ago
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* ── Flashcard mastery ───────────────────────────────── */}
            {flashcardInsights.length > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Flashcard mastery"
                  title="Sets in progress"
                  meta={`${totalMasteredCards} / ${totalFlashcards} mastered`}
                />
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
                  <ul className="space-y-3">
                    {flashcardInsights.map((set, i) => (
                      <li key={set.id} className="space-y-1.5">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[13px] text-white truncate flex-1 min-w-0">
                            {set.title}
                          </span>
                          <span className="text-[12px] font-mono text-white tabular-nums flex-shrink-0">
                            {set.progressPercent}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${set.progressPercent}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 * i }}
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
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* ── OJT hours ───────────────────────────────────────── */}
            <section className="space-y-3">
              <SectionHeader
                eyebrow="On-the-job"
                title={
                  ojtHours.logged === 0
                    ? 'No hours logged yet'
                    : `${ojtHours.logged}h on the record`
                }
                meta={`${ojtHours.percentComplete}% of the ${ojtHours.target}h gateway target`}
              />
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[26px] sm:text-[30px] font-mono font-semibold tabular-nums leading-none text-white">
                      {ojtHours.logged}
                    </span>
                    <span className="text-[13px] text-white/40 font-mono">
                      / {ojtHours.target.toLocaleString('en-GB')}h
                    </span>
                  </div>
                  <span
                    className={cn(
                      'text-[14px] font-mono tabular-nums',
                      ojtHours.percentComplete >= 50 ? 'text-elec-yellow' : 'text-white/85'
                    )}
                  >
                    {ojtHours.percentComplete}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(ojtHours.percentComplete, 100)}%`,
                    }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="h-full rounded-full bg-elec-yellow"
                  />
                </div>
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
            {overallPercent === 0 && quizCategories.length === 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-7 text-center space-y-3">
                <Eyebrow>Nothing to show yet</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed max-w-[300px] mx-auto">
                  Take a topic quiz, review a flashcard set, or log on-the-job
                  hours and this panel fills out automatically.
                </p>
                <button
                  onClick={goToStudyCentre}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Open Study Centre
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ── Smart recommendations ───────────────────────────── */}
            {smartRecs.length > 0 && (
              <section className="space-y-3">
                <SectionHeader eyebrow="What to do next" title="Smart suggestions" />
                <div className="space-y-2.5">
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
  bar,
  highlight,
}: {
  label: string;
  value: string | number;
  sub?: string;
  bar?: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5 sm:p-5 space-y-1.5">
      <Eyebrow className="text-[9.5px] sm:text-[10px]">{label}</Eyebrow>
      <div
        className={cn(
          'text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none',
          highlight ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </div>
      {bar !== undefined && (
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700',
              highlight ? 'bg-elec-yellow' : 'bg-white/55'
            )}
            style={{ width: `${Math.min(bar, 100)}%` }}
          />
        </div>
      )}
      {sub && (
        <span className="text-[10.5px] sm:text-[11px] text-white/55 block leading-snug">
          {sub}
        </span>
      )}
    </div>
  );
}
