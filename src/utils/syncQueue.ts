// Sync Queue - Best-in-Class
// IndexedDB-based queue for bulletproof offline sync
// Never loses data, survives browser restarts

const DB_NAME = 'elec-mate-sync';
const DB_VERSION = 1;
const STORE_NAME = 'queue';

export interface SyncOperation {
  id: string;
  type: 'create' | 'update';
  reportType: 'eicr' | 'eic' | 'minor-works';
  reportId: string | null;
  data: any;
  timestamp: number;
  retryCount: number;
  lastRetry: number | null;
  userId: string;
}

interface QueueStats {
  count: number;
  oldestTimestamp: Date | null;
}

class SyncQueueManager {
  private dbPromise: Promise<IDBDatabase> | null = null;

  /**
   * Get or create the IndexedDB database
   */
  private getDB(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
          console.error('[SyncQueue] Database error:', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
            store.createIndex('reportType', 'reportType', { unique: false });
            store.createIndex('userId', 'userId', { unique: false });
          }
        };
      });
    }
    return this.dbPromise;
  }

  /**
   * Generate a unique ID for queue operations
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Add an operation to the sync queue
   * Called when offline or when cloud sync fails
   */
  async enqueue(operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retryCount' | 'lastRetry'>): Promise<string> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const id = this.generateId();
      const queueOp: SyncOperation = {
        ...operation,
        id,
        timestamp: Date.now(),
        retryCount: 0,
        lastRetry: null,
      };

      await new Promise<void>((resolve, reject) => {
        const request = store.add(queueOp);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('[SyncQueue] Operation queued:', { id, type: operation.type, reportType: operation.reportType });
      return id;
    } catch (error) {
      console.error('[SyncQueue] Failed to enqueue:', error);
      throw error;
    }
  }

  /**
   * Get all pending operations, sorted by timestamp (oldest first)
   */
  async getPending(): Promise<SyncOperation[]> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
          const operations = request.result as SyncOperation[];
          // Sort by timestamp, oldest first
          operations.sort((a, b) => a.timestamp - b.timestamp);
          resolve(operations);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('[SyncQueue] Failed to get pending:', error);
      return [];
    }
  }

  /**
   * Get pending operations for a specific user
   */
  async getPendingForUser(userId: string): Promise<SyncOperation[]> {
    const all = await this.getPending();
    return all.filter(op => op.userId === userId);
  }

  /**
   * Mark an operation as completed (remove from queue)
   */
  async complete(operationId: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(operationId);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('[SyncQueue] Operation completed:', operationId);
    } catch (error) {
      console.error('[SyncQueue] Failed to complete:', error);
    }
  }

  /**
   * Increment retry count for a failed operation
   * Uses exponential backoff timing
   */
  async incrementRetry(operationId: string): Promise<number> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const operation = await new Promise<SyncOperation | undefined>((resolve, reject) => {
        const request = store.get(operationId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (operation) {
        operation.retryCount += 1;
        operation.lastRetry = Date.now();

        await new Promise<void>((resolve, reject) => {
          const request = store.put(operation);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });

        console.log('[SyncQueue] Retry count incremented:', { id: operationId, retryCount: operation.retryCount });
        return operation.retryCount;
      }

      return 0;
    } catch (error) {
      console.error('[SyncQueue] Failed to increment retry:', error);
      return 0;
    }
  }

  /**
   * Check if an operation should be retried based on backoff timing
   * Exponential backoff: 1min, 2min, 4min, 8min, 16min...
   */
  shouldRetry(operation: SyncOperation): boolean {
    const MAX_RETRIES = 10; // Give up after 10 retries (~17 hours total wait)

    if (operation.retryCount >= MAX_RETRIES) {
      return false;
    }

    if (!operation.lastRetry) {
      return true;
    }

    // Exponential backoff: 2^retryCount minutes
    const backoffMs = Math.pow(2, operation.retryCount) * 60 * 1000;
    const timeSinceLastRetry = Date.now() - operation.lastRetry;

    return timeSinceLastRetry >= backoffMs;
  }

  /**
   * Get queue statistics
   */
  async getStats(): Promise<QueueStats> {
    try {
      const operations = await this.getPending();

      return {
        count: operations.length,
        oldestTimestamp: operations.length > 0 ? new Date(operations[0].timestamp) : null,
      };
    } catch (error) {
      return { count: 0, oldestTimestamp: null };
    }
  }

  /**
   * Clear all operations for a specific report
   * Used when user deletes a report
   */
  async clearForReport(reportId: string): Promise<void> {
    try {
      const operations = await this.getPending();
      const toDelete = operations.filter(op => op.reportId === reportId);

      for (const op of toDelete) {
        await this.complete(op.id);
      }

      console.log('[SyncQueue] Cleared operations for report:', reportId, toDelete.length);
    } catch (error) {
      console.error('[SyncQueue] Failed to clear for report:', error);
    }
  }

  /**
   * Clear all operations (dangerous - use with care)
   */
  async clearAll(): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('[SyncQueue] Queue cleared');
    } catch (error) {
      console.error('[SyncQueue] Failed to clear all:', error);
    }
  }

  /**
   * Get operations that have exceeded max retries (for user notification)
   */
  async getFailedOperations(): Promise<SyncOperation[]> {
    const MAX_RETRIES = 10;
    const operations = await this.getPending();
    return operations.filter(op => op.retryCount >= MAX_RETRIES);
  }
}

export const syncQueue = new SyncQueueManager();
