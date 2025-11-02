-- Phase 1: Add source-level locking to prevent race conditions
ALTER TABLE public.practical_work 
ADD COLUMN IF NOT EXISTS enrichment_status TEXT CHECK (enrichment_status IN ('processing', 'completed')),
ADD COLUMN IF NOT EXISTS enrichment_locked_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_practical_work_enrichment_status ON public.practical_work(enrichment_status) WHERE enrichment_status IS NOT NULL;

-- Drop existing compliance view if it exists
DROP VIEW IF EXISTS public.practical_work_facet_compliance CASCADE;

-- Phase 3: Create Top 8 facets view (quality-ranked, no data deletion)
CREATE OR REPLACE VIEW public.practical_work_intelligence_top8 AS
WITH ranked_facets AS (
  SELECT 
    pwi.id,
    pwi.practical_work_id,
    pwi.activity_types,
    pwi.equipment_category,
    pwi.equipment_subcategory,
    pwi.bs7671_zones,
    pwi.installation_method,
    pwi.fixing_intervals,
    pwi.cable_routes,
    pwi.termination_methods,
    pwi.test_procedures,
    pwi.test_equipment_required,
    pwi.test_frequency,
    pwi.acceptance_criteria,
    pwi.inspection_checklist,
    pwi.visual_inspection_points,
    pwi.eicr_observation_codes,
    pwi.common_defects,
    pwi.maintenance_intervals,
    pwi.maintenance_tasks,
    pwi.wear_indicators,
    pwi.replacement_criteria,
    pwi.common_failures,
    pwi.troubleshooting_steps,
    pwi.diagnostic_tests,
    pwi.typical_duration_minutes,
    pwi.skill_level,
    pwi.team_size,
    pwi.tools_required,
    pwi.materials_needed,
    pwi.safety_requirements,
    pwi.bs7671_regulations,
    pwi.other_standards,
    pwi.keywords,
    pwi.related_topics,
    pwi.confidence_score,
    pwi.created_at,
    pwi.updated_at,
    pwi.cluster_id,
    pwi.canonical_id,
    pwi.source_tables,
    pwi.provenance,
    pwi.facet_type,
    pwi.primary_topic,
    pwi.applies_to,
    pwi.cable_sizes,
    pwi.power_ratings,
    pwi.location_types,
    pwi.common_mistakes,
    pwi.facet_hash,
    ROW_NUMBER() OVER (
      PARTITION BY pwi.practical_work_id 
      ORDER BY pwi.confidence_score DESC, pwi.created_at ASC
    ) AS rank
  FROM public.practical_work_intelligence pwi
  INNER JOIN public.practical_work pw ON pwi.practical_work_id = pw.id
  WHERE LENGTH(pw.content) >= 100 
    AND pw.content NOT ILIKE '%APPENDIX%'
)
SELECT 
  id, practical_work_id, activity_types, equipment_category, equipment_subcategory,
  bs7671_zones, installation_method, fixing_intervals, cable_routes, termination_methods,
  test_procedures, test_equipment_required, test_frequency, acceptance_criteria, inspection_checklist,
  visual_inspection_points, eicr_observation_codes, common_defects, maintenance_intervals, maintenance_tasks,
  wear_indicators, replacement_criteria, common_failures, troubleshooting_steps, diagnostic_tests,
  typical_duration_minutes, skill_level, team_size, tools_required, materials_needed, safety_requirements,
  bs7671_regulations, other_standards, keywords, related_topics, confidence_score, created_at, updated_at,
  cluster_id, canonical_id, source_tables, provenance, facet_type, primary_topic, applies_to, cable_sizes,
  power_ratings, location_types, common_mistakes, facet_hash
FROM ranked_facets
WHERE rank <= 8;

-- Phase 4: Archive table for excess facets (optional, user-approved)
CREATE TABLE IF NOT EXISTS public.practical_work_intelligence_archive (
  id UUID PRIMARY KEY,
  practical_work_id UUID REFERENCES public.practical_work(id),
  activity_types TEXT[],
  equipment_category TEXT,
  equipment_subcategory TEXT,
  facet_hash TEXT NOT NULL,
  confidence_score DECIMAL(5,2),
  archived_at TIMESTAMPTZ DEFAULT NOW(),
  original_created_at TIMESTAMPTZ,
  rank_at_archive INTEGER,
  full_data JSONB
);

