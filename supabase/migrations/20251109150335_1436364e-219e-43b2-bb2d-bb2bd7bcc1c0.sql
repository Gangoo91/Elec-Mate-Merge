-- Fix search_practical_work_intelligence_hybrid return types and column mapping
DROP FUNCTION IF EXISTS search_practical_work_intelligence_hybrid(text, integer, text);

CREATE OR REPLACE FUNCTION search_practical_work_intelligence_hybrid(
  query_text text,
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
      ts_rank_cd(pwi.content_tsv, plainto_tsquery('english', query_text)) * 5 + 
      CASE WHEN pwi.primary_topic ILIKE '%' || query_text || '%' THEN 3 ELSE 0 END +
      CASE WHEN pwi.equipment_category ILIKE '%' || query_text || '%' THEN 2 ELSE 0 END
    )::double precision as hybrid_score,
    pwi.confidence_score,
    pwi.applies_to,
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
    (filter_trade IS NULL OR pwi.primary_topic ILIKE '%' || filter_trade || '%')
    AND (
      pwi.content_tsv @@ plainto_tsquery('english', query_text)
      OR pwi.primary_topic ILIKE '%' || query_text || '%'
      OR pwi.equipment_category ILIKE '%' || query_text || '%'
    )
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;