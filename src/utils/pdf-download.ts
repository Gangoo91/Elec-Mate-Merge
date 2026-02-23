/**
 * Opens a PDF URL in a way that works on iOS PWA (standalone mode).
 *
 * iOS PWA treats `window.open(_blank)` as "open in Safari", which kicks
 * the user out of the app. Instead we fetch the PDF as a blob and trigger
 * a native download via a temporary <a download> link.
 */

const isStandalone = (): boolean =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as unknown as Record<string, boolean>).standalone === true ||
  window.matchMedia('(display-mode: standalone)').matches;

export async function openOrDownloadPdf(url: string, filename = 'document.pdf'): Promise<void> {
  if (!isStandalone()) {
    window.open(url, '_blank');
    return;
  }

  // PWA mode — fetch as blob so we stay in the app
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to download PDF');

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 200);
}
