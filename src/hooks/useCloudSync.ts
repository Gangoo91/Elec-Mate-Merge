// useCloudSync - Compatibility wrapper for useReportSync
// Maintains the old API while using the new best-in-class sync system
// This allows gradual migration without breaking existing components

import { useCallback } from 'react';
import { useReportSync, SyncStatus, SyncNowImmediateResult } from './useReportSync';

export type { SyncStatus, SyncNowImmediateResult };

interface CloudSyncOptions {
  reportId: string | null;
  reportType: 'eicr' | 'eic' | 'minor-works';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  enabled: boolean;
  customerId?: string;
  onReportCreated?: (reportId: string) => void; // Called when auto-sync creates a new report
  /**
   * When true, skip autosave while the form is loading from the cloud. Prevents the
   * initial blank React state from overwriting real data before hydration completes.
   * Pass the same boolean you use to gate your UI loading spinner.
   */
  isHydrating?: boolean;
}

interface SyncState {
  status: 'synced' | 'syncing' | 'queued' | 'error';
  lastSyncTime?: number;
  lastLocalSave?: number;
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
  onReportCreated,
  isHydrating,
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
    syncNow,
    syncNowImmediate,
    onTabChange,
    retrySync,
  } = useReportSync({
    reportId,
    reportType,
    formData: data,
    enabled,
    customerId,
    onReportCreated,
    isHydrating,
  });

  // Map new status to old syncState format
  // 'unsaved' is mapped to 'queued' for backwards compatibility
  // 'conflict' is also mapped to 'queued' (not 'error') since local data is safe
  const syncState: SyncState = {
    status:
      status.cloud === 'synced'
        ? 'synced'
        : status.cloud === 'syncing'
          ? 'syncing'
          : status.cloud === 'unsaved'
            ? 'queued' // Map unsaved to queued for old consumers
            : status.cloud === 'queued' || status.cloud === 'offline' || status.cloud === 'conflict'
              ? 'queued'
              : 'error',
    lastSyncTime: status.lastCloudSync?.getTime(),
    lastLocalSave: status.lastLocalSave?.getTime(), // Expose local save time
    errorMessage: status.errorMessage,
    queuedChanges: status.queuedChanges,
  };

  // Wrapper for the old syncToCloud API
  const syncToCloud = useCallback(
    async (forceSync = false): Promise<{ success: boolean; reportId: string | null }> => {
      if (!forceSync) {
        return { success: false, reportId: null };
      }
      return await saveNow();
    },
    [saveNow]
  );

  // Wrapper for the old loadFromCloud API - now returns { data, databaseId }
  const loadFromCloud = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (cloudReportId: string): Promise<{ data: any; databaseId: string | null } | null> => {
      return await loadReport(cloudReportId);
    },
    [loadReport]
  );

  /*
   * Retry the queued writes.
   *
   * This was a no-op — "handled internally by useReportSync", per the comment
   * that used to be here. But it is what the offline banner's "Retry Now"
   * button calls, so the one action offered to an electrician whose work has
   * not reached the server did nothing at all, on a banner whose whole purpose
   * was to tell them that. `useReportSync.retrySync` is the real thing: it
   * re-attempts the cloud write and drains the queue.
   */
  const processOfflineQueue = retrySync;

  return {
    syncState,
    // ELE-1446 — the raw useReportSync status, unflattened.
    // `syncState.status` above collapses unsaved / queued / offline / conflict
    // into a single 'queued', which is lossy: a never-saved draft and work that
    // failed to reach the cloud become indistinguishable. Consumers that want
    // to tell those apart (the cert shell header) read this instead.
    cloudStatus: status,
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
    // Immediate sync functions
    syncNow,
    syncNowImmediate, // For PDF generation - returns the saved data
    onTabChange,
  };
};
