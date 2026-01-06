import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export interface InlineCheckProps {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const InlineCheck: React.FC<InlineCheckProps> = ({ id, question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selected === correctIndex;
  const isWrong = submitted && selected !== correctIndex;

  return (
    <section aria-labelledby={`${id}-label`} className="my-8">
      <div className="flex items-center gap-2 text-elec-yellow mb-4">
        <HelpCircle className="h-5 w-5" />
        <h3 id={`${id}-label`} className="text-lg font-semibold">Quick Check</h3>
      </div>
      <div className="space-y-4">
        <p className="text-white font-medium text-lg">{question}</p>
        <div className="flex items-center gap-2 text-xs text-white/60 mb-3" id={`${id}-hint`}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow animate-pulse" aria-hidden />
          <span>Click an option below to answer</span>
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
                  "w-full text-left rounded-lg border px-4 py-3 transition-all duration-200 cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50",
                  selectedThis && !submitted && "border-elec-yellow/50 bg-elec-yellow/20 text-elec-yellow",
                  correctThis && "border-green-400/50 bg-green-500/20 text-green-300",
                  wrongThis && "border-red-400/50 bg-red-500/20 text-red-300",
                  !selectedThis && !submitted && "border-white/10 hover:border-elec-yellow/30 text-white"
                )}
                aria-pressed={selectedThis}
                aria-describedby={`${id}-hint`}
                aria-label={`Select option ${idx + 1}: ${opt}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">{opt}</span>
                  {correctThis && <CheckCircle2 className="h-4 w-4 text-green-400" aria-hidden />}
                  {wrongThis && <XCircle className="h-4 w-4 text-red-400" aria-hidden />}
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={selected === null || submitted}
            className={cn(
              "inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all",
              submitted
                ? "opacity-60 cursor-not-allowed bg-white/10 text-white/60"
                : "bg-elec-yellow text-[#121212] hover:bg-elec-yellow/90"
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
              className="inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
        {submitted && (
          <div
            className={cn(
              "mt-4 rounded-lg border p-4",
              isCorrect ? "border-green-400/30 bg-green-500/10" : "border-red-400/30 bg-red-500/10"
            )}
            role="status"
            aria-live="polite"
          >
            <p className={cn("font-medium mb-1", isCorrect ? "text-green-300" : "text-red-300")}>
              {isCorrect ? "✓ Correct!" : "Not quite"}
            </p>
            {explanation && <p className="text-white text-sm">{explanation}</p>}
          </div>
        )}
      </div>
    </section>
  );
};
