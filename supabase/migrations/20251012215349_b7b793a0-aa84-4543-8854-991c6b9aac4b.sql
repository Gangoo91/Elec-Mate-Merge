-- =====================================================
-- Phase 2: Hybrid Search (BM25 + Vector)
-- Phase 4: HNSW Index Optimization
-- Phase 5: Semantic Caching
-- =====================================================

-- Phase 2: Add tsvector for full-text search on installation_knowledge
ALTER TABLE installation_knowledge 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (
  to_tsvector('english', 
    coalesce(topic, '') || ' ' || coalesce(content, '')
  )
) STORED;

-- Create GIN index for full-text search performance
CREATE INDEX IF NOT EXISTS installation_search_vector_idx 
ON installation_knowledge USING GIN(search_vector);

-- Phase 2: Hybrid search function (Reciprocal Rank Fusion)
CREATE OR REPLACE FUNCTION search_installation_hybrid(
  query_text TEXT,
  query_embedding VECTOR,
  match_count INT DEFAULT 12
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  metadata JSONB,
  hybrid_score FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT ik.id, ROW_NUMBER() OVER (ORDER BY ik.embedding <=> query_embedding) AS rank
    FROM installation_knowledge ik
    ORDER BY ik.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT ik.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(ik.search_vector, plainto_tsquery('english', query_text)) DESC) AS rank
    FROM installation_knowledge ik
    WHERE ik.search_vector @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(ik.search_vector, plainto_tsquery('english', query_text)) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      -- Reciprocal Rank Fusion: 1/(rank+60) gives balanced weighting
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    ik.id,
    ik.topic,
    ik.content,
    ik.source,
    ik.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN installation_knowledge ik ON ik.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Phase 4: Ensure HNSW index exists for fast vector search
DO $$
BEGIN
  -- Drop old ivfflat index if exists
  DROP INDEX IF EXISTS installation_knowledge_embedding_idx;
  
  -- Create HNSW index for optimal vector search performance
  CREATE INDEX IF NOT EXISTS installation_knowledge_embedding_hnsw_idx 
  ON installation_knowledge 
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
  
  -- Set higher ef_search for better recall
  EXECUTE 'ALTER DATABASE postgres SET hnsw.ef_search = 100';
EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'HNSW index already exists or error: %', SQLERRM;
END $$;

-- Phase 5: Create semantic cache table for RAG results
CREATE TABLE IF NOT EXISTS rag_cache (
  query_hash TEXT PRIMARY KEY,
  query_text TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour',
  hit_count INT DEFAULT 0
);

-- Index for efficient cache expiration cleanup
CREATE INDEX IF NOT EXISTS rag_cache_expires_idx ON rag_cache(expires_at);

-- Index for agent-specific cache queries
CREATE INDEX IF NOT EXISTS rag_cache_agent_idx ON rag_cache(agent_name, expires_at);

-- Auto-cleanup function for expired cache entries
CREATE OR REPLACE FUNCTION cleanup_rag_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM rag_cache 
  WHERE expires_at < NOW();
END;
$$;

-- Grant public read/write access to rag_cache
GRANT SELECT, INSERT, UPDATE ON rag_cache TO anon;
GRANT SELECT, INSERT, UPDATE ON rag_cache TO authenticated;