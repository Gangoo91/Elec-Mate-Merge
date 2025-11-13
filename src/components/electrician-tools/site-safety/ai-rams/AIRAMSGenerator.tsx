import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { AIRAMSInput } from './AIRAMSInput';
import { AgentProcessingView } from './AgentProcessingView';
import { RAMSReviewEditor } from './RAMSReviewEditor';
import { CompletionCelebration } from './CompletionCelebration';
import { triggerHaptic } from '@/utils/animation-helpers';
import { supabase } from '@/integrations/supabase/client';
import { useRAMSJobPolling } from '@/hooks/useRAMSJobPolling';
import { useRAMSNotifications } from '@/hooks/useRAMSNotifications';
import { toast } from '@/hooks/use-toast';

const EXPECTED_TOTAL_SECONDS = 180; // 3 minutes visual countdown

export const AIRAMSGenerator: React.FC = () => {
  const navigate = useNavigate();
  
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);
  const [generationEndTime, setGenerationEndTime] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [resumedJob, setResumedJob] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [currentJobDescription, setCurrentJobDescription] = useState<string>('');
  const [localProgress, setLocalProgress] = useState(0);
  
  const lastErrorNotifiedJobRef = useRef<string | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const localStartRef = useRef<number | null>(null);
  const baseProgressRef = useRef<number>(0);
  
  const { job, startPolling, stopPolling, progress, status, currentStep, ramsData, methodData, error } = useRAMSJobPolling(currentJobId);
  
  // Helper: Start smooth local countdown
  const startLocalCountdown = (baseProgress = 0) => {
    stopLocalCountdown(); // Clear any existing
    
    baseProgressRef.current = Math.min(99, Math.max(0, baseProgress));
    localStartRef.current = performance.now();
    setLocalProgress(baseProgressRef.current);
    
    const tick = () => {
      if (!localStartRef.current) return;
      
      const elapsed = (performance.now() - localStartRef.current) / 1000;
      const progressRange = 99 - baseProgressRef.current;
      const increment = (elapsed / EXPECTED_TOTAL_SECONDS) * progressRange;
      const target = baseProgressRef.current + increment;
      const clamped = Math.min(99, target);
      
      setLocalProgress(clamped);
      rafIdRef.current = requestAnimationFrame(tick);
    };
    
    rafIdRef.current = requestAnimationFrame(tick);
  };
  
  // Helper: Stop smooth local countdown
  const stopLocalCountdown = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };
  const { requestPermission, showCompletionNotification, showErrorNotification } = useRAMSNotifications();

  // Check for in-progress jobs on mount (only if user initiated in this session)
  useEffect(() => {
    const checkForInProgressJobs = async () => {
      // Only check if user has initiated a generation in this session
      const hasActiveSession = sessionStorage.getItem('rams-generation-active') === 'true';
      if (!hasActiveSession) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: jobs } = await supabase
        .from('rams_generation_jobs')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'processing'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (jobs && jobs.length > 0) {
        const job = jobs[0];
        setCurrentJobId(job.id);
        setShowResults(true);
        setResumedJob(true);
        startPolling();
        startLocalCountdown(job.progress || 0);
        
        toast({
          title: "Resuming generation",
          description: `Your RAMS document is ${job.progress}% complete`,
          variant: 'default'
        });
      } else {
        // Check for recently completed job
        const { data: completedJobs } = await supabase
          .from('rams_generation_jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'complete')
          .order('completed_at', { ascending: false })
          .limit(1);

        if (completedJobs && completedJobs.length > 0) {
          const completedJob = completedJobs[0];
          const completedAt = new Date(completedJob.completed_at);
          const now = new Date();
          const minutesAgo = (now.getTime() - completedAt.getTime()) / 1000 / 60;

          // If completed in last 10 minutes, show it
          if (minutesAgo < 10) {
            setCurrentJobId(completedJob.id);
            setShowResults(true);
            startPolling();
            
            toast({
              title: "Your RAMS is ready!",
              description: `Completed ${Math.floor(minutesAgo)} minute${Math.floor(minutesAgo) !== 1 ? 's' : ''} ago`,
              variant: 'success'
            });
          } else {
            // No active or recent job found, clear stale session flag
            sessionStorage.removeItem('rams-generation-active');
          }
        } else {
          // No jobs found at all, clear stale session flag
          sessionStorage.removeItem('rams-generation-active');
        }
      }
    };

    checkForInProgressJobs();
  }, []);

  // Request notification permission on first generation
  useEffect(() => {
    if (showResults && !resumedJob) {
      requestPermission();
    }
  }, [showResults, resumedJob]);

  // Show notification when job completes
  useEffect(() => {
    if (status === 'complete' && ramsData && !celebrationShown) {
      showCompletionNotification({
        jobId: currentJobId || '',
        projectName: ramsData.projectName,
        onNotificationClick: () => {
          window.focus();
          document.getElementById('rams-results')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [status, ramsData, celebrationShown, currentJobId]);

  // Show error notification (prevent duplicate toasts for old jobs)
  useEffect(() => {
    if (status === 'failed' && error && currentJobId && lastErrorNotifiedJobRef.current !== currentJobId) {
      lastErrorNotifiedJobRef.current = currentJobId;
      showErrorNotification({
        jobId: currentJobId,
        errorMessage: error
      });
    }
  }, [status, error, currentJobId]);

  // Stop countdown on terminal states
  useEffect(() => {
    if (status === 'complete') {
      setLocalProgress(100);
      stopLocalCountdown();
    }
    if (status === 'failed' || status === 'cancelled') {
      stopLocalCountdown();
    }
  }, [status]);
  
  // Trigger celebration when generation completes WITH REAL DATA
  useEffect(() => {
    const hasFullData = ramsData && 
                        methodData && 
                        status === 'complete' && 
                        ramsData.risks?.length > 0;
                        
    const hasPartialData = ramsData && 
                          !methodData && 
                          status === 'complete' && 
                          ramsData.risks?.length > 0;
                        
    // Show celebration for full data
    if (hasFullData && showResults && !celebrationShown) {
      sessionStorage.removeItem('rams-generation-active');
      
      setGenerationEndTime(Date.now());
      setShowResults(true); // Ensure results stay visible
      setShowCelebration(true);
      setCelebrationShown(true);
      triggerHaptic([100, 50, 100, 50, 200]);
      
      // Auto-close celebration after 3 seconds
      setTimeout(() => setShowCelebration(false), 3000);
    }
    
    // For partial completion, show toast notification instead
    if (hasPartialData && showResults && !celebrationShown) {
      sessionStorage.removeItem('rams-generation-active');
      setGenerationEndTime(Date.now());
      setCelebrationShown(true);
      
      toast({
        title: "Health & Safety Complete",
        description: "Risk assessment generated. Method statement timed out - you can retry or proceed with RAMS only.",
        variant: 'default'
      });
    }
  }, [ramsData, methodData, status, currentStep, showResults, celebrationShown]);

  const handleGenerate = async (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
    },
    jobScale: 'domestic' | 'commercial' | 'industrial'
  ) => {
    // Mark session as having active generation
    sessionStorage.setItem('rams-generation-active', 'true');
    
    // Reset error notification tracker for new generation
    lastErrorNotifiedJobRef.current = null;
    
    setCurrentJobDescription(jobDescription);
    setGenerationStartTime(Date.now());
    setShowResults(true);
    setShowCelebration(false);
    setCelebrationShown(false);
    
    const { data, error } = await supabase.functions.invoke('create-rams-job', {
      body: { jobDescription, projectInfo, jobScale }
    });
    
    if (error || !data?.jobId) {
      console.error('Failed to create job:', error);
      return;
    }
    
    setCurrentJobId(data.jobId);
    startPolling();
    startLocalCountdown(0);
  };

  const handleCancel = async () => {
    if (!currentJobId) return;
    
    setIsCancelling(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('cancel-rams-job', {
        body: { jobId: currentJobId }
      });
      
      if (error || !data?.success) {
        toast({
          title: "Cancellation failed",
          description: error?.message || data?.error || "Could not cancel generation",
          variant: 'destructive'
        });
        setIsCancelling(false);
        return;
      }
      
      // Stop polling and clear state
      stopPolling();
      sessionStorage.removeItem('rams-generation-active');
      
      toast({
        title: "Generation cancelled",
        description: "You can start a new generation with corrected input",
        variant: 'default'
      });
      
      // Reset to input form
      setCurrentJobId(null);
      setShowResults(false);
      setShowCelebration(false);
      setCelebrationShown(false);
      setGenerationStartTime(0);
      setGenerationEndTime(0);
      setResumedJob(false);
      
    } catch (err: any) {
      console.error('Cancel error:', err);
      
      // Extract error message from edge function response
      const errorMessage = err?.message || 'An unexpected error occurred';
      
      // If job is already in terminal state, treat as successful cancellation
      if (errorMessage.includes('already failed') || 
          errorMessage.includes('already completed') || 
          errorMessage.includes('already cancelled')) {
        
        // Clear session and reset UI
        sessionStorage.removeItem('rams-generation-active');
        setCurrentJobId(null);
        setShowResults(false);
        setShowCelebration(false);
        setCelebrationShown(false);
        setGenerationStartTime(0);
        setGenerationEndTime(0);
        setResumedJob(false);
        
        toast({
          title: "Job already ended",
          description: "This generation has already finished. You can start a new one.",
          variant: 'default'
        });
      } else {
        toast({
          title: "Cancellation failed",
          description: errorMessage,
          variant: 'destructive'
        });
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const handleStartOver = () => {
    // Clear session flag
    sessionStorage.removeItem('rams-generation-active');
    
    stopLocalCountdown();
    setCurrentJobId(null);
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setGenerationStartTime(0);
    setGenerationEndTime(0);
    setResumedJob(false);
    setCurrentJobDescription('');
    setLocalProgress(0);
  };
  
  const saveToDatabase = async () => {
    if (!currentJobId || !ramsData || !methodData) {
      toast({
        title: "Cannot Save",
        description: "No data to save",
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

    // Update the job with latest edits
    const { error: updateError } = await supabase
      .from('rams_generation_jobs')
      .update({
        rams_data: ramsData,
        method_data: methodData
      })
      .eq('id', currentJobId)
      .eq('user_id', user.id);

      if (updateError) throw updateError;

      setLastSaved(new Date());
      
      toast({
        title: "Saved Successfully",
        description: "Your changes have been saved",
        variant: 'success'
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Could not save changes",
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate stats for celebration
  const hazardCount = ramsData?.risks?.length || 0;
  const controlMeasuresCount = ramsData?.risks?.reduce((sum, risk) => {
    return sum + (risk.controls?.split('.').filter(c => c.trim()).length || 1);
  }, 0) || 0;
  const methodStepsCount = methodData?.steps?.length || 0;
  const generationTimeSeconds = generationEndTime && generationStartTime 
    ? (generationEndTime - generationStartTime) / 1000 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-grey via-elec-dark to-elec-grey">
      <div className="w-full px-0 py-6 sm:py-8 md:py-10 max-w-7xl mx-auto sm:px-4 md:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 px-2 sm:px-0">
          {/* Clean Header Card */}
          <div className="relative overflow-hidden rounded-lg border border-elec-yellow/10 bg-elec-card/30 backdrop-blur-sm shadow-md hover:shadow-lg hover:border-elec-yellow/20 transition-all duration-300">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent" />
            
            <div className="p-4 sm:p-6 space-y-3">
              {/* Centered content */}
              <div className="flex flex-col items-center text-center space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-elec-yellow to-yellow-400 bg-clip-text text-transparent">
                    AI RAMS Generator
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Generate professional Risk Assessments and Method Statements in minutes using advanced AI
                </p>
              </div>
              
              {/* Clean divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {!showResults ? (
            <AIRAMSInput
              onGenerate={handleGenerate}
              isProcessing={!!currentJobId && (status === 'pending' || status === 'processing')}
            />
          ) : (
            <>
              {/* Resuming banner */}
              {resumedJob && status !== 'complete' && (
                <div className="p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-400">
                      Resuming generation from earlier...
                    </p>
                    <p className="text-xs text-blue-400/70 mt-0.5">
                      Current progress: {progress}%
                    </p>
                  </div>
                </div>
              )}

              <AgentProcessingView
                overallProgress={progress === 100 ? 100 : localProgress}
                currentStep={currentStep}
                elapsedTime={generationStartTime > 0 ? Math.floor((Date.now() - generationStartTime) / 1000) : 0}
                estimatedTimeRemaining={Math.max(0, EXPECTED_TOTAL_SECONDS - (generationStartTime > 0 ? Math.floor((Date.now() - generationStartTime) / 1000) : 0))}
                onCancel={status === 'processing' || status === 'pending' ? handleCancel : undefined}
                isCancelling={isCancelling}
                jobDescription={currentJobDescription}
                agentSteps={[
                  {
                    name: 'health-safety',
                    status: progress >= 40 ? 'complete' : 'processing',
                    progress: Math.min(100, (progress / 40) * 100),
                    currentStep: progress < 40 ? currentStep : undefined,
                    reasoning: progress < 40 ? currentStep : '✅ Risk assessment complete'
                  },
                  {
                    name: 'installer',
                    status: status === 'complete' ? 'complete' : progress >= 40 ? 'processing' : 'pending',
                    progress: progress >= 40 ? Math.min(100, ((progress - 40) / 60) * 100) : 0,
                    currentStep: progress >= 40 && progress < 100 ? currentStep : undefined,
                    reasoning: progress >= 40 && progress < 100 ? currentStep : progress === 100 ? '✅ Method statement complete' : 'Waiting for health & safety analysis...'
                  }
                ]}
              />

              {(error || status === 'cancelled') && (
                <div className={`p-4 border rounded-lg ${
                  status === 'cancelled' 
                    ? 'bg-orange-500/10 border-orange-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <p className={status === 'cancelled' ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}>
                    {status === 'cancelled' ? 'Generation was cancelled' : error}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleStartOver}
                    className="mt-3"
                  >
                    {status === 'cancelled' ? 'Start New Generation' : 'Try Again'}
                  </Button>
                </div>
              )}

              {ramsData && (
                <div id="rams-results" className="px-2">
                  {/* Show warning if method data is missing */}
                  {!methodData && (
                    <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-orange-400">
                            Method Statement Generation Timed Out
                          </p>
                          <p className="text-xs text-orange-400/70 mt-1">
                            Your risk assessment is complete, but the method statement could not be generated. You can review and export the RAMS, or retry to generate the full document.
                          </p>
                          <Button
                            variant="outline"
                            onClick={handleStartOver}
                            className="mt-3 border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/10 text-orange-400"
                            size="sm"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Retry Full Generation
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Show info banner if risks are empty */}
                  {(!ramsData.risks || ramsData.risks.length === 0) && (
                    <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-blue-400">
                            AI could not identify specific hazards from your input
                          </p>
                          <p className="text-xs text-blue-400/70 mt-1">
                            You can add hazards manually below or try again with more detail about the work being carried out.
                          </p>
                          <Button
                            variant="outline"
                            onClick={handleStartOver}
                            className="mt-3 border-blue-500/40 hover:border-blue-500 hover:bg-blue-500/10 text-blue-400"
                            size="sm"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Try Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <RAMSReviewEditor
                    ramsData={ramsData}
                    methodData={methodData}
                    isSaving={isSaving}
                    lastSaved={lastSaved}
                    onSave={() => saveToDatabase()}
                    onUpdate={(rams, method) => {
                      // Update handled by internal state
                    }}
                    onRegenerate={handleStartOver}
                    rawHSResponse={job?.raw_hs_response}
                    rawInstallerResponse={job?.raw_installer_response}
                  />
                </div>
              )}

              {status === 'complete' && ramsData && (
                <div className="flex justify-center pt-4 pb-8">
                  <Button
                    variant="outline"
                    onClick={handleStartOver}
                    className="border-elec-yellow/40 hover:border-elec-yellow hover:bg-elec-yellow/10 text-elec-yellow font-bold text-lg px-8 py-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-elec-yellow/30"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Another RAMS
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Celebration Modal */}
        {showCelebration && ramsData && methodData && (
          <CompletionCelebration
            hazardCount={hazardCount}
            controlMeasuresCount={controlMeasuresCount}
            methodStepsCount={methodStepsCount}
            generationTimeSeconds={generationTimeSeconds}
            onClose={() => {
              setShowCelebration(false);
              setShowResults(true);
            }}
          />
        )}
      </div>
    </div>
  );
};
