import StepNavigation from '../../StepNavigation';
import CommonIssuesCard from '../../CommonIssuesCard';
import { useState } from 'react';
import R1R2Step1 from './Step1';
import R1R2Step2 from './Step2';
import R1R2Step3 from './Step3';

const R1R2TestingTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            R1+R2 Testing
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Continuity of protective conductors. Tests the continuity of the circuit protective
            conductors, main and supplementary bonding conductors.
          </p>
        </div>

        <div className="space-y-4">
          {currentStep === 1 && <R1R2Step1 />}
          {currentStep === 2 && <R1R2Step2 />}
          {currentStep === 3 && <R1R2Step3 />}

          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      </div>

      <CommonIssuesCard />
    </div>
  );
};

export default R1R2TestingTab;
