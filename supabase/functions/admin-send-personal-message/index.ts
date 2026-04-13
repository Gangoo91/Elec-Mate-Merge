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
import { Resend } from 'npm:resend@2.0.0';

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

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    const { data: profile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (!profile || !['super_admin', 'admin'].includes(profile.admin_role)) {
      throw new Error('Admin access required');
    }

    const { recordId, subject, body } = await req.json();
    if (!recordId || !subject || !body) {
      throw new Error('recordId, subject, and body are required');
    }

    // Service role for writes + cross-user reads
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Load the failed payment record
    const { data: record, error: recordErr } = await supabaseAdmin
      .from('failed_payment_emails')
      .select('*')
      .eq('id', recordId)
      .single();

    if (recordErr || !record) throw new Error('Failed payment record not found');

    // Look up the user's email
    const { data: targetUser, error: targetErr } = await supabaseAdmin.auth.admin.getUserById(
      record.user_id
    );
    if (targetErr || !targetUser?.user?.email) {
      throw new Error('Could not resolve target user email');
    }

    const toEmail = targetUser.user.email;

    // Send via Resend
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) throw new Error('RESEND_API_KEY not set');
    const resend = new Resend(resendKey);

    const html = buildHtml(body, record.hosted_invoice_url);

    const { data: sendResult, error: sendErr } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [toEmail],
      reply_to: REPLY_TO,
      subject,
      html,
      text: body,
    });

    if (sendErr) {
      console.error('Resend error', sendErr);
      throw new Error(`Email send failed: ${sendErr.message || 'unknown'}`);
    }

    // Log to audit columns
    const { data: updatedRecord, error: updErr } = await supabaseAdmin
      .from('failed_payment_emails')
      .update({
        personal_message_sent_at: new Date().toISOString(),
        personal_message_body: body,
      })
      .eq('id', recordId)
      .select('*')
      .single();

    if (updErr) {
      console.warn('Failed to log personal message send', updErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        sentTo: toEmail,
        messageId: sendResult?.id,
        record: updatedRecord,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
