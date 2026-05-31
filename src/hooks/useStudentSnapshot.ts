/**
 * useStudentSnapshot
 *
 * Returns a compact "what Dave knows about you" snapshot for the AI tutor
 * page — same dataset the edge function loads server-side, just surfaced
 * to the UI for editorial display (header strip, smart suggested prompts).
 *
 * Kept independent of `useAM2Readiness` so Dave can render even if the
 * full readiness calc hasn't run. Reads `am2_scores` for component-level
 * weakness and `am2_mock_sessions` for recent practice frequency.
 */

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export interface WeakArea {
  componentKey: string;
  label: string;
  score: number;
}

export interface StudentSnapshot {
  firstName: string | null;
  apprenticeLevel: string | null;
  apprenticeYear: number | null;
  /** Component areas scoring below 70%, ordered weakest-first. */
  weakAreas: WeakArea[];
  /** Component areas at or above 70%, ordered strongest-first. */
  strongAreas: WeakArea[];
  /** Count of completed AM2 sessions in the last 14 days. */
  recentPracticeCount: number;
  /** Total overconfident-wrong answers across recent knowledge sessions. */
  overconfidentWrongs: number;
  /** Most recent session timestamp, if any. */
  lastPracticeAt: Date | null;
  /** Total portfolio items. */
  portfolioItems: number;
  /** Items added in the last 14 days. */
  portfolioRecent: number;
  /** Hours of OTJ logged in last 30 days (verified + pending combined). */
  otjHours30d: number;
  /** Hours of OTJ pending verification in last 30 days. */
  otjPendingHours: number;
  /** Active ILP goal count. */
  ilpGoalsActive: number;
  /** Attendance % in last 30 days. */
  attendancePct: number | null;
  /** AC coverage % across the qualification. */
  acCoveragePct: number | null;
  isLoading: boolean;
}

const COMPONENT_LABELS: Record<string, string> = {
  testingSequence: 'Testing sequence',
  faultDiagnosis: 'Fault diagnosis',
  safeIsolation: 'Safe isolation',
  knowledgeAssessment: 'Knowledge',
};

const EMPTY: StudentSnapshot = {
  firstName: null,
  apprenticeLevel: null,
  apprenticeYear: null,
  weakAreas: [],
  strongAreas: [],
  recentPracticeCount: 0,
  overconfidentWrongs: 0,
  lastPracticeAt: null,
  portfolioItems: 0,
  portfolioRecent: 0,
  otjHours30d: 0,
  otjPendingHours: 0,
  ilpGoalsActive: 0,
  attendancePct: null,
  acCoveragePct: null,
  isLoading: true,
};

