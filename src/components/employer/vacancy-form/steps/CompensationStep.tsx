import { useFormContext, Controller } from 'react-hook-form';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  inputClass,
  FormCard,
  FormGrid,
  Field,
  Eyebrow,
} from '@/components/employer/editorial';
import {
  salaryPeriods,
  commonBenefits,
  type VacancyFormData,
  type SalaryPeriod,
} from '../schema';

export function CompensationStep() {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VacancyFormData>();

  const selectedPeriod = watch('salaryPeriod');
  const selectedBenefits = watch('benefits') || [];

  const periodLabels: Record<SalaryPeriod, string> = {
    hour: 'Per Hour',
    day: 'Per Day',
    week: 'Per Week',
    month: 'Per Month',
    year: 'Per Year',
  };

  const toggleBenefit = (benefit: string) => {
    const current = selectedBenefits;
    if (current.includes(benefit)) {
      setValue(
        'benefits',
        current.filter((b) => b !== benefit)
      );
    } else {
      setValue('benefits', [...current, benefit]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Salary */}
      <FormCard eyebrow="Salary Range">
        {/* Salary Period Selector */}
        <Controller
          name="salaryPeriod"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {salaryPeriods.map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => field.onChange(period)}
                  className={cn(
                    'px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200',
                    'touch-manipulation min-h-[44px]',
                    selectedPeriod === period
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  )}
                >
                  {periodLabels[period]}
                </button>
              ))}
            </div>
          )}
        />

        {/* Min/Max Salary Inputs - Stack on mobile */}
        <FormGrid cols={2}>
          <Field label="Minimum Salary" hint={errors.salaryMin?.message}>
            <Input
              type="number"
              placeholder="e.g., 35000"
              className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              {...register('salaryMin', {
                setValueAs: (v) => (v === '' ? undefined : Number(v)),
              })}
            />
          </Field>

          <Field label="Maximum Salary" hint={errors.salaryMax?.message}>
            <Input
              type="number"
              placeholder="e.g., 45000"
              className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              {...register('salaryMax', {
                setValueAs: (v) => (v === '' ? undefined : Number(v)),
              })}
            />
          </Field>
        </FormGrid>

        <p className="text-[11px] text-white">
          Leave blank to show "Competitive salary" on the listing
        </p>
      </FormCard>

      {/* Benefits */}
      <FormCard>
        <div className="flex items-center justify-between">
          <Eyebrow>Benefits & Perks</Eyebrow>
          <span className="text-[11px] text-white">{selectedBenefits.length} selected</span>
        </div>

        {/* Benefits Grid */}
        <div className="flex flex-wrap gap-2">
          {commonBenefits.map((benefit) => {
            const isSelected = selectedBenefits.includes(benefit);
            return (
              <button
                key={benefit}
                type="button"
                onClick={() => toggleBenefit(benefit)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2 rounded-full',
                  'text-[13px] font-medium transition-all duration-200',
                  'touch-manipulation min-h-[44px]',
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                    : 'bg-white/[0.06] text-white border border-white/[0.08] hover:bg-white/[0.1]'
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
                {benefit}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-white">
          Select the benefits you offer. You can add custom benefits in the description.
        </p>
      </FormCard>

      {/* Schedule + Start Date */}
      <FormCard eyebrow="Schedule">
        <Field label="Working Hours" hint="Optional - describe typical working hours">
          <Input
            className={inputClass}
            placeholder="e.g., Monday - Friday, 8am - 5pm"
            {...register('schedule')}
          />
        </Field>

        <Field label="Start Date" hint="Optional - when do you need someone to start?">
          <Input
            type="date"
            className={`${inputClass} [color-scheme:dark]`}
            {...register('startDate')}
          />
        </Field>
      </FormCard>

      {/* Helper tip */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
        <p className="text-[13px] text-white">
          <strong className="text-emerald-400">Tip:</strong> Jobs with clear salary ranges get 3x
          more applications. Be transparent about compensation to attract quality candidates.
        </p>
      </div>
    </div>
  );
}
