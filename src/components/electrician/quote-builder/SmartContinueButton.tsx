import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartContinueButtonProps {
  canProceed: boolean;
  isLastStep: boolean;
  nextStepTitle?: string;
  onNext: () => void;
  onGenerate: () => void;
  completionPercentage?: number;
  className?: string;
}

export const SmartContinueButton = ({
  canProceed,
  isLastStep,
  nextStepTitle,
  onNext,
  onGenerate,
  completionPercentage = 0,
  className
}: SmartContinueButtonProps) => {
  if (isLastStep) {
    return (
      <Button
        onClick={onGenerate}
        disabled={!canProceed}
        size="lg"
        className={cn(
          "w-full sm:w-auto min-w-48 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed",
          canProceed && "hover:scale-105 shadow-green-500/25",
          className
        )}
      >
        <Calculator className="mr-2 h-5 w-5" />
        Generate Quote
        {canProceed && <CheckCircle className="ml-2 h-4 w-4" />}
      </Button>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={onNext}
        disabled={!canProceed}
        size="lg"
        className={cn(
          "w-full sm:w-auto min-w-48 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed",
          canProceed && "hover:scale-105 shadow-primary/25",
          className
        )}
      >
        <span className="flex items-center gap-2">
          Continue to {nextStepTitle}
          <ArrowRight className="h-4 w-4" />
        </span>
        {canProceed && <CheckCircle className="ml-2 h-4 w-4" />}
      </Button>
      
      {completionPercentage > 0 && (
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">
            Current step completion
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-24 bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, completionPercentage)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-primary">
              {Math.round(completionPercentage)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};