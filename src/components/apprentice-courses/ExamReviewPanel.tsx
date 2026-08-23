/**
 * Shared review screen for the Level 2 / Level 3 / AM2 papers.
 *
 * Companion to ExamResultsPanel — see that file for why these exist as shared
 * components rather than fourteen copies of the same markup.
 *
 * Reading why you got something wrong is where a mock exam actually teaches,
 * so this screen carries the explanation, the correct answer marked in words
 * as well as colour, and — where we have enough data — how often everyone
 * else misses the same question.
 */
import { ArrowLeft, CheckCircle, Flag, RotateCcw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import type { FailureRates } from '@/hooks/useQuestionFailureRates';
import type { ExamPanelQuestion } from './ExamResultsPanel';
import { topicLabelOf, type SectionTopicMap } from './examTopicLabel';

export type ExamReviewFilter = 'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged';

export interface ExamReviewPanelProps {
  questions: ExamPanelQuestion[];
  /** Aligned to `questions`; undefined/-1 means skipped. */
  answers: (number | undefined)[];
  flagged: Set<number>;
  filter: ExamReviewFilter;
  onFilterChange: (f: ExamReviewFilter) => void;
  failureRates?: FailureRates;
  onBack: () => void;
  onDrillMissed?: () => void;
  /**
   * Optional section-number -> readable-name map from the bank, for the
   * banks that store only an outline number. Without it the label under
   * the question reads "Section 7.3", which means nothing to a learner.
   */
  topicNames?: SectionTopicMap;
}

const isSkipped = (a: number | undefined) => a === undefined || a === -1;

export function ExamReviewPanel({
  questions,
  answers,
  flagged,
  filter,
  onFilterChange,
  failureRates = {},
  onBack,
  onDrillMissed,
  topicNames,
}: ExamReviewPanelProps) {
  const total = questions.length;
  const statusOf = (i: number): 'correct' | 'incorrect' | 'unanswered' => {
    if (isSkipped(answers[i])) return 'unanswered';
    return answers[i] === questions[i].correctAnswer ? 'correct' : 'incorrect';
  };

  const correct = questions.filter((_, i) => statusOf(i) === 'correct').length;
  const incorrect = questions.filter((_, i) => statusOf(i) === 'incorrect').length;
  const unanswered = questions.filter((_, i) => statusOf(i) === 'unanswered').length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const visible = questions
    .map((question, index) => ({ question, index }))
    .filter(({ index }) => {
      switch (filter) {
        case 'correct':
          return statusOf(index) === 'correct';
        case 'incorrect':
          return statusOf(index) === 'incorrect';
        case 'unanswered':
          return statusOf(index) === 'unanswered';
        case 'flagged':
          return flagged.has(index);
        default:
          return true;
      }
    });

  // Ordered by usefulness — Wrong first. Equal-weight cards used to give
  // "Correct" the same prominence, when only one of these repays attention.
  const filters: { id: ExamReviewFilter; label: string; count: number; tone: string }[] = [
    { id: 'all', label: 'All', count: total, tone: 'text-white' },
    { id: 'incorrect', label: 'Wrong', count: incorrect, tone: 'text-red-400' },
    { id: 'unanswered', label: 'Skipped', count: unanswered, tone: 'text-white' },
    { id: 'flagged', label: 'Flagged', count: flagged.size, tone: 'text-elec-yellow' },
    { id: 'correct', label: 'Correct', count: correct, tone: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="fixed right-0 z-40 border-b border-white/[0.1] bg-background/95 backdrop-blur-md"
        style={{ top: 'var(--header-height, 56px)', left: 'var(--sidebar-width, 0px)' }}>
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="-ml-1 flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-2.5 pr-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            Results
          </button>
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-white">
            Review answers
          </span>
          <span className="shrink-0 text-[12.5px] tabular-nums text-white">
            {percentage}% · {correct}/{total}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilterChange(active && f.id !== 'all' ? 'all' : f.id)}
                className={cn(
                  'flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] transition-colors touch-manipulation',
                  active
                    ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                    : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.1]'
                )}
              >
                {f.label}
                <span className={cn('tabular-nums', active ? 'text-black/70' : f.tone)}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className={cn('rounded-2xl border border-elec-yellow/35 p-8 text-center', CARD_SURFACE)}>
            <p className="text-[15px] font-semibold text-white">Nothing in this filter</p>
            <p className="mt-1.5 text-[13px] text-white">
              {filter === 'incorrect'
                ? 'You did not get any wrong — worth a harder paper.'
                : 'Try another filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map(({ question, index }) => {
              const status = statusOf(index);
              const userAnswer = answers[index];
              // Shared helper — the L3 banks put a bare outline number in
              // `section` and the readable name in `topic`.
              const topic = topicLabelOf(question, topicNames);
              const failureRate =
                typeof question.id === 'number' ? failureRates[String(question.id)] : undefined;

              return (
                <div
                  key={index}
                  className={cn(
                    'overflow-hidden rounded-2xl border bg-[hsl(0_0%_10%)]',
                    status === 'correct'
                      ? 'border-emerald-500/25'
                      : status === 'incorrect'
                        ? 'border-red-500/30'
                        : 'border-white/[0.1]'
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] px-5 py-3">
                    <span className="text-[12.5px] font-semibold text-white">
                      Question {index + 1}
                    </span>
                    {topic && (
                      <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-white">
                        {topic}
                      </span>
                    )}
                    <span className="flex-1" />
                    {flagged.has(index) && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-elec-yellow bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-elec-yellow">
                        <Flag className="h-3 w-3 fill-current" />
                        Flagged
                      </span>
                    )}
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                        status === 'correct'
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : status === 'incorrect'
                            ? 'border-red-500/40 bg-red-500/10 text-red-300'
                            : 'border-white/[0.14] bg-white/[0.05] text-white'
                      )}
                    >
                      {status === 'correct' ? 'Correct' : status === 'incorrect' ? 'Wrong' : 'Skipped'}
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-[15px] font-medium leading-snug text-white">
                      {question.question}
                    </p>

                    <div className="mt-4 space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isCorrectAnswer = optIndex === question.correctAnswer;
                        const isUserAnswer = optIndex === userAnswer;
                        return (
                          <div
                            key={optIndex}
                            className={cn(
                              'flex items-center gap-3 rounded-xl border px-4 py-3',
                              isCorrectAnswer
                                ? 'border-emerald-500/50 bg-emerald-500/[0.08]'
                                : isUserAnswer
                                  ? 'border-red-400/50 bg-red-500/[0.08]'
                                  : 'border-elec-yellow/35'
                            )}
                          >
                            <span
                              className={cn(
                                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                                isCorrectAnswer
                                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-200'
                                  : isUserAnswer
                                    ? 'border-red-400/50 bg-red-500/20 text-red-200'
                                    : 'border-white/[0.14] bg-white/[0.05] text-white'
                              )}
                            >
                              {isCorrectAnswer ? (
                                <CheckCircle className="h-3.5 w-3.5" />
                              ) : isUserAnswer ? (
                                <XCircle className="h-3.5 w-3.5" />
                              ) : (
                                String.fromCharCode(65 + optIndex)
                              )}
                            </span>
                            <span className="flex-1 text-[14px] leading-snug text-white">
                              {option}
                            </span>
                            {/* Named as well as coloured — the marking has to
                                survive colour blindness and a screen reader. */}
                            {isCorrectAnswer && (
                              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                                Correct
                              </span>
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-red-300">
                                You
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {failureRate !== undefined && failureRate >= 40 && (
                      <p className="mt-4 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-[12.5px] text-white">
                        <span className="font-semibold text-elec-yellow">{failureRate}%</span> of
                        people get this one wrong
                        {status === 'incorrect' ? " — you're in good company." : '.'}
                      </p>
                    )}

                    {question.explanation && (
                      <div className={cn('mt-4 rounded-xl border border-elec-yellow/35 p-4', CARD_SURFACE)}>
                        <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                          Why
                        </p>
                        <p className="text-[13.5px] leading-relaxed text-white">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {incorrect > 0 && onDrillMissed && (
            <Button
              onClick={onDrillMissed}
              className="min-h-[48px] rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-[hsl(47_100%_50%)] active:scale-[0.97] touch-manipulation"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Drill the {incorrect} you missed
            </Button>
          )}
          <Button
            onClick={onBack}
            variant="outline"
            className="min-h-[48px] rounded-xl border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white hover:bg-white/[0.1] touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to results
          </Button>
        </div>
      </div>
    </div>
  );
}
