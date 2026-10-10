-- Review fixes M7 + L12 (ELE-2075), 10 Oct 2026: the leaving date is checked
-- on every path, and only the owner or an admin can change one already set.
--
-- Before (20261010288000): hr_mark_leaver took any date from 1990 to today
-- (UTC today, so choosing today failed between 00:00 and 01:00 BST), did not
-- look at when they joined or last worked, overwrote a leaving date already
-- recorded, and office managers could call it. The Records to review sheet
-- writes left_on straight to employer_person_hr (owner/admin) with no check.
--
-- Why it matters: right-to-work copies are kept "for the duration of the
-- worker's employment and for two years afterwards" and then destroyed
-- (Home Office, Employer's guide to right to work checks, 1 October 2026,
-- PDF pp. 22, 30, 32 and 34). A leaving date earlier than the real end of the
-- employment starts that clock early, so the copies could be destroyed while
-- they are still the employer's statutory excuse.
--   https://www.gov.uk/government/publications/right-to-work-checks-employers-guide
--
-- Now:
--   * One check, _hr_left_on_problem, used by hr_mark_leaver and by a new
--     BEFORE trigger on employer_person_hr (so the direct write is checked
--     too): not after today in UK time, not before 1 Jan 1990, not before
--     they joined (the earlier of employer_employees.join_date and the HR
--     start date), not before the last day on a timesheet that was not
--     rejected.
--   * A leaving date already recorded can be changed (hr_mark_leaver with a
--     different date) or cleared (hr_restore_leaver) only by the owner or an
--     admin (can_see_firm_money). The office can still archive someone with
--     no date yet, and re-send the same date.
--   * Today is (now() at time zone 'Europe/London')::date everywhere here.
--
-- Additive: new helper, new trigger on employer_person_hr (new table, not in
-- HEAD or build 49), new bodies for hr_mark_leaver / hr_restore_leaver with
-- the same signatures (neither is in HEAD or build 49). Proved with
-- rolled-back calls as owner, admin, office manager, crew, outsider, anon and
-- the service role before applying.

create or replace function public._hr_left_on_problem(
  p_roster_id uuid, p_left_on date, p_hr_start date default null)
returns text
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_join date;
  v_last date;
begin
  if p_left_on is null then
    return null;
  end if;
  if p_left_on > (now() at time zone 'Europe/London')::date then
    return 'left_on_future';
  end if;
  if p_left_on < date '1990-01-01' then
    return 'left_on_invalid';
  end if;
  select e.join_date into v_join from public.employer_employees e where e.id = p_roster_id;
  if p_left_on < least(coalesce(v_join, p_hr_start), coalesce(p_hr_start, v_join)) then
    return 'left_on_before_start';
  end if;
  select max(t.date) into v_last
    from public.employer_timesheets t
   where t.employee_id = p_roster_id
     and lower(coalesce(t.status, '')) <> 'rejected';
  if v_last is not null and p_left_on < v_last then
    return 'left_on_before_last_timesheet:' || v_last;
  end if;
  return null;
end;
$fn$;
revoke all on function public._hr_left_on_problem(uuid, date, date) from public, anon, authenticated;

create or replace function public.tg_person_hr_left_on_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_problem text;
begin
  if new.left_on is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.left_on is not distinct from old.left_on
     and new.start_date is not distinct from old.start_date then
    return new;
  end if;
  v_problem := public._hr_left_on_problem(new.roster_id, new.left_on, new.start_date);
  if v_problem is not null then
    raise exception '%', v_problem using errcode = '22023';
  end if;
  return new;
end;
$fn$;
revoke all on function public.tg_person_hr_left_on_guard() from public, anon, authenticated;

drop trigger if exists person_hr_left_on_guard on public.employer_person_hr;
create trigger person_hr_left_on_guard
  before insert or update of left_on, start_date on public.employer_person_hr
  for each row execute function public.tg_person_hr_left_on_guard();

create or replace function public.hr_mark_leaver(p_roster_id uuid, p_left_on date)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_problem text;
begin
  select e.id, e.employer_id, e.status, h.left_on as old_left_on, h.start_date as hr_start
    into r
    from public.employer_employees e
    left join public.employer_person_hr h on h.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null or r.employer_id is null
     or r.employer_id not in (select public.my_employer_scope()) then
    raise exception 'not_found' using errcode = '42501';
  end if;
  if p_left_on is null then
    raise exception 'left_on_required' using errcode = '22023';
  end if;
  -- A date already on record is the start of the retention clock: only the
  -- owner or an admin can move it.
  if r.old_left_on is not null and r.old_left_on <> p_left_on
     and not public.can_see_firm_money(r.employer_id) then
    raise exception 'left_on_owner_admin_only' using errcode = '42501';
  end if;
  v_problem := public._hr_left_on_problem(r.id, p_left_on, r.hr_start);
  if v_problem is not null then
    raise exception '%', v_problem using errcode = '22023';
  end if;

  if lower(coalesce(r.status, '')) <> 'archived' then
    update public.employer_employees
       set status = 'Archived', updated_at = now()
     where id = r.id;
  end if;

  insert into public.employer_person_hr (roster_id, employer_id, left_on, updated_by)
  values (r.id, r.employer_id, p_left_on, auth.uid())
  on conflict (roster_id) do update
     set left_on = excluded.left_on, updated_at = now(), updated_by = auth.uid()
   where employer_person_hr.left_on is distinct from excluded.left_on;

  return jsonb_build_object('success', true, 'left_on', p_left_on);
end;
$fn$;
revoke all on function public.hr_mark_leaver(uuid, date) from public, anon;
grant execute on function public.hr_mark_leaver(uuid, date) to authenticated;

create or replace function public.hr_restore_leaver(p_roster_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
begin
  select e.id, e.employer_id, e.status, h.left_on into r
    from public.employer_employees e
    left join public.employer_person_hr h on h.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null or r.employer_id is null
     or r.employer_id not in (select public.my_employer_scope()) then
    raise exception 'not_found' using errcode = '42501';
  end if;
  -- Clearing a recorded leaving date is changing it.
  if r.left_on is not null and not public.can_see_firm_money(r.employer_id) then
    raise exception 'left_on_owner_admin_only' using errcode = '42501';
  end if;
  if lower(coalesce(r.status, '')) = 'archived' then
    update public.employer_employees
       set status = 'Active', updated_at = now()
     where id = r.id;
  end if;
  update public.employer_person_hr
     set left_on = null, updated_at = now(), updated_by = auth.uid()
   where roster_id = r.id and left_on is not null;
  return jsonb_build_object('success', true);
end;
$fn$;
revoke all on function public.hr_restore_leaver(uuid) from public, anon;
grant execute on function public.hr_restore_leaver(uuid) to authenticated;
