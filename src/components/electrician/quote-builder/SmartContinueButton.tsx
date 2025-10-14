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
        className={cn(
          "w-full h-11 sm:h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold",
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
      className={cn(
        "w-full h-11 sm:h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold",
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