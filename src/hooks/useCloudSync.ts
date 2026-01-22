// useCloudSync - Compatibility wrapper for useReportSync
// Maintains the old API while using the new best-in-class sync system
// This allows gradual migration without breaking existing components

import { useReportSync, SyncStatus } from './useReportSync';

export type { SyncStatus };

interface CloudSyncOptions {
  reportId: string | null;
  reportType: 'eicr' | 'eic' | 'minor-works';
  data: any;
  enabled: boolean;
  customerId?: string;
}

interface SyncState {
  status: 'synced' | 'syncing' | 'queued' | 'error';
  lastSyncTime?: number;
  errorMessage?: string;
  queuedChanges: number;
}

/**
 * Compatibility wrapper for the old useCloudSync API
 * Internally uses the new useReportSync hook
 */
export const useCloudSync = ({
  reportId,
  reportType,
  data,
  enabled,
  customerId,
}: CloudSyncOptions) => {
  const {
    status,
    isOnline,
    isAuthenticated,
    authCheckComplete,
    saveNow,
    loadReport,
    hasRecoverableDraft,
    draftPreview,
    recoverDraft,
    discardDraft,
  } = useReportSync({
    reportId,
    reportType,
    formData: data,
    enabled,
    customerId,
  });

  // Map new status to old syncState format
  const syncState: SyncState = {
    status: status.cloud === 'synced' ? 'synced' :
            status.cloud === 'syncing' ? 'syncing' :
            status.cloud === 'queued' || status.cloud === 'offline' ? 'queued' :
            'error',
    lastSyncTime: status.lastCloudSync?.getTime(),
    errorMessage: status.errorMessage,
    queuedChanges: status.queuedChanges,
  };

  // Wrapper for the old syncToCloud API
  const syncToCloud = async (forceSync = false): Promise<{ success: boolean; reportId: string | null }> => {
    if (!forceSync) {
      // Auto-sync is now handled internally by useReportSync
      return { success: false, reportId: null };
    }
    return await saveNow();
  };

  // Wrapper for the old loadFromCloud API
  const loadFromCloud = async (cloudReportId: string): Promise<any | null> => {
    return await loadReport(cloudReportId);
  };

  // Process offline queue - now handled automatically
  const processOfflineQueue = async () => {
    // This is now handled internally by useReportSync
    // Just a no-op for compatibility
  };

  return {
    syncState,
    syncToCloud,
    loadFromCloud,
    isOnline,
    isAuthenticated,
    authCheckComplete,
    processOfflineQueue,
    // New features exposed for gradual adoption
    hasRecoverableDraft,
    draftPreview,
    recoverDraft,
    discardDraft,
  };
};
