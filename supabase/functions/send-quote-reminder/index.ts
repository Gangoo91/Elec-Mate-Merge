import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import {
  buildQuoteReminderEmail,
  type ReminderTone,
} from '../_shared/email-templates/quote-reminder.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface QuoteReminderRequest {
  quoteId: string;
  reminderType?: ReminderTone;
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
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(jwt);

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
    const acceptUrl = `https://elec-mate.com/public-quote/${publicToken}#accept`;

    // Build and send email
    const resend = new Resend(resendApiKey);

    const jobDetails = safeJsonParse(quote.job_details, {});
    const reminderPayload = buildQuoteReminderEmail({
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
      clientName,
      quoteNumber: quote.quote_number,
      total: parseFloat(quote.total) || 0,
      expiryDate: quote.expiry_date,
      acceptUrl,
      tone: reminderType,
      jobTitle: jobDetails?.title || null,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=quote_reminder&id=${quoteId}`,
    });
    const emailHtml = reminderPayload.html;
    const subject = reminderPayload.subject;
    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName,
      companyEmail: companyProfile?.company_email,
      userEmail: user.email,
    });

    const { data: emailData, error: emailError } = await resend.emails.send({
      ...sender,
      to: [clientEmail],
      subject: subject,
      html: emailHtml,
      text: htmlToPlainText(emailHtml),
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
    await supabase.from('quote_email_events').insert({
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
