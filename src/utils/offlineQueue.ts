// offlineQueue - Compatibility wrapper for syncQueue
// Maintains the old API for existing components
// New code should use syncQueue directly

import { syncQueue, SyncOperation } from './syncQueue';

export interface QueueOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  reportId: string | null;
  reportType: 'eicr' | 'eic' | 'minor-works';
  data: any;
  timestamp: number;
  retryCount: number;
}

/**
 * Compatibility wrapper for the old offlineQueue API
 * Internally uses the new syncQueue
 */
export const offlineQueue = {
  async addToQueue(operation: Omit<QueueOperation, 'id' | 'timestamp' | 'retryCount'>): Promise<void> {
    // Note: delete operations are not supported in the new system
    if (operation.type === 'delete') {
      console.warn('[offlineQueue] Delete operations are handled differently in the new system');
      return;
    }

    await syncQueue.enqueue({
      type: operation.type,
      reportType: operation.reportType,
      reportId: operation.reportId,
      data: operation.data,
      userId: '', // Will be set by caller
    });
  },

  async getQueue(): Promise<QueueOperation[]> {
    const operations = await syncQueue.getPending();
    return operations.map(op => ({
      id: op.id,
      type: op.type,
      reportId: op.reportId,
      reportType: op.reportType,
      data: op.data,
      timestamp: op.timestamp,
      retryCount: op.retryCount,
    }));
  },

  async removeFromQueue(operationId: string): Promise<void> {
    await syncQueue.complete(operationId);
  },

  async updateRetryCount(operationId: string): Promise<void> {
    await syncQueue.incrementRetry(operationId);
  },

  async clearQueue(): Promise<void> {
    await syncQueue.clearAll();
  },

  async getQueueCount(): Promise<number> {
    const stats = await syncQueue.getStats();
    return stats.count;
  },
};
