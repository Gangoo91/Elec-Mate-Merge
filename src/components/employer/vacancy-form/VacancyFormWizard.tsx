import { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, X, Sparkles, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from "@/components/ui/responsive-form-modal";
import { IOSStepIndicator } from "@/components/ui/ios-step-indicator";
import {
  vacancySchema,
  vacancyFormSteps,
  defaultVacancyValues,
  type VacancyFormData,
} from "./schema";
import { JobBasicsStep } from "./steps/JobBasicsStep";
import { CompensationStep } from "./steps/CompensationStep";
import { RequirementsStep } from "./steps/RequirementsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { TemplateSelector } from "./TemplateSelector";
import { useCreateVacancy, useUpdateVacancy } from "@/hooks/useVacancies";
import { saveVacancyAsTemplate } from "@/services/vacancyService";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const DRAFT_STORAGE_KEY = "vacancy-form-draft";

interface VacancyFormWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: Partial<VacancyFormData> & { id?: string };
  duplicateData?: Partial<VacancyFormData>;
  onSuccess?: () => void;
}

export function VacancyFormWizard({
  open,
  onOpenChange,
  editData,
  duplicateData,
  onSuccess,
}: VacancyFormWizardProps) {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);

  const createVacancy = useCreateVacancy();
  const updateVacancy = useUpdateVacancy();
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  const isEditing = !!editData?.id;

  // Initialize form with default values, edit data, or duplicate data
  const methods = useForm<VacancyFormData>({
    resolver: zodResolver(vacancySchema),
    defaultValues: {
      ...defaultVacancyValues,
      ...(editData || duplicateData || {}),
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger, reset, watch, setValue, formState } = methods;

  // Load draft from localStorage on mount
  useEffect(() => {
    if (!editData && !duplicateData) {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          reset({ ...defaultVacancyValues, ...draft });
        } catch (e) {
          console.error("Failed to parse draft:", e);
        }
      }
    }
  }, [editData, duplicateData, reset]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!isEditing && open) {
      const interval = setInterval(() => {
        const values = methods.getValues();
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isEditing, open, methods]);

  // Clear draft when form is submitted successfully
  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }, []);

  // Handle step navigation
  const handleNext = async () => {
    const currentStepSchema = vacancyFormSteps[currentStep];
    const fieldsToValidate = Object.keys(currentStepSchema.schema.shape) as (keyof VacancyFormData)[];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, vacancyFormSteps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = async (stepIndex: number) => {
    // Allow going back freely
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
      return;
    }
    // Validate all steps up to the clicked one
    for (let i = currentStep; i < stepIndex; i++) {
      const stepSchema = vacancyFormSteps[i];
      const fieldsToValidate = Object.keys(stepSchema.schema.shape) as (keyof VacancyFormData)[];
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }
    setCurrentStep(stepIndex);
  };

  // Handle form submission
  const onSubmit = async (data: VacancyFormData) => {
    try {
      if (isEditing && editData?.id) {
        await updateVacancy.mutateAsync({ id: editData.id, updates: data });
        toast({ title: "Vacancy updated", description: "Your job vacancy has been updated." });
      } else {
        await createVacancy.mutateAsync(data as any);
        toast({ title: "Vacancy published", description: "Your job vacancy is now live!" });
        clearDraft();
      }
      onOpenChange(false);
      onSuccess?.();
      reset(defaultVacancyValues);
      setCurrentStep(0);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save vacancy. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle save as draft
  const handleSaveDraft = () => {
    const values = methods.getValues();
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
    toast({ title: "Draft saved", description: "Your vacancy has been saved as a draft." });
  };

  // Handle template selection
  const handleTemplateSelect = (templateData: Partial<VacancyFormData>) => {
    reset({ ...defaultVacancyValues, ...templateData });
    setShowTemplates(false);
    toast({ title: "Template loaded", description: "Template has been applied to the form." });
  };

  // Handle close
  const handleClose = () => {
    // Save draft before closing if not editing
    if (!isEditing) {
      handleSaveDraft();
    }
    onOpenChange(false);
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <JobBasicsStep />;
      case 1:
        return <CompensationStep />;
      case 2:
        return <RequirementsStep />;
      case 3:
        return (
          <ReviewStep
            onPublish={handleSubmit(onSubmit)}
            onSaveDraft={handleSaveDraft}
            onSaveAsTemplate={async () => {
              const values = methods.getValues();
              const templateName = values.title || `Template ${new Date().toLocaleDateString('en-GB')}`;
              setIsSavingTemplate(true);
              try {
                // Convert camelCase form data to snake_case for service
                const result = await saveVacancyAsTemplate(templateName, {
                  title: values.title,
                  type: values.type,
                  location: values.location,
                  work_arrangement: values.workArrangement,
                  salary_min: values.salaryMin,
                  salary_max: values.salaryMax,
                  salary_period: values.salaryPeriod,
                  benefits: values.benefits,
                  requirements: values.requirements,
                  experience_level: values.experienceLevel,
                  description: values.description,
                  nice_to_have: values.niceToHave,
                  schedule: values.schedule,
                });
                if (result) {
                  toast({ title: "Template saved", description: `"${templateName}" has been saved as a template.` });
                } else {
                  throw new Error('Failed to save');
                }
              } catch (error) {
                toast({ title: "Error", description: "Failed to save template", variant: "destructive" });
              } finally {
                setIsSavingTemplate(false);
              }
            }}
            isSubmitting={createVacancy.isPending || updateVacancy.isPending}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === vacancyFormSteps.length - 1;
  const currentStepData = vacancyFormSteps[currentStep];

  return (
    <ResponsiveFormModal open={open} onOpenChange={handleClose}>
      <ResponsiveFormModalContent className={cn(isMobile ? "" : "max-w-2xl")}>
        <FormProvider {...methods}>
          {/* Header */}
          <ResponsiveFormModalHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <ResponsiveFormModalTitle>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-elec-yellow/20">
                    <Briefcase className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold">
                      {isEditing ? "Edit Vacancy" : "Post Job Vacancy"}
                    </span>
                    <p className="text-xs text-muted-foreground font-normal">
                      {currentStepData.title} - {currentStepData.description}
                    </p>
                  </div>
                </div>
              </ResponsiveFormModalTitle>

              {/* Desktop actions */}
              {!isMobile && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Templates
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Step indicator */}
            <div className="mt-4">
              <IOSStepIndicator
                steps={vacancyFormSteps.length}
                currentStep={currentStep}
              />
            </div>

            {/* Step labels - desktop only */}
            {!isMobile && (
              <div className="flex justify-between mt-2 px-1">
                {vacancyFormSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={cn(
                      "text-xs transition-colors",
                      index === currentStep
                        ? "text-elec-yellow font-medium"
                        : index < currentStep
                        ? "text-elec-yellow/60 hover:text-elec-yellow/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            )}
          </ResponsiveFormModalHeader>

          {/* Template selector overlay */}
          {showTemplates && (
            <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Load Template</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTemplates(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <TemplateSelector onSelect={handleTemplateSelect} />
              </div>
            </div>
          )}

          {/* Body */}
          <ResponsiveFormModalBody className="py-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}
            </form>
          </ResponsiveFormModalBody>

          {/* Footer */}
          <ResponsiveFormModalFooter>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Mobile template button */}
              {isMobile && currentStep === 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setShowTemplates(true)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Load Template
                </Button>
              )}

              <div className="flex gap-3 flex-1">
                {/* Back button */}
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1 sm:flex-none min-h-[48px]"
                  >
                    Back
                  </Button>
                )}

                {/* Save draft button */}
                {!isLastStep && !isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSaveDraft}
                    className="hidden sm:flex"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                )}

                {/* Next/Submit button */}
                {!isLastStep ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    Continue
                  </Button>
                ) : null}
              </div>
            </div>
          </ResponsiveFormModalFooter>
        </FormProvider>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
