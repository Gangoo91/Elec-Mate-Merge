-- Quick cleanup: Remove stuck Practical Work Primary enrichment job
-- This is a one-time data cleanup operation to clear a stuck job

-- Mark the stuck job as failed
UPDATE batch_jobs 
SET 
  status = 'failed',
  completed_at = now(),
  error_message = 'Job manually cleared - stuck in processing state'
WHERE id = '96ae0016-6699-4d1d-b79a-cfe9bd587510';

-- Remove all associated batch progress entries
DELETE FROM batch_progress 
WHERE job_id = '96ae0016-6699-4d1d-b79a-cfe9bd587510';