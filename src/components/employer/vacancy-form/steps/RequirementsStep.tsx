import { useFormContext, Controller } from "react-hook-form";
import { Check, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  commonRequirements,
  experienceLevels,
  type VacancyFormData,
  type ExperienceLevel,
} from "../schema";
import { RichTextEditor } from "../RichTextEditor";
import { AIDescriptionGenerator } from "../AIDescriptionGenerator";

export function RequirementsStep() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VacancyFormData>();

  const selectedRequirements = watch("requirements") || [];
  const selectedNiceToHave = watch("niceToHave") || [];
  const selectedLevel = watch("experienceLevel");
  const jobTitle = watch("title");

  const toggleRequirement = (requirement: string) => {
    const current = selectedRequirements;
    if (current.includes(requirement)) {
      setValue(
        "requirements",
        current.filter((r) => r !== requirement)
      );
    } else {
      setValue("requirements", [...current, requirement]);
    }
  };

  const toggleNiceToHave = (skill: string) => {
    const current = selectedNiceToHave;
    if (current.includes(skill)) {
      setValue(
        "niceToHave",
        current.filter((s) => s !== skill)
      );
    } else {
      setValue("niceToHave", [...current, skill]);
    }
  };

  const handleAIGenerated = (description: string) => {
    setValue("description", description);
  };

  return (
    <div className="space-y-6">
      {/* Experience Level */}
      <div className="space-y-3">
        <Label className="text-white/80 text-base">Experience Level</Label>
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
                    "p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                    "touch-manipulation min-h-[48px]",
                    selectedLevel === level
                      ? "border-elec-yellow bg-elec-yellow/10 text-elec-yellow"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        />
        {errors.experienceLevel?.message && (
          <p className="text-xs text-red-400">{errors.experienceLevel.message}</p>
        )}
      </div>

      {/* Required Qualifications */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/80 text-base">Required Qualifications</Label>
          <span className="text-xs text-white/50">
            {selectedRequirements.length} selected
          </span>
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
                  "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg",
                  "text-sm font-medium transition-all duration-200",
                  "touch-manipulation",
                  isSelected
                    ? "bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
                {requirement}
              </button>
            );
          })}
        </div>

        {errors.requirements?.message && (
          <p className="text-xs text-red-400">{errors.requirements.message}</p>
        )}
      </div>

      {/* Nice to Have (Optional) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/60 text-sm">Nice to Have (optional)</Label>
          <span className="text-xs text-white/40">
            {selectedNiceToHave.length} selected
          </span>
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
                    "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg",
                    "text-xs font-medium transition-all duration-200",
                    "touch-manipulation",
                    isSelected
                      ? "bg-white/15 text-white/80 border border-white/20"
                      : "bg-white/5 text-white/40 border border-white/5 hover:bg-white/10"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                  {skill}
                </button>
              );
            })}
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/80 text-base">Job Description</Label>
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
      </div>

      {/* Helper tip */}
      <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
        <p className="text-sm text-elec-yellow">
          <strong>Pro tip:</strong> Use the AI generator to create a professional description,
          then customize it to match your company voice.
        </p>
      </div>
    </div>
  );
}
