-- Fix search_practical_work_intelligence_hybrid to use actual columns
-- The practical_work_intelligence table has installation_method and primary_topic, but no 'content' column

DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, integer, text);

CREATE OR REPLACE FUNCTION public.search_practical_work_intelligence_hybrid(
  query_text text,
  match_count integer DEFAULT 12,
  filter_trade text DEFAULT NULL
)
RETURNS TABLE(
  id uuid,
  primary_topic text,
  content text,
  tools_required text[],
  bs7671_regulations text[],
  hybrid_score double precision
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT 
      pwi.id, 
      ROW_NUMBER() OVER (ORDER BY pwi.embedding <=> (
        SELECT embedding FROM bs7671_embeddings LIMIT 1
      )) AS rank
    FROM practical_work_intelligence pwi
    WHERE filter_trade IS NULL OR pwi.trade = filter_trade
    ORDER BY pwi.embedding <=> (SELECT embedding FROM bs7671_embeddings LIMIT 1)
    LIMIT 100
  ),
  keyword_results AS (
    SELECT 
      pwi.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', COALESCE(pwi.installation_method, '') || ' ' || COALESCE(pwi.primary_topic, '')),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM practical_work_intelligence pwi
    WHERE (filter_trade IS NULL OR pwi.trade = filter_trade)
      AND to_tsvector('english', COALESCE(pwi.installation_method, '') || ' ' || COALESCE(pwi.primary_topic, '')) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', COALESCE(pwi.installation_method, '') || ' ' || COALESCE(pwi.primary_topic, '')),
      plainto_tsquery('english', query_text)
    ) DESC
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
    pwi.id,
    pwi.primary_topic,
    COALESCE(pwi.installation_method, pwi.primary_topic, '') AS content,
    pwi.tools_required,
    pwi.bs7671_regulations,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN practical_work_intelligence pwi ON pwi.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;