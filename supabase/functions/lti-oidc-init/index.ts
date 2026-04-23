// LTI 1.3 OIDC Third-Party-Initiated Login endpoint.
//
// Spec: https://www.imsglobal.org/spec/security/v1p1#step-1-third-party-initiated-login
//
// Flow:
//   1. LMS user clicks Elec-Mate link → LMS sends GET or POST here.
//   2. We look up the matching `lti_platforms` row by (issuer, client_id).
//   3. We generate cryptographically random `state` (CSRF) + `nonce` (replay).
//   4. We insert into `lti_launch_sessions` with a 10-minute TTL.
//   5. We 302-redirect to the platform's `auth_login_url`.
//
// Must be deployed with --no-verify-jwt (LMSes call this unauthenticated).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  CORS_HEADERS,
  cid,
  logLtiEvent,
  wantsHtml,
  jsonError,
  htmlErrorPage,
} from '../_shared/lti-responses.ts';
import { captureMessage } from '../_shared/sentry.ts';

const NONCE_TTL_SECONDS = 10 * 60;

function errorResponse(
  req: Request,
  correlationId: string,
  status: number,
  code: string,
  title: string,
  detail: string
): Response {
  logLtiEvent('warn', 'oidc_init_error', { cid: correlationId, code, detail, status });

  // Send 4xx+ to Sentry as warning so we can track spikes by platform
  if (status >= 400) {
    captureMessage(`OIDC init error: ${code}`, 'warning', {
      functionName: 'lti-oidc-init',
      tags: { error_code: code, status: String(status) },
      extra: { cid: correlationId, detail },
    }).catch(() => {});
  }

  if (wantsHtml(req)) {
    return htmlErrorPage({ status, title, detail, errorCode: code, correlationId });
  }
  return jsonError(status, code, detail, { cid: correlationId });
}

function randomToken(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  const b64 = btoa(String.fromCharCode(...buf));
  return b64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

async function parseParams(req: Request): Promise<Record<string, string>> {
  if (req.method === 'GET') {
    const u = new URL(req.url);
    const out: Record<string, string> = {};
    u.searchParams.forEach((v, k) => (out[k] = v));
    return out;
  }
  const ct = req.headers.get('content-type') ?? '';
  if (ct.includes('application/x-www-form-urlencoded')) {
    const body = await req.text();
    const p = new URLSearchParams(body);
    const out: Record<string, string> = {};
    p.forEach((v, k) => (out[k] = v));
    return out;
  }
  if (ct.includes('application/json')) {
    const j = await req.json();
    return j as Record<string, string>;
  }
  const u = new URL(req.url);
  const out: Record<string, string> = {};
  u.searchParams.forEach((v, k) => (out[k] = v));
  return out;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return jsonError(405, 'method_not_allowed');
  }

  const correlationId = cid();
  const params = await parseParams(req);
  const { iss, login_hint, target_link_uri, client_id, lti_deployment_id, lti_message_hint } = params;

  logLtiEvent('info', 'oidc_init_started', {
    cid: correlationId,
    iss,
    client_id,
    has_login_hint: !!login_hint,
    has_target: !!target_link_uri,
  });

  if (!iss || !login_hint || !target_link_uri) {
    return errorResponse(
      req,
      correlationId,
      400,
      'missing_required_parameters',
      'Malformed LMS launch',
      'Your LMS did not supply the required OIDC parameters (iss, login_hint, target_link_uri). This is usually a misconfiguration in the LMS-side tool registration.'
    );
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return errorResponse(
      req,
      correlationId,
      500,
      'server_misconfigured',
      'Elec-Mate is misconfigured',
      'Server environment is missing required Supabase credentials. Please contact Elec-Mate support with the reference code below.'
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = supabase
    .from('lti_platforms')
    .select('id, issuer, client_id, deployment_id, auth_login_url, status')
    .eq('issuer', iss);
  if (client_id) query = query.eq('client_id', client_id);

  const { data: platforms, error: lookupErr } = await query;
  if (lookupErr) {
    logLtiEvent('error', 'platform_lookup_failed', { cid: correlationId, error: lookupErr.message });
    return errorResponse(
      req,
      correlationId,
      500,
      'platform_lookup_failed',
      'Unable to look up LMS',
      'A database error occurred while looking up your LMS. Please try again in a moment; if the problem persists, contact Elec-Mate support.'
    );
  }

  if (!platforms || platforms.length === 0) {
    return errorResponse(
      req,
      correlationId,
      404,
      'platform_not_registered',
      'LMS not registered with Elec-Mate',
      `This LMS (${iss}) hasn't been registered with Elec-Mate yet. Ask your college IT admin to register it in the Elec-Mate College Hub under Settings → LTI.`
    );
  }

  let platform = platforms.find((p) => !lti_deployment_id || p.deployment_id === lti_deployment_id);
  if (!platform) platform = platforms[0];

  if (platform.status && platform.status.toLowerCase() === 'disconnected') {
    return errorResponse(
      req,
      correlationId,
      403,
      'platform_disabled',
      'LMS integration disabled',
      'This LMS integration has been disabled by your college admin. Contact them to re-enable it.'
    );
  }

  const state = randomToken(32);
  const nonce = randomToken(32);
  const expiresAt = new Date(Date.now() + NONCE_TTL_SECONDS * 1000).toISOString();

  const redirectUri = Deno.env.get('LTI_LAUNCH_URL') ?? `${SUPABASE_URL}/functions/v1/lti-launch`;

  const { error: insertErr } = await supabase.from('lti_launch_sessions').insert({
    platform_id: platform.id,
    state,
    nonce,
    target_link_uri,
    login_hint,
    client_id: client_id ?? platform.client_id,
    redirect_uri: redirectUri,
    lti_message_hint: lti_message_hint ?? null,
    expires_at: expiresAt,
  });
  if (insertErr) {
    logLtiEvent('error', 'session_store_failed', { cid: correlationId, error: insertErr.message });
    return errorResponse(
      req,
      correlationId,
      500,
      'session_store_failed',
      'Could not start launch session',
      'A database error occurred while starting your LTI launch. Please try again.'
    );
  }

  const authUrl = new URL(platform.auth_login_url);
  authUrl.searchParams.set('scope', 'openid');
  authUrl.searchParams.set('response_type', 'id_token');
  authUrl.searchParams.set('response_mode', 'form_post');
  authUrl.searchParams.set('prompt', 'none');
  authUrl.searchParams.set('client_id', platform.client_id);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('login_hint', login_hint);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('nonce', nonce);
  if (lti_message_hint) authUrl.searchParams.set('lti_message_hint', lti_message_hint);

  logLtiEvent('info', 'oidc_init_success', {
    cid: correlationId,
    platform_id: platform.id,
    state_prefix: state.slice(0, 8),
  });

  return new Response(null, {
    status: 302,
    headers: {
      ...CORS_HEADERS,
      location: authUrl.toString(),
      'cache-control': 'no-store',
    },
  });
});
