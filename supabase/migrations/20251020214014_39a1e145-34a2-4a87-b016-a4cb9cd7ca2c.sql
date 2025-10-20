-- Extend RAG cache TTL from 1 hour to 7 days for better performance
-- Expected improvement: 90%+ faster for repeated queries, higher cache hit rates

CREATE OR REPLACE FUNCTION public.search_bs7671_hybrid_cached(query_text text, query_embedding vector, match_count integer DEFAULT 15)
 RETURNS TABLE(id uuid, regulation_number text, section text, content text, amendment text, metadata jsonb, hybrid_score double precision)
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  cache_key TEXT;
  normalized_query TEXT;
  cache_result JSONB;
  agent_name TEXT := 'designer';
BEGIN
  -- UPGRADED: Normalize query before hashing for better cache hits
  normalized_query := normalize_query_text(query_text);
  cache_key := md5(normalized_query || match_count::TEXT);
  
  -- Check cache (TTL: 7 days - EXTENDED from 1 hour)
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
    
    RAISE NOTICE '✅ Cache hit for normalized query: %', substring(normalized_query, 1, 50);
    
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
  
  RAISE NOTICE '❌ Cache miss for normalized query: %', substring(normalized_query, 1, 50);
  
  -- Cache miss: Run full hybrid search
  RETURN QUERY
  WITH 
  vector_results AS (
    SELECT 
      b.id, 
      ROW_NUMBER() OVER (ORDER BY b.embedding <=> query_embedding) AS rank
    FROM bs7671_embeddings b
    ORDER BY b.embedding <=> query_embedding
    LIMIT 25
  ),
  
  keyword_results AS (
    SELECT 
      b.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', b.content || ' ' || b.regulation_number),
        plainto_tsquery('english', normalized_query)
      ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE to_tsvector('english', b.content || ' ' || b.regulation_number) 
          @@ plainto_tsquery('english', normalized_query)
    ORDER BY ts_rank_cd(
      to_tsvector('english', b.content || ' ' || b.regulation_number),
      plainto_tsquery('english', normalized_query)
    ) DESC
    LIMIT 25
  ),
  
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + 
      COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  ),
  
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
  
  SELECT 
    f.id, f.regulation_number, f.section, f.content, 
    f.amendment, f.metadata, f.hybrid_score
  FROM final_results f;
  
  -- Cache the results with 7-day TTL (EXTENDED from 1 hour)
  INSERT INTO rag_cache (query_hash, query_text, agent_name, results, expires_at)
  SELECT 
    cache_key,
    normalized_query,
    agent_name,
    jsonb_agg(row_to_json(f)) FILTER (WHERE f.id IS NOT NULL),
    NOW() + INTERVAL '7 days'
  FROM final_results f
  ON CONFLICT (query_hash) DO UPDATE 
  SET 
    cache_hits = rag_cache.cache_hits + 1,
    expires_at = NOW() + INTERVAL '7 days',
    results = EXCLUDED.results;
    
END;
$function$;