-- ELE-1991 — one price book for the firm.
--
-- The firm's price book IS the owner's Electrical Hub price book
-- (`materials_lists`, scoped to user_id = the owner = the firm id). No copy:
-- `employer_price_book` (0 rows) is retired. Managers reach the owner's rows
-- only through these SECURITY DEFINER functions, which:
--   * return nothing to anyone outside the firm (my_employer_scope),
--   * null buy price / markup / last-paid for office managers
--     (can_see_firm_money false) — they still see sell prices for quoting,
--   * never let an office manager write buy price or markup.
-- Roster workers get names + units only (get_firm_material_names).
--
-- Item JSON keys (shared with src/hooks/useMaterialsLists.ts):
--   id, name, unit, quantity, matched, added_at, price_updated_at,
--   estimated_price (sell), cost_price (buy), markup_percent, supplier,
--   labour_hours / labour[], and — new, optional, ignored by the Electrical
--   Hub — category, supplier_id (employer_suppliers.id), last_paid_price,
--   last_paid_at, last_paid_supplier (stamped from matched supplier
--   invoices, ELE-1978).

comment on table public.materials_lists is
  '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] The price book: an account''s materials lists (items jsonb: name, unit, cost_price = buy, estimated_price = sell, markup_percent, supplier, last_paid_*). Scope: user_id = account; for a firm the OWNER''s lists ARE the firm price book (ELE-1991). Managers read/write only via get_firm_price_book / save_firm_price_book_item / delete_firm_price_book_item (buy, markup, last paid null for office); workers get names via get_firm_material_names. Used by: Electrical Hub Price Book + quote/invoice wizards, Employer Hub Price book, purchase orders, hub quotes.';

comment on table public.employer_price_book is
  '[LEGACY — DO NOT USE] Second price book for firms (0 rows). Retired 7 Oct by ELE-1991: nothing in the app reads or writes it; the firm price book is the owner''s materials_lists. Safe to drop.';

-- Tolerant numeric read of a jsonb key (numbers, numeric strings; else null).
create or replace function public._pb_num(p_item jsonb, p_key text)
returns numeric
language sql
immutable
set search_path = public
as $$
  select case jsonb_typeof(p_item -> p_key)
           when 'number' then (p_item ->> p_key)::numeric
           when 'string' then case when btrim(p_item ->> p_key) ~ '^-?[0-9]+(\.[0-9]+)?$'
                                   then btrim(p_item ->> p_key)::numeric end
         end
$$;
revoke all on function public._pb_num(jsonb, text) from public, anon;
grant execute on function public._pb_num(jsonb, text) to authenticated;

