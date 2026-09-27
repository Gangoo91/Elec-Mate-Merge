// Sync Queue - Best-in-Class
// IndexedDB-based queue for bulletproof offline sync
// Never loses data, survives browser restarts

const DB_NAME = 'elec-mate-sync';
const DB_VERSION = 1;
const STORE_NAME = 'queue';

import { ReportType } from './reportCloud';

export interface SyncOperation {
  id: string;
  type: 'create' | 'update';
  reportType: ReportType;
  reportId: string | null;
  data: Record<string, unknown>;
  timestamp: number;
  retryCount: number;
  lastRetry: number | null;
  userId: string;
}

interface QueueStats {
  count: number;
  oldestTimestamp: Date | null;
}

/**
 * The certificate a queued operation belongs to — or null when we cannot know.
 *
 * ELE-1600. Two queued operations with the same identity are two snapshots of
 * the same certificate, and only the newest is worth sending. Two operations
 * with DIFFERENT identities, or with no identity at all, must never be merged:
 * that would be two people's certificates, or two brand-new certificates from
 * one person, collapsed into one — and one of them silently lost.
 *
 *   update  → the report_id. Non-null by definition of an update.
 *   create  → `_clientCertId`, the stable per-certificate identity that the
 *             EICR / EIC / Minor Works forms carry from first keystroke and that
 *             ELE-1592 derives the idempotency key from.
 *
 * ⚠️ NOT `reportId` for a create — it is null for every create, so keying on it
 * would merge every pending new certificate into one. And NOT
 * `__createReportId` on its own: without `_clientCertId` behind it that key is
 * minted fresh on every attempt, so it identifies an attempt, not a certificate.
 * A create with neither returns null and is queued as its own row, exactly as
 * before this change. Conservative by design — it is the user's data.
 */
export function syncIdentity(
  op: Pick<SyncOperation, 'type' | 'reportType' | 'reportId' | 'data' | 'userId'>
): string | null {
  if (op.type === 'update') {
    return op.reportId ? `update:${op.userId}:${op.reportId}` : null;
  }
  const cert = op.data?._clientCertId;
  return typeof cert === 'string' && cert.trim()
    ? `create:${op.userId}:${op.reportType}:${cert.trim()}`
    : null;
}

class SyncQueueManager {
  private dbPromise: Promise<IDBDatabase> | null = null;

  /**
   * Get or create the IndexedDB database
   */
  private getDB(): Promise<IDBDatabase> {
    // `indexedDB` is not merely disabled but UNDEFINED in some WebViews and in
    // iOS private browsing, so touching it throws a ReferenceError rather than
    // failing a call — which took out the page instead of degrading
    // (Sentry JAVASCRIPT-REACT-GE, on /settings). Rejecting keeps the existing
    // failure path: callers already handle a database that will not open, and
    // the queue simply has nowhere local to persist. Same guard
    // `offlineAICache` already uses.
    if (typeof indexedDB === 'undefined') {
      return Promise.reject(new Error('IndexedDB is not available in this browser'));
    }
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
  async enqueue(
    operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retryCount' | 'lastRetry'>
  ): Promise<string> {
    try {
      const db = await this.getDB();

      /*
       * ELE-1600 — one queued row per certificate, holding the newest snapshot.
       *
       * Under an outage every failed autosave used to add another row, so the
       * drain sent N creates or N updates for one certificate: N round trips,
       * N chances to fail, and a badge telling the user N things were pending
       * when one was. If a pending operation is already this certificate, its
       * payload is replaced in place. It keeps its id and its place in the
       * queue (timestamp), because it has been waiting longer than the new
       * data has, but it does NOT keep its retry count — a fresh payload must
       * not inherit an exhausted backoff and be given up on unsent.
       *
       * Only when `syncIdentity` can name the certificate. See its note for
       * why anything it cannot name still gets its own row.
       */
      const identity = syncIdentity(operation);
      /*
       * Two transactions, not one. An IDB transaction auto-commits the moment
       * it has no pending request and control returns to the event loop, and
       * whether an `await` in between counts has differed by browser (Safari
       * in particular). A readonly lookup then a fresh readwrite for the write
       * never depends on that. The worst a race can do is queue one extra row.
       */
      const existing = identity
        ? await new Promise<SyncOperation | undefined>((resolve, reject) => {
            const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll();
            request.onsuccess = () =>
              resolve(
                (request.result as SyncOperation[]).find(
                  (op) => op.type === operation.type && syncIdentity(op) === identity
                )
              );
            request.onerror = () => reject(request.error);
          })
        : undefined;

      const id = existing?.id ?? this.generateId();
      const queueOp: SyncOperation = {
        ...operation,
        id,
        timestamp: existing?.timestamp ?? Date.now(),
        retryCount: 0,
        lastRetry: null,
      };

      await new Promise<void>((resolve, reject) => {
        const store = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME);
        const request = existing ? store.put(queueOp) : store.add(queueOp);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      console.log(existing ? '[SyncQueue] Operation replaced:' : '[SyncQueue] Operation queued:', {
        id,
        type: operation.type,
        reportType: operation.reportType,
        ...(existing ? { supersededRetries: existing.retryCount } : {}),
      });
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
    return all.filter((op) => op.userId === userId);
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

        console.log('[SyncQueue] Retry count incremented:', {
          id: operationId,
          retryCount: operation.retryCount,
        });
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
      const toDelete = operations.filter((op) => op.reportId === reportId);

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
    return operations.filter((op) => op.retryCount >= MAX_RETRIES);
  }
}

export const syncQueue = new SyncQueueManager();
