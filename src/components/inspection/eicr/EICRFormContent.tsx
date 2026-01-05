import React from 'react';
import EICRFormTabs from '../EICRFormTabs';
import DraftHeaderActions from '../DraftHeaderActions';
import StartNewEICRDialog from '../StartNewEICRDialog';
import QuickRcdPresets from '../QuickRcdPresets';

interface EICRFormContentProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  hasDraft: boolean;
  draftTimestamp: number;
  onLoadDraft: () => void;
  onStartNewFromDraft: () => void;
  hasUnsavedChanges: boolean;
  showStartNewDialog: boolean;
  onCloseStartNewDialog: () => void;
  onConfirmStartNew: () => void;
  onConfirmDuplicate?: () => void;
}

const EICRFormContent: React.FC<EICRFormContentProps> = ({
  formData,
  onUpdate,
  hasDraft,
  draftTimestamp,
  onLoadDraft,
  onStartNewFromDraft,
  hasUnsavedChanges,
  showStartNewDialog,
  onCloseStartNewDialog,
  onConfirmStartNew,
  onConfirmDuplicate
}) => {
  const handleApplyRcdPreset = (circuitIds: string[], preset: any) => {
    const currentResults = formData.testResults || [];
    const updatedResults = currentResults.map((result: any) => {
      if (circuitIds.includes(result.id)) {
        return {
          ...result,
          rcdBsStandard: preset.bsStandard,
          rcdType: preset.type,
          rcdRating: preset.rating,
          rcdRatingA: preset.ratingA,
        };
      }
      return result;
    });
    onUpdate('testResults', updatedResults);
  };

  return (
    <div className="px-2 md:px-4">

      <DraftHeaderActions
        hasDraft={hasDraft}
        draftTimestamp={draftTimestamp}
        onLoadDraft={onLoadDraft}
        onStartNew={onStartNewFromDraft}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {formData.testResults && formData.testResults.length > 0 && (
        <div className="mb-6">
          <QuickRcdPresets 
            testResults={formData.testResults}
            onApplyToCircuits={handleApplyRcdPreset}
          />
        </div>
      )}

      <EICRFormTabs formData={formData} onUpdate={onUpdate} />

      <StartNewEICRDialog
        isOpen={showStartNewDialog}
        onClose={onCloseStartNewDialog}
        onConfirm={onConfirmStartNew}
        onDuplicate={onConfirmDuplicate}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};

export default EICRFormContent;
