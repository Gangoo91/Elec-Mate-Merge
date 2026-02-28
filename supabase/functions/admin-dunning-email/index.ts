/**
 * Admin Dunning Email — Manual email sends + resolve
 *
 * Actions:
 *   send_next  — Send next dunning email for a record, bypassing timing gates
 *   resolve    — Mark a record as resolved
 *
 * Auth: JWT → profiles.admin_role check
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

// ─── Email 1 — Immediate "Payment Issue" ─────────────────────────────────────

function generateEmail1Html(name: string, amount: string, hostedInvoiceUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Issue</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ ElecMate</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-weight: 700; font-size: 14px; padding: 8px 20px; border-radius: 20px; border: 1px solid #fecaca;">Payment Issue</span>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong style="color: #1f2937;">${name}</strong>,
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                We tried to process your subscription payment of <strong>${amount}</strong>, but it didn't go through. This can happen if your card has expired or there were insufficient funds.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef2f2; border-radius: 12px; border: 2px solid #fecaca; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #991b1b;">Amount due:</td>
                        <td style="text-align: right; font-size: 16px; color: #991b1b; font-weight: 700;">${amount}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 14px; color: #991b1b;">Status:</td>
                        <td style="text-align: right; padding-top: 8px; font-size: 14px; color: #dc2626; font-weight: 700;">Payment failed</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                To keep your subscription active, please update your payment details:
              </p>
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
                If you have any questions, just reply to this email — we're here to help!
              </p>
            </td>
          </tr>
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

// ─── Email 2 — 3-day "Payment Overdue" ───────────────────────────────────────

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
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ ElecMate</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 24px;">
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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fffbeb; border-radius: 12px; border: 2px solid #fde68a; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">Amount due</p>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #d97706;">${amount}</p>
                  </td>
                </tr>
              </table>
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

// ─── Email 3 — 7-day "Final Notice" ──────────────────────────────────────────

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
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 28px; font-weight: 700;">⚡ ElecMate</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 24px;">
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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef2f2; border-radius: 12px; border: 2px solid #fecaca; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #991b1b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Final Amount Due</p>
                    <p style="margin: 0 0 8px; font-size: 36px; font-weight: 700; color: #dc2626;">${amount}</p>
                    <p style="margin: 0; font-size: 13px; color: #991b1b;">Access will be suspended if not paid</p>
                  </td>
                </tr>
              </table>
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

// ─── Email subjects ──────────────────────────────────────────────────────────

const EMAIL_SUBJECTS: Record<number, string> = {
  1: "Your ElecMate payment didn't go through",
  2: 'Reminder: Your ElecMate subscription payment is overdue',
  3: 'Final notice: Your ElecMate access will end soon',
};

const EMAIL_GENERATORS: Record<number, (name: string, amount: string, url: string) => string> = {
  1: generateEmail1Html,
  2: generateEmail2Html,
  3: generateEmail3Html,
};

// ─── Main handler ────────────────────────────────────────────────────────────

serve(async (req: Request) => {
  const requestId = req.headers.get('x-request-id') || generateRequestId();
  const logger = createLogger(requestId, { function: 'admin-dunning-email' });

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

    // ── Verify admin auth ──────────────────────────────────────────────────
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create an anon client to verify the user's JWT
    const supabaseAnon = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') as string, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabaseAnon.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check admin role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: adminProfile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (!adminProfile?.admin_role) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Parse body ─────────────────────────────────────────────────────────
    const body = await req.json();
    const { action, recordId } = body as { action: string; recordId: string };

    if (!action || !recordId) {
      return new Response(JSON.stringify({ error: 'Missing action or recordId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Action: resolve ────────────────────────────────────────────────────
    if (action === 'resolve') {
      const { data: updated, error: resolveError } = await supabase
        .from('failed_payment_emails')
        .update({ resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', recordId)
        .select()
        .single();

      if (resolveError) {
        logger.error('Failed to resolve record', { recordId, error: resolveError.message });
        return new Response(
          JSON.stringify({ error: 'Failed to resolve', details: resolveError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      logger.info('Record resolved by admin', { recordId, adminUserId: user.id });

      return new Response(JSON.stringify({ success: true, record: updated }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
      });
    }

    // ── Action: send_next ──────────────────────────────────────────────────
    if (action === 'send_next') {
      // Fetch current record
      const { data: record, error: fetchError } = await supabase
        .from('failed_payment_emails')
        .select('*')
        .eq('id', recordId)
        .single();

      if (fetchError || !record) {
        return new Response(JSON.stringify({ error: 'Record not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (record.resolved) {
        return new Response(JSON.stringify({ error: 'Record is already resolved' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (record.emails_sent >= 3) {
        return new Response(JSON.stringify({ error: 'All 3 emails already sent' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const nextEmailNumber = (record.emails_sent as number) + 1;

      // Optimistic lock: prevent race with cron job
      const { data: locked, error: lockError } = await supabase
        .from('failed_payment_emails')
        .update({ emails_sent: nextEmailNumber })
        .eq('id', recordId)
        .eq('emails_sent', record.emails_sent)
        .select()
        .single();

      if (lockError || !locked) {
        return new Response(
          JSON.stringify({ error: 'Record was modified concurrently — please refresh and retry' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get user email
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
        record.user_id
      );

      if (userError || !userData?.user?.email) {
        logger.error('Could not get user email', {
          userId: record.user_id,
          error: userError?.message,
        });
        // Roll back emails_sent
        await supabase
          .from('failed_payment_emails')
          .update({ emails_sent: record.emails_sent })
          .eq('id', recordId);

        return new Response(JSON.stringify({ error: 'Could not find user email' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get user name from profiles
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', record.user_id)
        .single();

      const userName =
        userProfile?.full_name ||
        userData.user.user_metadata?.full_name ||
        userData.user.user_metadata?.name ||
        userData.user.email!.split('@')[0];

      // Format amount
      const amountFormatted = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format((record.amount_due || 0) / 100);

      const payUrl = record.hosted_invoice_url || 'https://www.elec-mate.com/subscriptions';

      // Send email via Resend
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        // Roll back
        await supabase
          .from('failed_payment_emails')
          .update({ emails_sent: record.emails_sent })
          .eq('id', recordId);

        return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const resend = new Resend(resendApiKey);

      const htmlGenerator = EMAIL_GENERATORS[nextEmailNumber];
      const subject = EMAIL_SUBJECTS[nextEmailNumber];

      const { error: sendError } = await resend.emails.send({
        from: 'ElecMate <founder@elec-mate.com>',
        reply_to: 'support@elec-mate.com',
        to: [userData.user.email!],
        subject,
        html: htmlGenerator(userName, amountFormatted, payUrl),
      });

      if (sendError) {
        logger.error('Resend send failed', {
          recordId,
          emailNumber: nextEmailNumber,
          error: JSON.stringify(sendError),
        });
        // Roll back
        await supabase
          .from('failed_payment_emails')
          .update({ emails_sent: record.emails_sent })
          .eq('id', recordId);

        return new Response(JSON.stringify({ error: 'Failed to send email', details: sendError }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Set sent_at timestamp
      const timestampField = `email_${nextEmailNumber}_sent_at`;
      await supabase
        .from('failed_payment_emails')
        .update({ [timestampField]: new Date().toISOString() })
        .eq('id', recordId);

      // Re-fetch the fully updated record
      const { data: updatedRecord } = await supabase
        .from('failed_payment_emails')
        .select('*')
        .eq('id', recordId)
        .single();

      logger.info('Admin dunning email sent', {
        recordId,
        emailNumber: nextEmailNumber,
        adminUserId: user.id,
        recipientEmail: userData.user.email,
      });

      return new Response(
        JSON.stringify({ success: true, emailNumber: nextEmailNumber, record: updatedRecord }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'x-request-id': requestId,
          },
        }
      );
    }

    // ── Unknown action ─────────────────────────────────────────────────────
    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    logger.error('Admin dunning email error', { error: (error as Error).message });
    await captureException(error, {
      functionName: 'admin-dunning-email',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-request-id': requestId },
    });
  }
});
