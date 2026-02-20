import { useState, useCallback, useEffect, useRef } from 'react';
import { openDB, IDBPDatabase } from 'idb';
import { toast } from '@/hooks/use-toast';
import { useSafetyPhotoUpload, UploadOptions } from './useSafetyPhotoUpload';

interface QueuedPhoto {
  id: string;
  file: Blob;
  fileName: string;
  fileType: string;
  options: UploadOptions;
  timestamp: number;
  retryCount: number;
}

const DB_NAME = 'elec-mate-photo-queue';
const STORE_NAME = 'pending-photos';
const DB_VERSION = 1;

async function getDb(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export function useOfflinePhotoQueue() {
  const [pendingCount, setPendingCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);
  const { uploadPhoto } = useSafetyPhotoUpload();

  // Refresh the pending count from IndexedDB
  const refreshCount = useCallback(async () => {
    try {
      const db = await getDb();
      const count = await db.count(STORE_NAME);
      setPendingCount(count);
    } catch {
      // IndexedDB not available
    }
  }, []);

  // Enqueue a photo for later upload
  const enqueue = useCallback(
    async (file: File, options: UploadOptions) => {
      try {
        const db = await getDb();
        const entry: QueuedPhoto = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          file: file,
          fileName: file.name,
          fileType: file.type,
          options,
          timestamp: Date.now(),
          retryCount: 0,
        };
        await db.put(STORE_NAME, entry);
        await refreshCount();
        toast({ title: 'Photo queued', description: 'Will upload when back online' });
      } catch (err) {
        console.error('[OfflineQueue] Failed to enqueue:', err);
        toast({
          title: 'Queue failed',
          description: 'Could not save photo for later',
          variant: 'destructive',
        });
      }
    },
    [refreshCount]
  );

  // Process all pending items in the queue
  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    if (!navigator.onLine) return;

    processingRef.current = true;
    setIsProcessing(true);

    try {
      const db = await getDb();
      const allItems = (await db.getAll(STORE_NAME)) as QueuedPhoto[];

      if (allItems.length === 0) {
        setIsProcessing(false);
        processingRef.current = false;
        return;
      }

      let uploaded = 0;
      for (const item of allItems) {
        try {
          const file = new File([item.file], item.fileName, { type: item.fileType });
          const result = await uploadPhoto(file, item.options);
          if (result) {
            await db.delete(STORE_NAME, item.id);
            uploaded++;
          } else {
            // Upload returned null but didn't throw — increment retry
            const updated = { ...item, retryCount: item.retryCount + 1 };
            if (updated.retryCount < 10) {
              await db.put(STORE_NAME, updated);
            } else {
              await db.delete(STORE_NAME, item.id);
            }
          }
        } catch {
          // Network error — stop processing, will retry later
          break;
        }
      }

      await refreshCount();
      if (uploaded > 0) {
        toast({
          title: `${uploaded} queued photo${uploaded !== 1 ? 's' : ''} uploaded`,
        });
      }
    } catch (err) {
      console.error('[OfflineQueue] Process error:', err);
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
    }
  }, [uploadPhoto, refreshCount]);

  // Load initial count and set up online listener
  useEffect(() => {
    refreshCount();

    const handleOnline = () => {
      processQueue();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [refreshCount, processQueue]);

  // Try processing on mount if online
  useEffect(() => {
    if (navigator.onLine) {
      processQueue();
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pendingCount,
    isProcessing,
    enqueue,
    processQueue,
    refreshCount,
  };
}
