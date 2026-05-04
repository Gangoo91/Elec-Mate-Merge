import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  handlePrevious,
}: StepNavigationProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between gap-3">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentStep === 1}
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] disabled:opacity-40 touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentStep === totalSteps}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              step === currentStep
                ? 'w-6 bg-elec-yellow'
                : step < currentStep
                  ? 'w-2 bg-white/40'
                  : 'w-2 bg-white/10'
            )}
          />
        ))}
      </div>

      <div className="text-center text-[12px] text-white/55 font-mono">
        Step {currentStep} of {totalSteps} · {Math.round((currentStep / totalSteps) * 100)}%
      </div>
    </div>
  );
};

export default StepNavigation;
