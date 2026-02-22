/**
 * Scope Signed Webhook
 * Sends a notification email to the electrician when a client signs the scope remotely.
 * No auth required — client has no session. Uses SUPABASE_SERVICE_ROLE_KEY.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface ScopeSignedRequest {
  scopeShareLinkId: string;
  shareToken: string;
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
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not configured');
      throw new Error('Email service not configured.');
    }

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('❌ Supabase environment variables missing');
      throw new Error('Database service not configured.');
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // ========================================================================
    // STEP 2: Parse request
    // ========================================================================
    let body: ScopeSignedRequest;
    try {
      body = await req.json();
    } catch {
      throw new Error('Invalid request format.');
    }

    const { scopeShareLinkId, shareToken } = body;

    if (!scopeShareLinkId || !shareToken) {
      throw new Error('scopeShareLinkId and shareToken are required.');
    }

    console.log('📧 Scope signed webhook for link:', scopeShareLinkId);

    // ========================================================================
    // STEP 3: Fetch and verify scope share link
    // ========================================================================
    const { data: scopeLink, error: scopeError } = await supabase
      .from('scope_share_links')
      .select('*')
      .eq('id', scopeShareLinkId)
      .single();

    if (scopeError || !scopeLink) {
      console.error('❌ Scope link not found:', scopeError);
      throw new Error('Scope share link not found.');
    }

    // Verify token match and signed status
    if (scopeLink.share_token !== shareToken) {
      console.error('❌ Token mismatch');
      throw new Error('Invalid share token.');
    }

    if (scopeLink.status !== 'signed') {
      console.warn('⚠️ Scope not in signed status:', scopeLink.status);
      // Non-fatal — still return success since signing may have already been processed
      return new Response(
        JSON.stringify({ success: true, skipped: true }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Scope link verified, status: signed');

    // ========================================================================
    // STEP 4: Fetch electrician's email from auth.users
    // ========================================================================
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(
      scopeLink.user_id
    );

    if (authError || !authUser?.user?.email) {
      console.error('❌ Could not fetch electrician email:', authError);
      throw new Error('Could not find electrician email.');
    }

    const electricianEmail = authUser.user.email;
    console.log('✅ Electrician email:', electricianEmail);

    // ========================================================================
    // STEP 5: Build notification data
    // ========================================================================
    const scopeData = scopeLink.scope_data as Record<string, any> | null;
    const clientName = scopeLink.client_name || scopeData?.customerName || 'Client';
    const propertyAddress = scopeData?.propertyAddress || 'the property';
    const siteVisitId = scopeLink.site_visit_id;

    const appUrl = siteVisitId
      ? `https://www.elec-mate.com/site-visits/${siteVisitId}`
      : 'https://www.elec-mate.com/site-visits';

    // ========================================================================
    // STEP 6: Build notification email
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
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 480px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(16, 185, 129, 0.2);">

                <!-- Success icon -->
                <tr>
                  <td align="center" style="padding: 48px 32px 24px 32px;">
                    <span style="font-size: 64px; line-height: 1;">✅</span>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td align="center" style="padding: 0 32px 12px 32px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.3;">Scope Signed</h1>
                  </td>
                </tr>

                <!-- Details -->
                <tr>
                  <td style="padding: 0 32px 32px 32px;">
                    <p style="margin: 0; font-size: 16px; color: #94a3b8; line-height: 1.7;"><strong style="color: #e2e8f0;">${clientName}</strong> has signed the scope of works for <strong style="color: #e2e8f0;">${propertyAddress}</strong>.</p>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding: 0 32px 40px 32px;">
                    <a href="${appUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%); color: #000000; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 48px; border-radius: 12px;">View in Elec-Mate</a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 32px; border-top: 1px solid rgba(148, 163, 184, 0.1);">
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
    // STEP 7: Send via Resend
    // ========================================================================
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elec-Mate <noreply@elec-mate.com>',
        to: electricianEmail,
        subject: `Scope Signed — ${propertyAddress}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resend API error:', errorText);
      // Non-fatal: signing is already saved, notification is best-effort
      return new Response(
        JSON.stringify({ success: true, emailSent: false, reason: 'Resend API error' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await response.json();
    console.log(`✅ Signing notification sent to ${electricianEmail} | Resend ID: ${result.id}`);

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('❌ scope-signed-webhook error:', error);
    // Non-fatal — always return 200 so the client signing flow isn't disrupted
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal server error' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
