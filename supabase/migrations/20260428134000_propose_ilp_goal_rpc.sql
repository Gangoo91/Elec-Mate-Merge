-- AI write-back Phase 3: apprentice can propose an ILP goal from the
-- College AI notebook. SECURITY DEFINER bypasses the staff-only INSERT
-- policy on college_ilp_goals — RPC enforces apprentice ownership +
-- forces source='student' so the tutor sees clearly that it was apprentice-
-- proposed (existing UI distinguishes by source).
--
-- If the apprentice has no current ILP yet (early-stage onboarding), the
-- RPC auto-creates a minimal one so the goal can attach.

CREATE OR REPLACE FUNCTION public.propose_ilp_goal(
  p_title text,
  p_description text,
  p_acceptance_criteria text,
  p_category text,
  p_priority text,
  p_target_date date
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_student_id uuid;
  v_college_id uuid;
  v_ilp_id uuid;
  v_position int;
  v_goal_id uuid;
  v_clean_category text;
  v_clean_priority text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  SELECT cs.id, cs.college_id
  INTO v_student_id, v_college_id
  FROM public.college_students cs
  WHERE cs.user_id = v_uid;

  IF v_student_id IS NULL THEN
    RAISE EXCEPTION 'no_learner_context';
  END IF;

  v_clean_category := CASE
    WHEN p_category IN (
      'academic', 'behavioural', 'skills', 'employability',
      'wellbeing', 'attendance', 'other'
    ) THEN p_category
    ELSE 'academic'
  END;
  v_clean_priority := CASE
    WHEN p_priority IN ('low', 'medium', 'high') THEN p_priority
    ELSE 'medium'
  END;

  SELECT id INTO v_ilp_id
  FROM public.college_ilps
  WHERE student_id = v_student_id
    AND COALESCE(is_current, true) = true
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_ilp_id IS NULL THEN
    INSERT INTO public.college_ilps (student_id, college_id, status, is_current, version)
    VALUES (v_student_id, v_college_id, 'Active', true, 1)
    RETURNING id INTO v_ilp_id;
  END IF;

  SELECT COALESCE(MAX(position), -1) + 1
  INTO v_position
  FROM public.college_ilp_goals
  WHERE ilp_id = v_ilp_id;

  INSERT INTO public.college_ilp_goals (
    ilp_id, student_id, college_id, position,
    category, priority, source,
    title, description, acceptance_criteria,
    target_date, status, created_by
  )
  VALUES (
    v_ilp_id, v_student_id, v_college_id, v_position,
    v_clean_category, v_clean_priority, 'student',
    LEFT(TRIM(p_title), 200),
    LEFT(TRIM(p_description), 4000),
    NULLIF(LEFT(TRIM(p_acceptance_criteria), 2000), ''),
    p_target_date, 'not_started', v_uid
  )
  RETURNING id INTO v_goal_id;

  RETURN v_goal_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.propose_ilp_goal(text, text, text, text, text, date) TO authenticated;
