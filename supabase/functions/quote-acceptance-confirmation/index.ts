/**
 * Quote Acceptance Confirmation Email
 * Sends a thank you email to clients after they accept a quote
 * Sends FROM the electrician's company (like other quote emails)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildQuoteAcceptanceEmail } from '../_shared/email-templates/quote-acceptance.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quoteId, quoteNumber, clientEmail, clientName, total } = await req.json();

    if (!clientEmail || !quoteNumber) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase to fetch company profile
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    // Fetch quote + full company profile so the email matches the shared
    // design system (logo, primary colour, address, VAT, registration).
    let companyProfile: any = null;
    let publicToken: string | null = null;

    if (quoteId) {
      const { data: quote } = await supabase
        .from('quotes')
        .select('user_id, public_token')
        .eq('id', quoteId)
        .single();

      if (quote?.user_id) {
        const { data: company } = await supabase
          .from('company_profiles')
          .select('*')
          .eq('user_id', quote.user_id)
          .single();
        companyProfile = company || null;
      }

      publicToken = (quote as any)?.public_token || null;
    }

    const companyName = companyProfile?.company_name || 'Your Electrician';
    const companyEmail = companyProfile?.company_email || companyProfile?.email || null;

    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName,
      companyEmail,
    });

    const acceptancePayload = buildQuoteAcceptanceEmail({
      company: {
        name: companyName,
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyEmail,
        phone: companyProfile?.company_phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      acceptedByName: clientName || 'there',
      quoteNumber,
      total: Number(total) || 0,
      acceptedAt: new Date().toISOString(),
      viewQuoteUrl: publicToken ? `https://www.elec-mate.com/public-quote/${publicToken}` : null,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=quote_acceptance&id=${quoteId}`,
    });
    const html = acceptancePayload.html;

    // ELE-662 — migrated from direct Resend fetch to Brevo via mailer shim.
    const resend = new Resend(resendApiKey);
    const { data: result, error: emailError } = await resend.emails.send({
      ...sender,
      to: clientEmail,
      subject: acceptancePayload.subject,
      html: html,
      text: htmlToPlainText(html),
    });

    if (emailError) {
      console.error('Email send error:', emailError);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: emailError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(
      `✅ Acceptance confirmation sent to ${clientEmail} for quote ${quoteNumber} from ${companyName}`
    );

    return new Response(JSON.stringify({ success: true, messageId: result?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Quote acceptance confirmation error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
