
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-between mt-8">
      <Button 
        onClick={handlePrevious} 
        variant="outline" 
        disabled={currentStep === 1}
      >
        Previous
      </Button>
      
      <div className="text-sm text-muted-foreground pt-2">
        Step {currentStep} of {totalSteps}
      </div>
      
      <Button 
        onClick={handleNext} 
        variant="default" 
        disabled={currentStep === totalSteps}
      >
        Next
      </Button>
    </div>
  );
};

export default StepNavigation;
