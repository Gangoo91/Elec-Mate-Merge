/**
 * Cross-platform jsPDF saver.
 *
 * `doc.save()` builds an `<a download>` internally, which WKWebView ignores —
 * so on native it silently does nothing. This takes the bytes out of jsPDF and
 * hands them to `saveOrShareFile`, which opens the OS share sheet on native and
 * downloads to the Downloads folder on web.
 *
 * Usage: replace `doc.save(filename)` with `await saveOrSharePdf(doc, filename)`
 */

import type jsPDF from 'jspdf';
import { saveOrShareFile } from './save-or-share-file';

export async function saveOrSharePdf(doc: jsPDF, filename: string): Promise<void> {
  // `output('blob')` gives the same bytes `save()` would have written, without
  // jsPDF reaching for the anchor element that does not work on native.
  await saveOrShareFile(doc.output('blob'), filename);
}
