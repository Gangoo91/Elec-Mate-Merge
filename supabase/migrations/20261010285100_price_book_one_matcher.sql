-- Gap analysis §4 item 5: three price-book importers, three ways of deciding
-- whether a row is "already in the price book".
--
--   * Price book › Import (import_firm_price_book, ELE-1991, in HEAD):
--     lower-case name with runs of spaces squeezed.
--   * Wholesalers › Import prices (preview/_supplier_apply_prices, ELE-2066):
--     product code (_sp_code), then the name with punctuation stripped
--     (_sp_norm), then a similar name for a person to tick.
--   * Bring your data across (import_firm_rows price_book, ELE-2067):
--     _imp_name, the same as the first but a different function.
--
-- So "RCBO, 32A (B)" was a new item to one importer and a match to another,
-- and a product code only counted in the wholesaler flow.
--
-- Now there is ONE matcher, _price_book_find(firm, code, name), built on the
-- wholesaler engine's own helpers: the product code first (the item's
-- supplier_code, or the code an earlier import stored), then the normalised
-- name. The wholesaler flow already matches this way (its extra "linked" and
-- "similar" tiers are for a person to confirm, so they stay there). The other
-- two importers now call _price_book_find instead of their own comparisons.
-- What each importer WRITES is unchanged: the Price book import still goes
-- through save_firm_price_book_item, the switching import still files new
-- items in "Imported from <system>" with its undo map.
--
-- Additive: one new internal function; two bodies patched in place with no
-- signature change. import_firm_price_book is called by HEAD
-- (useImportFirmPriceBook): same arguments, same {added, updated, skipped}
-- result; the only difference is that a name differing by punctuation, or a
-- row whose code matches an item's code, now updates that item instead of
-- adding a near-duplicate.

create or replace function public._price_book_find(p_firm uuid, p_code text, p_name text)
returns jsonb
language sql stable security definer set search_path to 'public' as $$
  with book as (
    select e.it, e.n, ml.created_at
      from public.materials_lists ml
      cross join lateral jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end)
                 with ordinality e(it, n)
     where ml.user_id = p_firm and jsonb_typeof(e.it) = 'object'
       and coalesce(btrim(e.it ->> 'name'), '') <> ''
  )
  select it from (
    select b.it, 1 as rank_, b.created_at, b.n from book b
     where public._sp_code(p_code) is not null and length(public._sp_code(p_code)) >= 3
       and public._sp_code(coalesce(nullif(b.it ->> 'supplier_code', ''), b.it ->> 'code')) = public._sp_code(p_code)
    union all
    select b.it, 2, b.created_at, b.n from book b
     where public._sp_norm(p_name) is not null and public._sp_norm(b.it ->> 'name') = public._sp_norm(p_name)
  ) m
  -- An item with an id (editable) beats a legacy one without.
  order by rank_, (coalesce(it ->> 'id', '') = ''), created_at, n
  limit 1
$$;
revoke all on function public._price_book_find(uuid, text, text) from public, anon, authenticated;

-- ── Price book › Import ───────────────────────────────────────────────────
do $do$
declare
  v_sig regprocedure := 'public.import_firm_price_book(uuid, jsonb)'::regprocedure;
  v_def text := pg_get_functiondef(v_sig);
  v_from text := $f$       and coalesce(it ->> 'id', '') <> ''
       and lower(regexp_replace(btrim(it ->> 'name'), '\s+', ' ', 'g'))
           = lower(regexp_replace(v_name, '\s+', ' ', 'g'))
     limit 1;$f$;
  v_to text := $t$       and coalesce(it ->> 'id', '') <> ''
       -- Gap §4.5: the one price-book matcher (code, then normalised name).
       and it ->> 'id' = (public._price_book_find(p_firm, r ->> 'code', v_name) ->> 'id')
     limit 1;$t$;
begin
  if position(v_from in v_def) = 0 then
    raise exception 'import_firm_price_book: name match text not found';
  end if;
  execute replace(v_def, v_from, v_to);
end
$do$;

-- ── Bring your data across, price book rows ───────────────────────────────
do $do$
declare
  v_sig regprocedure := 'public.import_firm_rows(uuid, text, uuid, text, jsonb, boolean)'::regprocedure;
  v_def text := pg_get_functiondef(v_sig);
  v_from text := $f$          if exists (
            select 1 from public.materials_lists ml,
                   jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) it
             where ml.user_id = p_firm and public._imp_name(it ->> 'name') = public._imp_name(v_name)) then$f$;
  v_to text := $t$          -- Gap §4.5: the one price-book matcher (code, then normalised name).
          if public._price_book_find(p_firm, public._imp_txt(r, 'code', 100), v_name) is not null then$t$;
begin
  if position(v_from in v_def) = 0 then
    raise exception 'import_firm_rows: price book match text not found';
  end if;
  execute replace(v_def, v_from, v_to);
end
$do$;
