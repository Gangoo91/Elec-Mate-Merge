import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";

const evChargerFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  installationAddress: z.string().min(1, "Installation address is required"),
  chargerType: z.enum(["type-1", "type-2", "3-pin", "commando"]),
  chargerPower: z.string().min(1, "Charger power is required"),
  installationLocation: z.enum(["garage", "driveway", "car-park", "public-area"]),
  earthingArrangement: z.string().min(1, "Earthing arrangement is required"),
  testResults: z.string().min(1, "Test results are required"),
  installationCompliant: z.enum(["yes", "no"]),
  specialRequirements: z.string().optional(),
  installerName: z.string().min(1, "Installer name is required"),
  installationDate: z.string().min(1, "Installation date is required"),
});

export type EVChargerFormData = z.infer<typeof evChargerFormSchema>;

interface EVChargerFormProps {
  onFormChange: (data: EVChargerFormData) => void;
}

export const EVChargerForm = ({ onFormChange }: EVChargerFormProps) => {
  const { watch, setValue, formState: { errors } } = useForm<EVChargerFormData>({
    resolver: zodResolver(evChargerFormSchema),
    mode: "onChange"
  });

  const watchedValues = watch();

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as EVChargerFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const chargerTypeOptions = [
    { value: "type-1", label: "Type 1 (5-pin)" },
    { value: "type-2", label: "Type 2 (7-pin)" },
    { value: "3-pin", label: "3-pin domestic socket" },
    { value: "commando", label: "Commando socket" }
  ];

  const locationOptions = [
    { value: "garage", label: "Garage" },
    { value: "driveway", label: "Driveway" },
    { value: "car-park", label: "Car Park" },
    { value: "public-area", label: "Public Area" }
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
          Charger Details
        </h3>
        <MobileSelectWrapper
          label="Charger Type"
          placeholder="Select charger type"
          value={watchedValues.chargerType || ""}
          onValueChange={(value) => setValue("chargerType", value as any)}
          options={chargerTypeOptions}
          error={errors.chargerType?.message}
        />
        <MobileInputWrapper
          label="Charger Power"
          placeholder="e.g., 7kW, 22kW, 3kW"
          value={watchedValues.chargerPower || ""}
          onChange={(value) => setValue("chargerPower", value)}
          error={errors.chargerPower?.message}
        />
        <MobileSelectWrapper
          label="Installation Location"
          placeholder="Select installation location"
          value={watchedValues.installationLocation || ""}
          onValueChange={(value) => setValue("installationLocation", value as any)}
          options={locationOptions}
          error={errors.installationLocation?.message}
        />
        <MobileInputWrapper
          label="Earthing Arrangement"
          placeholder="e.g., TN-C-S, TN-S, TT"
          value={watchedValues.earthingArrangement || ""}
          onChange={(value) => setValue("earthingArrangement", value)}
          error={errors.earthingArrangement?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Testing & Compliance
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Test Results</label>
          <Textarea
            placeholder="Enter test results (earth fault loop impedance, RCD operation, etc.)"
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Special Requirements</label>
          <Textarea
            placeholder="Any special requirements or additional notes"
            className="min-h-[60px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.specialRequirements || ""}
            onChange={(e) => setValue("specialRequirements", e.target.value)}
          />
        </div>
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