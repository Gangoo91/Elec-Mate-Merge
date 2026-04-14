/**
 * trigger-referral-push
 *
 * Single entry point for every value-moment referral push and the weekly
 * cadence fallback. All callers pipe through here so the 7-day cooldown +
 * daily 2-push cap are enforced in one place.
 *
 * Called from:
 *   - Database triggers via pg_net (cert complete, quote sent, invoice sent)
 *   - Client-side success handlers (RAMS, AI design, 3rd mock exam)
 *   - referral-cadence-cron daily cron (weekly fallback for active users)
 *
 * Input:
 *   {
 *     user_id: string,
 *     trigger_type: 'rams_completed'
 *                 | 'cert_completed'
 *                 | 'quote_sent'
 *                 | 'invoice_sent'
 *                 | 'three_mock_exams'
 *                 | 'ai_design_completed'
 *                 | 'cadence_weekly',
 *     context?: Record<string, unknown>   // optional extra data for template
 *   }
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { referralTemplates } from '../_shared/notification-templates.ts';
import { sendSmartPush, type Tier } from '../_shared/notification-engine.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

type TriggerType =
  | 'rams_completed'
  | 'cert_completed'
  | 'quote_sent'
  | 'invoice_sent'
  | 'three_mock_exams'
  | 'ai_design_completed'
  | 'cadence_weekly';

interface Payload {
  user_id: string;
  trigger_type: TriggerType;
  context?: {
    cert_type?: string;
    client_name?: string;
    specialist_name?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Payload;
    const { user_id, trigger_type, context } = body;

    if (!user_id || !trigger_type) {
      return new Response(JSON.stringify({ error: 'user_id and trigger_type are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // ── Sanity checks: user is eligible for referral pushes ─────────────
    // 1. User must have a referral code (means they exist + system seeded them)
    const { data: codeRow } = await supabase
      .from('referral_codes')
      .select('code, is_active')
      .eq('user_id', user_id)
      .eq('is_active', true)
      .maybeSingle();

    if (!codeRow) {
      return new Response(JSON.stringify({ sent: false, reason: 'no_referral_code' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Check user preferences — respect deals_of_day toggle if present
    const { data: prefs } = await supabase
      .from('user_notification_preferences')
      .select('deals_of_day')
      .eq('user_id', user_id)
      .maybeSingle();

    if (prefs && (prefs as { deals_of_day?: boolean }).deals_of_day === false) {
      return new Response(JSON.stringify({ sent: false, reason: 'user_disabled' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Resolve template based on trigger type ─────────────────────────
    let template;
    switch (trigger_type) {
      case 'rams_completed':
        template = referralTemplates.rams_completed();
        break;
      case 'cert_completed':
        template = referralTemplates.cert_completed(context?.cert_type);
        break;
      case 'quote_sent':
        template = referralTemplates.quote_sent(context?.client_name);
        break;
      case 'invoice_sent':
        template = referralTemplates.invoice_sent(context?.client_name);
        break;
      case 'three_mock_exams':
        template = referralTemplates.three_mock_exams();
        break;
      case 'ai_design_completed':
        template = referralTemplates.ai_design_completed(context?.specialist_name);
        break;
      case 'cadence_weekly':
        template = referralTemplates.cadence_weekly();
        break;
      default:
        return new Response(JSON.stringify({ error: `Unknown trigger_type: ${trigger_type}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Cadence is tier=promo, value moments are tier=reengagement so they share
    // the same 2/day daily cap but are distinguishable in analytics later.
    const tier: Tier = trigger_type === 'cadence_weekly' ? 'promo' : 'reengagement';

    // Single category prefix 'referral_push' means cooldown check in the
    // engine catches any referral variant within 7 days.
    const result = await sendSmartPush(
      supabase as unknown as Parameters<typeof sendSmartPush>[0],
      SUPABASE_URL,
      `Bearer ${SERVICE_ROLE_KEY}`,
      {
        userId: user_id,
        tier,
        category: `referral_push__${trigger_type}`,
        template,
      }
    );

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[trigger-referral-push] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
