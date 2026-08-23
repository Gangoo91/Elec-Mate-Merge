/**
 * PDF download helpers.
 *
 * These now delegate to `saveOrShareFile`, which is the single implementation
 * for getting any file out of the app: native gets the OS share sheet, web gets
 * a download into the user's Downloads folder.
 *
 * Two behaviours changed when they were unified, both deliberately:
 *
 *  1. A regular browser tab used to `window.open()` a remote PDF, which opens
 *     it in a viewer rather than saving it. The user then has no file to attach
 *     to an email. It now downloads, and only falls back to opening a tab when
 *     the bytes cannot be fetched at all (PDFMonkey's S3 host sends no CORS
 *     headers, so `fetch` rejects).
 *  2. The object URL is revoked a second after the click instead of on the next
 *     line. Revoking immediately races the browser's own read of the blob.
 *
 * Kept as named wrappers because ~63 files import them; there is no need to
 * churn those call sites to get the fix.
 */

import { saveOrShareFile } from './save-or-share-file';

/** Open or download a PDF from a URL (remote or `data:`). */
export async function openOrDownloadPdf(url: string, filename = 'document.pdf'): Promise<void> {
  await saveOrShareFile(url, filename);
}

/**
 * Same, for a PDF already generated client-side, so there is no round-trip
 * fetch just to read bytes we already hold.
 */
export async function openOrDownloadBlobPdf(blob: Blob, filename = 'document.pdf'): Promise<void> {
  await saveOrShareFile(blob, filename);
}
