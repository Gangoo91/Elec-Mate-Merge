import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useEvidenceTimeline — single per-learner evidence chain for the Ofsted
   "prove it" view. Aggregates ILP goals, portfolio items, quiz attempts,
   observations, OTJ entries, pastoral notes, tutor messages, EPA judgements
   into one chronologically sorted feed of EvidenceEvents.

   Each event normalises to a common shape so the UI can render one timeline
   regardless of source. RLS scopes everything to the caller's college via
   the existing _ch_same_college helper on each underlying table.

   Designed for ELE-894 / [A2] — "Prove it" inspector view.
   ========================================================================== */

export type EvidenceKind =
  | 'ilp_goal'
  | 'portfolio'
  | 'quiz'
  | 'observation'
  | 'otj'
  | 'note'
  | 'message'
  | 'epa'
  | 'attendance'
  | 'iqa';

export type EvidenceStatus = 'positive' | 'neutral' | 'concern' | 'pending';

export interface EvidenceEvent {
  id: string;
  kind: EvidenceKind;
  occurred_at: string; // ISO timestamp
  title: string;
  summary: string;
  status: EvidenceStatus;
  /** Deep-link to the source surface for inspector click-through. */
  href: string;
  /** AC codes attached to this evidence, when relevant. */
  ac_codes?: string[];
  /** Free-form metadata for the panel (score, duration, verdict, etc.). */
  meta?: Record<string, string | number | null>;
}

export interface EvidenceTimeline {
  studentId: string;
  studentName: string | null;
  studentUserId: string | null;
  events: EvidenceEvent[];
  counts: Record<EvidenceKind, number>;
  generated_at: string;
}

interface RawIlpGoal {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  priority: string | null;
  target_date: string | null;
  status: string | null;
  source: string | null;
  created_at: string;
  acceptance_criteria: string | null;
}

interface RawPortfolio {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: string | null;
  grade: string | null;
  date_completed: string | null;
  created_at: string;
  assessment_criteria_met: string[] | null;
}

interface RawQuizAttempt {
  id: string;
  quiz_id: string;
  score: number | null;
  total_points: number | null;
  completed_at: string | null;
  started_at: string | null;
  tutor_quizzes: {
    title: string | null;
    pass_mark: number | null;
  } | null;
}

interface RawObservation {
  id: string;
  observed_at: string;
  activity_title: string | null;
  outcome: string | null;
  grade: string | null;
  feedback_strengths: string | null;
  acs_evidenced: string[] | null;
}

interface RawOtj {
  id: string;
  activity_date: string;
  title: string;
  duration_minutes: number | null;
  verification_status: string | null;
  verified_at: string | null;
  unit_codes: string[] | null;
}

interface RawNote {
  id: string;
  kind: string;
  title: string | null;
  body: string;
  action_required: string | null;
  action_completed_at: string | null;
  created_at: string;
}

interface RawMessage {
  id: string;
  body: string;
  sender_kind: string | null;
  created_at: string;
}

interface RawEpa {
  id: string;
  predicted_grade: string | null;
  source: string | null;
  notes: string | null;
  created_at: string;
}

interface RawIqaSample {
  id: string;
  sampling_plan_id: string;
  observation_id: string | null;
  observation_title_snapshot: string | null;
  otj_id: string | null;
  otj_title_snapshot: string | null;
  iqa_name_snapshot: string | null;
  sampled_at: string;
  verdict: string;
  comments: string | null;
}

const EMPTY_COUNTS: Record<EvidenceKind, number> = {
  ilp_goal: 0,
  portfolio: 0,
  quiz: 0,
  observation: 0,
  otj: 0,
  note: 0,
  message: 0,
  epa: 0,
  attendance: 0,
  iqa: 0,
};

