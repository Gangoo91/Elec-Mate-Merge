// LTI 1.3 Resource Link Launch endpoint.
//
// Receives the signed id_token from the LMS, verifies it, maps the LTI user
// to an Elec-Mate user, issues a Supabase magic-link session, and returns an
// intermediate HTML page that breaks out of any LMS iframe before handing off
// to the magic link.
//
// Spec: https://www.imsglobal.org/spec/lti/v1p3#launch-overview
//
// Must be deployed with --no-verify-jwt (LMSes call this unauthenticated).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  verifyLtiJwt,
  mapLtiRolesToCollegeRole,
  LtiVerificationError,
  type LtiPlatform,
  type LtiLaunchSession,
} from '../_shared/lti-verify.ts';
import {
  CORS_HEADERS,
  cid,
  logLtiEvent,
  wantsHtml,
  jsonError,
  htmlErrorPage,
} from '../_shared/lti-responses.ts';
import { rateLimit, rateLimitHeaders } from '../_shared/lti-ratelimit.ts';
import { captureMessage, captureException } from '../_shared/sentry.ts';

function launchErrorResponse(
  req: Request,
  correlationId: string,
  status: number,
  code: string,
  title: string,
  detail: string,
  launchId?: string | null
): Response {
  logLtiEvent('warn', 'launch_error', { cid: correlationId, code, status, launch_id: launchId });
  if (wantsHtml(req)) {
    return htmlErrorPage({ status, title, detail, errorCode: code, correlationId, launchId });
  }
  return jsonError(status, code, detail, { cid: correlationId, launch_id: launchId });
}

