/**
 * The exam-taking screen, shared by every in-app paper.
 *
 * Fits ONE viewport and does not scroll the page. The old layout let the
 * sidebar's question grid (up to 60 buttons) drive the page height, so on a
 * 60-question paper you scrolled past the answers to reach the timer or the
 * navigator. Here the shell is FIXED to the viewport minus the app chrome (see
 * the positioning note on the root element), and the two columns scroll
 * INTERNALLY only when their own content overflows — a long question scrolls
 * inside its column, the navigator scrolls inside its own box, and the header,
 * footer and Next button never move.
 *
 * `min-h-0` on the flex/grid children is what makes that work; without it a
 * flex child refuses to shrink below its content and the page scrolls again.
 *
 * Type scales with the viewport: the stem runs 19 → 24 → 28px and the options
 * 15 → 16 → 17px, because a desktop monitor showing 40 questions worth of
 * chrome had the question set at phone size.
 *
 * Presentational only — no exam state, no timer logic. Each paper keeps its
 * own state and passes values in.
 */
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_PRIMARY, CARD_SURFACE } from '@/components/ui/card-recipe';
import { topicLabelOf, type SectionTopicMap } from './examTopicLabel';
import type { ExamPanelQuestion } from './ExamResultsPanel';

export interface ExamQuestionPanelProps {
  examTitle: string;
  question: ExamPanelQuestion;
  /** Zero-based. */
  index: number;
  total: number;
  /** Chosen option index for the CURRENT question; undefined/-1 = unanswered. */
  selected: number | undefined;
  /** Per-question answered state, aligned to the paper, for the navigator. */
  answers: (number | undefined)[];
  flagged: Set<number>;
  /** Seconds remaining. Pass null to hide the clock entirely. */
  timeRemaining: number | null;
  onSelect: (optionIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
  onToggleFlag: () => void;
  onSubmit: () => void;
  onExit: () => void;
  /**
   * Optional section-number -> readable-name map from the bank, for the
   * banks that store only an outline number. Without it the label under
   * the question reads "Section 7.3", which means nothing to a learner.
   */
  topicNames?: SectionTopicMap;
}

const isAnswered = (a: number | undefined) => a !== undefined && a !== -1;

const formatTime = (s: number) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

export function ExamQuestionPanel({
  examTitle,
  question,
  index,
  total,
  selected,
  answers,
  flagged,
  timeRemaining,
  onSelect,
  onPrevious,
  onNext,
  onJump,
  onToggleFlag,
  onSubmit,
  onExit,
  topicNames,
}: ExamQuestionPanelProps) {
  const haptic = useHaptic();
  const answeredCount = answers.filter(isAnswered).length;
  const isLast = index >= total - 1;
  const topic = topicLabelOf(question, topicNames);
  const lowTime = timeRemaining !== null && timeRemaining < 300;
  const pct = total ? Math.round((answeredCount / total) * 100) : 0;

  return (
    // FIXED, not a sized block in the flow.
    //
    // Layout pads <main> by var(--header-height) AND wraps the outlet in a div
    // with `pt-6 pb-4 px-*`. A `calc(100dvh - header)` child therefore sits
    // ~40px lower than it thinks and pushes its own footer off the bottom —
    // which is exactly how the Next button ended up clipped. Taking the shell
    // out of flow makes it exactly the viewport minus the app chrome, so no
    // ancestor padding can move it and nothing scrolls.
    //
    // Same technique as EVShellHeader: position against the layout's live
    // --header-height / --sidebar-width vars rather than guessing.
    <div
      className="fixed bottom-0 right-0 z-30 flex flex-col overflow-hidden bg-elec-dark"
      style={{ top: 'var(--header-height, 56px)', left: 'var(--sidebar-width, 0px)' }}
    >
      {/* Header — one clock only. The old screen ran a countdown here AND a
          second one in the sidebar. */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.1] bg-[#1a1a1a] px-4 sm:px-6">
        <button
          type="button"
          onClick={onExit}
          className="-ml-1 flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-2.5 pr-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit
        </button>
        <span className="hidden min-w-0 flex-1 truncate text-[13.5px] font-medium text-white sm:block">
          {examTitle}
        </span>
        <span className="flex-1 sm:hidden" />
        <span className="shrink-0 text-[12.5px] tabular-nums text-white">
          {answeredCount}/{total}
        </span>
        {timeRemaining !== null && (
          <span
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold tabular-nums',
              lowTime
                ? 'border-red-400/40 bg-red-500/10 text-red-200'
                : 'border-white/[0.12] bg-white/[0.06] text-white'
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            {formatTime(timeRemaining)}
          </span>
        )}
      </header>

      {/* Body — the only scrollable regions are inside these two columns. */}
      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-h-0 flex-col">
          {/* `m-auto` on the inner block centres a short question in the
              available height instead of stranding it at the top above a large
              gap, and still scrolls from the top once the content is taller
              than the column. */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6">
            <div className="m-auto w-full max-w-4xl">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow lg:text-[12px]">
                    Question {index + 1} of {total}
                  </p>
                  {topic && <p className="mt-1 text-[12.5px] text-white lg:text-[13.5px]">{topic}</p>}
                </div>
                <button
                  type="button"
                  onClick={onToggleFlag}
                  className={cn(
                    'flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-semibold touch-manipulation active:scale-[0.97]',
                    'transition-[background-image,border-color,transform] duration-150 ease-out',
                    CARD_SURFACE,
                    // Volt LINE + volt TEXT when flagged — never a volt wash.
                    flagged.has(index)
                      ? 'border-elec-yellow text-elec-yellow'
                      : 'border-elec-yellow/35 text-white'
                  )}
                >
                  <Flag className={cn('h-3.5 w-3.5', flagged.has(index) && 'fill-current')} />
                  {flagged.has(index) ? 'Flagged' : 'Flag'}
                </button>
              </div>

              <h1 className="mt-3.5 text-[19px] font-semibold leading-snug tracking-tight text-white sm:text-[24px] lg:text-[28px]">
                {question.question}
              </h1>

              <div className="mt-5 space-y-2.5 pb-2">
                {question.options.map((option, i) => {
                  const picked = selected === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onSelect(i)}
                      aria-pressed={picked}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4 lg:py-[18px]',
                        'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]',
                        'transition-[background-image,border-color,transform] duration-150 ease-out active:scale-[0.98]',
                        CARD_SURFACE,
                        // Selection is carried by a full-strength volt EDGE and
                        // a solid volt badge. A translucent volt face would go
                        // muddy against the near-black ground.
                        picked
                          ? 'border-elec-yellow'
                          : 'border-elec-yellow/35 hover:border-elec-yellow/60'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold lg:h-10 lg:w-10 lg:text-[14px]',
                          picked
                            ? cn('text-black', CARD_PRIMARY)
                            : 'border-elec-yellow/35 text-white'
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-[15px] leading-snug text-white sm:text-[16px] lg:text-[17px]">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer stays put — the primary action never scrolls away. */}
          <div className="shrink-0 border-t border-white/[0.1] bg-[#1a1a1a] px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <button
                type="button"
                onClick={onPrevious}
                disabled={index === 0}
                className="flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-40 touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="flex-1" />
              {isLast ? (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14px] font-semibold text-black touch-manipulation"
                >
                  Submit exam
                  <CheckCircle className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  className="flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14px] font-semibold text-black touch-manipulation"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigator. On desktop it is a fixed column whose grid scrolls in
            place. On a phone it becomes a single horizontal strip above the
            footer rather than 60 buttons pushing the question off screen. */}
        <aside className="hidden min-h-0 flex-col border-l border-white/[0.1] bg-[hsl(0_0%_9%)] lg:flex">
          <div className="shrink-0 border-b border-white/[0.08] px-4 py-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                Progress
              </span>
              <span className="text-[13px] font-semibold tabular-nums text-white">
                {answeredCount}/{total}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all"
                style={{ width: `${total ? (answeredCount / total) * 100 : 0}%` }}
              />
            </div>
            {flagged.size > 0 && (
              <p className="mt-2 text-[11.5px] text-white">
                {flagged.size} flagged for review
              </p>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: total }).map((_, i) => {
                const done = isAnswered(answers[i]);
                const isCurrent = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onJump(i)}
                    aria-label={`Question ${i + 1}${done ? ', answered' : ''}`}
                    className={cn(
                      'relative flex h-9 items-center justify-center rounded-lg border text-[12px] font-semibold tabular-nums transition-colors touch-manipulation',
                      isCurrent
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : done
                          ? 'border-elec-yellow/70 bg-white/[0.06] text-elec-yellow'
                          : 'border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    )}
                  >
                    {i + 1}
                    {flagged.has(i) && !isCurrent && (
                      <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Phone navigator — one scrollable row, so the question keeps the screen. */}
      <div className="shrink-0 border-t border-white/[0.1] bg-[hsl(0_0%_9%)] px-4 py-2 lg:hidden">
        <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {Array.from({ length: total }).map((_, i) => {
            const done = isAnswered(answers[i]);
            const isCurrent = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onJump(i)}
                aria-label={`Question ${i + 1}${done ? ', answered' : ''}`}
                className={cn(
                  'relative h-9 w-9 shrink-0 rounded-lg border text-[12px] font-semibold tabular-nums touch-manipulation',
                  isCurrent
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : done
                      ? 'border-elec-yellow/70 bg-white/[0.06] text-elec-yellow'
                      : 'border-white/[0.1] bg-white/[0.04] text-white'
                )}
              >
                {i + 1}
                {flagged.has(i) && !isCurrent && (
                  <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
