-- Fix type mismatch in search_project_mgmt_hybrid function
-- The hybrid_score calculation returns numeric but function expects double precision

CREATE OR REPLACE FUNCTION public.search_project_mgmt_hybrid(
  query_text TEXT,
  query_embedding vector(1536),
  match_count INT DEFAULT 10
)
RETURNS TABLE (
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
  WITH vector_results AS (
    SELECT p.id, ROW_NUMBER() OVER (ORDER BY p.embedding <=> query_embedding) AS rank
    FROM project_mgmt_knowledge p
    ORDER BY p.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT p.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', p.topic || ' ' || p.content), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM project_mgmt_knowledge p
    WHERE to_tsvector('english', p.topic || ' ' || p.content) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', p.topic || ' ' || p.content), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      -- Cast to double precision to match return type
      (COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0))::DOUBLE PRECISION AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    p.id,
    p.topic,
    p.content,
    p.source,
    p.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN project_mgmt_knowledge p ON p.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

-- Also fix the same issue in search_health_safety_hybrid
CREATE OR REPLACE FUNCTION public.search_health_safety_hybrid(
  query_text text,
  query_embedding vector,
  scale_filter text DEFAULT NULL::text,
  match_count integer DEFAULT 12
)
RETURNS TABLE(
  id uuid,
  topic text,
  content text,
  source text,
  scale text,
  metadata jsonb,
  hybrid_score double precision
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT h.id, ROW_NUMBER() OVER (ORDER BY h.embedding <=> query_embedding) AS rank
    FROM health_safety_knowledge h
    WHERE scale_filter IS NULL OR h.metadata->>'scale' = scale_filter
    ORDER BY h.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT h.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', h.content || ' ' || h.topic), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM health_safety_knowledge h
    WHERE (scale_filter IS NULL OR h.metadata->>'scale' = scale_filter)
      AND to_tsvector('english', h.content || ' ' || h.topic) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', h.content || ' ' || h.topic), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      -- Cast to double precision to match return type
      (COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0))::DOUBLE PRECISION AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    h.id,
    h.topic,
    h.content,
    h.source,
    h.metadata->>'scale' as scale,
    h.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN health_safety_knowledge h ON h.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;