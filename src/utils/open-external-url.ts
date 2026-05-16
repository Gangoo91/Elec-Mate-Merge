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
import { addBreadcrumb } from '@/lib/sentry';

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

/**
 * Open a URL via the system's preferred handler.
 *
 * Quietly tolerates failures: an empty/malformed URL, a network drop, or a
 * Capacitor Browser plugin that can't display the page (iOS surfaces this
 * as "Unable to display URL") will log a breadcrumb and return — never
 * throw. Callers don't need a try/catch.
 *
 * Sentry issues 7N (9 users on /electrician) and 86 (2 users on
 * /electrician/materials) were both unhandled `Browser.open` rejections
 * caused by users tapping links with empty/dynamic URLs that hadn't
 * resolved yet.
 */
export async function openExternalUrl(url: string): Promise<void> {
  // Defensive: empty / whitespace / non-string never reaches the platform.
  if (typeof url !== 'string' || url.trim().length === 0) {
    addBreadcrumb('openExternalUrl: empty URL ignored', 'navigation', {
      receivedType: typeof url,
    });
    return;
  }

  const trimmed = url.trim();

  try {
    if (Capacitor.isNativePlatform()) {
      if (shouldOpenExternally(trimmed)) {
        // ELE-iOS-WhatsApp-freeze — Use `window.open(url, '_system')`, NOT
        // a synthetic `<a target="_system">.click()`. The anchor trick is a
        // Cordova-era hack: Capacitor's WindowOpenHelper only intercepts
        // `window.open()` calls and routes `_system` through
        // UIApplication.shared.open(), which is what deep-links into
        // WhatsApp / Mail / Maps. The anchor version is left to the
        // WebView, which on iOS pauses waiting for a navigation that
        // never happens — the app appears frozen.
        const opened = window.open(trimmed, '_system');
        // Capacitor returns null/undefined for `_system` opens (the OS
        // takes over). If it returned a real window handle, we're on web
        // and need to nudge it to actually open.
        if (opened && typeof opened === 'object' && 'focus' in opened) {
          try {
            (opened as Window).focus();
          } catch {
            /* noop */
          }
        }
      } else {
        // Regular web pages — open in SFSafariViewController
        await Browser.open({ url: trimmed });
      }
    } else {
      window.open(trimmed, '_blank');
    }
  } catch (err) {
    // Platform-side rejection. Last-resort fallback uses Capacitor's
    // Browser plugin (SFSafariViewController on iOS) — for wa.me/tel/mailto
    // this still won't deep-link, but at least the user sees something
    // instead of a frozen UI.
    addBreadcrumb('openExternalUrl: platform open failed, falling back', 'navigation', {
      url: trimmed.slice(0, 200),
      error: err instanceof Error ? err.message : String(err),
    });
    if (Capacitor.isNativePlatform()) {
      try {
        await Browser.open({ url: trimmed });
      } catch {
        // Both paths failed — nothing more we can do client-side.
      }
    }
  }
}
