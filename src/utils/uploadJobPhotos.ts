import { supabase } from '@/integrations/supabase/client';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const BUCKET = 'visual-uploads';

export interface PhotoUploadResult {
  /**
   * Storage references for the photos that made it. New uploads return BARE
   * STORAGE PATHS (privacy-ready) — resolve for display with
   * useStorageUrl(s)('visual-uploads', …), which also accepts the legacy
   * full public URLs still stored on older rows.
   */
  urls: string[];
  failed: { name: string; reason: string }[];
}

/**
 * Upload site photos to storage one file at a time, so a single failure never
 * discards the whole batch (the old inline loops threw on the first error and
 * lost everything already uploaded). Validates type + size and returns the
 * storage paths that made it, plus a per-file failure list for honest feedback.
 */
export async function uploadJobPhotos(
  files: File[],
  folder: string
): Promise<PhotoUploadResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const urls: string[] = [];
  const failed: { name: string; reason: string }[] = [];

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      failed.push({ name: file.name, reason: 'not an image' });
      continue;
    }
    if (file.size > MAX_BYTES) {
      failed.push({ name: file.name, reason: 'over 10MB' });
      continue;
    }
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${user.id}/${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file);
    if (error) {
      failed.push({ name: file.name, reason: 'upload failed' });
      continue;
    }
    // Store the bare storage path (privacy-ready) — readers resolve it via
    // useStorageUrl(s) and still accept legacy full-URL entries.
    urls.push(path);
  }

  return { urls, failed };
}
