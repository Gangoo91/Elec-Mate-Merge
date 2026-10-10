-- Gap #4: one payroll file that is legally right (ELE-2062 follow-on).
--
-- One pay run, used everywhere (Finance > Accounting > Send to payroll; the
-- Timesheets "Payroll file" button now opens it). This migration is ADDITIVE:
--   * employer_payroll_exports gets nullable preset / pay_check / holiday_rows.
--     The existing kind check is untouched: BrightPay, Moneysoft and generic
--     runs are stored as kind 'csv' with the preset alongside.
--   * employer_employee_pay_profiles gets a nullable payroll_id (the works
--     number the payroll package matches people on).
--   * get_firm_holiday_bases(): holiday basis for everyone in the firm scope
--     (no date of birth, no money), so an office manager's hours run can still
--     write the accrual rows of the 6-year holiday record (WTR reg 16B).
--   * send_pay_run(): wraps send_payroll_run() (unchanged, HEAD and build 49
--     keep calling it), then in the SAME transaction
--       - refuses a run with anyone paid below the legal minimum for their age
--         or apprentice status on a day worked, unless the owner/admin gives a
--         reason (office managers are refused outright and told to ask),
--       - writes the holiday record rows (accrual for everyone; holiday pay
--         and rolled-up pay only for owner/admin),
--       - stamps preset, the pay check summary and the row count on the run.
--
-- Sources: https://www.gov.uk/national-minimum-wage-rates (bands, apprentice
-- rule), https://www.legislation.gov.uk/uksi/1998/1833/regulation/15B (12.07%),
-- https://www.legislation.gov.uk/uksi/1998/1833/regulation/16A (rolled up),
-- https://www.legislation.gov.uk/uksi/1998/1833/regulation/16B (6 years).

alter table public.employer_payroll_exports
  add column if not exists preset text,
  add column if not exists pay_check jsonb,
  add column if not exists holiday_rows integer;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'employer_payroll_exports_preset_check') then
    alter table public.employer_payroll_exports
      add constraint employer_payroll_exports_preset_check
      check (preset is null or preset in ('xero', 'sage', 'quickbooks', 'brightpay', 'moneysoft', 'generic', 'hours'));
  end if;
end $$;

comment on column public.employer_payroll_exports.preset is
  'Which file layout the run was made for (gap #4). kind keeps the old five values; brightpay/moneysoft/generic are kind csv.';
comment on column public.employer_payroll_exports.pay_check is
  'Minimum wage check at send: counts only, plus the override reason when someone was below. No rates.';
comment on column public.employer_payroll_exports.holiday_rows is
  'Rows written to employer_holiday_records by this run.';

alter table public.employer_employee_pay_profiles
  add column if not exists payroll_id text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'pay_profile_payroll_id_len') then
    alter table public.employer_employee_pay_profiles
      add constraint pay_profile_payroll_id_len
      check (payroll_id is null or char_length(payroll_id) between 1 and 40);
  end if;
end $$;

comment on column public.employer_employee_pay_profiles.payroll_id is
  'Works number / payroll ID in the firm''s payroll package, so imports match the right person.';

-- Holiday basis for the firm scope. No date of birth, no pay.
create or replace function public.get_firm_holiday_bases(p_firm uuid)
returns table (employee_id uuid, holiday_basis text, rolled_up_holiday boolean, payroll_id text)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  return query
    select p.employee_id, p.holiday_basis, p.rolled_up_holiday, p.payroll_id
      from employer_employee_pay_profiles p
      join employer_employees e on e.id = p.employee_id and e.employer_id = p_firm
     where p.employer_id = p_firm;
end $$;

revoke all on function public.get_firm_holiday_bases(uuid) from public, anon;
grant execute on function public.get_firm_holiday_bases(uuid) to authenticated;

-- People in a set of timesheets paid below the legal minimum on a day worked.
-- Hourly pay only (salaried and day-rate work is checked on screen, labelled).
create or replace function public._pay_run_below_minimum(p_firm uuid, p_timesheet_ids uuid[])
returns table (employee_id uuid, name text, band text, minimum numeric, worked_on date)
language sql
stable
security definer
set search_path = public
as $$
  select distinct on (e.id) e.id, e.name, m.band, m.rate, t.date
    from employer_timesheets t
    join employer_employees e on e.id = t.employee_id and e.employer_id = p_firm
    left join employer_employee_pay_profiles p on p.employee_id = e.id
    cross join lateral public.nmw_minimum_on(p.date_of_birth, p.apprenticeship_start_date, t.date) m
   where t.id = any(coalesce(p_timesheet_ids, '{}'))
     and coalesce(e.team_role, '') <> 'Subcontractor'
     and coalesce(e.pay_type, 'hourly') = 'hourly'
     and e.hourly_rate > 0
     and e.hourly_rate < m.rate
   order by e.id, m.rate desc, t.date
$$;

revoke all on function public._pay_run_below_minimum(uuid, uuid[]) from public, anon, authenticated;

