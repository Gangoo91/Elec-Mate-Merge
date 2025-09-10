import React from "react";
import { Progress } from "@/components/ui/progress";

interface QuoteProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const QuoteProgressIndicator = ({
  currentStep,
  totalSteps,
  stepLabels
}: QuoteProgressIndicatorProps) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {totalSteps}: {stepLabels[currentStep]}
        </span>
        <span className="text-xs text-muted-foreground">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <Progress value={progressPercentage} className="h-1" />
    </div>
  );
};