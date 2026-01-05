import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Plus, Save } from 'lucide-react';
import DraftHeaderActions from '../DraftHeaderActions';
import SaveStatusIndicator from '../SaveStatusIndicator';

interface EICFormHeaderWithDraftProps {
  onBack: () => void;
  hasDraft: boolean;
  draftTimestamp?: number;
  onLoadDraft: () => void;
  onStartNew: () => void;
  onManualSave: () => void;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastSaveTime?: number;
  currentReportId?: string | null;
  formData: any;
}

const EICFormHeaderWithDraft: React.FC<EICFormHeaderWithDraftProps> = ({
  onBack,
  hasDraft,
  draftTimestamp,
  onLoadDraft,
  onStartNew,
  onManualSave,
  hasUnsavedChanges,
  isSaving,
  lastSaveTime,
  currentReportId,
  formData
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            EIC - Electrical Installation Certificate
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            New Installation Certification - BS 7671:18+A3:2024
            {currentReportId && ` • Report ID: ${currentReportId}`}
            <SaveStatusIndicator 
              hasUnsavedChanges={hasUnsavedChanges}
              isSaving={isSaving}
              lastSaveTime={lastSaveTime}
            />
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onStartNew} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Start New
          </Button>
          <Button onClick={onManualSave} variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Now
          </Button>
        </div>
      </div>

      <DraftHeaderActions
        hasDraft={hasDraft}
        draftTimestamp={draftTimestamp}
        onLoadDraft={onLoadDraft}
        onStartNew={onStartNew}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};

export default EICFormHeaderWithDraft;
