-- Phase 1: Add embedding column to health_safety_intelligence
ALTER TABLE health_safety_intelligence
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create HNSW index for fast vector search
CREATE INDEX IF NOT EXISTS health_safety_intelligence_embedding_idx 
ON health_safety_intelligence 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

COMMENT ON COLUMN health_safety_intelligence.embedding IS 'Vector embedding of hazard_description for semantic search';