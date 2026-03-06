-- ============================================================================
-- Elec-Pipeline: product_type column + pipeline_run_log table + seed suppliers
-- ============================================================================

-- 1. Add product_type to marketplace_products
-- Classifies products as materials (cable, sockets, MCBs) vs tools (drills, testers)
ALTER TABLE public.marketplace_products
ADD COLUMN IF NOT EXISTS product_type VARCHAR(20) DEFAULT 'material';

-- Add check constraint (safe: does nothing if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'marketplace_products_product_type_check'
  ) THEN
    ALTER TABLE public.marketplace_products
    ADD CONSTRAINT marketplace_products_product_type_check
    CHECK (product_type IN ('material', 'tool', 'accessory', 'ppe'));
  END IF;
END $$;

-- Index for filtering by type
CREATE INDEX IF NOT EXISTS idx_marketplace_products_type
ON public.marketplace_products(product_type);

-- Composite index for type + category queries
CREATE INDEX IF NOT EXISTS idx_marketplace_products_type_category
ON public.marketplace_products(product_type, category);


-- 2. Create pipeline_run_log table
-- Tracks every pipeline execution for monitoring and debugging
CREATE TABLE IF NOT EXISTS public.pipeline_run_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_name TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'running'
    CHECK (status IN ('running', 'completed', 'failed')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  records_found INTEGER DEFAULT 0,
  records_inserted INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  errors JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pipeline_run_log_name
ON public.pipeline_run_log(pipeline_name);

CREATE INDEX IF NOT EXISTS idx_pipeline_run_log_started
ON public.pipeline_run_log(started_at DESC);

-- RLS: public read, service_role full access
ALTER TABLE public.pipeline_run_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pipeline runs"
  ON public.pipeline_run_log FOR SELECT USING (true);

CREATE POLICY "Service role manages pipeline runs"
  ON public.pipeline_run_log FOR ALL
  USING (auth.role() = 'service_role');


-- 3. Seed missing suppliers (Yesss, Electric Center, Rexel)
INSERT INTO public.marketplace_suppliers (name, slug, website_url, scrape_enabled)
VALUES
  ('Yesss Electrical', 'yesss', 'https://www.yesss.co.uk', true),
  ('Electric Center', 'electric-center', 'https://www.electriccenter.com', true),
  ('Rexel UK', 'rexel', 'https://www.rexel.co.uk', true)
ON CONFLICT (slug) DO NOTHING;
