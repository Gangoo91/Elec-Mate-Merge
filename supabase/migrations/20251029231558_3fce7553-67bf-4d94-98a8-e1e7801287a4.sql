-- Phase 3: Create intelligent H&S RAG search function
CREATE OR REPLACE FUNCTION search_health_safety_intelligence_hybrid(
  query_text TEXT,
  query_embedding vector(1536),
  min_confidence FLOAT DEFAULT 0.75,
  match_count INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  hazard_description TEXT,
  control_measures TEXT[],
  required_ppe JSONB,
  source_topic TEXT,
  confidence_score NUMERIC,
  hybrid_score FLOAT
)
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT 
      hsi.id, 
      ROW_NUMBER() OVER (ORDER BY hsi.embedding <=> query_embedding) AS rank
    FROM health_safety_intelligence hsi
    WHERE 
      hsi.embedding IS NOT NULL
      AND hsi.confidence_score >= min_confidence
    ORDER BY hsi.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT 
      hsi.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', hsi.hazard_description || ' ' || array_to_string(hsi.control_measures, ' ')), 
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM health_safety_intelligence hsi
    WHERE 
      hsi.confidence_score >= min_confidence
      AND to_tsvector('english', hsi.hazard_description || ' ' || array_to_string(hsi.control_measures, ' ')) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', hsi.hazard_description || ' ' || array_to_string(hsi.control_measures, ' ')), 
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
    hsi.id,
    hsi.hazard_description,
    hsi.control_measures,
    hsi.required_ppe,
    hsk.topic as source_topic,
    hsi.confidence_score,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN health_safety_intelligence hsi ON hsi.id = rrf.id
  LEFT JOIN health_safety_knowledge hsk ON hsk.id = hsi.source_id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION search_health_safety_intelligence_hybrid IS 
'Hybrid vector+keyword search on enriched H&S hazards. Returns structured hazard data with controls and PPE.';