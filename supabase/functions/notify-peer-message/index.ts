/**
 * notify-peer-message
 *
 * Fired server-side by a trigger on mental_health_peer_messages INSERT. Resolves
 * the recipient (the other party in the peer conversation) and sends a reliable
 * push — replacing the old client-side fire-and-forget that silently failed.
 *
 * Always returns 200 so a notification failure never blocks the message insert.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

    const { data: convo } = await supabase
      .from('mental_health_peer_conversations')
      .select('supporter_id, seeker_id')
      .eq('id', conversationId)
      .maybeSingle();
    if (!convo) return ok({ ok: true, skipped: 'no conversation' });

    const { data: supporter } = await supabase
      .from('mental_health_peer_supporters')
      .select('user_id, display_name')
      .eq('id', convo.supporter_id)
      .maybeSingle();

    const senderIsSupporter = supporter?.user_id === senderId;
    const recipientId = senderIsSupporter ? convo.seeker_id : supporter?.user_id;
    if (!recipientId || recipientId === senderId) return ok({ ok: true, skipped: 'no recipient' });

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
    console.log('notify-peer-message', { recipientId, sent: out?.sent ?? 0 });
    return ok({ ok: true, sent: out?.sent ?? 0 });
  } catch (err) {
    await captureException(err, { functionName: 'notify-peer-message', requestUrl: req.url, requestMethod: req.method });
    console.error('notify-peer-message error', err instanceof Error ? err.message : err);
    return ok({ ok: false });
  }
});
