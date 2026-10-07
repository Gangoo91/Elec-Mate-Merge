-- ELE-1825 / ELE-2009 follow-up: expenses sent with a payroll run are paid on payday.
--
-- When Accounting sends a run that includes expenses, each claim is stamped
-- with the run (payroll_export_id, already) and now the run's payday
-- (payroll_payday). The run stores its payday too: the firm's payday for the
-- run's period end (same rule as utils/payPeriods.ts), or the period end when
-- the firm has not set one (payday_source = 'period_end', said on screen).
--
-- A daily job at 06:00 UTC (one job for every firm) marks those claims Paid
-- on or after payday with paid_date = payday, once per run, and sends each
-- worker ONE "Expenses repaid" notification per run (their own total), not
-- one per claim. Undo before payday puts the claims back to plain Approved;
-- after payday Undo is refused for a run with expenses.
--
-- Payroll columns on claims can only be written by these functions
-- (app.payroll_ctx), so the office cannot fake "in payroll" on a claim.

-- ---------------------------------------------------------------- columns
alter table public.employer_payroll_exports
  add column if not exists payday date,
  add column if not exists payday_source text,
  add column if not exists expenses_paid_at timestamptz;

alter table public.employer_payroll_exports drop constraint if exists employer_payroll_exports_payday_source_check;
alter table public.employer_payroll_exports add constraint employer_payroll_exports_payday_source_check
  check (payday_source is null or payday_source in ('settings', 'period_end'));

alter table public.employer_expense_claims
  add column if not exists payroll_payday date;

create index if not exists employer_payroll_exports_payday_due_idx
  on public.employer_payroll_exports (payday)
  where expense_count > 0 and expenses_paid_at is null;

comment on column public.employer_payroll_exports.payday is
  'The day the run is paid: the firm''s payday for period_end, or period_end itself when no payday is set (payday_source). Expenses in the run are marked Paid on this date.';
comment on column public.employer_payroll_exports.payday_source is
  'settings = from the firm''s pay settings; period_end = no payday set, so the period end date was used.';
comment on column public.employer_payroll_exports.expenses_paid_at is
  'When the daily payday job marked this run''s expense claims Paid (null = not yet). Set once.';
comment on column public.employer_expense_claims.payroll_payday is
  'Payday of the payroll run that took this claim (payroll_export_id). Shown as "In payroll, paid on <date>" until the payday job marks it Paid. Written only by send_payroll_run / undo_payroll_export.';

comment on table public.employer_payroll_exports is '[EMPLOYER HUB → WORKER TOOLS] One row per send to payroll: the Timesheets week export and the Finance → Accounting month-end run (ELE-1825). Scope: employer_id = the firm (owner profiles.id); managers read via my_employer_scope(); employee_ids = roster rows in the file; the employer_timesheets / employer_expense_claims rows it took carry payroll_export_id (claims also payroll_payday). Used by: Employer Hub Timesheets export (record_payroll_export), Accounting send to payroll (send_payroll_run, get_payroll_run, undo_payroll_export), daily payday job pay_expenses_on_payday (marks the run''s claims Paid on payday, one notification per worker), Worker Tools My pay, Expenses and Timesheet "sent to payroll" (get_my_payroll_exports, dates only). Rule: Written only through those functions; office managers send hours only (kind hours, no expenses); a run with expenses cannot be undone once payday has come.';

-- ---------------------------------------------------------------- payday rule
-- Mirrors utils/payPeriods.ts: weekly/fortnightly/four-weekly pay
-- period end + payday_offset_days; monthly pays payday_day_of_month (0 = last
-- working day) of the month the period ends in, or the month after. Saturday
-- or Sunday moves to the Friday before. Null when the firm has not set one.
create or replace function public._firm_payday(p_firm uuid, p_period_end date)
returns date language plpgsql stable security definer set search_path = public as $$
declare
  cp record;
  v_month date;
  v_day date;
