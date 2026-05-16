import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { renderEmailShell } from '../_shared/email-template.ts';
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
 * From:  "Company Name <noreply@elec-mate.com>" (DMARC-aligned); Reply-To is the user's company email
 *
 * The agent is responsible for the FULL email body including greeting and sign-off.
 * The template provides branded framing only — no injected greetings or sign-offs.
 */

/** Convert the agent's plain-text body into HTML paragraphs that match
 *  the shared body style (15px slate-700, 1.65 line-height). */
function agentBodyToHtml(text: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return text
    .split(/\n\n+/)
    .map((para) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#334155;">${escape(para).replace(/\n/g, '<br>')}</p>`)
    .join('');
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
      .select('*')
      .eq('user_id', user.id)
      .single();

    const companyName = profile?.company_name || 'Elec-Mate';
    // ELE-662 — centralised sender. See _shared/mailer.ts:clientFacingSender.
    const sender = clientFacingSender({
      companyName,
      companyEmail: profile?.company_email,
      userEmail: user.email,
    });

    // ── Build HTML using shared shell. Agent owns the body in full
    //    (greeting + sign-off included), so we insert it as a raw row
    //    via the card slot to avoid the shell's <p> wrapper, and pass
    //    an empty signoff so the shell doesn't append its default. ──
    const preheader = emailBody.replace(/\s+/g, ' ').slice(0, 120);
    const agentBodyRow = `<tr><td style="padding:24px 36px 28px;">${agentBodyToHtml(emailBody)}</td></tr>`;
    const html = renderEmailShell({
      subject,
      preheader,
      company: {
        name: companyName,
        logoUrl: profile?.logo_url || profile?.logo_data_url || null,
        primaryColor: profile?.primary_color || null,
        email: profile?.company_email || null,
        phone: profile?.company_phone || null,
        website: profile?.company_website || null,
        address: profile?.company_address || null,
        vatNumber: profile?.vat_number || null,
        registrationNumber: profile?.company_registration || null,
      },
      card: agentBodyRow,
      signoff: '',
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
      replyTo?: string;
      to: string[];
      subject: string;
      html: string;
      text?: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      ...sender,
      to: [to.trim()],
      subject,
      html,
      text: htmlToPlainText(html),
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
