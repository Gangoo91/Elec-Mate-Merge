import React from 'react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { SyncStatusIndicator } from '@/components/ui/sync-status-indicator';
import { SyncStatus } from '@/hooks/useCloudSync';

interface MWFormHeaderProps {
  onBack: () => void;
  isSaving?: boolean;
  onManualSave?: () => void;
  formData?: any;
  syncState?: { status: SyncStatus; lastSyncTime?: number; errorMessage?: string };
  isOnline?: boolean;
  isAuthenticated?: boolean;
}

const MWFormHeader: React.FC<MWFormHeaderProps> = ({
  onBack,
  isSaving = false,
  onManualSave,
  formData,
  syncState,
  isOnline = true,
  isAuthenticated = false,
}) => {
  const certNumber = formData?.certificateNumber;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-white leading-tight">Minor Works</h1>
          {certNumber && (
            <p className="text-[10px] text-white font-mono mt-0.5">
              {certNumber}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {syncState && (
          <SyncStatusIndicator
            status={syncState.status}
            lastSyncTime={syncState.lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
          />
        )}
        {onManualSave && (
          <button
            onClick={onManualSave}
            disabled={isSaving || syncState?.status === 'syncing'}
            className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MWFormHeader;
