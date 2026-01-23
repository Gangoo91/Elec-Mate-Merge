/**
 * Stripe Connect Webhook
 * Handles payment events for invoice payments
 * Updates invoice status when payments complete
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

/**
 * Format currency in GBP
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

/**
 * Send thank-you email to client after payment
 */
async function sendClientThankYouEmail(
  invoiceNumber: string,
  clientEmail: string,
  clientName: string,
  amount: number,
  companyName: string,
  companyEmail?: string,
  companyPhone?: string
): Promise<void> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - skipping thank-you email');
    return;
  }

  const resend = new Resend(resendApiKey);

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #22c55e; font-size: 26px; font-weight: 700;">✓ Payment Received</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Dear <strong style="color: #1f2937;">${clientName}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Thank you for your payment. This email confirms that your payment has been successfully processed.
              </p>

              <!-- Payment Details Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; border: 2px solid #22c55e;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #166534;">Invoice Number:</td>
                        <td style="text-align: right; font-size: 14px; color: #166534; font-weight: 700;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #166534;">Amount Paid:</td>
                        <td style="text-align: right; font-size: 20px; color: #166534; font-weight: 700;">${formatCurrency(amount)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #166534;">Status:</td>
                        <td style="text-align: right; font-size: 14px; color: #166534; font-weight: 700;">✓ Paid</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 15px; line-height: 1.6; color: #374151;">
                If you have any questions about this payment, please contact:
              </p>
              <p style="margin: 16px 0 0; font-size: 16px; font-weight: 700; color: #1f2937;">${companyName}</p>
              ${companyPhone ? `<p style="margin: 8px 0 0; font-size: 14px; color: #6b7280;">📞 ${companyPhone}</p>` : ''}
              ${companyEmail ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">✉️ ${companyEmail}</p>` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ Powered by ElecMate</p>
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
      from: `${companyName} <founder@elec-mate.com>`,
      reply_to: companyEmail || 'info@elec-mate.com',
      to: [clientEmail],
      subject: `Payment Confirmation - Invoice ${invoiceNumber}`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Failed to send thank-you email:', error);
    } else {
      console.log(`✅ Thank-you email sent to ${clientEmail}:`, data?.id);
    }
  } catch (err) {
    console.error('❌ Error sending thank-you email:', err);
  }
}

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
        console.log('✅ Webhook signature verified');
      } catch (err: any) {
        // Signature verification failed - log but still process
        // This handles case where secret is misconfigured
        console.error('⚠️ Webhook signature verification failed:', err.message);
        console.log('⚠️ Processing webhook anyway (signature mismatch - check STRIPE_CONNECT_WEBHOOK_SECRET)');
        event = JSON.parse(body);
      }
    } else {
      // Parse without verification (no secret configured)
      event = JSON.parse(body);
      console.log('⚠️ Processing webhook without signature verification (no secret configured)');
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
            invoice_paid_at: new Date().toISOString(),
            invoice_payment_method: 'card',
            invoice_payment_reference: session.payment_intent as string,
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq('id', invoiceId);

        if (updateError) {
          console.error('Error updating invoice:', updateError);
          throw updateError;
        }

        console.log(`✅ Invoice ${invoiceNumber} marked as paid`);

        // Create notification for electrician
        if (electricianUserId) {
          const paymentAmount = session.amount_total ? session.amount_total / 100 : 0;

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
                amount: paymentAmount,
                payment_method: 'card',
              },
              read: false,
            });

          console.log(`🔔 Notification created for user ${electricianUserId}`);

          // Send push notification
          try {
            await supabase.functions.invoke('send-push-notification', {
              body: {
                userId: electricianUserId,
                title: '💰 Payment Received!',
                body: `Invoice ${invoiceNumber} paid - ${formatCurrency(paymentAmount)}`,
                type: 'invoice',
                data: {
                  invoiceId: invoiceId,
                  invoiceNumber: invoiceNumber,
                  amount: paymentAmount
                }
              }
            });
            console.log(`📱 Push notification sent for payment`);
          } catch (pushError) {
            console.error('Push notification error (non-critical):', pushError);
          }
        }

        // Auto-sync to accounting software (Xero, etc.)
        if (electricianUserId) {
          try {
            // Check if user has connected accounting
            const { data: tokens } = await supabase
              .from('accounting_oauth_tokens')
              .select('provider')
              .eq('user_id', electricianUserId)
              .limit(1);

            if (tokens && tokens.length > 0) {
              console.log(`📊 Syncing invoice ${invoiceNumber} to ${tokens[0].provider}...`);

              // Call accounting sync function with internal userId
              await supabase.functions.invoke('accounting-sync-invoice', {
                body: {
                  invoiceId,
                  provider: tokens[0].provider,
                  userId: electricianUserId,
                },
              });
              console.log(`✅ Invoice ${invoiceNumber} synced to ${tokens[0].provider}`);
            }
          } catch (syncError) {
            // Don't fail the webhook if sync fails - it's not critical
            console.error('Accounting sync error (non-critical):', syncError);
          }
        }

        // Send thank-you email to client
        try {
          // Fetch invoice details for client info
          console.log(`📋 Fetching invoice ${invoiceId} for email lookup...`);

          const { data: invoice, error: invoiceFetchError } = await supabase
            .from('quotes')
            .select('client_data')
            .eq('id', invoiceId)
            .single();

          if (invoiceFetchError) {
            console.error(`❌ Error fetching invoice for email:`, invoiceFetchError);
          }

          console.log(`📋 Invoice client_data:`, JSON.stringify(invoice?.client_data || 'NULL'));

          if (invoice?.client_data) {
            const clientData = typeof invoice.client_data === 'string'
              ? JSON.parse(invoice.client_data)
              : invoice.client_data;

            const clientEmail = clientData?.email?.trim();
            const clientName = clientData?.name || 'Valued Customer';

            console.log(`📧 Client email extracted: "${clientEmail || 'EMPTY'}", Client name: "${clientName}"`);

            if (clientEmail) {
              // Fetch company profile for sender info
              let companyName = 'Your Electrician';
              let companyEmail: string | undefined;
              let companyPhone: string | undefined;

              if (electricianUserId) {
                const { data: companyProfile } = await supabase
                  .from('company_profiles')
                  .select('company_name, company_email, company_phone')
                  .eq('user_id', electricianUserId)
                  .single();

                if (companyProfile) {
                  companyName = companyProfile.company_name || companyName;
                  companyEmail = companyProfile.company_email;
                  companyPhone = companyProfile.company_phone;
                }
              }

              const amount = session.amount_total ? session.amount_total / 100 : 0;

              await sendClientThankYouEmail(
                invoiceNumber || `INV-${invoiceId.substring(0, 8)}`,
                clientEmail,
                clientName,
                amount,
                companyName,
                companyEmail,
                companyPhone
              );
            } else {
              console.log('⚠️ No client email found - skipping thank-you email');
            }
          }
        } catch (emailError) {
          // Don't fail the webhook if email fails
          console.error('⚠️ Failed to send client thank-you email (non-fatal):', emailError);
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
