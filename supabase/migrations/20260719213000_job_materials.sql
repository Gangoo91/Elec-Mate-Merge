-- S6: per-job materials list (shopping list that ticks off on site) — applied via MCP 2026-07-19
create table public.job_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.spark_projects(id) on delete cascade,
  name text not null,
  quantity numeric not null default 1,
  unit text,
  unit_price numeric,
  supplier text,
  status text not null default 'needed' check (status in ('needed','ordered','got','fitted')),
  source text not null default 'manual' check (source in ('manual','quote','survey')),
  source_item_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_job_materials_project on public.job_materials(project_id);
create index idx_job_materials_user on public.job_materials(user_id);
create unique index uq_job_materials_source
  on public.job_materials(project_id, source, source_item_id)
  where source_item_id is not null;

alter table public.job_materials enable row level security;
create policy "own job materials select" on public.job_materials for select using (auth.uid() = user_id);
create policy "own job materials insert" on public.job_materials for insert with check (auth.uid() = user_id);
create policy "own job materials update" on public.job_materials for update using (auth.uid() = user_id);
create policy "own job materials delete" on public.job_materials for delete using (auth.uid() = user_id);

create or replace function public.touch_job_materials()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;
create trigger trg_touch_job_materials
  before update on public.job_materials
  for each row execute function public.touch_job_materials();

-- S6b: stock tracker / price book linkage
alter table public.job_materials
  add column inventory_item_id uuid references public.personal_inventory(id) on delete set null;
alter table public.inventory_movements
  add column project_id uuid references public.spark_projects(id) on delete set null;

create or replace function public.mark_job_material_got(p_material_id uuid, p_from_stock boolean default false)
returns jsonb
language plpgsql security invoker set search_path = ''
as $$
declare
  m public.job_materials;
  v_remaining numeric;
begin
  select * into m from public.job_materials
    where id = p_material_id and user_id = auth.uid();
  if not found then
    raise exception 'Material not found';
  end if;

  update public.job_materials set status = 'got' where id = m.id;

  if p_from_stock and m.inventory_item_id is not null then
    update public.personal_inventory
      set quantity = greatest(0, quantity - m.quantity), last_used_date = now()
      where id = m.inventory_item_id and user_id = auth.uid()
      returning quantity into v_remaining;
    insert into public.inventory_movements
      (user_id, inventory_item_id, quantity, direction, reason, project_id, note)
    values
      (auth.uid(), m.inventory_item_id, m.quantity, 'out', 'used_on_job', m.project_id, m.name);
  end if;

  return jsonb_build_object('status', 'got', 'stock_remaining', v_remaining);
end $$;

revoke execute on function public.mark_job_material_got(uuid, boolean) from public, anon;
grant execute on function public.mark_job_material_got(uuid, boolean) to authenticated;