async function parseForm(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get('content-type') ?? '';
  if (ct.includes('application/x-www-form-urlencoded')) {
    const text = await req.text();
    const p = new URLSearchParams(text);
    const out: Record<string, string> = {};
    p.forEach((v, k) => (out[k] = v));
    return out;
  }
  if (ct.includes('multipart/form-data')) {
    const fd = await req.formData();
    const out: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === 'string') out[k] = v;
    });
    return out;
  }
  return {};
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return jsonError(405, 'method_not_allowed', 'LTI launch requires POST');
  }

  const correlationId = cid();
  const t0 = performance.now();

  // Rate limit: 20 req/min per IP. Short-circuits the expensive JWT verify
  // path for misbehaving callers before it touches the DB or JWKS fetch.
  const rl = await rateLimit(req);
  if (!rl.allowed) {
    logLtiEvent('warn', 'launch_rate_limited', {
      cid: correlationId,
      retry_after_seconds: rl.retryAfterSeconds,
    });
    return new Response(
      JSON.stringify({
        error: 'rate_limited',
        detail: 'Too many launches from this IP. Please try again shortly.',
        cid: correlationId,
      }),
      {
        status: 429,
        headers: {
          ...CORS_HEADERS,
          'content-type': 'application/json',
          ...rateLimitHeaders(rl),
        },
      }
    );
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return launchErrorResponse(
      req,
      correlationId,
      500,
      'server_misconfigured',
      'Elec-Mate is misconfigured',
      'Server environment is missing Supabase credentials. Please contact Elec-Mate support.'
    );
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const form = await parseForm(req);
  const { id_token: idToken, state } = form;
  if (!idToken || !state) {
    return launchErrorResponse(
      req,
      correlationId,
      400,
      'missing_parameters',
      'Malformed LMS launch',
      'Your LMS did not forward the expected id_token and state. This usually indicates a browser or iframe issue — try opening the link in a new tab.'
    );
  }

  logLtiEvent('info', 'launch_started', { cid: correlationId, state_prefix: state.slice(0, 8) });

  // 1. Look up the session
  const { data: session, error: sessionErr } = await supabase
    .from('lti_launch_sessions')
    .select('id, platform_id, nonce, target_link_uri, expires_at, created_at')
    .eq('state', state)
    .maybeSingle();
  if (sessionErr) {
    logLtiEvent('error', 'session_lookup_failed', { cid: correlationId, error: sessionErr.message });
    return launchErrorResponse(
      req,
      correlationId,
      500,
      'session_lookup_failed',
      'Could not look up launch session',
      sessionErr.message
    );
  }
  if (!session) {
    return launchErrorResponse(
      req,
      correlationId,
      400,
      'invalid_state',
      'Launch expired or invalid',
      "The LTI launch is either expired (over 10 minutes old) or has already been used. Please return to your LMS and click the Elec-Mate link again."
    );
  }

  // 2. Look up platform
  const { data: platform, error: platformErr } = await supabase
    .from('lti_platforms')
    .select('id, issuer, client_id, deployment_id, jwks_url, college_id, status')
    .eq('id', session.platform_id)
    .maybeSingle();
  if (platformErr) {
    return launchErrorResponse(
      req,
      correlationId,
      500,
      'platform_lookup_failed',
      'Could not look up LMS',
      platformErr.message
    );
  }
  if (!platform) {
    return launchErrorResponse(
      req,
      correlationId,
      500,
      'platform_gone',
      'LMS registration removed',
      'The LMS registration for this launch was removed mid-flow. Please contact your college IT admin.'
    );
  }

  // 3. Verify the JWT
  const tVerifyStart = performance.now();
  let verified;
  try {
    verified = await verifyLtiJwt(idToken, platform as LtiPlatform, session as LtiLaunchSession);
  } catch (e: unknown) {
    if (e instanceof LtiVerificationError) {
      // Audit the failed attempt
      const { data: inserted } = await supabase
        .from('lti_launches')
        .insert({
          platform_id: platform.id,
          lti_user_id: 'unknown',
          state,
          nonce: session.nonce,
          launch_data: { error: e.code, detail: e.message, cid: correlationId },
          validated: false,
        })
        .select('id')
        .maybeSingle();

      logLtiEvent('warn', 'jwt_verify_failed', {
        cid: correlationId,
        code: e.code,
        platform_id: platform.id,
      });

      // Send a Sentry warning for high-signal failures so we can alert on spikes
      captureMessage(
        `LTI launch JWT verification failed: ${e.code}`,
        'warning',
        {
          functionName: 'lti-launch',
          tags: { error_code: e.code, platform_id: platform.id },
          extra: { cid: correlationId, detail: e.message, state_prefix: state.slice(0, 8) },
        }
      ).catch(() => {}); // never block the launch on Sentry delivery

      return launchErrorResponse(
        req,
        correlationId,
        401,
        e.code,
        'LTI launch rejected',
        friendlyDetailForCode(e.code, e.message),
        inserted?.id ?? null
      );
    }
    logLtiEvent('error', 'launch_unhandled_error', {
      cid: correlationId,
      error: (e as Error).message,
    });
    captureException(e, {
      functionName: 'lti-launch',
      tags: { phase: 'jwt_verify' },
      extra: { cid: correlationId },
    }).catch(() => {});
    return launchErrorResponse(
      req,
      correlationId,
      500,
      'jwt_verification_failed',
      'LTI launch failed',
      'An unexpected error occurred while verifying your LMS launch. Please try again.'
    );
  }
  const verifyMs = Math.round(performance.now() - tVerifyStart);

  // 4. Consume the session
  await supabase.from('lti_launch_sessions').delete().eq('id', session.id);

  // 5. Resolve (or provision) the user
  const tUserStart = performance.now();
  const { data: existingMap } = await supabase
    .from('lti_user_mappings')
    .select('id, user_id, email')
    .eq('platform_id', platform.id)
    .eq('lti_user_id', verified.sub)
    .maybeSingle();

  let userId: string | null = existingMap?.user_id ?? null;

  // 5a. If the LMS has changed this user's email since their last launch,
  //     sync it to auth.users so our records don't drift.
  if (
    userId &&
    verified.email &&
    existingMap?.email &&
    verified.email.toLowerCase() !== existingMap.email.toLowerCase()
  ) {
    try {
      await supabase.auth.admin.updateUserById(userId, { email: verified.email });
      logLtiEvent('info', 'user_email_synced', {
        cid: correlationId,
        user_id: userId,
        from_prefix: existingMap.email.slice(0, 4),
        to_prefix: verified.email.slice(0, 4),
      });
    } catch (e) {
      logLtiEvent('warn', 'user_email_sync_failed', {
        cid: correlationId,
        user_id: userId,
        error: (e as Error).message,
      });
      // Non-fatal: continue with the stale email rather than blocking the launch.
    }
  }

  if (!userId) {
    const email =
      verified.email ?? `lti-${platform.id.slice(0, 8)}-${verified.sub}@lti.users.elec-mate.com`;

    const { data: lookupByEmail } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });
    const matching =
      lookupByEmail?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null;

    if (matching) {
      userId = matching.id;
    } else {
      const { data: created, error: createErr } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          full_name: verified.name,
          lti_sub: verified.sub,
          lti_platform_id: platform.id,
          provisioned_by: 'lti-launch',
        },
      });
      if (createErr || !created?.user) {
        logLtiEvent('error', 'user_create_failed', {
          cid: correlationId,
          error: createErr?.message,
        });
        return launchErrorResponse(
          req,
          correlationId,
          500,
          'user_create_failed',
          'Could not create Elec-Mate user',
          createErr?.message ?? 'unknown'
        );
      }
      userId = created.user.id;
    }
  }

  // 6. Update profile
  const collegeRole = mapLtiRolesToCollegeRole(verified.roles);
  if (userId) {
    await supabase
      .from('profiles')
      .update({
        full_name: verified.name ?? undefined,
        college_role: collegeRole ?? undefined,
        college_id: platform.college_id ?? undefined,
      })
      .eq('id', userId);
  }

  // 7. Upsert mapping
  await supabase.from('lti_user_mappings').upsert(
    {
      platform_id: platform.id,
      lti_user_id: verified.sub,
      user_id: userId,
      email: verified.email,
      name: verified.name,
      roles: verified.roles,
      last_login_at: new Date().toISOString(),
    },
    { onConflict: 'platform_id,lti_user_id' }
  );

  const userMs = Math.round(performance.now() - tUserStart);

  // 8. Record success
  const launchExpiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const { data: launchRow } = await supabase
    .from('lti_launches')
    .insert({
      platform_id: platform.id,
      user_id: userId,
      lti_user_id: verified.sub,
      context_id: verified.context?.id ?? null,
      context_title: verified.context?.title ?? null,
      context_label: verified.context?.label ?? null,
      roles: verified.roles,
      resource_link_id: verified.resourceLinkId,
      launch_data: { ...verified.payload, cid: correlationId },
      nonce: session.nonce,
      state,
      validated: true,
      expires_at: launchExpiresAt,
    })
    .select('id')
    .maybeSingle();

  // 9. Deep Linking handoff (16.7)
  if (verified.messageType === 'LtiDeepLinkingRequest') {
    return launchErrorResponse(
      req,
      correlationId,
      501,
      'deep_linking_not_yet_wired',
      'Deep Linking not yet supported',
      'Deep Linking support is coming in Phase 16.7. For now, tutors can embed Elec-Mate resources via direct URLs.',
      launchRow?.id ?? null
    );
  }

  const tMagicStart = performance.now();

  // 10. Compute target URI.
  //     Priority: context_id mapped cohort > session.target_link_uri > /college default.
  let targetUri = session.target_link_uri ?? 'https://www.elec-mate.com/college';
  if (verified.context?.id) {
    const { data: ctxMap } = await supabase
      .from('lti_context_mappings')
      .select('cohort_id')
      .eq('platform_id', platform.id)
      .eq('context_id', verified.context.id)
      .maybeSingle();
    if (ctxMap?.cohort_id) {
      const appBase =
        Deno.env.get('LTI_APP_BASE_URL') ?? 'https://www.elec-mate.com';
      targetUri = `${appBase}/college/cohorts/${ctxMap.cohort_id}`;
      logLtiEvent('info', 'launch_routed_to_cohort', {
        cid: correlationId,
        context_id: verified.context.id,
        cohort_id: ctxMap.cohort_id,
      });
    }
  }

  const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: verified.email ?? `lti-${platform.id.slice(0, 8)}-${verified.sub}@lti.users.elec-mate.com`,
    options: { redirectTo: targetUri },
  });
  if (linkErr || !linkData?.properties?.action_link) {
    logLtiEvent('error', 'magic_link_failed', {
      cid: correlationId,
      error: linkErr?.message,
    });
    return launchErrorResponse(
      req,
      correlationId,
      500,
      'magic_link_failed',
      'Could not issue sign-in link',
      linkErr?.message ?? 'No action_link returned from Supabase',
      launchRow?.id ?? null
    );
  }

  const magicMs = Math.round(performance.now() - tMagicStart);
  const totalMs = Math.round(performance.now() - t0);
  logLtiEvent('info', 'launch_success', {
    cid: correlationId,
    platform_id: platform.id,
    user_id: userId,
    role: collegeRole,
    context_id: verified.context?.id,
    launch_id: launchRow?.id ?? null,
    verify_ms: verifyMs,
    user_ms: userMs,
    magic_ms: magicMs,
    total_ms: totalMs,
  });

  // 11. Redirect to the app-hosted handoff page which does the iframe breakout
  //     and then calls the Supabase magic-link URL. Cannot be done from the
  //     edge function itself because Supabase's edge runtime enforces a sandbox
  //     CSP that prevents our JS from running.
  const handoffBase =
    Deno.env.get('LTI_HANDOFF_URL') ?? 'https://www.elec-mate.com/lti/handoff';
  const handoffUrl =
    handoffBase +
    '?magic=' +
    encodeURIComponent(linkData.properties.action_link) +
    '&cid=' +
    encodeURIComponent(correlationId);

  return new Response(null, {
    status: 302,
    headers: {
      ...CORS_HEADERS,
      location: handoffUrl,
      'cache-control': 'no-store',
    },
  });
});

