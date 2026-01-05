import { ArrowLeft, Clock, Target, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ExamDesktopSidebarProps {
  timeRemaining: number;
  answeredQuestions: number;
  totalQuestions: number;
  flaggedQuestions: Set<number>;
  selectedAnswers: number[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
  onSubmit: () => void;
  exitPath: string;
  formatTime: (seconds: number) => string;
}

export const ExamDesktopSidebar = ({
  timeRemaining,
  answeredQuestions,
  totalQuestions,
  flaggedQuestions,
  selectedAnswers,
  currentQuestion,
  onQuestionSelect,
  onSubmit,
  exitPath,
  formatTime
}: ExamDesktopSidebarProps) => {
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
    <div className="hidden lg:block lg:w-80 flex-shrink-0">
      <Card className="bg-elec-card border-elec-yellow/20 sticky top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-elec-light flex items-center gap-2">
            <Target className="h-4 w-4" />
            Mock Exam Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Timer */}
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 p-4 rounded-xl border border-elec-yellow/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-medium text-elec-light">Time Remaining</span>
            </div>
            <div className="font-mono text-2xl font-bold text-elec-yellow text-center">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-xs text-center text-muted-foreground mt-1">
              {timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}
            </div>
          </div>

          {/* Progress */}
          <div className="bg-background/50 p-4 rounded-lg border border-elec-yellow/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-elec-light">Progress</span>
              <span className="text-lg font-bold text-elec-yellow">{answeredQuestions}/{totalQuestions}</span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-3" />
            <div className="text-xs text-center text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              Statistics
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                <div className="text-lg font-bold text-green-500">{answeredQuestions}</div>
                <div className="text-xs text-muted-foreground">Answered</div>
              </div>
              <div className="bg-elec-yellow/10 p-3 rounded-lg border border-elec-yellow/20 text-center">
                <div className="text-lg font-bold text-elec-yellow">{flaggedQuestions.size}</div>
                <div className="text-xs text-muted-foreground">Flagged</div>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-elec-light">Questions</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextFlagged}
                disabled={flaggedQuestions.size === 0}
                className="text-xs h-6 px-2"
              >
                Next Flagged
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: totalQuestions }, (_, index) => {
                const isFlagged = flaggedQuestions.has(index);
                const isAnswered = selectedAnswers[index] !== -1;
                
                return (
                  <button
                    key={index}
                    onClick={() => onQuestionSelect(index)}
                    className={`aspect-square text-xs font-medium rounded border transition-all ${
                      currentQuestion === index
                        ? "bg-elec-yellow text-elec-dark border-elec-yellow ring-2 ring-elec-yellow/50"
                        : isAnswered
                        ? "bg-green-500/20 text-green-500 border-green-500/40 hover:bg-green-500/30"
                        : isFlagged
                        ? "bg-red-500/20 text-red-500 border-red-500/40 hover:bg-red-500/30"
                        : "bg-muted/20 text-muted-foreground border-muted/40 hover:bg-muted/30"
                    }`}
                  >
                    {isFlagged && <Flag className="h-2 w-2 mb-0.5 mx-auto fill-current" />}
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4">
            <Button
              onClick={onSubmit}
              className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-bold"
              size="sm"
            >
              Submit Exam
            </Button>
            <Link to={exitPath}>
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Exam
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};