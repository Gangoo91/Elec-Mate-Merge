-- Phase 3 & 4: Database Optimization for Health & Safety RAG

-- Phase 3.1: Add Full-Text Search Index to health_safety_knowledge
CREATE INDEX IF NOT EXISTS health_safety_fts_idx 
ON health_safety_knowledge 
USING gin(to_tsvector('english', content || ' ' || topic));

-- Phase 3.2: Add Composite Index for Scale/Source Filtering
CREATE INDEX IF NOT EXISTS health_safety_scale_idx 
ON health_safety_knowledge (source, metadata);

-- Phase 3.3: Create Materialized View for Common Hazards (fast cache for frequent queries)
CREATE MATERIALIZED VIEW IF NOT EXISTS hs_common_hazards AS
SELECT 
  id,
  topic,
  content,
  source,
  metadata,
  embedding
FROM health_safety_knowledge
WHERE 
  topic ILIKE ANY(ARRAY['%shock%', '%height%', '%isolation%', '%fire%', '%live%', '%voltage%', '%lockout%', '%permit%'])
  OR content ILIKE ANY(ARRAY['%electric shock%', '%working at height%', '%isolation%', '%fire%'])
WITH DATA;

-- Index for the materialized view
CREATE INDEX IF NOT EXISTS hs_common_hazards_topic_idx ON hs_common_hazards (topic);

-- Phase 4: Query Cache Table for 60-minute TTL
CREATE TABLE IF NOT EXISTS hs_query_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash text UNIQUE NOT NULL,
  query text NOT NULL,
  results jsonb NOT NULL,
  work_type text,
  hit_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT now() + interval '1 hour'
);

-- Indexes for cache lookups
CREATE INDEX IF NOT EXISTS hs_query_cache_hash_idx ON hs_query_cache (query_hash);
CREATE INDEX IF NOT EXISTS hs_query_cache_expires_idx ON hs_query_cache (expires_at);

-- Cleanup function for expired cache entries
CREATE OR REPLACE FUNCTION cleanup_hs_query_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM hs_query_cache 
  WHERE expires_at < now();
END;
$$;

-- Comment on materialized view
COMMENT ON MATERIALIZED VIEW hs_common_hazards IS 'Pre-cached common electrical safety hazards for fast retrieval. Refresh weekly or after knowledge base updates.';