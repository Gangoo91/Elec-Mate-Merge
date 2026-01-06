import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Zap, Wrench, Info, ChevronDown, Lightbulb } from "lucide-react";
import { MaintenanceEquipmentDetails } from "@/types/maintenance-method";
import { InlineMaintenanceTypeSelector } from "./InlineMaintenanceTypeSelector";
import { MaintenanceTemplateGrid } from "./MaintenanceTemplateGrid";
import { MaintenanceEquipmentDetailsForm } from "./MaintenanceEquipmentDetails";
import { MaintenanceTemplate } from "@/lib/maintenance-templates";
import { cn } from "@/lib/utils";
import { StickySubmitButton } from "@/components/agents/shared/StickySubmitButton";
import { AGENT_CONFIG } from "@/components/agents/shared/AgentConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [showTemplates, setShowTemplates] = useState(false);
  const [showEquipmentDetails, setShowEquipmentDetails] = useState(false);
  const config = AGENT_CONFIG['maintenance'];
  const charCount = query.length;

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
    setShowTemplates(false);
  };

  // Character count styling
  const getCharCountClass = () => {
    if (charCount < 50) return 'text-white/40';
    if (charCount < 300) return 'text-emerald-400';
    return 'text-amber-400';
  };

  const canGenerate = query.trim().length >= 50 && equipmentDetails.equipmentType && equipmentDetails.location;

  return (
    <div className="space-y-4 pb-24 sm:pb-6">
      {/* Main Query Input */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ background: `${config.gradientFrom}20` }}
              >
                <Wrench className="h-4 w-4" style={{ color: config.gradientFrom }} />
              </div>
              Equipment & Requirements
            </Label>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-lg transition-colors",
              getCharCountClass(),
              charCount >= 50 && "bg-white/5"
            )}>
              {charCount} {charCount >= 50 && '✓'}
            </span>
          </div>

          <Textarea
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Describe the equipment, its condition, and the type of maintenance required..."
            className="agent-input"
            rows={5}
            autoComplete="off"
            spellCheck={true}
            maxLength={MAX_CHARS}
            disabled={isProcessing}
          />

          <p className="text-xs sm:text-sm text-white/50">
            50+ characters required for detailed maintenance instructions
          </p>
        </div>
      </div>

      {/* Installation Type Selector */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold">Installation Type</Label>
          <InlineMaintenanceTypeSelector
            selectedType={equipmentDetails.installationType}
            onChange={(type) => onEquipmentDetailsChange({ ...equipmentDetails, installationType: type })}
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* Quick Start Templates */}
      <Collapsible open={showTemplates} onOpenChange={setShowTemplates}>
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Quick Start Templates</span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                Templates
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showTemplates && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <MaintenanceTemplateGrid
              selectedCategory={equipmentDetails.installationType}
              onSelectTemplate={handleTemplateSelect}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Equipment Details */}
      <Collapsible open={showEquipmentDetails} onOpenChange={setShowEquipmentDetails}>
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Info className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Equipment Details</span>
              <span className={cn(
                "text-[10px] sm:text-xs px-2 py-0.5 rounded-full",
                hasEquipmentDetails ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
              )}>
                {hasEquipmentDetails ? "✓ Configured" : "Optional"}
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showEquipmentDetails && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <p className="text-xs text-white/50 pb-2">
              Additional equipment information for detailed instructions
            </p>
            <MaintenanceEquipmentDetailsForm
              equipmentDetails={equipmentDetails}
              onChange={onEquipmentDetailsChange}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="maintenance"
        onClick={onGenerate}
        isDisabled={!canGenerate}
        isLoading={isProcessing}
      />
    </div>
  );
};
