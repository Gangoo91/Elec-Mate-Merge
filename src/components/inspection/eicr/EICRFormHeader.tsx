import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Save, Plus } from 'lucide-react';
import SaveStatusIndicator from '../SaveStatusIndicator';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';

interface EICRFormHeaderProps {
  onBack: () => void;
  currentReportId: string | null;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastSaveTime: number | undefined;
  onStartNew: () => void;
  onManualSave: () => Promise<void>;
  formData: any;
  syncStatus?: SyncStatus;
  lastSyncTime?: number;
  isOnline?: boolean;
  isAuthenticated?: boolean;
}

const EICRFormHeader: React.FC<EICRFormHeaderProps> = ({
  onBack,
  currentReportId,
  hasUnsavedChanges,
  isSaving,
  lastSaveTime,
  onStartNew,
  onManualSave,
  formData,
  syncStatus = 'synced',
  lastSyncTime,
  isOnline = true,
  isAuthenticated = false,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-2 flex-shrink-0 hover:bg-accent/10 transition-colours duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold tracking-tight flex items-center gap-2 flex-wrap">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm">
              <FileText className="h-4 w-4 text-black flex-shrink-0" />
            </div>
            <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
              EICR Report
            </span>
          </h1>
          {currentReportId && (
            <div className="text-xs text-muted-foreground">
              <span className="truncate">ID: {currentReportId}</span>
            </div>
          )}
        </div>
        <Button
          onClick={onStartNew}
          variant="outline"
          size="sm"
          className="h-11 w-11 p-2 flex-shrink-0 border-border hover:bg-accent/10 hover:border-border transition-all duration-200 touch-manipulation"
          aria-label="Start New Report"
          title="Start New"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          onClick={onManualSave}
          disabled={isSaving || syncStatus === 'syncing'}
          variant="outline"
          size="sm"
          className="h-11 w-11 p-2 flex-shrink-0 border-border hover:bg-accent/10 hover:border-border transition-all duration-200 touch-manipulation"
          aria-label="Save Now"
          title="Save Now"
        >
          <Save className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="h-11 p-2 hover:bg-accent/10 active:scale-[0.98] transition-transform transition-colours duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-lg lg:text-xl font-bold tracking-tight flex items-center gap-3 flex-wrap">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm">
            <FileText className="h-5 w-5 text-black" />
          </div>
          <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
            EICR - Electrical Installation Condition Report
          </span>
        </h1>
        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
          <span className="font-medium">BS7671 Periodic Inspection & Testing Certificate</span>
          {currentReportId && (
            <>
              <span className="text-yellow-500">•</span>
              <span className="font-mono text-xs bg-muted/50 px-2 py-0.5 rounded border border-border">
                Report ID: {currentReportId}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <SyncStatusIndicator
          status={syncStatus}
          lastSyncTime={lastSyncTime}
          isOnline={isOnline}
          isAuthenticated={isAuthenticated}
          className="mr-2"
        />
        <Button
          onClick={onStartNew}
          variant="outline"
          size="sm"
          className="h-11 border-border hover:bg-accent/10 hover:border-border font-medium active:scale-[0.98] transition-transform transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Start New
        </Button>
        <Button
          onClick={onManualSave}
          disabled={isSaving || syncStatus === 'syncing'}
          variant="outline"
          size="sm"
          className="h-11 elec-gradient-bg hover:shadow-lg text-black font-semibold active:scale-[0.98] transition-transform transition-all duration-200 hover:scale-[1.02]"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Now
        </Button>
      </div>
    </div>
  );
};

export default EICRFormHeader;
