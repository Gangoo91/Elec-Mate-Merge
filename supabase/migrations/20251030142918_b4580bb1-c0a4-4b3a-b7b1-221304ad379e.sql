-- Phase 1: Clean duplicates from regulations_intelligence
WITH duplicates AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (
      PARTITION BY regulation_id, source_hash, enrichment_version 
      ORDER BY created_at DESC
    ) as rn
  FROM regulations_intelligence
)
DELETE FROM regulations_intelligence
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Phase 2: Add the unique constraint
CREATE UNIQUE INDEX regulations_intelligence_unique_enrichment 
ON regulations_intelligence(regulation_id, source_hash, enrichment_version);

-- Phase 3: Performance indexes
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_source_version 
ON regulations_intelligence(source_hash, enrichment_version);

CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_reg_version 
ON regulations_intelligence(regulation_id, enrichment_version);

-- Phase 4: Ensure batch_progress unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS batch_progress_unique_job_batch 
ON batch_progress(job_id, batch_number);

-- Phase 5: Reconciliation tracking table
CREATE TABLE IF NOT EXISTS enrichment_reconciliation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type TEXT NOT NULL,
  source_table TEXT NOT NULL,
  target_table TEXT NOT NULL,
  total_source_items INTEGER NOT NULL,
  total_enriched_items INTEGER NOT NULL,
  missing_items INTEGER NOT NULL,
  missing_ids JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  reconciled_at TIMESTAMPTZ
);

ALTER TABLE enrichment_reconciliation ENABLE ROW LEVEL SECURITY;

-- Public read for admins (using subscribed field instead of role)
CREATE POLICY "Admins can view reconciliation"
ON enrichment_reconciliation FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.subscribed = true
  )
);

CREATE POLICY "Admins can insert reconciliation"
ON enrichment_reconciliation FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.subscribed = true
  )
);