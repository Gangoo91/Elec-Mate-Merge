-- ELE-1991 — CSV import into the ONE firm price book (the owner's
-- materials_lists). Names already in the book are updated (only the values
-- the file gives); new names are added to the owner's "Price Book" list.
-- Office managers: buy price and markup in the file are ignored, as in the
-- single-item editor.
--
-- p_rows: [{ "name", "unit", "buy", "sell", "markup", "category", "supplier" }]

create or replace function public.import_firm_price_book(p_firm uuid, p_rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_money boolean;
  r jsonb;
  v_name text;
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

    select it into v_existing
      from public.materials_lists ml,
           jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) it
     where ml.user_id = p_firm
       and coalesce(it ->> 'id', '') <> ''
       and lower(regexp_replace(btrim(it ->> 'name'), '\s+', ' ', 'g'))
           = lower(regexp_replace(v_name, '\s+', ' ', 'g'))
     limit 1;

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
          -- New buy without a sell: let the editor recompute sell from buy + markup.
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
    exception when others then
      v_skipped := v_skipped + 1;
    end;
  end loop;

  return jsonb_build_object('added', v_added, 'updated', v_updated, 'skipped', v_skipped);
end;
$$;

revoke all on function public.import_firm_price_book(uuid, jsonb) from public, anon;
grant execute on function public.import_firm_price_book(uuid, jsonb) to authenticated;
