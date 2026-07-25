/**
 * notify-peer-message
 *
 * Fired server-side by a trigger on mental_health_peer_messages INSERT. Resolves
 * the recipient (the other party in the peer conversation) and delivers:
 *   1. Push (send-push-notification — web/iOS/Android + quiet hours).
 *   2. In-app bell (push_notification_log row — NotificationProvider realtime).
 *   3. Email fallback when nothing pushed or queued. Deliberately content-free:
 *      peer support chats are sensitive, so the email only says a message is
 *      waiting, never who from or what it says.
 *
 * Always returns 200 so a notification failure never blocks the message insert.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';
import { sendEmail, htmlToPlainText } from '../_shared/mailer.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ok = (b: unknown = { ok: true }) =>
  new Response(JSON.stringify(b), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const payload = await req.json().catch(() => ({}));
    const msg = payload?.record ?? payload ?? {};
    const conversationId = msg.conversation_id;
    const senderId = msg.sender_id;
    const content = (msg.content ?? '').toString();
    if (!conversationId || !senderId || !content) return ok({ ok: true, skipped: true });

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    // Delivery runs in the background (waitUntil) so we respond inside
    // pg_net's 5s window — an aborted trigger call must never lose the
    // bell row or the email fallback.
    const deliver = async () => {
      const { data: convo } = await supabase
        .from('mental_health_peer_conversations')
        .select('supporter_id, seeker_id')
        .eq('id', conversationId)
        .maybeSingle();
      if (!convo) return;

      const { data: supporter } = await supabase
        .from('mental_health_peer_supporters')
        .select('user_id, display_name')
        .eq('id', convo.supporter_id)
        .maybeSingle();

      const senderIsSupporter = supporter?.user_id === senderId;
      const recipientId = senderIsSupporter ? convo.seeker_id : supporter?.user_id;
      if (!recipientId || recipientId === senderId) return;

      // Sender's display name for the title.
      let senderName = 'New message';
      if (senderIsSupporter) {
        senderName = supporter?.display_name || 'Peer supporter';
      } else {
        const { data: prof } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', senderId)
          .maybeSingle();
        senderName = (prof?.full_name || '').trim().split(' ')[0] || 'Someone';
      }

      const preview = content.length > 120 ? `${content.slice(0, 117)}...` : content;

      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
        body: JSON.stringify({
          userId: recipientId,
          title: senderName,
          body: preview,
          type: 'peer',
          data: { conversationId, senderId },
        }),
      });
      const out = await res.json().catch(() => ({}));
      const sent = Number(out?.sent ?? 0);
      const queued = out?.queued === true;

      // In-app bell — fires the NotificationProvider realtime subscription.
      // The recipient's own send-push flow never sees this row for others
      // (RLS: own-rows select only).
      const { error: bellError } = await supabase.from('push_notification_log').insert({
        user_id: recipientId,
        type: 'peer',
        reference_id: conversationId,
        title: senderName,
        body: preview,
      });
      if (bellError) console.error('notify-peer-message: bell insert failed', bellError.message);

      // Email fallback — content-free by design (sensitive conversation).
      let emailed = false;
      if (sent === 0 && !queued) {
        try {
          const { data: authUser } = await supabase.auth.admin.getUserById(recipientId);
          const toEmail = authUser?.user?.email;
          if (toEmail) {
            const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F4F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F4F6F9;"><tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:520px;background-color:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #E6E9EE;">
      <tr><td align="left" style="padding:32px 36px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#B5840A;">Elec-Mate</p>
        <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#0C1B2A;line-height:1.2;">You have a new message waiting</h1>
        <p style="margin:0 0 20px;font-size:15px;color:#0C1B2A;line-height:1.6;">Someone has sent you a message in the app. Open Elec-Mate to read and reply.</p>
        <a href="https://www.elec-mate.com/mental-health?section=talk" style="display:inline-block;padding:15px 32px;background-color:#F3B70A;color:#0C1B2A;font-size:15px;font-weight:700;border-radius:11px;text-decoration:none;">Open your messages</a>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
            const { error } = await sendEmail({
              from: 'Elec-Mate <founder@elec-mate.com>',
              to: toEmail,
              subject: 'You have a new message on Elec-Mate',
              html,
              text: htmlToPlainText(html),
            });
            emailed = !error;
          }
        } catch (err) {
          console.error(
            'notify-peer-message: email fallback failed',
            err instanceof Error ? err.message : err
          );
        }
      }

      console.log('notify-peer-message', { recipientId, sent, queued, emailed });
    };

    const runtime = (
      globalThis as {
        EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void };
      }
    ).EdgeRuntime;
    if (runtime?.waitUntil) {
      runtime.waitUntil(
        deliver().catch((err) =>
          console.error(
            'notify-peer-message deliver failed',
            err instanceof Error ? err.message : err
          )
        )
      );
    } else {
      await deliver();
    }

    return ok({ ok: true, accepted: true });
  } catch (err) {
    await captureException(err, {
      functionName: 'notify-peer-message',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('notify-peer-message error', err instanceof Error ? err.message : err);
    return ok({ ok: false });
  }
});
