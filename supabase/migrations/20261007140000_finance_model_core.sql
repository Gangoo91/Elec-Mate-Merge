-- ============================================================================
-- ONE FINANCE MODEL (ELE-1992 / ELE-1981 / ELE-1983)
--
-- Every money figure in the Employer Hub (Reports, Accounts, Job financials,
-- the hub landing cards, the Quotes and Clients pages) is computed HERE, once.
-- The client mirrors only the invoice status mapping, in
-- src/lib/financeDefinitions.ts — keep the two in step.
--
-- DEFINITIONS
--   Invoice state (one per invoice row in `quotes`, invoice_raised = true):
--     void     invoice_status cancelled / void / written off
--     paid     invoice_paid_at is set OR invoice_status = 'paid'
--     draft    invoice_status = 'draft' (never sent; never counted as money)
--     overdue  not paid/draft/void AND (due date before today (UK) OR status 'overdue')
--     sent     everything else (sent, viewed, part paid …)
--   Invoiced (accrual revenue) = sum(total) of sent + overdue + paid invoices,
--     dated by invoice date. Drafts and void never count.
--   Paid in (cash)             = sum(total_paid, else total) of PAID invoices,
--     dated by invoice_paid_at. An invoice marked paid WITHOUT a date (80 live
--     rows, Oct 2026) is treated as paid on its due date (or today if that is
--     still ahead), else its invoice date — never its updated_at, which bulk
--     edits move. Part payments on unpaid invoices reduce the balance but are
--     not cash-dated, so they are not in "paid in".
--   Outstanding                = sum(total − total_paid) of sent + overdue
--     invoices, as at today. Excludes drafts, paid and void.
--   Overdue                    = the overdue part of outstanding.
--   Costs (dated when incurred):
--     materials          purchase orders not Draft/Cancelled, at order date —
--                        a PO matched to supplier bills counts the bills' total
--                        instead (never both); plus manual "materials" job costs
--     supplier_invoices  supplier bills NOT matched to a counted PO
--     expenses           expense claims Approved or Paid, at submitted date
--     labour             approved timesheet hours × the worker's hourly rate,
--                        overtime per worker per day above their threshold at
--                        their multiplier (the same maths as payCalculations.ts),
--                        plus logged labour adjustments on a job
--     other              manual equipment / overheads / other job costs
--   Gross profit = Invoiced − all costs.  Margin % = gross profit ÷ invoiced.
--     Profit is ALWAYS on the invoiced (accrual) basis, everywhere it appears.
--   Job contract value = accepted quotes for the job (else the job's value,
--     else open quotes) + approved variations. Forecast revenue =
--     max(contract value, invoiced). Budget is a separate, manual figure.
--
-- Layout: private *_rows / *_core functions take an explicit owner list and
-- are callable only from these SECURITY DEFINER wrappers; every public RPC
-- scopes to my_employer_scope() (the firm owner and its active managers).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Manual job costs + the labour override log
-- ---------------------------------------------------------------------------
create table if not exists public.employer_job_cost_entries (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  category text not null
    check (category in ('labour_adjustment', 'materials', 'equipment', 'overheads', 'other')),
  amount numeric(12, 2) not null,
  incurred_on date not null default ((now() at time zone 'Europe/London')::date),
  note text,
  -- Labour adjustments record the effective labour before and after, so the
  -- log reads "changed £212.50 → £300.00 because …".
  previous_value numeric(12, 2),
  new_value numeric(12, 2),
  created_by uuid,
  created_by_name text,
  created_at timestamptz not null default now()
);

create index if not exists employer_job_cost_entries_job_idx on public.employer_job_cost_entries (job_id);
create index if not exists employer_job_cost_entries_employer_idx
  on public.employer_job_cost_entries (employer_id, incurred_on);

comment on table public.employer_job_cost_entries is
  '[EMPLOYER HUB] Append-only log of manual job costs (materials bought outside a PO, equipment, overheads) and labour overrides (category labour_adjustment, with previous/new effective labour and a reason). Scope: employer_id = the firm (owner profiles.id); managers via my_employer_scope(). Used by: Job financials, Accounts, Reports (the shared finance model). Rule: written ONLY via record_job_cost / set_job_labour RPCs; never updated or deleted — correct with a new entry.';

