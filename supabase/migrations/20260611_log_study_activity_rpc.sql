-- ============================================================================
-- log_study_activity — server-clamped Study Centre → OTJ credit.
--
-- The Study Centre tracker measures engaged time client-side (foreground +
-- interaction-anchored windows), but a client-side number can't be the last
-- word on a compliance figure. This RPC is the only trusted write path for
-- study_module activity and enforces:
--
--   - per-entry cap        : 30 min   (matches the client clamp)
--   - per-section daily cap: 30 min   (re-reading the same page can't stack)
--   - daily cap            : 240 min  (a long evening's study, no more)
--
-- Excess minutes are simply not credited (the response says so). Every
-- inserted row is therefore within caps, so the existing trg_auto_log_ojt
-- trigger may legitimately flip it to counted_as_ojt and mirror it into
-- time_entries exactly as it does for flashcards/quizzes today.
--
-- XP/streak remain client-side (gamification, not compliance).
--
-- Rollback: DROP FUNCTION IF EXISTS public.log_study_activity(text, text, text, integer);
-- ============================================================================

CREATE OR REPLACE FUNCTION public.log_study_activity(
  p_course text,
  p_section text,
  p_title text,
  p_active_seconds integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  c_entry_cap_min   constant integer := 30;
  c_section_cap_min constant integer := 30;
  c_daily_cap_min   constant integer := 240;
  v_user uuid := auth.uid();
  v_requested_min integer;
  v_section_used integer;
  v_daily_used integer;
  v_allowed integer;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF p_course IS NULL OR p_section IS NULL OR COALESCE(p_active_seconds, 0) < 60 THEN
    RETURN jsonb_build_object('credited_minutes', 0, 'reason', 'below_minimum');
  END IF;

  -- Sanity ceiling on the raw input (8h) before the real caps apply.
  v_requested_min := LEAST(round(LEAST(p_active_seconds, 28800) / 60.0)::int, c_entry_cap_min);
  IF v_requested_min < 1 THEN
    RETURN jsonb_build_object('credited_minutes', 0, 'reason', 'below_minimum');
  END IF;

  SELECT COALESCE(SUM(duration_minutes), 0) INTO v_section_used
  FROM public.learning_activity_log
  WHERE user_id = v_user
    AND activity_type = 'study_module'
    AND created_at >= date_trunc('day', now())
    AND metadata ->> 'course' = p_course
    AND metadata ->> 'section' = p_section;

  SELECT COALESCE(SUM(duration_minutes), 0) INTO v_daily_used
  FROM public.learning_activity_log
  WHERE user_id = v_user
    AND activity_type = 'study_module'
    AND created_at >= date_trunc('day', now());

  v_allowed := LEAST(
    v_requested_min,
    GREATEST(0, c_section_cap_min - v_section_used),
    GREATEST(0, c_daily_cap_min - v_daily_used)
  );

  IF v_allowed <= 0 THEN
    RETURN jsonb_build_object(
      'credited_minutes', 0,
      'reason', CASE WHEN v_daily_used >= c_daily_cap_min THEN 'daily_cap' ELSE 'section_cap' END
    );
  END IF;

  -- counted_as_ojt=false on insert; trg_auto_log_ojt flips it (duration > 0)
  -- and mirrors into time_entries — same path as every other activity type.
  INSERT INTO public.learning_activity_log
    (user_id, activity_type, source_id, source_title, xp_earned, duration_minutes, metadata, counted_as_ojt)
  VALUES (
    v_user,
    'study_module',
    p_course || '/' || p_section,
    COALESCE(NULLIF(p_title, ''), p_course || ' — ' || p_section),
    25,
    v_allowed,
    jsonb_build_object(
      'course', p_course,
      'section', p_section,
      'active_seconds', LEAST(p_active_seconds, 28800),
      'measured', true,
      'capped', v_allowed < v_requested_min,
      'via_rpc', true
    ),
    false
  );

  RETURN jsonb_build_object('credited_minutes', v_allowed, 'xp', 25);
END;
$$;

REVOKE ALL ON FUNCTION public.log_study_activity(text, text, text, integer) FROM anon;
