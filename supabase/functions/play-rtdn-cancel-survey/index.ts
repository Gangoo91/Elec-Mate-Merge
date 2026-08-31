// play-rtdn-cancel-survey
//
// WHY THIS EXISTS
// Most Play churn leaves by the Play Store → Subscriptions door, not through
// our app, so the RevenueCat Customer Center survey never sees it. Google DOES
// ask those users why, and keeps the answer on the subscription resource — but
// it is only reachable with the PURCHASE TOKEN, and RevenueCat exposes the GPA
// order id instead. The token only ever appears in Google's Real-Time Developer
// Notification, so we take a SECOND Pub/Sub subscription on the existing RTDN
// topic (RevenueCat keeps its own; Pub/Sub fans out, so RC is undisturbed).
//
// Flow: Pub/Sub push → verify caller → decode RTDN → on CANCELED, fetch
// subscriptionsv2 with a service-account token → read cancelSurveyResult →
// tie the token to a user via the GPA order id → upsert store_cancel_reasons.
//
// Ack policy — the reply code decides whether Pub/Sub redelivers, and a wrong
// choice either loses churn data or loops forever:
//   200 = permanent. Malformed message, wrong notification type, a 4xx from
//         Google, or a user who simply skipped the survey. Nothing to retry.
//   503 = transient. Missing credentials, a Google 5xx/429, or a failed insert.
//         Pub/Sub keeps the message for 7 days, so a fixable outage replays
//         rather than silently binning the week's reasons.

import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from '../_shared/cors.ts';

const PACKAGE_NAME = 'com.elecmate.app';
const RC_PROJECT = 'proj5dd5e597';

// SUBSCRIPTION_CANCELED. 13 (EXPIRED) carries no survey of its own, but the
// answer is already on the resource by then, so it acts as a backstop for a
// cancel notification we dropped.
const NOTIFY_CANCELED = 3;
const NOTIFY_EXPIRED = 13;

/**
 * Google's survey vocabulary → the vocabulary cancel_survey_responses already
 * uses, so the weekly digest can merge web and store leavers into one list.
 * Unknown values fall through to 'other' rather than being dropped: Google can
 * add options without notice, and `google_reason` keeps the original for a
 * replay if we ever want to remap.
 */
const REASON_MAP: Record<string, string> = {
  CANCEL_SURVEY_REASON_NOT_ENOUGH_USAGE: 'not_using',
  CANCEL_SURVEY_REASON_TECHNICAL_ISSUES: 'bug',
  CANCEL_SURVEY_REASON_COST_RELATED: 'too_expensive',
  CANCEL_SURVEY_REASON_FOUND_BETTER_APP: 'switching',
  CANCEL_SURVEY_REASON_OTHERS: 'other',
  CANCEL_SURVEY_REASON_UNSPECIFIED: 'other',
};

/**
 * Pub/Sub push cannot send an arbitrary header, so the caller is proved one of
 * two ways: a Google-signed OIDC token (preferred — configure the push
 * subscription with a service account), or a shared secret when OIDC is not
 * configured. Refuses to run wide open.
 */
async function callerIsGoogle(req: Request): Promise<boolean> {
  const expectedEmail = Deno.env.get('PLAY_RTDN_SA_EMAIL');
  const sharedSecret = Deno.env.get('PLAY_RTDN_SECRET');
  const bearer = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '').trim();

  if (expectedEmail && bearer) {
    try {
      // tokeninfo rather than local JWKS verification: this endpoint sees a
      // couple of messages a day, so the round trip costs nothing and there is
      // no key-rotation cache to get wrong.
      const r = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(bearer)}`
      );
      if (r.ok) {
        const claims = await r.json();
        // Audience must name THIS function. Without it, any Google-signed token
        // minted for the same service account (it is shared with the Play API
        // work) would be replayable against this endpoint.
        const audOk = String(claims.aud ?? '').includes('play-rtdn-cancel-survey');
        if (claims.email === expectedEmail && claims.email_verified !== false && audOk) {
          return true;
        }
        console.error('OIDC token rejected', {
          emailMatches: claims.email === expectedEmail,
          audienceMatches: audOk,
        });
      } else {
        console.error('OIDC tokeninfo lookup failed', r.status);
      }
    } catch (e) {
      console.error('OIDC verification threw', e);
    }
  }

  if (sharedSecret) {
    const url = new URL(req.url);
    if (url.searchParams.get('token') === sharedSecret) return true;
    if (bearer && bearer === sharedSecret) return true;
  }

  return false;
}

/** Service-account JWT → OAuth access token, scoped to the Play Developer API. */
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getPlayAccessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.token;

  const raw = Deno.env.get('PLAY_SERVICE_ACCOUNT_JSON');
  if (!raw) {
    console.error('PLAY_SERVICE_ACCOUNT_JSON not set');
    return null;
  }

  let sa: { client_email: string; private_key: string };
  try {
    sa = JSON.parse(raw);
  } catch {
    console.error('PLAY_SERVICE_ACCOUNT_JSON is not valid JSON');
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const b64url = (b: Uint8Array) =>
    btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const enc = (o: unknown) => b64url(new TextEncoder().encode(JSON.stringify(o)));

  const pem = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s/g, '');
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'pkcs8',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signingInput = `${enc(header)}.${enc(claim)}`;
  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(signingInput)
  );
  const assertion = `${signingInput}.${b64url(new Uint8Array(sig))}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!res.ok) {
    console.error('Play token exchange failed', res.status, await res.text());
    return null;
  }

  const json = await res.json();
  // 55 min, inside Google's 60 — same margin as the FCM path.
  cachedToken = { token: json.access_token, expiresAt: Date.now() + 55 * 60 * 1000 };
  return cachedToken.token;
}

