-- Fix #1: Clean up stuck jobs from system updates
-- Mark jobs that are stuck in processing state for >5 minutes with low progress as failed

UPDATE circuit_design_jobs
SET 
  status = 'failed',
  error_message = 'Job interrupted by system update - please retry',
  progress = 0,
  updated_at = NOW()
WHERE status = 'processing' 
  AND created_at < NOW() - INTERVAL '5 minutes'
  AND progress <= 20;