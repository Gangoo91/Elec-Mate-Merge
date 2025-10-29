-- ============================================
-- PHASE 1: Clear Ghost Locks (Immediate Fix)
-- ============================================

-- Reset batches stuck in 'processing' with NULL started_at (ghost locks)
UPDATE batch_progress 
SET 
  status = 'pending',
  started_at = NULL,
  error_message = 'Auto-recovered: Ghost lock cleared'
WHERE status = 'processing' 
  AND started_at IS NULL;

-- ============================================
-- PHASE 4: Database Performance Optimizations
-- ============================================

-- Index for faster "next pending batch" lookups (used in line 460-467 of scheduler)
CREATE INDEX IF NOT EXISTS idx_batch_progress_pending_lookup 
ON batch_progress (job_id, status, batch_number) 
WHERE status = 'pending';

-- Index for faster watchdog stuck batch detection
CREATE INDEX IF NOT EXISTS idx_batch_progress_stuck_detection 
ON batch_progress (status, started_at) 
WHERE status = 'processing';

-- Index for job status queries
CREATE INDEX IF NOT EXISTS idx_batch_jobs_status_lookup
ON batch_jobs (status, created_at DESC);