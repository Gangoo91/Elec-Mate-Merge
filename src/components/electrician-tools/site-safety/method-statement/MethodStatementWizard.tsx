import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, ClipboardCheck, Download } from 'lucide-react';
import { MethodStatementData, WizardStep } from '@/types/method-statement';
import TemplateSelectionStep from './steps/TemplateSelectionStep';
import DetailsStep from './steps/DetailsStep';
import StepsManagementStep from './steps/StepsManagementStep';
import ReviewStep from './steps/ReviewStep';

const MethodStatementWizard = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('template');
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
    { id: 'review', title: 'Review', description: 'Generate document' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

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
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Method Statement Wizard
          </CardTitle>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStepIndex + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      {!isFirstStep && currentStep !== 'template' && (
        <div className="flex justify-between items-center">
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
            <div className="flex gap-2">
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