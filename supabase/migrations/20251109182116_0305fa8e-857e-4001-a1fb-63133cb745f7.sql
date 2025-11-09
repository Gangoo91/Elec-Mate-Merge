-- Fix search_practical_work_intelligence_hybrid function
-- Drop and recreate to remove non-existent metadata column

DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, vector, integer, text);

CREATE OR REPLACE FUNCTION public.search_practical_work_intelligence_hybrid(
  query_text text,
  query_embedding vector DEFAULT NULL,
  match_count integer DEFAULT 10,
  filter_trade text DEFAULT NULL
)
RETURNS TABLE(
  id uuid,
  topic text,
  content text,
  source text,
  hybrid_score double precision
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  generated_embedding vector(1536);
BEGIN
  -- Generate embedding if not provided (fallback to keyword-only search)
  IF query_embedding IS NULL THEN
    generated_embedding := NULL;
  ELSE
    generated_embedding := query_embedding;
  END IF;

  RETURN QUERY
  WITH vector_results AS (
    SELECT 
      p.id,
      ROW_NUMBER() OVER (ORDER BY p.embedding <=> generated_embedding) AS rank
    FROM practical_work_intelligence p
    WHERE generated_embedding IS NOT NULL
    ORDER BY p.embedding <=> generated_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT 
      p.id,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', p.content || ' ' || COALESCE(p.topic, '')),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM practical_work_intelligence p
    WHERE to_tsvector('english', p.content || ' ' || COALESCE(p.topic, '')) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', p.content || ' ' || COALESCE(p.topic, '')),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) AS id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + 
      COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    p.id,
    p.topic,
    p.content,
    p.source,
    rrf.score AS hybrid_score
  FROM rrf_scores rrf
  JOIN practical_work_intelligence p ON p.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;