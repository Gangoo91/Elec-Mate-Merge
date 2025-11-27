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

const HealthSafetyInterface = () => {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);

  const { job, startPolling, stopPolling, progress, status, currentStep, outputData, error } = 
    useHealthSafetyGeneration(currentJobId);
  
  const { requestPermission, showCompletionNotification, showErrorNotification } = useRAMSNotifications();

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

  return (
    <div className="space-y-4">
      {!showResults && (
        <HealthSafetyInput 
          onGenerate={handleGenerate}
          isProcessing={status === 'processing' || status === 'pending'}
        />
      )}
      
      {showResults && status !== 'complete' && status !== 'cancelled' && status !== 'failed' && (
        <HealthSafetyProcessingView 
          progress={progress}
          currentStep={currentStep}
          onCancel={handleCancel}
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
