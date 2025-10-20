import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { InstallationInputForm } from "./InstallationInputForm";
import { InstallationProcessingView } from "./InstallationProcessingView";
import { InstallationResultsEditor } from "./InstallationResultsEditor";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";

type ViewMode = 'input' | 'processing' | 'results';

const InstallationSpecialistInterface = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('input');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ stage: 0, percent: 0, message: '' });
  const [methodData, setMethodData] = useState<any>(null);
  const [installationGuide, setInstallationGuide] = useState("");

  const handleGenerate = async (projectDetails: ProjectDetailsType, description: string) => {
    setCurrentView('processing');
    setIsProcessing(true);
    setMethodData(null);
    setInstallationGuide("");

    // Progress stages - matching AI RAMS pattern
    const stages = [
      { stage: 1, percent: 15, message: 'Analysing installation requirements...' },
      { stage: 2, percent: 35, message: 'Searching BS 7671 regulations...' },
      { stage: 3, percent: 55, message: 'Consulting installation knowledge base...' },
      { stage: 4, percent: 75, message: 'Generating step-by-step procedures...' },
      { stage: 5, percent: 90, message: 'Compiling safety requirements...' }
    ];
    
    let stageIndex = 0;
    const progressInterval = setInterval(() => {
      if (stageIndex < stages.length) {
        setProgress(stages[stageIndex]);
        stageIndex++;
      }
    }, 1800);

    try {
      // Call installer-v3 directly (matching AI RAMS pattern)
      const query = `Create a detailed step-by-step installation method for: ${description}

Project Context:
- Installation Type: ${projectDetails.installationType}
- Project Name: ${projectDetails.projectName}
- Location: ${projectDetails.location}
${projectDetails.clientName ? `- Client: ${projectDetails.clientName}` : ''}
${projectDetails.electricianName ? `- Electrician: ${projectDetails.electricianName}` : ''}

Requirements:
- Detailed procedures for each step
- Safety requirements and PPE
- Required tools and equipment
- Materials and components needed
- Time estimates for each step
- Risk levels and precautions
- BS 7671:2018+A3:2024 compliance notes`;

      const { data, error } = await supabase.functions.invoke('installer-v3', {
        body: { 
          query,
          installationType: projectDetails.installationType 
        }
      });

      clearInterval(progressInterval);
      setProgress({ stage: 6, percent: 100, message: 'Complete!' });

      if (error) throw error;

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to generate installation method');
      }

      // Transform installer-v3 response to Installation Method format
      const methodSteps = data.structuredData?.methodStatementSteps || 
                          data.methodStatementSteps || 
                          [];

      const installationSteps = methodSteps.map((step: any, index: number) => ({
        stepNumber: index + 1,
        title: step.title || step.stepTitle || `Step ${index + 1}`,
        content: step.description || step.content || '',
        safety: step.safetyRequirements || [],
        toolsRequired: step.equipmentNeeded || step.tools || [],
        materialsNeeded: step.materials || [],
        estimatedDuration: step.estimatedDuration || step.duration || 'Not specified',
        riskLevel: (step.riskLevel || 'medium') as 'low' | 'medium' | 'high'
      }));

      // Extract all unique tools and materials
      const allTools = [...new Set(installationSteps.flatMap(s => s.toolsRequired || []))];
      const allMaterials = [...new Set(installationSteps.flatMap(s => s.materialsNeeded || []))];
      
      // Calculate total duration
      const totalDuration = installationSteps.length > 0 
        ? `${installationSteps.length * 15}-${installationSteps.length * 30} minutes (estimated)`
        : 'Variable';

      // Determine overall risk level
      const riskLevels = installationSteps.map(s => s.riskLevel);
      const overallRisk = riskLevels.includes('high') ? 'high' : 
                         riskLevels.includes('medium') ? 'medium' : 'low';

      const summary = {
        totalSteps: installationSteps.length,
        estimatedDuration: totalDuration,
        requiredQualifications: ['18th Edition BS 7671:2018+A3:2024'],
        toolsRequired: allTools,
        materialsRequired: allMaterials,
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

      setCurrentView('results');

    } catch (error) {
      console.error('Installation guide generation error:', error);
      
      let errorMessage = "Could not generate installation guide. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = "Request timed out. The installation is complex - please try breaking it into smaller parts.";
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
      clearInterval(progressInterval);
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
