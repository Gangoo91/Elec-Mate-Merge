-- ============================================================================
-- ONE FINANCE MODEL, part 3: money gate (ELE-1831 roles).
--
-- Office managers chase money but must not see profit, margin, costs, labour
-- cost or pay rates. can_see_firm_money(firm) is true only for the owner and
-- 'admin' managers. Rules applied here:
--   * Invoice-side figures (invoiced, paid/cash in, outstanding, overdue, open
--     quotes, contract value) stay visible to office.
--   * Cost-side figures (materials, expenses, labour, other, total costs, gross
--     profit, margin, budget) come back NULL unless the caller can see money
--     for EVERY firm in their scope. The client treats null as "hidden", never £0.
--   * get_employer_pnl / get_employer_ledger refuse outright for office.
--   * get_employer_labour_days only returns firms the caller can see money for.
--   * record_job_cost / set_job_labour refuse for office.
--   * employer_job_cost_entries is readable only by owner/admin.
-- ============================================================================

-- True when the caller may see money for every firm in their scope.
create or replace function public.finance_money_visible()
returns boolean
language sql stable security definer set search_path = public
as $$
  select not exists (
    select 1 from public.my_employer_scope() f where not public.can_see_firm_money(f)
  );
$$;
revoke all on function public.finance_money_visible() from public, anon;
grant execute on function public.finance_money_visible() to authenticated;

create or replace function public.require_finance_money()
returns void
language plpgsql stable security definer set search_path = public
as $$
begin
  if not public.finance_money_visible() then
    raise exception 'Only the owner or an admin can see the firm''s money' using errcode = '42501';
  end if;
end;
$$;
revoke all on function public.require_finance_money() from public, anon, authenticated;

-- Summary: invoice side for everyone in scope; cost side only when allowed.
create or replace function public.get_finance_summary(p_from date default null, p_to date default null)
returns table (
  period_from date, period_to date,
  invoiced numeric, invoice_count bigint,
  paid_in numeric, paid_count bigint,
  draft_value numeric, draft_count bigint,
  outstanding numeric, outstanding_count bigint,
  overdue numeric, overdue_count bigint,
  paid_last_30d numeric,
  open_quote_value numeric, open_quote_count bigint,
  materials numeric, supplier_invoices numeric, expenses numeric, labour numeric,
  other_costs numeric, total_costs numeric,
  gross_profit numeric, margin_pct numeric
)
language sql stable security definer set search_path = public
as $$
  select s.period_from, s.period_to, s.invoiced, s.invoice_count, s.paid_in, s.paid_count,
         s.draft_value, s.draft_count, s.outstanding, s.outstanding_count, s.overdue,
         s.overdue_count, s.paid_last_30d, s.open_quote_value, s.open_quote_count,
         case when v.ok then s.materials end,
         case when v.ok then s.supplier_invoices end,
         case when v.ok then s.expenses end,
         case when v.ok then s.labour end,
         case when v.ok then s.other_costs end,
         case when v.ok then s.total_costs end,
         case when v.ok then s.gross_profit end,
         case when v.ok then s.margin_pct end
    from (select public.finance_money_visible() as ok) v,
         public.finance_summary_core(array(select public.my_employer_scope()), p_from, p_to) s;
$$;

create or replace function public.get_finance_monthly(p_months int default 6)
returns table (
  month_start date, invoiced numeric, paid_in numeric, total_costs numeric,
  gross_profit numeric, margin_pct numeric
)
language sql stable security definer set search_path = public
as $$
  with owners as (select array(select public.my_employer_scope()) as o,
                         public.finance_money_visible() as ok),
  months as (
    select (date_trunc('month', (now() at time zone 'Europe/London'))::date
            - make_interval(months => g))::date as m
      from generate_series(0, greatest(least(coalesce(p_months, 6), 36), 1) - 1) g
  )
  select m.m, s.invoiced, s.paid_in,
         case when owners.ok then s.total_costs end,
         case when owners.ok then s.gross_profit end,
         case when owners.ok then s.margin_pct end
    from months m, owners,
         lateral public.finance_summary_core(owners.o, m.m, (m.m + interval '1 month - 1 day')::date) s
   order by m.m;
$$;

