/**
 * POST /api/wa-onboarding
 *
 * Completes WhatsApp deep-link onboarding for a paying Business AI user.
 * Called by the OpenClaw "default" onboarding agent when an unrecognised
 * sender messages Mate's number with "START XXXXXX".
 *
 * Auth: X-API-Key (VPS_API_KEY) + HMAC signature over the (code, sender_phone)
 * tuple — same scheme as /api/tool-call but with `code` substituted for the
 * sender_phone in the signed payload (the user is by definition not yet in
 * phone_number_routing, so we can't rely on phone-based JWT lookup).
 *
 * Body:
 *   { code: string (6 digits), sender_phone: string (E.164, +44...) }
 *
 * Behaviour:
 *   1. Look up phone_verification_codes WHERE verification_method='whatsapp_deeplink'
 *      AND code=$code AND verified_at IS NULL AND expires_at > now().
 *   2. Mark the row used.
 *   3. Update profiles for the matched user_id:
 *      agent_phone_verified=true, agent_whatsapp_number=$sender_phone,
 *      agent_phone_verified_at=now(), agent_status='provisioning'.
 *   4. Upsert phone_number_routing.
 *   5. Invoke the existing `provision-business-ai` edge function with a
 *      service-role-minted user JWT, so its existing workspace creation +
 *      VPS provisioning + rollback logic does the heavy lifting.
 *   6. Return { success, reply } — the default agent relays `reply` to the user.
 */

import { type Request, type Response } from 'express';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config.js';
import { timingSafeCompare, verifySignedRequest } from '../lib/request-signer.js';
import { sendMateActivationEmail } from '../lib/mate-activation-email.js';

interface WaOnboardingBody {
  code?: string;
  sender_phone?: string;
}

const CODE_REGEX = /^\d{6}$/;
const PHONE_REGEX = /^\+\d{10,15}$/;

function jsonError(
  res: Response,
  status: number,
  message: string,
  reply?: string
): void {
  res.status(status).json({
    success: false,
    error: message,
    reply: reply ?? message,
  });
}

