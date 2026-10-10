-- 10 Oct 2026 — applied live. Cable searches ignored the conductor size:
-- "2.5mm²" was cleaned to "2 5mm", the strict AND pass never matched, and the
-- loose OR pass returned any twin & earth — a 6.0mm² 3 m length came first
-- for every size from 1.0 to 4.0 and was priced as a per-metre rate (£10.98/m
-- on rewires). Now a size in the query is a hard filter on the product name
-- and is taken out of the text search so the strict pass can match. The
-- drum/coil rank penalty is gone: cost-engineer-core divides by the stated
-- length (statedCableLength / parseContainerSize).
CREATE OR REPLACE FUNCTION public.cost_engineer_match_product(query_text text, category_filter text DEFAULT NULL::text, product_type_filter text DEFAULT 'material'::text, match_count integer DEFAULT 5)
 RETURNS TABLE(id uuid, name text, brand text, category text, subcategory text, current_price numeric, regular_price numeric, is_on_sale boolean, discount_percentage numeric, product_url text, image_url text, stock_status text, scraped_at timestamp with time zone, supplier_name text, supplier_slug text, rank numeric, match_mode text)
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'public'
AS $function$
DECLARE
  src            text;
  cleaned        text;
  ts_q_strict    tsquery;
  ts_q_loose     tsquery;
  is_cables      boolean;
  size_tok       text;
  size_re        text;
BEGIN
  src := replace(lower(coalesce(query_text, '')), '²', '2');

  size_tok := (regexp_match(src, '(?:^|[^0-9.])(1\.0|1\.5|2\.5|4\.0|4|6\.0|6|10|16|25|35)\s*mm'))[1];
  IF size_tok IS NOT NULL THEN
    size_re := '(^|[^0-9.])(' || CASE size_tok
                 WHEN '1.0' THEN '1|1\.0' WHEN '4' THEN '4|4\.0' WHEN '4.0' THEN '4|4\.0'
                 WHEN '6' THEN '6|6\.0' WHEN '6.0' THEN '6|6\.0'
                 WHEN '10' THEN '10|10\.0' WHEN '16' THEN '16|16\.0'
                 ELSE replace(size_tok, '.', '\.') END || ')\s*mm';
    src := regexp_replace(src, '(1\.0|1\.5|2\.5|4\.0|4|6\.0|6|10|16|25|35)\s*mm2?', ' ', 'g');
  END IF;

  cleaned := regexp_replace(src, '[^a-z0-9\s]+', ' ', 'g');
  IF length(trim(cleaned)) = 0 THEN
    RETURN;
  END IF;

  BEGIN
    ts_q_strict := plainto_tsquery('english', cleaned);
  EXCEPTION WHEN OTHERS THEN
    ts_q_strict := NULL;
  END;

  BEGIN
    IF ts_q_strict IS NOT NULL THEN
      ts_q_loose := to_tsquery('english', replace(ts_q_strict::text, ' & ', ' | '));
    END IF;
  EXCEPTION WHEN OTHERS THEN
    ts_q_loose := NULL;
  END;

  is_cables := (category_filter = 'cables');

  RETURN QUERY
  SELECT * FROM (
    SELECT p.id, p.name::text, p.brand::text, p.category::text, p.subcategory::text,
      p.current_price, p.regular_price, p.is_on_sale, p.discount_percentage,
      p.product_url::text, p.image_url::text, p.stock_status::text, p.scraped_at,
      s.name::text AS supplier_name, s.slug::text AS supplier_slug,
      (
        ts_rank_cd(p.search_vector, ts_q_strict)
        + CASE WHEN is_cables AND p.name ILIKE '%cut to length%' THEN 0.5
               WHEN is_cables AND p.name ILIKE '%per metre%'    THEN 0.5
               WHEN is_cables AND p.name ILIKE '%/m%'           THEN 0.3
               ELSE 0 END
      )::numeric AS rank,
      'strict'::text AS match_mode
    FROM public.marketplace_products p
    JOIN public.marketplace_suppliers s ON s.id = p.supplier_id
    WHERE p.product_type = product_type_filter
      AND p.current_price IS NOT NULL AND p.current_price > 0
      AND (p.expires_at IS NULL OR p.expires_at >= now())
      AND lower(coalesce(p.stock_status, 'unknown')) NOT IN ('out of stock', 'out_of_stock', 'discontinued', 'unavailable', 'sold out')
      AND s.scrape_enabled = true
      AND (category_filter IS NULL OR p.category = category_filter)
      AND p.name NOT IN ('brands', 'categories', 'all products')
      AND (size_re IS NULL OR lower(replace(p.name, '²', '2')) ~ size_re)
      AND ts_q_strict IS NOT NULL
      AND p.search_vector @@ ts_q_strict
    ORDER BY rank DESC NULLS LAST, p.current_price ASC
    LIMIT match_count
  ) strict_hits;

  IF FOUND THEN RETURN; END IF;

  RETURN QUERY
  SELECT * FROM (
    SELECT p.id, p.name::text, p.brand::text, p.category::text, p.subcategory::text,
      p.current_price, p.regular_price, p.is_on_sale, p.discount_percentage,
      p.product_url::text, p.image_url::text, p.stock_status::text, p.scraped_at,
      s.name::text AS supplier_name, s.slug::text AS supplier_slug,
      (
        ts_rank_cd(p.search_vector, ts_q_loose)
        + CASE WHEN is_cables AND p.name ILIKE '%cut to length%' THEN 0.5
               WHEN is_cables AND p.name ILIKE '%per metre%'    THEN 0.5
               WHEN is_cables AND p.name ILIKE '%/m%'           THEN 0.3
               ELSE 0 END
      )::numeric AS rank,
      'loose'::text AS match_mode
    FROM public.marketplace_products p
    JOIN public.marketplace_suppliers s ON s.id = p.supplier_id
    WHERE p.product_type = product_type_filter
      AND p.current_price IS NOT NULL AND p.current_price > 0
      AND (p.expires_at IS NULL OR p.expires_at >= now())
      AND lower(coalesce(p.stock_status, 'unknown')) NOT IN ('out of stock', 'out_of_stock', 'discontinued', 'unavailable', 'sold out')
      AND s.scrape_enabled = true
      AND (category_filter IS NULL OR p.category = category_filter)
      AND p.name NOT IN ('brands', 'categories', 'all products')
      AND (size_re IS NULL OR lower(replace(p.name, '²', '2')) ~ size_re)
      AND ts_q_loose IS NOT NULL
      AND p.search_vector @@ ts_q_loose
    ORDER BY rank DESC NULLS LAST, p.current_price ASC
    LIMIT match_count
  ) loose_hits;
END;
$function$;
