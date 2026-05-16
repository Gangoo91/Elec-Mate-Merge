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

    // ELE-880 — BCC the electrician so they receive a copy in their own
    // inbox containing the "Mark as paid" button. This is what makes the
    // one-tap close-the-loop UX work: when the client replies "I've paid",
    // the electrician opens the original reminder (now in their inbox) and
    // taps the link.
    const electricianCopyBcc = sender.replyTo || undefined;

    const { data: emailResult, error: emailError } = await resend.emails.send({
      ...sender,
      to: [clientEmail],
      ...(electricianCopyBcc ? { bcc: [electricianCopyBcc] } : {}),
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

    // Update invoice reminder tracking
    await supabase
      .from('quotes')
      .update({
        last_reminder_sent_at: new Date().toISOString(),
        last_reminder_type: reminderType,
        reminder_count: (invoice.reminder_count || 0) + 1,
      })
      .eq('id', invoiceId);

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
