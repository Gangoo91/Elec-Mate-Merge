import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InlineCheckProps {
  id?: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation?: string;
}

export const InlineCheck: React.FC<InlineCheckProps> = ({
  id = `inline-check-${Math.random().toString(36).substr(2, 9)}`,
  question,
  options,
  correctIndex,
  correctAnswer,
  explanation,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const isMultipleChoice = options && Array.isArray(options) && options.length > 0;
  const isFreeText = !isMultipleChoice && correctAnswer;
  const isCorrect = submitted && selected === correctIndex;

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ignore */
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    try {
      navigator.vibrate?.(selected === correctIndex ? 12 : 30);
    } catch {
      /* ignore */
    }
  };

  /* ── Free-text reveal mode ────────────────────────────────── */

  if (isFreeText) {
    return (
      <section
        aria-labelledby={`${id}-label`}
        className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500/70 via-cyan-400/70 to-blue-400/70 opacity-70" />
        <div className="px-5 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-blue-300" />
            <span
              id={`${id}-label`}
              className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-300"
            >
              Quick check
            </span>
          </div>
          <p className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug">
            {question}
          </p>

          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            className={cn(
              'mt-4 w-full text-left rounded-xl px-4 py-3 border transition-colors touch-manipulation active:scale-[0.99]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
              revealed
                ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                : 'bg-[hsl(0_0%_9%)] border-white/[0.08] hover:bg-[hsl(0_0%_11%)]'
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] text-white">
                {revealed ? 'Hide answer' : 'Tap to reveal'}
              </span>
              {revealed ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </div>
          </button>

          {revealed && (
            <div className="mt-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/30 p-4">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-emerald-300 mb-1.5">
                Answer
              </div>
              <p className="text-[13.5px] text-white leading-relaxed">{correctAnswer}</p>
              {explanation && (
                <p className="mt-2 text-[13px] text-white/85 leading-relaxed">{explanation}</p>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (!isMultipleChoice) return null;

  /* ── Multiple choice mode ─────────────────────────────────── */

  return (
    <section
      aria-labelledby={`${id}-label`}
      className="relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500/70 via-cyan-400/70 to-blue-400/70 opacity-70" />
      <div className="px-5 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-3.5 w-3.5 text-blue-300" />
          <span
            id={`${id}-label`}
            className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-blue-300"
          >
            Quick check
          </span>
        </div>

        <p className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug">
          {question}
        </p>

        <div className="mt-4 space-y-2">
          {options.map((opt, idx) => {
            const sel = selected === idx;
            const isCorrectOpt = submitted && idx === correctIndex;
            const isWrongOpt = submitted && sel && idx !== correctIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                aria-pressed={sel}
                className={cn(
                  'group w-full text-left rounded-xl px-4 py-3 border transition-colors touch-manipulation active:scale-[0.99]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                  isCorrectOpt
                    ? 'bg-emerald-500/[0.08] border-emerald-500/40'
                    : isWrongOpt
                      ? 'bg-red-500/[0.08] border-red-500/40'
                      : sel
                        ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
                        : 'bg-[hsl(0_0%_9%)] border-white/[0.08] hover:bg-[hsl(0_0%_11%)]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'shrink-0 h-7 w-7 rounded-full border flex items-center justify-center text-[11px] font-bold',
                      isCorrectOpt
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : isWrongOpt
                          ? 'bg-red-500/20 border-red-500/50 text-red-300'
                          : sel
                            ? 'bg-elec-yellow/20 border-elec-yellow/50 text-elec-yellow'
                            : 'bg-white/[0.04] border-white/[0.12] text-white/80'
                    )}
                  >
                    {isCorrectOpt ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : isWrongOpt ? (
                      <XCircle className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>
                  <span
                    className={cn(
                      'flex-1 text-[14px] leading-snug',
                      isCorrectOpt
                        ? 'text-emerald-200'
                        : isWrongOpt
                          ? 'text-red-200'
                          : 'text-white'
                    )}
                  >
                    {opt}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selected === null}
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSelected(null);
              }}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12.5px] font-medium touch-manipulation hover:bg-white/[0.08]"
            >
              Try again
            </button>
          )}
          {submitted && (
            <span
              className={cn(
                'text-[11.5px] font-medium',
                isCorrect ? 'text-emerald-300' : 'text-orange-300'
              )}
            >
              {isCorrect ? '✓ Spot on' : 'Not quite'}
            </span>
          )}
        </div>

        {submitted && explanation && (
          <div
            className={cn(
              'mt-3 rounded-xl border p-3.5',
              isCorrect
                ? 'bg-emerald-500/[0.06] border-emerald-500/30'
                : 'bg-orange-500/[0.06] border-orange-500/30'
            )}
          >
            <p className="text-[13px] text-white leading-relaxed">{explanation}</p>
          </div>
        )}
      </div>
    </section>
  );
};
