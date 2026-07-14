/**
 * PDF URL permanence — ELE-1330 follow-up.
 *
 * Two kinds of stored pdf_url exist:
 *  - OUR Supabase storage public URLs (permanent, never expire)
 *  - PDFMonkey signed S3 URLs (expire after ONE HOUR)
 *
 * A cached pdf_url may be content-current (newer than the row's updated_at)
 * yet still DEAD because the signature expired — serving it gives the user
 * an S3 AccessDenied page. Only treat our own storage URLs as reusable.
 */
export function isPermanentPdfUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.includes('/storage/v1/object/public/');
}
