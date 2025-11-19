-- Create installation_method_jobs table for async job processing
CREATE TABLE IF NOT EXISTS public.installation_method_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  query TEXT NOT NULL,
  project_details JSONB NOT NULL,
  designer_context JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'complete', 'failed', 'cancelled')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_step TEXT,
  method_data JSONB,
  quality_metrics JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.installation_method_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own installation method jobs"
  ON public.installation_method_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own installation method jobs"
  ON public.installation_method_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own installation method jobs"
  ON public.installation_method_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_installation_method_jobs_user_id ON public.installation_method_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_installation_method_jobs_status ON public.installation_method_jobs(status);
CREATE INDEX IF NOT EXISTS idx_installation_method_jobs_created_at ON public.installation_method_jobs(created_at DESC);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_installation_method_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER installation_method_jobs_updated_at
  BEFORE UPDATE ON public.installation_method_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_installation_method_jobs_updated_at();