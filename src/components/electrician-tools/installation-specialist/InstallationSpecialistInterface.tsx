import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { InstallationInput } from "./InstallationInput";
import { InstallationProcessingView } from "./InstallationProcessingView";
import { InstallationResults } from "./InstallationResults";
import InstallationSuccess from "./InstallationSuccess";
import { InstallationProjectDetails as ProjectDetailsType } from "@/types/installation-method";
import { useInstallationMethodJobPolling } from "@/hooks/useInstallationMethodJobPolling";
import { supabase } from "@/integrations/supabase/client";
import { getStoredCircuitContext, clearStoredCircuitContext, type StoredCircuitContext } from "@/utils/circuit-context-generator";
import { ImportedContextBanner } from "@/components/electrician-tools/shared/ImportedContextBanner";
import { AnimatePresence } from "framer-motion";

interface InstallationSpecialistInterfaceProps {
  designerContext?: any;
}

const InstallationSpecialistInterface = ({ designerContext }: InstallationSpecialistInterfaceProps) => {
  const routerLocation = useLocation();

  // Check if we're viewing saved results
  const savedResultsState = routerLocation.state as {
    fromSavedResults?: boolean;
    jobId?: string;
    outputData?: any;
    inputData?: any;
  } | null;
  const [showResults, setShowResults] = useState(!!savedResultsState?.fromSavedResults);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(!!savedResultsState?.fromSavedResults);
  const [methodData, setMethodData] = useState<any>(() => {
    // Initialize with saved results if present
    if (savedResultsState?.fromSavedResults && savedResultsState.outputData) {
      const data = savedResultsState.outputData;
      return {
        ...data,
        steps: data.steps?.map((step: any) => ({
          stepNumber: step.stepNumber || step.step,
          title: step.title,
          content: step.content || step.description,
          safety: step.safety || step.safetyNotes || [],
          toolsRequired: step.toolsRequired || step.tools || step.equipmentNeeded || [],
          materialsNeeded: step.materialsNeeded || step.materials || [],
          estimatedDuration: step.estimatedDuration || (step.estimatedTime ? `${step.estimatedTime} mins` : undefined),
          riskLevel: step.riskLevel || 'medium',
          qualifications: step.qualifications,
          linkedHazards: step.linkedHazards,
          notes: step.notes,
          assignedPersonnel: step.assignedPersonnel,
          bsReferences: step.bsReferences,
          inspectionCheckpoints: step.inspectionCheckpoints
        })) || [],
        _fullMethodStatement: data
      };
    }
    return null;
  });
  const [generationStartTime, setGenerationStartTime] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [originalQuery, setOriginalQuery] = useState<string>(
    savedResultsState?.fromSavedResults ? savedResultsState.inputData?.query || '' : ''
  );
  const [projectInfo, setProjectInfo] = useState<ProjectDetailsType>({
    projectName: '',
    location: '',
    installationType: 'domestic'
  });
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [importedContext, setImportedContext] = useState<StoredCircuitContext | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string>("");
  const [initialProjectName, setInitialProjectName] = useState<string>("");

  // Check for imported circuit context on mount
  useEffect(() => {
    const storedContext = getStoredCircuitContext();
    if (storedContext && storedContext.agentType === 'installer') {
      setImportedContext(storedContext);
      clearStoredCircuitContext();
    }
  }, []);

  const handleUseImportedContext = () => {
    if (importedContext) {
      setInitialPrompt(importedContext.formattedPrompt);
      setInitialProjectName(importedContext.sourceDesign);
      setImportedContext(null);
    }
  };

  const handleDismissImportedContext = () => {
    setImportedContext(null);
  };
  
  const {
    job, 
    isPolling, 
    startPolling, 
    stopPolling,
    progress: jobProgress, 
    status: jobStatus,
    currentStep: jobCurrentStep,
    methodData: jobMethodData,
    qualityMetrics: jobQualityMetrics,
    error: jobError
  } = useInstallationMethodJobPolling(currentJobId);
  
  const lastProjectRef = useRef<{details: ProjectDetailsType, description: string} | null>(null);

  const handleGenerate = async (projectDetails: ProjectDetailsType, description: string, useFullMode: boolean) => {
    setGenerationStartTime(Date.now());
    setShowResults(true);
    setCelebrationShown(false);
    setIsGenerating(true);
    setOriginalQuery(description);
    setProjectInfo(projectDetails);
    lastProjectRef.current = { details: projectDetails, description };

    try {
      // Create job using the job queue
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Authentication required", {
          description: "Please log in to generate installation methods"
        });
        setIsGenerating(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-installation-method-job', {
        body: {
          query: description,
          projectDetails,
          designerContext: designerContext || null
        }
      });

      if (error || !data?.jobId) {
        throw new Error(error?.message || 'Failed to create job');
      }

      console.log('✅ Created installation method job:', data.jobId);
      setCurrentJobId(data.jobId);
      startPolling();

    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error("Generation Failed", {
        description: error.message || "An unexpected error occurred"
      });
      setIsGenerating(false);
      setShowResults(false);
    }
  };

  // Handle job completion
  useEffect(() => {
    console.log('🔍 Job Status Check:', { 
      jobStatus, 
      hasMethodData: !!jobMethodData, 
      celebrationShown 
    });
    
    if (jobStatus === 'complete' && jobMethodData && !celebrationShown) {
      console.log('✅ Setting method data and showing celebration');
      
      // Map backend field names - pass through exact field names from backend
      const mappedData = {
        ...jobMethodData,
        steps: jobMethodData.steps?.map((step: any) => ({
          stepNumber: step.stepNumber || step.step,
          title: step.title,
          content: step.content || step.description,
          safety: step.safety || step.safetyNotes || [],
          toolsRequired: step.toolsRequired || step.tools || step.equipmentNeeded || [],
          materialsNeeded: step.materialsNeeded || step.materials || [],
          estimatedDuration: step.estimatedDuration || (step.estimatedTime ? `${step.estimatedTime} mins` : undefined),
          riskLevel: step.riskLevel || 'medium',
          qualifications: step.qualifications,
          linkedHazards: step.linkedHazards,
          notes: step.notes,
          assignedPersonnel: step.assignedPersonnel,
          bsReferences: step.bsReferences,
          inspectionCheckpoints: step.inspectionCheckpoints
        })) || [],
        _fullMethodStatement: jobMethodData
      };

      console.log('✅ Mapped method data:', mappedData);
      setMethodData(mappedData);
      setIsGenerating(false);
      
      if (!celebrationShown) {
        setShowCelebration(true);
        setCelebrationShown(true);
      }
    } else if (jobStatus === 'failed' || jobStatus === 'cancelled') {
      toast.error(jobStatus === 'cancelled' ? "Generation Cancelled" : "Generation Failed", {
        description: jobError || (jobStatus === 'cancelled' ? "You cancelled the generation" : "An unexpected error occurred")
      });
      setIsGenerating(false);
      setShowResults(false);
      stopPolling();
    }
  }, [jobStatus, jobMethodData, jobError, celebrationShown, stopPolling]);

  // Restart polling if job is processing but polling stopped
  useEffect(() => {
    if (currentJobId && jobStatus === 'processing' && !isPolling) {
      console.warn('⚠️ Job processing but polling stopped - restarting');
      startPolling();
    }
  }, [currentJobId, jobStatus, isPolling, startPolling]);

  // Force re-render when job completes
  useEffect(() => {
    if (jobStatus === 'complete' && jobMethodData) {
      console.log('✅ Job complete - forcing state update');
      setShowResults(true);
    }
  }, [jobStatus, jobMethodData]);

  const handleCancelGeneration = async () => {
    if (!currentJobId) return;
    
    setIsCancelling(true);
    try {
      const { data, error } = await supabase.functions.invoke('cancel-installation-method-job', {
        body: { jobId: currentJobId }
      });

      if (error) throw error;

      stopPolling();
      setIsGenerating(false);
      setShowResults(false);
      setCurrentJobId(null);
      toast.info("Generation cancelled");
    } catch (error: any) {
      console.error('Cancel error:', error);
      toast.error("Failed to cancel generation", {
        description: error.message
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleRegenerate = () => {
    if (lastProjectRef.current) {
      handleGenerate(lastProjectRef.current.details, lastProjectRef.current.description, true);
    }
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    setShowResults(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Success Modal */}
      <InstallationSuccess
        results={methodData}
        onViewResults={handleCloseCelebration}
        generationTime={Math.round((Date.now() - generationStartTime) / 1000)}
        open={showCelebration}
        onOpenChange={(open) => !open && handleCloseCelebration()}
      />

      {!showResults ? (
        <>
          {/* Imported Circuit Context Banner */}
          <AnimatePresence>
            {importedContext && (
              <ImportedContextBanner
                source={importedContext.sourceDesign}
                circuitCount={importedContext.context.circuitSummaries.length}
                onUseContext={handleUseImportedContext}
                onDismiss={handleDismissImportedContext}
              />
            )}
          </AnimatePresence>
          <InstallationInput
            onGenerate={handleGenerate}
            isProcessing={isGenerating}
            initialPrompt={initialPrompt}
            initialProjectName={initialProjectName}
          />
        </>
      ) : isGenerating ? (
        <InstallationProcessingView 
          originalQuery={originalQuery}
          projectDetails={projectInfo}
          progress={{
            stage: jobQualityMetrics?.stage || 'initializing',
            message: jobCurrentStep || 'Starting...'
          }}
          startTime={generationStartTime}
          qualityMetrics={jobQualityMetrics}
          onCancel={handleCancelGeneration}
          isCancelling={isCancelling}
        />
      ) : methodData ? (
        <InstallationResults
          originalQuery={originalQuery}
          jobTitle={methodData.jobTitle}
          installationType={methodData.installationType}
          installationGuide={methodData.installationGuide || ''}
          steps={methodData.steps || []}
          summary={methodData.summary || {}}
          projectDetails={projectInfo}
          fullMethodStatement={methodData._fullMethodStatement}
          onStartOver={handleRegenerate}
        />
      ) : (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Ready to Generate</AlertTitle>
          <AlertDescription>
            Configure your installation requirements and click generate to begin.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InstallationSpecialistInterface;
