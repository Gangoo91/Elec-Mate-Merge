-- ELE-1825 — Accounting in the Employer Hub.
--
-- The firm's accounting connection IS the owner's existing Xero / QuickBooks /
-- Sage connection (company_profiles.accounting_integrations + the encrypted
-- accounting_oauth_tokens row, both keyed on the owner = firm id). Nothing is
-- copied; these functions only let the firm's managers SEE it, with money kept
-- to owner/admin (can_see_firm_money).
--
--  1. quotes.external_invoice_sync_error / _failed_at — a failed push to the
--     package is written on the invoice itself (accounting-sync-invoice), so it
--     surfaces on the invoice, not in a log.
--  2. payroll_export_id on employer_timesheets and employer_expense_claims —
--     every row that went to payroll is stamped with the export that took it,
--     so a period can never be paid twice. employer_payroll_exports gains the
--     counts the office sees ("12 entries, 2 expenses, 31.5 h").
--  3. get_firm_accounting        connection state + invoice sync counts
--     get_firm_invoice_sync      per-invoice sync status (owner/admin)
--     set_firm_accounting_autosync
--     get_payroll_run            what a "Send to payroll" would contain
--     send_payroll_run           stamp + log, idempotent
--     undo_payroll_export        put a run back (48 hours)
--     record_payroll_export      (existing Timesheets week export) now stamps
--                                the hours it logs as well.
-- Office managers: hours only. They can send an hours-only run; they never get
-- a rate, a £ figure or an expense line.

-- 1 ── invoice sync errors live on the invoice ────────────────────────────────
alter table public.quotes
  add column if not exists external_invoice_sync_error text,
  add column if not exists external_invoice_sync_failed_at timestamptz;

comment on column public.quotes.external_invoice_sync_error is
  'ELE-1825: plain-words reason the last push to the accounting package failed; cleared on success.';
comment on column public.quotes.external_invoice_sync_failed_at is
  'ELE-1825: when the last push to the accounting package failed.';

-- 2 ── payroll stamps ──────────────────────────────────────────────────────────
alter table public.employer_payroll_exports
  add column if not exists destination text not null default 'file',
  add column if not exists timesheet_count integer not null default 0,
  add column if not exists expense_count integer not null default 0,
  add column if not exists total_hours numeric not null default 0,
  add column if not exists mileage_miles numeric not null default 0,
  add column if not exists connected_provider text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'employer_payroll_exports_destination_check') then
    alter table public.employer_payroll_exports
      add constraint employer_payroll_exports_destination_check
      check (destination in ('file', 'api'));
  end if;
end $$;

comment on table public.employer_payroll_exports is '[EMPLOYER HUB → WORKER TOOLS] One row per send to payroll: the Timesheets week export and the Finance → Accounting month-end run (ELE-1825). Scope: employer_id = the firm (owner profiles.id); managers read via my_employer_scope(); employee_ids = roster rows in the file; the employer_timesheets / employer_expense_claims rows it took carry payroll_export_id. Used by: Employer Hub Timesheets export (record_payroll_export), Accounting send to payroll (send_payroll_run, get_payroll_run, undo_payroll_export), Worker Tools My pay and Timesheet "sent to payroll" (get_my_payroll_exports, dates only). Rule: Written only through those functions; office managers send hours only (kind hours, no expenses).';
comment on column public.employer_payroll_exports.destination is
  'file = a CSV the office saved or shared; api = posted to the package (not supported by the current integration, reserved).';

alter table public.employer_timesheets
  add column if not exists payroll_export_id uuid
    references public.employer_payroll_exports(id) on delete set null;
alter table public.employer_expense_claims
  add column if not exists payroll_export_id uuid
    references public.employer_payroll_exports(id) on delete set null;

create index if not exists employer_timesheets_payroll_export_idx
  on public.employer_timesheets (payroll_export_id) where payroll_export_id is not null;
