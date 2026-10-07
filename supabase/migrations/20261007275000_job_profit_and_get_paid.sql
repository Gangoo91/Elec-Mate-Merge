-- ============================================================================
-- ELE-1824 profit per job + ELE-1823 get paid (Employer Hub), 7 Oct 2026.
--
-- Builds on the ONE finance model (20261007140000/141000/142000). Nothing
-- here re-derives invoiced / costs / profit: get_job_profit reads
-- finance_job_rows and only adds hours, the rate source and the job stage.
--
--  1. employer_jobs.quoted_hours + job_type — quoted hours did not exist
--     anywhere (quote labour lines are too inconsistent to derive them:
--     "1 × hours, hours=8, £720"), so the office enters them on the job.
--  2. employer_cost_rates — what an hour of a person costs the FIRM (pay plus
--     NI, pension, van…), per person and a firm default. Owner/admin only;
--     a separate table so the worker can never read it from their own row.
--  3. finance_labour_rows: rate = cost rate → pay rate (hourly_rate) → firm
--     default → none. Hours with no rate are reported (uncosted_hours), never
--     silently £0. Payroll (get_employer_labour_days) still uses pay rates.
--  4. get_job_profit(job) — the Profit block: quoted · invoiced · labour ·
--     expenses · materials · other · gross profit, running or final, quoted
--     vs actual hours. Office managers get NULL for every cost/profit field.
--  5. get_margin_breakdown(from, to) — Reports: margin by job type and by
--     worker. Owner/admin only (refuses for office).
--  6. get_job_type_hours_history(type) — "your last 5 of these took 11.5 hrs".
--  7. get_my_job_money_status(job) — the worker's job page: hours used of
--     quoted, and (not apprentices) invoice paid/unpaid + the Pay now link
--     for a QR. No costs, no profit, no rates.
--  8. get_firm_card_payments() — Connect status of the firm (not the caller),
--     so co-admins see the truth; invoices sent without a pay link (90 days).
--  9. Job feed line when an invoice on a job is paid, or a deposit lands.
-- ============================================================================

-- 1. Job fields ---------------------------------------------------------------
alter table public.employer_jobs
  add column if not exists quoted_hours numeric(8, 2),
  add column if not exists job_type text;

alter table public.employer_jobs drop constraint if exists employer_jobs_quoted_hours_range;
alter table public.employer_jobs add constraint employer_jobs_quoted_hours_range
  check (quoted_hours is null or (quoted_hours >= 0 and quoted_hours <= 100000));
alter table public.employer_jobs drop constraint if exists employer_jobs_job_type_len;
alter table public.employer_jobs add constraint employer_jobs_job_type_len
  check (job_type is null or char_length(job_type) between 1 and 60);

comment on column public.employer_jobs.quoted_hours is
  'ELE-1824: labour hours the job was priced on, entered by the office (not derived from quote lines). Compared with approved timesheet hours on the job sheet, Job financials and the worker''s job page. Null = not set.';
comment on column public.employer_jobs.job_type is
  'ELE-1824: kind of job (EICR, consumer unit, rewire…) for margin by job type and "your last five of these" hours history. Free text from a preset list; null = not set.';

create index if not exists employer_jobs_user_job_type_idx
  on public.employer_jobs (user_id, job_type) where job_type is not null;

-- 2. Cost rates ---------------------------------------------------------------
create table if not exists public.employer_cost_rates (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  -- null = the firm's default cost rate
  employee_id uuid references public.employer_employees(id) on delete cascade,
  cost_rate numeric(8, 2) not null check (cost_rate > 0 and cost_rate <= 1000),
  updated_by uuid,
  updated_at timestamptz not null default now()
);
create unique index if not exists employer_cost_rates_one_per_person
  on public.employer_cost_rates (employer_id, employee_id) where employee_id is not null;
create unique index if not exists employer_cost_rates_one_default
  on public.employer_cost_rates (employer_id) where employee_id is null;

