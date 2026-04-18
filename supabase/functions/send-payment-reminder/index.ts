import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from '../_shared/mailer.ts';
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

    // Generate email content
    const emailContent = generateReminderEmail(
      reminderType,
      invoice,
      clientData,
      companyProfile,
      daysOverdue
    );

    console.log(`📧 Sending ${reminderType} payment reminder for ${invoice.invoice_number} to ${clientEmail}`);

    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(resendApiKey);
    const fromEmail = companyProfile?.company_email || 'invoices@elec-mate.com';
    const fromName = companyProfile?.company_name || 'Your Electrician';

    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: `${fromName} <founder@elec-mate.com>`,
      reply_to: fromEmail,
      to: [clientEmail],
      subject: emailContent.subject,
      html: emailContent.html,
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

function generateReminderEmail(
  type: 'gentle' | 'firm' | 'final',
  invoice: any,
  client: any,
  company: any,
  daysOverdue: number
) {
  const companyName = company?.company_name || 'Your Electrician';
  const companyPhone = company?.company_phone || '';
  const companyEmail = company?.company_email || '';
  const bankDetails = company?.bank_details || invoice.settings?.bankDetails;

  // Prefer Stripe payment link over Xero external URL
  const paymentLink = invoice.stripe_payment_link_url || invoice.external_invoice_url || null;

  const dueDateStr = invoice.invoice_due_date
    ? new Date(invoice.invoice_due_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'as agreed';

  const amount = `£${(invoice.total || 0).toFixed(2)}`;
  const clientName = client?.name || 'Valued Customer';
  const invoiceRef = invoice.invoice_number || 'N/A';

  // ── Subjects ──────────────────────────────────────────────────────────
  let subject = '';
  switch (type) {
    case 'gentle':
      subject = `Friendly Reminder: ${invoiceRef} is due`;
      break;
    case 'firm':
      subject = `Payment Required: ${invoiceRef} — ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue`;
      break;
    case 'final':
      subject = `Final Notice: ${invoiceRef} — Immediate action required`;
      break;
  }

  // ── Accent colour per urgency ─────────────────────────────────────────
  const accentColor = type === 'final' ? '#dc2626' : type === 'firm' ? '#d97706' : '#FFD700';
  const accentBg = type === 'final' ? '#fef2f2' : type === 'firm' ? '#fffbeb' : '#fffbeb';
  const accentBorder = type === 'final' ? '#fecaca' : type === 'firm' ? '#fde68a' : '#fde68a';
  const accentText = type === 'final' ? '#991b1b' : type === 'firm' ? '#92400e' : '#92400e';

  // ── Urgency banner ────────────────────────────────────────────────────
  let urgencyBanner = '';
  if (type === 'firm') {
    urgencyBanner = `
      <tr>
        <td style="padding: 0 32px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; border-left: 4px solid #d97706;">
            <tr>
              <td style="padding: 16px 20px;">
                <p style="margin: 0; font-size: 14px; color: #92400e; font-weight: 600;">
                  Second Notice — ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue
                </p>
                <p style="margin: 6px 0 0; font-size: 14px; color: #78350f;">
                  Please arrange payment within 7 days or contact us to discuss.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  } else if (type === 'final') {
    urgencyBanner = `
      <tr>
        <td style="padding: 0 32px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; border-left: 4px solid #dc2626;">
            <tr>
              <td style="padding: 16px 20px;">
                <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: 700;">
                  Final Notice — ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue
                </p>
                <p style="margin: 6px 0 0; font-size: 14px; color: #7f1d1d;">
                  Payment must be received within <strong>48 hours</strong>. Failure to pay may result in late payment charges and referral for debt recovery.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }

  // ── Pay Now button ────────────────────────────────────────────────────
  const payNowButton = paymentLink
    ? `
      <tr>
        <td style="padding: 0 32px 24px; text-align: center;">
          <a href="${paymentLink}"
            style="display: inline-block; background-color: #FFD700; color: #111111;
              padding: 14px 40px; border-radius: 8px; text-decoration: none;
              font-size: 16px; font-weight: 700; letter-spacing: 0.3px;">
            Pay Now
          </a>
        </td>
      </tr>`
    : '';

  // ── Bank details ──────────────────────────────────────────────────────
  const bankDetailsHtml = bankDetails
    ? `
      <tr>
        <td style="padding: 0 32px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
            <tr>
              <td style="padding: 20px;">
                <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8px;">
                  Bank Transfer Details
                </p>
                ${bankDetails.bankName ? `<p style="margin: 4px 0; font-size: 14px; color: #1a1a1a;"><span style="color: #6b7280;">Bank:</span> ${bankDetails.bankName}</p>` : ''}
                ${bankDetails.accountName ? `<p style="margin: 4px 0; font-size: 14px; color: #1a1a1a;"><span style="color: #6b7280;">Account Name:</span> ${bankDetails.accountName}</p>` : ''}
                ${bankDetails.accountNumber ? `<p style="margin: 4px 0; font-size: 14px; color: #1a1a1a;"><span style="color: #6b7280;">Account Number:</span> ${bankDetails.accountNumber}</p>` : ''}
                ${bankDetails.sortCode ? `<p style="margin: 4px 0; font-size: 14px; color: #1a1a1a;"><span style="color: #6b7280;">Sort Code:</span> ${bankDetails.sortCode}</p>` : ''}
                <p style="margin: 12px 0 0; font-size: 13px; color: #6b7280;">
                  Please use <strong style="color: #1a1a1a;">${invoiceRef}</strong> as the payment reference.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : '';

  // ── Body copy per type ────────────────────────────────────────────────
  let bodyCopy = '';
  switch (type) {
    case 'gentle':
      bodyCopy = `This is a friendly reminder that the invoice below is due for payment. If you've already arranged this, please ignore this message — and thank you.`;
      break;
    case 'firm':
      bodyCopy = `We notice the invoice below remains outstanding. Please arrange payment as soon as possible. If there's an issue, don't hesitate to get in touch.`;
      break;
    case 'final':
      bodyCopy = `Despite previous reminders, the invoice below remains unpaid. Please contact us immediately or arrange payment now to avoid further action.`;
      break;
  }

  // ── Contact line ──────────────────────────────────────────────────────
  const contactLine = [
    companyPhone ? `${companyPhone}` : '',
    companyEmail ? `${companyEmail}` : '',
  ]
    .filter(Boolean)
    .join('&nbsp;&nbsp;&middot;&nbsp;&nbsp;');

  // ── Full HTML — Professional White Theme ──────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Reminder</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f6f6f6;">
    <tr>
      <td style="padding: 40px 16px;">

        <!-- Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
          style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td style="background-color: #111111; padding: 24px 32px;">
              <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                ${companyName}
              </p>
              ${contactLine ? `<p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.6);">${contactLine}</p>` : ''}
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #1a1a1a;">
                Hi <strong>${clientName}</strong>,
              </p>
              <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
                ${bodyCopy}
              </p>
            </td>
          </tr>

          <!-- Urgency banner (firm/final only) -->
          ${urgencyBanner}

          <!-- Invoice summary card -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 10px;">
                <tr>
                  <td style="padding: 28px; text-align: center;">
                    <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8px;">
                      Invoice Reference
                    </p>
                    <p style="margin: 0 0 20px; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                      ${invoiceRef}
                    </p>
                    <p style="margin: 0 0 4px; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.8px;">
                      Amount Due
                    </p>
                    <p style="margin: 0 0 12px; font-size: 40px; font-weight: 700; color: #1a1a1a; line-height: 1.1;">
                      ${amount}
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #6b7280;">
                      Due date: <span style="color: #1a1a1a; font-weight: 500;">${dueDateStr}</span>
                    </p>
                    ${
                      daysOverdue > 0
                        ? `<p style="margin: 8px 0 0; font-size: 13px; font-weight: 600; color: ${accentColor};">
                        ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue
                      </p>`
                        : ''
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pay Now CTA -->
          ${payNowButton}

          <!-- Bank details -->
          ${bankDetailsHtml}

          <!-- Sign-off -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <p style="margin: 0; font-size: 15px; color: #4b5563; line-height: 1.6;">
                Kind regards,<br>
                <strong style="color: #1a1a1a;">${companyName}</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top: 1px solid #e5e7eb; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                Sent via Elec-Mate
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  return { subject, html };
}

serve(handler);
