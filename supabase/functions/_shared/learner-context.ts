// Shared learner-context loader for every personalisation AI surface.
//
// Why this exists: ai-next-best-action, ai-suggest-ilp-goal, ai-generate-ilp,
// ai-epa-brief, ai-author-quiz, ai-assessor each used to load their own slice
// of context. Some forgot tutor_quiz_attempts entirely. Others didn't read the
// latest EPA judgement. The result: AI surfaces gave inconsistent advice
// because they were each reasoning from a different shape of the same learner.
//
// This helper is the single source of truth. Every caller gets the full
// `LearnerContext` object and just picks the slices it needs for its prompt.
//
// Best-effort throughout: any block that errors / RLS-denies returns its
// zero-value (empty array, null) rather than throwing the whole load.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

type Sb = ReturnType<typeof createClient>;

export interface LearnerContext {
  loaded_at: string; // ISO timestamp — useful for prompts ("data as of …")

  student: {
    id: string; // college_students.id
    user_id: string | null; // auth.users.id
    name: string;
    college_id: string;
    course_id: string | null;
    cohort_id: string | null;
    employer_id: string | null;
  };

  course: { name: string | null; code: string | null } | null;

  inclusion: {
    send_flags: string[];
    eal: boolean;
    ehcp: boolean;
    first_language: string | null;
  };

  ac: {
    total: number;
    not_started: number;
    in_progress: number;
    evidenced: number;
    assessed: number;
    confirmed: number;
    weak_units: Array<{
      unit_code: string;
      unit_title: string | null;
      not_started: number;
      total: number;
    }>;
  };

  attendance: {
    last_28_pct: number | null;
    last_90_pct: number | null;
    days_attended_28: number;
    days_total_28: number;
    pattern_notes: string[]; // e.g. "Often misses Mondays"
  };

  observations: Array<{
    activity_title: string;
    outcome: string;
    grade: string | null;
    observed_at: string;
    unit_code: string | null;
  }>;

  otj: {
    total_minutes: number;
    required_minutes: number;
    pct: number | null;
    last_28_minutes: number;
  };

  portfolio: {
    items: number;
    submissions: number;
    iqa_verified: number;
    awaiting_review: number;
    requires_action: number;
    recent_titles: string[]; // last 5 portfolio item titles
  };

  mocks: Array<{
    session_type: string;
    overall_score: number | null;
    predicted_grade: string | null;
    completed_at: string | null;
  }>;

  judgements: {
    learner: PriorJudgement | null;
    tutor: PriorJudgement | null;
    ai: PriorJudgement | null;
  };

  gateway: Record<string, unknown> | null;

  ilp: {
    id: string | null;
    status: string | null;
    headline_focus: string | null;
    target_completion_date: string | null;
    review_date: string | null;
    goals: Array<{
      id: string;
      title: string;
      status: string;
      priority: string | null;
      target_date: string | null;
      blocked_reason: string | null;
    }>;
  };

  // The most-impactful gap we're closing — every personalisation surface
  // should know about recent quiz attempts.
  quizzes: {
    attempts: Array<{
      id: string;
      quiz_id: string;
      title: string;
      kind: string; // quiz / assessment / mock_exam
      score: number | null;
      total_points: number | null;
      percentage: number | null;
      passed: boolean | null;
      pass_mark: number | null;
      completed_at: string | null;
      ac_refs: string[]; // ACs touched by the quiz, sourced from questions
    }>;
    weak_categories: string[]; // categories where avg < pass mark
    avg_recent_percent: number | null; // last 5 attempts
    pending_ai_grades: number;
    sent_not_started: number; // assigned + published but no attempt yet
  };

  ksbs: Array<{
    ksb_code: string;
    status: string;
    evidence_count: number;
  }>;

  activity: {
    last_28_count: number;
    last_28_minutes: number;
    by_type: Record<string, number>; // count per activity_type
  };

  risk: {
    level: string | null; // 'low' | 'medium' | 'high'
    score: number | null;
    reasons: string[];
    last_updated: string | null;
  };

  pastoral_notes_open: number;
}

interface PriorJudgement {
  verdict: string;
  predicted_grade: string | null;
  confidence: number | null;
  created_at: string;
  rationale: string | null;
}

const REQUIRED_OTJ_MIN = 37_440; // 624 h × 60

