/**
 * open-external-url.ts
 *
 * Opens a URL in the appropriate handler:
 * - App URLs (WhatsApp, tel:, mailto:) → system handler (opens the target app directly)
 * - Web URLs → SFSafariViewController on native, new tab on web
 *
 * Why: Browser.open() uses SFSafariViewController which intercepts universal links
 * like wa.me and shows a web page instead of opening WhatsApp directly.
 */

import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

// URLs that should open in external apps, not in-app browser
const EXTERNAL_APP_PATTERNS = [
  'wa.me',
  'api.whatsapp.com',
  'whatsapp.com',
  'tel:',
  'mailto:',
  'maps.apple.com',
  'maps.google.com',
  'youtube.com/watch',
  'youtu.be/',
];

function shouldOpenExternally(url: string): boolean {
  return EXTERNAL_APP_PATTERNS.some((p) => url.includes(p));
}

export async function openExternalUrl(url: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    if (shouldOpenExternally(url)) {
      // Open via system handler — routes universal links to their native app
      // (e.g. wa.me → WhatsApp, youtube.com → YouTube app)
      const a = document.createElement('a');
      a.href = url;
      a.target = '_system';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 100);
    } else {
      // Regular web pages — open in SFSafariViewController
      await Browser.open({ url });
    }
  } else {
    window.open(url, '_blank');
  }
}