export function useStudentSnapshot(): StudentSnapshot {
  const { user } = useAuth();
  const [snap, setSnap] = useState<StudentSnapshot>(EMPTY);

  useEffect(() => {
    if (!user) {
      setSnap({ ...EMPTY, isLoading: false });
      return;
    }
    let cancelled = false;
    (async () => {
      const since14 = new Date(Date.now() - 14 * 86_400_000).toISOString();
      const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();

      // student_ac_coverage, college_ilp_goals and college_attendance key on
      // college_students.id — NOT the auth uid (college_otj_entries does use the
      // uid). Resolve it once; if the user isn't enrolled as a college student
      // those datasets stay empty rather than 400-ing or silently mismatching.
      const { data: csRow } = await db
        .from('college_students')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      const csId = (csRow?.id as string | undefined) ?? null;

      const [
        profileRes,
        scoresRes,
        sessionsRes,
        portfolioRes,
        otjRes,
        ilpRes,
        attendanceRes,
        acRes,
      ] = await Promise.all([
        db
          .from('profiles')
          .select('full_name, apprentice_level, apprentice_year')
          .eq('id', user.id)
          .maybeSingle(),
        db.from('am2_scores').select('component_key, score').eq('user_id', user.id),
        db
          .from('am2_mock_sessions')
          .select('completed_at, session_data, session_type')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .gte('completed_at', since14)
          .order('completed_at', { ascending: false })
          .limit(30),
        db
          .from('portfolio_items')
          .select('id, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(100),
        db
          .from('college_otj_entries')
          .select('duration_minutes, verification_status, activity_date')
          .eq('student_id', user.id)
          .gte('activity_date', since30.slice(0, 10))
          .limit(60),
        csId
          ? db
              .from('college_ilp_goals')
              .select('id, status')
              .eq('student_id', csId)
              .neq('status', 'completed')
          : Promise.resolve({ data: [] as Array<{ id: string; status: string }> }),
        csId
          ? db
              .from('college_attendance')
              .select('status, date')
              .eq('student_id', csId)
              .gte('date', since30.slice(0, 10))
              .limit(40)
          : Promise.resolve({ data: [] as Array<{ status: string; date: string }> }),
        csId
          ? db.from('student_ac_coverage').select('status').eq('student_id', csId)
          : Promise.resolve({ data: [] as Array<{ status: string }> }),
      ]);

      if (cancelled) return;

      const scores = (scoresRes.data ?? []) as Array<{
        component_key: string;
        score: number;
      }>;
      const weakAreas: WeakArea[] = scores
        .filter((s) => (s.score ?? 0) < 70)
        .sort((a, b) => a.score - b.score)
        .map((s) => ({
          componentKey: s.component_key,
          label: COMPONENT_LABELS[s.component_key] ?? s.component_key,
          score: Math.round(s.score),
        }));
      const strongAreas: WeakArea[] = scores
        .filter((s) => (s.score ?? 0) >= 70)
        .sort((a, b) => b.score - a.score)
        .map((s) => ({
          componentKey: s.component_key,
          label: COMPONENT_LABELS[s.component_key] ?? s.component_key,
          score: Math.round(s.score),
        }));

      const sessions = (sessionsRes.data ?? []) as Array<{
        completed_at: string;
        session_data: { calibration?: { overconfident?: number } } | null;
      }>;
      let overconfidentWrongs = 0;
      for (const s of sessions) {
        const cal = s.session_data?.calibration;
        if (cal && typeof cal === 'object') {
          overconfidentWrongs += Number(cal.overconfident ?? 0);
        }
      }

      const portfolioItems = portfolioRes.data?.length ?? 0;
      const portfolioRecent = (
        (portfolioRes.data ?? []) as Array<{ created_at: string }>
      ).filter((p) => new Date(p.created_at) >= new Date(since14)).length;

      const otjRows = (otjRes.data ?? []) as Array<{
        duration_minutes: number | null;
        verification_status: string | null;
      }>;
      const otjTotalMin = otjRows.reduce(
        (a, r) => a + (r.duration_minutes ?? 0),
        0
      );
      const otjPendingMin = otjRows
        .filter((r) => r.verification_status === 'pending')
        .reduce((a, r) => a + (r.duration_minutes ?? 0), 0);

      const ilpGoalsActive = ilpRes.data?.length ?? 0;

      const attendance = (attendanceRes.data ?? []) as Array<{ status: string }>;
      const attendancePct = attendance.length > 0
        ? Math.round(
            (attendance.filter(
              (a) => a.status === 'Present' || a.status === 'present'
            ).length /
              attendance.length) *
              100
          )
        : null;

      // student_ac_coverage is one row per AC; coverage = evidenced/assessed/
      // confirmed over the total tracked (mirrors MyAcCoverageCard).
      const acRows = (acRes.data ?? []) as Array<{ status: string }>;
      const acCovered = acRows.filter(
        (r) => r.status === 'evidenced' || r.status === 'assessed' || r.status === 'confirmed'
      ).length;
      const acCoveragePct = acRows.length > 0 ? Math.round((acCovered / acRows.length) * 100) : null;

      // full_name is often stored ALL-CAPS — title-case the first token so the
      // greeting reads "Alright Andrew." not "Alright ANDREW."
      const rawFirst = (profileRes.data?.full_name ?? '').trim().split(/\s+/)[0] ?? '';
      const firstName = rawFirst
        ? rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase()
        : null;

      setSnap({
        firstName,
        apprenticeLevel: profileRes.data?.apprentice_level ?? null,
        apprenticeYear: profileRes.data?.apprentice_year ?? null,
        weakAreas,
        strongAreas,
        recentPracticeCount: sessions.length,
        overconfidentWrongs,
        lastPracticeAt: sessions[0]?.completed_at ? new Date(sessions[0].completed_at) : null,
        portfolioItems,
        portfolioRecent,
        otjHours30d: Math.round(otjTotalMin / 60),
        otjPendingHours: Math.round(otjPendingMin / 60),
        ilpGoalsActive,
        attendancePct,
        acCoveragePct,
        isLoading: false,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return snap;
}

/**
 * Build a list of suggested prompts seeded from the snapshot. These replace
 * the generic "Safe isolation / Cable sizing / Test sequence / RCD rules"
 * chips with something that actually reflects what the apprentice needs.
 */
export function buildSmartPrompts(snap: StudentSnapshot): string[] {
  const out: string[] = [];

  // 1. Weakest AM2 area
  if (snap.weakAreas.length > 0) {
    const w = snap.weakAreas[0];
    out.push(`Help me with my weakest area — ${w.label.toLowerCase()} (${w.score}%)`);
  }

  // 2. Blind-spot regs from calibration
  if (snap.overconfidentWrongs > 0) {
    out.push(
      `I got ${snap.overconfidentWrongs} regulation${snap.overconfidentWrongs === 1 ? '' : 's'} wrong while certain — what should I revise?`
    );
  }

  // 3. Portfolio nudge
  if (snap.portfolioItems === 0) {
    out.push('Help me write up my first portfolio evidence — what should I include?');
  } else if (snap.portfolioRecent === 0 && snap.portfolioItems > 0) {
    out.push('I haven\'t added portfolio evidence recently — what should I capture from this week?');
  }

  // 4. OTJ pending nudge
  if (snap.otjPendingHours >= 4) {
    out.push(`I've got ${snap.otjPendingHours}h of OTJ pending sign-off — what counts as good evidence?`);
  }

  // 5. Practice rhythm
  if (snap.recentPracticeCount === 0 && out.length < 4) {
    out.push('I haven\'t practised yet — where should I start?');
  } else if (snap.recentPracticeCount >= 5 && out.length < 4) {
    out.push('I\'ve been practising hard — what should I focus on next?');
  }

  // 6. AC coverage nudge
  if (snap.acCoveragePct !== null && snap.acCoveragePct < 50 && out.length < 4) {
    out.push(`My AC coverage is ${snap.acCoveragePct}% — which assessment criteria should I prioritise?`);
  }

  // 7. Second weakest area
  if (snap.weakAreas.length > 1 && out.length < 4) {
    out.push(`Quick recap on ${snap.weakAreas[1].label.toLowerCase()}`);
  }

  // Fallbacks
  const fallback = [
    'Walk me through the safe isolation procedure',
    'Explain the initial verification test sequence in order',
    'When is RCD protection required for sockets?',
    'How do I calculate cable size for a cooker circuit?',
  ];
  for (const f of fallback) {
    if (out.length >= 4) break;
    out.push(f);
  }

  return out.slice(0, 4);
}
