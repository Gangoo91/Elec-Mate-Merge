-- S9: one-row financial truth for a job (applied via MCP 2026-07-19, v2 same night).
-- v2: quoted_all (drift survives quote->invoice conversion) + expenses_materials
-- (client de-duplicates receipt-scanned vs list-ticked materials via max()).
drop function if exists public.get_job_financials(uuid);
create or replace function public.get_job_financials(p_project_id uuid)
returns table (
  quoted numeric,
  quoted_all numeric,
  invoiced numeric,
  paid numeric,
  expenses numeric,
  expenses_materials numeric,
  materials_planned numeric,
  materials_got numeric,
  time_seconds bigint,
  unbilled_seconds bigint,
  unbilled_value numeric
)
language sql security invoker set search_path = ''
as $$
  select
    coalesce((select sum(q.total) from public.quotes q
              where q.project_id = p_project_id and q.invoice_raised = false), 0),
    coalesce((select sum(q.total) from public.quotes q
              where q.project_id = p_project_id), 0),
    coalesce((select sum(i.total) from public.invoices i
              where i.project_id = p_project_id and i.status <> 'draft'), 0),
    coalesce((select sum(i.total) from public.invoices i
              where i.project_id = p_project_id and i.status = 'paid'), 0),
    coalesce((select sum(e.amount) from public.sole_trader_expenses e
              where e.project_id = p_project_id), 0),
    coalesce((select sum(e.amount) from public.sole_trader_expenses e
              where e.project_id = p_project_id and e.category = 'materials'), 0),
    coalesce((select sum(m.quantity * coalesce(m.unit_price, 0)) from public.job_materials m
              where m.project_id = p_project_id), 0),
    coalesce((select sum(m.quantity * coalesce(m.unit_price, 0)) from public.job_materials m
              where m.project_id = p_project_id and m.status in ('got','fitted')), 0),
    coalesce((select sum(t.duration_seconds)::bigint from public.time_sessions t
              where t.project_id = p_project_id), 0),
    coalesce((select sum(t.duration_seconds)::bigint from public.time_sessions t
              where t.project_id = p_project_id and t.invoice_id is null), 0),
    coalesce((select sum((t.duration_seconds / 3600.0) * coalesce(t.hourly_rate, 0))
              from public.time_sessions t
              where t.project_id = p_project_id and t.invoice_id is null), 0);
$$;

revoke execute on function public.get_job_financials(uuid) from public, anon;
grant execute on function public.get_job_financials(uuid) to authenticated;