begin
  if p_firm is null or p_period_end is null then return null; end if;
  select c.pay_frequency, c.pay_period_anchor, c.payday_offset_days, c.payday_day_of_month, c.payday_next_month
    into cp
    from company_profiles c where c.user_id = p_firm limit 1;
  if not found or cp.pay_frequency is null or cp.pay_period_anchor is null then return null; end if;

  if cp.pay_frequency = 'monthly' then
    if cp.payday_day_of_month is null then return null; end if;
    v_month := date_trunc('month', p_period_end)::date
               + case when coalesce(cp.payday_next_month, false) then interval '1 month' else interval '0' end;
    if cp.payday_day_of_month <= 0 then
      v_day := (v_month + interval '1 month' - interval '1 day')::date;
    else
      v_day := v_month + (least(cp.payday_day_of_month,
                                extract(day from (v_month + interval '1 month' - interval '1 day'))::int) - 1);
    end if;
  else
    if cp.payday_offset_days is null then return null; end if;
    v_day := p_period_end + cp.payday_offset_days;
  end if;

  return case extract(isodow from v_day)::int
           when 6 then v_day - 1
           when 7 then v_day - 2
           else v_day end;
end;
$$;

-- ---------------------------------------------------------------- guard
-- Paid: owner/admin or the service role (existing rule). Payroll stamps:
-- only the payroll functions (app.payroll_ctx) or the service role.
create or replace function public.guard_expense_paid()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_firm uuid;
begin
  if auth.uid() is null then return new; end if;
  -- The payday job (definer, owns the whole run) is allowed through.
  if coalesce(current_setting('app.expense_payday_batch', true), '') = 'on' then return new; end if;
  if (new.payroll_export_id is distinct from old.payroll_export_id
      or new.payroll_payday is distinct from old.payroll_payday)
     and coalesce(current_setting('app.payroll_ctx', true), '') <> 'on' then
    raise exception 'Payroll runs set this. Send or undo the run in Accounting.' using errcode = '42501';
  end if;
  if (new.paid_date is distinct from old.paid_date and new.paid_date is not null)
     or (lower(coalesce(new.status, '')) = 'paid' and lower(coalesce(old.status, '')) <> 'paid') then
    select e.employer_id into v_firm from public.employer_employees e where e.id = new.employee_id;
    if v_firm is null or not public.can_see_firm_money(v_firm) then
      raise exception 'Only the owner or an admin can mark expenses paid';
    end if;
  end if;
  return new;
end; $$;

drop trigger if exists trg_guard_expense_paid on public.employer_expense_claims;
create trigger trg_guard_expense_paid
  before update of status, paid_date, payroll_export_id, payroll_payday on public.employer_expense_claims
  for each row execute function public.guard_expense_paid();

-- ---------------------------------------------------------------- per-claim notification: quiet during the payday job
create or replace function public.trg_notify_expense_decision()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_worker uuid;
begin
  -- The payday job sends one summary per worker per run instead.
  if coalesce(current_setting('app.expense_payday_batch', true), '') = 'on' then
    return new;
  end if;
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected','paid') then
    select e.user_id into v_worker from employer_employees e
     where e.id = new.employee_id and lower(coalesce(e.status, '')) <> 'archived';
    perform worker_notify(v_worker, 'expense', 'Expense ' || lower(new.status),
      coalesce('£' || to_char(new.amount, 'FM999,999,990.00'), 'Your claim') ||
        coalesce(' (' || new.category || ')', '') || ' ' || lower(new.status) ||
        case when lower(new.status) = 'paid' and new.paid_date is not null
             then ' on ' || to_char(new.paid_date, 'FMDD Mon') else '' end ||
        case when lower(new.status) = 'rejected' and nullif(new.rejection_reason, '') is not null
             then ': ' || left(new.rejection_reason, 100) else '' end,
      jsonb_build_object('expense_id', new.id, 'route', '/electrician/worker-tools/expenses'));
  end if;
  return new;
exception when others then
  raise warning '[trg_notify_expense_decision] %', sqlerrm;
  return new;
end;
$$;

