import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useHealthSafetyGeneration } from "@/hooks/useHealthSafetyGeneration";
import { useRAMSNotifications } from "@/hooks/useRAMSNotifications";
import { HealthSafetyInput } from "./HealthSafetyInput";
import { HealthSafetyProcessingView } from "./HealthSafetyProcessingView";
import { HealthSafetySuccess } from "./HealthSafetySuccess";
import { HealthSafetyResults } from "./HealthSafetyResults";
import { triggerHaptic } from "@/utils/animation-helpers";
import { getStoredCircuitContext, clearStoredCircuitContext, type StoredCircuitContext } from "@/utils/circuit-context-generator";
import { ImportedContextBanner } from "@/components/electrician-tools/shared/ImportedContextBanner";
import { AnimatePresence } from "framer-motion";

const HealthSafetyInterface = () => {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);
  const [importedContext, setImportedContext] = useState<StoredCircuitContext | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string>("");
  const [initialProjectName, setInitialProjectName] = useState<string>("");
  // Track last inputs for retry functionality
  const [lastJobInputs, setLastJobInputs] = useState<{
    query: string;
    workType: 'domestic' | 'commercial' | 'industrial';
    projectInfo: any;
  } | null>(null);

  const { job, startPolling, stopPolling, progress, status, currentStep, outputData, error } =
    useHealthSafetyGeneration(currentJobId);

  const { requestPermission, showCompletionNotification, showErrorNotification } = useRAMSNotifications();

  // Check for imported circuit context on mount
  useEffect(() => {
    const storedContext = getStoredCircuitContext();
    if (storedContext && storedContext.agentType === 'rams') {
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

  // Request notification permission on mount
  useEffect(() => {
    requestPermission();
  }, []);

  // Resume active job on mount
  useEffect(() => {
    const activeJobId = sessionStorage.getItem('health-safety-job-id');
    const generationActive = sessionStorage.getItem('health-safety-generation-active');
    
    if (activeJobId && generationActive === 'true') {
      setCurrentJobId(activeJobId);
      setShowResults(true);
      startPolling();
      toast.info('Resuming generation...', {
        description: 'Picking up where you left off'
      });
    }
  }, []);

  // Show celebration when complete
  useEffect(() => {
    if (status === 'complete' && outputData && !celebrationShown) {
      const generationTime = generationStartTime ? (Date.now() - generationStartTime) / 1000 : 120;
      setShowCelebration(true);
      setCelebrationShown(true);
      
      const hazardCount = outputData.hazards?.length || 0;
      const projectName = outputData.projectName || 'Safety Documentation';
      
      showCompletionNotification({
        jobId: currentJobId!,
        projectName,
        onNotificationClick: () => {
          window.focus();
          setShowCelebration(false);
        }
      });

      sessionStorage.removeItem('health-safety-generation-active');
      sessionStorage.removeItem('health-safety-job-id');
    }
  }, [status, outputData, celebrationShown, currentJobId, generationStartTime]);

  // Handle errors
  useEffect(() => {
    if (status === 'failed' && error) {
      showErrorNotification({
        jobId: currentJobId!,
        errorMessage: error
      });
      sessionStorage.removeItem('health-safety-generation-active');
      sessionStorage.removeItem('health-safety-job-id');
    }
  }, [status, error, currentJobId]);

  const handleGenerate = async (query: string, projectInfo: any, workType: 'domestic' | 'commercial' | 'industrial') => {
    try {
      sessionStorage.setItem('health-safety-generation-active', 'true');
      setShowResults(true);
      setShowCelebration(false);
      setCelebrationShown(false);
      setGenerationStartTime(Date.now());

      // Store inputs for potential retry
      setLastJobInputs({ query, workType, projectInfo });

      triggerHaptic(50);

      const { data, error } = await supabase.functions.invoke('create-health-safety-job', {
        body: { query, workType, projectInfo }
      });

      if (error) throw error;

      setCurrentJobId(data.jobId);
      sessionStorage.setItem('health-safety-job-id', data.jobId);
      startPolling();

      toast.success('Generation started', {
        description: 'Your safety documentation is being created'
      });
    } catch (error) {
      console.error('Failed to start generation:', error);
      toast.error('Failed to start generation', {
        description: error instanceof Error ? error.message : 'Please try again'
      });
      setShowResults(false);
      sessionStorage.removeItem('health-safety-generation-active');
    }
  };

  const handleCancel = async () => {
    if (!currentJobId) return;
    
    // Don't try to cancel if already cancelled or completed
    if (status === 'cancelled' || status === 'complete' || status === 'failed') {
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('cancel-health-safety-job', {
        body: { jobId: currentJobId }
      });

      if (error) throw error;

      stopPolling();
      setShowResults(false);
      setCurrentJobId(null);
      sessionStorage.removeItem('health-safety-generation-active');
      sessionStorage.removeItem('health-safety-job-id');

      toast.info('Generation cancelled');
      triggerHaptic(50);
    } catch (error) {
      console.error('Failed to cancel:', error);
      toast.error('Failed to cancel generation');
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setCurrentJobId(null);
    sessionStorage.removeItem('health-safety-generation-active');
    sessionStorage.removeItem('health-safety-job-id');
    triggerHaptic(50);
  };

  const handleRetry = async () => {
    if (!lastJobInputs) {
      // No inputs to retry with, go back to input view
      setShowResults(false);
      return;
    }

    try {
      setGenerationStartTime(Date.now());
      setCelebrationShown(false);

      triggerHaptic(50);

      const { data, error } = await supabase.functions.invoke('create-health-safety-job', {
        body: lastJobInputs
      });

      if (error) throw error;

      setCurrentJobId(data.jobId);
      sessionStorage.setItem('health-safety-job-id', data.jobId);
      startPolling();

      toast.success('Retrying generation', {
        description: 'Your safety documentation is being created'
      });
    } catch (error) {
      console.error('Failed to retry generation:', error);
      toast.error('Retry failed', {
        description: error instanceof Error ? error.message : 'Please try again'
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Imported Circuit Context Banner */}
      <AnimatePresence>
        {importedContext && !showResults && (
          <ImportedContextBanner
            source={importedContext.sourceDesign}
            circuitCount={importedContext.context.circuitSummaries.length}
            onUseContext={handleUseImportedContext}
            onDismiss={handleDismissImportedContext}
          />
        )}
      </AnimatePresence>

      {!showResults && (
        <HealthSafetyInput
          onGenerate={handleGenerate}
          isProcessing={status === 'processing' || status === 'pending'}
          initialPrompt={initialPrompt}
          initialProjectName={initialProjectName}
        />
      )}
      
      {showResults && status !== 'complete' && status !== 'cancelled' && (
        <HealthSafetyProcessingView
          progress={progress}
          currentStep={currentStep}
          onCancel={handleCancel}
          status={status === 'failed' ? 'failed' : 'processing'}
          error={error}
          onRetry={handleRetry}
        />
      )}
      
      {showCelebration && outputData && (
        <HealthSafetySuccess 
          hazardCount={outputData.hazards?.length || 0}
          ppeCount={outputData.ppe?.length || 0}
          generationTime={generationStartTime ? (Date.now() - generationStartTime) / 1000 : 120}
          onClose={() => setShowCelebration(false)}
        />
      )}
      
      {status === 'complete' && !showCelebration && outputData && (
        <HealthSafetyResults 
          data={{
            ...outputData,
            projectName: job?.project_info?.projectName || outputData.projectName,
            location: job?.project_info?.location || outputData.location,
            clientName: job?.project_info?.clientName || outputData.clientName,
            workType: job?.work_type || outputData.workType,
            assessmentDate: new Date().toISOString().split('T')[0],
            reviewDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
};

export default HealthSafetyInterface;
