-- Create hybrid search function for enriched BS 7671 regulations intelligence
-- Uses keyword matching with GIN index for fast, precise facet retrieval

CREATE OR REPLACE FUNCTION public.search_bs7671_intelligence_hybrid(
  query_text TEXT,
  match_count INT DEFAULT 15
)
RETURNS TABLE (
  id UUID,
  regulation_number TEXT,
  regulation_id UUID,
  primary_topic TEXT,
  keywords TEXT[],
  category TEXT,
  content TEXT,
  practical_application TEXT,
  keyword_match_score INT,
  hybrid_score FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  query_keywords TEXT[];
BEGIN
  -- Extract keywords from query (lowercase, split by spaces)
  query_keywords := regexp_split_to_array(lower(query_text), '\s+');
  
  -- Remove common stop words
  query_keywords := array_remove(query_keywords, 'the');
  query_keywords := array_remove(query_keywords, 'and');
  query_keywords := array_remove(query_keywords, 'or');
  query_keywords := array_remove(query_keywords, 'a');
  query_keywords := array_remove(query_keywords, 'an');
  query_keywords := array_remove(query_keywords, 'in');
  query_keywords := array_remove(query_keywords, 'for');
  
  RETURN QUERY
  WITH keyword_matches AS (
    SELECT 
      ri.id,
      ri.regulation_number,
      ri.regulation_id,
      ri.primary_topic,
      ri.keywords,
      ri.category,
      ri.content,
      ri.practical_application,
      -- Count matching keywords (case-insensitive)
      (
        SELECT COUNT(*)::INT
        FROM unnest(query_keywords) qk
        WHERE EXISTS (
          SELECT 1 FROM unnest(ri.keywords) rik 
          WHERE lower(rik) LIKE '%' || qk || '%'
        )
      ) AS keyword_match_score,
      -- Also check primary_topic and regulation_number for matches
      (
        SELECT COUNT(*)::INT
        FROM unnest(query_keywords) qk
        WHERE lower(ri.primary_topic) LIKE '%' || qk || '%'
           OR lower(ri.regulation_number) LIKE '%' || qk || '%'
      ) AS topic_match_score
    FROM regulations_intelligence ri
    WHERE 
      -- Use GIN index for fast keyword lookup
      ri.keywords && query_keywords
      OR EXISTS (
        SELECT 1 FROM unnest(query_keywords) qk
        WHERE lower(ri.primary_topic) LIKE '%' || qk || '%'
      )
  )
  SELECT 
    km.id,
    km.regulation_number,
    km.regulation_id,
    km.primary_topic,
    km.keywords,
    km.category,
    km.content,
    km.practical_application,
    km.keyword_match_score,
    -- Hybrid score: keyword matches (70%) + topic matches (30%)
    (km.keyword_match_score * 0.7 + km.topic_match_score * 0.3)::FLOAT AS hybrid_score
  FROM keyword_matches km
  WHERE km.keyword_match_score > 0 OR km.topic_match_score > 0
  ORDER BY 
    (km.keyword_match_score * 0.7 + km.topic_match_score * 0.3) DESC,
    km.regulation_number ASC
  LIMIT match_count;
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION public.search_bs7671_intelligence_hybrid IS 
'Searches enriched BS 7671 regulations intelligence using keyword matching. Returns facets with practical applications, keywords, and categories for precise circuit design guidance.';