/**
 * useStudentQualification
 *
 * Single resolver for the authenticated apprentice's qualification code.
 *
 * Source of truth = the active `user_qualification_selections` row
 * (→ qualifications.code) — this is what the AC catalogue, coverage sync and
 * capture flow key on. We ALSO resolve the college's expected course
 * (`college_students.course_id` → `college_courses.code`) and:
 *   - fall back to it when the apprentice hasn't made a selection, and
 *   - flag `divergesFromCollege` when the two disagree (the historical
 *     "evidencing the wrong qualification" bug class) so the UI can prompt the
 *     apprentice to fix their selection.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Resolve an enrolment qualification code to the canonical requirement code that
 * actually holds LO/AC rows. Many qualifications (e.g. the 9 EAL codes) carry no
 * direct `qualification_requirements` rows and instead map to a shared canonical
 * code via `qualification_requirement_mappings` (e.g. 603/3895/8 → 601/7345/2).
 * Returns the code unchanged when there's no primary mapping.
 */
async function resolveRequirementCode(code: string | null): Promise<string | null> {
  if (!code) return code;
  const { data } = await supabase
    .from('qualification_requirement_mappings')
    .select('requirement_code')
    .eq('qualification_code', code)
    .eq('is_primary', true)
    .maybeSingle();
  return data?.requirement_code ?? code;
}

interface StudentQualification {
  qualificationCode: string | null;
  qualificationName: string | null;
  qualificationId: string | null;
  /** The qualification the college expects (from college_courses.code). */
  collegeCourseCode: string | null;
  /** True when the active selection and the college course disagree. */
  divergesFromCollege: boolean;
  /** Where qualificationCode came from. */
  source: 'selection' | 'college' | null;
  isLoading: boolean;
}

export function useStudentQualification(): StudentQualification {
  const { user } = useAuth();
  const [state, setState] = useState<Omit<StudentQualification, 'isLoading'>>({
    qualificationCode: null,
    qualificationName: null,
    qualificationId: null,
    collegeCourseCode: null,
    divergesFromCollege: false,
    source: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    let cancelled = false;

    async function load() {
      try {
        // Primary (active selection) + the college's expected course, together.
        const [{ data: sel }, { data: cs }] = await Promise.all([
          supabase
            .from('user_qualification_selections')
            .select('qualification_id, qualification:qualifications(id, code, title)')
            .eq('user_id', user!.id)
            .eq('is_active', true)
            .maybeSingle(),
          supabase
            .from('college_students')
            .select('course_id')
            .eq('user_id', user!.id)
            .maybeSingle(),
        ]);

        // Resolve the college's expected course code (if linked to a college).
        let collegeCourseCode: string | null = null;
        let collegeCourseName: string | null = null;
        const courseId = (cs as { course_id?: string | null } | null)?.course_id ?? null;
        if (courseId) {
          const { data: course } = await supabase
            .from('college_courses')
            .select('code, name')
            .eq('id', courseId)
            .maybeSingle();
          collegeCourseCode = (course as { code?: string | null } | null)?.code ?? null;
          collegeCourseName = (course as { name?: string | null } | null)?.name ?? null;
        }

        const qual = (sel?.qualification ?? null) as {
          id: string;
          code: string;
          title: string;
        } | null;

        if (cancelled) return;

        if (qual) {
          const diverges = !!(collegeCourseCode && qual.code !== collegeCourseCode);
          if (diverges) {
            console.warn(
              `[useStudentQualification] active selection "${qual.code}" differs from college course "${collegeCourseCode}" — coverage/ACs may track the wrong qualification.`
            );
          }
          // Resolve to the canonical requirement code (e.g. EAL 603/3895/8 →
          // 601/7345/2) so the catalogue/coverage queries hit real LO/AC rows.
          const resolved = await resolveRequirementCode(qual.code);
          if (cancelled) return;
          setState({
            qualificationCode: resolved,
            qualificationName: qual.title,
            qualificationId: qual.id,
            collegeCourseCode,
            divergesFromCollege: diverges,
            source: 'selection',
          });
        } else if (collegeCourseCode) {
          // No selection — fall back to the college's course so the catalogue
          // and coverage still resolve to something.
          const resolved = await resolveRequirementCode(collegeCourseCode);
          if (cancelled) return;
          setState({
            qualificationCode: resolved,
            qualificationName: collegeCourseName,
            qualificationId: null,
            collegeCourseCode,
            divergesFromCollege: false,
            source: 'college',
          });
        } else {
          setState({
            qualificationCode: null,
            qualificationName: null,
            qualificationId: null,
            collegeCourseCode: null,
            divergesFromCollege: false,
            source: null,
          });
        }
      } catch {
        // No active qualification — that's fine.
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { ...state, isLoading };
}
