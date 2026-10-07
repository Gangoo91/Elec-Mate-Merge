import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { resolveStorageUrls, storagePathFromPublicUrl } from '@/utils/storageUrls';

/* ==========================================================================
   Photo feed (ELE-1970): every photo on every job in one list, from
   get_photo_feed. Sources:
     job   — office uploads (job-photos bucket, job_photos rows)
     snag  — snag / defect photos (visual-uploads, job_issues.photos)
     issue — other issue photos (variation, RFI, delay…)
     diary — office log and crew progress-note photos (visual-uploads)
     task  — task photos (task-photos bucket, employer_job_tasks.photos)
   Bare paths are batch-signed per bucket. `url` is null when the file is not
   in storage (server says `missing`) or could not be signed: the UI shows a
   clear "Photo unavailable" tile for those, never a broken image.
   ========================================================================== */

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export type PhotoSource = 'job' | 'snag' | 'issue' | 'diary' | 'task';

export const PHOTO_SOURCE_LABEL: Record<PhotoSource, string> = {
  job: 'Uploaded',
  snag: 'Snags',
  issue: 'Issues',
  diary: 'Site diary',
  task: 'Tasks',
};

export interface FeedPhoto {
  key: string;
  source: PhotoSource;
  ref_id: string;
  /** Issue status, task status, or 'office' / 'team' for diary photos. */
  ref_type: string | null;
  bucket: string;
  path: string;
  job_id: string;
  job_title: string | null;
  client: string | null;
  taken_at: string;
  caption: string | null;
  /** Before/During/After… for uploads, the issue type for issue photos. */
  category: string | null;
  author: string;
  approved: boolean | null;
  shared: boolean | null;
  lat: number | null;
  lng: number | null;
  address: string | null;
  missing: boolean;
  /** Signed (or legacy full) URL; null when the file is unavailable. */
  url: string | null;
}

export const PHOTO_FEED_KEY = ['photo-feed'] as const;

export function usePhotoFeed(jobId?: string | null) {
  return useQuery({
    queryKey: [...PHOTO_FEED_KEY, jobId ?? 'all'],
    staleTime: 60 * 1000,
    queryFn: async (): Promise<FeedPhoto[]> => {
      const { data, error } = await rpc('get_photo_feed', { p_job_id: jobId ?? null });
      if (error) throw new Error(error.message);
      const raw = (Array.isArray(data) ? data : []) as Omit<FeedPhoto, 'url'>[];
      // Legacy rows hold a full public storage URL; the buckets are private
      // now, so re-sign them from their bucket + path instead.
      const rows = raw.map((r) => {
        const parsed = /^https?:/i.test(r.path) ? storagePathFromPublicUrl(r.path) : null;
        return parsed ? { ...r, bucket: parsed.bucket, path: parsed.path } : r;
      });

      // Sign every bucket's paths in one call each.
      const byBucket = new Map<string, string[]>();
      for (const r of rows) {
        if (r.missing) continue;
        const list = byBucket.get(r.bucket) ?? [];
        list.push(r.path);
        byBucket.set(r.bucket, list);
      }
      const resolved = new Map<string, Map<string, string | null>>();
      await Promise.all(
        Array.from(byBucket.entries()).map(async ([bucket, paths]) => {
          resolved.set(bucket, await resolveStorageUrls(bucket, paths));
        })
      );

      return rows.map((r) => ({
        ...r,
        url: r.missing ? null : (resolved.get(r.bucket)?.get(r.path) ?? null),
      }));
    },
  });
}
