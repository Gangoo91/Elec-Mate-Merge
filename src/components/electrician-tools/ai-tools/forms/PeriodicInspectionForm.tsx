import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";

const periodicInspectionFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  installationAddress: z.string().min(1, "Installation address is required"),
  lastInspectionDate: z.string().optional(),
  inspectionType: z.enum(["routine", "change-of-occupancy", "insurance", "safety-concern"]),
  overallCondition: z.enum(["satisfactory", "unsatisfactory"]),
  observationsFound: z.string().optional(),
  recommendedActions: z.string().optional(),
  nextInspectionDue: z.string().min(1, "Next inspection date is required"),
  inspectorName: z.string().min(1, "Inspector name is required"),
  inspectionDate: z.string().min(1, "Inspection date is required"),
});

export type PeriodicInspectionFormData = z.infer<typeof periodicInspectionFormSchema>;

interface PeriodicInspectionFormProps {
  onFormChange: (data: PeriodicInspectionFormData) => void;
}

export const PeriodicInspectionForm = ({ onFormChange }: PeriodicInspectionFormProps) => {
  const { watch, setValue, formState: { errors } } = useForm<PeriodicInspectionFormData>({
    resolver: zodResolver(periodicInspectionFormSchema),
    mode: "onChange"
  });

  const watchedValues = watch();

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as PeriodicInspectionFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const inspectionTypeOptions = [
    { value: "routine", label: "Routine Inspection" },
    { value: "change-of-occupancy", label: "Change of Occupancy" },
    { value: "insurance", label: "Insurance Requirement" },
    { value: "safety-concern", label: "Safety Concern" }
  ];

  const conditionOptions = [
    { value: "satisfactory", label: "Satisfactory" },
    { value: "unsatisfactory", label: "Unsatisfactory" }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Client & Installation
        </h3>
        <MobileInputWrapper
          label="Client Name"
          placeholder="Enter client name"
          value={watchedValues.clientName || ""}
          onChange={(value) => setValue("clientName", value)}
          error={errors.clientName?.message}
        />
        <MobileInputWrapper
          label="Installation Address"
          placeholder="Enter installation address"
          value={watchedValues.installationAddress || ""}
          onChange={(value) => setValue("installationAddress", value)}
          error={errors.installationAddress?.message}
        />
        <MobileInputWrapper
          label="Last Inspection Date"
          type="date"
          placeholder="Select last inspection date"
          value={watchedValues.lastInspectionDate || ""}
          onChange={(value) => setValue("lastInspectionDate", value)}
          error={errors.lastInspectionDate?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Inspection Details
        </h3>
        <MobileSelectWrapper
          label="Inspection Type"
          placeholder="Select inspection type"
          value={watchedValues.inspectionType || ""}
          onValueChange={(value) => setValue("inspectionType", value as any)}
          options={inspectionTypeOptions}
          error={errors.inspectionType?.message}
        />
        <MobileSelectWrapper
          label="Overall Condition"
          placeholder="Select overall condition"
          value={watchedValues.overallCondition || ""}
          onValueChange={(value) => setValue("overallCondition", value as "satisfactory" | "unsatisfactory")}
          options={conditionOptions}
          error={errors.overallCondition?.message}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Observations Found</label>
          <Textarea
            placeholder="Describe any observations or issues found during inspection"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.observationsFound || ""}
            onChange={(e) => setValue("observationsFound", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Recommended Actions</label>
          <Textarea
            placeholder="Enter recommended actions or remedial work required"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.recommendedActions || ""}
            onChange={(e) => setValue("recommendedActions", e.target.value)}
          />
        </div>
        <MobileInputWrapper
          label="Next Inspection Due"
          placeholder="e.g., 5 years, 1 year"
          value={watchedValues.nextInspectionDue || ""}
          onChange={(value) => setValue("nextInspectionDue", value)}
          error={errors.nextInspectionDue?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Inspector Details
        </h3>
        <MobileInputWrapper
          label="Inspector Name"
          placeholder="Enter inspector name"
          value={watchedValues.inspectorName || ""}
          onChange={(value) => setValue("inspectorName", value)}
          error={errors.inspectorName?.message}
        />
        <MobileInputWrapper
          label="Inspection Date"
          type="date"
          placeholder="Select inspection date"
          value={watchedValues.inspectionDate || ""}
          onChange={(value) => setValue("inspectionDate", value)}
          error={errors.inspectionDate?.message}
        />
      </div>
    </div>
  );
};