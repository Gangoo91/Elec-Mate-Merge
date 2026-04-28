-- Auto-seed student_ac_coverage when an apprentice's course_id is set.
-- Two callable RPCs (per-student + all-students) and a trigger that fires
-- on INSERT or course_id UPDATE on college_students. All SECURITY DEFINER
-- so they bypass RLS and the table-grant.

CREATE OR REPLACE FUNCTION public.seed_student_ac_coverage(p_student_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_qualification_code text;
  v_inserted integer := 0;
BEGIN
  SELECT cc.code INTO v_qualification_code
  FROM public.college_students cs
  JOIN public.college_courses cc ON cc.id = cs.course_id
  WHERE cs.id = p_student_id
    AND cs.course_id IS NOT NULL
    AND COALESCE(cs.status, 'active') NOT IN ('withdrawn', 'completed');

  IF v_qualification_code IS NULL THEN
    RETURN 0;
  END IF;

  WITH inserted AS (
    INSERT INTO public.student_ac_coverage
      (student_id, qualification_code, unit_code, ac_code, status, evidence_count)
    SELECT p_student_id, qr.qualification_code, qr.unit_code, qr.ac_code, 'not_started', 0
    FROM public.qualification_requirements qr
    WHERE qr.qualification_code = v_qualification_code
      AND NOT EXISTS (
        SELECT 1 FROM public.student_ac_coverage sac
        WHERE sac.student_id = p_student_id
          AND sac.qualification_code = qr.qualification_code
          AND sac.unit_code = qr.unit_code
          AND sac.ac_code = qr.ac_code
      )
    RETURNING 1
  )
  SELECT COUNT(*) INTO v_inserted FROM inserted;

  RETURN v_inserted;
END;
$$;

GRANT EXECUTE ON FUNCTION public.seed_student_ac_coverage(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.seed_student_ac_coverage_all()
RETURNS TABLE(student_id uuid, inserted integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT cs.id, public.seed_student_ac_coverage(cs.id)
  FROM public.college_students cs
  WHERE cs.course_id IS NOT NULL
    AND COALESCE(cs.status, 'active') NOT IN ('withdrawn', 'completed');
END;
$$;

GRANT EXECUTE ON FUNCTION public.seed_student_ac_coverage_all() TO service_role;

CREATE OR REPLACE FUNCTION public.tg_seed_ac_coverage_on_course_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.course_id IS NOT NULL
     AND (TG_OP = 'INSERT' OR OLD.course_id IS DISTINCT FROM NEW.course_id)
  THEN
    PERFORM public.seed_student_ac_coverage(NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auto_seed_ac_coverage ON public.college_students;
CREATE TRIGGER auto_seed_ac_coverage
AFTER INSERT OR UPDATE OF course_id ON public.college_students
FOR EACH ROW
EXECUTE FUNCTION public.tg_seed_ac_coverage_on_course_change();
