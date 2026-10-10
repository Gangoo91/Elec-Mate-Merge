-- ELE-2075 follow-up (gap analysis 3C #30): every archive path records the
-- real leaving date.
--
-- Before: the person sheet set employer_person_hr.left_on to today (and only
-- for owner/admin); Edit profile's Archive button and its Status select set
-- no date at all. The retention periods (right-to-work copies 2 years after
-- the employment ends, the HR file after that) then had no start.
--
-- Now one function archives and records the leaving date together, and one
-- restores and clears it. Office managers can archive today (employer_employees
-- is my_employer_scope), so they can record the date too; the date itself is
-- not pay. employer_person_hr stays owner/admin for reads and direct writes.
--
-- Home Office, employer's guide to right to work checks (1 Oct 2026): copies
-- are kept "for the duration of the worker's employment and for two years
-- afterwards", so the date employment ended is what starts that clock.
--   https://www.gov.uk/government/publications/right-to-work-checks-employers-guide
--
-- Additive: two new SECURITY DEFINER functions. No table, policy or trigger
-- changes. HEAD and build 49 keep archiving by status as before.

create or replace function public.hr_mark_leaver(p_roster_id uuid, p_left_on date)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
begin
  select e.id, e.employer_id, e.status into r
    from public.employer_employees e
   where e.id = p_roster_id;
  if r.id is null or r.employer_id is null
     or r.employer_id not in (select public.my_employer_scope()) then
    raise exception 'not_found' using errcode = '42501';
  end if;
  if p_left_on is null then
    raise exception 'left_on_required' using errcode = '22023';
  end if;
  -- Archiving switches their access off now, so the last day is today or earlier.
  if p_left_on > current_date then
    raise exception 'left_on_future' using errcode = '22023';
  end if;
  if p_left_on < date '1990-01-01' then
    raise exception 'left_on_invalid' using errcode = '22023';
  end if;

  if lower(coalesce(r.status, '')) <> 'archived' then
    update public.employer_employees
       set status = 'Archived', updated_at = now()
     where id = r.id;
  end if;

  insert into public.employer_person_hr (roster_id, employer_id, left_on, updated_by)
  values (r.id, r.employer_id, p_left_on, auth.uid())
  on conflict (roster_id) do update
     set left_on = excluded.left_on, updated_at = now(), updated_by = auth.uid();

  return jsonb_build_object('success', true, 'left_on', p_left_on);
end;
$fn$;
revoke all on function public.hr_mark_leaver(uuid, date) from public, anon;
grant execute on function public.hr_mark_leaver(uuid, date) to authenticated;

-- Restore to the team: back to Active and the leaving date cleared (they are
-- employed again, so nothing counts down).
create or replace function public.hr_restore_leaver(p_roster_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
begin
  select e.id, e.employer_id, e.status into r
    from public.employer_employees e
   where e.id = p_roster_id;
  if r.id is null or r.employer_id is null
     or r.employer_id not in (select public.my_employer_scope()) then
    raise exception 'not_found' using errcode = '42501';
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
