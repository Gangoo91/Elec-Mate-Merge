import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  FileText,
  Save,
  Plus,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

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
  currentTabLabel?: string;
  progressPercentage?: number;
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
  currentTabLabel = 'EICR Report',
  progressPercentage = 0,
}) => {
  const isMobile = useIsMobile();

  // Get display name - client name or default
  const displayName = formData.clientName?.trim() || 'EICR Report';

  return (
    <>
      {/* Mobile: Compact sticky header */}
      <header className="lg:hidden eicr-header-compact">
        <div className="flex items-center justify-between h-[52px] px-4">
          {/* Left: Back + Context */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl ios-pressable text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate max-w-[160px]">
                {displayName}
              </span>
              <span className="text-xs text-white/50">
                {currentTabLabel} {progressPercentage > 0 && `- ${progressPercentage}%`}
              </span>
            </div>
          </div>

          {/* Right: Status + Actions */}
          <div className="flex items-center gap-2">
            <SyncStatusIndicator
              status={syncStatus}
              lastSyncTime={lastSyncTime}
              isOnline={isOnline}
              isAuthenticated={isAuthenticated}
              className="h-7 w-7"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="min-h-[44px] min-w-[44px] sm:h-9 sm:w-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 active:scale-95 transition-all touch-manipulation ios-pressable">
                  <MoreHorizontal className="h-5 w-5 text-white/80" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
                <DropdownMenuItem onClick={onStartNew} className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Report
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onManualSave}
                  disabled={isSaving}
                  className="gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Now
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Progress bar below header */}
        <div className="h-0.5 bg-white/5">
          <div
            className="h-full bg-elec-yellow transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Desktop: Premium card header (not sticky) */}
      <header className="hidden lg:block">
        <div className="card-premium-yellow rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Left: Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-elec-yellow/15 icon-glow-yellow">
                <FileText className="h-7 w-7 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  EICR Report
                </h1>
                <p className="text-sm text-white/60 mt-0.5">
                  BS7671 Periodic Inspection & Testing Certificate
                </p>
                {currentReportId && (
                  <p className="text-xs font-mono text-white/40 mt-1">
                    ID: {currentReportId.slice(0, 8)}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <SyncStatusIndicator
                status={syncStatus}
                lastSyncTime={lastSyncTime}
                isOnline={isOnline}
                isAuthenticated={isAuthenticated}
                className="mr-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={onStartNew}
                className="h-10 gap-2 border-white/20 hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>
              <Button
                size="sm"
                onClick={onManualSave}
                disabled={isSaving || syncStatus === 'syncing'}
                className="h-10 gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onBack}
                className="h-10 w-10 border-white/20 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop progress bar */}
          {progressPercentage > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span>Overall Progress</span>
                <span className="text-elec-yellow font-medium">{progressPercentage}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default EICRFormHeader;
