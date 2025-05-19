
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  handleNext: () => void;
  handlePrevious: () => void;
}

const StepNavigation = ({
  currentStep,
  totalSteps,
  handleNext,
  handlePrevious
}: StepNavigationProps) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 w-8 rounded-full ${
              idx + 1 <= currentStep ? "bg-amber-500" : "bg-gray-700"
            }`}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-1 border-amber-500/20 hover:bg-amber-900/20"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleNext}
          disabled={currentStep === totalSteps}
          className="flex items-center gap-1 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepNavigation;
