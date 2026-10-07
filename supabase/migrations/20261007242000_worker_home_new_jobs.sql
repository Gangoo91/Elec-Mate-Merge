-- Worker Tools home: count jobs the office has put me on that I haven't opened
-- yet (employer_job_assignments.seen_at, stamped by get_my_job_detail), so the
-- home To do can say "2 new jobs" before the worker goes digging.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_worker_home()'::regprocedure);
  if position('jobs_new' in v_def) > 0 then return; end if;
  v_def := replace(v_def, $q$    'jobs_active', (select count(distinct a.job_id)$q$,
$q$    'jobs_new', (select count(distinct a.job_id) from public.employer_job_assignments a
                   join me on me.id = a.employee_id
                   join public.employer_jobs j on j.id = a.job_id
                  where a.seen_at is null and j.archived_at is null
                    and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled', 'archived')
                    and lower(coalesce(a.status, '')) not in ('removed', 'cancelled', 'completed')),
    'jobs_active', (select count(distinct a.job_id)$q$);
  if position('jobs_new' in v_def) = 0 then raise exception 'get_worker_home not patched'; end if;
  execute v_def;
end $$;
