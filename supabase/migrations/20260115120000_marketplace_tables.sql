-- Marketplace Tables Migration
-- Creates tables for the tools marketplace redesign

-- ============================================
-- 1. SUPPLIERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.marketplace_suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  scrape_enabled BOOLEAN DEFAULT TRUE,
  scrape_config JSONB DEFAULT '{}',
  deals_page_url TEXT,
  coupons_page_url TEXT,
  last_scraped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. MARKETPLACE PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES public.marketplace_suppliers(id) ON DELETE CASCADE,
  sku VARCHAR(100),
  name TEXT NOT NULL,
  brand VARCHAR(100),
  category VARCHAR(100),
  subcategory VARCHAR(100),

  -- Pricing
  current_price DECIMAL(10,2),
  regular_price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'GBP',
  is_on_sale BOOLEAN DEFAULT FALSE,
  discount_percentage DECIMAL(5,2),

  -- Details
  description TEXT,
  highlights TEXT[],
  image_url TEXT,
  product_url TEXT NOT NULL,

  -- Stock
  stock_status VARCHAR(50) DEFAULT 'unknown',
  stock_quantity INTEGER,

  -- Metadata
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint to prevent duplicates
  CONSTRAINT unique_supplier_sku UNIQUE (supplier_id, sku)
);

-- Full-text search vector (generated column)
ALTER TABLE public.marketplace_products
ADD COLUMN IF NOT EXISTS search_vector TSVECTOR
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', COALESCE(name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(brand, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(category, '')), 'C')
) STORED;

-- ============================================
-- 3. COUPON CODES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.marketplace_coupon_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES public.marketplace_suppliers(id) ON DELETE CASCADE,
  code VARCHAR(50) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed', 'free_delivery')),
  discount_value DECIMAL(10,2),
  minimum_spend DECIMAL(10,2),
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  is_verified BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  source_url TEXT,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate codes per supplier
  CONSTRAINT unique_supplier_code UNIQUE (supplier_id, code)
);

