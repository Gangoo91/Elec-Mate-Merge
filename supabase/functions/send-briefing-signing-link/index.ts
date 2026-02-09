import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    console.log('Starting briefing signing link email...');

    const { briefingId, recipientEmail, signingUrl } = await req.json();

    if (!briefingId || !recipientEmail || !signingUrl) {
      throw new Error('Missing briefingId, recipientEmail, or signingUrl');
    }

    // Auth check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Supabase clients
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') as string, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user
    const {
      data: { user },
    } = await userSupabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Fetch briefing
    const { data: briefing, error: briefingError } = await userSupabase
      .from('team_briefings')
      .select('*')
      .eq('id', briefingId)
      .single();

    if (briefingError || !briefing) {
      throw new Error('Briefing not found');
    }

    // Fetch company profile for branding
    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'Elec-Mate';
    const senderEmail = (
      companyProfile?.company_email ||
      user.email ||
      'noreply@elec-mate.com'
    ).trim();
    const companyPhone = companyProfile?.company_phone || '';

    console.log(
      `Sending briefing signing link to ${recipientEmail} for "${briefing.briefing_name}"`
    );

    // Build hazards list
    const hazards = (briefing.identified_hazards || []) as string[];
    const hazardLabels: Record<string, string> = {
      electrical: 'Electrical',
      fire: 'Fire',
      heights: 'Heights',
      'falling-objects': 'Falling Objects',
      'confined-space': 'Confined Space',
      'manual-handling': 'Manual Handling',
      'hazardous-substances': 'Hazardous Substances',
      noise: 'Noise',
      'wet-slippery': 'Wet/Slippery',
      vehicles: 'Vehicles',
      machinery: 'Machinery',
      asbestos: 'Asbestos',
    };

    const hazardPills = hazards
      .map((h) => hazardLabels[h] || h.replace(/^custom-/, '').replace(/-/g, ' '))
      .map(
        (label) =>
          `<span style="display:inline-block;padding:4px 12px;background:#fef3c7;color:#92400e;border-radius:20px;font-size:12px;font-weight:600;margin:2px 4px 2px 0;">${label}</span>`
      )
      .join('');

    const riskLevel = briefing.risk_level || 'medium';
    const riskColour =
      riskLevel === 'high' ? '#ef4444' : riskLevel === 'medium' ? '#f59e0b' : '#10b981';
    const riskLabel = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);

    const briefingDate = briefing.briefing_date || '';
    const briefingTime = briefing.briefing_time || '';

    // Email HTML
    const emailBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Team Briefing</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background-color:#f3f4f6;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f3f4f6;">
    <tr>
      <td style="padding:40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:28px 32px;">
              <span style="color:#fbbf24;font-size:17px;font-weight:700;letter-spacing:0.3px;">&#9889; ${companyName}</span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Team Briefing</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#0f172a;line-height:1.3;">${briefing.briefing_name}</h1>
            </td>
          </tr>

          <!-- Risk Badge -->
          <tr>
            <td style="padding:12px 32px 0;">
              <span style="display:inline-block;padding:5px 14px;background:${riskColour}15;color:${riskColour};border:1px solid ${riskColour}40;border-radius:8px;font-size:12px;font-weight:700;">&#9888; ${riskLabel} Risk</span>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:24px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:16px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Location</p>
                    <p style="margin:0 0 16px;font-size:14px;color:#1f2937;">${briefing.location}</p>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Presented By</p>
                    <p style="margin:0;font-size:14px;color:#1f2937;">${briefing.created_by_name || 'Team Lead'}</p>
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:16px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Date</p>
                    <p style="margin:0 0 16px;font-size:14px;color:#1f2937;">${briefingDate}</p>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Time</p>
                    <p style="margin:0;font-size:14px;color:#1f2937;">${briefingTime}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            hazardPills
              ? `<!-- Hazards -->
          <tr>
            <td style="padding:0 32px 24px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Identified Hazards</p>
              <div>${hazardPills}</div>
            </td>
          </tr>`
              : ''
          }

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px;background:#e5e7eb;"></div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#374151;">You are required to read and sign this team briefing. Please tap the button below to review the briefing details and provide your signature.</p>
              <a href="${signingUrl}" style="display:block;padding:16px 24px;background:#10b981;color:#ffffff;text-align:center;text-decoration:none;font-size:16px;font-weight:700;border-radius:10px;">&#9998; Sign This Briefing</a>
              <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;text-align:center;">No login required. Opens in your browser.</p>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="margin:0 0 4px;font-size:14px;color:#374151;">Kind regards,</p>
              <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#0f172a;">${companyName}</p>
              ${companyPhone ? `<p style="margin:0;font-size:13px;color:#6b7280;">${companyPhone}</p>` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">Powered by <span style="font-weight:600;color:#374151;">Elec-Mate</span> | Secure Digital Briefing Sign-Off</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Gmail credentials
    const sanitise = (v: string) => v.trim().replace(/^['"]|['"]$/g, '');
    const gmailClientId = sanitise(Deno.env.get('GMAIL_CLIENT_ID') ?? '');
    const gmailClientSecret = sanitise(Deno.env.get('GMAIL_CLIENT_SECRET') ?? '');
    const gmailRefreshToken = sanitise(Deno.env.get('GMAIL_REFRESH_TOKEN') ?? '');

    if (!gmailClientId || !gmailClientSecret || !gmailRefreshToken) {
      throw new Error('Gmail API not configured');
    }

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: gmailClientId,
        client_secret: gmailClientSecret,
        refresh_token: gmailRefreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Gmail authentication failed');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Build email
    const emailSubject = `Team Briefing: ${briefing.briefing_name} - Please Sign`;
    const boundary = '----=_Part_' + Date.now();

    const emailMessage = [
      `From: ${companyName} <${senderEmail}>`,
      `To: ${recipientEmail}`,
      `Subject: ${emailSubject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      emailBody,
      '',
      `--${boundary}--`,
    ].join('\r\n');

    // Encode for Gmail API
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(emailMessage);
    const encodedMessage = base64Encode(uint8Array)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send via Gmail
    const gmailResponse = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw: encodedMessage }),
      }
    );

    if (!gmailResponse.ok) {
      const errorText = await gmailResponse.text();
      console.error('Gmail API error:', errorText);
      throw new Error('Failed to send email via Gmail API');
    }

    const gmailResult = await gmailResponse.json();
    console.log('Signing email sent successfully:', gmailResult.id);

    return new Response(
      JSON.stringify({
        success: true,
        messageId: gmailResult.id,
        message: 'Signing link sent successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error sending briefing signing email:', error);

    await captureException(error, {
      functionName: 'send-briefing-signing-link',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send signing link email',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