alter table public.employer_job_cost_entries enable row level security;

drop policy if exists employer_job_cost_entries_firm_read on public.employer_job_cost_entries;
create policy employer_job_cost_entries_firm_read on public.employer_job_cost_entries
  for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

revoke all on public.employer_job_cost_entries from public, anon, authenticated;
grant select on public.employer_job_cost_entries to authenticated;

-- ---------------------------------------------------------------------------
-- 2. Private building blocks (explicit owner list; no scoping of their own)
-- ---------------------------------------------------------------------------

-- Canonical invoice rows.
create or replace function public.finance_invoice_rows(p_owners uuid[])
returns table (
  id uuid, owner_id uuid, job_id uuid, customer_id uuid, client text,
  invoice_number text, project text, amount numeric, paid_amount numeric,
  balance numeric, money_state text, issued_on date, due_on date, paid_on date,
  created_at timestamptz, issued_at timestamptz
)
language sql stable security definer set search_path = public
as $$
  with base as (
    select q.*,
           lower(coalesce(nullif(q.invoice_status, ''), 'draft')) as st,
           (now() at time zone 'Europe/London')::date as today
      from public.quotes q
     where q.user_id = any (p_owners)
       and q.deleted_at is null
       and coalesce(q.invoice_raised, false)
  ), s as (
    select b.*,
           case
             when b.st in ('cancelled', 'canceled', 'void', 'voided', 'written_off', 'written off') then 'void'
             when b.invoice_paid_at is not null or b.st = 'paid' then 'paid'
             when b.st = 'draft' then 'draft'
             when b.st = 'overdue'
               or (b.invoice_due_date is not null
                   and (b.invoice_due_date at time zone 'Europe/London')::date < b.today) then 'overdue'
             else 'sent'
           end as state
      from base b
  )
  select s.id, s.user_id, s.employer_job_id, s.customer_id,
         coalesce(nullif(s.client_data ->> 'name', ''), 'Client'),
         coalesce(s.invoice_number, s.quote_number),
         nullif(s.job_details ->> 'title', ''),
         coalesce(s.total, 0),
         case when s.state = 'paid' then coalesce(nullif(s.total_paid, 0), s.total, 0)
              else least(greatest(coalesce(s.total_paid, 0), 0), coalesce(s.total, 0)) end,
         case when s.state in ('sent', 'overdue')
              then greatest(coalesce(s.total, 0) - coalesce(s.total_paid, 0), 0)
              else 0 end,
         s.state,
         (coalesce(s.invoice_date, s.created_at) at time zone 'Europe/London')::date,
         (s.invoice_due_date at time zone 'Europe/London')::date,
         case when s.state = 'paid'
              then (coalesce(s.invoice_paid_at,
                             least(s.invoice_due_date, now()),
                             s.invoice_date, s.created_at) at time zone 'Europe/London')::date
         end,
         s.created_at,
         coalesce(s.invoice_date, s.created_at)
    from s;
$$;

