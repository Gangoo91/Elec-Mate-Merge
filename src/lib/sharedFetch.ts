/**
 * sharedFetch — one network call for several components that mount together.
 *
 * ELE-1912: the College Hub shell mounts the same data hook in several places
 * at once (the bell, the overview, the inbox each call useUnifiedInbox, and
 * each of those calls useMarkingQueue), and every instance fetched for itself
 * — the same three-step query chain three times on every screen.
 *
 * Callers with the same key inside `ttlMs` share one promise. Pass
 * `force: true` (realtime events, a Refresh button) to always fetch fresh;
 * the fresh answer then becomes the shared one. A failed fetch is never
 * shared.
 */
type Entry = { at: number; promise: Promise<unknown> };
const entries = new Map<string, Entry>();

export function sharedFetch<T>(
  key: string,
  fn: () => Promise<T>,
  { ttlMs = 3000, force = false }: { ttlMs?: number; force?: boolean } = {}
): Promise<T> {
  const now = Date.now();
  const hit = entries.get(key);
  if (!force && hit && now - hit.at < ttlMs) return hit.promise as Promise<T>;
  const promise = fn();
  const entry: Entry = { at: now, promise };
  entries.set(key, entry);
  promise.catch(() => {
    if (entries.get(key) === entry) entries.delete(key);
  });
  return promise;
}

/** Forget a shared answer (after a write the caller knows changes it). */
export function clearSharedFetch(prefix: string): void {
  for (const k of Array.from(entries.keys())) if (k.startsWith(prefix)) entries.delete(k);
}
