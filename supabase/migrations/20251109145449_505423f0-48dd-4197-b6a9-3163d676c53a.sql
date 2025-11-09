-- Drop and recreate search_practical_work_intelligence_hybrid with corrected return types
-- This fixes the jsonb[] to text[] mismatch error

DROP FUNCTION IF EXISTS search_practical_work_intelligence_hybrid(text, vector, integer, text);

CREATE OR REPLACE FUNCTION search_practical_work_intelligence_hybrid(
  query_text text,
  query_embedding vector(1536),
  match_count integer DEFAULT 10,
  filter_trade text DEFAULT NULL
)
RETURNS TABLE (
  practical_work_id uuid,
  content text,
  primary_topic text,
  equipment_category text,
  keywords text[],
  tools_required text[],
  bs7671_regulations text[],
  hybrid_score numeric,
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
    pwi.content,
    pwi.primary_topic,
    pwi.equipment_category,
    pwi.keywords,
    pwi.tools_required,
    pwi.bs7671_regulations,
    (
      (1 - (pwi.content_embedding <=> query_embedding)) * 5 + -- Semantic: 0-5 points
      ts_rank_cd(pwi.content_tsv, plainto_tsquery('english', query_text)) * 3 + -- FTS: 0-3 points
      CASE WHEN pwi.primary_topic ILIKE '%' || query_text || '%' THEN 2 ELSE 0 END -- Keyword boost: 0-2 points
    )::numeric as hybrid_score,
    pwi.confidence_score,
    pwi.applies_to,
    -- Cast jsonb[] to text[] explicitly
    (SELECT array_agg(elem::text) FROM unnest(pwi.test_procedures) elem)::text[] as test_procedures,
    (SELECT array_agg(elem::text) FROM unnest(pwi.maintenance_tasks) elem)::text[] as maintenance_tasks,
    (SELECT array_agg(elem::text) FROM unnest(pwi.materials_needed) elem)::text[] as materials_needed,
    pwi.location_types,
    pwi.power_ratings,
    pwi.cable_sizes,
    pwi.expected_results,
    pwi.maintenance_interval
  FROM practical_work_intelligence pwi
  WHERE
    -- Apply trade filter if specified
    (filter_trade IS NULL OR pwi.primary_topic ILIKE '%' || filter_trade || '%')
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;