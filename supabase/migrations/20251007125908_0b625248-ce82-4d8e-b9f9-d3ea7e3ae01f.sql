-- Create new RAG knowledge tables for Project Management, Health & Safety, and Inspection & Testing

-- Project Management Knowledge Table
CREATE TABLE IF NOT EXISTS public.project_mgmt_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  topic TEXT NOT NULL,
  source TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Health & Safety Knowledge Table
CREATE TABLE IF NOT EXISTS public.health_safety_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  topic TEXT NOT NULL,
  source TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inspection & Testing Knowledge Table
CREATE TABLE IF NOT EXISTS public.inspection_testing_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  topic TEXT NOT NULL,
  source TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all three tables
ALTER TABLE public.project_mgmt_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_safety_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspection_testing_knowledge ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read, service role write
CREATE POLICY "Public read access for project management knowledge"
  ON public.project_mgmt_knowledge FOR SELECT
  USING (true);

CREATE POLICY "Service can manage project management knowledge"
  ON public.project_mgmt_knowledge FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read access for health safety knowledge"
  ON public.health_safety_knowledge FOR SELECT
  USING (true);

CREATE POLICY "Service can manage health safety knowledge"
  ON public.health_safety_knowledge FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public read access for inspection testing knowledge"
  ON public.inspection_testing_knowledge FOR SELECT
  USING (true);

CREATE POLICY "Service can manage inspection testing knowledge"
  ON public.inspection_testing_knowledge FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create vector search RPC functions for each knowledge area

-- Project Management Search
CREATE OR REPLACE FUNCTION public.search_project_mgmt(
  query_embedding vector,
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
  FROM public.project_mgmt_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Health & Safety Search
CREATE OR REPLACE FUNCTION public.search_health_safety(
  query_embedding vector,
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
  FROM public.health_safety_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Inspection & Testing Search
CREATE OR REPLACE FUNCTION public.search_inspection_testing(
  query_embedding vector,
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
  FROM public.inspection_testing_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;