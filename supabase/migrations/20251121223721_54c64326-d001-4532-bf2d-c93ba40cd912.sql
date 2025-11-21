-- =====================================================
-- PROTECTION PLAN: design_knowledge_intelligence
-- Multi-layer security to prevent data loss
-- =====================================================

-- Layer 1: RLS Policies
-- =====================================================

-- 1. Block ALL deletes (even service role)
DROP POLICY IF EXISTS "No deletes allowed on intelligence" ON design_knowledge_intelligence;
CREATE POLICY "No deletes allowed on intelligence"
ON design_knowledge_intelligence
FOR DELETE
USING (false);

-- 2. Only service role can insert (for enrichment jobs)
DROP POLICY IF EXISTS "Service role can insert intelligence" ON design_knowledge_intelligence;
CREATE POLICY "Service role can insert intelligence"
ON design_knowledge_intelligence
FOR INSERT
TO service_role
WITH CHECK (true);

-- 3. Only service role can update (for corrections)
DROP POLICY IF EXISTS "Service role can update intelligence" ON design_knowledge_intelligence;
CREATE POLICY "Service role can update intelligence"
ON design_knowledge_intelligence
FOR UPDATE
TO service_role
USING (true);

-- Layer 2: Database Trigger (Prevent bulk operations)
-- =====================================================

-- Function to block bulk deletes
CREATE OR REPLACE FUNCTION prevent_intelligence_bulk_delete()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION '⛔ BLOCKED: Bulk deletes are not allowed on design_knowledge_intelligence. Use the guard-design-knowledge-intelligence edge function for controlled operations.';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to block statement-level deletes
DROP TRIGGER IF EXISTS block_bulk_intelligence_delete ON design_knowledge_intelligence;
CREATE TRIGGER block_bulk_intelligence_delete
BEFORE DELETE ON design_knowledge_intelligence
FOR EACH STATEMENT
EXECUTE FUNCTION prevent_intelligence_bulk_delete();

-- Layer 3: Audit logging for modifications
-- =====================================================

-- Function to log intelligence modifications
CREATE OR REPLACE FUNCTION log_intelligence_modifications()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO security_audit_log (
    user_id,
    action,
    table_name,
    record_id,
    metadata
  ) VALUES (
    auth.uid(),
    TG_OP,
    'design_knowledge_intelligence',
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'facet_type', COALESCE(NEW.facet_type, OLD.facet_type),
      'design_category', COALESCE(NEW.design_category, OLD.design_category),
      'timestamp', now()
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to log all modifications
DROP TRIGGER IF EXISTS log_intelligence_changes ON design_knowledge_intelligence;
CREATE TRIGGER log_intelligence_changes
AFTER INSERT OR UPDATE ON design_knowledge_intelligence
FOR EACH ROW
EXECUTE FUNCTION log_intelligence_modifications();

-- Layer 4: Soft delete support (mark as inactive instead of delete)
-- =====================================================

-- Add is_archived column if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'design_knowledge_intelligence' 
    AND column_name = 'is_archived'
  ) THEN
    ALTER TABLE design_knowledge_intelligence 
    ADD COLUMN is_archived BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'design_knowledge_intelligence' 
    AND column_name = 'archived_at'
  ) THEN
    ALTER TABLE design_knowledge_intelligence 
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'design_knowledge_intelligence' 
    AND column_name = 'archived_by'
  ) THEN
    ALTER TABLE design_knowledge_intelligence 
    ADD COLUMN archived_by TEXT;
  END IF;
END $$;

-- Index for archived items
CREATE INDEX IF NOT EXISTS idx_intelligence_archived 
ON design_knowledge_intelligence(is_archived, archived_at) 
WHERE is_archived = true;

COMMENT ON TABLE design_knowledge_intelligence IS 
'PROTECTED: This table contains enriched AI intelligence data. Deletes are blocked. Use guard-design-knowledge-intelligence function for controlled operations.';