-- Per job: cost side gated per job's firm.
create or replace function public.get_job_finance(p_job_id uuid default null)
returns table (
  job_id uuid, title text, client text, job_status text,
  budget_total numeric, job_value numeric, quoted numeric, accepted_quotes numeric,
  variations_approved numeric, variations_pending numeric, contract_value numeric,
  invoiced numeric, paid numeric, outstanding numeric, overdue numeric, draft_invoiced numeric,
  invoice_count bigint,
  labour_hours numeric, labour_timesheets numeric, labour_adjustments numeric, labour numeric,
  materials numeric, materials_committed numeric, expenses numeric, other_costs numeric,
  total_costs numeric, gross_profit numeric, margin_pct numeric,
  forecast_revenue numeric, forecast_profit numeric, forecast_margin_pct numeric,
  last_labour_adjustment jsonb
)
language sql stable security definer set search_path = public
as $$
  select r.job_id, r.title, r.client, r.job_status,
         case when g.ok then r.budget_total end,
         r.job_value, r.quoted, r.accepted_quotes, r.variations_approved, r.variations_pending,
         r.contract_value, r.invoiced, r.paid, r.outstanding, r.overdue, r.draft_invoiced,
         r.invoice_count,
         r.labour_hours,
         case when g.ok then r.labour_timesheets end,
         case when g.ok then r.labour_adjustments end,
         case when g.ok then r.labour end,
         case when g.ok then r.materials end,
         case when g.ok then r.materials_committed end,
         case when g.ok then r.expenses end,
         case when g.ok then r.other_costs end,
         case when g.ok then r.total_costs end,
         case when g.ok then r.gross_profit end,
         case when g.ok then r.margin_pct end,
         r.forecast_revenue,
         case when g.ok then r.forecast_profit end,
         case when g.ok then r.forecast_margin_pct end,
         case when g.ok then r.last_labour_adjustment end
    from public.finance_job_rows(array(select public.my_employer_scope()), p_job_id) r
    join public.employer_jobs j on j.id = r.job_id
    cross join lateral (select public.can_see_firm_money(j.user_id) as ok) g;
$$;

-- P&L and ledger are cost documents: refuse for office.
create or replace function public.get_employer_pnl(p_from date, p_to date)
returns table (
  revenue_invoiced numeric, revenue_paid numeric, revenue_outstanding numeric,
  materials numeric, supplier_invoices numeric, expenses numeric
)
language plpgsql stable security definer set search_path = public
as $$
begin
  perform public.require_finance_money();
  return query
  select s.invoiced, s.paid_in, s.outstanding, s.materials, s.supplier_invoices, s.expenses
    from public.finance_summary_core(array(select public.my_employer_scope()), p_from, p_to) s;
end;
$$;

create or replace function public.get_employer_ledger(p_from date, p_to date)
returns table (
  entry_date date, direction text, category text, reference text,
  counterparty text, amount numeric, source_id uuid
)
language plpgsql stable security definer set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
begin
  perform public.require_finance_money();
  return query
  select x.entry_date, x.direction, x.category, x.reference, x.counterparty, x.amount, x.source_id
    from (
      select r.paid_on as entry_date, 'in'::text as direction, 'Sales'::text as category,
             r.invoice_number as reference, r.client as counterparty, r.paid_amount as amount,
             r.id as source_id
        from public.finance_invoice_rows(v_owners) r
       where r.money_state = 'paid' and r.paid_on between p_from and p_to
      union all
      select c.entry_date, 'out',
             case c.cost_type
               when 'materials' then 'Materials'
               when 'supplier_invoices' then 'Supplier invoices'
               when 'expenses' then 'Expenses'
               when 'labour' then 'Labour adjustment'
               else 'Other job costs' end,
             c.reference, c.counterparty, c.amount, c.source_id
        from public.finance_cost_rows(v_owners, p_from, p_to) c
       where c.origin <> 'timesheet'
      union all
      select max(l.work_date), 'out', 'Labour', 'Approved timesheets', l.employee_name,
             sum(l.cost), l.employee_id
        from public.finance_labour_rows(v_owners, p_from, p_to) l
       group by l.employee_id, l.employee_name
    ) x
   order by x.entry_date desc;
end;
$$;

-- Pay rates: only firms whose money the caller can see.
create or replace function public.get_employer_labour_days(p_from date, p_to date)
returns table (
  employee_id uuid, employee_name text, hourly_rate numeric, overtime_multiplier numeric,
  overtime_threshold_hours numeric, work_date date, hours numeric
)
language sql stable security definer set search_path = public
as $$
  select
    e.id, e.name, coalesce(e.hourly_rate, 0),
    coalesce(e.overtime_multiplier, 1.5), coalesce(e.overtime_threshold_hours, 8),
    ts.date, sum(coalesce(ts.total_hours, 0))
  from public.employer_timesheets ts
  join public.employer_employees e on e.id = ts.employee_id
  where e.employer_id in (select public.my_employer_admin_scope())
    and lower(coalesce(ts.status,'')) = 'approved'
    and ts.date between p_from and p_to
  group by e.id, e.name, e.hourly_rate, e.overtime_multiplier,
           e.overtime_threshold_hours, ts.date;
$$;

