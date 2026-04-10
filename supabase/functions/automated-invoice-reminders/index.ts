/**
 * Automated Invoice Reminder Emails
 * Sends escalating overdue reminders to clients:
 * - 1 day overdue: Gentle reminder
 * - 7 days overdue: Firm reminder
 * - 14 days overdue: Final notice
 *
 * Run via pg_cron daily or manually triggered
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface OverdueInvoice {
  id: string;
  invoice_number: string;
  client_data: any;
  total: number;
  invoice_due_date: string;
  invoice_status: string;
  user_id: string;
  reminder_count: number;
  last_reminder_sent_at: string | null;
}

serve(async (req: Request) => {
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
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find overdue invoices (quotes with invoice_number not null = converted to invoice)
    // Only include invoices that have been manually sent to the client first (not drafts)
    // This prevents sending "overdue" reminders before the client has even received the invoice
    const { data: overdueInvoices, error: queryError } = await supabase
      .from('quotes')
      .select(
        'id, invoice_number, client_data, total, invoice_due_date, invoice_status, user_id, reminder_count, last_reminder_sent_at, invoice_sent_at'
      )
      .not('invoice_number', 'is', null)
      .not('invoice_status', 'eq', 'paid')
      .not('invoice_status', 'eq', 'cancelled')
      .not('invoice_status', 'eq', 'draft')
      .lt('invoice_due_date', today.toISOString())
      // Include if: already formally sent to client OR already flagged as overdue in the system
      // (overdue status means the system/user has already acknowledged it's past due)
      .or('invoice_sent_at.not.is.null,invoice_status.eq.overdue')
      .is('deleted_at', null);

    if (queryError) {
      console.error('Error fetching overdue invoices:', queryError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch invoices', details: queryError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!overdueInvoices || overdueInvoices.length === 0) {
      return new Response(JSON.stringify({ message: 'No overdue invoices found', processed: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let emailsSent = 0;
    let skipped = 0;
    const results: any[] = [];

    for (const invoice of overdueInvoices as OverdueInvoice[]) {
      // Parse client data
      const clientData =
        typeof invoice.client_data === 'string'
          ? JSON.parse(invoice.client_data)
          : invoice.client_data;

      const clientEmail = clientData?.email;
      const clientName = clientData?.name || 'Valued Customer';

      if (!clientEmail) {
        skipped++;
        results.push({ invoice: invoice.invoice_number, status: 'skipped', reason: 'no email' });
        continue;
      }

      // Calculate days overdue
      const dueDate = new Date(invoice.invoice_due_date);
      const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

      // Determine which reminder to send based on days overdue
      const reminderCount = invoice.reminder_count || 0;
      let reminderType: 'gentle' | 'firm' | 'final' | null = null;

      // Check if we should send a reminder
      // Only send if: new threshold reached AND haven't sent this level yet
      if (daysOverdue >= 14 && reminderCount < 3) {
        reminderType = 'final';
      } else if (daysOverdue >= 7 && reminderCount < 2) {
        reminderType = 'firm';
      } else if (daysOverdue >= 1 && reminderCount < 1) {
        reminderType = 'gentle';
      }

      if (!reminderType) {
        skipped++;
        results.push({
          invoice: invoice.invoice_number,
          status: 'skipped',
          reason: 'already reminded at this level',
        });
        continue;
      }

      // Check if we sent a reminder in the last 24 hours (rate limiting)
      if (invoice.last_reminder_sent_at) {
        const lastSent = new Date(invoice.last_reminder_sent_at);
        const hoursSinceLastReminder = (today.getTime() - lastSent.getTime()) / (1000 * 60 * 60);
        if (hoursSinceLastReminder < 24) {
          skipped++;
          results.push({
            invoice: invoice.invoice_number,
            status: 'skipped',
            reason: 'rate limited (24h)',
          });
          continue;
        }
      }

      // Get company profile for sender info
      let companyName = 'Your Electrician';
      let replyToEmail = 'info@elec-mate.com';

      const { data: company } = await supabase
        .from('company_profiles')
        .select('company_name, company_email, email')
        .eq('user_id', invoice.user_id)
        .single();

      if (company) {
        companyName = company.company_name || 'Your Electrician';
        replyToEmail = company.company_email || company.email || 'info@elec-mate.com';
      }

      // Generate email content
      const emailContent = generateReminderEmail(
        reminderType,
        clientName,
        invoice.invoice_number,
        invoice.total,
        daysOverdue,
        companyName
      );

      // Send email
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `${companyName} <founder@elec-mate.com>`,
            reply_to: replyToEmail,
            to: clientEmail,
            subject: emailContent.subject,
            html: emailContent.html,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to send reminder for ${invoice.invoice_number}:`, errorText);
          results.push({ invoice: invoice.invoice_number, status: 'failed', reason: errorText });
          continue;
        }

        // Update invoice with reminder tracking
        await supabase
          .from('quotes')
          .update({
            reminder_count: reminderCount + 1,
            last_reminder_sent_at: new Date().toISOString(),
            invoice_status: 'overdue',
          })
          .eq('id', invoice.id);

        emailsSent++;
        results.push({
          invoice: invoice.invoice_number,
          status: 'sent',
          type: reminderType,
          daysOverdue,
        });

        console.log(
          `${reminderType} reminder sent for ${invoice.invoice_number} to ${clientEmail}`
        );

        // Delay between sends to avoid Resend rate limits and stagger delivery
        await new Promise((r) => setTimeout(r, 10000));
      } catch (emailError: any) {
        console.error(`Error sending reminder for ${invoice.invoice_number}:`, emailError);
        results.push({
          invoice: invoice.invoice_number,
          status: 'error',
          reason: emailError.message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalOverdue: overdueInvoices.length,
        emailsSent,
        skipped,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Automated invoice reminders error:', error);
    await captureException(error, {
      functionName: 'automated-invoice-reminders',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateReminderEmail(
  type: 'gentle' | 'firm' | 'final',
  clientName: string,
  invoiceNumber: string,
  total: number,
  daysOverdue: number,
  companyName: string
): { subject: string; html: string } {
  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(total || 0);

  const configs = {
    gentle: {
      subject: `Friendly Reminder: Invoice ${invoiceNumber} is now due`,
      title: 'Payment Reminder',
      accentColor: '#FFD700',
      bannerBg: '',
      bannerBorder: '',
      bannerTextColor: '',
      message: `Just a friendly reminder that payment for invoice <strong>${invoiceNumber}</strong> was due <strong>${daysOverdue} day${daysOverdue === 1 ? '' : 's'} ago</strong>.`,
      cta: "If you've already made the payment, please disregard this message. Otherwise, we'd appreciate if you could arrange payment at your earliest convenience.",
      urgency: '',
    },
    firm: {
      subject: `Second Notice: Invoice ${invoiceNumber} - ${daysOverdue} days overdue`,
      title: 'Payment Overdue',
      accentColor: '#d97706',
      bannerBg: '#fffbeb',
      bannerBorder: '#fde68a',
      bannerTextColor: '#92400e',
      message: `This is a follow-up regarding invoice <strong>${invoiceNumber}</strong>, which is now <strong>${daysOverdue} days overdue</strong>.`,
      cta: "Please arrange payment within the next 7 days. If you're experiencing any issues, please contact us immediately to discuss payment arrangements.",
      urgency: 'This matter requires your prompt attention.',
    },
    final: {
      subject: `Final Notice: Invoice ${invoiceNumber} - Immediate action required`,
      title: 'Final Payment Notice',
      accentColor: '#dc2626',
      bannerBg: '#fef2f2',
      bannerBorder: '#fecaca',
      bannerTextColor: '#991b1b',
      message: `Despite previous reminders, invoice <strong>${invoiceNumber}</strong> remains unpaid and is now <strong>${daysOverdue} days overdue</strong>.`,
      cta: "To avoid further action, please ensure payment is made within <strong>48 hours</strong>. If you're experiencing financial difficulties, please contact us immediately.",
      urgency: 'This is a final notice before we consider further recovery action.',
    },
  };

  const config = configs[type];

  // Urgency banner for firm/final
  let urgencyBanner = '';
  if (type === 'firm' || type === 'final') {
    urgencyBanner = `
      <tr>
        <td style="padding: 0 32px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background-color: ${config.bannerBg}; border: 1px solid ${config.bannerBorder}; border-radius: 8px; border-left: 4px solid ${config.accentColor};">
            <tr>
              <td style="padding: 16px 20px;">
                <p style="margin: 0; font-size: 14px; color: ${config.bannerTextColor}; font-weight: 600;">
                  ${type === 'final' ? 'Final Notice' : 'Second Notice'} — ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue
                </p>
                ${config.urgency ? `<p style="margin: 6px 0 0; font-size: 14px; color: ${config.bannerTextColor};">${config.urgency}</p>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f6f6f6;">
    <tr>
      <td style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
          style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td style="background-color: #111111; padding: 24px 32px;">
              <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">${companyName}</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #1a1a1a;">Hi <strong>${clientName}</strong>,</p>
              <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">${config.message}</p>
              <p style="margin: 16px 0 0; font-size: 15px; color: #4b5563; line-height: 1.6;">${config.cta}</p>
            </td>
          </tr>

          <!-- Urgency banner -->
          ${urgencyBanner}

          <!-- Amount card -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 10px;">
                <tr>
                  <td style="padding: 28px; text-align: center;">
                    <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8px;">Invoice Reference</p>
                    <p style="margin: 0 0 20px; font-size: 16px; font-weight: 600; color: #1a1a1a;">${invoiceNumber}</p>
                    <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8px;">Amount Due</p>
                    <p style="margin: 0 0 12px; font-size: 40px; font-weight: 700; color: #1a1a1a; line-height: 1.1;">${formattedTotal}</p>
                    <p style="margin: 0; font-size: 13px; font-weight: 600; color: ${config.accentColor};">${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact prompt -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0; font-size: 14px; color: #4b5563;"><strong style="color: #1a1a1a;">Questions?</strong> Just reply to this email — we're here to help.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
                Kind regards,<br><strong style="color: #1a1a1a;">${companyName}</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top: 1px solid #e5e7eb; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">Sent via Elec-Mate</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject: config.subject, html };
}
