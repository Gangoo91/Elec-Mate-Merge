-- CRITICAL FIX: Remove CASCADE from design_knowledge_intelligence to prevent data loss
-- This migration breaks the dangerous ON DELETE CASCADE that was automatically deleting
-- thousands of enriched facets when source records were removed

-- Step 1: Drop the existing foreign key constraint with CASCADE
ALTER TABLE design_knowledge_intelligence 
DROP CONSTRAINT IF EXISTS design_knowledge_intelligence_design_knowledge_id_fkey;

-- Step 2: Make design_knowledge_id nullable (allows orphaned facets to exist independently)
ALTER TABLE design_knowledge_intelligence 
ALTER COLUMN design_knowledge_id DROP NOT NULL;

-- Step 3: Recreate foreign key WITHOUT CASCADE (use SET NULL to preserve enriched data)
ALTER TABLE design_knowledge_intelligence 
ADD CONSTRAINT design_knowledge_intelligence_design_knowledge_id_fkey 
FOREIGN KEY (design_knowledge_id) 
REFERENCES design_knowledge(id) 
ON DELETE SET NULL;

-- Step 4: Add index for querying orphaned facets
CREATE INDEX IF NOT EXISTS idx_dki_orphaned 
ON design_knowledge_intelligence(design_knowledge_id) 
WHERE design_knowledge_id IS NULL;

-- Step 5: Add soft-delete support to design_knowledge table
ALTER TABLE design_knowledge 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true NOT NULL;

ALTER TABLE design_knowledge 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Step 6: Create index for active records (improves RAG query performance)
CREATE INDEX IF NOT EXISTS idx_design_knowledge_active 
ON design_knowledge(is_active) 
WHERE is_active = true;

-- Step 7: Add metadata tracking for data restoration
ALTER TABLE design_knowledge 
ADD COLUMN IF NOT EXISTS last_modified_by TEXT;

COMMENT ON COLUMN design_knowledge.is_active IS 'Soft-delete flag - false means logically deleted but data preserved';
COMMENT ON COLUMN design_knowledge.deleted_at IS 'Timestamp when record was soft-deleted';
COMMENT ON COLUMN design_knowledge_intelligence.design_knowledge_id IS 'Nullable FK - enriched facets survive even if source is deleted';