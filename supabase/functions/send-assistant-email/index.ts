import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

/**
 * Sends an email drafted by the Business Assistant via Brevo. The user
 * has already previewed it and tapped Send — we trust the body. We still
 * record the send in `assistant_messages` (audit trail).
 */
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!BREVO_API_KEY) {
      return new Response(JSON.stringify({ error: 'BREVO_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      to,
      toName,
      subject,
      body,
      replyToEmail,
      replyToName,
      conversationId,
      userId,
    } = await req.json();

    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({ error: 'to, subject and body required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch the sender's name from their profile for the from-line.
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let senderName = 'Elec-Mate';
    let senderEmail = replyToEmail;
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, business_name, contact_email')
        .eq('id', userId)
        .maybeSingle();
      if (profile) {
        senderName =
          replyToName ||
          profile.business_name ||
          profile.full_name ||
          senderName;
        senderEmail = replyToEmail || profile.contact_email || senderEmail;
      }
    }

    // Convert plain-text body to simple HTML (preserve line breaks).
    const htmlBody = body
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    const brevoBody: Record<string, unknown> = {
      sender: { name: senderName, email: 'noreply@elec-mate.com' },
      to: [{ email: to, name: toName || undefined }],
      subject,
      htmlContent: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;color:#111;">${htmlBody}</div>`,
      textContent: body,
    };
    if (senderEmail) {
      brevoBody.replyTo = { email: senderEmail, name: senderName };
    }

    const brevoRes = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(brevoBody),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error('[send-assistant-email] Brevo error', brevoRes.status, errText);
      return new Response(
        JSON.stringify({ error: `Brevo ${brevoRes.status}: ${errText}` }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await brevoRes.json();
    const messageId = result?.messageId;

    // Audit trail — record on the conversation if we have one.
    if (conversationId && userId) {
      await supabase.from('assistant_messages').insert({
        conversation_id: conversationId,
        user_id: userId,
        role: 'assistant',
        content: `Email sent to ${toName || to}: "${subject}"`,
        actions: null,
      });
    }

    return new Response(
      JSON.stringify({ success: true, messageId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    await captureException(err, { functionName: 'send-assistant-email', requestUrl: req.url, requestMethod: req.method });
    console.error('[send-assistant-email] error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'unknown' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
