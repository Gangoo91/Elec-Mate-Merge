import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, Wrench, Package, ShieldCheck, Plus, RotateCcw, Download } from "lucide-react";
import { InstallationStepCard } from "./InstallationStepCard";
import { InstallationStep, InstallationMethodSummary, InstallationProjectDetails } from "@/types/installation-method";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CategorisedToolsList } from "./CategorisedToolsList";
import { categorizeTools, categorizeMaterials } from "@/utils/toolsCategorisation";
import { ProjectMetadataForm } from "./ProjectMetadataForm";

interface ProjectMetadata {
  documentRef: string;
  issueDate: string;
  reviewDate: string;
  companyName: string;
  contractor: string;
  siteManagerName: string;
  siteManagerPhone: string;
  firstAiderName: string;
  firstAiderPhone: string;
  safetyOfficerName: string;
  safetyOfficerPhone: string;
  assemblyPoint: string;
  startDate: string;
  completionDate: string;
  siteSupervisor: string;
  clientContact: string;
  preparedByName: string;
  preparedByPosition: string;
  preparedDate: string;
  authorisedByName: string;
  authorisedByPosition: string;
  authorisedDate: string;
}

interface InstallationResultsEditorProps {
  jobTitle?: string;
  installationType?: string;
  installationGuide: string;
  steps: InstallationStep[];
  summary: InstallationMethodSummary;
  projectDetails?: InstallationProjectDetails;
  projectMetadata?: ProjectMetadata;
  fullMethodStatement?: any;
  onReset: () => void;
}

