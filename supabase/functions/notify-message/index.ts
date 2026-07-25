/**
 * notify-message
 *
 * Fired server-side by a Postgres trigger on every INSERT into `admin_messages`
 * (both directions: user → admin and admin → user). Owns ALL message
 * notifications so they're reliable regardless of which client sent the message:
 *
 *   1. Push via send-push-notification (handles web/iOS/Android + quiet hours
 *      + dead-token pruning).
 *   2. In-app bell — a push_notification_log row per recipient. The
 *      NotificationProvider realtime-subscribes to this table, so the bell
 *      fires even when push can't reach a device.
 *   3. Email:
 *      - Inbound to admin: EVERY admin gets push + bell + email, always.
 *        Support messages are rare and must never be missed — the old
 *        "admins are at a desk" assumption meant nobody found out at all.
 *      - Outbound to a user: email always when the admin chose message_type
 *        'email' or 'both'; otherwise only as a fallback when nothing was
 *        pushed or queued.
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
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface AdminMessageRow {
  id?: string;
  sender_id?: string | null;
  recipient_id?: string | null;
  subject?: string | null;
  message?: string | null;
  message_type?: string | null;
}

function fallbackEmailHtml(firstName: string, message: string): string {
  const safe = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

function adminAlertEmailHtml(senderName: string, subject: string, message: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F4F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F4F6F9;"><tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:520px;background-color:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #E6E9EE;">
      <tr><td align="left" style="padding:32px 36px 0;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#B5840A;">Support inbox</p>
        <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0C1B2A;line-height:1.2;">${esc(senderName)} messaged support</h1>
        <p style="margin:0 0 16px;font-size:14px;color:#51606F;">${esc(subject)}</p>
      </td></tr>
      <tr><td style="padding:0 36px 24px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F8FAFC;border:1px solid #E6E9EE;border-radius:14px;">
          <tr><td style="padding:18px 22px;font-size:15px;color:#0C1B2A;line-height:1.6;white-space:pre-wrap;">${esc(message)}</td></tr>
        </table>
      </td></tr>
      <tr><td align="left" style="padding:0 36px 32px;">
        <a href="https://www.elec-mate.com/admin/user-messages" style="display:inline-block;padding:15px 32px;background-color:#F3B70A;color:#0C1B2A;font-size:15px;font-weight:700;border-radius:11px;text-decoration:none;">Open the admin inbox</a>
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
    const messageType = (record.message_type ?? 'in_app').toString();

    if (!recipientId || !message) {
      return new Response(JSON.stringify({ ok: true, skipped: 'missing recipient or message' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    // Delivery runs in the background (waitUntil) so we can respond inside
    // pg_net's 5s window — the trigger's http_post gives up after that, and
    // an aborted call must never cut the admin fan-out short.
    const deliver = async () => {
      // Identify recipient + sender (role decides title + delivery strategy)
      const ids = [recipientId, senderId].filter(Boolean) as string[];
      const { data: people } = await supabase
        .from('profiles')
        .select('id, full_name, admin_role, role')
        .in('id', ids);
      const recipient = people?.find((p) => p.id === recipientId);
      const sender = people?.find((p) => p.id === senderId);
      const recipientIsAdmin = !!recipient?.admin_role;

      const preview = message.length > 120 ? `${message.slice(0, 117)}...` : message;
      const senderName = sender?.full_name?.trim() || 'a user';
      const title = recipientIsAdmin
        ? `New message from ${senderName}`
        : 'New message from Elec-Mate';

      const pushTo = async (userId: string) => {
        try {
          const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${SERVICE_ROLE}`,
            },
            body: JSON.stringify({
              userId,
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
          return { sent: Number(json?.sent ?? 0), queued: json?.queued === true };
        } catch (err) {
          console.error('notify-message: push failed', err instanceof Error ? err.message : err);
          return { sent: 0, queued: false };
        }
      };

      // In-app bell — NotificationProvider realtime-subscribes to this table,
      // so this fires the bell even when no device can receive a push.
      const bellTo = async (userId: string) => {
        const { error } = await supabase.from('push_notification_log').insert({
          user_id: userId,
          type: 'admin_message',
          reference_id: record.id ?? null,
          title,
          body: preview,
        });
        if (error) console.error('notify-message: bell insert failed', error.message);
      };

      const emailTo = async (userId: string, html: string, subject: string) => {
        try {
          const { data: authUser } = await supabase.auth.admin.getUserById(userId);
          const toEmail = authUser?.user?.email;
          if (!toEmail) return false;
          const { error } = await sendEmail({
            from: 'Elec-Mate <founder@elec-mate.com>',
            to: toEmail,
            replyTo: 'founder@elec-mate.com',
            subject,
            html,
            text: htmlToPlainText(html),
          });
          return !error;
        } catch (err) {
          console.error('notify-message: email failed', err instanceof Error ? err.message : err);
          return false;
        }
      };

      let pushSent = 0;
      let queued = false;
      let emailed = 0;
      let bells = 0;

      if (recipientIsAdmin) {
        // Inbound support message → alert EVERY admin (push + bell + email).
        // The row's recipient_id is one arbitrary admin; the team is the real
        // recipient. Skip the sender in case an admin messaged another admin.
        const { data: admins } = await supabase
          .from('profiles')
          .select('id')
          .not('admin_role', 'is', null)
          .neq('id', senderId ?? '00000000-0000-0000-0000-000000000000');
        const adminIds = (admins ?? []).map((a) => a.id);
        const emailHtml = adminAlertEmailHtml(senderName, record.subject ?? 'No subject', message);

        const results = await Promise.all(
          adminIds.map(async (adminId) => {
            const [push, , mailOk] = await Promise.all([
              pushTo(adminId),
              bellTo(adminId),
              emailTo(adminId, emailHtml, `Support: ${senderName} messaged Elec-Mate`),
            ]);
            return { push, mailOk };
          })
        );
        for (const r of results) {
          pushSent += r.push.sent;
          queued = queued || r.push.queued;
          bells += 1;
          if (r.mailOk) emailed += 1;
        }
      } else {
        // Admin → user.
        const [push] = await Promise.all([pushTo(recipientId), bellTo(recipientId)]);
        pushSent = push.sent;
        queued = push.queued;
        bells = 1;

        const wantsEmail = messageType === 'email' || messageType === 'both';
        const needsFallback = pushSent === 0 && !queued;
        if (wantsEmail || needsFallback) {
          const firstName = (recipient?.full_name || '').split(' ')[0] || 'there';
          const html = fallbackEmailHtml(firstName, message);
          if (await emailTo(recipientId, html, 'You have a new message from Elec-Mate')) {
            emailed = 1;
          }
        }
      }

      console.log('notify-message', {
        recipientId,
        recipientIsAdmin,
        messageType,
        pushSent,
        queued,
        bells,
        emailed,
      });
    };

    const runtime = (
      globalThis as {
        EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void };
      }
    ).EdgeRuntime;
    if (runtime?.waitUntil) {
      runtime.waitUntil(
        deliver().catch((err) =>
          console.error('notify-message deliver failed', err instanceof Error ? err.message : err)
        )
      );
    } else {
      await deliver();
    }

    return new Response(JSON.stringify({ ok: true, accepted: true }), {
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
