-- Align RAG function signatures and remove duplicates
-- 1) Practical Work Intelligence Hybrid Search
-- Drop potential conflicting overloads first (safe if they don't exist)
DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, integer);
DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, integer, text);
DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, vector, integer);
DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, vector, integer, text);

-- Recreate with the intended signature used by the edge function
CREATE OR REPLACE FUNCTION public.search_practical_work_intelligence_hybrid(
  query_text text,
  query_embedding vector,
  match_count integer DEFAULT 10,
  filter_trade text DEFAULT NULL
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
  WITH vector_results AS (
    SELECT 
      p.id,
      ROW_NUMBER() OVER (ORDER BY p.embedding <=> query_embedding) AS rank
    FROM practical_work_intelligence p
    WHERE (filter_trade IS NULL OR p.metadata->>'trade' = filter_trade OR p.metadata->>'trade' = 'general')
    ORDER BY p.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT 
      p.id,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', COALESCE(p.topic,'') || ' ' || COALESCE(p.content,'')),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM practical_work_intelligence p
    WHERE (filter_trade IS NULL OR p.metadata->>'trade' = filter_trade OR p.metadata->>'trade' = 'general')
      AND to_tsvector('english', COALESCE(p.topic,'') || ' ' || COALESCE(p.content,'')) @@ plainto_tsquery('english', query_text)
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) AS id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    p.id,
    p.topic,
    p.content,
    p.source,
    p.metadata,
    rrf.score AS hybrid_score
  FROM rrf_scores rrf
  JOIN practical_work_intelligence p ON p.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$function$;


-- 2) Design Hybrid Search: ensure single correct signature and drop older variants
DROP FUNCTION IF EXISTS public.search_design_hybrid(text, integer);
DROP FUNCTION IF EXISTS public.search_design_hybrid(vector, integer);

CREATE OR REPLACE FUNCTION public.search_design_hybrid(
  query_text text,
  query_embedding vector,
  match_count integer DEFAULT 12
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
  WITH vector_results AS (
    SELECT d.id, ROW_NUMBER() OVER (ORDER BY d.embedding <=> query_embedding) AS rank
    FROM design_knowledge d
    ORDER BY d.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT d.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', d.topic || ' ' || d.content), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM design_knowledge d
    WHERE to_tsvector('english', d.topic || ' ' || d.content) @@ plainto_tsquery('english', query_text)
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    d.id,
    d.topic,
    d.content,
    d.source,
    d.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN design_knowledge d ON d.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$function$;