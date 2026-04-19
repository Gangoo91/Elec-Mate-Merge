/**
 * Marketing pixels — Meta Pixel + Google Ads/GA4 gtag.
 *
 * Consent-gated to the `marketing` cookie preference (see CookieConsent.tsx).
 * Scripts are NOT loaded until consent is granted. On consent withdrawal we
 * null out the globals and let the page reload clear the scripts.
 *
 * Server-side conversions (Subscribe, StartTrial, renewals) fire from webhook
 * handlers via _shared/meta-capi.ts — this module only handles browser-side
 * events (PageView, Lead, CompleteRegistration, InitiateCheckout).
 *
 * Event IDs use a deterministic shape so the same event fired by both the
 * browser Pixel and server CAPI deduplicates in Meta Events Manager.
 */

import { storageGetSync, storageGetJSONSync } from '@/utils/storage';

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

const COOKIE_CONSENT_KEY = 'elec-mate-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'elec-mate-cookie-preferences';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

let metaPixelLoaded = false;
let gtagLoaded = false;
let consentDefaultSet = false;

/**
 * Google Consent Mode v2 — required in EEA/UK since March 2024. Without this,
 * Google throttles conversion data from consented users too, because it can't
 * tell "consent granted" from "consent unknown".
 *
 * We set default=denied before gtag loads; loadGtag() later calls
 * consent('update', granted) once the user opts in.
 */
function ensureConsentDefault(): void {
  if (consentDefaultSet) return;
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
    region: ['GB', 'EU'],
  });
  consentDefaultSet = true;
}

// Call immediately on module load so Consent Mode is set before any gtag
// event could be fired downstream.
if (typeof window !== 'undefined') ensureConsentDefault();

export function hasMarketingConsent(): boolean {
  const hasConsented = storageGetSync(COOKIE_CONSENT_KEY);
  if (!hasConsented) return false;
  const prefs = storageGetJSONSync<{ marketing?: boolean }>(COOKIE_PREFERENCES_KEY, {});
  return prefs.marketing === true;
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function loadMetaPixel(): void {
  if (metaPixelLoaded || !META_PIXEL_ID) return;
  if (typeof window === 'undefined') return;

  // Meta Pixel snippet — adapted from official docs.
  (function (f: Window, b: Document, e: string, v: string) {
    if (f.fbq) return;
    type FbqFn = Window['fbq'] & {
      callMethod?: (...a: unknown[]) => void;
      push: unknown;
      loaded: boolean;
      version: string;
      queue: unknown[];
    };
    const n = function (...args: unknown[]) {
      if (n.callMethod) {
        n.callMethod(...args);
      } else {
        n.queue.push(args);
      }
    } as unknown as FbqFn;
    f.fbq = n;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq?.('init', META_PIXEL_ID);
  window.fbq?.('track', 'PageView');
  metaPixelLoaded = true;
  console.log('[marketing-pixels] Meta Pixel loaded', META_PIXEL_ID);
}

function loadGtag(): void {
  if (gtagLoaded) return;
  if (!GOOGLE_ADS_ID && !GA4_MEASUREMENT_ID) return;
  if (typeof window === 'undefined') return;

  ensureConsentDefault();

  const primaryId = GA4_MEASUREMENT_ID || GOOGLE_ADS_ID!;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
  document.head.appendChild(script);

  // gtag stub (may already exist via ensureConsentDefault)
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };

  // Consent Mode v2 — upgrade from default=denied to granted for marketing cookies
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });

  window.gtag('js', new Date());
  if (GA4_MEASUREMENT_ID) window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true });
  if (GOOGLE_ADS_ID) window.gtag('config', GOOGLE_ADS_ID);
  gtagLoaded = true;
  console.log('[marketing-pixels] gtag loaded', { GA4_MEASUREMENT_ID, GOOGLE_ADS_ID });
}

/**
 * Initialise marketing pixels if consent is granted. Safe to call repeatedly.
 */
export function initMarketingPixels(): void {
  if (!hasMarketingConsent()) return;
  loadMetaPixel();
  loadGtag();
}

/**
 * Shutdown — called when user withdraws marketing consent.
 * Scripts cannot be unloaded cleanly from the DOM, so we mark pixels as
 * opted-out and rely on page reload for a full cleanup.
 */
export function shutdownMarketingPixels(): void {
  if (metaPixelLoaded && window.fbq) {
    window.fbq('consent', 'revoke');
  }
  if (gtagLoaded && window.gtag) {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }
}

function canTrack(): boolean {
  return hasMarketingConsent() && (metaPixelLoaded || gtagLoaded);
}

export function trackPageView(path?: string): void {
  if (!canTrack()) return;
  window.fbq?.('track', 'PageView');
  if (GA4_MEASUREMENT_ID) {
    window.gtag?.('event', 'page_view', {
      page_path: path || window.location.pathname,
      page_location: window.location.href,
    });
  }
}

export function trackLead(data?: { email?: string; source?: string; value?: number }): string {
  const eventId = `lead_${uuid()}`;
  if (!canTrack()) return eventId;
  window.fbq?.(
    'track',
    'Lead',
    {
      content_name: data?.source,
      value: data?.value,
      currency: data?.value ? 'GBP' : undefined,
    },
    { eventID: eventId }
  );
  window.gtag?.('event', 'generate_lead', {
    currency: 'GBP',
    value: data?.value,
    method: data?.source,
  });
  return eventId;
}

export function trackCompleteRegistration(data?: { method?: string; value?: number }): string {
  const eventId = `reg_${uuid()}`;
  if (!canTrack()) return eventId;
  window.fbq?.(
    'track',
    'CompleteRegistration',
    {
      content_name: data?.method,
      value: data?.value,
      currency: data?.value ? 'GBP' : undefined,
    },
    { eventID: eventId }
  );
  if (GOOGLE_ADS_ID) {
    window.gtag?.('event', 'sign_up', { method: data?.method });
  }
  return eventId;
}

export function trackInitiateCheckout(data: {
  value: number;
  currency?: string;
  contentName?: string;
  contentIds?: string[];
}): string {
  const eventId = `checkout_${uuid()}`;
  if (!canTrack()) return eventId;
  const currency = data.currency || 'GBP';
  window.fbq?.(
    'track',
    'InitiateCheckout',
    {
      value: data.value,
      currency,
      content_name: data.contentName,
      content_ids: data.contentIds,
    },
    { eventID: eventId }
  );
  window.gtag?.('event', 'begin_checkout', {
    currency,
    value: data.value,
    items: data.contentIds?.map((id) => ({ item_id: id, item_name: data.contentName })),
  });
  return eventId;
}

/**
 * Browser-side Subscribe event — the server CAPI call is authoritative,
 * this only helps the Pixel build lookalike audiences in real time.
 */
export function trackSubscribe(data: {
  value: number;
  currency?: string;
  contentName?: string;
  subscriptionId?: string;
}): string {
  const eventId = data.subscriptionId ? `sub_${data.subscriptionId}` : `sub_${uuid()}`;
  if (!canTrack()) return eventId;
  const currency = data.currency || 'GBP';
  window.fbq?.(
    'track',
    'Subscribe',
    { value: data.value, currency, content_name: data.contentName },
    { eventID: eventId }
  );
  window.gtag?.('event', 'purchase', {
    currency,
    value: data.value,
    transaction_id: data.subscriptionId,
    items: data.contentName
      ? [{ item_id: data.contentName, item_name: data.contentName }]
      : undefined,
  });
  return eventId;
}
