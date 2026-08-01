import { useState, useEffect } from 'react';
import { MethodStatementData, WizardStep } from '@/types/method-statement';
import SafetyDocShell, {
  computeSafetyDocProgress,
  type SafetyDocStepConfig,
} from '../common/SafetyDocShell';
import TemplateSelectionStep from './steps/TemplateSelectionStep';
import DetailsStep from './steps/DetailsStep';
import StepsManagementStep from './steps/StepsManagementStep';
import ReviewStep from './steps/ReviewStep';
import HazardIntegrationStep from './components/HazardIntegrationStep';

interface MethodStatementWizardProps {
  onBack?: () => void;
}

const STEPS: { id: WizardStep; title: string; description: string }[] = [
  { id: 'template', title: 'Template', description: 'Choose a template' },
  { id: 'details', title: 'Job Details', description: 'Basic information' },
  { id: 'steps', title: 'Method Steps', description: 'Build your process' },
  { id: 'hazards', title: 'Hazards', description: 'Link hazards from database' },
  { id: 'review', title: 'Review', description: 'Generate document' },
];

/**
 * Short labels for the step tabs, plus the fields each step needs before it can
 * honestly call itself done.
 *
 * The old progress bar was `(currentStepIndex + 1) / stepCount` — it measured
 * how far you had *clicked*, not how much of the document existed. Landing on
 * step 3 of 5 with every field empty displayed 60%. Template and hazards carry
 * no required fields because both are genuinely optional: you may start from
 * scratch, and a job may have no hazards to link.
 */
const STEP_CONFIGS: SafetyDocStepConfig<WizardStep>[] = [
  { id: 'template', label: 'Template', requiredFields: [] },
  {
    id: 'details',
    label: 'Details',
    requiredFields: ['jobTitle', 'location', 'contractor', 'supervisor', 'workType'],
  },
  { id: 'steps', label: 'Method', requiredFields: ['steps'] },
  { id: 'hazards', label: 'Hazards', requiredFields: [] },
  { id: 'review', label: 'Review', requiredFields: ['reviewDate'] },
];

const MethodStatementWizard = ({ onBack }: MethodStatementWizardProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('template');
  const [goingBack, setGoingBack] = useState(false);
  const [linkedHazards, setLinkedHazards] = useState<string[]>([]);
  const [methodStatementData, setMethodStatementData] = useState<MethodStatementData>({
    jobTitle: '',
    location: '',
    contractor: '',
    supervisor: '',
    workType: '',
    duration: '',
    teamSize: '',
    description: '',
    overallRiskLevel: 'medium',
    reviewDate: '',
    steps: [],
  });

  const currentStepIndex = STEPS.findIndex((step) => step.id === currentStep);

  // Progress from what is filled in, not from how far the user has clicked.
  const progress = computeSafetyDocProgress(STEP_CONFIGS, methodStatementData);

  // Scroll to top when the step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setGoingBack(false);
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setGoingBack(true);
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const updateMethodStatement = (updates: Partial<MethodStatementData>) => {
    setMethodStatementData((prev) => ({ ...prev, ...updates }));
  };

  const handleHazardLink = (hazardId: string) => {
    if (!linkedHazards.includes(hazardId)) {
      setLinkedHazards((prev) => [...prev, hazardId]);
    }
  };

  const handleHazardUnlink = (hazardId: string) => {
    setLinkedHazards((prev) => prev.filter((id) => id !== hazardId));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'template':
        return (
          <TemplateSelectionStep
            onTemplateSelect={(template) => {
              updateMethodStatement({
                workType: template.workType,
                duration: template.estimatedDuration,
                steps: template.steps.map((step, index) => ({
                  id: `step-${index + 1}`,
                  stepNumber: index + 1,
                  title: step.title,
                  description: step.description,
                  safetyRequirements: step.safetyRequirements,
                  equipmentNeeded: step.equipmentNeeded,
                  qualifications: step.qualifications,
                  estimatedDuration: step.estimatedDuration,
                  riskLevel: step.riskLevel,
                  isCompleted: false,
                })),
              });
              handleNext();
            }}
            onSkipTemplate={() => handleNext()}
          />
        );
      case 'details':
        return (
          <DetailsStep
            data={methodStatementData}
            onDataChange={updateMethodStatement}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        );
      case 'steps':
        return (
          <StepsManagementStep
            steps={methodStatementData.steps}
            onStepsChange={(steps) => updateMethodStatement({ steps })}
            onNext={handleNext}
            onBack={handlePrevious}
            linkedHazards={linkedHazards}
            onHazardLink={handleHazardLink}
          />
        );
      case 'hazards':
        return (
          <HazardIntegrationStep
            data={methodStatementData}
            onDataChange={updateMethodStatement}
            linkedHazards={linkedHazards}
            onHazardLink={handleHazardLink}
            onHazardUnlink={handleHazardUnlink}
          />
        );
      case 'review':
        return (
          <ReviewStep
            data={methodStatementData}
            onDataChange={updateMethodStatement}
            onBack={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  const current = STEPS[currentStepIndex];
  const stepCount = STEPS.length;

  return (
    <>
      <SafetyDocShell
        onBack={onBack ?? (() => {})}
        title="Method Statement"
        subtitle={
          methodStatementData.jobTitle
            ? `${methodStatementData.jobTitle} · HSG150`
            : 'Safe system of work · HSG150'
        }
        progressPercent={progress.progressPercent}
        steps={progress.steps}
        currentStep={currentStep}
        onStepChange={(id) => {
          const target = STEPS.findIndex((s) => s.id === id);
          setGoingBack(target < currentStepIndex);
          setCurrentStep(id as WizardStep);
          window.scrollTo({ top: 0 });
        }}
        completedSteps={progress.completedSteps}
      />

      <div className="mx-auto max-w-5xl px-4 lg:px-8 space-y-4 pb-24">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Step {currentStepIndex + 1} of {stepCount}
          </span>
          <span className="text-[11.5px] text-white">{current?.description}</span>
        </div>

        {/* Direction-aware step transition per the design system. */}
        <div
          key={currentStep}
          className={goingBack ? 'animate-mw-step-back' : 'animate-mw-step-in'}
        >
          {renderStepContent()}
        </div>
      </div>
    </>
  );
};

export default MethodStatementWizard;
