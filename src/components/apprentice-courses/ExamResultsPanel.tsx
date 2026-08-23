/**
 * Shared results screen for the Level 2 / Level 3 / AM2 papers.
 *
 * Laid out two-by-two on desktop: verdict and breakdown on the top row, what to
 * study and what to do next underneath. A single centred column left most of a
 * monitor empty and pushed the actions — the only things that change what
 * happens next — below the fold.
 *
 * It also separates an ABANDONED paper from a failed one. A sitting with 3
 * answered and 37 skipped used to report "0%" and "7 topics came in under the
 * pass mark", which is not true: those topics were never attempted. A score is
 * only a verdict when the paper was actually finished.
 *
 * Built on the card recipe (src/components/ui/card-recipe.ts): volt EDGES not
 * volt washes, diagonal lit surfaces, solid volt on the primary action only.
 */
import { ArrowLeft, FileText, RotateCcw, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_PRIMARY, CARD_SURFACE } from '@/components/ui/card-recipe';
import type { MockExamHistory } from '@/hooks/useMockExamHistory';
import { topicLabelOf } from './examTopicLabel';

export interface ExamPanelQuestion {
  id?: number;
  question: string;
  options: string[];
  /** Index into `options` as displayed (post-shuffle). */
  correctAnswer: number;
  explanation?: string;
  /** Any of these may carry the topic name, depending on the bank. */
  section?: string;
  topic?: string;
  category?: string;
}

export interface ExamResultsPanelProps {
  questions: ExamPanelQuestion[];
  /** Aligned to `questions`; undefined/-1 means skipped. */
  answers: (number | undefined)[];
  passThreshold: number;
  history?: MockExamHistory;
  /**
   * Optional section → readable name map. Several banks store only an outline
   * number in `section` ("7.2"), which makes an unmapped study list read as a
   * column of figures. Pass the bank's own map where it has one.
   */
  topicNames?: Record<string, string>;
  /** Seconds spent, where the paper tracks it. */
  timeTakenSeconds?: number;
  onReview: () => void;
  onRetake: () => void;
  onExit: () => void;
  /** Where "back" goes, named. e.g. "course". */
  exitLabel?: string;
  onDrillMissed?: () => void;
}

const isSkipped = (a: number | undefined) => a === undefined || a === -1;

const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">{children}</p>
);

const Panel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <section
    className={cn('rounded-2xl border border-elec-yellow/35 p-5 sm:p-6', CARD_SURFACE, className)}
  >
    {children}
  </section>
);

