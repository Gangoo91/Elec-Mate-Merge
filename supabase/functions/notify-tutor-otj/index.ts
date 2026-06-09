/**
 * notify-tutor-otj
 *
 * Fired server-side by a trigger on college_otj_entries INSERT. When an
 * apprentice logs off-the-job hours, the tutor who owns their cohort gets a
 * real-time "tap to verify" push.
 *
 * Recipient: student_id → college_students.cohort_id → college_cohorts.tutor_id
 *            → college_staff.user_id (the tutor's auth account).
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

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const payload = await req.json().catch(() => ({}));
    const row = payload?.record ?? payload ?? {};
    const studentId = row.student_id;
    const recordedBy = row.recorded_by;
    const durationMinutes = Number(row.duration_minutes ?? 0);
    if (!studentId) return ok({ ok: true, skipped: 'no student' });

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    // student → cohort → tutor → tutor's auth user.
    // NOTE: college_otj_entries.student_id is the apprentice's auth/profile id
    // (FK to profiles), NOT college_students.id — so match on user_id.
    const { data: student } = await supabase
      .from('college_students')
      .select('id, name, cohort_id')
      .eq('user_id', studentId)
      .maybeSingle();
    if (!student?.cohort_id) return ok({ ok: true, skipped: 'no cohort' });

    const { data: cohort } = await supabase
      .from('college_cohorts')
      .select('tutor_id')
      .eq('id', student.cohort_id)
      .maybeSingle();
    if (!cohort?.tutor_id) return ok({ ok: true, skipped: 'no tutor on cohort' });

    const { data: tutor } = await supabase
      .from('college_staff')
      .select('user_id')
      .eq('id', cohort.tutor_id)
      .maybeSingle();
    const recipientId = tutor?.user_id ?? null;
    // Don't notify the tutor if they recorded the entry themselves.
    if (!recipientId || recipientId === recordedBy) {
      return ok({ ok: true, skipped: 'no recipient / self' });
    }

    const studentName = (student.name || '').trim().split(' ')[0] || 'An apprentice';
    const dur = durationMinutes > 0 ? formatDuration(durationMinutes) : 'time';

    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
      body: JSON.stringify({
        userId: recipientId,
        title: `${studentName} logged ${dur} off-the-job`,
        body: 'Tap to review and verify.',
        type: 'college',
        data: { deep_link: `/college/students/${student.id}` },
      }),
    });
    const out = await res.json().catch(() => ({}));
    console.log('notify-tutor-otj', { studentId, recipientId, sent: out?.sent ?? 0 });
    return ok({ ok: true, sent: out?.sent ?? 0 });
  } catch (err) {
    await captureException(err, { functionName: 'notify-tutor-otj', requestUrl: req.url, requestMethod: req.method });
    console.error('notify-tutor-otj error', err instanceof Error ? err.message : err);
    return ok({ ok: false });
  }
});
