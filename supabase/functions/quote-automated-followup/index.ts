import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Configuration for follow-up timing
const FOLLOWUP_CONFIG = {
  FIRST_REMINDER_DAYS: 3,     // Days to wait before first reminder
  SECOND_REMINDER_DAYS: 7,    // Days to wait before second reminder
  MAX_REMINDERS: 2,           // Maximum number of reminders to send
  DAYS_BEFORE_EXPIRY_NOTIFICATION: 3,
};

interface FollowupQuote {
  quote_id: string;
  quote_number: string;
  client_email: string;
  client_name: string;
  total: number;
  first_sent_at: string;
  reminder_count: number;
  user_id: string;
}

interface ExpiringQuote {
  quote_id: string;
  quote_number: string;
  client_name: string;
  total: number;
  expiry_date: string;
  user_id: string;
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

// ============================================================================
// EMAIL TEMPLATE - Improved friendly wording
// ============================================================================

function buildFollowupEmailHtml(
  clientName: string,
  companyName: string,
  quoteNumber: string,
  total: number,
  expiryDate: string,
  acceptUrl: string,
  reminderCount: number,
  companyPhone?: string,
  companyEmail?: string
): string {
  const isSecondReminder = reminderCount >= 1;

  const badgeText = isSecondReminder ? 'Following Up' : 'Quick Reminder';
  const badgeColor = isSecondReminder ? '#f59e0b' : '#3b82f6'; // amber for second, blue for first

  const greeting = isSecondReminder
    ? `We hope you're well! We wanted to follow up on the quote we sent over recently.`
    : `Hope you're having a great week! Just a quick note about the quote we sent you.`;

  const mainMessage = isSecondReminder
    ? `We noticed you haven't had a chance to review it yet, and wanted to make sure it didn't get lost in your inbox. We'd love to help with your electrical work and are happy to answer any questions you might have.`
    : `We wanted to check if you've had a chance to look it over. If you have any questions or would like to discuss anything, we're here to help.`;

  const closingMessage = isSecondReminder
    ? `No pressure at all - just give us a shout when you're ready, or let us know if your plans have changed.`
    : `Take your time to review, and feel free to reach out if you need anything.`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote ${quoteNumber} - ${companyName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 28px 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 24px; font-weight: 700;">⚡ ${companyName}</h1>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding: 28px 24px 0; text-align: center;">
              <span style="display: inline-block; background: ${badgeColor}; color: white; padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">
                ${badgeText}
              </span>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 28px 24px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.7; color: #374151;">
                Hi ${clientName},
              </p>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.7; color: #374151;">
                ${greeting}
              </p>

              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; color: #374151;">
                ${mainMessage}
              </p>

              <!-- Quote Summary Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%); border-radius: 12px; border: 1px solid #e5e7eb; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Your Quote</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #6b7280; padding-bottom: 12px;">Reference</td>
                        <td style="text-align: right; font-size: 15px; color: #1f2937; font-weight: 600; padding-bottom: 12px;">${quoteNumber}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; color: #6b7280; padding-bottom: 12px;">Amount</td>
                        <td style="text-align: right; font-size: 22px; color: #1f2937; font-weight: 700; padding-bottom: 12px;">${formatCurrency(total)}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; color: #6b7280;">Valid until</td>
                        <td style="text-align: right; font-size: 14px; color: #1f2937; font-weight: 500;">${formatDate(expiryDate)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 28px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${acceptUrl}" style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 10px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);">
                      View Quote
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #6b7280; text-align: center;">
                ${closingMessage}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 24px;">
              <div style="border-top: 1px solid #e5e7eb;"></div>
            </td>
          </tr>

          <!-- Contact Footer -->
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 4px; font-size: 15px; color: #374151;">Cheers,</p>
              <p style="margin: 0 0 12px; font-size: 17px; font-weight: 700; color: #1f2937;">${companyName}</p>
              ${companyPhone || companyEmail ? `
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                ${companyPhone ? `📞 ${companyPhone}` : ''}${companyPhone && companyEmail ? ' &nbsp;·&nbsp; ' : ''}${companyEmail ? `✉️ ${companyEmail}` : ''}
              </p>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #1a1a1a; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #FFD700; font-weight: 600;">⚡ Powered by ElecMate</p>
              <p style="margin: 4px 0 0; font-size: 11px; color: #9ca3af;">Professional tools for electricians</p>
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
  const startTime = Date.now();
  console.log('🔄 Quote Automated Follow-up | Started:', new Date().toISOString());

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate environment
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials');
    }

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    const results = {
      followups_sent: 0,
      followup_errors: 0,
      expiry_notifications: 0,
      expiry_errors: 0,
    };

    // ========================================================================
    // PART 1: Process Quote Follow-ups
    // ========================================================================
    console.log('📬 Checking for quotes needing follow-up...');

    const { data: followupQuotes, error: followupError } = await supabase
      .rpc('get_quotes_needing_followup', {
        first_reminder_days: FOLLOWUP_CONFIG.FIRST_REMINDER_DAYS,
        second_reminder_days: FOLLOWUP_CONFIG.SECOND_REMINDER_DAYS,
        max_reminders: FOLLOWUP_CONFIG.MAX_REMINDERS,
      });

    if (followupError) {
      console.error('❌ Error fetching follow-up quotes:', followupError);
    } else if (followupQuotes && followupQuotes.length > 0) {
      console.log(`📋 Found ${followupQuotes.length} quotes needing follow-up`);

      for (const quote of followupQuotes as FollowupQuote[]) {
        try {
          console.log(`\n📧 Processing follow-up for ${quote.quote_number}...`);

          // Get company profile for this user
          const { data: companyProfile } = await supabase
            .from('company_profiles')
            .select('*')
            .eq('user_id', quote.user_id)
            .single();

          const companyName = companyProfile?.company_name || 'ElecMate';

          // Get public token for accept URL
          const { data: quoteView } = await supabase
            .from('quote_views')
            .select('public_token')
            .eq('quote_id', quote.quote_id)
            .single();

          if (!quoteView?.public_token) {
            console.log(`⚠️ No public token for ${quote.quote_number}, skipping`);
            continue;
          }

          // Get full quote for expiry date
          const { data: fullQuote } = await supabase
            .from('quotes')
            .select('expiry_date')
            .eq('id', quote.quote_id)
            .single();

          // Build accept URL
          const acceptUrl = `https://www.elec-mate.com/quote/${quoteView.public_token}#accept`;

          // Build and send email
          const emailHtml = buildFollowupEmailHtml(
            quote.client_name || 'there',
            companyName,
            quote.quote_number,
            quote.total,
            fullQuote?.expiry_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            acceptUrl,
            quote.reminder_count,
            companyProfile?.company_phone,
            companyProfile?.company_email
          );

          const subject = `Quote ${quote.quote_number} from ${companyName}`;
          const replyToEmail = companyProfile?.company_email || 'info@elec-mate.com';

          const { error: emailError } = await resend.emails.send({
            from: `${companyName} <founder@elec-mate.com>`,
            reply_to: replyToEmail,
            to: [quote.client_email],
            subject: subject,
            html: emailHtml,
          });

          if (emailError) {
            console.error(`❌ Failed to send follow-up for ${quote.quote_number}:`, emailError);
            results.followup_errors++;
            continue;
          }

          // Update quote with reminder info
          await supabase
            .from('quotes')
            .update({
              reminder_count: quote.reminder_count + 1,
              last_reminder_sent_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', quote.quote_id);

          // Record email event
          await supabase
            .from('quote_email_events')
            .insert({
              quote_id: quote.quote_id,
              event_type: 'sent',
              event_data: {
                type: 'followup',
                reminder_number: quote.reminder_count + 1,
              },
            });

          console.log(`✅ Follow-up sent for ${quote.quote_number} (reminder #${quote.reminder_count + 1})`);
          results.followups_sent++;

        } catch (quoteError) {
          console.error(`❌ Error processing ${quote.quote_number}:`, quoteError);
          results.followup_errors++;
        }
      }
    } else {
      console.log('✅ No quotes need follow-up at this time');
    }

    // ========================================================================
    // PART 2: Process Expiry Notifications (to electricians)
    // ========================================================================
    console.log('\n⏰ Checking for quotes expiring soon...');

    const { data: expiringQuotes, error: expiryError } = await supabase
      .rpc('get_quotes_expiring_soon', {
        days_until_expiry: FOLLOWUP_CONFIG.DAYS_BEFORE_EXPIRY_NOTIFICATION,
      });

    if (expiryError) {
      console.error('❌ Error fetching expiring quotes:', expiryError);
    } else if (expiringQuotes && expiringQuotes.length > 0) {
      console.log(`📋 Found ${expiringQuotes.length} quotes expiring soon`);

      for (const quote of expiringQuotes as ExpiringQuote[]) {
        try {
          console.log(`\n⏰ Processing expiry notification for ${quote.quote_number}...`);

          // Create in-app notification for electrician
          await supabase.from('ojt_notifications').insert({
            user_id: quote.user_id,
            type: 'quote_expiring',
            title: `Quote ${quote.quote_number} Expiring Soon`,
            message: `Your quote for ${quote.client_name} (${formatCurrency(quote.total)}) expires on ${formatDate(quote.expiry_date)}. Consider following up with the client.`,
            data: {
              quote_id: quote.quote_id,
              quote_number: quote.quote_number,
              client_name: quote.client_name,
              total: quote.total,
              expiry_date: quote.expiry_date,
            },
            priority: 'high',
            is_read: false,
          });

          // Mark as notified
          await supabase
            .from('quotes')
            .update({
              expiry_notification_sent: true,
              updated_at: new Date().toISOString(),
            })
            .eq('id', quote.quote_id);

          console.log(`✅ Expiry notification sent for ${quote.quote_number}`);
          results.expiry_notifications++;

        } catch (notifyError) {
          console.error(`❌ Error notifying for ${quote.quote_number}:`, notifyError);
          results.expiry_errors++;
        }
      }
    } else {
      console.log('✅ No quotes expiring soon');
    }

    // ========================================================================
    // RETURN RESULTS
    // ========================================================================
    const duration = Date.now() - startTime;
    console.log(`\n✅ Automated follow-up complete in ${duration}ms`);
    console.log(`   Follow-ups sent: ${results.followups_sent}`);
    console.log(`   Follow-up errors: ${results.followup_errors}`);
    console.log(`   Expiry notifications: ${results.expiry_notifications}`);
    console.log(`   Expiry errors: ${results.expiry_errors}`);

    return new Response(
      JSON.stringify({
        success: true,
        results,
        duration: `${duration}ms`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);
    await captureException(error, { functionName: 'quote-automated-followup', requestUrl: req.url, requestMethod: req.method });

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to process automated follow-ups',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
