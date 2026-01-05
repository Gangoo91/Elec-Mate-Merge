import { useState } from "react";
import { ArrowLeft, ArrowRight, Flag, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { EnhancedFlagButton } from "./EnhancedFlagButton";

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

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    if (flaggedArray.length > 0) {
      const currentIndex = flaggedArray.indexOf(currentQuestion);
      const nextIndex = (currentIndex + 1) % flaggedArray.length;
      onQuestionSelect(flaggedArray[nextIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-elec-grey">
      {/* Mobile Header */}
      <div className="lg:hidden bg-elec-card border-b border-elec-yellow/20 sticky top-0 z-20">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Link to={exitPath}>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-sm font-semibold text-elec-light">{examTitle}</h1>
                <p className="text-xs text-muted-foreground">Question {currentQuestion + 1} of {totalQuestions}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm font-bold text-elec-yellow">{formatTime(timeRemaining)}</div>
                <div className="text-xs text-muted-foreground">{answeredQuestions}/{totalQuestions}</div>
              </div>
              <EnhancedFlagButton
                isFlagged={flaggedQuestions.has(currentQuestion)}
                onClick={onToggleFlag}
                variant="mobile"
              />
            </div>
          </div>
          <Progress value={progressPercentage} className="h-1" />
        </div>
        
        {/* Question Grid Toggle */}
        <div className="px-3 pb-2">
          <Button
            onClick={() => setShowQuestionGrid(!showQuestionGrid)}
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
          >
            {showQuestionGrid ? 'Hide' : 'Show'} Question Grid
          </Button>
          
          {showQuestionGrid && (
            <div className="mt-2 p-3 bg-elec-grey rounded-lg border border-elec-yellow/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-elec-light">Quick Navigation</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    goToNextFlagged();
                    setShowQuestionGrid(false);
                  }}
                  disabled={flaggedQuestions.size === 0}
                  className="text-xs h-6 px-2"
                >
                  Next Flagged
                </Button>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: totalQuestions }, (_, index) => {
                  const isFlagged = flaggedQuestions.has(index);
                  const isAnswered = selectedAnswers[index] !== -1;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        onQuestionSelect(index);
                        setShowQuestionGrid(false);
                      }}
                      className={`aspect-square text-xs font-medium rounded border transition-all ${
                        currentQuestion === index
                          ? "bg-elec-yellow text-elec-dark border-elec-yellow ring-1 ring-elec-yellow/50"
                          : isAnswered
                          ? "bg-green-500/20 text-green-500 border-green-500/40"
                          : isFlagged
                          ? "bg-red-500/20 text-red-500 border-red-500/40"
                          : "bg-muted/20 text-muted-foreground border-muted/40"
                      }`}
                    >
                      {isFlagged ? <Flag className="h-2 w-2 mx-auto fill-current" /> : index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-2 sm:p-4">
        {children}
      </div>

      {/* Mobile Navigation Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-elec-card border-t border-elec-yellow/20 p-3">
        <div className="flex justify-between gap-3 mb-3">
          <Button
            onClick={onPrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={currentQuestion === totalQuestions - 1}
            className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <Button
          onClick={onSubmit}
          className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-bold"
          size="lg"
        >
          Submit Exam
        </Button>
      </div>
    </div>
  );
};