create index if not exists employer_expense_claims_payroll_export_idx
  on public.employer_expense_claims (payroll_export_id) where payroll_export_id is not null;

comment on column public.employer_timesheets.payroll_export_id is
  'ELE-1825: the payroll run that took this approved entry; null = not sent to payroll yet.';
comment on column public.employer_expense_claims.payroll_export_id is
  'ELE-1825: the payroll run that took this approved claim for repayment; null = not sent yet.';

-- 3 ── connection state ────────────────────────────────────────────────────────
create or replace function public.get_firm_accounting(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_ai jsonb;
  v_name text;
  v_conns jsonb;
  v_since timestamptz;
  v_inv jsonb;
  v_last_error jsonb;
  v_last_export jsonb;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  select cp.accounting_integrations, cp.company_name
    into v_ai, v_name
    from company_profiles cp where cp.user_id = p_firm;

  select coalesce(jsonb_agg(c order by (c->>'connected_at') desc nulls last), '[]'::jsonb)
    into v_conns
    from (
      select jsonb_build_object(
        'provider', i->>'provider',
        'tenant_name', coalesce(t.tenant_name, i->>'tenantName'),
        'connected_at', i->>'connectedAt',
        'last_sync_at', i->>'lastSyncAt',
        'auto_sync', coalesce(i->>'autoSyncEnabled', 'true') <> 'false',
        'token_refreshed_at', t.updated_at,
        'state', case
          when coalesce(i->>'status', '') <> 'connected' then 'error'
          when t.id is null then 'missing'
          when t.token_expires_at < now() and t.encrypted_refresh_token is null then 'expired'
          -- Xero refresh tokens lapse after 60 days unused, QuickBooks after 100.
          when i->>'provider' = 'xero' and t.updated_at < now() - interval '58 days' then 'stale'
          when i->>'provider' = 'quickbooks' and t.updated_at < now() - interval '95 days' then 'stale'
          else 'connected'
        end) as c
        from jsonb_array_elements(case when jsonb_typeof(v_ai) = 'array' then v_ai else '[]'::jsonb end) i
        left join accounting_oauth_tokens t
          on t.user_id = p_firm and t.provider = i->>'provider'
       where i->>'provider' in ('xero', 'quickbooks', 'sage', 'freshbooks')
    ) x;

  select min((i->>'connectedAt')::timestamptz) into v_since
    from jsonb_array_elements(case when jsonb_typeof(v_ai) = 'array' then v_ai else '[]'::jsonb end) i
   where i->>'status' = 'connected' and (i->>'connectedAt') is not null;

  -- Counts only (no £), so the office sees them too.
  select jsonb_build_object(
           'synced', count(*) filter (where q.external_invoice_id is not null
                                        and (q.external_invoice_sync_failed_at is null
                                             or q.external_invoice_sync_failed_at < q.external_invoice_synced_at)),
           'failed', count(*) filter (where q.external_invoice_sync_error is not null
                                        and (q.external_invoice_synced_at is null
                                             or q.external_invoice_sync_failed_at > q.external_invoice_synced_at)),
           'waiting', count(*) filter (where q.external_invoice_id is null
                                         and q.external_invoice_sync_error is null
                                         and v_since is not null
                                         and coalesce(q.invoice_sent_at, q.invoice_date, q.created_at) >= v_since))
    into v_inv
    from quotes q
   where q.user_id = p_firm
     and q.deleted_at is null
     and coalesce(q.invoice_raised, false)
     and lower(coalesce(nullif(q.invoice_status, ''), 'draft')) not in
         ('draft', 'cancelled', 'canceled', 'void', 'voided');

  if v_money then
    select jsonb_build_object(
             'invoice_id', q.id,
             'invoice_number', coalesce(q.invoice_number, q.quote_number),
             'error', q.external_invoice_sync_error,
             'at', q.external_invoice_sync_failed_at)
      into v_last_error
      from quotes q
     where q.user_id = p_firm and q.deleted_at is null
       and q.external_invoice_sync_error is not null
       and (q.external_invoice_synced_at is null
            or q.external_invoice_sync_failed_at > q.external_invoice_synced_at)
     order by q.external_invoice_sync_failed_at desc nulls last
     limit 1;
  end if;

  select jsonb_build_object(
           'id', x.id, 'period_start', x.period_start, 'period_end', x.period_end,
           'exported_at', x.exported_at, 'kind', x.kind,
           'by_name', coalesce(nullif(p.full_name, ''), 'Someone at the firm'))
    into v_last_export
    from employer_payroll_exports x
    left join profiles p on p.id = x.exported_by
   where x.employer_id = p_firm
   order by x.exported_at desc
   limit 1;

  return jsonb_build_object(
    'firm_name', v_name,
    'role', public.my_employer_role(p_firm),
    'is_owner', p_firm = auth.uid(),
    'can_manage', v_money,
    'money_visible', v_money,
    'connections', v_conns,
    'invoices', coalesce(v_inv, jsonb_build_object('synced', 0, 'failed', 0, 'waiting', 0)),
    'last_error', v_last_error,
    'last_payroll', v_last_export);
end;
$$;

-- Per-invoice sync status (owner/admin: it carries £).
create or replace function public.get_firm_invoice_sync(p_firm uuid, p_limit integer default 100)
returns table (
  id uuid, invoice_number text, client text, amount numeric, issued_on date,
  money_state text, provider text, external_url text, synced_at timestamptz,
  sync_error text, failed_at timestamptz, sync_state text)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_since timestamptz;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  select min((i->>'connectedAt')::timestamptz) into v_since
    from company_profiles cp,
         jsonb_array_elements(case when jsonb_typeof(cp.accounting_integrations) = 'array'
                                   then cp.accounting_integrations else '[]'::jsonb end) i
   where cp.user_id = p_firm and i->>'status' = 'connected' and (i->>'connectedAt') is not null;

  return query
    select r.id, r.invoice_number, r.client, r.amount, r.issued_on, r.money_state,
           q.external_invoice_provider, q.external_invoice_url, q.external_invoice_synced_at,
           q.external_invoice_sync_error, q.external_invoice_sync_failed_at,
           case
             when q.external_invoice_sync_error is not null
                  and (q.external_invoice_synced_at is null
                       or q.external_invoice_sync_failed_at > q.external_invoice_synced_at) then 'failed'
             when q.external_invoice_id is not null then 'synced'
             when v_since is not null
                  and coalesce(q.invoice_sent_at, q.invoice_date, q.created_at) >= v_since then 'waiting'
             else 'before'
           end
      from public.finance_invoice_rows(array[p_firm]) r
      join quotes q on q.id = r.id
     where r.money_state <> 'draft' and r.money_state <> 'void'
     order by
       case
         when q.external_invoice_sync_error is not null
              and (q.external_invoice_synced_at is null
                   or q.external_invoice_sync_failed_at > q.external_invoice_synced_at) then 0
         when q.external_invoice_id is null then 1
         else 2 end,
       r.issued_at desc
     limit greatest(1, least(coalesce(p_limit, 100), 300));
end;
$$;

create or replace function public.set_firm_accounting_autosync(p_firm uuid, p_provider text, p_enabled boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ai jsonb;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  select accounting_integrations into v_ai from company_profiles where user_id = p_firm for update;
  if v_ai is null or jsonb_typeof(v_ai) <> 'array' then
    raise exception 'not_connected' using errcode = '22023';
  end if;
  update company_profiles
     set accounting_integrations = (
       select coalesce(jsonb_agg(case when i->>'provider' = p_provider
                                      then i || jsonb_build_object('autoSyncEnabled', coalesce(p_enabled, true))
                                      else i end), '[]'::jsonb)
         from jsonb_array_elements(v_ai) i)
   where user_id = p_firm;
  return coalesce(p_enabled, true);
end;
$$;

-- 4 ── payroll run ─────────────────────────────────────────────────────────────
-- Eligible = approved, not yet sent, belongs to the firm. Hours dated in the
-- period, plus late approvals from up to 62 days before it (they still need
-- paying). Expenses: every approved, unsent claim dated on or before the end.
create or replace function public.get_payroll_run(
  p_firm uuid, p_start date, p_end date, p_export uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_workers jsonb;
  v_exports jsonb;
  v_hidden integer := 0;
  v_export record;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  if p_export is not null then
    select * into v_export from employer_payroll_exports x where x.id = p_export and x.employer_id = p_firm;
    if not found then
      raise exception 'not_found' using errcode = 'P0002';
    end if;
    p_start := v_export.period_start;
    p_end := v_export.period_end;
  end if;

  if p_start is null or p_end is null or p_end < p_start or p_end - p_start > 62 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;

  with emp as (
    select e.id, e.name, e.pay_type, e.hourly_rate, e.overtime_multiplier, e.overtime_threshold_hours
      from employer_employees e
     where e.employer_id = p_firm
  ), ts as (
    select t.* from employer_timesheets t join emp on emp.id = t.employee_id
     where t.status = 'Approved'
       and case when p_export is not null then t.payroll_export_id = p_export
                else t.payroll_export_id is null
                     and t.date <= p_end and t.date >= p_start - 62 end
  ), ex as (
    select c.* from employer_expense_claims c join emp on emp.id = c.employee_id
     where v_money
       and case when p_export is not null then c.payroll_export_id = p_export
                else c.payroll_export_id is null and c.status = 'Approved'
                     and coalesce(c.incurred_on, c.submitted_date, c.created_at::date) <= p_end end
  ), pend as (
    select t.employee_id, count(*) n, coalesce(sum(t.total_hours), 0) h
      from employer_timesheets t join emp on emp.id = t.employee_id
     where p_export is null and t.status = 'Pending' and t.clock_out is not null
       and t.date between p_start and p_end
     group by 1
  ), sent as (
    select t.employee_id, coalesce(sum(t.total_hours), 0) h
      from employer_timesheets t join emp on emp.id = t.employee_id
     where p_export is null and t.status = 'Approved' and t.payroll_export_id is not null
       and t.date between p_start and p_end
     group by 1
  ), lv as (
    select l.employee_id,
           sum(case when l.half_day is not null and l.start_date between p_start and p_end then 0.5
                    when l.half_day is not null then 0
                    else (select count(*) from generate_series(greatest(l.start_date, p_start),
                                                               least(l.end_date, p_end), interval '1 day') d
                           where extract(isodow from d) < 6) end) as days,
           string_agg(distinct replace(lower(coalesce(l.type, 'leave')), '_', ' '), ', ') as detail
      from employer_leave_requests l join emp on emp.id = l.employee_id
     where lower(l.status) = 'approved' and l.start_date <= p_end and l.end_date >= p_start
     group by 1
  ), ids as (
    select employee_id from ts union select employee_id from ex
    union select employee_id from lv where days > 0
    union select employee_id from pend
  )
  select coalesce(jsonb_agg(w order by w->>'name'), '[]'::jsonb) into v_workers
    from (
      select jsonb_build_object(
        'employee_id', emp.id,
        'name', coalesce(nullif(emp.name, ''), 'Unnamed'),
        'pay_type', coalesce(emp.pay_type, 'hourly'),
        'hourly_rate', case when v_money and emp.hourly_rate > 0 then emp.hourly_rate end,
        'overtime_multiplier', coalesce(emp.overtime_multiplier, 1.5),
        'overtime_threshold', coalesce(emp.overtime_threshold_hours, 8),
        'timesheet_ids', coalesce((select jsonb_agg(ts.id) from ts where ts.employee_id = emp.id), '[]'::jsonb),
        'days', coalesce((select jsonb_agg(jsonb_build_object('date', d.date, 'hours', d.h) order by d.date)
                            from (select ts.date, sum(coalesce(ts.total_hours, 0)) h
                                    from ts where ts.employee_id = emp.id group by ts.date) d), '[]'::jsonb),
        'earlier_hours', coalesce((select sum(ts.total_hours) from ts
                                    where ts.employee_id = emp.id and ts.date < p_start), 0),
        'awaiting_count', coalesce((select n from pend where pend.employee_id = emp.id), 0),
        'awaiting_hours', coalesce((select h from pend where pend.employee_id = emp.id), 0),
        'sent_hours', coalesce((select h from sent where sent.employee_id = emp.id), 0),
        'leave_days', coalesce((select days from lv where lv.employee_id = emp.id), 0),
        'leave_detail', coalesce((select detail from lv where lv.employee_id = emp.id and lv.days > 0), ''),
        'expenses', coalesce((select jsonb_agg(jsonb_build_object(
                                 'id', ex.id, 'category', ex.category, 'description', ex.description,
                                 'amount', ex.amount, 'miles', ex.mileage_miles,
                                 'date', coalesce(ex.incurred_on, ex.submitted_date)) order by coalesce(ex.incurred_on, ex.submitted_date))
                                from ex where ex.employee_id = emp.id), '[]'::jsonb)
      ) w
      from emp where emp.id in (select employee_id from ids)
    ) z;

  if not v_money and p_export is null then
    select count(*) into v_hidden
      from employer_expense_claims c join employer_employees e on e.id = c.employee_id
     where e.employer_id = p_firm and c.status = 'Approved' and c.payroll_export_id is null
       and coalesce(c.incurred_on, c.submitted_date, c.created_at::date) <= p_end;
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', x.id, 'period_start', x.period_start, 'period_end', x.period_end,
           'exported_at', x.exported_at, 'kind', x.kind, 'destination', x.destination,
           'timesheet_count', x.timesheet_count, 'expense_count', x.expense_count,
           'total_hours', x.total_hours, 'mileage_miles', x.mileage_miles,
           'people', coalesce(array_length(x.employee_ids, 1), 0),
           'by_name', coalesce(nullif(p.full_name, ''), 'Someone at the firm'),
           'mine', x.exported_by = auth.uid(),
           'can_undo', x.exported_at > now() - interval '48 hours'
                       and (v_money or x.exported_by = auth.uid())
                       and (x.timesheet_count + x.expense_count) > 0)
         order by x.exported_at desc), '[]'::jsonb)
    into v_exports
    from employer_payroll_exports x
    left join profiles p on p.id = x.exported_by
   where x.employer_id = p_firm
     and x.period_start <= p_end and x.period_end >= p_start;

  return jsonb_build_object(
    'period_start', p_start,
    'period_end', p_end,
    'export_id', p_export,
    'money_visible', v_money,
    'workers', v_workers,
    'hidden_expense_count', v_hidden,
    'exports', v_exports);
