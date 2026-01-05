// IndexedDB-based offline queue for report operations
// Provides persistent storage with ~50MB+ capacity (vs localStorage's 5-10MB)

const DB_NAME = 'offlineQueue';
const DB_VERSION = 1;
const STORE_NAME = 'operations';

export interface QueueOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  reportId: string | null;
  reportType: 'eicr' | 'eic' | 'minor-works';
  data: any;
  timestamp: number;
  retryCount: number;
}

class OfflineQueueManager {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      });
    }
    return this.dbPromise;
  }

  async addToQueue(operation: Omit<QueueOperation, 'id' | 'timestamp' | 'retryCount'>): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const queueOp: QueueOperation = {
        ...operation,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        retryCount: 0,
      };

      await new Promise<void>((resolve, reject) => {
        const request = store.add(queueOp);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('[OfflineQueue] Operation added to queue:', queueOp.type, queueOp.reportId);
    } catch (error) {
      console.error('[OfflineQueue] Failed to add to queue:', error);
      throw error;
    }
  }

  async getQueue(): Promise<QueueOperation[]> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
          const operations = request.result as QueueOperation[];
          // Sort by timestamp ascending (oldest first)
          operations.sort((a, b) => a.timestamp - b.timestamp);
          resolve(operations);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('[OfflineQueue] Failed to get queue:', error);
      return [];
    }
  }

  async removeFromQueue(operationId: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(operationId);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('[OfflineQueue] Operation removed from queue:', operationId);
    } catch (error) {
      console.error('[OfflineQueue] Failed to remove from queue:', error);
    }
  }

  async updateRetryCount(operationId: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const operation = await new Promise<QueueOperation>((resolve, reject) => {
        const request = store.get(operationId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      if (operation) {
        operation.retryCount += 1;
        await new Promise<void>((resolve, reject) => {
          const request = store.put(operation);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
    } catch (error) {
      console.error('[OfflineQueue] Failed to update retry count:', error);
    }
  }

  async clearQueue(): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log('[OfflineQueue] Queue cleared');
    } catch (error) {
      console.error('[OfflineQueue] Failed to clear queue:', error);
    }
  }

  async getQueueCount(): Promise<number> {
    try {
      const queue = await this.getQueue();
      return queue.length;
    } catch (error) {
      return 0;
    }
  }
}

export const offlineQueue = new OfflineQueueManager();
