/**
 * VideoQuizSheet
 *
 * Bottom-sheet quiz shown after a learning video — one question at a time,
 * instant feedback with a one-line explanation, score at the end. The parent
 * owns XP: onComplete fires once per finished attempt with the score and the
 * real minutes spent.
 */

import { useEffect, useRef, useState } from 'react';
import { Check, X, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import type { VideoQuizQuestion } from '@/data/apprentice/videoQuizzes';

interface VideoQuizSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoTitle: string;
  questions: VideoQuizQuestion[];
  /** Fires once per completed attempt. minutes is real elapsed time (>=1). */
  onComplete: (correct: number, total: number, minutes: number) => void;
}

export function VideoQuizSheet({
  open,
  onOpenChange,
  videoTitle,
  questions,
  onComplete,
}: VideoQuizSheetProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const startedAt = useRef<number>(0);
  const reportedRef = useRef(false);

  // Fresh attempt every time the sheet opens
  useEffect(() => {
    if (open) {
      setIndex(0);
      setSelected(null);
      setCorrectCount(0);
      setFinished(false);
      startedAt.current = Date.now();
      reportedRef.current = false;
    }
  }, [open]);

  const question = questions[index];
  const total = questions.length;
  const isLast = index === total - 1;
  const answered = selected !== null;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === question.correctIndex) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      if (!reportedRef.current) {
        reportedRef.current = true;
        const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60_000));
        onComplete(correctCount, total, Math.min(minutes, 15));
      }
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRetake = () => {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
    startedAt.current = Date.now();
    reportedRef.current = false;
  };

  const passed = correctCount / total >= 2 / 3;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[hsl(0_0%_8%)]"
      >
        <div className="flex flex-col h-full">
          <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" />
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-white/[0.08]">
            <div className="mx-auto w-full max-w-xl">
              <SheetTitle className="text-[15px] font-semibold text-white">
                Test yourself
              </SheetTitle>
              <p className="mt-0.5 text-[12px] text-white line-clamp-1">{videoTitle}</p>
              {!finished && (
                <div className="mt-3 flex items-center gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < index || (i === index && answered)
                          ? 'bg-elec-yellow'
                          : 'bg-white/[0.12]'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-white tabular-nums ml-1">
                    {index + 1}/{total}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 pb-24">
            <div className="mx-auto w-full max-w-xl">
              {finished ? (
                /* ── Results ── */
                <div className="flex flex-col items-center text-center pt-8">
                  <div
                    className={`h-20 w-20 rounded-full flex items-center justify-center mb-5 ${
                      passed ? 'bg-elec-yellow' : 'bg-white/[0.08] border border-white/[0.15]'
                    }`}
                  >
                    {passed ? (
                      <Award className="h-9 w-9 text-black" />
                    ) : (
                      <RotateCcw className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <p className="text-[26px] font-bold text-white tabular-nums">
                    {correctCount}/{total}
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-white">
                    {passed ? 'Nice work — quiz passed' : 'Not quite — give it another go'}
                  </p>
                  <p className="mt-1.5 text-[12.5px] text-white max-w-[32ch]">
                    {passed
                      ? 'You clearly took the video in. XP banked.'
                      : 'Rewatch the tricky bits, then retake — passing needs 2 of 3.'}
                  </p>
                  <div className="mt-7 flex items-center gap-2.5 w-full max-w-xs">
                    <button
                      onClick={handleRetake}
                      className="flex-1 h-11 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                    >
                      Retake
                    </button>
                    <button
                      onClick={() => onOpenChange(false)}
                      className="flex-1 h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Question ── */
                <div>
                  <p className="text-[16px] font-semibold leading-snug text-white">
                    {question.question}
                  </p>
                  <div className="mt-5 space-y-2.5">
                    {question.options.map((opt, i) => {
                      const isCorrect = i === question.correctIndex;
                      const isChosen = i === selected;
                      let cls =
                        'bg-white/[0.05] border-white/[0.12] text-white hover:bg-white/[0.08]';
                      if (answered && isCorrect)
                        cls = 'bg-green-500/15 border-green-400/50 text-white';
                      else if (answered && isChosen && !isCorrect)
                        cls = 'bg-red-500/15 border-red-400/50 text-white';
                      else if (answered) cls = 'bg-white/[0.03] border-white/[0.08] text-white';
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(i)}
                          disabled={answered}
                          className={`w-full min-h-11 px-4 py-3 rounded-xl border text-left text-[13.5px] font-medium leading-snug touch-manipulation transition-all active:scale-[0.99] flex items-start gap-3 ${cls}`}
                        >
                          <span className="flex-1">{opt}</span>
                          {answered && isCorrect && (
                            <Check
                              className="h-[18px] w-[18px] shrink-0 mt-0.5 text-green-400"
                              strokeWidth={3}
                            />
                          )}
                          {answered && isChosen && !isCorrect && (
                            <X
                              className="h-[18px] w-[18px] shrink-0 mt-0.5 text-red-400"
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <div className="mt-4 rounded-xl border border-elec-yellow/25 bg-white/[0.05] px-4 py-3">
                      <p className="text-[12.5px] leading-relaxed text-white">
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer — Next / See score */}
          {!finished && (
            <div className="absolute bottom-0 inset-x-0 px-5 pb-6 pt-3 bg-gradient-to-t from-background via-background to-transparent">
              <div className="mx-auto w-full max-w-xl">
                <button
                  onClick={handleNext}
                  disabled={!answered}
                  className={`w-full h-12 rounded-full text-[14px] font-semibold touch-manipulation transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                    answered
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white cursor-not-allowed'
                  }`}
                >
                  {isLast ? 'See my score' : 'Next question'}
                  <ChevronRight className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
