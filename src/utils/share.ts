/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * share.ts
 *
 * Cross-platform share utility.
 * Uses @capacitor/share on iOS/Android (reliable native share sheet).
 * Falls back to Web Share API on web, then clipboard copy.
 */

import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { copyToClipboard } from '@/utils/clipboard';

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  /** Fallback: called when both native share and Web Share API are unavailable */
  onFallback?: () => void;
}

/**
 * What actually happened, so the caller can say so.
 *
 * `copied` is the one that matters. Where there is no Web Share API this
 * quietly copies the URL and returns, which is the right action paired with
 * the wrong feedback: a share sheet announces itself, a clipboard write does
 * not. Callers that said nothing in that branch looked broken — the button
 * was pressed, the link WAS on the clipboard, and the screen never moved.
 * Reported against the booking link in Business settings.
 *
 * Returned rather than toasted here because this module has no business
 * picking copy or owning a toast library; the caller knows what the thing
 * being shared is called.
 */
export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'failed';

export async function shareContent({
  title,
  text,
  url,
  onFallback,
}: ShareOptions): Promise<ShareOutcome> {
  try {
    if (Capacitor.isNativePlatform()) {
      // Native: use Capacitor Share plugin (iOS share sheet / Android intent)
      await Share.share({ title, text, url, dialogTitle: title });
      return 'shared';
    }

    // Web: use Web Share API if available
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return 'shared';
    }

    // Last resort: copy URL to clipboard
    if (url) {
      const ok = await copyToClipboard(url);
      if (ok) return 'copied';
    }

    // Nothing available — call caller's fallback
    onFallback?.();
    return 'failed';
  } catch (err: any) {
    // User cancelled — not an error
    if (err?.name === 'AbortError' || err?.message?.includes('cancel')) return 'cancelled';
    console.warn('[share] Failed:', err);
    onFallback?.();
    return 'failed';
  }
}
