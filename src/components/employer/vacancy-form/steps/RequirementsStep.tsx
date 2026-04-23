import { useFormContext, Controller } from 'react-hook-form';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  commonRequirements,
  experienceLevels,
  type VacancyFormData,
} from '../schema';
import { RichTextEditor } from '../RichTextEditor';
import { AIDescriptionGenerator } from '../AIDescriptionGenerator';
import { FormCard, Eyebrow } from '@/components/employer/editorial';

export function RequirementsStep() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VacancyFormData>();

  const selectedRequirements = watch('requirements') || [];
  const selectedNiceToHave = watch('niceToHave') || [];
  const selectedLevel = watch('experienceLevel');
  const jobTitle = watch('title');

  const toggleRequirement = (requirement: string) => {
    const current = selectedRequirements;
    if (current.includes(requirement)) {
      setValue(
        'requirements',
        current.filter((r) => r !== requirement)
      );
    } else {
      setValue('requirements', [...current, requirement]);
    }
  };

  const toggleNiceToHave = (skill: string) => {
    const current = selectedNiceToHave;
    if (current.includes(skill)) {
      setValue(
        'niceToHave',
        current.filter((s) => s !== skill)
      );
    } else {
      setValue('niceToHave', [...current, skill]);
    }
  };

  const handleAIGenerated = (description: string) => {
    setValue('description', description);
  };

  return (
    <div className="space-y-4">
      {/* Experience Level */}
      <FormCard eyebrow="Experience Level">
        <Controller
          name="experienceLevel"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => field.onChange(level)}
                  className={cn(
                    'p-3 rounded-xl border text-[13px] font-medium transition-all duration-200',
                    'touch-manipulation min-h-[48px]',
                    selectedLevel === level
                      ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                      : 'border-white/[0.08] bg-[hsl(0_0%_9%)] text-white hover:bg-white/[0.08]'
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        />
        {errors.experienceLevel?.message && (
          <p className="text-[11px] text-red-400 mt-2">{errors.experienceLevel.message}</p>
        )}
      </FormCard>

      {/* Required Qualifications */}
      <FormCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Required Qualifications</Eyebrow>
          <span className="text-[11px] text-white">{selectedRequirements.length} selected</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {commonRequirements.map((requirement) => {
            const isSelected = selectedRequirements.includes(requirement);
            return (
              <button
                key={requirement}
                type="button"
                onClick={() => toggleRequirement(requirement)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2 rounded-full',
                  'text-[13px] font-medium transition-all duration-200',
                  'touch-manipulation min-h-[44px]',
                  isSelected
                    ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                    : 'bg-white/[0.06] text-white border border-white/[0.08] hover:bg-white/[0.1]'
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
                {requirement}
              </button>
            );
          })}
        </div>

        {errors.requirements?.message && (
          <p className="text-[11px] text-red-400 mt-2">{errors.requirements.message}</p>
        )}
      </FormCard>

      {/* Nice to Have (Optional) */}
      <FormCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Nice to Have (optional)</Eyebrow>
          <span className="text-[11px] text-white">{selectedNiceToHave.length} selected</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {commonRequirements
            .filter((r) => !selectedRequirements.includes(r))
            .slice(0, 8)
            .map((skill) => {
              const isSelected = selectedNiceToHave.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleNiceToHave(skill)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-2 rounded-full',
                    'text-[11px] font-medium transition-all duration-200',
                    'touch-manipulation',
                    isSelected
                      ? 'bg-white/[0.12] text-white border border-white/[0.2]'
                      : 'bg-white/[0.06] text-white border border-white/[0.08] hover:bg-white/[0.1]'
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                  {skill}
                </button>
              );
            })}
        </div>
      </FormCard>

      {/* Job Description */}
      <FormCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Job Description</Eyebrow>
          <AIDescriptionGenerator
            jobTitle={jobTitle}
            requirements={selectedRequirements}
            experienceLevel={selectedLevel}
            onGenerated={handleAIGenerated}
          />
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
              error={errors.description?.message}
            />
          )}
        />
      </FormCard>

      {/* Helper tip */}
      <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25">
        <p className="text-[13px] text-white">
          <strong className="text-elec-yellow">Pro tip:</strong> Use the AI generator to create a
          professional description, then customise it to match your company voice.
        </p>
      </div>
    </div>
  );
}