end;
$$;

create or replace function public.send_payroll_run(
  p_firm uuid, p_start date, p_end date, p_kind text,
  p_timesheet_ids uuid[], p_expense_ids uuid[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_ts uuid[] := coalesce(p_timesheet_ids, '{}');
  v_ex uuid[] := coalesce(p_expense_ids, '{}');
  v_ok_ts uuid[];
  v_ok_ex uuid[];
  v_prior uuid;
  v_id uuid;
  v_people uuid[];
  v_hours numeric;
  v_miles numeric;
  v_provider text;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);
  if p_kind is null or p_kind not in ('hours', 'xero', 'sage', 'quickbooks', 'csv') then
    raise exception 'kind_invalid' using errcode = '22023';
  end if;
  -- Office managers send hours only: no priced file, no expenses.
  if not v_money and (p_kind <> 'hours' or cardinality(v_ex) > 0) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_start is null or p_end is null or p_end < p_start or p_end - p_start > 62 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;
  if cardinality(v_ts) + cardinality(v_ex) = 0 then
    raise exception 'nothing_to_send' using errcode = '22023';
  end if;
  if cardinality(v_ts) > 5000 or cardinality(v_ex) > 2000 then
    raise exception 'too_many_rows' using errcode = '22023';
  end if;

  -- A double tap, or a retry after a dropped connection: the same rows were
  -- already taken by ONE earlier run of this firm. Hand that run back.
  select distinct t.payroll_export_id into v_prior
    from employer_timesheets t
    join employer_employees e on e.id = t.employee_id and e.employer_id = p_firm
   where t.id = any(v_ts) and t.payroll_export_id is not null
   limit 1;
  if v_prior is null then
    select distinct c.payroll_export_id into v_prior
      from employer_expense_claims c
      join employer_employees e on e.id = c.employee_id and e.employer_id = p_firm
     where c.id = any(v_ex) and c.payroll_export_id is not null
     limit 1;
  end if;
  if v_prior is not null
     and not exists (select 1 from employer_timesheets t where t.id = any(v_ts)
                      and t.payroll_export_id is distinct from v_prior)
     and not exists (select 1 from employer_expense_claims c where c.id = any(v_ex)
                      and c.payroll_export_id is distinct from v_prior) then
    return jsonb_build_object('export_id', v_prior, 'replayed', true);
  end if;

  -- Lock and re-check every row; if anything moved since the screen loaded,
  -- refuse so the file and the stamps can never disagree.
  select coalesce(array_agg(t.id), '{}') into v_ok_ts
    from (select t.id from employer_timesheets t
            join employer_employees e on e.id = t.employee_id and e.employer_id = p_firm
           where t.id = any(v_ts) and t.status = 'Approved' and t.payroll_export_id is null
             and t.date <= p_end and t.date >= p_start - 62
           for update of t) t;
  select coalesce(array_agg(c.id), '{}') into v_ok_ex
    from (select c.id from employer_expense_claims c
            join employer_employees e on e.id = c.employee_id and e.employer_id = p_firm
           where c.id = any(v_ex) and c.status = 'Approved' and c.payroll_export_id is null
           for update of c) c;
  if cardinality(v_ok_ts) <> cardinality(array(select distinct unnest(v_ts)))
     or cardinality(v_ok_ex) <> cardinality(array(select distinct unnest(v_ex))) then
    raise exception 'run_changed' using errcode = '40001';
  end if;

  select coalesce(array_agg(distinct x.employee_id), '{}') into v_people
    from (select employee_id from employer_timesheets where id = any(v_ok_ts)
          union select employee_id from employer_expense_claims where id = any(v_ok_ex)) x;
  select coalesce(sum(total_hours), 0) into v_hours from employer_timesheets where id = any(v_ok_ts);
  select coalesce(sum(mileage_miles), 0) into v_miles from employer_expense_claims where id = any(v_ok_ex);
  select i->>'provider' into v_provider
    from company_profiles cp,
         jsonb_array_elements(case when jsonb_typeof(cp.accounting_integrations) = 'array'
                                   then cp.accounting_integrations else '[]'::jsonb end) i
   where cp.user_id = p_firm and i->>'status' = 'connected'
   limit 1;

  insert into employer_payroll_exports
    (employer_id, period_start, period_end, kind, employee_ids, destination,
     timesheet_count, expense_count, total_hours, mileage_miles, connected_provider)
  values
    (p_firm, p_start, p_end, p_kind, v_people, 'file',
     cardinality(v_ok_ts), cardinality(v_ok_ex), v_hours, v_miles, v_provider)
  returning id into v_id;

  update employer_timesheets set payroll_export_id = v_id where id = any(v_ok_ts);
  update employer_expense_claims set payroll_export_id = v_id where id = any(v_ok_ex);

  return jsonb_build_object(
    'export_id', v_id, 'replayed', false,
    'timesheet_count', cardinality(v_ok_ts), 'expense_count', cardinality(v_ok_ex),
    'people', cardinality(v_people), 'total_hours', v_hours);
end;
$$;

create or replace function public.undo_payroll_export(p_export uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_x employer_payroll_exports%rowtype;
  v_ts integer;
  v_ex integer;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  select * into v_x from employer_payroll_exports where id = p_export for update;
  if not found or v_x.employer_id not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if not (public.can_see_firm_money(v_x.employer_id) or v_x.exported_by = auth.uid()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if v_x.exported_at < now() - interval '48 hours' then
    raise exception 'too_late' using errcode = '22023';
  end if;
  update employer_timesheets set payroll_export_id = null where payroll_export_id = p_export;
  get diagnostics v_ts = row_count;
  update employer_expense_claims set payroll_export_id = null where payroll_export_id = p_export;
  get diagnostics v_ex = row_count;
  delete from employer_payroll_exports where id = p_export;
  return jsonb_build_object('timesheets', v_ts, 'expenses', v_ex);
end;
$$;

-- The Timesheets week export (ELE-1952) logs through here; it now stamps the
-- approved hours it covered, so the month-end run never sends them again.
create or replace function public.record_payroll_export(
  p_firm uuid, p_start date, p_end date, p_kind text, p_employee_ids uuid[])
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ids uuid[];
  v_id uuid;
  v_n integer;
  v_h numeric;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_start is null or p_end is null or p_end < p_start or p_end - p_start > 62 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;
  if coalesce(array_length(p_employee_ids, 1), 0) > 1000 then
    raise exception 'too_many_people' using errcode = '22023';
  end if;
  select coalesce(array_agg(distinct e.id), '{}') into v_ids
    from employer_employees e
   where e.id = any(coalesce(p_employee_ids, '{}')) and e.employer_id = p_firm;

  insert into employer_payroll_exports (employer_id, period_start, period_end, kind, employee_ids)
  values (p_firm, p_start, p_end, p_kind, v_ids)
  returning id into v_id;

  update employer_timesheets t
     set payroll_export_id = v_id
   where t.employee_id = any(v_ids)
     and t.status = 'Approved'
     and t.payroll_export_id is null
     and t.date between p_start and p_end;
  get diagnostics v_n = row_count;
  select coalesce(sum(total_hours), 0) into v_h from employer_timesheets where payroll_export_id = v_id;
  update employer_payroll_exports set timesheet_count = v_n, total_hours = v_h where id = v_id;
  return v_id;
end;
$$;

revoke all on function public.get_firm_accounting(uuid) from public, anon;
revoke all on function public.get_firm_invoice_sync(uuid, integer) from public, anon;
revoke all on function public.set_firm_accounting_autosync(uuid, text, boolean) from public, anon;
revoke all on function public.get_payroll_run(uuid, date, date, uuid) from public, anon;
revoke all on function public.send_payroll_run(uuid, date, date, text, uuid[], uuid[]) from public, anon;
revoke all on function public.undo_payroll_export(uuid) from public, anon;
revoke all on function public.record_payroll_export(uuid, date, date, text, uuid[]) from public, anon;

grant execute on function public.get_firm_accounting(uuid) to authenticated;
grant execute on function public.get_firm_invoice_sync(uuid, integer) to authenticated;
grant execute on function public.set_firm_accounting_autosync(uuid, text, boolean) to authenticated;
grant execute on function public.get_payroll_run(uuid, date, date, uuid) to authenticated;
grant execute on function public.send_payroll_run(uuid, date, date, text, uuid[], uuid[]) to authenticated;
grant execute on function public.undo_payroll_export(uuid) to authenticated;
grant execute on function public.record_payroll_export(uuid, date, date, text, uuid[]) to authenticated;
