/**
 * charge-finder-fee  (E5c — finder's fee billing. DORMANT until launch.)
 *
 * Raises the one-off £250 (net) finder's fee against the employer's existing
 * Stripe customer when they hire an Elec-ID candidate. Mirrors the
 * FE → edge fn → Stripe → DB pattern of manage-employer-seats.
 *
 *   • Amount is read STRICTLY from elec_id_hire_records.fee_amount (server-side,
 *     never the client) — the client only supplies the cosmetic display name.
 *   • VAT is applied as a Stripe tax rate IFF ELECMATE_VAT_RATE_ID is set
 *     (switched on at launch with VAT registration; £250 net → £300 gross).
 *   • Collection auto-detects: card on file → charge immediately;
 *     no card → send a payable hosted invoice (due in 7 days).
 *   • Idempotent: only a 'pending' record is ever invoiced; re-calls no-op.
 *
 * Master kill-switch: without FINDER_FEE_ENABLED='true' this is a no-op that
 * reports 'not_enabled' and leaves the fee 'pending' — the whole path stays
 * dormant pre-launch, exactly like manage-employer-seats.
 *
 * Settlement: stripe-subscription-webhook (invoice.paid / invoice.payment_failed,
 * keyed on metadata.kind === 'finder_fee') flips 'invoiced' → 'paid' / 'failed'.
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
    // Master kill-switch — billing intentionally dormant until launch.
    if (Deno.env.get('FINDER_FEE_ENABLED') !== 'true') {
      return json({ success: true, status: 'not_enabled' });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')!;
    const vatRateId = Deno.env.get('ELECMATE_VAT_RATE_ID') || null;

    const { hire_record_id, worker_name } = await req.json().catch(() => ({}));
    if (!hire_record_id) return json({ error: 'hire_record_id required' }, 400);

    // Authenticate the caller (the hiring employer)
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

    // Load the hire record — the AMOUNT and OWNERSHIP come from here, not the client
    const { data: hire, error: hireErr } = await admin
      .from('elec_id_hire_records')
      .select(
        'id, employer_id, worker_profile_id, job_type, fee_amount, fee_status, hired_at, stripe_invoice_id'
      )
      .eq('id', hire_record_id)
      .single();
    if (hireErr || !hire) return json({ error: 'hire_record_not_found' }, 404);
    if (hire.employer_id !== user.id) return json({ error: 'not_authorised' }, 403);

    // Idempotency — only a pending fee is ever invoiced (no double-charge)
    if (hire.fee_status !== 'pending') {
      return json({
        success: true,
        status: `already_${hire.fee_status}`,
        stripe_invoice_id: hire.stripe_invoice_id,
      });
    }

    // The employer must be a Stripe customer (established by their employer sub)
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id, subscription_tier')
      .eq('id', user.id)
      .single();
    if (!profile?.stripe_customer_id) {
      // Leave the fee 'pending' so it can be collected once billing is set up
      return json({ success: true, status: 'no_customer' });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Card on file? → charge immediately. Otherwise → send a payable invoice.
    const customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    const hasPaymentMethod =
      !customer.deleted &&
      !!(
        (customer as Stripe.Customer).invoice_settings?.default_payment_method ||
        (customer as Stripe.Customer).default_source
      );

    const netPence = Math.round(Number(hire.fee_amount) * 100);
    const guaranteeUntil = new Date(
      new Date(hire.hired_at).getTime() + GUARANTEE_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();
    const label = [worker_name, hire.job_type].filter(Boolean).join(' · ');
    const lineDescription = `Finder's fee${label ? ` — ${label}` : ''}`;

    const sharedMeta: Record<string, string> = {
      kind: 'finder_fee',
      hire_record_id: hire.id,
      employer_id: user.id,
      guarantee_until: guaranteeUntil,
    };

    // Create the invoice first and attach ONLY our item (exclude any other
    // pending invoice items the customer may have, so we never sweep them in).
    const invoice = await stripe.invoices.create({
      customer: profile.stripe_customer_id,
      collection_method: hasPaymentMethod ? 'charge_automatically' : 'send_invoice',
      ...(hasPaymentMethod ? {} : { days_until_due: 7 }),
      auto_advance: false,
      pending_invoice_items_behavior: 'exclude',
      description: "Elec-Mate — electrician finder's fee",
      metadata: sharedMeta,
    });

    await stripe.invoiceItems.create({
      customer: profile.stripe_customer_id,
      invoice: invoice.id,
      amount: netPence,
      currency: 'gbp',
      description: lineDescription,
      ...(vatRateId ? { tax_rates: [vatRateId] } : {}),
      metadata: sharedMeta,
    });

    await stripe.invoices.finalizeInvoice(invoice.id, { auto_advance: false });

    let collectionResult = 'invoiced';
    let hostedInvoiceUrl: string | null = null;

    if (hasPaymentMethod) {
      // Attempt the charge now; the webhook remains the source of truth for
      // the final paid/failed state, so we only record 'invoiced' below.
      try {
        const paid = await stripe.invoices.pay(invoice.id);
        collectionResult = paid.status === 'paid' ? 'charged' : 'invoiced';
      } catch (payErr) {
        console.error('charge-finder-fee: immediate charge failed (will dun):', payErr);
        collectionResult = 'charge_failed';
      }
    } else {
      const sent = await stripe.invoices.sendInvoice(invoice.id);
      hostedInvoiceUrl = sent.hosted_invoice_url ?? null;
      collectionResult = 'sent';
    }

    // Record the invoice link; the webhook flips to paid/failed on settlement.
    // The fee_status='pending' guard makes this safe against a double-invoice race.
    await admin
      .from('elec_id_hire_records')
      .update({
        fee_status: 'invoiced',
        stripe_invoice_id: invoice.id,
        invoiced_at: new Date().toISOString(),
      })
      .eq('id', hire.id)
      .eq('fee_status', 'pending');

    return json({
      success: true,
      status: collectionResult,
      stripe_invoice_id: invoice.id,
      hosted_invoice_url: hostedInvoiceUrl,
      collection: hasPaymentMethod ? 'charge_automatically' : 'send_invoice',
    });
  } catch (error) {
    console.error('charge-finder-fee error:', error);
    return json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});
