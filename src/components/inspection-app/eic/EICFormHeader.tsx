import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Save, Plus, WifiOff } from 'lucide-react';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';

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
  isAuthenticated = false
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4">
      {/* Top row - Navigation and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              EIC Certificate
            </h1>
            {formData?.certificateNumber && (
              <p className="text-sm text-muted-foreground font-mono">
                {formData.certificateNumber}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Offline Badge */}
          {!isOnline && (
            <Badge variant="outline" className="text-orange-500 border-orange-500/30 bg-orange-500/10">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </Badge>
          )}
          {/* Sync Status */}
          {syncState && (
            <SyncStatusIndicator
              status={syncState.status}
              lastSyncTime={syncState.lastSyncTime}
              isOnline={isOnline}
              isAuthenticated={isAuthenticated}
              className="mr-1"
            />
          )}
          {/* New Report Button */}
          {onStartNew && (
            <Button
              variant="outline"
              size={isMobile ? "icon" : "sm"}
              onClick={onStartNew}
              className={isMobile ? "h-10 w-10" : "h-10 gap-2"}
            >
              <Plus className="h-4 w-4" />
              {!isMobile && <span>New</span>}
            </Button>
          )}
          {/* Save Button */}
          {onManualSave && (
            <Button
              variant="outline"
              size={isMobile ? "icon" : "sm"}
              onClick={onManualSave}
              disabled={isSaving || syncState?.status === 'syncing'}
              className={`${isMobile ? "h-10 w-10 bg-elec-yellow/20 border-elec-yellow/50 hover:bg-elec-yellow/30" : "h-10 gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"}`}
            >
              <Save className="h-4 w-4" />
              {!isMobile && <span>Save</span>}
            </Button>
          )}
          {/* Back Button */}
          <Button variant="outline" onClick={onBack} className="h-10 gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-base text-muted-foreground max-w-2xl">
        BS7671 Electrical Installation Certificate for New Installations
      </p>
    </div>
  );
};

export default EICFormHeader;
