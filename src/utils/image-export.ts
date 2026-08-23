/**
 * Image export.
 *
 * Delegates to `saveOrShareFile` so images behave exactly like every other file
 * the app hands over: the OS share sheet on native, a download into the
 * Downloads folder on web.
 *
 * The one difference from the previous version worth knowing: dismissing the
 * native share sheet no longer rejects. Cancelling is the user's choice, not a
 * failure, and callers were surfacing it as an export error.
 */

import { saveOrShareFile } from './save-or-share-file';

export async function saveOrShareImage(dataUrl: string, filename = 'image.png'): Promise<void> {
  // `saveOrShareFile` fetches a `data:` URI straight into a Blob, so the manual
  // atob/Uint8Array decoding this file used to carry is no longer needed.
  await saveOrShareFile(dataUrl, filename);
}
