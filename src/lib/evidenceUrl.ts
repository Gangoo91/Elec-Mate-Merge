import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   evidenceUrl — single source of truth for resolving a stored evidence
   reference to a usable URL.

   The portfolio-evidence and evidence-files buckets store FULL public URLs in
   the DB (portfolio_items.storage_urls, college_otj_entries.evidence_url, ...).
   To lock those buckets down we serve signed URLs instead — but signed URLs
   expire, so they can't be stored. This resolver extracts the storage PATH from
   whatever was stored and mints a fresh signed URL on demand.

   Design goals (so the rollout is safe):
   - Deploy-safe: works whether the bucket is still public OR already private.
     On any failure it falls back to the stored value (which works while public),
     so shipping this changes nothing until the bucket is actually flipped.
   - One place: every display site uses resolveEvidenceUrl / useEvidenceUrl /
     <EvidenceImage>, so flipping the bucket is a no-op for the UI.
   - Cheap: signed URLs are cached per path (a grid of thumbnails signs each
     path once, not once per render), and identical in-flight requests dedupe.
   - Inert for anything else: non-evidence URLs (external, other buckets) pass
     through untouched.
   ========================================================================== */

const EVIDENCE_BUCKETS = ['portfolio-evidence', 'evidence-files'] as const;
type EvidenceBucket = (typeof EVIDENCE_BUCKETS)[number];

const SIGN_TTL_SECONDS = 3600; // signed URL valid for 1h
const CACHE_TTL_MS = 50 * 60 * 1000; // reuse a signed URL for 50m (< its lifetime)

interface CacheEntry {
  url: string;
  expires: number;
}
const cache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<string>>();

/**
 * Pull { bucket, path } out of a stored value. Handles full public URLs
 * (`/object/public/<bucket>/<path>`), signed URLs (`/object/sign/<bucket>/...`)
 * and authenticated URLs. Returns null for anything that isn't one of our
 * evidence buckets (external image, data URI, other bucket) so it passes through.
 */
export function parseEvidenceRef(
  stored: string
): { bucket: EvidenceBucket; path: string } | null {
  const marker = '/storage/v1/object/';
  const idx = stored.indexOf(marker);
  if (idx === -1) return null;
  const rest = stored.slice(idx + marker.length).replace(/^(public|sign|authenticated)\//, '');
  for (const bucket of EVIDENCE_BUCKETS) {
    const prefix = `${bucket}/`;
    if (rest.startsWith(prefix)) {
      const path = decodeURIComponent(rest.slice(prefix.length).split('?')[0]);
      if (!path) return null;
      return { bucket, path };
    }
  }
  return null;
}

/**
 * Resolve a single stored evidence reference to a usable (signed) URL.
 * Falls back to the stored value on any failure, so it is safe before the
 * bucket flip and degrades gracefully after.
 */
export async function resolveEvidenceUrl(stored?: string | null): Promise<string | null> {
  if (!stored) return null;
  const ref = parseEvidenceRef(stored);
  if (!ref) return stored; // not ours — leave untouched

  const key = `${ref.bucket}/${ref.path}`;
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.url;

  const existing = inFlight.get(key);
  if (existing) return existing;

  const request = (async () => {
    try {
      const { data, error } = await supabase.storage
        .from(ref.bucket)
        .createSignedUrl(ref.path, SIGN_TTL_SECONDS);
      if (error || !data?.signedUrl) return stored;
      cache.set(key, { url: data.signedUrl, expires: Date.now() + CACHE_TTL_MS });
      return data.signedUrl;
    } catch {
      return stored;
    } finally {
      inFlight.delete(key);
    }
  })();
  inFlight.set(key, request);
  return request;
}

/**
 * Batch variant — signs many references in one round-trip per bucket where
 * possible. Returns a map keyed by the original stored value.
 */
export async function resolveEvidenceUrls(
  stored: Array<string | null | undefined>
): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  const byBucket = new Map<EvidenceBucket, Map<string, string>>(); // bucket -> path -> original

  for (const s of stored) {
    if (!s) continue;
    const ref = parseEvidenceRef(s);
    if (!ref) {
      out.set(s, s);
      continue;
    }
    const key = `${ref.bucket}/${ref.path}`;
    const cached = cache.get(key);
    if (cached && cached.expires > Date.now()) {
      out.set(s, cached.url);
      continue;
    }
    let m = byBucket.get(ref.bucket);
    if (!m) {
      m = new Map();
      byBucket.set(ref.bucket, m);
    }
    m.set(ref.path, s);
  }

  for (const [bucket, paths] of byBucket) {
    try {
      const { data } = await supabase.storage
        .from(bucket)
        .createSignedUrls([...paths.keys()], SIGN_TTL_SECONDS);
      for (const row of data ?? []) {
        const original = row.path ? paths.get(row.path) : undefined;
        if (original && row.signedUrl) {
          cache.set(`${bucket}/${row.path}`, {
            url: row.signedUrl,
            expires: Date.now() + CACHE_TTL_MS,
          });
          out.set(original, row.signedUrl);
        }
      }
    } catch {
      /* leave unresolved entries to fall back below */
    }
    for (const original of paths.values()) {
      if (!out.has(original)) out.set(original, original); // graceful fallback
    }
  }
  return out;
}

/**
 * Resolve then open in a new tab — for download links / window.open sites.
 * Opens the tab SYNCHRONOUSLY inside the click handler so popup blockers and the
 * iOS (Capacitor) webview don't block it, then redirects once the signed URL
 * resolves. opener is nulled for safety.
 */
export async function openEvidence(stored?: string | null): Promise<void> {
  const win = window.open('about:blank', '_blank');
  const url = await resolveEvidenceUrl(stored);
  if (!url) {
    win?.close();
    return;
  }
  if (win) {
    try {
      win.opener = null;
    } catch {
      /* cross-origin guard — ignore */
    }
    win.location.replace(url);
  } else {
    // Popup was blocked before the await resolved — best-effort direct open.
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/** React hook: resolves a stored evidence reference to a signed URL. */
export function useEvidenceUrl(stored?: string | null): string | null {
  const [url, setUrl] = useState<string | null>(stored ?? null);
  useEffect(() => {
    let active = true;
    void resolveEvidenceUrl(stored).then((resolved) => {
      if (active) setUrl(resolved);
    });
    return () => {
      active = false;
    };
  }, [stored]);
  return url;
}