-- ============================================
-- 4. DEALS OF THE DAY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.marketplace_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.marketplace_products(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES public.marketplace_suppliers(id) ON DELETE CASCADE,
  deal_type VARCHAR(50) DEFAULT 'deal_of_day' CHECK (deal_type IN ('deal_of_day', 'flash_sale', 'clearance', 'weekly_deal')),
  original_price DECIMAL(10,2),
  deal_price DECIMAL(10,2),
  discount_percentage DECIMAL(5,2),
  title TEXT,
  description TEXT,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. SCRAPE JOBS TABLE (for tracking scraper runs)
-- ============================================
CREATE TABLE IF NOT EXISTS public.marketplace_scrape_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES public.marketplace_suppliers(id) ON DELETE CASCADE,
  job_type VARCHAR(50) DEFAULT 'full_catalog' CHECK (job_type IN ('full_catalog', 'deals_only', 'coupons_only', 'incremental')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  products_found INTEGER DEFAULT 0,
  products_updated INTEGER DEFAULT 0,
  deals_found INTEGER DEFAULT 0,
  coupons_found INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_products_search ON public.marketplace_products USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_category ON public.marketplace_products(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_supplier ON public.marketplace_products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_price ON public.marketplace_products(current_price);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_sale ON public.marketplace_products(is_on_sale) WHERE is_on_sale = TRUE;
CREATE INDEX IF NOT EXISTS idx_marketplace_products_brand ON public.marketplace_products(brand);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_scraped ON public.marketplace_products(scraped_at DESC);

-- Coupons indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_coupons_supplier ON public.marketplace_coupon_codes(supplier_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_coupons_valid ON public.marketplace_coupon_codes(valid_until) WHERE valid_until > NOW() OR valid_until IS NULL;
CREATE INDEX IF NOT EXISTS idx_marketplace_coupons_verified ON public.marketplace_coupon_codes(is_verified) WHERE is_verified = TRUE;

-- Deals indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_deals_active ON public.marketplace_deals(is_active, expires_at) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_marketplace_deals_supplier ON public.marketplace_deals(supplier_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_deals_type ON public.marketplace_deals(deal_type);

-- Scrape jobs indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_scrape_jobs_supplier ON public.marketplace_scrape_jobs(supplier_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_scrape_jobs_status ON public.marketplace_scrape_jobs(status);

-- ============================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.marketplace_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_coupon_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_scrape_jobs ENABLE ROW LEVEL SECURITY;

-- Public read access for suppliers, products, coupons, deals
CREATE POLICY "Public read access for suppliers" ON public.marketplace_suppliers
  FOR SELECT USING (true);

CREATE POLICY "Public read access for products" ON public.marketplace_products
  FOR SELECT USING (true);

CREATE POLICY "Public read access for coupons" ON public.marketplace_coupon_codes
  FOR SELECT USING (true);

CREATE POLICY "Public read access for deals" ON public.marketplace_deals
  FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access suppliers" ON public.marketplace_suppliers
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access products" ON public.marketplace_products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access coupons" ON public.marketplace_coupon_codes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access deals" ON public.marketplace_deals
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access scrape jobs" ON public.marketplace_scrape_jobs
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 8. SEED SUPPLIERS DATA
-- ============================================
INSERT INTO public.marketplace_suppliers (name, slug, website_url, logo_url, deals_page_url, coupons_page_url, scrape_enabled, scrape_config)
VALUES
  ('Screwfix', 'screwfix', 'https://www.screwfix.com', '/suppliers/screwfix-logo.png', 'https://www.screwfix.com/search?search=deals', NULL, true, '{"selectors": {"productCard": "[data-product-id]", "productName": ".product-card__title", "productPrice": ".product-card__price-now"}}'),
  ('Toolstation', 'toolstation', 'https://www.toolstation.com', '/suppliers/toolstation-logo.png', 'https://www.toolstation.com/deals', NULL, true, '{"selectors": {"productCard": ".product-card", "productName": ".product-card__title", "productPrice": ".product-card__price"}}'),
  ('CEF', 'cef', 'https://www.cef.co.uk', '/suppliers/cef-logo.png', 'https://www.cef.co.uk/offers', NULL, true, '{"selectors": {}}'),
  ('ElectricalDirect', 'electrical-direct', 'https://www.electricaldirect.co.uk', '/suppliers/electrical-direct-logo.png', 'https://www.electricaldirect.co.uk/deals', 'https://www.electricaldirect.co.uk/voucher-codes', true, '{"selectors": {}}'),
  ('RS Components', 'rs-components', 'https://uk.rs-online.com', '/suppliers/rs-logo.png', 'https://uk.rs-online.com/web/c/offers/', NULL, true, '{"selectors": {}}'),
  ('TLC Electrical', 'tlc-electrical', 'https://www.tlc-direct.co.uk', '/suppliers/tlc-logo.png', 'https://www.tlc-direct.co.uk/sale', NULL, true, '{"selectors": {}}'),
  ('Edmundson Electrical', 'edmundson', 'https://www.edmundson-electrical.co.uk', '/suppliers/edmundson-logo.png', NULL, NULL, false, '{"trade_only": true}')
ON CONFLICT (slug) DO UPDATE SET
  website_url = EXCLUDED.website_url,
  deals_page_url = EXCLUDED.deals_page_url,
  coupons_page_url = EXCLUDED.coupons_page_url,
  updated_at = NOW();

-- ============================================
-- 9. HELPER FUNCTIONS
-- ============================================

-- Function to search products with full-text search
CREATE OR REPLACE FUNCTION search_marketplace_products(
  search_query TEXT,
  category_filter TEXT DEFAULT NULL,
  supplier_ids UUID[] DEFAULT NULL,
  min_price DECIMAL DEFAULT NULL,
  max_price DECIMAL DEFAULT NULL,
  deals_only BOOLEAN DEFAULT FALSE,
  sort_by TEXT DEFAULT 'relevance',
  page_num INTEGER DEFAULT 1,
  page_size INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  supplier_id UUID,
  supplier_name TEXT,
  supplier_slug TEXT,
  sku VARCHAR,
  name TEXT,
  brand VARCHAR,
  category VARCHAR,
  subcategory VARCHAR,
  current_price DECIMAL,
  regular_price DECIMAL,
  is_on_sale BOOLEAN,
  discount_percentage DECIMAL,
  description TEXT,
  highlights TEXT[],
  image_url TEXT,
  product_url TEXT,
  stock_status VARCHAR,
  search_rank REAL,
  total_count BIGINT
) AS $$
DECLARE
  offset_val INTEGER;
  total BIGINT;
BEGIN
  offset_val := (page_num - 1) * page_size;

  -- Get total count first
  SELECT COUNT(*) INTO total
  FROM public.marketplace_products p
  WHERE
    (search_query IS NULL OR search_query = '' OR p.search_vector @@ websearch_to_tsquery('english', search_query))
    AND (category_filter IS NULL OR p.category = category_filter)
    AND (supplier_ids IS NULL OR p.supplier_id = ANY(supplier_ids))
    AND (min_price IS NULL OR p.current_price >= min_price)
    AND (max_price IS NULL OR p.current_price <= max_price)
    AND (NOT deals_only OR p.is_on_sale = TRUE);

  RETURN QUERY
  SELECT
    p.id,
    p.supplier_id,
    s.name::TEXT as supplier_name,
    s.slug::TEXT as supplier_slug,
    p.sku,
    p.name,
    p.brand,
    p.category,
    p.subcategory,
    p.current_price,
    p.regular_price,
    p.is_on_sale,
    p.discount_percentage,
    p.description,
    p.highlights,
    p.image_url,
    p.product_url,
    p.stock_status,
    CASE
      WHEN search_query IS NOT NULL AND search_query != ''
      THEN ts_rank(p.search_vector, websearch_to_tsquery('english', search_query))
      ELSE 1.0
    END as search_rank,
    total as total_count
  FROM public.marketplace_products p
  JOIN public.marketplace_suppliers s ON p.supplier_id = s.id
  WHERE
    (search_query IS NULL OR search_query = '' OR p.search_vector @@ websearch_to_tsquery('english', search_query))
    AND (category_filter IS NULL OR p.category = category_filter)
    AND (supplier_ids IS NULL OR p.supplier_id = ANY(supplier_ids))
    AND (min_price IS NULL OR p.current_price >= min_price)
    AND (max_price IS NULL OR p.current_price <= max_price)
    AND (NOT deals_only OR p.is_on_sale = TRUE)
  ORDER BY
    CASE sort_by
      WHEN 'price-low' THEN p.current_price
      WHEN 'price-high' THEN -p.current_price
      WHEN 'discount' THEN -COALESCE(p.discount_percentage, 0)
      ELSE -ts_rank(p.search_vector, websearch_to_tsquery('english', COALESCE(search_query, '')))
    END
  LIMIT page_size
  OFFSET offset_val;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get active deals
CREATE OR REPLACE FUNCTION get_active_marketplace_deals(
  supplier_slug_filter TEXT DEFAULT NULL,
  deal_type_filter TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  product_id UUID,
  product_name TEXT,
  product_image TEXT,
  product_url TEXT,
  supplier_id UUID,
  supplier_name TEXT,
  supplier_slug TEXT,
  deal_type VARCHAR,
  original_price DECIMAL,
  deal_price DECIMAL,
  discount_percentage DECIMAL,
  title TEXT,
  description TEXT,
  expires_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.product_id,
    p.name as product_name,
    p.image_url as product_image,
    p.product_url,
    d.supplier_id,
    s.name::TEXT as supplier_name,
    s.slug::TEXT as supplier_slug,
    d.deal_type,
    d.original_price,
    d.deal_price,
    d.discount_percentage,
    d.title,
    d.description,
    d.expires_at
  FROM public.marketplace_deals d
  JOIN public.marketplace_suppliers s ON d.supplier_id = s.id
  LEFT JOIN public.marketplace_products p ON d.product_id = p.id
  WHERE
    d.is_active = TRUE
    AND d.expires_at > NOW()
    AND (supplier_slug_filter IS NULL OR s.slug = supplier_slug_filter)
    AND (deal_type_filter IS NULL OR d.deal_type = deal_type_filter)
  ORDER BY d.discount_percentage DESC, d.expires_at ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get valid coupons
CREATE OR REPLACE FUNCTION get_valid_marketplace_coupons(
  supplier_slug_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  supplier_id UUID,
  supplier_name TEXT,
  supplier_slug TEXT,
  code VARCHAR,
  description TEXT,
  discount_type VARCHAR,
  discount_value DECIMAL,
  minimum_spend DECIMAL,
  valid_until TIMESTAMPTZ,
  is_verified BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.supplier_id,
    s.name::TEXT as supplier_name,
    s.slug::TEXT as supplier_slug,
    c.code,
    c.description,
    c.discount_type,
    c.discount_value,
    c.minimum_spend,
    c.valid_until,
    c.is_verified
  FROM public.marketplace_coupon_codes c
  JOIN public.marketplace_suppliers s ON c.supplier_id = s.id
  WHERE
    (c.valid_until IS NULL OR c.valid_until > NOW())
    AND (supplier_slug_filter IS NULL OR s.slug = supplier_slug_filter)
  ORDER BY c.is_verified DESC, c.discount_value DESC;
END;
$$ LANGUAGE plpgsql STABLE;
