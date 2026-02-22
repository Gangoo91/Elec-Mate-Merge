/**
 * Send Scope Email via Resend
 * Sends a branded email to the client with a link to review and sign the scope of works.
 * Requires electrician's JWT for auth.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
    // STEP 5: Fetch company profile for branding
    // ========================================================================
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('company_name, company_email, email, phone')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'Your Electrician';
    const companyEmail = companyProfile?.company_email || companyProfile?.email || '';
    const companyPhone = companyProfile?.phone || '';

    console.log('✅ Company:', companyName);

    // ========================================================================
    // STEP 6: Fetch electrician's name from profiles
    // ========================================================================
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    const electricianName = profile?.full_name || companyName;

    // ========================================================================
    // STEP 7: Build scope data for email
    // ========================================================================
    const scopeData = scopeLink.scope_data as Record<string, any> | null;
    const clientName = scopeLink.client_name || scopeData?.customerName || 'Client';
    const propertyAddress = scopeData?.propertyAddress || 'your property';
    const rooms = (scopeData?.rooms as any[]) || [];
    const roomCount = rooms.length;
    const itemCount = rooms.reduce(
      (sum: number, r: any) => sum + (r.items?.length || 0),
      0
    );

    const scopeUrl = `https://www.elec-mate.com/scope/${scopeLink.share_token}`;

    // ========================================================================
    // STEP 8: Build branded HTML email
    // ========================================================================
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a;">
          <tr>
            <td align="center" style="padding: 48px 16px;">

              <!-- Main Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 480px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(59, 130, 246, 0.2);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%); padding: 32px 32px 28px 32px;">
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">${companyName}</h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.8);">Scope of Works</p>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding: 32px 32px 0 32px;">
                    <p style="margin: 0; font-size: 17px; color: #e2e8f0; line-height: 1.6;">Dear ${clientName},</p>
                    <p style="margin: 16px 0 0 0; font-size: 15px; color: #94a3b8; line-height: 1.7;">${electricianName} from ${companyName} has prepared a scope of works for <strong style="color: #e2e8f0;">${propertyAddress}</strong>.</p>
                  </td>
                </tr>

                <!-- Scope summary card -->
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(59, 130, 246, 0.08); border-radius: 16px; border: 1px solid rgba(59, 130, 246, 0.15);">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #60a5fa; text-transform: uppercase; letter-spacing: 1px;">Scope Summary</p>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="padding: 4px 0;">
                                <span style="font-size: 14px; color: #94a3b8;">Address:</span>
                              </td>
                              <td align="right" style="padding: 4px 0;">
                                <span style="font-size: 14px; color: #e2e8f0; font-weight: 500;">${propertyAddress}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 4px 0;">
                                <span style="font-size: 14px; color: #94a3b8;">Rooms:</span>
                              </td>
                              <td align="right" style="padding: 4px 0;">
                                <span style="font-size: 14px; color: #e2e8f0; font-weight: 500;">${roomCount}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 4px 0;">
                                <span style="font-size: 14px; color: #94a3b8;">Items:</span>
                              </td>
                              <td align="right" style="padding: 4px 0;">
                                <span style="font-size: 14px; color: #e2e8f0; font-weight: 500;">${itemCount}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding: 8px 32px 32px 32px;">
                    <a href="${scopeUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 48px; border-radius: 12px;">Review &amp; Sign Scope</a>
                  </td>
                </tr>

                <!-- Info text -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.6; text-align: center;">Please review the full scope of works at the link above. You can sign it electronically once you are satisfied.</p>
                  </td>
                </tr>

                <!-- Company contact footer -->
                <tr>
                  <td style="padding: 24px 32px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
                    ${companyEmail ? `<p style="margin: 0 0 4px 0; font-size: 13px; color: #64748b; text-align: center;">${companyEmail}</p>` : ''}
                    ${companyPhone ? `<p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b; text-align: center;">${companyPhone}</p>` : ''}
                    <p style="margin: 0; font-size: 12px; color: #475569; text-align: center;">Powered by ElecMate</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // ========================================================================
    // STEP 9: Send via Resend
    // ========================================================================
    const emailPayload: Record<string, any> = {
      from: `${companyName} <founder@elec-mate.com>`,
      to: clientEmail.trim(),
      subject: `Scope of Works — ${propertyAddress}`,
      html,
    };

    if (companyEmail) {
      emailPayload.reply_to = companyEmail;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resend API error:', errorText);
      throw new Error('Failed to send email. Please try again.');
    }

    const result = await response.json();
    console.log(`✅ Scope email sent to ${clientEmail} | Resend ID: ${result.id}`);

    return new Response(
      JSON.stringify({ success: true, emailId: result.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ send-scope-email error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
