/**
 * Send Scope Email via Resend
 * Sends a branded email to the client with a link to review and sign the scope of works.
 * Requires electrician's JWT for auth.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildScopeSendEmail } from '../_shared/email-templates/scope-send.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface ScopeEmailRequest {
  scopeShareLinkId: string;
  clientEmail: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ========================================================================
    // STEP 1: Validate environment
    // ========================================================================
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not configured');
      throw new Error('Email service not configured.');
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase environment variables missing');
      throw new Error('Database service not configured.');
    }

    // ========================================================================
    // STEP 2: Authenticate user
    // ========================================================================
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Please log in to send scope emails.');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(jwt);

    if (userError || !user) {
      console.error('❌ Auth error:', userError);
      throw new Error('Session expired. Please log in again.');
    }

    console.log('✅ User authenticated:', user.id);

    // ========================================================================
    // STEP 3: Parse request
    // ========================================================================
    let body: ScopeEmailRequest;
    try {
      body = await req.json();
    } catch {
      throw new Error('Invalid request format.');
    }

    const { scopeShareLinkId, clientEmail } = body;

    if (!scopeShareLinkId || typeof scopeShareLinkId !== 'string') {
      throw new Error('Scope share link ID is required.');
    }

    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      throw new Error('A valid client email address is required.');
    }

    console.log('📧 Sending scope email for link:', scopeShareLinkId);

    // ========================================================================
    // STEP 4: Fetch scope share link (verify ownership)
    // ========================================================================
    const { data: scopeLink, error: scopeError } = await supabaseClient
      .from('scope_share_links')
      .select('*')
      .eq('id', scopeShareLinkId)
      .eq('user_id', user.id)
      .single();

    if (scopeError || !scopeLink) {
      console.error('❌ Scope link fetch error:', scopeError);
      throw new Error('Scope share link not found or you do not have permission.');
    }

    console.log('✅ Scope link fetched:', scopeLink.share_token);

    // ========================================================================
    // STEP 5: Fetch full company profile for shared template
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'Your Electrician';
    const companyEmail = companyProfile?.company_email || companyProfile?.email || '';

    console.log('✅ Company:', companyName);

    // ========================================================================
    // STEP 6: Build scope data + email payload
    // ========================================================================
    const scopeData = scopeLink.scope_data as Record<string, unknown> | null;
    const clientName = scopeLink.client_name || (scopeData?.customerName as string) || 'Client';
    const propertyAddress = (scopeData?.propertyAddress as string) || 'your property';
    const rooms = (scopeData?.rooms as Array<{ items?: unknown[] }>) || [];
    const roomCount = rooms.length;
    const itemCount = rooms.reduce(
      (sum: number, r: { items?: unknown[] }) => sum + (r.items?.length || 0),
      0
    );
    const scopeSummary = roomCount > 0 ? `${roomCount} room${roomCount === 1 ? '' : 's'} · ${itemCount} item${itemCount === 1 ? '' : 's'}` : null;

    const scopeUrl = `https://www.elec-mate.com/scope/${scopeLink.share_token}`;

    const scopePayload = buildScopeSendEmail({
      company: {
        name: companyName,
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyEmail || null,
        phone: companyProfile?.company_phone || companyProfile?.phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      clientName,
      propertyAddress,
      scopeSummary,
      signUrl: scopeUrl,
      scopeReference: scopeLink.share_token?.slice(0, 8).toUpperCase() || null,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=scope_send&id=${scopeShareLinkId}`,
    });
    const html = scopePayload.html;

    // ========================================================================
    // STEP 9: Send via Brevo (the shared mailer shim, not Resend's REST API
    // directly — Resend banned elec-mate.com at domain level, ELE-765).
    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    // ========================================================================
    const sender = clientFacingSender({
      companyName,
      companyEmail,
      userEmail: user.email,
    });

    const resend = new Resend(resendApiKey);
    const { data: emailData, error: emailError } = await resend.emails.send({
      ...sender,
      to: clientEmail.trim(),
      subject: scopePayload.subject,
      html,
      text: htmlToPlainText(html),
    });

    if (emailError) {
      console.error('❌ Brevo send error:', emailError);
      throw new Error('Failed to send email. Please try again.');
    }

    console.log(`✅ Scope email sent to ${clientEmail} | id: ${emailData?.id}`);

    return new Response(JSON.stringify({ success: true, emailId: emailData?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('❌ send-scope-email error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
