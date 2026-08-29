import { supabase } from '@/integrations/supabase/client';

/**
 * Persist board scanner photos against the REPORT, not the device (ELE-1606).
 *
 * Sean, who does this daily: *"The image of the results taken on the iPad using
 * the scanner doesn't pull through to the desktop. Needed to upload the image
 * on the desktop."*
 *
 * `BoardPhotoCapture` works entirely in data URLs held in memory — the photo is
 * captured, compressed, analysed and never written anywhere. So it lives only
 * on the device that took it, and the realistic workflow is precisely the one
 * that breaks it: **capture at the board on a phone or tablet, finish the
 * paperwork at a desk.**
 *
 * There is an evidential point too. The board photo is the record of what was
 * actually in front of the inspector. Keeping it attached to the certificate is
 * worth more than the minute of re-uploading it saves.
 */

/** Where the paths are recorded on the report. Matches the existing key. */
export const BOARD_PHOTOS_FIELD = 'boardImages';

const BUCKET = 'board-photos';

/** `data:image/jpeg;base64,…` → Blob, without a network round trip. */
function dataUrlToBlob(dataUrl: string): Blob | null {
  const match = dataUrl.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
  if (!match) return null;
  const [, mime, b64] = match;
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  } catch {
    return null;
  }
}

/**
 * Uploads the compressed photos and returns their public URLs, in order.
 *
 * 🔴 Never throws. A failed upload must not cost the electrician the scan they
 * have already taken — the analysis runs off the in-memory data URLs either
 * way, so persistence failing degrades this to exactly the behaviour it has
 * today rather than breaking the feature. Anything that did upload is kept.
 */
export async function uploadBoardPhotos(
  reportId: string,
  dataUrls: string[]
): Promise<string[]> {
  if (!reportId || !dataUrls.length) return [];
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const urls: string[] = [];
    for (const [i, dataUrl] of dataUrls.entries()) {
      /* Already-persisted photos come back as https URLs on a re-save. */
      if (!dataUrl.startsWith('data:')) {
        urls.push(dataUrl);
        continue;
      }
      const blob = dataUrlToBlob(dataUrl);
      if (!blob) continue;

      /*
       * `<user>/<report>/<index>-<stamp>.jpg` — the leading segment is what the
       * RLS policy keys on, and the stamp keeps a re-scan from overwriting the
       * photo of a board that was already captured.
       */
      const path = `${user.id}/${reportId}/${i}-${Date.now()}.jpg`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, blob, { contentType: blob.type, upsert: false });
      if (error) {
        console.warn('[board-photo-storage] upload failed, continuing:', error.message);
        continue;
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(path);
      urls.push(publicUrl);
    }
    return urls;
  } catch (err) {
    console.warn('[board-photo-storage] persist skipped:', err);
    return [];
  }
}

/**
 * Reads back the photos stored against a report, so opening the scanner on a
 * second device shows what was captured on the first.
 */
export async function loadBoardPhotos(reportId: string): Promise<string[]> {
  if (!reportId) return [];
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('reports')
      .select('data')
      .eq('report_id', reportId)
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .maybeSingle();
    if (error || !data) return [];

    const raw = (data.data as Record<string, unknown> | null)?.[BOARD_PHOTOS_FIELD];
    if (!Array.isArray(raw)) return [];
    /*
     * Only https URLs are returned. A stored `data:` URL would be a report row
     * carrying megabytes of base64, which is what this exists to stop — if one
     * is found it is ignored rather than re-inflated into memory.
     */
    return raw.filter((u): u is string => typeof u === 'string' && u.startsWith('http'));
  } catch {
    return [];
  }
}