comment on table public.employer_cost_rates is
  '[EMPLOYER HUB] ELE-1824: what an hour of each team member costs the firm (pay + NI, pension, van…), plus the firm default (employee_id null). Scope: employer_id = firm owner profiles.id. Used by: finance_labour_rows (job profit, Reports, Accounts) — cost rate, else pay rate (employer_employees.hourly_rate), else firm default. Owner/admin only (can_see_firm_money); never visible to the worker. Written only via set_team_cost_rate.';

alter table public.employer_cost_rates enable row level security;
drop policy if exists employer_cost_rates_admin_read on public.employer_cost_rates;
create policy employer_cost_rates_admin_read on public.employer_cost_rates
  for select to authenticated
  using (employer_id in (select public.my_employer_admin_scope()));
revoke all on public.employer_cost_rates from public, anon, authenticated;
grant select on public.employer_cost_rates to authenticated;

-- 3. Labour rows with the rate hierarchy ------------------------------------
-- Same columns as before plus rate and rate_source (appended), so every
-- existing caller keeps working. Dropped first because the return type grows.
drop function if exists public.finance_labour_rows(uuid[], date, date);
create function public.finance_labour_rows(p_employers uuid[], p_from date, p_to date)
returns table (
  timesheet_id uuid, employee_id uuid, employee_name text, employer_id uuid,
  job_id uuid, work_date date, hours numeric, cost numeric,
  rate numeric, rate_source text
)
language sql stable security definer set search_path = public
as $$
  with ts as (
    select t.id, t.employee_id, e.name, e.employer_id, t.job_id, t.date,
           greatest(coalesce(t.total_hours, 0), 0) as h,
           case when pr.cost_rate is not null then pr.cost_rate
                when coalesce(e.hourly_rate, 0) > 0 then e.hourly_rate
                when fd.cost_rate is not null then fd.cost_rate
                else 0 end as rate,
           case when pr.cost_rate is not null then 'cost_rate'
                when coalesce(e.hourly_rate, 0) > 0 then 'pay_rate'
                when fd.cost_rate is not null then 'firm_default'
                else 'none' end as src,
           coalesce(nullif(e.overtime_multiplier, 0), 1.5) as mult,
           greatest(coalesce(nullif(e.overtime_threshold_hours, 0), 8), 0) as thr
      from public.employer_timesheets t
      join public.employer_employees e on e.id = t.employee_id
      left join public.employer_cost_rates pr
        on pr.employer_id = e.employer_id and pr.employee_id = e.id
      left join public.employer_cost_rates fd
        on fd.employer_id = e.employer_id and fd.employee_id is null
     where e.employer_id = any (p_employers)
       and lower(coalesce(t.status, '')) = 'approved'
       and t.date is not null
       and (p_from is null or t.date >= p_from)
       and (p_to is null or t.date <= p_to)
  ), d as (
    select ts.*, sum(h) over (partition by employee_id, date) as day_h from ts
  )
  select id, employee_id, coalesce(name, 'Team member'), employer_id, job_id, date, h,
         case when day_h > 0
              then round(((least(day_h, thr) * rate + greatest(day_h - thr, 0) * rate * mult) * h / day_h)::numeric, 2)
              else 0 end,
         rate, src
    from d;
$$;
revoke all on function public.finance_labour_rows(uuid[], date, date) from public, anon, authenticated;

