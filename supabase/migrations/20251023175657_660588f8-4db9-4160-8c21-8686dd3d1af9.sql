-- Fix PGRST203 function overload ambiguity for search_maintenance_hybrid
-- Explicitly drop both overloads with their full signatures

DROP FUNCTION IF EXISTS public.search_maintenance_hybrid(text, vector, integer);
DROP FUNCTION IF EXISTS public.search_maintenance_hybrid(text, vector, text, integer);

-- Create the single standardized 4-parameter version
CREATE OR REPLACE FUNCTION public.search_maintenance_hybrid(
  query_text TEXT,
  query_embedding vector,
  equipment_filter TEXT DEFAULT NULL,
  match_count INTEGER DEFAULT 10
)
RETURNS TABLE(
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  metadata JSONB,
  hybrid_score DOUBLE PRECISION
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH 
  vector_results AS (
    SELECT 
      m.id, 
      ROW_NUMBER() OVER (ORDER BY m.embedding <=> query_embedding) AS rank
    FROM maintenance_knowledge m
    WHERE equipment_filter IS NULL OR m.topic ILIKE '%' || equipment_filter || '%'
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
      AND (equipment_filter IS NULL OR m.topic ILIKE '%' || equipment_filter || '%')
    ORDER BY ts_rank_cd(
      to_tsvector('english', m.content || ' ' || m.topic), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) AS id,
      (COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0))::DOUBLE PRECISION AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    m.id,
    m.topic,
    m.content,
    m.source,
    m.metadata,
    rrf.score AS hybrid_score
  FROM rrf_scores rrf
  JOIN maintenance_knowledge m ON m.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;