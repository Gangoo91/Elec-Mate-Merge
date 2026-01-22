/**
 * ExamMobileLayout - Best-in-class single viewport exam layout
 *
 * Designed for mobile-first experience:
 * - 48px header with integrated progress
 * - 52px footer with Prev/Flag/Next
 * - Question grid accessible via sheet
 * - All 4 options visible without scrolling
 */

import { useState } from "react";
import { ArrowLeft, ArrowRight, Flag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

interface ExamMobileLayoutProps {
  examTitle: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  answeredQuestions: number;
  flaggedQuestions: Set<number>;
  selectedAnswers: number[];
  onQuestionSelect: (index: number) => void;
  onToggleFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  exitPath: string;
  formatTime: (seconds: number) => string;
  children: React.ReactNode;
}

export const ExamMobileLayout = ({
  examTitle,
  currentQuestion,
  totalQuestions,
  timeRemaining,
  answeredQuestions,
  flaggedQuestions,
  selectedAnswers,
  onQuestionSelect,
  onToggleFlag,
  onPrevious,
  onNext,
  onSubmit,
  exitPath,
  formatTime,
  children
}: ExamMobileLayoutProps) => {
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isFlagged = flaggedQuestions.has(currentQuestion);

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    if (flaggedArray.length > 0) {
      const currentIndex = flaggedArray.indexOf(currentQuestion);
      const nextIndex = (currentIndex + 1) % flaggedArray.length;
      onQuestionSelect(flaggedArray[nextIndex]);
      setShowQuestionGrid(false);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0d0d0d] lg:hidden">
      {/* Compact Header - 48px */}
      <div className="h-12 flex items-center px-3 bg-[#0d0d0d] border-b border-white/5 flex-shrink-0">
        {/* Back button */}
        <Link to={exitPath} className="p-2 -ml-2 touch-manipulation">
          <ArrowLeft className="h-5 w-5 text-white/60" />
        </Link>

        {/* Question counter - tappable for grid */}
        <button
          onClick={() => setShowQuestionGrid(true)}
          className="ml-1 text-sm font-semibold text-white touch-manipulation active:opacity-70"
        >
          Q{currentQuestion + 1}/{totalQuestions}
        </button>

        {/* Progress bar - flex grow */}
        <div className="flex-1 mx-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Timer */}
        <div className={`font-mono text-sm font-bold ${timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-elec-yellow'}`}>
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Main Content - fills remaining space with padding for footer */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
        {children}
      </div>

      {/* Compact Footer - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[52px] flex items-center justify-between px-3 py-2 bg-[#0d0d0d] border-t border-white/5 z-50 lg:hidden">
        <Button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          variant="ghost"
          className="h-10 px-4 text-white/70 disabled:opacity-30 touch-manipulation active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>

        <Button
          onClick={onToggleFlag}
          variant="ghost"
          className={`h-10 w-10 p-0 touch-manipulation active:scale-95 ${isFlagged ? 'text-elec-yellow' : 'text-white/40'}`}
        >
          <Flag className={`h-5 w-5 ${isFlagged ? 'fill-current' : ''}`} />
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={onSubmit}
            className="h-10 px-5 bg-green-500 hover:bg-green-600 text-white font-semibold touch-manipulation active:scale-95"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="h-10 px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Question Grid Sheet */}
      <Sheet open={showQuestionGrid} onOpenChange={setShowQuestionGrid}>
        <SheetContent side="bottom" className="h-[55vh] rounded-t-2xl bg-[#1a1a1a] border-white/10">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
          <SheetHeader className="pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white">Question Navigator</SheetTitle>
              <div className="flex items-center gap-2">
                {flaggedQuestions.size > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextFlagged}
                    className="text-xs border-elec-yellow/40 text-elec-yellow h-8"
                  >
                    <Flag className="h-3 w-3 mr-1 fill-current" />
                    Next Flagged ({flaggedQuestions.size})
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-white/60">
              {answeredQuestions} answered • {flaggedQuestions.size} flagged
            </p>
          </SheetHeader>

          <div className="grid grid-cols-6 gap-2 overflow-y-auto pb-8">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const isQFlagged = flaggedQuestions.has(index);
              const isAnswered = selectedAnswers[index] !== -1;
              const isCurrent = currentQuestion === index;

              return (
                <button
                  key={index}
                  onClick={() => {
                    onQuestionSelect(index);
                    setShowQuestionGrid(false);
                  }}
                  className={`aspect-square text-sm font-bold rounded-xl border-2 transition-all touch-manipulation active:scale-95 relative ${
                    isCurrent
                      ? "bg-elec-yellow text-black border-elec-yellow"
                      : isAnswered
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-white/5 text-white/60 border-white/10"
                  }`}
                >
                  {index + 1}
                  {isQFlagged && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-elec-yellow rounded-full flex items-center justify-center">
                      <Flag className="w-2 h-2 text-black fill-current" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
