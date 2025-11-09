-- Fix BS7671 Intelligence Hybrid Search
CREATE OR REPLACE FUNCTION search_bs7671_intelligence_hybrid(
  search_keywords text,
  match_count integer DEFAULT 10
)
RETURNS TABLE(
  regulation_id uuid,
  regulation_number text,
  primary_topic text,
  keywords text[],
  category text,
  relevance_score double precision
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ri.regulation_id,
    ri.regulation_number,
    ri.primary_topic,
    ri.keywords,
    ri.category,
    (CASE
      WHEN ri.regulation_number ILIKE '%' || search_keywords || '%' THEN 0.95
      WHEN ri.primary_topic ILIKE '%' || search_keywords || '%' THEN 0.85
      WHEN ri.category ILIKE '%' || search_keywords || '%' THEN 0.75
      WHEN EXISTS (
        SELECT 1 FROM unnest(ri.keywords) AS kw 
        WHERE kw ILIKE '%' || search_keywords || '%'
      ) THEN 0.70
      ELSE 0.5
    END)::double precision AS relevance_score
  FROM regulations_intelligence ri
  WHERE 
    ri.regulation_number ILIKE '%' || search_keywords || '%'
    OR ri.primary_topic ILIKE '%' || search_keywords || '%'
    OR ri.category ILIKE '%' || search_keywords || '%'
    OR EXISTS (
      SELECT 1 FROM unnest(ri.keywords) AS kw 
      WHERE kw ILIKE '%' || search_keywords || '%'
    )
  ORDER BY relevance_score DESC
  LIMIT match_count;
END;
$$;

-- Fix Practical Work Intelligence Hybrid Search
CREATE OR REPLACE FUNCTION search_practical_work_intelligence_hybrid(
  query_text text,
  match_count integer DEFAULT 10,
  filter_trade text DEFAULT NULL
)
RETURNS TABLE(
  practical_work_id uuid,
  content text,
  primary_topic text,
  equipment_category text,
  keywords text[],
  tools_required text[],
  bs7671_regulations text[],
  hybrid_score double precision,
  confidence_score numeric,
  applies_to text[],
  test_procedures text[],
  maintenance_tasks text[],
  materials_needed text[],
  location_types text[],
  power_ratings text[],
  cable_sizes text[],
  expected_results text,
  maintenance_interval text
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pwi.id as practical_work_id,
    pwi.primary_topic as content,
    pwi.primary_topic,
    pwi.equipment_category,
    pwi.keywords,
    pwi.tools_required,
    pwi.bs7671_regulations,
    (
      CASE WHEN pwi.primary_topic ILIKE '%' || query_text || '%' THEN 5.0 ELSE 0.0 END +
      CASE WHEN pwi.equipment_category ILIKE '%' || query_text || '%' THEN 3.0 ELSE 0.0 END +
      CASE WHEN EXISTS (
        SELECT 1 FROM unnest(pwi.keywords) kw WHERE kw ILIKE '%' || query_text || '%'
      ) THEN 2.0 ELSE 0.0 END +
      CASE WHEN EXISTS (
        SELECT 1 FROM unnest(pwi.activity_types) at WHERE at ILIKE '%' || query_text || '%'
      ) THEN 1.0 ELSE 0.0 END
    )::double precision as hybrid_score,
    pwi.confidence_score,
    pwi.applies_to,
    pwi.test_procedures,
    pwi.maintenance_tasks,
    pwi.materials_needed,
    pwi.location_types,
    pwi.power_ratings,
    pwi.cable_sizes,
    NULL::text as expected_results,
    NULL::text as maintenance_interval
  FROM practical_work_intelligence pwi
  WHERE
    (filter_trade IS NULL OR pwi.primary_topic ILIKE '%' || filter_trade || '%')
    AND (
      pwi.primary_topic ILIKE '%' || query_text || '%'
      OR pwi.equipment_category ILIKE '%' || query_text || '%'
      OR EXISTS (SELECT 1 FROM unnest(pwi.keywords) kw WHERE kw ILIKE '%' || query_text || '%')
      OR EXISTS (SELECT 1 FROM unnest(pwi.activity_types) at WHERE at ILIKE '%' || query_text || '%')
    )
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;

-- Fix Design Knowledge Hybrid Search (ensure double precision)
CREATE OR REPLACE FUNCTION search_design_hybrid(
  query_embedding vector(1536),
  match_threshold double precision DEFAULT 0.3,
  match_count integer DEFAULT 10
)
RETURNS TABLE(
  design_id uuid,
  content text,
  primary_topic text,
  keywords text[],
  category text,
  hybrid_score double precision
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dk.id as design_id,
    dk.content,
    dk.primary_topic,
    dk.keywords,
    dk.category,
    (1 - (dk.embedding <=> query_embedding))::double precision as hybrid_score
  FROM design_knowledge dk
  WHERE (1 - (dk.embedding <=> query_embedding)) > match_threshold
  ORDER BY dk.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;