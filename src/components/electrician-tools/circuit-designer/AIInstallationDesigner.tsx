import { useState, useEffect } from "react";
import { StructuredDesignWizard } from "./structured-input/StructuredDesignWizard";
import { DesignProcessingView } from "./DesignProcessingView";
import { DesignProcessingViewDesktop } from "./DesignProcessingViewDesktop";
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
  const [userRequest, setUserRequest] = useState<string>('');
  const [totalCircuits, setTotalCircuits] = useState<number>(0);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  
  const { 
    job, 
    progress, 
    status, 
    currentStep, 
    designData, 
    error 
  } = useCircuitDesignGeneration(currentJobId);

  // Map progress percentage to stage numbers for visual feedback
  const getStageFromProgress = (percent: number): number => {
    if (percent === 0) return 0;
    if (percent <= 5) return 1;   // Initializing
    if (percent <= 10) return 2;  // Understanding Requirements
    if (percent <= 35) return 3;  // Extracting Circuits / AI Design
    if (percent <= 45) return 4;  // Searching Regulations
    if (percent <= 85) return 5;  // AI Circuit Design (main phase)
    if (percent <= 90) return 6;  // Compliance Validation
    if (percent <= 95) return 7;  // Finalizing Documentation
    return 8; // Downloading Data
  };

  const handleGenerate = async (inputs: DesignInputs) => {
    try {
      // Store user request and circuit count for processing view
      const userDescription = inputs.additionalPrompt || 
        `${inputs.projectName} - ${inputs.circuits.length} circuit${inputs.circuits.length !== 1 ? 's' : ''}`;
      sessionStorage.setItem('design-user-request', userDescription);
      sessionStorage.setItem('design-total-circuits', String(inputs.circuits.length));
      setUserRequest(userDescription);
      setTotalCircuits(inputs.circuits.length);

      // Count circuits that require AI processing (complex/non-standard)
      const aiRequiredCircuits = inputs.circuits.filter(c => {
        const isComplex = 
          (c.loadPower || 0) > 7200 || // High power (>32A)
          (c.cableLength || 0) > 100 || // Long run
          c.specialLocation !== 'none'; // Special location
        return isComplex || !['socket', 'lighting'].includes(c.loadType || '');
      });

      // Warn if job is very large
      if (aiRequiredCircuits.length > 12) {
        toast.warning('Large design detected', {
          description: `${aiRequiredCircuits.length} complex circuits may take 3-5 minutes to process. Consider splitting into smaller designs for faster results.`,
          duration: 8000
        });
      }

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
    setUserRequest('');
    setTotalCircuits(0);
    setRetryMessage(null);
    sessionStorage.removeItem('circuit-design-active');
    sessionStorage.removeItem('design-user-request');
    sessionStorage.removeItem('design-total-circuits');
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
      // Check if this is a compliance/validation error
      const isComplianceError = error?.includes('BS 7671') || 
                                error?.includes('Suggestions:') ||
                                error?.includes('NON_COMPLIANT');
      
      if (isComplianceError) {
        // Show validation error view for compliance issues
        setCurrentView('validation-error');
        toast.error('Design validation failed', {
          description: 'Please review the compliance issues and adjust your design'
        });
      } else {
        // Show input view for other errors
        toast.error('Design generation failed', {
          description: error || 'Please try again'
        });
        setCurrentView('input');
      }
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
        
        toast.info("Resuming design generation", {
          description: `Your circuit design is ${job.progress || 0}% complete`
        });
      }
    };

    checkForInProgressJobs();
  }, []);

  return (
    <div className="min-h-screen bg-background space-y-6">
      {/* Agent Inbox */}
      <AgentInbox currentAgent="designer" onTaskAccept={handleTaskAccept} />

      {currentView === 'input' && (
        <>
          <OptimizationTestPanel />
          <StructuredDesignWizard onGenerate={handleGenerate} isProcessing={status === 'processing'} />
        </>
      )}

      {currentView === 'processing' && (
        <>
          {/* Desktop/Tablet View - Full redesign */}
          <div className="hidden lg:block">
            <DesignProcessingViewDesktop
              key={currentJobId}
              progress={{ 
                message: currentStep || status, 
                stage: getStageFromProgress(progress), 
                percent: progress 
              }}
              userRequest={userRequest || ''}
              totalCircuits={totalCircuits}
              onCancel={handleCancel}
              retryMessage={retryMessage}
            />
          </div>
          
          {/* Mobile View - Simplified for performance */}
          <div className="block lg:hidden">
            <div className="space-y-4">
              <DesignProcessingView
                key={currentJobId}
                progress={{ 
                  stage: getStageFromProgress(progress), 
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
          </div>
        </>
      )}

      {currentView === 'validation-error' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <Alert variant="destructive" className="border-2">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="space-y-4">
              <div>
                <p className="font-bold text-lg mb-2">BS 7671 Compliance Issues Detected</p>
                <p className="text-sm opacity-90 mb-3">
                  The design does not meet BS 7671:2018+A2:2022 requirements. Review the issues below and adjust your design parameters.
                </p>
              </div>
              
              {error && (
                <div className="bg-background/10 rounded-md p-4 space-y-2 border border-destructive/20">
                  {error.split('\n').map((line, idx) => (
                    <p key={idx} className="text-sm font-mono leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-destructive/20">
                <p className="text-xs opacity-75">
                  Common fixes: Reduce cable length, increase cable size, lower load power, or change installation method.
                </p>
              </div>
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleReset}
              variant="default"
              size="lg"
            >
              Adjust Design Parameters
            </Button>
            <Button
              onClick={() => {
                setCurrentView('input');
                setCurrentJobId(null);
              }}
              variant="outline"
              size="lg"
            >
              Start New Design
            </Button>
          </div>
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
