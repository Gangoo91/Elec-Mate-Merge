-- Create commissioning_jobs table for asynchronous job processing
CREATE TABLE public.commissioning_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  progress INTEGER NOT NULL DEFAULT 0,
  current_step TEXT,
  job_inputs JSONB NOT NULL,
  result_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.commissioning_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own commissioning jobs"
ON public.commissioning_jobs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own commissioning jobs"
ON public.commissioning_jobs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own commissioning jobs"
ON public.commissioning_jobs
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own commissioning jobs"
ON public.commissioning_jobs
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_commissioning_jobs_user_id ON public.commissioning_jobs(user_id);
CREATE INDEX idx_commissioning_jobs_status ON public.commissioning_jobs(status);