CREATE INDEX IF NOT EXISTS idx_pwi_archive_source ON public.practical_work_intelligence_archive(practical_work_id);
CREATE INDEX IF NOT EXISTS idx_pwi_archive_date ON public.practical_work_intelligence_archive(archived_at);

-- Phase 4: Archive RPC - moves excess facets (ranked 9+) to archive
CREATE OR REPLACE FUNCTION public.prune_practical_work_to_8_archive()
RETURNS TABLE(
  total_facets_before BIGINT,
  total_facets_after BIGINT,
  facets_archived BIGINT,
  sources_affected BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  before_count BIGINT;
  after_count BIGINT;
  archived_count BIGINT;
  sources_count BIGINT;
BEGIN
  -- Count before
  SELECT COUNT(*) INTO before_count FROM practical_work_intelligence;
  
  -- Archive excess facets (rank 9+) from gold sources only
  WITH ranked_facets AS (
    SELECT 
      pwi.*,
      ROW_NUMBER() OVER (
        PARTITION BY pwi.practical_work_id 
        ORDER BY pwi.confidence_score DESC, pwi.created_at ASC
      ) AS rank
    FROM practical_work_intelligence pwi
    INNER JOIN practical_work pw ON pwi.practical_work_id = pw.id
    WHERE LENGTH(pw.content) >= 100 
      AND pw.content NOT ILIKE '%APPENDIX%'
  ),
  to_archive AS (
    SELECT * FROM ranked_facets WHERE rank > 8
  )
  INSERT INTO practical_work_intelligence_archive (
    id, practical_work_id, activity_types, equipment_category, 
    equipment_subcategory, facet_hash, confidence_score, 
    original_created_at, rank_at_archive, full_data
  )
  SELECT 
    id, practical_work_id, activity_types, equipment_category,
    equipment_subcategory, facet_hash, confidence_score,
    created_at, rank, row_to_json(to_archive.*)::jsonb
  FROM to_archive;
  
  GET DIAGNOSTICS archived_count = ROW_COUNT;
  
  -- Delete archived facets from main table
  WITH ranked_facets AS (
    SELECT 
      pwi.id,
      ROW_NUMBER() OVER (
        PARTITION BY pwi.practical_work_id 
        ORDER BY pwi.confidence_score DESC, pwi.created_at ASC
      ) AS rank
    FROM practical_work_intelligence pwi
    INNER JOIN practical_work pw ON pwi.practical_work_id = pw.id
    WHERE LENGTH(pw.content) >= 100 
      AND pw.content NOT ILIKE '%APPENDIX%'
  )
  DELETE FROM practical_work_intelligence
  WHERE id IN (SELECT id FROM ranked_facets WHERE rank > 8);
  
  -- Count after
  SELECT COUNT(*) INTO after_count FROM practical_work_intelligence;
  
  -- Count affected sources
  SELECT COUNT(DISTINCT practical_work_id) INTO sources_count 
  FROM practical_work_intelligence_archive;
  
  RETURN QUERY SELECT before_count, after_count, archived_count, sources_count;
END;
$$;

-- Recreate compliance monitoring view
CREATE OR REPLACE VIEW public.practical_work_facet_compliance AS
SELECT 
  COUNT(DISTINCT pw.id) FILTER (WHERE pwi.id IS NOT NULL) AS sources_enriched,
  COUNT(DISTINCT pw.id) FILTER (WHERE LENGTH(pw.content) >= 100 AND pw.content NOT ILIKE '%APPENDIX%') AS total_gold_sources,
  COUNT(pwi.id) AS total_facets,
  ROUND(AVG(facet_counts.facet_count), 1) AS avg_facets_per_source,
  ROUND(
    100.0 * COUNT(DISTINCT pw.id) FILTER (WHERE facet_counts.facet_count = 8) / 
    NULLIF(COUNT(DISTINCT pw.id) FILTER (WHERE pwi.id IS NOT NULL), 0),
    1
  ) AS compliance_percentage
FROM practical_work pw
LEFT JOIN practical_work_intelligence pwi ON pwi.practical_work_id = pw.id
LEFT JOIN (
  SELECT practical_work_id, COUNT(*) AS facet_count
  FROM practical_work_intelligence
  GROUP BY practical_work_id
) facet_counts ON facet_counts.practical_work_id = pw.id
WHERE LENGTH(pw.content) >= 100 
  AND pw.content NOT ILIKE '%APPENDIX%';