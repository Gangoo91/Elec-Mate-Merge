import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, RotateCcw, Download, AlertCircle, Wrench, CheckCircle2 } from "lucide-react";
import { InstallationStepCard } from "./InstallationStepCard";
import { InstallationStep, InstallationMethodSummary, InstallationProjectDetails } from "@/types/installation-method";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProjectMetadataForm } from "./ProjectMetadataForm";
import { InstallationHeroSummary } from "./InstallationHeroSummary";
import { TestingProceduresSection } from "./TestingProceduresSection";
import { EquipmentScheduleSection } from "./EquipmentScheduleSection";
import { SiteLogisticsSection } from "./SiteLogisticsSection";
import { ConditionalProceduresSection } from "./ConditionalProceduresSection";
import { MobileButton } from "@/components/ui/mobile-button";
import { InstallationSummaryStats } from "./InstallationSummaryStats";

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

interface InstallationResultsProps {
  jobTitle?: string;
  installationType?: string;
  installationGuide: string;
  steps: InstallationStep[];
  summary: InstallationMethodSummary;
  projectDetails?: InstallationProjectDetails;
  projectMetadata?: ProjectMetadata;
  fullMethodStatement?: any;
  onStartOver: () => void;
}

export const InstallationResults = ({
  jobTitle,
  installationType,
  installationGuide,
  steps: initialSteps,
  summary,
  projectDetails,
  projectMetadata: initialMetadata,
  fullMethodStatement,
  onStartOver
}: InstallationResultsProps) => {
  const [steps, setSteps] = useState<InstallationStep[]>(initialSteps);
  const [showMetadataForm, setShowMetadataForm] = useState(false);
  const [projectMetadata, setProjectMetadata] = useState<ProjectMetadata | undefined>(initialMetadata);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Extract comprehensive data
  const testingProcedures = fullMethodStatement?.testingProcedures || [];
  const equipmentSchedule = fullMethodStatement?.equipmentSchedule || [];
  const siteLogistics = fullMethodStatement?.siteLogistics || {};
  const conditionalFlags = fullMethodStatement?.conditionalFlags || {};
  const competencyRequirements = fullMethodStatement?.competencyRequirements || {};
  const workAtHeightEquipment = fullMethodStatement?.workAtHeightEquipment || [];

  // Count hazards
  const totalHazards = steps.reduce((count, step) => {
    const linkedHazards = (step as any).linkedHazards || [];
    return count + linkedHazards.length;
  }, 0);

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
      description: "New step created. Click edit to customise it.",
    });
  };

  const handleExportPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      toast({
        title: "Generating PDF",
        description: "Creating your installation method document...",
      });

      const methodStatementPayload = {
        jobTitle: `Installation Method: ${projectDetails?.installationType || 'General Installation'}`,
        description: projectDetails?.projectName || 'Electrical Installation Method Statement',
        projectName: projectDetails?.projectName || 'N/A',
        location: projectDetails?.location || 'Site Location',
        contractor: projectMetadata?.contractor || projectDetails?.electricianName || 'Contractor',
        supervisor: projectMetadata?.siteSupervisor || projectDetails?.electricianName || 'Supervisor',
        workType: projectDetails?.installationType || 'Electrical Installation',
        duration: summary.estimatedDuration || 'Variable',
        teamSize: '1-2 persons',
        siteManagerName: projectMetadata?.siteManagerName || '',
        siteManagerPhone: projectMetadata?.siteManagerPhone || '',
        firstAiderName: projectMetadata?.firstAiderName || '',
        firstAiderPhone: projectMetadata?.firstAiderPhone || '',
        safetyOfficerName: projectMetadata?.safetyOfficerName || '',
        safetyOfficerPhone: projectMetadata?.safetyOfficerPhone || '',
        assemblyPoint: projectMetadata?.assemblyPoint || 'Main Car Park',
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
          linkedHazards: (step as any).linkedHazards || [],
          inspectionCheckpoints: (step as any).inspectionCheckpoints || [],
          equipmentNeeded: (step as any).toolsRequired || step.toolsRequired || [],
          qualifications: summary.requiredQualifications || [],
          estimatedDuration: step.estimatedDuration || 'Not specified',
          riskLevel: (step.riskLevel || 'medium').toUpperCase()
        })),
        toolsRequired: summary.toolsRequired || [],
        materialsRequired: summary.materialsRequired || [],
        overallRiskLevel: (summary.overallRiskLevel || 'medium').toUpperCase(),
        estimatedDuration: summary.estimatedDuration || 'Not specified',
        requiredQualifications: summary.requiredQualifications || ['18th Edition BS 7671:2018+A3:2024'],
        testingProcedures: fullMethodStatement?.testingProcedures || [],
        equipmentSchedule: fullMethodStatement?.equipmentSchedule || [],
        qualityRequirements: fullMethodStatement?.qualityRequirements || [],
        siteLogistics: fullMethodStatement?.siteLogistics || {},
        conditionalFlags: fullMethodStatement?.conditionalFlags || {},
        competencyRequirements: fullMethodStatement?.competencyRequirements || {},
        workAtHeightEquipment: fullMethodStatement?.workAtHeightEquipment || [],
        projectMetadata: projectMetadata ? {
          ...projectMetadata,
          siteManagerName: projectMetadata.siteManagerName || '',
          firstAiderName: projectMetadata.firstAiderName || '',
          safetyOfficerName: projectMetadata.safetyOfficerName || ''
        } : undefined
      };

      const { data, error } = await supabase.functions.invoke('generate-method-statement-pdf', {
        body: { methodStatement: methodStatementPayload }
      });

      if (error) throw new Error(error.message || 'Failed to generate PDF');
      if (!data || !data.publicUrl) throw new Error('PDF generation returned no URL');

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
      toast({
        title: "PDF Export Failed",
        description: error instanceof Error ? error.message : "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Banner */}
      {jobTitle && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-primary/10 to-background border border-blue-500/30 p-6 sm:p-8 shadow-xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 w-full text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-2 leading-tight">
                  {jobTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {installationType && (
                    <Badge className="bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-foreground border-blue-400/40 px-3 py-1 text-sm font-semibold">
                      {installationType.charAt(0).toUpperCase() + installationType.slice(1)} Installation
                    </Badge>
                  )}
                  <Badge className="bg-gradient-to-r from-success/20 to-emerald-500/20 text-success border-success/40 px-3 py-1 text-sm font-semibold animate-pulse">
                    ✓ Method Statement Ready
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <InstallationSummaryStats
        totalSteps={steps.length}
        estimatedDuration={summary.estimatedDuration}
        riskLevel={summary.overallRiskLevel}
        hazardsCount={totalHazards}
        toolsCount={summary.toolsRequired?.length || 0}
      />

      {/* Hero Summary */}
      <InstallationHeroSummary
        steps={steps.length}
        duration={summary.estimatedDuration}
        riskLevel={summary.overallRiskLevel}
        toolsCount={summary.toolsRequired?.length || 0}
        hazardsCount={totalHazards}
        competency={competencyRequirements}
        siteLogistics={siteLogistics}
      />

      {/* Metadata Call-to-Action */}
      {!projectMetadata?.siteManagerName && (
        <Card className="relative overflow-hidden p-5 bg-gradient-to-br from-warning/15 via-orange-500/10 to-background border-2 border-warning/50 shadow-lg">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-warning/5 to-transparent" />
          <div className="relative flex items-start gap-4">
            <div className="p-3 rounded-xl bg-warning/20 shadow-md">
              <AlertCircle className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-foreground mb-2">Complete Project Details for Professional PDF</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Add emergency contacts and site information to generate a comprehensive, regulation-compliant method statement
              </p>
              <MobileButton
                onClick={() => setShowMetadataForm(true)}
                variant="elec"
                size="default"
                className="shadow-lg hover:shadow-xl transition-all"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete Form Now
              </MobileButton>
            </div>
          </div>
        </Card>
      )}

      {/* Project Metadata Form */}
      {showMetadataForm && (
        <ProjectMetadataForm
          metadata={projectMetadata || {
            documentRef: '', issueDate: '', reviewDate: '', companyName: '', contractor: '',
            siteManagerName: '', siteManagerPhone: '', firstAiderName: '', firstAiderPhone: '',
            safetyOfficerName: '', safetyOfficerPhone: '', assemblyPoint: '', startDate: '',
            completionDate: '', siteSupervisor: '', clientContact: '', preparedByName: '',
            preparedByPosition: '', preparedDate: '', authorisedByName: '', authorisedByPosition: '',
            authorisedDate: ''
          }}
          onChange={setProjectMetadata}
        />
      )}

      {/* Conditional Procedures */}
      <ConditionalProceduresSection
        flags={conditionalFlags}
        workAtHeightEquipment={workAtHeightEquipment}
      />

      {/* Installation Steps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Installation Procedure ({steps.length} Steps)</h3>
          <MobileButton onClick={addNewStep} variant="outline" size="sm" icon={<Plus className="h-4 w-4" />}>
            Add Step
          </MobileButton>
        </div>
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

      {/* Testing & Commissioning */}
      <TestingProceduresSection procedures={testingProcedures} />

      {/* Equipment Schedule */}
      <EquipmentScheduleSection equipment={equipmentSchedule} />

      {/* Site Logistics */}
      <SiteLogisticsSection
        logistics={siteLogistics}
        competency={competencyRequirements}
      />

      {/* Action Buttons */}
      <div className="sticky bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-background via-background/98 to-background/90 border-t border-blue-500/20 backdrop-blur-xl shadow-2xl md:static md:p-0 md:bg-transparent md:border-0 md:shadow-none">
        <div className="flex flex-wrap gap-3">
          <MobileButton 
            onClick={handleExportPDF} 
            variant="elec" 
            size="wide"
            disabled={isGeneratingPDF}
            className="shadow-xl hover:shadow-2xl transition-all text-base font-bold"
          >
            <Download className="h-5 w-5 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF'}
          </MobileButton>
          <MobileButton 
            onClick={() => setShowMetadataForm(!showMetadataForm)} 
            variant={showMetadataForm ? "default" : "outline"}
            className="flex-1 md:flex-none min-h-[48px] font-semibold"
          >
            {showMetadataForm ? 'Hide' : 'Edit'} Metadata
          </MobileButton>
          <MobileButton 
            onClick={onStartOver} 
            variant="outline"
            className="min-h-[48px] font-semibold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </MobileButton>
        </div>
      </div>
    </div>
  );
};
