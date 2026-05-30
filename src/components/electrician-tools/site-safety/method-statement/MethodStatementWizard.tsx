import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MethodStatementData, WizardStep } from '@/types/method-statement';
import { PageHero, StatStrip } from '@/components/college/primitives';
import { SafetyModuleShell } from '../common/SafetyModuleShell';
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

const MethodStatementWizard = ({ onBack }: MethodStatementWizardProps) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('template');
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

  // Scroll to top when the step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
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
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Method Statement"
      hero={
        <PageHero
          eyebrow="Method Statement"
          title="Build a safe system of work"
          description="Start from a proven template or from scratch, set out the job, sequence the method steps, link the hazards and controls, then generate a BS 7671-compliant document."
          tone="amber"
        />
      }
      stats={
        <StatStrip
          stats={STEPS.map((step, i) => ({
            value: `0${i + 1}`,
            label: step.title,
            sub: step.description,
            accent: step.id === currentStep,
          }))}
          columns={5}
        />
      }
    >
      {/* Step progress bar */}
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-elec-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStepIndex + 1) / stepCount) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Step {currentStepIndex + 1} of {stepCount}
        </span>
        <span className="text-[11.5px] text-white/55">{current?.description}</span>
      </div>

      {/* Step content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {renderStepContent()}
      </motion.div>
    </SafetyModuleShell>
  );
};

export default MethodStatementWizard;
