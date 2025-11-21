-- Fix vector dimension mismatch in search_bs7671_hybrid function
-- The function must use vector(3072) to match the OpenAI text-embedding-3-small model

DROP FUNCTION IF EXISTS public.search_bs7671_hybrid(vector, integer);

CREATE OR REPLACE FUNCTION public.search_bs7671_hybrid(
  query_embedding vector(3072),
  match_count integer DEFAULT 15
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
STABLE
AS $function$
BEGIN
  RETURN QUERY
  WITH 
  vector_results AS (
    SELECT 
      b.id, 
      ROW_NUMBER() OVER (ORDER BY b.embedding <=> query_embedding) AS rank
    FROM bs7671_embeddings b
    WHERE b.embedding IS NOT NULL
    ORDER BY b.embedding <=> query_embedding
    LIMIT 25
  ),
  
  keyword_results AS (
    SELECT 
      b.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank(
        to_tsvector('english', b.content || ' ' || b.regulation_number),
        plainto_tsquery('english', '')
      ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE to_tsvector('english', b.content || ' ' || b.regulation_number) 
          @@ plainto_tsquery('english', '')
    ORDER BY ts_rank(
      to_tsvector('english', b.content || ' ' || b.regulation_number),
      plainto_tsquery('english', '')
    ) DESC
    LIMIT 25
  ),
  
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      (COALESCE(1.0 / (vr.rank + 60), 0.0) + 
       COALESCE(1.0 / (kr.rank + 60), 0.0))::double precision AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  
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
  LIMIT match_count;
END;
$function$;