export async function loadLearnerContext(
  sb: Sb,
  collegeStudentId: string
): Promise<LearnerContext | null> {
  const { data: studentRow } = await sb
    .from('college_students')
    .select(
      'id, user_id, name, college_id, course_id, cohort_id, employer_id, send_flags, eal, ehcp_ref, first_language'
    )
    .eq('id', collegeStudentId)
    .maybeSingle();
  if (!studentRow) return null;
  const s = studentRow as Record<string, unknown>;
  const userId = (s.user_id as string | null) ?? null;
  const courseId = (s.course_id as string | null) ?? null;

  // Run independent queries in parallel.
  const [
    courseRes,
    acRes,
    obsRes,
    attRes,
    submissionsRes,
    portfolioCountRes,
    portfolioTitlesRes,
    mocksRes,
    activityRes,
    studyRes,
    collegeOtjRes,
    gatewayRes,
    ilpRes,
    judgementsRes,
    ksbsRes,
    riskRes,
    pastoralRes,
    quizAttemptsRes,
    sentQuizzesRes,
  ] = await Promise.all([
    courseId
      ? sb.from('college_courses').select('name, code').eq('id', courseId).maybeSingle()
      : Promise.resolve({ data: null }),
    sb.from('student_ac_coverage').select('unit_code, status').eq('student_id', collegeStudentId),
    sb
      .from('college_observations')
      .select('activity_title, outcome, grade, observed_at, unit_code')
      .eq('college_student_id', collegeStudentId)
      .order('observed_at', { ascending: false })
      .limit(10),
    sb
      .from('college_attendance')
      .select('date, status')
      .eq('college_student_id', collegeStudentId)
      .gte('date', daysAgo(90))
      .order('date', { ascending: false }),
    userId
      ? sb
          .from('portfolio_submissions')
          .select('status, action_required, iqa_outcome')
          .eq('user_id', userId)
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? sb
          .from('portfolio_items')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
      : Promise.resolve({ data: null, count: 0 }),
    userId
      ? sb
          .from('portfolio_items')
          .select('title, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5)
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? sb
          .from('epa_mock_sessions')
          .select('session_type, overall_score, predicted_grade, completed_at')
          .eq('user_id', userId)
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(8)
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? sb
          .from('learning_activity_log')
          .select('activity_type, duration_minutes, counted_as_ojt, created_at')
          .eq('user_id', userId)
          .gte('created_at', daysAgo(28))
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? sb.from('study_sessions').select('duration, started_at').eq('user_id', userId)
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? sb
          .from('college_otj_entries')
          .select('duration_minutes, source_kind, entry_date')
          .eq('student_id', userId)
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? sb.from('epa_gateway_checklists').select('*').eq('user_id', userId).maybeSingle()
      : Promise.resolve({ data: null }),
    sb
      .from('college_ilps')
      .select('id, status, headline_focus, target_completion_date, review_date')
      .eq('college_student_id', collegeStudentId)
      .eq('is_current', true)
      .maybeSingle(),
    sb
      .from('college_epa_judgements')
      .select('source, verdict, predicted_grade, confidence, rationale, created_at')
      .eq('college_student_id', collegeStudentId)
      .eq('is_current', true),
    userId
      ? sb
          .from('user_ksb_progress')
          .select('ksb_code, status, evidence_count')
          .eq('user_id', userId)
      : Promise.resolve({ data: [] as unknown[] }),
    sb
      .from('student_risk_scores')
      .select('risk_level, risk_score, reasons, updated_at')
      .eq('college_student_id', collegeStudentId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    sb
      .from('pastoral_notes')
      .select('id', { count: 'exact', head: true })
      .eq('college_student_id', collegeStudentId)
      .eq('status', 'open'),
    userId
      ? sb
          .from('tutor_quiz_attempts')
          .select(
            'id, quiz_id, score, total_points, completed_at, started_at, tutor_quizzes(title, pass_mark, kind)'
          )
          .eq('student_id', userId)
          .order('completed_at', { ascending: false, nullsFirst: false })
          .limit(20)
      : Promise.resolve({ data: [] as unknown[] }),
    userId
      ? buildSentQuizzesQuery(sb, userId, (s.cohort_id as string | null) ?? null)
      : Promise.resolve({ data: [] as unknown[] }),
  ]);

  // Course
  let course: LearnerContext['course'] = null;
  let qualCode: string | null = null;
  if (courseRes.data) {
    const c = courseRes.data as { name: string | null; code: string | null };
    course = { name: c.name, code: c.code };
    // Resolve the enrolment code to the canonical requirement code that holds
    // LO/AC rows (e.g. EAL 603/3895/8 → 601/7345/2). course.code keeps the
    // original enrolment code for display; qualCode drives the AC queries below.
    qualCode = await resolveRequirementCode(sb, c.code);
  }

  // AC coverage
  const ac = aggregateAcCoverage(
    (acRes.data ?? []) as Array<{ unit_code: string; status: string }>
  );
  if (qualCode && ac.weak_units.length > 0) {
    const { data: titles } = await sb
      .from('qualification_requirements')
      .select('unit_code, unit_title')
      .eq('qualification_code', qualCode)
      .in(
        'unit_code',
        ac.weak_units.map((w) => w.unit_code)
      );
    const titleMap = new Map<string, string | null>();
    for (const t of (titles ?? []) as Array<{ unit_code: string; unit_title: string | null }>) {
      titleMap.set(t.unit_code, t.unit_title);
    }
    for (const w of ac.weak_units) w.unit_title = titleMap.get(w.unit_code) ?? null;
  }

  // Observations
  const observations = (
    (obsRes.data ?? []) as Array<{
      activity_title: string;
      outcome: string;
      grade: string | null;
      observed_at: string;
      unit_code: string | null;
    }>
  ).map((o) => ({
    activity_title: o.activity_title,
    outcome: o.outcome,
    grade: o.grade,
    observed_at: o.observed_at,
    unit_code: o.unit_code,
  }));

  // Attendance — basic + pattern detection
  const attendance = aggregateAttendance(
    (attRes.data ?? []) as Array<{ date: string; status: string }>
  );

  // Portfolio
  const subRows = (submissionsRes.data ?? []) as Array<{
    status: string;
    action_required: string | null;
    iqa_outcome: string | null;
  }>;
  const portfolio: LearnerContext['portfolio'] = {
    items: (portfolioCountRes as { count?: number }).count ?? 0,
    submissions: subRows.length,
    iqa_verified: subRows.filter((s) => s.iqa_outcome === 'verified').length,
    awaiting_review: subRows.filter((s) =>
      ['submitted', 'in_review', 'under_review', 'resubmitted'].includes(s.status)
    ).length,
    requires_action: subRows.filter((s) => s.action_required).length,
    recent_titles: ((portfolioTitlesRes.data ?? []) as Array<{ title: string }>).map(
      (t) => t.title
    ),
  };

  // Mocks
  const mocks = (mocksRes.data ?? []) as LearnerContext['mocks'];

  // OTJ — sum across activity log + study sessions + college entries
  let otjMinutes = 0;
  let last28Minutes = 0;
  for (const r of (activityRes.data ?? []) as Array<{
    duration_minutes: number | null;
    counted_as_ojt: boolean | null;
    created_at: string;
  }>) {
    if (r.counted_as_ojt) otjMinutes += r.duration_minutes ?? 0;
    if (r.created_at >= daysAgo(28)) last28Minutes += r.duration_minutes ?? 0;
  }
  for (const r of (studyRes.data ?? []) as Array<{ duration: number | null }>) {
    otjMinutes += (r.duration ?? 0) / 60;
  }
  for (const r of (collegeOtjRes.data ?? []) as Array<{
    duration_minutes: number | null;
    entry_date: string | null;
  }>) {
    otjMinutes += r.duration_minutes ?? 0;
    if (r.entry_date && r.entry_date >= daysAgo(28)) last28Minutes += r.duration_minutes ?? 0;
  }
  const otj: LearnerContext['otj'] = {
    total_minutes: Math.round(otjMinutes),
    required_minutes: REQUIRED_OTJ_MIN,
    pct:
      REQUIRED_OTJ_MIN > 0
        ? Math.min(100, Math.round((otjMinutes / REQUIRED_OTJ_MIN) * 100))
        : null,
    last_28_minutes: Math.round(last28Minutes),
  };

  // Inclusion
  const inclusion: LearnerContext['inclusion'] = {
    send_flags: (s.send_flags as string[] | null) ?? [],
    eal: Boolean(s.eal),
    ehcp: Boolean(s.ehcp_ref),
    first_language: (s.first_language as string | null) ?? null,
  };

  // ILP + goals
  const ilpRow = ilpRes.data as {
    id: string;
    status: string;
    headline_focus: string | null;
    target_completion_date: string | null;
    review_date: string | null;
  } | null;
  let ilpGoals: LearnerContext['ilp']['goals'] = [];
  if (ilpRow?.id) {
    const { data: g } = await sb
      .from('college_ilp_goals')
      .select('id, title, status, priority, target_date, blocked_reason')
      .eq('ilp_id', ilpRow.id)
      .order('sort_order', { ascending: true, nullsFirst: false });
    ilpGoals = ((g ?? []) as LearnerContext['ilp']['goals']).map((row) => ({
      id: row.id,
      title: row.title,
      status: row.status,
      priority: row.priority,
      target_date: row.target_date,
      blocked_reason: row.blocked_reason,
    }));
  }
  const ilp: LearnerContext['ilp'] = {
    id: ilpRow?.id ?? null,
    status: ilpRow?.status ?? null,
    headline_focus: ilpRow?.headline_focus ?? null,
    target_completion_date: ilpRow?.target_completion_date ?? null,
    review_date: ilpRow?.review_date ?? null,
    goals: ilpGoals,
  };

  // Judgements (latest per source)
  const judgements: LearnerContext['judgements'] = {
    learner: null,
    tutor: null,
    ai: null,
  };
  for (const j of (judgementsRes.data ?? []) as Array<{
    source: 'learner' | 'tutor' | 'ai';
    verdict: string;
    predicted_grade: string | null;
    confidence: number | null;
    rationale: string | null;
    created_at: string;
  }>) {
    if (j.source !== 'learner' && j.source !== 'tutor' && j.source !== 'ai') continue;
    judgements[j.source] = {
      verdict: j.verdict,
      predicted_grade: j.predicted_grade,
      confidence: j.confidence,
      rationale: j.rationale,
      created_at: j.created_at,
    };
  }

  // KSBs
  const ksbs = (
    (ksbsRes.data ?? []) as Array<{
      ksb_code: string;
      status: string;
      evidence_count: number | null;
    }>
  ).map((k) => ({
    ksb_code: k.ksb_code,
    status: k.status,
    evidence_count: k.evidence_count ?? 0,
  }));

  // Risk
  const riskRow = riskRes.data as {
    risk_level: string | null;
    risk_score: number | null;
    reasons: string[] | null;
    updated_at: string | null;
  } | null;
  const risk: LearnerContext['risk'] = {
    level: riskRow?.risk_level ?? null,
    score: riskRow?.risk_score ?? null,
    reasons: riskRow?.reasons ?? [],
    last_updated: riskRow?.updated_at ?? null,
  };

  // Activity by type
  const activityByType: Record<string, number> = {};
  let actCount = 0;
  let actMinutes = 0;
  for (const r of (activityRes.data ?? []) as Array<{
    activity_type: string;
    duration_minutes: number | null;
  }>) {
    actCount += 1;
    actMinutes += r.duration_minutes ?? 0;
    activityByType[r.activity_type] = (activityByType[r.activity_type] ?? 0) + 1;
  }
  const activity: LearnerContext['activity'] = {
    last_28_count: actCount,
    last_28_minutes: actMinutes,
    by_type: activityByType,
  };

  // Quiz attempts — the big new addition
  const quizzes = await aggregateQuizAttempts(
    sb,
    (quizAttemptsRes.data ?? []) as RawAttemptRow[],
    (sentQuizzesRes.data ?? []) as Array<{ id: string }>
  );

  return {
    loaded_at: new Date().toISOString(),
    student: {
      id: s.id as string,
      user_id: userId,
      name: (s.name as string) ?? 'Learner',
      college_id: s.college_id as string,
      course_id: courseId,
      cohort_id: (s.cohort_id as string | null) ?? null,
      employer_id: (s.employer_id as string | null) ?? null,
    },
    course,
    inclusion,
    ac,
    attendance,
    observations,
    otj,
    portfolio,
    mocks,
    judgements,
    gateway: (gatewayRes.data ?? null) as Record<string, unknown> | null,
    ilp,
    quizzes,
    ksbs,
    activity,
    risk,
    pastoral_notes_open: (pastoralRes as { count?: number }).count ?? 0,
  };
}

/* ───────────────────── helpers ───────────────────── */

function daysAgo(n: number): string {
  return new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);
}

function aggregateAcCoverage(
  rows: Array<{ unit_code: string; status: string }>
): LearnerContext['ac'] {
  const ac: LearnerContext['ac'] = {
    total: 0,
    not_started: 0,
    in_progress: 0,
    evidenced: 0,
    assessed: 0,
    confirmed: 0,
    weak_units: [],
  };
  const unitMap = new Map<string, { not_started: number; total: number }>();
  for (const r of rows) {
    ac.total += 1;
    if (r.status === 'not_started') ac.not_started += 1;
    else if (r.status === 'in_progress') ac.in_progress += 1;
    else if (r.status === 'evidenced') ac.evidenced += 1;
    else if (r.status === 'assessed') ac.assessed += 1;
    else if (r.status === 'confirmed') ac.confirmed += 1;
    let u = unitMap.get(r.unit_code);
    if (!u) {
      u = { not_started: 0, total: 0 };
      unitMap.set(r.unit_code, u);
    }
    u.total += 1;
    if (r.status === 'not_started') u.not_started += 1;
  }
  ac.weak_units = Array.from(unitMap.entries())
    .map(([unit_code, v]) => ({
      unit_code,
      unit_title: null as string | null,
      not_started: v.not_started,
      total: v.total,
      ratio: v.total ? v.not_started / v.total : 0,
    }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 6)
    .filter((u) => u.not_started > 0)
    .map(({ ratio: _, ...rest }) => rest);
  return ac;
}

function aggregateAttendance(
  rows: Array<{ date: string; status: string }>
): LearnerContext['attendance'] {
  const today = new Date().toISOString().slice(0, 10);
  const cutoff28 = daysAgo(28);
  const last28 = rows.filter((r) => r.date >= cutoff28 && r.date <= today);
  const last90 = rows;
  const present28 = last28.filter((r) => r.status === 'Present').length;
  const present90 = last90.filter((r) => r.status === 'Present').length;
  // Pattern: any weekday with > 50% absence rate
  const dayBuckets: Record<number, { present: number; total: number }> = {};
  for (const r of last90) {
    const d = new Date(r.date).getDay();
    if (!dayBuckets[d]) dayBuckets[d] = { present: 0, total: 0 };
    dayBuckets[d].total += 1;
    if (r.status === 'Present') dayBuckets[d].present += 1;
  }
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const patterns: string[] = [];
  for (const [d, v] of Object.entries(dayBuckets)) {
    if (v.total >= 4 && v.present / v.total < 0.5) {
      patterns.push(`Often misses ${dayNames[Number(d)]}s`);
    }
  }
  return {
    last_28_pct: last28.length > 0 ? Math.round((present28 / last28.length) * 100) : null,
    last_90_pct: last90.length > 0 ? Math.round((present90 / last90.length) * 100) : null,
    days_attended_28: present28,
    days_total_28: last28.length,
    pattern_notes: patterns,
  };
}

function buildSentQuizzesQuery(sb: Sb, userId: string, cohortId: string | null) {
  // Two parallel queries — see useMyAssignedQuizzes for why .or() with array
  // contains is fragile.
  const direct = sb
    .from('tutor_quizzes')
    .select('id')
    .eq('is_published', true)
    .contains('assigned_student_ids', [userId]);
  if (!cohortId) return direct;
  // Merge direct + cohort with a Promise that mimics the supabase response shape
  return Promise.all([
    direct,
    sb.from('tutor_quizzes').select('id').eq('is_published', true).eq('cohort_id', cohortId),
  ]).then(([a, b]) => {
    const ids = new Set<string>();
    const merged: Array<{ id: string }> = [];
    for (const row of [
      ...((a.data ?? []) as Array<{ id: string }>),
      ...((b.data ?? []) as Array<{ id: string }>),
    ]) {
      if (ids.has(row.id)) continue;
      ids.add(row.id);
      merged.push(row);
    }
    return { data: merged, error: null };
  });
}

interface RawAttemptRow {
  id: string;
  quiz_id: string;
  score: number | null;
  total_points: number | null;
  completed_at: string | null;
  started_at: string | null;
  tutor_quizzes: {
    title: string | null;
    pass_mark: number | null;
    kind: string | null;
  } | null;
}

async function aggregateQuizAttempts(
  sb: Sb,
  attempts: RawAttemptRow[],
  sentQuizzes: Array<{ id: string }>
): Promise<LearnerContext['quizzes']> {
  const completed = attempts.filter((a) => a.completed_at);
  const recent5 = completed.slice(0, 5);
  const avg_recent_percent =
    recent5.length > 0
      ? Math.round(
          recent5
            .filter((a) => a.score != null && a.total_points != null && a.total_points > 0)
            .reduce((sum, a) => sum + ((a.score as number) / (a.total_points as number)) * 100, 0) /
            Math.max(1, recent5.length)
        )
      : null;

  // Pull AC refs and categories for the quizzes the learner has attempted
  const quizIds = Array.from(new Set(attempts.map((a) => a.quiz_id)));
  const acRefsByQuiz = new Map<string, string[]>();
  const categoriesByQuiz = new Map<string, string[]>();
  if (quizIds.length > 0) {
    const { data: qs } = await sb
      .from('tutor_quiz_questions')
      .select('quiz_id, ac_ref, category')
      .in('quiz_id', quizIds);
    for (const r of (qs ?? []) as Array<{
      quiz_id: string;
      ac_ref: string | null;
      category: string | null;
    }>) {
      if (r.ac_ref) {
        const set = acRefsByQuiz.get(r.quiz_id) ?? [];
        if (!set.includes(r.ac_ref)) set.push(r.ac_ref);
        acRefsByQuiz.set(r.quiz_id, set);
      }
      if (r.category) {
        const set = categoriesByQuiz.get(r.quiz_id) ?? [];
        if (!set.includes(r.category)) set.push(r.category);
        categoriesByQuiz.set(r.quiz_id, set);
      }
    }
  }

  // Pending AI grades across this learner's attempts
  let pending_ai_grades = 0;
  if (attempts.length > 0) {
    const { data: g } = await sb
      .from('tutor_quiz_answer_grades')
      .select('attempt_id, ai_score')
      .in(
        'attempt_id',
        attempts.map((a) => a.id)
      );
    pending_ai_grades = ((g ?? []) as Array<{ ai_score: number | null }>).filter(
      (row) => row.ai_score == null
    ).length;
  }

  // Weak categories: where the cohort's avg on that category is < 60%
  const categoryScores = new Map<string, { sum: number; n: number }>();
  for (const a of completed) {
    if (a.score == null || a.total_points == null || a.total_points === 0) continue;
    const pct = (a.score / a.total_points) * 100;
    const cats = categoriesByQuiz.get(a.quiz_id) ?? [];
    for (const c of cats) {
      const cur = categoryScores.get(c) ?? { sum: 0, n: 0 };
      cur.sum += pct;
      cur.n += 1;
      categoryScores.set(c, cur);
    }
  }
  const weak_categories = Array.from(categoryScores.entries())
    .filter(([, v]) => v.n > 0 && v.sum / v.n < 60)
    .map(([c]) => c);

  // Sent-but-not-started: published and assigned but no attempt row yet
  const attemptedQuizIds = new Set(quizIds);
  const sent_not_started = sentQuizzes.filter((q) => !attemptedQuizIds.has(q.id)).length;

  const out: LearnerContext['quizzes'] = {
    attempts: attempts.map((a) => {
      const total = a.total_points ?? null;
      const pct = total && a.score != null ? Math.round((a.score / total) * 100) : null;
      const passMark = a.tutor_quizzes?.pass_mark ?? null;
      return {
        id: a.id,
        quiz_id: a.quiz_id,
        title: a.tutor_quizzes?.title ?? 'Quiz',
        kind: a.tutor_quizzes?.kind ?? 'quiz',
        score: a.score,
        total_points: total,
        percentage: pct,
        passed: passMark != null && pct != null ? pct >= passMark : null,
        pass_mark: passMark,
        completed_at: a.completed_at,
        ac_refs: acRefsByQuiz.get(a.quiz_id) ?? [],
      };
    }),
    weak_categories,
    avg_recent_percent,
    pending_ai_grades,
    sent_not_started,
  };
  return out;
}

/* ───────────────────── grounding kit ─────────────────────
   The pieces every AI surface uses to ANSWER, not just to understand the
   learner: the qualification's full LO/AC catalogue (so the AI sees what
   "good" looks like even if the learner hasn't touched it yet) and BS 7671
   facets relevant to whatever topic the AI is reasoning about.
   ──────────────────────────────────────────────────────── */

export interface QualificationAc {
  unit_code: string;
  unit_title: string | null;
  lo_number: number | null;
  lo_text: string | null;
  ac_code: string;
  ac_text: string | null;
}

export interface QualificationKit {
  qualification_code: string | null;
  qualification_title: string | null;
  acs: QualificationAc[];
  // Index by AC code for the AI's quick lookup; the prompt embeds this.
  ac_index_lines: string[];
}

/**
 * Resolve an enrolment qualification code to the canonical requirement code that
 * holds LO/AC rows (e.g. EAL 603/3895/8 → 601/7345/2 via
 * qualification_requirement_mappings). Returns the code unchanged when there is
 * no primary mapping. Keep this in sync with the frontend useStudentQualification
 * resolver and the match_qualification_acs RPC's internal resolution.
 */
export async function resolveRequirementCode(sb: Sb, code: string | null): Promise<string | null> {
  if (!code) return code;
  const { data } = await sb
    .from('qualification_requirement_mappings')
    .select('requirement_code')
    .eq('qualification_code', code)
    .eq('is_primary', true)
    .maybeSingle();
  return (data as { requirement_code?: string } | null)?.requirement_code ?? code;
}

// Module-level cache. Edge function warm starts share the v8 isolate so this
// persists across requests within the same instance for ~5 minutes — cuts
// 30-50ms off every warm call without needing materialised views.
const qualificationKitCache = new Map<string, { kit: QualificationKit; ts: number }>();
const QUAL_KIT_TTL_MS = 5 * 60_000;

export async function loadQualificationKit(
  sb: Sb,
  qualificationCode: string | null
): Promise<QualificationKit> {
  if (!qualificationCode) {
    return { qualification_code: null, qualification_title: null, acs: [], ac_index_lines: [] };
  }
  // Follow the mapping so a mapped enrolment code loads the canonical catalogue.
  // Coalesce back to the input so the type stays `string` (narrowed above).
  qualificationCode = (await resolveRequirementCode(sb, qualificationCode)) ?? qualificationCode;
  const now = Date.now();
  const cached = qualificationKitCache.get(qualificationCode);
  if (cached && now - cached.ts < QUAL_KIT_TTL_MS) {
    return cached.kit;
  }
  const [reqsRes, qualRes] = await Promise.all([
    sb
      .from('qualification_requirements')
      .select('unit_code, unit_title, lo_number, lo_text, ac_code, ac_text')
      .eq('qualification_code', qualificationCode)
      .order('unit_code', { ascending: true })
      .order('ac_code', { ascending: true }),
    sb.from('qualifications').select('title').eq('code', qualificationCode).maybeSingle(),
  ]);
  const acs = ((reqsRes.data ?? []) as QualificationAc[]).map((a) => ({
    unit_code: a.unit_code,
    unit_title: a.unit_title,
    lo_number: a.lo_number,
    lo_text: a.lo_text,
    ac_code: a.ac_code,
    ac_text: a.ac_text,
  }));
  // Dedupe identical ac_text within a single qualification's view: rare
  // within one qual, but defensive.
  const seen = new Set<string>();
  const ac_index_lines: string[] = [];
  for (const a of acs) {
    const text = a.ac_text ? a.ac_text.slice(0, 160) : '';
    const key = text.trim().toLowerCase();
    if (key && seen.has(key)) continue;
    if (key) seen.add(key);
    ac_index_lines.push(`${a.unit_code}.${a.ac_code} — ${text}`);
  }
  const kit: QualificationKit = {
    qualification_code: qualificationCode,
    qualification_title: (qualRes.data as { title?: string } | null)?.title ?? null,
    acs,
    ac_index_lines,
  };
  qualificationKitCache.set(qualificationCode, { kit, ts: now });
  return kit;
}

export interface Bs7671Facet {
  ref: string;
  reg_part: string | null;
  primary_topic: string | null;
  content: string;
  regulation_id: string | null;
}

/** Run match_bs7671_for_text against several seed queries in PARALLEL,
 *  dedupe, return a facet list. Parallelism saves 1-2s vs the previous
 *  sequential loop — important because this is the slowest part of any
 *  AI surface that grounds in BS 7671. */
export async function lookupBs7671Facets(
  sb: Sb,
  seedQueries: string[],
  topK = 4,
  maxQueries = 6
): Promise<Bs7671Facet[]> {
  const queries = Array.from(
    new Set(seedQueries.map((q) => q?.trim()).filter((q): q is string => !!q && q.length >= 3))
  ).slice(0, maxQueries);
  if (queries.length === 0) {
    queries.push('inspection and testing initial verification');
  }
  // Run all RPC calls in parallel — match_bs7671_for_text is read-only and
  // independent per query, so parallelism is safe. Was a serial for-loop.
  const results = await Promise.all(
    queries.map(async (q) => {
      try {
        const { data, error } = await sb.rpc('match_bs7671_for_text', {
          q_text: q,
          doc_type: null,
          max_results: topK,
        });
        if (error) return [];
        return (data ?? []) as Array<{
          reg_number: string | null;
          reg_part: string | null;
          primary_topic: string | null;
          content: string | null;
          regulation_id: string | null;
        }>;
      } catch {
        return [];
      }
    })
  );
  const out: Bs7671Facet[] = [];
  for (const rows of results) {
    for (const row of rows) {
      out.push({
        ref: row.reg_number ?? row.primary_topic ?? 'BS 7671',
        reg_part: row.reg_part ?? null,
        primary_topic: row.primary_topic ?? null,
        content: (row.content ?? '').slice(0, 400),
        regulation_id: row.regulation_id ?? null,
      });
    }
  }
  // Dedupe by reg_number+content prefix
  const seen = new Set<string>();
  return out.filter((f) => {
    const key = `${f.ref}|${f.content.slice(0, 80)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Pulls seed strings out of a LearnerContext for the BS 7671 lookup. */
export function bs7671SeedQueries(ctx: LearnerContext): string[] {
  const seeds: string[] = [];
  for (const u of ctx.ac.weak_units.slice(0, 4)) {
    seeds.push(u.unit_title ?? `unit ${u.unit_code}`);
  }
  for (const o of ctx.observations.slice(0, 3)) {
    seeds.push(o.activity_title);
  }
  for (const cat of ctx.quizzes.weak_categories.slice(0, 3)) {
    seeds.push(cat);
  }
  if (ctx.ilp.headline_focus) seeds.push(ctx.ilp.headline_focus);
  for (const g of ctx.ilp.goals.slice(0, 3)) seeds.push(g.title);
  return seeds;
}

/** Block of prompt lines that lists every AC the AI must ground recommendations
 *  in. Capped because some quals have hundreds. Default is 50 — tuned to
 *  balance grounding accuracy against prompt token cost. Caller can raise
 *  for surfaces where the AI genuinely needs the full catalogue (e.g.
 *  quiz authoring), or drop for surfaces that are pastoral-led. */
export function qualificationAcLines(kit: QualificationKit, max = 50): string[] {
  if (kit.acs.length === 0) return [];
  const lines: string[] = [];
  lines.push('');
  lines.push('## Course outcomes — every recommendation MUST cite an AC from this list');
  if (kit.qualification_code || kit.qualification_title) {
    lines.push(
      `Qualification: ${kit.qualification_title ?? '?'} (${kit.qualification_code ?? '?'})`
    );
  }
  lines.push(
    `AC catalogue (showing ${Math.min(max, kit.ac_index_lines.length)} of ${kit.ac_index_lines.length}):`
  );
  for (const l of kit.ac_index_lines.slice(0, max)) {
    lines.push(`  - ${l}`);
  }
  if (kit.ac_index_lines.length > max) {
    lines.push(`  … (${kit.ac_index_lines.length - max} more — ask if you need them)`);
  }
  return lines;
}

/** Block of prompt lines that lists BS 7671 facets the AI may cite. */
export function bs7671FacetLines(facets: Bs7671Facet[], max = 16): string[] {
  if (facets.length === 0) return [];
  const lines: string[] = [];
  lines.push('');
  lines.push(
    '## BS 7671 facets — only cite refs that appear here. Inventing a regulation is forbidden.'
  );
  for (const f of facets.slice(0, max)) {
    const part = f.reg_part ? ` · Part ${f.reg_part}` : '';
    lines.push(`- [${f.ref}${part}] ${f.content}`);
  }
  return lines;
}

/* ───────────────────── AC RAG ─────────────────────
   Same pattern as BS 7671 facets but against qualification_requirements.
   Use this instead of qualificationAcLines() for big quals (>50 ACs) — sends
   only the 8-12 most relevant ACs per call so the prompt stays small and
   sharp. Falls back to inline catalogue if no embeddings yet.
   ──────────────────────────────────────────────────────── */

const EMBED_MODEL = 'text-embedding-3-small';

async function embedSeed(seed: string, apiKey: string): Promise<number[] | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: EMBED_MODEL, input: seed.slice(0, 4000) }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: Array<{ embedding: number[] }> };
    return json.data[0]?.embedding ?? null;
  } catch {
    return null;
  }
}

export interface RaggedAc {
  unit_code: string;
  unit_title: string | null;
  lo_number: number | null;
  lo_text: string | null;
  ac_code: string;
  ac_text: string | null;
  similarity: number;
}

/** Pull the most relevant ACs for a list of seed strings (e.g. weak unit
 *  titles, recent observation activity, ILP focus, lesson plan title).
 *  Embeds each seed once, runs match_qualification_acs in parallel, dedupes
 *  by (unit_code, ac_code), keeps the best similarity score per AC. */
export async function lookupQualificationAcs(
  sb: Sb,
  seedQueries: string[],
  qualificationCode: string | null,
  topKPerSeed = 8,
  maxSeeds = 4
): Promise<RaggedAc[]> {
  if (!qualificationCode) return [];
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) return [];
  const queries = Array.from(
    new Set(seedQueries.map((q) => q?.trim()).filter((q): q is string => !!q && q.length >= 3))
  ).slice(0, maxSeeds);
  if (queries.length === 0) return [];

  const embeddings = await Promise.all(queries.map((q) => embedSeed(q, apiKey)));
  const validEmbeddings = embeddings.filter((e): e is number[] => e !== null);
  if (validEmbeddings.length === 0) return [];

  const results = await Promise.all(
    validEmbeddings.map((emb) =>
      sb.rpc('match_qualification_acs', {
        q_embedding: emb as unknown as string,
        qual_code: qualificationCode,
        max_results: topKPerSeed,
        similarity_threshold: 0.4,
      })
    )
  );

  // Merge — keep best similarity per (unit, ac), then collapse duplicate
  // ac_text (same concept stated identically across qualifications). Returns
  // unique concepts so the AI doesn't see the same AC fact 4× under different
  // codes.
  const best = new Map<string, RaggedAc>();
  for (const r of results) {
    const rows = (r.data ?? []) as RaggedAc[];
    for (const row of rows) {
      const key = `${row.unit_code}|${row.ac_code}`;
      const existing = best.get(key);
      if (!existing || row.similarity > existing.similarity) {
        best.set(key, row);
      }
    }
  }
  const sorted = Array.from(best.values()).sort((a, b) => b.similarity - a.similarity);

  // Dedupe by ac_text: 466 rows in our catalogue today are word-for-word
  // duplicates across qualifications (e.g. "carry out safe isolation
  // procedures…" is in 6 rows / 4 quals). Surface only the highest-similarity
  // version so the AI gets one canonical "fact" instead of 6 fragments.
  const seenText = new Set<string>();
  const deduped: RaggedAc[] = [];
  for (const r of sorted) {
    const key = (r.ac_text ?? '').trim().toLowerCase();
    if (key && seenText.has(key)) continue;
    if (key) seenText.add(key);
    deduped.push(r);
  }
  return deduped;
}

/** Prompt block listing only the RAG'd ACs. Use this in place of
 *  qualificationAcLines() when the qualification has > 50 ACs (because
 *  inlining the whole catalogue blows the prompt budget). */
export function raggedAcLines(acs: RaggedAc[], max = 12): string[] {
  if (acs.length === 0) return [];
  const lines: string[] = [];
  lines.push('');
  lines.push('## Course outcomes — most relevant to this learner right now');
  lines.push('Cite recommendations against codes from THIS list. Do not invent.');
  for (const a of acs.slice(0, max)) {
    const text = a.ac_text ? a.ac_text.slice(0, 180) : '';
    lines.push(`  - ${a.unit_code}.${a.ac_code} — ${text}`);
  }
  return lines;
}

/** Single grounding rules block — paste into every AI surface's system
 *  prompt so behaviour is consistent. */
export const GROUNDING_RULES = `Grounding rules — non-negotiable.
1. Every concrete recommendation, goal, question or piece of revision must cite at least one AC code from the supplied course-outcomes list. Use exactly the AC codes given (e.g. "303.1.4"). Do NOT invent AC codes.
2. When a recommendation touches an electrical regulation, you MUST cite a BS 7671 ref from the supplied facet list (e.g. "Regulation 411.3.2.1"). Do NOT invent regulation numbers — if no facet covers the point, say so explicitly.
3. Tie every claim to evidence in the learner context. If the learner's quiz attempts show they failed AC 303.1.4 last week, name that. If their attendance pattern is "Often misses Mondays", reference it. Do NOT speak in generalities.
4. UK English (analyse, behaviour, programme).
5. Be honest. If the data shows they're behind, say so plainly. If they're ready, say so. No hedging for politeness.`;

/** Compact one-line summary line for any prompt header. */
export function contextHeadline(ctx: LearnerContext): string {
  const parts: string[] = [];
  parts.push(`Learner: ${ctx.student.name}`);
  if (ctx.course) parts.push(`Course: ${ctx.course.code ?? ctx.course.name ?? '?'}`);
  if (ctx.ac.total > 0) {
    parts.push(
      `ACs: ${ctx.ac.confirmed + ctx.ac.assessed + ctx.ac.evidenced}/${ctx.ac.total} done`
    );
  }
  if (ctx.attendance.last_28_pct != null) {
    parts.push(`Attendance 28d: ${ctx.attendance.last_28_pct}%`);
  }
  if (ctx.quizzes.avg_recent_percent != null) {
    parts.push(`Recent quiz avg: ${ctx.quizzes.avg_recent_percent}%`);
  }
  if (ctx.risk.level) parts.push(`Risk: ${ctx.risk.level}`);
  return parts.join(' · ');
}

/** Multi-line block for inclusion in a prompt. Skips empty slices. */
export function contextSummaryLines(ctx: LearnerContext): string[] {
  const lines: string[] = [];
  lines.push(`# Learner: ${ctx.student.name}`);
  if (ctx.course) lines.push(`Course: ${ctx.course.name ?? '?'} (${ctx.course.code ?? '?'})`);
  if (ctx.student.employer_id) lines.push(`Employer on file: yes`);
  if (ctx.inclusion.send_flags.length > 0)
    lines.push(`SEND flags: ${ctx.inclusion.send_flags.join(', ')}`);
  if (ctx.inclusion.eal)
    lines.push(
      `EAL learner${ctx.inclusion.first_language ? ` · L1 ${ctx.inclusion.first_language}` : ''}`
    );
  if (ctx.inclusion.ehcp) lines.push(`EHCP plan in place`);

  lines.push('');
  lines.push('## Progress');
  lines.push(
    `ACs: ${ctx.ac.confirmed + ctx.ac.assessed + ctx.ac.evidenced} of ${ctx.ac.total} achieved (${ctx.ac.in_progress} in progress, ${ctx.ac.not_started} not started)`
  );
  if (ctx.ac.weak_units.length > 0) {
    lines.push('Weak units (most not-started):');
    for (const u of ctx.ac.weak_units) {
      lines.push(
        `  - ${u.unit_code}${u.unit_title ? ` (${u.unit_title})` : ''}: ${u.not_started}/${u.total} not started`
      );
    }
  }

  if (ctx.attendance.last_28_pct != null) {
    lines.push('');
    lines.push('## Attendance');
    lines.push(
      `Last 28 days: ${ctx.attendance.last_28_pct}% (${ctx.attendance.days_attended_28}/${ctx.attendance.days_total_28} sessions)`
    );
    if (ctx.attendance.last_90_pct != null) {
      lines.push(`Last 90 days: ${ctx.attendance.last_90_pct}%`);
    }
    for (const p of ctx.attendance.pattern_notes) lines.push(`  - ${p}`);
  }

  if (ctx.quizzes.attempts.length > 0 || ctx.quizzes.sent_not_started > 0) {
    lines.push('');
    lines.push('## Quizzes & assessments from tutor');
    if (ctx.quizzes.avg_recent_percent != null) {
      lines.push(`Recent average: ${ctx.quizzes.avg_recent_percent}% (last 5)`);
    }
    if (ctx.quizzes.sent_not_started > 0) {
      lines.push(`${ctx.quizzes.sent_not_started} sent and not yet started`);
    }
    if (ctx.quizzes.pending_ai_grades > 0) {
      lines.push(`${ctx.quizzes.pending_ai_grades} written answers awaiting AI marking`);
    }
    if (ctx.quizzes.weak_categories.length > 0) {
      lines.push(`Weak categories (avg < 60%): ${ctx.quizzes.weak_categories.join(', ')}`);
    }
    for (const a of ctx.quizzes.attempts.slice(0, 6)) {
      const verdict = a.passed === true ? 'pass' : a.passed === false ? 'fail' : 'n/a';
      const pctStr = a.percentage != null ? `${a.percentage}%` : '—';
      const acStr = a.ac_refs.length > 0 ? ` · AC ${a.ac_refs.slice(0, 4).join(',')}` : '';
      lines.push(`  - ${a.title} [${a.kind}]: ${pctStr} (${verdict})${acStr}`);
    }
  }

  if (ctx.observations.length > 0) {
    lines.push('');
    lines.push('## Observations (latest)');
    for (const o of ctx.observations.slice(0, 6)) {
      lines.push(
        `  - [${o.outcome}${o.grade ? ` · ${o.grade}` : ''}] ${o.activity_title}${o.unit_code ? ` (${o.unit_code})` : ''}`
      );
    }
  }

  if (ctx.mocks.length > 0) {
    lines.push('');
    lines.push('## Recent mock simulator runs');
    for (const m of ctx.mocks.slice(0, 4)) {
      lines.push(`  - ${m.session_type}: ${m.overall_score ?? '?'}% → ${m.predicted_grade ?? '?'}`);
    }
  }

  if (ctx.portfolio.items > 0 || ctx.portfolio.submissions > 0) {
    lines.push('');
    lines.push('## Portfolio');
    lines.push(
      `${ctx.portfolio.items} items · ${ctx.portfolio.submissions} submissions · ${ctx.portfolio.iqa_verified} IQA-verified · ${ctx.portfolio.awaiting_review} awaiting review · ${ctx.portfolio.requires_action} requires action`
    );
    if (ctx.portfolio.recent_titles.length > 0) {
      lines.push('Recent items:');
      for (const t of ctx.portfolio.recent_titles) lines.push(`  - ${t}`);
    }
  }

  if (ctx.otj.total_minutes > 0) {
    lines.push('');
    lines.push('## OTJ');
    lines.push(
      `${Math.round(ctx.otj.total_minutes / 60)}h logged of ${Math.round(ctx.otj.required_minutes / 60)}h required (${ctx.otj.pct ?? 0}%) · ${Math.round(ctx.otj.last_28_minutes / 60)}h in last 28 days`
    );
  }

  if (ctx.ilp.id) {
    lines.push('');
    lines.push('## ILP (current)');
    if (ctx.ilp.headline_focus) lines.push(`Focus: ${ctx.ilp.headline_focus}`);
    if (ctx.ilp.target_completion_date) lines.push(`Target: ${ctx.ilp.target_completion_date}`);
    const open = ctx.ilp.goals.filter((g) => g.status !== 'completed' && g.status !== 'cancelled');
    const blocked = ctx.ilp.goals.filter((g) => g.status === 'blocked' || g.blocked_reason);
    lines.push(
      `${ctx.ilp.goals.length} goals total · ${open.length} open · ${blocked.length} blocked`
    );
    for (const g of ctx.ilp.goals.slice(0, 6)) {
      const flag = g.priority === 'high' ? ' [HIGH]' : '';
      lines.push(
        `  - [${g.status}]${flag} ${g.title}${g.target_date ? ` · due ${g.target_date}` : ''}`
      );
    }
  }

  if (ctx.judgements.tutor || ctx.judgements.ai || ctx.judgements.learner) {
    lines.push('');
    lines.push('## EPA verdicts (current)');
    if (ctx.judgements.learner)
      lines.push(
        `  - Learner: ${ctx.judgements.learner.verdict} (${ctx.judgements.learner.predicted_grade ?? '?'})`
      );
    if (ctx.judgements.tutor)
      lines.push(
        `  - Tutor: ${ctx.judgements.tutor.verdict} (${ctx.judgements.tutor.predicted_grade ?? '?'})`
      );
    if (ctx.judgements.ai)
      lines.push(
        `  - AI: ${ctx.judgements.ai.verdict} (${ctx.judgements.ai.predicted_grade ?? '?'})`
      );
  }

  if (ctx.ksbs.length > 0) {
    lines.push('');
    lines.push('## KSBs');
    const inProg = ctx.ksbs.filter(
      (k) => k.status === 'in_progress' || k.status === 'evidence_submitted'
    );
    const completed = ctx.ksbs.filter((k) => k.status === 'completed' || k.status === 'verified');
    lines.push(
      `${completed.length} complete, ${inProg.length} in progress, ${ctx.ksbs.length} total`
    );
  }

  if (ctx.risk.level) {
    lines.push('');
    lines.push(
      `## Risk: ${ctx.risk.level}${ctx.risk.score != null ? ` (score ${ctx.risk.score})` : ''}`
    );
    for (const r of ctx.risk.reasons.slice(0, 4)) lines.push(`  - ${r}`);
  }

  if (ctx.pastoral_notes_open > 0) {
    lines.push('');
    lines.push(`## Pastoral: ${ctx.pastoral_notes_open} open notes`);
  }

  lines.push('');
  lines.push(`Data as of: ${ctx.loaded_at}`);
  return lines;
}
