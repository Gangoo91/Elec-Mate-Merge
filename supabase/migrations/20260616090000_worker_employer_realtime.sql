-- Live Worker Tools ⇄ Employer Hub: enable realtime on every shared table both
-- sides read/write, so changes stream instantly in both directions.
--
-- Replica identity full lets column filters (employee_id=eq.X, reported_by,
-- user_id) match on UPDATE/DELETE events. Idempotent — safe to re-run.
--
-- Rollback (per table): alter publication supabase_realtime drop table public.<t>;
do $$
declare t text;
begin
  foreach t in array array[
    'employer_leave_requests',
    'employer_timesheets',
    'employer_expense_claims',
    'employer_incidents',
    'job_issues',
    'employer_worker_locations',
    'employer_job_pack_acknowledgements',
    'employer_jobs',
    'employer_job_assignments',
    'employer_job_comments',
    'employer_certifications',
    'employee_holiday_allowances'
  ]
  loop
    execute format('alter table public.%I replica identity full', t);
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
