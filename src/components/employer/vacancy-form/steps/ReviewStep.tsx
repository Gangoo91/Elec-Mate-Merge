import { useFormContext } from 'react-hook-form';
import { Save, Send, Eye, AlertCircle, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { VacancyPreviewCard } from '../VacancyPreviewCard';
import type { VacancyFormData } from '../schema';
import { useEmployer } from '@/contexts/EmployerContext';
import {
  inputClass,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
} from '@/components/employer/editorial';

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
  const minDate = tomorrow.toISOString().split('T')[0];

  // Validation summary
  const validationIssues: string[] = [];
  if (!formData.title) validationIssues.push('Job title is required');
  if (!formData.location) validationIssues.push('Location is required');
  if (!formData.description || formData.description.length < 50) {
    validationIssues.push('Description must be at least 50 characters');
  }
  if (!formData.requirements || formData.requirements.length === 0) {
    validationIssues.push('At least one requirement is needed');
  }
  if (!formData.closingDate) validationIssues.push('Closing date is required');

  return (
    <div className="space-y-4">
      {/* Preview Section */}
      <FormCard eyebrow="Preview">
        <div className="flex items-center gap-2 text-white mb-3">
          <Eye className="h-5 w-5" />
          <span className="text-[13px] font-medium">How candidates will see your job</span>
        </div>

        <VacancyPreviewCard
          data={formData}
          companyName={employer?.company_name || 'Your Company'}
        />
      </FormCard>

      {/* Closing Date */}
      <FormCard eyebrow="Closing Date">
        <Field
          label="Application Closing Date"
          required
          hint={errors.closingDate?.message ?? 'The job listing will automatically close on this date'}
        >
          <Input
            type="date"
            className={`${inputClass} [color-scheme:dark]`}
            min={minDate}
            {...register('closingDate')}
          />
        </Field>
      </FormCard>

      {/* Validation Summary */}
      {validationIssues.length > 0 && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-medium text-red-400 mb-2">
                Please fix the following before publishing:
              </p>
              <ul className="text-[11px] text-red-400/80 space-y-1">
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
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
          <p className="text-[13px] text-white">
            <strong className="text-emerald-400">Ready to publish!</strong> Your job listing looks
            complete. Hit publish to make it live.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-white/[0.06]">
        {/* Primary action */}
        <PrimaryButton
          type="button"
          onClick={onPublish}
          disabled={validationIssues.length > 0 || isSubmitting}
          fullWidth
          size="lg"
        >
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Publishing...' : 'Publish Job Listing'}
        </PrimaryButton>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 gap-3">
          <SecondaryButton
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            fullWidth
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </SecondaryButton>

          <SecondaryButton
            type="button"
            onClick={onSaveAsTemplate}
            disabled={isSubmitting || !formData.title}
            fullWidth
          >
            <FileText className="h-4 w-4 mr-2" />
            Save Template
          </SecondaryButton>
        </div>
      </div>

      {/* Info tip */}
      <div className="p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
        <p className="text-[13px] text-white">
          <strong>After publishing:</strong> Your job will appear in the Jobs section where
          qualified electricians can view and apply. You'll receive notifications when candidates
          apply.
        </p>
      </div>
    </div>
  );
}
