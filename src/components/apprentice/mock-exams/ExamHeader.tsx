
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface ExamHeaderProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  onExit: () => void;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
  currentQuestionIndex,
  totalQuestions,
  timeRemaining,
  onExit
}) => {
  // Format time remaining
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-elec-yellow" />
          <span className="font-mono">{formatTime(timeRemaining)}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onExit}>
          Exit Exam
        </Button>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
    </>
  );
};

export default ExamHeader;
