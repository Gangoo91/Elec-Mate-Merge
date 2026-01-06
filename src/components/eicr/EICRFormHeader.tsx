import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Plus, Zap } from 'lucide-react';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProgressSteps, Step } from '@/components/ui/ProgressSteps';

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
  onOpenBoardScan?: () => void; // Keep prop for compatibility but don't render button
}

const EICR_STEPS: Step[] = [
  { id: 'details', label: 'Details' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'testing', label: 'Testing' },
  { id: 'declaration', label: 'Declaration' },
];

const EICRFormHeader: React.FC<EICRFormHeaderProps> = ({
  onBack,
  currentReportId,
  isSaving,
  onStartNew,
  onManualSave,
  syncStatus = 'synced',
  lastSyncTime,
  isOnline = true,
  isAuthenticated = false,
  currentTab = 0,
  completedSections = new Set(),
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-3">
        {/* Compact header row */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={onBack}
            size="icon"
            className="h-9 w-9 shrink-0 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow shrink-0" />
            <span className="font-semibold truncate">EICR</span>
          </div>

          <SyncStatusIndicator
            status={syncStatus}
            lastSyncTime={lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
            className="shrink-0"
          />

          <Button
            onClick={onManualSave}
            disabled={isSaving || syncStatus === 'syncing'}
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 -mr-2"
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress indicator */}
        <ProgressSteps
          steps={EICR_STEPS}
          currentStep={currentTab}
          completedSteps={completedSections}
          compact
        />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          size="sm"
          className="gap-1.5 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-2 flex-1">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <h1 className="text-lg font-semibold">EICR - Condition Report</h1>
          {currentReportId && (
            <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded">
              {currentReportId}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SyncStatusIndicator
            status={syncStatus}
            lastSyncTime={lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
          />
          <Button
            onClick={onStartNew}
            variant="outline"
            size="sm"
            className="border-border/50"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            New
          </Button>
          <Button
            onClick={onManualSave}
            disabled={isSaving || syncStatus === 'syncing'}
            variant="outline"
            size="sm"
            className="border-border/50"
          >
            <Save className="h-4 w-4 mr-1.5" />
            Save
          </Button>
        </div>
      </div>

      {/* Progress steps */}
      <ProgressSteps
        steps={EICR_STEPS}
        currentStep={currentTab}
        completedSteps={completedSections}
      />
    </div>
  );
};

export default EICRFormHeader;
