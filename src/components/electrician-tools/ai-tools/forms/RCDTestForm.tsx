import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";

const rcdTestFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  installationAddress: z.string().min(1, "Installation address is required"),
  rcdType: z.enum(["30ma", "100ma", "300ma", "500ma"]),
  rcdLocation: z.string().min(1, "RCD location is required"),
  testType: z.enum(["routine", "commissioning", "maintenance", "fault-finding"]),
  testResults: z.string().min(1, "Test results are required"),
  rcdCondition: z.enum(["satisfactory", "unsatisfactory"]),
  actionRequired: z.string().optional(),
  testerName: z.string().min(1, "Tester name is required"),
  testDate: z.string().min(1, "Test date is required"),
});

export type RCDTestFormData = z.infer<typeof rcdTestFormSchema>;

interface RCDTestFormProps {
  onFormChange: (data: RCDTestFormData) => void;
}

export const RCDTestForm = ({ onFormChange }: RCDTestFormProps) => {
  const { watch, setValue, formState: { errors } } = useForm<RCDTestFormData>({
    resolver: zodResolver(rcdTestFormSchema),
    mode: "onChange"
  });

  const watchedValues = watch();

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as RCDTestFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const rcdTypeOptions = [
    { value: "30ma", label: "30mA (General socket protection)" },
    { value: "100ma", label: "100mA (Fire protection)" },
    { value: "300ma", label: "300mA (Fire protection)" },
    { value: "500ma", label: "500mA (Fire protection)" }
  ];

  const testTypeOptions = [
    { value: "routine", label: "Routine Test" },
    { value: "commissioning", label: "Commissioning Test" },
    { value: "maintenance", label: "Maintenance Test" },
    { value: "fault-finding", label: "Fault Finding" }
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          RCD Details
        </h3>
        <MobileSelectWrapper
          label="RCD Type"
          placeholder="Select RCD type"
          value={watchedValues.rcdType || ""}
          onValueChange={(value) => setValue("rcdType", value as any)}
          options={rcdTypeOptions}
          error={errors.rcdType?.message}
        />
        <MobileInputWrapper
          label="RCD Location"
          placeholder="e.g., Main consumer unit, Garage CU"
          value={watchedValues.rcdLocation || ""}
          onChange={(value) => setValue("rcdLocation", value)}
          error={errors.rcdLocation?.message}
        />
        <MobileSelectWrapper
          label="Test Type"
          placeholder="Select test type"
          value={watchedValues.testType || ""}
          onValueChange={(value) => setValue("testType", value as any)}
          options={testTypeOptions}
          error={errors.testType?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Test Results
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Test Results</label>
          <Textarea
            placeholder="Enter RCD test results (trip times, test button operation, etc.)"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.testResults || ""}
            onChange={(e) => setValue("testResults", e.target.value)}
          />
          {errors.testResults && (
            <p className="text-sm text-red-400">{errors.testResults.message}</p>
          )}
        </div>
        <MobileSelectWrapper
          label="RCD Condition"
          placeholder="Select RCD condition"
          value={watchedValues.rcdCondition || ""}
          onValueChange={(value) => setValue("rcdCondition", value as "satisfactory" | "unsatisfactory")}
          options={conditionOptions}
          error={errors.rcdCondition?.message}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Action Required</label>
          <Textarea
            placeholder="Enter any required actions or recommendations"
            className="min-h-[60px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.actionRequired || ""}
            onChange={(e) => setValue("actionRequired", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Tester Details
        </h3>
        <MobileInputWrapper
          label="Tester Name"
          placeholder="Enter tester name"
          value={watchedValues.testerName || ""}
          onChange={(value) => setValue("testerName", value)}
          error={errors.testerName?.message}
        />
        <MobileInputWrapper
          label="Test Date"
          type="date"
          placeholder="Select test date"
          value={watchedValues.testDate || ""}
          onChange={(value) => setValue("testDate", value)}
          error={errors.testDate?.message}
        />
      </div>
    </div>
  );
};