import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeReports — data fetchers for every CSV report in the
   /college/reports surface.

   Each report is shaped { rows, columns } so the Reports page can render
   a preview table + download CSV without bespoke wiring per report.
   ========================================================================== */

export interface ReportFilters {
  cohortId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  qualificationCode?: string | null;
}

export interface OtjRow {
  student_name: string;
  cohort_name: string | null;
  activity_date: string;
  activity_type: string;
  title: string;
  duration_minutes: number;
  duration_hours: number;
  verification_status: string;
  verified_at: string | null;
}

export interface AttendanceRow {
  student_name: string;
  cohort_name: string | null;
  date: string;
  status: string;
  notes: string | null;
}

export interface CohortProgressRow {
  cohort_name: string | null;
  student_name: string;
  status: string;
  progress_percent: number;
  risk_level: string | null;
  ac_total: number;
  ac_signed_off: number;
  ac_signed_off_pct: number;
}

export interface EpaReadinessRow {
  cohort_name: string | null;
  student_name: string;
  epa_status: string | null;
  gateway_date: string | null;
  weeks_to_gateway: number | null;
  result: string | null;
  fs_maths_status: string | null;
  fs_english_status: string | null;
}

export interface AcCoverageGapRow {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  ac_text: string | null;
  lesson_count: number;
  resource_count: number;
  is_uncovered: boolean;
}

export interface EpaPassRateRow {
  cohort_name: string | null;
  total_apprentices: number;
  completed: number;
  distinction: number;
  merit: number;
  pass: number;
  fail: number;
  gateway_ready: number;
  in_progress: number;
  pass_rate_pct: number | null;
  distinction_merit_pct: number | null;
}

export interface QuizResultsRow {
  student_name: string;
  quiz_title: string;
  submitted_at: string | null;
  score: number | null;
  total_points: number | null;
  pct: number | null;
  passed: boolean | null;
}

async function callerCollegeId(): Promise<string | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const userId = userRes.user?.id;
  if (!userId) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('college_id')
    .eq('id', userId)
    .maybeSingle();
  return (profile as { college_id?: string | null } | null)?.college_id ?? null;
}

/** Off-the-job hours per learner over a date window. */
export async function fetchOtjReport(filters: ReportFilters): Promise<OtjRow[]> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  // If filtering by cohort, resolve its learners up front and filter the query
  // server-side. The old code fetched a truncated page across ALL cohorts and
  // then filtered by cohort NAME after the fact, so a cohort export could miss
  // most of its own entries once other cohorts filled the row cap.
  let cohortUserIds: string[] | null = null;
  if (filters.cohortId) {
    const { data: cohortStudents } = await supabase
      .from('college_students')
      .select('user_id')
      .eq('college_id', collegeId)
      .eq('cohort_id', filters.cohortId);
    cohortUserIds = (cohortStudents ?? [])
      .map((s) => s.user_id)
      .filter((v): v is string => !!v);
    if (cohortUserIds.length === 0) return [];
  }

  // Paginate so the export is COMPLETE — the old .limit(2000) silently dropped
  // entries (200 learners x 10+ OTJ entries crosses 2000 within a term, which
  // would understate hours on an ESFA funding export).
  type OtjEntry = {
    student_id: string;
    activity_date: string;
    activity_type: string;
    title: string;
    duration_minutes: number;
    verification_status: string;
    verified_at: string | null;
  };
  const entries: OtjEntry[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = supabase
      .from('college_otj_entries')
      .select(
        'id, college_id, student_id, activity_date, activity_type, title, duration_minutes, verification_status, verified_at'
      )
      .eq('college_id', collegeId);
    if (filters.startDate) q = q.gte('activity_date', filters.startDate);
    if (filters.endDate) q = q.lte('activity_date', filters.endDate);
    if (cohortUserIds) q = q.in('student_id', cohortUserIds);
    const { data, error } = await q
      .order('activity_date', { ascending: false })
      .order('id', { ascending: true }) // unique tiebreaker — stable paging
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []) as OtjEntry[];
    entries.push(...batch);
    if (batch.length < PAGE) break;
  }

  const studentIds = Array.from(new Set(entries.map((e) => e.student_id)));
  const { data: students } = await supabase
    .from('college_students')
    .select('user_id, name, cohort_id')
    .in('user_id', studentIds);
  const studentByUser = new Map<string, { name: string; cohort_id: string | null }>();
  for (const s of (students ?? []) as Array<{
    user_id: string;
    name: string;
    cohort_id: string | null;
  }>) {
    studentByUser.set(s.user_id, { name: s.name, cohort_id: s.cohort_id });
  }
  const cohortIds = Array.from(
    new Set(
      Array.from(studentByUser.values())
        .map((s) => s.cohort_id)
        .filter((c): c is string => !!c)
    )
  );
  const { data: cohorts } = await supabase
    .from('college_cohorts')
    .select('id, name')
    .in('id', cohortIds);
  const cohortMap = new Map((cohorts ?? []).map((c: any) => [c.id, c.name as string]));

  const rows: OtjRow[] = entries.map((e) => {
    const s = studentByUser.get(e.student_id);
    const cohortName = s?.cohort_id ? (cohortMap.get(s.cohort_id) ?? null) : null;
    return {
      student_name: s?.name ?? '—',
      cohort_name: cohortName,
      activity_date: e.activity_date,
      activity_type: e.activity_type,
      title: e.title,
      duration_minutes: e.duration_minutes,
      duration_hours: Math.round((e.duration_minutes / 60) * 10) / 10,
      verification_status: e.verification_status,
      verified_at: e.verified_at,
    };
  });

  // Cohort filtering already applied server-side above.
  return rows;
}