-- Writers: owner/admin only.
do $$
declare d text;
begin
  d := pg_get_functiondef('public.record_job_cost(uuid, text, numeric, date, text)'::regprocedure);
  d := replace(d,
    $q$  if p_category not in ('materials', 'equipment', 'overheads', 'other') then$q$,
    $q$  if not public.can_see_firm_money(v_owner) then
    raise exception 'Only the owner or an admin can see the firm''s money' using errcode = '42501';
  end if;
  if p_category not in ('materials', 'equipment', 'overheads', 'other') then$q$);
  if position('can_see_firm_money' in d) = 0 then raise exception 'record_job_cost gate not applied'; end if;
  execute d;

  d := pg_get_functiondef('public.set_job_labour(uuid, numeric, text)'::regprocedure);
  d := replace(d,
    $q$  if p_amount is null or p_amount < 0 or p_amount > 10000000 then$q$,
    $q$  if not public.can_see_firm_money(v_owner) then
    raise exception 'Only the owner or an admin can see the firm''s money' using errcode = '42501';
  end if;
  if p_amount is null or p_amount < 0 or p_amount > 10000000 then$q$);
  if position('can_see_firm_money' in d) = 0 then raise exception 'set_job_labour gate not applied'; end if;
  execute d;

  -- Job hub summary: keep quotes/invoices/tests/issues for office; null the
  -- cost side (labour cost, budget, total costs, full finance row).
  d := pg_get_functiondef('public.get_job_hub_summary(uuid)'::regprocedure);
  d := replace(d, $q$  f record;
begin$q$, $q$  f record;
  v_money boolean;
begin$q$);
  d := replace(d, $q$  select * into f from public.finance_job_rows(array[v_job.user_id], p_job_id);$q$,
                  $q$  select * into f from public.finance_job_rows(array[v_job.user_id], p_job_id);
  v_money := public.can_see_firm_money(v_job.user_id);$q$);
  d := replace(d, $q$'labour_cost', coalesce(f.labour, 0),$q$,
                  $q$'labour_cost', case when v_money then coalesce(f.labour, 0) end,$q$);
  d := replace(d, $q$'budget_total', (select budget_total from job_financials where job_id = p_job_id limit 1),$q$,
                  $q$'budget_total', case when v_money then (select budget_total from job_financials where job_id = p_job_id limit 1) end,$q$);
  d := replace(d, $q$'actual_total', coalesce(f.total_costs, 0),$q$,
                  $q$'actual_total', case when v_money then coalesce(f.total_costs, 0) end,$q$);
  d := replace(d, $q$'finance', to_jsonb(f)$q$,
                  $q$'finance', case when v_money then to_jsonb(f)
                     else jsonb_build_object('invoiced', f.invoiced, 'paid', f.paid,
                            'outstanding', f.outstanding, 'contract_value', f.contract_value,
                            'money_hidden', true) end$q$);
  if position('v_money then to_jsonb(f)' in d) = 0 or position($q$'labour_cost', case when v_money$q$ in d) = 0 then
    raise exception 'get_job_hub_summary gate not applied';
  end if;
  execute d;

  -- Hub counts: job profit figures only when money is visible.
  d := pg_get_functiondef('public.get_employer_hub_counts()'::regprocedure);
  d := replace(d, $q$'jobs_gross_profit', (select coalesce(sum(jf.gross_profit), 0) from jf where jf.invoiced > 0),$q$,
                  $q$'jobs_gross_profit', case when public.finance_money_visible() then (select coalesce(sum(jf.gross_profit), 0) from jf where jf.invoiced > 0) end,$q$);
  d := replace(d, $q$'jobs_loss_making', (select count(*) from jf where jf.forecast_profit < 0)$q$,
                  $q$'jobs_loss_making', case when public.finance_money_visible() then (select count(*) from jf where jf.forecast_profit < 0) end$q$);
  if position('finance_money_visible' in d) = 0 then raise exception 'hub counts gate not applied'; end if;
  execute d;
end $$;

revoke all on function public.get_employer_pnl(date, date) from public, anon;
revoke all on function public.get_employer_ledger(date, date) from public, anon;
revoke all on function public.get_employer_labour_days(date, date) from public, anon;
grant execute on function public.get_employer_pnl(date, date) to authenticated;
grant execute on function public.get_employer_ledger(date, date) to authenticated;
grant execute on function public.get_employer_labour_days(date, date) to authenticated;

-- Manual cost log: owner/admin only.
drop policy if exists employer_job_cost_entries_firm_read on public.employer_job_cost_entries;
create policy employer_job_cost_entries_firm_read on public.employer_job_cost_entries
  for select to authenticated
  using (employer_id in (select public.my_employer_admin_scope()));
