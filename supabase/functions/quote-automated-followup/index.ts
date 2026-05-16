import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildQuoteReminderEmail } from '../_shared/email-templates/quote-reminder.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Configuration for follow-up timing
const FOLLOWUP_CONFIG = {
  FIRST_REMINDER_DAYS: 3, // Days to wait before first reminder
  SECOND_REMINDER_DAYS: 7, // Days to wait before second reminder
  MAX_REMINDERS: 2, // Maximum number of reminders to send
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

    const { data: followupQuotes, error: followupError } = await supabase.rpc(
      'get_quotes_needing_followup',
      {
        first_reminder_days: FOLLOWUP_CONFIG.FIRST_REMINDER_DAYS,
        second_reminder_days: FOLLOWUP_CONFIG.SECOND_REMINDER_DAYS,
        max_reminders: FOLLOWUP_CONFIG.MAX_REMINDERS,
      }
    );

    if (followupError) {
      console.error('Error fetching follow-up quotes:', followupError);
    } else if (followupQuotes && followupQuotes.length > 0) {
      console.log(`Found ${followupQuotes.length} quotes needing follow-up`);

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
            console.log(`No public token for ${quote.quote_number}, skipping`);
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

          // Build and send email via shared quote-reminder template.
          // reminder_count 0 (first chase) → gentle, 1+ → firm.
          const tone = quote.reminder_count >= 1 ? 'firm' : 'gentle';
          const followupPayload = buildQuoteReminderEmail({
            company: {
              name: companyName,
              logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
              primaryColor: companyProfile?.primary_color || null,
              email: companyProfile?.company_email || null,
              phone: companyProfile?.company_phone || null,
              website: companyProfile?.company_website || null,
              address: companyProfile?.company_address || null,
              vatNumber: companyProfile?.vat_number || null,
              registrationNumber: companyProfile?.company_registration || null,
            },
            clientName: quote.client_name || 'there',
            quoteNumber: quote.quote_number,
            total: Number(quote.total) || 0,
            expiryDate: fullQuote?.expiry_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            acceptUrl,
            tone,
          });
          const emailHtml = followupPayload.html;
          const subject = followupPayload.subject;
          // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
          const sender = clientFacingSender({
            companyName,
            companyEmail: companyProfile?.company_email,
          });

          const { error: emailError } = await resend.emails.send({
            ...sender,
            to: [quote.client_email],
            subject: subject,
            html: emailHtml,
            text: htmlToPlainText(emailHtml),
          });

          if (emailError) {
            console.error(`Failed to send follow-up for ${quote.quote_number}:`, emailError);
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
          await supabase.from('quote_email_events').insert({
            quote_id: quote.quote_id,
            event_type: 'sent',
            event_data: {
              type: 'followup',
              reminder_number: quote.reminder_count + 1,
            },
          });

          console.log(
            `Follow-up sent for ${quote.quote_number} (reminder #${quote.reminder_count + 1})`
          );
          results.followups_sent++;
        } catch (quoteError) {
          console.error(`Error processing ${quote.quote_number}:`, quoteError);
          results.followup_errors++;
        }
      }
    } else {
      console.log('No quotes need follow-up at this time');
    }

    // ========================================================================
    // PART 2: Process Expiry Notifications (to electricians)
    // ========================================================================
    console.log('\nChecking for quotes expiring soon...');

    const { data: expiringQuotes, error: expiryError } = await supabase.rpc(
      'get_quotes_expiring_soon',
      {
        days_until_expiry: FOLLOWUP_CONFIG.DAYS_BEFORE_EXPIRY_NOTIFICATION,
      }
    );

    if (expiryError) {
      console.error('Error fetching expiring quotes:', expiryError);
    } else if (expiringQuotes && expiringQuotes.length > 0) {
      console.log(`Found ${expiringQuotes.length} quotes expiring soon`);

      for (const quote of expiringQuotes as ExpiringQuote[]) {
        try {
          console.log(`\nProcessing expiry notification for ${quote.quote_number}...`);

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

          console.log(`Expiry notification sent for ${quote.quote_number}`);
          results.expiry_notifications++;
        } catch (notifyError) {
          console.error(`Error notifying for ${quote.quote_number}:`, notifyError);
          results.expiry_errors++;
        }
      }
    } else {
      console.log('No quotes expiring soon');
    }

    // ========================================================================
    // RETURN RESULTS
    // ========================================================================
    const duration = Date.now() - startTime;
    console.log(`\nAutomated follow-up complete in ${duration}ms`);
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
    console.error(`Error after ${duration}ms:`, error);
    await captureException(error, {
      functionName: 'quote-automated-followup',
      requestUrl: req.url,
      requestMethod: req.method,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=quote_reminder&id=${quote.quote_id}`,
    });

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to process automated follow-ups',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
