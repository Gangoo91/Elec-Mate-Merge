/**
 * Create Invoice Payment Link
 * Generates a Stripe Checkout session for invoice payment
 * 1.1% platform fee goes to ElecMate
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Platform fee percentage (1.1%)
const PLATFORM_FEE_PERCENT = 1.1;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      throw new Error('Invoice ID is required');
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    console.log(`💳 Creating payment link for invoice: ${invoiceId}`);

    // Fetch invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .single();

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found');
    }

    if (!invoice.invoice_number) {
      throw new Error('This is not an invoice');
    }

    // Get electrician's Stripe account
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('stripe_account_id, stripe_account_status, company_name')
      .eq('user_id', user.id)
      .single();

    if (!profile?.stripe_account_id || profile.stripe_account_status !== 'active') {
      throw new Error('Stripe Connect account not active. Please complete onboarding first.');
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Parse client and job data
    const clientData = typeof invoice.client_data === 'string'
      ? JSON.parse(invoice.client_data)
      : invoice.client_data;

    const jobDetails = typeof invoice.job_details === 'string'
      ? JSON.parse(invoice.job_details)
      : invoice.job_details;

    // Calculate platform fee (1.1% in pence)
    const invoiceAmountPence = Math.round(invoice.total * 100);
    const platformFeePence = Math.round(invoice.total * PLATFORM_FEE_PERCENT);

    console.log(`💰 Invoice: £${invoice.total}, Platform fee: £${(platformFeePence / 100).toFixed(2)}`);

    // Create Stripe Checkout Session
    // IMPORTANT: Always use www.elec-mate.com (non-www has no SSL certificate)
    const appUrl = Deno.env.get('APP_URL') || 'https://www.elec-mate.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `Invoice ${invoice.invoice_number}`,
            description: jobDetails?.title || 'Electrical Work',
          },
          unit_amount: invoiceAmountPence,
        },
        quantity: 1,
      }],
      payment_intent_data: {
        application_fee_amount: platformFeePence, // 1.1% to ElecMate
        transfer_data: {
          destination: profile.stripe_account_id, // Rest to electrician
        },
        metadata: {
          invoice_id: invoiceId,
          invoice_number: invoice.invoice_number,
          electrician_user_id: user.id,
        },
      },
      customer_email: clientData?.email || undefined,
      success_url: `${appUrl}/payment-success?invoice=${invoiceId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/invoice/${invoiceId}?cancelled=true`,
      metadata: {
        invoice_id: invoiceId,
        invoice_number: invoice.invoice_number,
        electrician_user_id: user.id,
        client_name: clientData?.name || '',
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    // Save payment link to invoice
    await supabase
      .from('quotes')
      .update({
        stripe_payment_link_url: session.url,
        stripe_checkout_session_id: session.id,
      })
      .eq('id', invoiceId);

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
        invoiceNumber: invoice.invoice_number,
        amount: invoice.total,
        platformFee: platformFeePence / 100,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Error creating payment link:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
