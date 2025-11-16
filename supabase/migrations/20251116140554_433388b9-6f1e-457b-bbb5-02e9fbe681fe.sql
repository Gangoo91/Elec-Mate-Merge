-- Drop the legacy/conflicting version of search_design_hybrid
-- This fixes the "structure of query does not match function result type" error
DROP FUNCTION IF EXISTS public.search_design_hybrid(vector, double precision, integer);

-- The correct version with signature (text, vector, integer) should remain
-- Verify it exists and recreate if needed
CREATE OR REPLACE FUNCTION public.search_design_hybrid(
  query_text text,
  query_embedding vector,
  match_count integer DEFAULT 8
)
RETURNS TABLE(
  id uuid,
  topic text,
  content text,
  source text,
  metadata jsonb,
  hybrid_score double precision
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  normalized_query TEXT;
BEGIN
  -- Normalize query for better matching
  normalized_query := lower(trim(query_text));
  
  RETURN QUERY
  WITH 
  vector_results AS (
    SELECT 
      dk.id, 
      ROW_NUMBER() OVER (ORDER BY dk.embedding <=> query_embedding) AS rank
    FROM design_knowledge dk
    WHERE dk.embedding IS NOT NULL
    ORDER BY dk.embedding <=> query_embedding
    LIMIT 25
  ),
  
  keyword_results AS (
    SELECT 
      dk.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', dk.content || ' ' || dk.topic),
        plainto_tsquery('english', normalized_query)
      ) DESC) AS rank
    FROM design_knowledge dk
    WHERE to_tsvector('english', dk.content || ' ' || dk.topic) 
          @@ plainto_tsquery('english', normalized_query)
    ORDER BY ts_rank_cd(
      to_tsvector('english', dk.content || ' ' || dk.topic),
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
  )
  
  SELECT 
    dk.id,
    dk.topic,
    dk.content,
    dk.source,
    dk.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN design_knowledge dk ON dk.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;