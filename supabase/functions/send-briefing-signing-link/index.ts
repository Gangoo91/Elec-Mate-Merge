import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';
import {
  buildBriefingSignOffEmail,
  type BriefingRiskLevel,
} from '../_shared/email-templates/briefing-sign-off.ts';
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

    console.log(
      `Sending briefing signing link to ${recipientEmail} for "${briefing.briefing_name}"`
    );

    // Translate hazard slugs into display labels for the email.
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
    const hazardDisplay = ((briefing.identified_hazards || []) as string[]).map(
      (h) => hazardLabels[h] || h.replace(/^custom-/, '').replace(/-/g, ' ')
    );

    const briefingPayload = buildBriefingSignOffEmail({
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
      recipientName: null,
      briefingName: briefing.briefing_name,
      location: briefing.location || null,
      briefingDate: briefing.briefing_date || null,
      briefingTime: briefing.briefing_time || null,
      presentedBy: briefing.created_by_name || 'Team Lead',
      hazards: hazardDisplay,
      riskLevel: (briefing.risk_level || 'medium') as BriefingRiskLevel,
      signingUrl,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=briefing_sign_off&id=${briefingId}`,
    });
    const emailBody = briefingPayload.html;

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
    const emailSubject = briefingPayload.subject;
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
