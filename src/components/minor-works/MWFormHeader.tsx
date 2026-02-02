import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Save,
  Plus,
  Wrench,
  Loader2,
  FlaskConical,
  Trash2,
  MoreHorizontal,
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
import { useHaptics } from '@/hooks/useHaptics';

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
}) => {
  const isDev = import.meta.env.DEV;
  const haptics = useHaptics();

  const handleBack = () => {
    haptics.tap();
    onBack();
  };

  const handleSave = async () => {
    haptics.tap();
    if (onManualSave) {
      await onManualSave();
      haptics.success();
    }
  };

  return (
    <>
      {/* Mobile: Sticky minimal header - matches EICR native app feel */}
      <div className="lg:hidden -mx-4 bg-background/95 backdrop-blur-md sticky top-0 z-40 border-b border-border/30">
        <div className="flex items-center h-14 px-4">
          {/* Back button - large touch target */}
          <Button
            variant="ghost"
            onClick={handleBack}
            size="icon"
            className="h-14 w-14 shrink-0 -ml-4 touch-manipulation active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Title with icon */}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-elec-yellow shrink-0" />
            <span className="font-semibold truncate text-base">Minor Works</span>
          </div>

          {/* Sync status indicator */}
          {syncState && (
            <SyncStatusIndicator
              status={syncState.status}
              lastSyncTime={syncState.lastSyncTime}
              isOnline={isOnline}
              isAuthenticated={isAuthenticated}
              className="mr-1"
            />
          )}

          {/* Save button - large touch target */}
          <Button
            onClick={handleSave}
            variant="ghost"
            size="icon"
            disabled={isSaving || syncState?.status === 'syncing'}
            className="h-14 w-14 shrink-0 -mr-4 touch-manipulation active:scale-95 transition-transform"
          >
            {isSaving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
          </Button>

          {/* More options menu (Dev tools, New Certificate) */}
          {(onStartNew || isDev) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-14 w-14 shrink-0 -mr-4 touch-manipulation active:scale-95"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
                {onStartNew && (
                  <DropdownMenuItem
                    onClick={() => {
                      haptics.tap();
                      onStartNew();
                    }}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Certificate
                  </DropdownMenuItem>
                )}
                {isDev && onDevFill && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        haptics.tap();
                        onDevFill();
                      }}
                      className="gap-2 text-purple-400"
                    >
                      <FlaskConical className="h-4 w-4" />
                      Dev Fill (Test Data)
                    </DropdownMenuItem>
                    {onClearForm && (
                      <DropdownMenuItem
                        onClick={() => {
                          haptics.tap();
                          onClearForm();
                        }}
                        className="gap-2 text-orange-400"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear Form
                      </DropdownMenuItem>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Desktop: Premium card header (not sticky) */}
      <header className="hidden lg:block">
        <div className="card-premium-yellow rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Left: Back button + Icon + Title */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBack}
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
                  onClick={() => {
                    haptics.tap();
                    onStartNew();
                  }}
                  className="h-10 gap-2 border-white/20 hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleSave}
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
                  onClick={() => {
                    haptics.tap();
                    onDevFill();
                  }}
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
        </div>
      </header>
    </>
  );
};

export default MWFormHeader;
