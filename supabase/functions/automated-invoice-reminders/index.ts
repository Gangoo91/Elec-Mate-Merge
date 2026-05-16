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
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildPaymentReminderEmail } from '../_shared/email-templates/payment-reminder.ts';
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

      // Get company profile for sender info + branded template
      let companyName = 'Your Electrician';
      let companyEmail: string | null = null;

      const { data: company } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', invoice.user_id)
        .single();

      if (company) {
        companyName = company.company_name || 'Your Electrician';
        companyEmail = company.company_email || null;
      }
      // If no company_email, fall back to auth user email for Reply-To
      let userEmail: string | null = null;
      if (!companyEmail) {
        const { data: authUser } = await supabase.auth.admin.getUserById(invoice.user_id);
        userEmail = authUser?.user?.email || null;
      }

      // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
      const sender = clientFacingSender({
        companyName,
        companyEmail,
        userEmail,
      });
      const electricianCopyBcc = sender.replyTo || undefined;

      // ELE-880 — mint a mark-paid token so the reminder includes a one-tap
      // "Mark this invoice as paid" button (visible in the BCC'd electrician
      // copy and labelled "For ${companyName} only" in the client copy).
      let markPaidUrl: string | null = null;
      try {
        const { data: tokenRows, error: tokenErr } = await supabase.rpc(
          'get_or_create_invoice_action_token',
          { p_invoice_id: invoice.id, p_action: 'mark_paid' }
        );
        if (tokenErr) {
          console.warn('[automated-invoice-reminders] token mint failed', tokenErr.message);
        } else if (Array.isArray(tokenRows) && tokenRows[0]?.public_token) {
          const appOrigin =
            Deno.env.get('APP_PUBLIC_ORIGIN') || 'https://www.elec-mate.com';
          markPaidUrl = `${appOrigin}/invoices/${encodeURIComponent(
            tokenRows[0].public_token
          )}/mark-paid`;
        }
      } catch (mintErr) {
        console.warn('[automated-invoice-reminders] token mint exception', mintErr);
      }

      // Generate email content via shared payment-reminder template.
      const bankDetails = company?.bank_details || invoice.settings?.bankDetails || null;
      const emailContent = buildPaymentReminderEmail({
        company: {
          name: companyName,
          logoUrl: company?.logo_url || company?.logo_data_url || null,
          primaryColor: company?.primary_color || null,
          email: companyEmail,
          phone: company?.company_phone || null,
          website: company?.company_website || null,
          address: company?.company_address || null,
          vatNumber: company?.vat_number || null,
          registrationNumber: company?.company_registration || null,
        },
        clientName,
        invoiceNumber: invoice.invoice_number || 'N/A',
        total: Number(invoice.total) || 0,
        dueDate: invoice.invoice_due_date || null,
        payNowUrl: invoice.stripe_payment_link_url || invoice.external_invoice_url || null,
        bankDetails: bankDetails
          ? {
              bankName: bankDetails.bankName || null,
              accountName: bankDetails.accountName || null,
              accountNumber: bankDetails.accountNumber || null,
              sortCode: bankDetails.sortCode || null,
            }
          : null,
        tone: reminderType,
        markPaidUrl,
      });

      // ELE-662 + ELE-880 — Send via Brevo (Resend banned us at the domain
      // level). BCC the electrician so they receive a copy with the
      // mark-paid button in their inbox.
      const resend = new Resend(resendApiKey);
      try {
        const { data, error } = await resend.emails.send({
          ...sender,
          ...(electricianCopyBcc ? { bcc: [electricianCopyBcc] } : {}),
          to: [clientEmail],
          subject: emailContent.subject,
          html: emailContent.html,
          text: htmlToPlainText(emailContent.html),
        });

        if (error) {
          console.error(`Failed to send reminder for ${invoice.invoice_number}:`, error.message);
          results.push({ invoice: invoice.invoice_number, status: 'failed', reason: error.message });
          continue;
        }
        console.log(`[automated-invoice-reminders] sent ${invoice.invoice_number}`, data?.id);

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
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=payment_reminder&id=${invoice.id}`,
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
