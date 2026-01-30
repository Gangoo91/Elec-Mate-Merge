import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { invoiceId, reminderType }: PaymentReminderRequest = await req.json();

    if (!invoiceId || !reminderType) {
      return new Response(JSON.stringify({ error: 'Missing required fields: invoiceId and reminderType' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get the invoice/quote details
    const { data: invoice, error: fetchError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (fetchError || !invoice) {
      console.error('Error fetching invoice:', fetchError);
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse client data
    const clientData = typeof invoice.client_data === 'string'
      ? JSON.parse(invoice.client_data)
      : invoice.client_data;

    const settingsData = typeof invoice.settings === 'string'
      ? JSON.parse(invoice.settings)
      : invoice.settings;

    const clientEmail = clientData?.email;
    if (!clientEmail) {
      return new Response(JSON.stringify({ error: 'No client email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
    const daysOverdue = Math.max(0, Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Generate reminder email content
    const emailContent = generateReminderEmail(
      reminderType,
      invoice,
      clientData,
      companyProfile,
      daysOverdue
    );

    console.log(`📧 Sending ${reminderType} payment reminder for ${invoice.invoice_number} to ${clientEmail}`);

    // Send via Resend
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const resend = new Resend(resendApiKey);

    const fromEmail = companyProfile?.company_email || 'invoices@elec-mate.com';
    const fromName = companyProfile?.company_name || 'ElecMate';

    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [clientEmail],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: emailError }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Update the invoice with reminder tracking
    const { error: updateError } = await supabase
      .from('quotes')
      .update({
        last_reminder_sent_at: new Date().toISOString(),
        last_reminder_type: reminderType,
        reminder_count: (invoice.reminder_count || 0) + 1
      })
      .eq('id', invoiceId);

    if (updateError) {
      console.error('Error updating invoice:', updateError);
    }

    console.log(`✅ ${reminderType} reminder sent successfully to ${clientEmail}`);

    return new Response(JSON.stringify({
      success: true,
      message: `${reminderType.charAt(0).toUpperCase() + reminderType.slice(1)} reminder sent successfully`,
      sentTo: clientEmail,
      invoiceNumber: invoice.invoice_number,
      daysOverdue,
      reminderCount: (invoice.reminder_count || 0) + 1,
      emailId: emailResult?.id
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in send-payment-reminder:', error);
    await captureException(error, {
      functionName: 'send-payment-reminder',
      requestUrl: req.url,
      requestMethod: req.method
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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

  const dueDate = invoice.invoice_due_date
    ? new Date(invoice.invoice_due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'as agreed';
  const amount = `£${(invoice.total || 0).toFixed(2)}`;
  const clientName = client?.name || 'Valued Customer';

  const baseStyles = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 0 auto; background: white; }
      .header { padding: 30px; text-align: center; }
      .content { padding: 30px; }
      .invoice-box { background: #f8f9fa; padding: 24px; border-radius: 12px; margin: 24px 0; }
      .amount { font-size: 32px; font-weight: bold; margin: 12px 0; }
      .footer { background: #1a1a1a; color: #999; padding: 24px; text-align: center; font-size: 14px; }
      .bank-details { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
      .cta-button { display: inline-block; background: #FFD700; color: #1a1a1a; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
    </style>
  `;

  let subject = '';
  let headerBg = '';
  let headerColor = '';
  let amountColor = '';
  let urgencyBanner = '';

  switch (type) {
    case 'gentle':
      subject = `Friendly Reminder: Invoice ${invoice.invoice_number}`;
      headerBg = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
      headerColor = '#FFD700';
      amountColor = '#FFD700';
      break;
    case 'firm':
      subject = `Payment Required: Invoice ${invoice.invoice_number} - ${daysOverdue} Days Overdue`;
      headerBg = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      headerColor = '#ffffff';
      amountColor = '#d97706';
      urgencyBanner = `
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
          <strong>⚠️ Second Notice:</strong> This invoice is now ${daysOverdue} days overdue. Please arrange payment within 7 days.
        </div>
      `;
      break;
    case 'final':
      subject = `URGENT FINAL NOTICE: Invoice ${invoice.invoice_number}`;
      headerBg = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
      headerColor = '#ffffff';
      amountColor = '#dc2626';
      urgencyBanner = `
        <div style="background: #fef2f2; border: 2px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #dc2626;">🚨 FINAL NOTICE - Immediate Action Required</h3>
          <p style="margin: 0;">This invoice is ${daysOverdue} days overdue. Payment must be received within <strong>48 hours</strong> to avoid:</p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px;">
            <li>Late payment interest charges</li>
            <li>Referral to debt collection</li>
            <li>Legal proceedings</li>
          </ul>
        </div>
      `;
      break;
  }

  const bankDetailsHtml = bankDetails ? `
    <div class="bank-details">
      <h4 style="margin: 0 0 12px 0;">Bank Transfer Details</h4>
      ${bankDetails.bankName ? `<p style="margin: 4px 0;"><strong>Bank:</strong> ${bankDetails.bankName}</p>` : ''}
      ${bankDetails.accountName ? `<p style="margin: 4px 0;"><strong>Account Name:</strong> ${bankDetails.accountName}</p>` : ''}
      ${bankDetails.accountNumber ? `<p style="margin: 4px 0;"><strong>Account Number:</strong> ${bankDetails.accountNumber}</p>` : ''}
      ${bankDetails.sortCode ? `<p style="margin: 4px 0;"><strong>Sort Code:</strong> ${bankDetails.sortCode}</p>` : ''}
      <p style="margin: 12px 0 0 0; font-size: 13px; color: #666;">Reference: ${invoice.invoice_number}</p>
    </div>
  ` : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header" style="background: ${headerBg}; color: ${headerColor};">
      <h1 style="margin: 0; font-size: 24px;">${companyName}</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">Payment Reminder</p>
    </div>

    <div class="content">
      <p>Dear ${clientName},</p>

      ${type === 'gentle' ? `
        <p>I hope this message finds you well. This is a friendly reminder regarding the outstanding payment for the following invoice:</p>
      ` : type === 'firm' ? `
        <p>I'm following up regarding the outstanding payment that is now overdue:</p>
      ` : `
        <p>Despite previous reminders, the following invoice remains unpaid:</p>
      `}

      ${urgencyBanner}

      <div class="invoice-box" style="text-align: center;">
        <p style="margin: 0; color: #666;">Invoice ${invoice.invoice_number}</p>
        <p class="amount" style="color: ${amountColor};">${amount}</p>
        <p style="margin: 0; color: #666;">Due: ${dueDate}</p>
        ${daysOverdue > 0 ? `<p style="margin: 8px 0 0 0; color: ${type === 'gentle' ? '#f59e0b' : '#dc2626'}; font-weight: 600;">${daysOverdue} days overdue</p>` : ''}
      </div>

      ${bankDetailsHtml}

      ${type === 'gentle' ? `
        <p>If you've already arranged payment, please disregard this message. Otherwise, I'd appreciate it if you could arrange payment at your earliest convenience.</p>
      ` : type === 'firm' ? `
        <p>If there are any issues preventing payment, please contact me immediately so we can discuss a solution.</p>
      ` : `
        <p><strong>Please contact me immediately</strong> if you have already made payment or need to discuss payment arrangements.</p>
      `}

      <p style="margin-top: 30px;">
        Best regards,<br>
        <strong>${companyName}</strong><br>
        ${companyPhone ? `📞 ${companyPhone}<br>` : ''}
        ${companyEmail ? `✉️ ${companyEmail}` : ''}
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;">⚡ Sent via ElecMate</p>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}

serve(handler);
