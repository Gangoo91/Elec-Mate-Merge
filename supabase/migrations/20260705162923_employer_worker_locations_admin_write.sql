-- Employer Hub People/Tracking: the admin check-in and check-out flows write
-- employer_worker_locations rows for the company's workers, but the only write
-- policy was "Worker manages own location" — every admin write failed (INSERT)
-- or silently matched 0 rows (UPDATE). Grant the employer write access scoped
-- to workers on their own roster.
-- Rollback: drop policy "Employer manages team locations" on public.employer_worker_locations;
--           drop policy "Employer updates team locations" on public.employer_worker_locations;

create policy "Employer manages team locations"
  on public.employer_worker_locations
  for insert to authenticated
  with check (exists (
    select 1 from employer_employees e
    where e.id = employer_worker_locations.employee_id
      and e.employer_id = (select auth.uid())
  ));

create policy "Employer updates team locations"
  on public.employer_worker_locations
  for update to authenticated
  using (exists (
    select 1 from employer_employees e
    where e.id = employer_worker_locations.employee_id
      and e.employer_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from employer_employees e
    where e.id = employer_worker_locations.employee_id
      and e.employer_id = (select auth.uid())
  ));
