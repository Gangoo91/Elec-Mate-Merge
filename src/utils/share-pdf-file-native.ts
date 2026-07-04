/**
 * Native (Capacitor) PDF share — downloads the PDF from a (signed, expiring)
 * URL and opens the OS share sheet with the actual file attached, so WhatsApp
 * / Mail / AirDrop receive a real document instead of a raw S3 link that
 * expires after an hour (ELE-1276).
 *
 * Web has its own path (share-pdf-to-whatsapp-web.ts) — this is the missing
 * native half. Same cache-write + Share.share pattern as save-or-share-pdf.ts.
 *
 * Returns true when the share sheet was presented (or the user dismissed it);
 * false when anything failed — callers should fall back to their legacy
 * wa.me link flow so the user can still send *something*.
 */
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/**
 * True when this device can hand WhatsApp an actual PDF file:
 *  - native app (Capacitor share sheet), or
 *  - mobile web with Web Share Level 2 file support.
 * Desktop browsers return false — WhatsApp Web can't accept attachments via
 * URL scheme, so callers should hide the WhatsApp option there rather than
 * fall back to a clunky download-and-attach-yourself flow (ELE-1276).
 */
export function canShareFilesToWhatsApp(): boolean {
  if (Capacitor.isNativePlatform()) return true;
  if (typeof navigator === 'undefined' || typeof navigator.canShare !== 'function') return false;
  try {
    const probe = new File([new Blob(['x'], { type: 'application/pdf' })], 'probe.pdf', {
      type: 'application/pdf',
    });
    return navigator.canShare({ files: [probe] });
  } catch {
    return false;
  }
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onloadend = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.readAsDataURL(blob);
  });
}

export async function sharePdfFileNative(options: {
  pdfUrl: string;
  filename: string;
  title: string;
  /** Message text WITHOUT any PDF link — the file itself is the attachment. */
  text?: string;
}): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const response = await fetch(options.pdfUrl);
    if (!response.ok) return false;
    const base64 = await blobToBase64(await response.blob());
    if (!base64) return false;

    const safeFilename = options.filename.replace(/[/\\:*?"<>|]/g, '-');
    const saved = await Filesystem.writeFile({
      path: safeFilename,
      data: base64,
      directory: Directory.Cache,
      recursive: true,
    });

    await Share.share({
      title: options.title,
      ...(options.text ? { text: options.text } : {}),
      files: [saved.uri],
      dialogTitle: options.title,
    });
    return true;
  } catch (err) {
    // Dismissing the native share sheet rejects too — treat cancel as handled
    // so callers don't immediately reopen WhatsApp with a raw link on top.
    const msg = err instanceof Error ? err.message.toLowerCase() : '';
    if (msg.includes('cancel')) return true;
    console.warn('[sharePdfFileNative] falling back to link share:', err);
    return false;
  }
}
