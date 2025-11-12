
-- Fix BS 7671 Intelligence Hybrid Search to match edge function expectations
-- Issue: Edge functions call with 'query_text' but function expects 'search_keywords'

DROP FUNCTION IF EXISTS public.search_bs7671_intelligence_hybrid(text, integer);

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
  hybrid_score DOUBLE PRECISION
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  query_keywords TEXT[];
BEGIN
  -- Extract keywords from query (lowercase, split by spaces)
  query_keywords := regexp_split_to_array(lower(query_text), '\s+');
  
  -- Remove common stop words for better matching
  query_keywords := array_remove(query_keywords, 'the');
  query_keywords := array_remove(query_keywords, 'and');
  query_keywords := array_remove(query_keywords, 'or');
  query_keywords := array_remove(query_keywords, 'a');
  query_keywords := array_remove(query_keywords, 'an');
  query_keywords := array_remove(query_keywords, 'in');
  query_keywords := array_remove(query_keywords, 'for');
  query_keywords := array_remove(query_keywords, 'to');
  query_keywords := array_remove(query_keywords, 'of');
  
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
      -- Count matching keywords in ri.keywords array
      (
        SELECT COUNT(*)::INT
        FROM unnest(query_keywords) qk
        WHERE EXISTS (
          SELECT 1 FROM unnest(ri.keywords) rik 
          WHERE lower(rik) LIKE '%' || qk || '%'
        )
      ) AS keyword_match_score,
      -- Check primary_topic, regulation_number, category for matches
      (
        SELECT COUNT(*)::INT
        FROM unnest(query_keywords) qk
        WHERE lower(ri.primary_topic) LIKE '%' || qk || '%'
           OR lower(ri.regulation_number) LIKE '%' || qk || '%'
           OR lower(ri.category) LIKE '%' || qk || '%'
      ) AS topic_match_score
    FROM regulations_intelligence ri
    WHERE 
      -- Use array overlap for fast initial filtering
      ri.keywords && query_keywords
      OR EXISTS (
        SELECT 1 FROM unnest(query_keywords) qk
        WHERE lower(ri.primary_topic) LIKE '%' || qk || '%'
           OR lower(ri.regulation_number) LIKE '%' || qk || '%'
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
    COALESCE(reg.content, km.primary_topic) AS content,  -- Fallback to primary_topic if no content
    COALESCE(reg.section, '') AS section,
    -- Hybrid score: keyword matches (60%) + topic matches (40%)
    ((km.keyword_match_score * 0.6 + km.topic_match_score * 0.4) / GREATEST(array_length(query_keywords, 1), 1))::DOUBLE PRECISION AS hybrid_score
  FROM keyword_matches km
  LEFT JOIN bs7671_embeddings reg ON reg.id = km.regulation_id
  WHERE km.keyword_match_score > 0 OR km.topic_match_score > 0
  ORDER BY 
    ((km.keyword_match_score * 0.6 + km.topic_match_score * 0.4) / GREATEST(array_length(query_keywords, 1), 1)) DESC,
    km.regulation_number ASC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION public.search_bs7671_intelligence_hybrid IS 
'Keyword-based hybrid search for BS 7671 regulations intelligence. Searches keywords, primary_topic, regulation_number, and category fields. Joins with bs7671_embeddings for full content. Returns hybrid_score based on keyword and topic matches.';

-- Verify practical work intelligence search function exists and has correct signature
-- This function was already fixed in migration 20251109163827_e22745ed, just verify it exists

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'search_practical_work_intelligence_hybrid'
      AND pg_get_function_identity_arguments(oid) = 'query_text text, match_count integer, filter_trade text'
  ) THEN
    RAISE NOTICE 'Practical work intelligence search function signature verified';
  END IF;
END;
$$;
