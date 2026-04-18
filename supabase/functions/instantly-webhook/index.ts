// instantly-webhook
//
// Receives event webhooks from Instantly.ai for the cold-outreach campaigns.
// Writes every event to outreach_events and applies auto-suppression on
// bounces + unsubscribe/STOP replies.
//
// Event types Instantly sends (from their V2 docs):
//   email_sent          — first sent / step sent
//   email_opened        — open tracking
//   email_clicked       — link click
//   email_replied       — recipient replied
//   email_bounced       — hard/soft bounce
//   email_unsubscribed  — recipient hit the one-click unsub
//   lead_completed      — lead finished the sequence
//   auto_reply          — auto-responder detected
//   lead_interested     — AI detected positive intent (if configured)
//
// Signed/unsigned? Instantly doesn't HMAC-sign webhooks. We rely on the URL
// being private + a shared secret query param (x-webhook-token) that we set
// when registering the webhook.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-webhook-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPPRESSION_REPLY_PATTERNS = [
  /^\s*stop\s*$/i,
  /^\s*unsubscribe\b/i,
  /^\s*remove\s*(me)?\s*$/i,
  /^\s*opt[\s-]*out\s*$/i,
  /^\s*no\s*thank(s)?\s*\.?\s*$/i,
  /\bplease\s+remove\b/i,
  /\bremove\s+(me|us)\s+from\b/i,
  /\bunsubscribe\b/i,
  /\bdo\s+not\s+email\b/i,
  /\bleave\s+me\s+alone\b/i,
];

function isUnsubIntent(text: string | null | undefined): boolean {
  if (!text) return false;
  const body = text.slice(0, 500);
  return SUPPRESSION_REPLY_PATTERNS.some((re) => re.test(body));
}

function lower(s: string | null | undefined): string | null {
  return s ? s.trim().toLowerCase() : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickEmail(p: any): string | null {
  return lower(
    p?.lead_email || p?.email || p?.recipient || p?.to || p?.lead?.email || null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickEventType(p: any): string {
  // Instantly sends event_type as a string at the top level. Support a few
  // legacy names too.
  return (p?.event_type || p?.type || p?.event || 'unknown').toString().toLowerCase();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response('method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    // Shared-secret check via URL query param — ?token=XXX
    const url = new URL(req.url);
    const providedToken = url.searchParams.get('token') || req.headers.get('x-webhook-token') || '';
    const expectedToken = Deno.env.get('INSTANTLY_WEBHOOK_TOKEN') || '';
    if (!expectedToken) {
      console.error('[instantly-webhook] INSTANTLY_WEBHOOK_TOKEN not set');
      return new Response('not configured', { status: 500, headers: corsHeaders });
    }
    if (providedToken !== expectedToken) {
      return new Response('unauthorized', { status: 401, headers: corsHeaders });
    }

    const payload = await req.json();
    const eventType = pickEventType(payload);
    const email = pickEmail(payload);
    const campaignId = payload.campaign_id || payload.campaign || null;
    const leadId = payload.lead_id || payload.lead?.id || null;
    const step = payload.step || payload.step_number || null;

    const sb = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // ─── Write raw event row ─────────────────────────────────────
    await sb.from('outreach_events').insert({
      event_type: eventType,
      campaign_id: campaignId,
      lead_id: leadId,
      email,
      step: typeof step === 'number' ? step : null,
      reply_text: payload.reply_text || payload.reply_body || payload.text || null,
      reply_subject: payload.reply_subject || payload.subject || null,
      bounce_type: payload.bounce_type || payload.hard_bounce === true ? 'hard' : null,
      user_agent: payload.user_agent || null,
      ip_address: payload.ip || payload.ip_address || null,
      raw_payload: payload,
    });

    // ─── Auto-suppression triggers ───────────────────────────────
    let suppressed = false;
    let suppressionReason: string | null = null;

    if (email) {
      // Instantly's real event names: email_sent, email_opened, email_bounced,
      // reply_received, lead_unsubscribed, lead_interested, campaign_completed.
      if (eventType === 'email_bounced' || eventType === 'email_bounced_hard') {
        suppressionReason = 'bounced_hard_instantly';
      } else if (eventType === 'lead_unsubscribed' || eventType === 'email_unsubscribed') {
        suppressionReason = 'user_unsubscribed_instantly';
      } else if (eventType === 'reply_received' || eventType === 'email_replied') {
        if (isUnsubIntent(payload.reply_text || payload.reply_body || payload.text || '')) {
          suppressionReason = 'user_unsubscribed_reply';
        }
      }

      if (suppressionReason) {
        await sb
          .from('email_suppressions')
          .upsert(
            {
              email,
              reason: suppressionReason,
              source: 'instantly_webhook',
              metadata: { event_type: eventType, campaign_id: campaignId },
            },
            { onConflict: 'email', ignoreDuplicates: false }
          );

        await sb
          .from('outreach_contacts')
          .update({
            is_suppressed: true,
            suppression_reason: suppressionReason,
            suppressed_at: new Date().toISOString(),
          })
          .ilike('email', email);

        // Also pull the lead from the Instantly campaign so we don't keep
        // firing at it. Best-effort — don't fail the webhook if this errors.
        try {
          const instKey = Deno.env.get('INSTANTLY_API_KEY') || '';
          if (instKey && leadId) {
            await fetch(`https://api.instantly.ai/api/v2/leads/${leadId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${instKey}` },
            });
          }
        } catch (err) {
          console.error('[instantly-webhook] failed to remove lead from Instantly', err);
        }

        suppressed = true;
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        event_type: eventType,
        email,
        suppressed,
        suppression_reason: suppressionReason,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[instantly-webhook] error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
