-- Cancel the old job with wrong batch size
UPDATE batch_jobs 
SET status = 'cancelled', 
    completed_at = NOW(),
    error_message = 'Cancelled to recreate with correct batch size (6)'
WHERE id = 'a9aae12f-d5f9-48d5-ae20-1f8cef0ea8fd';

-- Cancel all stuck batches from the old job
UPDATE batch_progress
SET status = 'cancelled',
    completed_at = NOW(),
    error_message = 'Batch cancelled - job recreated with batch size 6'
WHERE job_id = 'a9aae12f-d5f9-48d5-ae20-1f8cef0ea8fd'
  AND status IN ('processing', 'pending');