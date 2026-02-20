-- Site survey AI analysis jobs table
CREATE TABLE IF NOT EXISTS public.site_survey_analysis_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  site_visit_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_step text,
  input_data jsonb,
  result jsonb,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz
);

-- Index for quick user lookups
CREATE INDEX IF NOT EXISTS idx_site_survey_analysis_jobs_user_id
  ON public.site_survey_analysis_jobs(user_id);

-- Index for quick visit lookups
CREATE INDEX IF NOT EXISTS idx_site_survey_analysis_jobs_site_visit_id
  ON public.site_survey_analysis_jobs(site_visit_id);

-- RLS: users can only access their own rows
ALTER TABLE public.site_survey_analysis_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analysis jobs"
  ON public.site_survey_analysis_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analysis jobs"
  ON public.site_survey_analysis_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analysis jobs"
  ON public.site_survey_analysis_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role bypass for edge functions
CREATE POLICY "Service role full access to analysis jobs"
  ON public.site_survey_analysis_jobs
  FOR ALL
  USING (auth.role() = 'service_role');
