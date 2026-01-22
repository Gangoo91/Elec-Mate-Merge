import React from 'react';
import EICRFormTabs from '../EICRFormTabs';
import DraftHeaderActions from '../DraftHeaderActions';
import StartNewEICRDialog from '../StartNewEICRDialog';

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
  return (
    <div className="px-2 md:px-4">

      <DraftHeaderActions
        hasDraft={hasDraft}
        draftTimestamp={draftTimestamp}
        onLoadDraft={onLoadDraft}
        onStartNew={onStartNewFromDraft}
        hasUnsavedChanges={hasUnsavedChanges}
      />

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
