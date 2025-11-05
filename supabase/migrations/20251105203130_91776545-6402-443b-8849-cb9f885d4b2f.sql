-- Fix BS 7671 search performance and timeout issues
-- This migration optimizes the search_bs7671_intelligence_hybrid function

-- Drop the existing function
DROP FUNCTION IF EXISTS search_bs7671_intelligence_hybrid(text, int);

-- Recreate with timeout and optimized query
-- This function searches regulations_intelligence for keyword matches
CREATE OR REPLACE FUNCTION search_bs7671_intelligence_hybrid(
  search_keywords text,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  regulation_id uuid,
  regulation_number text,
  primary_topic text,
  keywords text[],
  category text,
  relevance_score float
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Set statement timeout to 60 seconds for this function
  SET LOCAL statement_timeout = '60s';
  
  -- Optimized query using ILIKE on indexed columns
  RETURN QUERY
  SELECT 
    ri.regulation_id,
    ri.regulation_number,
    ri.primary_topic,
    ri.keywords,
    ri.category,
    CASE
      WHEN ri.regulation_number ILIKE '%' || search_keywords || '%' THEN 0.95
      WHEN ri.primary_topic ILIKE '%' || search_keywords || '%' THEN 0.85
      WHEN ri.category ILIKE '%' || search_keywords || '%' THEN 0.75
      WHEN EXISTS (
        SELECT 1 FROM unnest(ri.keywords) AS kw 
        WHERE kw ILIKE '%' || search_keywords || '%'
      ) THEN 0.70
      ELSE 0.5
    END AS relevance_score
  FROM regulations_intelligence ri
  WHERE 
    ri.regulation_number ILIKE '%' || search_keywords || '%'
    OR ri.primary_topic ILIKE '%' || search_keywords || '%'
    OR ri.category ILIKE '%' || search_keywords || '%'
    OR EXISTS (
      SELECT 1 FROM unnest(ri.keywords) AS kw 
      WHERE kw ILIKE '%' || search_keywords || '%'
    )
  ORDER BY relevance_score DESC
  LIMIT match_count;
END;
$$;

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_regulation_id 
ON regulations_intelligence(regulation_id);

CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_regulation_number 
ON regulations_intelligence(regulation_number);

-- Trigram indexes for faster ILIKE searches
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_primary_topic_trgm
ON regulations_intelligence USING gin (primary_topic gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_category_trgm
ON regulations_intelligence USING gin (category gin_trgm_ops);

-- GIN index for keyword array search
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_keywords_gin
ON regulations_intelligence USING gin (keywords);