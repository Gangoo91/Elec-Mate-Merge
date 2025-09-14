import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Clock,
  Save,
  Eye,
  Loader2
} from "lucide-react";

// Step Components
import TemplateSelectionStep from "./steps/TemplateSelectionStep";
import ClientDetailsStep from "./steps/ClientDetailsStep";
import InspectionDetailsStep from "./steps/InspectionDetailsStep";
import ReviewGenerateStep from "./steps/ReviewGenerateStep";

// Types
import { WizardData, WizardStep } from "./types";

const STORAGE_KEY = "report-wizard-data";

const ReportWizard = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<WizardStep>('template');
  const [wizardData, setWizardData] = useLocalStorage<WizardData>(STORAGE_KEY, {
    template: null,
    clientDetails: {},
    inspectionDetails: {},
    additionalNotes: "",
    isAutoSaving: false,
    lastSaved: null
  });

  const steps: Array<{
    id: WizardStep;
    title: string;
    description: string;
    isCompleted: boolean;
    isAccessible: boolean;
  }> = [
    {
      id: 'template',
      title: 'Template Selection',
      description: 'Choose your report type',
      isCompleted: !!wizardData.template,
      isAccessible: true
    },
    {
      id: 'client',
      title: 'Client & Installation',
      description: 'Basic information',
      isCompleted: Object.keys(wizardData.clientDetails).length > 0,
      isAccessible: !!wizardData.template
    },
    {
      id: 'inspection',
      title: 'Inspection & Findings',
      description: 'Technical details',
      isCompleted: Object.keys(wizardData.inspectionDetails).length > 0,
      isAccessible: !!wizardData.template && Object.keys(wizardData.clientDetails).length > 0
    },
    {
      id: 'review',
      title: 'Review & Generate',
      description: 'Final review and generation',
      isCompleted: false,
      isAccessible: !!wizardData.template && 
                   Object.keys(wizardData.clientDetails).length > 0 &&
                   Object.keys(wizardData.inspectionDetails).length > 0
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (wizardData.template || Object.keys(wizardData.clientDetails).length > 0) {
        setWizardData(prev => ({
          ...prev,
          lastSaved: new Date().toISOString()
        }));
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [wizardData, setWizardData]);

  const updateWizardData = (section: keyof WizardData, data: any) => {
    setWizardData(prev => ({
      ...prev,
      [section]: data,
      lastSaved: new Date().toISOString()
    }));
  };

  const goToStep = (stepId: WizardStep) => {
    const step = steps.find(s => s.id === stepId);
    if (step?.isAccessible) {
      setCurrentStep(stepId);
    }
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length && steps[nextIndex].isAccessible) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'template':
        return (
          <TemplateSelectionStep
            selectedTemplate={wizardData.template}
            onTemplateSelect={(template) => updateWizardData('template', template)}
            onNext={goToNextStep}
          />
        );
      case 'client':
        return (
          <ClientDetailsStep
            data={wizardData.clientDetails}
            template={wizardData.template}
            onDataChange={(data) => updateWizardData('clientDetails', data)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 'inspection':
        return (
          <InspectionDetailsStep
            data={wizardData.inspectionDetails}
            template={wizardData.template}
            onDataChange={(data) => updateWizardData('inspectionDetails', data)}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case 'review':
        return (
          <ReviewGenerateStep
            wizardData={wizardData}
            onDataChange={updateWizardData}
            onBack={goToPreviousStep}
            onReset={() => {
              setWizardData({
                template: null,
                clientDetails: {},
                inspectionDetails: {},
                additionalNotes: "",
                isAutoSaving: false,
                lastSaved: null
              });
              setCurrentStep('template');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-elec-yellow/10 rounded-xl">
                <FileText className="h-7 w-7 text-elec-yellow" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">AI Report Writer</h1>
                <p className="text-muted-foreground">
                  Generate professional electrical reports with guided assistance
                </p>
              </div>
            </div>

            {/* Auto-save indicator */}
            {wizardData.lastSaved && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Save className="h-4 w-4" />
                <span>Last saved: {new Date(wizardData.lastSaved).toLocaleTimeString()}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="bg-elec-card/30 border border-elec-yellow/20 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-xs text-elec-yellow">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 mb-4" />
            
            {/* Simple step indicators */}
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(step.id)}
                  disabled={!step.isAccessible}
                  className={`flex-1 text-center py-2 px-1 rounded transition-colors ${
                    currentStep === step.id
                      ? 'text-elec-yellow bg-elec-yellow/10'
                      : step.isCompleted
                      ? 'text-green-400'
                      : step.isAccessible
                      ? 'text-muted-foreground hover:text-white'
                      : 'text-muted-foreground/50 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                    step.isCompleted
                      ? 'bg-green-400'
                      : currentStep === step.id
                      ? 'bg-elec-yellow'
                      : 'bg-muted-foreground/30'
                  }`} />
                  <span className="text-xs">{step.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="animate-fade-in">
            {renderCurrentStep()}
          </div>

          {/* Quick Actions (Mobile Floating) */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            {currentStepIndex > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousStep}
                className="h-12 w-12 rounded-full bg-elec-gray border-elec-yellow/30 hover:bg-elec-yellow/10 mr-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {currentStepIndex < steps.length - 1 && steps[currentStepIndex + 1].isAccessible && (
              <Button
                size="icon"
                onClick={goToNextStep}
                className="h-12 w-12 rounded-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWizard;