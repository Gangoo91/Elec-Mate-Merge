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
 * Used by Mate to email clients on behalf of an electrician.
 *
 * Takes: { to, subject, body, clientName?, attachmentUrl?, attachmentFilename? }
 * Auth:  JWT verified via supabase.auth.getUser()
 * From:  "Company Name <founder@elec-mate.com>" — reply-to is the user's company email
 *
 * The agent is responsible for the FULL email body including greeting and sign-off.
 * The template provides branded framing only — no injected greetings or sign-offs.
 */

/** Convert plain text body to HTML paragraphs */
function textToHtml(text: string): string {
  return text
    .split(/\n\n+/)
    .map((para) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#374151;">${para.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** Build the branded HTML email */
function buildEmailHtml(opts: {
  body: string;
  companyName: string;
  logoUrl?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  postcode?: string | null;
}): string {
  const { body, companyName, logoUrl, phone, website, address, postcode } = opts;

  // Header: logo image if available, else company name in yellow
  const headerContent = logoUrl
    ? `<img src="${logoUrl}" alt="${companyName}" style="max-height:60px;max-width:200px;display:block;margin:0 auto;" />`
    : `<h1 style="margin:0;color:#FFC800;font-size:22px;font-weight:700;letter-spacing:-0.3px;">${companyName}</h1>`;

  // Footer details
  const footerParts: string[] = [];
  if (phone) footerParts.push(`<a href="tel:${phone}" style="color:#9ca3af;text-decoration:none;">${phone}</a>`);
  if (website) {
    const displayUrl = website.replace(/^https?:\/\//, '');
    footerParts.push(`<a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:#9ca3af;text-decoration:none;">${displayUrl}</a>`);
  }
  if (address) {
    const fullAddress = [address, postcode].filter(Boolean).join(', ');
    footerParts.push(`<span style="color:#9ca3af;">${fullAddress}</span>`);
  }

  const footerDetails = footerParts.length > 0
    ? `<p style="margin:8px 0 0;font-size:13px;line-height:1.8;">${footerParts.join(' &nbsp;·&nbsp; ')}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f3f4f6;">
    <tr>
      <td style="padding:32px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
          style="max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

          <!-- ── Header ───────────────────────────────── -->
          <tr>
            <td style="background:linear-gradient(135deg,#111111 0%,#1f1f1f 100%);padding:28px 32px;text-align:center;border-bottom:3px solid #FFC800;">
              ${headerContent}
            </td>
          </tr>

          <!-- ── Body ────────────────────────────────── -->
          <tr>
            <td style="background:#ffffff;padding:36px 36px 28px;">
              ${textToHtml(body)}
            </td>
          </tr>

          <!-- ── Divider ──────────────────────────────── -->
          <tr>
            <td style="background:#ffffff;padding:0 36px 28px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#e5e7eb,transparent);"></div>
            </td>
          </tr>

          <!-- ── Footer ──────────────────────────────── -->
          <tr>
            <td style="background:#111111;padding:24px 32px;text-align:center;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">${companyName}</p>
              ${footerDetails}
              <p style="margin:16px 0 0;font-size:11px;color:#4b5563;letter-spacing:0.5px;text-transform:uppercase;">Sent via Elec-Mate</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ── Validate environment ──────────────────────────────────────
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!resendApiKey) throw new Error('Email service not configured');
    if (!supabaseUrl || !supabaseAnonKey) throw new Error('Database service not configured');

    // ── Authenticate user ─────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Unauthorised');

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const jwt = authHeader.replace('Bearer ', '').trim();
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(jwt);
    if (userError || !user) throw new Error('Session expired');

    // ── Parse request ─────────────────────────────────────────────
    const body = await req.json();
    const { to, subject, body: emailBody, attachmentUrl, attachmentFilename } = body;

    if (!to || typeof to !== 'string') throw new Error('Recipient email (to) is required');
    if (!subject || typeof subject !== 'string') throw new Error('Email subject is required');
    if (!emailBody || typeof emailBody !== 'string') throw new Error('Email body is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) throw new Error(`Invalid email address: ${to}`);

    // ── Fetch company profile ─────────────────────────────────────
    const { data: profile } = await supabaseClient
      .from('company_profiles')
      .select('company_name, company_email, company_phone, company_website, company_address, company_postcode, logo_url, logo_data_url')
      .eq('user_id', user.id)
      .single();

    const companyName = profile?.company_name || 'Elec-Mate';
    const replyTo = profile?.company_email || user.email || 'info@elec-mate.com';
    // Prefer hosted logo URL, fall back to data URL (inline base64)
    const logoUrl = profile?.logo_url || profile?.logo_data_url || null;

    // ── Build HTML ────────────────────────────────────────────────
    const html = buildEmailHtml({
      body: emailBody,
      companyName,
      logoUrl,
      phone: profile?.company_phone || null,
      website: profile?.company_website || null,
      address: profile?.company_address || null,
      postcode: profile?.company_postcode || null,
    });

    // ── Handle optional attachment ────────────────────────────────
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
            binary += String.fromCharCode.apply(null, Array.from(uint8Array.subarray(i, i + chunkSize)));
          }
          attachments.push({
            filename: attachmentFilename || 'document.pdf',
            content: btoa(binary),
          });
        }
      } catch (attachErr) {
        console.warn('Attachment download failed, sending without:', attachErr);
      }
    }

    // ── Send via Resend ───────────────────────────────────────────
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
    if (emailError) throw new Error(`Resend error: ${emailError.message || 'Unknown'}`);

    return new Response(
      JSON.stringify({ success: true, emailId: emailData?.id, to: to.trim(), subject }),
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
