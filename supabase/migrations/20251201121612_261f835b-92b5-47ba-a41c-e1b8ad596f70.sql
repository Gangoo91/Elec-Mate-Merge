-- Create maintenance_method_jobs table (mirrors installation_method_jobs)
CREATE TABLE IF NOT EXISTS public.maintenance_method_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  query TEXT NOT NULL,
  equipment_details JSONB,
  detail_level TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  current_step TEXT,
  method_data JSONB,
  quality_metrics JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.maintenance_method_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own maintenance method jobs"
ON public.maintenance_method_jobs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own maintenance method jobs"
ON public.maintenance_method_jobs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own maintenance method jobs"
ON public.maintenance_method_jobs
FOR UPDATE
USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_maintenance_method_jobs_user ON public.maintenance_method_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_method_jobs_status ON public.maintenance_method_jobs(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_method_jobs_created ON public.maintenance_method_jobs(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_maintenance_method_jobs_updated_at
BEFORE UPDATE ON public.maintenance_method_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();