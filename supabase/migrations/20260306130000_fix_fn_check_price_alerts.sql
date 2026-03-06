-- Fix fn_check_price_alerts: cast varchar(100) columns to text
-- to match PostgREST expectations and avoid type mismatch errors.

-- Ensure the marketplace_price_alerts table exists
CREATE TABLE IF NOT EXISTS public.marketplace_price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.marketplace_products(id) ON DELETE CASCADE,
  price_when_saved DECIMAL(10,2) NOT NULL,
  last_alerted_price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- RLS
ALTER TABLE public.marketplace_price_alerts ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own alerts
CREATE POLICY IF NOT EXISTS "Users manage own price alerts"
  ON public.marketplace_price_alerts
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role full access
CREATE POLICY IF NOT EXISTS "Service role full access price alerts"
  ON public.marketplace_price_alerts
  FOR ALL
  USING (auth.role() = 'service_role');

-- Fix the function: explicitly cast all varchar columns to text
CREATE OR REPLACE FUNCTION fn_check_price_alerts(p_user_id UUID)
RETURNS TABLE (
  alert_id UUID,
  product_id UUID,
  product_name TEXT,
  product_brand TEXT,
  product_url TEXT,
  image_url TEXT,
  supplier_name TEXT,
  current_price DECIMAL,
  price_when_saved DECIMAL,
  price_drop_pct DECIMAL,
  savings DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id AS alert_id,
    a.product_id,
    p.name AS product_name,
    p.brand::TEXT AS product_brand,
    p.product_url AS product_url,
    p.image_url AS image_url,
    s.name::TEXT AS supplier_name,
    p.current_price,
    a.price_when_saved,
    ROUND(((a.price_when_saved - p.current_price) / a.price_when_saved) * 100, 1) AS price_drop_pct,
    ROUND(a.price_when_saved - p.current_price, 2) AS savings
  FROM public.marketplace_price_alerts a
  JOIN public.marketplace_products p ON a.product_id = p.id
  JOIN public.marketplace_suppliers s ON p.supplier_id = s.id
  WHERE
    a.user_id = p_user_id
    AND a.is_active = TRUE
    AND p.current_price IS NOT NULL
    AND p.current_price < a.price_when_saved
    AND (a.last_alerted_price IS NULL OR p.current_price < a.last_alerted_price);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
