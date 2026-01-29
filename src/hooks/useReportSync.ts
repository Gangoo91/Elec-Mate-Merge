// useReportSync - Best-in-Class Report Sync Hook
// Local-first, offline-capable, never loses data
// With concurrent edit detection using optimistic locking

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { reportCloud, VersionConflict } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import { syncQueue, SyncOperation } from '@/utils/syncQueue';

// === TYPES ===

export interface SyncStatus {
  local: 'saved' | 'saving' | 'unsaved';
  cloud: 'synced' | 'syncing' | 'unsaved' | 'queued' | 'offline' | 'error' | 'conflict';
  lastLocalSave: Date | null;
  lastCloudSync: Date | null;
  queuedChanges: number;
  errorMessage?: string;
}

interface UseReportSyncOptions {
  reportId: string | null;
  reportType: 'eicr' | 'eic' | 'minor-works';
  formData: any;
  enabled?: boolean;
  customerId?: string;
  onConflict?: (conflict: VersionConflict, localData: any) => void;
  onReportCreated?: (reportId: string) => void;  // Called when auto-sync creates a new report
}

interface UseReportSyncReturn {
  // Status
  status: SyncStatus;
  isOnline: boolean;
  isAuthenticated: boolean;
  authCheckComplete: boolean;

  // Actions
  saveNow: () => Promise<{ success: boolean; reportId: string | null }>;
  saveInitialDraft: () => void;
  loadReport: (id: string) => Promise<{ data: any; databaseId: string | null } | null>;
  recoverDraft: () => any | null;
  discardDraft: () => void;
  forceSave: () => Promise<{ success: boolean; reportId: string | null }>;
  retrySync: () => Promise<void>;
  syncNow: () => Promise<{ success: boolean; reportId: string | null }>;  // Immediate sync (cancels debounce)
  onTabChange: () => void;  // Trigger sync on tab change

  // Draft recovery
  hasRecoverableDraft: boolean;
  draftPreview: { clientName?: string; installationAddress?: string; lastModified: Date } | null;

  // Conflict resolution
  activeConflict: VersionConflict | null;
  resolveConflict: (useServerVersion: boolean) => void;
}

// === HOOK ===

