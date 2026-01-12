import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  FileText,
  Save,
  Plus,
  MoreHorizontal,
  Loader2,
  Camera,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { cn } from '@/lib/utils';

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
  currentTab?: number;
  currentTabLabel?: string;
  progressPercentage?: number;
  completedSections?: Set<number>;
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
  currentTabLabel = 'EIC Certificate',
  progressPercentage = 0,
  completedSections = new Set(),
  onOpenBoardScan
}) => {
  // Get display name - client name or default
  const displayName = formData?.clientName?.trim() || 'EIC Certificate';

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
            {/* AI Board Scanner - hero action on mobile */}
            {onOpenBoardScan && (
              <button
                onClick={onOpenBoardScan}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors ios-pressable"
                aria-label="AI Board Scanner"
              >
                <Camera className="h-5 w-5 text-black" />
              </button>
            )}
            {syncState && (
              <SyncStatusIndicator
                status={syncState.status}
                lastSyncTime={syncState.lastSyncTime}
                isOnline={isOnline}
                isAuthenticated={isAuthenticated}
                className="h-7 w-7"
              />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors ios-pressable">
                  <MoreHorizontal className="h-5 w-5 text-white/80" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
                {onStartNew && (
                  <DropdownMenuItem onClick={onStartNew} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Certificate
                  </DropdownMenuItem>
                )}
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
                <Zap className="h-7 w-7 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  EIC Certificate
                </h1>
                <p className="text-sm text-white/60 mt-0.5">
                  BS7671 Electrical Installation Certificate
                </p>
                {formData?.certificateNumber && (
                  <p className="text-xs font-mono text-white/40 mt-1">
                    {formData.certificateNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {syncState && (
                <SyncStatusIndicator
                  status={syncState.status}
                  lastSyncTime={syncState.lastSyncTime}
                  isOnline={isOnline}
                  isAuthenticated={isAuthenticated}
                  className="mr-1"
                />
              )}
              {/* AI Board Scanner - hero action */}
              {onOpenBoardScan && (
                <Button
                  onClick={onOpenBoardScan}
                  className="h-10 gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                >
                  <Camera className="h-4 w-4" />
                  AI Board Scanner
                </Button>
              )}
              {onStartNew && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onStartNew}
                  className="h-10 gap-2 border-white/20 hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              )}
              <Button
                size="sm"
                onClick={onManualSave}
                disabled={isSaving || syncState?.status === 'syncing'}
                className="h-10 gap-2 border-white/20 hover:bg-white/10"
                variant="outline"
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

export default EICFormHeader;
