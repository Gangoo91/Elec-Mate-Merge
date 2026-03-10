/**
 * Cross-platform PDF opener.
 *
 * Three environments:
 *  1. Capacitor native (iOS/Android — TestFlight/App Store)
 *     → <a download> is unsupported in WKWebView; window.open() is blocked.
 *       Use @capacitor/browser Browser.open() to open the URL in Safari.
 *  2. Web PWA / standalone mode
 *     → window.open() opens a new tab, kicking the user out of the PWA.
 *       Fetch as blob and trigger <a download> instead.
 *  3. Ordinary browser tab
 *     → window.open(_blank) is the simplest, most reliable approach.
 */

import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

const isStandalone = (): boolean =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as unknown as Record<string, boolean>).standalone === true ||
  window.matchMedia('(display-mode: standalone)').matches;

export async function openOrDownloadPdf(url: string, filename = 'document.pdf'): Promise<void> {
  // ── Capacitor native (iOS / Android) ────────────────────────────────────
  // WKWebView blocks <a download> and window.open(). Open the PDF URL in
  // the in-app browser (Safari on iOS) via the Capacitor Browser plugin.
  if (Capacitor.isNativePlatform()) {
    await Browser.open({
      url,
      presentationStyle: 'popover',
      toolbarColor: '#0a0a0a',
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
    a.download = filename;
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
