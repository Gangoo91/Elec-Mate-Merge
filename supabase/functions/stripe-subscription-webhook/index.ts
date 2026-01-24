/**
 * Stripe Subscription Webhook
 * Handles subscription lifecycle events
 * Updates user subscription status in real-time
 * Sends welcome emails to new subscribers
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { Resend } from "npm:resend@2.0.0";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature, x-request-id',
};

// Tier display names
const TIER_NAMES: Record<string, string> = {
  'apprentice': 'Apprentice',
  'apprentice_yearly': 'Apprentice (Annual)',
  'electrician': 'Electrician Pro',
  'electrician_yearly': 'Electrician Pro (Annual)',
  'desktop': 'Desktop',
  'desktop_yearly': 'Desktop (Annual)',
  'employer': 'Employer',
  'employer_yearly': 'Employer (Annual)',
  'college': 'College',
  'college_yearly': 'College (Annual)',
  'Founder': 'Founder',
};

/**
 * Send welcome email to new subscriber
 */
async function sendWelcomeEmail(
  email: string,
  name: string,
  tierName: string,
  isYearly: boolean
): Promise<void> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping welcome email');
    return;
  }

  const resend = new Resend(resendApiKey);

  const billingPeriod = isYearly ? 'year' : 'month';

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ElecMate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ Welcome to ElecMate!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong style="color: #1f2937;">${name}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for subscribing to ElecMate! Your <strong>${tierName}</strong> subscription is now active.
              </p>

              <!-- Subscription Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fef9c3 0%, #fde047 100%); border-radius: 12px; border: 2px solid #eab308;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #713f12;">Subscription:</td>
                        <td style="text-align: right; font-size: 16px; color: #713f12; font-weight: 700;">${tierName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #713f12;">Billing:</td>
                        <td style="text-align: right; font-size: 14px; color: #713f12; font-weight: 700;">Every ${billingPeriod}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #713f12;">Status:</td>
                        <td style="text-align: right; font-size: 14px; color: #166534; font-weight: 700;">✓ Active</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                You now have full access to:
              </p>
              <ul style="margin: 0 0 24px; padding-left: 20px; color: #374151;">
                <li style="margin-bottom: 8px;">EICR & EIC certificate generation</li>
                <li style="margin-bottom: 8px;">AI-powered tools & calculators</li>
                <li style="margin-bottom: 8px;">Quote & invoice management</li>
                <li style="margin-bottom: 8px;">Study centre materials</li>
                <li style="margin-bottom: 0;">And much more!</li>
              </ul>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 16px 0;">
                    <a href="https://www.elec-mate.com" style="display: inline-block; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #1a1a1a; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">Open ElecMate</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 16px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                If you have any questions, just reply to this email - we're here to help!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ ElecMate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical contracting tools</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ElecMate <founder@elec-mate.com>',
      reply_to: 'support@elec-mate.com',
      to: [email],
      subject: `Welcome to ElecMate - Your ${tierName} subscription is active! ⚡`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Failed to send welcome email:', error);
    } else {
      console.log(`✅ Welcome email sent to ${email}:`, data?.id);
    }
  } catch (err) {
    console.error('❌ Error sending welcome email:', err);
  }
}

// Map Stripe price IDs to subscription tiers
// CURRENT ACTIVE PRICES (as of Jan 2026)
const PRICE_TO_TIER: Record<string, string> = {
  // Apprentice - £4.99/month, £49.99/year
  'price_1SmUef2RKw5t5RAmRIMTWTqU': 'apprentice', // £4.99/month (current)
  'price_1SmUfK2RKw5t5RAml6bj1I77': 'apprentice_yearly', // £49.99/year (current)

  // Electrician Pro - £9.99/month, £99.99/year
  'price_1SqJVr2RKw5t5RAmaiTGelLN': 'electrician', // £9.99/month (current)
  'price_1SqJVs2RKw5t5RAmVeD2QVsb': 'electrician_yearly', // £99.99/year (current)

  // Employer - £29.99/month, £299.99/year
  'price_1SlyAT2RKw5t5RAmUmTRGimH': 'employer', // £29.99/month (current)
  'price_1SlyB82RKw5t5RAmN447YJUW': 'employer_yearly', // £299.99/year (current)

  // Founders Offer - £3.99/month (gets Employer access - full access to all areas)
  'price_1SPK8c2RKw5t5RAmRGJxXfjc': 'Employer', // £3.99/month founders offer (employer access)

  // Legacy prices (for existing subscribers)
  'price_1RhtdT2RKw5t5RAmv6b2xE6p': 'apprentice', // £6.99/month (legacy)
  'price_1Rhtgl2RKw5t5RAmkQVKVnKn': 'apprentice_yearly', // £69.99/year (legacy)
  'price_1RhteS2RKw5t5RAmzRbaTE8U': 'electrician', // £9.99/month (legacy)
  'price_1RhtiS2RKw5t5RAmha0s6PJA': 'electrician_yearly', // £99.99/year (legacy)
};

