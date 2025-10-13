-- Phase 2 & 3: Database-Level Caching + Reduce Over-Fetching (Simplified)
-- This migration optimizes the RAG search with caching and better indexing

-- ============= PHASE 2: DATABASE CACHING =============

-- Create cached version of search_bs7671_hybrid that checks cache first
CREATE OR REPLACE FUNCTION public.search_bs7671_hybrid_cached(
  query_text TEXT,
  query_embedding vector(3072),
  match_count INT DEFAULT 15
)
RETURNS TABLE(
  id uuid,
  regulation_number text,
  section text,
  content text,
  amendment text,
  metadata jsonb,
  hybrid_score double precision
) 
LANGUAGE plpgsql
AS $$
DECLARE
  cache_key TEXT;
  cache_result JSONB;
  agent_name TEXT := 'designer';
BEGIN
  -- Generate cache key from query text
  cache_key := md5(query_text || match_count::TEXT);
  
  -- Check cache (TTL: 1 hour)
  SELECT results INTO cache_result 
  FROM rag_cache 
  WHERE query_hash = cache_key 
    AND expires_at > NOW()
    AND rag_cache.agent_name = search_bs7671_hybrid_cached.agent_name
  LIMIT 1;
  
  -- Return cached results if found
  IF cache_result IS NOT NULL THEN
    -- Increment cache hit counter
    UPDATE rag_cache 
    SET cache_hits = cache_hits + 1 
    WHERE query_hash = cache_key;
    
    RAISE NOTICE '✅ Cache hit for query: %', substring(query_text, 1, 50);
    
    RETURN QUERY 
    SELECT 
      (r->>'id')::uuid,
      r->>'regulation_number',
      r->>'section',
      r->>'content',
      r->>'amendment',
      (r->>'metadata')::jsonb,
      (r->>'hybrid_score')::double precision
    FROM jsonb_array_elements(cache_result) AS r;
    
    RETURN;
  END IF;
  
  RAISE NOTICE '❌ Cache miss, running full hybrid search';
  
  -- Cache miss: Run full hybrid search (PHASE 3: OPTIMIZED LIMITS)
  RETURN QUERY
  WITH 
  -- Vector search (OPTIMIZED: 100 → 25 rows)
  vector_results AS (
    SELECT 
      b.id, 
      ROW_NUMBER() OVER (ORDER BY b.embedding <=> query_embedding) AS rank
    FROM bs7671_embeddings b
    ORDER BY b.embedding <=> query_embedding
    LIMIT 25  -- Was: 100 (75% reduction)
  ),
  
  -- Keyword search (OPTIMIZED: 100 → 25 rows)
  keyword_results AS (
    SELECT 
      b.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', b.content || ' ' || b.regulation_number),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE to_tsvector('english', b.content || ' ' || b.regulation_number) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', b.content || ' ' || b.regulation_number),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 25  -- Was: 100 (75% reduction)
  ),
  
  -- Reciprocal Rank Fusion (RRF)
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + 
      COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  ),
  
  -- Final results with full content
  final_results AS (
    SELECT 
      b.id,
      b.regulation_number,
      b.section,
      b.content,
      b.amendment,
      b.metadata,
      rrf.score as hybrid_score
    FROM rrf_scores rrf
    JOIN bs7671_embeddings b ON b.id = rrf.id
    ORDER BY rrf.score DESC
    LIMIT match_count
  )
  
  -- Store in cache asynchronously (fire-and-forget)
  SELECT 
    f.id, f.regulation_number, f.section, f.content, 
    f.amendment, f.metadata, f.hybrid_score
  FROM final_results f;
  
  -- Cache the results for future queries
  INSERT INTO rag_cache (query_hash, query_text, agent_name, results, expires_at)
  SELECT 
    cache_key,
    query_text,
    agent_name,
    jsonb_agg(row_to_json(f)) FILTER (WHERE f.id IS NOT NULL),
    NOW() + INTERVAL '1 hour'
  FROM final_results f
  ON CONFLICT (query_hash) DO UPDATE 
  SET 
    cache_hits = rag_cache.cache_hits + 1,
    expires_at = NOW() + INTERVAL '1 hour',
    results = EXCLUDED.results;
    
END;
$$;

-- ============= PHASE 3: PERFORMANCE INDEXES =============

-- Add cache lookup index
CREATE INDEX IF NOT EXISTS idx_rag_cache_lookup 
ON rag_cache(query_hash, agent_name, expires_at);

-- Add vector search index for faster similarity search (HNSW for speed)
CREATE INDEX IF NOT EXISTS idx_bs7671_embedding_hnsw
ON bs7671_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Add text search index for keyword queries
CREATE INDEX IF NOT EXISTS idx_bs7671_content_search 
ON bs7671_embeddings 
USING gin(to_tsvector('english', content || ' ' || regulation_number));

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.search_bs7671_hybrid_cached(text, vector, int) TO anon, authenticated, service_role;