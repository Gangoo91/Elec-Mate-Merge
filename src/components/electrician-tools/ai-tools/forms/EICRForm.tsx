import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";

const eicrFormSchema = z.object({
  // Client Details
  clientName: z.string().min(1, "Client name is required"),
  clientAddress: z.string().min(1, "Client address is required"),
  clientPhone: z.string().optional(),
  
  // Installation Details
  installationAddress: z.string().min(1, "Installation address is required"),
  installationDescription: z.string().min(1, "Installation description is required"),
  estimatedAge: z.string().min(1, "Estimated age is required"),
  earthingArrangements: z.string().min(1, "Earthing arrangements required"),
  supplyCharacteristics: z.string().min(1, "Supply characteristics required"),
  mainSwitchRating: z.string().min(1, "Main switch rating required"),
  
  // Inspection Details
  extentOfInspection: z.string().min(1, "Extent of inspection required"),
  limitations: z.string().optional(),
  
  // Faults Found
  faultsFound: z.string().min(1, "Please specify faults found"),
  c1Faults: z.string().optional(),
  c2Faults: z.string().optional(),
  c3Faults: z.string().optional(),
  fiImprovements: z.string().optional(),
  
  // Overall Assessment
  overallAssessment: z.enum(["satisfactory", "unsatisfactory"]),
  nextInspectionRecommended: z.string().optional(),
  
  // Inspector Details
  inspectorName: z.string().min(1, "Inspector name is required"),
  inspectorQualification: z.string().min(1, "Inspector qualification is required"),
  inspectionDate: z.string().min(1, "Inspection date is required"),
});

export type EICRFormData = z.infer<typeof eicrFormSchema>;

interface EICRFormProps {
  onFormChange: (data: EICRFormData) => void;
}

