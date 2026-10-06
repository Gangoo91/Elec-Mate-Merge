-- ============================================================================
-- ONE FINANCE MODEL, part 2: point every existing money reader at the shared
-- definitions in 20261007140000_finance_model_core.sql. Signatures are kept so
-- current callers keep working; only the maths underneath changes.
-- ============================================================================

-- 1. employer_invoices_unified: status is now the canonical money state
--    (Draft / Sent / Overdue / Paid / Void) — 'Overdue' is derived from the due
--    date, and an invoice marked paid without a date still reads Paid with a
--    paid_date. Every client reader of this RPC inherits the shared rules.
create or replace function public.employer_invoices_unified()
returns table (
  id uuid, employer_id uuid, invoice_number text, client text, project text,
  amount numeric, status text, due_date date, paid_date date, job_id uuid,
  cis_amount numeric, created_at timestamptz
)
language sql stable security definer set search_path = public
as $$
  select r.id, r.owner_id, r.invoice_number, r.client, r.project,
         r.amount, initcap(r.money_state), r.due_on, r.paid_on, r.job_id,
         0::numeric, r.issued_at
    from public.finance_invoice_rows(array(select public.my_employer_scope())) r;
$$;

-- 2. get_employer_pnl: same columns, shared maths. Kept for older callers;
--    the app now reads get_finance_summary.
create or replace function public.get_employer_pnl(p_from date, p_to date)
returns table (
  revenue_invoiced numeric, revenue_paid numeric, revenue_outstanding numeric,
  materials numeric, supplier_invoices numeric, expenses numeric
)
language sql stable security definer set search_path = public
as $$
  select s.invoiced, s.paid_in, s.outstanding, s.materials, s.supplier_invoices, s.expenses
    from public.finance_summary_core(array(select public.my_employer_scope()), p_from, p_to) s;
$$;

-- 3. get_employer_ledger: money in = invoices PAID in the period; money out =
--    every cost line in the period, from the same rows as the P&L. Labour is
--    one line per worker for the period, so the ledger's money out equals the
--    P&L's total costs to the penny.
create or replace function public.get_employer_ledger(p_from date, p_to date)
returns table (
  entry_date date, direction text, category text, reference text,
  counterparty text, amount numeric, source_id uuid
)
language sql stable security definer set search_path = public
as $$
  with o as (select array(select public.my_employer_scope()) as owners),
  cost as (
    select c.* from o, lateral public.finance_cost_rows(o.owners, p_from, p_to) c
  )
  select r.paid_on, 'in'::text, 'Sales'::text, r.invoice_number, r.client, r.paid_amount, r.id
    from o, lateral public.finance_invoice_rows(o.owners) r
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
    from cost c
   where c.origin <> 'timesheet'

  union all
  -- Labour: one line per worker for the period (gross, overtime included)
  select max(l.work_date), 'out', 'Labour', 'Approved timesheets', l.employee_name,
         sum(l.cost), l.employee_id
    from o, lateral public.finance_labour_rows(o.owners, p_from, p_to) l
   group by l.employee_id, l.employee_name

  order by 1 desc;
$$;