/** Attendance log per learner over a date window. */
export async function fetchAttendanceReport(filters: ReportFilters): Promise<AttendanceRow[]> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  // Resolve students in scope
  let studentQ = supabase
    .from('college_students')
    .select('id, name, cohort_id')
    .eq('college_id', collegeId);
  if (filters.cohortId) studentQ = studentQ.eq('cohort_id', filters.cohortId);
  const { data: students } = await studentQ;
  const studentIds = (students ?? []).map((s: any) => s.id);
  if (studentIds.length === 0) return [];

  // Paginate so the attendance export is COMPLETE — the old .limit(5000) would
  // truncate badly (200 learners x ~daily marks runs to tens of thousands of rows).
  type AttRow = { student_id: string; date: string; status: string; notes: string | null };
  const rows: AttRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = supabase
      .from('college_attendance')
      .select('student_id, date, status, notes')
      .in('student_id', studentIds);
    if (filters.startDate) q = q.gte('date', filters.startDate);
    if (filters.endDate) q = q.lte('date', filters.endDate);
    const { data, error } = await q
      .order('date', { ascending: false })
      .order('id', { ascending: true }) // unique tiebreaker — stable paging
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []) as AttRow[];
    rows.push(...batch);
    if (batch.length < PAGE) break;
  }

  const cohortIds = Array.from(
    new Set(
      (students ?? [])
        .map((s: any) => s.cohort_id)
        .filter((c: string | null) => !!c)
    )
  );
  const { data: cohorts } = await supabase
    .from('college_cohorts')
    .select('id, name')
    .in('id', cohortIds);
  const cohortMap = new Map((cohorts ?? []).map((c: any) => [c.id, c.name as string]));
  const studentMap = new Map(
    (students ?? []).map((s: any) => [
      s.id,
      { name: s.name as string, cohort: cohortMap.get(s.cohort_id) ?? null },
    ])
  );

  return rows.map((r) => {
    const s = studentMap.get(r.student_id);
    return {
      student_name: s?.name ?? '—',
      cohort_name: s?.cohort ?? null,
      date: r.date,
      status: r.status,
      notes: r.notes,
    };
  });
}

