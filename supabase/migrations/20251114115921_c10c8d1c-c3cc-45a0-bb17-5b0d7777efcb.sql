-- Create circuit_design_jobs table for background processing
CREATE TABLE IF NOT EXISTS public.circuit_design_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Input data
  job_inputs JSONB NOT NULL,
  
  -- Job status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'complete', 'failed', 'cancelled')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_step TEXT,
  
  -- Output data
  design_data JSONB,
  raw_response JSONB,
  
  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_circuit_design_jobs_user_id ON public.circuit_design_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_circuit_design_jobs_status ON public.circuit_design_jobs(status);
CREATE INDEX IF NOT EXISTS idx_circuit_design_jobs_created_at ON public.circuit_design_jobs(created_at DESC);

-- Enable RLS
ALTER TABLE public.circuit_design_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own circuit design jobs"
  ON public.circuit_design_jobs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own circuit design jobs"
  ON public.circuit_design_jobs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own circuit design jobs"
  ON public.circuit_design_jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own circuit design jobs"
  ON public.circuit_design_jobs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_circuit_design_jobs_updated_at
  BEFORE UPDATE ON public.circuit_design_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment
COMMENT ON TABLE public.circuit_design_jobs IS 'Background job queue for AI Circuit Designer processing';