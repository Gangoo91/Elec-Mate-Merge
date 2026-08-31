import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { deriveProgressKeys } from '@/lib/apprentice-progress';

/**
 * Restyled 2026-08-31 onto the card recipe.
 *
 * 🔴 WHAT WAS WRONG. This component predated the recipe and carried two flat
 * near-black fills of its own: hsl(0 0% 12%) for the card and hsl(0 0% 9%) for
 * every answer option — so the options were DARKER than the card they sat in,
 * and a page with three checks on it read as a column of black slabs. The
 * recipe's own comment already names that failure exactly: "a column of
 * near-black slabs — fine for a dense dashboard, tiring for someone reading
 * 900 lines of teaching content." This component simply never got migrated.
 *
 * 🔴 NOW: CARD_SURFACE + border-elec-yellow/35, identical to TLDR, so a check
 * reads as part of the page rather than a hole punched in it. Options sit on a
 * LIGHTER translucent white than the card, which is the right way round.
 *
 * 🔴 ACCENT changed blue → volt. The blue hairline and blue "Quick check" label
 * were the only blue in the Study Centre and looked borrowed from another app.
 *
 * ⚠️ THE SELECTED STATE was `bg-elec-yellow/[0.10]`, which the card recipe
 * explicitly bans as a background — a volt wash over a dark ground goes muddy
 * brown. Selection is now carried by a brighter white surface + a volt BORDER
 * and a solid volt bullet. Gold edge, never gold face.
 *
 * Semantic colours (emerald correct / red wrong) are unchanged — those are
 * meaning, not decoration.
 */

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
  // Track whether we've already recorded a correct first-attempt for this check
  // — prevents double-counting if the user submits → "Try again" → submits again.
  const [progressRecorded, setProgressRecorded] = useState(false);

  const location = useLocation();
  const { recordProgress } = useCourseProgress();

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
    // Record progress + feed the streak system on a correct first submission.
    if (selected === correctIndex && !progressRecorded) {
      const { courseKey, sectionKey } = deriveProgressKeys(location.pathname);
      // sectionKey-check-id format mirrors Quiz's sectionKey-quiz pattern
      recordProgress(courseKey, `${sectionKey}-check-${id}`, 100, true);
      setProgressRecorded(true);
    }
  };

  /* ── Free-text reveal mode ────────────────────────────────── */

  if (isFreeText) {
    return (
      <section
        aria-labelledby={`${id}-label`}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-elec-yellow/35',
          CARD_SURFACE
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0" />
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-elec-yellow" />
            <span
              id={`${id}-label`}
              className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow"
            >
              Quick check
            </span>
          </div>
          <p className="text-[15.5px] font-semibold leading-snug text-white sm:text-[16.5px]">
            {question}
          </p>

          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            className={cn(
              'group relative mt-4 flex min-h-11 w-full items-center justify-between gap-3 overflow-hidden',
              'rounded-xl border py-2.5 pl-4 pr-3 text-left transition-[background-color,border-color] duration-150',
              'touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.995]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
              revealed
                ? 'border-elec-yellow/55 bg-white/[0.13]'
                : 'border-white/[0.10] bg-white/[0.04] hover:border-white/[0.18] hover:bg-white/[0.08]'
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute inset-y-0 left-0 w-[3px] rounded-l-xl transition-colors',
                revealed ? 'bg-elec-yellow' : 'bg-transparent'
              )}
            />
            <div className="flex flex-1 items-center justify-between gap-3">
              <span className="text-[13.5px] font-medium text-white">
                {revealed ? 'Hide answer' : 'Show answer'}
              </span>
              {revealed ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </div>
          </button>

          {revealed && (
            <div className="mt-3 rounded-xl border border-emerald-400/45 bg-emerald-400/[0.10] p-4">
              <div className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-emerald-400">
                Answer
              </div>
              <p className="text-[13.5px] text-white leading-relaxed">{correctAnswer}</p>
              {explanation && (
                <p className="mt-2 text-[13px] text-white leading-relaxed">{explanation}</p>
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
      className={cn(
        'relative overflow-hidden rounded-2xl border border-elec-yellow/35',
        CARD_SURFACE
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0" />
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-3.5 w-3.5 text-elec-yellow" />
          <span
            id={`${id}-label`}
            className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow"
          >
            Quick check
          </span>
        </div>

        <p className="text-[15.5px] font-semibold leading-snug text-white sm:text-[16.5px]">
          {question}
        </p>

        {/* Options. A 3px LEFT ACCENT BAR carries state, not a badge — it reads
            faster on a phone, keeps every line of text on the same left margin,
            and leaves the row quiet until it has something to say. */}
        <div className="mt-4 space-y-1.5">
          {options.map((opt, idx) => {
            const sel = selected === idx;
            const isCorrectOpt = submitted && idx === correctIndex;
            const isWrongOpt = submitted && sel && idx !== correctIndex;
            const settled = isCorrectOpt || isWrongOpt;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                aria-pressed={sel}
                className={cn(
                  'group relative flex w-full items-center gap-3 overflow-hidden rounded-xl',
                  'min-h-11 py-2.5 pl-4 pr-3 text-left',
                  'border transition-[background-color,border-color] duration-150',
                  'touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.995]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
                  isCorrectOpt
                    ? 'border-emerald-400/45 bg-emerald-400/[0.10]'
                    : isWrongOpt
                      ? 'border-red-400/45 bg-red-400/[0.10]'
                      : sel
                        ? 'border-elec-yellow/55 bg-white/[0.13]'
                        : 'border-white/[0.10] bg-white/[0.04] hover:border-white/[0.18] hover:bg-white/[0.08]',
                  submitted && !settled && 'opacity-45'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-y-0 left-0 w-[3px] rounded-l-xl transition-colors',
                    isCorrectOpt
                      ? 'bg-emerald-400'
                      : isWrongOpt
                        ? 'bg-red-400'
                        : sel
                          ? 'bg-elec-yellow'
                          : 'bg-transparent'
                  )}
                />
                <span className="flex-1 text-[14px] leading-snug text-white">{opt}</span>
                {settled && (
                  <span aria-hidden className="shrink-0">
                    {isCorrectOpt ? (
                      <CheckCircle2 className="h-[18px] w-[18px] text-emerald-400" />
                    ) : (
                      <XCircle className="h-[18px] w-[18px] text-red-400" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action row. Before submitting: one volt button. After: the verdict
            leads and "Try again" becomes the quiet option, because by then the
            result is the thing worth reading. */}
        <div className="mt-4 flex items-center gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selected === null}
              className={cn(
                'inline-flex h-11 items-center justify-center rounded-full px-6',
                'bg-elec-yellow text-[13px] font-semibold text-black',
                'touch-manipulation [-webkit-tap-highlight-color:transparent]',
                'transition-[opacity,transform] active:scale-[0.98] hover:bg-elec-yellow/90',
                'disabled:cursor-not-allowed disabled:opacity-35'
              )}
            >
              Check answer
            </button>
          ) : (
            <>
              <span
                className={cn(
                  'inline-flex h-11 flex-1 items-center gap-2 rounded-full border px-4',
                  'text-[13px] font-semibold text-white',
                  isCorrect
                    ? 'border-emerald-400/45 bg-emerald-400/[0.10]'
                    : 'border-orange-400/45 bg-orange-400/[0.10]'
                )}
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-orange-400" />
                )}
                {isCorrect ? 'Correct' : 'Not quite — the right answer is marked'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSelected(null);
                }}
                className={cn(
                  'inline-flex h-11 shrink-0 items-center rounded-full border border-white/[0.18] px-4',
                  'bg-white/[0.06] text-[12.5px] font-medium text-white',
                  'touch-manipulation hover:bg-white/[0.10]'
                )}
              >
                Retry
              </button>
            </>
          )}
        </div>

        {submitted && explanation && (
          <div className="mt-3 rounded-xl border border-white/[0.12] bg-white/[0.05] p-3.5">
            <p className="text-[13px] leading-relaxed text-white">{explanation}</p>
          </div>
        )}
      </div>
    </section>
  );
};
