-- Compare cable across suppliers by SPEC, normalised to £ per metre.
--
-- Matching products by name is hopeless: of 13,631 products only TWO names
-- appear at more than one supplier, because every wholesaler writes them
-- differently ("6242Y Grey 2.5mm² Twin & Earth 100m Drum" vs "2.5mm² 6242Y
-- Twin & Earth - 100m Reel"). But the spec that decides comparability — the
-- conductor size and the length — is reliably inside the name: 278 of 280
-- twin-and-earth products yield a mm² figure.
--
-- Normalising to £/m is what makes a 10m coil, a 50m reel, a 100m drum and a
-- cut-to-length price comparable at all, and it is where the money is: on live
-- data the same 2.5mm² cable runs from £0.89/m to £2.32/m by supplier.
--
-- Applied to production 2026-08-06.

create or replace view public.marketplace_cable_prices as
with parsed as (
  select
    p.id, p.name, p.brand, p.current_price, p.regular_price, p.is_on_sale,
    p.product_url, p.image_url, p.scraped_at, p.supplier_id,
    s.name as supplier_name, s.slug as supplier_slug,

    (regexp_match(p.name, '([0-9]+(?:\.[0-9]+)?)\s*mm', 'i'))[1]::numeric as csa_mm2,

    -- Longest-first alternation: with `m` leading, "100 Metre Drum" matched
    -- only the M and the rest of the pattern then failed.
    (regexp_match(
      p.name,
      '([0-9]{2,4})\s*(?:metres|meters|metre|meter|mtrs|mtr|m)(?![a-z²])',
      'i'
    ))[1]::numeric as length_m,

    -- Sold by the metre. B&Q's "(From 100 Metre Drum)" is the trap: the 100m
    -- is the drum it is cut from, not what you buy, so dividing by it reported
    -- 10mm² cable at 9p/m — cheaper than 1mm².
    --
    -- `\m` is Postgres's word boundary. `\b` is a BACKSPACE here, not a
    -- boundary as in most other flavours, so that branch silently never
    -- matched and the bad figure survived a first round of fixes.
    (p.name ~* '(cut to length|per\s*met|/\s*met|\mfrom\s+[0-9]*\s*(metres|meters|metre|meter|mtrs|mtr|m)\s*(drum|reel|roll|coil))')
      as sold_per_metre
  from public.marketplace_products p
  join public.marketplace_suppliers s on s.id = p.supplier_id
  -- `&amp;` survives in scraped names, so "Twin &amp; Earth" must match too —
  -- worth four extra offers on 1.5mm² alone.
  where p.name ~* 'twin\s*&?(amp;)?\s*a?n?d?\s*earth|6242'
    -- Refurbished stock was winning the 2.5mm² comparison outright. Three rows
    -- in 131, decisive in effect, because the whole feature is "who is
    -- cheapest" and it is not a like-for-like price.
    and p.name !~* 'refurb|clearance|damaged|second\s*hand|ex-display'
)
select
  id, name, brand, current_price, regular_price, is_on_sale,
  product_url, image_url, scraped_at,
  supplier_id, supplier_name, supplier_slug,
  csa_mm2,
  case when sold_per_metre then null else length_m end as length_m,
  sold_per_metre,
  round(
    case when sold_per_metre then current_price else current_price / length_m end, 3
  ) as price_per_metre
from parsed
where csa_mm2 is not null
  and (sold_per_metre or length_m >= 5)
  -- Copper twin-and-earth is never 2p a metre nor £80 a metre; outside this
  -- band it is a parse failure, not a bargain.
  and (case when sold_per_metre then current_price else current_price / length_m end)
      between 0.10 and 60;

comment on view public.marketplace_cable_prices is
  'Twin-and-earth cable normalised to £ per metre so drums, reels and cut-to-length are comparable across suppliers.';

grant select on public.marketplace_cable_prices to anon, authenticated;

-- The cheapest offer from each supplier, for one conductor size. One row per
-- supplier rather than every listing: an electrician wants "who is cheapest for
-- 2.5mm² today", not twenty variations of the same drum.
create or replace function public.compare_cable_prices(p_csa numeric)
returns table (
  supplier_name text, supplier_slug text, product_name text, brand text,
  price_per_metre numeric, current_price numeric, length_m numeric,
  sold_per_metre boolean, product_url text, image_url text,
  scraped_at timestamptz, is_cheapest boolean, pct_above_cheapest numeric
)
language sql stable security invoker set search_path to 'public'
as $$
  with best_per_supplier as (
    select distinct on (c.supplier_id)
      c.supplier_name, c.supplier_slug, c.name as product_name, c.brand,
      c.price_per_metre, c.current_price, c.length_m, c.sold_per_metre,
      c.product_url, c.image_url, c.scraped_at
    from public.marketplace_cable_prices c
    where c.csa_mm2 = p_csa
    order by c.supplier_id, c.price_per_metre asc
  ), cheapest as (
    select min(price_per_metre) as floor_price from best_per_supplier
  )
  select
    b.supplier_name, b.supplier_slug, b.product_name, b.brand,
    b.price_per_metre, b.current_price, b.length_m, b.sold_per_metre,
    b.product_url, b.image_url, b.scraped_at,
    b.price_per_metre = c.floor_price as is_cheapest,
    case when c.floor_price > 0
      then round(((b.price_per_metre - c.floor_price) / c.floor_price) * 100, 0)
      else 0 end as pct_above_cheapest
  from best_per_supplier b cross join cheapest c
  order by b.price_per_metre asc;
$$;

-- Which conductor sizes can actually be compared, and what the spread is.
create or replace function public.cable_comparison_sizes()
returns table (
  csa_mm2 numeric, supplier_count bigint, offer_count bigint,
  cheapest_per_metre numeric, dearest_per_metre numeric, saving_per_100m numeric
)
language sql stable security invoker set search_path to 'public'
as $$
  select
    csa_mm2,
    count(distinct supplier_id), count(*),
    min(price_per_metre), max(price_per_metre),
    round((max(price_per_metre) - min(price_per_metre)) * 100, 2)
  from public.marketplace_cable_prices
  group by csa_mm2
  having count(distinct supplier_id) > 1
  order by csa_mm2;
$$;

grant execute on function public.compare_cable_prices(numeric) to anon, authenticated;
grant execute on function public.cable_comparison_sizes() to anon, authenticated;