-- 4. Job financials cache. job_financials keeps its columns for older readers,
--    but every actual/invoiced/paid figure is now written from the shared
--    per-job model: labour (timesheets + logged adjustments), materials (POs +
--    expenses + manual materials), equipment/overheads (manual), invoiced and
--    paid (from the job's invoices). Budget and status stay budget-based.
create or replace function public.refresh_job_financial_actuals(p_job_id uuid)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_owner uuid;
  r record;
  v_equipment numeric := 0;
  v_overheads numeric := 0;
begin
  if p_job_id is null then return; end if;
  select j.user_id into v_owner from public.employer_jobs j where j.id = p_job_id;
  if v_owner is null then return; end if;

  select * into r from public.finance_job_rows(array[v_owner], p_job_id);
  if not found then return; end if;

  select coalesce(sum(amount) filter (where category = 'equipment'), 0),
         coalesce(sum(amount) filter (where category in ('overheads', 'other')), 0)
    into v_equipment, v_overheads
    from public.employer_job_cost_entries where job_id = p_job_id;

  update public.job_financials f
     set actual_labour = round(r.labour, 2),
         actual_materials = round(r.materials + r.expenses, 2),
         actual_equipment = round(v_equipment, 2),
         actual_overheads = round(v_overheads, 2),
         actual_total = round(r.total_costs, 2),
         invoiced = round(r.invoiced, 2),
         paid = round(r.paid, 2),
         margin = coalesce(r.forecast_margin_pct, 0),
         status = case
           when coalesce(f.budget_total, 0) <= 0 then f.status
           when r.total_costs > f.budget_total then 'Over Budget'
           when r.total_costs < f.budget_total * 0.9 then 'Under Budget'
           else 'On Budget' end,
         updated_at = now()
   where f.job_id = p_job_id;
exception when others then
  raise warning '[refresh_job_financial_actuals] %', sqlerrm;
end;
$$;

-- The "book received PO" trigger added the PO total on top of the refresh,
-- double-counting materials. The refresh now owns materials.
drop trigger if exists trg_book_received_po on public.employer_material_orders;

-- Refresh the cache when a job's invoices, quotes, variations or manual costs change.
create or replace function public.trg_refresh_job_finance_from_quote()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform public.refresh_job_financial_actuals(old.employer_job_id);
  elsif tg_op = 'INSERT' then
    perform public.refresh_job_financial_actuals(new.employer_job_id);
  else
    perform public.refresh_job_financial_actuals(new.employer_job_id);
    if old.employer_job_id is distinct from new.employer_job_id then
      perform public.refresh_job_financial_actuals(old.employer_job_id);
    end if;
  end if;
  return coalesce(new, old);
exception when others then
  raise warning '[trg_refresh_job_finance_from_quote] %', sqlerrm;
  return coalesce(new, old);
end;
$$;

-- Three triggers because a WHEN clause cannot mention OLD on INSERT or NEW on
-- DELETE; each fires only for job-linked rows, so unlinked quotes pay nothing.
drop trigger if exists refresh_job_finance_quotes on public.quotes;
drop trigger if exists refresh_job_finance_quotes_ins on public.quotes;
drop trigger if exists refresh_job_finance_quotes_upd on public.quotes;
drop trigger if exists refresh_job_finance_quotes_del on public.quotes;
create trigger refresh_job_finance_quotes_ins
  after insert on public.quotes
  for each row when (new.employer_job_id is not null)
  execute function public.trg_refresh_job_finance_from_quote();
create trigger refresh_job_finance_quotes_upd
  after update of total, total_paid, invoice_status, invoice_paid_at, invoice_raised,
    deleted_at, employer_job_id, acceptance_status, status, invoice_due_date
  on public.quotes
  for each row when (new.employer_job_id is not null or old.employer_job_id is not null)
  execute function public.trg_refresh_job_finance_from_quote();
create trigger refresh_job_finance_quotes_del
  after delete on public.quotes
  for each row when (old.employer_job_id is not null)
  execute function public.trg_refresh_job_finance_from_quote();

drop trigger if exists refresh_actuals_variations on public.variation_orders;
create trigger refresh_actuals_variations
  after insert or delete or update of status, value, job_id on public.variation_orders
  for each row execute function public.trg_refresh_actuals();

drop trigger if exists refresh_actuals_job_costs on public.employer_job_cost_entries;
create trigger refresh_actuals_job_costs
  after insert or delete on public.employer_job_cost_entries
  for each row execute function public.trg_refresh_actuals();

revoke all on function public.trg_refresh_job_finance_from_quote() from public, anon, authenticated;

-- 5. get_job_hub_summary: money keys come from the shared per-job model.
--    invoiced now excludes void as well as drafts; paid includes invoices
--    marked paid without a date; labour is approved hours with overtime (it
--    previously multiplied ALL timesheets, unapproved included, at flat rate).
create or replace function public.get_job_hub_summary(p_job_id uuid)
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  v_job employer_jobs;
  f record;
begin
  select * into v_job from employer_jobs
   where id = p_job_id and user_id in (select public.my_employer_scope());
  if v_job is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  select * into f from public.finance_job_rows(array[v_job.user_id], p_job_id);

  return jsonb_build_object(
    'job_value', v_job.value,
    'quote', (
      select case when count(*) = 0 then null else jsonb_build_object(
        'count', count(*),
        'value', coalesce(sum(q.total), 0),
        'status', (array_agg(initcap(coalesce(q.status, 'draft')) order by q.created_at desc))[1],
        'quote_number', (array_agg(q.quote_number order by q.created_at desc))[1],
        'id', (array_agg(q.id order by q.created_at desc))[1]
      ) end
      from quotes q
      where q.employer_job_id = p_job_id and q.user_id = v_job.user_id and q.deleted_at is null and not coalesce(q.invoice_raised, false)
    ),
    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'quote_number', q.quote_number, 'status', initcap(coalesce(q.status, 'draft')), 'value', coalesce(q.total, 0)
      ) order by q.created_at desc)
      from quotes q
      where q.employer_job_id = p_job_id and q.user_id = v_job.user_id and q.deleted_at is null and not coalesce(q.invoice_raised, false)
    ), '[]'::jsonb),
    'invoiced', coalesce(f.invoiced, 0),
    'paid', coalesce(f.paid, 0),
    'outstanding', coalesce(f.outstanding, 0),
    'invoice_count', (
      select count(*) from quotes q
       where q.employer_job_id = p_job_id and q.user_id = v_job.user_id and q.deleted_at is null and coalesce(q.invoice_raised, false)),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', r.id, 'invoice_number', r.invoice_number,
        'status', initcap(r.money_state),
        'amount', r.amount, 'paid', r.money_state = 'paid'
      ) order by r.created_at desc)
      from public.finance_invoice_rows(array[v_job.user_id]) r
      where r.job_id = p_job_id
    ), '[]'::jsonb),
    'labour_hours', coalesce(f.labour_hours, 0),
    'labour_cost', coalesce(f.labour, 0),
    'tests_total', (select count(*) from job_tests where job_id = p_job_id),
    'tests_passed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'pass%'),
    'tests_failed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'fail%'),
    'issues_open', (select count(*) from job_issues where job_id = p_job_id
                    and lower(coalesce(status, '')) not in ('resolved', 'closed')),
    'issues_critical', (select count(*) from job_issues where job_id = p_job_id
                        and lower(coalesce(status, '')) not in ('resolved', 'closed')
                        and lower(coalesce(severity, '')) in ('critical', 'high')),
    'budget_total', (select budget_total from job_financials where job_id = p_job_id limit 1),
    'actual_total', coalesce(f.total_costs, 0),
    'finance', to_jsonb(f)
  );
