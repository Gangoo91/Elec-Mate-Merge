-- Enable pgvector extension for RAG (Retrieval Augmented Generation)
CREATE EXTENSION IF NOT EXISTS vector;

-- BS 7671:2018+A3:2024 embeddings table
CREATE TABLE IF NOT EXISTS public.bs7671_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regulation_number TEXT NOT NULL,
  amendment TEXT DEFAULT 'A3:2024',
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pricing embeddings from wholesalers
CREATE TABLE IF NOT EXISTS public.pricing_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_cost NUMERIC NOT NULL,
  wholesaler TEXT NOT NULL,
  embedding VECTOR(1536),
  last_scraped TIMESTAMPTZ DEFAULT now(),
  price_per_unit TEXT,
  in_stock BOOLEAN DEFAULT true,
  product_url TEXT,
  metadata JSONB DEFAULT '{}'
);

-- Installation knowledge from On-Site Guide, ACOPs
CREATE TABLE IF NOT EXISTS public.installation_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Price history tracking
CREATE TABLE IF NOT EXISTS public.price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  wholesaler TEXT NOT NULL,
  price NUMERIC NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bs7671_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installation_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;

-- Public read access for embeddings (needed for RAG)
CREATE POLICY "Public read access for BS 7671 embeddings"
  ON public.bs7671_embeddings FOR SELECT
  USING (true);

CREATE POLICY "Public read access for pricing embeddings"
  ON public.pricing_embeddings FOR SELECT
  USING (true);

CREATE POLICY "Public read access for installation knowledge"
  ON public.installation_knowledge FOR SELECT
  USING (true);

CREATE POLICY "Public read access for price history"
  ON public.price_history FOR SELECT
  USING (true);

-- Allow all operations from service context (edge functions with service key)
CREATE POLICY "Service can manage BS 7671 embeddings"
  ON public.bs7671_embeddings FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service can manage pricing embeddings"
  ON public.pricing_embeddings FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service can manage installation knowledge"
  ON public.installation_knowledge FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service can manage price history"
  ON public.price_history FOR ALL
  USING (true)
  WITH CHECK (true);

-- RAG Search Functions
CREATE OR REPLACE FUNCTION public.search_bs7671(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  regulation_number TEXT,
  section TEXT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT 
    id,
    regulation_number,
    section,
    content,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.bs7671_embeddings
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION public.search_pricing(
  query_embedding VECTOR(1536),
  category_filter TEXT DEFAULT NULL,
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  item_name TEXT,
  category TEXT,
  base_cost NUMERIC,
  wholesaler TEXT,
  price_per_unit TEXT,
  in_stock BOOLEAN,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT 
    id,
    item_name,
    category,
    base_cost,
    wholesaler,
    price_per_unit,
    in_stock,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.pricing_embeddings
  WHERE 
    (category_filter IS NULL OR category = category_filter)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION public.search_installation_knowledge(
  query_embedding VECTOR(1536),
  source_filter TEXT DEFAULT NULL,
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT 
    id,
    topic,
    content,
    source,
    1 - (embedding <=> query_embedding) AS similarity
  FROM public.installation_knowledge
  WHERE 
    (source_filter IS NULL OR source = source_filter)
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS bs7671_embedding_idx ON public.bs7671_embeddings 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS pricing_embedding_idx ON public.pricing_embeddings 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS installation_knowledge_embedding_idx ON public.installation_knowledge 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS pricing_category_idx ON public.pricing_embeddings(category);
CREATE INDEX IF NOT EXISTS pricing_wholesaler_idx ON public.pricing_embeddings(wholesaler);
CREATE INDEX IF NOT EXISTS bs7671_regulation_idx ON public.bs7671_embeddings(regulation_number);