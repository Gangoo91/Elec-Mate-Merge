import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Save, Plus, WifiOff, Camera, Zap } from 'lucide-react';
import SaveStatusIndicator from '@/components/SaveStatusIndicator';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProgressSteps, Step } from '@/components/ui/ProgressSteps';

// Progress steps for EIC form
const EIC_STEPS: Step[] = [
  { id: 'installation', label: 'Installation' },
  { id: 'inspections', label: 'Inspections' },
  { id: 'testing', label: 'Testing' },
  { id: 'declarations', label: 'Declarations' },
];

interface EICFormHeaderProps {
  onBack: () => void;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
  onManualSave?: () => void;
  onStartNew?: () => void;
  formData?: any;
  syncState?: { status: SyncStatus; lastSyncTime?: number; errorMessage?: string };
  isOnline?: boolean;
  isAuthenticated?: boolean;
  /** Current active tab index */
  currentTab?: number;
  /** Completed sections as Set of indices */
  completedSections?: Set<number>;
  /** Callback when AI Board Scanner is clicked */
  onOpenBoardScan?: () => void;
}

const EICFormHeader: React.FC<EICFormHeaderProps> = ({
  onBack,
  isSaving = false,
  hasUnsavedChanges = false,
  onManualSave,
  onStartNew,
  formData,
  syncState,
  isOnline = true,
  isAuthenticated = false,
  currentTab = 0,
  completedSections = new Set(),
  onOpenBoardScan
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4 mb-6">
        {/* Top row: Back, Title, Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            size="icon"
            className="h-10 w-10 flex-shrink-0 border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                <Zap className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              </div>
              <span>EIC Certificate</span>
            </h1>
          </div>
          {/* AI Board Scanner button - prominent on mobile */}
          {onOpenBoardScan && (
            <Button
              onClick={onOpenBoardScan}
              variant="default"
              size="icon"
              className="h-10 w-10 flex-shrink-0 bg-elec-yellow hover:bg-elec-yellow/90 text-black active:scale-[0.98]"
              aria-label="AI Board Scanner"
              title="AI Board Scanner"
            >
              <Camera className="h-5 w-5" />
            </Button>
          )}
          <Button
            onClick={onManualSave}
            disabled={isSaving || syncState?.status === 'syncing'}
            variant="outline"
            size="icon"
            className="h-10 w-10 flex-shrink-0 border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 active:scale-[0.98]"
            aria-label="Save Now"
            title="Save Now"
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress indicator */}
        <ProgressSteps
          steps={EIC_STEPS}
          currentStep={currentTab}
          completedSteps={completedSections}
          compact
        />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="space-y-4 mb-6">
      {/* Main header row */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Zap className="h-5 w-5 text-elec-yellow" />
            </div>
            <span>EIC - Electrical Installation Certificate</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            BS7671:2018 New Installation Certificate
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {syncState && (
            <SyncStatusIndicator
              status={syncState.status}
              lastSyncTime={syncState.lastSyncTime}
              isOnline={isOnline}
              isAuthenticated={isAuthenticated}
              className="mr-2"
            />
          )}
          {/* AI Board Scanner button - hero action */}
          {onOpenBoardScan && (
            <Button
              onClick={onOpenBoardScan}
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold gap-2 active:scale-[0.98]"
            >
              <Camera className="h-4 w-4" />
              AI Board Scanner
            </Button>
          )}
          {onStartNew && (
            <Button
              onClick={onStartNew}
              variant="outline"
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          )}
          <Button
            onClick={onManualSave}
            disabled={isSaving || syncState?.status === 'syncing'}
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 active:scale-[0.98]"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Progress steps */}
      <div className="max-w-2xl">
        <ProgressSteps
          steps={EIC_STEPS}
          currentStep={currentTab}
          completedSteps={completedSections}
        />
      </div>
    </div>
  );
};

export default EICFormHeader;
