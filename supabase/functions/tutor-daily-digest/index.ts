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

import { withSentry } from '../_shared/sentry.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Bell + push through notify_user (ELE-1913): lands in the header bell,
// honours quiet hours, and opens the college inbox (the one list), not /college.
async function push(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string,
  title: string,
  body: string
) {
  const { error } = await supabase.rpc('notify_user', {
    p_user_id: userId,
    p_type: 'tutor_daily_digest',
    p_title: title,
    p_message: body,
    p_data: { route: '/college/inbox', ref_id: new Date().toISOString().slice(0, 10) },
  });
  if (error) console.error('tutor-daily-digest notify failed', error.message);
}

serve(withSentry('tutor-daily-digest', async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // Cron only (service key). It pushes every tutor, so nobody else may run it.
  {
    const caller = await identifyCaller(req);
    if (caller?.kind !== 'service') return deny(corsHeaders);
  }

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

      const [otjRes, evidenceRes, quizRes, appRes] = await Promise.all([
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
        // App learning the app measured that the tutor has not approved or
        // left out yet (same rows get_otj_summary counts).
        supabase
          .from('time_entries')
          .select('id, duration, user_id')
          .in('user_id', studentIds)
          .eq('is_automatic', true)
          .eq('notes', 'Auto-tracked training time')
          .gte('created_at', since),
      ]);

      const otj = otjRes.count ?? 0;
      const evidence = evidenceRes.count ?? 0;
      const quizzes = quizRes.count ?? 0;
      const appRows = (appRes.data ?? []) as Array<{ id: string; duration: number | null; user_id: string }>;
      let appMinutes = 0;
      const appLearners = new Set<string>();
      if (appRows.length > 0) {
        const { data: linked } = await supabase
          .from('otj_capture_links')
          .select('time_entry_id')
          .in('time_entry_id', appRows.map((r) => r.id));
        const done = new Set(((linked ?? []) as Array<{ time_entry_id: string }>).map((l) => l.time_entry_id));
        for (const r of appRows) {
          if (done.has(r.id)) continue;
          appMinutes += r.duration ?? 0;
          appLearners.add(r.user_id);
        }
      }
      const appHours = Math.round((appMinutes / 60) * 10) / 10;
      if (otj + evidence + quizzes === 0 && appHours === 0) continue;

      // The digest respects the staff switches in College settings: hours
      // (college_hours) and marking/evidence (college_marking).
      const { data: prefRows } = await supabase
        .from('notification_preferences')
        .select('category, enabled')
        .eq('user_id', tutorUser)
        .in('category', ['college_hours', 'college_marking']);
      const off = new Set(
        ((prefRows ?? []) as Array<{ category: string; enabled: boolean }>)
          .filter((p) => p.enabled === false)
          .map((p) => p.category)
      );
      const hoursOn = !off.has('college_hours');
      const markingOn = !off.has('college_marking');

      const parts: string[] = [];
      if (hoursOn && otj > 0) parts.push(`${otj} OTJ ${otj === 1 ? 'entry' : 'entries'} to verify`);
      if (markingOn && evidence > 0) parts.push(`${evidence} new evidence ${evidence === 1 ? 'item' : 'items'}`);
      if (markingOn && quizzes > 0) parts.push(`${quizzes} ${quizzes === 1 ? 'quiz' : 'quizzes'} completed`);
      if (hoursOn && appHours > 0)
        parts.push(
          `${appHours}h of app learning to approve (${appLearners.size} ${appLearners.size === 1 ? 'learner' : 'learners'})`
        );

      if (parts.length === 0) continue;

      const { data: prof } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', tutorUser)
        .maybeSingle();
      const firstName = (prof?.full_name || '').trim().split(' ')[0];
      const greeting = firstName ? `Good morning, ${firstName}` : 'Good morning';

      await push(supabase, tutorUser, greeting, `${parts.join(' · ')}. Tap to review.`);
      sent++;
    }

    return new Response(JSON.stringify({ ok: true, tutors_notified: sent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('tutor-daily-digest error', err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ ok: false }), { headers: corsHeaders, status: 200 });
  }
}));
