-- Add 'cancelled' as a valid status for RAMS generation jobs
ALTER TABLE rams_generation_jobs 
DROP CONSTRAINT IF EXISTS rams_generation_jobs_status_check;

ALTER TABLE rams_generation_jobs 
ADD CONSTRAINT rams_generation_jobs_status_check 
CHECK (status IN ('pending', 'processing', 'complete', 'failed', 'cancelled'));