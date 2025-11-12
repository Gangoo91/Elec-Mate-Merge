import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { MethodStatementInput } from './MethodStatementInput';
import { MethodStatementProcessingView } from './MethodStatementProcessingView';
import { MethodStatementReviewEditor } from './MethodStatementReviewEditor';
import MethodStatementSuccess from './MethodStatementSuccess';
import { triggerHaptic } from '@/utils/animation-helpers';
import { supabase } from '@/integrations/supabase/client';
import { useRAMSJobPolling } from '@/hooks/useRAMSJobPolling';
import { toast } from '@/hooks/use-toast';

export const AIMethodStatementGenerator: React.FC = () => {
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
  const lastErrorNotifiedJobRef = React.useRef<string | null>(null);
  
  const { job, startPolling, stopPolling, progress, status, currentStep, methodData, error } = useRAMSJobPolling(currentJobId);

  // Check for in-progress jobs on mount
  useEffect(() => {
    const checkForInProgressJobs = async () => {
      const hasActiveSession = sessionStorage.getItem('method-statement-generation-active') === 'true';
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
          description: `Your Method Statement is ${job.progress}% complete`,
          variant: 'default'
        });
      } else {
        sessionStorage.removeItem('method-statement-generation-active');
      }
    };

    checkForInProgressJobs();
  }, []);

  // Trigger celebration when generation completes
  useEffect(() => {
    const hasRealData = methodData && 
                        status === 'complete' && 
                        methodData.steps?.length > 0;
                        
    if (hasRealData && showResults && !celebrationShown) {
      sessionStorage.removeItem('method-statement-generation-active');
      
      setGenerationEndTime(Date.now());
      setShowCelebration(true);
      setCelebrationShown(true);
      triggerHaptic([100, 50, 100, 50, 200]);
    }
  }, [methodData, status, showResults, celebrationShown]);

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
    sessionStorage.setItem('method-statement-generation-active', 'true');
    
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
      
      stopPolling();
      sessionStorage.removeItem('method-statement-generation-active');
      
      toast({
        title: "Generation cancelled",
        description: "You can start a new generation",
        variant: 'default'
      });
      
      setCurrentJobId(null);
      setShowResults(false);
      setShowCelebration(false);
      setCelebrationShown(false);
      setGenerationStartTime(0);
      setGenerationEndTime(0);
      setResumedJob(false);
      
    } catch (err: any) {
      console.error('Cancel error:', err);
      toast({
        title: "Cancellation failed",
        description: err?.message || 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem('method-statement-generation-active');
    
    setCurrentJobId(null);
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setGenerationStartTime(0);
    setGenerationEndTime(0);
    setResumedJob(false);
    setCurrentJobDescription('');
  };
  
  const saveToDatabase = async () => {
    if (!currentJobId || !methodData) {
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

      const { error: updateError } = await supabase
        .from('rams_generation_jobs')
        .update({
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
  const stepsCount = methodData?.steps?.length || 0;
  const totalDuration = methodData?.totalEstimatedTime || 'N/A';
  const hazardsCount = methodData?.riskAssessment?.hazards?.length || 0;
  const riskLevel = methodData?.overallRiskLevel || 'medium';
  const generationTimeSeconds = generationEndTime && generationStartTime 
    ? (generationEndTime - generationStartTime) / 1000 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-grey via-elec-dark to-elec-grey">
      <div className="w-full px-0 py-6 sm:py-8 md:py-10 max-w-7xl mx-auto sm:px-4 md:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 px-2 sm:px-0">
          <div className="relative overflow-hidden rounded-lg border border-emerald-500/10 bg-elec-card/30 backdrop-blur-sm shadow-md hover:shadow-lg hover:border-emerald-500/20 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
            
            <div className="p-4 sm:p-6 space-y-3">
              <div className="flex flex-col items-center text-center space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                    AI Method Statement Generator
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                  Generate comprehensive method statements with step-by-step procedures and integrated hazard analysis
                </p>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {!showResults ? (
            <MethodStatementInput
              onGenerate={handleGenerate}
              isProcessing={!!currentJobId && (status === 'pending' || status === 'processing')}
            />
          ) : (
            <>
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

              <MethodStatementProcessingView
                overallProgress={progress}
                currentStep={currentStep}
                elapsedTime={generationStartTime > 0 ? Math.floor((Date.now() - generationStartTime) / 1000) : 0}
                estimatedTimeRemaining={Math.max(0, Math.floor((300 * (100 - progress)) / 100))}
                onCancel={status === 'processing' || status === 'pending' ? handleCancel : undefined}
                isCancelling={isCancelling}
                jobDescription={currentJobDescription}
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

              {methodData && status === 'complete' && (
                <div id="method-statement-results" className="px-2">
                  <MethodStatementReviewEditor
                    methodData={methodData}
                    onSave={saveToDatabase}
                    isSaving={isSaving}
                    lastSaved={lastSaved}
                    onStartOver={handleStartOver}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showCelebration && methodData && (
        <MethodStatementSuccess
          stepsCount={stepsCount}
          totalDuration={totalDuration}
          hazardsCount={hazardsCount}
          riskLevel={riskLevel}
          generationTime={Math.floor(generationTimeSeconds)}
          projectName={methodData.jobTitle || 'Method Statement'}
          open={showCelebration}
          onOpenChange={setShowCelebration}
          onViewResults={() => {
            setShowCelebration(false);
            document.getElementById('method-statement-results')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};
