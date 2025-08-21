import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";

const minorWorksFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  installationAddress: z.string().min(1, "Installation address is required"),
  workDescription: z.string().min(1, "Work description is required"),
  circuitDetails: z.string().min(1, "Circuit details are required"),
  testResults: z.string().min(1, "Test results are required"),
  workCompliant: z.enum(["yes", "no"]),
  installerName: z.string().min(1, "Installer name is required"),
  completionDate: z.string().min(1, "Completion date is required"),
});

export type MinorWorksFormData = z.infer<typeof minorWorksFormSchema>;

interface MinorWorksFormProps {
  onFormChange: (data: MinorWorksFormData) => void;
}

export const MinorWorksForm = ({ onFormChange }: MinorWorksFormProps) => {
  const { watch, setValue, formState: { errors } } = useForm<MinorWorksFormData>({
    resolver: zodResolver(minorWorksFormSchema),
    mode: "onChange"
  });

  const watchedValues = watch();

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as MinorWorksFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const complianceOptions = [
    { value: "yes", label: "Yes - Work complies with BS 7671" },
    { value: "no", label: "No - Work does not comply" }
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Work Details
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Work Description</label>
          <Textarea
            placeholder="Describe the minor electrical work completed"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.workDescription || ""}
            onChange={(e) => setValue("workDescription", e.target.value)}
          />
          {errors.workDescription && (
            <p className="text-sm text-red-400">{errors.workDescription.message}</p>
          )}
        </div>
        <MobileInputWrapper
          label="Circuit Details"
          placeholder="e.g., Ring circuit, Lighting circuit"
          value={watchedValues.circuitDetails || ""}
          onChange={(value) => setValue("circuitDetails", value)}
          error={errors.circuitDetails?.message}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Test Results</label>
          <Textarea
            placeholder="Enter test results (continuity, insulation resistance, etc.)"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.testResults || ""}
            onChange={(e) => setValue("testResults", e.target.value)}
          />
          {errors.testResults && (
            <p className="text-sm text-red-400">{errors.testResults.message}</p>
          )}
        </div>
        <MobileSelectWrapper
          label="Work Compliance"
          placeholder="Select compliance status"
          value={watchedValues.workCompliant || ""}
          onValueChange={(value) => setValue("workCompliant", value as "yes" | "no")}
          options={complianceOptions}
          error={errors.workCompliant?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Installer Details
        </h3>
        <MobileInputWrapper
          label="Installer Name"
          placeholder="Enter installer name"
          value={watchedValues.installerName || ""}
          onChange={(value) => setValue("installerName", value)}
          error={errors.installerName?.message}
        />
        <MobileInputWrapper
          label="Completion Date"
          type="date"
          placeholder="Select completion date"
          value={watchedValues.completionDate || ""}
          onChange={(value) => setValue("completionDate", value)}
          error={errors.completionDate?.message}
        />
      </div>
    </div>
  );
};