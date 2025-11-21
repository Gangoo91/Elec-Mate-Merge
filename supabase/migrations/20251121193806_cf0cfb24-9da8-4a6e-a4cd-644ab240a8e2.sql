-- Create function to count sources with 6-8 facets (fully enriched)
CREATE OR REPLACE FUNCTION count_fully_enriched_design_sources(
  min_facets INT DEFAULT 6,
  max_facets INT DEFAULT 8
)
RETURNS INT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(DISTINCT design_knowledge_id)::INT
  FROM (
    SELECT design_knowledge_id, COUNT(*) as facet_count
    FROM design_knowledge_intelligence
    GROUP BY design_knowledge_id
    HAVING COUNT(*) BETWEEN min_facets AND max_facets
  ) enriched_sources;
$$;