end;
$$;

-- 6. Client summaries: invoiced / paid / outstanding use the shared invoice
--    states (outstanding = unpaid balance of sent + overdue, never drafts or
--    void); pipeline = open quotes (sent, awaiting an answer), matching the
--    Finance and Quotes figures.
create or replace function public.get_employer_client_summaries()
returns table (
  id uuid, name text, contact_name text, email text, phone text, address text,
  notes text, tags text[], last_activity_at timestamptz, created_at timestamptz,
  quote_count bigint, open_quote_value numeric, invoice_count bigint,
  total_invoiced numeric, total_paid numeric, outstanding numeric,
  job_count bigint, active_job_count numeric
)
language sql stable security definer set search_path = public
as $$
  with owners as (select array(select public.my_employer_scope()) as o),
  inv as (
    select r.customer_id,
           count(*) filter (where r.money_state in ('sent', 'overdue', 'paid')) as invoice_count,
           sum(r.amount) filter (where r.money_state in ('sent', 'overdue', 'paid')) as total_invoiced,
           sum(r.paid_amount) filter (where r.money_state = 'paid') as total_paid,
           sum(r.balance) as outstanding
      from owners, lateral public.finance_invoice_rows(owners.o) r
     where r.customer_id is not null
     group by r.customer_id
  ),
  qt as (
    select q.customer_id,
           count(*) as quote_count,
           sum(coalesce(q.total, 0)) filter (
             where lower(coalesce(q.status, '')) = 'sent'
               and coalesce(q.acceptance_status, 'pending')
                   not in ('accepted', 'accepted_pending_deposit', 'rejected', 'declined')) as open_quote_value
      from public.quotes q, owners
     where q.user_id = any (owners.o)
       and q.deleted_at is null and q.customer_id is not null
       and not coalesce(q.invoice_raised, false)
     group by q.customer_id
  ),
  jj as (
    select customer_id, count(*) job_count,
           count(*) filter (where status = 'Active') active_job_count
      from employer_jobs where customer_id is not null and archived_at is null
     group by customer_id
  )
  select cu.id, cu.name, cu.company_name, cu.email, cu.phone, cu.address, cu.notes, cu.tags,
         cu.last_activity_at, cu.created_at,
         coalesce(qt.quote_count, 0), coalesce(qt.open_quote_value, 0),
         coalesce(inv.invoice_count, 0), coalesce(inv.total_invoiced, 0),
         coalesce(inv.total_paid, 0), coalesce(inv.outstanding, 0),
         coalesce(jj.job_count, 0), coalesce(jj.active_job_count, 0)
    from customers cu
    left join inv on inv.customer_id = cu.id
    left join qt on qt.customer_id = cu.id
    left join jj on jj.customer_id = cu.id
   where cu.user_id in (select public.my_employer_scope())
   order by cu.last_activity_at desc nulls last, cu.name asc;
