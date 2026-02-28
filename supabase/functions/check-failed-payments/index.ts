/**
 * Check Failed Payments — Dunning Email Sequence (Emails 2 & 3)
 * Runs daily at 10am UTC via pg_cron
 *
 * Email 2: Sent 3+ days after payment failure (amber "Payment Overdue")
 * Email 3: Sent 7+ days after payment failure (red "Final Notice")
 *
 * Stops when invoice is paid (resolved = true) or subscription is cancelled.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from 'npm:resend@2.0.0';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface FailedPaymentRow {
  id: string;
  user_id: string;
  stripe_invoice_id: string;
  stripe_customer_id: string;
  amount_due: number;
  hosted_invoice_url: string | null;
  emails_sent: number;
  created_at: string;
}

/**
 * Generate Email 2 — 3-day "Payment Overdue" reminder
 */
function generateEmail2Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Overdue</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ ElecMate</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <!-- Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #fffbeb; color: #d97706; font-weight: 700; font-size: 14px; padding: 8px 20px; border-radius: 20px; border: 1px solid #fde68a;">Payment Overdue</span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong style="color: #1f2937;">${name}</strong>,
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                We wanted to follow up on the payment issue we contacted you about a few days ago. Your subscription payment of <strong>${amount}</strong> is still outstanding.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                Your access to ElecMate tools is still active for now, but we need your payment details updated to keep things running smoothly.
              </p>

              <!-- Amount Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fffbeb; border-radius: 12px; border: 2px solid #fde68a; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">Amount due</p>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #d97706;">${amount}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 8px 0;">
                    <a href="${hostedInvoiceUrl}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">Pay Now</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding: 8px 0;">
                    <a href="https://www.elec-mate.com/subscriptions" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px;">Manage Subscription</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                Need help? Just reply to this email and we'll sort it out.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ ElecMate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical tools</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generate Email 3 — 7-day "Final Notice"
 */
function generateEmail3Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Final Notice</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ ElecMate</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <!-- Badge -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-weight: 700; font-size: 14px; padding: 8px 20px; border-radius: 20px; border: 1px solid #fecaca;">Final Notice</span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong style="color: #1f2937;">${name}</strong>,
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                This is a final reminder about your overdue subscription payment. We haven't been able to process <strong>${amount}</strong> and your ElecMate access will be suspended soon if payment isn't received.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                You'll lose access to all your certificates, AI tools, quotes, invoices, and study materials. Please update your payment details now to avoid any disruption.
              </p>

              <!-- Amount Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef2f2; border-radius: 12px; border: 2px solid #fecaca; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #991b1b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Final Amount Due</p>
                    <p style="margin: 0 0 8px; font-size: 36px; font-weight: 700; color: #dc2626;">${amount}</p>
                    <p style="margin: 0; font-size: 13px; color: #991b1b;">Access will be suspended if not paid</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 8px 0;">
                    <a href="${hostedInvoiceUrl}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; font-weight: 700; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px;">Pay Now to Keep Access</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding: 8px 0;">
                    <a href="https://www.elec-mate.com/subscriptions" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px;">Manage Subscription</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                If you're having any issues, please reply to this email — we want to help you keep your account.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); padding: 28px 24px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 700; color: #FFD700;">⚡ ElecMate</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Professional electrical tools</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

