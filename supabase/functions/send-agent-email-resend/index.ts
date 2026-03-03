import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from 'npm:resend@2.0.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/**
 * General-purpose agent email sender via Resend.
 * Used by Mate to email clients to book jobs, send PDFs, reminders, etc.
 *
 * Takes: { to, subject, body, clientName?, attachmentUrl? }
 * Auth: JWT verified via supabase.auth.getUser()
 * From: "Company Name <founder@elec-mate.com>" — reply-to is the user's company email
 */
const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ── Validate environment ────────────────────────────────────────
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!resendApiKey) throw new Error('Email service not configured');
    if (!supabaseUrl || !supabaseAnonKey) throw new Error('Database service not configured');

    // ── Authenticate user ───────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Unauthorised');

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(jwt);
    if (userError || !user) throw new Error('Session expired');

    // ── Parse request ───────────────────────────────────────────────
    const body = await req.json();
    const { to, subject, body: emailBody, clientName, attachmentUrl } = body;

    if (!to || typeof to !== 'string') throw new Error('Recipient email (to) is required');
    if (!subject || typeof subject !== 'string') throw new Error('Email subject is required');
    if (!emailBody || typeof emailBody !== 'string') throw new Error('Email body is required');

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) {
      throw new Error(`Invalid email address: ${to}`);
    }

    // ── Fetch company profile for branding ──────────────────────────
    const { data: companyProfile } = await supabaseClient
      .from('company_profiles')
      .select('company_name, company_email, company_phone, logo_url')
      .eq('user_id', user.id)
      .single();

    const companyName = companyProfile?.company_name || 'ElecMate';
    const replyTo = companyProfile?.company_email || user.email || 'info@elec-mate.com';


    // ── Build email HTML ────────────────────────────────────────────
    const recipientName = clientName || 'there';
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #FFD700; font-size: 22px; font-weight: 700;">${companyName}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px 24px;">
              <p style="margin: 0 0 16px; font-size: 16px; color: #374151;">Hi ${recipientName},</p>
              <div style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151; white-space: pre-wrap;">${emailBody}</div>
              <p style="margin: 24px 0 0; font-size: 16px; color: #374151;">Kind regards,</p>
              <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #1f2937;">${companyName}</p>
              ${companyProfile?.company_phone ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">${companyProfile.company_phone}</p>` : ''}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background: #1a1a1a; padding: 20px 24px; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">Sent via ElecMate</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // ── Handle attachment (optional) ────────────────────────────────
    const attachments: Array<{ filename: string; content: string }> = [];

    if (attachmentUrl && typeof attachmentUrl === 'string') {
      try {
        const attachRes = await fetch(attachmentUrl);
        if (attachRes.ok) {
          const arrayBuffer = await attachRes.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          let binary = '';
          const chunkSize = 0x8000;
          for (let i = 0; i < uint8Array.length; i += chunkSize) {
            const chunk = uint8Array.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          attachments.push({
            filename: body.attachmentFilename || 'document.pdf',
            content: btoa(binary),
          });
        }
      } catch (attachErr) {
        console.warn('Attachment download failed, sending without:', attachErr);
      }
    }

    // ── Send via Resend ─────────────────────────────────────────────
    const resend = new Resend(resendApiKey);

    const emailOptions: {
      from: string;
      reply_to: string;
      to: string[];
      subject: string;
      html: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      from: `${companyName} <founder@elec-mate.com>`,
      reply_to: replyTo,
      to: [to.trim()],
      subject,
      html,
    };

    if (attachments.length > 0) {
      emailOptions.attachments = attachments;
    }

    const { data: emailData, error: emailError } = await resend.emails.send(emailOptions);

    if (emailError) {
      throw new Error(`Resend error: ${emailError.message || 'Unknown'}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailId: emailData?.id,
        to: to.trim(),
        subject,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('send-agent-email-resend error:', error);

    await captureException(error instanceof Error ? error : new Error(String(error)), {
      functionName: 'send-agent-email-resend',
      requestUrl: req.url,
      requestMethod: req.method,
    });

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to send email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
