-- Create function to get facet distribution stats for practical_work_intelligence
CREATE OR REPLACE FUNCTION public.get_facet_distribution_stats()
RETURNS TABLE (
  total_facets BIGINT,
  total_sources BIGINT,
  avg_per_source NUMERIC,
  min_facets BIGINT,
  max_facets BIGINT,
  quality_score NUMERIC,
  under_8 BIGINT,
  exactly_8 BIGINT,
  range_9_20 BIGINT,
  range_21_50 BIGINT,
  range_51_100 BIGINT,
  range_101_200 BIGINT,
  over_200 BIGINT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  WITH facet_counts AS (
    SELECT 
      source_id,
      COUNT(*) as facet_count
    FROM practical_work_intelligence
    WHERE facet_type = 'primary'
    GROUP BY source_id
  ),
  stats AS (
    SELECT
      COUNT(*) as total_facets,
      COUNT(DISTINCT source_id) as total_sources,
      ROUND(AVG(facet_count), 2) as avg_per_source,
      MIN(facet_count) as min_facets,
      MAX(facet_count) as max_facets,
      ROUND((COUNT(*) FILTER (WHERE facet_count >= 8)::NUMERIC / NULLIF(COUNT(*), 0) * 100), 2) as quality_score,
      COUNT(*) FILTER (WHERE facet_count < 8) as under_8,
      COUNT(*) FILTER (WHERE facet_count = 8) as exactly_8,
      COUNT(*) FILTER (WHERE facet_count >= 9 AND facet_count <= 20) as range_9_20,
      COUNT(*) FILTER (WHERE facet_count >= 21 AND facet_count <= 50) as range_21_50,
      COUNT(*) FILTER (WHERE facet_count >= 51 AND facet_count <= 100) as range_51_100,
      COUNT(*) FILTER (WHERE facet_count >= 101 AND facet_count <= 200) as range_101_200,
      COUNT(*) FILTER (WHERE facet_count > 200) as over_200
    FROM facet_counts
  )
  SELECT 
    s.total_facets,
    s.total_sources,
    s.avg_per_source,
    s.min_facets,
    s.max_facets,
    s.quality_score,
    s.under_8,
    s.exactly_8,
    s.range_9_20,
    s.range_21_50,
    s.range_51_100,
    s.range_101_200,
    s.over_200
  FROM stats s;
END;
$$;