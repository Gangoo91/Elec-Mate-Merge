import React from 'react';
import { Button } from '@/components/ui/button';

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
  onExit,
}) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs > 0 ? `${hrs}h ` : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span className="font-mono text-[13px] text-white">{formatTime(timeRemaining)}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={onExit}
          className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          Exit
        </Button>
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ExamHeader;
