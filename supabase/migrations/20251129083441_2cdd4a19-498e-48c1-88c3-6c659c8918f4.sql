-- Ultra-fast practical work search using GIN keyword index only
-- Replaces slow hybrid search (21s → <1s)
CREATE OR REPLACE FUNCTION search_practical_work_fast(
  query_text text,
  match_count int DEFAULT 25
)
RETURNS TABLE (
  id uuid,
  primary_topic text,
  content text,
  practical_guidance text,
  safety_requirements text[],
  tools_required text[],
  keywords text[],
  applies_to text[],
  cable_sizes text[],
  activity_types text[],
  bs7671_refs text[],
  worked_examples jsonb,
  confidence_score float,
  quality_score float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pwi.id,
    pwi.primary_topic,
    pwi.content,
    pwi.practical_guidance,
    pwi.safety_requirements,
    pwi.tools_required,
    pwi.keywords,
    pwi.applies_to,
    pwi.cable_sizes,
    pwi.activity_types,
    pwi.bs7671_refs,
    pwi.worked_examples,
    pwi.confidence_score,
    pwi.quality_score
  FROM practical_work_intelligence pwi
  WHERE pwi.keywords && string_to_array(lower(query_text), ' ')  -- GIN index hit
  AND pwi.confidence_score >= 0.7  -- B-tree index filter
  ORDER BY pwi.confidence_score DESC, pwi.quality_score DESC
  LIMIT match_count;
END;
$$;