/** Per-learner cohort progress + AC sign-off %. */
export async function fetchCohortProgressReport(
  filters: ReportFilters
): Promise<CohortProgressRow[]> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  let studentQ = supabase
    .from('college_students')
    .select('id, name, status, progress_percent, risk_level, cohort_id')
    .eq('college_id', collegeId);
  if (filters.cohortId) studentQ = studentQ.eq('cohort_id', filters.cohortId);
  const { data: students } = await studentQ;
  const studentIds = (students ?? []).map((s: any) => s.id);
  if (studentIds.length === 0) return [];

  const cohortIds = Array.from(
    new Set((students ?? []).map((s: any) => s.cohort_id).filter((c: string | null) => !!c))
  );
  const { data: cohorts } = await supabase
    .from('college_cohorts')
    .select('id, name')
    .in('id', cohortIds);
  const cohortMap = new Map((cohorts ?? []).map((c: any) => [c.id, c.name as string]));

  // AC coverage rollup per student via student_ac_coverage view/table
  const { data: cov } = await supabase
    .from('student_ac_coverage')
    .select('student_id, status')
    .in('student_id', studentIds);

  type CovBucket = { total: number; signed: number };
  const covMap = new Map<string, CovBucket>();
  for (const c of (cov ?? []) as Array<{ student_id: string; status: string }>) {
    const b = covMap.get(c.student_id) ?? { total: 0, signed: 0 };
    b.total += 1;
    if (c.status === 'signed_off' || c.status === 'assessed') b.signed += 1;
    covMap.set(c.student_id, b);
  }

  return ((students ?? []) as Array<any>).map((s) => {
    const b = covMap.get(s.id) ?? { total: 0, signed: 0 };
    return {
      cohort_name: cohortMap.get(s.cohort_id) ?? null,
      student_name: s.name,
      status: s.status,
      progress_percent: s.progress_percent ?? 0,
      risk_level: s.risk_level,
      ac_total: b.total,
      ac_signed_off: b.signed,
      ac_signed_off_pct: b.total > 0 ? Math.round((b.signed / b.total) * 100) : 0,
    };
  });
}

/** EPA gateway pipeline. */
export async function fetchEpaReadinessReport(
  filters: ReportFilters
): Promise<EpaReadinessRow[]> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  let studentQ = supabase
    .from('college_students')
    .select('id, user_id, name, cohort_id')
    .eq('college_id', collegeId);
  if (filters.cohortId) studentQ = studentQ.eq('cohort_id', filters.cohortId);
  const { data: students } = await studentQ;
  if (!students || students.length === 0) return [];

  const userIds = (students as Array<{ user_id: string | null }>)
    .map((s) => s.user_id)
    .filter((id): id is string => !!id);

  const [{ data: epaRows }, { data: cohorts }, { data: fsRows }] = await Promise.all([
    supabase.from('college_epa').select('student_id, status, gateway_date, result').in('student_id', userIds),
    supabase
      .from('college_cohorts')
      .select('id, name')
      .in(
        'id',
        Array.from(
          new Set(
            (students as Array<{ cohort_id: string | null }>)
              .map((s) => s.cohort_id)
              .filter((c): c is string => !!c)
          )
        )
      ),
    supabase
      .from('college_functional_skills')
      .select('student_id, subject, status')
      .in('student_id', (students as Array<{ id: string }>).map((s) => s.id)),
  ]);

  const epaByUser = new Map((epaRows ?? []).map((e: any) => [e.student_id, e]));
  const cohortMap = new Map((cohorts ?? []).map((c: any) => [c.id, c.name as string]));
  const fsByStudent = new Map<string, { maths?: string; english?: string }>();
  for (const f of (fsRows ?? []) as Array<{
    student_id: string;
    subject: string;
    status: string;
  }>) {
    const b = fsByStudent.get(f.student_id) ?? {};
    if (f.subject === 'maths') b.maths = f.status;
    if (f.subject === 'english') b.english = f.status;
    fsByStudent.set(f.student_id, b);
  }

  const today = new Date();
  return (students as Array<any>).map((s) => {
    const epa = s.user_id ? epaByUser.get(s.user_id) : null;
    const fs = fsByStudent.get(s.id) ?? {};
    const weeksToGateway =
      epa?.gateway_date
        ? Math.round(
            (new Date(epa.gateway_date).getTime() - today.getTime()) / (7 * 86_400_000)
          )
        : null;
    return {
      cohort_name: cohortMap.get(s.cohort_id) ?? null,
      student_name: s.name,
      epa_status: epa?.status ?? null,
      gateway_date: epa?.gateway_date ?? null,
      weeks_to_gateway: weeksToGateway,
      result: epa?.result ?? null,
      fs_maths_status: fs.maths ?? null,
      fs_english_status: fs.english ?? null,
    };
  });
}

