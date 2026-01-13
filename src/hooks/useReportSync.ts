// useReportSync - Best-in-Class Report Sync Hook
// Local-first, offline-capable, never loses data

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { reportCloud } from '@/utils/reportCloud';
import { draftStorage } from '@/utils/draftStorage';
import { syncQueue, SyncOperation } from '@/utils/syncQueue';

// === TYPES ===

export interface SyncStatus {
  local: 'saved' | 'saving' | 'unsaved';
  cloud: 'synced' | 'syncing' | 'queued' | 'offline' | 'error';
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
}

interface UseReportSyncReturn {
  // Status
  status: SyncStatus;
  isOnline: boolean;
  isAuthenticated: boolean;

  // Actions
  saveNow: () => Promise<{ success: boolean; reportId: string | null }>;
  loadReport: (id: string) => Promise<any | null>;
  recoverDraft: () => any | null;
  discardDraft: () => void;

  // Draft recovery
  hasRecoverableDraft: boolean;
  draftPreview: { clientName?: string; installationAddress?: string; lastModified: Date } | null;
}

// === HOOK ===

export const useReportSync = ({
  reportId,
  reportType,
  formData,
  enabled = true,
  customerId,
}: UseReportSyncOptions): UseReportSyncReturn => {
  const { toast } = useToast();

  // === STATE ===
  const [status, setStatus] = useState<SyncStatus>({
    local: 'unsaved',
    cloud: 'synced',
    lastLocalSave: null,
    lastCloudSync: null,
    queuedChanges: 0,
    errorMessage: undefined,
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasRecoverableDraft, setHasRecoverableDraft] = useState(false);
  const [draftPreview, setDraftPreview] = useState<{ clientName?: string; installationAddress?: string; lastModified: Date } | null>(null);

  // Refs for tracking changes and preventing race conditions
  const lastFormDataRef = useRef<string>('');
  const isSyncingRef = useRef(false);
  const currentReportIdRef = useRef(reportId);

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
          }));
        }
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [formData, reportType, enabled]);

  // === AUTO-SYNC TO CLOUD (every 30 seconds) ===
  useEffect(() => {
    if (!enabled || !isOnline || !isAuthenticated || !userId) return;

    const interval = setInterval(async () => {
      // Only auto-sync if we have local changes that aren't synced
      if (status.local === 'saved' && status.cloud !== 'synced' && status.cloud !== 'syncing') {
        await syncToCloud(false);
      }
    }, 30000); // Every 30 seconds

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
  const syncToCloud = useCallback(async (showToast: boolean): Promise<{ success: boolean; reportId: string | null }> => {
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

    try {
      let savedReportId = currentReportIdRef.current;

      if (savedReportId) {
        // Update existing report
        const result = await reportCloud.updateReport(savedReportId, userId, formData, customerId);
        if (!result.success) throw new Error(result.error || 'Update failed');
      } else {
        // Create new report
        const result = await reportCloud.createReport(userId, reportType, formData, customerId);
        if (!result.success || !result.reportId) throw new Error(result.error || 'Create failed');
        savedReportId = result.reportId;
      }

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
  }, [userId, formData, reportType, customerId, isOnline, toast, updateQueueCount]);

  // === MANUAL SAVE ===
  const saveNow = useCallback(async (): Promise<{ success: boolean; reportId: string | null }> => {
    // Always save locally first
    draftStorage.saveDraft(reportType, currentReportIdRef.current, formData);
    setStatus(prev => ({ ...prev, local: 'saved', lastLocalSave: new Date() }));

    // Then sync to cloud
    return await syncToCloud(true);
  }, [formData, reportType, syncToCloud]);

  // === LOAD REPORT ===
  const loadReport = useCallback(async (loadReportId: string): Promise<any | null> => {
    if (!userId) return null;

    try {
      const data = await reportCloud.getReportData(loadReportId, userId);
      return data;
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

  // === RETURN ===
  return {
    status,
    isOnline,
    isAuthenticated,
    saveNow,
    loadReport,
    recoverDraft,
    discardDraft,
    hasRecoverableDraft,
    draftPreview,
  };
};