-- Labour per approved timesheet row. Overtime is decided per worker per DAY
-- (all their approved hours that day, whatever the job), exactly as
-- splitDailyOvertime + grossPay do; a day's cost is then shared across that
-- day's rows pro rata by hours, so job labour always sums to firm labour.
-- Threshold/multiplier of 0 fall back to 8 h / 1.5× like the client's `||`.
-- Each row's share is rounded to the penny so firm, ledger and job totals are
-- sums of the same pennies.
create or replace function public.finance_labour_rows(p_employers uuid[], p_from date, p_to date)
returns table (
  timesheet_id uuid, employee_id uuid, employee_name text, employer_id uuid,
  job_id uuid, work_date date, hours numeric, cost numeric
)
language sql stable security definer set search_path = public
as $$
  with ts as (
    select t.id, t.employee_id, e.name, e.employer_id, t.job_id, t.date,
           greatest(coalesce(t.total_hours, 0), 0) as h,
           coalesce(e.hourly_rate, 0) as rate,
           coalesce(nullif(e.overtime_multiplier, 0), 1.5) as mult,
           greatest(coalesce(nullif(e.overtime_threshold_hours, 0), 8), 0) as thr
      from public.employer_timesheets t
      join public.employer_employees e on e.id = t.employee_id
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
              else 0 end
    from d;
$$;

-- Every cost line, typed and dated. The P&L, the ledger and job financials
-- all aggregate THIS — which is why they cannot disagree.
create or replace function public.finance_cost_rows(p_owners uuid[], p_from date, p_to date)
returns table (
  source_id uuid, cost_type text, entry_date date, job_id uuid,
  reference text, counterparty text, amount numeric, origin text
)
language sql stable security definer set search_path = public
as $$
  with po as (
    select mo.*, coalesce(mo.order_date, (mo.created_at at time zone 'Europe/London')::date) as d
      from public.employer_material_orders mo
     where mo.employer_id = any (p_owners)
       and lower(coalesce(mo.status, '')) not in ('draft', 'cancelled', 'canceled')
  ), bills as (
    select si.*, (si.created_at at time zone 'Europe/London')::date as d
      from public.employer_supplier_invoices si
     where si.employer_id = any (p_owners)
  )
  -- Materials: counted POs (matched bills' total replaces the PO total)
  select po.id, 'materials'::text, po.d, po.job_id, po.order_number,
         coalesce(sup.name, 'Supplier'),
         coalesce((select sum(coalesce(b.invoice_total, 0)) from bills b where b.order_id = po.id),
                  coalesce(po.total, 0)),
         'purchase_order'::text
    from po
    left join public.employer_suppliers sup on sup.id = po.supplier_id
   where (p_from is null or po.d >= p_from) and (p_to is null or po.d <= p_to)

  union all
  -- Supplier bills not matched to a counted PO
  select b.id, 'supplier_invoices', b.d, null::uuid, b.invoice_number,
         coalesce(b.supplier_name, 'Supplier'), coalesce(b.invoice_total, 0), 'supplier_bill'
    from bills b
   where (b.order_id is null or not exists (select 1 from po where po.id = b.order_id))
     and (p_from is null or b.d >= p_from) and (p_to is null or b.d <= p_to)

  union all
  -- Expense claims, approved or paid, dated when incurred
  select ec.id, 'expenses',
         coalesce(ec.submitted_date, (ec.created_at at time zone 'Europe/London')::date),
         ec.job_id,
         coalesce(nullif(ec.description, ''), nullif(ec.category, ''), 'Expense claim'),
         coalesce(e.name, 'Team member'), coalesce(ec.amount, 0), 'expense_claim'
    from public.employer_expense_claims ec
    join public.employer_employees e on e.id = ec.employee_id
   where e.employer_id = any (p_owners)
     and lower(coalesce(ec.status, '')) in ('approved', 'paid')
     and (p_from is null or coalesce(ec.submitted_date, (ec.created_at at time zone 'Europe/London')::date) >= p_from)
     and (p_to is null or coalesce(ec.submitted_date, (ec.created_at at time zone 'Europe/London')::date) <= p_to)

  union all
  -- Labour from approved timesheets
  select l.timesheet_id, 'labour', l.work_date, l.job_id, 'Approved timesheet',
         l.employee_name, l.cost, 'timesheet'
    from public.finance_labour_rows(p_owners, p_from, p_to) l

  union all
  -- Manual job costs and labour adjustments
  select jc.id,
         case jc.category when 'labour_adjustment' then 'labour'
                          when 'materials' then 'materials'
                          else 'other' end,
         jc.incurred_on, jc.job_id,
         coalesce(nullif(jc.note, ''), initcap(replace(jc.category, '_', ' '))),
         coalesce(jc.created_by_name, 'Manual entry'), jc.amount, 'manual:' || jc.category
    from public.employer_job_cost_entries jc
   where jc.employer_id = any (p_owners)
     and (p_from is null or jc.incurred_on >= p_from)
     and (p_to is null or jc.incurred_on <= p_to);
$$;

-- The firm summary for a period (null bounds = all time).
create or replace function public.finance_summary_core(p_owners uuid[], p_from date, p_to date)
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
  with inv as (select * from public.finance_invoice_rows(p_owners)),
  today as (select (now() at time zone 'Europe/London')::date as d),
  c as (
    select cost_type, sum(amount) as amt
      from public.finance_cost_rows(p_owners, p_from, p_to)
     group by cost_type
  ),
  agg as (
    select
      coalesce(sum(amount) filter (where money_state in ('sent', 'overdue', 'paid')
        and (p_from is null or issued_on >= p_from) and (p_to is null or issued_on <= p_to)), 0) as invoiced,
      count(*) filter (where money_state in ('sent', 'overdue', 'paid')
        and (p_from is null or issued_on >= p_from) and (p_to is null or issued_on <= p_to)) as invoice_count,
      coalesce(sum(paid_amount) filter (where money_state = 'paid'
        and (p_from is null or paid_on >= p_from) and (p_to is null or paid_on <= p_to)), 0) as paid_in,
      count(*) filter (where money_state = 'paid'
        and (p_from is null or paid_on >= p_from) and (p_to is null or paid_on <= p_to)) as paid_count,
      coalesce(sum(amount) filter (where money_state = 'draft'
        and (p_from is null or issued_on >= p_from) and (p_to is null or issued_on <= p_to)), 0) as draft_value,
      count(*) filter (where money_state = 'draft'
        and (p_from is null or issued_on >= p_from) and (p_to is null or issued_on <= p_to)) as draft_count,
      coalesce(sum(balance) filter (where money_state in ('sent', 'overdue')), 0) as outstanding,
      count(*) filter (where money_state in ('sent', 'overdue')) as outstanding_count,
      coalesce(sum(balance) filter (where money_state = 'overdue'), 0) as overdue,
      count(*) filter (where money_state = 'overdue') as overdue_count,
      coalesce(sum(paid_amount) filter (where money_state = 'paid'
        and paid_on > (select d from today) - 30), 0) as paid_last_30d
      from inv
  ),
  oq as (
    -- Open quote = sent to the client, still awaiting an answer.
    select coalesce(sum(coalesce(q.total, 0)), 0) as v, count(*) as n
      from public.quotes q
     where q.user_id = any (p_owners)
       and q.deleted_at is null
       and not coalesce(q.invoice_raised, false)
       and lower(coalesce(q.status, '')) = 'sent'
       and coalesce(q.acceptance_status, 'pending')
           not in ('accepted', 'accepted_pending_deposit', 'rejected', 'declined')
  ),
  costs as (
    select
      coalesce((select amt from c where cost_type = 'materials'), 0) as materials,
      coalesce((select amt from c where cost_type = 'supplier_invoices'), 0) as supplier_invoices,
      coalesce((select amt from c where cost_type = 'expenses'), 0) as expenses,
      coalesce((select amt from c where cost_type = 'labour'), 0) as labour,
      coalesce((select amt from c where cost_type = 'other'), 0) as other_costs
  )
  select p_from, p_to,
         a.invoiced, a.invoice_count, a.paid_in, a.paid_count,
         a.draft_value, a.draft_count, a.outstanding, a.outstanding_count,
         a.overdue, a.overdue_count, a.paid_last_30d,
         oq.v, oq.n,
         k.materials, k.supplier_invoices, k.expenses, k.labour, k.other_costs,
         k.materials + k.supplier_invoices + k.expenses + k.labour + k.other_costs,
         a.invoiced - (k.materials + k.supplier_invoices + k.expenses + k.labour + k.other_costs),
         case when a.invoiced > 0
              then round(((a.invoiced - (k.materials + k.supplier_invoices + k.expenses + k.labour + k.other_costs))
                          / a.invoiced) * 100, 1)
         end
    from agg a, oq, costs k;
$$;

-- Per-job finance (all time). p_job_id null = every live job.
create or replace function public.finance_job_rows(p_owners uuid[], p_job_id uuid)
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
  with jobs as (
    select j.* from public.employer_jobs j
     where j.user_id = any (p_owners)
       and (p_job_id is not null and j.id = p_job_id
            or p_job_id is null and j.archived_at is null and not coalesce(j.is_template, false))
  ),
  inv as (
    select r.job_id,
           sum(r.amount) filter (where r.money_state in ('sent', 'overdue', 'paid')) as invoiced,
           sum(r.paid_amount) filter (where r.money_state = 'paid') as paid,
           sum(r.balance) as outstanding,
           sum(r.balance) filter (where r.money_state = 'overdue') as overdue,
           sum(r.amount) filter (where r.money_state = 'draft') as draft_invoiced,
           count(*) filter (where r.money_state in ('sent', 'overdue', 'paid')) as invoice_count
      from public.finance_invoice_rows(p_owners) r
     where r.job_id in (select id from jobs)
     group by r.job_id
  ),
  qt as (
    select q.employer_job_id as job_id,
           sum(coalesce(q.total, 0)) filter (
             where coalesce(q.acceptance_status, '') not in ('rejected', 'declined')
               and lower(coalesce(q.status, '')) <> 'rejected') as quoted,
           sum(coalesce(q.total, 0)) filter (
             where q.acceptance_status in ('accepted', 'accepted_pending_deposit')
                or lower(coalesce(q.status, '')) = 'approved') as accepted
      from public.quotes q
     where q.employer_job_id in (select id from jobs)
       and q.deleted_at is null
       and not coalesce(q.invoice_raised, false)
     group by q.employer_job_id
  ),
  vo as (
    select v.job_id,
           sum(coalesce(v.value, 0)) filter (where v.status = 'Approved') as approved,
           sum(coalesce(v.value, 0)) filter (where v.status = 'Pending') as pending
      from public.variation_orders v
     where v.job_id in (select id from jobs)
     group by v.job_id
  ),
  cost as (
    select c.job_id,
           sum(c.amount) filter (where c.origin = 'timesheet') as labour_ts,
           sum(c.amount) filter (where c.origin = 'manual:labour_adjustment') as labour_adj,
           sum(c.amount) filter (where c.cost_type = 'materials') as materials,
           sum(c.amount) filter (where c.cost_type = 'expenses') as expenses,
           sum(c.amount) filter (where c.cost_type in ('other', 'supplier_invoices')) as other
      from public.finance_cost_rows(p_owners, null, null) c
     where c.job_id in (select id from jobs)
     group by c.job_id
  ),
  hrs as (
    select l.job_id, sum(l.hours) as hours
      from public.finance_labour_rows(p_owners, null, null) l
     where l.job_id in (select id from jobs)
     group by l.job_id
  ),
  committed as (
    select mo.job_id, sum(coalesce(mo.total, 0)) as v
      from public.employer_material_orders mo
     where mo.job_id in (select id from jobs)
       and lower(coalesce(mo.status, '')) in ('sent', 'confirmed', 'part-received')
     group by mo.job_id
  ),
  last_adj as (
    select distinct on (jc.job_id) jc.job_id,
           jsonb_build_object('amount', jc.amount, 'previous_value', jc.previous_value,
                              'new_value', jc.new_value, 'note', jc.note,
                              'by', jc.created_by_name, 'at', jc.created_at) as j
      from public.employer_job_cost_entries jc
     where jc.job_id in (select id from jobs) and jc.category = 'labour_adjustment'
     order by jc.job_id, jc.created_at desc
  ),
  base as (
    select j.id, j.title, j.client, j.status,
           coalesce(jf.budget_total, 0) as budget_total,
           coalesce(j.value, 0) as job_value,
           coalesce(qt.quoted, 0) as quoted,
           coalesce(qt.accepted, 0) as accepted,
           coalesce(vo.approved, 0) as vo_approved,
           coalesce(vo.pending, 0) as vo_pending,
           coalesce(inv.invoiced, 0) as invoiced,
           coalesce(inv.paid, 0) as paid,
           coalesce(inv.outstanding, 0) as outstanding,
           coalesce(inv.overdue, 0) as overdue,
           coalesce(inv.draft_invoiced, 0) as draft_invoiced,
           coalesce(inv.invoice_count, 0) as invoice_count,
           coalesce(hrs.hours, 0) as labour_hours,
           coalesce(cost.labour_ts, 0) as labour_ts,
           coalesce(cost.labour_adj, 0) as labour_adj,
           coalesce(cost.materials, 0) as materials,
           coalesce(committed.v, 0) as committed,
           coalesce(cost.expenses, 0) as expenses,
           coalesce(cost.other, 0) as other,
           last_adj.j as last_adj
      from jobs j
      left join lateral (select f.budget_total from public.job_financials f
                          where f.job_id = j.id limit 1) jf on true
      left join inv on inv.job_id = j.id
      left join qt on qt.job_id = j.id
      left join vo on vo.job_id = j.id
      left join cost on cost.job_id = j.id
      left join hrs on hrs.job_id = j.id
      left join committed on committed.job_id = j.id
      left join last_adj on last_adj.job_id = j.id
  ),
  calc as (
    select b.*,
           coalesce(nullif(b.accepted, 0), nullif(b.job_value, 0), b.quoted) + b.vo_approved as contract_value,
           b.labour_ts + b.labour_adj as labour,
           b.labour_ts + b.labour_adj + b.materials + b.expenses + b.other as total_costs
      from base b
  )
  select c.id, c.title, c.client, c.status,
         c.budget_total, c.job_value, c.quoted, c.accepted,
         c.vo_approved, c.vo_pending, c.contract_value,
         c.invoiced, c.paid, c.outstanding, c.overdue, c.draft_invoiced, c.invoice_count,
         c.labour_hours, c.labour_ts, c.labour_adj, c.labour,
         c.materials, c.committed, c.expenses, c.other,
         c.total_costs,
         c.invoiced - c.total_costs,
         case when c.invoiced > 0 then round(((c.invoiced - c.total_costs) / c.invoiced) * 100, 1) end,
         greatest(c.contract_value, c.invoiced),
         greatest(c.contract_value, c.invoiced) - c.total_costs,
         case when greatest(c.contract_value, c.invoiced) > 0
              then round(((greatest(c.contract_value, c.invoiced) - c.total_costs)
                          / greatest(c.contract_value, c.invoiced)) * 100, 1) end,
         c.last_adj
    from calc c;
$$;

-- Lock the building blocks: only the definer wrappers below may call them.
revoke all on function public.finance_invoice_rows(uuid[]) from public, anon, authenticated;
revoke all on function public.finance_labour_rows(uuid[], date, date) from public, anon, authenticated;
revoke all on function public.finance_cost_rows(uuid[], date, date) from public, anon, authenticated;
revoke all on function public.finance_summary_core(uuid[], date, date) from public, anon, authenticated;
revoke all on function public.finance_job_rows(uuid[], uuid) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- 3. Public, firm-scoped RPCs
-- ---------------------------------------------------------------------------

-- The headline numbers for a period (null, null = all time).
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
  select * from public.finance_summary_core(
    array(select public.my_employer_scope()), p_from, p_to);
$$;

-- One row per calendar month (oldest first), same maths as the summary.
create or replace function public.get_finance_monthly(p_months int default 6)
returns table (
  month_start date, invoiced numeric, paid_in numeric, total_costs numeric,
  gross_profit numeric, margin_pct numeric
)
language sql stable security definer set search_path = public
as $$
  with owners as (select array(select public.my_employer_scope()) as o),
  months as (
    select (date_trunc('month', (now() at time zone 'Europe/London'))::date
            - make_interval(months => g))::date as m
      from generate_series(0, greatest(least(coalesce(p_months, 6), 36), 1) - 1) g
  )
  select m.m, s.invoiced, s.paid_in, s.total_costs, s.gross_profit, s.margin_pct
    from months m, owners,
         lateral public.finance_summary_core(owners.o, m.m, (m.m + interval '1 month - 1 day')::date) s
   order by m.m;
$$;

-- Per-job finance; null = every live job in the firm.
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
  select * from public.finance_job_rows(array(select public.my_employer_scope()), p_job_id);
$$;

-- Record a manual cost against a job (materials bought outside a PO,
-- equipment, overheads, other). Negative amounts are corrections and need a note.
create or replace function public.record_job_cost(
  p_job_id uuid, p_category text, p_amount numeric,
  p_incurred_on date default null, p_note text default null
)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  v_owner uuid;
  v_id uuid;
  v_name text;
begin
  select j.user_id into v_owner from public.employer_jobs j
   where j.id = p_job_id and j.user_id in (select public.my_employer_scope());
  if v_owner is null then
    raise exception 'Job not found' using errcode = 'P0002';
  end if;
  if p_category not in ('materials', 'equipment', 'overheads', 'other') then
    raise exception 'Unknown cost category %', p_category using errcode = '22023';
  end if;
  if p_amount is null or p_amount = 0 or abs(p_amount) > 10000000 then
    raise exception 'Enter an amount' using errcode = '22023';
  end if;
  if p_amount < 0 and coalesce(btrim(p_note), '') = '' then
    raise exception 'A correction needs a note' using errcode = '22023';
  end if;

  select coalesce(nullif(p.full_name, ''), 'Team member') into v_name
    from public.profiles p where p.id = auth.uid();

  insert into public.employer_job_cost_entries
    (employer_id, job_id, category, amount, incurred_on, note, created_by, created_by_name)
  values
    (v_owner, p_job_id, p_category, round(p_amount, 2),
     coalesce(p_incurred_on, (now() at time zone 'Europe/London')::date),
     nullif(btrim(p_note), ''), auth.uid(), coalesce(v_name, 'Team member'))
  returning id into v_id;

  perform public.refresh_job_financial_actuals(p_job_id);
  return v_id;
end;
$$;

-- Override a job's labour: logs an adjustment so that effective labour becomes
-- p_amount. Timesheet labour is never edited; the reason is mandatory.
-- To go back to timesheet labour, call with p_amount = labour_timesheets.
create or replace function public.set_job_labour(p_job_id uuid, p_amount numeric, p_reason text)
returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  v_owner uuid;
  v_current numeric;
  v_delta numeric;
  v_id uuid;
  v_name text;
begin
  select j.user_id into v_owner from public.employer_jobs j
   where j.id = p_job_id and j.user_id in (select public.my_employer_scope());
  if v_owner is null then
    raise exception 'Job not found' using errcode = 'P0002';
  end if;
  if p_amount is null or p_amount < 0 or p_amount > 10000000 then
    raise exception 'Enter a labour cost of £0 or more' using errcode = '22023';
  end if;
  if coalesce(btrim(p_reason), '') = '' then
    raise exception 'Say why the labour cost is being changed' using errcode = '22023';
  end if;

  select r.labour into v_current
    from public.finance_job_rows(array[v_owner], p_job_id) r;
  v_delta := round(p_amount, 2) - round(coalesce(v_current, 0), 2);
  if v_delta = 0 then
    return null;
  end if;

  select coalesce(nullif(p.full_name, ''), 'Team member') into v_name
    from public.profiles p where p.id = auth.uid();

  insert into public.employer_job_cost_entries
    (employer_id, job_id, category, amount, note, previous_value, new_value,
     created_by, created_by_name)
  values
    (v_owner, p_job_id, 'labour_adjustment', v_delta, btrim(p_reason),
     round(coalesce(v_current, 0), 2), round(p_amount, 2), auth.uid(), coalesce(v_name, 'Team member'))
  returning id into v_id;

  perform public.refresh_job_financial_actuals(p_job_id);
  return v_id;
end;
$$;

revoke all on function public.get_finance_summary(date, date) from public, anon;
revoke all on function public.get_finance_monthly(int) from public, anon;
revoke all on function public.get_job_finance(uuid) from public, anon;
revoke all on function public.record_job_cost(uuid, text, numeric, date, text) from public, anon;
revoke all on function public.set_job_labour(uuid, numeric, text) from public, anon;
grant execute on function public.get_finance_summary(date, date) to authenticated;
grant execute on function public.get_finance_monthly(int) to authenticated;
grant execute on function public.get_job_finance(uuid) to authenticated;
grant execute on function public.record_job_cost(uuid, text, numeric, date, text) to authenticated;
grant execute on function public.set_job_labour(uuid, numeric, text) to authenticated;
