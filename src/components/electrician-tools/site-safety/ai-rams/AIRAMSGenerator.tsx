import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AIRAMSInput } from './AIRAMSInput';
import { AgentProcessingView } from './AgentProcessingView';
import { RAMSReviewEditor } from './RAMSReviewEditor';
import { useAIRAMS } from './useAIRAMS';

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
    generateRAMS,
    saveToDatabase,
    reset,
    cancelGeneration
  } = useAIRAMS();

  const [showResults, setShowResults] = useState(false);

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
    setShowResults(true); // Show processing view immediately
    await generateRAMS(jobDescription, projectInfo, jobScale);
  };

  const handleStartOver = () => {
    reset();
    setShowResults(false);
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
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
                <RAMSReviewEditor
                  ramsData={ramsData}
                  methodData={methodData}
                  isSaving={isSaving}
                  lastSaved={lastSaved}
                  onSave={() => saveToDatabase()}
                  onUpdate={(rams, method) => {
                    // Update handled by internal state
                  }}
                />
              )}

              {!isProcessing && ramsData && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleStartOver}
                    className="border-primary/30"
                  >
                    Generate Another RAMS
                  </Button>
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
};
