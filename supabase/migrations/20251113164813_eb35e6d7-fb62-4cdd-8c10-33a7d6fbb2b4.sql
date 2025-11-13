-- Migration: Fix hazard retrieval system - Corrected SQL syntax
-- Purpose: Create regulation_hazards_extracted table and RPC functions

-- Step 1: Drop existing functions
DROP FUNCTION IF EXISTS public.match_extracted_hazards(vector, float, int);
DROP FUNCTION IF EXISTS public.match_extracted_hazards(vector(1536), float, int);
DROP FUNCTION IF EXISTS public.increment_hazard_usage(uuid);

-- Step 2: Drop and recreate table
DROP TABLE IF EXISTS public.regulation_hazards_extracted CASCADE;

CREATE TABLE public.regulation_hazards_extracted (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regulation_id UUID REFERENCES public.regulations_intelligence(id),
  
  hazard_description TEXT NOT NULL,
  hazard_category TEXT NOT NULL,
  
  likelihood INTEGER NOT NULL CHECK (likelihood >= 1 AND likelihood <= 5),
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 5),
  risk_score INTEGER GENERATED ALWAYS AS (likelihood * severity) STORED,
  
  control_measures TEXT[] NOT NULL DEFAULT '{}',
  control_hierarchy TEXT,
  required_ppe JSONB DEFAULT '[]',
  
  applies_to_work_types TEXT[] DEFAULT '{}',
  applies_to_locations TEXT[] DEFAULT '{}',
  applies_to_equipment TEXT[] DEFAULT '{}',
  applies_to_installation_phases TEXT[] DEFAULT '{}',
  
  regulation_number TEXT NOT NULL,
  regulation_section TEXT NOT NULL,
  regulation_excerpt TEXT,
  
  confidence_score NUMERIC DEFAULT 0.5 CHECK (confidence_score >= 0 AND confidence_score <= 1),
  usage_count INTEGER DEFAULT 0,
  last_used TIMESTAMP WITH TIME ZONE,
  
  embedding vector(1536),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Step 3: Create indexes
CREATE INDEX idx_hazards_category ON public.regulation_hazards_extracted(hazard_category);
CREATE INDEX idx_hazards_risk_score ON public.regulation_hazards_extracted(risk_score);
CREATE INDEX idx_hazards_work_types ON public.regulation_hazards_extracted USING GIN(applies_to_work_types);
CREATE INDEX idx_hazards_locations ON public.regulation_hazards_extracted USING GIN(applies_to_locations);
CREATE INDEX idx_hazards_equipment ON public.regulation_hazards_extracted USING GIN(applies_to_equipment);
CREATE INDEX idx_hazards_phases ON public.regulation_hazards_extracted USING GIN(applies_to_installation_phases);
CREATE INDEX idx_hazards_confidence ON public.regulation_hazards_extracted(confidence_score);
CREATE INDEX idx_hazards_embedding ON public.regulation_hazards_extracted USING ivfflat(embedding vector_cosine_ops) WITH (lists = 100);

-- Step 4: Enable RLS
ALTER TABLE public.regulation_hazards_extracted ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for hazards" ON public.regulation_hazards_extracted;
CREATE POLICY "Public read access for hazards"
ON public.regulation_hazards_extracted
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Service role can manage hazards" ON public.regulation_hazards_extracted;
CREATE POLICY "Service role can manage hazards"
ON public.regulation_hazards_extracted
FOR ALL
USING (auth.role() = 'service_role');

-- Step 5: Add missing columns to regulations_intelligence
ALTER TABLE public.regulations_intelligence
ADD COLUMN IF NOT EXISTS secondary_topics TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS regulation_type TEXT DEFAULT 'general';

CREATE INDEX IF NOT EXISTS idx_regulations_secondary_topics 
ON public.regulations_intelligence USING GIN(secondary_topics);

CREATE INDEX IF NOT EXISTS idx_regulations_type 
ON public.regulations_intelligence(regulation_type);

