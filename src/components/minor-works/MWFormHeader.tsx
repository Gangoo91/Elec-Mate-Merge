import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  FileText,
  Save,
  Plus,
  MoreHorizontal,
  Loader2,
  Wrench,
  FlaskConical,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';

interface MWFormHeaderProps {
  onBack: () => void;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
  onManualSave?: () => void;
  onStartNew?: () => void;
  onDevFill?: () => void;
  onClearForm?: () => void;
  formData?: any;
  syncState?: { status: SyncStatus; lastSyncTime?: number; errorMessage?: string };
  isOnline?: boolean;
  isAuthenticated?: boolean;
  currentTabLabel?: string;
  progressPercentage?: number;
}

const MWFormHeader: React.FC<MWFormHeaderProps> = ({
  onBack,
  isSaving = false,
  hasUnsavedChanges = false,
  onManualSave,
  onStartNew,
  onDevFill,
  onClearForm,
  formData,
  syncState,
  isOnline = true,
  isAuthenticated = false,
  currentTabLabel = 'Minor Works',
  progressPercentage = 0
}) => {
  // Check if in development mode
  const isDev = import.meta.env.DEV;
  // Get display name - client name or default
  const displayName = formData?.clientName?.trim() || 'Minor Works Certificate';

  return (
    <>
      {/* Mobile: Compact header - scrolls with content */}
      <header className="lg:hidden bg-background border-b border-white/10">
        <div className="flex items-center justify-between h-[56px] px-4">
          {/* Left: Back + Context */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl ios-pressable text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate max-w-[180px]">
                {displayName}
              </span>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span>{currentTabLabel} {progressPercentage > 0 && `- ${progressPercentage}%`}</span>
                {syncState && syncState.status === 'synced' && (
                  <span className="text-green-400">• Synced</span>
                )}
                {syncState && syncState.status === 'syncing' && (
                  <span className="text-blue-400">• Syncing</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions + Status */}
          <div className="flex items-center gap-2">
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
                {isDev && onDevFill && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onDevFill} className="gap-2 text-purple-400">
                      <FlaskConical className="h-4 w-4" />
                      Dev Fill (Test Data)
                    </DropdownMenuItem>
                    {onClearForm && (
                      <DropdownMenuItem onClick={onClearForm} className="gap-2 text-orange-400">
                        <Trash2 className="h-4 w-4" />
                        Clear Form
                      </DropdownMenuItem>
                    )}
                  </>
                )}
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
            {/* Left: Back button + Icon + Title */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onBack}
                className="h-10 w-10 border-white/20 hover:bg-white/10"
                title="Back to Inspection & Testing Hub"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="p-3 rounded-xl bg-elec-yellow/15 icon-glow-yellow">
                <Wrench className="h-7 w-7 text-elec-yellow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Minor Works Certificate
                </h1>
                <p className="text-sm text-white/60 mt-0.5">
                  BS7671 Minor Electrical Installation Works
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
              {isDev && onDevFill && (
                <Button
                  size="sm"
                  onClick={onDevFill}
                  className="h-10 gap-2 border-purple-500/50 hover:bg-purple-500/20 text-purple-400"
                  variant="outline"
                  title="Fill with test data (dev only)"
                >
                  <FlaskConical className="h-4 w-4" />
                  Dev Fill
                </Button>
              )}
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

export default MWFormHeader;