export const EICRForm = ({ onFormChange }: EICRFormProps) => {
  const { register, watch, setValue, formState: { errors } } = useForm<EICRFormData>({
    resolver: zodResolver(eicrFormSchema),
    mode: "onChange"
  });

  const watchedValues = watch();

  // Notify parent of form changes
  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange(value as EICRFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  const faultOptions = [
    { value: "none", label: "No faults found" },
    { value: "c1-only", label: "C1 faults only" },
    { value: "c2-only", label: "C2 faults only" },
    { value: "c3-only", label: "C3 faults only" },
    { value: "mixed", label: "Mixed fault codes" },
    { value: "fi-only", label: "Further investigation only" }
  ];

  const assessmentOptions = [
    { value: "satisfactory", label: "Satisfactory" },
    { value: "unsatisfactory", label: "Unsatisfactory" }
  ];

  return (
    <div className="space-y-6">
      {/* Client Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Client Details
        </h3>
        <MobileInputWrapper
          label="Client Name"
          placeholder="Enter client name"
          value={watchedValues.clientName || ""}
          onChange={(value) => setValue("clientName", value)}
          error={errors.clientName?.message}
        />
        <MobileInputWrapper
          label="Client Address"
          placeholder="Enter client address"
          value={watchedValues.clientAddress || ""}
          onChange={(value) => setValue("clientAddress", value)}
          error={errors.clientAddress?.message}
        />
        <MobileInputWrapper
          label="Client Phone"
          placeholder="Enter client phone number"
          value={watchedValues.clientPhone || ""}
          onChange={(value) => setValue("clientPhone", value)}
          error={errors.clientPhone?.message}
        />
      </div>

      {/* Installation Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Installation Details
        </h3>
        <MobileInputWrapper
          label="Installation Address"
          placeholder="Enter installation address"
          value={watchedValues.installationAddress || ""}
          onChange={(value) => setValue("installationAddress", value)}
          error={errors.installationAddress?.message}
        />
        <MobileInputWrapper
          label="Installation Description"
          placeholder="e.g., Domestic dwelling, Commercial office"
          value={watchedValues.installationDescription || ""}
          onChange={(value) => setValue("installationDescription", value)}
          error={errors.installationDescription?.message}
        />
        <MobileInputWrapper
          label="Estimated Age"
          placeholder="e.g., 20 years, Recent installation"
          value={watchedValues.estimatedAge || ""}
          onChange={(value) => setValue("estimatedAge", value)}
          error={errors.estimatedAge?.message}
        />
        <MobileInputWrapper
          label="Earthing Arrangements"
          placeholder="e.g., TN-C-S, TN-S, TT"
          value={watchedValues.earthingArrangements || ""}
          onChange={(value) => setValue("earthingArrangements", value)}
          error={errors.earthingArrangements?.message}
        />
        <MobileInputWrapper
          label="Supply Characteristics"
          placeholder="e.g., 230V 50Hz single phase"
          value={watchedValues.supplyCharacteristics || ""}
          onChange={(value) => setValue("supplyCharacteristics", value)}
          error={errors.supplyCharacteristics?.message}
        />
        <MobileInputWrapper
          label="Main Switch Rating"
          placeholder="e.g., 100A DP"
          value={watchedValues.mainSwitchRating || ""}
          onChange={(value) => setValue("mainSwitchRating", value)}
          error={errors.mainSwitchRating?.message}
        />
      </div>

      {/* Inspection Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Inspection Details
        </h3>
        <MobileInputWrapper
          label="Extent of Inspection"
          placeholder="e.g., 100% visual, 10% testing"
          value={watchedValues.extentOfInspection || ""}
          onChange={(value) => setValue("extentOfInspection", value)}
          error={errors.extentOfInspection?.message}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Limitations</label>
          <Textarea
            placeholder="Enter any limitations encountered during inspection"
            className="min-h-[80px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={watchedValues.limitations || ""}
            onChange={(e) => setValue("limitations", e.target.value)}
          />
        </div>
      </div>

      {/* Faults Found */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Faults & Observations
        </h3>
        <MobileSelectWrapper
          label="Faults Found"
          placeholder="Select fault type"
          value={watchedValues.faultsFound || ""}
          onValueChange={(value) => setValue("faultsFound", value)}
          options={faultOptions}
          error={errors.faultsFound?.message}
        />
        
        {watchedValues.faultsFound === "c1-only" || watchedValues.faultsFound === "mixed" ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">C1 Faults (Danger Present)</label>
            <Textarea
              placeholder="Describe C1 faults found"
              className="min-h-[60px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
              value={watchedValues.c1Faults || ""}
              onChange={(e) => setValue("c1Faults", e.target.value)}
            />
          </div>
        ) : null}

        {watchedValues.faultsFound === "c2-only" || watchedValues.faultsFound === "mixed" ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">C2 Faults (Potentially Dangerous)</label>
            <Textarea
              placeholder="Describe C2 faults found"
              className="min-h-[60px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
              value={watchedValues.c2Faults || ""}
              onChange={(e) => setValue("c2Faults", e.target.value)}
            />
          </div>
        ) : null}

        {watchedValues.faultsFound === "c3-only" || watchedValues.faultsFound === "mixed" ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">C3 Faults (Improvement Recommended)</label>
            <Textarea
              placeholder="Describe C3 faults found"
              className="min-h-[60px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
              value={watchedValues.c3Faults || ""}
              onChange={(e) => setValue("c3Faults", e.target.value)}
            />
          </div>
        ) : null}

        {watchedValues.faultsFound === "fi-only" || watchedValues.faultsFound === "mixed" ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">FI (Further Investigation)</label>
            <Textarea
              placeholder="Describe areas requiring further investigation"
              className="min-h-[60px] bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
              value={watchedValues.fiImprovements || ""}
              onChange={(e) => setValue("fiImprovements", e.target.value)}
            />
          </div>
        ) : null}
      </div>

      {/* Overall Assessment */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-elec-yellow border-b border-elec-yellow/20 pb-2">
          Overall Assessment
        </h3>
        <MobileSelectWrapper
          label="Overall Assessment"
          placeholder="Select assessment"
          value={watchedValues.overallAssessment || ""}
          onValueChange={(value) => setValue("overallAssessment", value as "satisfactory" | "unsatisfactory")}
          options={assessmentOptions}
          error={errors.overallAssessment?.message}
        />
        <MobileInputWrapper
          label="Next Inspection Recommended"
          placeholder="e.g., 5 years, 1 year"
          value={watchedValues.nextInspectionRecommended || ""}
          onChange={(value) => setValue("nextInspectionRecommended", value)}
          error={errors.nextInspectionRecommended?.message}
        />
      </div>

      {/* Inspector Details */}
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
          label="Inspector Qualification"
          placeholder="e.g., 2391, 18th Edition, AM2"
          value={watchedValues.inspectorQualification || ""}
          onChange={(value) => setValue("inspectorQualification", value)}
          error={errors.inspectorQualification?.message}
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