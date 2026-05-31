/**
 * notify-message
 *
 * Fired server-side by a Postgres trigger on every INSERT into `admin_messages`
 * (both directions: user → admin and admin → user). Owns ALL message
 * notifications so they're reliable regardless of which client sent the message:
 *
 *   1. Push via send-push-notification (handles web/iOS/Android + quiet hours
 *      + dead-token pruning).
 *   2. Email fallback (Brevo) — only for normal users, and only when nothing was
 *      pushed or queued (e.g. the ~⅔ of users with no push token). Admins are
 *      assumed to be at a desk and don't get the email fallback.
 *
 * Always returns 200 so a notification failure never blocks the message insert.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { sendEmail, htmlToPlainText } from '../_shared/mailer.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AdminMessageRow {
  id?: string;
  sender_id?: string | null;
  recipient_id?: string | null;
  subject?: string | null;
  message?: string | null;
}

function fallbackEmailHtml(firstName: string, message: string): string {
  const safe = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background-color:#F4F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F4F6F9;"><tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:520px;background-color:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #E6E9EE;">
      <tr><td align="left" style="padding:32px 36px 0;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#B5840A;">New message</p>
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#0C1B2A;line-height:1.15;letter-spacing:-0.4px;">You&rsquo;ve got a message from Elec-Mate</h1>
        <p style="margin:0 0 14px;font-size:15px;color:#0C1B2A;line-height:1.5;">Hi ${firstName},</p>
      </td></tr>
      <tr><td style="padding:0 36px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F8FAFC;border:1px solid #E6E9EE;border-radius:14px;">
          <tr><td style="padding:18px 22px;font-size:15px;color:#0C1B2A;line-height:1.6;white-space:pre-wrap;">${safe}</td></tr>
        </table>
      </td></tr>
      <tr><td align="left" style="padding:0 36px 32px;">
        <a href="https://www.elec-mate.com" style="display:inline-block;padding:15px 32px;background-color:#F3B70A;color:#0C1B2A;font-size:15px;font-weight:700;border-radius:11px;text-decoration:none;">Open Elec-Mate to reply</a>
      </td></tr>
      <tr><td style="padding:22px 36px;background-color:#F8FAFC;border-top:1px solid #E6E9EE;">
        <p style="margin:0;font-size:13px;color:#51606F;line-height:1.55;">Just reply to this email and it comes straight to Andrew, the founder.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const payload = await req.json().catch(() => ({}));
    const record: AdminMessageRow = payload?.record ?? payload ?? {};
    const recipientId = record.recipient_id;
    const senderId = record.sender_id;
    const message = (record.message ?? '').toString();

    if (!recipientId || !message) {
      return new Response(JSON.stringify({ ok: true, skipped: 'missing recipient or message' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    // Identify recipient + sender (role decides title + whether email fallback applies)
    const ids = [recipientId, senderId].filter(Boolean) as string[];
    const { data: people } = await supabase
      .from('profiles')
      .select('id, full_name, admin_role, role')
      .in('id', ids);
    const recipient = people?.find((p) => p.id === recipientId);
    const sender = people?.find((p) => p.id === senderId);
    const recipientIsAdmin = !!recipient?.admin_role;

    const preview = message.length > 120 ? `${message.slice(0, 117)}...` : message;
    const title = recipientIsAdmin
      ? `New message from ${sender?.full_name?.trim() || 'a user'}`
      : 'New message from Elec-Mate';

    // 1) Push (send-push-notification owns quiet hours, multi-platform + token pruning)
    let pushSent = 0;
    let queued = false;
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SERVICE_ROLE}`,
        },
        body: JSON.stringify({
          userId: recipientId,
          title,
          body: preview,
          type: 'admin_message',
          data: {
            messageId: record.id,
            senderId,
            role: recipient?.role ?? '',
            isAdminMessage: !recipientIsAdmin,
          },
        }),
      });
      const json = await res.json().catch(() => ({}));
      pushSent = Number(json?.sent ?? 0);
      queued = json?.queued === true;
    } catch (err) {
      console.error('notify-message: push failed', err instanceof Error ? err.message : err);
    }

    // 2) Email fallback — normal users only, only when nothing pushed/queued
    let emailed = false;
    if (!recipientIsAdmin && pushSent === 0 && !queued) {
      try {
        const { data: authUser } = await supabase.auth.admin.getUserById(recipientId);
        const toEmail = authUser?.user?.email;
        if (toEmail) {
          const firstName = (recipient?.full_name || '').split(' ')[0] || 'there';
          const html = fallbackEmailHtml(firstName, message);
          const { error } = await sendEmail({
            from: 'Elec-Mate <founder@elec-mate.com>',
            to: toEmail,
            replyTo: 'founder@elec-mate.com',
            subject: 'You have a new message from Elec-Mate',
            html,
            text: htmlToPlainText(html),
          });
          emailed = !error;
        }
      } catch (err) {
        console.error('notify-message: email fallback failed', err instanceof Error ? err.message : err);
      }
    }

    console.log('notify-message', {
      recipientId,
      recipientIsAdmin,
      pushSent,
      queued,
      emailed,
    });

    return new Response(JSON.stringify({ ok: true, pushSent, queued, emailed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Never 500 — a notification failure must not look like a delivery failure.
    console.error('notify-message error', err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ ok: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
