-- Add content column to pricing_embeddings table for RAG searchable text
ALTER TABLE public.pricing_embeddings 
ADD COLUMN content text NOT NULL DEFAULT '';

-- Create unique index for upsert conflict resolution on content
CREATE UNIQUE INDEX IF NOT EXISTS pricing_embeddings_content_idx 
ON public.pricing_embeddings(content);

-- Remove the default after adding the column
ALTER TABLE public.pricing_embeddings 
ALTER COLUMN content DROP DEFAULT;