-- ── Read ──────────────────────────────────────────────────────────────────
create or replace function public.get_firm_price_book(p_firm uuid)
returns table (
  item_id text,
  list_id uuid,
  list_name text,
  name text,
  unit text,
  category text,
  sell_price numeric,
  buy_price numeric,
  markup_percent numeric,
  supplier text,
  supplier_id uuid,
  last_paid_price numeric,
  last_paid_at timestamptz,
  last_paid_supplier text,
  price_updated_at timestamptz,
  labour_hours numeric,
  money_visible boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_money boolean;
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    return;
  end if;
  v_money := public.can_see_firm_money(p_firm);

  return query
  with raw as (
    select ml.id as l_id, ml.name as l_name, e.it, e.n
      from public.materials_lists ml
      cross join lateral jsonb_array_elements(
        case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end
      ) with ordinality as e(it, n)
     where ml.user_id = p_firm
       and jsonb_typeof(e.it) = 'object'
       and coalesce(btrim(e.it ->> 'name'), '') <> ''
  )
  select coalesce(nullif(r.it ->> 'id', ''), r.l_id::text || ':' || r.n::text),
         r.l_id,
         r.l_name,
         btrim(r.it ->> 'name'),
         coalesce(nullif(btrim(r.it ->> 'unit'), ''), 'each'),
         nullif(btrim(r.it ->> 'category'), ''),
         coalesce(
           nullif(public._pb_num(r.it, 'estimated_price'), 0),
           case when coalesce(public._pb_num(r.it, 'cost_price'), 0) > 0
                then round(public._pb_num(r.it, 'cost_price')
                           * (1 + coalesce(public._pb_num(r.it, 'markup_percent'), 0) / 100), 2)
           end
         ),
         case when v_money then public._pb_num(r.it, 'cost_price') end,
         case when v_money then public._pb_num(r.it, 'markup_percent') end,
         nullif(btrim(r.it ->> 'supplier'), ''),
         case when (r.it ->> 'supplier_id') ~* '^[0-9a-f-]{36}$' then (r.it ->> 'supplier_id')::uuid end,
         case when v_money then public._pb_num(r.it, 'last_paid_price') end,
         case when v_money and (r.it ->> 'last_paid_at') ~ '^\d{4}-\d{2}-\d{2}'
              then (r.it ->> 'last_paid_at')::timestamptz end,
         case when v_money then nullif(r.it ->> 'last_paid_supplier', '') end,
         case when (r.it ->> 'price_updated_at') ~ '^\d{4}-\d{2}-\d{2}'
              then (r.it ->> 'price_updated_at')::timestamptz end,
         coalesce(
           (select sum(coalesce(public._pb_num(g, 'hours'), 0))
              from jsonb_array_elements(
                case when jsonb_typeof(r.it -> 'labour') = 'array' then r.it -> 'labour' else '[]'::jsonb end
              ) g
             where jsonb_typeof(g) = 'object'),
           public._pb_num(r.it, 'labour_hours')
         ),
         v_money
    from raw r
   order by lower(btrim(r.it ->> 'name')), r.l_name;
end;
$$;

-- Names and units only — for a roster worker logging materials used.
create or replace function public.get_firm_material_names(p_firm uuid)
returns table (item_id text, name text, unit text)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or p_firm is null then
    return;
  end if;
  if p_firm not in (select public.my_employer_scope())
     and not exists (
       select 1 from public.employer_employees e
        where e.employer_id = p_firm and e.user_id = auth.uid()
          and lower(coalesce(e.status, '')) = 'active'
     ) then
    return;
  end if;

  return query
  select distinct on (lower(btrim(e.it ->> 'name')))
         coalesce(nullif(e.it ->> 'id', ''), ml.id::text || ':' || e.n::text),
         btrim(e.it ->> 'name'),
         coalesce(nullif(btrim(e.it ->> 'unit'), ''), 'each')
    from public.materials_lists ml
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end
    ) with ordinality as e(it, n)
   where ml.user_id = p_firm
     and jsonb_typeof(e.it) = 'object'
     and coalesce(btrim(e.it ->> 'name'), '') <> ''
   order by lower(btrim(e.it ->> 'name'));
end;
$$;