export const useReportSync = ({
  reportId,
  reportType,
  formData,
  enabled = true,
  customerId,
  onConflict,
  onReportCreated,
}: UseReportSyncOptions): UseReportSyncReturn => {
  const { toast } = useToast();

  // === STATE ===
  // CRITICAL: New reports start as 'unsaved' - they haven't synced to cloud yet
  const [status, setStatus] = useState<SyncStatus>({
    local: 'unsaved',
    cloud: 'unsaved',  // Fixed: was 'synced' which broke auto-sync for new reports
    lastLocalSave: null,
    lastCloudSync: null,
    queuedChanges: 0,
    errorMessage: undefined,
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasRecoverableDraft, setHasRecoverableDraft] = useState(false);
  const [draftPreview, setDraftPreview] = useState<{ clientName?: string; installationAddress?: string; lastModified: Date } | null>(null);
  const [activeConflict, setActiveConflict] = useState<VersionConflict | null>(null);

  // Refs for tracking changes and preventing race conditions
  const lastFormDataRef = useRef<string>('');
  const isSyncingRef = useRef(false);
  const currentReportIdRef = useRef(reportId);
  const expectedVersionRef = useRef<number>(1);
  const localDataRef = useRef<any>(null);

  // Keep reportId ref in sync
  useEffect(() => {
    currentReportIdRef.current = reportId;
  }, [reportId]);

  // === AUTH CHECK ===
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setUserId(session?.user?.id || null);
      setAuthCheckComplete(true);  // Set AFTER auth check completes
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // === ONLINE/OFFLINE STATUS ===
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Process queue when coming back online
      if (userId) {
        setTimeout(() => processQueue(), 1000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStatus(prev => ({ ...prev, cloud: 'offline' }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userId]);

  // === CHECK FOR RECOVERABLE DRAFT ON MOUNT ===
  useEffect(() => {
    if (!reportId && enabled) {
      const recoverable = draftStorage.hasRecoverableDraft(reportType);
      setHasRecoverableDraft(recoverable);

      if (recoverable) {
        const preview = draftStorage.getDraftPreview(reportType);
        if (preview) {
          setDraftPreview({
            clientName: preview.clientName,
            installationAddress: preview.installationAddress || preview.propertyAddress,
            lastModified: preview.lastModified,
          });
        }
      }
    }
  }, [reportType, reportId, enabled]);

  // === AUTO-SAVE TO LOCAL (every 10 seconds) ===
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      // Check if form data has changed
      const currentData = JSON.stringify(formData);
      if (currentData !== lastFormDataRef.current) {
        // Has meaningful data to save?
        const hasData =
          formData.clientName ||
          formData.installationAddress ||
          formData.propertyAddress ||
          (formData.circuits && formData.circuits.length > 0) ||
          (formData.scheduleOfTests && formData.scheduleOfTests.length > 0);

        if (hasData) {
          draftStorage.saveDraft(reportType, currentReportIdRef.current, formData);
          lastFormDataRef.current = currentData;
          setStatus(prev => ({
            ...prev,
            local: 'saved',
            lastLocalSave: new Date(),
            // Mark cloud as 'unsaved' when local data changes (if it was synced)
            cloud: prev.cloud === 'synced' ? 'unsaved' : prev.cloud,
          }));
        }
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [formData, reportType, enabled]);

  // === DEBOUNCED CLOUD SYNC (2 seconds after last change) ===
  // This is the primary sync mechanism - syncs within 2 seconds of stopping edits
  // Uses isAutoSync=true to keep 'auto-draft' status until user manually saves
  const debouncedCloudSync = useMemo(
    () => debounce(async () => {
      const hasData =
        formData.clientName ||
        formData.installationAddress ||
        formData.propertyAddress;

      if (isOnline && isAuthenticated && userId && hasData && !isSyncingRef.current) {
        console.log('[ReportSync] Debounced cloud sync triggered (auto-draft)');
        await syncToCloud(false, false, true);  // isAutoSync = true
      }
    }, 2000),
    [isOnline, isAuthenticated, userId]
  );

  // Trigger debounced sync on every formData change
  useEffect(() => {
    if (!enabled) return;

    const hasData =
      formData.clientName ||
      formData.installationAddress ||
      formData.propertyAddress;

    if (hasData && isOnline && isAuthenticated && userId) {
      // Mark cloud as unsaved immediately when data changes
      if (status.cloud === 'synced') {
        setStatus(prev => ({ ...prev, cloud: 'unsaved' }));
      }
      debouncedCloudSync();
    }

    return () => debouncedCloudSync.cancel();
  }, [formData, enabled, debouncedCloudSync, isOnline, isAuthenticated, userId, status.cloud]);

  // === AUTO-SYNC TO CLOUD (every 30 seconds as backup) ===
  // Backup mechanism - catches anything missed by debounced sync
  // Uses isAutoSync=true to keep 'auto-draft' status until user manually saves
  useEffect(() => {
    if (!enabled || !isOnline || !isAuthenticated || !userId) return;

    const interval = setInterval(async () => {
      // Fixed: Sync if cloud status is 'unsaved', 'queued', or 'error' (not just !== 'synced')
      if (status.local === 'saved' && (status.cloud === 'unsaved' || status.cloud === 'queued' || status.cloud === 'error')) {
        console.log('[ReportSync] Backup auto-sync triggered (auto-draft)');
        await syncToCloud(false, false, true);  // isAutoSync = true
      }
    }, 30000); // Every 30 seconds as backup

    return () => clearInterval(interval);
  }, [enabled, isOnline, isAuthenticated, userId, status.local, status.cloud]);

  // === UPDATE QUEUE COUNT ===
  const updateQueueCount = useCallback(async () => {
    const stats = await syncQueue.getStats();
    setStatus(prev => ({ ...prev, queuedChanges: stats.count }));
  }, []);

  // === PROCESS OFFLINE QUEUE ===
  const processQueue = useCallback(async () => {
    if (!isOnline || !userId) return;

    const operations = await syncQueue.getPendingForUser(userId);
    if (operations.length === 0) return;

    console.log(`[ReportSync] Processing ${operations.length} queued operations...`);

    let successCount = 0;
    let failCount = 0;

    for (const operation of operations) {
      // Check if should retry based on backoff
      if (!syncQueue.shouldRetry(operation)) {
        continue;
      }

      try {
        if (operation.type === 'create') {
          const result = await reportCloud.createReport(userId, operation.reportType, operation.data, customerId);
          if (result.success) {
            await syncQueue.complete(operation.id);
            successCount++;
          } else {
            throw new Error(result.error || 'Create failed');
          }
        } else if (operation.type === 'update' && operation.reportId) {
          const result = await reportCloud.updateReport(operation.reportId, userId, operation.data, customerId);
          if (result.success) {
            await syncQueue.complete(operation.id);
            successCount++;
          } else {
            throw new Error(result.error || 'Update failed');
          }
        }
      } catch (error) {
        console.error('[ReportSync] Queue operation failed:', error);
        const retryCount = await syncQueue.incrementRetry(operation.id);

        // Warn user if operation is failing repeatedly
        if (retryCount >= 5) {
          toast({
            title: 'Sync issue',
            description: `Some changes are having trouble syncing. We'll keep trying.`,
            variant: 'destructive',
          });
        }

        failCount++;
      }
    }

    await updateQueueCount();

    // Show consolidated result
    if (successCount > 0) {
      toast({
        title: 'Synced',
        description: `${successCount} change${successCount !== 1 ? 's' : ''} synced to cloud.`,
      });

      setStatus(prev => ({
        ...prev,
        cloud: failCount > 0 ? 'queued' : 'synced',
        lastCloudSync: new Date(),
      }));
    }
  }, [isOnline, userId, customerId, toast, updateQueueCount]);

  // Process queue on mount and when coming online
  useEffect(() => {
    if (isOnline && userId) {
      updateQueueCount();
      processQueue();
    }
  }, [isOnline, userId, updateQueueCount, processQueue]);

  // === SYNC TO CLOUD ===
  // isAutoSync: true for debounced/interval syncs (keeps 'auto-draft' status), false for manual saves (promotes to proper status)
  const syncToCloud = useCallback(async (showToast: boolean, forceOverwrite: boolean = false, isAutoSync: boolean = false): Promise<{ success: boolean; reportId: string | null }> => {
    if (isSyncingRef.current) {
      return { success: false, reportId: currentReportIdRef.current };
    }

    if (!userId) {
      if (showToast) {
        toast({
          title: 'Sign in required',
          description: 'Please sign in to save your work.',
          variant: 'destructive',
        });
      }
      return { success: false, reportId: null };
    }

    // Check minimum data
    const hasData =
      formData.clientName ||
      formData.installationAddress ||
      formData.propertyAddress;

    if (!hasData) {
      if (showToast) {
        toast({
          title: 'Cannot save yet',
          description: 'Please fill in client name or address first.',
          variant: 'destructive',
        });
      }
      return { success: false, reportId: null };
    }

    isSyncingRef.current = true;
    setStatus(prev => ({ ...prev, cloud: 'syncing' }));
    localDataRef.current = formData;

    try {
      let savedReportId = currentReportIdRef.current;

      if (savedReportId) {
        // Update existing report with version check (unless forcing overwrite)
        if (forceOverwrite) {
          // Force save - skip version check (always promotes from auto-draft)
          const result = await reportCloud.updateReport(savedReportId, userId, formData, customerId, false);
          if (!result.success) throw new Error(result.error || 'Update failed');
          // Fetch new version after successful update
          const newVersion = await reportCloud.getEditVersion(savedReportId, userId);
          if (newVersion) {
            expectedVersionRef.current = newVersion.version;
          }
        } else {
          // Normal save - check for conflicts
          const result = await reportCloud.updateReportWithVersionCheck(
            savedReportId,
            userId,
            formData,
            expectedVersionRef.current,
            customerId,
            isAutoSync  // Pass through auto-sync flag
          );

          if (result.conflict) {
            // Version conflict detected
            console.log('[ReportSync] Conflict detected:', result.conflict);
            isSyncingRef.current = false;
            setActiveConflict(result.conflict);
            setStatus(prev => ({
              ...prev,
              cloud: 'conflict',
              errorMessage: 'Someone else edited this report. Please resolve the conflict.',
            }));

            // Notify parent component if callback provided
            if (onConflict) {
              onConflict(result.conflict, formData);
            }

            if (showToast) {
              toast({
                title: 'Edit conflict detected',
                description: 'This report was edited elsewhere. Please review the changes.',
                variant: 'destructive',
              });
            }

            return { success: false, reportId: savedReportId };
          }

          if (!result.success) throw new Error(result.error || 'Update failed');

          // Update expected version after successful save
          expectedVersionRef.current += 1;
        }
      } else {
        // Create new report (no version conflict possible)
        // Pass isAutoSync to set 'auto-draft' status for auto-synced reports
        const result = await reportCloud.createReport(userId, reportType, formData, customerId, isAutoSync);
        if (!result.success || !result.reportId) throw new Error(result.error || 'Create failed');
        savedReportId = result.reportId;
        // CRITICAL: Update the ref so subsequent syncs update this report instead of creating duplicates
        currentReportIdRef.current = savedReportId;
        expectedVersionRef.current = 1;
        console.log('[ReportSync] Created new report:', savedReportId, isAutoSync ? '(auto-draft)' : '(draft)');

        // Notify parent component so it can update its state
        if (onReportCreated) {
          onReportCreated(savedReportId);
        }
      }

      // Clear any active conflict
      setActiveConflict(null);

      // Clear local draft after successful sync
      draftStorage.clearDraft(reportType, savedReportId);

      setStatus(prev => ({
        ...prev,
        cloud: 'synced',
        lastCloudSync: new Date(),
        queuedChanges: 0,
        errorMessage: undefined,
      }));

      if (showToast) {
        toast({
          title: 'Saved',
          description: 'Your report has been saved.',
        });
      }

      isSyncingRef.current = false;
      return { success: true, reportId: savedReportId };

    } catch (error) {
      console.error('[ReportSync] Sync error:', error);
      isSyncingRef.current = false;

      // Queue for retry if online, or just mark as queued if offline
      if (isOnline) {
        try {
          await syncQueue.enqueue({
            type: currentReportIdRef.current ? 'update' : 'create',
            reportType,
            reportId: currentReportIdRef.current,
            data: formData,
            userId,
          });
          await updateQueueCount();
        } catch (queueError) {
          console.error('[ReportSync] Failed to queue:', queueError);
        }
      }

      setStatus(prev => ({
        ...prev,
        cloud: 'queued',
        errorMessage: error instanceof Error ? error.message : 'Sync failed',
      }));

      if (showToast) {
        toast({
          title: 'Saved offline',
          description: 'Will sync to cloud when connection is stable.',
        });
      }

      return { success: false, reportId: currentReportIdRef.current };
    }
  }, [userId, formData, reportType, customerId, isOnline, toast, updateQueueCount, onConflict]);

  // === MANUAL SAVE ===
  const saveNow = useCallback(async (): Promise<{ success: boolean; reportId: string | null }> => {
    // Always save locally first
    draftStorage.saveDraft(reportType, currentReportIdRef.current, formData);
    setStatus(prev => ({ ...prev, local: 'saved', lastLocalSave: new Date() }));

    // Then sync to cloud
    return await syncToCloud(true);
  }, [formData, reportType, syncToCloud]);

  // === SAVE INITIAL DRAFT (immediately when form opens, even without meaningful data) ===
  const saveInitialDraft = useCallback(() => {
    // Save draft immediately to local storage (appears in recent certs/drafts)
    draftStorage.saveDraft(reportType, currentReportIdRef.current, {
      ...formData,
      _draftCreatedAt: new Date().toISOString(),
    });
    lastFormDataRef.current = JSON.stringify(formData);
    setStatus(prev => ({
      ...prev,
      local: 'saved',
      lastLocalSave: new Date(),
    }));
    console.log('[ReportSync] Initial draft saved for', reportType);
  }, [reportType, formData]);

  // === LOAD REPORT ===
  const loadReport = useCallback(async (loadReportId: string): Promise<{ data: any; databaseId: string | null } | null> => {
    if (!userId) return null;

    try {
      // Get report data with database ID and edit version together
      const [reportResult, versionInfo] = await Promise.all([
        reportCloud.getReportDataWithId(loadReportId, userId),
        reportCloud.getEditVersion(loadReportId, userId),
      ]);

      // Track the expected version for conflict detection
      if (versionInfo) {
        expectedVersionRef.current = versionInfo.version;
        console.log('[ReportSync] Loaded report with version:', versionInfo.version);
      }

      if (!reportResult) {
        return null;
      }

      return {
        data: reportResult.data,
        databaseId: reportResult.databaseId,
      };
    } catch (error) {
      toast({
        title: 'Load failed',
        description: 'Could not load report from cloud.',
        variant: 'destructive',
      });
      return null;
    }
  }, [userId, toast]);

  // === DRAFT RECOVERY ===
  const recoverDraft = useCallback((): any | null => {
    const draft = draftStorage.loadDraft(reportType, null);
    if (draft) {
      setHasRecoverableDraft(false);
      setDraftPreview(null);
      return draft.data;
    }
    return null;
  }, [reportType]);

  const discardDraft = useCallback(() => {
    draftStorage.clearDraft(reportType, null);
    setHasRecoverableDraft(false);
    setDraftPreview(null);
  }, [reportType]);

  // === FORCE SAVE (skip version check) ===
  const forceSave = useCallback(async (): Promise<{ success: boolean; reportId: string | null }> => {
    // Save locally first
    draftStorage.saveDraft(reportType, currentReportIdRef.current, formData);
    setStatus(prev => ({ ...prev, local: 'saved', lastLocalSave: new Date() }));

    // Force sync to cloud, overwriting any conflicts
    return await syncToCloud(true, true);
  }, [formData, reportType, syncToCloud]);

  // === RETRY SYNC ===
  const retrySync = useCallback(async (): Promise<void> => {
    if (status.cloud === 'error' || status.cloud === 'queued') {
      await syncToCloud(true, false);
    }
    // Also process any queued operations
    if (userId) {
      await processQueue();
    }
  }, [status.cloud, syncToCloud, userId, processQueue]);

  // === RESOLVE CONFLICT ===
  const resolveConflict = useCallback((useServerVersion: boolean) => {
    if (!activeConflict) return;

    if (useServerVersion) {
      // User chose to use the server version - they'll need to reload
      // Clear the conflict and mark as needing refresh
      setActiveConflict(null);
      setStatus(prev => ({
        ...prev,
        cloud: 'synced',
        errorMessage: undefined,
      }));
      // Update expected version to server version
      expectedVersionRef.current = activeConflict.serverVersion;

      toast({
        title: 'Using server version',
        description: 'The page will reload with the latest changes.',
      });

      // Trigger a reload after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      // User chose to keep their local changes - force save
      setActiveConflict(null);
      forceSave();
    }
  }, [activeConflict, forceSave, toast]);

  // === SYNC NOW (immediate sync, cancels debounce) ===
  const syncNow = useCallback(async (): Promise<{ success: boolean; reportId: string | null }> => {
    debouncedCloudSync.cancel();
    return await syncToCloud(true);
  }, [syncToCloud, debouncedCloudSync]);

  // === TAB CHANGE HANDLER (triggers immediate sync) ===
  // Uses isAutoSync=true - tab changes are automatic syncs, not manual saves
  const onTabChange = useCallback(() => {
    // Cancel debounce and sync immediately when user changes tabs
    const hasData =
      formData.clientName ||
      formData.installationAddress ||
      formData.propertyAddress;

    if (hasData && isOnline && isAuthenticated && userId) {
      debouncedCloudSync.cancel();
      syncToCloud(false, false, true);  // isAutoSync = true
    }
  }, [formData, isOnline, isAuthenticated, userId, debouncedCloudSync, syncToCloud]);

  // === RETURN ===
  return {
    status,
    isOnline,
    isAuthenticated,
    authCheckComplete,
    saveNow,
    saveInitialDraft,
    loadReport,
    recoverDraft,
    discardDraft,
    forceSave,
    retrySync,
    syncNow,
    onTabChange,
    hasRecoverableDraft,
    draftPreview,
    activeConflict,
    resolveConflict,
  };
};
