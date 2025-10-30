-- Remove unique constraint to allow multiple intelligence records per regulation
ALTER TABLE public.regulations_intelligence 
DROP CONSTRAINT IF EXISTS regulations_intelligence_regulation_id_enrichment_version_key;

-- Add index on regulation_id for query performance
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_regulation_id 
ON public.regulations_intelligence(regulation_id);

-- Add index on source_hash for duplicate detection
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_source_hash 
ON public.regulations_intelligence(source_hash, enrichment_version);

-- Add comment explaining the schema design
COMMENT ON TABLE public.regulations_intelligence IS 'Multi-faceted regulation intelligence: each record represents ONE distinct aspect/meaning/application of a source regulation. A single regulation can have 3-10+ intelligence records for different use cases.';