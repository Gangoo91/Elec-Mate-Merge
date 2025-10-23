import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AIRAMSInput } from './AIRAMSInput';
import { AgentProcessingView } from './AgentProcessingView';
import { RAMSReviewEditor } from './RAMSReviewEditor';
import { CompletionCelebration } from './CompletionCelebration';
import { useAIRAMS } from './useAIRAMS';
import { triggerHaptic } from '@/utils/animation-helpers';

export const AIRAMSGenerator: React.FC = () => {
  const navigate = useNavigate();
  const {
    isProcessing,
    reasoningSteps,
    ramsData,
    methodData,
    error,
    isSaving,
    lastSaved,
    overallProgress,
    estimatedTimeRemaining,
    rawHSResponse,
    rawInstallerResponse,
    generateRAMS,
    saveToDatabase,
    reset,
    cancelGeneration
  } = useAIRAMS();

  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);
  const [generationEndTime, setGenerationEndTime] = useState<number>(0);

  // Trigger celebration when generation completes
  useEffect(() => {
    if (ramsData && methodData && !isProcessing && showResults && !celebrationShown) {
      setGenerationEndTime(Date.now());
      setShowCelebration(true);
      setCelebrationShown(true); // Mark as shown
      triggerHaptic([100, 50, 100, 50, 200]); // Victory haptic pattern
    }
  }, [ramsData, methodData, isProcessing, showResults, celebrationShown]);

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
    setShowResults(true); // Show processing view immediately
    setShowCelebration(false); // Reset celebration
    setCelebrationShown(false); // Reset for new generation
    await generateRAMS(jobDescription, projectInfo, jobScale);
  };

  const handleStartOver = () => {
    reset();
    setShowResults(false);
    setShowCelebration(false);
    setCelebrationShown(false); // Reset for new generation
    setGenerationStartTime(0);
    setGenerationEndTime(0);
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
        <div className="mb-6 sm:mb-8 space-y-4 px-2 sm:px-0">
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              <span className="bg-gradient-to-r from-elec-yellow via-yellow-400 to-elec-yellow bg-clip-text text-transparent animate-pulse-glow">
                AI RAMS Generator
              </span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 max-w-3xl leading-relaxed">
              Generate professional Risk Assessments and Method Statements in minutes using advanced AI
            </p>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent" />
        </div>

        <div className="space-y-6 md:space-y-8">
          {!showResults ? (
            <AIRAMSInput
              onGenerate={handleGenerate}
              isProcessing={isProcessing}
            />
          ) : (
            <>
              <AgentProcessingView
                steps={reasoningSteps}
                isVisible={true}
                overallProgress={overallProgress}
                estimatedTimeRemaining={estimatedTimeRemaining}
                onCancel={isProcessing ? cancelGeneration : undefined}
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
                    rawHSResponse={rawHSResponse}
                    rawInstallerResponse={rawInstallerResponse}
                  />
                </div>
              )}

              {!isProcessing && ramsData && (
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