-- 4. Profit per job ------------------------------------------------------------
create or replace function public.get_job_profit(p_job_id uuid default null)
returns table (
  job_id uuid, title text, client text, job_status text, job_type text,
  stage text,                       -- 'running' | 'final'
  money_visible boolean,
  contract_value numeric, invoiced numeric, paid numeric, outstanding numeric,
  invoice_count bigint,
  labour numeric, labour_adjusted boolean, expenses numeric, materials numeric,
  materials_committed numeric, other_costs numeric, total_costs numeric,
  gross_profit numeric, margin_pct numeric,
  forecast_profit numeric, forecast_margin_pct numeric,
  cost_lines bigint,                -- null for office
  quoted_hours numeric, approved_hours numeric, pending_hours numeric,
  uncosted_hours numeric,           -- null for office
  workers_on_hours bigint
)
language sql stable security definer set search_path = public
as $$
  with owners as (select array(select public.my_employer_scope()) as o),
  r as (
    select f.* from owners, public.finance_job_rows(owners.o, p_job_id) f
  ),
  lab as (
    select l.job_id,
           sum(l.hours) filter (where l.rate_source = 'none') as uncosted,
           count(distinct l.employee_id) as workers
      from owners, public.finance_labour_rows(owners.o, null, null) l
     where l.job_id in (select r.job_id from r)
     group by l.job_id
  ),
  lines as (
    select c.job_id, count(*) filter (where c.amount <> 0) as n
      from owners, public.finance_cost_rows(owners.o, null, null) c
     where c.job_id in (select r.job_id from r)
     group by c.job_id
  ),
  pend as (
    select t.job_id, sum(greatest(coalesce(t.total_hours, 0), 0)) as h
      from public.employer_timesheets t
     where t.job_id in (select r.job_id from r)
       and lower(coalesce(t.status, '')) not in ('approved', 'rejected', 'declined', 'cancelled')
     group by t.job_id
  )
  select r.job_id, r.title, r.client, r.job_status, j.job_type,
         case when j.completed_at is not null
                or lower(coalesce(j.status, '')) in ('completed', 'cancelled')
              then 'final' else 'running' end,
         g.ok,
         r.contract_value, r.invoiced, r.paid, r.outstanding, r.invoice_count,
         case when g.ok then r.labour end,
         case when g.ok then abs(coalesce(r.labour_adjustments, 0)) >= 0.005 end,
         case when g.ok then r.expenses end,
         case when g.ok then r.materials end,
         case when g.ok then r.materials_committed end,
         case when g.ok then r.other_costs end,
         case when g.ok then r.total_costs end,
         case when g.ok then r.gross_profit end,
         case when g.ok then r.margin_pct end,
         case when g.ok then r.forecast_profit end,
         case when g.ok then r.forecast_margin_pct end,
         case when g.ok then coalesce(lines.n, 0) end,
         j.quoted_hours,
         r.labour_hours,
         coalesce(pend.h, 0),
         case when g.ok then coalesce(lab.uncosted, 0) end,
         coalesce(lab.workers, 0)
    from r
    join public.employer_jobs j on j.id = r.job_id
    cross join lateral (select public.can_see_firm_money(j.user_id) as ok) g
    left join lab on lab.job_id = r.job_id
    left join lines on lines.job_id = r.job_id
    left join pend on pend.job_id = r.job_id;
$$;
revoke all on function public.get_job_profit(uuid) from public, anon;
grant execute on function public.get_job_profit(uuid) to authenticated;

-- 5. Cost rates: read + write (owner/admin) ------------------------------------
create or replace function public.get_team_cost_rates(p_firm uuid)
returns table (
  employee_id uuid, name text, pay_rate numeric, cost_rate numeric,
  effective_rate numeric, rate_source text
)
language plpgsql stable security definer set search_path = public
as $$
declare
  v_default numeric;
begin
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can see cost rates' using errcode = '42501';
  end if;
  select c.cost_rate into v_default from public.employer_cost_rates c
   where c.employer_id = p_firm and c.employee_id is null;

  return query
    select null::uuid, 'Firm default'::text, null::numeric, v_default, v_default,
           case when v_default is null then 'none' else 'firm_default' end
    union all
    select e.id, coalesce(e.name, 'Team member'), nullif(e.hourly_rate, 0), pr.cost_rate,
           coalesce(pr.cost_rate, nullif(e.hourly_rate, 0), v_default),
           case when pr.cost_rate is not null then 'cost_rate'
                when coalesce(e.hourly_rate, 0) > 0 then 'pay_rate'
                when v_default is not null then 'firm_default'
                else 'none' end
      from public.employer_employees e
      left join public.employer_cost_rates pr on pr.employer_id = p_firm and pr.employee_id = e.id
     where e.employer_id = p_firm
       and lower(coalesce(e.status, '')) <> 'archived';
