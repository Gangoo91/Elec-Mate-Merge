-- ELE-2009 My pay (worker): pay period + payday from firm settings, and what
-- has been sent to payroll.
--
-- 1. company_profiles pay-period columns, set once by the office (owner/admin)
--    through set_firm_pay_settings (company_profiles UPDATE RLS is owner-only).
--      pay_frequency       weekly | fortnightly | four_weekly | monthly (NULL = not set)
--      pay_period_anchor   the first day of any one pay period. Monthly: only its
--                          day of the month is used (1 = calendar month).
--      payday_offset_days  weekly-type: payday = period end + N days
--      payday_day_of_month monthly: 0 = last working day, 1-31 (clamped to month end)
--      payday_next_month   monthly: payday falls in the month AFTER the period ends
--    Paydays on a Saturday/Sunday move to the Friday before (worked out in the app).
-- 2. employer_payroll_exports — a row each time the office exports approved
--    hours to payroll from Timesheets (record_payroll_export). Workers read only
--    the rows that include them, dates only (get_my_payroll_exports).
-- 3. get_firm_pay_settings — settings only (no money), for the office and for
--    the firm's own active workers.

-- ── 1. Pay period settings ───────────────────────────────────────────────────
alter table public.company_profiles
  add column if not exists pay_frequency text
    check (pay_frequency is null or pay_frequency in ('weekly','fortnightly','four_weekly','monthly')),
  add column if not exists pay_period_anchor date,
  add column if not exists payday_offset_days integer
    check (payday_offset_days is null or payday_offset_days between -13 and 35),
  add column if not exists payday_day_of_month integer
    check (payday_day_of_month is null or payday_day_of_month between 0 and 31),
  add column if not exists payday_next_month boolean;

comment on column public.company_profiles.pay_frequency is 'Employer Hub: how often the firm runs payroll (weekly/fortnightly/four_weekly/monthly). NULL = not set. Set via set_firm_pay_settings (owner/admin). Read by Worker Tools My pay.';
comment on column public.company_profiles.pay_period_anchor is 'Employer Hub: first day of any one pay period. Monthly: only the day of month is used.';
comment on column public.company_profiles.payday_offset_days is 'Employer Hub: weekly-type pay — payday = period end + N days (weekends move to the Friday before).';
comment on column public.company_profiles.payday_day_of_month is 'Employer Hub: monthly pay — 0 = last working day, else day of month (clamped).';
comment on column public.company_profiles.payday_next_month is 'Employer Hub: monthly pay — payday is in the month after the period ends.';

