import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import HazardIdentificationMatrix from './risk-assessment/HazardIdentificationMatrix';
import RiskCalculationMatrix from './risk-assessment/RiskCalculationMatrix';
import ControlMeasuresGenerator from './risk-assessment/ControlMeasuresGenerator';
import RiskOutcomeGuidance from './risk-assessment/RiskOutcomeGuidance';
import RiskDocumentation from './risk-assessment/RiskDocumentation';
import type { useAssessmentProgress } from './hooks/useAssessmentProgress';

interface RiskAssessment {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
  timestamp: string;
  assessor: string;
  location: string;
}

interface RiskAssessmentFlowProps {
  progress: ReturnType<typeof useAssessmentProgress>;
}

const steps = [
  { number: 1, label: 'Hazard' },
  { number: 2, label: 'Risk' },
  { number: 3, label: 'Controls' },
  { number: 4, label: 'Guidance' },
  { number: 5, label: 'Export' },
];

const calculateRiskLevel = (score: number): string => {
  if (score >= 15) return 'Very High';
  if (score >= 10) return 'High';
  if (score >= 6) return 'Medium';
  if (score >= 3) return 'Low';
  return 'Very Low';
};

const RiskAssessmentFlow = ({ progress }: RiskAssessmentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedHazard, setSelectedHazard] = useState('');
  const [currentAssessment, setCurrentAssessment] = useState<RiskAssessment | null>(null);

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return selectedHazard !== '';
      case 2:
        return currentAssessment !== null;
      case 3:
        return currentAssessment !== null && currentAssessment.controlMeasures.length > 0;
      case 4:
        return currentAssessment !== null;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleHazardSelected = (hazard: string) => {
    setSelectedHazard(hazard);
    setCurrentAssessment(null);
  };

  const handleRiskCalculated = (likelihood: number, severity: number) => {
    if (!selectedHazard) return;
    const riskScore = likelihood * severity;
    const riskLevel = calculateRiskLevel(riskScore);
    const newAssessment: RiskAssessment = {
      id: `RA-${Date.now()}`,
      hazard: selectedHazard,
      likelihood,
      severity,
      riskScore,
      riskLevel,
      controlMeasures: [],
      timestamp: new Date().toISOString(),
      assessor: 'Current User',
      location: 'Site Location',
    };
    setCurrentAssessment(newAssessment);
    setCurrentStep(3);
  };

  const handleControlMeasuresAdded = (controlMeasures: string[]) => {
    if (currentAssessment) {
      const updated = { ...currentAssessment, controlMeasures };
      setCurrentAssessment(updated);
      progress.saveRiskAssessment({
        hazard: updated.hazard,
        likelihood: updated.likelihood,
        severity: updated.severity,
        riskScore: updated.riskScore,
        riskLevel: updated.riskLevel,
        controlMeasures: updated.controlMeasures,
        location: updated.location,
      });
      setCurrentStep(4);
    }
  };

  const handleStartNew = () => {
    setCurrentStep(1);
    setSelectedHazard('');
    setCurrentAssessment(null);
  };

  const getStepClasses = (stepNum: number) => {
    if (stepNum < currentStep) return 'bg-white/[0.04] text-white border-white/10';
    if (stepNum === currentStep)
      return 'bg-elec-yellow text-black font-semibold border-elec-yellow';
    return 'bg-transparent text-white/55 border-white/10';
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between px-2">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[12px] transition-colors ${getStepClasses(step.number)}`}
              >
                {step.number < currentStep ? <CheckCircle className="h-4 w-4" /> : step.number}
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1 hidden sm:block">
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-6 sm:w-10 h-px mx-1 ${step.number < currentStep ? 'bg-white/30' : 'bg-white/10'}`}
              />
            )}
          </div>
        ))}
      </div>

      {progress.riskAssessments.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Saved
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {progress.riskAssessments.length} assessment
            {progress.riskAssessments.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="space-y-4">
        {currentStep === 1 && (
          <>
            <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />
            {selectedHazard && (
              <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Selected hazard
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{selectedHazard}</p>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && <RiskCalculationMatrix onRiskCalculated={handleRiskCalculated} />}

        {currentStep === 3 && (
          <ControlMeasuresGenerator onControlMeasuresAdded={handleControlMeasuresAdded} />
        )}

        {currentStep === 4 && currentAssessment && (
          <RiskOutcomeGuidance
            riskLevel={currentAssessment.riskLevel}
            riskScore={currentAssessment.riskScore}
          />
        )}

        {currentStep === 5 && (
          <>
            <RiskDocumentation assessment={currentAssessment} />
            <Button
              onClick={handleStartNew}
              variant="outline"
              className="w-full h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              Start new assessment
            </Button>
          </>
        )}
      </div>

      {currentStep < 5 && (
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              variant="outline"
              className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {(currentStep === 1 || currentStep === 4) && (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canGoNext()}
              className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-30"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentFlow;
