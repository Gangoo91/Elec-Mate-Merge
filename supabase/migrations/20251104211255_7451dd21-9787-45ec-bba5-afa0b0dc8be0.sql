-- Enable pg_trgm extension for trigram similarity search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add trigram index on item_name for fast ILIKE queries
CREATE INDEX IF NOT EXISTS idx_pricing_embeddings_item_name_trgm 
ON pricing_embeddings USING gin (item_name gin_trgm_ops);

-- Add indexes on filter columns for better query performance
CREATE INDEX IF NOT EXISTS idx_pricing_embeddings_category 
ON pricing_embeddings (category);

CREATE INDEX IF NOT EXISTS idx_pricing_embeddings_wholesaler 
ON pricing_embeddings (wholesaler);

-- Composite index for common filter combinations
CREATE INDEX IF NOT EXISTS idx_pricing_embeddings_category_wholesaler 
ON pricing_embeddings (category, wholesaler);