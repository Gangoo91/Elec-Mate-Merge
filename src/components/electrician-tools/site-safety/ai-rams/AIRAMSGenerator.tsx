import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AIRAMSInput } from './AIRAMSInput';
import { AgentProcessingView } from './AgentProcessingView';
import { RAMSReviewEditor } from './RAMSReviewEditor';
import { CompletionCelebration } from './CompletionCelebration';
import { triggerHaptic } from '@/utils/animation-helpers';
import { supabase } from '@/integrations/supabase/client';
import { useRAMSJobPolling } from '@/hooks/useRAMSJobPolling';

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
  
  const { job, startPolling, progress, status, currentStep, ramsData, methodData, error } = useRAMSJobPolling(currentJobId);

  // Trigger celebration when generation completes
  useEffect(() => {
    if (ramsData && methodData && status === 'complete' && showResults && !celebrationShown) {
      setGenerationEndTime(Date.now());
      setShowCelebration(true);
      setCelebrationShown(true);
      triggerHaptic([100, 50, 100, 50, 200]);
    }
  }, [ramsData, methodData, status, showResults, celebrationShown]);

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

  const handleStartOver = () => {
    setCurrentJobId(null);
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false);
    setGenerationStartTime(0);
    setGenerationEndTime(0);
  };
  
  const saveToDatabase = async () => {
    setIsSaving(true);
    // Save logic here
    setLastSaved(new Date());
    setIsSaving(false);
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
              isProcessing={status === 'pending' || status === 'processing'}
            />
          ) : (
            <>
              <AgentProcessingView
                steps={[{ 
                  agent: progress < 50 ? 'health-safety' : 'installer', 
                  status: status === 'complete' ? 'complete' : status === 'failed' ? 'error' : 'processing',
                  reasoning: currentStep || 'Starting...'
                }]}
                isVisible={true}
                overallProgress={progress}
                estimatedTimeRemaining={0}
                onCancel={undefined}
              />

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                  <Button
                    variant="outline"
                    onClick={handleStartOver}
                    className="mt-3"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {ramsData && methodData && (
                <div className="px-2">
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
            onClose={() => setShowCelebration(false)}
          />
        )}
      </div>
    </div>
  );
};
