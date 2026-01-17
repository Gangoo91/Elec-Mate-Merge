/**
 * Test Reminder Emails - sends sample overdue reminder emails for preview
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, type } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: 'RESEND_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const types = type ? [type] : ['gentle', 'firm', 'final'];
    const results = [];

    for (const reminderType of types) {
      const emailContent = generateReminderEmail(
        reminderType as 'gentle' | 'firm' | 'final',
        'Ben Moore',
        'INV-2024-0847',
        1250.00,
        reminderType === 'gentle' ? 1 : reminderType === 'firm' ? 7 : 14,
        'Moore Electrical'
      );

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Moore Electrical <founder@elec-mate.com>',
          reply_to: 'founder@elec-mate.com',
          to: email,
          subject: `[TEST] ${emailContent.subject}`,
          html: emailContent.html,
        }),
      });

      if (response.ok) {
        results.push({ type: reminderType, status: 'sent' });
      } else {
        const error = await response.text();
        results.push({ type: reminderType, status: 'failed', error });
      }

      // Small delay between emails
      await new Promise(r => setTimeout(r, 500));
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
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

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 420px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid ${config.borderColor};">

              <tr>
                <td align="center" style="padding: 48px 32px 20px 32px;">
                  <span style="font-size: 64px; line-height: 1;">${config.emoji}</span>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 0 32px 12px 32px;">
                  <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: ${config.titleColor};">${config.title}</h1>
                </td>
              </tr>

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

              <tr>
                <td style="padding: 0 24px 32px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${config.bgGradient}; border-radius: 20px; border: 1px solid ${config.borderColor};">
                    <tr>
                      <td align="center" style="padding: 24px;">
                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">Amount Due</p>
                        <p style="margin: 0; font-size: 36px; font-weight: 700; color: ${config.titleColor};">${formattedTotal}</p>
                        <p style="margin: 12px 0 0 0; font-size: 14px; color: #ef4444; font-weight: 600;">${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <p style="margin: 0; font-size: 17px; color: #e2e8f0;">Hi ${clientName},</p>
                  <p style="margin: 20px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.message}</p>
                  <p style="margin: 16px 0 0 0; font-size: 16px; color: #94a3b8; line-height: 1.7;">${config.cta}</p>
                  ${config.urgency ? `<p style="margin: 16px 0 0 0; font-size: 15px; color: ${config.titleColor}; font-weight: 600;">${config.urgency}</p>` : ''}
                </td>
              </tr>

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
