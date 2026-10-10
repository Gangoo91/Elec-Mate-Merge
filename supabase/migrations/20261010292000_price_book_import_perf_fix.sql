-- Review #2 H1 — 285100 put _price_book_find (a SECURITY DEFINER full scan of
-- the firm's book) inside the WHERE of a scan over every book item, so it ran
-- once per item per CSV row: ~456 ms a row on a 131-item book and a timeout on
-- 1,360 items. HEAD's Price book › Import calls this. Now the book is indexed
-- ONCE per import (by code and by normalised name, with _price_book_find's
-- ranking); a product repeated within the same file falls back to
-- _price_book_find so it updates rather than adds twice. Same signature and
-- result. Proven rolled back on the 1,360-item book: 300 rows in 7.4 s (the
-- remaining cost is save_firm_price_book_item, unchanged from HEAD), an
-- existing name updates, a repeated new name adds once then updates.
-- Applied live as price_book_import_perf_fix + price_book_import_indexed_lookup.
create or replace function public.import_firm_price_book(p_firm uuid, p_rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_money boolean;
  r jsonb;
  v_name text;
  v_code_key text;
  v_name_key text;
  v_by_code jsonb;
  v_by_name jsonb;
  v_touched jsonb := '{}'::jsonb;
  v_existing jsonb;
  v_buy numeric;
  v_sell numeric;
  v_markup numeric;
  v_added int := 0;
  v_updated int := 0;
  v_skipped int := 0;
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if jsonb_typeof(p_rows) is distinct from 'array' or jsonb_array_length(p_rows) > 2000 then
    raise exception 'Import up to 2,000 rows at a time.' using errcode = '22023';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  with book as (
    select e.it, e.n, ml.created_at
      from public.materials_lists ml
      cross join lateral jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end)
                 with ordinality e(it, n)
     where ml.user_id = p_firm and jsonb_typeof(e.it) = 'object'
       and coalesce(btrim(e.it ->> 'name'), '') <> ''
  ), keyed as (
    select public._sp_code(coalesce(nullif(it ->> 'supplier_code', ''), it ->> 'code')) ck,
           public._sp_norm(it ->> 'name') nk, it, n, created_at,
           (coalesce(it ->> 'id', '') = '') no_id
      from book
  )
  select
    (select jsonb_object_agg(ck, it) from (
       select distinct on (ck) ck, it from keyed
        where ck is not null and length(ck) >= 3
        order by ck, no_id, created_at, n) a),
    (select jsonb_object_agg(nk, it) from (
       select distinct on (nk) nk, it from keyed
        where nk is not null
        order by nk, no_id, created_at, n) b)
  into v_by_code, v_by_name;
  v_by_code := coalesce(v_by_code, '{}'::jsonb);
  v_by_name := coalesce(v_by_name, '{}'::jsonb);

  for r in select * from jsonb_array_elements(p_rows) loop
    v_name := btrim(coalesce(r ->> 'name', ''));
    v_buy := case when v_money then public._pb_num(r, 'buy') end;
    v_sell := public._pb_num(r, 'sell');
    v_markup := case when v_money then public._pb_num(r, 'markup') end;
    if v_name = '' or length(v_name) > 300
       or coalesce(v_buy, 0) < 0 or coalesce(v_sell, 0) < 0 or coalesce(v_markup, 0) < 0
       or (coalesce(v_buy, 0) = 0 and coalesce(v_sell, 0) = 0) then
      v_skipped := v_skipped + 1;
      continue;
    end if;

    v_code_key := public._sp_code(r ->> 'code');
    if v_code_key is not null and length(v_code_key) < 3 then v_code_key := null; end if;
    v_name_key := public._sp_norm(v_name);

    if (v_code_key is not null and v_touched ? ('c:' || v_code_key))
       or (v_name_key is not null and v_touched ? ('n:' || v_name_key)) then
      v_existing := public._price_book_find(p_firm, r ->> 'code', v_name);
    else
      v_existing := coalesce(
        case when v_code_key is not null then v_by_code -> v_code_key end,
        case when v_name_key is not null then v_by_name -> v_name_key end);
    end if;
    if coalesce(v_existing ->> 'id', '') = '' then v_existing := null; end if;

    begin
      if v_existing is null then
        perform public.save_firm_price_book_item(
          p_firm, null, v_name, coalesce(nullif(btrim(r ->> 'unit'), ''), 'each'),
          nullif(btrim(r ->> 'category'), ''), v_sell, v_buy, v_markup,
          nullif(btrim(r ->> 'supplier'), ''), null);
        v_added := v_added + 1;
      else
        perform public.save_firm_price_book_item(
          p_firm, v_existing ->> 'id', v_existing ->> 'name',
          coalesce(nullif(btrim(r ->> 'unit'), ''), v_existing ->> 'unit', 'each'),
          coalesce(nullif(btrim(r ->> 'category'), ''), v_existing ->> 'category'),
          case when v_sell is not null then v_sell
               when v_buy is not null then null
               else public._pb_num(v_existing, 'estimated_price') end,
          coalesce(v_buy, public._pb_num(v_existing, 'cost_price')),
          coalesce(v_markup, public._pb_num(v_existing, 'markup_percent')),
          coalesce(nullif(btrim(r ->> 'supplier'), ''), v_existing ->> 'supplier'),
          case when (v_existing ->> 'supplier_id') ~* '^[0-9a-f-]{36}$'
               then (v_existing ->> 'supplier_id')::uuid end);
        v_updated := v_updated + 1;
      end if;
      if v_code_key is not null then v_touched := v_touched || jsonb_build_object('c:' || v_code_key, true); end if;
      if v_name_key is not null then v_touched := v_touched || jsonb_build_object('n:' || v_name_key, true); end if;
    exception when others then
      v_skipped := v_skipped + 1;
    end;
  end loop;

  return jsonb_build_object('added', v_added, 'updated', v_updated, 'skipped', v_skipped);
end;
$function$;
