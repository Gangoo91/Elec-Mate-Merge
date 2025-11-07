-- Fix search_practical_work_intelligence_hybrid RPC function
-- Replace non-existent 'trade' column with 'facet_type'

CREATE OR REPLACE FUNCTION public.search_practical_work_intelligence_hybrid(
  query_text TEXT,
  query_embedding vector DEFAULT NULL,
  match_count INT DEFAULT 10,
  filter_trade TEXT DEFAULT NULL
)
RETURNS TABLE(
  id uuid,
  activity_types text[],
  equipment_category text,
  equipment_subcategory text,
  installation_method text,
  typical_duration_minutes integer,
  skill_level text,
  team_size integer,
  tools_required text[],
  materials_needed text[],
  test_procedures text[],
  maintenance_tasks text[],
  bs7671_regulations text[],
  facet_type text,
  primary_topic text,
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
      ROW_NUMBER() OVER (ORDER BY pw.embedding <=> query_embedding) AS rank
    FROM practical_work_intelligence pwi
    JOIN practical_work pw ON pw.id = pwi.practical_work_id
    WHERE (filter_trade IS NULL OR pwi.facet_type = filter_trade)
      AND query_embedding IS NOT NULL
    ORDER BY pw.embedding <=> query_embedding
    LIMIT 50
  ),
  keyword_results AS (
    SELECT 
      pwi.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', 
          COALESCE(pwi.primary_topic, '') || ' ' ||
          COALESCE(pwi.equipment_category, '') || ' ' ||
          COALESCE(pwi.equipment_subcategory, '') || ' ' ||
          COALESCE(array_to_string(pwi.activity_types, ' '), '')
        ),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM practical_work_intelligence pwi
    WHERE (filter_trade IS NULL OR pwi.facet_type = filter_trade)
      AND to_tsvector('english', 
        COALESCE(pwi.primary_topic, '') || ' ' ||
        COALESCE(pwi.equipment_category, '') || ' ' ||
        COALESCE(pwi.equipment_subcategory, '') || ' ' ||
        COALESCE(array_to_string(pwi.activity_types, ' '), '')
      ) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', 
        COALESCE(pwi.primary_topic, '') || ' ' ||
        COALESCE(pwi.equipment_category, '') || ' ' ||
        COALESCE(pwi.equipment_subcategory, '') || ' ' ||
        COALESCE(array_to_string(pwi.activity_types, ' '), '')
      ),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 50
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + 
      COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    pwi.id,
    pwi.activity_types,
    pwi.equipment_category,
    pwi.equipment_subcategory,
    pwi.installation_method,
    pwi.typical_duration_minutes,
    pwi.skill_level,
    pwi.team_size,
    pwi.tools_required,
    pwi.materials_needed,
    pwi.test_procedures,
    pwi.maintenance_tasks,
    pwi.bs7671_regulations,
    pwi.facet_type,
    pwi.primary_topic,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN practical_work_intelligence pwi ON pwi.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;