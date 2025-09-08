-- Create batch_jobs table for tracking batch processing
CREATE TABLE public.batch_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_batches INTEGER NOT NULL DEFAULT 0,
  completed_batches INTEGER NOT NULL DEFAULT 0,
  failed_batches INTEGER NOT NULL DEFAULT 0,
  current_batch INTEGER NOT NULL DEFAULT 0,
  progress_percentage INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create batch_progress table for real-time progress updates
CREATE TABLE public.batch_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL,
  batch_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  items_processed INTEGER NOT NULL DEFAULT 0,
  total_items INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.batch_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for batch_jobs
CREATE POLICY "Anyone can view batch jobs" 
ON public.batch_jobs 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage batch jobs" 
ON public.batch_jobs 
FOR ALL 
USING (auth.role() = 'service_role'::text);

-- Create policies for batch_progress
CREATE POLICY "Anyone can view batch progress" 
ON public.batch_progress 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage batch progress" 
ON public.batch_progress 
FOR ALL 
USING (auth.role() = 'service_role'::text);

-- Add triggers for updated_at
CREATE TRIGGER update_batch_jobs_updated_at
BEFORE UPDATE ON public.batch_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add foreign key constraint
ALTER TABLE public.batch_progress 
ADD CONSTRAINT batch_progress_job_id_fkey 
FOREIGN KEY (job_id) REFERENCES public.batch_jobs(id) ON DELETE CASCADE;