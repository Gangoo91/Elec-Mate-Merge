-- Fix search_design_knowledge_intelligence_hybrid type mismatch
-- This function was returning double precision but needed numeric for hybrid_score

DROP FUNCTION IF EXISTS search_design_knowledge_intelligence_hybrid(text, integer);

CREATE OR REPLACE FUNCTION search_design_knowledge_intelligence_hybrid(
  query_text TEXT,
  match_count INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  facet_type TEXT,
  primary_topic TEXT,
  content TEXT,
  design_category TEXT,
  keywords TEXT[],
  bs7671_regulations TEXT[],
  formulas TEXT[],
  calculation_steps TEXT[],
  worked_examples JSONB[],
  table_refs TEXT[],
  cable_sizes TEXT[],
  load_types TEXT[],
  quality_score NUMERIC,
  confidence_score NUMERIC,
  hybrid_score NUMERIC
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  query_keywords TEXT[];
BEGIN
  -- Extract and normalize keywords from query
  query_keywords := regexp_split_to_array(lower(query_text), '\s+');
  
  -- Remove common stop words
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
      dki.id,
      dki.facet_type,
      dki.primary_topic,
      dki.content,
      dki.design_category,
      dki.keywords,
      dki.bs7671_regulations,
      dki.formulas,
      dki.calculation_steps,
      dki.worked_examples,
      dki.table_refs,
      dki.cable_sizes,
      dki.load_types,
      dki.quality_score,
      dki.confidence_score,
      -- Count matching keywords in dki.keywords array
      (
        SELECT COUNT(*)::INT
        FROM unnest(query_keywords) qk
        WHERE EXISTS (
          SELECT 1 FROM unnest(dki.keywords) rik 
          WHERE lower(rik) LIKE '%' || qk || '%'
        )
      ) AS keyword_match_score,
      -- Check primary_topic, content, design_category for matches
      (
        SELECT COUNT(*)::INT
        FROM unnest(query_keywords) qk
        WHERE lower(dki.primary_topic) LIKE '%' || qk || '%'
           OR lower(dki.content) LIKE '%' || qk || '%'
           OR lower(dki.design_category) LIKE '%' || qk || '%'
      ) AS content_match_score,
      -- Full-text search score (properly cast to numeric)
      (
        ts_rank_cd(
          to_tsvector('english', dki.content || ' ' || array_to_string(dki.keywords, ' ')),
          plainto_tsquery('english', query_text)
        ) * 10
      )::NUMERIC AS fts_score
    FROM design_knowledge_intelligence dki
    WHERE 
      dki.is_archived = FALSE
      AND (
        -- Use array overlap for fast initial filtering
        dki.keywords && query_keywords
        OR EXISTS (
          SELECT 1 FROM unnest(query_keywords) qk
          WHERE lower(dki.primary_topic) LIKE '%' || qk || '%'
             OR lower(dki.content) LIKE '%' || qk || '%'
             OR lower(dki.design_category) LIKE '%' || qk || '%'
        )
        OR to_tsvector('english', dki.content || ' ' || array_to_string(dki.keywords, ' ')) 
           @@ plainto_tsquery('english', query_text)
      )
  )
  SELECT 
    km.id,
    km.facet_type,
    km.primary_topic,
    km.content,
    km.design_category,
    km.keywords,
    km.bs7671_regulations,
    km.formulas,
    km.calculation_steps,
    km.worked_examples,
    km.table_refs,
    km.cable_sizes,
    km.load_types,
    km.quality_score,
    km.confidence_score,
    -- Hybrid score: keyword matches (40%) + content matches (30%) + FTS (30%)
    -- Properly cast to NUMERIC to match return type
    (
      (km.keyword_match_score * 0.4 + km.content_match_score * 0.3 + COALESCE(km.fts_score, 0) * 0.3) 
      / GREATEST(array_length(query_keywords, 1), 1)
    )::NUMERIC AS hybrid_score
  FROM keyword_matches km
  WHERE km.keyword_match_score > 0 OR km.content_match_score > 0 OR km.fts_score > 0
  ORDER BY 
    (
      (km.keyword_match_score * 0.4 + km.content_match_score * 0.3 + COALESCE(km.fts_score, 0) * 0.3) 
      / GREATEST(array_length(query_keywords, 1), 1)
    ) DESC,
    km.quality_score DESC,
    km.confidence_score DESC
  LIMIT match_count;
END;
$$;