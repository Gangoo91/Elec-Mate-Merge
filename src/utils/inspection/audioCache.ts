const DB_NAME = 'electrician-voice-cache';
const STORE_NAME = 'audio';
const DB_VERSION = 1;
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_AGE_DAYS = 30;

interface CachedAudio {
  id: string;
  text: string;
  audioBlob: Blob;
  voice: string;
  createdAt: number;
  playCount: number;
  size: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

const openDB = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('playCount', 'playCount', { unique: false });
      }
    };
  });

  return dbPromise;
};

export const saveToCache = async (
  id: string,
  audioBlob: Blob,
  text: string,
  voice: string
): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const cached: CachedAudio = {
      id,
      text,
      audioBlob,
      voice,
      createdAt: Date.now(),
      playCount: 1,
      size: audioBlob.size,
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.put(cached);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Check cache size and cleanup if needed
    await cleanupCache(db);
  } catch (error) {
    console.error('Failed to save to cache:', error);
  }
};

export const getFromCache = async (id: string): Promise<Blob | null> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const cached = await new Promise<CachedAudio | null>((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });

    if (!cached) return null;

    // Update play count
    cached.playCount++;
    store.put(cached);

    return cached.audioBlob;
  } catch (error) {
    console.error('Failed to get from cache:', error);
    return null;
  }
};

const cleanupCache = async (db: IDBDatabase): Promise<void> => {
  try {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // Get all entries
    const allEntries = await new Promise<CachedAudio[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    // Calculate total size
    const totalSize = allEntries.reduce((sum, entry) => sum + entry.size, 0);

    if (totalSize > MAX_CACHE_SIZE) {
      // Sort by play count (ascending) and age (oldest first)
      const sorted = allEntries.sort((a, b) => {
        if (a.playCount !== b.playCount) {
          return a.playCount - b.playCount;
        }
        return a.createdAt - b.createdAt;
      });

      // Delete until under limit
      let currentSize = totalSize;
      for (const entry of sorted) {
        if (currentSize <= MAX_CACHE_SIZE * 0.8) break; // 80% of max
        
        await new Promise<void>((resolve, reject) => {
          const request = store.delete(entry.id);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
        
        currentSize -= entry.size;
        console.log('Deleted cached audio:', entry.text.substring(0, 50));
      }
    }

    // Delete old entries
    const cutoffDate = Date.now() - (MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
    for (const entry of allEntries) {
      if (entry.createdAt < cutoffDate) {
        await new Promise<void>((resolve, reject) => {
          const request = store.delete(entry.id);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
    }
  } catch (error) {
    console.error('Failed to cleanup cache:', error);
  }
};

export const getCacheStats = async (): Promise<{
  totalSize: number;
  entryCount: number;
  oldestEntry: number | null;
}> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const allEntries = await new Promise<CachedAudio[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const totalSize = allEntries.reduce((sum, entry) => sum + entry.size, 0);
    const oldestEntry = allEntries.length > 0
      ? Math.min(...allEntries.map(e => e.createdAt))
      : null;

    return {
      totalSize,
      entryCount: allEntries.length,
      oldestEntry,
    };
  } catch (error) {
    console.error('Failed to get cache stats:', error);
    return { totalSize: 0, entryCount: 0, oldestEntry: null };
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    console.log('Audio cache cleared');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};
