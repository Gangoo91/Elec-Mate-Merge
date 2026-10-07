-- ELE-1978 — purchase orders from the job, supplier invoices (PDF or photo)
-- matched, and the material cost per job exposed for job profit (ELE-1824).
--
-- Money rule: a PO and a supplier invoice ARE buy prices. Office managers
-- (can_see_firm_money false) keep the operational side — see every PO, its
-- status and lines, and book deliveries in — but never the costs:
--   * the tables are now owner/admin only (my_employer_admin_scope);
--   * office reads POs through get_firm_purchase_orders (costs nulled) and
--     books deliveries through receive_purchase_order_delivery.
--
-- Also:
--   * totals are computed by the database from the lines (no client drift);
--   * a matched supplier invoice stamps "last paid" on the price-book items
--     its PO lines came from (materials_lists, ELE-1991);
--   * get_job_material_costs(firm, job) = THE material cost per job.

-- ── 1. Tighten RLS: costs are owner/admin only ────────────────────────────
drop policy if exists "Employer owns rows" on public.employer_material_orders;
create policy "Firm owner and admins own purchase orders"
  on public.employer_material_orders
  for all to authenticated
  using (employer_id in (select public.my_employer_admin_scope()))
  with check (employer_id in (select public.my_employer_admin_scope()));

drop policy if exists supplier_invoices_owner on public.employer_supplier_invoices;
create policy "Firm owner and admins own supplier invoices"
  on public.employer_supplier_invoices
  for all to authenticated
  using (employer_id in (select public.my_employer_admin_scope()))
  with check (employer_id in (select public.my_employer_admin_scope()));

-- Receipts carry names and quantities only; keep them visible to every
-- manager, but only to signed-in users (was granted to PUBLIC).
drop policy if exists goods_receipts_owner on public.employer_goods_receipts;
create policy "Firm managers see goods receipts"
  on public.employer_goods_receipts
  for all to authenticated
  using (employer_id in (select public.my_employer_scope()))
  with check (employer_id in (select public.my_employer_scope()));

revoke all on public.employer_material_orders from anon;
revoke all on public.employer_supplier_invoices from anon;
revoke all on public.employer_goods_receipts from anon;

-- ── 2. Totals from the lines ──────────────────────────────────────────────
create or replace function public.trg_po_totals()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_sub numeric;
begin
  if jsonb_typeof(new.items) is distinct from 'array' then
    new.items := '[]'::jsonb;
  end if;
  select coalesce(round(sum(coalesce(public._pb_num(l, 'qty'), 0)
                            * coalesce(public._pb_num(l, 'unit_cost'), 0)), 2), 0)
    into v_sub
    from jsonb_array_elements(new.items) l
   where jsonb_typeof(l) = 'object';
  new.vat_rate := coalesce(new.vat_rate, 20);
  new.subtotal := v_sub;
  new.vat_amount := round(v_sub * new.vat_rate / 100, 2);
  new.total := new.subtotal + new.vat_amount;
  return new;
end;
$$;

drop trigger if exists po_totals on public.employer_material_orders;
create trigger po_totals
  before insert or update of items, vat_rate, subtotal, vat_amount, total
  on public.employer_material_orders
  for each row execute function public.trg_po_totals();

