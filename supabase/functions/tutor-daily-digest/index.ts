/**
 * tutor-daily-digest
 *
 * Once a day, each tutor gets ONE batched push summarising what needs their
 * attention across their cohort(s): OTJ awaiting verification, new portfolio
 * evidence, and quizzes completed. Real-time pushes (messages, OTJ logged)
 * handle urgency; this handles volume so tutors are never spammed per-event.
 *
 * Mapping (verified against FKs):
 *   tutor: college_cohorts.tutor_id → college_staff.user_id (auth)
 *   students: college_students.cohort_id = cohort.id → college_students.user_id
 *   OTJ/quiz/evidence all key on the student's AUTH/profile id (user_id), NOT
 *   college_students.id.
 *
 * Triggered by pg_cron (service role) or manual POST. Sends nothing when a tutor
 * has no pending items — a quiet day stays quiet.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function push(userId: string, title: string, body: string) {
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SERVICE_ROLE}` },
      body: JSON.stringify({
        userId,
        title,
        body,
        type: 'college',
        data: { deep_link: '/college' },
      }),
    });
  } catch (err) {
    console.error('tutor-daily-digest push failed', err instanceof Error ? err.message : err);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Cohorts with a tutor → map tutor staff → their cohort students' user ids.
    const { data: cohorts } = await supabase
      .from('college_cohorts')
      .select('id, tutor_id')
      .not('tutor_id', 'is', null);
    if (!cohorts || cohorts.length === 0) return new Response(JSON.stringify({ ok: true, tutors: 0 }), { headers: corsHeaders });

    const staffIds = [...new Set(cohorts.map((c) => c.tutor_id as string))];
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id, user_id')
      .in('id', staffIds);
    const staffUser = new Map<string, string>();
    for (const s of staff ?? []) if (s.user_id) staffUser.set(s.id, s.user_id);

    // tutor user_id → set of student user_ids
    const tutorStudents = new Map<string, Set<string>>();
    for (const c of cohorts) {
      const tutorUser = staffUser.get(c.tutor_id as string);
      if (!tutorUser) continue;
      const { data: students } = await supabase
        .from('college_students')
        .select('user_id')
        .eq('cohort_id', c.id);
      const set = tutorStudents.get(tutorUser) ?? new Set<string>();
      for (const st of students ?? []) if (st.user_id) set.add(st.user_id);
      tutorStudents.set(tutorUser, set);
    }

    let sent = 0;
    for (const [tutorUser, studentSet] of tutorStudents) {
      const studentIds = [...studentSet];
      if (studentIds.length === 0) continue;

      const [otjRes, evidenceRes, quizRes] = await Promise.all([
        supabase
          .from('college_otj_entries')
          .select('id', { count: 'exact', head: true })
          .in('student_id', studentIds)
          .eq('verification_status', 'pending'),
        supabase
          .from('portfolio_items')
          .select('id', { count: 'exact', head: true })
          .in('user_id', studentIds)
          .gte('created_at', since),
        supabase
          .from('quiz_attempts')
          .select('id', { count: 'exact', head: true })
          .in('user_id', studentIds)
          .gte('created_at', since),
      ]);

      const otj = otjRes.count ?? 0;
      const evidence = evidenceRes.count ?? 0;
      const quizzes = quizRes.count ?? 0;
      if (otj + evidence + quizzes === 0) continue;

      const parts: string[] = [];
      if (otj > 0) parts.push(`${otj} OTJ ${otj === 1 ? 'entry' : 'entries'} to verify`);
      if (evidence > 0) parts.push(`${evidence} new evidence ${evidence === 1 ? 'item' : 'items'}`);
      if (quizzes > 0) parts.push(`${quizzes} ${quizzes === 1 ? 'quiz' : 'quizzes'} completed`);

      const { data: prof } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', tutorUser)
        .maybeSingle();
      const firstName = (prof?.full_name || '').trim().split(' ')[0];
      const greeting = firstName ? `Good morning, ${firstName}` : 'Good morning';

      await push(tutorUser, greeting, `${parts.join(' · ')}. Tap to review.`);
      sent++;
    }

    return new Response(JSON.stringify({ ok: true, tutors_notified: sent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('tutor-daily-digest error', err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ ok: false }), { headers: corsHeaders, status: 200 });
  }
});
