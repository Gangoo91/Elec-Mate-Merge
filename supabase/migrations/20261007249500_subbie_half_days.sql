-- ELE-1830 follow-up: a day-rate subcontractor's approved half day was billed
-- as a whole day. Day units now come from the hours on each date against the
-- firm's working day (company_profiles.working_day_hours, 8 by default):
-- up to half a working day = 0.5, more = 1. Used by the statement and its
-- preview so they always agree. Hourly-rate subbies are unaffected (hours).
create or replace function public.subbie_day_units(p_ts uuid[])
returns numeric
language sql
stable
security definer
set search_path = public
as $$
  with d as (
    select t.date, sum(coalesce(t.total_hours, 0)) h,
           coalesce(max(cp.working_day_hours), 8) wd
      from public.employer_timesheets t
      join public.employer_employees e on e.id = t.employee_id
      left join public.company_profiles cp on cp.user_id = e.employer_id
     where t.id = any(p_ts)
     group by t.date
  )
  select coalesce(sum(case when h <= 0 then 0 when h <= wd / 2 then 0.5 else 1 end), 0)::numeric from d
$$;
revoke all on function public.subbie_day_units(uuid[]) from public, anon, authenticated;

do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_functiondef('public.issue_subcontractor_statement'::regproc);
  if position('subbie_day_units' in v_def) = 0 then
    v_new := replace(v_def,
      $q$select count(distinct t.date), coalesce(sum(t.total_hours), 0) into v_days, v_hours$q$,
      $q$select public.subbie_day_units(v_ok_ts), coalesce(sum(t.total_hours), 0) into v_days, v_hours$q$);
    if v_new = v_def then raise exception 'issue_subcontractor_statement anchor not found'; end if;
    execute v_new;
  end if;

  v_def := pg_get_functiondef('public.get_subcontractor_run'::regproc);
  if position('subbie_day_units' in v_def) = 0 then
    v_new := replace(v_def,
      $q$(select count(distinct ts.date) from ts where ts.employee_id = s.id)$q$,
      $q$public.subbie_day_units(array(select ts.id from ts where ts.employee_id = s.id))$q$);
    if v_new = v_def then raise exception 'get_subcontractor_run anchor not found'; end if;
    execute v_new;
  end if;
end $$;
