-- Clear stale locks for practical_work items stuck in processing
-- This allows workers to reclaim items that were locked >10 minutes ago

UPDATE practical_work
SET 
  enrichment_status = NULL,
  enrichment_locked_at = NULL
WHERE 
  is_canonical = true
  AND enrichment_status = 'processing'
  AND enrichment_locked_at < NOW() - INTERVAL '10 minutes';

-- Add index to speed up lock checks
CREATE INDEX IF NOT EXISTS idx_practical_work_enrichment_locks 
ON practical_work(enrichment_status, enrichment_locked_at)
WHERE is_canonical = true;