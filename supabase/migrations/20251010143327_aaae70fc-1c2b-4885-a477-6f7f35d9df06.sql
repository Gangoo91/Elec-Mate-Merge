-- Add metadata filtering columns and indexes for RAG optimization

-- 1. Add scale metadata to health_safety_knowledge
UPDATE health_safety_knowledge
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{scale}',
  CASE 
    WHEN content ILIKE '%domestic%' OR content ILIKE '%residential%' OR content ILIKE '%home%' THEN '"domestic"'
    WHEN content ILIKE '%commercial%' OR content ILIKE '%office%' OR content ILIKE '%retail%' THEN '"commercial"'
    WHEN content ILIKE '%industrial%' OR content ILIKE '%factory%' OR content ILIKE '%warehouse%' THEN '"industrial"'
    ELSE '"general"'
  END::jsonb
);

-- 2. Add circuit_type metadata to design_knowledge
UPDATE design_knowledge
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{circuit_type}',
  CASE
    WHEN content ILIKE '%cooker%' OR content ILIKE '%oven%' THEN '"cooker"'
    WHEN content ILIKE '%shower%' OR content ILIKE '%electric shower%' THEN '"shower"'
    WHEN content ILIKE '%ring main%' OR content ILIKE '%socket%' OR content ILIKE '%power outlet%' THEN '"sockets"'
    WHEN content ILIKE '%lighting%' OR content ILIKE '%light%' THEN '"lighting"'
    WHEN content ILIKE '%ev charg%' OR content ILIKE '%electric vehicle%' THEN '"ev-charging"'
    WHEN content ILIKE '%immersion%' OR content ILIKE '%water heat%' THEN '"immersion"'
    ELSE '"general"'
  END::jsonb
);

-- 3. Add installation_method metadata to installation_knowledge
UPDATE installation_knowledge
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{method}',
  CASE
    WHEN content ILIKE '%clipped direct%' OR content ILIKE '%surface mount%' THEN '"clipped-direct"'
    WHEN content ILIKE '%conduit%' THEN '"conduit"'
    WHEN content ILIKE '%trunking%' THEN '"trunking"'
    WHEN content ILIKE '%SWA%' OR content ILIKE '%armoured%' OR content ILIKE '%steel wire%' THEN '"swa"'
    WHEN content ILIKE '%tray%' OR content ILIKE '%cable tray%' THEN '"cable-tray"'
    WHEN content ILIKE '%buried%' OR content ILIKE '%underground%' THEN '"buried"'
    ELSE '"general"'
  END::jsonb
);

-- 4. Create indexes for faster metadata filtering
CREATE INDEX IF NOT EXISTS idx_health_safety_scale 
ON health_safety_knowledge ((metadata->>'scale'));

CREATE INDEX IF NOT EXISTS idx_design_circuit_type 
ON design_knowledge ((metadata->>'circuit_type'));

CREATE INDEX IF NOT EXISTS idx_installation_method 
ON installation_knowledge ((metadata->>'method'));

-- 5. Update search_design_knowledge to support circuit filtering
CREATE OR REPLACE FUNCTION search_design_knowledge(
  query_embedding vector,
  circuit_filter text DEFAULT NULL,
  source_filter text DEFAULT NULL,
  match_threshold double precision DEFAULT 0.7,
  match_count integer DEFAULT 5
)
RETURNS TABLE(id uuid, topic text, content text, source text, similarity double precision)
LANGUAGE sql STABLE
AS $$
  SELECT 
    id, topic, content, source,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.design_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND (circuit_filter IS NULL OR metadata->>'circuit_type' = circuit_filter OR metadata->>'circuit_type' = 'general')
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 6. Update search_health_safety to support scale filtering
CREATE OR REPLACE FUNCTION search_health_safety(
  query_embedding vector,
  scale_filter text DEFAULT NULL,
  source_filter text DEFAULT NULL,
  match_threshold double precision DEFAULT 0.7,
  match_count integer DEFAULT 5
)
RETURNS TABLE(id uuid, topic text, content text, source text, similarity double precision)
LANGUAGE sql STABLE
AS $$
  SELECT 
    id, topic, content, source,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.health_safety_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND (scale_filter IS NULL OR metadata->>'scale' = scale_filter OR metadata->>'scale' = 'general')
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 7. Update search_installation_knowledge to support method filtering
CREATE OR REPLACE FUNCTION search_installation_knowledge(
  query_embedding vector,
  method_filter text DEFAULT NULL,
  source_filter text DEFAULT NULL,
  match_threshold double precision DEFAULT 0.7,
  match_count integer DEFAULT 5
)
RETURNS TABLE(id uuid, topic text, content text, source text, similarity double precision)
LANGUAGE sql STABLE
AS $$
  SELECT 
    id, topic, content, source,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.installation_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND (method_filter IS NULL OR metadata->>'method' = method_filter OR metadata->>'method' = 'general')
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;