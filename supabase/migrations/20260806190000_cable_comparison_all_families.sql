-- Cable price comparison across all families with the depth to support it.
-- Applied to production 2026-08-06. Supersedes 20260806180000.
--
-- WHY SPEC AND NOT NAME: of 13,631 products only TWO names appear at more than
-- one supplier — every wholesaler writes them differently. But the spec is in
-- the name and parses: 278 of 280 twin-and-earth products yield a mm² figure.
--
-- WHY £/m: it is the only way a 10m coil, a 50m reel, a 100m drum, a multipack
-- and a cut-to-length price can be compared at all.
--
-- FAMILIES INCLUDED (checked for depth first):
--   twin & earth  245 offers / 6 suppliers
--   SWA           192 / 6
--   flex          270 / 5
--   singles        87 / 4
-- All commodities: 3-core 2.5mm² SWA is 3-core 2.5mm² SWA whoever sells it.
--
-- REJECTED — conduit and trunking. Once segmented by type (galvanised steel is
-- not a substitute for oval PVC) depth collapses to 2-4 offers per size, and
-- the price data at that depth is not sound: TLC lists "20mm Electroflex
-- Flexible Conduit 30M" at £2.30 — 7.7p/m against Toolstation's 33p/m. A
-- comparison nobody can rely on is worse than no comparison.
--
-- THREE PARSING TRAPS, each of which produced a plausible but WRONG cheapest:
--   1. Alternation order. `(m|metre|...)` matched the M of "Metre" then failed
--      the rest, so "100 Metre Drum" never parsed. Longest branch first.
--   2. Postgres treats \b as a BACKSPACE, not a word boundary — it is \m / \y.
--      That branch silently never matched and survived a first round of fixes.
--   3. B&Q's "(From 100 Metre Drum)" is a PER-METRE price; the 100m is the drum
--      it is cut from. Dividing by it reported 10mm² cable at 9p/m, cheaper
--      than 1mm². The giveaway is the curve: £/m must rise with conductor size.
--
-- Sanity checks that stay in: a £0.10-£60/m band, refurb/clearance excluded
-- (three rows in 131, but one was winning 2.5mm² outright), accessories
-- excluded, and a spec only appears once three or more suppliers stock it.


drop function if exists public.compare_cable_prices(numeric);
drop function if exists public.cable_comparison_sizes();
drop view if exists public.marketplace_cable_prices;

create view public.marketplace_cable_prices as
with base as (
  select
    p.id, p.name, p.brand, p.current_price, p.regular_price, p.is_on_sale,
    p.product_url, p.image_url, p.scraped_at, p.supplier_id,
    s.name as supplier_name, s.slug as supplier_slug,
    case
      when p.name ~* 'swa|armoured' then 'swa'
      when p.name ~* 'twin\s*&?(amp;)?\s*a?n?d?\s*earth|6242' then 'twin_earth'
      when p.name ~* '3183|3093|\mflex\M|flexible cord|arctic' then 'flex'
      when p.name ~* '6491|\msingles\M|tri-?rated' then 'singles'
    end as cable_family,
    (regexp_match(p.name, '([0-9]+(?:\.[0-9]+)?)\s*mm', 'i'))[1]::numeric as csa_mm2,
    coalesce(
      (regexp_match(p.name, '([0-9])\s*[- ]?core', 'i'))[1]::numeric,
      (regexp_match(p.name, '\m([2-5])\s*c\M', 'i'))[1]::numeric
    ) as cores,
    (regexp_match(
      p.name, '([0-9]{2,4})\s*(?:metres|meters|metre|meter|mtrs|mtr|m)(?![a-z²])', 'i'
    ))[1]::numeric as length_m,
    (p.name ~* '(cut to length|per\s*met|/\s*met|\mfrom\s+[0-9]*\s*(metres|meters|metre|meter|mtrs|mtr|m)\s*(drum|reel|roll|coil))')
      as sold_per_metre,
    coalesce((regexp_match(p.name, '([0-9]+)\s*pack', 'i'))[1]::numeric, 1) as pack_qty
  from public.marketplace_products p
  join public.marketplace_suppliers s on s.id = p.supplier_id
  where p.category = 'cables'
    and p.name !~* 'refurb|clearance|damaged|second\s*hand|ex-display'
    and p.name !~* '\mgland|cleat|clip|tie\M|stripper|crimp|joint|connector|marker|tool\M'
), computed as (
  select *,
    case when sold_per_metre then current_price
         else current_price / nullif(length_m * pack_qty, 0) end as ppm
  from base
  where cable_family is not null and csa_mm2 is not null
    and (sold_per_metre or length_m >= 5)
)
select
  id, name, brand, current_price, regular_price, is_on_sale,
  product_url, image_url, scraped_at,
  supplier_id, supplier_name, supplier_slug,
  cable_family, csa_mm2,
  case when cable_family in ('swa','flex') then cores end as cores,
  case when sold_per_metre then null else length_m end as length_m,
  pack_qty, sold_per_metre,
  round(ppm, 3) as price_per_metre,
  case when cable_family in ('swa','flex') and cores is not null
       then csa_mm2::text || '|' || cores::text else csa_mm2::text end as spec_key,
  case when cable_family in ('swa','flex') and cores is not null
       then csa_mm2::text || 'mm² ' || cores::text || '-core'
       else csa_mm2::text || 'mm²' end as spec_label
