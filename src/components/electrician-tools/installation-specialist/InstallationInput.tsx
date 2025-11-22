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
import { CollapsibleFormSection } from "./CollapsibleFormSection";
import { cn } from "@/lib/utils";

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
    onGenerate(projectDetails, description, generateFullMethodStatement);
  };

  const isValid = description.trim().length > 0;

  return (
    <form className="space-y-0" onSubmit={handleSubmit}>
      {/* Installation Description - Hero Section */}
      <FormSection>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="installation-description">What needs to be installed?</Label>
            <Textarea
              id="installation-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Install a new consumer unit with 10-way dual RCD protection, replace main earthing and bonding, upgrade to BS 7671:2018+A3:2024 standards..."
              className="min-h-[100px] sm:min-h-[120px] text-base resize-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              autoComplete="off"
              spellCheck={true}
            />
            <div className="flex justify-between items-center text-xs">
              <p className="text-muted-foreground">
                Be specific about the work scope and location
              </p>
              <p className={cn(
                "font-medium",
                description.length > 100 
                  ? "text-blue-400" 
                  : "text-muted-foreground"
              )}>
                {description.length} chars
              </p>
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

      {/* Generate Button - Inline */}
      <FormSection>
        <Button 
          type="submit"
          size="lg"
          disabled={!isValid || isProcessing}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Method Statement...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Generate Installation Method
            </>
          )}
        </Button>
      </FormSection>
    </form>
  );
};
