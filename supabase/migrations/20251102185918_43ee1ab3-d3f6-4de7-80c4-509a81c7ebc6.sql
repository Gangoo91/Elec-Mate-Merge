-- Step 1: Add facet_hash column for deduplication
ALTER TABLE public.practical_work_intelligence 
ADD COLUMN IF NOT EXISTS facet_hash TEXT;

-- Step 2: Create index on (practical_work_id, created_at) for fast compliance checks
CREATE INDEX IF NOT EXISTS idx_pwi_work_created 
ON public.practical_work_intelligence (practical_work_id, created_at DESC);

-- Step 3: Create unique index on (practical_work_id, facet_hash) to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_pwi_work_hash_unique 
ON public.practical_work_intelligence (practical_work_id, facet_hash) 
WHERE facet_hash IS NOT NULL;

-- Step 4: Create view for 8-facet compliance monitoring (last 10 minutes)
CREATE OR REPLACE VIEW public.practical_work_facet_compliance AS
WITH recent_facets AS (
  SELECT 
    practical_work_id,
    COUNT(*) as facet_count,
    MAX(created_at) as last_created
  FROM public.practical_work_intelligence
  WHERE created_at > NOW() - INTERVAL '10 minutes'
  GROUP BY practical_work_id
),
all_time_facets AS (
  SELECT 
    practical_work_id,
    COUNT(*) as total_facets
  FROM public.practical_work_intelligence
  GROUP BY practical_work_id
)
SELECT 
  -- Last 10 minutes stats
  COUNT(DISTINCT rf.practical_work_id) as sources_enriched_10min,
  COUNT(*) FILTER (WHERE rf.facet_count = 8) as exactly_8_count_10min,
  ROUND(AVG(rf.facet_count)::numeric, 1) as avg_facets_per_source_10min,
  ROUND((COUNT(*) FILTER (WHERE rf.facet_count = 8)::numeric / NULLIF(COUNT(*), 0)) * 100, 1) as compliance_percentage_10min,
  
  -- All-time stats
  (SELECT COUNT(DISTINCT practical_work_id) FROM public.practical_work_intelligence) as total_sources_enriched,
  (SELECT COUNT(*) FROM all_time_facets WHERE total_facets = 8) as exactly_8_count_all_time,
  (SELECT ROUND(AVG(total_facets)::numeric, 1) FROM all_time_facets) as avg_facets_per_source_all_time,
  (SELECT COUNT(*) FROM public.practical_work_intelligence) as total_facets_created,
  
  -- Timestamp
  NOW() as snapshot_time
FROM recent_facets rf;

-- Step 5: Create function to prune historical data to top 8 per source
CREATE OR REPLACE FUNCTION public.prune_practical_work_facets_to_8()
RETURNS TABLE(
  sources_processed INT,
  facets_deleted INT,
  avg_facets_before NUMERIC,
  avg_facets_after NUMERIC
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_sources_processed INT := 0;
  v_facets_deleted INT := 0;
  v_avg_before NUMERIC;
  v_avg_after NUMERIC;
BEGIN
  -- Get before stats
  SELECT ROUND(AVG(facet_count), 1) INTO v_avg_before
  FROM (
    SELECT COUNT(*) as facet_count 
    FROM practical_work_intelligence 
    GROUP BY practical_work_id
  ) counts;
  
  -- Delete facets beyond top 8 per source based on quality score
  WITH ranked_facets AS (
    SELECT 
      id,
      practical_work_id,
      ROW_NUMBER() OVER (
        PARTITION BY practical_work_id 
        ORDER BY 
          -- Quality scoring: prefer facets with more complete data
          (CASE WHEN typical_duration_minutes IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN skill_level IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN safety_requirements IS NOT NULL THEN 1 ELSE 0 END) +
          (CASE WHEN bs7671_regulations IS NOT NULL AND jsonb_array_length(bs7671_regulations) > 0 THEN 2 ELSE 0 END) +
          (CASE WHEN test_procedures IS NOT NULL AND jsonb_array_length(test_procedures) > 2 THEN 2 ELSE 0 END) +
          (CASE WHEN tools_required IS NOT NULL AND jsonb_array_length(tools_required) > 3 THEN 1 ELSE 0 END) +
          (CASE WHEN materials_needed IS NOT NULL AND jsonb_array_length(materials_needed) > 2 THEN 1 ELSE 0 END)
          DESC,
          created_at DESC
      ) as rn
    FROM practical_work_intelligence
  ),
  deleted AS (
    DELETE FROM practical_work_intelligence
    WHERE id IN (
      SELECT id FROM ranked_facets WHERE rn > 8
    )
    RETURNING practical_work_id
  )
  SELECT 
    COUNT(DISTINCT practical_work_id),
    COUNT(*)
  INTO v_sources_processed, v_facets_deleted
  FROM deleted;
  
  -- Get after stats
  SELECT ROUND(AVG(facet_count), 1) INTO v_avg_after
  FROM (
    SELECT COUNT(*) as facet_count 
    FROM practical_work_intelligence 
    GROUP BY practical_work_id
  ) counts;
  
  RETURN QUERY SELECT 
    v_sources_processed,
    v_facets_deleted,
    v_avg_before,
    v_avg_after;
END;
$$;

COMMENT ON FUNCTION public.prune_practical_work_facets_to_8() IS 'Prunes practical_work_intelligence to keep only top 8 facets per source based on quality score';
COMMENT ON VIEW public.practical_work_facet_compliance IS 'Real-time 8-facet compliance monitoring for practical work enrichment';
COMMENT ON COLUMN public.practical_work_intelligence.facet_hash IS 'Deduplication hash computed from primary_topic + equipment_category + keywords + regulations';