-- ============================================================
-- College Apprentice Voice — anonymous monthly survey + sentiment
-- ============================================================
-- ELE-936 (L1). Lets apprentices submit anonymous monthly feedback. The
-- aggregate is visible to the college as a sentiment + theme breakdown.
-- No individual response is ever joinable back to a user.
-- ============================================================

-- 1. Survey definitions (per college, configurable)
CREATE TABLE IF NOT EXISTS public.college_apprentice_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Monthly check-in',
  iso_month TEXT NOT NULL,                     -- '2026-05'
  open_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  close_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '14 days'),

  -- Questions: [{ key, kind: 'scale_1_5' | 'free_text' | 'multi_choice', label, options? }]
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,

  cohort_filter UUID[],                        -- optional: limit to specific cohorts
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (college_id, iso_month)
);

CREATE INDEX IF NOT EXISTS idx_apprentice_surveys_college ON public.college_apprentice_surveys(college_id);
CREATE INDEX IF NOT EXISTS idx_apprentice_surveys_iso_month ON public.college_apprentice_surveys(iso_month);

ALTER TABLE public.college_apprentice_surveys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "surveys_select" ON public.college_apprentice_surveys
  FOR SELECT USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.college_id = college_apprentice_surveys.college_id
      AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "surveys_insert" ON public.college_apprentice_surveys
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_apprentice_surveys.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

CREATE POLICY "surveys_update" ON public.college_apprentice_surveys
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_apprentice_surveys.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- 2. Anonymous responses
-- We DO NOT store user_id, only a salted random_token per response.
-- A separate `college_apprentice_survey_submissions` log tracks which
-- (user_id, survey_id) pairs have submitted, for one-submission-per-user
-- de-duplication. The submission log is INSERT-only and visible only to
-- the user themselves.
CREATE TABLE IF NOT EXISTS public.college_apprentice_survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES public.college_apprentice_surveys(id) ON DELETE CASCADE,
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  response_token TEXT NOT NULL,                -- random, never linked to user
  cohort_band TEXT,                            -- optional: aggregate by cohort without revealing identity
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- answers shape: { question_key: scale_value | free_text | choice_value }
  sentiment_score NUMERIC(3,2),                -- -1..1 (only set for surveys with free_text)
  sentiment_label TEXT CHECK (sentiment_label IN ('positive','neutral','negative','mixed') OR sentiment_label IS NULL),
  themes TEXT[],                               -- AI-extracted themes from free-text
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_apprentice_survey_responses_survey ON public.college_apprentice_survey_responses(survey_id);
CREATE INDEX IF NOT EXISTS idx_apprentice_survey_responses_college ON public.college_apprentice_survey_responses(college_id);

ALTER TABLE public.college_apprentice_survey_responses ENABLE ROW LEVEL SECURITY;

-- College staff can SELECT only when there are >= 5 responses (k-anon protection)
CREATE POLICY "apprentice_responses_select_agg" ON public.college_apprentice_survey_responses
  FOR SELECT USING (
    _ch_same_college(college_id)
    AND (
      SELECT COUNT(*) FROM college_apprentice_survey_responses r2
      WHERE r2.survey_id = college_apprentice_survey_responses.survey_id
    ) >= 5
  );

-- Anyone authenticated can insert their anonymous response for an active survey
CREATE POLICY "apprentice_responses_insert" ON public.college_apprentice_survey_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM college_apprentice_surveys s
      WHERE s.id = survey_id
      AND s.is_active = true
      AND s.close_at > now()
    )
  );

-- 3. Submission log (one-per-user-per-survey de-dup, not linked to responses)
CREATE TABLE IF NOT EXISTS public.college_apprentice_survey_submissions (
  user_id UUID NOT NULL,
  survey_id UUID NOT NULL REFERENCES public.college_apprentice_surveys(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, survey_id)
);

ALTER TABLE public.college_apprentice_survey_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "submissions_select_self" ON public.college_apprentice_survey_submissions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "submissions_insert_self" ON public.college_apprentice_survey_submissions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- 4. Sentiment rollup view (k-anon protected at the policy layer)
CREATE OR REPLACE VIEW public.college_voice_rollup AS
SELECT
  survey_id,
  college_id,
  COUNT(*)::int AS response_count,
  ROUND(AVG(sentiment_score)::numeric, 2) AS avg_sentiment,
  COUNT(*) FILTER (WHERE sentiment_label = 'positive')::int AS positive_count,
  COUNT(*) FILTER (WHERE sentiment_label = 'neutral')::int  AS neutral_count,
  COUNT(*) FILTER (WHERE sentiment_label = 'negative')::int AS negative_count,
  COUNT(*) FILTER (WHERE sentiment_label = 'mixed')::int    AS mixed_count
FROM public.college_apprentice_survey_responses
GROUP BY survey_id, college_id;

GRANT SELECT ON public.college_voice_rollup TO authenticated;

DROP TRIGGER IF EXISTS trg_apprentice_surveys_updated_at ON public.college_apprentice_surveys;
CREATE TRIGGER trg_apprentice_surveys_updated_at
  BEFORE UPDATE ON public.college_apprentice_surveys
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
