/**
 * Stripe Connect Webhook
 * Handles payment events for invoice payments
 * Updates invoice status when payments complete
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_CONNECT_WEBHOOK_SECRET');

    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Parse without verification (for testing)
      event = JSON.parse(body);
      console.log('⚠️ Processing webhook without signature verification');
    }

    console.log(`📥 Webhook event received: ${event.type}`);

    // Initialize Supabase with service role key for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log(`💳 Checkout session completed: ${session.id}`);
        console.log(`📋 Metadata:`, session.metadata);

        const invoiceId = session.metadata?.invoice_id;
        const invoiceNumber = session.metadata?.invoice_number;
        const electricianUserId = session.metadata?.electrician_user_id;

        if (!invoiceId) {
          console.log('No invoice_id in metadata, skipping');
          break;
        }

        // Update invoice status to paid
        const { error: updateError } = await supabase
          .from('quotes')
          .update({
            invoice_status: 'paid',
            stripe_payment_intent_id: session.payment_intent as string,
            paid_at: new Date().toISOString(),
          })
          .eq('id', invoiceId);

        if (updateError) {
          console.error('Error updating invoice:', updateError);
          throw updateError;
        }

        console.log(`✅ Invoice ${invoiceNumber} marked as paid`);

        // Create notification for electrician
        if (electricianUserId) {
          await supabase
            .from('notifications')
            .insert({
              user_id: electricianUserId,
              type: 'payment_received',
              title: 'Payment Received',
              message: `Invoice ${invoiceNumber} has been paid via card payment.`,
              data: {
                invoice_id: invoiceId,
                invoice_number: invoiceNumber,
                amount: session.amount_total ? session.amount_total / 100 : null,
                payment_method: 'card',
              },
              read: false,
            });

          console.log(`🔔 Notification created for user ${electricianUserId}`);
        }

        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const invoiceId = session.metadata?.invoice_id;

        if (invoiceId) {
          // Clear the expired payment link
          await supabase
            .from('quotes')
            .update({
              stripe_payment_link_url: null,
              stripe_checkout_session_id: null,
            })
            .eq('id', invoiceId);

          console.log(`🕐 Expired checkout session cleared for invoice ${invoiceId}`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const invoiceId = paymentIntent.metadata?.invoice_id;

        if (invoiceId) {
          console.log(`❌ Payment failed for invoice ${invoiceId}`);

          // Optionally notify electrician of failed payment
          const electricianUserId = paymentIntent.metadata?.electrician_user_id;
          if (electricianUserId) {
            await supabase
              .from('notifications')
              .insert({
                user_id: electricianUserId,
                type: 'payment_failed',
                title: 'Payment Failed',
                message: `A card payment attempt for invoice ${paymentIntent.metadata?.invoice_number} failed.`,
                data: {
                  invoice_id: invoiceId,
                  invoice_number: paymentIntent.metadata?.invoice_number,
                  error: paymentIntent.last_payment_error?.message || 'Unknown error',
                },
                read: false,
              });
          }
        }
        break;
      }

      case 'account.updated': {
        // Handle connected account status changes
        const account = event.data.object as Stripe.Account;

        console.log(`🏦 Account updated: ${account.id}`);

        let status = 'pending';
        if (account.charges_enabled && account.payouts_enabled) {
          status = 'active';
        } else if (account.requirements?.disabled_reason) {
          status = 'restricted';
        }

        // Update the electrician's profile
        const { error: profileError } = await supabase
          .from('company_profiles')
          .update({ stripe_account_status: status })
          .eq('stripe_account_id', account.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
        } else {
          console.log(`✅ Updated account ${account.id} status to ${status}`);
        }
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true, type: event.type }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
