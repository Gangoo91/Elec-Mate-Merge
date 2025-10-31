-- Phase 1: Abort stuck job and clean batches

-- Abort the stuck job
UPDATE batch_jobs 
SET status = 'failed',
    completed_at = now(),
    error_message = 'Silent failure - no logs after 4+ hours. Aborted for retry.',
    metadata = jsonb_set(
      COALESCE(metadata, '{}'::jsonb), 
      '{aborted_reason}', 
      '"Silent failure - no logs after 4+ hours"'
    )
WHERE id = '02a3a63f-20ea-4350-95f5-7783d3e9b9a3';

-- Mark all stuck batches as failed
UPDATE batch_progress 
SET status = 'failed',
    data = jsonb_set(
      COALESCE(data, '{}'::jsonb),
      '{error}',
      '"Batch timeout - no heartbeat after 4 hours. Cleared for retry."'
    )
WHERE job_id = '02a3a63f-20ea-4350-95f5-7783d3e9b9a3'
  AND status = 'processing';