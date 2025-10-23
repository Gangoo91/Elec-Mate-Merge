-- Fix search_maintenance_hybrid function type mismatch
-- Issue: hybrid_score calculated as numeric but expected as double precision

DROP FUNCTION IF EXISTS public.search_maintenance_hybrid(text, vector, integer);

CREATE OR REPLACE FUNCTION public.search_maintenance_hybrid(
  query_text text, 
  query_embedding vector, 
  match_count integer DEFAULT 10
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
AS $function$
BEGIN
  RETURN QUERY
  WITH 
  vector_results AS (
    SELECT 
      m.id, 
      ROW_NUMBER() OVER (ORDER BY m.embedding <=> query_embedding) AS rank
    FROM maintenance_knowledge m
    ORDER BY m.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT 
      m.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', m.content || ' ' || m.topic), 
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM maintenance_knowledge m
    WHERE to_tsvector('english', m.content || ' ' || m.topic) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', m.content || ' ' || m.topic), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      (COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0))::double precision AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    m.id,
    m.topic,
    m.content,
    m.source,
    m.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN maintenance_knowledge m ON m.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$function$;