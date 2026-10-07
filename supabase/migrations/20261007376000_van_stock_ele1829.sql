-- ELE-1829 — van stock.
--
-- Each van carries materials from the firm's price book (materials_lists,
-- ELE-1991) with a quantity, a "reorder at" level and a "fill up to" level.
-- The sparky logs what they used on a job from their van: stock goes down, the
-- job's material cost goes up (at BUY price, worked out here on the server),
-- and when a line drops to its reorder level a DRAFT purchase order for the
-- usual supplier is raised for the office (the ELE-1978 PO path). Nothing is
-- ever sent to a supplier automatically. Booking that PO's delivery in tops
-- the van back up.
--
-- Money: workers and office managers never see a price. The stock table holds
-- no money at all; the moves table holds the buy-price snapshot and is
-- owner/admin only; everyone else reads through the RPCs below.
--
-- Job cost: van usage counts towards the JOB (finance_job_rows → get_job_profit,
-- get_job_material_costs) but not the company P&L, where the restock PO already
-- counted the spend (finance_cost_rows is deliberately untouched).

-- ── 1. Tables ─────────────────────────────────────────────────────────────
create table if not exists public.employer_van_stock (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  price_book_item_id text,
  name text not null check (length(btrim(name)) between 1 and 200),
  unit text not null default 'each' check (length(unit) <= 30),
  qty numeric(12, 2) not null default 0 check (qty >= 0),
  min_qty numeric(12, 2) not null default 0 check (min_qty >= 0),
  par_qty numeric(12, 2) check (par_qty is null or par_qty >= 0),
  supplier_id uuid references public.employer_suppliers(id) on delete set null,
  barcode text check (barcode is null or length(barcode) <= 64),
  last_counted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists employer_van_stock_vehicle_name_uq
  on public.employer_van_stock (vehicle_id, lower(btrim(name)));
create index if not exists employer_van_stock_employer_idx on public.employer_van_stock (employer_id);

create table if not exists public.employer_van_stock_moves (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  stock_id uuid references public.employer_van_stock(id) on delete set null,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  job_id uuid references public.employer_jobs(id) on delete set null,
  kind text not null check (kind in ('added', 'count', 'used', 'received')),
  name text not null,
  unit text,
  qty numeric(12, 2) not null,           -- used/received: amount moved; count/added: the new level
  qty_after numeric(12, 2),
  unit_cost numeric(12, 4),              -- 'used' only: buy price at the time (owner/admin only)
  po_id uuid references public.employer_material_orders(id) on delete set null,
  note text check (note is null or length(note) <= 500),
  actor uuid references public.profiles(id) on delete set null,
  actor_name text,
  reversed_at timestamptz,
  reversed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists employer_van_stock_moves_job_idx on public.employer_van_stock_moves (job_id) where job_id is not null;
create index if not exists employer_van_stock_moves_vehicle_idx on public.employer_van_stock_moves (vehicle_id, created_at desc);
create index if not exists employer_van_stock_moves_employer_idx on public.employer_van_stock_moves (employer_id, created_at desc);

alter table public.employer_van_stock enable row level security;
alter table public.employer_van_stock_moves enable row level security;
revoke all on public.employer_van_stock from anon, public;
revoke all on public.employer_van_stock_moves from anon, public;
grant select on public.employer_van_stock to authenticated;
grant select on public.employer_van_stock_moves to authenticated;

drop policy if exists "Firm managers read van stock" on public.employer_van_stock;
create policy "Firm managers read van stock"
  on public.employer_van_stock for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

drop policy if exists "Firm owner and admins read van stock moves" on public.employer_van_stock_moves;
create policy "Firm owner and admins read van stock moves"
  on public.employer_van_stock_moves for select to authenticated
  using (employer_id in (select public.my_employer_admin_scope()));
-- Writes only through the RPCs below.

alter table public.employer_material_orders
  add column if not exists for_vehicle_id uuid references public.vehicles(id) on delete set null;

comment on table public.employer_van_stock is
  '[EMPLOYER HUB → WORKER TOOLS] Van stock: materials carried on each firm van (vehicles), from the firm price book (price_book_item_id → materials_lists item id), with qty, min_qty (reorder at) and par_qty (fill up to), usual supplier and barcode. NO money columns. Scope: employer_id = the firm; managers read via my_employer_scope(); workers read their van through get_my_van_stock. Writes: save_van_stock_item, delete_van_stock_item, count_van_stock, log_van_materials_used, PO delivery trigger. Low stock raises a Draft PO (employer_material_orders.for_vehicle_id). ELE-1829.';
comment on table public.employer_van_stock_moves is
  '[EMPLOYER HUB] Van stock history: added / count / used (on a job) / received (from a PO delivery). unit_cost = buy price snapshot on ''used'' rows, so RLS is owner/admin only; office and workers read through get_van_stock_moves / get_my_van_stock / get_job_van_materials with money stripped. Used-on-a-job rows (not reversed) feed the job''s material cost (finance_job_rows, get_job_material_costs), not the company P&L. ELE-1829.';
comment on column public.employer_material_orders.for_vehicle_id is
  'Restock PO for this van''s stock (raised as a Draft when van stock runs low, ELE-1829). Delivering its lines tops up employer_van_stock.';

-- ── 2. Helpers ────────────────────────────────────────────────────────────
-- Is the caller the (active) driver of this van?
create or replace function public._van_i_drive(p_vehicle uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.vehicles v
      join public.employer_employees e on e.id = v.driver_id
     where v.id = p_vehicle and e.user_id = auth.uid()
       and lower(coalesce(e.status, '')) = 'active' and e.employer_id = v.user_id
  );
$$;

-- Price-book item for a stock line (by item id, else by name).
create or replace function public._van_price_book_item(p_firm uuid, p_item_id text, p_name text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select e.it
    from public.materials_lists ml
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(ml.items) = 'array' then ml.items else '[]'::jsonb end
    ) with ordinality as e(it, n)
   where ml.user_id = p_firm
     and jsonb_typeof(e.it) = 'object'
     and (
       (p_item_id is not null and coalesce(nullif(e.it ->> 'id', ''), ml.id::text || ':' || e.n::text) = p_item_id)
       or lower(btrim(e.it ->> 'name')) = lower(btrim(p_name))
     )
   order by (p_item_id is not null and coalesce(nullif(e.it ->> 'id', ''), ml.id::text || ':' || e.n::text) = p_item_id) desc
   limit 1;
$$;

create or replace function public._van_buy_price(p_firm uuid, p_item_id text, p_name text)
returns numeric
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(nullif(public._pb_num(it, 'cost_price'), 0), nullif(public._pb_num(it, 'last_paid_price'), 0))
    from (select public._van_price_book_item(p_firm, p_item_id, p_name) as it) x;
$$;

-- Quantity still to arrive on open POs for this stock line.
create or replace function public._van_on_order(p_stock uuid)
returns numeric
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(greatest(coalesce(public._pb_num(l, 'qty'), 0) - coalesce(public._pb_num(l, 'received_qty'), 0), 0)), 0)
    from public.employer_material_orders o
    cross join lateral jsonb_array_elements(case when jsonb_typeof(o.items) = 'array' then o.items else '[]'::jsonb end) l
   where o.status in ('Draft', 'Sent', 'Confirmed', 'Part-received')
     and l ->> 'van_stock_id' = p_stock::text;
$$;

-- Low stock → draft PO for the office. Returns the PO id when one was raised
-- or added to, else null. Never sends anything.
create or replace function public._van_stock_reorder(p_stock uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  s public.employer_van_stock%rowtype;
  v_reg text;
  v_supplier uuid;
  v_item jsonb;
  v_need numeric;
  v_on numeric;
  v_po public.employer_material_orders%rowtype;
  v_line jsonb;
  v_num text;
  v_year text := to_char(now() at time zone 'Europe/London', 'YYYY');
  v_next int;
  v_new boolean := false;
begin
  select * into s from public.employer_van_stock where id = p_stock;
  if not found or s.min_qty <= 0 or s.qty > s.min_qty then
    return null;
  end if;
  v_on := public._van_on_order(p_stock);
  if s.qty + v_on > s.min_qty then
    return null;  -- already on order
  end if;
  v_need := greatest(coalesce(nullif(s.par_qty, 0), s.min_qty * 2) - s.qty - v_on, 1);

  select coalesce(nullif(btrim(registration), ''), 'a van') into v_reg from public.vehicles where id = s.vehicle_id;
  v_item := public._van_price_book_item(s.employer_id, s.price_book_item_id, s.name);

  -- Usual supplier: the line's own, else the price book's, else the firm's only one.
  v_supplier := (select sp.id from public.employer_suppliers sp
                  where sp.id = s.supplier_id and sp.employer_id = s.employer_id);
  if v_supplier is null and (v_item ->> 'supplier_id') ~* '^[0-9a-f-]{36}$' then
    v_supplier := (select sp.id from public.employer_suppliers sp
                    where sp.id = (v_item ->> 'supplier_id')::uuid and sp.employer_id = s.employer_id);
  end if;
  if v_supplier is null and nullif(btrim(v_item ->> 'supplier'), '') is not null then
    v_supplier := (select sp.id from public.employer_suppliers sp
                    where sp.employer_id = s.employer_id
                      and lower(sp.name) = lower(btrim(v_item ->> 'supplier')) limit 1);
  end if;
  if v_supplier is null then
    select (array_agg(sp.id))[1] into v_supplier
      from public.employer_suppliers sp where sp.employer_id = s.employer_id
    having count(*) = 1;
  end if;

  if v_supplier is null then
    -- Tell the office once a day per line.
    insert into public.employer_expiry_sent (firm, ref)
    values (s.employer_id, 'vanlow:' || s.id || ':' || current_date)
    on conflict do nothing;
    if found then
      perform public.notify_employer_bell(
        s.employer_id, 'van_stock_low',
        'Low stock on ' || v_reg || ': ' || s.name,
        trim(to_char(s.qty, 'FM999990.##')) || ' ' || s.unit || ' left. Set a usual supplier so a draft order is raised for you.',
        jsonb_build_object('route', '/employer?section=kit&tab=stock&van=' || s.vehicle_id, 'vehicle_id', s.vehicle_id));
    end if;
    return null;
  end if;

  v_line := jsonb_build_object(
    'name', s.name, 'qty', v_need, 'unit', s.unit,
    'unit_cost', coalesce(public._van_buy_price(s.employer_id, s.price_book_item_id, s.name), 0),
    'received_qty', 0,
    'price_book_item_id', coalesce(s.price_book_item_id, v_item ->> 'id'),
    'van_stock_id', s.id);

  select * into v_po from public.employer_material_orders
   where employer_id = s.employer_id and status = 'Draft'
     and supplier_id = v_supplier and for_vehicle_id = s.vehicle_id
   order by created_at desc limit 1
   for update;

  if found then
    if exists (select 1 from jsonb_array_elements(v_po.items) l where l ->> 'van_stock_id' = s.id::text) then
      update public.employer_material_orders
         set items = (select jsonb_agg(case when l ->> 'van_stock_id' = s.id::text
                                            then l || jsonb_build_object('qty', greatest(coalesce(public._pb_num(l, 'qty'), 0), v_need))
                                            else l end order by n)
                        from jsonb_array_elements(v_po.items) with ordinality x(l, n)),
             updated_at = now()
       where id = v_po.id;
      return v_po.id;
    end if;
    update public.employer_material_orders
       set items = coalesce(items, '[]'::jsonb) || jsonb_build_array(v_line), updated_at = now()
     where id = v_po.id;
  else
    perform pg_advisory_xact_lock(hashtext('po-number:' || s.employer_id::text));
    select coalesce(max(nullif(substring(order_number from ('^PO-' || v_year || '-(\d+)$')), '')::int), 0) + 1
      into v_next
      from public.employer_material_orders
     where employer_id = s.employer_id and order_number like 'PO-' || v_year || '-%';
    v_num := 'PO-' || v_year || '-' || lpad(v_next::text, 4, '0');
    insert into public.employer_material_orders
      (order_number, supplier_id, job_id, items, status, ordered_by, notes, employer_id, for_vehicle_id, delivery_mode)
    values
      (v_num, v_supplier, null, jsonb_build_array(v_line), 'Draft', 'Van stock (automatic)',
       'Restock for ' || v_reg || '. Raised automatically when van stock ran low. Check it and send it when you are ready.',
       s.employer_id, s.vehicle_id, 'Collection')
    returning * into v_po;
    v_new := true;
  end if;

  perform public.notify_employer_bell(
    s.employer_id, 'van_stock_low',
    'Low stock on ' || v_reg || ': ' || s.name,
    case when v_new then 'Draft order ' || v_po.order_number || ' is ready to check and send.'
         else 'Added to draft order ' || v_po.order_number || '.' end,
    jsonb_build_object('route', '/employer?section=procurement&po=' || v_po.id, 'po_id', v_po.id,
                       'vehicle_id', s.vehicle_id));
  return v_po.id;
end;
$$;

-- ── 3. Office: read and manage ────────────────────────────────────────────
create or replace function public.get_van_stock(p_firm uuid, p_vehicle uuid default null)
returns table(
  id uuid, vehicle_id uuid, registration text, price_book_item_id text, name text, unit text,
  qty numeric, min_qty numeric, par_qty numeric, low boolean, on_order numeric,
  supplier_id uuid, supplier_name text, barcode text, last_counted_at timestamptz, updated_at timestamptz,
  unit_cost numeric, money_visible boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_money boolean;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    return;
  end if;
  v_money := public.can_see_firm_money(p_firm);
  return query
  select s.id, s.vehicle_id, v.registration, s.price_book_item_id, s.name, s.unit,
         s.qty, s.min_qty, s.par_qty, (s.min_qty > 0 and s.qty <= s.min_qty),
         public._van_on_order(s.id),
         s.supplier_id, sp.name, s.barcode, s.last_counted_at, s.updated_at,
         case when v_money then public._van_buy_price(s.employer_id, s.price_book_item_id, s.name) end,
         v_money
    from public.employer_van_stock s
    join public.vehicles v on v.id = s.vehicle_id
    left join public.employer_suppliers sp on sp.id = s.supplier_id
   where s.employer_id = p_firm and (p_vehicle is null or s.vehicle_id = p_vehicle)
   order by v.registration, lower(s.name);
end;
$$;

create or replace function public.get_van_stock_moves(p_firm uuid, p_vehicle uuid default null, p_limit int default 50)
returns table(
  id uuid, vehicle_id uuid, registration text, kind text, name text, unit text, qty numeric, qty_after numeric,
  job_id uuid, job_title text, po_id uuid, note text, actor_name text, reversed boolean, created_at timestamptz,
  line_cost numeric
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_money boolean;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    return;
  end if;
  v_money := public.can_see_firm_money(p_firm);
  return query
  select m.id, m.vehicle_id, v.registration, m.kind, m.name, m.unit, m.qty, m.qty_after,
         m.job_id, j.title, m.po_id, m.note, m.actor_name, m.reversed_at is not null, m.created_at,
         case when v_money and m.kind = 'used' then round(m.qty * coalesce(m.unit_cost, 0), 2) end
    from public.employer_van_stock_moves m
    left join public.vehicles v on v.id = m.vehicle_id
    left join public.employer_jobs j on j.id = m.job_id
   where m.employer_id = p_firm and (p_vehicle is null or m.vehicle_id = p_vehicle)
   order by m.created_at desc
   limit least(greatest(coalesce(p_limit, 50), 1), 200);
end;
$$;

create or replace function public.save_van_stock_item(
  p_firm uuid,
  p_vehicle uuid,
  p_id uuid default null,
  p_price_book_item_id text default null,
  p_name text default null,
  p_unit text default null,
  p_qty numeric default null,
  p_min numeric default null,
  p_par numeric default null,
  p_supplier uuid default null,
  p_barcode text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  s public.employer_van_stock%rowtype;
  v_id uuid;
  v_name text := nullif(btrim(coalesce(p_name, '')), '');
  v_me text := public._kit_my_name();
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if not exists (select 1 from public.vehicles v where v.id = p_vehicle and v.user_id = p_firm) then
    raise exception 'That van is not on the fleet.' using errcode = '22023';
  end if;
  if p_supplier is not null and not exists (
       select 1 from public.employer_suppliers sp where sp.id = p_supplier and sp.employer_id = p_firm) then
    raise exception 'Unknown supplier.' using errcode = '22023';
  end if;
  if coalesce(p_qty, 0) < 0 or coalesce(p_min, 0) < 0 or coalesce(p_par, 0) < 0 then
    raise exception 'Quantities cannot be negative.' using errcode = '22023';
  end if;

  if p_id is null then
    if v_name is null then
      raise exception 'Pick an item.' using errcode = '22023';
    end if;
    insert into public.employer_van_stock
      (employer_id, vehicle_id, price_book_item_id, name, unit, qty, min_qty, par_qty, supplier_id, barcode, last_counted_at)
    values
      (p_firm, p_vehicle, nullif(p_price_book_item_id, ''), v_name, coalesce(nullif(btrim(p_unit), ''), 'each'),
       coalesce(p_qty, 0), coalesce(p_min, 0), p_par, p_supplier, nullif(btrim(coalesce(p_barcode, '')), ''), now())
    on conflict (vehicle_id, (lower(btrim(name)))) do nothing
    returning id into v_id;
    if v_id is null then
      raise exception '% is already on this van. Change its quantity instead.', v_name using errcode = '23505';
    end if;
    insert into public.employer_van_stock_moves (employer_id, stock_id, vehicle_id, kind, name, unit, qty, qty_after, actor, actor_name)
    values (p_firm, v_id, p_vehicle, 'added', v_name, coalesce(nullif(btrim(p_unit), ''), 'each'),
            coalesce(p_qty, 0), coalesce(p_qty, 0), auth.uid(), v_me);
  else
    select * into s from public.employer_van_stock where id = p_id and employer_id = p_firm for update;
    if not found then
      raise exception 'Stock line not found' using errcode = 'P0002';
    end if;
    update public.employer_van_stock
       set name = coalesce(v_name, name),
           unit = coalesce(nullif(btrim(p_unit), ''), unit),
           qty = coalesce(p_qty, qty),
           min_qty = coalesce(p_min, min_qty),
           par_qty = p_par,
           supplier_id = p_supplier,
           barcode = nullif(btrim(coalesce(p_barcode, '')), ''),
           last_counted_at = case when p_qty is not null and p_qty <> s.qty then now() else last_counted_at end,
           updated_at = now()
     where id = p_id;
    v_id := p_id;
    if p_qty is not null and p_qty <> s.qty then
      insert into public.employer_van_stock_moves (employer_id, stock_id, vehicle_id, kind, name, unit, qty, qty_after, actor, actor_name)
      values (p_firm, v_id, s.vehicle_id, 'count', coalesce(v_name, s.name), s.unit, p_qty, p_qty, auth.uid(), v_me);
    end if;
  end if;
  perform public._van_stock_reorder(v_id);
  return v_id;
end;
$$;

create or replace function public.delete_van_stock_item(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not exists (
       select 1 from public.employer_van_stock s
        where s.id = p_id and s.employer_id in (select public.my_employer_scope())) then
    raise exception 'Stock line not found' using errcode = 'P0002';
  end if;
  delete from public.employer_van_stock where id = p_id;
end;
$$;

-- A stock count: office, or the van's driver.
create or replace function public.count_van_stock(p_stock uuid, p_qty numeric, p_note text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s public.employer_van_stock%rowtype;
  v_po uuid;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into s from public.employer_van_stock where id = p_stock for update;
  if not found or (s.employer_id not in (select public.my_employer_scope()) and not public._van_i_drive(s.vehicle_id)) then
    raise exception 'Stock line not found' using errcode = 'P0002';
  end if;
  if p_qty is null or p_qty < 0 or p_qty > 99999 then
    raise exception 'Enter how many are on the van.' using errcode = '22023';
  end if;
  update public.employer_van_stock set qty = p_qty, last_counted_at = now(), updated_at = now() where id = p_stock;
  insert into public.employer_van_stock_moves (employer_id, stock_id, vehicle_id, kind, name, unit, qty, qty_after, note, actor, actor_name)
  values (s.employer_id, p_stock, s.vehicle_id, 'count', s.name, s.unit, p_qty, p_qty,
          nullif(btrim(coalesce(p_note, '')), ''), auth.uid(), public._kit_my_name());
  v_po := public._van_stock_reorder(p_stock);
  return jsonb_build_object('qty', p_qty, 'low', s.min_qty > 0 and p_qty <= s.min_qty, 'reorder_raised', v_po is not null);
end;
$$;

-- ── 4. Worker: my van and logging what was used ──────────────────────────
create or replace function public.get_my_van_stock()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_out jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('vans', '[]'::jsonb);
  end if;
  with my_vans as (
    select v.id, v.registration, v.make, v.model, v.user_id
      from public.vehicles v
      join public.employer_employees e on e.id = v.driver_id
     where e.user_id = auth.uid() and lower(coalesce(e.status, '')) = 'active' and e.employer_id = v.user_id
  )
  select jsonb_build_object('vans', coalesce(jsonb_agg(jsonb_build_object(
      'id', mv.id, 'registration', mv.registration, 'make', mv.make, 'model', mv.model,
      'items', coalesce((
        select jsonb_agg(jsonb_build_object(
                 'id', s.id, 'name', s.name, 'unit', s.unit, 'qty', s.qty, 'min_qty', s.min_qty,
                 'low', s.min_qty > 0 and s.qty <= s.min_qty, 'barcode', s.barcode,
                 'on_order', public._van_on_order(s.id) > 0) order by lower(s.name))
          from public.employer_van_stock s where s.vehicle_id = mv.id), '[]'::jsonb),
      'recent', coalesce((
        select jsonb_agg(jsonb_build_object(
                 'id', m.id, 'name', m.name, 'unit', m.unit, 'qty', m.qty, 'job_id', m.job_id,
                 'job_title', j.title, 'created_at', m.created_at, 'reversed', m.reversed_at is not null,
                 'can_undo', m.actor = auth.uid() and m.reversed_at is null and m.created_at > now() - interval '24 hours')
                 order by m.created_at desc)
          from (select * from public.employer_van_stock_moves x
                 where x.vehicle_id = mv.id and x.kind = 'used' and x.actor = auth.uid()
                 order by x.created_at desc limit 20) m
          left join public.employer_jobs j on j.id = m.job_id), '[]'::jsonb)
    ) order by mv.registration), '[]'::jsonb))
    into v_out
    from my_vans mv;
  return v_out;
end;
$$;

create or replace function public.log_van_materials_used(
  p_vehicle uuid,
  p_job uuid,
  p_lines jsonb,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_office boolean;
  l jsonb;
  s public.employer_van_stock%rowtype;
  v_qty numeric;
  v_after numeric;
  v_out jsonb := '[]'::jsonb;
  v_raised int := 0;
  v_me text := public._kit_my_name();
  v_po uuid;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select v.user_id into v_firm from public.vehicles v where v.id = p_vehicle;
  if v_firm is null then
    raise exception 'Van not found' using errcode = 'P0002';
  end if;
  v_office := v_firm in (select public.my_employer_scope());
  if not v_office and not public._van_i_drive(p_vehicle) then
    raise exception 'This is not your van.' using errcode = '42501';
  end if;
  if p_job is null or not exists (select 1 from public.employer_jobs j where j.id = p_job and j.user_id = v_firm) then
    raise exception 'Pick the job the materials went on.' using errcode = '22023';
  end if;
  if not v_office and not public.is_assigned_to_job(p_job) then
    raise exception 'You are not on that job.' using errcode = '42501';
  end if;
  if jsonb_typeof(p_lines) is distinct from 'array' or jsonb_array_length(p_lines) = 0 then
    raise exception 'Add at least one item.' using errcode = '22023';
  end if;
  if jsonb_array_length(p_lines) > 100 then
    raise exception 'Too many lines at once.' using errcode = '22023';
  end if;

  for l in select * from jsonb_array_elements(p_lines) loop
    v_qty := public._pb_num(l, 'qty');
    continue when v_qty is null or v_qty <= 0;
    if v_qty > 9999 then
      raise exception 'That is a lot. Check the quantity.' using errcode = '22023';
    end if;
    select * into s from public.employer_van_stock
     where id = (l ->> 'stock_id')::uuid and vehicle_id = p_vehicle
     for update;
    if not found then
      raise exception 'An item is not on this van.' using errcode = '22023';
    end if;
    v_after := greatest(s.qty - v_qty, 0);
    update public.employer_van_stock set qty = v_after, updated_at = now() where id = s.id;
    insert into public.employer_van_stock_moves
      (employer_id, stock_id, vehicle_id, job_id, kind, name, unit, qty, qty_after, unit_cost, note, actor, actor_name)
    values
      (v_firm, s.id, p_vehicle, p_job, 'used', s.name, s.unit, v_qty, v_after,
       public._van_buy_price(v_firm, s.price_book_item_id, s.name),
       nullif(btrim(coalesce(p_note, '')), ''), auth.uid(), v_me);
    v_po := public._van_stock_reorder(s.id);
    if v_po is not null then
      v_raised := v_raised + 1;
    end if;
    v_out := v_out || jsonb_build_object('stock_id', s.id, 'name', s.name, 'qty_after', v_after,
                                         'low', s.min_qty > 0 and v_after <= s.min_qty);
  end loop;

  if jsonb_array_length(v_out) = 0 then
    raise exception 'Add at least one item.' using errcode = '22023';
  end if;
  return jsonb_build_object('lines', v_out, 'reorder_raised', v_raised);
end;
$$;

-- Undo a mistaken "used" entry: the person who logged it within 24 hours, or
-- the office any time. Puts the stock back and takes it off the job cost.
create or replace function public.undo_van_material_use(p_move uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  m public.employer_van_stock_moves%rowtype;
  v_office boolean;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into m from public.employer_van_stock_moves where id = p_move for update;
  if not found or m.kind <> 'used' then
    raise exception 'Entry not found' using errcode = 'P0002';
  end if;
  v_office := m.employer_id in (select public.my_employer_scope());
  if not v_office and not (m.actor = auth.uid() and m.created_at > now() - interval '24 hours') then
    raise exception 'Ask the office to change this one.' using errcode = '42501';
  end if;
  if m.reversed_at is not null then
    return;
  end if;
  update public.employer_van_stock_moves set reversed_at = now(), reversed_by = auth.uid() where id = p_move;
  update public.employer_van_stock set qty = qty + m.qty, updated_at = now() where id = m.stock_id;
end;
$$;

-- What came off the vans for a job: office (cost only when they see money) or
-- a worker on the job (names and quantities).
create or replace function public.get_job_van_materials(p_job uuid)
returns table(
  id uuid, name text, unit text, qty numeric, registration text, actor_name text,
  created_at timestamptz, mine boolean, can_undo boolean, line_cost numeric, money_visible boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_firm uuid;
  v_money boolean := false;
  v_office boolean;
begin
  if auth.uid() is null then
    return;
  end if;
  select j.user_id into v_firm from public.employer_jobs j where j.id = p_job;
  if v_firm is null then
    return;
  end if;
  v_office := v_firm in (select public.my_employer_scope());
  if not v_office and not public.is_assigned_to_job(p_job) then
    return;
  end if;
  if v_office then
    v_money := public.can_see_firm_money(v_firm);
  end if;
  return query
  select m.id, m.name, m.unit, m.qty, v.registration, m.actor_name, m.created_at,
         m.actor = auth.uid(),
         v_office or (m.actor = auth.uid() and m.created_at > now() - interval '24 hours'),
         case when v_money then round(m.qty * coalesce(m.unit_cost, 0), 2) end,
         v_money
    from public.employer_van_stock_moves m
    left join public.vehicles v on v.id = m.vehicle_id
   where m.job_id = p_job and m.kind = 'used' and m.reversed_at is null
   order by m.created_at desc;
end;
$$;

-- ── 5. Delivering a restock PO tops the van up ───────────────────────────
create or replace function public.trg_po_van_restock()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
begin
  if new.for_vehicle_id is null or jsonb_typeof(new.items) is distinct from 'array' then
    return new;
  end if;
  for r in
    select n.l ->> 'van_stock_id' as sid,
           coalesce(public._pb_num(n.l, 'received_qty'), 0)
             - coalesce(public._pb_num(o.l, 'received_qty'), 0) as delta
      from jsonb_array_elements(new.items) with ordinality n(l, i)
      left join lateral (
        select x.l from jsonb_array_elements(
          case when jsonb_typeof(old.items) = 'array' then old.items else '[]'::jsonb end
        ) with ordinality x(l, i) where x.i = n.i) o on true
     where (n.l ->> 'van_stock_id') ~* '^[0-9a-f-]{36}$'
  loop
    continue when r.delta <= 0;
    with up as (
      update public.employer_van_stock s
         set qty = s.qty + r.delta, updated_at = now()
       where s.id = r.sid::uuid and s.vehicle_id = new.for_vehicle_id
      returning s.*
    )
    insert into public.employer_van_stock_moves
      (employer_id, stock_id, vehicle_id, kind, name, unit, qty, qty_after, po_id, actor, actor_name)
    select up.employer_id, up.id, up.vehicle_id, 'received', up.name, up.unit, r.delta, up.qty, new.id,
           auth.uid(), public._kit_my_name()
      from up;
  end loop;
  return new;
exception when others then
  raise warning '[trg_po_van_restock] %: %', new.id, sqlerrm;
  return new;
end;
$$;

drop trigger if exists po_van_restock on public.employer_material_orders;
create trigger po_van_restock
  after update of items on public.employer_material_orders
  for each row execute function public.trg_po_van_restock();

-- ── 6. Job cost: van usage at buy price ──────────────────────────────────
create or replace function pg_temp.patch_fn(p_sig text, p_pairs text[])
returns void language plpgsql as $$
declare
  d text := pg_get_functiondef(p_sig::regprocedure);
  i int;
begin
  for i in 1 .. array_length(p_pairs, 1) by 2 loop
    if position(p_pairs[i] in d) = 0 then
      raise exception 'patch_fn %: pair % not found', p_sig, (i + 1) / 2;
    end if;
    d := replace(d, p_pairs[i], p_pairs[i + 1]);
  end loop;
  execute d;
end $$;

select pg_temp.patch_fn('public.finance_job_rows(uuid[], uuid)', array[
  $q$  hrs as ($q$,
  $q$  van as (
    select m.job_id, sum(m.qty * coalesce(m.unit_cost, 0)) as v
      from public.employer_van_stock_moves m
     where m.job_id in (select id from jobs) and m.kind = 'used' and m.reversed_at is null
     group by m.job_id
  ),
  hrs as ($q$,
  $q$coalesce(cost.materials, 0) as materials,$q$,
  $q$coalesce(cost.materials, 0) + coalesce(van.v, 0) as materials,$q$,
  $q$left join hrs on hrs.job_id = j.id$q$,
  $q$left join hrs on hrs.job_id = j.id
      left join van on van.job_id = j.id$q$
]);

drop function pg_temp.patch_fn(text, text[]);

create or replace function public.get_job_material_costs(p_firm uuid, p_job uuid default null)
returns table(job_id uuid, job_title text, po_count integer, open_po_count integer, invoice_count integer,
              invoices_flagged integer, ordered_net numeric, ordered_gross numeric, invoiced_gross numeric,
              material_cost_net numeric, material_cost_gross numeric, money_visible boolean)
language plpgsql
stable
security definer
set search_path = public
as $function$
declare
  v_money boolean;
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    return;
  end if;
  v_money := public.can_see_firm_money(p_firm);

  return query
  with po as (
    select o.*,
           inv.n as inv_n, inv.gross as inv_gross, inv.flagged as inv_flagged
      from public.employer_material_orders o
      left join lateral (
        select count(*) as n, sum(coalesce(si.invoice_total, 0)) as gross,
               count(*) filter (where not si.matched) as flagged
          from public.employer_supplier_invoices si where si.order_id = o.id
      ) inv on true
     where o.employer_id = p_firm
       and o.job_id is not null
       and (p_job is null or o.job_id = p_job)
       and o.status not in ('Draft', 'Cancelled')
  ), pa as (
    select po.job_id,
           count(*) as n,
           count(*) filter (where po.status in ('Sent', 'Confirmed', 'Part-received')) as open_n,
           coalesce(sum(po.inv_n), 0) as inv_n,
           coalesce(sum(po.inv_flagged), 0) as flagged,
           sum(coalesce(po.subtotal, 0)) as ordered_net,
           sum(coalesce(po.total, 0)) as ordered_gross,
           sum(coalesce(po.inv_gross, 0)) as invoiced_gross,
           sum(case when po.inv_n > 0 then po.inv_gross / (1 + coalesce(po.vat_rate, 20) / 100)
                    else coalesce(po.subtotal, 0) end) as cost_net,
           sum(case when po.inv_n > 0 then po.inv_gross else coalesce(po.total, 0) end) as cost_gross
      from po group by po.job_id
  ), van as (
    -- ELE-1829: materials used from van stock, at buy price (net).
    select m.job_id, sum(m.qty * coalesce(m.unit_cost, 0)) as v
      from public.employer_van_stock_moves m
     where m.employer_id = p_firm and m.kind = 'used' and m.reversed_at is null
       and m.job_id is not null and (p_job is null or m.job_id = p_job)
     group by m.job_id
  ), ids as (
    select pa.job_id from pa union select van.job_id from van
  )
  select ids.job_id,
         j.title,
         coalesce(pa.n, 0)::int,
         coalesce(pa.open_n, 0)::int,
         coalesce(pa.inv_n, 0)::int,
         coalesce(pa.flagged, 0)::int,
         case when v_money then round(coalesce(pa.ordered_net, 0), 2) end,
         case when v_money then round(coalesce(pa.ordered_gross, 0), 2) end,
         case when v_money then round(coalesce(pa.invoiced_gross, 0), 2) end,
         case when v_money then round(coalesce(pa.cost_net, 0) + coalesce(van.v, 0), 2) end,
         case when v_money then round(coalesce(pa.cost_gross, 0) + coalesce(van.v, 0) * 1.2, 2) end,
         v_money
    from ids
    left join pa on pa.job_id = ids.job_id
    left join van on van.job_id = ids.job_id
    left join public.employer_jobs j on j.id = ids.job_id;
end;
$function$;

-- ── 7. Overview attention: kit due, faults, low van stock ────────────────
create or replace function public.get_kit_attention(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_out jsonb;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    return null;
  end if;
  with due as (
    select t.id, t.name, f.label, f.due,
           case when t.assigned_to_employee_id is not null or t.assigned_vehicle_id is not null
                then public._kit_holder_label(t.assigned_to_employee_id, t.assigned_vehicle_id) end as holder
      from public.employer_company_tools t
     cross join lateral (values ('PAT test', t.pat_due), ('Calibration', t.next_calibration)) f(label, due)
     where t.user_id = p_firm and f.due is not null and f.due <= current_date + 30
       and coalesce(t.status, '') not in ('Lost', 'Written Off')
  ), faults as (
    select t.id, t.name, t.status,
           (select ev.actor_name from public.employer_tool_events ev
             where ev.tool_id = t.id and ev.kind in ('fault', 'lost') order by ev.created_at desc limit 1) as who
      from public.employer_company_tools t
     where t.user_id = p_firm and t.status in ('Under Repair', 'Lost')
       and exists (select 1 from public.employer_tool_events ev
                    where ev.tool_id = t.id and ev.kind in ('fault', 'lost') and ev.created_at > now() - interval '30 days')
  ), low as (
    select s.id, s.name, s.vehicle_id, v.registration
      from public.employer_van_stock s join public.vehicles v on v.id = s.vehicle_id
     where s.employer_id = p_firm and s.min_qty > 0 and s.qty <= s.min_qty
  ), pending as (
    select t.id from public.employer_company_tools t
     where t.user_id = p_firm and t.issue_state = 'pending' and t.issued_at < now() - interval '2 days'
  )
  select jsonb_build_object(
    'due', (select count(distinct id) from due),
    'overdue', (select count(distinct id) from due where due.due < current_date),
    'due_first', (select jsonb_build_object('tool_id', d.id, 'name', d.name, 'label', d.label, 'due', d.due, 'holder', d.holder)
                    from due d order by d.due limit 1),
    'faults', (select count(*) from faults),
    'fault_first', (select jsonb_build_object('tool_id', f.id, 'name', f.name, 'status', f.status, 'who', f.who)
                      from faults f order by f.name limit 1),
    'low_stock', (select count(*) from low),
    'low_vans', (select count(distinct vehicle_id) from low),
    'low_first', (select jsonb_build_object('vehicle_id', l.vehicle_id, 'registration', l.registration, 'name', l.name)
                    from low l order by l.registration, l.name limit 1),
    'unconfirmed', (select count(*) from pending)
  ) into v_out;
  return v_out;
end;
$$;

-- ── 8. Grants ────────────────────────────────────────────────────────────
revoke all on function public._van_i_drive(uuid) from public, anon;
revoke all on function public._van_price_book_item(uuid, text, text) from public, anon, authenticated;
revoke all on function public._van_buy_price(uuid, text, text) from public, anon, authenticated;
revoke all on function public._van_on_order(uuid) from public, anon, authenticated;
revoke all on function public._van_stock_reorder(uuid) from public, anon, authenticated;
revoke all on function public.trg_po_van_restock() from public, anon, authenticated;
revoke all on function public.get_van_stock(uuid, uuid) from public, anon;
revoke all on function public.get_van_stock_moves(uuid, uuid, int) from public, anon;
revoke all on function public.save_van_stock_item(uuid, uuid, uuid, text, text, text, numeric, numeric, numeric, uuid, text) from public, anon;
revoke all on function public.delete_van_stock_item(uuid) from public, anon;
revoke all on function public.count_van_stock(uuid, numeric, text) from public, anon;
revoke all on function public.get_my_van_stock() from public, anon;
revoke all on function public.log_van_materials_used(uuid, uuid, jsonb, text) from public, anon;
revoke all on function public.undo_van_material_use(uuid) from public, anon;
revoke all on function public.get_job_van_materials(uuid) from public, anon;
revoke all on function public.get_job_material_costs(uuid, uuid) from public, anon;
revoke all on function public.get_kit_attention(uuid) from public, anon;

grant execute on function public.get_van_stock(uuid, uuid) to authenticated;
grant execute on function public.get_van_stock_moves(uuid, uuid, int) to authenticated;
grant execute on function public.save_van_stock_item(uuid, uuid, uuid, text, text, text, numeric, numeric, numeric, uuid, text) to authenticated;
grant execute on function public.delete_van_stock_item(uuid) to authenticated;
grant execute on function public.count_van_stock(uuid, numeric, text) to authenticated;
grant execute on function public.get_my_van_stock() to authenticated;
grant execute on function public.log_van_materials_used(uuid, uuid, jsonb, text) to authenticated;
grant execute on function public.undo_van_material_use(uuid) to authenticated;
grant execute on function public.get_job_van_materials(uuid) to authenticated;
grant execute on function public.get_job_material_costs(uuid, uuid) to authenticated;
grant execute on function public.get_kit_attention(uuid) to authenticated;