export function ExamResultsPanel({
  questions,
  answers,
  passThreshold,
  history,
  topicNames,
  timeTakenSeconds,
  onReview,
  onRetake,
  onExit,
  exitLabel = 'course',
  onDrillMissed,
}: ExamResultsPanelProps) {
  const haptic = useHaptic();
  const total = questions.length;
  const correct = questions.reduce(
    (n, q, i) => (!isSkipped(answers[i]) && answers[i] === q.correctAnswer ? n + 1 : n),
    0
  );
  const answered = answers.filter((a) => !isSkipped(a)).length;
  const incorrect = answered - correct;
  const unanswered = total - answered;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percentage >= passThreshold;

  // More than a third left blank means the paper was abandoned, not failed —
  // reporting a verdict on it would misdescribe what was actually measured.
  const incomplete = total > 0 && unanswered > total / 3;
  // Accuracy on what was attempted: the only fair read on a part-finished
  // paper, and worth knowing on a complete one.
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const marksNeeded = Math.max(0, Math.ceil((passThreshold / 100) * total) - correct);
  const beatBest = !incomplete && history?.best != null && percentage > history.best;

  // Weakest first — a study order, not a register. Only topics actually
  // attempted, so an abandoned paper cannot invent weak areas.
  const byTopic = new Map<string, { correct: number; attempted: number }>();
  questions.forEach((q, i) => {
    const t = topicLabelOf(q, topicNames);
    if (!t) return;
    const row = byTopic.get(t) ?? { correct: 0, attempted: 0 };
    if (!isSkipped(answers[i])) {
      row.attempted += 1;
      if (answers[i] === q.correctAnswer) row.correct += 1;
    }
    byTopic.set(t, row);
  });
  const breakdown = Array.from(byTopic.entries())
    .map(([topic, r]) => ({ topic, ...r, percent: Math.round((r.correct / r.attempted) * 100) }))
    .filter((b) => b.attempted > 0)
    .sort((a, b) => a.percent - b.percent);
  const weak = breakdown.filter((b) => b.percent < passThreshold);

  const minutes = timeTakenSeconds != null ? Math.max(1, Math.round(timeTakenSeconds / 60)) : null;

  return (
    <div className="min-h-screen bg-elec-dark px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onExit();
          }}
          className="-ml-1 mb-4 flex h-11 items-center gap-1.5 px-1 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.97]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {exitLabel}
        </button>

        <div className="grid gap-3 lg:grid-cols-2">
          {/* 1 · The verdict */}
          <Panel className="flex flex-col items-center text-center">
            {/* "Not passed yet" rather than FAILED — it's a paper you can resit
                immediately, and that is the honest description of it. */}
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]',
                incomplete
                  ? 'border-white/40 text-white'
                  : passed
                    ? 'border-green-400 text-green-400'
                    : 'border-orange-400 text-orange-300'
              )}
            >
              {incomplete ? 'Not completed' : passed ? 'Passed' : 'Not passed yet'}
            </span>

            <div className="relative mt-5 h-[132px] w-[132px]">
              <svg width="132" height="132" className="-rotate-90" aria-hidden>
                <circle
                  cx="66"
                  cy="66"
                  r={RING_R}
                  fill="none"
                  strokeWidth="8"
                  className="stroke-white/[0.12]"
                />
                <circle
                  cx="66"
                  cy="66"
                  r={RING_R}
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_C * (1 - percentage / 100)}
                  className={cn(
                    'transition-[stroke-dashoffset] duration-700',
                    passed && !incomplete ? 'stroke-green-400' : 'stroke-elec-yellow'
                  )}
                />
              </svg>
              <div
                role="img"
                aria-label={`Scored ${percentage} per cent, ${correct} of ${total} correct`}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span
                  aria-hidden
                  className="text-[38px] font-bold leading-none tabular-nums tracking-tight text-white"
                >
                  {percentage}%
                </span>
                <span aria-hidden className="mt-1 text-[11px] text-white">
                  {correct} of {total}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[13.5px] text-white">Pass mark {passThreshold}%</p>

            {incomplete ? (
              <p className="mt-2 max-w-[42ch] text-[12.5px] leading-relaxed text-white">
                You left {unanswered} of {total} unanswered, so this score isn't a fair measure of
                where you are. Sit it through to the end for one you can trust.
              </p>
            ) : passed ? (
              <p className="mt-2 max-w-[42ch] text-[12.5px] leading-relaxed text-white">
                Clear of the mark. Sit it again cold in a few days — passing twice is what tells you
                it stuck.
              </p>
            ) : (
              <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                <span className="font-semibold text-elec-yellow">
                  {marksNeeded} more {marksNeeded === 1 ? 'mark' : 'marks'}
                </span>{' '}
                would have passed it.
              </p>
            )}

            {history && history.attempts > 0 && (
              <p className="mt-4 w-full border-t border-white/[0.1] pt-3.5 text-[12.5px] text-white">
                {beatBest ? (
                  <span className="font-semibold text-elec-yellow">
                    New personal best, up from {history.best}%
                  </span>
                ) : (
                  <>
                    Best {history.best}% · last {history.last}% · {history.attempts}{' '}
                    {history.attempts === 1 ? 'attempt' : 'attempts'}
                  </>
                )}
              </p>
            )}
          </Panel>

          {/* 2 · How it broke down */}
          <Panel>
            <Eyebrow>How it broke down</Eyebrow>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { value: correct, label: 'Correct', tone: 'text-green-400' },
                { value: incorrect, label: 'Wrong', tone: 'text-red-400' },
                { value: unanswered, label: 'Skipped', tone: 'text-white' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-elec-yellow/35 px-2 py-4 text-center"
                >
                  <p className={cn('text-[30px] font-bold leading-none tabular-nums', s.tone)}>
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-white/[0.1] pt-4">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[12.5px] text-white">Questions attempted</dt>
                <dd className="text-[14px] font-semibold tabular-nums text-white">
                  {answered} of {total}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-[12.5px] text-white">Accuracy on those</dt>
                <dd className="text-[14px] font-semibold tabular-nums text-white">
                  {answered > 0 ? `${accuracy}%` : '—'}
                </dd>
              </div>
              {minutes !== null && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[12.5px] text-white">Time taken</dt>
                  <dd className="text-[14px] font-semibold tabular-nums text-white">
                    {minutes} min
                  </dd>
                </div>
              )}
            </dl>

            {incomplete && answered > 0 && (
              <p className="mt-4 rounded-xl border border-elec-yellow/35 p-3.5 text-[12.5px] leading-relaxed text-white">
                On the {answered} you did answer you were{' '}
                <span className="font-semibold text-elec-yellow">{accuracy}% accurate</span>. The
                score above is held down by what you skipped, not by what you got wrong.
              </p>
            )}
          </Panel>

          {/* 3 · What to study next */}
          <Panel>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                What to study next
              </h2>
            </div>

            {breakdown.length === 0 ? (
              <p className="mt-2 text-[13px] leading-relaxed text-white">
                Nothing to rank from this sitting. Answer a spread of questions and this becomes
                your study order, weakest topic first.
              </p>
            ) : (
              <>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white">
                  {weak.length === 0
                    ? 'Every topic you attempted cleared the pass mark. Weakest first, in case you want to tighten up.'
                    : `${weak.length} ${weak.length === 1 ? 'topic came' : 'topics came'} in under the pass mark. Work down this list.`}
                  {incomplete && ' Ranked only on the questions you answered.'}
                </p>
                <div className="mt-4 space-y-3">
                  {breakdown.slice(0, 6).map((b) => {
                    const isWeak = b.percent < passThreshold;
                    return (
                      <div key={b.topic}>
                        <div className="mb-1.5 flex items-baseline justify-between gap-3">
                          <span className="min-w-0 truncate text-[13px] font-medium text-white">
                            {b.topic}
                          </span>
                          <span
                            className={cn(
                              'shrink-0 text-[12.5px] font-semibold tabular-nums',
                              isWeak ? 'text-orange-300' : 'text-green-400'
                            )}
                          >
                            {b.correct}/{b.attempted} · {b.percent}%
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-700',
                              isWeak ? 'bg-orange-400' : 'bg-green-500'
                            )}
                            style={{ width: `${b.percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Panel>

          {/* 4 · What now */}
          <Panel className="flex flex-col">
            <Eyebrow>What now</Eyebrow>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white">
              {incorrect > 0
                ? `Reading why you got ${incorrect} wrong is what moves the score. Every one is already in your revision pile.`
                : 'Go back through the paper to lock in what you knew, then come to it cold in a few days.'}
            </p>

            <div className="mt-4 space-y-2.5">
              {/* Solid volt — the recipe's primary. Never a translucent wash. */}
              <button
                type="button"
                onClick={() => {
                  haptic.medium();
                  onReview();
                }}
                className={cn(
                  'flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-[14px] font-bold text-black',
                  'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
                  'transition-[background-image,transform] duration-150 ease-out active:scale-[0.97]',
                  CARD_PRIMARY
                )}
              >
                <FileText className="h-4 w-4" />
                Review every answer
              </button>

              {incorrect > 0 && onDrillMissed && (
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onDrillMissed();
                  }}
                  className={cn(
                    'flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-elec-yellow/35 text-[14px] font-semibold text-white',
                    'touch-manipulation active:scale-[0.97]',
                    CARD_SURFACE
                  )}
                >
                  <RotateCcw className="h-4 w-4" />
                  Drill the {incorrect} you missed
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onRetake();
                  }}
                  className={cn(
                    'flex h-11 items-center justify-center rounded-xl border border-elec-yellow/35 px-3 text-center text-[13px] font-semibold text-white',
                    'touch-manipulation active:scale-[0.97]',
                    CARD_SURFACE
                  )}
                >
                  {incomplete ? 'Sit it properly' : 'Fresh paper'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onExit();
                  }}
                  className={cn(
                    'flex h-11 items-center justify-center rounded-xl border border-elec-yellow/35 px-3 text-center text-[13px] font-semibold text-white',
                    'touch-manipulation active:scale-[0.97]',
                    CARD_SURFACE
                  )}
                >
                  Back to {exitLabel}
                </button>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
