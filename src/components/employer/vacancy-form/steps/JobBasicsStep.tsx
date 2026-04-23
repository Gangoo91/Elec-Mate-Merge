import { useFormContext, Controller } from 'react-hook-form';
import { Building2, Home, Laptop } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  inputClass,
  FormCard,
  FormGrid,
  Field,
} from '@/components/employer/editorial';
import {
  employmentTypes,
  workArrangements,
  type VacancyFormData,
  type WorkArrangement,
} from '../schema';

export function JobBasicsStep() {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<VacancyFormData>();

  const selectedType = watch('type');
  const selectedArrangement = watch('workArrangement');

  const getWorkArrangementIcon = (arrangement: WorkArrangement) => {
    switch (arrangement) {
      case 'On-site':
        return <Building2 className="h-4 w-4" />;
      case 'Remote':
        return <Laptop className="h-4 w-4" />;
      case 'Hybrid':
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Job Title */}
      <FormCard eyebrow="Role">
        <Field label="Job Title" required hint={errors.title?.message}>
          <Input
            className={inputClass}
            placeholder="e.g., Qualified Electrician"
            {...register('title')}
          />
        </Field>
      </FormCard>

      {/* Employment Type */}
      <FormCard eyebrow="Employment Type">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {employmentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => field.onChange(type)}
                  className={cn(
                    'p-3 rounded-xl border text-[13px] font-medium transition-all duration-200',
                    'touch-manipulation min-h-[48px]',
                    selectedType === type
                      ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                      : 'border-white/[0.08] bg-[hsl(0_0%_9%)] text-white hover:bg-white/[0.08]'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        />
        {errors.type?.message && (
          <p className="text-[11px] text-red-400 mt-2">{errors.type.message}</p>
        )}
      </FormCard>

      {/* Location */}
      <FormCard eyebrow="Location">
        <FormGrid cols={2}>
          <Field label="Work Location" required hint={errors.location?.message ?? 'Enter city, town or postcode'}>
            <Input
              className={inputClass}
              placeholder="e.g., Manchester, M1 1AA"
              {...register('location')}
            />
          </Field>

          <Field label="Postcode (optional)" hint={errors.postcode?.message ?? 'For map display and distance matching'}>
            <Input
              className={inputClass}
              placeholder="e.g., M1 1AA"
              {...register('postcode')}
            />
          </Field>
        </FormGrid>
      </FormCard>

      {/* Work Arrangement */}
      <FormCard eyebrow="Work Arrangement">
        <Controller
          name="workArrangement"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {workArrangements.map((arrangement) => (
                <button
                  key={arrangement}
                  type="button"
                  onClick={() => field.onChange(arrangement)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border',
                    'text-[13px] font-medium transition-all duration-200',
                    'touch-manipulation min-h-[80px]',
                    selectedArrangement === arrangement
                      ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                      : 'border-white/[0.08] bg-[hsl(0_0%_9%)] text-white hover:bg-white/[0.08]'
                  )}
                >
                  {getWorkArrangementIcon(arrangement)}
                  <span>{arrangement}</span>
                </button>
              ))}
            </div>
          )}
        />
        {errors.workArrangement?.message && (
          <p className="text-[11px] text-red-400 mt-2">{errors.workArrangement.message}</p>
        )}
      </FormCard>

      {/* Helper text */}
      <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25">
        <p className="text-[13px] text-white">
          <strong className="text-elec-yellow">Tip:</strong> Be specific with your location to
          attract nearby candidates. Jobs with postcodes get 40% more relevant applications.
        </p>
      </div>
    </div>
  );
}
