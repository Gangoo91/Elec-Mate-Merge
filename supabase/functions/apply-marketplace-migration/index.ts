import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const databaseUrl = Deno.env.get("SUPABASE_DB_URL");

  if (!databaseUrl) {
    return new Response(
      JSON.stringify({ success: false, error: "Database URL not available" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }

  const sql = postgres(databaseUrl, { ssl: "require" });
  const results: string[] = [];

  try {
    // 1. Create marketplace_suppliers table
    const suppliersExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'marketplace_suppliers'
      )
    `;

    if (!suppliersExists[0].exists) {
      await sql`
        CREATE TABLE public.marketplace_suppliers (
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
        )
      `;
      results.push("Created marketplace_suppliers table");
    } else {
      results.push("marketplace_suppliers already exists");
    }

    // 2. Create marketplace_products table
    const productsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'marketplace_products'
      )
    `;

    if (!productsExists[0].exists) {
      await sql`
        CREATE TABLE public.marketplace_products (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          supplier_id UUID REFERENCES public.marketplace_suppliers(id) ON DELETE CASCADE,
          sku VARCHAR(100),
          name TEXT NOT NULL,
          brand VARCHAR(100),
          category VARCHAR(100),
          subcategory VARCHAR(100),
          current_price DECIMAL(10,2),
          regular_price DECIMAL(10,2),
          currency VARCHAR(3) DEFAULT 'GBP',
          is_on_sale BOOLEAN DEFAULT FALSE,
          discount_percentage DECIMAL(5,2),
          description TEXT,
          highlights TEXT[],
          image_url TEXT,
          product_url TEXT NOT NULL,
          stock_status VARCHAR(50) DEFAULT 'unknown',
          stock_quantity INTEGER,
          scraped_at TIMESTAMPTZ DEFAULT NOW(),
          expires_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          CONSTRAINT unique_supplier_sku UNIQUE (supplier_id, sku)
        )
      `;
      results.push("Created marketplace_products table");

      // Add search_vector column
      await sql`
        ALTER TABLE public.marketplace_products
        ADD COLUMN search_vector TSVECTOR
        GENERATED ALWAYS AS (
          setweight(to_tsvector('english', COALESCE(name, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(brand, '')), 'A') ||
          setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
          setweight(to_tsvector('english', COALESCE(category, '')), 'C')
        ) STORED
      `;
      results.push("Added search_vector column");
    } else {
      results.push("marketplace_products already exists");
    }

    // 3. Create marketplace_coupon_codes table
    const couponsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'marketplace_coupon_codes'
      )
    `;

    if (!couponsExists[0].exists) {
      await sql`
        CREATE TABLE public.marketplace_coupon_codes (
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
          CONSTRAINT unique_supplier_code UNIQUE (supplier_id, code)
        )
      `;
      results.push("Created marketplace_coupon_codes table");
    } else {
      results.push("marketplace_coupon_codes already exists");
    }

    // 4. Create marketplace_deals table
    const dealsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'marketplace_deals'
      )
    `;

    if (!dealsExists[0].exists) {
      await sql`
        CREATE TABLE public.marketplace_deals (
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
        )
      `;
      results.push("Created marketplace_deals table");
    } else {
      results.push("marketplace_deals already exists");
    }

    // 5. Create marketplace_scrape_jobs table
    const jobsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'marketplace_scrape_jobs'
      )
    `;

    if (!jobsExists[0].exists) {
      await sql`
        CREATE TABLE public.marketplace_scrape_jobs (
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
        )
      `;
      results.push("Created marketplace_scrape_jobs table");
    } else {
      results.push("marketplace_scrape_jobs already exists");
    }

    // 6. Create indexes
    try {
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_products_search ON public.marketplace_products USING GIN(search_vector)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_products_category ON public.marketplace_products(category)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_products_supplier ON public.marketplace_products(supplier_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_products_price ON public.marketplace_products(current_price)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_products_sale ON public.marketplace_products(is_on_sale) WHERE is_on_sale = TRUE`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_products_brand ON public.marketplace_products(brand)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_coupons_supplier ON public.marketplace_coupon_codes(supplier_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_deals_active ON public.marketplace_deals(is_active, expires_at) WHERE is_active = TRUE`;
      await sql`CREATE INDEX IF NOT EXISTS idx_marketplace_deals_supplier ON public.marketplace_deals(supplier_id)`;
      results.push("Created indexes");
    } catch (e: any) {
      results.push(`Index creation note: ${e.message}`);
    }

    // 7. Enable RLS
    try {
      await sql`ALTER TABLE public.marketplace_suppliers ENABLE ROW LEVEL SECURITY`;
      await sql`ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY`;
      await sql`ALTER TABLE public.marketplace_coupon_codes ENABLE ROW LEVEL SECURITY`;
      await sql`ALTER TABLE public.marketplace_deals ENABLE ROW LEVEL SECURITY`;
      await sql`ALTER TABLE public.marketplace_scrape_jobs ENABLE ROW LEVEL SECURITY`;
      results.push("Enabled RLS on all tables");
    } catch (e: any) {
      results.push(`RLS note: ${e.message}`);
    }

    // 8. Create RLS policies
    try {
      await sql`CREATE POLICY IF NOT EXISTS "Public read access for suppliers" ON public.marketplace_suppliers FOR SELECT USING (true)`;
      await sql`CREATE POLICY IF NOT EXISTS "Public read access for products" ON public.marketplace_products FOR SELECT USING (true)`;
      await sql`CREATE POLICY IF NOT EXISTS "Public read access for coupons" ON public.marketplace_coupon_codes FOR SELECT USING (true)`;
      await sql`CREATE POLICY IF NOT EXISTS "Public read access for deals" ON public.marketplace_deals FOR SELECT USING (true)`;
      await sql`CREATE POLICY IF NOT EXISTS "Service role full access suppliers" ON public.marketplace_suppliers FOR ALL USING (auth.role() = 'service_role')`;
      await sql`CREATE POLICY IF NOT EXISTS "Service role full access products" ON public.marketplace_products FOR ALL USING (auth.role() = 'service_role')`;
      await sql`CREATE POLICY IF NOT EXISTS "Service role full access coupons" ON public.marketplace_coupon_codes FOR ALL USING (auth.role() = 'service_role')`;
      await sql`CREATE POLICY IF NOT EXISTS "Service role full access deals" ON public.marketplace_deals FOR ALL USING (auth.role() = 'service_role')`;
      await sql`CREATE POLICY IF NOT EXISTS "Service role full access scrape jobs" ON public.marketplace_scrape_jobs FOR ALL USING (auth.role() = 'service_role')`;
      results.push("Created RLS policies");
    } catch (e: any) {
      results.push(`RLS policies note: ${e.message}`);
    }

    // 9. Seed suppliers
    try {
      await sql`
        INSERT INTO public.marketplace_suppliers (name, slug, website_url, logo_url, deals_page_url, coupons_page_url, scrape_enabled, scrape_config)
        VALUES
          ('Screwfix', 'screwfix', 'https://www.screwfix.com', '/suppliers/screwfix-logo.png', 'https://www.screwfix.com/search?search=deals', NULL, true, '{"selectors": {}}'),
          ('Toolstation', 'toolstation', 'https://www.toolstation.com', '/suppliers/toolstation-logo.png', 'https://www.toolstation.com/deals', NULL, true, '{"selectors": {}}'),
          ('CEF', 'cef', 'https://www.cef.co.uk', '/suppliers/cef-logo.png', 'https://www.cef.co.uk/offers', NULL, true, '{"selectors": {}}'),
          ('ElectricalDirect', 'electrical-direct', 'https://www.electricaldirect.co.uk', '/suppliers/electrical-direct-logo.png', 'https://www.electricaldirect.co.uk/deals', 'https://www.electricaldirect.co.uk/voucher-codes', true, '{"selectors": {}}'),
          ('RS Components', 'rs-components', 'https://uk.rs-online.com', '/suppliers/rs-logo.png', 'https://uk.rs-online.com/web/c/offers/', NULL, true, '{"selectors": {}}'),
          ('TLC Electrical', 'tlc-electrical', 'https://www.tlc-direct.co.uk', '/suppliers/tlc-logo.png', 'https://www.tlc-direct.co.uk/sale', NULL, true, '{"selectors": {}}'),
          ('Edmundson Electrical', 'edmundson', 'https://www.edmundson-electrical.co.uk', '/suppliers/edmundson-logo.png', NULL, NULL, false, '{"trade_only": true}')
        ON CONFLICT (slug) DO UPDATE SET
          website_url = EXCLUDED.website_url,
          deals_page_url = EXCLUDED.deals_page_url,
          coupons_page_url = EXCLUDED.coupons_page_url,
          updated_at = NOW()
      `;
      results.push("Seeded suppliers data");
    } catch (e: any) {
      results.push(`Suppliers seed note: ${e.message}`);
    }

    await sql.end();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Marketplace migration completed",
        results
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err: any) {
    await sql.end();
    console.error("Migration error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        results
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
