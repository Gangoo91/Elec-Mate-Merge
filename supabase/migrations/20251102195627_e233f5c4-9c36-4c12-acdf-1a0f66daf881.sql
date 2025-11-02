-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.get_facet_distribution_stats();

-- Create function to get facet distribution statistics
CREATE OR REPLACE FUNCTION public.get_facet_distribution_stats()
RETURNS TABLE (
  total_facets bigint,
  total_sources bigint,
  avg_facets_per_source numeric,
  min_facets bigint,
  max_facets bigint,
  quality_score numeric,
  under_8 bigint,
  exactly_8 bigint,
  range_9_20 bigint,
  range_21_50 bigint,
  range_51_100 bigint,
  range_101_200 bigint,
  over_200 bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH facet_counts AS (
    SELECT 
      source_id,
      COUNT(*) as facet_count
    FROM practical_work_intelligence
    GROUP BY source_id
  ),
  stats AS (
    SELECT 
      COUNT(*) as total_facets,
      COUNT(DISTINCT source_id) as total_sources,
      ROUND(AVG(facet_count), 2) as avg_facets,
      MIN(facet_count) as min_facets,
      MAX(facet_count) as max_facets,
      ROUND((COUNT(*) FILTER (WHERE facet_count >= 8)::numeric / COUNT(*)::numeric * 100), 2) as quality_score,
      COUNT(*) FILTER (WHERE facet_count < 8) as under_8,
      COUNT(*) FILTER (WHERE facet_count = 8) as exactly_8,
      COUNT(*) FILTER (WHERE facet_count BETWEEN 9 AND 20) as range_9_20,
      COUNT(*) FILTER (WHERE facet_count BETWEEN 21 AND 50) as range_21_50,
      COUNT(*) FILTER (WHERE facet_count BETWEEN 51 AND 100) as range_51_100,
      COUNT(*) FILTER (WHERE facet_count BETWEEN 101 AND 200) as range_101_200,
      COUNT(*) FILTER (WHERE facet_count > 200) as over_200
    FROM facet_counts
  )
  SELECT 
    total_facets::bigint,
    total_sources::bigint,
    avg_facets::numeric,
    min_facets::bigint,
    max_facets::bigint,
    quality_score::numeric,
    under_8::bigint,
    exactly_8::bigint,
    range_9_20::bigint,
    range_21_50::bigint,
    range_51_100::bigint,
    range_101_200::bigint,
    over_200::bigint
  FROM stats;
END;
$$;