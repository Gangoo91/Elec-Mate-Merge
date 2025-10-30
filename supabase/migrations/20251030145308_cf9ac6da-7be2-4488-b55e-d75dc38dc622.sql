-- Phase 1: Enable Multi-Facet Records
-- Add facet_hash column to support multiple intelligence records per regulation
ALTER TABLE regulations_intelligence 
ADD COLUMN IF NOT EXISTS facet_hash TEXT;

-- Drop old unique constraint that prevented multi-facet
DROP INDEX IF EXISTS regulations_intelligence_regulation_id_source_hash_enrich_idx;

-- Create new unique index allowing multiple facets per regulation
CREATE UNIQUE INDEX regulations_intelligence_unique_facet_idx 
ON regulations_intelligence(regulation_id, enrichment_version, facet_hash);

-- Keep source_hash for change detection
CREATE INDEX IF NOT EXISTS regulations_intelligence_source_hash_idx 
ON regulations_intelligence(source_hash);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS regulations_intelligence_reg_version_idx 
ON regulations_intelligence(regulation_id, enrichment_version);