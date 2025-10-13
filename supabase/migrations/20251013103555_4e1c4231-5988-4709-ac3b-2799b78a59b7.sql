-- Add cache_confidence column to rag_cache for confidence-based TTL
-- World-class RAG optimization: Phase 7

ALTER TABLE rag_cache
ADD COLUMN IF NOT EXISTS cache_confidence FLOAT DEFAULT 0.7;

-- Create index for cache cleanup queries
CREATE INDEX IF NOT EXISTS idx_rag_cache_confidence 
ON rag_cache(cache_confidence);

-- Comment for documentation
COMMENT ON COLUMN rag_cache.cache_confidence IS 'Average confidence score of RAG results (0-1). Used for dynamic cache TTL.';