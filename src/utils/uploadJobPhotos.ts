import { supabase } from '@/integrations/supabase/client';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const BUCKET = 'visual-uploads';

export interface PhotoUploadResult {
  urls: string[];
  failed: { name: string; reason: string }[];
}

/**
 * Upload site photos to storage one file at a time, so a single failure never
 * discards the whole batch (the old inline loops threw on the first error and
 * lost everything already uploaded). Validates type + size and returns the
 * public URLs that made it, plus a per-file failure list for honest feedback.
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
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(publicUrl);
  }

  return { urls, failed };
}
