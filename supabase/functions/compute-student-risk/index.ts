// Daily risk-engine for college students.
//
// Inputs per student:
//   - attendance over last 28 days (rate, delta vs prior 28)
//   - AC coverage velocity (evidenced ACs in last 14 days vs prior 14)
//   - portfolio staleness (days since last evidence added)
//   - grade trend (last 3 vs previous 3, when scores present)
//   - overdue ILP review
//   - outstanding pastoral flag/concern
//
// Output: rows in student_risk_scores, is_current=true for the latest row;
// prior current row is marked is_current=false. Writes a JSONB array of the
// top factors with { key, label, severity (0..1), detail }.
//
// Auth: service-role only. Can be triggered by cron OR by a staff POST from
// the client (Authorization: Bearer <jwt>) which scopes the run to the
// caller's college for on-demand refreshes.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-scheduled',
};

interface Factor {
  key: string;
  label: string;
  severity: number; // 0..1
  detail?: string;
}

interface RunBody {
  college_id?: string;
  student_ids?: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Scope — if caller sent a college_id or student_ids, respect them; else all
  let body: RunBody = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  // If called from a client with a JWT, we can narrow to their college
  let scopedCollegeId = body.college_id ?? null;
  const authHeader = req.headers.get('authorization');
  if (authHeader && !scopedCollegeId) {
    const userClient = createClient(
      SUPABASE_URL,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } }
    );
    const { data: userRes } = await userClient.auth.getUser();
    if (userRes?.user) {
      const { data: profile } = await sb
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (profile?.college_id) scopedCollegeId = profile.college_id;
    }
  }

  try {
    // Fetch students to compute
    let studentQ = sb
      .from('college_students')
      .select('id, college_id, cohort_id, status, progress_percent, expected_end_date')
      .neq('status', 'withdrawn')
      .neq('status', 'completed');
    if (scopedCollegeId) studentQ = studentQ.eq('college_id', scopedCollegeId);
    if (body.student_ids?.length) studentQ = studentQ.in('id', body.student_ids);

    const { data: students, error: studentsErr } = await studentQ;
    if (studentsErr) throw studentsErr;

    const now = new Date();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const todayIso = iso(now);
    const d28Ago = iso(new Date(now.getTime() - 28 * 86400_000));
    const d56Ago = iso(new Date(now.getTime() - 56 * 86400_000));
    const d14Ago = iso(new Date(now.getTime() - 14 * 86400_000));
    const d28Iso = d28Ago;

    let processed = 0;
    const results: { student_id: string; level: string; score: number }[] = [];

    for (const student of students ?? []) {
      const factors: Factor[] = [];
      const signals: Record<string, unknown> = {};
      let score = 0;

      // 1. Attendance
      const { data: attRows } = await sb
        .from('college_attendance')
        .select('date, status')
        .eq('student_id', student.id)
        .gte('date', d56Ago);
      const recentAtt = (attRows ?? []).filter((r) => r.date >= d28Iso);
      const priorAtt = (attRows ?? []).filter((r) => r.date >= d56Ago && r.date < d28Iso);
      const rate = (rows: { status: string }[]) =>
        rows.length === 0
          ? null
          : rows.filter((r) => r.status === 'present' || r.status === 'late').length / rows.length;
      const recentRate = rate(recentAtt);
      const priorRate = rate(priorAtt);
      if (recentRate !== null) {
        signals.attendance_rate_28d = Math.round(recentRate * 100);
        if (recentRate < 0.85) {
          const sev = Math.min(1, (0.85 - recentRate) / 0.35);
          factors.push({
            key: 'attendance_low',
            label: `Attendance is ${Math.round(recentRate * 100)}% over the last 28 days`,
            severity: sev,
            detail: 'Target for FE apprentices is typically ≥90%.',
          });
          score += sev * 30;
        }
        if (priorRate !== null && recentRate < priorRate - 0.1) {
          const drop = priorRate - recentRate;
          factors.push({
            key: 'attendance_dropping',
            label: `Attendance has dropped ${Math.round(drop * 100)} pts in the last 28 days`,
            severity: Math.min(1, drop * 2),
            detail: `Was ${Math.round(priorRate * 100)}% in the prior 4 weeks, now ${Math.round(
              recentRate * 100
            )}%.`,
          });
          score += Math.min(1, drop * 2) * 18;
        }
      } else {
        factors.push({
          key: 'attendance_unknown',
          label: 'No attendance recorded in the last 8 weeks',
          severity: 0.3,
        });
        score += 8;
      }

      // 2. AC coverage velocity
      const { data: covRows } = await sb
        .from('student_ac_coverage')
        .select('status, last_evidence_at, updated_at')
        .eq('student_id', student.id);
      const totalAc = (covRows ?? []).length;
      const done = (covRows ?? []).filter((r) =>
        ['evidenced', 'assessed', 'confirmed'].includes(r.status as string)
      ).length;
      signals.ac_total = totalAc;
      signals.ac_done = done;
      if (totalAc > 0) {
        const pct = done / totalAc;
        signals.ac_coverage_pct = Math.round(pct * 100);
        // Velocity: how many ACs reached evidenced/assessed in last 14d
        const recentDone = (covRows ?? []).filter((r) => {
          const t = r.last_evidence_at ?? r.updated_at;
          return (
            t &&
            ['evidenced', 'assessed', 'confirmed'].includes(r.status as string) &&
            (t as string) >= d14Ago
          );
        }).length;
        signals.ac_velocity_14d = recentDone;
        if (recentDone === 0) {
          factors.push({
            key: 'ac_velocity_zero',
            label: 'No new AC evidence in the last 14 days',
            severity: 0.55,
            detail:
              'Learner has stalled on curriculum evidence. Consider a catch-up session or portfolio review.',
          });
          score += 18;
        }
        // Behind expected: if we have expected_end_date compare coverage vs time elapsed
        if (student.expected_end_date) {
          const end = new Date(student.expected_end_date).getTime();
          const startMs = end - 24 * 30 * 86400_000; // approx 24 months prior
          const elapsed = Math.max(0, Math.min(1, (now.getTime() - startMs) / (end - startMs)));
          if (elapsed > pct + 0.15) {
            const gap = elapsed - pct;
            factors.push({
              key: 'behind_pace',
              label: `Coverage is ${Math.round(pct * 100)}% but ${Math.round(
                elapsed * 100
              )}% through the programme`,
              severity: Math.min(1, gap * 3),
              detail: 'Learner is falling behind the expected pace for their end date.',
            });
            score += Math.min(1, gap * 3) * 20;
          }
        }
      }

      // 3. Portfolio staleness
      const { data: lastPortfolio } = await sb
        .from('portfolio_items')
        .select('created_at, updated_at')
        .eq('student_id', student.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (lastPortfolio?.updated_at) {
        const days = Math.floor(
          (now.getTime() - new Date(lastPortfolio.updated_at as string).getTime()) / 86400_000
        );
        signals.portfolio_stale_days = days;
        if (days > 21) {
          const sev = Math.min(1, (days - 21) / 42);
          factors.push({
            key: 'portfolio_stale',
            label: `Portfolio hasn't been updated in ${days} days`,
            severity: sev,
            detail: 'Prompt a portfolio review or assign an evidence-building task.',
          });
          score += sev * 18;
        }
      } else {
        factors.push({
          key: 'portfolio_empty',
          label: 'No portfolio items yet',
          severity: 0.6,
        });
        score += 12;
      }

      // 4. Grade trend
      const { data: grades } = await sb
        .from('college_grades')
        .select('score, assessed_at')
        .eq('student_id', student.id)
        .not('score', 'is', null)
        .order('assessed_at', { ascending: false, nullsFirst: false })
        .limit(6);
      if (grades && grades.length >= 4) {
        const recent = grades.slice(0, 3).map((g) => Number(g.score));
        const prior = grades.slice(3).map((g) => Number(g.score));
        const recentAvg = recent.reduce((s, v) => s + v, 0) / recent.length;
        const priorAvg = prior.reduce((s, v) => s + v, 0) / prior.length;
        signals.grade_trend = { recent: recentAvg, prior: priorAvg };
        if (recentAvg < priorAvg - 10) {
          const sev = Math.min(1, (priorAvg - recentAvg) / 30);
          factors.push({
            key: 'grade_drop',
            label: `Recent grade average has fallen ${Math.round(
              priorAvg - recentAvg
            )} points`,
            severity: sev,
            detail: `Was ${priorAvg.toFixed(0)}, now ${recentAvg.toFixed(0)}.`,
          });
          score += sev * 18;
        }
      }

      // 5. ILP overdue
      const { data: ilp } = await sb
        .from('college_ilps')
        .select('review_date, status')
        .eq('student_id', student.id)
        .order('review_date', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();
      if (ilp?.review_date) {
        const rd = new Date(ilp.review_date as string);
        if (rd.getTime() < now.getTime()) {
          const daysOver = Math.floor((now.getTime() - rd.getTime()) / 86400_000);
          if (daysOver > 7) {
            factors.push({
              key: 'ilp_overdue',
              label: `ILP review is ${daysOver} days overdue`,
              severity: Math.min(1, daysOver / 60),
              detail: 'Book a review to keep the plan alive.',
            });
            score += Math.min(1, daysOver / 60) * 10;
          }
        }
      }

      // 6. Open pastoral flags
      const { data: flags } = await sb
        .from('pastoral_notes')
        .select('id, kind, action_required, action_completed_at')
        .eq('student_id', student.id)
        .in('kind', ['flag', 'concern', 'safeguarding'])
        .is('action_completed_at', null);
      const openFlags = (flags ?? []).length;
      if (openFlags > 0) {
        factors.push({
          key: 'open_flags',
          label: `${openFlags} open pastoral flag${openFlags === 1 ? '' : 's'}`,
          severity: Math.min(1, 0.3 + 0.25 * openFlags),
          detail: 'See pastoral notes tab for context.',
        });
        score += Math.min(30, 10 + openFlags * 7);
      }

      // Normalise score 0..100 (cap)
      score = Math.max(0, Math.min(100, score));

      const level: 'low' | 'medium' | 'high' | 'critical' =
        score >= 70 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low';

      // Sort factors strongest-first
      factors.sort((a, b) => b.severity - a.severity);

      // Demote old current row + insert new
      await sb
        .from('student_risk_scores')
        .update({ is_current: false })
        .eq('student_id', student.id)
        .eq('is_current', true);

      const { error: insErr } = await sb.from('student_risk_scores').insert({
        student_id: student.id,
        score,
        level,
        factors,
        signals,
        is_current: true,
      });
      if (insErr) {
        console.error('[compute-risk] insert failed', student.id, insErr);
        continue;
      }

      // Also reflect on college_students.risk_level so lists render without a join
      await sb
        .from('college_students')
        .update({ risk_level: toTitleCase(level) })
        .eq('id', student.id);

      processed++;
      results.push({ student_id: student.id, level, score });
    }

    return new Response(JSON.stringify({ processed, today: todayIso, results }), {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  } catch (e) {
    console.error('[compute-risk] fatal', e);
    return new Response(
      JSON.stringify({ error: (e as Error).message ?? 'unknown' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  }
});

function toTitleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
