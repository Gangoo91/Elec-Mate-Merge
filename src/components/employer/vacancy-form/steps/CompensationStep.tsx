import { useFormContext, Controller } from "react-hook-form";
import { PoundSterling, Calendar, Clock, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { IOSInput } from "@/components/ui/ios-input";
import { cn } from "@/lib/utils";
import {
  salaryPeriods,
  commonBenefits,
  type VacancyFormData,
  type SalaryPeriod,
} from "../schema";

export function CompensationStep() {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<VacancyFormData>();

  const selectedPeriod = watch("salaryPeriod");
  const selectedBenefits = watch("benefits") || [];

  const periodLabels: Record<SalaryPeriod, string> = {
    hour: "Per Hour",
    day: "Per Day",
    week: "Per Week",
    month: "Per Month",
    year: "Per Year",
  };

  const toggleBenefit = (benefit: string) => {
    const current = selectedBenefits;
    if (current.includes(benefit)) {
      setValue(
        "benefits",
        current.filter((b) => b !== benefit)
      );
    } else {
      setValue("benefits", [...current, benefit]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Salary Range */}
      <div className="space-y-4">
        <Label className="text-white/80 text-base">Salary Range</Label>

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
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "touch-manipulation min-h-[44px]",
                    selectedPeriod === period
                      ? "bg-elec-yellow text-black"
                      : "bg-white/10 text-white/70 hover:bg-white/15"
                  )}
                >
                  {periodLabels[period]}
                </button>
              ))}
            </div>
          )}
        />

        {/* Min/Max Salary Inputs - Stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Minimum Salary */}
          <IOSInput
            label="Minimum Salary"
            type="number"
            placeholder="e.g., 35000"
            icon={<PoundSterling className="h-5 w-5" />}
            error={errors.salaryMin?.message}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            {...register("salaryMin", {
              setValueAs: (v) => v === "" ? undefined : Number(v)
            })}
          />

          {/* Maximum Salary */}
          <IOSInput
            label="Maximum Salary"
            type="number"
            placeholder="e.g., 45000"
            icon={<PoundSterling className="h-5 w-5" />}
            error={errors.salaryMax?.message}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            {...register("salaryMax", {
              setValueAs: (v) => v === "" ? undefined : Number(v)
            })}
          />
        </div>

        <p className="text-xs text-white/50">
          Leave blank to show "Competitive salary" on the listing
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/80 text-base">Benefits & Perks</Label>
          <span className="text-xs text-white/50">
            {selectedBenefits.length} selected
          </span>
        </div>

        {/* Benefits Grid - Scrollable on mobile */}
        <div className="flex flex-wrap gap-2">
          {commonBenefits.map((benefit) => {
            const isSelected = selectedBenefits.includes(benefit);
            return (
              <button
                key={benefit}
                type="button"
                onClick={() => toggleBenefit(benefit)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg",
                  "text-sm font-medium transition-all duration-200",
                  "touch-manipulation min-h-[44px]",
                  isSelected
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
                {benefit}
              </button>
            );
          })}
        </div>

        {/* Custom benefit input hint */}
        <p className="text-xs text-white/50">
          Select the benefits you offer. You can add custom benefits in the description.
        </p>
      </div>

      {/* Schedule */}
      <IOSInput
        label="Working Hours"
        placeholder="e.g., Monday - Friday, 8am - 5pm"
        icon={<Clock className="h-5 w-5" />}
        hint="Optional - describe typical working hours"
        {...register("schedule")}
      />

      {/* Start Date - Calendar picker */}
      <IOSInput
        label="Start Date"
        type="date"
        icon={<Calendar className="h-5 w-5" />}
        hint="Optional - when do you need someone to start?"
        className="[color-scheme:dark]"
        {...register("startDate")}
      />

      {/* Helper tip */}
      <div className="p-4 rounded-xl bg-success/10 border border-success/20">
        <p className="text-sm text-success">
          <strong>Tip:</strong> Jobs with clear salary ranges get 3x more applications.
          Be transparent about compensation to attract quality candidates.
        </p>
      </div>
    </div>
  );
}
