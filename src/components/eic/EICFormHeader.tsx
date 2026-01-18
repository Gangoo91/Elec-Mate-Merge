/**
 * EIC Form Header
 *
 * Minimal header for EIC form - compact on mobile, clean toolbar on desktop.
 * Navigation is handled by the step indicator in EICFormTabs.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
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
  onManualSave,
  onStartNew,
  formData,
  syncState,
  isOnline = true,
  isAuthenticated = false,
  progressPercentage = 0,
  onOpenBoardScan
}) => {
  // Get display name - client name or certificate number
  const displayName = formData?.clientName?.trim() || formData?.certificateNumber || 'EIC';

  return (
    <>
      {/* Mobile: Compact sticky header */}
      <header className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
        <div className="flex items-center justify-between h-[52px] px-3">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl touch-manipulation text-foreground/70 hover:text-foreground hover:bg-accent/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">
                {displayName}
              </span>
              {progressPercentage > 0 && (
                <span className="text-xs text-muted-foreground">
                  {progressPercentage}% complete
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            {/* Sync Status */}
            {syncState && (
              <SyncStatusIndicator
                status={syncState.status}
                lastSyncTime={syncState.lastSyncTime}
                isOnline={isOnline}
                isAuthenticated={isAuthenticated}
                className="h-7 w-7"
              />
            )}
            {/* Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-accent/50 hover:bg-accent transition-colors touch-manipulation">
                  <MoreHorizontal className="h-5 w-5 text-foreground/70" />
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

        {/* Progress bar */}
        <div className="h-0.5 bg-border/30">
          <div
            className="h-full bg-elec-yellow transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Desktop: Clean toolbar row */}
      <header className="hidden lg:block mb-4">
        <div className="flex items-center justify-between py-3 px-1">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {displayName}
              </h1>
              {formData?.certificateNumber && formData?.clientName && (
                <p className="text-xs text-muted-foreground">
                  {formData.certificateNumber}
                </p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {syncState && (
              <SyncStatusIndicator
                status={syncState.status}
                lastSyncTime={syncState.lastSyncTime}
                isOnline={isOnline}
                isAuthenticated={isAuthenticated}
              />
            )}
            {onStartNew && (
              <Button
                variant="outline"
                size="sm"
                onClick={onStartNew}
                className="h-9 gap-1.5"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>
            )}
            <Button
              size="sm"
              onClick={onManualSave}
              disabled={isSaving || syncState?.status === 'syncing'}
              className="h-9 gap-1.5"
              variant="outline"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default EICFormHeader;
