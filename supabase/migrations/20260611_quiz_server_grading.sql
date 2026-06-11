-- ============================================================================
-- Server-side quiz grading — STAGE 1 (additive, safe to apply before FE ships)
--
-- Problem (verified live 2026-06-11): learners can read
-- tutor_quiz_questions.correct_answer_index / expected_answer /
-- marking_guidance via the REST API ("Assigned learner can read quiz
-- questions" exposes all columns), grading runs client-side, and the
-- student_own_attempts policy is cmd=ALL so a learner can PATCH their attempt
-- to full marks. These scores feed Student 360 and the risk engine.
--
-- Design — preserves the existing answer-lock-then-instant-feedback UX:
--   1. get_quiz_questions_for_learner : sanitised payload. NO answer keys,
--      NO explanation, NO marking guidance — nothing pre-submit leaks.
--   2. reveal_quiz_answer             : records the learner's LOCKED answer
--      server-side (re-answering refused) and only then returns the verdict,
--      key, explanation and marking guidance — the same lock→highlight flow
--      the UI has today, minus the ability to read keys up front.
--   3. submit_quiz_attempt            : grades the SERVER-stored answers
--      (client supplies nothing), replicating the client's scoreVerdict()
--      exactly; free-response queues to tutor_quiz_answer_grades.
--   4. get_attempt_review             : verdicts + keys for a COMPLETED own
--      attempt, so the review screen survives reload after stage 2.
--
-- Stage 2 (supabase/migrations/pending/20260612_quiz_grading_lockdown.sql,
-- applied only after the RPC-based FE is live) drops the learner read policy
-- and direct score writes.
--
-- Rollback:
--   DROP FUNCTION IF EXISTS public.get_quiz_questions_for_learner(uuid);
--   DROP FUNCTION IF EXISTS public.reveal_quiz_answer(uuid, uuid, jsonb);
--   DROP FUNCTION IF EXISTS public.submit_quiz_attempt(uuid);
--   DROP FUNCTION IF EXISTS public.get_attempt_review(uuid);
-- ============================================================================

-- ─── 1. Sanitised question payload ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_quiz_questions_for_learner(p_quiz_id uuid)
RETURNS TABLE (
  id uuid,
  question_kind text,
  question_text text,
  options jsonb,
  category text,
  difficulty text,
  ac_ref text,
  points integer,
  sort_order integer,
  bs7671_citations jsonb,
  has_answer_key boolean,
  expected_units text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
STABLE
AS $$
  SELECT
    qq.id,
    qq.question_kind,
    qq.question_text,
    qq.options,
    qq.category,
    qq.difficulty,
    qq.ac_ref,
    qq.points,
    qq.sort_order,
    qq.bs7671_citations,
    CASE
      WHEN qq.question_kind IN ('multi_choice','true_false')
        THEN qq.correct_answer_index IS NOT NULL
      WHEN qq.question_kind = 'calculation'
        THEN (qq.expected_answer ->> 'numeric_value') IS NOT NULL
      ELSE true -- free-response is always gradable (AI/tutor)
    END AS has_answer_key,
    qq.expected_answer ->> 'units' AS expected_units
  FROM public.tutor_quiz_questions qq
  JOIN public.tutor_quizzes q ON q.id = qq.quiz_id
  WHERE qq.quiz_id = p_quiz_id
    AND q.is_published = true
    -- Same assignment gate as the existing learner read policy:
    AND (
      auth.uid() = ANY (COALESCE(q.assigned_student_ids, ARRAY[]::uuid[]))
      OR q.cohort_id IN (
        SELECT cs.cohort_id FROM public.college_students cs
        WHERE cs.user_id = auth.uid() AND cs.cohort_id IS NOT NULL
      )
      OR q.creator_id = auth.uid() -- owner preview
    )
  ORDER BY qq.sort_order ASC NULLS LAST;
$$;

REVOKE ALL ON FUNCTION public.get_quiz_questions_for_learner(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_quiz_questions_for_learner(uuid) TO authenticated;

-- ─── Shared verdict logic (mirrors the client's scoreVerdict exactly) ───────
CREATE OR REPLACE FUNCTION public._quiz_answer_verdict(q public.tutor_quiz_questions, a jsonb)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  v_numeric numeric;
  v_expected numeric;
  v_tolerance numeric;
BEGIN
  -- isUngradeable(): no usable answer key.
  IF (q.question_kind IN ('multi_choice','true_false') AND q.correct_answer_index IS NULL)
     OR (q.question_kind = 'calculation' AND (q.expected_answer ->> 'numeric_value') IS NULL) THEN
    RETURN 'no_key';
  END IF;
  -- Order matters (mirrors the client): an unanswered question is
  -- 'unanswered' for every kind — a skipped free-response must NOT read as
  -- 'pending' (nothing was queued for AI grading).
  IF a IS NULL THEN
    RETURN 'unanswered';
  END IF;
  IF q.question_kind IN ('short_answer','long_answer','scenario','image_annotation','practical_evidence') THEN
    RETURN 'pending';
  END IF;
  IF q.question_kind = 'multi_choice' AND a ->> 'kind' = 'multi_choice' THEN
    RETURN CASE WHEN (a ->> 'index')::int = q.correct_answer_index THEN 'correct' ELSE 'incorrect' END;
  END IF;
  IF q.question_kind = 'true_false' AND a ->> 'kind' = 'true_false' THEN
    RETURN CASE WHEN (a ->> 'value')::boolean = (q.correct_answer_index = 0) THEN 'correct' ELSE 'incorrect' END;
  END IF;
  IF q.question_kind = 'calculation' AND a ->> 'kind' = 'calculation' THEN
    v_numeric := (a ->> 'numeric')::numeric;
    v_expected := (q.expected_answer ->> 'numeric_value')::numeric;
    v_tolerance := COALESCE((q.expected_answer ->> 'tolerance')::numeric, 0);
    RETURN CASE WHEN v_numeric IS NOT NULL AND abs(v_numeric - v_expected) <= v_tolerance
                THEN 'correct' ELSE 'incorrect' END;
  END IF;
  RETURN 'incorrect'; -- answer kind doesn't match question kind
END;
$$;

-- ─── 2. Lock an answer in, get the verdict + key back ───────────────────────
CREATE OR REPLACE FUNCTION public.reveal_quiz_answer(
  p_attempt_id uuid,
  p_question_id uuid,
  p_answer jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_attempt record;
  v_q public.tutor_quiz_questions;
  v_answers jsonb;
  v_verdict text;
BEGIN
  SELECT * INTO v_attempt FROM public.tutor_quiz_attempts
  WHERE id = p_attempt_id FOR UPDATE;

  IF v_attempt.id IS NULL OR v_attempt.student_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'attempt not found';
  END IF;
  IF v_attempt.completed_at IS NOT NULL THEN
    RAISE EXCEPTION 'attempt already submitted';
  END IF;

  -- This RPC is an answer-key oracle — gate it on the same assignment check
  -- as the question payload, so a leaked quiz id on a self-inserted attempt
  -- can't be walked question-by-question.
  IF NOT EXISTS (
    SELECT 1 FROM public.tutor_quizzes tq
    WHERE tq.id = v_attempt.quiz_id
      AND tq.is_published = true
      AND (
        auth.uid() = ANY (COALESCE(tq.assigned_student_ids, ARRAY[]::uuid[]))
        OR tq.cohort_id IN (
          SELECT cs.cohort_id FROM public.college_students cs
          WHERE cs.user_id = auth.uid() AND cs.cohort_id IS NOT NULL
        )
        OR tq.creator_id = auth.uid()
      )
  ) THEN
    RAISE EXCEPTION 'quiz not assigned';
  END IF;

  SELECT * INTO v_q FROM public.tutor_quiz_questions
  WHERE id = p_question_id AND quiz_id = v_attempt.quiz_id;
  IF v_q.id IS NULL THEN
    RAISE EXCEPTION 'question not in this quiz';
  END IF;

  -- The column default is '[]' (an array) — `?` and `||` behave differently
  -- on arrays, which would silently break the once-only lock. Normalise.
  v_answers := CASE WHEN jsonb_typeof(v_attempt.answers) = 'object'
                    THEN v_attempt.answers ELSE '{}'::jsonb END;

  -- The lock is the security model: once a question's answer is recorded it
  -- cannot change, so seeing the key can't improve THIS answer.
  IF v_answers ? (p_question_id::text) THEN
    RAISE EXCEPTION 'question already answered';
  END IF;
  IF p_answer IS NULL THEN
    RAISE EXCEPTION 'answer required';
  END IF;

  PERFORM set_config('app.quiz_submit', '1', true);
  UPDATE public.tutor_quiz_attempts
  SET answers = v_answers || jsonb_build_object(p_question_id::text, p_answer)
  WHERE id = p_attempt_id;

  v_verdict := public._quiz_answer_verdict(v_q, p_answer);

  RETURN jsonb_build_object(
    'verdict', v_verdict,
    'correct_answer_index', v_q.correct_answer_index,
    'expected_answer', v_q.expected_answer,
    'explanation', v_q.explanation,
    'marking_guidance', v_q.marking_guidance
  );
END;
$$;

REVOKE ALL ON FUNCTION public.reveal_quiz_answer(uuid, uuid, jsonb) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.reveal_quiz_answer(uuid, uuid, jsonb) TO authenticated;

-- ─── 3. Submit — grades the server-stored answers ───────────────────────────
CREATE OR REPLACE FUNCTION public.submit_quiz_attempt(p_attempt_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_attempt record;
  q public.tutor_quiz_questions;
  a jsonb;
  v_answers jsonb;
  v_score numeric := 0;
  v_total numeric := 0;
  v_ungradeable int := 0;
  v_points numeric;
  v_verdict text;
  v_verdicts jsonb := '[]'::jsonb;
  v_completed timestamptz := now();
BEGIN
  -- FOR UPDATE: serialises concurrent submits so the completed_at check
  -- can't pass twice (double-grade / duplicate answer-grade rows).
  SELECT * INTO v_attempt FROM public.tutor_quiz_attempts
  WHERE id = p_attempt_id FOR UPDATE;

  IF v_attempt.id IS NULL OR v_attempt.student_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'attempt not found';
  END IF;
  IF v_attempt.completed_at IS NOT NULL THEN
    RAISE EXCEPTION 'attempt already submitted';
  END IF;

  PERFORM set_config('app.quiz_submit', '1', true);

  -- Normalise: the column default is '[]' (array) — `->` on an array by text
  -- key returns NULL, which would grade everything 'unanswered'.
  v_answers := CASE WHEN jsonb_typeof(v_attempt.answers) = 'object'
                    THEN v_attempt.answers ELSE '{}'::jsonb END;

  FOR q IN
    SELECT * FROM public.tutor_quiz_questions WHERE quiz_id = v_attempt.quiz_id
  LOOP
    v_points := COALESCE(q.points, 1);
    a := v_answers -> (q.id::text);
    v_verdict := public._quiz_answer_verdict(q, a);

    IF v_verdict = 'no_key' THEN
      -- Excluded from numerator AND denominator (the client's honesty rule).
      v_ungradeable := v_ungradeable + 1;
      v_verdicts := v_verdicts || jsonb_build_object('question_id', q.id, 'verdict', 'no_key');
      CONTINUE;
    END IF;

    v_total := v_total + v_points;

    IF v_verdict = 'pending' THEN
      -- Free-response: queue for AI grading when answered.
      IF a IS NOT NULL THEN
        INSERT INTO public.tutor_quiz_answer_grades (attempt_id, question_id, learner_answer)
        VALUES (p_attempt_id, q.id, a);
      END IF;
    ELSIF v_verdict = 'correct' THEN
      v_score := v_score + v_points;
    END IF;

    v_verdicts := v_verdicts || jsonb_build_object('question_id', q.id, 'verdict', v_verdict);
  END LOOP;

  UPDATE public.tutor_quiz_attempts
  SET score = v_score,
      total_points = v_total,
      completed_at = v_completed,
      time_taken_seconds = GREATEST(0, EXTRACT(epoch FROM v_completed - started_at))::int
  WHERE id = p_attempt_id;

  RETURN jsonb_build_object(
    'score', v_score,
    'total_points', v_total,
    'percentage', CASE WHEN v_total > 0 THEN round((v_score / v_total) * 100) ELSE 0 END,
    'ungradeable_count', v_ungradeable,
    'completed_at', v_completed,
    'verdicts', v_verdicts
  );
END;
$$;

REVOKE ALL ON FUNCTION public.submit_quiz_attempt(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.submit_quiz_attempt(uuid) TO authenticated;

-- ─── 4. Review payload for a completed own attempt (reload-safe) ────────────
CREATE OR REPLACE FUNCTION public.get_attempt_review(p_attempt_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
STABLE
AS $$
DECLARE
  v_attempt record;
  q public.tutor_quiz_questions;
  v_answers jsonb;
  v_items jsonb := '[]'::jsonb;
BEGIN
  SELECT * INTO v_attempt FROM public.tutor_quiz_attempts WHERE id = p_attempt_id;
  IF v_attempt.id IS NULL OR v_attempt.student_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'attempt not found';
  END IF;
  IF v_attempt.completed_at IS NULL THEN
    RAISE EXCEPTION 'attempt not yet submitted';
  END IF;

  v_answers := CASE WHEN jsonb_typeof(v_attempt.answers) = 'object'
                    THEN v_attempt.answers ELSE '{}'::jsonb END;

  FOR q IN
    SELECT * FROM public.tutor_quiz_questions WHERE quiz_id = v_attempt.quiz_id
  LOOP
    v_items := v_items || jsonb_build_object(
      'question_id', q.id,
      'verdict', public._quiz_answer_verdict(q, v_answers -> (q.id::text)),
      'correct_answer_index', q.correct_answer_index,
      'expected_answer', q.expected_answer,
      'explanation', q.explanation,
      'marking_guidance', q.marking_guidance
    );
  END LOOP;

  RETURN jsonb_build_object(
    'score', v_attempt.score,
    'total_points', v_attempt.total_points,
    'completed_at', v_attempt.completed_at,
    'items', v_items
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_attempt_review(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_attempt_review(uuid) TO authenticated;