create or replace function public.get_firm_pay_settings(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v jsonb;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not (
       p_firm in (select public.my_employer_scope())
       or exists (select 1 from employer_employees e
                   where e.user_id = auth.uid() and e.employer_id = p_firm
                     and e.status ilike 'active')) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  select jsonb_build_object(
           'has_profile', true,
           'pay_frequency', cp.pay_frequency,
           'pay_period_anchor', cp.pay_period_anchor,
           'payday_offset_days', cp.payday_offset_days,
           'payday_day_of_month', cp.payday_day_of_month,
           'payday_next_month', cp.payday_next_month,
           'mileage_rate_pence', cp.mileage_rate_pence)
    into v
    from company_profiles cp where cp.user_id = p_firm;
  return coalesce(v, jsonb_build_object('has_profile', false));
end;
$$;
revoke all on function public.get_firm_pay_settings(uuid) from public, anon;
grant execute on function public.get_firm_pay_settings(uuid) to authenticated;

-- Owner/admin setter. p_frequency NULL clears the pay period entirely.
create or replace function public.set_firm_pay_settings(
  p_firm uuid,
  p_frequency text,
  p_anchor date default null,
  p_offset_days integer default null,
  p_day_of_month integer default null,
  p_next_month boolean default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rows integer;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  if p_frequency is null then
    update public.company_profiles
       set pay_frequency = null, pay_period_anchor = null, payday_offset_days = null,
           payday_day_of_month = null, payday_next_month = null, updated_at = now()
     where user_id = p_firm;
  elsif p_frequency in ('weekly','fortnightly','four_weekly') then
    if p_anchor is null or p_offset_days is null or p_offset_days not between -13 and 35 then
      raise exception 'pay_settings_invalid' using errcode = '22023';
    end if;
    update public.company_profiles
       set pay_frequency = p_frequency, pay_period_anchor = p_anchor,
           payday_offset_days = p_offset_days, payday_day_of_month = null,
           payday_next_month = null, updated_at = now()
     where user_id = p_firm;
  elsif p_frequency = 'monthly' then
    if p_anchor is null or extract(day from p_anchor) > 28
       or p_day_of_month is null or p_day_of_month not between 0 and 31 then
      raise exception 'pay_settings_invalid' using errcode = '22023';
    end if;
    update public.company_profiles
       set pay_frequency = 'monthly', pay_period_anchor = p_anchor,
           payday_offset_days = null, payday_day_of_month = p_day_of_month,
           payday_next_month = coalesce(p_next_month, false), updated_at = now()
     where user_id = p_firm;
  else
    raise exception 'pay_settings_invalid' using errcode = '22023';
  end if;

  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    raise exception 'no_company_profile' using errcode = 'P0002';
  end if;
  return public.get_firm_pay_settings(p_firm);
end;
$$;
revoke all on function public.set_firm_pay_settings(uuid, text, date, integer, integer, boolean) from public, anon;
grant execute on function public.set_firm_pay_settings(uuid, text, date, integer, integer, boolean) to authenticated;

-- ── 2. Payroll export log ────────────────────────────────────────────────────
create table if not exists public.employer_payroll_exports (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references public.profiles(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  kind text not null check (kind in ('hours','xero','sage','quickbooks','csv')),
  employee_ids uuid[] not null default '{}',
  exported_by uuid default auth.uid(),
  exported_at timestamptz not null default now(),
  check (period_end >= period_start)
);
create index if not exists employer_payroll_exports_firm_idx
  on public.employer_payroll_exports (employer_id, period_end desc);
create index if not exists employer_payroll_exports_emp_idx
  on public.employer_payroll_exports using gin (employee_ids);

alter table public.employer_payroll_exports enable row level security;
revoke all on public.employer_payroll_exports from anon;

drop policy if exists "Firm reads its payroll exports" on public.employer_payroll_exports;
create policy "Firm reads its payroll exports"
  on public.employer_payroll_exports
  for select
  to authenticated
  using (employer_id in (select public.my_employer_scope()));
-- No insert/update/delete policies: rows are written by record_payroll_export only.

comment on table public.employer_payroll_exports is '[EMPLOYER HUB → WORKER TOOLS] One row each time the office exports approved hours to payroll (Timesheets → Export). Scope: employer_id = the firm (owner profiles.id); managers read via my_employer_scope(); employee_ids = roster rows in the file. Used by: Employer Hub Timesheets export (record_payroll_export), Worker Tools My pay "sent to payroll on" (get_my_payroll_exports, dates only). Rule: Written only through record_payroll_export; ELE-1825 month-end export should write here too.';

create or replace function public.record_payroll_export(
  p_firm uuid,
  p_start date,
  p_end date,
  p_kind text,
  p_employee_ids uuid[]
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ids uuid[];
  v_id uuid;
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
  -- Keep only roster rows that belong to this firm.
  select coalesce(array_agg(distinct e.id), '{}') into v_ids
    from employer_employees e
   where e.id = any(coalesce(p_employee_ids, '{}')) and e.employer_id = p_firm;

  insert into employer_payroll_exports (employer_id, period_start, period_end, kind, employee_ids)
  values (p_firm, p_start, p_end, p_kind, v_ids)
  returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.record_payroll_export(uuid, date, date, text, uuid[]) from public, anon;
grant execute on function public.record_payroll_export(uuid, date, date, text, uuid[]) to authenticated;

-- Worker: when were my hours sent to payroll? Dates only, own roster row only.
create or replace function public.get_my_payroll_exports(p_employee uuid, p_since date default null)
returns table (period_start date, period_end date, exported_at timestamptz)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_employee is null or p_employee not in (select public.my_employee_ids()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  return query
    select x.period_start, x.period_end, x.exported_at
      from employer_payroll_exports x
      join employer_employees e on e.id = p_employee and e.employer_id = x.employer_id
     where p_employee = any(x.employee_ids)
       and x.period_end >= coalesce(p_since, current_date - 120)
     order by x.exported_at desc
     limit 100;
end;
$$;
revoke all on function public.get_my_payroll_exports(uuid, date) from public, anon;
grant execute on function public.get_my_payroll_exports(uuid, date) to authenticated;
