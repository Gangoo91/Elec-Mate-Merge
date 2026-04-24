/**
 * offlineAICache — IndexedDB wrapper for the last 10 Elec-AI Q&A pairs.
 *
 * Used to give users on patchy jobsite connections a fallback view of their
 * most recent answers. Uses the `idb` package already pulled in elsewhere in
 * the codebase (see `src/utils/offlineStorage.ts`). Entries are capped at 10
 * with FIFO eviction by timestamp.
 */

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

export interface OfflineAIAnswer {
  /** Monotonic unique id — uses Date.now() + crypto fallback for uniqueness. */
  id: string;
  question: string;
  answer: string;
  /** Cited regulations, optional — shape matches RegulationSources. */
  sources?: Array<{
    id?: string;
    regulation_number: string;
    section?: string;
    content?: string;
    amendment?: string;
    similarity?: number;
  }>;
  /** Unix millis. */
  timestamp: number;
}

interface ElecAIOfflineDB extends DBSchema {
  answers: {
    key: string;
    value: OfflineAIAnswer;
    indexes: { 'by-timestamp': number };
  };
}

const DB_NAME = 'elec-ai-offline-cache';
const DB_VERSION = 1;
const STORE = 'answers';
const MAX_ENTRIES = 10;

let dbPromise: Promise<IDBPDatabase<ElecAIOfflineDB>> | null = null;

function getDB() {
  if (typeof indexedDB === 'undefined') {
    return null;
  }
  if (!dbPromise) {
    dbPromise = openDB<ElecAIOfflineDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id' });
          store.createIndex('by-timestamp', 'timestamp');
        }
      },
    });
  }
  return dbPromise;
}

function makeId(): string {
  // Prefer crypto.randomUUID if available, fall back to Date + random.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    try {
      return crypto.randomUUID();
    } catch {
      // fallthrough
    }
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Persist a new Q&A pair. Automatically trims the store to the 10 most-recent
 * entries. No-op in environments without IndexedDB (SSR, private-browsing
 * Safari in some modes).
 */
export async function saveAnswer(
  entry: Omit<OfflineAIAnswer, 'id' | 'timestamp'> & Partial<Pick<OfflineAIAnswer, 'timestamp'>>
): Promise<OfflineAIAnswer | null> {
  const dbp = getDB();
  if (!dbp) return null;

  try {
    const db = await dbp;
    const record: OfflineAIAnswer = {
      id: makeId(),
      timestamp: entry.timestamp ?? Date.now(),
      question: entry.question,
      answer: entry.answer,
      sources: entry.sources,
    };

    const tx = db.transaction(STORE, 'readwrite');
    await tx.store.add(record);

    // Evict oldest beyond MAX_ENTRIES.
    const index = tx.store.index('by-timestamp');
    const allKeys = await index.getAllKeys();
    if (allKeys.length > MAX_ENTRIES) {
      const toRemove = allKeys.slice(0, allKeys.length - MAX_ENTRIES);
      for (const key of toRemove) {
        await tx.store.delete(key);
      }
    }
    await tx.done;
    return record;
  } catch (err) {
    console.warn('[offlineAICache] saveAnswer failed', err);
    return null;
  }
}

/**
 * Return the most-recent answers, newest first. Empty array if unavailable.
 */
export async function getRecentAnswers(limit = MAX_ENTRIES): Promise<OfflineAIAnswer[]> {
  const dbp = getDB();
  if (!dbp) return [];

  try {
    const db = await dbp;
    const index = db.transaction(STORE).store.index('by-timestamp');
    const all = await index.getAll();
    return all.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
  } catch (err) {
    console.warn('[offlineAICache] getRecentAnswers failed', err);
    return [];
  }
}

/**
 * Wipe the offline cache.
 */
export async function clearAll(): Promise<void> {
  const dbp = getDB();
  if (!dbp) return;

  try {
    const db = await dbp;
    await db.clear(STORE);
  } catch (err) {
    console.warn('[offlineAICache] clearAll failed', err);
  }
}

/** Exposed for tests and callers who want to know the cap. */
export const OFFLINE_AI_CACHE_LIMIT = MAX_ENTRIES;
