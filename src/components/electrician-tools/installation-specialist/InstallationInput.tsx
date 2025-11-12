import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Wrench, Sparkles, FileText, Zap } from "lucide-react";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { InstallationTemplateSelector } from "./InstallationTemplateSelector";
import { InstallationProjectDetails } from "./InstallationProjectDetails";
import { InstallationTemplate } from "@/lib/installation-templates";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  useEffect(() => {
    setProjectDetails(prev => ({ ...prev, installationType }));
  }, [installationType]);

  const handleTemplateSelect = (template: InstallationTemplate) => {
    setDescription(template.prefilledPrompt);
    setInstallationType(template.category);
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      return;
    }
    onGenerate(projectDetails, description, generateFullMethodStatement);
  };

  const isValid = description.trim().length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Prompt Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/5 via-background to-background border-blue-500/30 shadow-lg">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Describe Your Installation Work
              </h2>
              <p className="text-sm text-muted-foreground">
                Generate BS 7671-compliant method statements with step-by-step procedures, safety controls, and testing requirements
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="installation-description" className="text-base font-semibold">
              What needs to be installed?
            </Label>
            <Textarea
              id="installation-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Install a new consumer unit with 10-way dual RCD protection, replace main earthing and bonding, upgrade to BS 7671:2018+A3:2024 standards..."
              className="min-h-[120px] text-base resize-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-muted-foreground">
              Be specific about the work scope, location, and any special requirements
            </p>
          </div>
        </div>
      </Card>

      {/* Template Selector */}
      <InstallationTemplateSelector
        selectedCategory={installationType}
        onCategoryChange={setInstallationType}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Project Details (Collapsible) */}
      <Collapsible open={showProjectDetails} onOpenChange={setShowProjectDetails}>
        <Card className="overflow-hidden border-blue-500/20">
          <CollapsibleTrigger className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-blue-500/5 transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Project Details (Optional)</h3>
            </div>
            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showProjectDetails ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              <InstallationProjectDetails
                projectDetails={projectDetails}
                onChange={setProjectDetails}
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>


      {/* Generate Button */}
      <div className="sticky bottom-4 z-10">
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isProcessing}
          size="lg"
          className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all touch-manipulation disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Generating Method Statement...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" />
              Generate Installation Method
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
