import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, ClipboardCheck, Download } from 'lucide-react';
import { MethodStatementData, WizardStep } from '@/types/method-statement';
import TemplateSelectionStep from './steps/TemplateSelectionStep';
import DetailsStep from './steps/DetailsStep';
import StepsManagementStep from './steps/StepsManagementStep';
import ReviewStep from './steps/ReviewStep';
import HazardIntegrationStep from './components/HazardIntegrationStep';

const MethodStatementWizard = () => {
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
    steps: []
  });

  const steps = [
    { id: 'template', title: 'Template', description: 'Choose a template' },
    { id: 'details', title: 'Job Details', description: 'Basic information' },
    { id: 'steps', title: 'Method Steps', description: 'Build your process' },
    { id: 'hazards', title: 'Hazards', description: 'Link hazards from database' },
    { id: 'review', title: 'Review', description: 'Generate document' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Scroll to top when step changes - improved implementation
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also smooth scroll as fallback
    setTimeout(() => {
      const container = document.querySelector('.method-statement-container') || window;
      if (container instanceof Window) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        container.scrollTop = 0;
      }
    }, 100);
  }, [currentStep]);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as WizardStep);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as WizardStep);
    }
  };

  const updateMethodStatement = (updates: Partial<MethodStatementData>) => {
    setMethodStatementData(prev => ({ ...prev, ...updates }));
  };

  const handleHazardLink = (hazardId: string) => {
    if (!linkedHazards.includes(hazardId)) {
      setLinkedHazards(prev => [...prev, hazardId]);
    }
  };

  const handleHazardUnlink = (hazardId: string) => {
    setLinkedHazards(prev => prev.filter(id => id !== hazardId));
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
                  isCompleted: false
                }))
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

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <div className="space-y-4 md:space-y-6 method-statement-container">

      {/* Step Content */}
      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      {!isFirstStep && currentStep !== 'template' && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {!isLastStep ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              <Button className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Generate Document
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MethodStatementWizard;