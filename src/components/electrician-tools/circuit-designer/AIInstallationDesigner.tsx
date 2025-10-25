import { useState } from 'react';
import { useAIDesigner } from '@/hooks/useAIDesigner';
import { DesignInputForm } from './DesignInputForm';
import { DesignProcessingView } from './DesignProcessingView';
import { DesignReviewEditor } from './DesignReviewEditor';
import { DesignInputs } from '@/types/installation-design';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'input' | 'processing' | 'results' | 'validation-error';

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('input');
  const { generateDesign, resetDesign, isProcessing, designData, error, progress } = useAIDesigner();

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    // Pre-fill form with context from another agent
    if (contextData?.design || contextData?.circuits) {
      // Load design context if available
      console.log('Loaded context from another agent:', contextData, instruction);
    }
  };

  const handleGenerate = async (inputs: DesignInputs) => {
    setCurrentView('processing');
    const success = await generateDesign(inputs);
    if (success) {
      setCurrentView('results');
    } else {
      // PHASE 6: Check if it's a validation error
      if (error && error.includes('NON_COMPLIANT_DESIGN')) {
        setCurrentView('validation-error');
      } else {
        setCurrentView('input');
      }
    }
  };

  const handleReset = () => {
    resetDesign();
    setCurrentView('input');
  };

  return (
    <div className="min-h-screen bg-background space-y-6">
      {/* Agent Inbox */}
      <AgentInbox currentAgent="designer" onTaskAccept={handleTaskAccept} />

      {currentView === 'input' && (
        <DesignInputForm onGenerate={handleGenerate} isProcessing={isProcessing} />
      )}

      {currentView === 'processing' && (
        <DesignProcessingView progress={progress} />
      )}

      {/* PHASE 6: Validation Error Display */}
      {currentView === 'validation-error' && error && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Design Non-Compliant with BS 7671</AlertTitle>
            <AlertDescription className="mt-3 whitespace-pre-line text-sm">
              {error}
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={handleReset} variant="outline">
              Adjust Parameters
            </Button>
          </div>
        </div>
      )}

      {currentView === 'results' && designData && (
        <DesignReviewEditor design={designData} onReset={handleReset} />
      )}
    </div>
  );
};