-- ---------------------------------------------------------------- send_payroll_run: store payday
create or replace function public.send_payroll_run(p_firm uuid, p_start date, p_end date, p_kind text, p_timesheet_ids uuid[], p_expense_ids uuid[])
returns jsonb language plpgsql security definer set search_path = public as $$
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
  v_payday date;
  v_source text;
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
    return jsonb_build_object('export_id', v_prior, 'replayed', true,
                              'payday', (select payday from employer_payroll_exports where id = v_prior));
  end if;

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

  v_payday := public._firm_payday(p_firm, p_end);
  v_source := case when v_payday is null then 'period_end' else 'settings' end;
  v_payday := coalesce(v_payday, p_end);

  insert into employer_payroll_exports
    (employer_id, period_start, period_end, kind, employee_ids, destination,
     timesheet_count, expense_count, total_hours, mileage_miles, connected_provider,
     payday, payday_source)
  values
    (p_firm, p_start, p_end, p_kind, v_people, 'file',
     cardinality(v_ok_ts), cardinality(v_ok_ex), v_hours, v_miles, v_provider,
     v_payday, v_source)
  returning id into v_id;

  perform set_config('app.payroll_ctx', 'on', true);
  update employer_timesheets set payroll_export_id = v_id where id = any(v_ok_ts);
  update employer_expense_claims set payroll_export_id = v_id, payroll_payday = v_payday where id = any(v_ok_ex);
  perform set_config('app.payroll_ctx', 'off', true);

  return jsonb_build_object(
    'export_id', v_id, 'replayed', false,
    'timesheet_count', cardinality(v_ok_ts), 'expense_count', cardinality(v_ok_ex),
    'people', cardinality(v_people), 'total_hours', v_hours,
    'payday', v_payday, 'payday_source', v_source);
end;
$$;

-- ---------------------------------------------------------------- undo: refused for expenses once payday has come
create or replace function public.undo_payroll_export(p_export uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
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
  if v_x.expense_count > 0
     and (v_x.expenses_paid_at is not null
          or (v_x.payday is not null and v_x.payday <= (now() at time zone 'Europe/London')::date)) then
    raise exception 'expenses_paid' using errcode = '22023',
      detail = to_char(v_x.payday, 'FMDD Mon YYYY');
  end if;
  if v_x.exported_at < now() - interval '48 hours' then
    raise exception 'too_late' using errcode = '22023';
  end if;
  perform set_config('app.payroll_ctx', 'on', true);
  update employer_timesheets set payroll_export_id = null where payroll_export_id = p_export;
  get diagnostics v_ts = row_count;
  update employer_expense_claims set payroll_export_id = null, payroll_payday = null
   where payroll_export_id = p_export;
  get diagnostics v_ex = row_count;
  perform set_config('app.payroll_ctx', 'off', true);
  delete from employer_payroll_exports where id = p_export;
  return jsonb_build_object('timesheets', v_ts, 'expenses', v_ex);
end;
$$;

-- ---------------------------------------------------------------- get_payroll_run: payday for the period and each run
create or replace function public.get_payroll_run(p_firm uuid, p_start date, p_end date, p_export uuid default null)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_money boolean;
  v_workers jsonb;
  v_exports jsonb;
  v_hidden integer := 0;
  v_export employer_payroll_exports%rowtype;
  v_payday date;
  v_source text;
  v_today date := (now() at time zone 'Europe/London')::date;
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

  if p_export is not null and v_export.payday is not null then
    v_payday := v_export.payday;
    v_source := coalesce(v_export.payday_source, 'settings');
  else
    v_payday := public._firm_payday(p_firm, p_end);
    v_source := case when v_payday is null then 'period_end' else 'settings' end;
    v_payday := coalesce(v_payday, p_end);
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
           'payday', x.payday,
           'payday_source', x.payday_source,
           'expenses_paid_at', x.expenses_paid_at,
           'expenses_paid', x.expense_count > 0
                            and (x.expenses_paid_at is not null or (x.payday is not null and x.payday <= v_today)),
           'can_undo', x.exported_at > now() - interval '48 hours'
                       and (v_money or x.exported_by = auth.uid())
                       and (x.timesheet_count + x.expense_count) > 0
                       and not (x.expense_count > 0
                                and (x.expenses_paid_at is not null
                                     or (x.payday is not null and x.payday <= v_today))))
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
    'payday', v_payday,
    'payday_source', v_source,
    'workers', v_workers,
    'hidden_expense_count', v_hidden,
    'exports', v_exports);
