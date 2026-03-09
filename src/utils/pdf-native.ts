/**
 * Native PDF utilities for Capacitor iOS/Android.
 *
 * On native WKWebView, neither `pdf.save()` (jsPDF) nor blob `<a download>`
 * work — both rely on browser download APIs that are blocked by WKWebView.
 *
 * This module provides cross-platform wrappers:
 *   - savePdf(doc, filename)      — drop-in for jsPDF `doc.save(filename)`
 *   - downloadBlobPdf(blob, name) — drop-in for blob + <a download> pattern
 *   - saveBase64Pdf(b64, name)    — for raw base64 PDF strings
 *
 * Native path (iOS/Android):
 *   1. Write PDF to device cache via @capacitor/filesystem
 *   2. Open the native share sheet via @capacitor/share
 *      → user can "Open in Preview", "Save to Files", AirDrop, etc.
 *
 * Web path: existing jsPDF / blob-URL behaviour unchanged.
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import type jsPDF from 'jspdf';

// ─── Core helpers ────────────────────────────────────────────────────────────

/** Convert a Blob to a base64 string (without the data-URI prefix). */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Write a base64 PDF to the device cache directory and open the native
 * share / open-with sheet. Works on both iOS and Android.
 */
async function openBase64PdfNative(base64: string, filename: string): Promise<void> {
  // Sanitise filename so the OS accepts it
  const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

  await Filesystem.writeFile({
    path: safeFilename,
    data: base64,
    directory: Directory.Cache,
  });

  const { uri } = await Filesystem.getUri({
    path: safeFilename,
    directory: Directory.Cache,
  });

  await Share.share({
    title: filename,
    url: uri,
    dialogTitle: 'Open or save PDF',
  });
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Drop-in replacement for `doc.save(filename)` (jsPDF).
 *
 * Usage:
 *   // Before (broken on native):
 *   doc.save('my-document.pdf');
 *
 *   // After (works everywhere):
 *   await savePdf(doc, 'my-document.pdf');
 */
export async function savePdf(doc: jsPDF, filename: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const base64 = doc.output('base64');
    await openBase64PdfNative(base64, filename);
    return;
  }
  // Web: use jsPDF's built-in save (blob + <a download>)
  doc.save(filename);
}

/**
 * Drop-in replacement for the blob + `<a download>` pattern.
 *
 * Usage:
 *   // Before (broken on native):
 *   const url = URL.createObjectURL(blob);
 *   const link = document.createElement('a');
 *   link.href = url; link.download = filename;
 *   link.click(); ...
 *
 *   // After (works everywhere):
 *   await downloadBlobPdf(blob, filename);
 */
export async function downloadBlobPdf(blob: Blob, filename: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    const base64 = await blobToBase64(blob);
    await openBase64PdfNative(base64, filename);
    return;
  }
  // Web: standard blob-URL download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 200);
}

/**
 * Open a raw base64 PDF string — useful when jsPDF outputs via
 * `doc.output('base64')` and you want to save without going through savePdf.
 */
export async function saveBase64Pdf(base64: string, filename: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await openBase64PdfNative(base64, filename);
    return;
  }
  // Web: reconstruct a blob and trigger download
  const byteChars = atob(base64);
  const bytes = new Uint8Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  await downloadBlobPdf(blob, filename);
}
