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

    // Progress stages
    const stages = [
      { stage: 1, percent: 10, message: 'Analysing installation requirements...' },
      { stage: 2, percent: 30, message: 'Consulting BS 7671 knowledge base...' },
      { stage: 3, percent: 60, message: 'Generating step-by-step method...' },
      { stage: 4, percent: 80, message: 'Extracting tools and materials...' },
      { stage: 5, percent: 95, message: 'Finalising safety notes...' }
    ];
    
    let stageIndex = 0;
    const progressInterval = setInterval(() => {
      if (stageIndex < stages.length) {
        setProgress(stages[stageIndex]);
        stageIndex++;
      }
    }, 2000);

    try {
      const { data, error } = await supabase.functions.invoke('installation-method-generator', {
        body: {
          installationDescription: description,
          installationType: projectDetails.installationType,
          context: {
            projectName: projectDetails.projectName,
            location: projectDetails.location,
            clientName: projectDetails.clientName,
            electricianName: projectDetails.electricianName
          }
        }
      });

      clearInterval(progressInterval);
      setProgress({ stage: 6, percent: 100, message: 'Complete!' });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate installation method');
      }

      setInstallationGuide(data.installationGuide);
      setMethodData({
        steps: data.steps,
        summary: data.summary,
        projectDetails
      });

      toast({
        title: "Installation Guide Generated",
        description: `${data.summary.totalSteps} steps created successfully`,
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
