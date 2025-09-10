import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartContinueButtonProps {
  canProceed: boolean;
  isLastStep: boolean;
  nextStepTitle?: string;
  onNext: () => void;
  onGenerate: () => void;
  className?: string;
}

export const SmartContinueButton = ({
  canProceed,
  isLastStep,
  nextStepTitle,
  onNext,
  onGenerate,
  className
}: SmartContinueButtonProps) => {
  if (isLastStep) {
    return (
      <Button
        onClick={onGenerate}
        disabled={!canProceed}
        size="lg"
        className={cn(
          "w-full sm:w-auto min-w-48",
          className
        )}
      >
        <Calculator className="mr-2 h-4 w-4" />
        Generate Quote
      </Button>
    );
  }

  return (
    <Button
      onClick={onNext}
      disabled={!canProceed}
      size="lg"
      className={cn(
        "w-full sm:w-auto min-w-48",
        className
      )}
    >
      Continue to {nextStepTitle}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
};