create or replace function public.send_pay_run(
  p_firm uuid,
  p_start date,
  p_end date,
  p_preset text,
  p_timesheet_ids uuid[],
  p_expense_ids uuid[],
  p_holiday_rows jsonb default '[]'::jsonb,
  p_pay_check jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_kind text;
  v_res jsonb;
  v_id uuid;
  v_below int;
  v_names text;
  v_reason text := nullif(btrim(coalesce(p_pay_check->>'override_reason', '')), '');
  v_rows jsonb := coalesce(p_holiday_rows, '[]'::jsonb);
  r jsonb;
  v_kind_row text;
  v_emp record;
  v_n int := 0;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);
  if p_preset is null
     or p_preset not in ('xero', 'sage', 'quickbooks', 'brightpay', 'moneysoft', 'generic', 'hours') then
    raise exception 'preset_invalid' using errcode = '22023';
  end if;
  if not v_money and p_preset <> 'hours' then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if jsonb_typeof(v_rows) <> 'array' or jsonb_array_length(v_rows) > 500 then
    raise exception 'invalid' using errcode = '22023';
  end if;

  -- Minimum wage: checked here, on the rows being sent, not just on screen.
  select count(*), string_agg(b.name, ', ' order by b.name)
    into v_below, v_names
    from public._pay_run_below_minimum(p_firm, p_timesheet_ids) b;
  if v_below > 0 then
    if not v_money then
      raise exception 'pay_check_needed' using errcode = '22023',
        hint = 'Someone in this run is paid below the legal minimum. The owner or an admin must check it.';
    end if;
    if v_reason is null then
      raise exception 'below_minimum' using errcode = '22023', detail = v_names;
    end if;
  end if;

  v_kind := case when p_preset in ('xero', 'sage', 'quickbooks', 'hours') then p_preset else 'csv' end;
  v_res := public.send_payroll_run(p_firm, p_start, p_end, v_kind, p_timesheet_ids, p_expense_ids);
  v_id := (v_res->>'export_id')::uuid;

  if coalesce((v_res->>'replayed')::boolean, false) then
    return v_res || jsonb_build_object(
      'holiday_rows', (select x.holiday_rows from employer_payroll_exports x where x.id = v_id),
      'preset', (select x.preset from employer_payroll_exports x where x.id = v_id));
  end if;

  -- The 6-year holiday record, written with the run.
  for r in select * from jsonb_array_elements(v_rows) loop
    v_kind_row := r->>'kind';
    continue when v_kind_row is null or v_kind_row not in ('accrual', 'holiday_pay', 'rolled_up_pay');
    continue when not v_money and (v_kind_row <> 'accrual' or r->>'amount' is not null);
    select e.id, e.name into v_emp
      from employer_employees e
     where e.id = (r->>'employee_id')::uuid and e.employer_id = p_firm
       and coalesce(e.team_role, '') <> 'Subcontractor';
    continue when v_emp.id is null;
    continue when exists (
      select 1 from employer_holiday_records h
       where h.employer_id = p_firm and h.employee_id = v_emp.id and h.kind = v_kind_row
         and h.period_start is not distinct from (r->>'period_start')::date
         and h.period_end is not distinct from (r->>'period_end')::date
         and h.hours is not distinct from (r->>'hours')::numeric
         and h.days is not distinct from (r->>'days')::numeric
         and h.amount is not distinct from (case when v_money then (r->>'amount')::numeric end));
    insert into employer_holiday_records
      (employer_id, employee_id, employee_name, kind, period_start, period_end, days, hours,
       amount, basis, method, is_estimate, source, source_id)
    values (p_firm, v_emp.id, v_emp.name, v_kind_row, (r->>'period_start')::date, (r->>'period_end')::date,
            (r->>'days')::numeric, (r->>'hours')::numeric,
            case when v_money then (r->>'amount')::numeric end,
            case when r->>'basis' in ('fixed', 'irregular', 'part_year') then r->>'basis' end,
            left(r->>'method', 500), coalesce((r->>'is_estimate')::boolean, false),
            'pay_run', v_id);
    v_n := v_n + 1;
  end loop;

  update employer_payroll_exports
     set preset = p_preset,
         holiday_rows = v_n,
         pay_check = jsonb_build_object(
           'checked_at', now(),
           'below', v_below,
           'no_birth_date', greatest(0, coalesce((p_pay_check->>'no_birth_date')::int, 0)),
           'override_reason', case when v_below > 0 then left(v_reason, 300) end)
   where id = v_id;

  return v_res || jsonb_build_object('holiday_rows', v_n, 'preset', p_preset, 'below', v_below);
end $$;

revoke all on function public.send_pay_run(uuid, date, date, text, uuid[], uuid[], jsonb, jsonb) from public, anon;
grant execute on function public.send_pay_run(uuid, date, date, text, uuid[], uuid[], jsonb, jsonb) to authenticated;

comment on function public.send_pay_run(uuid, date, date, text, uuid[], uuid[], jsonb, jsonb) is
  'Gap #4 single pay run: minimum wage check, send_payroll_run, 6-year holiday record and preset in one transaction.';
