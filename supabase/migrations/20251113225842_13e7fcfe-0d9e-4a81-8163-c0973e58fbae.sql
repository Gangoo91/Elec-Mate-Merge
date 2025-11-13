-- Add 'partial' status to rams_generation_jobs constraint
-- This allows the system to save partial results when one agent succeeds and one fails

ALTER TABLE public.rams_generation_jobs 
DROP CONSTRAINT IF EXISTS rams_generation_jobs_status_check;

ALTER TABLE public.rams_generation_jobs 
ADD CONSTRAINT rams_generation_jobs_status_check 
CHECK (status IN ('pending', 'processing', 'complete', 'failed', 'cancelled', 'partial'));