end;
$$;
revoke all on function public.get_team_cost_rates(uuid) from public, anon;
grant execute on function public.get_team_cost_rates(uuid) to authenticated;

-- p_employee null = firm default; p_rate null = clear it.
create or replace function public.set_team_cost_rate(p_firm uuid, p_employee uuid, p_rate numeric)
returns numeric
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Sign in again' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'Only the owner or an admin can set cost rates' using errcode = '42501';
  end if;
  if p_employee is not null and not exists (
    select 1 from public.employer_employees e where e.id = p_employee and e.employer_id = p_firm
  ) then
    raise exception 'Team member not found' using errcode = 'P0002';
  end if;
  if p_rate is not null and (p_rate <= 0 or p_rate > 1000) then
    raise exception 'Enter a cost rate between £0.01 and £1,000 an hour' using errcode = '22023';
  end if;

  if p_rate is null then
    delete from public.employer_cost_rates c
     where c.employer_id = p_firm and c.employee_id is not distinct from p_employee;
  elsif p_employee is null then
    insert into public.employer_cost_rates (employer_id, employee_id, cost_rate, updated_by)
    values (p_firm, null, round(p_rate, 2), auth.uid())
    on conflict (employer_id) where employee_id is null
    do update set cost_rate = excluded.cost_rate, updated_by = excluded.updated_by, updated_at = now();
  else
    insert into public.employer_cost_rates (employer_id, employee_id, cost_rate, updated_by)
    values (p_firm, p_employee, round(p_rate, 2), auth.uid())
    on conflict (employer_id, employee_id) where employee_id is not null
    do update set cost_rate = excluded.cost_rate, updated_by = excluded.updated_by, updated_at = now();
  end if;
  return case when p_rate is null then null else round(p_rate, 2) end;
end;
$$;
revoke all on function public.set_team_cost_rate(uuid, uuid, numeric) from public, anon;
grant execute on function public.set_team_cost_rate(uuid, uuid, numeric) to authenticated;

