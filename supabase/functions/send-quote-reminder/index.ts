import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface QuoteReminderRequest {
  quoteId: string;
  reminderType?: 'gentle' | 'firm' | 'urgent';
}

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

function safeJsonParse(data: any, fallback: any = {}): any {
  if (data === null || data === undefined) return fallback;
  if (typeof data === 'object') return data;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
}

// ============================================================================
// EMAIL TEMPLATE
// ============================================================================

function buildReminderEmailHtml(
  clientName: string,
  companyName: string,
  quoteNumber: string,
  total: number,
  expiryDate: string,
  acceptUrl: string,
  reminderType: string,
  trackingUrl: string,
  companyPhone?: string,
  companyEmail?: string
): string {
  const isUrgent = reminderType === 'urgent';
  const isFirm = reminderType === 'firm';

  const headerMessage = isUrgent
    ? '⏰ Final Reminder - Quote Expiring Soon'
    : isFirm
      ? 'Just Checking In'
      : 'Friendly Reminder';

  const bodyMessage = isUrgent
    ? "This is a final reminder about your outstanding quote. We want to make sure you don't miss out on securing your electrical work before the quote expires."
    : isFirm
      ? "We noticed you haven't had a chance to respond to our quote yet. We'd love to help you with your electrical work and wanted to check if you have any questions."
      : "We recently sent you a quote and wanted to check if you've had a chance to review it. We're here to help if you have any questions.";

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
              <span style="display: inline-block; background: ${isUrgent ? '#dc2626' : isFirm ? '#f59e0b' : '#3b82f6'}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
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
                        <td style="padding-top: 8px; font-size: 14px; color: ${isUrgent ? '#dc2626' : '#6b7280'};">Valid Until:</td>
                        <td style="padding-top: 8px; text-align: right; font-size: 14px; color: ${isUrgent ? '#dc2626' : '#1f2937'}; font-weight: 600;">${formatDate(expiryDate)}</td>
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

  <!-- Tracking pixel -->
  <img src="${trackingUrl}" width="1" height="1" style="display:none;visibility:hidden;width:1px;height:1px;opacity:0;" alt="" />

</body>
</html>
  `;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const startTime = Date.now();
  console.log('📧 Send Quote Reminder | Started:', new Date().toISOString());

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing');
    }

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization required');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      throw new Error('Authentication failed');
    }

    console.log('✅ User authenticated:', user.id);

    // Parse request
    const { quoteId, reminderType = 'gentle' }: QuoteReminderRequest = await req.json();

    if (!quoteId) {
      throw new Error('Quote ID is required');
    }

    // Fetch quote
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .eq('user_id', user.id)
      .single();

    if (quoteError || !quote) {
      throw new Error('Quote not found or access denied');
    }

    // Validate quote status
    if (quote.acceptance_status !== 'pending') {
      throw new Error(`Cannot send reminder - quote is already ${quote.acceptance_status}`);
    }

    if (quote.status !== 'sent') {
      throw new Error('Quote must be sent before sending reminders');
    }

    // Get client data
    const clientData = safeJsonParse(quote.client_data, {});
    const clientEmail = clientData?.email?.trim();
    const clientName = clientData?.name || 'Valued Client';

    if (!clientEmail) {
      throw new Error('Client email not found');
    }

    console.log(`📧 Sending reminder to: ${clientEmail}`);

    // Get company profile
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'ElecMate';

    // Get or create public token
    let publicToken = quote.public_token;
    if (!publicToken) {
      const { data: existingView } = await supabase
        .from('quote_views')
        .select('public_token')
        .eq('quote_id', quoteId)
        .single();

      publicToken = existingView?.public_token;
    }

    if (!publicToken) {
      throw new Error('Public token not found - send the quote first');
    }

    // Build URLs
    const acceptUrl = `https://www.elec-mate.com/public-quote/${publicToken}#accept`;
    const trackingUrl = `${supabaseUrl}/functions/v1/quote-email-tracking?t=${publicToken}&q=${quoteId}`;

    // Build and send email
    const resend = new Resend(resendApiKey);

    const emailHtml = buildReminderEmailHtml(
      clientName,
      companyName,
      quote.quote_number,
      parseFloat(quote.total),
      quote.expiry_date,
      acceptUrl,
      reminderType,
      trackingUrl,
      companyProfile?.company_phone,
      companyProfile?.company_email
    );

    const subjectPrefix = reminderType === 'urgent'
      ? 'Final Reminder: '
      : reminderType === 'firm'
        ? 'Reminder: '
        : 'Following Up: ';

    const subject = `${subjectPrefix}Quote ${quote.quote_number} - ${companyName}`;
    const replyToEmail = companyProfile?.company_email || 'info@elec-mate.com';

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `${companyName} <founder@elec-mate.com>`,
      reply_to: replyToEmail,
      to: [clientEmail],
      subject: subject,
      html: emailHtml,
    });

    if (emailError) {
      console.error('❌ Email send error:', emailError);
      throw new Error(`Failed to send email: ${emailError.message}`);
    }

    console.log('✅ Reminder email sent:', emailData?.id);

    // Update quote with reminder tracking
    const currentReminderCount = quote.reminder_count || 0;
    await supabase
      .from('quotes')
      .update({
        reminder_count: currentReminderCount + 1,
        last_reminder_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', quoteId);

    // Record email event
    await supabase
      .from('quote_email_events')
      .insert({
        quote_id: quoteId,
        event_type: 'sent',
        event_data: {
          type: 'manual_reminder',
          reminder_type: reminderType,
          reminder_number: currentReminderCount + 1,
          email_id: emailData?.id,
        },
      });

    const duration = Date.now() - startTime;
    console.log(`✅ Complete in ${duration}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${reminderType.charAt(0).toUpperCase() + reminderType.slice(1)} reminder sent successfully`,
        emailId: emailData?.id,
        reminderCount: currentReminderCount + 1,
        duration: `${duration}ms`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to send reminder',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
