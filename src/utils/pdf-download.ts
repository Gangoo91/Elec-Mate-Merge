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

    await shareOrSwallowCancel(saved.uri, safeFilename);
    return;
  }

  // ── Web PWA / standalone ────────────────────────────────────────────────
  // Avoid window.open() which would kick the user out of the PWA.
  // Fetch as blob and use a temporary <a download> link.
  if (isStandalone()) {
    await blobDownload(url, safeFilename);
    return;
  }

  // ── Regular browser tab ─────────────────────────────────────────────────
  // By the time we get here we're several awaits past the original tap, so
  // Safari/Chrome popup blockers can silently return null instead of opening
  // the tab. Fall back to a blob download, which needs no user gesture — and
  // if THAT fails (cross-origin PDF hosts like PDFMonkey's S3 send no CORS
  // headers, so fetch rejects), navigate the current tab as a last resort.
  const win = window.open(url, '_blank');
  if (!win) {
    try {
      await blobDownload(url, safeFilename);
    } catch {
      window.location.assign(url);
    }
  }
}

/**
 * Present the native share sheet. The user tapping "cancel" on the sheet
 * makes Share.share() reject — that is a normal outcome, not a failure, so
 * swallow it rather than letting callers show an "Export Failed" toast.
 */
async function shareOrSwallowCancel(fileUri: string, title: string): Promise<void> {
  try {
    await Share.share({
      title,
      files: [fileUri],
      dialogTitle: 'Save or share your PDF',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
    if (message.includes('cancel') || message.includes('dismiss')) return;
    throw err;
  }
}

async function blobDownload(url: string, filename: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download PDF: ${res.status}`);

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 200);
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

    await shareOrSwallowCancel(saved.uri, safeFilename);
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
