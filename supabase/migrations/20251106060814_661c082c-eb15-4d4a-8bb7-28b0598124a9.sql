-- Create health_safety_jobs table for async job processing
CREATE TABLE IF NOT EXISTS public.health_safety_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  work_type TEXT CHECK (work_type IN ('domestic', 'commercial', 'industrial')),
  project_info JSONB DEFAULT '{}'::jsonb,
  status TEXT CHECK (status IN ('pending', 'processing', 'complete', 'failed', 'cancelled')) DEFAULT 'pending',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_step TEXT,
  output_data JSONB,
  raw_response JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.health_safety_jobs ENABLE ROW LEVEL SECURITY;

-- Users can view their own jobs
CREATE POLICY "Users can view their own health safety jobs"
  ON public.health_safety_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own jobs
CREATE POLICY "Users can create their own health safety jobs"
  ON public.health_safety_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own jobs
CREATE POLICY "Users can update their own health safety jobs"
  ON public.health_safety_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_health_safety_jobs_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_health_safety_jobs_updated_at
  BEFORE UPDATE ON public.health_safety_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_health_safety_jobs_timestamp();

-- Index for faster polling
CREATE INDEX IF NOT EXISTS idx_health_safety_jobs_user_status 
  ON public.health_safety_jobs(user_id, status, created_at DESC);