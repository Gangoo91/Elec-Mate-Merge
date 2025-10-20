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

interface InstallationResultsEditorProps {
  installationGuide: string;
  steps: InstallationStep[];
  summary: InstallationMethodSummary;
  projectDetails?: InstallationProjectDetails;
  onReset: () => void;
}

export const InstallationResultsEditor = ({
  installationGuide,
  steps: initialSteps,
  summary,
  projectDetails,
  onReset
}: InstallationResultsEditorProps) => {
  const [steps, setSteps] = useState<InstallationStep[]>(initialSteps);

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

      const { data, error } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: {
          methodStatement: {
            jobTitle: `Installation Method: ${projectDetails?.installationType || 'General'}`,
            description: projectDetails?.projectName || 'Installation Method',
            steps: steps.map((step) => ({
              id: `step-${step.stepNumber}`,
              stepNumber: step.stepNumber,
              title: step.title,
              description: step.content,
              safetyRequirements: step.safety || [],
              equipmentNeeded: [],
              qualifications: [],
              estimatedDuration: '',
              riskLevel: step.riskLevel || 'medium'
            })),
            toolsRequired: summary.toolsRequired,
            materialsRequired: summary.materialsRequired,
            overallRiskLevel: summary.overallRiskLevel
          }
        }
      });

      if (error) throw error;

      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.download = `installation-method-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "PDF Generated",
        description: "Your installation method has been exported.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-background">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{steps.length}</div>
              <div className="text-xs text-muted-foreground">Steps</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-lg font-semibold">{summary.estimatedDuration}</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <div>
              <div className="text-lg font-semibold">{summary.toolsRequired.length}</div>
              <div className="text-xs text-muted-foreground">Tools</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div>
              <Badge className={riskColors[summary.overallRiskLevel]}>
                {summary.overallRiskLevel.toUpperCase()}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">Risk Level</div>
            </div>
          </div>
        </div>

        {/* Tools & Materials */}
        {(summary.toolsRequired.length > 0 || summary.materialsRequired.length > 0) && (
          <>
            <Separator className="my-4" />
            <div className="grid sm:grid-cols-2 gap-4">
              {summary.toolsRequired.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Tools Required</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {summary.toolsRequired.map((tool, i) => (
                      <li key={i}>• {tool}</li>
                    ))}
                  </ul>
                </div>
              )}
              {summary.materialsRequired.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Materials Required</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {summary.materialsRequired.map((material, i) => (
                      <li key={i}>• {material}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={addNewStep} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Step
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