from computed
where ppm between 0.10 and 60
  and (cable_family not in ('swa','flex') or cores is not null);

grant select on public.marketplace_cable_prices to anon, authenticated;

create or replace function public.cable_comparison_specs(p_family text default 'twin_earth')
returns table (
  spec_key text, spec_label text, csa_mm2 numeric, cores numeric,
  supplier_count bigint, offer_count bigint,
  cheapest_per_metre numeric, dearest_per_metre numeric, saving_per_100m numeric
)
language sql stable security invoker set search_path to 'public'
as $$
  select spec_key, min(spec_label), min(csa_mm2), min(cores),
         count(distinct supplier_id), count(*),
         min(price_per_metre), max(price_per_metre),
         round((max(price_per_metre) - min(price_per_metre)) * 100, 2)
  from public.marketplace_cable_prices
  where cable_family = p_family
  group by spec_key
  having count(distinct supplier_id) >= 3
  order by min(csa_mm2), min(cores) nulls first;
$$;

create or replace function public.cable_families()
returns table (family text, label text, spec_count bigint, supplier_count bigint)
language sql stable security invoker set search_path to 'public'
as $$
  with usable as (
    select cable_family, spec_key, count(distinct supplier_id) as suppliers
    from public.marketplace_cable_prices
    group by cable_family, spec_key
    having count(distinct supplier_id) >= 3
  )
  select u.cable_family,
    case u.cable_family
      when 'twin_earth' then 'Twin & earth' when 'swa' then 'SWA'
      when 'flex' then 'Flex' when 'singles' then 'Singles'
      else initcap(u.cable_family) end,
    count(*)::bigint, max(u.suppliers)::bigint
  from usable u group by u.cable_family order by count(*) desc;
$$;

create or replace function public.compare_cable_prices(p_family text, p_spec_key text)
returns table (
  supplier_name text, supplier_slug text, product_name text, brand text,
  price_per_metre numeric, current_price numeric, length_m numeric,
  pack_qty numeric, sold_per_metre boolean, product_url text, image_url text,
  scraped_at timestamptz, is_cheapest boolean, pct_above_cheapest numeric
)
language sql stable security invoker set search_path to 'public'
as $$
  with best as (
    select distinct on (c.supplier_id)
      c.supplier_name, c.supplier_slug, c.name, c.brand, c.price_per_metre,
      c.current_price, c.length_m, c.pack_qty, c.sold_per_metre,
      c.product_url, c.image_url, c.scraped_at
    from public.marketplace_cable_prices c
    where c.cable_family = p_family and c.spec_key = p_spec_key
    order by c.supplier_id, c.price_per_metre asc
  ), floor_price as (select min(price_per_metre) as p from best)
  select b.supplier_name, b.supplier_slug, b.name, b.brand, b.price_per_metre,
         b.current_price, b.length_m, b.pack_qty, b.sold_per_metre,
         b.product_url, b.image_url, b.scraped_at,
         b.price_per_metre = f.p,
         case when f.p > 0 then round(((b.price_per_metre - f.p) / f.p) * 100, 0) else 0 end
  from best b cross join floor_price f order by b.price_per_metre asc;
$$;

grant execute on function public.cable_comparison_specs(text) to anon, authenticated;
grant execute on function public.cable_families() to anon, authenticated;
grant execute on function public.compare_cable_prices(text, text) to anon, authenticated;
