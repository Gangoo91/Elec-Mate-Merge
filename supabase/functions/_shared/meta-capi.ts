/**
 * Meta Conversions API (CAPI) — shared sender.
 *
 * Imported by the `meta-capi` edge function (HTTP wrapper for client calls)
 * AND by webhook functions (stripe-subscription-webhook, revenuecat-webhook)
 * so server-originated events fire directly without an extra HTTP hop.
 *
 * ENV VARS:
 *  - META_PIXEL_ID
 *  - META_CAPI_ACCESS_TOKEN
 *  - META_TEST_EVENT_CODE (optional — enables Test Events tab verification)
 *
 * DOCS: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import { captureException } from './sentry.ts';

const META_GRAPH_VERSION = 'v21.0';

export type ActionSource =
  | 'website'
  | 'app'
  | 'system_generated'
  | 'email'
  | 'phone_call'
  | 'chat'
  | 'other';

export interface CapiEvent {
  event_name: string;
  event_id: string;
  event_time?: number;
  action_source?: ActionSource;
  event_source_url?: string;
  email?: string;
  phone?: string;
  external_id?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  client_ip?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
  custom_data?: {
    currency?: string;
    value?: number;
    predicted_ltv?: number;
    subscription_id?: string;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    [key: string]: unknown;
  };
}

export interface CapiResult {
  ok: boolean;
  status: number;
  response?: unknown;
  error?: string;
}

async function sha256(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalisePhone(phone: string, defaultCountry = '44'): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = defaultCountry + digits.slice(1);
  if (!digits.startsWith(defaultCountry) && digits.length <= 10) digits = defaultCountry + digits;
  return digits;
}

async function buildUserData(event: CapiEvent): Promise<Record<string, unknown>> {
  const userData: Record<string, unknown> = {};
  if (event.email) userData.em = [await sha256(normaliseEmail(event.email))];
  if (event.phone) userData.ph = [await sha256(normalisePhone(event.phone))];
  if (event.external_id) userData.external_id = [await sha256(event.external_id.toLowerCase())];
  if (event.first_name) userData.fn = [await sha256(event.first_name.trim().toLowerCase())];
  if (event.last_name) userData.ln = [await sha256(event.last_name.trim().toLowerCase())];
  if (event.country) userData.country = [await sha256(event.country.trim().toLowerCase())];
  if (event.client_ip) userData.client_ip_address = event.client_ip;
  if (event.client_user_agent) userData.client_user_agent = event.client_user_agent;
  if (event.fbc) userData.fbc = event.fbc;
  if (event.fbp) userData.fbp = event.fbp;
  return userData;
}

/**
 * Send one or more events to Meta CAPI. Never throws — logs and returns on failure.
 * Safe to call as fire-and-forget from webhook handlers.
 */
export async function sendCapiEvents(events: CapiEvent[]): Promise<CapiResult> {
  const pixelId = Deno.env.get('META_PIXEL_ID');
  const accessToken = Deno.env.get('META_CAPI_ACCESS_TOKEN');
  const testEventCode = Deno.env.get('META_TEST_EVENT_CODE');

  if (!pixelId || !accessToken) {
    console.warn('[meta-capi] META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not configured — skipping');
    return { ok: false, status: 0, error: 'not_configured' };
  }

  const now = Math.floor(Date.now() / 1000);
  const data = await Promise.all(
    events.map(async (ev) => ({
      event_name: ev.event_name,
      event_time: ev.event_time ?? now,
      event_id: ev.event_id,
      action_source: ev.action_source ?? 'system_generated',
      ...(ev.event_source_url ? { event_source_url: ev.event_source_url } : {}),
      user_data: await buildUserData(ev),
      ...(ev.custom_data ? { custom_data: ev.custom_data } : {}),
    }))
  );

  const body: Record<string, unknown> = { data, access_token: accessToken };
  if (testEventCode) body.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    if (!res.ok) {
      console.error('[meta-capi] Meta API error', { status: res.status, response });
      // Rate limit / token expiry / bad payload — surface to Sentry so we
      // don't silently lose conversion attribution for days before noticing.
      await captureException(
        new Error(`Meta CAPI ${res.status}: ${JSON.stringify(response).slice(0, 400)}`),
        {
          functionName: 'meta-capi',
          status: res.status,
          event_names: events.map((e) => e.event_name),
          event_ids: events.map((e) => e.event_id),
        }
      ).catch(() => {});
      return { ok: false, status: res.status, response };
    }
    console.log('[meta-capi] Events sent', {
      count: data.length,
      names: events.map((e) => e.event_name),
      events_received: (response as { events_received?: number })?.events_received,
    });
    return { ok: true, status: res.status, response };
  } catch (err) {
    console.error('[meta-capi] Fetch failed', err);
    await captureException(err instanceof Error ? err : new Error(String(err)), {
      functionName: 'meta-capi',
      phase: 'fetch',
      event_names: events.map((e) => e.event_name),
    }).catch(() => {});
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Fire-and-forget wrapper for webhook callers. Logs errors, never throws.
 */
export function fireCapiEvent(event: CapiEvent): void {
  sendCapiEvents([event]).catch((err) => console.error('[meta-capi] fireCapiEvent failed', err));
}
