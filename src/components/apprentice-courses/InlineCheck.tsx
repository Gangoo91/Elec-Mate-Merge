import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export interface InlineCheckProps {
  id?: string;
  question: string;
  // Multiple choice mode
  options?: string[];
  correctIndex?: number;
  // Free-text reveal mode (alternative to options)
  correctAnswer?: string;
  explanation?: string;
}

export const InlineCheck: React.FC<InlineCheckProps> = ({
  id = `inline-check-${Math.random().toString(36).substr(2, 9)}`,
  question,
  options,
  correctIndex,
  correctAnswer,
  explanation
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Determine mode: multiple choice (has options) or free-text reveal (has correctAnswer)
  const isMultipleChoice = options && Array.isArray(options) && options.length > 0;
  const isFreeText = !isMultipleChoice && correctAnswer;

  const isCorrect = submitted && selected === correctIndex;
  const isWrong = submitted && selected !== correctIndex;

  // Free-text reveal mode
  if (isFreeText) {
    return (
      <section aria-labelledby={`${id}-label`} className="my-6 sm:my-8">
        <div className="flex items-center gap-2 text-elec-yellow mb-3 sm:mb-4">
          <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          <h3 id={`${id}-label`} className="text-base sm:text-lg font-semibold">Quick Check</h3>
        </div>
        <div className="space-y-4">
          <p className="text-white font-medium text-base sm:text-lg leading-relaxed">{question}</p>

          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            className={cn(
              "w-full min-h-[52px] text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 cursor-pointer touch-manipulation active:scale-[0.98]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50",
              revealed
                ? "border-elec-yellow/50 bg-elec-yellow/10"
                : "border-white/10 hover:border-elec-yellow/30 hover:bg-white/5"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm sm:text-base text-white/80">
                {revealed ? "Hide Answer" : "Tap to reveal answer"}
              </span>
              {revealed ? (
                <ChevronUp className="h-5 w-5 text-elec-yellow flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0" />
              )}
            </div>
          </button>

          {revealed && (
            <div className="rounded-xl border border-green-400/30 bg-green-500/10 p-4">
              <p className="font-semibold mb-2 text-base text-green-300">Answer:</p>
              <p className="text-white text-sm sm:text-base leading-relaxed">{correctAnswer}</p>
              {explanation && (
                <p className="text-white/70 text-sm mt-3 leading-relaxed">{explanation}</p>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Multiple choice mode - guard against invalid options
  if (!isMultipleChoice) {
    return null;
  }

  return (
    <section aria-labelledby={`${id}-label`} className="my-6 sm:my-8">
      <div className="flex items-center gap-2 text-elec-yellow mb-3 sm:mb-4">
        <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        <h3 id={`${id}-label`} className="text-base sm:text-lg font-semibold">Quick Check</h3>
      </div>
      <div className="space-y-4">
        <p className="text-white font-medium text-base sm:text-lg leading-relaxed">{question}</p>
        <div className="flex items-center gap-2 text-xs text-white/60 mb-3" id={`${id}-hint`}>
          <span className="inline-block h-2 w-2 rounded-full bg-elec-yellow animate-pulse" aria-hidden />
          <span>Tap an option to select your answer</span>
        </div>
        <div className="grid gap-3" aria-describedby={`${id}-hint`}>
          {options.map((opt, idx) => {
            const selectedThis = selected === idx;
            const correctThis = submitted && idx === correctIndex;
            const wrongThis = submitted && selectedThis && idx !== correctIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (!submitted) setSelected(idx);
                }}
                className={cn(
                  "w-full min-h-[52px] text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 cursor-pointer touch-manipulation active:scale-[0.98]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50",
                  selectedThis && !submitted && "border-elec-yellow/50 bg-elec-yellow/20 text-elec-yellow",
                  correctThis && "border-green-400/50 bg-green-500/20 text-green-300",
                  wrongThis && "border-red-400/50 bg-red-500/20 text-red-300",
                  !selectedThis && !submitted && "border-white/10 hover:border-elec-yellow/30 active:bg-white/5 text-white"
                )}
                aria-pressed={selectedThis}
                aria-describedby={`${id}-hint`}
                aria-label={`Select option ${idx + 1}: ${opt}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base leading-snug flex-1">{opt}</span>
                  {correctThis && <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" aria-hidden />}
                  {wrongThis && <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" aria-hidden />}
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={selected === null || submitted}
            className={cn(
              "inline-flex items-center justify-center rounded-xl px-6 py-3 min-h-[48px] text-sm sm:text-base font-semibold transition-all touch-manipulation active:scale-[0.98]",
              submitted
                ? "opacity-60 cursor-not-allowed bg-white/10 text-white/60"
                : "bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90"
            )}
          >
            Check Answer
          </button>
          {submitted && (
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSelected(null);
              }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 px-6 py-3 min-h-[48px] text-sm sm:text-base text-white hover:bg-white/10 transition-colors touch-manipulation active:scale-[0.98]"
            >
              Try Again
            </button>
          )}
        </div>
        {submitted && (
          <div
            className={cn(
              "mt-4 rounded-xl border p-4",
              isCorrect ? "border-green-400/30 bg-green-500/10" : "border-red-400/30 bg-red-500/10"
            )}
            role="status"
            aria-live="polite"
          >
            <p className={cn("font-semibold mb-1 text-base", isCorrect ? "text-green-300" : "text-red-300")}>
              {isCorrect ? "✓ Correct!" : "Not quite"}
            </p>
            {explanation && <p className="text-white text-sm sm:text-base leading-relaxed">{explanation}</p>}
          </div>
        )}
      </div>
    </section>
  );
};
