import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Wrench, FileText, Lightbulb, ChevronDown } from "lucide-react";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { InstallationProjectDetails } from "./InstallationProjectDetails";
import { InstallationTemplate } from "@/lib/installation-templates";
import { InstallationTemplateGrid } from "./InstallationTemplateGrid";
import { InlineInstallationTypeSelector } from "./InlineInstallationTypeSelector";
import { cn } from "@/lib/utils";
import { StickySubmitButton } from "@/components/agents/shared/StickySubmitButton";
import { AGENT_CONFIG } from "@/components/agents/shared/AgentConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface InstallationInputProps {
  onGenerate: (projectDetails: ProjectDetailsType, description: string, useFullMode: boolean) => void;
  isProcessing: boolean;
}

export const InstallationInput = ({ onGenerate, isProcessing }: InstallationInputProps) => {
  const [description, setDescription] = useState("");
  const [generateFullMethodStatement, setGenerateFullMethodStatement] = useState(true);
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsType>({
    projectName: '',
    location: '',
    installationType: 'domestic'
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const config = AGENT_CONFIG['installation'];

  useEffect(() => {
    setProjectDetails(prev => ({ ...prev, installationType }));
  }, [installationType]);

  const handleTemplateSelect = (template: InstallationTemplate) => {
    setDescription(template.prefilledPrompt);
    setInstallationType(template.category);
    setShowTemplates(false);
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      return;
    }
    onGenerate(projectDetails, description, generateFullMethodStatement);
  };

  // Character count styling
  const getCharCountClass = () => {
    if (description.length < 50) return 'text-white/40';
    if (description.length < 300) return 'text-emerald-400';
    return 'text-amber-400';
  };

  const isValid = description.trim().length > 0;
  const hasProjectDetails = projectDetails.projectName || projectDetails.location;

  return (
    <div className="space-y-4 pb-24 sm:pb-6">
      {/* Installation Description */}
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
              Installation Description
            </Label>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-lg transition-colors",
              getCharCountClass(),
              description.length >= 50 && "bg-white/5"
            )}>
              {description.length} {description.length >= 50 && '✓'}
            </span>
          </div>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the electrical installation work required..."
            className="agent-input"
            rows={5}
            autoComplete="off"
            spellCheck={true}
          />

          <p className="text-xs sm:text-sm text-white/50">
            Be specific about work scope and location for detailed method statements
          </p>
        </div>
      </div>

      {/* Installation Type */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold">Installation Type</Label>
          <InlineInstallationTypeSelector
            selectedType={installationType}
            onChange={setInstallationType}
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
            <InstallationTemplateGrid
              selectedCategory={installationType}
              onSelectTemplate={handleTemplateSelect}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Project Information */}
      <Collapsible open={showProjectInfo} onOpenChange={setShowProjectInfo}>
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Project Information</span>
              <span className={cn(
                "text-[10px] sm:text-xs px-2 py-0.5 rounded-full",
                hasProjectDetails ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"
              )}>
                {hasProjectDetails ? "✓ Configured" : "Optional"}
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showProjectInfo && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <p className="text-xs text-white/50 pb-2">
              Add for comprehensive method statements
            </p>
            <InstallationProjectDetails
              projectDetails={projectDetails}
              onChange={setProjectDetails}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="installation"
        onClick={handleSubmit}
        isDisabled={!isValid}
        isLoading={isProcessing}
      />
    </div>
  );
};
