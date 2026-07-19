/**
 * storageUrls — central resolver for Supabase Storage references.
 *
 * STAGE 1 of the storage-privacy project: rows historically store FULL PUBLIC
 * URLs for buckets that are currently public (job-photos, visual-uploads,
 * briefings, briefing-photos, employee-photos). New writes store BARE PATHS
 * instead, and every reader resolves through here so both forms keep working.
 * STAGE 2 (later) flips the buckets private and migrates the stored URLs to
 * paths — at which point this resolver is already in place and nothing breaks.
 *
 * Rules:
 * - full http(s)/data:/blob: values are returned as-is (legacy rows, previews)
 * - bare paths are exchanged for a signed URL (1h), cached in-module
 * - resolution failures return null so callers can fall back gracefully
 */

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour
// Refresh cached entries 5 minutes before they expire so a grid that stays
// mounted never renders a dead link.
const CACHE_SAFETY_MS = 5 * 60 * 1000;

interface CacheEntry {
  url: string;
  expiresAt: number;
}

// Module-level cache keyed by `${bucket}/${path}` — shared across hooks so a
// photo grid and its full-screen viewer never sign the same object twice.
const signedUrlCache = new Map<string, CacheEntry>();

function cacheKey(bucket: string, path: string): string {
  return `${bucket}/${path}`;
}

function getCached(bucket: string, path: string): string | null {
  const entry = signedUrlCache.get(cacheKey(bucket, path));
  if (entry && entry.expiresAt > Date.now()) return entry.url;
  return null;
}

function setCached(bucket: string, path: string, url: string): void {
  signedUrlCache.set(cacheKey(bucket, path), {
    url,
    expiresAt: Date.now() + SIGNED_URL_TTL_SECONDS * 1000 - CACHE_SAFETY_MS,
  });
}

/** True when the stored value is already a renderable URL (legacy row / data URL). */
export function isFullUrl(stored: string): boolean {
  return /^(https?:|data:|blob:)/i.test(stored);
}

/**
 * Extract `{ bucket, path }` from a Supabase Storage URL (public, signed or
 * authenticated form; query strings stripped, path decoded). Returns null for
 * anything that is not a storage URL. Stage 2's data migration mirrors this
 * logic in SQL to convert stored public URLs into bare paths.
 */
export function storagePathFromPublicUrl(
  url: string
): { bucket: string; path: string } | null {
  const marker = '/storage/v1/object/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  // Strip the access-mode segment: public/ | sign/ | authenticated/
  const rest = url.slice(idx + marker.length).replace(/^(public|sign|authenticated)\//, '');
  const slash = rest.indexOf('/');
  if (slash === -1) return null;
  const bucket = rest.slice(0, slash);
  const rawPath = rest.slice(slash + 1).split('?')[0];
  if (!bucket || !rawPath) return null;
  try {
    return { bucket, path: decodeURIComponent(rawPath) };
  } catch {
    return { bucket, path: rawPath };
  }
}

function normalisePath(stored: string): string {
  return stored.replace(/^\/+/, '');
}

/**
 * Resolve a stored storage reference to a renderable URL.
 * - full URL (legacy row) → returned unchanged
 * - bare path → 1h signed URL (cached)
 * - empty / signing failure → null
 */
export async function resolveStorageUrl(
  bucket: string,
  stored: string | null | undefined
): Promise<string | null> {
  if (!stored) return null;
  if (isFullUrl(stored)) return stored;

  const path = normalisePath(stored);
  const cached = getCached(bucket, path);
  if (cached) return cached;

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (error || !data?.signedUrl) return null;
    setCached(bucket, path, data.signedUrl);
    return data.signedUrl;
  } catch {
    return null;
  }
}

/**
 * Mint a FRESH signed URL (1h) for a stored reference — use this when handing
 * a URL to an edge function that fetches it server-side (classify-photo,
 * visual-analysis, the v3 agents). Bypasses the read cache so the recipient
 * always gets a full-TTL link; legacy full URLs pass through untouched.
 * Signing works on public buckets too, so behaviour is identical before and
 * after the privacy flip.
 */
export async function mintFreshSignedUrl(
  bucket: string,
  stored: string | null | undefined
): Promise<string | null> {
  if (!stored) return null;
  if (isFullUrl(stored)) return stored;

  const path = normalisePath(stored);
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (error || !data?.signedUrl) return null;
    setCached(bucket, path, data.signedUrl);
    return data.signedUrl;
  } catch {
    return null;
  }
}

