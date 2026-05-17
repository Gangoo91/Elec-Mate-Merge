import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', userId)
          .maybeSingle();
        collegeId = (profile as { college_id?: string | null } | null)?.college_id ?? null;
      }

      const [metaRes, resourceMapRes, lessonMapRes, coverageRes] = await Promise.all([
        supabase
          .from('qualification_requirements')
          .select('qualification_code, unit_code, unit_title, ac_code, ac_text, lo_number, lo_text')
          .eq('qualification_code', qualificationCode)
          .eq('unit_code', unitCode)
          .eq('ac_code', acCode)
          .maybeSingle(),
        supabase
          .from('resource_ac_mapping')
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
          : Promise.resolve({ data: [] as any[], error: null }),
      ]);

      const meta = (metaRes.data as AcMeta | null) ?? null;
      const resourceIds = (resourceMapRes.data ?? [])
        .map((r: any) => r.resource_id as string)
        .filter(Boolean);
      const lessonIds = (lessonMapRes.data ?? [])
        .map((r: any) => r.lesson_plan_id as string)
        .filter(Boolean);

      let resources: AcResource[] = [];
      if (resourceIds.length > 0) {
        let q = supabase
          .from('teaching_resources')
          .select(
            'id, title, description, resource_type, external_url, is_student_visible, uploaded_by, college_id'
          )
          .in('id', resourceIds);
        if (collegeId) q = q.eq('college_id', collegeId);
        const { data: rRows } = await q.order('updated_at', { ascending: false });
        resources = (rRows ?? []) as AcResource[];
      }

      let lessons: AcLesson[] = [];
      if (lessonIds.length > 0) {
        let q = supabase
          .from('college_lesson_plans')
          .select('id, title, scheduled_date, status, college_id')
          .in('id', lessonIds);
        if (collegeId) q = q.eq('college_id', collegeId);
        const { data: lRows } = await q.order('scheduled_date', { ascending: false });
        lessons = (lRows ?? []).map((r: any) => ({
          lesson_plan_id: r.id,
          title: r.title,
          scheduled_date: r.scheduled_date,
          status: r.status,
        }));
      }

      let learners: AcLearnerProgress[] = [];
      const coverageRows = (coverageRes.data ?? []) as Array<{
        student_id: string;
        status: string;
        evidence_count: number;
        last_evidence_at: string | null;
        last_assessed_at: string | null;
      }>;
      if (coverageRows.length > 0 && collegeId) {
        const studentIds = coverageRows.map((r) => r.student_id);
        const { data: students } = await supabase
          .from('college_students')
          .select('id, name, college_id')
          .in('id', studentIds)
          .eq('college_id', collegeId);
        const nameById = new Map<string, string>();
        for (const s of (students ?? []) as Array<{ id: string; name: string }>) {
          nameById.set(s.id, s.name);
        }
        learners = coverageRows
          .filter((r) => nameById.has(r.student_id))
          .map((r) => ({
            student_id: r.student_id,
            student_name: nameById.get(r.student_id) ?? 'Learner',
            status: r.status,
            evidence_count: r.evidence_count,
            last_evidence_at: r.last_evidence_at,
            last_assessed_at: r.last_assessed_at,
          }));
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
