import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import {
  buildPaymentReminderEmail,
  type PaymentReminderTone,
} from '../_shared/email-templates/payment-reminder.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface PaymentReminderRequest {
  invoiceId: string;
  reminderType: 'gentle' | 'firm' | 'final';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { invoiceId, reminderType }: PaymentReminderRequest = await req.json();

    if (!invoiceId || !reminderType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: invoiceId and reminderType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the invoice/quote details
    const { data: invoice, error: fetchError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (fetchError || !invoice) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Guard: never send reminders for paid, cancelled, or deleted invoices
    if (
      invoice.invoice_status === 'paid' ||
      invoice.invoice_status === 'cancelled' ||
      invoice.deleted_at
    ) {
      return new Response(
        JSON.stringify({ error: 'Invoice is not eligible for reminders', status: invoice.invoice_status }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Partial payments — chase the BALANCE, never the full total (Alex,
    // 2026-07-20: customer had paid £800 of £1,200 and the reminder said
    // "£1,200 due"). total_paid is maintained by PartialPaymentDialog; fall
    // back to summing the partial_payments jsonb for older rows.
    const partialSum = Array.isArray(invoice.partial_payments)
      ? invoice.partial_payments.reduce(
          (sum: number, p: any) => sum + (Number(p?.amount) || 0),
          0
        )
      : 0;
    const amountPaid = Math.max(Number(invoice.total_paid) || 0, partialSum);
    const invoiceTotal = Number(invoice.total) || 0;
    const balanceDue = Math.max(0, invoiceTotal - amountPaid);

    if (invoiceTotal > 0 && balanceDue <= 0) {
      return new Response(
        JSON.stringify({
          error: 'Invoice is fully paid by recorded payments — mark it paid instead of sending a reminder',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse client data
    const clientData =
      typeof invoice.client_data === 'string' ? JSON.parse(invoice.client_data) : invoice.client_data;
    const clientEmail = clientData?.email;

    if (!clientEmail) {
      return new Response(JSON.stringify({ error: 'No client email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get company profile for sender info
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', invoice.user_id)
      .single();

    // Calculate days overdue
    const dueDate = invoice.invoice_due_date ? new Date(invoice.invoice_due_date) : new Date();
    const today = new Date();
    const daysOverdue = Math.max(
      0,
      Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
    );

    // ELE-880 — Mint (or reuse) a one-tap "Mark as Paid" token so the
    // electrician can close the loop straight from the email when the
    // client tells them they've paid externally. This is intentionally
    // *embedded* in the same email that goes to the client; it's gated
    // behind a "Are you the electrician?" footer so the client won't tap
    // it. Even if they did, only the electrician would have access to
    // their email forwards / the link is safe to share with the owner.
    let markPaidUrl: string | null = null;
    try {
      const { data: tokenRows, error: tokenErr } = await supabase.rpc(
        'get_or_create_invoice_action_token',
        { p_invoice_id: invoiceId, p_action: 'mark_paid' }
      );
      if (tokenErr) {
        console.warn('[send-payment-reminder] token mint failed', tokenErr.message);
      } else if (Array.isArray(tokenRows) && tokenRows[0]?.public_token) {
        const appOrigin = Deno.env.get('APP_PUBLIC_ORIGIN') || 'https://www.elec-mate.com';
        markPaidUrl = `${appOrigin}/invoices/${encodeURIComponent(
          tokenRows[0].public_token
        )}/mark-paid`;
      }
    } catch (mintErr) {
      console.warn('[send-payment-reminder] token mint exception', mintErr);
    }

    // Pay-now link. A link minted before partial payments were recorded
    // charges the FULL total — worse than no link. When anything has been
    // paid, re-mint at the current balance (create-invoice-payment-link is
    // balance-aware); if the re-mint fails, drop the button and let the
    // bank-details card carry the payment.
    let payNowUrl: string | null =
      invoice.stripe_payment_link_url || invoice.external_invoice_url || null;
    if (amountPaid > 0) {
      payNowUrl = null;
      try {
        const mintResp = await fetch(`${supabaseUrl}/functions/v1/create-invoice-payment-link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ invoiceId }),
        });
        if (mintResp.ok) {
          const minted = await mintResp.json();
          if (minted?.url) payNowUrl = minted.url;
        } else {
          console.warn(
            '[send-payment-reminder] balance link re-mint failed:',
            mintResp.status,
            await mintResp.text()
          );
        }
      } catch (mintLinkErr) {
        console.warn('[send-payment-reminder] balance link re-mint exception', mintLinkErr);
      }
    }

    // Generate email content via shared template
    const bankDetails = companyProfile?.bank_details || invoice.settings?.bankDetails || null;
    const emailContent = buildPaymentReminderEmail({
      company: {
        name: companyProfile?.company_name || 'Your Electrician',
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyProfile?.company_email || null,
        phone: companyProfile?.company_phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      clientName: clientData?.name || 'there',
      invoiceNumber: invoice.invoice_number || 'N/A',
      total: invoiceTotal,
      amountPaid,
      dueDate: invoice.invoice_due_date || null,
      payNowUrl,
      bankDetails: bankDetails
        ? {
            bankName: bankDetails.bankName || null,
            accountName: bankDetails.accountName || null,
            accountNumber: bankDetails.accountNumber || null,
            sortCode: bankDetails.sortCode || null,
          }
        : null,
      tone: reminderType as PaymentReminderTone,
      markPaidUrl,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=payment_reminder&id=${invoiceId}`,
    });

    console.log(`📧 Sending ${reminderType} payment reminder for ${invoice.invoice_number} to ${clientEmail}`);

    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);
    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName: companyProfile?.company_name,
      companyEmail: companyProfile?.company_email,
    });

    const { data: emailResult, error: emailError } = await resend.emails.send({
      ...sender,
      to: [clientEmail],
      subject: emailContent.subject,
      html: emailContent.html,
      text: htmlToPlainText(emailContent.html),
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: emailError }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ELE-880 / ELE-1317 — send the electrician a clearly-labelled copy in a
    // separate email rather than an identical BCC. The identical BCC read as
    // "the reminder was sent to ME, not my customer" (Mark, 2026-07-13). The
    // copy carries the "Mark as paid" button so the close-the-loop UX stays.
    const electricianEmail = sender.replyTo || undefined;
    if (electricianEmail && electricianEmail.toLowerCase() !== clientEmail.toLowerCase()) {
      const copyBanner = `<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-family:sans-serif;font-size:14px;color:#78350f;"><strong>Copy for your records</strong> — this reminder was sent to your customer at ${clientEmail}.</div>`;
      const { error: copyError } = await resend.emails.send({
        ...sender,
        to: [electricianEmail],
        subject: `Copy: ${emailContent.subject}`,
        html: copyBanner + emailContent.html,
        text: `COPY FOR YOUR RECORDS — this reminder was sent to your customer at ${clientEmail}.\n\n${htmlToPlainText(emailContent.html)}`,
      });
      if (copyError) {
        // Client leg already succeeded — log and carry on.
        console.warn('[send-payment-reminder] electrician copy failed:', copyError);
      }
    }

    // Update invoice reminder tracking.
    // ELE-1317 — this update previously wrote `last_reminder_type`, a column
    // that does not exist on `quotes`, so the whole update silently failed
    // and reminder_count/last_reminder_sent_at never moved.
    const { error: trackingError } = await supabase
      .from('quotes')
      .update({
        last_reminder_sent_at: new Date().toISOString(),
        reminder_count: (invoice.reminder_count || 0) + 1,
      })
      .eq('id', invoiceId);
    if (trackingError) {
      console.error('[send-payment-reminder] tracking update failed:', trackingError.message);
    }

    // ELE-1317 — record history where the invoice panel actually reads it.
    const { error: historyError } = await supabase.from('invoice_reminders').insert({
      quote_id: invoiceId,
      user_id: invoice.user_id,
      reminder_type: reminderType,
      sent_at: new Date().toISOString(),
      sent_to_email: clientEmail,
    });
    if (historyError) {
      console.error('[send-payment-reminder] history insert failed:', historyError.message);
    }

    console.log(`${reminderType} reminder sent successfully to ${clientEmail}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${reminderType.charAt(0).toUpperCase() + reminderType.slice(1)} reminder sent successfully`,
        sentTo: clientEmail,
        invoiceNumber: invoice.invoice_number,
        daysOverdue,
        reminderCount: (invoice.reminder_count || 0) + 1,
        emailId: emailResult?.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in send-payment-reminder:', error);
    await captureException(error, {
      functionName: 'send-payment-reminder',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};


serve(handler);
