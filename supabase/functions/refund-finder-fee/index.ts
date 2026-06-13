/**
 * refund-finder-fee  (E5c — guarantee-window refund. DORMANT until launch.)
 *
 * Refunds a paid finder's fee when a hire falls through inside the guarantee
 * window (hired_at + 14 days). This is the engine behind the "free replacement /
 * money back if they don't work out" guarantee.
 *
 * Guards (all server-side):
 *   • only the hiring employer can call it (ownership on employer_id),
 *   • only a 'paid' fee is refundable,
 *   • only inside the 14-day window from hired_at,
 *   • the refund is issued against the invoice's own payment — never a free-form amount.
 *
 * Sets fee_status='refunded'. Like charge-finder-fee, it is a no-op reporting
 * 'not_enabled' unless FINDER_FEE_ENABLED='true'.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const GUARANTEE_DAYS = 14;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (Deno.env.get('FINDER_FEE_ENABLED') !== 'true') {
      return json({ success: true, status: 'not_enabled' });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;

    const { hire_record_id, reason } = await req.json().catch(() => ({}));
    if (!hire_record_id) return json({ error: 'hire_record_id required' }, 400);

    const authHeader = req.headers.get('Authorization') ?? '';
    const caller = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await caller.auth.getUser();
    if (authError || !user) return json({ error: 'Not authenticated' }, 401);

    const admin = createClient(supabaseUrl, serviceKey);

    const { data: hire, error: hireErr } = await admin
      .from('elec_id_hire_records')
      .select('id, employer_id, fee_status, hired_at, stripe_invoice_id')
      .eq('id', hire_record_id)
      .single();
    if (hireErr || !hire) return json({ error: 'hire_record_not_found' }, 404);
    if (hire.employer_id !== user.id) return json({ error: 'not_authorised' }, 403);

    if (hire.fee_status !== 'paid') {
      return json({ success: false, status: `not_refundable_${hire.fee_status}` });
    }

    const windowEnd = new Date(hire.hired_at).getTime() + GUARANTEE_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() > windowEnd) {
      return json({
        success: false,
        status: 'outside_guarantee_window',
        guarantee_until: new Date(windowEnd).toISOString(),
      });
    }
    if (!hire.stripe_invoice_id) return json({ error: 'no_invoice_on_record' }, 409);

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    const invoice = await stripe.invoices.retrieve(hire.stripe_invoice_id, {
      expand: ['payment_intent'],
    });
    const pi = (invoice as Stripe.Invoice & { payment_intent?: string | Stripe.PaymentIntent })
      .payment_intent;
    const paymentIntentId = typeof pi === 'string' ? pi : pi?.id;
    if (!paymentIntentId) return json({ error: 'no_payment_to_refund' }, 409);

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: 'requested_by_customer',
      metadata: {
        kind: 'finder_fee_refund',
        hire_record_id: hire.id,
        employer_id: user.id,
        note: String(reason || '').slice(0, 200),
      },
    });

    await admin
      .from('elec_id_hire_records')
      .update({ fee_status: 'refunded', refunded_at: new Date().toISOString() })
      .eq('id', hire.id)
      .eq('fee_status', 'paid');

    return json({ success: true, status: 'refunded', refund_id: refund.id });
  } catch (error) {
    console.error('refund-finder-fee error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});