-- 6. Reports: margin by job type and by worker --------------------------------
-- Jobs counted = jobs with a sent/overdue/paid invoice dated in the range;
-- each job contributes its WHOLE-job figures (invoiced and costs to date), so
-- a job's costs are never split across periods. By worker: each job's
-- invoiced and non-timesheet costs are shared by that worker's share of the
-- job's approved hours; their own timesheet labour is theirs.
create or replace function public.get_margin_breakdown(p_from date, p_to date)
returns table (
  dimension text, key text, label text, jobs bigint, hours numeric,
  invoiced numeric, costs numeric, gross_profit numeric, margin_pct numeric,
  quoted_hours numeric, actual_hours_on_quoted numeric
)
language plpgsql stable security definer set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
begin
  perform public.require_finance_money();

  return query
  with inv as (
    select distinct i.job_id
      from public.finance_invoice_rows(v_owners) i
     where i.job_id is not null
       and i.money_state in ('sent', 'overdue', 'paid')
       and (p_from is null or i.issued_on >= p_from)
       and (p_to is null or i.issued_on <= p_to)
  ),
  jr as (
    select f.*, j.job_type, j.quoted_hours as q_hours
      from public.finance_job_rows(v_owners, null) f
      join public.employer_jobs j on j.id = f.job_id
     where f.job_id in (select inv.job_id from inv)
  ),
  by_type as (
    select 'job_type'::text as dimension,
           coalesce(nullif(jr.job_type, ''), '—') as key,
           coalesce(nullif(jr.job_type, ''), 'No job type') as label,
           count(*)::bigint as jobs,
           sum(jr.labour_hours) as hours,
           sum(jr.invoiced) as invoiced,
           sum(jr.total_costs) as costs,
           sum(jr.q_hours) filter (where jr.q_hours is not null) as quoted_hours,
           sum(jr.labour_hours) filter (where jr.q_hours is not null) as actual_hours_on_quoted
      from jr
     group by 1, 2, 3
  ),
  lab as (
    select l.job_id, l.employee_id, max(l.employee_name) as name,
           sum(l.hours) as hours, sum(l.cost) as cost
      from public.finance_labour_rows(v_owners, null, null) l
     where l.job_id in (select jr.job_id from jr)
     group by l.job_id, l.employee_id
  ),
  w as (
    select lab.employee_id, lab.name, lab.job_id, lab.hours, lab.cost,
           case when jr.labour_hours > 0 then lab.hours / jr.labour_hours else 0 end as share,
           jr.invoiced, jr.total_costs, jr.labour_timesheets
      from lab join jr on jr.job_id = lab.job_id
  ),
  by_worker as (
    select 'worker'::text as dimension, w.employee_id::text as key, max(w.name) as label,
           count(distinct w.job_id)::bigint as jobs,
           sum(w.hours) as hours,
           round(sum(w.invoiced * w.share), 2) as invoiced,
           round(sum(w.cost + (w.total_costs - w.labour_timesheets) * w.share), 2) as costs,
           null::numeric as quoted_hours, null::numeric as actual_hours_on_quoted
      from w
     group by w.employee_id
  )
  select x.dimension, x.key, x.label, x.jobs, x.hours, x.invoiced, x.costs,
         x.invoiced - x.costs,
         case when x.invoiced > 0 then round(((x.invoiced - x.costs) / x.invoiced) * 100, 1) end,
         x.quoted_hours, x.actual_hours_on_quoted
    from (select * from by_type union all select * from by_worker) x
   order by x.dimension, x.invoiced desc;
end;
$$;
revoke all on function public.get_margin_breakdown(date, date) from public, anon;
grant execute on function public.get_margin_breakdown(date, date) to authenticated;

-- 7. Hours history for a job type ("your last five of these") ---------------
-- Hours only, no money — office managers may use it when pricing.
create or replace function public.get_job_type_hours_history(p_job_type text, p_exclude_job uuid default null)
returns jsonb
language sql stable security definer set search_path = public
as $$
  with jobs as (
    select j.id, j.title, j.quoted_hours,
           coalesce(j.completed_at, j.updated_at) as closed_at,
           (select sum(greatest(coalesce(t.total_hours, 0), 0))
              from public.employer_timesheets t
             where t.job_id = j.id and lower(coalesce(t.status, '')) = 'approved') as hours
      from public.employer_jobs j
     where j.user_id in (select public.my_employer_scope())
       and nullif(btrim(p_job_type), '') is not null
       and lower(j.job_type) = lower(btrim(p_job_type))
       and (p_exclude_job is null or j.id <> p_exclude_job)
       and not coalesce(j.is_template, false)
       and (j.completed_at is not null or lower(coalesce(j.status, '')) = 'completed')
  ),
  last5 as (
    select * from jobs where coalesce(hours, 0) > 0 order by closed_at desc limit 5
  )
  select jsonb_build_object(
    'job_type', btrim(p_job_type),
    'count', (select count(*) from last5),
    'avg_hours', (select round(avg(hours), 1) from last5),
    'avg_quoted_hours', (select round(avg(quoted_hours), 1) from last5 where quoted_hours is not null),
    'quoted_count', (select count(*) from last5 where quoted_hours is not null),
    'jobs', coalesce((select jsonb_agg(jsonb_build_object(
               'id', id, 'title', title, 'hours', round(hours, 1),
               'quoted_hours', quoted_hours, 'closed_at', closed_at) order by closed_at desc)
             from last5), '[]'::jsonb)
  );
