import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Clock, AlertCircle, Cloud, CloudOff, Check, Loader2, RotateCcw } from 'lucide-react';
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
const RAMS_LOCAL_DRAFT_KEY = 'rams-local-draft';
const SAVE_RETRY_DELAYS = [5000, 15000, 30000]; // Exponential backoff: 5s, 15s, 30s

interface AIRAMSGeneratorProps {
  onBack?: () => void;
}

export const AIRAMSGenerator: React.FC<AIRAMSGeneratorProps> = ({ onBack }) => {
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
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [showDraftRecovery, setShowDraftRecovery] = useState(false);
  const [recoveredDraft, setRecoveredDraft] = useState<{
    ramsData: any;
    methodData: any;
    jobId: string;
    timestamp: number;
    projectName: string;
  } | null>(null);

  const lastErrorNotifiedJobRef = useRef<string | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const { 
    job, 
    startPolling, 
    stopPolling, 
    progress, 
    hsAgentProgress,
    installerAgentProgress,
    hsAgentStatus,
    installerAgentStatus,
    status, 
    currentStep, 
    ramsData, 
    methodData, 
    error 
  } = useRAMSJobPolling(currentJobId);
  
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
  
  // PHASE 4 & 5: Trigger celebration or toast for partial completions
  useEffect(() => {
    // PHASE 3 FIX: Celebration trigger (check object presence, not array length)
    const hasFullData = ramsData && methodData && status === 'complete';
                        
    const hasPartialData = (ramsData || methodData) && 
                          (status === 'partial' || status === 'complete') && 
                          !hasFullData;
                        
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
    } else if (status === 'complete' && !celebrationShown) {
      // Fallback: show toast if celebration doesn't trigger
      setTimeout(() => {
        if (!showCelebration) {
          toast({
            title: "RAMS Complete! 🎉",
            description: "Your document is ready for review",
            variant: 'default'
          });
          setCelebrationShown(true);
        }
      }, 2000);
    }
    
    // For partial completion, show toast notification instead
    if (hasPartialData && showResults && !celebrationShown) {
      sessionStorage.removeItem('rams-generation-active');
      setGenerationEndTime(Date.now());
      setCelebrationShown(true);
      setShowResults(true); // Ensure results display
      
      toast({
        title: "Health & Safety Complete",
        description: "Risk assessment generated. Method statement timed out - you can retry or proceed with RAMS only.",
        variant: 'default'
      });
    }
  }, [ramsData, methodData, status, currentStep, showResults, celebrationShown]);

  // === Improvement 1: Write to localStorage on every data change ===
  useEffect(() => {
    if (!ramsData || !currentJobId) return;
    try {
      const draft = {
        ramsData,
        methodData,
        jobId: currentJobId,
        timestamp: Date.now(),
        projectName: ramsData.projectName || 'Untitled',
      };
      localStorage.setItem(RAMS_LOCAL_DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Failed to save RAMS draft to localStorage:', e);
    }
  }, [ramsData, methodData, currentJobId]);

  // === Improvement 2: Draft recovery on mount ===
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(RAMS_LOCAL_DRAFT_KEY);
      if (!savedDraft) return;
      const draft = JSON.parse(savedDraft);
      const ageHours = (Date.now() - draft.timestamp) / (1000 * 60 * 60);
      // Offer recovery if draft is <24h old and we're not already viewing results
      if (ageHours < 24 && !showResults && !currentJobId && draft.ramsData) {
        setRecoveredDraft(draft);
        setShowDraftRecovery(true);
      } else if (ageHours >= 24) {
        localStorage.removeItem(RAMS_LOCAL_DRAFT_KEY);
      }
    } catch (e) {
      console.warn('Failed to read RAMS draft from localStorage:', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === Improvement 5a: beforeunload writes to localStorage (sync, reliable) ===
  useEffect(() => {
    if (!ramsData || !currentJobId) return;
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(RAMS_LOCAL_DRAFT_KEY, JSON.stringify({
          ramsData,
          methodData,
          jobId: currentJobId,
          timestamp: Date.now(),
          projectName: ramsData.projectName || 'Untitled',
        }));
      } catch {
        // localStorage is synchronous — best effort
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [ramsData, methodData, currentJobId]);

  // === Improvement 3: Auto-save to cloud every 30s when generation is complete ===
  useEffect(() => {
    if (!ramsData || !currentJobId || status !== 'complete') {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
      return;
    }
    // Initial save after 10s, then every 30s
    const initialTimeout = setTimeout(() => {
      saveToDatabaseSilent();
      autoSaveTimerRef.current = setInterval(() => {
        saveToDatabaseSilent();
      }, 30000);
    }, 10000);
    return () => {
      clearTimeout(initialTimeout);
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ramsData, methodData, currentJobId, status]);

  // Restore a recovered draft
  const handleRestoreDraft = () => {
    if (!recoveredDraft) return;
    setCurrentJobId(recoveredDraft.jobId);
    setShowResults(true);
    setShowDraftRecovery(false);
    startPolling();
    toast({
      title: "Draft restored",
      description: `Recovered "${recoveredDraft.projectName}" from local backup`,
      variant: 'success'
    });
  };

  const handleDismissDraft = () => {
    setShowDraftRecovery(false);
    setRecoveredDraft(null);
    localStorage.removeItem(RAMS_LOCAL_DRAFT_KEY);
  };

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
    // Clear session flag and localStorage draft
    sessionStorage.removeItem('rams-generation-active');
    localStorage.removeItem(RAMS_LOCAL_DRAFT_KEY);

    setCurrentJobId(null);
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setGenerationStartTime(0);
    setGenerationEndTime(0);
    setResumedJob(false);
    setCurrentJobDescription('');
    setSaveStatus('idle');
  };
  
  // === Improvement 4: Cloud save with retry and exponential backoff ===
  const saveToCloudWithRetry = useCallback(async (
    silent: boolean = false,
    maxRetries: number = 3
  ): Promise<boolean> => {
    if (!currentJobId || !ramsData) {
      if (!silent) {
        toast({
          title: "Cannot Save",
          description: "No data to save",
          variant: 'destructive'
        });
      }
      return false;
    }

    setIsSaving(true);
    setSaveStatus('saving');

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

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
        setSaveStatus('saved');
        setIsSaving(false);

        if (!silent) {
          toast({
            title: "Saved Successfully",
            description: "Your changes have been saved",
            variant: 'success'
          });
        }
        return true;
      } catch (err) {
        console.error(`Save attempt ${attempt + 1}/${maxRetries} failed:`, err);

        if (attempt < maxRetries - 1) {
          // Wait before retrying (exponential backoff)
          await new Promise(r => setTimeout(r, SAVE_RETRY_DELAYS[attempt] || 5000));
        }
      }
    }

    // All retries exhausted
    setSaveStatus('failed');
    setIsSaving(false);

    if (!silent) {
      toast({
        title: "Save Failed",
        description: "Could not save after multiple attempts. Tap the save indicator to retry.",
        variant: 'destructive'
      });
    }
    return false;
  }, [currentJobId, ramsData, methodData]);

  // Explicit save (user-triggered, shows toast)
  const saveToDatabase = async () => {
    await saveToCloudWithRetry(false, 3);
  };

  // Silent save (auto-save, no toast)
  const saveToDatabaseSilent = async () => {
    await saveToCloudWithRetry(true, 2);
  };

  // === Improvement 5b: Save before navigating away ===
  const handleBack = useCallback(async () => {
    // Save to localStorage immediately
    if (ramsData && currentJobId) {
      try {
        localStorage.setItem(RAMS_LOCAL_DRAFT_KEY, JSON.stringify({
          ramsData,
          methodData,
          jobId: currentJobId,
          timestamp: Date.now(),
          projectName: ramsData.projectName || 'Untitled',
        }));
      } catch {
        // Best effort
      }
      // Quick cloud save (1 retry, shorter timeout)
      if (saveStatus !== 'saved') {
        await saveToCloudWithRetry(true, 1);
      }
    }
    onBack ? onBack() : navigate('/electrician/site-safety');
  }, [ramsData, methodData, currentJobId, saveStatus, saveToCloudWithRetry, onBack, navigate]);

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
    <div className="min-h-screen bg-elec-dark">
      {/* Header - Compact */}
      <header className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="px-2 h-12 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBack ? onBack() : navigate('/electrician/site-safety')}
            className="h-9 w-9 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-white truncate">RAMS Generator</h1>
            <p className="text-[10px] text-white">Risk Assessment & Method Statement</p>
          </div>
          {showResults && status === 'complete' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartOver}
              className="h-9 text-xs border-elec-yellow/30 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow touch-manipulation"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <main>
        {/* Draft recovery banner */}
        {showDraftRecovery && recoveredDraft && !showResults && (
          <div className="mx-4 mt-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <RotateCcw className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  Unsaved RAMS found
                </p>
                <p className="text-xs text-white mt-1">
                  "{recoveredDraft.projectName}" was saved locally{' '}
                  {Math.floor((Date.now() - recoveredDraft.timestamp) / (1000 * 60))} minutes ago.
                  Would you like to restore it?
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={handleRestoreDraft}
                    className="h-9 bg-blue-500 hover:bg-blue-600 text-white touch-manipulation"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                    Restore
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDismissDraft}
                    className="h-9 text-white hover:bg-white/10 touch-manipulation"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                overallProgress={progress}
                currentStep={currentStep}
                elapsedTime={generationStartTime > 0 ? Math.floor((Date.now() - generationStartTime) / 1000) : 0}
                estimatedTimeRemaining={Math.max(0, Math.floor((EXPECTED_TOTAL_SECONDS * (100 - progress)) / 100))}
                onCancel={status === 'processing' || status === 'pending' ? handleCancel : undefined}
                isCancelling={isCancelling}
                jobDescription={currentJobDescription}
                hsAgentProgress={hsAgentProgress}
                installerAgentProgress={installerAgentProgress}
                hsAgentStatus={hsAgentStatus}
                installerAgentStatus={installerAgentStatus}
                agentSteps={[
                  {
                    name: 'health-safety',
                    status: hsAgentStatus as 'pending' | 'processing' | 'complete',
                    progress: hsAgentProgress,
                    currentStep: hsAgentStatus === 'complete' ? 'Risk assessment complete' : currentStep.includes('Health & Safety') ? currentStep : 'Analysing hazards...',
                    reasoning: hsAgentStatus === 'complete' ? '✅ Risk assessment complete' : currentStep.includes('Health & Safety') ? currentStep : 'Analysing hazards...'
                  },
                  {
                    name: 'installer',
                    status: installerAgentStatus as 'pending' | 'processing' | 'complete',
                    progress: installerAgentProgress,
                    currentStep: installerAgentStatus === 'complete' ? 'Method statement complete' : currentStep.includes('Installer') ? currentStep : installerAgentStatus === 'pending' ? 'Waiting...' : 'Generating steps...',
                    reasoning: installerAgentStatus === 'complete' ? '✅ Method statement complete' : currentStep.includes('Installer') ? currentStep : installerAgentStatus === 'pending' ? 'Waiting for health & safety analysis...' : 'Generating steps...'
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
                <div id="rams-results">
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

            </>
          )}
      </main>

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
  );
};
