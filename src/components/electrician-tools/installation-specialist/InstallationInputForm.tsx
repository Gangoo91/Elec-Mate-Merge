import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Wrench } from 'lucide-react';
import { InstallationTemplateSelector } from './InstallationTemplateSelector';
import { InstallationProjectDetails } from './InstallationProjectDetails';
import { InstallationTemplate } from '@/lib/installation-templates';
import { InstallationProjectDetails as ProjectDetailsType } from '@/types/installation-method';
import { toast } from '@/hooks/use-toast';

interface InstallationInputFormProps {
  onGenerate: (projectDetails: ProjectDetailsType, description: string, generateFullMethodStatement: boolean) => void;
  isProcessing: boolean;
}

export const InstallationInputForm = ({
  onGenerate,
  isProcessing
}: InstallationInputFormProps) => {
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [description, setDescription] = useState('');
  const [generateFullMethodStatement, setGenerateFullMethodStatement] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsType>({
    projectName: '',
    location: '',
    installationType: 'domestic'
  });

  // Update project details when installation type changes
  useEffect(() => {
    setProjectDetails(prev => ({
      ...prev,
      installationType
    }));
  }, [installationType]);

  const handleTemplateSelect = (template: InstallationTemplate) => {
    setDescription(template.prefilledPrompt);
    setInstallationType(template.category);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectDetails.projectName.trim()) {
      toast({
        title: "Project Name Required",
        description: "Please enter a project name to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe the installation work or select a template.",
        variant: "destructive",
      });
      return;
    }

    onGenerate(projectDetails, description, generateFullMethodStatement);
  };

  const canGenerate = projectDetails.projectName.trim() && description.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6">
      {/* Hero Prompt Section */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/5 via-background to-background border-blue-500/20">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
              <Sparkles className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                What installation work do you need guidance for?
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Describe your installation requirements - AI will provide step-by-step methods
              </p>
            </div>
          </div>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Step-by-step installation method for 9.5kW shower circuit, 10mm² cable clipped direct through first floor, 18m run from consumer unit..."
            className="min-h-[120px] sm:min-h-[140px] text-base resize-none"
          />
        </div>
      </Card>

      {/* Template Selector */}
      <InstallationTemplateSelector
        selectedCategory={installationType}
        onCategoryChange={setInstallationType}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Project Details */}
      <InstallationProjectDetails
        projectDetails={projectDetails}
        onChange={setProjectDetails}
      />

      {/* Method Statement Mode Toggle */}
      <Card className="p-4 border-blue-500/20">
        <div className="flex items-start gap-3">
          <Switch 
            id="method-statement-mode"
            checked={generateFullMethodStatement}
            onCheckedChange={setGenerateFullMethodStatement}
          />
          <div className="flex-1">
            <Label htmlFor="method-statement-mode" className="text-base font-medium cursor-pointer">
              Generate Full Method Statement
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {generateFullMethodStatement ? (
                <>
                  <span className="text-blue-400 font-medium">Comprehensive mode:</span> Includes installation steps, testing procedures, risk assessment, and site logistics (~15 seconds)
                </>
              ) : (
                <>
                  <span className="text-green-400 font-medium">Quick mode:</span> Installation guide only (~5 seconds)
                </>
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Generate Button */}
      <Button
        type="submit"
        disabled={!canGenerate || isProcessing}
        className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-elec-dark font-semibold text-base"
      >
        {isProcessing ? (
          <>
            <Wrench className="h-5 w-5 mr-2 animate-spin" />
            Generating Method...
          </>
        ) : (
          <>
            <Wrench className="h-5 w-5 mr-2" />
            Generate Installation Method
          </>
        )}
      </Button>

      {!canGenerate && (
        <p className="text-sm text-center text-muted-foreground">
          {!projectDetails.projectName.trim() 
            ? 'Enter project name and description to continue'
            : 'Enter installation description to continue'}
        </p>
      )}
    </form>
  );
};