/**
 * Tie a purchase token to one of our users.
 *
 * The token itself means nothing to us, so we work back from the GPA order id
 * Google returns: take every user who had a Play CANCELLATION near this event
 * (RevenueCat's webhook and the RTDN fire within seconds of each other), then
 * ask RevenueCat which of them owns that order id. That check is exact — the
 * time window only narrows the candidate list, it never decides the answer.
 */
async function resolveUser(
  supabase: SupabaseClient,
  orderId: string | null,
  eventTime: Date
): Promise<{ userId: string | null; method: string }> {
  const windowMs = 45 * 60 * 1000;
  const { data: candidates } = await supabase
    .from('billing_events')
    .select('user_id, created_at')
    .eq('store', 'PLAY_STORE')
    .in('event_type', ['CANCELLATION', 'EXPIRATION'])
    .gte('created_at', new Date(eventTime.getTime() - windowMs).toISOString())
    .lte('created_at', new Date(eventTime.getTime() + windowMs).toISOString())
    .not('user_id', 'is', null);

  // Capped: this runs once per retry and costs one RevenueCat call per
  // candidate. Play sees a couple of cancellations a day, so a window holding
  // more than 10 means something is off — degrade rather than fan out.
  const userIds = [...new Set((candidates ?? []).map((c) => c.user_id as string))].slice(0, 10);
  if (userIds.length === 0) return { userId: null, method: 'unmatched' };

  const rcKey = Deno.env.get('REVENUECAT_API_V2_KEY');
  if (rcKey && orderId) {
    for (const uid of userIds) {
      try {
        const r = await fetch(
          `https://api.revenuecat.com/v2/projects/${RC_PROJECT}/customers/${uid}/subscriptions`,
          { headers: { Authorization: `Bearer ${rcKey}` } }
        );
        if (!r.ok) continue;
        const body = await r.json();
        const hit = (body.items ?? []).some(
          (s: { store_subscription_identifier?: string }) =>
            s.store_subscription_identifier === orderId
        );
        if (hit) return { userId: uid, method: 'order_id' };
      } catch {
        // Fail-open to the time-window fallback below.
      }
    }
  }

  // Only one plausible person cancelled in that window — good enough to
  // attribute, but flagged so the digest can say how it was matched.
  if (userIds.length === 1) return { userId: userIds[0], method: 'time_window' };
  return { userId: null, method: 'ambiguous' };
}

/**
 * THE RACE: Pub/Sub pushes this notification to RevenueCat and to us at the
 * same instant, but the billing_events row we match against is written by
 * RevenueCat's webhook — which only fires after RC has processed the same
 * message and called us back. Our path (one Play API call) is much shorter, so
 * a single immediate lookup almost always runs before the row exists and comes
 * back unmatched.
 *
 * So we wait for RevenueCat to catch up. The Pub/Sub ack deadline is 60s and
 * the Play fetch has already spent some of it; ~28s of retries fits safely and
 * costs nothing on the happy path, because the first attempt returns
 * immediately when the row is already there.
 */
