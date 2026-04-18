/**
 * Admin Send Personal Message
 *
 * Sends a personal follow-up email from founder@elec-mate.com to a user
 * whose payment has reached the final dunning stage (emails_sent = 3).
 *
 * Reply-to is set so responses land back in the founder inbox.
 *
 * Auth: JWT → profiles.admin_role check (super_admin or admin)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

const FROM_EMAIL = 'Andrew from Elec-Mate <founder@elec-mate.com>';
const REPLY_TO = 'founder@elec-mate.com';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(bodyText: string, hostedInvoiceUrl: string | null): string {
  const paragraphs = bodyText
    .split(/\n{2,}/)
    .map((p) => escapeHtml(p).replace(/\n/g, '<br>'))
    .map(
      (p) =>
        `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #1f2937;">${p}</p>`
    )
    .join('\n');

  const payButton = hostedInvoiceUrl
    ? `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 8px 0 24px;">
        <tr>
          <td align="center">
            <a href="${hostedInvoiceUrl}" style="display: inline-block; background: #FFD700; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px;">Pay the invoice</a>
          </td>
        </tr>
      </table>`
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A quick note from Elec-Mate</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff;">
    <tr>
      <td style="padding: 24px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 560px; margin: 0 auto;">
          <tr>
            <td style="padding: 0 8px 24px;">
              ${paragraphs}
              ${payButton}
              <p style="margin: 24px 0 4px; font-size: 14px; line-height: 1.6; color: #6b7280;">Just reply to this email — it comes straight to me.</p>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">— Andrew, Elec-Mate</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let step = 'init';

  try {
    step = 'read_auth_header';
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader) throw new Error('No authorization header');

    step = 'create_anon_client';
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    if (!supabaseUrl) throw new Error('SUPABASE_URL not set');
    if (!anonKey) throw new Error('SUPABASE_ANON_KEY not set');
    if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set');

    const supabaseAnon = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    step = 'get_user';
    const {
      data: { user },
      error: userError,
    } = await supabaseAnon.auth.getUser();
    if (userError) throw new Error(`getUser failed: ${userError.message}`);
    if (!user) throw new Error('No user from JWT');

    step = 'service_client';
    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    step = 'check_admin_role';
    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (profileErr) throw new Error(`Profile load failed: ${profileErr.message}`);
    if (!profile?.admin_role) throw new Error(`User ${user.id} has no admin_role`);

    step = 'parse_body';
    const bodyJson = await req.json();
    const { recordId, subject, body } = bodyJson;
    if (!recordId) throw new Error('recordId is required');
    if (!subject) throw new Error('subject is required');
    if (!body) throw new Error('body is required');

    step = 'load_record';
    const { data: record, error: recordErr } = await supabaseAdmin
      .from('failed_payment_emails')
      .select('*')
      .eq('id', recordId)
      .single();
    if (recordErr) throw new Error(`Record lookup failed: ${recordErr.message}`);
    if (!record) throw new Error(`Record ${recordId} not found`);

    step = 'load_target_user';
    const { data: targetUser, error: targetErr } = await supabaseAdmin.auth.admin.getUserById(
      record.user_id
    );
    if (targetErr) throw new Error(`Target user lookup failed: ${targetErr.message}`);
    if (!targetUser?.user?.email) {
      throw new Error(`Target user ${record.user_id} has no email`);
    }

    const toEmail = targetUser.user.email;

    step = 'resend_init';
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) throw new Error('RESEND_API_KEY not set');
    const resend = new Resend(resendKey);

    step = 'resend_send';
    const html = buildHtml(body, record.hosted_invoice_url);

    const sendPayload = {
      from: FROM_EMAIL,
      to: [toEmail],
      reply_to: REPLY_TO,
      subject,
      html,
    };
    console.log('About to send', { to: toEmail, from: FROM_EMAIL });

    const sendResponse = await resend.emails.send(sendPayload);
    console.log('Resend response', JSON.stringify(sendResponse));

    if (sendResponse.error) {
      throw new Error(
        `Resend rejected: ${sendResponse.error.message || JSON.stringify(sendResponse.error)}`
      );
    }

    step = 'log_audit';
    const { data: updatedRecord, error: updErr } = await supabaseAdmin
      .from('failed_payment_emails')
      .update({
        personal_message_sent_at: new Date().toISOString(),
        personal_message_body: body,
      })
      .eq('id', recordId)
      .select('*')
      .single();
    if (updErr) console.warn('Audit log update failed (non-fatal)', updErr.message);

    return new Response(
      JSON.stringify({
        success: true,
        sentTo: toEmail,
        messageId: sendResponse.data?.id,
        record: updatedRecord,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const err = error as Error;
    const detail = `[${step}] ${err.message}`;
    console.error('admin-send-personal-message FAILED', detail, err.stack);
    return new Response(
      JSON.stringify({ error: detail, step, stack: err.stack?.slice(0, 400) }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
