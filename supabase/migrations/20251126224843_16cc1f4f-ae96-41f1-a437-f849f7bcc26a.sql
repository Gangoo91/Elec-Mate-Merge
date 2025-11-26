-- Create cost_engineer_jobs table for asynchronous job processing
CREATE TABLE IF NOT EXISTS public.cost_engineer_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  query TEXT NOT NULL,
  region TEXT,
  project_context JSONB,
  business_settings JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  progress INTEGER NOT NULL DEFAULT 0,
  current_step TEXT,
  output_data JSONB,
  raw_response JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cost_engineer_jobs ENABLE ROW LEVEL SECURITY;

-- Users can view their own jobs
CREATE POLICY "Users can view their own cost engineer jobs"
  ON public.cost_engineer_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own jobs
CREATE POLICY "Users can insert their own cost engineer jobs"
  ON public.cost_engineer_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own jobs
CREATE POLICY "Users can update their own cost engineer jobs"
  ON public.cost_engineer_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own jobs
CREATE POLICY "Users can delete their own cost engineer jobs"
  ON public.cost_engineer_jobs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_cost_engineer_jobs_user_id ON public.cost_engineer_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_cost_engineer_jobs_status ON public.cost_engineer_jobs(status);
CREATE INDEX IF NOT EXISTS idx_cost_engineer_jobs_created_at ON public.cost_engineer_jobs(created_at DESC);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cost_engineer_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cost_engineer_jobs_timestamp
  BEFORE UPDATE ON public.cost_engineer_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_cost_engineer_jobs_updated_at();