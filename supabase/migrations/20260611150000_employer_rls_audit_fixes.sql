-- ============================================================================
-- Slice 2 audit fixes
--
-- 1. Vacancies: public read limited to open/active adverts (drafts, closed
--    and filled vacancies — incl. salary bands — were readable by any
--    signed-in user)
-- 2. Job comments: worker-inserted comments must carry the worker's own
--    roster name (author_name was free-text spoofable)
-- 3. is_assigned_to_job: respects assignment lifecycle (no longer grants
--    job visibility forever after an assignment ends)
-- 4. Indexes on the two policy-join columns the advisor flagged
-- 5. Drop the three dead legacy email-keyed policies on worker_locations
--
-- NOTE (audit P1 resolved as not-a-bug): the 118 employer_employees rows
-- with NULL employer_id are self-created Elec-ID stubs by design, NOT a
-- legacy roster needing backfill — no employer owns them and policies
-- correctly ignore them. The real roster builds via Add Employee.
-- Companion code fix: locationService.getMyEmployeeRecord now resolves by
-- user_id (the claim-link key) instead of email.
-- ============================================================================

drop policy if exists "Vacancies are public job ads" on public.employer_vacancies;
create policy "Open vacancies are public job ads"
  on public.employer_vacancies
  for select to authenticated
  using (lower(status) in ('open', 'active'));

drop policy if exists "Worker comments on assigned jobs" on public.employer_job_comments;
create policy "Worker comments on assigned jobs"
  on public.employer_job_comments
  for insert to authenticated
  with check (
    public.is_assigned_to_job(job_id)
    and author_name in (
      select name from public.employer_employees
      where user_id = (select auth.uid()) and status ilike 'active'
    )
  );

create or replace function public.is_assigned_to_job(p_job_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from employer_job_assignments a
    join employer_employees e on e.id = a.employee_id
    where a.job_id = p_job_id
      and e.user_id = auth.uid()
      and e.status ilike 'active'
      and coalesce(lower(a.status), 'active') not in ('completed', 'cancelled', 'removed', 'ended')
      and (a.end_date is null or a.end_date >= current_date)
  );
$$;

create index if not exists idx_employer_expense_claims_employee
  on public.employer_expense_claims (employee_id);
create index if not exists idx_employer_leave_requests_employee
  on public.employer_leave_requests (employee_id);

drop policy if exists "Employees can insert own location" on public.employer_worker_locations;
drop policy if exists "Employees can read own location" on public.employer_worker_locations;
drop policy if exists "Employees can update own location" on public.employer_worker_locations;