/** Per-cohort EPA pass-rate roll-up. Achievement rate = (Distinction+Merit)/completed. */
export async function fetchEpaPassRateReport(
  filters: ReportFilters
): Promise<EpaPassRateRow[]> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  let studentQ = supabase
    .from('college_students')
    .select('id, user_id, cohort_id')
    .eq('college_id', collegeId);
  if (filters.cohortId) studentQ = studentQ.eq('cohort_id', filters.cohortId);
  const { data: students } = await studentQ;
  if (!students || students.length === 0) return [];

  const userIds = (students as Array<{ user_id: string | null }>)
    .map((s) => s.user_id)
    .filter((id): id is string => !!id);

  const [{ data: epaRows }, { data: cohorts }] = await Promise.all([
    userIds.length > 0
      ? supabase.from('college_epa').select('student_id, status, result').in('student_id', userIds)
      : Promise.resolve({ data: [] as any[], error: null }),
    supabase
      .from('college_cohorts')
      .select('id, name')
      .in(
        'id',
        Array.from(
          new Set(
            (students as Array<{ cohort_id: string | null }>)
              .map((s) => s.cohort_id)
              .filter((c): c is string => !!c)
          )
        )
      ),
  ]);

  const epaByUser = new Map(
    ((epaRows ?? []) as Array<{ student_id: string; status: string | null; result: string | null }>)
      .map((e) => [e.student_id, e])
  );
  const cohortMap = new Map((cohorts ?? []).map((c: any) => [c.id, c.name as string]));

  type Bucket = EpaPassRateRow;
  const byCohort = new Map<string, Bucket>();
  const getBucket = (cohortId: string | null): Bucket => {
    const key = cohortId ?? '__none__';
    const existing = byCohort.get(key);
    if (existing) return existing;
    const fresh: Bucket = {
      cohort_name: cohortId ? cohortMap.get(cohortId) ?? null : null,
      total_apprentices: 0,
      completed: 0,
      distinction: 0,
      merit: 0,
      pass: 0,
      fail: 0,
      gateway_ready: 0,
      in_progress: 0,
      pass_rate_pct: null,
      distinction_merit_pct: null,
    };
    byCohort.set(key, fresh);
    return fresh;
  };

  for (const s of students as Array<{ user_id: string | null; cohort_id: string | null }>) {
    const b = getBucket(s.cohort_id);
    b.total_apprentices += 1;
    const epa = s.user_id ? epaByUser.get(s.user_id) : null;
    if (epa?.status === 'Gateway Ready') b.gateway_ready += 1;
    if (epa?.status === 'In Progress' || epa?.status === 'Pre-Gateway') b.in_progress += 1;
    if (epa?.status === 'Complete') {
      b.completed += 1;
      const r = (epa.result ?? '').toLowerCase();
      if (r === 'distinction') b.distinction += 1;
      else if (r === 'merit') b.merit += 1;
      else if (r === 'pass') b.pass += 1;
      else if (r === 'fail') b.fail += 1;
    }
  }

  for (const b of byCohort.values()) {
    if (b.completed > 0) {
      b.pass_rate_pct = Math.round(((b.distinction + b.merit + b.pass) / b.completed) * 100);
      b.distinction_merit_pct = Math.round(((b.distinction + b.merit) / b.completed) * 100);
    }
  }

  return Array.from(byCohort.values()).sort((a, b) =>
    (a.cohort_name ?? '').localeCompare(b.cohort_name ?? '')
  );
}

