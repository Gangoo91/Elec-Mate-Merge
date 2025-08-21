import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";

const consumerUnitFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  installationAddress: z.string().min(1, "Installation address is required"),
  unitType: z.enum(["metal", "plastic", "composite"]),
  unitMake: z.string().min(1, "Unit make is required"),
  unitModel: z.string().min(1, "Unit model is required"),
  installationType: z.enum(["new-installation", "replacement", "upgrade"]),
  circuitCount: z.string().min(1, "Circuit count is required"),
  rcdProtection: z.enum(["dual-rcd", "rcbo", "none"]),
  testResults: z.string().min(1, "Test results are required"),
  installationCompliant: z.enum(["yes", "no"]),
  installerName: z.string().min(1, "Installer name is required"),
  installationDate: z.string().min(1, "Installation date is required"),
});

export type ConsumerUnitFormData = z.infer<typeof consumerUnitFormSchema>;

interface ConsumerUnitFormProps {
  onFormChange: (data: ConsumerUnitFormData) => void;
}

export const ConsumerUnitForm = ({ onFormChange }: ConsumerUnitFormProps) => {
  const { watch, setValue, formState: { errors } } = useForm<ConsumerUnitFormData>({
    resolver: zodResolver(consumerUnitFormSchema),
    mode: "onChange"
  });

  const watchedValues = watch();

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as ConsumerUnitFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const unitTypeOptions = [
    { value: "metal", label: "Metal enclosure" },
    { value: "plastic", label: "Plastic enclosure" },
    { value: "composite", label: "Composite enclosure" }
  ];

  const installationTypeOptions = [
    { value: "new-installation", label: "New Installation" },
    { value: "replacement", label: "Replacement" },
    { value: "upgrade", label: "Upgrade" }
  ];

  const rcdOptions = [
    { value: "dual-rcd", label: "Dual RCD protection" },
    { value: "rcbo", label: "RCBO protection" },
    { value: "none", label: "No RCD protection" }
  ];

  const complianceOptions = [
    { value: "yes", label: "Yes - Installation complies" },
    { value: "no", label: "No - Non-compliance issues" }
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
          Consumer Unit Details
        </h3>
        <MobileSelectWrapper
          label="Unit Type"
          placeholder="Select unit type"
          value={watchedValues.unitType || ""}
          onValueChange={(value) => setValue("unitType", value as any)}
          options={unitTypeOptions}
          error={errors.unitType?.message}
        />
        <MobileInputWrapper
          label="Unit Make"
          placeholder="e.g., Hager, Schneider, MK"
          value={watchedValues.unitMake || ""}
          onChange={(value) => setValue("unitMake", value)}
          error={errors.unitMake?.message}
        />
        <MobileInputWrapper
          label="Unit Model"
          placeholder="Enter unit model number"
          value={watchedValues.unitModel || ""}
          onChange={(value) => setValue("unitModel", value)}
          error={errors.unitModel?.message}
        />
        <MobileSelectWrapper
          label="Installation Type"
          placeholder="Select installation type"
          value={watchedValues.installationType || ""}
          onValueChange={(value) => setValue("installationType", value as any)}
          options={installationTypeOptions}
          error={errors.installationType?.message}
        />
        <MobileInputWrapper
          label="Circuit Count"
          placeholder="e.g., 12 ways, 16 ways"
          value={watchedValues.circuitCount || ""}
          onChange={(value) => setValue("circuitCount", value)}
          error={errors.circuitCount?.message}
        />
        <MobileSelectWrapper
          label="RCD Protection"
          placeholder="Select RCD protection type"
          value={watchedValues.rcdProtection || ""}
          onValueChange={(value) => setValue("rcdProtection", value as any)}
          options={rcdOptions}
          error={errors.rcdProtection?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Testing & Compliance
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Test Results</label>
          <Textarea
            placeholder="Enter test results (RCD operation, insulation resistance, etc.)"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.testResults || ""}
            onChange={(e) => setValue("testResults", e.target.value)}
          />
          {errors.testResults && (
            <p className="text-sm text-red-400">{errors.testResults.message}</p>
          )}
        </div>
        <MobileSelectWrapper
          label="Installation Compliance"
          placeholder="Select compliance status"
          value={watchedValues.installationCompliant || ""}
          onValueChange={(value) => setValue("installationCompliant", value as "yes" | "no")}
          options={complianceOptions}
          error={errors.installationCompliant?.message}
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
          label="Installation Date"
          type="date"
          placeholder="Select installation date"
          value={watchedValues.installationDate || ""}
          onChange={(value) => setValue("installationDate", value)}
          error={errors.installationDate?.message}
        />
      </div>
    </div>
  );
};