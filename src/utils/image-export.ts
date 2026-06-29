/**
 * Cross-platform image saver — the image counterpart of `openOrDownloadPdf`.
 *
 * Takes a data URL (e.g. a PNG produced by canvas `toDataURL`) and saves or
 * shares it across the three environments Elec-Mate runs in:
 *
 *  1. Capacitor native (iOS/Android) — WKWebView blocks `<a download>`, so
 *     decode to base64, write to the cache, and present the native share sheet
 *     (Save to Photos/Files, AirDrop, WhatsApp, …).
 *  2. Web PWA / standalone — `<a download>` with a blob URL.
 *  3. Ordinary browser tab — `<a download>` with a blob URL.
 *
 * Kept separate from `pdf-download.ts` so the PDF share-sheet copy ("Save your
 * PDF") and MIME handling don't bleed across.
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/** Split a `data:` URL into its base64 payload (no prefix). */
function dataUrlToBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

/** Decode a `data:` URL into a Blob for the web `<a download>` path. */
function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, payload] = dataUrl.split(',');
  const mimeMatch = meta.match(/data:([^;]+)/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

export async function saveOrShareImage(dataUrl: string, filename = 'image.png'): Promise<void> {
  // Sanitise filename — strip characters unsafe for iOS/Android filesystems.
  const safeFilename = filename.replace(/[/\\:*?"<>|]/g, '-');

  // ── Capacitor native (iOS / Android) ────────────────────────────────────
  if (Capacitor.isNativePlatform()) {
    const saved = await Filesystem.writeFile({
      path: safeFilename,
      data: dataUrlToBase64(dataUrl),
      directory: Directory.Cache,
      recursive: true,
    });

    await Share.share({
      title: safeFilename,
      files: [saved.uri],
      dialogTitle: 'Save or share your image',
    });
    return;
  }

  // ── Web PWA / standalone + ordinary browser tab ─────────────────────────
  const blobUrl = URL.createObjectURL(dataUrlToBlob(dataUrl));
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 200);
}
