import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   workerOfflineCache — Worker Tools opens in a basement (ELE-1828).

   The few reads a worker needs on site (their roster row, today's and this
   week's jobs, a job's page and documents, their tasks, sign-offs and
   timesheets) are kept on this phone every time they load. When the network
   is not there, the query answers from that copy instead of failing, so the
   page renders as it was last seen. When the signal comes back React Query
   refetches (refetchOnReconnect) and the copy is replaced.

   Wrap a queryFn with offlineSnapshot(key, fn) and give the query
   networkMode: 'offlineFirst' (OFFLINE_FIRST below) so it runs with no
   connection instead of pausing with no data.

   Kept per signed-in user and wiped on sign-out. A cache, never a source of
   truth: anything the worker DOES offline goes through workerOutbox.
   ========================================================================== */

const PREFIX = 'wt-offline:v1:';
const INDEX = `${PREFIX}index`;
const MAX_ENTRIES = 80;

/** Spread into a useQuery so it still runs (and answers from the phone) offline. */
export const OFFLINE_FIRST = { networkMode: 'offlineFirst' as const };

interface Snapshot<T> {
  at: string;
  data: T;
}

let knownUid: string | null = null;

async function currentUid(): Promise<string | null> {
  try {
    // getSession reads the stored session; it does not need the network.
    const { data } = await supabase.auth.getSession();
    knownUid = data.session?.user?.id ?? knownUid;
  } catch {
    // keep the last known id
  }
  return knownUid;
}

export function isOfflineError(e: unknown): boolean {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return true;
  const err = e as { message?: string; code?: string; name?: string } | null;
  const msg = `${err?.name ?? ''} ${err?.message ?? ''}`;
  return /failed to fetch|fetch failed|networkerror|network request failed|load failed|timed? ?out|aborted|offline|ERR_INTERNET|ERR_NETWORK|AuthRetryableFetchError/i.test(
    msg
  );
}

function readIndex(): string[] {
  try {
    return JSON.parse(localStorage.getItem(INDEX) || '[]') as string[];
  } catch {
    return [];
  }
}
function writeIndex(keys: string[]) {
  try {
    localStorage.setItem(INDEX, JSON.stringify(keys));
  } catch {
    /* ignore */
  }
}

function read<T>(storeKey: string): Snapshot<T> | null {
  try {
    const raw = localStorage.getItem(storeKey);
    return raw ? (JSON.parse(raw) as Snapshot<T>) : null;
  } catch {
    return null;
  }
}

function write<T>(storeKey: string, data: T) {
  const value = JSON.stringify({ at: new Date().toISOString(), data } satisfies Snapshot<T>);
  const index = readIndex().filter((k) => k !== storeKey);
  index.push(storeKey);
  for (let attempt = 0; attempt < 3; attempt++) {
    // Oldest first out when over the cap or the phone's storage is full.
    while (index.length > MAX_ENTRIES) {
      const old = index.shift();
      if (old) localStorage.removeItem(old);
    }
    try {
      localStorage.setItem(storeKey, value);
      writeIndex(index);
      return;
    } catch {
      const drop = index.splice(0, Math.max(1, Math.floor(index.length / 2)));
      drop.filter((k) => k !== storeKey).forEach((k) => localStorage.removeItem(k));
      if (!index.includes(storeKey)) index.push(storeKey);
    }
  }
}

/**
 * Run fn; keep what it returns on this phone. If the network is not there,
 * answer with the last copy instead (or rethrow when there is none).
 *
 * nullIsSuspect: some reads return null rather than throwing when auth can't
 * reach the server (getUser offline). For those, a null with no network falls
 * back to the copy too.
 */
export async function offlineSnapshot<T>(
  key: string,
  fn: () => Promise<T>,
  opts: { nullIsSuspect?: boolean } = {}
): Promise<T> {
  const uid = await currentUid();
  const storeKey = uid ? `${PREFIX}${uid}:${key}` : null;
  const fallback = () => (storeKey ? read<T>(storeKey) : null);

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const snap = fallback();
    if (snap) return snap.data;
  }

  let data: T;
  try {
    data = await fn();
  } catch (e) {
    if (isOfflineError(e)) {
      const snap = fallback();
      if (snap) return snap.data;
    }
    throw e;
  }

  if (data == null && opts.nullIsSuspect) {
    const snap = fallback();
    if (snap) {
      // Only trust the copy when the server truly can't be reached.
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return snap.data;
      try {
        const { error } = await supabase.auth.getUser();
        if (error && isOfflineError(error)) return snap.data;
      } catch (e) {
        if (isOfflineError(e)) return snap.data;
      }
    }
  }

  if (storeKey && data !== undefined) write(storeKey, data);
  return data;
}

/**
 * Keep / read a copy for a known user id outside a query (the signed-in
 * profile, so the app shell opens with no signal). Same per-user store, so it
 * is wiped on sign-out with everything else.
 */
export function keepCopy<T>(uid: string, key: string, data: T) {
  try {
    write(`${PREFIX}${uid}:${key}`, data);
  } catch {
    /* ignore */
  }
}
export function readCopy<T>(uid: string, key: string): T | null {
  return read<T>(`${PREFIX}${uid}:${key}`)?.data ?? null;
}

/** When the copy for a key was taken (for "last updated" lines). */
export function snapshotAge(key: string): string | null {
  if (!knownUid) return null;
  return read(`${PREFIX}${knownUid}:${key}`)?.at ?? null;
}

function clearAll() {
  readIndex().forEach((k) => localStorage.removeItem(k));
  localStorage.removeItem(INDEX);
}

let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  try {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        knownUid = null;
        try {
          clearAll();
        } catch {
          /* ignore */
        }
      } else if (session?.user?.id) {
        knownUid = session.user.id;
      }
    });
  } catch {
    /* ignore */
  }
}
start();
