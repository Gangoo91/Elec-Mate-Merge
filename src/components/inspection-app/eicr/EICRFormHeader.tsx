import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Save, Plus, HelpCircle, Settings } from 'lucide-react';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
              EICR Report
            </h1>
            {currentReportId && (
              <p className="text-sm text-muted-foreground font-mono">
                ID: {currentReportId.slice(0, 8)}...
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Sync Status */}
          <SyncStatusIndicator
            status={syncStatus}
            lastSyncTime={lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
            className="mr-1"
          />
          {/* New Report Button */}
          <Button
            variant="outline"
            size={isMobile ? "icon" : "sm"}
            onClick={onStartNew}
            className={isMobile ? "h-10 w-10" : "h-10 gap-2"}
          >
            <Plus className="h-4 w-4" />
            {!isMobile && <span>New</span>}
          </Button>
          {/* Save Button */}
          <Button
            variant="outline"
            size={isMobile ? "icon" : "sm"}
            onClick={onManualSave}
            disabled={isSaving || syncStatus === 'syncing'}
            className={`${isMobile ? "h-10 w-10 bg-elec-yellow/20 border-elec-yellow/50 hover:bg-elec-yellow/30" : "h-10 gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"}`}
          >
            <Save className="h-4 w-4" />
            {!isMobile && <span>Save</span>}
          </Button>
          {/* Back Button */}
          <Button variant="outline" onClick={onBack} className="h-10 gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-base text-muted-foreground max-w-2xl">
        BS7671 Periodic Inspection & Testing Certificate
      </p>
    </div>
  );
};

export default EICRFormHeader;
