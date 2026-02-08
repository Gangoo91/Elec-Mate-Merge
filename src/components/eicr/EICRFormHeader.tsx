import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Plus, Zap } from 'lucide-react';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

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
  currentTab?: number;
  completedSections?: Set<number>;
  onOpenBoardScan?: () => void;
  onTabChange?: (tabIndex: number) => void;
}

/**
 * EICRFormHeader - Clean header with back/save buttons only
 * Tab navigation is handled by SmartTabs below
 */
const EICRFormHeader: React.FC<EICRFormHeaderProps> = ({
  onBack,
  currentReportId,
  isSaving,
  onStartNew,
  onManualSave,
  formData,
  syncStatus = 'synced',
  lastSyncTime,
  isOnline = true,
  isAuthenticated = false,
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  const handleBack = () => {
    haptics.tap();
    onBack();
  };

  const handleSave = async () => {
    haptics.tap();
    await onManualSave();
    haptics.success();
  };

  if (isMobile) {
    return (
      <div className="-mx-4 bg-background/95 backdrop-blur-md sticky top-0 z-40 border-b border-border/30">
        <div className="flex items-center h-14 px-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            size="icon"
            className="h-14 w-14 shrink-0 -ml-4 touch-manipulation active:scale-95 transition-transform rounded-none"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow shrink-0" />
            <span className="font-semibold truncate text-base">EICR</span>
          </div>

          <SyncStatusIndicator
            status={syncStatus}
            lastSyncTime={lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
            className="shrink-0 mr-2"
          />

          <Button
            onClick={handleSave}
            disabled={isSaving || syncStatus === 'syncing'}
            variant="ghost"
            size="icon"
            className="h-14 w-14 shrink-0 -mr-4 touch-manipulation active:scale-95 transition-transform rounded-none"
          >
            <Save className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Desktop layout - clean professional header
  return (
    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/30">
      <Button
        variant="ghost"
        onClick={handleBack}
        size="sm"
        className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <Zap className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-semibold leading-tight">EICR - Condition Report</h1>
          {formData?.certificateNumber && (
            <span className="text-xs text-muted-foreground font-mono">
              {formData.certificateNumber}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SyncStatusIndicator
          status={syncStatus}
          lastSyncTime={lastSyncTime}
          isOnline={isOnline}
          isAuthenticated={isAuthenticated}
        />
        <Button
          onClick={() => { haptics.tap(); onStartNew(); }}
          variant="outline"
          size="sm"
          className="border-border/40 hover:border-border/60"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          New
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving || syncStatus === 'syncing'}
          size="sm"
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
        >
          <Save className="h-4 w-4 mr-1.5" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default EICRFormHeader;
