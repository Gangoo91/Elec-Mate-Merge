import { useFormContext, Controller } from 'react-hook-form';
import { Building2, Home, Laptop } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  inputClass,
  FormCard,
  FormGrid,
  Field,
  OptionTile,
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
      <FormCard index={1} eyebrow="Role">
        <Field label="Job Title" required hint={errors.title?.message}>
          <Input
            className={inputClass}
            placeholder="e.g., Qualified Electrician"
            {...register('title')}
          />
        </Field>
      </FormCard>

      {/* Employment Type */}
      <FormCard index={2} eyebrow="Employment type">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {employmentTypes.map((type) => (
                <OptionTile
                  key={type}
                  selected={selectedType === type}
                  onClick={() => field.onChange(type)}
                  label={type}
                />
              ))}
            </div>
          )}
        />
        {errors.type?.message && (
          <p className="text-[11px] text-red-400 mt-2">{errors.type.message}</p>
        )}
      </FormCard>

      {/* Location */}
      <FormCard index={3} eyebrow="Location">
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
      <FormCard index={4} eyebrow="Work arrangement">
        <Controller
          name="workArrangement"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-2">
              {workArrangements.map((arrangement) => (
                <OptionTile
                  key={arrangement}
                  selected={selectedArrangement === arrangement}
                  onClick={() => field.onChange(arrangement)}
                  icon={getWorkArrangementIcon(arrangement)}
                  label={arrangement}
                  vertical
                />
              ))}
            </div>
          )}
        />
        {errors.workArrangement?.message && (
          <p className="text-[11px] text-red-400 mt-2">{errors.workArrangement.message}</p>
        )}
      </FormCard>

      {/* Helper text */}
      <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/[0.15]">
        <span className="text-elec-yellow text-[13px] font-semibold flex-shrink-0">Tip</span>
        <p className="text-[12px] text-white/70 leading-snug">
          Be specific with your location — jobs with a postcode get 40% more relevant, nearby applications.
        </p>
      </div>
    </div>
  );
}
