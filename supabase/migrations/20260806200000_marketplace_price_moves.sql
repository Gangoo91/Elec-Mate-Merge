-- Recent price movements, from the history the scraper already writes.
-- Applied to production 2026-08-06.
--
-- WHY: `is_on_sale` is set on ONE of 2,089 tools, so Deal of the Day, the Deals
-- section and the Deals filter are all empty on the Tools page. Price history
-- does not need a supplier to flag a sale — it sees the price change. That
-- turns 1 tool "deal" into 33 drops and 38 rises in a month.
--
-- RISES GET EQUAL BILLING. Over 90 days there were 1,429 rises against 818
-- drops. An electrician quoting from a price book set a few months ago is
-- losing margin on every job and nothing in the app told them.
--
-- The junk filter matters: the scraper writes promotional labels as products —
-- 103 rows named "10%Off", "15%Off", "45%Off", all from one supplier — and one
-- surfaced straight into the drop feed as a buyable item. The same filter was
-- added to marketplace-search (products, count and deal-of-the-day queries),
-- which removed 134 junk rows from the grids: materials 11,059 -> 10,970,
-- tools 2,245 -> 2,200. Worth fixing at the scraper too.

create or replace function public.marketplace_price_moves(
  p_product_type text default null,   -- 'tools' | 'materials' | null
  p_direction text default 'down',    -- 'down' | 'up'
  p_days integer default 30,
  p_min_pct numeric default 5,        -- ignore noise
  p_limit integer default 12
)
returns table (
  product_id uuid, name text, brand text, category text,
  supplier_name text, supplier_slug text, image_url text, product_url text,
  old_price numeric, new_price numeric, current_price numeric,
  change_percentage numeric, recorded_at timestamptz
)
language sql stable security invoker set search_path to 'public'
as $$
  with latest as (
    -- One row per product: the most recent move. A product that moved three
    -- times in a fortnight appears once, showing where it ended up.
    select distinct on (h.product_id)
      h.product_id, h.old_price, h.new_price, h.change_percentage, h.recorded_at
    from public.marketplace_price_history h
    where h.recorded_at > now() - make_interval(days => p_days)
      and h.new_price > 0 and h.change_percentage is not null
    order by h.product_id, h.recorded_at desc
  )
  select
    p.id, p.name::text, p.brand::text, p.category::text,
    s.name::text, s.slug::text, p.image_url::text, p.product_url::text,
    l.old_price, l.new_price, p.current_price,
    round(l.change_percentage, 1), l.recorded_at
  from latest l
  join public.marketplace_products p on p.id = l.product_id
  join public.marketplace_suppliers s on s.id = p.supplier_id
  where
    -- The move must still be true. If the price moved on again since, the
    -- headline would quote a saving the electrician can no longer get.
    abs(p.current_price - l.new_price) < 0.01
    and case
          when p_direction = 'up' then l.change_percentage >= p_min_pct
          else l.change_percentage <= -p_min_pct
        end
    and (
      p_product_type is null
      or (p_product_type = 'tools' and p.category::text = any(
            array['hand-tools','power-tools','test-equipment','ppe','tool-storage']))
      or (p_product_type = 'materials' and p.category::text = any(
            array['cables','consumer-units','circuit-protection','wiring-accessories',
                  'lighting','containment','earthing','fire-security','ev-charging',
                  'data-networking','fixings','hvac']))
    )
    and (p.expires_at is null or p.expires_at >= now())
    -- Promotional labels the scraper mistook for products.
    and p.name !~* '^\s*[0-9]{1,3}\s*%\s*off\s*$'
    and p.name !~* '^\s*(sale|clearance|offers?|deals?|new|brands?|categories|all products|shop all|view all)\s*$'
    and length(btrim(p.name)) >= 6
    -- A photo is most of a product card; without one the row is a line of text
    -- claiming a discount, which is what the junk rows looked like.
    and p.image_url is not null
  order by abs(l.change_percentage) desc, l.recorded_at desc
  limit p_limit;
$$;

grant execute on function public.marketplace_price_moves(text, text, integer, numeric, integer)
  to anon, authenticated;
