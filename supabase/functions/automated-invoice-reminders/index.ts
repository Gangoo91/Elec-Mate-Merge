/**
 * Automated Invoice Reminder Emails
 * Sends escalating overdue reminders to clients:
 * - 1 day overdue: Gentle reminder
 * - 7 days overdue: Firm reminder
 * - 14 days overdue: Final notice
 *
 * Run via pg_cron daily or manually triggered
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find overdue invoices (quotes with invoice_number not null = converted to invoice)
    // Only include invoices that have been manually sent to the client first (not drafts)
    // This prevents sending "overdue" reminders before the client has even received the invoice
    const { data: overdueInvoices, error: queryError } = await supabase
      .from('quotes')
      .select('id, invoice_number, client_data, total, invoice_due_date, invoice_status, user_id, reminder_count, last_reminder_sent_at, invoice_sent_at')
      .not('invoice_number', 'is', null)
      .not('invoice_status', 'eq', 'paid')
      .not('invoice_status', 'eq', 'cancelled')
      .not('invoice_status', 'eq', 'draft')
      .not('invoice_sent_at', 'is', null)  // Must have been sent to client first
      .lt('invoice_due_date', today.toISOString());

    if (queryError) {
      console.error('Error fetching overdue invoices:', queryError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch invoices', details: queryError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!overdueInvoices || overdueInvoices.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No overdue invoices found', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let emailsSent = 0;
    let skipped = 0;
    const results: any[] = [];

    for (const invoice of overdueInvoices as OverdueInvoice[]) {
      // Parse client data
      const clientData = typeof invoice.client_data === 'string'
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
        results.push({ invoice: invoice.invoice_number, status: 'skipped', reason: 'already reminded at this level' });
        continue;
      }

      // Check if we sent a reminder in the last 24 hours (rate limiting)
      if (invoice.last_reminder_sent_at) {
        const lastSent = new Date(invoice.last_reminder_sent_at);
        const hoursSinceLastReminder = (today.getTime() - lastSent.getTime()) / (1000 * 60 * 60);
        if (hoursSinceLastReminder < 24) {
          skipped++;
          results.push({ invoice: invoice.invoice_number, status: 'skipped', reason: 'rate limited (24h)' });
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
            'Authorization': `Bearer ${resendApiKey}`,
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
            invoice_status: 'overdue'
          })
          .eq('id', invoice.id);

        emailsSent++;
        results.push({ invoice: invoice.invoice_number, status: 'sent', type: reminderType, daysOverdue });

        console.log(`✅ ${reminderType} reminder sent for ${invoice.invoice_number} to ${clientEmail}`);

      } catch (emailError: any) {
        console.error(`Error sending reminder for ${invoice.invoice_number}:`, emailError);
        results.push({ invoice: invoice.invoice_number, status: 'error', reason: emailError.message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalOverdue: overdueInvoices.length,
        emailsSent,
        skipped,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Automated invoice reminders error:', error);
    await captureException(error, { functionName: 'automated-invoice-reminders', requestUrl: req.url, requestMethod: req.method });
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
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
    currency: 'GBP'
  }).format(total || 0);

  const configs = {
    gentle: {
      emoji: '📋',
      subject: `Friendly Reminder: Invoice ${invoiceNumber} is now due`,
      title: 'Payment Reminder',
      titleColor: '#3b82f6',
      borderColor: 'rgba(59, 130, 246, 0.2)',
      bgGradient: 'rgba(59, 130, 246, 0.1)',
      message: `Just a friendly reminder that payment for invoice <strong>${invoiceNumber}</strong> was due <strong>${daysOverdue} day${daysOverdue === 1 ? '' : 's'} ago</strong>.`,
      cta: 'If you\'ve already made the payment, please disregard this message. Otherwise, we\'d appreciate if you could arrange payment at your earliest convenience.',
      urgency: ''
    },
    firm: {
      emoji: '⚠️',
      subject: `Second Notice: Invoice ${invoiceNumber} - ${daysOverdue} days overdue`,
      title: 'Payment Overdue',
      titleColor: '#f59e0b',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      bgGradient: 'rgba(245, 158, 11, 0.1)',
      message: `This is a follow-up regarding invoice <strong>${invoiceNumber}</strong>, which is now <strong>${daysOverdue} days overdue</strong>.`,
      cta: 'Please arrange payment within the next 7 days. If you\'re experiencing any issues, please contact us immediately to discuss payment arrangements.',
      urgency: 'This matter requires your prompt attention.'
    },
    final: {
      emoji: '🚨',
      subject: `URGENT: Final Notice - Invoice ${invoiceNumber}`,
      title: 'Final Payment Notice',
      titleColor: '#ef4444',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      bgGradient: 'rgba(239, 68, 68, 0.15)',
      message: `Despite previous reminders, invoice <strong>${invoiceNumber}</strong> remains unpaid and is now <strong>${daysOverdue} days overdue</strong>.`,
      cta: 'To avoid further action, please ensure payment is made within <strong>48 hours</strong>. If you\'re experiencing financial difficulties, please contact us immediately.',
      urgency: 'This is a final notice before we consider further recovery action.'
    }
  };

  const config = configs[type];

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a;">
        <tr>
          <td align="center" style="padding: 48px 16px;">

            <!-- Main Card -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 420px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid ${config.borderColor};">

              <!-- Header Emoji -->
              <tr>
                <td align="center" style="padding: 48px 32px 20px 32px;">
                  <span style="font-size: 64px; line-height: 1;">${config.emoji}</span>
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td align="center" style="padding: 0 32px 12px 32px;">
                  <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: ${config.titleColor}; line-height: 1.3;">${config.title}</h1>
                </td>
              </tr>

              <!-- Invoice Badge -->
              <tr>
                <td align="center" style="padding: 0 32px 32px 32px;">
                  <table role="presentation" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="background: rgba(250, 204, 21, 0.15); border: 1px solid rgba(250, 204, 21, 0.3); border-radius: 12px; padding: 12px 24px;">
                        <span style="font-size: 15px; font-weight: 600; color: #facc15;">${invoiceNumber}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Amount Card -->
              <tr>
                <td style="padding: 0 24px 32px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${config.bgGradient}; border-radius: 20px; border: 1px solid ${config.borderColor};">
                    <tr>
                      <td align="center" style="padding: 24px;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Amount Due</p>
                        <p style="margin: 0; font-size: 36px; font-weight: 700; color: ${config.titleColor};">${formattedTotal}</p>
                        <p style="margin: 12px 0 0 0; font-size: 14px; color: #ef4444; font-weight: 600;">${daysOverdue} days overdue</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <p style="margin: 0; font-size: 17px; color: #e2e8f0; line-height: 1.6;">Hi ${clientName},</p>
                  <p style="margin: 20px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.message}</p>
                  <p style="margin: 16px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.cta}</p>
                  ${config.urgency ? `<p style="margin: 16px 0 0 0; font-size: 15px; color: ${config.titleColor}; font-weight: 600;">${config.urgency}</p>` : ''}
                </td>
              </tr>

              <!-- Contact Box -->
              <tr>
                <td style="padding: 0 24px 40px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(250, 204, 21, 0.08); border-radius: 16px; border: 1px solid rgba(250, 204, 21, 0.15);">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <p style="margin: 0; font-size: 15px; color: #fbbf24;"><strong>Questions?</strong> Just reply to this email - we're here to help!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 28px 32px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
                  <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">Sent by ${companyName}</p>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569; text-align: center;">Powered by ElecMate Professional Suite</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return { subject: config.subject, html };
}
