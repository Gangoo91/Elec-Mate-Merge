-- Phase 1: Emergency Recovery Functions

-- Create function to reset stuck batches
CREATE OR REPLACE FUNCTION reset_stuck_batches(timeout_minutes INT DEFAULT 10)
RETURNS TABLE(batch_id UUID, job_id UUID, batch_number INT, stuck_duration_minutes INT) AS $$
BEGIN
  RETURN QUERY
  UPDATE batch_progress
  SET 
    status = 'pending',
    started_at = NULL,
    error_message = 'Auto-recovered from stuck state by watchdog'
  FROM (
    SELECT 
      bp.id,
      bp.job_id,
      bp.batch_number,
      EXTRACT(EPOCH FROM (NOW() - bp.started_at))/60 AS duration_minutes
    FROM batch_progress bp
    WHERE 
      bp.status = 'processing'
      AND bp.started_at < (NOW() - (timeout_minutes || ' minutes')::INTERVAL)
  ) AS stuck
  WHERE batch_progress.id = stuck.id
  RETURNING 
    batch_progress.id AS batch_id,
    batch_progress.job_id,
    batch_progress.batch_number,
    stuck.duration_minutes::INT AS stuck_duration_minutes;
END;
$$ LANGUAGE plpgsql;

-- Create function to abort duplicate jobs (keep most recent per job_type)
CREATE OR REPLACE FUNCTION abort_duplicate_jobs()
RETURNS TABLE(aborted_job_id UUID, job_type_result TEXT, created_at_result TIMESTAMPTZ) AS $$
BEGIN
  RETURN QUERY
  WITH ranked_jobs AS (
    SELECT 
      batch_jobs.id,
      batch_jobs.job_type,
      batch_jobs.created_at,
      ROW_NUMBER() OVER (PARTITION BY batch_jobs.job_type ORDER BY batch_jobs.created_at DESC) AS rn
    FROM batch_jobs
    WHERE batch_jobs.status IN ('pending', 'processing')
  )
  UPDATE batch_jobs bj
  SET 
    status = 'aborted',
    completed_at = NOW(),
    error_message = 'Aborted as duplicate (older job of same type)'
  FROM ranked_jobs rj
  WHERE 
    bj.id = rj.id
    AND rj.rn > 1
  RETURNING 
    bj.id AS aborted_job_id,
    bj.job_type AS job_type_result,
    bj.created_at AS created_at_result;
END;
$$ LANGUAGE plpgsql;

-- Abort existing duplicates before creating index
SELECT * FROM abort_duplicate_jobs();

-- Phase 4: Performance Optimization - Partial unique index for active jobs
CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_job_per_type 
ON batch_jobs (job_type) 
WHERE status IN ('pending', 'processing');

-- Add indexes for faster query performance
CREATE INDEX IF NOT EXISTS idx_batch_progress_processing_timeout 
ON batch_progress (status, started_at) 
WHERE status = 'processing';

CREATE INDEX IF NOT EXISTS idx_batch_progress_job_metrics
ON batch_progress (job_id, status, created_at);

COMMENT ON FUNCTION reset_stuck_batches IS 'Automatically resets batches stuck in processing state for more than specified minutes (default 10)';
COMMENT ON FUNCTION abort_duplicate_jobs IS 'Aborts duplicate active jobs, keeping only the most recent job per job_type';
COMMENT ON INDEX uniq_active_job_per_type IS 'Ensures only one active (pending/processing) job exists per job_type';
