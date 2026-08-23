/**
 * saveOrShareFile — the one way to get a file out of Elec-Mate.
 *
 * Why this exists
 * ---------------
 * Getting a file to the user is genuinely different on each platform, and the
 * naive version fails silently on the one that matters most:
 *
 *   const a = document.createElement('a');
 *   a.href = url; a.download = name; a.click();
 *
 * WKWebView ignores the `download` attribute, so inside the iOS app that does
 * nothing at all — no file, no error, nothing on screen. It went unreported for
 * months because there is no failure to see. The AI RAMS screen had nine copies
 * of it, which meant no PDF could leave that screen on an iPhone by any route.
 *
 * Four separate helpers had grown up around this (save-or-share-pdf,
 * pdf-download, image-export, share-pdf-file-native), each solving part of it
 * for one file type. With no single obvious thing to reach for, 88 more files
 * wrote their own anyway. This is that single thing; the others now delegate
 * here, so every existing caller gets the same behaviour.
 *
 * What it does
 * ------------
 *   Native (iOS/Android)  → write to the device cache, open the OS share sheet.
 *                           Save to Files, AirDrop, WhatsApp, print.
 *   Web (any browser)     → download to the user's Downloads folder.
 *
 * On web this always DOWNLOADS rather than opening a tab. A tab is not a file:
 * the user has nothing to attach to an email afterwards, and in an installed
 * PWA it throws them out of the app entirely.
 *
 * Accepts a Blob, a data: URI, or a remote URL, so a caller never has to
 * convert anything first.
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/** A Blob, a `data:` URI, or an http(s) URL. */
export type FileSource = Blob | string;

export interface SaveOrShareResult {
  /** How the file was delivered, for callers that word their toast differently. */
  method: 'share-sheet' | 'download' | 'opened-tab';
  /** True when the user dismissed the native share sheet without choosing. */
  cancelled: boolean;
}

/** Strip characters iOS and Android reject in a filename. */
function safeName(filename: string): string {
  return filename.replace(/[/\\:*?"<>|]/g, '-').trim() || 'download';
}

/** Resolve any accepted source to a Blob. Throws if a remote fetch is blocked. */
async function toBlob(source: FileSource): Promise<Blob> {
  if (source instanceof Blob) return source;
  const res = await fetch(source);
  if (!res.ok) throw new Error(`Could not fetch file: ${res.status}`);
  return res.blob();
}

/** Capacitor's Filesystem takes base64, not a Blob. */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Trigger a browser download.
 *
 * The revoke is deferred rather than called on the next line. The click is
 * handled asynchronously, so revoking immediately can pull the data out from
 * under the browser before it has read it — a race that shows up as an empty
 * or missing file on slower devices, and one several hand-rolled copies had.
 */
function triggerDownload(blob: Blob, filename: string): void {
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(blobUrl);
  }, 1000);
}

/**
 * Present the native share sheet.
 *
 * Dismissing the sheet makes Share.share() reject. That is the user choosing
 * not to share, not a failure, so it must not surface as "Export failed".
 */
async function shareNative(fileUri: string, title: string): Promise<boolean> {
  try {
    await Share.share({ title, files: [fileUri], dialogTitle: 'Save or share' });
    return false;
  } catch (err) {
    const message = (err instanceof Error ? err.message : String(err)).toLowerCase();
    if (message.includes('cancel') || message.includes('dismiss') || message.includes('abort')) {
      return true;
    }
    throw err;
  }
}

/**
 * Save a file to the device, or share it — whichever the platform supports.
 *
 * @param source   Blob, `data:` URI, or remote URL.
 * @param filename Name the user will see. Extension matters: it is what tells
 *                 iOS and Android which apps can open the file.
 */
export async function saveOrShareFile(
  source: FileSource,
  filename: string
): Promise<SaveOrShareResult> {
  const name = safeName(filename);

  if (Capacitor.isNativePlatform()) {
    const blob = await toBlob(source);
    const saved = await Filesystem.writeFile({
      path: name,
      data: await blobToBase64(blob),
      directory: Directory.Cache,
      recursive: true,
    });
    const cancelled = await shareNative(saved.uri, name);
    return { method: 'share-sheet', cancelled };
  }

  // Web. Fetching a remote file can fail on CORS — PDFMonkey's S3 host sends no
  // CORS headers — and there is nothing to download if we cannot read the
  // bytes. Opening the tab at least puts the file in front of the user, where
  // the browser's own save button still works.
  try {
    triggerDownload(await toBlob(source), name);
    return { method: 'download', cancelled: false };
  } catch (err) {
    if (typeof source === 'string') {
      const win = window.open(source, '_blank', 'noopener');
      if (!win) window.location.assign(source);
      return { method: 'opened-tab', cancelled: false };
    }
    throw err;
  }
}