serve(async (req) => {
  // Generate request ID for tracing
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'stripe-subscription-webhook' });

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_SUBSCRIPTION_WEBHOOK_SECRET');

    if (!stripeKey) {
      logger.error('STRIPE_SECRET_KEY not configured');
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
        logger.info('Webhook signature verified');
      } catch (err: any) {
        logger.warn('Webhook signature verification failed, processing anyway', { error: err.message });
        event = JSON.parse(body);
      }
    } else {
      event = JSON.parse(body);
      logger.warn('Processing webhook without signature verification');
    }

    logger.info('Webhook event received', { eventType: event.type, eventId: event.id });

    // Initialize Supabase with service role key for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Helper: Find user by Stripe customer ID or email
    async function findUserByCustomer(customerId: string): Promise<string | null> {
      // First check if we have the stripe_customer_id stored
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile?.id) {
        return profile.id;
      }

      // Fallback: Look up customer email in Stripe, then find user
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted || !('email' in customer) || !customer.email) {
          return null;
        }

        // Use listUsers and filter - getUserByEmail doesn't exist in Supabase JS v2
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const authUser = usersData?.users?.find((u: any) => u.email === customer.email);
        return authUser?.id || null;
      } catch (err) {
        console.error('Error finding user by customer:', err);
        return null;
      }
    }

    // Helper: Update user subscription status
    async function updateSubscriptionStatus(
      userId: string,
      subscribed: boolean,
      customerId: string,
      tier: string | null,
      periodEnd: Date | null
    ) {
      const updateData: any = {
        subscribed,
        stripe_customer_id: customerId,
        subscription_tier: tier,
      };

      if (subscribed && periodEnd) {
        updateData.subscription_end = periodEnd.toISOString();
        if (!updateData.subscription_start) {
          updateData.subscription_start = new Date().toISOString();
        }
      }

      if (!subscribed) {
        updateData.subscription_end = new Date().toISOString();
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) {
        logger.error('Error updating subscription status', { userId, error: error.message });
        throw error;
      }

      logger.info('Subscription status updated', { userId, subscribed, tier });
    }

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        logger.info('Processing subscription event', {
          eventType: event.type,
          subscriptionId: subscription.id,
          status: subscription.status,
          customerId
        });

        const userId = await findUserByCustomer(customerId);
        if (!userId) {
          logger.warn('No user found for customer', { customerId });
          break;
        }

        // Determine if subscription is active
        const isActive = ['active', 'trialing'].includes(subscription.status);

        // Get the price/tier
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? (PRICE_TO_TIER[priceId] || 'unknown') : null;

        // Get period end
        const periodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null;

        await updateSubscriptionStatus(userId, isActive, customerId, tier, periodEnd);

        // Handle founder invite completion (mark as claimed)
        // Check if this is a founder subscription by looking at the price ID
        const isFounderSubscription = priceId === 'price_1SPK8c2RKw5t5RAmRGJxXfjc';
        if (event.type === 'customer.subscription.created' && isActive && isFounderSubscription) {
          try {
            // Get the checkout session to find founder invite ID
            const sessions = await stripe.checkout.sessions.list({
              subscription: subscription.id,
              limit: 1,
            });

            const session = sessions.data[0];
            const inviteId = session?.metadata?.invite_id;

            if (inviteId) {
              const { error: inviteError } = await supabase
                .from('founder_invites')
                .update({
                  status: 'claimed',
                  claimed_at: new Date().toISOString(),
                  user_id: userId,
                })
                .eq('id', inviteId);

              if (inviteError) {
                logger.error('Failed to mark founder invite as claimed', { inviteId, error: inviteError.message });
              } else {
                logger.info('Founder invite claimed', { inviteId });
              }
            }
          } catch (inviteErr: any) {
            logger.warn('Error processing founder invite (non-fatal)', { error: inviteErr?.message });
          }
        }

        // Send welcome email for NEW subscriptions only
        if (event.type === 'customer.subscription.created' && isActive && tier) {
          try {
            // Get user email and name
            const customer = await stripe.customers.retrieve(customerId);
            if (!customer.deleted && 'email' in customer && customer.email) {
              const tierName = TIER_NAMES[tier] || tier;
              const isYearly = tier.includes('yearly');
              const userName = customer.name || customer.email.split('@')[0];

              await sendWelcomeEmail(customer.email, userName, tierName, isYearly);

              // Also create in-app notification
              await supabase.from('notifications').insert({
                user_id: userId,
                type: 'subscription_welcome',
                title: 'Welcome to ElecMate!',
                message: `Your ${tierName} subscription is now active. Enjoy full access to all features!`,
                data: { tier, tierName },
                read: false,
              });
            }
          } catch (emailError: any) {
            logger.warn('Failed to send welcome email (non-fatal)', { error: emailError?.message });
          }
        }

        // Create notification for status changes
        if (event.type === 'customer.subscription.updated') {
          const previousStatus = (event.data.previous_attributes as any)?.status;
          if (previousStatus && previousStatus !== subscription.status) {
            await supabase.from('notifications').insert({
              user_id: userId,
              type: 'subscription_status',
              title: 'Subscription Updated',
              message: `Your subscription status changed from ${previousStatus} to ${subscription.status}.`,
              data: { status: subscription.status, tier },
              read: false,
            });
          }
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        logger.info('Subscription cancelled', { subscriptionId: subscription.id, customerId });

        const userId = await findUserByCustomer(customerId);
        if (!userId) {
          logger.warn('No user found for customer', { customerId });
          break;
        }

        await updateSubscriptionStatus(userId, false, customerId, null, null);

        // Notify user
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'subscription_cancelled',
          title: 'Subscription Ended',
          message: 'Your subscription has ended. Subscribe again to regain access to premium features.',
          data: {},
          read: false,
        });

        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;

        // Only handle subscription invoices
        if (!invoice.subscription) {
          logger.debug('Not a subscription invoice, skipping', { invoiceId: invoice.id });
          break;
        }

        const customerId = invoice.customer as string;
        logger.info('Subscription invoice paid', { invoiceId: invoice.id, customerId });

        const userId = await findUserByCustomer(customerId);
        if (!userId) {
          logger.warn('No user found for customer', { customerId });
          break;
        }

        // Ensure subscription is marked active
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
        const priceId = subscription.items.data[0]?.price?.id;
        const tier = priceId ? (PRICE_TO_TIER[priceId] || 'unknown') : null;
        const periodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null;

        await updateSubscriptionStatus(userId, true, customerId, tier, periodEnd);

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;

        // Only handle subscription invoices
        if (!invoice.subscription) {
          logger.debug('Not a subscription invoice, skipping', { invoiceId: invoice.id });
          break;
        }

        const customerId = invoice.customer as string;
        logger.warn('Subscription payment failed', { invoiceId: invoice.id, customerId });

        const userId = await findUserByCustomer(customerId);
        if (!userId) {
          logger.warn('No user found for customer', { customerId });
          break;
        }

        // Don't immediately revoke access - Stripe will retry
        // But notify the user
        await supabase.from('notifications').insert({
          user_id: userId,
          type: 'payment_failed',
          title: 'Payment Failed',
          message: 'Your subscription payment failed. Please update your payment method to avoid losing access.',
          data: {
            invoice_id: invoice.id,
            amount: invoice.amount_due / 100,
          },
          read: false,
        });

        break;
      }

      default:
        logger.debug('Unhandled event type', { eventType: event.type });
    }

    logger.info('Webhook processed successfully', { eventType: event.type });
    return new Response(
      JSON.stringify({ received: true, type: event.type }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId } }
    );

  } catch (error: any) {
    logger.error('Webhook error', { error: error.message });
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId } }
    );
  }
});
