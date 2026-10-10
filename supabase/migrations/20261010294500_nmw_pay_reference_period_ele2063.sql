-- Review fix L15 (ELE-2063), 10 Oct 2026: the minimum wage rate is the one
-- that applies on the first day of the pay reference period, and the
-- apprentice rate stops when the apprenticeship does.
--
-- National Minimum Wage Regulations 2015 (checked 10 Oct 2026):
--   reg 4B: "The hourly rate of the national minimum wage at which a worker is
--     entitled to be remunerated as respects work, in a pay reference period,
--     is the rate which applies to the worker on the first day of that period."
--     https://www.legislation.gov.uk/uksi/2015/621/regulation/4B
--   reg 4A(1)(d), (2): the apprenticeship rate, "as determined in accordance
--     with regulation 5", and the age bands do not apply when it does.
--     https://www.legislation.gov.uk/uksi/2015/621/regulation/4A
--   reg 5: the apprenticeship rate applies to a worker "employed under a
--     contract of apprenticeship" (or treated as such) who is "within the
--     first 12 months after the commencement of that employment or under 19
--     years of age". Once the apprenticeship has ended they are not employed
--     under one, so the age band applies, at any age.
--     https://www.legislation.gov.uk/uksi/2015/621/regulation/5
--
-- Before: _pay_run_below_minimum checked each timesheet against the age on
-- the day worked (a birthday mid-period raised the minimum mid-period, which
-- reg 4B does not do), and nothing recorded when an apprenticeship ended.
--
-- Now:
--   * employer_employee_pay_profiles.apprenticeship_end_date (nullable): the
--     last day of the apprenticeship. Null = still an apprentice.
--   * nmw_minimum_at(dob, apprenticeship start, apprenticeship end, on): the
--     band and rate on a date. nmw_minimum_on(3 args) is unchanged in
--     behaviour (no end date) and now calls it.
--   * _firm_prp_start(firm, date): the first day of the firm's pay period
--     containing the date (company_profiles pay settings, the same rule as
--     src/utils/payPeriods.ts). Null when the firm has not set a pay period.
--   * _pay_run_below_minimum (the check send_pay_run blocks on) evaluates
--     each timesheet on the first day of its pay reference period; with no
--     pay period set it falls back to the day worked (never lower than the
--     reg 4B figure, so it can only over-warn).
--
-- Additive: one nullable column, two new functions, new bodies with the same
-- signatures for nmw_minimum_on and _pay_run_below_minimum (neither is in
-- HEAD or build 49). No backfill.

alter table public.employer_employee_pay_profiles
  add column if not exists apprenticeship_end_date date;
comment on column public.employer_employee_pay_profiles.apprenticeship_end_date is
  'Last day of the apprenticeship (NMW Regulations 2015 reg 5: the apprentice rate applies only while employed under a contract of apprenticeship). Null = still an apprentice. ELE-2063.';

create or replace function public.nmw_minimum_at(
  p_dob date, p_app_start date, p_app_end date, p_on date)
returns table (band text, rate numeric)
language plpgsql
stable
set search_path = public
as $fn$
declare
  v_age int;
  v_band text;
begin
  if p_on is null then
    return;
  end if;
  if p_dob is not null then
    v_age := extract(year from age(p_on, p_dob))::int;
  end if;
  if p_app_start is not null and p_on >= p_app_start
     and (p_app_end is null or p_on <= p_app_end)
     and ((v_age is not null and v_age < 19) or p_on < (p_app_start + interval '1 year')::date) then
    v_band := 'nmw_apprentice';
  elsif v_age is null then
    return;
  elsif v_age >= 21 then
    v_band := 'nmw_21_plus';
  elsif v_age >= 18 then
    v_band := 'nmw_18_20';
  else
    v_band := 'nmw_under_18';
  end if;
  return query
    select v_band, r.amount from statutory_pay_rates r
     where r.key = v_band and r.effective_from <= p_on
     order by r.effective_from desc limit 1;
end
$fn$;
revoke all on function public.nmw_minimum_at(date, date, date, date) from public, anon;
grant execute on function public.nmw_minimum_at(date, date, date, date) to authenticated;

create or replace function public.nmw_minimum_on(p_dob date, p_app_start date, p_on date)
returns table (band text, rate numeric)
language sql
stable
set search_path = public
as $fn$
  select m.band, m.rate from public.nmw_minimum_at(p_dob, p_app_start, null, p_on) m;
$fn$;
revoke all on function public.nmw_minimum_on(date, date, date) from public, anon;
grant execute on function public.nmw_minimum_on(date, date, date) to authenticated;

-- First day of the firm's pay period containing p_date (payPeriods.ts).
create or replace function public._firm_prp_start(p_firm uuid, p_date date)
returns date
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  cp record;
  v_len int;
  v_day int;
  v_start date;
begin
  if p_firm is null or p_date is null then
    return null;
  end if;
  select c.pay_frequency, c.pay_period_anchor, c.payday_offset_days, c.payday_day_of_month
    into cp
    from public.company_profiles c where c.user_id = p_firm;
  if cp.pay_frequency is null or cp.pay_period_anchor is null then
    return null;
  end if;
  if cp.pay_frequency = 'monthly' then
    if cp.payday_day_of_month is null then
      return null;
    end if;
    v_day := least(extract(day from cp.pay_period_anchor)::int, 28);
    v_start := make_date(extract(year from p_date)::int, extract(month from p_date)::int, v_day);
    if p_date < v_start then
      v_start := (v_start - interval '1 month')::date;
    end if;
    return v_start;
  end if;
  if cp.payday_offset_days is null then
    return null;
  end if;
  v_len := case cp.pay_frequency when 'weekly' then 7 when 'fortnightly' then 14
                                 when 'four_weekly' then 28 end;
  if v_len is null then
    return null;
  end if;
  return cp.pay_period_anchor + (floor((p_date - cp.pay_period_anchor)::numeric / v_len)::int * v_len);
end;
$fn$;
revoke all on function public._firm_prp_start(uuid, date) from public, anon, authenticated;

create or replace function public._pay_run_below_minimum(p_firm uuid, p_timesheet_ids uuid[])
returns table (employee_id uuid, name text, band text, minimum numeric, worked_on date)
language sql
stable
security definer
set search_path = public
as $fn$
  select distinct on (e.id) e.id, e.name, m.band, m.rate, t.date
    from employer_timesheets t
    join employer_employees e on e.id = t.employee_id and e.employer_id = p_firm
    left join employer_employee_pay_profiles p on p.employee_id = e.id
    cross join lateral public.nmw_minimum_at(
      p.date_of_birth, p.apprenticeship_start_date, p.apprenticeship_end_date,
      coalesce(public._firm_prp_start(p_firm, t.date), t.date)) m
   where t.id = any(coalesce(p_timesheet_ids, '{}'))
     and coalesce(e.team_role, '') <> 'Subcontractor'
     and coalesce(e.pay_type, 'hourly') = 'hourly'
     and e.hourly_rate > 0
     and e.hourly_rate < m.rate
   order by e.id, m.rate desc, t.date
$fn$;
revoke all on function public._pay_run_below_minimum(uuid, uuid[]) from public, anon, authenticated;
