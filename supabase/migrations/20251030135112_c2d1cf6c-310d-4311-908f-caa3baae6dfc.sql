-- Stop current enrichment job and apply unique constraint
-- Step 1: Abort any running jobs
UPDATE batch_jobs 
SET status = 'aborted',
    completed_at = NOW()
WHERE job_type = 'enrich_regulations' 
  AND status IN ('processing', 'pending');

-- Step 2: Clear all batch_progress entries for safety
DELETE FROM batch_progress 
WHERE job_id IN (
  SELECT id FROM batch_jobs WHERE job_type = 'enrich_regulations'
);

-- Step 3: Create unique index to prevent duplicate batch claims (CRITICAL FIX)
CREATE UNIQUE INDEX IF NOT EXISTS batch_progress_unique_job_batch 
ON batch_progress (job_id, batch_number);

-- Step 4: Add index for faster worker queries
CREATE INDEX IF NOT EXISTS batch_progress_status_idx 
ON batch_progress (status, started_at);

-- Step 5: Reset job for fresh start
UPDATE batch_jobs 
SET status = 'pending',
    started_at = NULL,
    completed_at = NULL
WHERE job_type = 'enrich_regulations' 
  AND status = 'aborted';