/**
 * Map internal error codes to human-readable explanations shown in the error page.
 */
function friendlyDetailForCode(code: string, fallback: string): string {
  switch (code) {
    case 'session_expired':
      return 'This LTI launch has expired. Please return to your LMS and click the Elec-Mate link again.';
    case 'nonce_mismatch':
      return 'The launch security token does not match. This usually means the launch was intercepted or tampered with. Please try again; if it persists, contact your college IT admin.';
    case 'deployment_id_mismatch':
      return 'The LMS sent a deployment ID that does not match the one registered in Elec-Mate. Your college IT admin needs to update the deployment ID in Elec-Mate settings.';
    case 'unsupported_lti_version':
      return 'Your LMS is using an LTI protocol version we do not support. We support LTI 1.3.';
    case 'unsupported_message_type':
      return 'Your LMS sent an LTI message type we do not support yet.';
    case 'missing_message_type':
    case 'missing_deployment_id':
    case 'missing_sub':
      return `Your LMS did not include a required claim in the launch token: ${code.replace('missing_', '')}. This is an LMS-side configuration issue.`;
    case 'platform_mismatch':
      return 'The launch session does not match the expected LMS platform. Please try launching again from your LMS.';
    default:
      return fallback || 'LTI launch failed for an unknown reason.';
  }
}
