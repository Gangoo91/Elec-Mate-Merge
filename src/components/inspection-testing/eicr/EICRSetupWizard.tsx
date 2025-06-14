
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Building, User, Zap, ClipboardCheck } from 'lucide-react';
import InspectorDetailsForm from './InspectorDetailsForm';
import { EICRDataManager } from '@/utils/eicrDataPersistence';

type WizardStep = 'installation' | 'inspector' | 'circuits' | 'inspection' | 'testing';

const EICRSetupWizard = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('installation');

  const steps = [
    { id: 'installation', title: 'Installation Details', icon: Building, description: 'Property and installation information' },
    { id: 'inspector', title: 'Inspector Details', icon: User, description: 'Qualified inspector information' },
    { id: 'circuits', title: 'Circuit Information', icon: Zap, description: 'Circuit schedules and configuration' },
    { id: 'inspection', title: 'Visual Inspection', icon: ClipboardCheck, description: 'Visual inspection checklist' },
    { id: 'testing', title: 'Testing & Results', icon: FileText, description: 'Testing procedures and measurements' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleInspectorComplete = (data: any) => {
    console.log('Inspector details completed:', data);
    setCurrentStep('circuits');
  };

  const handleInspectorBack = () => {
    setCurrentStep('installation');
  };

  const getCurrentStepIcon = () => {
    const step = steps[currentStepIndex];
    const Icon = step.icon;
    return <Icon className="h-6 w-6 text-elec-yellow" />;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'installation':
        return (
          <div className="space-y-4">
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Building className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                Installation Details step will be implemented next. For now, click Continue to proceed.
              </AlertDescription>
            </Alert>
            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep('inspector')}
                className="bg-elec-yellow text-black px-6 py-2 rounded-md hover:bg-elec-yellow/90"
              >
                Continue to Inspector Details
              </button>
            </div>
          </div>
        );

      case 'inspector':
        return (
          <InspectorDetailsForm
            onComplete={handleInspectorComplete}
            onBack={handleInspectorBack}
          />
        );

      case 'circuits':
        return (
          <div className="space-y-4">
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Zap className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                Circuit Information step will be implemented next.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 'inspection':
        return (
          <div className="space-y-4">
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <ClipboardCheck className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                Visual Inspection step will be implemented next.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 'testing':
        return (
          <div className="space-y-4">
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <FileText className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                Testing & Results step will be implemented next.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Wizard Header */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getCurrentStepIcon()}
            EICR Setup Wizard
          </CardTitle>
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isActive 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : isCompleted 
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-gray-600 bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${
                      isActive ? 'text-elec-yellow' : isCompleted ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-elec-yellow' : isCompleted ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <div className="min-h-[600px]">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default EICRSetupWizard;
