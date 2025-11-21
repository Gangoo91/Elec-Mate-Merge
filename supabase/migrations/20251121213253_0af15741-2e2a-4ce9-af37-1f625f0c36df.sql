-- Clear orphaned design_knowledge_intelligence facets (those without source links)
-- This prepares for fresh enrichment of 1,089 design_knowledge sources
DELETE FROM design_knowledge_intelligence 
WHERE design_knowledge_id IS NULL;

-- Add comment for documentation
COMMENT ON TABLE design_knowledge_intelligence IS 'Enriched facets from design_knowledge sources. Protected by ON DELETE SET NULL - facets persist even if source is deleted.';