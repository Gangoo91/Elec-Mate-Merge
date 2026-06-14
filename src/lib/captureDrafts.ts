/**
 * captureDrafts — offline survival for mid-capture portfolio evidence.
 *
 * A tiny hand-rolled IndexedDB wrapper (no deps). One draft per user,
 * keyed by uid, in DB 'elecmate-capture' / store 'drafts'.
 *
 * File blobs are stored RAW (File/Blob objects are structured-cloneable
 * into IDB). Never store blob: object URLs — they die with the session,
 * which is exactly the failure mode this module exists to prevent.
 *
 * Every call is defensive: if IndexedDB is unavailable (private browsing,
 * quota full, corrupt DB), calls degrade to no-ops returning null/false
 * rather than throwing — capture must keep working without persistence.
 */

export interface CaptureDraftFile {
  name: string;
  type: string;
  blob: Blob;
  /** Set when the file already made it to Supabase storage — restore must not re-upload. */
  storageUrl?: string;
}

export interface CaptureDraft {
  /** Serialisable form fields — read defensively on restore (older app versions may differ). */
  fields: Record<string, unknown>;
  files: CaptureDraftFile[];
  savedAt: number;
}

const DB_NAME = 'elecmate-capture';
const STORE = 'drafts';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        try {
          if (!req.result.objectStoreNames.contains(STORE)) {
            req.result.createObjectStore(STORE);
          }
        } catch {
          /* degrade to no-op */
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Persist the draft for this user, replacing any previous one.
 * Returns false (never throws) when IDB is unavailable or the write fails
 * (e.g. QuotaExceededError) so the caller can warn once and carry on.
 */
export async function saveDraft(uid: string, draft: CaptureDraft): Promise<boolean> {
  if (!uid) return false;
  const db = await openDb();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(draft, uid);
      tx.oncomplete = () => {
        db.close();
        resolve(true);
      };
      tx.onerror = () => {
        db.close();
        resolve(false);
      };
      tx.onabort = () => {
        db.close();
        resolve(false);
      };
    } catch {
      db.close();
      resolve(false);
    }
  });
}

/** Load this user's draft, or null when none exists / IDB is unavailable / the record is malformed. */
export async function loadDraft(uid: string): Promise<CaptureDraft | null> {
  if (!uid) return null;
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(uid);
      req.onsuccess = () => {
        db.close();
        const raw = req.result as Partial<CaptureDraft> | undefined;
        if (!raw || typeof raw !== 'object') {
          resolve(null);
          return;
        }
        // Normalise defensively — a draft written by an older/newer app
        // version may carry unknown fields (ignored) or miss expected ones.
        const fields =
          raw.fields && typeof raw.fields === 'object'
            ? (raw.fields as Record<string, unknown>)
            : {};
        const files = Array.isArray(raw.files)
          ? raw.files.filter(
              (f): f is CaptureDraftFile =>
                !!f && typeof f === 'object' && f.blob instanceof Blob
            )
          : [];
        resolve({
          fields,
          files: files.map((f) => ({
            name: typeof f.name === 'string' && f.name ? f.name : 'evidence',
            type: typeof f.type === 'string' ? f.type : f.blob.type,
            blob: f.blob,
            storageUrl: typeof f.storageUrl === 'string' ? f.storageUrl : undefined,
          })),
          savedAt: typeof raw.savedAt === 'number' ? raw.savedAt : Date.now(),
        });
      };
      req.onerror = () => {
        db.close();
        resolve(null);
      };
    } catch {
      db.close();
      resolve(null);
    }
  });
}

/** Remove this user's draft. Safe to call when none exists; never throws. */
export async function clearDraft(uid: string): Promise<void> {
  if (!uid) return;
  const db = await openDb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(uid);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
      tx.onabort = () => {
        db.close();
        resolve();
      };
    } catch {
      db.close();
      resolve();
    }
  });
}
