/**
 * POST /api/wa-inbound
 *
 * Called by the OpenClaw `mate-router` plugin's `inbound_claim` hook on every
 * inbound WhatsApp message. We decide what should happen with the message:
 *
 *   { route_to: 'user-session' }
 *     The sender is in `phone_number_routing` — let OpenClaw's normal binding
 *     resolution + per-user agent run. We return this without doing anything.
 *
 *   { route_to: 'immediate_reply', immediate_reply: <text> }
 *     The sender is unbound. Either:
 *       (a) their message looks like a `START XXXXXX` activation code → we
 *           call /api/wa-onboarding inline; the response's `reply` is what we
 *           return as immediate_reply.
 *       (b) anything else → we return the friendly redirect telling them to
 *           open the Elec-Mate app.
 *
 * Auth: VPS_API_KEY + HMAC over `${sender_phone}|${conversation_id}`.
 *
 * This endpoint is the *only* place where unbound-sender messages get a
 * decision. Bound-user routing happens in OpenClaw via session-binding; we
 * never need to forward those messages anywhere — we just say "yes, leave it
 * alone".
 */

import { type Request, type Response } from 'express';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config.js';
import { timingSafeCompare, verifySignedRequest, signRequest } from '../lib/request-signer.js';
import crypto from 'node:crypto';

interface WaInboundBody {
  sender_phone?: string;
  message_text?: string;
  conversation_id?: string | null;
  message_id?: string | null;
}

const PHONE_REGEX = /^\+\d{10,15}$/;
const START_CODE_REGEX = /^\s*START\s+(\d{6})\s*$/i;

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

const FRIENDLY_REDIRECT =
  "Hey 👋 — looks like you're trying to set up Mate. Tap the activation link from the Elec-Mate app, or visit elec-mate.com/electrician/business-ai to get one.";

export async function handleWaInbound(req: Request, res: Response): Promise<void> {
  try {
    // ── Auth ──────────────────────────────────────────────────────────
    const apiKey = req.headers['x-api-key'] as string | undefined;
    if (!apiKey || !config.vpsApiKey || !timingSafeCompare(apiKey, config.vpsApiKey)) {
      res.status(401).json({ error: 'Invalid or missing API key' });
      return;
    }

    const { sender_phone, message_text, conversation_id, message_id } = (req.body ??
      {}) as WaInboundBody;

    if (typeof sender_phone !== 'string' || !PHONE_REGEX.test(sender_phone)) {
      res.status(400).json({ error: 'Invalid sender_phone' });
      return;
    }

    // HMAC binding over (sender_phone, conversation_id)
    if (config.hmacSecret) {
      const signature = req.headers['x-request-signature'] as string | undefined;
      const timestamp = req.headers['x-request-timestamp'] as string | undefined;
      const nonce = req.headers['x-request-nonce'] as string | undefined;
      if (!signature || !timestamp || !nonce) {
        res.status(401).json({ error: 'Missing request signing headers' });
        return;
      }
      const canonical = `${sender_phone}|${conversation_id ?? ''}`;
      const result = verifySignedRequest(
        canonical,
        parseInt(timestamp, 10),
        nonce,
        signature,
        config.hmacSecret
      );
      if (!result.valid) {
        console.error(`[wa-inbound] HMAC failed: ${result.reason}`);
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }
    }

    const supabase = getServiceClient();

    // ── Step 1: is the sender already a bound Mate user? ──────────────
    const { data: route } = await supabase
      .from('phone_number_routing')
      .select('user_id, owner_type')
      .eq('phone_number', sender_phone)
      .maybeSingle();

    if (route?.user_id) {
      // Bound user. Let OpenClaw's normal routing handle the message.
      res.status(200).json({ route_to: 'user-session', user_id: route.user_id });
      return;
    }

    // ── Step 2: unbound sender. Is this a START XXXXXX activation code? ──
    const startMatch = (message_text ?? '').match(START_CODE_REGEX);
    if (startMatch) {
      const code = startMatch[1];
      // Forward to the existing /api/wa-onboarding endpoint on this same server.
      // We HMAC the (code, sender_phone) tuple — same scheme that endpoint expects.
      const onboardingTimestamp = Date.now();
      const onboardingNonce = crypto.randomBytes(16).toString('hex');
      const onboardingSig = signRequest(
        `${code}|${sender_phone}`,
        onboardingTimestamp,
        onboardingNonce,
        config.hmacSecret
      );

      try {
        const onboardingRes = await fetch(`http://127.0.0.1:${config.port}/api/wa-onboarding`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': config.vpsApiKey,
            'X-Request-Signature': onboardingSig,
            'X-Request-Timestamp': String(onboardingTimestamp),
            'X-Request-Nonce': onboardingNonce,
          },
          body: JSON.stringify({ code, sender_phone }),
        });
        const body = (await onboardingRes.json().catch(() => ({}))) as Record<string, unknown>;
        const reply =
          typeof body.reply === 'string' && body.reply.length > 0
            ? (body.reply as string)
            : "Activation hit a snag — please try again in a minute.";
        res.status(200).json({
          route_to: 'immediate_reply',
          immediate_reply: reply,
          onboarding_success: body.success === true,
        });
        return;
      } catch (err) {
        console.error('[wa-inbound] onboarding call failed:', err);
        res.status(200).json({
          route_to: 'immediate_reply',
          immediate_reply:
            "Activation hit a snag — please try again in a minute. If it keeps happening, tap 'Generate new code' in the app.",
        });
        return;
      }
    }

    // ── Step 3: unbound sender, no activation code → friendly redirect ──
    res.status(200).json({
      route_to: 'immediate_reply',
      immediate_reply: FRIENDLY_REDIRECT,
    });
  } catch (err) {
    console.error('[wa-inbound] unhandled error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
