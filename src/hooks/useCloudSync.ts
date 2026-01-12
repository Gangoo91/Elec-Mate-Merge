import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { offlineQueue } from '@/utils/offlineQueue';
import { reportCloud } from '@/utils/reportCloud';

export type SyncStatus = 'synced' | 'syncing' | 'queued' | 'error';

interface SyncState {
  status: SyncStatus;
  lastSyncTime?: number;
  errorMessage?: string;
  queuedChanges: number;
}

interface CloudSyncOptions {
  reportId: string | null;
  reportType: 'eicr' | 'eic' | 'minor-works';
  data: any;
  enabled: boolean;
  customerId?: string;
}

export const useCloudSync = ({
  reportId,
  reportType,
  data,
  enabled,
  customerId,
}: CloudSyncOptions) => {
  const { toast } = useToast();
  const [syncState, setSyncState] = useState<SyncState>({
    status: 'synced',
    lastSyncTime: undefined,
    errorMessage: undefined,
    queuedChanges: 0,
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);
  const isSyncingRef = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSyncTimestampRef = useRef<number>(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const lastErrorToastTimeRef = useRef<Record<string, number>>({});

  // Debounced toast helper - only shows error toasts once per 30 seconds unless manual action
  const showDebouncedToast = useCallback((key: string, title: string, description: string, isManualAction: boolean = false) => {
    const now = Date.now();
    const lastShown = lastErrorToastTimeRef.current[key] || 0;
    const DEBOUNCE_MS = 30 * 1000; // 30 seconds

    // Always show for manual actions, otherwise debounce
    if (isManualAction || now - lastShown > DEBOUNCE_MS) {
      toast({
        title,
        description,
        variant: 'destructive',
      });
      lastErrorToastTimeRef.current[key] = now;
    }
  }, [toast]);

  // Check authentication status
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

  // Monitor online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      // Process queue when coming back online
      if (online && isAuthenticated) {
        setTimeout(() => processOfflineQueue(), 1000);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isAuthenticated]);

  // Update queued changes count
  const updateQueuedCount = useCallback(async () => {
    const count = await offlineQueue.getQueueCount();
    setSyncState(prev => ({ ...prev, queuedChanges: count }));
  }, []);

  // Process offline queue
  const processOfflineQueue = useCallback(async () => {
    if (!isAuthenticated || !userId || !isOnline) {
      console.log('[CloudSync] Cannot process queue - authenticated:', isAuthenticated, 'online:', isOnline);
      return;
    }

    const queue = await offlineQueue.getQueue();
    if (queue.length === 0) {
      console.log('[CloudSync] Queue is empty');
      return;
    }

    console.log(`[CloudSync] Processing ${queue.length} queued operations...`);
    
    let successCount = 0;
    let failCount = 0;

    for (const operation of queue) {
      console.log(`[CloudSync] Processing operation:`, {
        id: operation.id,
        type: operation.type,
        reportId: operation.reportId,
        reportType: operation.reportType,
        retryCount: operation.retryCount,
        timestamp: new Date(operation.timestamp).toISOString(),
      });

      try {
        if (operation.type === 'create') {
          const result = await reportCloud.createReport(userId, operation.reportType, operation.data);
          if (result.success) {
            console.log('[CloudSync] ✓ Create succeeded:', operation.id);
            await offlineQueue.removeFromQueue(operation.id);
            successCount++;
          } else {
            console.error('[CloudSync] ✗ Create failed:', operation.id, result.error);
            throw new Error(result.error || 'Create failed');
          }
        } else if (operation.type === 'update' && operation.reportId) {
          const result = await reportCloud.updateReport(operation.reportId, userId, operation.data);
          if (result.success) {
            console.log('[CloudSync] ✓ Update succeeded:', operation.id);
            await offlineQueue.removeFromQueue(operation.id);
            successCount++;
          } else {
            console.error('[CloudSync] ✗ Update failed:', operation.id, result.error);
            throw new Error(result.error || 'Update failed');
          }
        } else if (operation.type === 'delete' && operation.reportId) {
          const result = await reportCloud.softDeleteReport(operation.reportId, userId);
          if (result.success) {
            console.log('[CloudSync] ✓ Delete succeeded:', operation.id);
            await offlineQueue.removeFromQueue(operation.id);
            successCount++;
          } else {
            console.error('[CloudSync] ✗ Delete failed:', operation.id, result.error);
            throw new Error(result.error || 'Delete failed');
          }
        }
      } catch (error) {
        console.error('[CloudSync] Operation failed:', {
          operationId: operation.id,
          type: operation.type,
          reportId: operation.reportId,
          retryCount: operation.retryCount,
          error: error instanceof Error ? error.message : error,
        });
        
        // Update retry count
        await offlineQueue.updateRetryCount(operation.id);
        
        // Remove if too many retries
        if (operation.retryCount >= 3) {
          await offlineQueue.removeFromQueue(operation.id);
          console.warn('[CloudSync] Operation removed after 3 failed retries:', {
            id: operation.id,
            type: operation.type,
            reportId: operation.reportId,
          });
          // CRITICAL: Warn user about potential data loss
          toast({
            title: 'Data may be lost',
            description: `Failed to sync ${operation.reportType.toUpperCase()} after 3 attempts. Please try saving again.`,
            variant: 'destructive',
            duration: 10000,
          });
        }
        
        failCount++;
      }
    }

    console.log('[CloudSync] Queue processing complete:', { successCount, failCount });
    await updateQueuedCount();

    // Only show a single consolidated toast when syncing completes
    if (successCount > 0 && failCount === 0) {
      // All succeeded - single success toast
      toast({
        title: 'Synced',
        description: `${successCount} change${successCount !== 1 ? 's' : ''} synced to cloud.`,
      });
    } else if (failCount > 0 && successCount === 0) {
      // All failed - debounced error toast
      showDebouncedToast('queue-sync-fail', 'Sync failed', 'Changes will retry automatically.', false);
    } else if (successCount > 0 && failCount > 0) {
      // Mixed results - single toast
      toast({
        title: 'Partially synced',
        description: `${successCount} synced, ${failCount} will retry.`,
      });
    }
    // If nothing to report, stay silent
  }, [isAuthenticated, userId, isOnline, toast, updateQueuedCount, showDebouncedToast]);

  // Sync to cloud (main persistence function)
  // forceSync = true means user manually triggered save (show toasts)
  // forceSync = false means auto-sync (silent, status indicator only)
  const syncToCloud = useCallback(async (forceSync = false): Promise<{ success: boolean; reportId: string | null }> => {
    if (!enabled) {
      return { success: false, reportId: null };
    }

    // Not authenticated - show prompt
    if (isAuthenticated === false) {
      setSyncState(prev => ({ 
        ...prev, 
        status: 'error',
        errorMessage: 'Sign in to save your work',
      }));
      return { success: false, reportId: null };
    }

    // Debounce: Prevent rapid successive calls (except when forced)
    if (!forceSync && debounceTimeoutRef.current) {
      return { success: false, reportId: null };
    }

    // Offline - queue the operation
    if (!isOnline) {
      try {
        if (reportId) {
          await offlineQueue.addToQueue({
            type: 'update',
            reportId,
            reportType,
            data,
          });
        } else {
          await offlineQueue.addToQueue({
            type: 'create',
            reportId: null,
            reportType,
            data,
          });
        }
        
        await updateQueuedCount();
        setSyncState(prev => ({ 
          ...prev, 
          status: 'queued',
        }));
        
        return { success: false, reportId: null };
      } catch (error) {
        console.error('[CloudSync] Failed to queue operation:', error);
        return { success: false, reportId: null };
      }
    }

    // Already syncing
    if (isSyncingRef.current && !forceSync) {
      return { success: false, reportId: null };
    }

    // Save as soon as meaningful fields are entered (looser condition for better sync)
    // This prevents data loss by syncing earlier in the form completion process
    const shouldSave = 
      data.clientName || 
      data.installationAddress || 
      data.propertyAddress || 
      data.inspectionDate || 
      data.workDate ||
      (data.circuits && data.circuits.length > 0) ||
      (data.scheduleOfTests && data.scheduleOfTests.length > 0);
    
    // If user manually saves but form is too empty, show helpful message
    if (!shouldSave && forceSync) {
      toast({
        title: 'Cannot save yet',
        description: 'Please fill in at least Client Name or Installation Address to save your EIC.',
        variant: 'destructive',
        duration: 5000,
      });
      return { success: false, reportId: null };
    }
    
    // Allow forced saves to bypass the check, but auto-saves still need data
    if (!shouldSave && !forceSync) {
      return { success: false, reportId: null };
    }

    // Set debounce timeout
    if (!forceSync) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        debounceTimeoutRef.current = undefined;
      }, 2000); // 2 second debounce
    }

    isSyncingRef.current = true;
    setSyncState(prev => ({ ...prev, status: 'syncing' }));

    try {
      if (!userId) throw new Error('User ID not available');

      let savedReportId = reportId;

      if (reportId) {
        // Update existing report (pass customerId to link if provided)
        const result = await reportCloud.updateReport(reportId, userId, data, customerId);
        if (!result.success) throw new Error('Update failed');
      } else {
        // Create new report (or update if duplicate certificate found)
        const result = await reportCloud.createReport(userId, reportType, data, customerId);
        if (!result.success || !result.reportId) throw new Error('Create failed');
        savedReportId = result.reportId;
        
        // Store the reportId for future syncs to use UPDATE instead
        console.log('[CloudSync] Report created/found, reportId:', savedReportId);
      }

      const syncTime = Date.now();
      lastSyncTimestampRef.current = syncTime;
      
      setSyncState({
        status: 'synced',
        lastSyncTime: syncTime,
        queuedChanges: 0,
      });

      isSyncingRef.current = false;
      return { success: true, reportId: savedReportId };
    } catch (error) {
      console.error('[CloudSync] Sync error:', error);
      isSyncingRef.current = false;

      // Queue for retry
      let newQueueCount = 0;
      try {
        if (reportId) {
          await offlineQueue.addToQueue({ type: 'update', reportId, reportType, data });
        } else {
          await offlineQueue.addToQueue({ type: 'create', reportId: null, reportType, data });
        }
        newQueueCount = await offlineQueue.getQueueCount();
      } catch (queueError) {
        console.error('[CloudSync] Failed to queue after error:', queueError);
      }

      setSyncState(prev => ({
        ...prev,
        status: 'queued', // Set to queued, not error - changes are safely queued
        errorMessage: error instanceof Error ? error.message : 'Failed to sync',
        queuedChanges: newQueueCount,
      }));

      return { success: false, reportId: null };
    }
  }, [enabled, isAuthenticated, isOnline, reportId, reportType, data, userId, updateQueuedCount]);

  // Load from cloud
  const loadFromCloud = useCallback(async (cloudReportId: string): Promise<any | null> => {
    if (!enabled || isAuthenticated !== true || !isOnline || !userId) {
      return null;
    }

    try {
      const reportData = await reportCloud.getReportData(cloudReportId, userId);
      return reportData;
    } catch (error) {
      console.error('[CloudSync] Load error:', error);
      toast({
        title: 'Load failed',
        description: 'Failed to load report from cloud.',
        variant: 'destructive',
      });
      return null;
    }
  }, [enabled, isAuthenticated, isOnline, userId, toast]);

  // Auto-sync every 30 seconds
  useEffect(() => {
    if (!enabled || syncState.status === 'syncing') return;

    const interval = setInterval(() => {
      if (data.clientName || data.inspectionDate || data.circuits?.length > 0) {
        syncToCloud();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [enabled, syncState.status, data, syncToCloud]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!enabled || !isAuthenticated || !reportId) return;

    const channel = supabase
      .channel('report-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'reports',
          filter: `report_id=eq.${reportId}`,
        },
        (payload) => {
          console.log('[CloudSync] Report updated remotely:', payload);
          
          // Only show toast if update wasn't from our own sync (5 second grace period)
          const timeSinceLastSync = Date.now() - lastSyncTimestampRef.current;
          if (timeSinceLastSync > 5000) {
            toast({
              title: 'Report updated',
              description: 'This report was updated on another device.',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, isAuthenticated, reportId, toast]);

  // Update queued count on mount and process queue if online
  useEffect(() => {
    updateQueuedCount();
    
    // Process queue on mount if already online and authenticated
    if (isOnline && isAuthenticated && userId) {
      console.log('[CloudSync] App loaded with queued operations - processing...');
      setTimeout(() => processOfflineQueue(), 1500);
    }
  }, [updateQueuedCount, processOfflineQueue]);

  // Periodic queue processing (every 60 seconds)
  useEffect(() => {
    if (!isOnline || !isAuthenticated) return;

    const interval = setInterval(async () => {
      const count = await offlineQueue.getQueueCount();
      if (count > 0) {
        console.log('[CloudSync] Periodic check found queued operations - processing...');
        processOfflineQueue();
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [isOnline, isAuthenticated, processOfflineQueue]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    syncState,
    syncToCloud,
    loadFromCloud,
    isOnline,
    isAuthenticated,
    processOfflineQueue,
  };
};
