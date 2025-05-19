
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <Button 
          onClick={handlePrevious} 
          variant="outline" 
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button 
          onClick={handleNext} 
          variant="default" 
          disabled={currentStep === totalSteps}
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center space-x-1">
        {steps.map((step) => (
          <div 
            key={step}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              step === currentStep 
                ? "w-6 bg-elec-yellow" 
                : "w-2 bg-gray-600",
              step < currentStep && "bg-green-500"
            )}
          >
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps} - {Math.round((currentStep / totalSteps) * 100)}% Complete
      </div>
    </div>
  );
};

export default StepNavigation;
