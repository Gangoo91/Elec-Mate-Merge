-- Drop the broken function with incorrect return types
DROP FUNCTION IF EXISTS search_practical_work_fast(text, integer);

-- Recreate with correct types matching actual table schema
CREATE OR REPLACE FUNCTION search_practical_work_fast(
  query_text text,
  match_count int DEFAULT 25
)
RETURNS TABLE (
  id uuid,
  primary_topic text,
  description text,
  equipment_category text,
  tools_required text[],
  keywords text[],
  applies_to text[],
  cable_sizes text[],
  activity_types text[],
  bs7671_regulations text[],
  test_procedures jsonb[],
  troubleshooting_steps text[],
  common_failures jsonb[],
  safety_requirements jsonb,
  confidence_score float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pwi.id,
    pwi.primary_topic,
    COALESCE(pwi.primary_topic, pwi.equipment_category)::text as description,
    pwi.equipment_category,
    pwi.tools_required,
    pwi.keywords,
    pwi.applies_to,
    pwi.cable_sizes,
    pwi.activity_types,
    pwi.bs7671_regulations,
    pwi.test_procedures,
    pwi.troubleshooting_steps,
    pwi.common_failures,
    pwi.safety_requirements,
    pwi.confidence_score::float
  FROM practical_work_intelligence pwi
  WHERE pwi.keywords && string_to_array(lower(query_text), ' ')
  AND pwi.confidence_score >= 0.7
  ORDER BY pwi.confidence_score DESC
  LIMIT match_count;
END;
$$;