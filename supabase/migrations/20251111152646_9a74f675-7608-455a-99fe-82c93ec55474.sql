-- Fix practical work intelligence hybrid search function
-- Issue: Function referenced non-existent columns (embedding, content, source, topic)
-- Solution: Create synthetic content from existing columns, use keyword-only search

DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, vector, integer, text);

CREATE OR REPLACE FUNCTION public.search_practical_work_intelligence_hybrid(
  query_text text,
  query_embedding vector DEFAULT NULL,  -- Ignored but kept for API compatibility
  match_count integer DEFAULT 10,
  filter_trade text DEFAULT NULL
)
RETURNS TABLE(
  id uuid,
  topic text,
  content text,
  source text,
  hybrid_score double precision,
  primary_topic text,
  keywords text[],
  equipment_category text,
  tools_required text[],
  bs7671_regulations text[],
  practical_work_id uuid,
  confidence_score numeric,
  applies_to text[],
  location_types text[],
  power_ratings text[],
  cable_sizes text[],
  expected_results text,
  maintenance_interval text
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH synthetic_content AS (
    SELECT 
      p.id,
      p.primary_topic,
      p.equipment_category,
      p.keywords,
      p.tools_required,
      p.bs7671_regulations,
      p.practical_work_id,
      p.confidence_score,
      p.applies_to,
      p.location_types,
      p.power_ratings,
      p.cable_sizes,
      p.expected_results,
      p.maintenance_intervals,
      p.facet_type,
      -- Build searchable content from multiple fields
      CONCAT_WS(' ',
        COALESCE(p.primary_topic, ''),
        COALESCE(p.equipment_category, ''),
        COALESCE(p.equipment_subcategory, ''),
        COALESCE(p.installation_method, ''),
        COALESCE(array_to_string(p.keywords, ' '), ''),
        COALESCE(array_to_string(p.materials_needed, ' '), ''),
        COALESCE(array_to_string(p.tools_required, ' '), ''),
        COALESCE(array_to_string(p.bs7671_regulations, ' '), ''),
        COALESCE(p.expected_results, ''),
        COALESCE(array_to_string(p.applies_to, ' '), '')
      ) AS searchable_content
    FROM practical_work_intelligence p
    WHERE 
      (filter_trade IS NULL OR
        (filter_trade = 'installer' AND p.facet_type = 'installation') OR
        (filter_trade = 'maintenance' AND p.facet_type = 'maintenance') OR
        (filter_trade = 'commissioning' AND p.facet_type IN ('testing', 'commissioning'))
      )
  ),
  ranked_results AS (
    SELECT 
      sc.*,
      ts_rank_cd(
        to_tsvector('english', sc.searchable_content),
        plainto_tsquery('english', query_text)
      ) AS rank_score
    FROM synthetic_content sc
    WHERE to_tsvector('english', sc.searchable_content) 
          @@ plainto_tsquery('english', query_text)
    ORDER BY rank_score DESC
    LIMIT match_count
  )
  SELECT 
    rr.id,
    rr.primary_topic AS topic,
    rr.searchable_content AS content,
    'Practical Work Intelligence' AS source,
    (rr.rank_score * 10)::double precision AS hybrid_score,
    rr.primary_topic,
    rr.keywords,
    rr.equipment_category,
    rr.tools_required,
    rr.bs7671_regulations,
    rr.practical_work_id,
    rr.confidence_score,
    rr.applies_to,
    rr.location_types,
    rr.power_ratings,
    rr.cable_sizes,
    rr.expected_results,
    COALESCE(rr.maintenance_intervals->>'typical', 'Not specified') AS maintenance_interval
  FROM ranked_results rr
  ORDER BY rr.rank_score DESC;
END;
$$;

COMMENT ON FUNCTION public.search_practical_work_intelligence_hybrid IS 
'Keyword-only hybrid search for practical work intelligence. Constructs synthetic content from multiple fields and uses full-text search with ranking.';