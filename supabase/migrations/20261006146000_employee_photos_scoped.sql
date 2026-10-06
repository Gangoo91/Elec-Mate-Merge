-- ELE-2014 follow-on: employee-photos had "authenticated read" (anyone signed
-- in could list every team photo) and an unrestricted INSERT. The bucket is
-- empty today, so tightening now breaks nothing.
--
-- File names start with the roster id: `<employer_employees.id>[-ts].<ext>`.
--   read:   the firm's managers, the person themselves, and their teammates
--   upload: firm managers for their roster, or the person for their own row
-- The bucket stays PUBLIC until the app that stores bare paths is released
-- (release checklist), because the live app still saves getPublicUrl links.

create or replace function public.employee_photo_row(p_name text)
returns uuid
language sql
immutable
as $$
  select case when p_name ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
              then substring(p_name from 1 for 36)::uuid end
$$;

create or replace function public.can_read_employee_photo(p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.employer_employees e
     where e.id = public.employee_photo_row(p_name)
       and (e.employer_id in (select public.my_employer_scope())
            or e.id in (select public.my_employee_ids())
            or e.employer_id in (select public.my_employer_ids()))
  )
$$;

create or replace function public.can_write_employee_photo(p_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.employer_employees e
     where e.id = public.employee_photo_row(p_name)
       and (e.employer_id in (select public.my_employer_scope())
            or e.id in (select public.my_employee_ids()))
  )
$$;

revoke execute on function public.can_read_employee_photo(text) from public, anon;
revoke execute on function public.can_write_employee_photo(text) from public, anon;
grant execute on function public.can_read_employee_photo(text) to authenticated;
grant execute on function public.can_write_employee_photo(text) to authenticated;

drop policy if exists "Team reads employee photos" on storage.objects;
create policy "Team reads employee photos" on storage.objects
  for select to authenticated
  using (bucket_id = 'employee-photos' and public.can_read_employee_photo(name));

drop policy if exists "Firm uploads employee photos" on storage.objects;
create policy "Firm uploads employee photos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'employee-photos' and public.can_write_employee_photo(name));

drop policy if exists "authenticated read employee-photos" on storage.objects;
drop policy if exists "Authenticated upload employee photos" on storage.objects;
