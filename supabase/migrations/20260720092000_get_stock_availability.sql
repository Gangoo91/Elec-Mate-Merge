-- D1 (ELE-1362): allocation-aware stock availability (applied via MCP 2026-07-20)
create or replace function public.get_stock_availability(p_project_id uuid, p_query text default null)
returns table (
  id uuid, name text, quantity numeric, available numeric,
  committed_elsewhere numeric, committed_jobs text[],
  unit text, unit_cost numeric, supplier text
)
language sql security invoker set search_path = ''
as $$
  select
    pi.id, pi.name, pi.quantity,
    greatest(0, pi.quantity - coalesce(cm.committed, 0)) as available,
    coalesce(cm.committed, 0) as committed_elsewhere,
    cm.jobs as committed_jobs,
    pi.unit, pi.unit_cost, pi.supplier
  from public.personal_inventory pi
  left join lateral (
    select sum(jm.quantity) as committed,
           array_agg(distinct sp.title) as jobs
    from public.job_materials jm
    join public.spark_projects sp on sp.id = jm.project_id
    where jm.inventory_item_id = pi.id
      and jm.project_id <> p_project_id
      and jm.status in ('needed', 'ordered')
      and sp.status in ('open', 'active')
  ) cm on true
  where pi.user_id = auth.uid()
    and (p_query is null or pi.name ilike '%' || p_query || '%')
  order by pi.name
  limit 12;
$$;
revoke execute on function public.get_stock_availability(uuid, text) from public, anon;
grant execute on function public.get_stock_availability(uuid, text) to authenticated;
