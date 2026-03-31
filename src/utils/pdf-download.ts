/**
 * Cross-platform PDF opener.
 *
 * Three environments:
 *  1. Capacitor native (iOS/Android — TestFlight/App Store)
 *     → <a download> is unsupported in WKWebView; window.open() is blocked.
 *       Fetch as blob → base64 → Filesystem.writeFile → Share.share()
 *       to present the native share sheet (save to Files, AirDrop, etc.).
 *  2. Web PWA / standalone mode
 *     → window.open() opens a new tab, kicking the user out of the PWA.
 *       Fetch as blob and trigger <a download> instead.
 *  3. Ordinary browser tab
 *     → window.open(_blank) is the simplest, most reliable approach.
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const isStandalone = (): boolean =>
   
  (navigator as unknown as Record<string, boolean>).standalone === true ||
  window.matchMedia('(display-mode: standalone)').matches;

export async function openOrDownloadPdf(url: string, filename = 'document.pdf'): Promise<void> {
  // Sanitise filename — strip characters unsafe for iOS/Android filesystems
  const safeFilename = filename.replace(/[/\\:*?"<>|]/g, '-');

  // ── Capacitor native (iOS / Android) ────────────────────────────────────
  // WKWebView blocks <a download> and window.open(). Fetch the PDF,
  // save to the device cache, then open the native share sheet so the
  // user can save to Files, AirDrop, email, WhatsApp, etc.
  if (Capacitor.isNativePlatform()) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.status}`);
    const blob = await response.blob();
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.includes(',') ? result.split(',')[1] : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const saved = await Filesystem.writeFile({
      path: safeFilename,
      data: base64Data,
      directory: Directory.Cache,
      recursive: true,
    });

    await Share.share({
      title: safeFilename,
      files: [saved.uri],
      dialogTitle: 'Save or share your PDF',
    });
    return;
  }

  // ── Web PWA / standalone ────────────────────────────────────────────────
  // Avoid window.open() which would kick the user out of the PWA.
  // Fetch as blob and use a temporary <a download> link.
  if (isStandalone()) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to download PDF');

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = safeFilename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 200);
    return;
  }

  // ── Regular browser tab ─────────────────────────────────────────────────
  window.open(url, '_blank');
}

/**
 * Same as openOrDownloadPdf but accepts a Blob directly.
 * Use this when the PDF is generated client-side (jsPDF) so we already
 * have the data in memory and don't need a round-trip fetch.
 */
export async function openOrDownloadBlobPdf(blob: Blob, filename = 'document.pdf'): Promise<void> {
  const safeFilename = filename.replace(/[/\\:*?"<>|]/g, '-');

  // ── Capacitor native (iOS / Android) ────────────────────────────────────
  if (Capacitor.isNativePlatform()) {
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.includes(',') ? result.split(',')[1] : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const saved = await Filesystem.writeFile({
      path: safeFilename,
      data: base64Data,
      directory: Directory.Cache,
      recursive: true,
    });

    await Share.share({
      title: safeFilename,
      files: [saved.uri],
      dialogTitle: 'Save or share your PDF',
    });
    return;
  }

  // ── Web PWA / standalone + regular browser ───────────────────────────────
  // Both use a temporary blob URL + <a download>; the browser handles disposal.
  const blobUrl = URL.createObjectURL(blob);

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