async function resolveUserWithRetry(
  supabase: SupabaseClient,
  orderId: string | null,
  eventTime: Date
): Promise<{ userId: string | null; method: string }> {
  const delaysMs = [0, 8000, 12000, 8000];
  let last: { userId: string | null; method: string } = { userId: null, method: 'unmatched' };

  for (const delay of delaysMs) {
    if (delay) await new Promise((r) => setTimeout(r, delay));
    last = await resolveUser(supabase, orderId, eventTime);
    if (last.userId) return last;
  }
  return last;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  if (!(await callerIsGoogle(req))) {
    console.error('Unauthorised RTDN push');
    return json({ error: 'Unauthorised' }, 401);
  }

  try {
    const body = await req.json();
    const dataB64 = body?.message?.data;
    if (!dataB64) return json({ ok: true, skipped: 'no message.data' });

    // Decode as UTF-8, not atob's latin1. RTDN payloads are ASCII today, but a
    // single non-ASCII byte would silently corrupt the JSON parse.
    const rtdnBytes = Uint8Array.from(atob(dataB64), (c) => c.charCodeAt(0));
    const rtdn = JSON.parse(new TextDecoder().decode(rtdnBytes));
    const note = rtdn.subscriptionNotification;
    if (!note) return json({ ok: true, skipped: 'not a subscription notification' });

    const { notificationType, purchaseToken } = note;
    if (![NOTIFY_CANCELED, NOTIFY_EXPIRED].includes(notificationType)) {
      return json({ ok: true, skipped: `type ${notificationType}` });
    }
    if (!purchaseToken) return json({ ok: true, skipped: 'no purchase token' });

    // 503 rather than 200 so Pub/Sub redelivers: a missing or broken key is a
    // fixable outage, and messages survive 7 days. Acking here would throw the
    // week's churn reasons away silently.
    const accessToken = await getPlayAccessToken();
    if (!accessToken) return json({ ok: false, retry: 'no play credentials' }, 503);

    const subRes = await fetch(
      `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${PACKAGE_NAME}` +
        `/purchases/subscriptionsv2/tokens/${encodeURIComponent(purchaseToken)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!subRes.ok) {
      const detailText = await subRes.text();
      console.error('subscriptionsv2 fetch failed', subRes.status, detailText);
      // 5xx/429 are transient (Google blip, rate limit) — make Pub/Sub retry.
      // 4xx means this token will never resolve, so ack and move on.
      const transient = subRes.status >= 500 || subRes.status === 429;
      return json(
        { ok: false, [transient ? 'retry' : 'skipped']: `play api ${subRes.status}` },
        transient ? 503 : 200
      );
    }

    const sub = await subRes.json();
    const survey = sub?.canceledStateContext?.userInitiatedCancellation?.cancelSurveyResult;

    // No survey means the user skipped it, or the cancellation was not user
    // initiated (billing failure, developer action). Both are normal.
    if (!survey?.reason) {
      return json({ ok: true, skipped: 'no survey answer' });
    }

    const googleReason: string = survey.reason;
    const reason = REASON_MAP[googleReason] ?? 'other';
    const detail: string | null = survey.userInputCancelReason?.trim() || null;
    const orderId: string | null = sub.latestOrderId ?? null;
    const productId: string | null = sub?.lineItems?.[0]?.productId ?? note.subscriptionId ?? null;
    const cancelTime =
      sub?.canceledStateContext?.userInitiatedCancellation?.cancelTime ??
      (rtdn.eventTimeMillis ? new Date(Number(rtdn.eventTimeMillis)).toISOString() : null);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { userId, method } = await resolveUserWithRetry(
      supabase,
      orderId,
      cancelTime ? new Date(cancelTime) : new Date()
    );

    // CANCELED and EXPIRED both carry the same survey answer, so the same token
    // arrives twice. Never let the second pass downgrade a row we already
    // matched: keep the known user rather than overwriting it with null.
    const { data: existing } = await supabase
      .from('store_cancel_reasons')
      .select('user_id, match_method')
      .eq('purchase_token', purchaseToken)
      .maybeSingle();

    const keepExisting = !userId && !!existing?.user_id;
    const finalUserId = userId ?? existing?.user_id ?? null;
    const finalMethod = keepExisting ? (existing?.match_method ?? method) : method;

    const { error } = await supabase.from('store_cancel_reasons').upsert(
      {
        user_id: finalUserId,
        store: 'PLAY_STORE',
        purchase_token: purchaseToken,
        order_id: orderId,
        product_id: productId,
        reason,
        google_reason: googleReason,
        reason_detail: detail,
        match_method: finalMethod,
        raw: { rtdn, canceledStateContext: sub.canceledStateContext ?? null },
        cancelled_at: cancelTime,
      },
      { onConflict: 'purchase_token' }
    );

    if (error) {
      // Retry: the answer is already lost from Google's side once we ack.
      console.error('store_cancel_reasons upsert failed', error);
      return json({ ok: false, retry: error.message }, 503);
    }

    console.log(`Play cancel reason captured: ${googleReason} → ${reason} (match: ${finalMethod})`);
    return json({
      ok: true,
      reason,
      google_reason: googleReason,
      match: finalMethod,
      matched: !!finalUserId,
    });
  } catch (e) {
    console.error('play-rtdn-cancel-survey threw', e);
    // Still 200: a malformed message must not be redelivered forever.
    return json({ ok: false, error: String(e) });
  }
});
