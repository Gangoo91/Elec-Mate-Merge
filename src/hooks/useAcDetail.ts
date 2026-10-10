import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';

/* ==========================================================================
   useAcDetail — pull everything attached to one Assessment Criterion:
   AC text, tagged resources, lessons that cover it, learner progress.
   ELE-896 (B1).
   ========================================================================== */

export interface AcMeta {
  qualification_code: string;
  unit_code: string;
  unit_title: string | null;
  ac_code: string;
  ac_text: string | null;
  lo_number: number | null;
  lo_text: string | null;
}

export interface AcResource {
  id: string;
  title: string;
  description: string | null;
  resource_type: string | null;
  external_url: string | null;
  is_student_visible: boolean;
  uploaded_by: string | null;
}

export interface AcLesson {
  lesson_plan_id: string;
  title: string;
  scheduled_date: string | null;
  status: string | null;
}

export interface AcLearnerProgress {
  student_id: string;
  student_name: string;
  status: string;
  evidence_count: number;
  last_evidence_at: string | null;
  last_assessed_at: string | null;
  /** portfolio: get_portfolio_ac_state; coverage: no account, older record; unknown: the state call failed. */
  source: 'portfolio' | 'coverage' | 'unknown';
}

export interface AcDetailData {
  meta: AcMeta | null;
  resources: AcResource[];
  lessons: AcLesson[];
  learners: AcLearnerProgress[];
}

