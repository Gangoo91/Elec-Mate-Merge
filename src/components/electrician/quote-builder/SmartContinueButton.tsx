import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartContinueButtonProps {
  canProceed: boolean;
  isLastStep: boolean;
  nextStepTitle?: string;
  onNext: () => void;
  onGenerate: () => void;
  className?: string;
  isGenerating?: boolean;
}

export const SmartContinueButton = ({
  canProceed,
  isLastStep,
  nextStepTitle,
  onNext,
  onGenerate,
  className,
  isGenerating = false
}: SmartContinueButtonProps) => {
  if (isLastStep) {
    return (
      <Button
        onClick={onGenerate}
        disabled={!canProceed || isGenerating}
        size="lg"
        className={cn(
          "w-full sm:w-auto sm:min-w-40 max-w-full",
          className
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Calculator className="mr-2 h-4 w-4" />
            Generate Quote
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={onNext}
      disabled={!canProceed}
      size="lg"
      className={cn(
        "w-full sm:w-auto sm:min-w-40 max-w-full text-left justify-start sm:justify-center",
        className
      )}
    >
      <span className="truncate">
        Continue to {nextStepTitle}
      </span>
      <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
    </Button>
  );
};