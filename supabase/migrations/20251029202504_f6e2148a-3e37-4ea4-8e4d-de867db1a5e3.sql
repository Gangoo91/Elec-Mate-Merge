-- Fix unique constraint to only apply to active jobs (not aborted/completed/failed)
-- This allows new jobs to be created even if old ones are aborted

-- Drop existing index
DROP INDEX IF EXISTS uniq_active_job_per_type;

-- Create improved partial unique index that only applies to pending/processing jobs
CREATE UNIQUE INDEX uniq_active_job_per_type 
ON batch_jobs (job_type) 
WHERE status IN ('pending', 'processing');

-- Add comment for documentation
COMMENT ON INDEX uniq_active_job_per_type IS 'Ensures only one active job per type, excludes aborted/completed/failed jobs';