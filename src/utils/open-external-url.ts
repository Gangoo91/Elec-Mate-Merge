/**
 * open-external-url.ts
 *
 * Opens a URL in the system browser on native (iOS/Android) or
 * in a new tab on web.  Fixes WhatsApp `wa.me` links which are
 * silently blocked by WKWebView's `window.open('_blank')`.
 */

import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

export async function openExternalUrl(url: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Browser.open({ url });
  } else {
    window.open(url, '_blank');
  }
}
