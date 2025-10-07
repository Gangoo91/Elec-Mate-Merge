-- Phase 1: Create design_knowledge table with vector search
CREATE TABLE IF NOT EXISTS public.design_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.design_knowledge ENABLE ROW LEVEL SECURITY;

-- Create public read access policy
CREATE POLICY "Public read access for design knowledge"
ON public.design_knowledge
FOR SELECT
TO public
USING (true);

-- Create service role management policy
CREATE POLICY "Service can manage design knowledge"
ON public.design_knowledge
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create vector index for design knowledge
CREATE INDEX IF NOT EXISTS design_knowledge_embedding_idx 
ON public.design_knowledge 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create search function for design knowledge
CREATE OR REPLACE FUNCTION public.search_design_knowledge(
  query_embedding vector(1536),
  source_filter text DEFAULT NULL,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  topic text,
  content text,
  source text,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    id,
    topic,
    content,
    source,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.design_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Phase 2: Move design content from installation_knowledge to design_knowledge
INSERT INTO public.design_knowledge (id, topic, content, source, embedding, metadata, created_at)
SELECT id, topic, content, source, embedding, metadata, created_at
FROM public.installation_knowledge
WHERE source IN ('design-guide', 'calculations-basic', 'wiring-diagrams', 'ev-charging', 'emergency-lighting');

-- Move H&S content from installation_knowledge to health_safety_knowledge
INSERT INTO public.health_safety_knowledge (id, topic, content, source, embedding, metadata, created_at)
SELECT id, topic, content, source, embedding, metadata, created_at
FROM public.installation_knowledge
WHERE source IN ('health-safety-management', 'nebosh-igc');

-- Phase 3: Delete old guidance-note-3 from installation_knowledge
DELETE FROM public.installation_knowledge
WHERE source = 'guidance-note-3';

-- Delete moved design content from installation_knowledge
DELETE FROM public.installation_knowledge
WHERE source IN ('design-guide', 'calculations-basic', 'wiring-diagrams', 'ev-charging', 'emergency-lighting');

-- Delete moved H&S content from installation_knowledge
DELETE FROM public.installation_knowledge
WHERE source IN ('health-safety-management', 'nebosh-igc');