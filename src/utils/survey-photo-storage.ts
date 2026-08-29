import { supabase } from '@/integrations/supabase/client';
import type { SurveyAiAnalysis } from '@/types/pre-purchase-survey';

/**
 * Photo handling for the pre-purchase survey (ELE-1634).
 *
 * ── 🔴 WHY STORAGE, NOT DATA URLs ─────────────────────────────────────────
 * Every other photo strip in the app keeps compressed data URLs inline on the
 * report row, and a handful of small evidence shots gets away with it. This
 * report is DIFFERENT IN KIND: the photographs are the substance, a real survey
 * runs to twenty or more, and the row is rewritten on every autosave. Inline
 * that and each keystroke drags megabytes of base64 to the server.
 *
 * The edge function also has to FETCH the image, so it needs a URL rather than
 * a blob that only exists in this tab.
 */

const BUCKET = 'survey-photos';

/**
 * 1600px long edge, JPEG 0.8.
 *
 * Deliberately above the 1000px used for ordinary evidence photos and below the
 * 2000px used for schedules. The model is being asked to judge cable sheath,
 * scorching and terminal detail from this image — 1000px loses exactly the
 * texture that distinguishes rubber from PVC — but nobody is reading a dense
 * grid of figures off it either.
 */
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.8;

/** A survey is a walk round a house, not a photo album. */
export const MAX_FINDINGS = 30;

/** Downscale in the browser. A modern phone photo is 4-8MB straight off the sensor. */
export function compressPhoto(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        const scale = Math.min(MAX_EDGE / Math.max(img.width, img.height), 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        /*
         * White first — a transparent source flattened to JPEG comes out BLACK,
         * which reads as a photo taken with the lens cap on. Same trap as
         * pdf-to-pages.ts.
         */
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads one photo and returns its public URL, or null.
 *
 * Never throws — a failed upload costs the electrician one photograph, and must
 * not take the survey they are halfway through with it.
 */
export async function uploadSurveyPhoto(
  reportId: string,
  file: File
): Promise<string | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const blob = await compressPhoto(file);
    if (!blob) return null;

    /*
     * `<user>/<report>/<random>.jpg`. The leading segment is what the RLS
     * policy keys on. A random name rather than an index because photos get
     * deleted mid-survey and an index would then collide with a live one.
     */
    const path = `${user.id}/${reportId}/${crypto.randomUUID()}.jpg`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, blob, { contentType: 'image/jpeg', upsert: false });
    if (error) {
      console.warn('[survey-photo-storage] upload failed:', error.message);
      return null;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return publicUrl;
  } catch (err) {
    console.warn('[survey-photo-storage] upload skipped:', err);
    return null;
  }
}

/**
 * Asks the model what it can see. Returns null on any failure.
 *
 * 🔴 A null here is NOT an error state worth shouting about — the photograph is
 * already saved and the electrician can write the note themselves. The AI is an
 * accelerator on this feature, never a dependency; a survey must be completable
 * with the analysis switched off entirely.
 */
export async function analyseSurveyPhoto(
  fileUrl: string,
  hint?: string
): Promise<SurveyAiAnalysis | null> {
  try {
    const { data, error } = await supabase.functions.invoke('analyse-survey-photo', {
      body: { fileUrl, hint: hint || undefined },
    });
    if (error || !data?.success || !data?.analysis) {
      console.warn('[survey-photo-storage] analysis failed:', error?.message || data?.error);
      return null;
    }
    return data.analysis as SurveyAiAnalysis;
  } catch (err) {
    console.warn('[survey-photo-storage] analysis skipped:', err);
    return null;
  }
}