$$;
revoke all on function public.get_job_type_hours_history(text, uuid) from public, anon;
grant execute on function public.get_job_type_hours_history(text, uuid) to authenticated;

-- 8. The worker's view: hours against quoted, invoice paid/unpaid -----------
create or replace function public.get_my_job_money_status(p_job_id uuid)
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  v_emp record;
  v_job record;
  v_active boolean;
  v_show_invoices boolean;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;

  select e.id, e.employer_id, e.team_role into v_emp
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
   where a.job_id = p_job_id
     and e.user_id = auth.uid()
     and e.employer_id is not null
     and lower(coalesce(e.status, '')) = 'active'
   order by a.assigned_at desc nulls last
   limit 1;
  if v_emp.id is null then
    raise exception 'This job is not one of yours' using errcode = '42501';
  end if;

  select j.id, j.user_id, j.quoted_hours into v_job
    from public.employer_jobs j where j.id = p_job_id;
  if v_job.user_id is distinct from v_emp.employer_id then
    raise exception 'This job is not one of yours' using errcode = '42501';
  end if;

  select cp.stripe_account_id is not null and cp.stripe_account_status = 'active' into v_active
    from public.company_profiles cp where cp.user_id = v_job.user_id limit 1;

  -- Apprentices see hours only; the qualified crew can take payment on site.
  v_show_invoices := public.employer_access_role(v_emp.team_role) not in ('apprentice');

  return jsonb_build_object(
    'quoted_hours', v_job.quoted_hours,
    'approved_hours', coalesce((
      select round(sum(greatest(coalesce(t.total_hours, 0), 0)), 2)
        from public.employer_timesheets t
       where t.job_id = p_job_id and lower(coalesce(t.status, '')) = 'approved'), 0),
    'pending_hours', coalesce((
      select round(sum(greatest(coalesce(t.total_hours, 0), 0)), 2)
        from public.employer_timesheets t
       where t.job_id = p_job_id
         and lower(coalesce(t.status, '')) not in ('approved', 'rejected', 'declined', 'cancelled')), 0),
    'my_hours', coalesce((
      select round(sum(greatest(coalesce(t.total_hours, 0), 0)), 2)
        from public.employer_timesheets t
       where t.job_id = p_job_id and t.employee_id = v_emp.id
         and lower(coalesce(t.status, '')) not in ('rejected', 'declined', 'cancelled')), 0),
    'show_invoices', v_show_invoices,
    'card_payments', coalesce(v_active, false),
    'invoices', case when not v_show_invoices then '[]'::jsonb else coalesce((
      select jsonb_agg(x.j order by x.issued desc)
        from (
          select i.issued_at as issued,
                 jsonb_build_object(
                   'id', i.id,
                   'number', i.invoice_number,
                   'state', i.money_state,
                   'amount', i.amount,
                   'balance', i.balance,
                   'paid_on', i.paid_on,
                   'paid_at', q.invoice_paid_at,
                   'method', q.invoice_payment_method,
                   'pay_url', case when coalesce(v_active, false)
                                    and i.money_state in ('sent', 'overdue') and i.balance > 0
                               then 'https://www.elec-mate.com/pay/' || i.id end
                 ) as j
            from public.finance_invoice_rows(array[v_job.user_id]) i
            join public.quotes q on q.id = i.id
           where i.job_id = p_job_id
             and i.money_state in ('sent', 'overdue', 'paid')
           order by i.issued_at desc
           limit 5
        ) x), '[]'::jsonb) end
  );
end;
$$;
revoke all on function public.get_my_job_money_status(uuid) from public, anon;
grant execute on function public.get_my_job_money_status(uuid) to authenticated;

