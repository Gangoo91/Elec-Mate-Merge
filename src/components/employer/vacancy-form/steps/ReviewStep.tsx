import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { VacancyPreviewCard } from '../VacancyPreviewCard';
import type { VacancyFormData } from '../schema';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
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

  const { companyProfile } = useCompanyProfile();
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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
      {/* How candidates will see it */}
      <FormCard eyebrow="How candidates see it">
        <VacancyPreviewCard
          data={formData}
          companyName={companyProfile?.company_name || 'Your Company'}
        />
      </FormCard>

      <div className="min-w-0 space-y-4">
        <FormCard eyebrow="Closing date">
          <Field
            label="Applications close on"
            required
            hint={
              errors.closingDate?.message ??
              'Shown to candidates on the advert. Close the listing from Vacancies when the role is filled'
            }
          >
            <Input
              type="date"
              className={`${inputClass} [color-scheme:dark]`}
              min={minDate}
              {...register('closingDate')}
            />
          </Field>
        </FormCard>

        {validationIssues.length > 0 ? (
          <div className="rounded-2xl border border-red-500/40 px-4 py-3">
            <p className="text-[14px] font-semibold text-red-400">Before you publish</p>
            <ul className="mt-1 space-y-0.5 text-[13px] text-white">
              {validationIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[14px] leading-snug text-white">
            <span className="font-semibold text-emerald-400">Ready to publish.</span> It goes on the
            Elec-Mate job board and you are told when someone applies.
          </p>
        )}

        <div className="space-y-2">
          <PrimaryButton
            type="button"
            onClick={onPublish}
            disabled={validationIssues.length > 0 || isSubmitting}
            fullWidth
            className="h-12 rounded-xl text-[15px]"
          >
            {isSubmitting ? 'Publishing…' : 'Publish vacancy'}
          </PrimaryButton>
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton
              type="button"
              onClick={onSaveDraft}
              disabled={isSubmitting}
              fullWidth
              className="rounded-xl"
            >
              Save as draft
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={onSaveAsTemplate}
              disabled={isSubmitting || !formData.title}
              fullWidth
              className="rounded-xl"
            >
              Save as template
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
