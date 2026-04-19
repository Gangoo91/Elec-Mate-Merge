/**
 * Attribution capture — UTM / gclid / fbclid / referrer.
 *
 * Called on landing page mount (see LandingPage.tsx). Persists first-touch to
 * localStorage so the data survives across sessions until signup, at which
 * point we write it to profiles.* and clear the local record.
 *
 * Without this, when someone Googles "eicr software" on Monday, comes back
 * via a Facebook ad on Friday, and signs up on Sunday, we can't answer
 * which channel generated the subscriber — Supabase only sees the final
 * signup event.
 */

import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetSync, storageRemoveSync } from '@/utils/storage';
import { captureError } from '@/lib/sentry';

const ATTRIBUTION_KEY = 'elec-mate-attribution';

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer_url?: string;
  landing_page?: string;
  first_touch_at?: string;
}

function readParams(search: string): Partial<AttributionData> {
  const params = new URLSearchParams(search);
  const out: Partial<AttributionData> = {};
  const keys: (keyof AttributionData)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
  ];
  for (const k of keys) {
    const v = params.get(k);
    if (v) out[k] = v;
  }
  return out;
}

/**
 * Capture attribution on landing. First-touch wins — if we've already stored
 * attribution from an earlier visit, we leave it alone. Call this from the
 * landing page (and any marketing route) on mount.
 */
export function captureAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null;

  const existing = storageGetJSONSync<AttributionData>(ATTRIBUTION_KEY, {} as AttributionData);
  const hasExisting = Object.keys(existing).length > 0;

  const params = readParams(window.location.search);
  const hasNewParams = Object.keys(params).length > 0;

  // First-touch: only write if nothing stored yet OR if the new visit has UTMs and the existing record has none
  if (hasExisting && !hasNewParams) return existing;

  const attribution: AttributionData = hasExisting
    ? existing
    : {
        ...params,
        referrer_url: document.referrer || undefined,
        landing_page: window.location.pathname + window.location.search,
        first_touch_at: new Date().toISOString(),
      };

  // If an existing record exists but had no UTMs and this visit has UTMs, upgrade it
  if (hasExisting && hasNewParams && !existing.utm_source && !existing.gclid && !existing.fbclid) {
    Object.assign(attribution, existing, params);
  }

  storageSetSync(ATTRIBUTION_KEY, JSON.stringify(attribution));
  return attribution;
}

export function getStoredAttribution(): AttributionData {
  return storageGetJSONSync<AttributionData>(ATTRIBUTION_KEY, {} as AttributionData);
}

/**
 * Read Meta's _fbc (click ID) and _fbp (browser ID) cookies. These let
 * Meta match server-side CAPI events back to the ad click — without them,
 * attribution quality drops sharply (~30% of conversions lose their source).
 */
export function readFbCookies(): { fbc?: string; fbp?: string } {
  if (typeof document === 'undefined') return {};
  const out: { fbc?: string; fbp?: string } = {};
  for (const part of document.cookie.split(';')) {
    const [rawName, ...rest] = part.trim().split('=');
    const value = rest.join('=');
    if (rawName === '_fbc' && value) out.fbc = decodeURIComponent(value);
    if (rawName === '_fbp' && value) out.fbp = decodeURIComponent(value);
  }
  return out;
}

/**
 * Write captured attribution to profiles on signup success.
 * Clears localStorage afterwards so subsequent logins don't re-write stale data.
 */
export async function persistAttributionToProfile(userId: string): Promise<void> {
  const attribution = getStoredAttribution();
  if (!Object.keys(attribution).length) return;

  const { error } = await supabase
    .from('profiles')
    .update({
      utm_source: attribution.utm_source || null,
      utm_medium: attribution.utm_medium || null,
      utm_campaign: attribution.utm_campaign || null,
      utm_term: attribution.utm_term || null,
      utm_content: attribution.utm_content || null,
      gclid: attribution.gclid || null,
      fbclid: attribution.fbclid || null,
      referrer_url: attribution.referrer_url || null,
      landing_page: attribution.landing_page || null,
      first_touch_at: attribution.first_touch_at || null,
    })
    .eq('id', userId);

  if (error) {
    console.warn('[attribution] Failed to persist to profile', error);
    return;
  }
  storageRemoveSync(ATTRIBUTION_KEY);
}

/**
 * Fire a server-side CAPI event via the meta-capi edge function.
 * Uses the same event_id the browser Pixel fired so Meta deduplicates.
 */
export async function fireServerCapi(event: {
  event_name: string;
  event_id: string;
  email?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  value?: number;
  currency?: string;
  content_name?: string;
  action_source?: 'website' | 'app' | 'system_generated';
}): Promise<void> {
  // Auto-attach Facebook click/browser cookies — critical for Meta attribution
  // quality. Without these, server CAPI events can't link back to ad clicks.
  const { fbc, fbp } = readFbCookies();

  try {
    const { error } = await supabase.functions.invoke('meta-capi', {
      body: {
        event_name: event.event_name,
        event_id: event.event_id,
        action_source: event.action_source || 'website',
        event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
        email: event.email,
        external_id: event.user_id,
        first_name: event.first_name,
        last_name: event.last_name,
        country: 'gb',
        fbc,
        fbp,
        custom_data:
          event.value !== undefined
            ? {
                value: event.value,
                currency: event.currency || 'GBP',
                content_name: event.content_name,
              }
            : event.content_name
              ? { content_name: event.content_name }
              : undefined,
      },
    });
    if (error) throw error;
  } catch (err) {
    console.warn('[attribution] Server CAPI call failed (non-fatal)', err);
    // Surface to Sentry so we catch Meta rate limits / token expiry
    captureError(err instanceof Error ? err : new Error(String(err)), {
      context: 'meta_capi_client_forward',
      event_name: event.event_name,
      event_id: event.event_id,
    });
  }
}
