-- Add new columns to practical_work_intelligence for multi-facet enrichment
ALTER TABLE practical_work_intelligence
ADD COLUMN IF NOT EXISTS primary_topic TEXT,
ADD COLUMN IF NOT EXISTS applies_to TEXT[],
ADD COLUMN IF NOT EXISTS cable_sizes TEXT[],
ADD COLUMN IF NOT EXISTS power_ratings TEXT[],
ADD COLUMN IF NOT EXISTS location_types TEXT[];

-- Create GIN indexes for fast keyword-based searching
CREATE INDEX IF NOT EXISTS idx_pwi_keywords_gin ON practical_work_intelligence USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_pwi_applies_to_gin ON practical_work_intelligence USING gin(applies_to);
CREATE INDEX IF NOT EXISTS idx_pwi_cable_sizes_gin ON practical_work_intelligence USING gin(cable_sizes);
CREATE INDEX IF NOT EXISTS idx_pwi_location_types_gin ON practical_work_intelligence USING gin(location_types);
CREATE INDEX IF NOT EXISTS idx_pwi_equipment_category ON practical_work_intelligence(equipment_category);
CREATE INDEX IF NOT EXISTS idx_pwi_confidence_score ON practical_work_intelligence(confidence_score);

-- Create hybrid search function for practical work intelligence
CREATE OR REPLACE FUNCTION search_practical_work_intelligence_hybrid(
  query_text TEXT,
  match_count INT DEFAULT 15,
  filter_trade TEXT DEFAULT NULL
)
RETURNS TABLE (
  practical_work_id UUID,
  primary_topic TEXT,
  content TEXT,
  keywords TEXT[],
  applies_to TEXT[],
  cable_sizes TEXT[],
  power_ratings TEXT[],
  location_types TEXT[],
  equipment_category TEXT,
  tools_required TEXT[],
  bs7671_regulations TEXT[],
  confidence_score NUMERIC,
  hybrid_score NUMERIC
) AS $$
DECLARE
  search_terms TEXT[];
  term TEXT;
BEGIN
  -- Split query into individual terms
  search_terms := string_to_array(lower(query_text), ' ');
  
  RETURN QUERY
  SELECT 
    pwi.practical_work_id,
    pwi.primary_topic,
    pwi.content,
    pwi.keywords,
    pwi.applies_to,
    pwi.cable_sizes,
    pwi.power_ratings,
    pwi.location_types,
    pwi.equipment_category,
    pwi.tools_required,
    pwi.bs7671_regulations,
    pwi.confidence_score,
    (
      -- Keyword match scoring
      (SELECT COUNT(*) FROM unnest(pwi.keywords) k WHERE lower(k) = ANY(search_terms)) * 3.0 +
      
      -- Primary topic match
      CASE WHEN lower(pwi.primary_topic) LIKE '%' || ANY(search_terms) || '%' THEN 2.5 ELSE 0 END +
      
      -- Applies_to match
      (SELECT COUNT(*) FROM unnest(pwi.applies_to) a WHERE lower(a) = ANY(search_terms)) * 2.0 +
      
      -- Cable sizes match
      (SELECT COUNT(*) FROM unnest(pwi.cable_sizes) cs WHERE lower(cs) = ANY(search_terms)) * 1.5 +
      
      -- Equipment category match
      CASE WHEN lower(pwi.equipment_category) = ANY(search_terms) THEN 2.0 ELSE 0 END +
      
      -- Location types match
      (SELECT COUNT(*) FROM unnest(pwi.location_types) lt WHERE lower(lt) = ANY(search_terms)) * 1.5 +
      
      -- Confidence boost
      pwi.confidence_score * 1.0
    ) AS hybrid_score
  FROM practical_work_intelligence pwi
  WHERE 
    -- Only high-confidence records
    pwi.confidence_score >= 0.75
    
    -- Trade filter (if provided)
    AND (filter_trade IS NULL OR filter_trade = ANY(pwi.applies_to))
    
    -- At least one keyword match OR primary topic match
    AND (
      EXISTS (SELECT 1 FROM unnest(pwi.keywords) k WHERE lower(k) = ANY(search_terms))
      OR lower(pwi.primary_topic) LIKE '%' || ANY(search_terms) || '%'
      OR EXISTS (SELECT 1 FROM unnest(pwi.applies_to) a WHERE lower(a) = ANY(search_terms))
      OR EXISTS (SELECT 1 FROM unnest(pwi.cable_sizes) cs WHERE lower(cs) = ANY(search_terms))
      OR lower(pwi.equipment_category) = ANY(search_terms)
    )
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;