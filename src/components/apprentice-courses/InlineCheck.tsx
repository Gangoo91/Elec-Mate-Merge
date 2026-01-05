import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

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
    <section aria-labelledby={`${id}-label`} className="mb-6">
      <h3 id={`${id}-label`} className="text-sm font-semibold text-foreground mb-3">Quick check</h3>
      <div className="rounded-lg bg-card p-4">
        <p className="text-foreground font-medium mb-4">{question}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3" id={`${id}-hint`}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
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
                  "w-full text-left rounded-md border px-3 py-2 transition-colors cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  selectedThis && !submitted && "border-primary/50 bg-primary/10",
                  correctThis && "border-green-500/50 bg-green-500/10",
                  wrongThis && "border-red-500/50 bg-red-500/10",
                  !selectedThis && !submitted && "border-border/30 hover:bg-muted/30"
                )}
                aria-pressed={selectedThis}
                aria-describedby={`${id}-hint`}
                aria-label={`Select option ${idx + 1}: ${opt}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-foreground">{opt}</span>
                  {correctThis && <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden />}
                  {wrongThis && <XCircle className="h-4 w-4 text-red-500" aria-hidden />}
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
              "inline-flex items-center rounded-md border px-3 py-2 text-sm",
              submitted ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/40",
              "border-border/40"
            )}
          >
            Check answer
          </button>
          {submitted && (
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSelected(null);
              }}
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-muted/40 border-border/40"
            >
              Try another
            </button>
          )}
        </div>
        {submitted && (
          <div
            className={cn(
              "mt-4 rounded-md border p-3 text-sm",
              isCorrect ? "border-green-500/40 bg-green-500/10" : "border-red-500/40 bg-red-500/10"
            )}
            role="status"
            aria-live="polite"
          >
            <p className="font-medium mb-1">{isCorrect ? "Correct" : "Not quite"}</p>
            {explanation && <p className="text-muted-foreground">{explanation}</p>}
          </div>
        )}
      </div>
    </section>
  );
};
