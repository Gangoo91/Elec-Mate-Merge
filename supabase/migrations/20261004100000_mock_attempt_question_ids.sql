-- ELE-1808 — a mock paper needs to know what this learner was shown last time.
--
-- The AM2 paper drew every sitting as if the last one never happened, so a
-- learner who sat it twice met the same questions. Recording the ids served
-- and the ids got wrong lets the next paper prefer unseen questions and bring
-- back the ones still being missed.
--
-- Additive and nullable: existing rows, the public SEO papers' inserts and the
-- insert policy are untouched. Bounded like the policy bounds total_questions.
-- Readable only through the existing "users read own mock attempts" policy.

ALTER TABLE public.seo_mock_attempts
  ADD COLUMN IF NOT EXISTS question_ids integer[],
  ADD COLUMN IF NOT EXISTS wrong_ids integer[];

ALTER TABLE public.seo_mock_attempts
  ADD CONSTRAINT seo_mock_attempts_question_ids_bounded
    CHECK (question_ids IS NULL OR cardinality(question_ids) <= 100),
  ADD CONSTRAINT seo_mock_attempts_wrong_ids_bounded
    CHECK (wrong_ids IS NULL OR cardinality(wrong_ids) <= 100);
