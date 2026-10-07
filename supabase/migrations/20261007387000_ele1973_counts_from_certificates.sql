-- ELE-1973 — the job counts read the job's certificates, not job_tests.
--
-- get_job_sheet_counts, get_employer_hub_counts and get_job_hub_summary are
-- shared with other work, so this migration does NOT restate them: it reads
-- each live definition, swaps only its job_tests expressions for
-- _job_cert_counts(), asserts nothing else referenced job_tests, and re-runs it.
-- The JSON keys keep their names so the clients keep working:
--   tests / tests_total  = certificates linked to the job(s)
--   tests_passed         = of those, QS approved
--   tests_failed         = of those, returned by the QS (needs fixing)
--   tests_pending        = of those, not finished or waiting for the QS
-- job_tests itself is left in place (0 rows) and unused; dropping it is
-- Andrew's call.

create or replace function public._job_cert_counts(p_jobs uuid[])
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with c as (
    select r.status as cert_status,
           (select q.status from public.report_qs_reviews q
             where q.report_uuid = r.id and q.status <> 'cancelled'
             order by q.created_at desc limit 1) as qs_status
      from public.employer_job_certificates l
      join public.reports r on r.id = l.report_uuid and r.deleted_at is null
     where l.job_id = any (p_jobs)
  )
  select jsonb_build_object(
    'total', count(*),
    'approved', count(*) filter (where qs_status = 'approved'),
    'returned', count(*) filter (where qs_status = 'returned'),
    'waiting', count(*) filter (where qs_status = 'pending'
                                   or (qs_status is null and cert_status <> 'completed'))
  ) from c;
$$;
revoke all on function public._job_cert_counts(uuid[]) from public, anon, authenticated;

do $mig$
declare
  v_def text;
  v_fn text;
  v_pairs text[][];
  i int;
begin
  -- get_employer_hub_counts
  v_fn := 'public.get_employer_hub_counts()';
  v_def := pg_get_functiondef(v_fn::regprocedure);
  v_pairs := array[
    array[$s$(select count(*) from job_tests t where t.job_id = any (v_jobs))$s$,
          $s$((public._job_cert_counts(v_jobs))->>'total')::int$s$],
    array[$s$(select count(*) from job_tests t where t.job_id = any (v_jobs) and t.result = 'Fail')$s$,
          $s$((public._job_cert_counts(v_jobs))->>'returned')::int$s$],
    array[$s$(select count(*) from job_tests t where t.job_id = any (v_jobs) and t.result = 'Pending')$s$,
          $s$((public._job_cert_counts(v_jobs))->>'waiting')::int$s$]
  ];
  for i in 1 .. array_length(v_pairs, 1) loop
    if position(v_pairs[i][1] in v_def) = 0 then
      raise exception 'ELE-1973: % no longer contains %', v_fn, v_pairs[i][1];
    end if;
    v_def := replace(v_def, v_pairs[i][1], v_pairs[i][2]);
  end loop;
  if position('job_tests' in v_def) > 0 then
    raise exception 'ELE-1973: % still references job_tests', v_fn;
  end if;
  execute v_def;

  -- get_job_hub_summary
  v_fn := 'public.get_job_hub_summary(uuid)';
  v_def := pg_get_functiondef(v_fn::regprocedure);
  v_pairs := array[
    array[$s$(select count(*) from job_tests where job_id = p_job_id)$s$,
          $s$((public._job_cert_counts(array[p_job_id]))->>'total')::int$s$],
    array[$s$(select count(*) from job_tests where job_id = p_job_id and result ilike 'pass%')$s$,
          $s$((public._job_cert_counts(array[p_job_id]))->>'approved')::int$s$],
    array[$s$(select count(*) from job_tests where job_id = p_job_id and result ilike 'fail%')$s$,
          $s$((public._job_cert_counts(array[p_job_id]))->>'returned')::int$s$]
  ];
  for i in 1 .. array_length(v_pairs, 1) loop
    if position(v_pairs[i][1] in v_def) = 0 then
      raise exception 'ELE-1973: % no longer contains %', v_fn, v_pairs[i][1];
    end if;
    v_def := replace(v_def, v_pairs[i][1], v_pairs[i][2]);
  end loop;
  if position('job_tests' in v_def) > 0 then
    raise exception 'ELE-1973: % still references job_tests', v_fn;
  end if;
  execute v_def;

  -- get_job_sheet_counts
  v_fn := 'public.get_job_sheet_counts(uuid)';
  v_def := pg_get_functiondef(v_fn::regprocedure);
  v_pairs := array[
    array[$s$(select count(*) from job_tests where job_id = p_job_id and result ilike 'fail%')$s$,
          $s$((public._job_cert_counts(array[p_job_id]))->>'returned')::int$s$],
    array[$s$(select count(*) from job_tests where job_id = p_job_id)$s$,
          $s$((public._job_cert_counts(array[p_job_id]))->>'total')::int$s$]
  ];
  for i in 1 .. array_length(v_pairs, 1) loop
    if position(v_pairs[i][1] in v_def) = 0 then
      raise exception 'ELE-1973: % no longer contains %', v_fn, v_pairs[i][1];
    end if;
    v_def := replace(v_def, v_pairs[i][1], v_pairs[i][2]);
  end loop;
  if position('job_tests' in v_def) > 0 then
    raise exception 'ELE-1973: % still references job_tests', v_fn;
  end if;
  execute v_def;
end;
$mig$;

-- Retire the hand-typed log for the app: no client role writes it any more.
revoke insert, update, delete on public.job_tests from authenticated, anon;
