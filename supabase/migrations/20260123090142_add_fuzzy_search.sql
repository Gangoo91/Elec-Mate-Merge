-- Enable trigram extension for fuzzy matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add trigram index for fast fuzzy search on item_name
CREATE INDEX IF NOT EXISTS idx_pricing_embeddings_item_name_trgm
ON pricing_embeddings USING gin (item_name gin_trgm_ops);

-- Create fuzzy search function with relevance scoring
CREATE OR REPLACE FUNCTION search_materials_fuzzy(
  search_query TEXT,
  category_filter TEXT DEFAULT NULL,
  supplier_filter TEXT DEFAULT NULL,
  similarity_threshold FLOAT DEFAULT 0.2,
  result_limit INT DEFAULT 50
)
RETURNS TABLE (
  id UUID,
  item_name TEXT,
  category TEXT,
  base_cost NUMERIC,
  wholesaler TEXT,
  price_per_unit TEXT,
  in_stock BOOLEAN,
  product_url TEXT,
  similarity_score FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pe.id,
    pe.item_name,
    pe.category,
    pe.base_cost,
    pe.wholesaler,
    pe.price_per_unit,
    pe.in_stock,
    pe.product_url,
    GREATEST(
      similarity(LOWER(pe.item_name), LOWER(search_query)),
      CASE WHEN LOWER(pe.item_name) LIKE LOWER(search_query) || '%' THEN 0.95 ELSE 0 END,
      CASE WHEN LOWER(pe.item_name) LIKE '%' || LOWER(search_query) || '%' THEN 0.85 ELSE 0 END
    )::FLOAT AS similarity_score
  FROM pricing_embeddings pe
  WHERE
    (
      similarity(LOWER(pe.item_name), LOWER(search_query)) > similarity_threshold
      OR LOWER(pe.item_name) LIKE '%' || LOWER(search_query) || '%'
    )
    AND (category_filter IS NULL OR pe.category ILIKE '%' || category_filter || '%')
    AND (supplier_filter IS NULL OR pe.wholesaler ILIKE '%' || supplier_filter || '%')
  ORDER BY similarity_score DESC, pe.item_name
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;