-- Step 6: Populate initial hazard data (500 most common regulations)
INSERT INTO public.regulation_hazards_extracted (
  regulation_id,
  hazard_description,
  hazard_category,
  likelihood,
  severity,
  control_measures,
  applies_to_work_types,
  applies_to_locations,
  regulation_number,
  regulation_section,
  confidence_score
)
SELECT 
  ri.id,
  CASE 
    WHEN ri.primary_topic ILIKE '%isolation%' THEN 'Electrical shock risk from live conductors'
    WHEN ri.primary_topic ILIKE '%earthing%' OR ri.primary_topic ILIKE '%bonding%' THEN 'Electrical shock risk from exposed metalwork'
    WHEN ri.primary_topic ILIKE '%rcd%' OR ri.primary_topic ILIKE '%residual%' THEN 'Electric shock risk requiring additional protection'
    WHEN ri.primary_topic ILIKE '%cable%' THEN 'Cable damage or fire risk'
    WHEN ri.primary_topic ILIKE '%circuit%' THEN 'Overload or short circuit risk'
    WHEN ri.primary_topic ILIKE '%protection%' THEN 'Inadequate electrical protection'
    WHEN ri.primary_topic ILIKE '%inspection%' OR ri.primary_topic ILIKE '%testing%' THEN 'Unsafe installation without proper verification'
    WHEN ri.primary_topic ILIKE '%outdoor%' OR ri.primary_topic ILIKE '%external%' THEN 'Environmental exposure risk'
    WHEN ri.primary_topic ILIKE '%bathroom%' OR ri.primary_topic ILIKE '%zone%' THEN 'Water contact electrical risk'
    ELSE 'Electrical installation hazard: ' || ri.primary_topic
  END,
  CASE 
    WHEN ri.category ILIKE '%electrical%' THEN 'Electrical'
    WHEN ri.primary_topic ILIKE '%height%' THEN 'Working at Height'
    WHEN ri.primary_topic ILIKE '%confined%' THEN 'Confined Space'
    WHEN ri.primary_topic ILIKE '%manual%' THEN 'Manual Handling'
    ELSE 'Electrical'
  END,
  CASE 
    WHEN ri.primary_topic ILIKE '%isolation%' OR ri.primary_topic ILIKE '%live%' THEN 4
    WHEN ri.primary_topic ILIKE '%rcd%' OR ri.primary_topic ILIKE '%protection%' THEN 4
    WHEN ri.primary_topic ILIKE '%earthing%' OR ri.primary_topic ILIKE '%bonding%' THEN 3
    ELSE 3
  END,
  CASE 
    WHEN ri.primary_topic ILIKE '%isolation%' OR ri.primary_topic ILIKE '%live%' THEN 5
    WHEN ri.primary_topic ILIKE '%rcd%' OR ri.primary_topic ILIKE '%protection%' THEN 5
    WHEN ri.primary_topic ILIKE '%earthing%' OR ri.primary_topic ILIKE '%bonding%' THEN 4
    ELSE 3
  END,
  ARRAY['Follow BS 7671 regulations', 'Use appropriate PPE', 'Follow safe isolation procedures']::TEXT[],
  ARRAY['domestic', 'commercial', 'industrial']::TEXT[],
  CASE 
    WHEN ri.primary_topic ILIKE '%outdoor%' THEN ARRAY['outdoor']
    WHEN ri.primary_topic ILIKE '%bathroom%' THEN ARRAY['indoor', 'wet_location']
    WHEN ri.primary_topic ILIKE '%height%' THEN ARRAY['height']
    ELSE ARRAY['indoor']
  END::TEXT[],
  COALESCE(ri.regulation_number, 'BS 7671'),
  COALESCE(ri.regulation_number, 'General'),
  COALESCE(ri.confidence_score, 0.7)
FROM public.regulations_intelligence ri
WHERE ri.primary_topic IS NOT NULL
ORDER BY ri.confidence_score DESC
LIMIT 500;

-- Step 7: Create match_extracted_hazards RPC
CREATE FUNCTION public.match_extracted_hazards(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 15
)
RETURNS TABLE (
  id uuid,
  hazard_description text,
  hazard_category text,
  likelihood int,
  severity int,
  risk_score int,
  control_measures text[],
  control_hierarchy text,
  required_ppe jsonb,
  applies_to_work_types text[],
  applies_to_locations text[],
  applies_to_equipment text[],
  applies_to_installation_phases text[],
  regulation_number text,
  regulation_section text,
  regulation_excerpt text,
  confidence_score numeric,
  usage_count int,
  similarity float
)
LANGUAGE plpgsql
SET statement_timeout TO '120s'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rhe.id,
    rhe.hazard_description,
    rhe.hazard_category,
    rhe.likelihood,
    rhe.severity,
    rhe.risk_score,
    rhe.control_measures,
    rhe.control_hierarchy,
    rhe.required_ppe,
    rhe.applies_to_work_types,
    rhe.applies_to_locations,
    rhe.applies_to_equipment,
    rhe.applies_to_installation_phases,
    rhe.regulation_number,
    rhe.regulation_section,
    rhe.regulation_excerpt,
    rhe.confidence_score,
    rhe.usage_count,
    (1 - (rhe.embedding <=> query_embedding))::float as similarity
  FROM public.regulation_hazards_extracted rhe
  WHERE rhe.embedding IS NOT NULL
    AND 1 - (rhe.embedding <=> query_embedding) > match_threshold
  ORDER BY rhe.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Step 8: Create increment_hazard_usage RPC
CREATE FUNCTION public.increment_hazard_usage(
  hazard_id uuid
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.regulation_hazards_extracted
  SET 
    usage_count = usage_count + 1,
    last_used = now(),
    confidence_score = LEAST(confidence_score + 0.01, 1.0)
  WHERE id = hazard_id;
END;
$$;

-- Step 9: Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_hazards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_hazards_updated_at ON public.regulation_hazards_extracted;

CREATE TRIGGER trigger_update_hazards_updated_at
  BEFORE UPDATE ON public.regulation_hazards_extracted
  FOR EACH ROW
  EXECUTE FUNCTION update_hazards_updated_at();