/**
 * clipboard.ts
 *
 * Platform-aware clipboard utility. Uses Capacitor Clipboard plugin on
 * native (reliable on iOS WKWebView) and falls back to navigator.clipboard
 * on web, with a textarea fallback for older browsers.
 */

import { Capacitor } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';

/**
 * Copy text to the clipboard. Returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (Capacitor.isNativePlatform()) {
      await Clipboard.write({ string: text });
      return true;
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / restricted contexts
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Read text from the clipboard. Returns null on failure.
 */
export async function readFromClipboard(): Promise<string | null> {
  try {
    if (Capacitor.isNativePlatform()) {
      const result = await Clipboard.read();
      return result.value ?? null;
    }
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}
