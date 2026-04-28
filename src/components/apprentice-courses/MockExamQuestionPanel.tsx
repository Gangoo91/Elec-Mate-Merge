/**
 * MockExamQuestionPanel
 *
 * Editorial question UI used by every L2 + L3 + Functional Skills + MOET mock exam.
 *
 * Design rules:
 * - No outer Card wrapper — uses page chrome only
 * - Single hairline accent at top
 * - Options as ghost-style buttons; selected = yellow tint + left accent rail
 * - A/B/C/D letter in its own column (subtle, smaller)
 * - Mobile-first: no shadows, no glass, no nested borders
 */

import { ArrowLeft, ArrowRight, CheckCircle, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MockExamQuestion {
  id: string | number;
  question: string;
  options: string[];
}

interface MockExamQuestionPanelProps {
  questionIndex: number;
  totalQuestions: number;
  question: MockExamQuestion | undefined;
  selectedAnswer?: number;
  isFlagged: boolean;
  topicLabel: string;
  onSelectAnswer: (index: number) => void;
  onToggleFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
  canSubmit: boolean;
}

export function MockExamQuestionPanel({
  questionIndex,
  totalQuestions,
  question,
  selectedAnswer,
  isFlagged,
  topicLabel,
  onSelectAnswer,
  onToggleFlag,
  onPrevious,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  canSubmit,
}: MockExamQuestionPanelProps) {
  if (!question) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/60 via-amber-400/60 to-orange-400/60 opacity-70" />

      <div className="px-1 pt-6 sm:pt-8 pb-6">
        {/* Header — eyebrow + flag */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="min-w-0">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-elec-yellow">
              Question {questionIndex + 1} <span className="text-white/40">of {totalQuestions}</span>
            </div>
            <div className="mt-1 text-[12px] text-white/60 truncate">
              {topicLabel}
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleFlag}
            className={cn(
              'shrink-0 inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[12px] font-medium transition-colors touch-manipulation',
              isFlagged
                ? 'bg-elec-yellow/15 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.06]'
            )}
            aria-pressed={isFlagged}
          >
            <Flag className={cn('h-3.5 w-3.5', isFlagged && 'fill-current')} />
            {isFlagged ? 'Flagged' : 'Flag'}
          </button>
        </div>

        {/* Question prompt */}
        <h2 className="mt-5 text-[19px] sm:text-[22px] font-semibold text-white leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Options */}
        <div className="mt-7 space-y-2.5">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const letter = String.fromCharCode(65 + index);
            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectAnswer(index)}
                className={cn(
                  'group relative w-full text-left rounded-xl px-4 py-4 sm:px-5 sm:py-4',
                  'flex items-start gap-4 touch-manipulation transition-colors',
                  'min-h-[60px]',
                  isSelected
                    ? 'bg-elec-yellow/10 ring-1 ring-elec-yellow/40'
                    : 'bg-white/[0.025] hover:bg-white/[0.05]'
                )}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-elec-yellow"
                  />
                )}
                <span
                  className={cn(
                    'shrink-0 mt-0.5 inline-flex items-center justify-center h-7 w-7 rounded-full text-[12px] font-semibold tabular-nums transition-colors',
                    isSelected
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white/70 group-hover:text-white'
                  )}
                >
                  {letter}
                </span>
                <span
                  className={cn(
                    'flex-1 text-[15px] sm:text-[16px] leading-snug',
                    isSelected ? 'text-white' : 'text-white/85'
                  )}
                >
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Nav */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirst}
            className={cn(
              'h-12 inline-flex items-center justify-center gap-2 rounded-xl text-[14px] font-medium touch-manipulation transition-colors',
              'bg-white/[0.03] border border-white/[0.08] text-white',
              'hover:bg-white/[0.06] active:scale-[0.99]',
              'disabled:opacity-40 disabled:pointer-events-none'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit}
              className={cn(
                'h-12 inline-flex items-center justify-center gap-2 rounded-xl text-[14px] font-semibold touch-manipulation transition-colors',
                'bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.99]',
                'disabled:opacity-40 disabled:pointer-events-none'
              )}
            >
              Submit
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="h-12 inline-flex items-center justify-center gap-2 rounded-xl text-[14px] font-semibold touch-manipulation transition-colors bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.99]"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
