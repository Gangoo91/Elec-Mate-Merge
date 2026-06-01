/**
 * notify-college-message
 *
 * Fired server-side by a trigger on college_messages INSERT. Resolves the other
 * participant in the tutor↔apprentice (or college↔employer) conversation and
 * sends a reliable push — replacing the client-side fire-and-forget.
 *
 * Privacy guard: if the message is NOT visible to the student (a staff-only /
 * internal note) and the recipient IS the student, we don't notify them.
 *
 * Always returns 200 so a notification failure never blocks the message insert.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
    // visible_to_student defaults true in the schema; treat missing as visible.
    const visibleToStudent = msg.visible_to_student !== false;
    if (!conversationId || !senderId || !content) return ok({ ok: true, skipped: true });

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    const { data: convo } = await supabase
      .from('college_conversations')
      .select('participant_1_id, participant_1_type, participant_2_id, participant_2_type')
      .eq('id', conversationId)
      .maybeSingle();
    if (!convo) return ok({ ok: true, skipped: 'no conversation' });

    const senderIsP1 = convo.participant_1_id === senderId;
    const recipientId = senderIsP1 ? convo.participant_2_id : convo.participant_1_id;
    const recipientType = senderIsP1 ? convo.participant_2_type : convo.participant_1_type;
    if (!recipientId || recipientId === senderId) return ok({ ok: true, skipped: 'no recipient' });

    // Don't push staff-only / internal notes to the student.
    if (recipientType === 'student' && !visibleToStudent) {
      return ok({ ok: true, skipped: 'not visible to student' });
    }

    const { data: senderProfile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', senderId)
      .maybeSingle();
    const senderName = (senderProfile?.full_name || '').trim().split(' ')[0] || 'College';

    const preview = content.length > 120 ? `${content.slice(0, 117)}...` : content;

    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
      body: JSON.stringify({
        userId: recipientId,
        title: senderName,
        body: preview,
        type: 'college',
        data: { conversationId, senderId },
      }),
    });
    const out = await res.json().catch(() => ({}));
    console.log('notify-college-message', { recipientId, recipientType, sent: out?.sent ?? 0 });
    return ok({ ok: true, sent: out?.sent ?? 0 });
  } catch (err) {
    console.error('notify-college-message error', err instanceof Error ? err.message : err);
    return ok({ ok: false });
  }
});
