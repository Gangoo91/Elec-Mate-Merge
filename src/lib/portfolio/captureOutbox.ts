/**
 * captureOutbox — capture works offline end to end (ELE-1894).
 *
 * An outbox in IndexedDB: a piece of evidence, its raw file blobs and any
 * off-the-job hours that go with it are queued on the phone the moment the
 * learner taps Save, then sent when there is signal. Nothing is removed from
 * the outbox until the server has the row, the files and the hours, so a
 * photo taken on site with no signal is never lost.
 *
 *   enqueueCapture()   store the item + blobs (never needs signal)
 *   syncCaptureOutbox() upload files, create the row, write criteria + hours
 *   listCaptureOutbox() what is waiting, for the visible queue
 *
 * Idempotent by construction: the portfolio row and the hours row carry ids
 * made on the phone, and file paths are derived from them, so a retry after a
 * dropped connection finds the same objects instead of filing them twice.
 * Conflicts on the learner's own fields resolve last-write-wins
 * (createPortfolioItem).
 *
 * Every IDB call degrades to a no-op when IndexedDB is unavailable; the caller
 * then falls back to a direct save while online.
 */
import { supabase } from '@/integrations/supabase/client';
import type { PortfolioEntry, PortfolioFile } from '@/types/portfolio';
import type { AcRef } from '@/lib/portfolio/acRef';
import type { CaptureSource } from '@/lib/portfolio/capturePresets';
import { createPortfolioItem } from '@/hooks/portfolio/portfolioWrites';
import type { CaptureStamp } from '@/lib/portfolio/captureStamp';
import { sha256OfBlob } from '@/lib/portfolio/contentHash';
import { notifyPortfolioChanged } from '@/hooks/portfolio/usePortfolio';
import { rejectedClaimsText, setItemCriteria } from '@/lib/portfolio/claimCriteria';

export interface OutboxFile {
  localId: string;
  name: string;
  type: string;
  size: number;
  blob: Blob;
  /** Set once the file is in storage, so a retry never uploads it again. */
  storageUrl?: string;
  sha256?: string | null;
  evidenceType?: string;
}

/** Off-the-job hours that go with the evidence (a reflection that counts as OTJ). */
export interface OutboxOtj {
  id: string;
  college_id: string;
  activity_date: string;
  duration_minutes: number;
  activity_type: string;
  title: string;
  description: string;
  recorded_by_name_snapshot: string | null;
}

export interface OutboxSuggestion {
  unit_code: string;
  ac_code: string;
  confidence?: number;
  reason?: string | null;
}

export type OutboxState = 'waiting' | 'syncing' | 'failed';

export interface OutboxItem {
  /** = portfolio_items.id once it lands. */
  id: string;
  uid: string;
  createdAt: number;
  updatedAt: number;
  entry: Omit<PortfolioEntry, 'id' | 'dateCreated' | 'evidenceFiles'>;
  source: CaptureSource | null;
  dateCompleted?: string | null;
  /** When and (with permission) roughly where it was captured, made on the phone. */
  capture?: CaptureStamp | null;
  claimed: AcRef[];
  suggested: OutboxSuggestion[];
  files: OutboxFile[];
  otj?: OutboxOtj | null;
  state: OutboxState;
  attempts: number;
  lastError?: string | null;
}

export type NewOutboxItem = Omit<
  OutboxItem,
  'createdAt' | 'updatedAt' | 'state' | 'attempts' | 'lastError'
>;

export interface SyncedItem {
  id: string;
  title: string;
  claimed: AcRef[];
  hadOtj: boolean;
  /** Plain words for claims the database refused (not in the learner's qualification). */
  criteriaWarning?: string;
}

export const OUTBOX_CHANGED = 'capture-outbox-changed';
export const OUTBOX_SYNCED = 'capture-outbox-synced';

const DB_NAME = 'elecmate-capture-outbox';
const STORE = 'items';
const BUCKET = 'portfolio-evidence';

