-- Cancel all stalled pricing embedding jobs
UPDATE batch_progress 
SET status = 'cancelled', 
    error_message = 'Cancelled - switching to new batch processing system',
    completed_at = now()
WHERE status = 'processing';

-- Add a comment for clarity
COMMENT ON TABLE batch_progress IS 'Tracks batch processing jobs for embeddings. Old single-item jobs cancelled in favor of new batch system.';