$$;

-- 7. Hub landing counts — one firm-scoped call for the Jobs, Safety and
--    Smart Docs hubs. Every number has a stated meaning (see keys).
create or replace function public.get_employer_hub_counts()
returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
  v_today date := (now() at time zone 'Europe/London')::date;
  v_jobs uuid[];
  v_result jsonb;
begin
  select coalesce(array_agg(j.id), '{}') into v_jobs
    from employer_jobs j where j.user_id = any (v_owners);

  with jf as (select * from public.finance_job_rows(v_owners, null))
  select jsonb_build_object(
    'jobs', jsonb_build_object(
      -- jobs whose status last changed TO Completed in the past 7 days
      'completed_7d', (
        select count(distinct a.entity_id) from employer_audit_log a
          join employer_jobs j on j.id = a.entity_id and j.status = 'Completed'
         where a.employer_id = any (v_owners) and a.entity = 'employer_jobs'
           and a.detail ->> 'status_to' = 'Completed'
           and a.created_at >= now() - interval '7 days'),
      -- workers whose latest check-in today says On Site and who have not checked out
      'on_site_now', (
        select count(*) from (
          select distinct on (l.employee_id) l.status, l.checked_out_at, l.last_updated
            from employer_worker_locations l
            join employer_employees e on e.id = l.employee_id
           where e.employer_id = any (v_owners)
           order by l.employee_id, l.last_updated desc nulls last) x
         where x.status = 'On Site' and x.checked_out_at is null
           and (x.last_updated at time zone 'Europe/London')::date = v_today),
      'progress_logs_7d', (
        select count(*) from progress_logs p
         where (p.job_id = any (v_jobs) or p.user_id = any (v_owners))
           and p.date > v_today - 7),
      'last_progress_log', (
        select max(p.date) from progress_logs p
         where p.job_id = any (v_jobs) or p.user_id = any (v_owners)),
      'tests_total', (select count(*) from job_tests t where t.job_id = any (v_jobs)),
      'tests_failed', (select count(*) from job_tests t where t.job_id = any (v_jobs) and t.result = 'Fail'),
      'tests_pending', (select count(*) from job_tests t where t.job_id = any (v_jobs) and t.result = 'Pending'),
      'snags_open', (
        select count(*) from job_issues i
         where (i.job_id = any (v_jobs) or i.user_id = any (v_owners))
           and i.issue_type in ('Snag', 'Defect')
           and lower(coalesce(i.status, '')) not in ('resolved', 'closed')),
      'photos_total', (select count(*) from job_photos ph where ph.job_id = any (v_jobs)),
      'photos_7d', (select count(*) from job_photos ph where ph.job_id = any (v_jobs)
                      and ph.created_at >= now() - interval '7 days'),
      'open_pos', (
        select count(*) from employer_material_orders mo
         where mo.employer_id = any (v_owners)
           and lower(coalesce(mo.status, '')) not in ('draft', 'received', 'cancelled', 'canceled')),
      -- per-job finance, same maths as Job financials / Reports
      'jobs_invoiced', (select count(*) from jf where jf.invoiced > 0),
      'jobs_gross_profit', (select coalesce(sum(jf.gross_profit), 0) from jf where jf.invoiced > 0),
      'jobs_loss_making', (select count(*) from jf where jf.forecast_profit < 0)
    ),
    'safety', jsonb_build_object(
      -- RAMS awaiting sign-off (submitted, or AI-generated and not yet reviewed),
      -- written by the firm's owner/managers or linked to one of its jobs
      'rams_pending', (
        select count(*) from rams_documents r
         where (r.user_id = any (v_owners) or r.employer_job_id = any (v_jobs))
           and r.status in ('submitted', 'generated'))
    ),
    'docs', jsonb_build_object(
      'rams', (select count(*) from rams_generation_jobs g
                where g.user_id = any (v_owners) and g.status in ('complete', 'partial')
                  and g.rams_data is not null),
      'method_statements', (select count(*) from rams_generation_jobs g
                where g.user_id = any (v_owners) and g.status in ('complete', 'partial')
                  and g.method_data is not null),
      'designs', (select count(*) from circuit_design_jobs d
                where d.user_id = any (v_owners) and d.status in ('complete', 'completed')),
      'briefing_packs', (select count(*) from employer_job_packs p
                where p.employer_id = any (v_owners) and coalesce(p.briefing_pack_generated, false)),
      'recent', coalesce((
        select jsonb_agg(x order by x.at desc) from (
          select * from (
            select 'rams'::text as kind,
                   coalesce(nullif(g.project_info ->> 'projectName', ''), 'Untitled RAMS') as title,
                   g.created_at as at
              from rams_generation_jobs g
             where g.user_id = any (v_owners) and g.status in ('complete', 'partial')
               and g.rams_data is not null
            union all
            select 'method_statement',
                   coalesce(nullif(g.project_info ->> 'projectName', ''), 'Untitled method statement'),
                   g.created_at
              from rams_generation_jobs g
             where g.user_id = any (v_owners) and g.status in ('complete', 'partial')
               and g.rams_data is null and g.method_data is not null
            union all
            select 'design',
                   coalesce(nullif(d.job_inputs ->> 'projectName', ''),
                            nullif(d.job_inputs #>> '{projectInfo,projectName}', ''),
                            'Installation design'),
                   coalesce(d.completed_at, d.created_at)
              from circuit_design_jobs d
             where d.user_id = any (v_owners) and d.status in ('complete', 'completed')
            union all
            select 'briefing_pack', coalesce(nullif(p.title, ''), 'Briefing pack'), p.updated_at
              from employer_job_packs p
             where p.employer_id = any (v_owners) and coalesce(p.briefing_pack_generated, false)
          ) u order by u.at desc limit 5
        ) x), '[]'::jsonb)
    )
  ) into v_result
  from (select 1) one;

  return v_result;
end;
$$;

revoke all on function public.get_employer_hub_counts() from public, anon;
grant execute on function public.get_employer_hub_counts() to authenticated;

-- get_job_hub_summary was executable by PUBLIC/anon (harmless — it scopes to
-- my_employer_scope() — but money RPCs are never open to anon).
revoke all on function public.get_job_hub_summary(uuid) from public, anon;
grant execute on function public.get_job_hub_summary(uuid) to authenticated;

-- Rebuild the job_financials cache once from the shared model (labour now
-- includes overtime; invoiced/paid were never written before).
select public.refresh_job_financial_actuals(job_id) from public.job_financials;
