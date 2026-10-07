/**
 * Upload one file to a Supabase Storage bucket with progress.
 *
 * supabase-js's storage.upload() has no progress callback, so a 60 MB video
 * on a site phone signal looked frozen. This sends the same request
 * (POST /storage/v1/object/<bucket>/<path>, the signed-in user's token, so
 * storage RLS applies exactly as before) through XMLHttpRequest, which
 * reports upload progress.
 */
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

/** Evidence bucket ceiling (portfolio-evidence file_size_limit). */
export const EVIDENCE_MAX_BYTES = 100 * 1024 * 1024;
/** Longest video clip we accept for evidence and observations. */
export const VIDEO_MAX_SECONDS = 120;

export interface UploadProgressOptions {
  contentType?: string;
  cacheControl?: string;
  upsert?: boolean;
  /** 0–1 as bytes go up. */
  onProgress?: (fraction: number) => void;
}

export async function uploadWithProgress(
  bucket: string,
  path: string,
  file: Blob,
  opts: UploadProgressOptions = {}
): Promise<{ path: string }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token ?? SUPABASE_PUBLISHABLE_KEY;
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encoded}`;
  const contentType = opts.contentType || file.type || 'application/octet-stream';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('apikey', SUPABASE_PUBLISHABLE_KEY);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('cache-control', `max-age=${opts.cacheControl ?? '3600'}`);
    xhr.setRequestHeader('x-upsert', opts.upsert ? 'true' : 'false');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && e.total > 0) opts.onProgress?.(Math.min(1, e.loaded / e.total));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        opts.onProgress?.(1);
        resolve({ path });
        return;
      }
      let message = `Upload failed (${xhr.status})`;
      try {
        const body = JSON.parse(xhr.responseText) as { message?: string; error?: string };
        message = body.message || body.error || message;
      } catch {
        /* keep the status message */
      }
      if (xhr.status === 413 || /maximum allowed size|too large/i.test(message)) {
        // Bucket allows 100 MB; the project-wide storage limit can be lower.
        message = 'That file is too big to upload. Trim the clip, or film at 1080p rather than 4K.';
      }
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error('Check your signal and try again.'));
    xhr.ontimeout = () => reject(new Error('The upload timed out. Check your signal and try again.'));
    xhr.send(file);
  });
}

/** A video's length in seconds, or null when the browser cannot read it. */
export function videoDurationSeconds(file: Blob): Promise<number | null> {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.muted = true;
      const done = (n: number | null) => {
        URL.revokeObjectURL(url);
        resolve(n);
      };
      const timer = window.setTimeout(() => done(null), 8000);
      v.onloadedmetadata = () => {
        window.clearTimeout(timer);
        done(Number.isFinite(v.duration) ? v.duration : null);
      };
      v.onerror = () => {
        window.clearTimeout(timer);
        done(null);
      };
      v.src = url;
    } catch {
      resolve(null);
    }
  });
}

export const VIDEO_LIMIT_COPY = 'Videos up to 2 minutes. If your phone films in 4K, switch to 1080p.';