/* ───────────────────────────── IndexedDB ───────────────────────────── */

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') return resolve(null);
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        try {
          if (!req.result.objectStoreNames.contains(STORE)) {
            const s = req.result.createObjectStore(STORE, { keyPath: 'id' });
            s.createIndex('uid', 'uid', { unique: false });
          }
        } catch {
          /* degrade */
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

function tx<T>(
  mode: IDBTransactionMode,
  run: (s: IDBObjectStore) => IDBRequest<T> | void
): Promise<T | null> {
  return openDb().then(
    (db) =>
      new Promise<T | null>((resolve) => {
        if (!db) return resolve(null);
        try {
          const t = db.transaction(STORE, mode);
          const req = run(t.objectStore(STORE));
          let value: T | null = null;
          if (req) req.onsuccess = () => (value = req.result as T);
          t.oncomplete = () => {
            db.close();
            resolve(value ?? (mode === 'readwrite' ? (true as unknown as T) : null));
          };
          t.onerror = () => {
            db.close();
            resolve(null);
          };
          t.onabort = () => {
            db.close();
            resolve(null);
          };
        } catch {
          db.close();
          resolve(null);
        }
      })
  );
}

function emitChanged() {
  try {
    window.dispatchEvent(new CustomEvent(OUTBOX_CHANGED));
  } catch {
    /* no window (tests) */
  }
}

async function put(item: OutboxItem): Promise<boolean> {
  const ok = await tx('readwrite', (s) => s.put(item));
  return ok !== null;
}

/** Whether this device can hold an outbox at all. */
export async function outboxAvailable(): Promise<boolean> {
  const db = await openDb();
  db?.close();
  return !!db;
}

/** Queue a capture on the phone. Returns false only when IndexedDB is unusable. */
export async function enqueueCapture(item: NewOutboxItem): Promise<boolean> {
  const now = Date.now();
  const ok = await put({
    ...item,
    createdAt: now,
    updatedAt: now,
    state: 'waiting',
    attempts: 0,
    lastError: null,
  });
  emitChanged();
  return ok;
}

export async function listCaptureOutbox(uid: string): Promise<OutboxItem[]> {
  const all = (await tx<OutboxItem[]>('readonly', (s) => s.index('uid').getAll(uid))) ?? [];
  return all.sort((a, b) => a.createdAt - b.createdAt);
}

export async function getOutboxItem(id: string): Promise<OutboxItem | null> {
  return (await tx<OutboxItem>('readonly', (s) => s.get(id))) ?? null;
}

async function remove(id: string) {
  await tx('readwrite', (s) => s.delete(id));
}

/** The learner throws a queued item away. Only ever on an explicit tap. */
export async function discardOutboxItem(id: string) {
  await remove(id);
  emitChanged();
}

/* ───────────────────────────── sync ───────────────────────────── */

function extOf(name: string, type: string): string {
  const fromName = name.includes('.') ? name.split('.').pop() : '';
  if (fromName) return fromName.toLowerCase().slice(0, 8);
  const fromType = type.split('/')[1];
  return (fromType || 'bin').slice(0, 8);
}

function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

async function uploadOne(item: OutboxItem, f: OutboxFile): Promise<string> {
  // Path derived from the item and file ids: a retry overwrites the same object.
  const path = `${item.uid}/${item.id}-${f.localId}.${extOf(f.name, f.type)}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, f.blob, { contentType: f.type || undefined, upsert: true });
  if (error) throw new Error(error.message || 'Upload failed');
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Sends one item. Throws on failure; `retryable === false` means the server refused it. */
async function syncOne(item: OutboxItem): Promise<SyncedItem> {
  // 1. Files, one at a time, saving progress after each so nothing re-uploads.
  for (const f of item.files) {
    if (f.storageUrl) continue;
    if (f.sha256 === undefined) f.sha256 = await sha256OfBlob(f.blob);
    f.storageUrl = await uploadOne(item, f);
    item.updatedAt = Date.now();
    await put(item);
  }

  // 2. The portfolio row (idempotent on its id).
  const evidenceFiles: PortfolioFile[] = item.files.map((f) => ({
    id: f.localId,
    name: f.name,
    type: f.type,
    size: f.size,
    url: f.storageUrl!,
    uploadDate: new Date(item.createdAt).toISOString(),
    ...(f.sha256 ? { sha256: f.sha256 } : {}),
    ...(f.evidenceType ? { evidenceType: f.evidenceType as PortfolioFile['evidenceType'] } : {}),
  }));
  const res = await createPortfolioItem(
    item.uid,
    { ...item.entry, evidenceFiles },
    { id: item.id, source: item.source, dateCompleted: item.dateCompleted, capture: item.capture }
  );
  if (!res.ok) {
    const e = new Error(res.error) as Error & { retryable?: boolean };
    e.retryable = res.retryable;
    throw e;
  }

  // 3. Typed criteria: the learner's claims and the AI suggestions they left.
  let criteriaWarning: string | undefined;
  if (item.claimed.length || item.suggested.length) {
    const res = await setItemCriteria(item.id, item.claimed, item.suggested);
    // The legacy string claims already carry the criteria and a trigger types
    // them, so a failure here is not worth holding the evidence back for. A
    // claim refused as not in the learner's qualification is told to them.
    if (res.rejected.length) criteriaWarning = rejectedClaimsText(res.rejected, res.qualification);
    if (res.error) console.warn('[outbox] typed criteria not written', res.error);
  }

  // 4. Hours that go with it (idempotent on its id).
  if (item.otj) {
    const o = item.otj;
    const { error } = await supabase.from('college_otj_entries').insert({
      id: o.id,
      college_id: o.college_id,
      student_id: item.uid,
      recorded_by: item.uid,
      recorded_by_name_snapshot: o.recorded_by_name_snapshot,
      activity_date: o.activity_date,
      activity_type: o.activity_type,
      title: o.title,
      description: o.description,
      duration_minutes: o.duration_minutes,
      source: 'apprentice',
      source_kind: 'apprentice_submitted',
      verification_status: 'pending',
    } as never);
    if (error && error.code !== '23505') {
      const e = new Error(error.message) as Error & { retryable?: boolean };
      e.retryable = !error.code;
      throw e;
    }
  }

  return {
    id: item.id,
    title: item.entry.title,
    claimed: item.claimed,
    hadOtj: !!item.otj,
    ...(criteriaWarning ? { criteriaWarning } : {}),
  };
}

let running: Promise<SyncedItem[]> | null = null;

/**
 * Sends everything waiting for this learner. Safe to call often: one run at a
 * time per tab (and per device where Web Locks exist), skipped while offline.
 */
export function syncCaptureOutbox(
  uid: string,
  opts: { includeFailed?: boolean } = {}
): Promise<SyncedItem[]> {
  if (!uid || isOffline()) return Promise.resolve([]);
  if (running) return running;
  const run = async (): Promise<SyncedItem[]> => {
    const done: SyncedItem[] = [];
    const items = await listCaptureOutbox(uid);
    for (const item of items) {
      if (isOffline()) break;
      if (item.state === 'failed' && !opts.includeFailed) continue;
      // Another sender (the capture sheet's Save) has it in hand.
      if (item.state === 'syncing') continue;
      item.state = 'syncing';
      item.attempts += 1;
      await put(item);
      emitChanged();
      try {
        const synced = await syncOne(item);
        await remove(item.id);
        done.push(synced);
      } catch (e) {
        const err = e as Error & { retryable?: boolean };
        // Lost signal mid-send: wait for the next chance. A refusal from the
        // server: stop retrying on its own and show it, but keep everything.
        item.state = err.retryable === false ? 'failed' : 'waiting';
        item.lastError = err.message || 'Could not send';
        item.updatedAt = Date.now();
        await put(item);
      }
      emitChanged();
    }
    if (done.length) {
      notifyPortfolioChanged();
      try {
        window.dispatchEvent(new CustomEvent(OUTBOX_SYNCED, { detail: done }));
      } catch {
        /* no window */
      }
    }
    return done;
  };
  const locks = (typeof navigator !== 'undefined' ? navigator.locks : undefined) as
    LockManager | undefined;
  running = (
    locks
      ? (locks.request(`capture-outbox:${uid}`, run) as unknown as Promise<SyncedItem[]>)
      : run()
  ).finally(() => {
    running = null;
  });
  return running;
}

/**
 * On start, items left 'syncing' by an app that was killed mid-send go back to
 * waiting so they are sent again (the ids make that safe).
 */
export async function recoverInterrupted(uid: string) {
  const items = await listCaptureOutbox(uid);
  let changed = false;
  for (const it of items) {
    if (it.state === 'syncing') {
      it.state = 'waiting';
      await put(it);
      changed = true;
    }
  }
  if (changed) emitChanged();
}

/** Retry one item the server refused, after the learner taps Try again. */
export async function retryOutboxItem(uid: string, id: string) {
  const it = await getOutboxItem(id);
  if (!it) return [];
  it.state = 'waiting';
  it.lastError = null;
  await put(it);
  emitChanged();
  return syncCaptureOutbox(uid);
}

/**
 * Sends one just-queued item straight away, for the capture sheet's Save when
 * there is signal. Same path as the background sync, so a save made online and
 * one made in a basement end up identical. Does not raise the "synced" toast:
 * the sheet tells the learner itself. On failure the item stays queued.
 */
export async function sendOutboxItemNow(
  uid: string,
  id: string
): Promise<{ ok: true; item: SyncedItem } | { ok: false; queued: boolean; error: string }> {
  if (isOffline()) return { ok: false, queued: true, error: 'offline' };
  if (running) await running.catch(() => undefined);
  const item = await getOutboxItem(id);
  if (!item || item.uid !== uid) return { ok: false, queued: false, error: 'not queued' };
  item.state = 'syncing';
  item.attempts += 1;
  await put(item);
  emitChanged();
  try {
    const synced = await syncOne(item);
    await remove(item.id);
    emitChanged();
    return { ok: true, item: synced };
  } catch (e) {
    const err = e as Error & { retryable?: boolean };
    item.state = err.retryable === false ? 'failed' : 'waiting';
    item.lastError = err.message || 'Could not send';
    item.updatedAt = Date.now();
    await put(item);
    emitChanged();
    return { ok: false, queued: true, error: item.lastError };
  }
}
