/**
 * trigger-transactional-push
 *
 * Tier-1 transactional pushes — fired from DB triggers immediately when a
 * revenue-moving event happens. These BYPASS the daily cap because they're
 * earned, user-initiated events that the user wants to know about instantly.
 *
 * Supported events:
 *   - quote_signed      — client accepted a quote (quotes.accepted_at set)
 *   - invoice_paid      — invoice marked paid (invoices.paid_at set)
 *   - cert_c1_detected  — EICR report contains a C1 severity code (critical)
 *
 * Input:
 *   {
 *     user_id: string,
 *     event_type: 'quote_signed' | 'invoice_paid' | 'cert_c1_detected',
 *     context?: {
 *       client_name?: string,
 *       amount_gbp?: string,
 *       ref_id?: string,
 *       property_address?: string,
 *     }
 *   }
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { transactionalTemplates } from '../_shared/notification-templates.ts';
import { sendSmartPush } from '../_shared/notification-engine.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

type EventType = 'quote_signed' | 'invoice_paid' | 'cert_c1_detected';

interface Payload {
  user_id: string;
  event_type: EventType;
  context?: {
    client_name?: string;
    amount_gbp?: string;
    ref_id?: string;
    property_address?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Payload;
    const { user_id, event_type, context = {} } = body;

    if (!user_id || !event_type) {
      return new Response(JSON.stringify({ error: 'user_id and event_type are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    let template;
    switch (event_type) {
      case 'quote_signed':
        template = transactionalTemplates.quote_signed(
          context.client_name || 'Your client',
          context.amount_gbp || '',
          context.ref_id || ''
        );
        break;
      case 'invoice_paid':
        template = transactionalTemplates.invoice_paid(
          context.client_name || 'Your client',
          context.amount_gbp || '',
          context.ref_id || ''
        );
        break;
      case 'cert_c1_detected':
        template = transactionalTemplates.cert_c1_detected(
          context.property_address || 'site',
          context.ref_id || ''
        );
        break;
      default:
        return new Response(JSON.stringify({ error: `Unknown event_type: ${event_type}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Transactional pushes BYPASS the daily cap — they're earned events the
    // user wants to know about instantly. Dedupe key uses ref_id so we don't
    // double-fire if a trigger runs twice on the same row.
    const result = await sendSmartPush(
      supabase as unknown as Parameters<typeof sendSmartPush>[0],
      SUPABASE_URL,
      `Bearer ${SERVICE_ROLE_KEY}`,
      {
        userId: user_id,
        tier: 'transactional',
        category: event_type,
        template,
        refId: context.ref_id,
        bypassCap: true,
      }
    );

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[trigger-transactional-push] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
