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
    generateRAMS,
    reset
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
    }
  ) => {
    await generateRAMS(jobDescription, projectInfo);
    setShowResults(true);
  };

  const handleStartOver = () => {
    reset();
    setShowResults(false);
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-6xl">
      <div className="space-y-6">
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
