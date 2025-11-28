import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Wrench, FileText, Zap, Loader2 } from "lucide-react";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { InstallationProjectDetails } from "./InstallationProjectDetails";
import { InstallationTemplate } from "@/lib/installation-templates";
import { InstallationTemplateGrid } from "./InstallationTemplateGrid";
import { FormSection } from "./FormSection";
import { InlineInstallationTypeSelector } from "./InlineInstallationTypeSelector";
import { InlineDetailLevelSelector } from "./InlineDetailLevelSelector";
import { CollapsibleFormSection } from "./CollapsibleFormSection";
import { cn } from "@/lib/utils";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

interface InstallationInputProps {
  onGenerate: (projectDetails: ProjectDetailsType, description: string, useFullMode: boolean, detailLevel: 'normal' | 'detailed') => void;
  isProcessing: boolean;
}

export const InstallationInput = ({ onGenerate, isProcessing }: InstallationInputProps) => {
  const [description, setDescription] = useState("");
  const [generateFullMethodStatement, setGenerateFullMethodStatement] = useState(true);
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [detailLevel, setDetailLevel] = useState<'normal' | 'detailed'>('normal');
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsType>({
    projectName: '',
    location: '',
    installationType: 'domestic'
  });
  const { isMobile } = useMobileEnhanced();

  useEffect(() => {
    setProjectDetails(prev => ({ ...prev, installationType }));
  }, [installationType]);

  const handleTemplateSelect = (template: InstallationTemplate) => {
    setDescription(template.prefilledPrompt);
    setInstallationType(template.category);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      return;
    }
    onGenerate(projectDetails, description, generateFullMethodStatement, detailLevel);
  };

  const isValid = description.trim().length > 0;

  return (
    <form className="space-y-0" onSubmit={handleSubmit}>
      {/* Installation Description - Hero Section */}
      <FormSection>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="installation-description" className={cn(isMobile && "text-base")}>
              What needs to be installed?
            </Label>
            <Textarea
              id="installation-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Install a new consumer unit with 10-way dual RCD protection, replace main earthing and bonding, upgrade to BS 7671:2018+A3:2024 standards..."
              className={cn(
                "resize-none focus:ring-2 focus:ring-elec-yellow transition-all",
                isMobile 
                  ? "min-h-[160px] text-lg leading-relaxed" 
                  : "min-h-[120px] text-base"
              )}
              rows={isMobile ? 6 : 4}
              autoComplete="off"
              spellCheck={true}
            />
            {/* Character Count with Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <p className="text-muted-foreground">
                  Be specific about the work scope and location
                </p>
                <p className={cn(
                  "font-medium transition-colors",
                  description.length > 100 
                    ? "text-elec-yellow" 
                    : "text-muted-foreground"
                )}>
                  {description.length} characters
                </p>
              </div>
              {/* Progress bar for character count */}
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-300",
                    description.length > 100 
                      ? "bg-elec-yellow" 
                      : "bg-muted-foreground/30"
                  )}
                  style={{ width: `${Math.min((description.length / 150) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </FormSection>

      {/* Installation Type - Inline Selector */}
      <FormSection>
        <InlineInstallationTypeSelector 
          selectedType={installationType}
          onChange={setInstallationType}
          disabled={isProcessing}
        />
      </FormSection>

      {/* Detail Level - Inline Selector */}
      <FormSection>
        <InlineDetailLevelSelector 
          selectedLevel={detailLevel}
          onChange={setDetailLevel}
        />
      </FormSection>

      {/* Quick Templates - Collapsed */}
      <CollapsibleFormSection 
        title="Quick Start Templates" 
        subtitle="Pre-configured installation guidance"
        badge="optional"
        icon={<Zap className="h-5 w-5 text-blue-400" />}
        defaultOpen={false}
      >
        <InstallationTemplateGrid 
          selectedCategory={installationType}
          onSelectTemplate={handleTemplateSelect}
        />
      </CollapsibleFormSection>

      {/* Project Information - Collapsed */}
      <CollapsibleFormSection 
        title="Project Information" 
        subtitle="Add project details for comprehensive method statements"
        badge="optional"
        icon={<FileText className="h-5 w-5 text-blue-400" />}
        defaultOpen={false}
      >
        <InstallationProjectDetails 
          projectDetails={projectDetails}
          onChange={setProjectDetails}
        />
      </CollapsibleFormSection>

      {/* Generate Button - Mobile optimised */}
      <FormSection>
        <Button 
          type="submit"
          size="lg"
          disabled={!isValid || isProcessing}
          className={cn(
            "w-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95",
            "bg-gradient-to-r from-elec-yellow via-elec-yellow to-elec-yellow/90",
            "hover:from-elec-yellow/90 hover:to-elec-yellow text-black",
            isMobile ? "h-14 text-base" : "h-12 text-sm"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className={cn(isMobile ? "h-6 w-6 mr-2" : "h-5 w-5 mr-2", "animate-spin")} />
              Generating Method Statement...
            </>
          ) : (
            <>
              <Zap className={cn(isMobile ? "h-6 w-6 mr-2" : "h-5 w-5 mr-2")} />
              Generate Installation Method
            </>
          )}
        </Button>
      </FormSection>
    </form>
  );
};
