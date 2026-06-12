-- ============================================================================
-- get_my_college_team — the apprentice's assigned college staff, by name.
--
-- Apprentices cannot SELECT college_staff (staff-only RLS), so they never see
-- WHO their tutor/assessor/IQA is — flagged in the integration audit as a
-- visibility gap, and it makes the tutor-messaging sheet feel anonymous.
-- This SECURITY DEFINER RPC returns just names + roles for the caller's own
-- assignment row. Nothing else from the staff table leaks.
--
-- Rollback: DROP FUNCTION IF EXISTS public.get_my_college_team();
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_my_college_team()
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COALESCE(
    (
      SELECT jsonb_agg(jsonb_build_object('role', t.role, 'name', t.name) ORDER BY t.ord)
      FROM (
        SELECT 'Tutor' AS role, s.name, 1 AS ord
        FROM college_student_assignments csa
        JOIN college_staff s ON s.id = csa.tutor_id
        WHERE csa.student_id = auth.uid()
        UNION ALL
        SELECT 'Assessor', s.name, 2
        FROM college_student_assignments csa
        JOIN college_staff s ON s.id = csa.assessor_id
        WHERE csa.student_id = auth.uid()
        UNION ALL
        SELECT 'IQA', s.name, 3
        FROM college_student_assignments csa
        JOIN college_staff s ON s.id = csa.iqa_id
        WHERE csa.student_id = auth.uid()
      ) t
      WHERE t.name IS NOT NULL
    ),
    '[]'::jsonb
  );
$$;

REVOKE ALL ON FUNCTION public.get_my_college_team() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_my_college_team() TO authenticated;
