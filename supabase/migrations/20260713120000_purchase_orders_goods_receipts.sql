-- PO Slice 3: goods-in receipting.

-- 1) Receipt records (supports partial deliveries + delivery-note photo).
create table if not exists public.employer_goods_receipts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.employer_material_orders(id) on delete cascade,
  employer_id uuid not null default auth.uid(),
  received_at timestamptz not null default now(),
  received_by text,
  lines jsonb not null default '[]'::jsonb,     -- [{name, qty_received}]
  delivery_note_url text,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists employer_goods_receipts_order_idx on public.employer_goods_receipts(order_id);
alter table public.employer_goods_receipts enable row level security;
drop policy if exists goods_receipts_owner on public.employer_goods_receipts;
create policy goods_receipts_owner on public.employer_goods_receipts
  for all using (employer_id = auth.uid()) with check (employer_id = auth.uid());

-- 2) Committed cost now EXCLUDES Received (a received PO is booked as actual).
create or replace function public.employer_committed_materials()
 returns table(job_id uuid, committed numeric)
 language sql stable security definer set search_path to 'public'
as $function$
  select job_id, coalesce(sum(total), 0)::numeric as committed
  from public.employer_material_orders
  where employer_id = auth.uid()
    and job_id is not null
    and status in ('Sent', 'Confirmed', 'Part-received')
  group by job_id;
$function$;

-- 3) On transition to Received, book the PO total into the job's actual
--    materials (once) and recompute actual_total / margin / status.
create or replace function public.book_received_po_to_actual()
 returns trigger language plpgsql security definer set search_path to 'public'
as $function$
declare v_at numeric;
begin
  if NEW.status = 'Received' and coalesce(OLD.status, '') <> 'Received' and NEW.job_id is not null then
    select coalesce(actual_labour,0) + coalesce(actual_materials,0) + coalesce(NEW.total,0)
         + coalesce(actual_equipment,0) + coalesce(actual_overheads,0)
      into v_at
      from public.job_financials where job_id = NEW.job_id;
    if v_at is not null then
      update public.job_financials set
        actual_materials = coalesce(actual_materials,0) + coalesce(NEW.total,0),
        actual_total = v_at,
        margin = case when budget_total > 0 then ((budget_total - v_at) / budget_total) * 100 else margin end,
        status = case when v_at > budget_total then 'Over Budget'
                      when v_at < budget_total * 0.9 then 'Under Budget'
                      else 'On Budget' end,
        updated_at = now()
      where job_id = NEW.job_id;
    end if;
  end if;
  return NEW;
end;
$function$;

drop trigger if exists trg_book_received_po on public.employer_material_orders;
create trigger trg_book_received_po
  after update on public.employer_material_orders
  for each row execute function public.book_received_po_to_actual();
