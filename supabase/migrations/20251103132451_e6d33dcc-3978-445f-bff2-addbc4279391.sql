-- Phase 2.1: Create Unified RAG Search RPC
-- Reduces 4-6 separate queries to 1 weighted query

CREATE OR REPLACE FUNCTION unified_rag_search(
  query_text TEXT,
  query_embedding VECTOR(1536),
  agent_priorities JSONB DEFAULT '{"bs7671": 85, "design": 95, "installation": 75, "practical_work": 0}'::jsonb,
  match_count INT DEFAULT 30
)
RETURNS TABLE (
  source TEXT,
  regulation_number TEXT,
  content TEXT,
  metadata JSONB,
  hybrid_score NUMERIC
)
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  bs7671_priority INT := COALESCE((agent_priorities->>'bs7671')::INT, 0);
  design_priority INT := COALESCE((agent_priorities->>'design')::INT, 0);
  installation_priority INT := COALESCE((agent_priorities->>'installation')::INT, 0);
  practical_priority INT := COALESCE((agent_priorities->>'practical_work')::INT, 0);
BEGIN
  RETURN QUERY
  WITH 
  -- BS 7671 Search (if priority > 0)
  bs7671_results AS (
    SELECT 
      'bs7671'::TEXT AS source,
      b.regulation_number,
      b.content,
      jsonb_build_object('section', b.section, 'amendment', b.amendment) AS metadata,
      ((1 - (b.embedding <=> query_embedding)) * (bs7671_priority / 100.0))::NUMERIC AS score
    FROM bs7671_embeddings b
    WHERE bs7671_priority > 0
      AND (1 - (b.embedding <=> query_embedding)) > 0.6
    ORDER BY b.embedding <=> query_embedding
    LIMIT match_count
  ),
  
  -- Design Knowledge Search (if priority > 0)
  design_results AS (
    SELECT 
      'design_knowledge'::TEXT AS source,
      NULL::TEXT AS regulation_number,
      d.content,
      d.metadata,
      ((1 - (d.embedding <=> query_embedding)) * (design_priority / 100.0))::NUMERIC AS score
    FROM design_knowledge d
    WHERE design_priority > 0
      AND (1 - (d.embedding <=> query_embedding)) > 0.6
    ORDER BY d.embedding <=> query_embedding
    LIMIT match_count
  ),
  
  -- Installation Knowledge Search (if priority > 0)
  install_results AS (
    SELECT 
      'installation_knowledge'::TEXT AS source,
      NULL::TEXT AS regulation_number,
      i.content,
      i.metadata,
      ((1 - (i.embedding <=> query_embedding)) * (installation_priority / 100.0))::NUMERIC AS score
    FROM installation_knowledge i
    WHERE installation_priority > 0
      AND (1 - (i.embedding <=> query_embedding)) > 0.6
    ORDER BY i.embedding <=> query_embedding
    LIMIT match_count
  ),
  
  -- Practical Work Intelligence Search (if priority > 0)
  practical_results AS (
    SELECT 
      'practical_work_intelligence'::TEXT AS source,
      NULL::TEXT AS regulation_number,
      p.primary_topic AS content,
      jsonb_build_object(
        'equipment_category', p.equipment_category,
        'activity_type', p.activity_type,
        'keywords', p.keywords
      ) AS metadata,
      ((1 - (p.embedding <=> query_embedding)) * (practical_priority / 100.0))::NUMERIC AS score
    FROM practical_work_intelligence p
    WHERE practical_priority > 0
      AND (1 - (p.embedding <=> query_embedding)) > 0.6
    ORDER BY p.embedding <=> query_embedding
    LIMIT match_count
  ),
  
  -- Merge all results with weighted scores
  merged AS (
    SELECT * FROM bs7671_results
    UNION ALL
    SELECT * FROM design_results
    UNION ALL
    SELECT * FROM install_results
    UNION ALL
    SELECT * FROM practical_results
  )
  
  SELECT 
    m.source,
    m.regulation_number,
    m.content,
    m.metadata,
    m.score AS hybrid_score
  FROM merged m
  ORDER BY m.score DESC
  LIMIT match_count;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION unified_rag_search IS 'Unified RAG search across all knowledge bases with weighted scoring. Reduces 4-6 queries to 1 query.';