/**
 * Batch resolver for lists (photo grids) — signs all uncached bare paths in a
 * single createSignedUrls call so grids don't waterfall. Returns a map from
 * the ORIGINAL stored value to its resolved URL (or null when unresolvable).
 */
export async function resolveStorageUrls(
  bucket: string,
  storedList: Array<string | null | undefined>
): Promise<Map<string, string | null>> {
  const result = new Map<string, string | null>();
  const toSign: string[] = [];
  const pathByStored = new Map<string, string>();

  for (const stored of storedList) {
    if (!stored || result.has(stored)) continue;
    if (isFullUrl(stored)) {
      result.set(stored, stored);
      continue;
    }
    const path = normalisePath(stored);
    const cached = getCached(bucket, path);
    if (cached) {
      result.set(stored, cached);
    } else {
      result.set(stored, null);
      pathByStored.set(stored, path);
      if (!toSign.includes(path)) toSign.push(path);
    }
  }

  if (toSign.length > 0) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrls(toSign, SIGNED_URL_TTL_SECONDS);
      if (!error && data) {
        const urlByPath = new Map<string, string>();
        data.forEach((item, i) => {
          if (item.signedUrl) {
            const path = item.path ?? toSign[i];
            urlByPath.set(path, item.signedUrl);
            setCached(bucket, path, item.signedUrl);
          }
        });
        for (const [stored, path] of pathByStored) {
          const url = urlByPath.get(path);
          if (url) result.set(stored, url);
        }
      }
    } catch {
      // leave unresolved entries as null — callers fall back gracefully
    }
  }

  return result;
}

/**
 * Hook form of resolveStorageUrl for a single stored reference.
 * Legacy full URLs resolve synchronously (no flash); bare paths sign async.
 */
export function useStorageUrl(
  bucket: string,
  stored: string | null | undefined
): { url: string | null; loading: boolean } {
  const immediate =
    !stored ? null : isFullUrl(stored) ? stored : getCached(bucket, normalisePath(stored));
  const [url, setUrl] = useState<string | null>(immediate);
  const [loading, setLoading] = useState<boolean>(!immediate && !!stored);

  useEffect(() => {
    let cancelled = false;
    if (!stored) {
      setUrl(null);
      setLoading(false);
      return;
    }
    if (isFullUrl(stored)) {
      setUrl(stored);
      setLoading(false);
      return;
    }
    const cached = getCached(bucket, normalisePath(stored));
    if (cached) {
      setUrl(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    resolveStorageUrl(bucket, stored).then((resolved) => {
      if (!cancelled) {
        setUrl(resolved);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bucket, stored]);

  return { url, loading };
}

/**
 * Hook form of resolveStorageUrls for lists (photo grids). Returns a lookup
 * from the ORIGINAL stored value to its resolved URL — render with
 * `urls[stored] ?? undefined`. Batch-signs so grids don't waterfall.
 */
export function useStorageUrls(
  bucket: string,
  storedList: Array<string | null | undefined>
): { urls: Record<string, string>; loading: boolean } {
  // Stable identity for the effect dependency — callers often pass fresh arrays.
  const listKey = useMemo(() => storedList.filter(Boolean).join('\n'), [storedList]);

  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    const list = listKey ? listKey.split('\n') : [];
    if (list.length === 0) {
      setUrls({});
      setLoading(false);
      return;
    }

    // Synchronous first pass: legacy URLs + cache hits render immediately.
    const immediate: Record<string, string> = {};
    let needsAsync = false;
    for (const stored of list) {
      if (isFullUrl(stored)) {
        immediate[stored] = stored;
      } else {
        const cached = getCached(bucket, normalisePath(stored));
        if (cached) immediate[stored] = cached;
        else needsAsync = true;
      }
    }
    setUrls(immediate);

    if (!needsAsync) {
      setLoading(false);
      return;
    }

    setLoading(true);
    resolveStorageUrls(bucket, list).then((resolved) => {
      if (cancelled) return;
      const next: Record<string, string> = {};
      for (const [stored, url] of resolved) {
        if (url) next[stored] = url;
      }
      setUrls(next);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [bucket, listKey]);

  return { urls, loading };
}
