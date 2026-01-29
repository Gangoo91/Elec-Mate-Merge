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
  onOpenBoardScan?: () => void;
  initialTab?: 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';
  currentTab?: 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';
  onTabChange?: (tab: string) => void;
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
  onConfirmDuplicate,
  onOpenBoardScan,
  initialTab,
  currentTab,
  onTabChange
}) => {
  return (
    <div>
      <DraftHeaderActions
        hasDraft={hasDraft}
        draftTimestamp={draftTimestamp}
        onLoadDraft={onLoadDraft}
        onStartNew={onStartNewFromDraft}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <EICRFormTabs
        formData={formData}
        onUpdate={onUpdate}
        onOpenBoardScan={onOpenBoardScan}
        initialTab={initialTab}
        currentTab={currentTab}
        onTabChange={onTabChange}
      />

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
