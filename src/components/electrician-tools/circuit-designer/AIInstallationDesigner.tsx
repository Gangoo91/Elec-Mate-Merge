import { useState } from 'react';
import { useAIDesigner } from '@/hooks/useAIDesigner';
import { DesignInputForm } from './DesignInputForm';
import { DesignProcessingView } from './DesignProcessingView';
import { DesignReviewEditor } from './DesignReviewEditor';
import { DesignInputs } from '@/types/installation-design';

type ViewMode = 'input' | 'processing' | 'results';

export const AIInstallationDesigner = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('input');
  const { generateDesign, resetDesign, isProcessing, designData, error, progress } = useAIDesigner();

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
    <div className="min-h-screen bg-background">
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
