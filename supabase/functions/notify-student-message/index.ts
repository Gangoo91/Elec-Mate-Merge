/**
 * notify-student-message
 *
 * Fired server-side by a trigger on student_messages INSERT — the real
 * tutor↔apprentice channel (student_message_threads / student_messages).
 * Resolves the recipient and sends a reliable push with a one-tap deep link
 * into the right screen for each side. Replaces the (previously absent) push.
 *
 * Recipient & id mapping (verified):
 *   - sender_kind = 'student'  → sender_id is the apprentice's auth uid.
 *       Notify the tutor: college_staff.user_id where id = thread.created_by.
 *   - sender_kind = 'tutor'(/staff) → sender_id is college_staff.id.
 *       Notify the apprentice: college_students.user_id where id = thread.student_id.
 *
 * Always returns 200 so a notification failure never blocks the insert.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

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

const firstName = (n?: string | null, fallback = 'New message') =>
  (n || '').trim().split(' ')[0] || fallback;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const payload = await req.json().catch(() => ({}));
    const msg = payload?.record ?? payload ?? {};
    const threadId = msg.thread_id;
    const senderKind = msg.sender_kind;
    const senderId = msg.sender_id;
    const body = (msg.body ?? '').toString();
    if (!threadId || !senderKind || !body) return ok({ ok: true, skipped: true });

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    const { data: thread } = await supabase
      .from('student_message_threads')
      .select('student_id, created_by')
      .eq('id', threadId)
      .maybeSingle();
    if (!thread) return ok({ ok: true, skipped: 'no thread' });

    let recipientId: string | null = null;
    let senderName = 'New message';
    let deepLink = '/dashboard';

    if (senderKind === 'student') {
      // Apprentice → notify the tutor who owns the thread.
      if (!thread.created_by) return ok({ ok: true, skipped: 'no tutor on thread' });
      const { data: staff } = await supabase
        .from('college_staff')
        .select('user_id')
        .eq('id', thread.created_by)
        .maybeSingle();
      recipientId = staff?.user_id ?? null;
      const { data: student } = await supabase
        .from('college_students')
        .select('name')
        .eq('id', thread.student_id)
        .maybeSingle();
      senderName = firstName(student?.name, 'Your apprentice');
      deepLink = `/college/students/${thread.student_id}`;
    } else {
      // Tutor/staff → notify the apprentice.
      const { data: student } = await supabase
        .from('college_students')
        .select('user_id')
        .eq('id', thread.student_id)
        .maybeSingle();
      recipientId = student?.user_id ?? null;
      // Sender (tutor) display name via college_staff.user_id → profiles.full_name.
      const { data: staff } = await supabase
        .from('college_staff')
        .select('user_id')
        .eq('id', senderId)
        .maybeSingle();
      if (staff?.user_id) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', staff.user_id)
          .maybeSingle();
        senderName = firstName(prof?.full_name, 'Your tutor');
      } else {
        senderName = 'Your tutor';
      }
      deepLink = '/apprentice/college/plan';
    }

    if (!recipientId) return ok({ ok: true, skipped: 'no recipient' });

    const preview = body.length > 120 ? `${body.slice(0, 117)}...` : body;

    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
      body: JSON.stringify({
        userId: recipientId,
        title: senderName,
        body: preview,
        type: 'college',
        data: { threadId, deep_link: deepLink },
      }),
    });
    const out = await res.json().catch(() => ({}));
    console.log('notify-student-message', { senderKind, recipientId, sent: out?.sent ?? 0 });
    return ok({ ok: true, sent: out?.sent ?? 0 });
  } catch (err) {
    await captureException(err, { functionName: 'notify-student-message', requestUrl: req.url, requestMethod: req.method });
    console.error('notify-student-message error', err instanceof Error ? err.message : err);
    return ok({ ok: false });
  }
});