export const InstallationResultsEditor = ({
  jobTitle,
  installationType,
  installationGuide,
  steps: initialSteps,
  summary,
  projectDetails,
  projectMetadata: initialMetadata,
  fullMethodStatement,
  onReset
}: InstallationResultsEditorProps) => {
  const [steps, setSteps] = useState<InstallationStep[]>(initialSteps);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [projectMetadata, setProjectMetadata] = useState<ProjectMetadata | undefined>(initialMetadata);

  const riskColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const updateStep = (index: number, updated: InstallationStep) => {
    const newSteps = [...steps];
    newSteps[index] = updated;
    setSteps(newSteps);
    toast({
      title: "Step Updated",
      description: "Your changes have been saved.",
    });
  };

  const deleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    // Re-number remaining steps
    const renumberedSteps = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1
    }));
    setSteps(renumberedSteps);
    toast({
      title: "Step Deleted",
      description: "The step has been removed.",
    });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    // Re-number
    const renumberedSteps = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1
    }));
    setSteps(renumberedSteps);
  };

  const addNewStep = () => {
    const newStep: InstallationStep = {
      stepNumber: steps.length + 1,
      title: "New Step",
      content: "Enter step description here...",
      safety: [],
      riskLevel: 'low'
    };
    setSteps([...steps, newStep]);
    toast({
      title: "Step Added",
      description: "New step created. Click edit to customize it.",
    });
  };

  const handleExportPDF = async () => {
    try {
      toast({
        title: "Generating PDF",
        description: "Creating your installation method document...",
      });

      // Build comprehensive method statement payload
      const methodStatementPayload = {
        jobTitle: `Installation Method: ${projectDetails?.installationType || 'General Installation'}`,
        description: projectDetails?.projectName || 'Electrical Installation Method Statement',
        projectDetails: {
          projectName: projectDetails?.projectName || 'N/A',
          location: projectDetails?.location || 'Site Location',
          clientName: projectDetails?.clientName || 'N/A',
          electricianName: projectDetails?.electricianName || 'N/A',
          installationType: projectDetails?.installationType || 'General'
        },
        steps: steps.map((step) => ({
          id: `step-${step.stepNumber}`,
          stepNumber: step.stepNumber,
          title: step.title,
          description: step.content,
          safetyRequirements: step.safety || [],
          equipmentNeeded: step.toolsRequired || [],
          qualifications: summary.requiredQualifications || [],
          estimatedDuration: step.estimatedDuration || 'Not specified',
          riskLevel: step.riskLevel || 'medium'
        })),
        toolsRequired: summary.toolsRequired || [],
        materialsRequired: summary.materialsRequired || [],
        overallRiskLevel: summary.overallRiskLevel || 'medium',
        estimatedDuration: summary.estimatedDuration || 'Not specified',
        requiredQualifications: summary.requiredQualifications || ['18th Edition BS 7671:2018+A3:2024']
      };

      console.log('📄 Sending PDF generation request:', methodStatementPayload);

      const { data, error } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: { methodStatement: methodStatementPayload }
      });

      if (error) {
        console.error('PDF generation error:', error);
        throw new Error(error.message || 'Failed to generate PDF');
      }

      if (!data || !data.publicUrl) {
        throw new Error('PDF generation returned no URL');
      }

      // Download the PDF
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.download = `installation-method-${projectDetails?.projectName?.replace(/\s+/g, '-') || Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "PDF Generated Successfully",
        description: "Your installation method document has been downloaded.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      
      let errorMessage = "Could not generate PDF. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = "PDF generation timed out. Please try again.";
        } else if (error.message.includes('publicUrl')) {
          errorMessage = "PDF was created but download link failed. Please contact support.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "PDF Export Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Installation Title */}
      {jobTitle && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-1">{jobTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {installationType ? `${installationType.charAt(0).toUpperCase() + installationType.slice(1)} Installation` : 'Installation Method Statement'}
          </p>
        </div>
      )}

      {/* Summary Card */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{steps.length}</div>
              <div className="text-xs text-foreground/70">Steps</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{summary.estimatedDuration}</div>
              <div className="text-xs text-foreground/70">Duration</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">{summary.toolsRequired.length}</div>
              <div className="text-xs text-foreground/70">Tools</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge className={`${riskColors[summary.overallRiskLevel]} font-bold px-3 py-1`}>
                {summary.overallRiskLevel.toUpperCase()}
              </Badge>
              <div className="text-xs text-foreground/70 mt-1">Risk Level</div>
            </div>
          </div>
        </div>

        {/* Tools & Materials - Categorised */}
        {(summary.toolsRequired.length > 0 || summary.materialsRequired.length > 0) && (
          <>
            <Separator className="my-4 sm:my-6" />
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {summary.toolsRequired.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">Tools Required</span>
                  </div>
                  <CategorisedToolsList 
                    categorisedItems={categorizeTools(summary.toolsRequired)} 
                    icon={<Wrench className="h-4 w-4 text-primary" />}
                  />
                </div>
              )}
              {summary.materialsRequired.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">Materials Required</span>
                  </div>
                  <CategorisedToolsList 
                    categorisedItems={categorizeMaterials(summary.materialsRequired)} 
                    icon={<Package className="h-4 w-4 text-primary" />}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Project Metadata Form (conditional) */}
      {showMetadataForm && projectMetadata && (
        <ProjectMetadataForm
          metadata={projectMetadata}
          onChange={setProjectMetadata}
        />
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={addNewStep} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step
        </Button>
        <Button 
          onClick={() => setShowMetadataForm(!showMetadataForm)} 
          variant={showMetadataForm ? "default" : "outline"} 
          className="gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          {showMetadataForm ? 'Hide' : 'Edit'} Project Metadata
        </Button>
        <Button onClick={handleExportPDF} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      {/* Editable Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <InstallationStepCard
            key={step.stepNumber}
            step={step}
            onUpdate={(updated) => updateStep(index, updated)}
            onDelete={() => deleteStep(index)}
            onMoveUp={index > 0 ? () => moveStep(index, 'up') : undefined}
            onMoveDown={index < steps.length - 1 ? () => moveStep(index, 'down') : undefined}
          />
        ))}
      </div>
    </div>
  );
};
