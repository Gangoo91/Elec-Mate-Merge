-- ============================================================================
-- Server-side quiz grading — STAGE 2 (lockdown)
--
-- ⚠️ Apply ONLY AFTER the front-end that uses get_quiz_questions_for_learner
-- and submit_quiz_attempt is deployed — this breaks the old client's direct
-- question reads and direct score writes (that's the point).
--
-- 1. Learners lose direct SELECT on tutor_quiz_questions (answer key columns
--    were readable via REST). Tutors/owners keep their policy. Learners get
--    questions via the sanitised RPC only.
-- 2. student_own_attempts (cmd=ALL) is replaced with explicit SELECT / INSERT
--    / UPDATE policies.
-- 3. A column-guard trigger stops learners writing graded fields directly;
--    only submit_quiz_attempt (via the app.quiz_submit GUC) and service-role
--    contexts may. Completed attempts are locked entirely for learners.
--
-- Rollback:
--   DROP TRIGGER IF EXISTS trg_quiz_attempts_learner_guard ON public.tutor_quiz_attempts;
--   DROP FUNCTION IF EXISTS public._quiz_attempts_learner_guard();
--   DROP POLICY IF EXISTS student_read_own_attempts ON public.tutor_quiz_attempts;
--   DROP POLICY IF EXISTS student_start_own_attempt ON public.tutor_quiz_attempts;
--   DROP POLICY IF EXISTS student_autosave_own_attempt ON public.tutor_quiz_attempts;
--   CREATE POLICY student_own_attempts ON public.tutor_quiz_attempts
--     FOR ALL USING (student_id = auth.uid());
--   CREATE POLICY "Assigned learner can read quiz questions" ON public.tutor_quiz_questions
--     FOR SELECT USING (EXISTS (SELECT 1 FROM tutor_quizzes q WHERE q.id = quiz_id
--       AND q.is_published = true
--       AND (auth.uid() = ANY (COALESCE(q.assigned_student_ids, ARRAY[]::uuid[]))
--            OR q.cohort_id IN (SELECT cs.cohort_id FROM college_students cs
--                               WHERE cs.user_id = auth.uid() AND cs.cohort_id IS NOT NULL))));
-- ============================================================================

-- 1. Learners read questions through the RPC only.
DROP POLICY IF EXISTS "Assigned learner can read quiz questions"
  ON public.tutor_quiz_questions;

-- 2. Replace the blanket learner policy on attempts.
DROP POLICY IF EXISTS student_own_attempts ON public.tutor_quiz_attempts;

CREATE POLICY student_read_own_attempts ON public.tutor_quiz_attempts
  FOR SELECT USING (student_id = auth.uid());

-- NOTE: score/total_points are NOT NULL in live schema (the FE inserts
-- score: 0 + the quiz's total) — `score IS NULL` would make this policy
-- unsatisfiable and brick every quiz start. Pin score to 0 and answers to a
-- fresh object (also closes the '[]'-answers lock-bypass vector at the door).
CREATE POLICY student_start_own_attempt ON public.tutor_quiz_attempts
  FOR INSERT WITH CHECK (
    student_id = auth.uid()
    AND completed_at IS NULL
    AND score = 0
    AND answers = '{}'::jsonb
  );

-- Learner UPDATE remains permitted at policy level, but the trigger below
-- guards every meaningful column (including answers — those go via
-- reveal_quiz_answer). Kept so legacy paths fail with a clear trigger
-- message rather than silent zero-row RLS updates.
CREATE POLICY student_autosave_own_attempt ON public.tutor_quiz_attempts
  FOR UPDATE USING (student_id = auth.uid());

-- 3. Column guard.
CREATE OR REPLACE FUNCTION public._quiz_attempts_learner_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Trusted contexts: service role (edge fns / crons) and the grading RPC.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;
  IF current_setting('app.quiz_submit', true) = '1' THEN
    RETURN NEW;
  END IF;

  IF OLD.student_id = auth.uid() THEN
    -- A submitted attempt is closed for the learner.
    IF OLD.completed_at IS NOT NULL THEN
      RAISE EXCEPTION 'attempt already submitted';
    END IF;
    -- Answers are recorded via reveal_quiz_answer (which locks each question
    -- once answered) — a direct answers PATCH would bypass that lock.
    IF NEW.answers            IS DISTINCT FROM OLD.answers            THEN RAISE EXCEPTION 'learner cannot edit: answers (use reveal_quiz_answer)'; END IF;
    IF NEW.score              IS DISTINCT FROM OLD.score              THEN RAISE EXCEPTION 'learner cannot edit: score'; END IF;
    IF NEW.total_points       IS DISTINCT FROM OLD.total_points       THEN RAISE EXCEPTION 'learner cannot edit: total_points'; END IF;
    IF NEW.completed_at       IS DISTINCT FROM OLD.completed_at       THEN RAISE EXCEPTION 'learner cannot edit: completed_at'; END IF;
    IF NEW.time_taken_seconds IS DISTINCT FROM OLD.time_taken_seconds THEN RAISE EXCEPTION 'learner cannot edit: time_taken_seconds'; END IF;
    IF NEW.started_at         IS DISTINCT FROM OLD.started_at         THEN RAISE EXCEPTION 'learner cannot edit: started_at'; END IF;
    IF NEW.student_id         IS DISTINCT FROM OLD.student_id         THEN RAISE EXCEPTION 'learner cannot edit: student_id'; END IF;
    IF NEW.quiz_id            IS DISTINCT FROM OLD.quiz_id            THEN RAISE EXCEPTION 'learner cannot edit: quiz_id'; END IF;
    RETURN NEW;
  END IF;

  RETURN NEW; -- non-learner paths governed by their own policies
END;
$$;

DROP TRIGGER IF EXISTS trg_quiz_attempts_learner_guard ON public.tutor_quiz_attempts;
CREATE TRIGGER trg_quiz_attempts_learner_guard
  BEFORE UPDATE ON public.tutor_quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION public._quiz_attempts_learner_guard();