-- ── 3. Office-safe PO list ────────────────────────────────────────────────
create or replace function public.get_firm_purchase_orders(p_firm uuid, p_job uuid default null)
returns table (
  id uuid,
  order_number text,
  supplier_id uuid,
  supplier_name text,
  job_id uuid,
  job_title text,
  items jsonb,
  subtotal numeric,
  vat_rate numeric,
  vat_amount numeric,
  total numeric,
  status text,
  delivery_mode text,
  delivery_address text,
  order_date date,
  expected_date date,
  delivery_date date,
  ordered_by text,
  sent_at timestamptz,
  sent_to_email text,
  notes text,
  created_at timestamptz,
  updated_at timestamptz,
  invoice_count integer,
  invoiced_total numeric,
  invoices_flagged integer,
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
  select o.id, o.order_number, o.supplier_id, s.name, o.job_id, j.title,
         case when v_money then o.items
              else coalesce((select jsonb_agg(l - 'unit_cost' order by n)
                               from jsonb_array_elements(o.items) with ordinality x(l, n)), '[]'::jsonb)
         end,
         case when v_money then o.subtotal end,
         o.vat_rate,
         case when v_money then o.vat_amount end,
         case when v_money then o.total end,
         o.status, o.delivery_mode, o.delivery_address, o.order_date, o.expected_date,
         o.delivery_date, o.ordered_by, o.sent_at, o.sent_to_email, o.notes,
         o.created_at, o.updated_at,
         coalesce(inv.n, 0)::int,
         case when v_money then inv.total end,
         coalesce(inv.flagged, 0)::int,
         v_money
    from public.employer_material_orders o
    left join public.employer_suppliers s on s.id = o.supplier_id
    left join public.employer_jobs j on j.id = o.job_id
    left join lateral (
      select count(*) as n, sum(coalesce(si.invoice_total, 0)) as total,
             count(*) filter (where not si.matched) as flagged
        from public.employer_supplier_invoices si
       where si.order_id = o.id
    ) inv on true
   where o.employer_id = p_firm
     and (p_job is null or o.job_id = p_job)
   order by o.order_date desc nulls last, o.created_at desc;
end;
$$;

-- ── 4. Book a delivery in (owner, admin or office) ────────────────────────
-- p_received: [{"index": 0, "qty_received": 5}, …] — this delivery only.
create or replace function public.receive_purchase_order_delivery(
  p_order uuid,
  p_received jsonb,
  p_note_path text default null,
  p_notes text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.employer_material_orders%rowtype;
  v_items jsonb;
  v_lines jsonb;
  v_status text;
  v_fully boolean;
  v_any boolean;
  v_name text;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  select * into v_order from public.employer_material_orders where id = p_order for update;
  if not found or v_order.employer_id not in (select public.my_employer_scope()) then
    raise exception 'Purchase order not found' using errcode = 'P0002';
  end if;
  if v_order.status not in ('Sent', 'Confirmed', 'Part-received') then
    raise exception 'Only a sent purchase order can be received.' using errcode = '22023';
  end if;
  if jsonb_typeof(p_received) is distinct from 'array' then
    raise exception 'Nothing to receive.' using errcode = '22023';
  end if;
  -- A delivery-note photo must be the caller's own upload.
  if p_note_path is not null and p_note_path not like auth.uid()::text || '/%' then
    raise exception 'Delivery note must be your own upload.' using errcode = '42501';
  end if;

  -- Add this delivery to each line, clamped to what is still outstanding.
  with lines as (
    select l, n - 1 as idx,
           coalesce(public._pb_num(l, 'qty'), 0) as qty,
           coalesce(public._pb_num(l, 'received_qty'), 0) as got
      from jsonb_array_elements(v_order.items) with ordinality x(l, n)
  ), adds as (
    select li.idx, li.l, li.qty, li.got,
           least(greatest(coalesce((
             select sum(coalesce(public._pb_num(r, 'qty_received'), 0))
               from jsonb_array_elements(p_received) r
              where public._pb_num(r, 'index') = li.idx), 0), 0),
             greatest(li.qty - li.got, 0)) as add_qty
      from lines li
  )
  select jsonb_agg(a.l || jsonb_build_object('received_qty', a.got + a.add_qty) order by a.idx),
         coalesce(jsonb_agg(jsonb_build_object('name', coalesce(a.l ->> 'name', 'Item'), 'qty_received', a.add_qty)
                            order by a.idx) filter (where a.add_qty > 0), '[]'::jsonb),
         bool_and(a.got + a.add_qty >= a.qty),
         bool_or(a.got + a.add_qty > 0)
    into v_items, v_lines, v_fully, v_any
    from adds a;

  if jsonb_array_length(coalesce(v_lines, '[]'::jsonb)) = 0 then
    raise exception 'Enter how many of at least one item arrived.' using errcode = '22023';
  end if;

  select nullif(btrim(full_name), '') into v_name from public.profiles where id = auth.uid();

  insert into public.employer_goods_receipts (order_id, employer_id, received_by, lines, delivery_note_url, notes)
  values (p_order, v_order.employer_id, v_name, v_lines, p_note_path, nullif(btrim(coalesce(p_notes, '')), ''));

  v_status := case when v_fully then 'Received' when v_any then 'Part-received' else v_order.status end;
  update public.employer_material_orders
     set items = v_items,
         status = v_status,
         delivery_date = case when v_fully then (now() at time zone 'Europe/London')::date else delivery_date end,
         updated_at = now()
   where id = p_order;
  return v_status;
end;
$$;

-- ── 5. Matched invoice → "last paid" on the price-book item ───────────────
create or replace function public.trg_supplier_invoice_last_paid()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.employer_material_orders%rowtype;
  v_paid jsonb := '{}'::jsonb;   -- price_book_item_id → unit price paid
  v_now text := to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
  v_price numeric;
  r record;
begin
  if new.order_id is null then
    return new;
  end if;
  select * into v_order from public.employer_material_orders where id = new.order_id;
  if not found then
    return new;
  end if;

  for r in
    select p.l ->> 'price_book_item_id' as pb_id,
           lower(coalesce(p.l ->> 'name', '')) as pname,
           public._pb_num(p.l, 'unit_cost') as po_cost
      from jsonb_array_elements(v_order.items) p(l)
     where coalesce(p.l ->> 'price_book_item_id', '') <> ''
  loop
    -- The invoice line for this PO line, matched the way the matcher does.
    v_price := null;
    select public._pb_num(il, 'unit_price')
      into v_price
      from jsonb_array_elements(case when jsonb_typeof(new.lines) = 'array' then new.lines else '[]'::jsonb end) il
     where coalesce(public._pb_num(il, 'unit_price'), 0) > 0
       and length(r.pname) > 0
       and (position(left(r.pname, 8) in lower(coalesce(il ->> 'description', ''))) > 0
            or position(left(lower(coalesce(il ->> 'description', '')), 8) in r.pname) > 0)
     limit 1;
    if v_price is not null then
      v_paid := v_paid || jsonb_build_object(r.pb_id, v_price);
    end if;
    -- A clean match with no readable line still proves the PO price was paid.
    if not (v_paid ? r.pb_id) and new.matched and coalesce(r.po_cost, 0) > 0 then
      v_paid := v_paid || jsonb_build_object(r.pb_id, r.po_cost);
    end if;
  end loop;

  if v_paid = '{}'::jsonb then
    return new;
  end if;

  update public.materials_lists ml
     set items = (
       select jsonb_agg(
                case when e.it ? 'id' and v_paid ? (e.it ->> 'id') then
                  e.it || jsonb_build_object(
                    'last_paid_price', (v_paid ->> (e.it ->> 'id'))::numeric,
                    'last_paid_at', v_now,
                    'last_paid_supplier', coalesce(new.supplier_name, ''))
                else e.it end
                order by e.n)
         from jsonb_array_elements(ml.items) with ordinality e(it, n)
     )
   where ml.user_id = v_order.employer_id
     and jsonb_typeof(ml.items) = 'array'
     and exists (select 1 from jsonb_array_elements(ml.items) it where v_paid ? (it ->> 'id'));
  return new;
end;
$$;

drop trigger if exists supplier_invoice_last_paid on public.employer_supplier_invoices;
create trigger supplier_invoice_last_paid
  after insert on public.employer_supplier_invoices
  for each row execute function public.trg_supplier_invoice_last_paid();

-- ── 6. Material cost per job (for job profit, ELE-1824) ───────────────────
-- One row per job with purchasing. Per PO (Draft/Cancelled excluded):
--   cost = the supplier invoices matched to it if any, else the PO itself.
-- *_net is ex VAT (what profit should use for a VAT-registered firm); invoice
-- totals are read inc VAT, so net = gross / (1 + PO VAT rate).
-- Office managers get the counts with every money column null.
create or replace function public.get_job_material_costs(p_firm uuid, p_job uuid default null)
returns table (
  job_id uuid,
  job_title text,
  po_count integer,
  open_po_count integer,
  invoice_count integer,
  invoices_flagged integer,
  ordered_net numeric,
  ordered_gross numeric,
  invoiced_gross numeric,
  material_cost_net numeric,
  material_cost_gross numeric,
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
  )
  select po.job_id,
         j.title,
         count(*)::int,
         count(*) filter (where po.status in ('Sent', 'Confirmed', 'Part-received'))::int,
         coalesce(sum(po.inv_n), 0)::int,
         coalesce(sum(po.inv_flagged), 0)::int,
         case when v_money then round(sum(coalesce(po.subtotal, 0)), 2) end,
         case when v_money then round(sum(coalesce(po.total, 0)), 2) end,
         case when v_money then round(sum(coalesce(po.inv_gross, 0)), 2) end,
         case when v_money then round(sum(
           case when po.inv_n > 0 then po.inv_gross / (1 + coalesce(po.vat_rate, 20) / 100)
                else coalesce(po.subtotal, 0) end), 2) end,
         case when v_money then round(sum(
           case when po.inv_n > 0 then po.inv_gross else coalesce(po.total, 0) end), 2) end,
         v_money
    from po
    left join public.employer_jobs j on j.id = po.job_id
   group by po.job_id, j.title;
end;
$$;

revoke all on function public.trg_po_totals() from public, anon;
revoke all on function public.trg_supplier_invoice_last_paid() from public, anon;
revoke all on function public.get_firm_purchase_orders(uuid, uuid) from public, anon;
revoke all on function public.receive_purchase_order_delivery(uuid, jsonb, text, text) from public, anon;
revoke all on function public.get_job_material_costs(uuid, uuid) from public, anon;
grant execute on function public.get_firm_purchase_orders(uuid, uuid) to authenticated;
grant execute on function public.receive_purchase_order_delivery(uuid, jsonb, text, text) to authenticated;
grant execute on function public.get_job_material_costs(uuid, uuid) to authenticated;

comment on table public.employer_material_orders is
  '[EMPLOYER HUB → WORKER TOOLS] Purchase orders to suppliers, raised from a job (job_id → employer_jobs). Lines: items jsonb [{name, qty, unit, unit_cost, received_qty, price_book_item_id → materials_lists item}]; subtotal/vat/total computed by trigger po_totals. Scope: employer_id = the firm; RLS owner/admin only (costs) — office reads via get_firm_purchase_orders (costs null) and books deliveries via receive_purchase_order_delivery. Material cost per job: get_job_material_costs. Used by: Employer Hub Procurement + job sheet "Materials", accounts P&L (finance_cost_rows).';
comment on table public.employer_supplier_invoices is
  '[EMPLOYER HUB] Supplier invoices (PDF or photo) matched against POs by match-supplier-invoice (three-way: PO, deliveries, invoice). Scope: employer_id = the firm; RLS owner/admin only. Insert stamps last_paid_* on the price-book items the PO lines came from. Used by: Procurement, get_job_material_costs, finance_cost_rows.';
comment on table public.employer_goods_receipts is
  '[EMPLOYER HUB] Deliveries booked in against purchase orders (names + quantities, delivery-note photo path in job-photos). Scope: employer_id = the firm; any manager reads; written via receive_purchase_order_delivery. Used by: Procurement.';
comment on table public.employer_suppliers is
  '[EMPLOYER HUB → WORKER TOOLS] A firm''s suppliers/merchants (account no., email for POs, discount). Scope: employer_id = the firm (owner profiles.id); managers via my_employer_scope(). Used by: Procurement, price book (supplier_id on items).';
