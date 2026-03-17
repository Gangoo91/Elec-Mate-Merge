/**
 * share.ts
 *
 * Cross-platform share utility.
 * Uses @capacitor/share on iOS/Android (reliable native share sheet).
 * Falls back to Web Share API on web, then clipboard copy.
 */

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  /** Fallback: called when both native share and Web Share API are unavailable */
  onFallback?: () => void;
}

export async function shareContent({ title, text, url, onFallback }: ShareOptions): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      // Native: use Capacitor Share plugin (iOS share sheet / Android intent)
      await Share.share({ title, text, url, dialogTitle: title });
      return;
    }

    // Web: use Web Share API if available
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }

    // Last resort: copy URL to clipboard
    if (url && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      return;
    }

    // Nothing available — call caller's fallback
    onFallback?.();
  } catch (err: any) {
    // User cancelled — not an error
    if (err?.name === 'AbortError' || err?.message?.includes('cancel')) return;
    console.warn('[share] Failed:', err);
    onFallback?.();
  }
}
