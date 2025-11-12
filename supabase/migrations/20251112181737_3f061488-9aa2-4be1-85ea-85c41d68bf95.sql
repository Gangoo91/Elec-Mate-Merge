-- Fix search_regulations_intelligence_hybrid SQL syntax errors
DROP FUNCTION IF EXISTS search_regulations_intelligence_hybrid(TEXT, INT, TEXT[]);

CREATE OR REPLACE FUNCTION search_regulations_intelligence_hybrid(
  query_text TEXT,
  match_count INT DEFAULT 20,
  filter_categories TEXT[] DEFAULT NULL
)
RETURNS TABLE (
  regulation_id UUID,
  regulation_number TEXT,
  primary_topic TEXT,
  keywords TEXT[],
  category TEXT,
  subcategory TEXT,
  applies_to TEXT[],
  related_regulations TEXT[],
  confidence_score NUMERIC,
  hybrid_score NUMERIC
) AS $$
DECLARE
  search_terms TEXT[];
BEGIN
  search_terms := string_to_array(lower(query_text), ' ');
  
  RETURN QUERY
  SELECT 
    ri.regulation_id,
    ri.regulation_number,
    ri.primary_topic,
    ri.keywords,
    ri.category,
    ri.subcategory,
    ri.applies_to,
    ri.related_regulations,
    ri.confidence_score,
    (
      -- Keyword match (3.0 points per match)
      (SELECT COUNT(*) FROM unnest(ri.keywords) k WHERE lower(k) = ANY(search_terms)) * 3.0 +
      
      -- Primary topic match (2.5 points) - FIXED
      CASE WHEN EXISTS (
        SELECT 1 FROM unnest(search_terms) st 
        WHERE lower(ri.primary_topic) LIKE '%' || st || '%'
      ) THEN 2.5 ELSE 0 END +
      
      -- Category match (2.0 points)
      CASE WHEN lower(ri.category) = ANY(search_terms) THEN 2.0 ELSE 0 END +
      
      -- Subcategory match (1.5 points) - FIXED
      CASE WHEN EXISTS (
        SELECT 1 FROM unnest(search_terms) st 
        WHERE lower(ri.subcategory) LIKE '%' || st || '%'
      ) THEN 1.5 ELSE 0 END +
      
      -- Applies_to match (1.5 points per match)
      (SELECT COUNT(*) FROM unnest(ri.applies_to) a WHERE lower(a) = ANY(search_terms)) * 1.5 +
      
      -- Confidence boost (0-1.0 points)
      ri.confidence_score * 1.0
    ) AS hybrid_score
  FROM regulations_intelligence ri
  WHERE 
    ri.confidence_score >= 0.80
    AND (filter_categories IS NULL OR ri.category = ANY(filter_categories))
    -- At least one match - FIXED
    AND (
      EXISTS (SELECT 1 FROM unnest(ri.keywords) k WHERE lower(k) = ANY(search_terms))
      OR EXISTS (SELECT 1 FROM unnest(search_terms) st WHERE lower(ri.primary_topic) LIKE '%' || st || '%')
      OR lower(ri.category) = ANY(search_terms)
      OR EXISTS (SELECT 1 FROM unnest(ri.applies_to) a WHERE lower(a) = ANY(search_terms))
    )
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION search_regulations_intelligence_hybrid IS 
'Fixed LIKE syntax errors - uses EXISTS with unnest for array comparisons';