-- ── Write ─────────────────────────────────────────────────────────────────
-- p_item_id null = add to the owner's "Price Book" list (the same list the
-- Electrical Hub's "save to price book" uses). Office managers' buy/markup
-- arguments are ignored and the stored values are kept.
create or replace function public.save_firm_price_book_item(
  p_firm uuid,
  p_item_id text,
  p_name text,
  p_unit text default 'each',
  p_category text default null,
  p_sell numeric default null,
  p_buy numeric default null,
  p_markup numeric default null,
  p_supplier text default null,
  p_supplier_id uuid default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_name text := btrim(coalesce(p_name, ''));
  v_unit text := coalesce(nullif(btrim(coalesce(p_unit, '')), ''), 'each');
  v_list uuid;
  v_id text;
  v_sell numeric := p_sell;
  v_now text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
  v_patch jsonb;
  v_drop text[] := '{}';
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if v_name = '' or length(v_name) > 300 then
    raise exception 'Give the item a name (up to 300 characters).' using errcode = '22023';
  end if;
  if coalesce(p_sell, 0) < 0 or coalesce(p_buy, 0) < 0 or coalesce(p_markup, 0) < 0
     or coalesce(p_sell, 0) > 1000000 or coalesce(p_buy, 0) > 1000000 or coalesce(p_markup, 0) > 1000 then
    raise exception 'Prices must be between £0 and £1,000,000.' using errcode = '22023';
  end if;
  if p_supplier_id is not null and not exists (
    select 1 from public.employer_suppliers s where s.id = p_supplier_id and s.employer_id = p_firm
  ) then
    raise exception 'Unknown supplier.' using errcode = '22023';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  -- Sell from buy + markup when only those were given (money roles only).
  if v_money and v_sell is null and coalesce(p_buy, 0) > 0 then
    v_sell := round(p_buy * (1 + coalesce(p_markup, 0) / 100), 2);
  end if;

  v_patch := jsonb_build_object(
    'name', v_name,
    'unit', v_unit,
    'category', nullif(btrim(coalesce(p_category, '')), ''),
    'supplier', nullif(btrim(coalesce(p_supplier, '')), ''),
    'supplier_id', p_supplier_id,
    'estimated_price', v_sell
  );
  if v_money then
    v_patch := v_patch || jsonb_build_object('cost_price', p_buy, 'markup_percent', p_markup);
  end if;
  -- Keys explicitly cleared → removed, not stored as null.
  select coalesce(array_agg(k), '{}') into v_drop
    from jsonb_each(v_patch) as j(k, v) where v = 'null'::jsonb;
  v_patch := jsonb_strip_nulls(v_patch);

  if p_item_id is null or p_item_id = '' then
    if exists (
      select 1 from public.materials_lists ml,
             jsonb_array_elements(case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end) it
       where ml.user_id = p_firm
         and lower(regexp_replace(btrim(it ->> 'name'), '\s+', ' ', 'g'))
             = lower(regexp_replace(v_name, '\s+', ' ', 'g'))
    ) then
      raise exception 'That item is already in the price book.' using errcode = '23505';
    end if;

    select ml.id into v_list
      from public.materials_lists ml
     where ml.user_id = p_firm and ml.name = 'Price Book'
     order by ml.created_at
     limit 1
     for update;
    if v_list is null then
      insert into public.materials_lists (user_id, name, description, items)
      values (p_firm, 'Price Book', 'Saved prices for quotes, purchase orders and van stock', '[]'::jsonb)
      returning id into v_list;
    end if;

    v_id := gen_random_uuid()::text;
    update public.materials_lists
       set items = coalesce(items, '[]'::jsonb) || jsonb_build_array(
             v_patch || jsonb_build_object(
               'id', v_id, 'quantity', 1, 'matched', false,
               'added_at', v_now, 'price_updated_at', v_now))
     where id = v_list;
    return v_id;
  end if;

  select ml.id into v_list
    from public.materials_lists ml
   where ml.user_id = p_firm
     and jsonb_typeof(ml.items) = 'array'
     and exists (select 1 from jsonb_array_elements(ml.items) it where it ->> 'id' = p_item_id)
   limit 1
   for update;
  if v_list is null then
    raise exception 'That item is no longer in the price book.' using errcode = 'P0002';
  end if;

  update public.materials_lists ml
     set items = (
       select jsonb_agg(
                case when e.it ->> 'id' = p_item_id then
                  (e.it - v_drop) || v_patch
                  || case when public._pb_num(e.it, 'estimated_price') is distinct from public._pb_num(v_patch, 'estimated_price')
                            or (v_money and public._pb_num(e.it, 'cost_price') is distinct from public._pb_num(v_patch, 'cost_price'))
                          then jsonb_build_object('price_updated_at', v_now) else '{}'::jsonb end
                else e.it end
                order by e.n)
         from jsonb_array_elements(ml.items) with ordinality as e(it, n)
     )
   where ml.id = v_list;
  return p_item_id;
end;
$$;

create or replace function public.delete_firm_price_book_item(p_firm uuid, p_item_id text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_list uuid;
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select ml.id into v_list
    from public.materials_lists ml
   where ml.user_id = p_firm
     and jsonb_typeof(ml.items) = 'array'
     and exists (select 1 from jsonb_array_elements(ml.items) it where it ->> 'id' = p_item_id)
   limit 1
   for update;
  if v_list is null then
    return false;
  end if;
  update public.materials_lists ml
     set items = coalesce((
       select jsonb_agg(e.it order by e.n)
         from jsonb_array_elements(ml.items) with ordinality as e(it, n)
        where e.it ->> 'id' is distinct from p_item_id
     ), '[]'::jsonb)
   where ml.id = v_list;
  return true;
end;
$$;

revoke all on function public.get_firm_price_book(uuid) from public, anon;
revoke all on function public.get_firm_material_names(uuid) from public, anon;
revoke all on function public.save_firm_price_book_item(uuid, text, text, text, text, numeric, numeric, numeric, text, uuid) from public, anon;
revoke all on function public.delete_firm_price_book_item(uuid, text) from public, anon;
grant execute on function public.get_firm_price_book(uuid) to authenticated;
grant execute on function public.get_firm_material_names(uuid) to authenticated;
grant execute on function public.save_firm_price_book_item(uuid, text, text, text, text, numeric, numeric, numeric, text, uuid) to authenticated;
grant execute on function public.delete_firm_price_book_item(uuid, text) to authenticated;
