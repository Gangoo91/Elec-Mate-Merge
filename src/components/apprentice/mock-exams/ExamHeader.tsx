
import React from "react";
import { X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExamHeaderProps {
  title: string;
  timeRemaining: string;
  onExitClick: () => void;
  questionIndex: number;
  questionCount: number;
  isExamStarted: boolean;
  isExamFinished: boolean;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
  title,
  timeRemaining,
  onExitClick,
  questionIndex,
  questionCount,
  isExamStarted,
  isExamFinished
}) => {
  const isMobile = useIsMobile();
  const progress = isExamStarted && !isExamFinished ? (questionIndex / questionCount) * 100 : 0;

  return (
    <div className="bg-elec-gray border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex-1 mb-3 sm:mb-0">
          <h1 className="text-lg sm:text-xl font-semibold leading-tight">{title}</h1>
          {isMobile && isExamStarted && !isExamFinished && (
            <div className="flex items-center mt-2 gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="font-mono text-sm">{timeRemaining}</span>
              <span className="text-xs text-muted-foreground">remaining</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-row justify-between sm:justify-end items-center gap-3 sm:gap-4">
          {!isMobile && isExamStarted && !isExamFinished && (
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="font-mono text-lg">{timeRemaining}</span>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExitClick}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 h-auto"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Exit Exam</span>
            <span className="sm:hidden">Exit</span>
          </Button>
        </div>
      </div>
      
      {isExamStarted && !isExamFinished && (
        <div className="mt-3 sm:mt-4">
          <div className="flex justify-between mb-1 text-xs">
            <span>Question {questionIndex} of {questionCount}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default ExamHeader;
