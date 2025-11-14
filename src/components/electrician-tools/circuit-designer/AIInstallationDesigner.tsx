import { useState, useEffect } from "react";
import { DesignInputForm } from "./DesignInputForm";
import { DesignProcessingView } from "./DesignProcessingView";
import { DesignReviewEditor } from "./DesignReviewEditor";
import { DesignInputs } from "@/types/installation-design";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { OptimizationTestPanel } from "./OptimizationTestPanel";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useCircuitDesignGeneration } from "@/hooks/useCircuitDesignGeneration";
import { toast } from "sonner";

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<'input' | 'processing' | 'results' | 'validation-error'>('input');
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const { 
    job, 
    startPolling, 
    stopPolling, 
    progress, 
    status, 
    currentStep, 
    designData, 
    error 
  } = useCircuitDesignGeneration(currentJobId);

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
      setCurrentView('processing');
      
      // Create job
      const { data, error } = await supabase.functions.invoke('create-circuit-design-job', {
        body: { inputs }
      });

      if (error || !data?.jobId) {
        toast.error('Failed to start design generation', {
          description: error?.message || 'Please try again'
        });
        setCurrentView('input');
        return;
      }

      console.log('✅ Circuit design job created:', data.jobId);
      setCurrentJobId(data.jobId);
      startPolling();

      // Mark session as active
      sessionStorage.setItem('circuit-design-active', 'true');
      
    } catch (error: any) {
      console.error('Failed to create job:', error);
      toast.error('Failed to start design generation', {
        description: error.message
      });
      setCurrentView('input');
    }
  };

  const handleReset = () => {
    setCurrentView('input');
    setCurrentJobId(null);
    stopPolling();
    sessionStorage.removeItem('circuit-design-active');
  };

  const handleCancel = async () => {
    if (!currentJobId || isCancelling) return;

    setIsCancelling(true);
    try {
      const { data, error } = await supabase.functions.invoke('cancel-circuit-design-job', {
        body: { jobId: currentJobId }
      });

      if (error) {
        toast.error('Failed to cancel job', {
          description: error.message
        });
        return;
      }

      if (data?.success) {
        toast.success('Design generation cancelled');
        stopPolling();
        setCurrentView('input');
        setCurrentJobId(null);
        sessionStorage.removeItem('circuit-design-active');
      }
    } catch (error: any) {
      console.error('Error cancelling job:', error);
      toast.error('Failed to cancel job');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    console.log('Task accepted from agent:', contextData, instruction);
    // TODO: Pre-fill form with data from other agents
  };

  // Handle status changes
  useEffect(() => {
    if (status === 'complete' && currentView === 'processing') {
      setCurrentView('results');
      toast.success('Circuit design complete!');
    } else if (status === 'failed' && currentView === 'processing') {
      toast.error('Design generation failed', {
        description: error || 'Please try again'
      });
      setCurrentView('input');
    }
  }, [status, currentView, error]);

  // Check for in-progress jobs on mount
  useEffect(() => {
    const checkForInProgressJobs = async () => {
      const hasActiveSession = sessionStorage.getItem('circuit-design-active') === 'true';
      if (!hasActiveSession) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: jobs } = await supabase
        .from('circuit_design_jobs' as any)
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'processing'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (jobs && jobs.length > 0 && Array.isArray(jobs)) {
        const job = jobs[0] as any;
        setCurrentJobId(job.id);
        setCurrentView('processing');
        startPolling();
        
        toast.info("Resuming design generation", {
          description: `Your circuit design is ${job.progress || 0}% complete`
        });
      }
    };

    checkForInProgressJobs();
  }, [startPolling]);

  return (
    <div className="min-h-screen bg-background space-y-6">
      {/* Agent Inbox */}
      <AgentInbox currentAgent="designer" onTaskAccept={handleTaskAccept} />

      {currentView === 'input' && (
        <>
          <OptimizationTestPanel />
          <DesignInputForm onGenerate={handleGenerate} isProcessing={status === 'processing'} />
        </>
      )}

      {currentView === 'processing' && (
        <div className="space-y-4">
          <DesignProcessingView 
            progress={{ 
              stage: 1, 
              message: currentStep || 'Processing...', 
              percent: progress 
            }} 
          />
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Generation'}
            </Button>
          </div>
        </div>
      )}

      {currentView === 'validation-error' && (
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p className="font-semibold">Regulation Compliance Issues Detected</p>
              <p>{error}</p>
              <p className="text-sm mt-2">
                The design does not meet BS 7671:2018+A2:2022 requirements. Please review the highlighted regulations and adjust your specifications.
              </p>
            </AlertDescription>
          </Alert>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Revise Design Parameters
          </button>
        </div>
      )}

      {currentView === 'results' && designData && (
        <DesignReviewEditor
          design={designData}
          onReset={handleReset}
        />
      )}

      {currentView === 'results' && !designData && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No design data available. Please try again.</p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Start New Design
          </button>
        </div>
      )}
    </div>
  );
};
