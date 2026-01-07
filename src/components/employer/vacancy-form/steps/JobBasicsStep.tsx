import { useFormContext, Controller } from "react-hook-form";
import { Briefcase, MapPin, Building2, Home, Laptop } from "lucide-react";
import { IOSInput } from "@/components/ui/ios-input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  employmentTypes,
  workArrangements,
  type VacancyFormData,
  type EmploymentType,
  type WorkArrangement,
} from "../schema";

export function JobBasicsStep() {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<VacancyFormData>();

  const selectedType = watch("type");
  const selectedArrangement = watch("workArrangement");

  const getWorkArrangementIcon = (arrangement: WorkArrangement) => {
    switch (arrangement) {
      case "On-site":
        return <Building2 className="h-4 w-4" />;
      case "Remote":
        return <Laptop className="h-4 w-4" />;
      case "Hybrid":
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Title */}
      <div>
        <IOSInput
          label="Job Title"
          placeholder="e.g., Qualified Electrician"
          icon={<Briefcase className="h-5 w-5" />}
          error={errors.title?.message}
          {...register("title")}
        />
      </div>

      {/* Employment Type */}
      <div className="space-y-3">
        <Label className="text-white/80">Employment Type</Label>
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
                    "p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                    "touch-manipulation min-h-[48px]",
                    selectedType === type
                      ? "border-elec-yellow bg-elec-yellow/10 text-elec-yellow"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        />
        {errors.type?.message && (
          <p className="text-xs text-red-400">{errors.type.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-4">
        <IOSInput
          label="Work Location"
          placeholder="e.g., Manchester, M1 1AA"
          icon={<MapPin className="h-5 w-5" />}
          error={errors.location?.message}
          hint="Enter city, town or postcode"
          {...register("location")}
        />

        {/* Postcode - optional for more precise location */}
        <IOSInput
          label="Postcode (optional)"
          placeholder="e.g., M1 1AA"
          error={errors.postcode?.message}
          hint="For map display and distance matching"
          {...register("postcode")}
        />
      </div>

      {/* Work Arrangement */}
      <div className="space-y-3">
        <Label className="text-white/80">Work Arrangement</Label>
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
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2",
                    "text-sm font-medium transition-all duration-200",
                    "touch-manipulation min-h-[80px]",
                    selectedArrangement === arrangement
                      ? "border-elec-yellow bg-elec-yellow/10 text-elec-yellow"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
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
          <p className="text-xs text-red-400">{errors.workArrangement.message}</p>
        )}
      </div>

      {/* Helper text */}
      <div className="p-4 rounded-xl bg-info/10 border border-info/20">
        <p className="text-sm text-info">
          <strong>Tip:</strong> Be specific with your location to attract nearby candidates.
          Jobs with postcodes get 40% more relevant applications.
        </p>
      </div>
    </div>
  );
}
