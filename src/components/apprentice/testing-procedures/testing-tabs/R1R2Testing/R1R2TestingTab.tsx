import { PANEL } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
import StepNavigation from '../../StepNavigation';
import CommonIssuesCard from '../../CommonIssuesCard';
import { r1r2Issues } from '../../commonIssues';
import { useState } from 'react';
import R1R2Step1 from './Step1';
import R1R2Step2 from './Step2';
import R1R2Step3 from './Step3';
import R1R2Step4 from './Step4';

const R1R2TestingTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className={cn(PANEL, "space-y-4")}>
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            R₁+R₂ continuity testing
          </h2>
          <p className="text-[14px] text-white leading-relaxed">
            Verifies that the circuit protective conductor is continuous and correctly sized, and
            gives you the R₁ + R₂ value the circuit's Zs is built from.
          </p>
        </div>

        <div className="space-y-4">
          {currentStep === 1 && <R1R2Step1 />}
          {currentStep === 2 && <R1R2Step2 />}
          {currentStep === 3 && <R1R2Step3 />}
          {currentStep === 4 && <R1R2Step4 />}

          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      </div>

      <CommonIssuesCard issues={r1r2Issues} />
    </div>
  );
};

export default R1R2TestingTab;
