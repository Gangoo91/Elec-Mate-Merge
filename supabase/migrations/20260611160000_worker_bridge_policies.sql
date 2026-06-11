-- ============================================================================
-- Worker bridge — Slice 3 policies
--
-- 1. Snags: workers report site issues straight into job_issues — the SAME
--    table the employer's Quality & Issues sections already read (rows are
--    stamped with the job owner's user_id so they appear in the employer's
--    view immediately). Assigned workers can read the job's issues.
-- 2. Clock-in cancel: workers may delete their own still-open Pending entry
--    (clock_out IS NULL) — never an approved/closed timesheet.
-- ============================================================================

create policy "Worker reports issues on assigned jobs"
  on public.job_issues
  for insert to authenticated
  with check (
    public.is_assigned_to_job(job_id)
    and user_id = (select j.user_id from public.employer_jobs j where j.id = job_id)
  );

create policy "Worker reads assigned job issues"
  on public.job_issues
  for select to authenticated
  using (public.is_assigned_to_job(job_id));

create policy "Worker cancels own open clock-in"
  on public.employer_timesheets
  for delete to authenticated
  using (
    employee_id in (select public.my_employee_ids())
    and status = 'Pending'
    and clock_out is null
  );