/** ACs that have no lesson + no resource — Ofsted-critical gap report. */
export async function fetchAcCoverageGapReport(
  filters: ReportFilters
): Promise<AcCoverageGapRow[]> {
  // Pull the qualification's ACs and count matching lesson + resource mappings.
  // Paginated so an all-qualifications run isn't silently truncated (was capped
  // at 2000; ~23 quals x ~300 ACs comfortably exceeds that), which would hide
  // real coverage gaps.
  type QrRow = { qualification_code: string; unit_code: string; ac_code: string; ac_text: string };
  const qrs: QrRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let qrQ = supabase
      .from('qualification_requirements')
      .select('qualification_code, unit_code, ac_code, ac_text');
    if (filters.qualificationCode) qrQ = qrQ.eq('qualification_code', filters.qualificationCode);
    const { data, error } = await qrQ
      .order('id', { ascending: true }) // deterministic order — stable paging
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []) as QrRow[];
    qrs.push(...batch);
    if (batch.length < PAGE) break;
  }
  if (qrs.length === 0) return [];

  const acCodes = Array.from(new Set(qrs.map((q) => q.ac_code)));

  const [{ data: lessonMap }, { data: resourceMap }] = await Promise.all([
    supabase
      .from('lesson_plan_ac_mapping')
      .select('ac_code')
      .in('ac_code', acCodes),
    supabase
      .from('resource_ac_mapping')
      .select('ac_code')
      .in('ac_code', acCodes),
  ]);

  const lessonCounts = new Map<string, number>();
  for (const r of (lessonMap ?? []) as Array<{ ac_code: string }>) {
    lessonCounts.set(r.ac_code, (lessonCounts.get(r.ac_code) ?? 0) + 1);
  }
  const resourceCounts = new Map<string, number>();
  for (const r of (resourceMap ?? []) as Array<{ ac_code: string }>) {
    resourceCounts.set(r.ac_code, (resourceCounts.get(r.ac_code) ?? 0) + 1);
  }

  return qrs.map((q) => {
    const lc = lessonCounts.get(q.ac_code) ?? 0;
    const rc = resourceCounts.get(q.ac_code) ?? 0;
    return {
      qualification_code: q.qualification_code,
      unit_code: q.unit_code,
      ac_code: q.ac_code,
      ac_text: q.ac_text,
      lesson_count: lc,
      resource_count: rc,
      is_uncovered: lc === 0 && rc === 0,
    };
  });
}

/** Per-attempt quiz results. */
export async function fetchQuizResultsReport(
  filters: ReportFilters
): Promise<QuizResultsRow[]> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  // Resolve student set first so we can filter attempts
  let studentQ = supabase
    .from('college_students')
    .select('id, user_id, name, cohort_id')
    .eq('college_id', collegeId);
  if (filters.cohortId) studentQ = studentQ.eq('cohort_id', filters.cohortId);
  const { data: students } = await studentQ;
  const studentMap = new Map(
    (students ?? []).map((s: any) => [s.user_id as string, s.name as string])
  );
  const userIds = Array.from(studentMap.keys());
  if (userIds.length === 0) return [];

  // Paginate so the quiz export is COMPLETE — the old .limit(2000) would drop
  // attempts as a cohort builds up quiz history over the year.
  type AttemptRow = {
    id: string;
    quiz_id: string;
    student_id: string;
    submitted_at: string;
    score: number | null;
    total_points: number | null;
  };
  const attempts: AttemptRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let aQ = supabase
      .from('tutor_quiz_attempts')
      .select('id, quiz_id, student_id, submitted_at, score, total_points')
      .in('student_id', userIds);
    if (filters.startDate) aQ = aQ.gte('submitted_at', filters.startDate);
    if (filters.endDate) aQ = aQ.lte('submitted_at', filters.endDate);
    const { data, error } = await aQ
      .order('submitted_at', { ascending: false })
      .order('id', { ascending: true }) // unique tiebreaker — stable paging
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const batch = (data ?? []) as AttemptRow[];
    attempts.push(...batch);
    if (batch.length < PAGE) break;
  }

  const quizIds = Array.from(new Set(attempts.map((a) => a.quiz_id)));
  const { data: quizzes } = await supabase
    .from('tutor_quizzes')
    .select('id, title, pass_mark')
    .in('id', quizIds);
  const quizMap = new Map(
    (quizzes ?? []).map((q: any) => [q.id, { title: q.title, pass_mark: q.pass_mark as number | null }])
  );

  return attempts.map((a) => {
    const q = quizMap.get(a.quiz_id);
    const pct =
      a.score != null && a.total_points
        ? Math.round((a.score / a.total_points) * 100)
        : null;
    const passed = pct != null && q?.pass_mark != null ? pct >= q.pass_mark : null;
    return {
      student_name: studentMap.get(a.student_id) ?? '—',
      quiz_title: q?.title ?? '—',
      submitted_at: a.submitted_at,
      score: a.score,
      total_points: a.total_points,
      pct,
      passed,
    };
  });
}

/** Convenience hook: list cohorts in the caller's college, for filter UI. */
export function useCollegeCohortsLite() {
  const [cohorts, setCohorts] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setCohorts([]);
        return;
      }
      const { data } = await supabase
        .from('college_cohorts')
        .select('id, name')
        .eq('college_id', collegeId)
        .order('name', { ascending: true });
      setCohorts((data ?? []) as Array<{ id: string; name: string }>);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  return { cohorts, loading };
}
