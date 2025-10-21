import { useState } from 'react';
import { useAIDesigner } from '@/hooks/useAIDesigner';
import { DesignInputForm } from './DesignInputForm';
import { DesignProcessingView } from './DesignProcessingView';
import { DesignReviewEditor } from './DesignReviewEditor';
import { DesignInputs } from '@/types/installation-design';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';

type ViewMode = 'input' | 'processing' | 'results';

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
      setCurrentView('input');
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

      {currentView === 'results' && designData && (
        <DesignReviewEditor design={designData} onReset={handleReset} />
      )}
    </div>
  );
};
