-- Drop the incorrect function
DROP FUNCTION IF EXISTS public.search_bs7671_intelligence_hybrid(TEXT, INT);

-- Create corrected hybrid search function that joins with bs7671_embeddings for content
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
  subcategory TEXT,
  applies_to TEXT[],
  content TEXT,
  section TEXT,
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
      ri.subcategory,
      ri.applies_to,
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
           OR lower(ri.category) LIKE '%' || qk || '%'
      ) AS topic_match_score
    FROM regulations_intelligence ri
    WHERE 
      -- Use GIN index for fast keyword lookup (if exists)
      ri.keywords && query_keywords
      OR EXISTS (
        SELECT 1 FROM unnest(query_keywords) qk
        WHERE lower(ri.primary_topic) LIKE '%' || qk || '%'
           OR lower(ri.category) LIKE '%' || qk || '%'
      )
  )
  SELECT 
    km.id,
    km.regulation_number,
    km.regulation_id,
    km.primary_topic,
    km.keywords,
    km.category,
    km.subcategory,
    km.applies_to,
    COALESCE(reg.content, '') AS content,
    COALESCE(reg.section, '') AS section,
    km.keyword_match_score,
    -- Hybrid score: keyword matches (70%) + topic matches (30%)
    (km.keyword_match_score * 0.7 + km.topic_match_score * 0.3)::FLOAT AS hybrid_score
  FROM keyword_matches km
  LEFT JOIN bs7671_embeddings reg ON reg.id = km.regulation_id
  WHERE km.keyword_match_score > 0 OR km.topic_match_score > 0
  ORDER BY 
    (km.keyword_match_score * 0.7 + km.topic_match_score * 0.3) DESC,
    km.regulation_number ASC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION public.search_bs7671_intelligence_hybrid IS 
'Searches enriched BS 7671 regulations intelligence using keyword matching. Joins with bs7671_embeddings for full regulation content.';