export function useAcDetail(
  qualificationCode: string | null,
  unitCode: string | null,
  acCode: string | null
) {
  const [data, setData] = useState<AcDetailData>({
    meta: null,
    resources: [],
    lessons: [],
    learners: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!qualificationCode || !unitCode || !acCode) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Resolve caller's college
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      let collegeId: string | null = null;
      if (userId) {
        collegeId = await getMyCollegeId(userId);
      }

      const [metaRes, resourceMapRes, lessonMapRes, coverageRes] = await Promise.all([
        supabase
          .from('qualification_requirements')
          .select('qualification_code, unit_code, unit_title, ac_code, ac_text, lo_number, lo_text')
          .eq('qualification_code', qualificationCode)
          .eq('unit_code', unitCode)
          .eq('ac_code', acCode)
          .maybeSingle(),
        // Teaching resources (college_resources) are tagged in resource_ac_links.
        // resource_ac_mapping points at the older teaching_resources table,
        // which nothing writes to any more (both are empty at 8 Oct 2026).
        supabase
          .from('resource_ac_links')
          .select('resource_id')
          .eq('qualification_code', qualificationCode)
          .eq('unit_code', unitCode)
          .eq('ac_code', acCode),
        supabase
          .from('lesson_plan_ac_mapping')
          .select('lesson_plan_id')
          .eq('qualification_code', qualificationCode)
          .eq('unit_code', unitCode)
          .eq('ac_code', acCode),
        collegeId
          ? supabase
              .from('student_ac_coverage')
              .select('student_id, status, evidence_count, last_evidence_at, last_assessed_at')
              .eq('qualification_code', qualificationCode)
              .eq('unit_code', unitCode)
              .eq('ac_code', acCode)
          : Promise.resolve({ data: [] as Array<Record<string, unknown>>, error: null }),
      ]);

      const meta = (metaRes.data as AcMeta | null) ?? null;
      const resourceIds = ((resourceMapRes.data ?? []) as Array<{ resource_id: string }>)
        .map((r) => r.resource_id)
        .filter(Boolean);
      const lessonIds = ((lessonMapRes.data ?? []) as Array<{ lesson_plan_id: string }>)
        .map((r) => r.lesson_plan_id)
        .filter(Boolean);

      let resources: AcResource[] = [];
      if (resourceIds.length > 0) {
        let q = supabase
          .from('college_resources')
          .select('id, title, description, kind, external_url, visibility, uploader_id, college_id')
          .in('id', resourceIds);
        if (collegeId) q = q.eq('college_id', collegeId);
        const { data: rRows } = await q.order('updated_at', { ascending: false });
        resources = (
          (rRows ?? []) as Array<{
            id: string;
            title: string;
            description: string | null;
            kind: string | null;
            external_url: string | null;
            visibility: string | null;
            uploader_id: string | null;
          }>
        ).map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          resource_type: r.kind,
          external_url: r.external_url,
          is_student_visible: r.visibility !== 'tutors' && r.visibility !== 'private',
          uploaded_by: r.uploader_id,
        }));
      }

      let lessons: AcLesson[] = [];
      if (lessonIds.length > 0) {
        let q = supabase
          .from('college_lesson_plans')
          .select('id, title, scheduled_date, status, college_id')
          .in('id', lessonIds);
        if (collegeId) q = q.eq('college_id', collegeId);
        const { data: lRows } = await q.order('scheduled_date', { ascending: false });
        lessons = (
          (lRows ?? []) as Array<{
            id: string;
            title: string;
            scheduled_date: string | null;
            status: string | null;
          }>
        ).map((r) => ({
          lesson_plan_id: r.id,
          title: r.title,
          scheduled_date: r.scheduled_date,
          status: r.status,
        }));
      }

      // Learners: everyone at the college on a course for this qualification.
      // ELE-1917 / 8 Oct 2026: for a learner with an account the state comes
      // from get_portfolio_ac_state (the one criterion state the learner and
      // the assessor see). student_ac_coverage is only the fallback for a
      // learner with no account. This used to list only learners who already
      // had a coverage row, so a cohort with no rows read "No learners".
      let learners: AcLearnerProgress[] = [];
      if (collegeId) {
        const { data: qual } = await supabase
          .from('qualifications')
          .select('id')
          .eq('code', qualificationCode)
          .limit(1)
          .maybeSingle();
        const qualId = (qual as { id: string } | null)?.id ?? null;
        const { data: courseRows } = qualId
          ? await supabase
              .from('college_courses')
              .select('id')
              .eq('college_id', collegeId)
              .eq('qualification_id', qualId)
          : { data: [] as { id: string }[] };
        const courseIds = ((courseRows ?? []) as { id: string }[]).map((c) => c.id);
        const { data: studentRows } = courseIds.length
          ? await supabase
              .from('college_students')
              .select('id, name, user_id, status')
              .eq('college_id', collegeId)
              .in('course_id', courseIds)
              .order('name')
          : { data: [] as never[] };
        const students = (
          (studentRows ?? []) as Array<{
            id: string;
            name: string;
            user_id: string | null;
            status: string | null;
          }>
        ).filter((st) => (st.status ?? 'Active') !== 'Withdrawn');

        const coverage = new Map<
          string,
          {
            status: string;
            evidence_count: number;
            last_evidence_at: string | null;
            last_assessed_at: string | null;
          }
        >();
        for (const r of (coverageRes.data ?? []) as Array<{
          student_id: string;
          status: string;
          evidence_count: number;
          last_evidence_at: string | null;
          last_assessed_at: string | null;
        }>) {
          coverage.set(r.student_id, r);
        }

        // One state call per learner with an account, six at a time.
        const stateByUser = new Map<
          string,
          { state: string; evidence: number; decided_at: string | null }
        >();
        const withAccount = students.filter((st) => st.user_id).map((st) => st.user_id as string);
        for (let i = 0; i < withAccount.length; i += 6) {
          await Promise.all(
            withAccount.slice(i, i + 6).map(async (uid) => {
              const { data: rows, error: e } = await supabase.rpc('get_portfolio_ac_state', {
                p_user_id: uid,
              });
              if (e) return;
              const row = (
                (rows ?? []) as Array<{
                  qualification_code: string;
                  unit_code: string;
                  ac_code: string;
                  state: string;
                  evidence_item_ids: string[] | null;
                  decided_at: string | null;
                }>
              ).find(
                (r) =>
                  r.qualification_code === qualificationCode &&
                  r.unit_code === unitCode &&
                  r.ac_code === acCode
              );
              stateByUser.set(uid, {
                state: row?.state ?? 'not_started',
                evidence: row?.evidence_item_ids?.length ?? 0,
                decided_at: row?.decided_at ?? null,
              });
            })
          );
        }

        learners = students.map((st) => {
          const fromState = st.user_id ? stateByUser.get(st.user_id) : undefined;
          if (fromState) {
            return {
              student_id: st.id,
              student_name: st.name,
              status: fromState.state,
              evidence_count: fromState.evidence,
              last_evidence_at: null,
              last_assessed_at: fromState.decided_at,
              source: 'portfolio' as const,
            };
          }
          const cov = coverage.get(st.id);
          return {
            student_id: st.id,
            student_name: st.name,
            status: cov?.status ?? 'not_started',
            evidence_count: cov?.evidence_count ?? 0,
            last_evidence_at: cov?.last_evidence_at ?? null,
            last_assessed_at: cov?.last_assessed_at ?? null,
            source: st.user_id ? ('unknown' as const) : ('coverage' as const),
          };
        });
      }

      setData({ meta, resources, lessons, learners });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [qualificationCode, unitCode, acCode]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { ...data, loading, error, refetch: fetch };
}