export function useEvidenceTimeline(collegeStudentId: string | null) {
  const [data, setData] = useState<EvidenceTimeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!collegeStudentId) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data: studentRow, error: studentErr } = await supabase
        .from('college_students')
        .select('id, name, user_id')
        .eq('id', collegeStudentId)
        .maybeSingle();
      if (studentErr) throw studentErr;
      const userId = (studentRow as { user_id?: string | null } | null)?.user_id ?? null;
      const studentName = (studentRow as { name?: string | null } | null)?.name ?? null;

      const [
        ilpRes,
        portfolioRes,
        quizzesRes,
        observationsRes,
        otjRes,
        notesRes,
        messagesRes,
        epaRes,
      ] = await Promise.all([
        // ILP goals — student_id on the goal table
        supabase
          .from('college_ilp_goals')
          .select(
            'id, title, description, category, priority, target_date, status, source, created_at, acceptance_criteria'
          )
          .eq('student_id', collegeStudentId)
          .order('created_at', { ascending: false })
          .limit(50),
        // Portfolio items — keyed by user_id (auth)
        userId
          ? supabase
              .from('portfolio_items')
              .select(
                'id, title, description, category, status, grade, date_completed, created_at, assessment_criteria_met'
              )
              .eq('user_id', userId)
              .order('date_completed', { ascending: false, nullsFirst: false })
              .limit(50)
          : Promise.resolve({ data: [], error: null }),
        // Quiz attempts — keyed by student_id (which is auth.uid here)
        userId
          ? supabase
              .from('tutor_quiz_attempts')
              .select(
                'id, quiz_id, score, total_points, completed_at, started_at, tutor_quizzes(title, pass_mark)'
              )
              .eq('student_id', userId)
              .order('started_at', { ascending: false })
              .limit(40)
          : Promise.resolve({ data: [], error: null }),
        // Observations — keyed by college_student_id
        supabase
          .from('college_observations')
          .select(
            'id, observed_at, activity_title, outcome, grade, feedback_strengths, acs_evidenced'
          )
          .eq('college_student_id', collegeStudentId)
          .order('observed_at', { ascending: false })
          .limit(40),
        // OTJ — keyed by user_id (auth)
        userId
          ? supabase
              .from('college_otj_entries')
              .select(
                'id, activity_date, title, duration_minutes, verification_status, verified_at, unit_codes'
              )
              .eq('student_id', userId)
              .order('activity_date', { ascending: false })
              .limit(40)
          : Promise.resolve({ data: [], error: null }),
        // Pastoral notes — keyed by college_student_id
        supabase
          .from('pastoral_notes')
          .select('id, kind, title, body, action_required, action_completed_at, created_at')
          .eq('student_id', collegeStudentId)
          .order('created_at', { ascending: false })
          .limit(30),
        // Tutor messages — via threads keyed by college_student_id
        supabase
          .from('student_message_threads')
          .select('id, last_message_at')
          .eq('student_id', collegeStudentId)
          .order('last_message_at', { ascending: false, nullsFirst: false })
          .limit(5)
          .then(async (tr) => {
            const ids = ((tr.data ?? []) as Array<{ id: string }>).map((t) => t.id);
            if (ids.length === 0) return { data: [], error: null };
            return supabase
              .from('student_messages')
              .select('id, body, sender_kind, created_at')
              .in('thread_id', ids)
              .order('created_at', { ascending: false })
              .limit(20);
          }),
        // EPA judgements — keyed by college_student_id
        supabase
          .from('college_epa_judgements')
          .select('id, predicted_grade, source, notes, created_at')
          .eq('college_student_id', collegeStudentId)
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      const events: EvidenceEvent[] = [];
      const counts: Record<EvidenceKind, number> = { ...EMPTY_COUNTS };

      // ─── ILP goals ────────────────────────────────────────────────
      const ilpGoals = (ilpRes.data ?? []) as RawIlpGoal[];
      for (const g of ilpGoals) {
        const status: EvidenceStatus =
          g.status === 'completed' ? 'positive' : g.status === 'blocked' ? 'concern' : 'pending';
        const sourceLabel =
          g.source === 'student'
            ? 'Apprentice proposed'
            : g.source === 'ai_suggested'
              ? 'AI suggested'
              : 'Tutor set';
        events.push({
          id: `ilp:${g.id}`,
          kind: 'ilp_goal',
          occurred_at: g.created_at,
          title: g.title,
          summary: `${sourceLabel} · ${g.category ?? 'goal'} · ${g.priority ?? 'medium'} priority${g.target_date ? ` · target ${g.target_date}` : ''}${g.acceptance_criteria ? ` · Done when: ${g.acceptance_criteria.slice(0, 120)}` : ''}`,
          status,
          href: `/college/students/${collegeStudentId}#ilp`,
          meta: { status: g.status ?? '—', priority: g.priority ?? '—' },
        });
      }
      counts.ilp_goal = ilpGoals.length;

      // ─── Portfolio items ──────────────────────────────────────────
      const portfolioItems = (portfolioRes.data ?? []) as RawPortfolio[];
      for (const p of portfolioItems) {
        const status: EvidenceStatus =
          p.status === 'signed_off' || p.grade === 'pass' || p.grade === 'distinction'
            ? 'positive'
            : p.status === 'rejected' || p.grade === 'fail'
              ? 'concern'
              : 'neutral';
        events.push({
          id: `portfolio:${p.id}`,
          kind: 'portfolio',
          occurred_at: p.date_completed ?? p.created_at,
          title: p.title,
          summary: `${p.category ?? 'Portfolio item'}${p.status ? ` · ${p.status}` : ''}${p.grade ? ` · ${p.grade}` : ''}${p.description ? ` · ${p.description.slice(0, 160)}` : ''}`,
          status,
          href: `/college/students/${collegeStudentId}#portfolio`,
          ac_codes: p.assessment_criteria_met ?? [],
          meta: { status: p.status ?? '—', grade: p.grade ?? '—' },
        });
      }
      counts.portfolio = portfolioItems.length;

      // ─── Quiz attempts ────────────────────────────────────────────
      const quizzes = (quizzesRes.data ?? []) as RawQuizAttempt[];
      for (const q of quizzes) {
        const passMark = q.tutor_quizzes?.pass_mark ?? 50;
        const pct =
          q.total_points && q.total_points > 0
            ? Math.round(((q.score ?? 0) / q.total_points) * 100)
            : null;
        const passed = pct != null ? pct >= passMark : null;
        const status: EvidenceStatus =
          passed === true ? 'positive' : passed === false ? 'concern' : 'neutral';
        events.push({
          id: `quiz:${q.id}`,
          kind: 'quiz',
          occurred_at: q.completed_at ?? q.started_at ?? new Date().toISOString(),
          title: q.tutor_quizzes?.title ?? 'Quiz attempt',
          summary: `${pct != null ? `Scored ${pct}%` : 'In progress'}${passed === true ? ' · passed' : passed === false ? ' · failed' : ''}${q.tutor_quizzes?.pass_mark != null ? ` · pass mark ${q.tutor_quizzes.pass_mark}%` : ''}`,
          status,
          href: `/college/quizzes`,
          meta: { score: pct ?? null, passed: passed === true ? 1 : passed === false ? 0 : null },
        });
      }
      counts.quiz = quizzes.length;

      // ─── Observations ─────────────────────────────────────────────
      const observations = (observationsRes.data ?? []) as RawObservation[];
      for (const o of observations) {
        const status: EvidenceStatus =
          o.outcome === 'achieved' || o.grade === 'distinction' || o.grade === 'merit'
            ? 'positive'
            : o.outcome === 'not_achieved' || o.grade === 'fail'
              ? 'concern'
              : 'neutral';
        events.push({
          id: `obs:${o.id}`,
          kind: 'observation',
          occurred_at: o.observed_at,
          title: o.activity_title ?? 'Observation',
          summary: `${o.outcome ?? 'recorded'}${o.grade ? ` · ${o.grade}` : ''}${o.feedback_strengths ? ` · ${o.feedback_strengths.slice(0, 160)}` : ''}`,
          status,
          href: `/college/students/${collegeStudentId}#observations`,
          ac_codes: o.acs_evidenced ?? [],
          meta: { outcome: o.outcome ?? '—', grade: o.grade ?? '—' },
        });
      }
      counts.observation = observations.length;

      // ─── OTJ entries ──────────────────────────────────────────────
      const otjEntries = (otjRes.data ?? []) as RawOtj[];
      for (const o of otjEntries) {
        const status: EvidenceStatus =
          o.verification_status === 'verified'
            ? 'positive'
            : o.verification_status === 'rejected'
              ? 'concern'
              : 'pending';
        const hours = o.duration_minutes != null ? (o.duration_minutes / 60).toFixed(1) : '—';
        events.push({
          id: `otj:${o.id}`,
          kind: 'otj',
          occurred_at: o.activity_date,
          title: o.title || 'OTJ entry',
          summary: `${hours}h${o.verification_status ? ` · ${o.verification_status}` : ' · pending verification'}${o.verified_at ? ` · verified ${o.verified_at.slice(0, 10)}` : ''}`,
          status,
          href: `/college/students/${collegeStudentId}#otj`,
          ac_codes: o.unit_codes ?? [],
          meta: { hours, status: o.verification_status ?? 'pending' },
        });
      }
      counts.otj = otjEntries.length;

      // ─── IQA samples ──────────────────────────────────────────────
      // Fetch IQA verdicts for any of THIS learner's observations or OTJ
      // entries. We do this after the main Promise.all because we need the
      // ids to filter on. RLS scopes by college through the parent plan.
      const obsIds = observations.map((o) => o.id);
      const otjIds = otjEntries.map((o) => o.id);
      let iqaSamples: RawIqaSample[] = [];
      if (obsIds.length > 0 || otjIds.length > 0) {
        // Build the OR filter as a comma-separated list compatible with PostgREST
        const filters: string[] = [];
        if (obsIds.length > 0) filters.push(`observation_id.in.(${obsIds.join(',')})`);
        if (otjIds.length > 0) filters.push(`otj_id.in.(${otjIds.join(',')})`);
        const { data: samplesData } = await supabase
          .from('college_iqa_samples')
          .select(
            'id, sampling_plan_id, observation_id, observation_title_snapshot, otj_id, otj_title_snapshot, iqa_name_snapshot, sampled_at, verdict, comments'
          )
          .or(filters.join(','))
          .order('sampled_at', { ascending: false });
        iqaSamples = (samplesData ?? []) as RawIqaSample[];
      }
      for (const s of iqaSamples) {
        const status: EvidenceStatus =
          s.verdict === 'agree'
            ? 'positive'
            : s.verdict === 'disagree' || s.verdict === 'refer'
              ? 'concern'
              : 'pending';
        const targetLabel = s.otj_id
          ? (s.otj_title_snapshot ?? 'OTJ entry')
          : (s.observation_title_snapshot ?? 'Observation');
        const targetType = s.otj_id ? 'OTJ' : 'Observation';
        events.push({
          id: `iqa:${s.id}`,
          kind: 'iqa',
          occurred_at: s.sampled_at,
          title: `IQA verdict: ${s.verdict}`,
          summary: `${targetType} sampled — "${targetLabel}"${s.iqa_name_snapshot ? ` · by ${s.iqa_name_snapshot}` : ''}${s.comments ? ` · ${s.comments.slice(0, 200)}` : ''}`,
          status,
          href: `/college/iqa/sampling/${s.sampling_plan_id}`,
          meta: { verdict: s.verdict, target: targetType.toLowerCase() },
        });
      }
      counts.iqa = iqaSamples.length;

      // ─── Pastoral notes ───────────────────────────────────────────
      const notes = (notesRes.data ?? []) as RawNote[];
      for (const n of notes) {
        const status: EvidenceStatus =
          n.action_required && !n.action_completed_at ? 'concern' : 'neutral';
        events.push({
          id: `note:${n.id}`,
          kind: 'note',
          occurred_at: n.created_at,
          title: n.title || `${n.kind} note`,
          summary:
            n.body.slice(0, 200) + (n.action_required ? ` · ACTION: ${n.action_required}` : ''),
          status,
          href: `/college/students/${collegeStudentId}`,
          meta: { kind: n.kind, action: n.action_required ?? '—' },
        });
      }
      counts.note = notes.length;

      // ─── Tutor messages ───────────────────────────────────────────
      const messages = (messagesRes.data ?? []) as RawMessage[];
      for (const m of messages) {
        events.push({
          id: `msg:${m.id}`,
          kind: 'message',
          occurred_at: m.created_at,
          title: `${m.sender_kind ?? 'message'}`,
          summary: m.body.slice(0, 200),
          status: 'neutral',
          href: `/college/students/${collegeStudentId}#messages`,
          meta: { sender: m.sender_kind ?? '—' },
        });
      }
      counts.message = messages.length;

      // ─── EPA judgements ───────────────────────────────────────────
      const epas = (epaRes.data ?? []) as RawEpa[];
      for (const e of epas) {
        const status: EvidenceStatus =
          e.predicted_grade === 'distinction' ||
          e.predicted_grade === 'merit' ||
          e.predicted_grade === 'pass'
            ? 'positive'
            : e.predicted_grade === 'fail'
              ? 'concern'
              : 'neutral';
        events.push({
          id: `epa:${e.id}`,
          kind: 'epa',
          occurred_at: e.created_at,
          title: `EPA judgement (${e.source ?? 'unknown'})`,
          summary: `Predicted ${e.predicted_grade ?? '—'}${e.notes ? ` · ${e.notes.slice(0, 200)}` : ''}`,
          status,
          href: `/college/students/${collegeStudentId}#epa`,
          meta: { grade: e.predicted_grade ?? '—', source: e.source ?? '—' },
        });
      }
      counts.epa = epas.length;

      // Sort newest first.
      events.sort((a, b) => (a.occurred_at < b.occurred_at ? 1 : -1));

      setData({
        studentId: collegeStudentId,
        studentName,
        studentUserId: userId,
        events,
        counts,
        generated_at: new Date().toISOString(),
      });
    } catch (e) {
      setError((e as Error).message ?? 'Could not load evidence timeline');
    } finally {
      setLoading(false);
    }
  }, [collegeStudentId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