let _serviceClient: SupabaseClient | null = null;
function getServiceClient(): SupabaseClient {
  if (_serviceClient) return _serviceClient;
  if (!config.supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }
  _serviceClient = createClient(config.supabaseUrl, config.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _serviceClient;
}

export async function handleWaOnboarding(req: Request, res: Response): Promise<void> {
  try {
    // ── Auth: VPS API key ───────────────────────────────────────────────
    const apiKey = req.headers['x-api-key'] as string | undefined;
    if (!apiKey || !config.vpsApiKey || !timingSafeCompare(apiKey, config.vpsApiKey)) {
      jsonError(res, 401, 'Invalid or missing API key');
      return;
    }

    const { code, sender_phone } = (req.body ?? {}) as WaOnboardingBody;

    if (typeof code !== 'string' || !CODE_REGEX.test(code)) {
      jsonError(
        res,
        400,
        'Invalid code',
        "I don't recognise that code. Generate a new one in the Elec-Mate app."
      );
      return;
    }

    if (typeof sender_phone !== 'string' || !PHONE_REGEX.test(sender_phone)) {
      jsonError(res, 400, 'Invalid sender_phone (expected E.164, e.g. +447XXXXXXXXX)');
      return;
    }

    // ── HMAC: bind code+phone to a request signature so an attacker
    //         can't replay or guess codes from outside the gateway. ──────
    if (config.hmacSecret) {
      const signature = req.headers['x-request-signature'] as string | undefined;
      const timestamp = req.headers['x-request-timestamp'] as string | undefined;
      const nonce = req.headers['x-request-nonce'] as string | undefined;
      if (!signature || !timestamp || !nonce) {
        jsonError(res, 401, 'Missing request signing headers');
        return;
      }
      // Sign the canonical payload `${code}|${sender_phone}` rather than just
      // the phone (per /api/tool-call) — the user isn't yet identified by phone.
      const canonical = `${code}|${sender_phone}`;
      const result = verifySignedRequest(
        canonical,
        parseInt(timestamp, 10),
        nonce,
        signature,
        config.hmacSecret
      );
      if (!result.valid) {
        console.error(`[wa-onboarding] HMAC failed: ${result.reason}`);
        jsonError(res, 401, 'Invalid request signature');
        return;
      }
    } else if (config.nodeEnv === 'production') {
      console.warn('[wa-onboarding] HMAC_SECRET not set — signature check skipped');
    }

    const supabase = getServiceClient();

    // ── 1. Look up the pending code ─────────────────────────────────────
    const { data: codeRow, error: codeErr } = await supabase
      .from('phone_verification_codes')
      .select('id, user_id, expires_at, attempts')
      .eq('verification_method', 'whatsapp_deeplink')
      .eq('code', code)
      .is('verified_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (codeErr) {
      console.error('[wa-onboarding] code lookup failed:', codeErr.message);
      jsonError(
        res,
        500,
        'Database error',
        'Activation hit a snag — please try again in a minute.'
      );
      return;
    }

    if (!codeRow) {
      res.status(200).json({
        success: false,
        reply:
          "I don't recognise that code (or it's expired). Tap 'Generate new code' in the Elec-Mate app and try again.",
      });
      return;
    }

    const userId: string = codeRow.user_id;

    // ── 2. Mark the code used ─────────────────────────────────────────
    await supabase
      .from('phone_verification_codes')
      .update({
        verified_at: new Date().toISOString(),
        phone_number: sender_phone,
        attempts: (codeRow.attempts ?? 0) + 1,
      })
      .eq('id', codeRow.id);

    // ── 3. Reject if this WhatsApp number is already linked to a different user ──
    const { data: existingRoute } = await supabase
      .from('phone_number_routing')
      .select('user_id')
      .eq('phone_number', sender_phone)
      .eq('owner_type', 'electrician')
      .maybeSingle();

    if (existingRoute && existingRoute.user_id !== userId) {
      // Roll the code back so the legitimate user can still use it from a
      // different number if they want to.
      await supabase
        .from('phone_verification_codes')
        .update({ verified_at: null })
        .eq('id', codeRow.id);
      res.status(200).json({
        success: false,
        reply:
          "That phone number is already linked to another Elec-Mate account. If that's not right, please contact support.",
      });
      return;
    }

    // ── 4. Flip verification flags + register routing ─────────────────
    const { error: profileErr } = await supabase
      .from('profiles')
      .update({
        agent_phone_verified: true,
        agent_whatsapp_number: sender_phone,
        agent_phone_verified_at: new Date().toISOString(),
        agent_status: 'provisioning',
      })
      .eq('id', userId);

    if (profileErr) {
      console.error('[wa-onboarding] profile update failed:', profileErr.message);
      jsonError(
        res,
        500,
        'Failed to update profile',
        'Activation hit a snag — please try again in a minute.'
      );
      return;
    }

    await supabase.from('phone_number_routing').upsert(
      {
        phone_number: sender_phone,
        owner_type: 'electrician',
        user_id: userId,
        registered_at: new Date().toISOString(),
      },
      { onConflict: 'phone_number' }
    );

    // ── 5. Invoke provision-business-ai with a service-minted user JWT ──
    // We can't use the service-role key directly because provision-business-ai
    // calls supabase.auth.getUser() to identify the caller. Mint a 5-minute
    // user-scoped JWT via the existing get-agent-jwt edge function.
    const jwtRes = await fetch(`${config.supabaseUrl}/functions/v1/get-agent-jwt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VPS-API-Key': config.vpsApiKey,
        Authorization: `Bearer ${config.supabaseAnonKey}`,
      },
      body: JSON.stringify({ phone_number: sender_phone }),
    });

    if (!jwtRes.ok) {
      const errBody = (await jwtRes.json().catch(() => ({}))) as Record<string, unknown>;
      console.error('[wa-onboarding] JWT mint failed:', errBody.error || jwtRes.statusText);
      // Roll status back so the welcome page surfaces a retry.
      await supabase
        .from('profiles')
        .update({ agent_status: 'provisioning' })
        .eq('id', userId);
      jsonError(
        res,
        502,
        'JWT mint failed',
        "Activation hit a snag — I'll retry in a minute. If it's still not working, tap 'Generate new code' in the app."
      );
      return;
    }

    const { jwt } = (await jwtRes.json()) as { jwt: string };

    const provisionRes = await fetch(
      `${config.supabaseUrl}/functions/v1/provision-business-ai`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!provisionRes.ok) {
      const errBody = (await provisionRes.json().catch(() => ({}))) as Record<string, unknown>;
      console.error('[wa-onboarding] provision failed:', errBody.error || provisionRes.statusText);
      // provision-business-ai already rolls agent_status back to 'provisioning' on
      // VPS failure (line 223–238 of that function), so the user's welcome page
      // will keep polling.
      jsonError(
        res,
        502,
        'Provisioning failed',
        "Activation hit a snag — I'll retry in a minute. If it's still not working, tap 'Generate new code' in the app."
      );
      return;
    }

    // Audit log entry — visible in agent_tool_error_summary if we ever want
    // to see WA onboarding success rates.
    await supabase.from('agent_action_log').insert({
      user_id: userId,
      action_type: 'wa_self_onboarding',
      description: 'WhatsApp deeplink onboarding completed',
      outcome: 'success',
      detail: {
        sender_phone,
        code_id: codeRow.id,
      },
    });

    // Fire activation email (fire-and-forget — never block on email failure).
    // Look up the user's auth email + profile name.
    void (async () => {
      try {
        const [{ data: profileForEmail }, { data: authUser }] = await Promise.all([
          supabase.from('profiles').select('full_name').eq('id', userId).maybeSingle(),
          supabase.auth.admin.getUserById(userId),
        ]);
        const toEmail = authUser?.user?.email;
        if (toEmail) {
          await sendMateActivationEmail({
            toEmail,
            fullName: profileForEmail?.full_name ?? null,
            userPhone: sender_phone,
          });
        }
      } catch (e) {
        console.error('[wa-onboarding] activation email side-effect failed:', e);
      }
    })();

    res.status(200).json({
      success: true,
      reply:
        "You're in ⚡ I'm Mate, your AI business assistant. Try: \"morning brief\" to see today's plan, or \"create a quote\" to start one.",
      user_id: userId,
    });
  } catch (err) {
    console.error('[wa-onboarding] unhandled error:', err);
    jsonError(
      res,
      500,
      'Internal error',
      'Activation hit a snag — please try again in a minute.'
    );
  }
}
