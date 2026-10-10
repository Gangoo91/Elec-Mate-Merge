import { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import FormSheet from '@/components/forms/FormSheet';
import {
  PanelTitle,
  Segments,
  rowBtnPrimary,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import {
  vacancySchema,
  vacancyFormSteps,
  defaultVacancyValues,
  type VacancyFormData,
} from './schema';
import { JobBasicsStep } from './steps/JobBasicsStep';
import { CompensationStep } from './steps/CompensationStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { ReviewStep } from './steps/ReviewStep';
import { TemplateSelector } from './TemplateSelector';
import { useCreateVacancy, useUpdateVacancy } from '@/hooks/useVacancies';
import { saveVacancyAsTemplate } from '@/services/vacancyService';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { storageSetSync, storageRemoveSync, storageGetJSONSync } from '@/utils/storage';

const DRAFT_STORAGE_KEY = 'vacancy-form-draft';

interface VacancyFormWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: Partial<VacancyFormData> & { id?: string };
  duplicateData?: Partial<VacancyFormData>;
  /** Called after a save. A brand-new published vacancy is passed so the
   *  page can offer to invite the talent pool straight away (ELE-1957). */
  onSuccess?: (published?: { id: string; title: string; location: string; status: string }) => void;
}

export function VacancyFormWizard({
  open,
  onOpenChange,
  editData,
  duplicateData,
  onSuccess,
}: VacancyFormWizardProps) {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

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
    mode: 'onChange',
  });

  const { handleSubmit, trigger, reset, watch, setValue, formState } = methods;

  // Rehydrate whenever the wizard OPENS — it stays mounted in the section, so
  // defaultValues only ever ran once; without this, tapping Edit on a vacancy
  // showed stale/blank values and Publish could overwrite it with them.
  useEffect(() => {
    if (!open) return;
    if (editData || duplicateData) {
      reset({ ...defaultVacancyValues, ...(editData || duplicateData) });
      setCurrentStep(0);
      return;
    }
    const draft = storageGetJSONSync<Partial<VacancyFormData> | null>(DRAFT_STORAGE_KEY, null);
    if (draft) {
      reset({ ...defaultVacancyValues, ...draft });
    }
  }, [open, editData, duplicateData, reset]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!isEditing && open) {
      const interval = setInterval(() => {
        setIsSavingDraft(true);
        const values = methods.getValues();
        storageSetSync(DRAFT_STORAGE_KEY, JSON.stringify(values));
        setLastSaved(new Date());
        // Brief delay to show the saving indicator
        setTimeout(() => setIsSavingDraft(false), 500);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isEditing, open, methods]);

  // Update lastSaved display every minute
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (lastSaved) {
      const interval = setInterval(() => forceUpdate((n) => n + 1), 60000);
      return () => clearInterval(interval);
    }
  }, [lastSaved]);

  // Clear draft when form is submitted successfully
  const clearDraft = useCallback(() => {
    storageRemoveSync(DRAFT_STORAGE_KEY);
  }, []);

  // Handle step navigation
  const handleNext = async () => {
    const currentStepSchema = vacancyFormSteps[currentStep];
    const fieldsToValidate = Object.keys(
      currentStepSchema.schema.shape
    ) as (keyof VacancyFormData)[];

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
      let published: { id: string; title: string; location: string; status: string } | undefined;
      if (isEditing && editData?.id) {
        await updateVacancy.mutateAsync({ id: editData.id, updates: data });
        haptic.success();
        toast({ title: 'Vacancy updated', description: 'Your job vacancy has been updated.' });
      } else {
        const created = await createVacancy.mutateAsync({ formData: data });
        haptic.success();
        toast({ title: 'Vacancy published', description: 'Your job vacancy is now live.' });
        clearDraft();
        if (created?.id) {
          published = {
            id: created.id,
            title: created.title,
            location: created.location,
            status: created.status,
          };
        }
      }
      onOpenChange(false);
      onSuccess?.(published);
      reset(defaultVacancyValues);
      setCurrentStep(0);
    } catch (error) {
      haptic.error();
      toast({
        title: 'Error',
        description: 'Failed to save vacancy. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle save as draft — a REAL row with status 'Draft', visible in the
  // Drafts tab on every device. Needs at least a title; falls back to the
  // local autosave when there's nothing worth persisting yet.
  const handleSaveDraft = async () => {
    // Editing an existing vacancy: "save as draft" would silently write the
    // edits to the NEW-vacancy localStorage key and change nothing on the
    // vacancy itself — refuse with an honest message instead.
    if (isEditing) {
      toast({
        title: 'This vacancy already exists',
        description: 'Use Update to save your changes to it.',
      });
      return;
    }
    setIsSavingDraft(true);
    const values = methods.getValues();
    try {
      if (!isEditing && values.title?.trim()) {
        await createVacancy.mutateAsync({ formData: values, asDraft: true });
        clearDraft();
        toast({
          title: 'Draft saved',
          description: 'Find it in the Drafts tab. Publish when ready.',
        });
        onOpenChange(false);
        reset(defaultVacancyValues);
        setCurrentStep(0);
      } else {
        storageSetSync(DRAFT_STORAGE_KEY, JSON.stringify(values));
        setLastSaved(new Date());
        toast({ title: 'Draft saved on this device' });
      }
    } catch {
      // DB draft failed — keep the local copy so nothing is lost
      storageSetSync(DRAFT_STORAGE_KEY, JSON.stringify(values));
      setLastSaved(new Date());
      toast({ title: 'Saved locally', description: 'Could not reach the server.' });
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateData: Partial<VacancyFormData>) => {
    reset({ ...defaultVacancyValues, ...templateData });
    setShowTemplates(false);
    toast({ title: 'Template loaded', description: 'Template has been applied to the form.' });
  };

  // Handle close — quietly autosave to localStorage only (crash recovery).
  // Closing must never create DB drafts or clobber anything with a toast.
  const handleClose = () => {
    if (!isEditing) {
      const values = methods.getValues();
      if (values.title?.trim() || values.description?.trim()) {
        storageSetSync(DRAFT_STORAGE_KEY, JSON.stringify(values));
        setLastSaved(new Date());
      }
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
              const templateName =
                values.title || `Template ${new Date().toLocaleDateString('en-GB')}`;
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
                  toast({
                    title: 'Template saved',
                    description: `"${templateName}" has been saved as a template.`,
                  });
                } else {
                  throw new Error('Failed to save');
                }
              } catch (error) {
                toast({
                  title: 'Error',
                  description: 'Failed to save template',
                  variant: 'destructive',
                });
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

  const savedLine = isEditing
    ? ''
    : isSavingDraft
      ? ' Saving…'
      : lastSaved
        ? ` Saved ${formatDistanceToNow(lastSaved, { addSuffix: true })}.`
        : '';

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => !o && handleClose()}
      width="wide"
      title={isEditing ? 'Edit vacancy' : 'Post a vacancy'}
      description={`Step ${currentStep + 1} of ${vacancyFormSteps.length}: ${currentStepData.description}.${savedLine}`}
      headerTrailing={
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="mr-8 h-11 rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
        >
          {showTemplates ? 'Back to form' : 'Templates'}
        </button>
      }
      subheader={
        <div className="flex py-3">
          <Segments
            items={vacancyFormSteps.map((step, i) => ({ value: String(i), label: step.title }))}
            value={String(currentStep)}
            onChange={(v) => handleStepClick(Number(v))}
          />
        </div>
      }
      bodyClassName="space-y-5 pt-5"
      footer={
        isLastStep && !showTemplates ? (
          <button
            type="button"
            onClick={handlePrevious}
            className={cn(rowBtnSecondary, 'h-12 w-full')}
          >
            Back
          </button>
        ) : showTemplates ? undefined : (
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className={cn(rowBtnSecondary, 'h-12 flex-1')}
              >
                Back
              </button>
            )}
            {!isEditing && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className={cn(rowBtnSecondary, 'h-12 flex-1')}
              >
                Save draft
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className={cn(rowBtnPrimary, 'h-12 flex-[2]')}
            >
              Continue
            </button>
          </div>
        )
      }
    >
      <FormProvider {...methods}>
        {showTemplates ? (
          <section>
            <PanelTitle title="Start from a template" />
            <TemplateSelector onSelect={handleTemplateSelect} />
          </section>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}
          </form>
        )}
      </FormProvider>
    </FormSheet>
  );
}