-- 9. Card payments status for the FIRM -----------------------------------------
create or replace function public.get_firm_card_payments()
returns table (
  employer_id uuid, status text, is_owner boolean,
  sent_without_link_90d bigint, value_without_link_90d numeric,
  card_payments_90d bigint
)
language sql stable security definer set search_path = public
as $$
  select f.id,
         case when cp.stripe_account_id is null then 'none'
              else coalesce(nullif(cp.stripe_account_status, ''), 'pending') end,
         f.id = auth.uid(),
         (select count(*) from public.quotes q
           where q.user_id = f.id and q.deleted_at is null and coalesce(q.invoice_raised, false)
             and q.invoice_sent_at >= now() - interval '90 days'
             and q.stripe_payment_link_url is null),
         (select coalesce(sum(q.total), 0) from public.quotes q
           where q.user_id = f.id and q.deleted_at is null and coalesce(q.invoice_raised, false)
             and q.invoice_sent_at >= now() - interval '90 days'
             and q.stripe_payment_link_url is null),
         (select count(*) from public.quotes q
           where q.user_id = f.id and q.deleted_at is null and coalesce(q.invoice_raised, false)
             and q.invoice_paid_at >= now() - interval '90 days'
             and lower(coalesce(q.invoice_payment_method, '')) = 'card')
    from (select public.my_employer_scope() as id) f
    left join public.company_profiles cp on cp.user_id = f.id;
$$;
revoke all on function public.get_firm_card_payments() from public, anon;
grant execute on function public.get_firm_card_payments() to authenticated;

-- 10. Job feed: "Paid £1,240.00 by card · Invoice 2026/058" -------------------
create or replace function public.trg_job_feed_payment()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  v_how text;
  v_amount numeric;
begin
  if new.employer_job_id is null or new.deleted_at is not null then
    return new;
  end if;

  v_how := case lower(coalesce(new.invoice_payment_method, ''))
             when 'card' then ' by card'
             when 'stripe' then ' by card'
             when 'bank_transfer' then ' by bank transfer'
             when 'bank transfer' then ' by bank transfer'
             when 'cash' then ' in cash'
             when 'cheque' then ' by cheque'
             else '' end;

  -- Invoice paid (by the Stripe webhook, Mark paid, or the accounting sync).
  if coalesce(new.invoice_raised, false)
     and (new.invoice_paid_at is not null or lower(coalesce(new.invoice_status, '')) = 'paid')
     and not (old.invoice_paid_at is not null or lower(coalesce(old.invoice_status, '')) = 'paid') then
    v_amount := coalesce(nullif(new.total_paid, 0), new.total, 0);
    insert into public.employer_job_comments (job_id, author_name, content, comment_type)
    values (new.employer_job_id, 'Payments',
            'Paid £' || to_char(v_amount, 'FM999,999,990.00') || v_how
              || ' · Invoice ' || coalesce(new.invoice_number, new.quote_number, ''),
            'payment');
  end if;

  -- Deposit landed on the quote.
  if new.deposit_paid_at is not null and old.deposit_paid_at is null then
    v_amount := coalesce(new.deposit_amount_pennies, 0) / 100.0;
    insert into public.employer_job_comments (job_id, author_name, content, comment_type)
    values (new.employer_job_id, 'Payments',
            'Deposit paid'
              || case when v_amount > 0 then ' £' || to_char(v_amount, 'FM999,999,990.00') else '' end
              || ' by card · Quote ' || coalesce(new.quote_number, ''),
            'payment');
  end if;
  return new;
exception when others then
  raise warning '[trg_job_feed_payment] %', sqlerrm;
  return new;
end;
$$;
revoke all on function public.trg_job_feed_payment() from public, anon, authenticated;

drop trigger if exists trg_quotes_job_feed_payment on public.quotes;
create trigger trg_quotes_job_feed_payment
  after update of invoice_status, invoice_paid_at, deposit_paid_at on public.quotes
  for each row execute function public.trg_job_feed_payment();
