-- Create hybrid keyword search for regulations_intelligence
-- This enables fast, keyword-based search of pre-enriched regulations intelligence
-- Similar to practical_work_intelligence hybrid search pattern

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
  -- Split query into lowercase terms
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
      -- Keyword match scoring (3.0 points per match)
      (SELECT COUNT(*) FROM unnest(ri.keywords) k WHERE lower(k) = ANY(search_terms)) * 3.0 +
      
      -- Primary topic match (2.5 points)
      CASE WHEN lower(ri.primary_topic) LIKE '%' || ANY(search_terms) || '%' THEN 2.5 ELSE 0 END +
      
      -- Category match (2.0 points)
      CASE WHEN lower(ri.category) = ANY(search_terms) THEN 2.0 ELSE 0 END +
      
      -- Subcategory match (1.5 points)
      CASE WHEN lower(ri.subcategory) LIKE '%' || ANY(search_terms) || '%' THEN 1.5 ELSE 0 END +
      
      -- Applies_to match (1.5 points per match)
      (SELECT COUNT(*) FROM unnest(ri.applies_to) a WHERE lower(a) = ANY(search_terms)) * 1.5 +
      
      -- Confidence boost (0-1.0 points)
      ri.confidence_score * 1.0
    ) AS hybrid_score
  FROM regulations_intelligence ri
  WHERE 
    -- High confidence only (>= 80%)
    ri.confidence_score >= 0.80
    
    -- Category filter (if provided)
    AND (filter_categories IS NULL OR ri.category = ANY(filter_categories))
    
    -- At least one keyword match
    AND (
      EXISTS (SELECT 1 FROM unnest(ri.keywords) k WHERE lower(k) = ANY(search_terms))
      OR lower(ri.primary_topic) LIKE '%' || ANY(search_terms) || '%'
      OR lower(ri.category) = ANY(search_terms)
      OR EXISTS (SELECT 1 FROM unnest(ri.applies_to) a WHERE lower(a) = ANY(search_terms))
    )
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Add GIN indexes for performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_ri_keywords_gin ON regulations_intelligence USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_ri_applies_to_gin ON regulations_intelligence USING gin(applies_to);
CREATE INDEX IF NOT EXISTS idx_ri_related_regs_gin ON regulations_intelligence USING gin(related_regulations);
CREATE INDEX IF NOT EXISTS idx_ri_confidence ON regulations_intelligence(confidence_score) WHERE confidence_score >= 0.80;