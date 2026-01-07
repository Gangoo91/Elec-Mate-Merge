import { useFormContext } from "react-hook-form";
import { Calendar, Save, Send, Eye, AlertCircle, FileText } from "lucide-react";
import { IOSInput } from "@/components/ui/ios-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VacancyPreviewCard } from "../VacancyPreviewCard";
import type { VacancyFormData } from "../schema";
import { useEmployer } from "@/contexts/EmployerContext";

interface ReviewStepProps {
  onPublish: () => void;
  onSaveDraft: () => void;
  onSaveAsTemplate: () => void;
  isSubmitting: boolean;
}

export function ReviewStep({
  onPublish,
  onSaveDraft,
  onSaveAsTemplate,
  isSubmitting,
}: ReviewStepProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<VacancyFormData>();

  const { employer } = useEmployer();
  const formData = watch();

  // Calculate minimum closing date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Validation summary
  const validationIssues: string[] = [];
  if (!formData.title) validationIssues.push("Job title is required");
  if (!formData.location) validationIssues.push("Location is required");
  if (!formData.description || formData.description.length < 50) {
    validationIssues.push("Description must be at least 50 characters");
  }
  if (!formData.requirements || formData.requirements.length === 0) {
    validationIssues.push("At least one requirement is needed");
  }
  if (!formData.closingDate) validationIssues.push("Closing date is required");

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/80">
          <Eye className="h-5 w-5" />
          <span className="text-base font-medium">How candidates will see your job</span>
        </div>

        <VacancyPreviewCard
          data={formData}
          companyName={employer?.company_name || "Your Company"}
        />
      </div>

      {/* Closing Date */}
      <IOSInput
        label="Application Closing Date"
        type="date"
        icon={<Calendar className="h-5 w-5" />}
        error={errors.closingDate?.message}
        hint="The job listing will automatically close on this date"
        min={minDate}
        className="[color-scheme:dark]"
        {...register("closingDate")}
      />

      {/* Validation Summary */}
      {validationIssues.length > 0 && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-400 mb-2">
                Please fix the following before publishing:
              </p>
              <ul className="text-xs text-red-400/80 space-y-1">
                {validationIssues.map((issue, idx) => (
                  <li key={idx}>• {issue}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Ready to publish */}
      {validationIssues.length === 0 && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-400">
            <strong>Ready to publish!</strong> Your job listing looks complete.
            Hit publish to make it live.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        {/* Primary action */}
        <Button
          type="button"
          onClick={onPublish}
          disabled={validationIssues.length > 0 || isSubmitting}
          className={cn(
            "w-full h-14 text-base font-semibold",
            "bg-elec-yellow text-black hover:bg-elec-yellow/90",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? "Publishing..." : "Publish Job Listing"}
        </Button>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className={cn(
              "h-12 text-sm",
              "border-white/20 text-white/80 hover:bg-white/10"
            )}
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onSaveAsTemplate}
            disabled={isSubmitting || !formData.title}
            className={cn(
              "h-12 text-sm",
              "border-white/20 text-white/80 hover:bg-white/10"
            )}
          >
            <FileText className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Info tip */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-sm text-white/60">
          <strong className="text-white/80">After publishing:</strong> Your job
          will appear in the Jobs section where qualified electricians can view
          and apply. You'll receive notifications when candidates apply.
        </p>
      </div>
    </div>
  );
}