end;
$$;

-- ---------------------------------------------------------------- the daily payday job
-- One job for every firm. Idempotent: a run is done once (expenses_paid_at),
-- and only claims still Approved in that run are touched. Each worker gets
-- one summary notification per run with their own total.
create or replace function public.pay_expenses_on_payday()
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  x record;
  w record;
  v_runs integer := 0;
  v_claims integer := 0;
  v_n integer;
  v_paid jsonb;
begin
  for x in
    select * from employer_payroll_exports
     where expense_count > 0 and expenses_paid_at is null
       and payday is not null and payday <= v_today
     order by payday, exported_at
     for update skip locked
  loop
    perform set_config('app.expense_payday_batch', 'on', true);
    perform set_config('app.payroll_ctx', 'on', true);

    with paid as (
      update employer_expense_claims c
         set status = 'Paid', paid_date = x.payday, updated_at = now()
       where c.payroll_export_id = x.id and c.status = 'Approved'
      returning c.employee_id, c.amount
    )
    select coalesce(sum(s.n), 0), coalesce(jsonb_agg(jsonb_build_object(
             'employee_id', s.employee_id, 'n', s.n, 'total', s.total)), '[]'::jsonb)
      into v_n, v_paid
      from (select employee_id, count(*) n, coalesce(sum(amount), 0) total
              from paid group by employee_id) s;
    v_claims := v_claims + v_n;

    update employer_payroll_exports set expenses_paid_at = now() where id = x.id;

    perform set_config('app.expense_payday_batch', 'off', true);
    perform set_config('app.payroll_ctx', 'off', true);

    for w in
      select (j->>'employee_id')::uuid employee_id, e.user_id, (j->>'n')::int n, (j->>'total')::numeric total
        from jsonb_array_elements(v_paid) j
        join employer_employees e on e.id = (j->>'employee_id')::uuid
       where lower(coalesce(e.status, '')) <> 'archived' and e.user_id is not null
    loop
      perform worker_notify(
        w.user_id, 'expense', 'Expenses repaid',
        '£' || to_char(w.total, 'FM999,999,990.00') || ' for ' || w.n || ' claim'
          || case when w.n = 1 then '' else 's' end
          || ' paid on ' || to_char(x.payday, 'FMDy FMDD Mon') || ' with your pay.',
        jsonb_build_object('route', '/electrician/worker-tools/expenses',
                           'employee_id', w.employee_id, 'payroll_export_id', x.id,
                           'payday', x.payday, 'source_type', 'expenses_repaid'));
    end loop;

    v_runs := v_runs + 1;
  end loop;
  return jsonb_build_object('runs', v_runs, 'claims', v_claims);
end;
$$;

-- ---------------------------------------------------------------- grants
revoke all on function public._firm_payday(uuid, date) from public, anon, authenticated;
revoke all on function public.guard_expense_paid() from public, anon, authenticated;
revoke all on function public.trg_notify_expense_decision() from public, anon, authenticated;
revoke all on function public.pay_expenses_on_payday() from public, anon, authenticated;
revoke all on function public.send_payroll_run(uuid, date, date, text, uuid[], uuid[]) from public, anon;
grant execute on function public.send_payroll_run(uuid, date, date, text, uuid[], uuid[]) to authenticated;
revoke all on function public.undo_payroll_export(uuid) from public, anon;
grant execute on function public.undo_payroll_export(uuid) to authenticated;
revoke all on function public.get_payroll_run(uuid, date, date, uuid) from public, anon;
grant execute on function public.get_payroll_run(uuid, date, date, uuid) to authenticated;

-- ---------------------------------------------------------------- schedule: 06:00 UTC daily, one job
select cron.unschedule(jobid) from cron.job where jobname = 'employer-expenses-payday-daily';
select cron.schedule('employer-expenses-payday-daily', '0 6 * * *', $cron$select public.pay_expenses_on_payday();$cron$);
