import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { InstallationInputForm } from "./InstallationInputForm";
import { InstallationProcessingView } from "./InstallationProcessingView";
import { InstallationResultsEditor } from "./InstallationResultsEditor";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { generateMethodStatement } from "./methodStatementHandler";

type ViewMode = 'input' | 'processing' | 'results';

const InstallationSpecialistInterface = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('input');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ stage: 0, percent: 0, message: '' });
  const [methodData, setMethodData] = useState<any>(null);
  const [installationGuide, setInstallationGuide] = useState("");
  const [generateFullMethodStatement, setGenerateFullMethodStatement] = useState(true);
  const [methodStatementProgress, setMethodStatementProgress] = useState<string>('');

  const handleGenerate = async (projectDetails: ProjectDetailsType, description: string, useFullMethodStatement: boolean = false) => {
    // Update the internal state based on user selection from the form
    setGenerateFullMethodStatement(useFullMethodStatement);
    setCurrentView('processing');
    setIsProcessing(true);
    setMethodData(null);
    setInstallationGuide("");
    setMethodStatementProgress('');

    try {
      if (useFullMethodStatement) {
        // 3-AGENT METHOD STATEMENT MODE (Installer → Maintenance + H&S parallel)
        const query = `Create a comprehensive method statement for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        const mergedResult = await generateMethodStatement(
          query,
          projectDetails,
          'ms-' + Date.now(),
          (msg) => {
            setMethodStatementProgress(msg);
            // Convert progress messages to stage format
            if (msg.includes('installation')) {
              setProgress({ stage: 1, percent: 30, message: msg });
            } else if (msg.includes('inspection') || msg.includes('risk')) {
              setProgress({ stage: 2, percent: 60, message: msg });
            } else if (msg.includes('✅')) {
              setProgress({ stage: 3, percent: 90, message: msg });
            }
          }
        );

        setProgress({ stage: 4, percent: 100, message: 'Complete!' });

        // Transform merged result for UI display
        const installationSteps = mergedResult.installationSteps.map((step: any) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          content: step.description,
          safety: step.safetyRequirements,
          toolsRequired: step.equipmentNeeded,
          materialsNeeded: [],
          estimatedDuration: step.estimatedDuration,
          riskLevel: step.riskLevel,
          inspectionCheckpoints: step.inspectionCheckpoints,
          linkedHazards: step.linkedHazards
        }));

        const allTools = [...new Set(installationSteps.flatMap((s: any) => s.toolsRequired || []))];
        const riskLevels = installationSteps.map((s: any) => s.riskLevel);
        const overallRisk = riskLevels.includes('high') ? 'high' : 
                           riskLevels.includes('medium') ? 'medium' : 'low';

        const summary = {
          totalSteps: installationSteps.length,
          estimatedDuration: `${installationSteps.length * 20}-${installationSteps.length * 40} minutes`,
          requiredQualifications: [mergedResult.competencyRequirements.minimumQualifications],
          toolsRequired: allTools,
          materialsRequired: [],
          overallRiskLevel: overallRisk as 'low' | 'medium' | 'high'
        };

        setMethodData({
          steps: installationSteps,
          summary,
          projectDetails,
          // Store full merged data for PDF generation
          _fullMethodStatement: mergedResult
        });

        toast({
          title: "Method Statement Generated",
          description: `Complete with ${summary.totalSteps} steps, testing procedures, and risk assessment`,
        });

      } else {
        // QUICK MODE - Just installer-v3
        const stages = [
          { stage: 1, percent: 20, message: 'Analysing installation requirements...' },
          { stage: 2, percent: 50, message: 'Generating step-by-step procedures...' },
          { stage: 3, percent: 80, message: 'Compiling safety requirements...' }
        ];
        
        let stageIndex = 0;
        const progressInterval = setInterval(() => {
          if (stageIndex < stages.length) {
            setProgress(stages[stageIndex]);
            stageIndex++;
          }
        }, 1500);

        const query = `Create a detailed step-by-step installation method for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}`;

        const { data, error } = await supabase.functions.invoke('installer-v3', {
          body: { query, installationType: projectDetails.installationType }
        });

        clearInterval(progressInterval);
        setProgress({ stage: 4, percent: 100, message: 'Complete!' });

        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || 'Failed to generate installation method');

        // FIX: Correct field mapping for installer-v3 response
        const steps = data.structuredData?.installationSteps || 
                      data.installationSteps || 
                      data.methodStatementSteps || [];

        const installationSteps = steps.map((step: any, index: number) => ({
          stepNumber: step.step || step.stepNumber || index + 1,
          title: step.title || step.stepTitle || `Step ${index + 1}`,
          content: step.description || step.content || '',
          safety: step.safetyNotes || step.safetyRequirements || [],
          toolsRequired: step.tools || step.equipmentNeeded || [],
          materialsNeeded: step.materials || [],
          estimatedDuration: step.estimatedTime || step.estimatedDuration || step.duration || 'Not specified',
          riskLevel: (step.riskLevel || 'medium') as 'low' | 'medium' | 'high'
        }));

        const allTools = [...new Set(installationSteps.flatMap((s: any) => s.toolsRequired || []))];
        const riskLevels = installationSteps.map((s: any) => s.riskLevel);
        const overallRisk = riskLevels.includes('high') ? 'high' : 
                           riskLevels.includes('medium') ? 'medium' : 'low';

        const summary = {
          totalSteps: installationSteps.length,
          estimatedDuration: `${installationSteps.length * 15}-${installationSteps.length * 30} minutes`,
          requiredQualifications: ['18th Edition BS 7671:2018+A3:2024'],
          toolsRequired: allTools,
          materialsRequired: [],
          overallRiskLevel: overallRisk as 'low' | 'medium' | 'high'
        };

        setInstallationGuide(data.response || '');
        setMethodData({
          steps: installationSteps,
          summary,
          projectDetails
        });

        toast({
          title: "Installation Guide Generated",
          description: `${summary.totalSteps} steps created successfully`,
        });
      }

      setCurrentView('results');

    } catch (error) {
      console.error('Installation guide generation error:', error);
      
      let errorMessage = "Could not generate installation guide. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = "Request timed out. Please try breaking it into smaller parts.";
        } else if (error.message.includes('rate limit')) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (error.message.includes('API key')) {
          errorMessage = "AI service configuration error. Please contact support.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      setCurrentView('input');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentView('input');
    setMethodData(null);
    setInstallationGuide("");
  };

  return (
    <div className="space-y-3 sm:space-y-4 pb-6">
      {currentView === 'input' && (
        <InstallationInputForm
          onGenerate={handleGenerate}
          isProcessing={isProcessing}
        />
      )}

      {currentView === 'processing' && (
        <InstallationProcessingView progress={progress} />
      )}

      {currentView === 'results' && methodData && (
        <InstallationResultsEditor
          installationGuide={installationGuide}
          steps={methodData.steps}
          summary={methodData.summary}
          projectDetails={methodData.projectDetails}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default InstallationSpecialistInterface;
