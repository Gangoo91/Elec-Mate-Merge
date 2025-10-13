-- Cost Engineer RAG Optimization: Indexes + Query Cache

-- =====================================================
-- PHASE 1: ADD INDEXES TO pricing_embeddings
-- =====================================================

-- Full-text search index for item_name and content
CREATE INDEX IF NOT EXISTS pricing_fts_idx ON pricing_embeddings 
USING gin(to_tsvector('english', item_name || ' ' || COALESCE(content, '')));

-- Composite index for common filters
CREATE INDEX IF NOT EXISTS pricing_filter_idx ON pricing_embeddings 
(category, wholesaler, in_stock);

-- =====================================================
-- PHASE 2: CREATE QUERY CACHE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS cost_query_cache (
  query_hash TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  results JSONB NOT NULL,
  job_type TEXT,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '60 minutes'
);

-- Indexes for cache lookups
CREATE INDEX IF NOT EXISTS cost_query_cache_hash_idx ON cost_query_cache(query_hash);
CREATE INDEX IF NOT EXISTS cost_query_cache_expires_idx ON cost_query_cache(expires_at);

-- =====================================================
-- PHASE 3: CLEANUP FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION cleanup_cost_query_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM cost_query_cache 
  WHERE expires_at < NOW();
END;
$$;