// Immediate site-visit photo upload (ELE-1069).
//
// Photos used to live as blob: URLs until the Generate step — on Android the
// WebView is routinely killed while the app is backgrounded, every blob dies,
// and the user loses their photos. This uploads each photo to Supabase
// Storage the moment it's captured; the Generate-step bulk upload remains as
// the fallback for anything captured offline.

import { supabase } from '@/integrations/supabase/client';

const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.8;

/** Canvas-compress to match the Generate-step pipeline (max 1920px, 80% JPEG). */
const compressImage = (blob: Blob): Promise<Blob> =>
  new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(blob);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((out) => resolve(out ?? blob), 'image/jpeg', JPEG_QUALITY);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(blob);
    };
    img.src = objectUrl;
  });

export interface UploadedSiteVisitPhoto {
  publicUrl: string;
  storagePath: string;
}

/**
 * Upload one captured photo straight to the safety-photos bucket (same path
 * scheme as the Generate-step bulk upload). Returns null on any failure —
 * the caller keeps the blob URL and the Generate step retries later.
 */
export async function uploadSiteVisitPhotoNow(
  file: Blob,
  visitId: string
): Promise<UploadedSiteVisitPhoto | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const compressed = await compressImage(file);
    const storagePath = `${user.id}/site-visit/${visitId}/${crypto.randomUUID()}.jpg`;

    const { error } = await supabase.storage
      .from('safety-photos')
      .upload(storagePath, compressed, { contentType: 'image/jpeg', upsert: false });
    if (error) {
      console.error('[SiteVisitPhoto] Immediate upload failed:', error);
      return null;
    }

    const { data } = supabase.storage.from('safety-photos').getPublicUrl(storagePath);
    return { publicUrl: data.publicUrl, storagePath };
  } catch (err) {
    console.error('[SiteVisitPhoto] Immediate upload error:', err);
    return null;
  }
}
