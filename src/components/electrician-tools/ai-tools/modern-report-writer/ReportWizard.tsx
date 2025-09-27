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

          {/* Enhanced Progress Section */}
          <Card className="bg-elec-card border-elec-yellow/30 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Progress Info */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">Progress:</span>
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/50">
                    Step {currentStepIndex + 1} of {steps.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</span>
                  <Progress value={progress} className="w-24 h-2" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
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
                  className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
                >
                  <Loader2 className="h-4 w-4 mr-2" />
                  Start New
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast({ title: "Report saved", description: "Your progress has been saved automatically" })}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </div>

            {/* Enhanced Step Navigation */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {steps.map((step, index) => {
                const stepIcon = index === 0 ? FileText : 
                                index === 1 ? Eye : 
                                index === 2 ? CheckCircle2 : 
                                Sparkles;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(step.id)}
                    disabled={!step.isAccessible}
                    className={`group relative p-4 rounded-lg border transition-all duration-200 ${
                      currentStep === step.id
                        ? 'bg-elec-yellow/10 border-elec-yellow text-elec-yellow'
                        : step.isCompleted
                        ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20'
                        : step.isAccessible
                        ? 'bg-elec-dark border-elec-yellow/20 text-white hover:bg-elec-yellow/5 hover:border-elec-yellow/40'
                        : 'bg-muted/5 border-muted/20 text-muted-foreground/50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        currentStep === step.id
                          ? 'bg-elec-yellow/20'
                          : step.isCompleted
                          ? 'bg-green-500/20'
                          : 'bg-muted/10'
                      }`}>
                        {React.createElement(stepIcon, { 
                          className: `h-4 w-4 ${
                            currentStep === step.id ? 'text-elec-yellow' :
                            step.isCompleted ? 'text-green-400' : 'text-muted-foreground'
                          }` 
                        })}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${
                          currentStep === step.id ? 'text-elec-yellow' :
                          step.isCompleted ? 'text-green-400' : 'text-current'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {step.description}
                        </div>
                      </div>
                    </div>
                    
                    {/* Completion indicator */}
                    {step.isCompleted && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle2 className="h-5 w-5 text-green-400 bg-elec-dark rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Current Step Content */}
          <div className="animate-fade-in">
            {renderCurrentStep()}
          </div>

          {/* Enhanced Mobile Floating Actions */}
          <div className="fixed bottom-6 right-6 lg:hidden z-50">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWizard;