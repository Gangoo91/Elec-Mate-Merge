/**
 * Cross-platform jsPDF saver.
 *
 * On native iOS/Android, `doc.save()` silently fails because WKWebView
 * blocks blob URL downloads. This utility writes the PDF to the device
 * cache and opens the native share sheet instead.
 *
 * On web, falls through to the standard `doc.save()` mechanism.
 *
 * Usage: replace `doc.save(filename)` with `await saveOrSharePdf(doc, filename)`
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import type jsPDF from 'jspdf';

export async function saveOrSharePdf(doc: jsPDF, filename: string): Promise<void> {
  const safeFilename = filename.replace(/[/\\:*?"<>|]/g, '-');

  if (Capacitor.isNativePlatform()) {
    const base64 = doc.output('datauristring').split(',')[1];

    const saved = await Filesystem.writeFile({
      path: safeFilename,
      data: base64,
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

  doc.save(safeFilename);
}
