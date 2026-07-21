/**
 * Create Invoice Payment Link
 * Generates a Stripe Checkout session for invoice payment
 * 1% platform fee goes to ElecMate
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Platform fee percentage (1%)
const PLATFORM_FEE_PERCENT = 1;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      throw new Error('Invoice ID is required');
    }

    // Authenticate.
    //
    // ELE-954 — also accept service-role bearer for internal edge-fn calls
    // (e.g. quote-action creating a deposit invoice on accept). When the
    // caller authenticates with the service role key, we trust them and
    // resolve the invoice owner from the row itself.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }
    const bearerToken = authHeader.replace(/^Bearer\s+/i, '');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const isServiceRoleCaller = bearerToken === serviceRoleKey;

    // Service-role client for cross-table reads (always available; needed to
    // look up the new `invoices` table even on user-auth calls).
    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL')!, serviceRoleKey);

    let userId: string;
    if (isServiceRoleCaller) {
      // Internal call — owner resolved from invoice row below.
      userId = '';
    } else {
      const supabaseUser = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const {
        data: { user },
        error: authError,
      } = await supabaseUser.auth.getUser();
      if (authError || !user) {
        throw new Error('Unauthorized');
      }
      userId = user.id;
    }

    console.log(`💳 Creating payment link for invoice: ${invoiceId}`);

    // ELE-954 — Try the new `invoices` table first (where deposit invoices
    // live). Fall back to legacy `quotes` table for older invoices that
    // haven't been migrated.
    // The invoices table uses snake_case columns (client_data, job_details).
    // The previous select referenced legacy camelCase (client, jobDetails)
    // which doesn't exist on this table — every fetch was 400'ing and
    // the function silently fell through to the legacy quotes-table path.
    let invoice: any = null;
    {
      let query = supabaseAdmin
        .from('invoices')
        .select(
          'id, user_id, invoice_number, total, total_paid, partial_payments, client_data, job_details, parent_quote_id, deposit_for_quote'
        )
        .eq('id', invoiceId);
      if (!isServiceRoleCaller) query = query.eq('user_id', userId);
      const { data } = await query.maybeSingle();
      if (data) {
        invoice = data;
      }
    }
    if (!invoice) {
      let query = supabaseAdmin.from('quotes').select('*').eq('id', invoiceId);
      if (!isServiceRoleCaller) query = query.eq('user_id', userId);
      const { data, error: invoiceError } = await query.single();
      if (invoiceError || !data) {
        throw new Error('Invoice not found');
      }
      invoice = data;
    }

    if (!invoice.invoice_number) {
      throw new Error('This is not an invoice');
    }

    // Lock onto the resolved owner now that we have the row
    const ownerId = (invoice.user_id as string) || userId;

    // Get electrician's Stripe account (use admin client — works for both
    // user-auth and service-role callers)
    const { data: profile } = await supabaseAdmin
      .from('company_profiles')
      .select('stripe_account_id, stripe_account_status, company_name')
      .eq('user_id', ownerId)
      .single();

    if (!profile?.stripe_account_id || profile.stripe_account_status !== 'active') {
      // Expected user state, not a server error — return 400 so the client can
      // toast without bubbling through captureException. Sentry: REACT-AC.
      return new Response(
        JSON.stringify({
          error: 'stripe_not_connected',
          message: 'Stripe Connect account not active. Please complete onboarding first.',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Parse client and job data
    const clientData =
      typeof invoice.client_data === 'string'
        ? JSON.parse(invoice.client_data)
        : invoice.client_data;

    const jobDetails =
      typeof invoice.job_details === 'string'
        ? JSON.parse(invoice.job_details)
        : invoice.job_details;

    // Charge the OUTSTANDING BALANCE, not the invoice total. Recorded
    // partial payments (quotes.total_paid / partial_payments jsonb) reduce
    // what the customer owes — a checkout minted at the full total after a
    // part-payment would double-charge them (Alex, 2026-07-20). Rows from
    // the `invoices` table (deposits) have neither column, so paidSoFar is 0
    // there and behaviour is unchanged.
    const paidSoFar = Math.max(
      Number(invoice.total_paid) || 0,
      Array.isArray(invoice.partial_payments)
        ? invoice.partial_payments.reduce(
            (sum: number, p: any) => sum + (Number(p?.amount) || 0),
            0
          )
        : 0
    );
    const chargeableTotal = Math.max(0, Number(invoice.total) - paidSoFar);
    if (chargeableTotal <= 0) {
      throw new Error('Invoice is already fully paid — no balance left to charge');
    }

    // Calculate platform fee (1% in pence)
    const invoiceAmountPence = Math.round(chargeableTotal * 100);
    const platformFeePence = Math.round(chargeableTotal * PLATFORM_FEE_PERCENT);

    console.log(
      `💰 Invoice: £${invoice.total}, charging balance: £${chargeableTotal}, Platform fee: £${(platformFeePence / 100).toFixed(2)}`
    );

    // Create Stripe Checkout Session
    // HARDCODED: Always use www.elec-mate.com (non-www has no SSL certificate)
    const appUrl = 'https://www.elec-mate.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: paidSoFar > 0
                ? `Invoice ${invoice.invoice_number} — remaining balance`
                : `Invoice ${invoice.invoice_number}`,
              description: jobDetails?.title || 'Electrical Work',
            },
            unit_amount: invoiceAmountPence,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: platformFeePence, // 1% to ElecMate
        transfer_data: {
          destination: profile.stripe_account_id, // Rest to electrician
        },
        metadata: {
          invoice_id: invoiceId,
          invoice_number: invoice.invoice_number,
          electrician_user_id: ownerId,
        },
      },
      customer_email: clientData?.email || undefined,
      // ELE-955 — for deposit invoices, hop to the existing PublicBooking
      // page after pay so the client can finish booking. We pass the
      // electrician's user_id and the quote_id so PublicBooking pre-fills
      // from the quote and links the booking back. For regular invoices,
      // fall back to the generic success page.
      success_url:
        invoice.deposit_for_quote && invoice.parent_quote_id && invoice.user_id
          ? `${appUrl}/book/${invoice.user_id}?quote=${invoice.parent_quote_id}`
          : `${appUrl}/invoice-payment-success?invoice=${invoiceId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/invoice/${invoiceId}?cancelled=true`,
      metadata: {
        invoice_id: invoiceId,
        invoice_number: invoice.invoice_number,
        electrician_user_id: ownerId,
        client_name: clientData?.name || '',
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    // Save payment link to whichever table the invoice lives in. Try the new
    // `invoices` table first; if no row matches, fall back to legacy quotes.
    const { count: invoicesUpdated } = await supabaseAdmin
      .from('invoices')
      .update({
        stripe_payment_link_url: session.url,
        stripe_checkout_session_id: session.id,
      })
      .eq('id', invoiceId)
      .select('id', { count: 'exact', head: true });

    if (!invoicesUpdated) {
      await supabaseAdmin
        .from('quotes')
        .update({
          stripe_payment_link_url: session.url,
          stripe_checkout_session_id: session.id,
        })
        .eq('id', invoiceId);
    }

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
        invoiceNumber: invoice.invoice_number,
        amount: chargeableTotal,
        platformFee: platformFeePence / 100,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('❌ Error creating payment link:', error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'create-invoice-payment-link',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