serve(async (req: Request) => {
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'check-failed-payments' });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      logger.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);

    // Fetch unresolved rows that still need emails (< 3 sent)
    const { data: rows, error: queryError } = await supabase
      .from('failed_payment_emails')
      .select(
        'id, user_id, stripe_invoice_id, stripe_customer_id, amount_due, hosted_invoice_url, emails_sent, created_at'
      )
      .eq('resolved', false)
      .lt('emails_sent', 3)
      .order('created_at', { ascending: true });

    if (queryError) {
      logger.error('Failed to query failed_payment_emails', { error: queryError.message });
      return new Response(JSON.stringify({ error: 'Query failed', details: queryError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!rows || rows.length === 0) {
      logger.info('No unresolved failed payments needing follow-up');
      return new Response(
        JSON.stringify({ message: 'No failed payments to process', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    logger.info('Processing failed payment rows', { count: rows.length });

    let emailsSent = 0;
    let skipped = 0;
    const results: Array<{ id: string; status: string; emailNumber?: number; reason?: string }> =
      [];

    for (const row of rows as FailedPaymentRow[]) {
      const now = new Date();
      const createdAt = new Date(row.created_at);
      const daysSinceFailure = Math.floor(
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Determine which email to send
      let emailNumber: 2 | 3 | null = null;

      if (row.emails_sent < 3 && daysSinceFailure >= 7) {
        emailNumber = 3;
      } else if (row.emails_sent < 2 && daysSinceFailure >= 3) {
        emailNumber = 2;
      }

      if (!emailNumber) {
        skipped++;
        results.push({ id: row.id, status: 'skipped', reason: 'not yet due' });
        continue;
      }

      // Get user email
      let userEmail: string | null = null;
      let userName = 'there';

      try {
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
          row.user_id
        );

        if (userError || !userData?.user?.email) {
          logger.warn('Could not get user email', {
            userId: row.user_id,
            error: userError?.message,
          });
          skipped++;
          results.push({ id: row.id, status: 'skipped', reason: 'no user email' });
          continue;
        }

        userEmail = userData.user.email;
        userName =
          userData.user.user_metadata?.full_name ||
          userData.user.user_metadata?.name ||
          userEmail.split('@')[0];
      } catch (userErr: unknown) {
        logger.warn('Error fetching user', {
          userId: row.user_id,
          error: (userErr as Error)?.message,
        });
        skipped++;
        results.push({ id: row.id, status: 'skipped', reason: 'user fetch error' });
        continue;
      }

      // Format amount
      const amountFormatted = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format((row.amount_due || 0) / 100);

      const payUrl = row.hosted_invoice_url || 'https://www.elec-mate.com/subscriptions';

      // Generate and send email
      try {
        let subject: string;
        let html: string;

        if (emailNumber === 2) {
          subject = 'Reminder: Your ElecMate subscription payment is overdue';
          html = generateEmail2Html(userName, amountFormatted, payUrl);
        } else {
          subject = 'Final notice: Your ElecMate access will end soon';
          html = generateEmail3Html(userName, amountFormatted, payUrl);
        }

        const { error: sendError } = await resend.emails.send({
          from: 'ElecMate <founder@elec-mate.com>',
          reply_to: 'support@elec-mate.com',
          to: [userEmail],
          subject,
          html,
        });

        if (sendError) {
          logger.warn(`Failed to send Email ${emailNumber}`, {
            trackingId: row.id,
            error: JSON.stringify(sendError),
          });
          results.push({
            id: row.id,
            status: 'failed',
            emailNumber,
            reason: JSON.stringify(sendError),
          });
          continue;
        }

        // Update tracking row
        const updateData: Record<string, unknown> = {
          emails_sent: emailNumber,
        };
        if (emailNumber === 2) {
          updateData.email_2_sent_at = new Date().toISOString();
        } else {
          updateData.email_3_sent_at = new Date().toISOString();
        }

        await supabase.from('failed_payment_emails').update(updateData).eq('id', row.id);

        emailsSent++;
        results.push({ id: row.id, status: 'sent', emailNumber });

        logger.info(`Dunning Email ${emailNumber} sent`, {
          trackingId: row.id,
          email: userEmail,
          daysSinceFailure,
        });

        // 2-second delay between sends (Resend rate limiting)
        await new Promise((r) => setTimeout(r, 2000));
      } catch (emailErr: unknown) {
        logger.warn(`Error sending Email ${emailNumber} (non-fatal)`, {
          trackingId: row.id,
          error: (emailErr as Error)?.message,
        });
        results.push({
          id: row.id,
          status: 'error',
          emailNumber,
          reason: (emailErr as Error)?.message,
        });
      }
    }

    logger.info('Check failed payments completed', {
      total: rows.length,
      emailsSent,
      skipped,
    });

    return new Response(
      JSON.stringify({
        success: true,
        total: rows.length,
        emailsSent,
        skipped,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId } }
    );
  } catch (error: unknown) {
    logger.error('Check failed payments error', { error: (error as Error).message });
    await captureException(error, {
      functionName: 'check-failed-payments',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  }
});
