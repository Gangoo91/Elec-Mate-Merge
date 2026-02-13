import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface SubStep {
  label: string;
  progress: number;
}

interface SubStepProgressProps {
  currentSubStep: SubStep | null;
  isComplete: boolean;
}

export const SubStepProgress: React.FC<SubStepProgressProps> = ({ currentSubStep, isComplete }) => {
  if (isComplete) {
    return (
      <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span className="font-medium">Complete</span>
      </div>
    );
  }

  if (!currentSubStep) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-white">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-elec-yellow" />
        <span className="font-medium">{currentSubStep.label}</span>
        <span className="text-white ml-auto">{currentSubStep.progress}%</span>
      </div>
      <Progress value={currentSubStep.progress} className="h-1" />
    </div>
  );
};
