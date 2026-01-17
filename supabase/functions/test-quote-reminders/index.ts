import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

function buildReminderEmailHtml(
  clientName: string,
  companyName: string,
  quoteNumber: string,
  total: number,
  expiryDate: string,
  acceptUrl: string,
  reminderNumber: number, // 1 = first (3 days), 2 = final (7 days)
  companyPhone?: string,
  companyEmail?: string
): string {
  const isFinalReminder = reminderNumber === 2;

  const headerMessage = isFinalReminder
    ? '⏰ Final Reminder'
    : '📬 Friendly Reminder';

  const bodyMessage = isFinalReminder
    ? "This is a final reminder about your outstanding quote. We want to make sure you don't miss out on securing your electrical work before the quote expires."
    : "We sent you a quote a few days ago and wanted to check if you've had a chance to review it. We're here to help if you have any questions!";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerMessage} - Quote ${quoteNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 22px; font-weight: 700;">⚡ ${companyName}</h1>
            </td>
          </tr>

          <!-- Reminder Badge -->
          <tr>
            <td style="padding: 24px 24px 0; text-align: center;">
              <span style="display: inline-block; background: ${isFinalReminder ? '#dc2626' : '#3b82f6'}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                ${headerMessage}
              </span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                Hi <strong>${clientName}</strong>,
              </p>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #374151;">
                ${bodyMessage}
              </p>

              <!-- Quote Summary Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #f8f9fa; border-radius: 12px; border: 2px solid #e5e7eb; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #6b7280;">Quote Reference:</td>
                        <td style="text-align: right; font-size: 16px; color: #1f2937; font-weight: 700;">${quoteNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 14px; color: #6b7280;">Total Amount:</td>
                        <td style="padding-top: 8px; text-align: right; font-size: 20px; color: #1f2937; font-weight: 700;">${formatCurrency(total)}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 14px; color: ${isFinalReminder ? '#dc2626' : '#6b7280'};">Valid Until:</td>
                        <td style="padding-top: 8px; text-align: right; font-size: 14px; color: ${isFinalReminder ? '#dc2626' : '#1f2937'}; font-weight: 600;">${formatDate(expiryDate)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${acceptUrl}" style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                      ✓ Review & Accept Quote
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 16px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280; text-align: center;">
                Have questions? Reply to this email or give us a call.
              </p>
            </td>
          </tr>

          <!-- Contact Footer -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 14px; color: #374151;">Best regards,</p>
              <p style="margin: 8px 0 0; font-size: 16px; font-weight: 700; color: #1f2937;">${companyName}</p>
              ${companyPhone ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">📞 ${companyPhone}</p>` : ''}
              ${companyEmail ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">✉️ ${companyEmail}</p>` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #1a1a1a; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #FFD700; font-weight: 600;">⚡ Powered by ElecMate</p>
              <p style="margin: 4px 0 0; font-size: 12px; color: #9ca3af;">Professional electrical contracting tools</p>
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

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  console.log('🧪 Test Quote Reminders | Started:', new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const resend = new Resend(resendApiKey);

    // Sample data for test emails
    const testData = {
      clientName: 'John Smith',
      companyName: 'ElecMate Demo',
      quoteNumber: 'Q-2025-001',
      total: 2450.00,
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      acceptUrl: 'https://www.elec-mate.com/quote/test-token#accept',
      companyPhone: '07700 900123',
      companyEmail: 'demo@elec-mate.com',
    };

    const testEmail = 'founder@elec-mate.com';

    // Send Reminder 1 (3 days - Friendly)
    const reminder1Html = buildReminderEmailHtml(
      testData.clientName,
      testData.companyName,
      testData.quoteNumber,
      testData.total,
      testData.expiryDate,
      testData.acceptUrl,
      1, // First reminder
      testData.companyPhone,
      testData.companyEmail
    );

    const { error: error1 } = await resend.emails.send({
      from: `ElecMate <founder@elec-mate.com>`,
      to: [testEmail],
      subject: `[TEST] Reminder 1 (Day 3): Quote ${testData.quoteNumber} - ${testData.companyName}`,
      html: reminder1Html,
    });

    if (error1) {
      console.error('❌ Failed to send reminder 1:', error1);
      throw new Error(`Failed to send reminder 1: ${error1.message}`);
    }

    console.log('✅ Reminder 1 sent');

    // Send Reminder 2 (7 days - Final)
    const reminder2Html = buildReminderEmailHtml(
      testData.clientName,
      testData.companyName,
      testData.quoteNumber,
      testData.total,
      testData.expiryDate,
      testData.acceptUrl,
      2, // Final reminder
      testData.companyPhone,
      testData.companyEmail
    );

    const { error: error2 } = await resend.emails.send({
      from: `ElecMate <founder@elec-mate.com>`,
      to: [testEmail],
      subject: `[TEST] Reminder 2 (Day 7 - FINAL): Quote ${testData.quoteNumber} - ${testData.companyName}`,
      html: reminder2Html,
    });

    if (error2) {
      console.error('❌ Failed to send reminder 2:', error2);
      throw new Error(`Failed to send reminder 2: ${error2.message}`);
    }

    console.log('✅ Reminder 2 sent');

    return new Response(
      JSON.stringify({
        success: true,
        message: `2 test emails sent to ${testEmail}`,
        emails: [
          'Reminder 1 (Day 3 - Friendly)',
          'Reminder 2 (Day 7 - Final)'
        ]
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
