import { supabase } from '@/integrations/supabase/client';

/**
 * Photos in the `safety-photos` bucket, served as short-lived SIGNED links.
 *
 * The bucket is public today, and rows store public URLs
 * (…/storage/v1/object/public/safety-photos/<user>/<file>). Site photos show
 * people's homes and addresses, so the bucket is to become private. That has
 * to happen in two steps or every photo in the live app breaks:
 *   1. the app asks for signed links (this file) and is released;
 *   2. then the bucket is made private.
 * Until step 2, a failed signing falls back to the stored URL, which still
 * works — so this is safe to ship before the switch.
 *
 * Requests made in the same tick are signed in ONE call (a gallery of 60
 * thumbnails is one request, not 60), and links are cached until shortly
 * before they expire.
 */

const BUCKET = 'safety-photos';
const TTL_SECONDS = 60 * 60 * 6;
const MARKERS = [
  `/storage/v1/object/public/${BUCKET}/`,
  `/storage/v1/object/sign/${BUCKET}/`,
  `/storage/v1/render/image/public/${BUCKET}/`,
];

/** The object path inside safety-photos, or null if `ref` is not one of ours. */
export function safetyPhotoPath(ref: string | null | undefined): string | null {
  if (!ref) return null;
  for (const m of MARKERS) {
    const i = ref.indexOf(m);
    if (i !== -1) return decodeURIComponent(ref.slice(i + m.length).split('?')[0]);
  }
  return null;
}

const cache = new Map<string, { url: string; until: number }>();

/*
 * ELE-2031: a safety report sent from Worker Tools stores its photos as paths
 * in the PRIVATE visual-uploads bucket (`<uid>/issues/…`, `<uid>/incidents/…`)
 * on the worker's own near-miss / accident record. Signed here so the same
 * <StoragePhoto> shows them in the Electrical Hub and the Employer Hub
 * (storage RLS: the owner, or a manager of the firm via can_read_visual_upload).
 */
const VISUAL_UPLOAD_PATH =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/(issues|incidents)\//i;
const visualCache = new Map<string, { url: string; until: number }>();

export function isVisualUploadPath(ref: string | null | undefined): boolean {
  return !!ref && VISUAL_UPLOAD_PATH.test(ref);
}

async function signVisualUpload(path: string): Promise<string> {
  const hit = visualCache.get(path);
  if (hit && hit.until > Date.now()) return hit.url;
  try {
    const { data } = await supabase.storage
      .from('visual-uploads')
      .createSignedUrl(path, TTL_SECONDS);
    if (data?.signedUrl) {
      visualCache.set(path, {
        url: data.signedUrl,
        until: Date.now() + (TTL_SECONDS - 600) * 1000,
      });
      return data.signedUrl;
    }
  } catch {
    /* fall through */
  }
  return '';
}
let pending: Map<string, ((url: string | null) => void)[]> | null = null;

async function flush(batch: Map<string, ((url: string | null) => void)[]>) {
  const paths = [...batch.keys()];
  let signed: { path: string | null; signedUrl: string }[] = [];
  try {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrls(paths, TTL_SECONDS);
    signed = (data ?? []) as { path: string | null; signedUrl: string }[];
  } catch {
    /* fall back below */
  }
  const byPath = new Map(
    signed.filter((s) => s.path && s.signedUrl).map((s) => [s.path!, s.signedUrl])
  );
  const until = Date.now() + (TTL_SECONDS - 600) * 1000;
  for (const [path, waiters] of batch) {
    const url = byPath.get(path) ?? null;
    if (url) cache.set(path, { url, until });
    waiters.forEach((w) => w(url));
  }
}

/**
 * A displayable/fetchable URL for a stored photo reference. Refs that are not
 * in safety-photos (data: URLs, other buckets, external links) come back as
 * they are. If signing fails, the original ref is returned.
 */
export function resolveSafetyPhoto(ref: string | null | undefined): Promise<string> {
  const original = ref ?? '';
  if (isVisualUploadPath(original)) return signVisualUpload(original);
  const path = safetyPhotoPath(original);
  if (!path) return Promise.resolve(original);
  const hit = cache.get(path);
  if (hit && hit.until > Date.now()) return Promise.resolve(hit.url);
  return new Promise((resolve) => {
    if (!pending) {
      pending = new Map();
      const batch = pending;
      setTimeout(() => {
        pending = null;
        void flush(batch);
      }, 15);
    }
    const list = pending.get(path) ?? [];
    list.push((url) => resolve(url ?? original));
    pending.set(path, list);
  });
}

/** Synchronous cache read, so a re-render does not flash the old URL. */
export function cachedSafetyPhoto(ref: string | null | undefined): string | null {
  if (ref && isVisualUploadPath(ref)) {
    const hit = visualCache.get(ref);
    return hit && hit.until > Date.now() ? hit.url : null;
  }
  const path = safetyPhotoPath(ref);
  if (!path) return ref ?? null;
  const hit = cache.get(path);
  return hit && hit.until > Date.now() ? hit.url : null;
}

/**
 * A link to send to someone else (share sheet, "copy link"). Signed for 7 days:
 * long enough to be opened, short enough not to be a permanent public copy of
 * someone's home. Falls back to the stored ref if signing fails.
 */
export async function shareableSafetyPhotoLink(ref: string | null | undefined): Promise<string> {
  const path = safetyPhotoPath(ref);
  if (!path) return ref ?? '';
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? ref ?? '';
}
