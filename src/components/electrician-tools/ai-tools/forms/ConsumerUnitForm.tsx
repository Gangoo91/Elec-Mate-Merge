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
    { value: "metal", label: "Metal Enclosure" },
    { value: "plastic", label: "Plastic Enclosure" },
    { value: "composite", label: "Composite Enclosure" }
  ];

  const installationTypeOptions = [
    { value: "new-installation", label: "New Installation" },
    { value: "replacement", label: "Consumer Unit Replacement" },
    { value: "upgrade", label: "Upgrade/Amendment" }
  ];

  const rcdOptions = [
    { value: "dual-rcd", label: "Dual RCD Protection" },
    { value: "rcbo", label: "RCBO Protection" },
    { value: "none", label: "No RCD Protection" }
  ];

  const unitMakeOptions = [
    { value: "hager", label: "Hager" },
    { value: "schneider", label: "Schneider Electric" },
    { value: "mk", label: "MK Electric" },
    { value: "crabtree", label: "Crabtree" },
    { value: "eaton", label: "Eaton (MEM)" },
    { value: "contactum", label: "Contactum" },
    { value: "bg", label: "BG Electrical" },
    { value: "other", label: "Other Manufacturer" }
  ];

  const circuitCountOptions = [
    { value: "6-way", label: "6 Way" },
    { value: "8-way", label: "8 Way" },
    { value: "10-way", label: "10 Way" },
    { value: "12-way", label: "12 Way" },
    { value: "14-way", label: "14 Way" },
    { value: "16-way", label: "16 Way" },
    { value: "18-way", label: "18 Way" },
    { value: "other", label: "Other Configuration" }
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
        <MobileSelectWrapper
          label="Unit Make"
          placeholder="Select manufacturer"
          value={watchedValues.unitMake || ""}
          onValueChange={(value) => setValue("unitMake", value)}
          options={unitMakeOptions}
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
        <MobileSelectWrapper
          label="Circuit Count"
          placeholder="Select circuit count"
          value={watchedValues.circuitCount || ""}
          onValueChange={(value) => setValue("circuitCount", value)}
          options={circuitCountOptions}
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