import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Wrench, Info } from "lucide-react";
import { MaintenanceEquipmentDetails } from "@/types/maintenance-method";
import { InlineMaintenanceTypeSelector } from "./InlineMaintenanceTypeSelector";
import { CollapsibleFormSection } from "../installation-specialist/CollapsibleFormSection";
import { MaintenanceTemplateGrid } from "./MaintenanceTemplateGrid";
import { MaintenanceEquipmentDetailsForm } from "./MaintenanceEquipmentDetails";
import { FormSection } from "../installation-specialist/FormSection";
import { MaintenanceTemplate } from "@/lib/maintenance-templates";

interface MaintenanceInputProps {
  query: string;
  equipmentDetails: MaintenanceEquipmentDetails;
  onQueryChange: (query: string) => void;
  onEquipmentDetailsChange: (details: MaintenanceEquipmentDetails) => void;
  onGenerate: () => void;
  isProcessing: boolean;
}

const MAX_CHARS = 2000;

export const MaintenanceInput = ({
  query,
  equipmentDetails,
  onQueryChange,
  onEquipmentDetailsChange,
  onGenerate,
  isProcessing
}: MaintenanceInputProps) => {
  const [hasEquipmentDetails, setHasEquipmentDetails] = useState(false);
  const charCount = query.length;
  const charProgress = (charCount / MAX_CHARS) * 100;

  const handleTemplateSelect = (template: MaintenanceTemplate) => {
    onQueryChange(template.query);
    onEquipmentDetailsChange({
      equipmentType: template.equipmentType,
      location: template.location,
      installationType: template.installationType,
      knownIssues: template.knownIssues || '',
      additionalNotes: '',
      ageYears: undefined,
      lastInspectionDate: undefined,
    });
    setHasEquipmentDetails(true);
  };

  const canGenerate = query.trim().length >= 50 && equipmentDetails.equipmentType && equipmentDetails.location;

  return (
    <div className="space-y-0">
      {/* Main Query Input */}
      <FormSection>
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-5 w-5 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold">What equipment needs maintenance?</h2>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Describe the equipment, its condition, any known issues, and the type of maintenance required. 
            Be specific to get detailed, step-by-step maintenance instructions.
          </p>

          <Textarea
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Example: Three-phase distribution board serving commercial kitchen equipment, 15 years old with visible signs of corrosion on busbar connections. Requires comprehensive inspection and testing including thermal imaging, torque checking, and earth fault loop impedance tests..."
            className="min-h-[140px] sm:min-h-[160px] resize-none text-base"
            rows={6}
            disabled={isProcessing}
          />

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{charCount} / {MAX_CHARS} characters</span>
              <span className={charCount < 50 ? "text-amber-400" : "text-green-400"}>
                {charCount < 50 ? `${50 - charCount} more needed` : "Ready"}
              </span>
            </div>
            <Progress value={charProgress} className="h-1.5" />
          </div>
        </div>
      </FormSection>

      {/* Installation Type Selector */}
      <FormSection>
        <InlineMaintenanceTypeSelector
          selectedType={equipmentDetails.installationType}
          onChange={(type) => onEquipmentDetailsChange({ ...equipmentDetails, installationType: type })}
          disabled={isProcessing}
        />
      </FormSection>

      {/* Quick Start Templates */}
      <CollapsibleFormSection
        title="Quick Start Templates"
        subtitle="Select a pre-configured maintenance scenario"
        icon={<Zap className="h-5 w-5 text-amber-400" />}
        badge="optional"
        defaultOpen={false}
      >
        <MaintenanceTemplateGrid
          selectedCategory={equipmentDetails.installationType}
          onSelectTemplate={handleTemplateSelect}
        />
      </CollapsibleFormSection>

      {/* Equipment Details */}
      <CollapsibleFormSection
        title="Equipment Details"
        subtitle="Additional equipment information (optional)"
        icon={<Info className="h-5 w-5 text-blue-400" />}
        badge={hasEquipmentDetails ? "configured" : "optional"}
        defaultOpen={hasEquipmentDetails}
      >
        <MaintenanceEquipmentDetailsForm
          equipmentDetails={equipmentDetails}
          onChange={onEquipmentDetailsChange}
        />
      </CollapsibleFormSection>

      {/* Generate Button */}
      <div className="pt-4 pb-2">
        <Button
          onClick={onGenerate}
          disabled={!canGenerate || isProcessing}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
          size="lg"
        >
          <Wrench className="mr-2 h-5 w-5" />
          {isProcessing ? "Generating..." : "Generate Maintenance Instructions"}
        </Button>

        {!canGenerate && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            {query.length < 50 && "Add at least 50 characters describing the maintenance work required. "}
            {(!equipmentDetails.equipmentType || !equipmentDetails.location) && "Provide equipment type and location."}
          </p>
        )}

        <p className="text-xs text-muted-foreground text-center mt-3">
          This will generate 15+ detailed maintenance steps with safety procedures,
          tools required, inspection checkpoints, and BS 7671 references
        </p>
      </div>
    </div>
  );
};
