
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { useIsMobile } from '@/hooks/use-mobile';
import EICRStepInstallationDetails from './wizard-steps/EICRStepInstallationDetails';
import EICRStepInspectionDetails from './wizard-steps/EICRStepInspectionDetails';
import EICRStepInspectorDetails from './wizard-steps/EICRStepInspectorDetails';
import EICRStepCircuitSetup from './wizard-steps/EICRStepCircuitSetup';
import EICRStepTesting from './wizard-steps/EICRStepTesting';
import EICRStepFaultManagement from './wizard-steps/EICRStepFaultManagement';
import EICRStepReview from './wizard-steps/EICRStepReview';

const WIZARD_STEPS = [
  { id: 'installation', title: 'Installation Details', description: 'Property and installation information' },
  { id: 'inspection', title: 'Inspection Details', description: 'Scope and limitations' },
  { id: 'inspector', title: 'Inspector Details', description: 'Qualification and signature' },
  { id: 'circuits', title: 'Circuit Setup', description: 'Add and configure circuits' },
  { id: 'testing', title: 'Testing', description: 'Perform electrical tests' },
  { id: 'faults', title: 'Fault Management', description: 'Record any faults found' },
  { id: 'review', title: 'Review & Export', description: 'Final review and EICR generation' }
];

const EICRWizard = () => {
  const { eicrSession, initializeEICR } = useEICR();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const currentStepData = WIZARD_STEPS[currentStep];
  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set(prev).add(stepId));
    
    // Auto-advance to next step on mobile
    if (isMobile && currentStep < WIZARD_STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'installation':
        return <EICRStepInstallationDetails onComplete={() => handleStepComplete('installation')} />;
      case 'inspection':
        return <EICRStepInspectionDetails onComplete={() => handleStepComplete('inspection')} />;
      case 'inspector':
        return <EICRStepInspectorDetails onComplete={() => handleStepComplete('inspector')} />;
      case 'circuits':
        return <EICRStepCircuitSetup onComplete={() => handleStepComplete('circuits')} />;
      case 'testing':
        return <EICRStepTesting onComplete={() => handleStepComplete('testing')} />;
      case 'faults':
        return <EICRStepFaultManagement onComplete={() => handleStepComplete('faults')} />;
      case 'review':
        return <EICRStepReview onComplete={() => handleStepComplete('review')} />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'pb-20' : ''}`}>
      {/* Wizard Header */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-6 w-6 text-elec-yellow" />
                EICR Wizard
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep + 1} of {WIZARD_STEPS.length}: {currentStepData.title}
              </p>
            </div>
            {!isMobile && (
              <Badge className="bg-elec-yellow text-black">
                {completedSteps.size} / {WIZARD_STEPS.length} Complete
              </Badge>
            )}
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{currentStepData.description}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardHeader>
      </Card>

      {/* Step Navigation (Desktop) */}
      {!isMobile && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {WIZARD_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      index === currentStep 
                        ? 'bg-elec-yellow text-black' 
                        : completedSteps.has(step.id)
                          ? 'bg-green-600/20 text-green-300'
                          : 'bg-elec-dark text-muted-foreground hover:bg-elec-dark/80'
                    }`}
                  >
                    {completedSteps.has(step.id) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                    <span className="text-sm font-medium">{step.title}</span>
                  </button>
                  {index < WIZARD_STEPS.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step Content */}
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation Controls */}
      <Card className={`border-elec-yellow/20 bg-elec-gray ${isMobile ? 'fixed bottom-0 left-0 right-0 rounded-none border-x-0 border-b-0' : ''}`}>
        <CardContent className="p-4">
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {completedSteps.has(currentStepData.id) && (
                <Badge className="bg-green-600 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
              
              <Button
                onClick={handleNext}
                disabled={currentStep === WIZARD_STEPS.length - 1}
                className="flex items-center gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRWizard;
