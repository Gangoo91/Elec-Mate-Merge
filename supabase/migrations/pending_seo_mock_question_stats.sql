-- seo_mock_question_stats — per-question aggregate results from the free
-- public mock exams. Powers the "questions electricians actually fail"
-- first-party data content (no PII: counters only, keyed by exam + question).
--
-- ⚠️ PENDING — apply via mcp apply_migration together with the front-end
-- push that ships the log_mock_question_results() caller in SEOMockExam.tsx.

CREATE TABLE IF NOT EXISTS public.seo_mock_question_stats (
  exam_slug text NOT NULL,
  question_id integer NOT NULL,
  times_shown integer NOT NULL DEFAULT 0,
  times_wrong integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (exam_slug, question_id)
);

ALTER TABLE public.seo_mock_question_stats ENABLE ROW LEVEL SECURITY;

-- Read-only to everyone (aggregates, no PII); writes only via the RPC below.
CREATE POLICY "seo_mock_question_stats_public_read"
  ON public.seo_mock_question_stats FOR SELECT
  USING (true);

-- Increment counters for one submitted exam. SECURITY DEFINER so the anon
-- public exam pages can log without table write grants. Bounded input so a
-- malicious caller cannot inflate more than one exam's worth per call.
CREATE OR REPLACE FUNCTION public.log_mock_question_results(
  p_exam_slug text,
  p_shown_ids integer[],
  p_wrong_ids integer[]
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- sanity bounds: one exam is <= 60 questions
  IF p_exam_slug IS NULL OR length(p_exam_slug) > 80
     OR array_length(p_shown_ids, 1) IS NULL
     OR array_length(p_shown_ids, 1) > 60
     OR coalesce(array_length(p_wrong_ids, 1), 0) > 60 THEN
    RETURN;
  END IF;

  INSERT INTO public.seo_mock_question_stats AS s (exam_slug, question_id, times_shown, times_wrong)
  SELECT p_exam_slug, q, 1, CASE WHEN q = ANY (coalesce(p_wrong_ids, '{}')) THEN 1 ELSE 0 END
  FROM unnest(p_shown_ids) AS q
  ON CONFLICT (exam_slug, question_id) DO UPDATE
    SET times_shown = s.times_shown + 1,
        times_wrong = s.times_wrong + excluded.times_wrong,
        updated_at = now();
END;
$$;

REVOKE ALL ON FUNCTION public.log_mock_question_results(text, integer[], integer[]) FROM public;
GRANT EXECUTE ON FUNCTION public.log_mock_question_results(text, integer[], integer[]) TO anon, authenticated;
