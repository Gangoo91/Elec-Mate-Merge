-- ELE-1998 regression (10 Oct sanity check): get_worker_home ignored the
-- assignment end date and the 'ended' status, which get_my_jobs respects. A
-- worker whose assignment had ended saw "Next job", "1 job on now" and a
-- Clock in button on the hub while My Jobs showed nothing.
--
-- Fix, additive and HEAD-safe: same signature (no args), same return keys.
-- next_job, jobs_new, jobs_active and the job rows of 'upcoming' now use the
-- same "still on" test as get_my_jobs:
--   assignment status not removed / cancelled / completed / ended
--   assignment end date empty or not yet passed
--   job is not a template
-- The live text is read and patched in place; it fails loudly if the expected
-- text has changed.

do $c$
declare
  v_def text;
  v_old text;
  v_new text;
  v_filter constant text := E'\n       and (a.end_date is null or a.end_date >= current_date)\n       and coalesce(j.is_template, false) = false';
begin
  select pg_get_functiondef('public.get_worker_home()'::regprocedure) into v_def;

  -- next_job
  v_old := E'       and lower(coalesce(a.status, \'\')) not in (\'removed\', \'cancelled\', \'completed\')\n     order by (coalesce(a.start_date, j.start_date) < current_date)';
  v_new := E'       and lower(coalesce(a.status, \'\')) not in (\'removed\', \'cancelled\', \'completed\', \'ended\')'
           || v_filter
           || E'\n     order by (coalesce(a.start_date, j.start_date) < current_date)';
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'get_worker_home: next_job clause not found exactly once';
  end if;
  v_def := replace(v_def, v_old, v_new);

  -- jobs_new
  v_old := E'                    and lower(coalesce(a.status, \'\')) not in (\'removed\', \'cancelled\', \'completed\')),\n    \'jobs_active\'';
  v_new := E'                    and lower(coalesce(a.status, \'\')) not in (\'removed\', \'cancelled\', \'completed\', \'ended\')\n                    and (a.end_date is null or a.end_date >= current_date)\n                    and coalesce(j.is_template, false) = false),\n    \'jobs_active\'';
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'get_worker_home: jobs_new clause not found exactly once';
  end if;
  v_def := replace(v_def, v_old, v_new);

  -- jobs_active (had no assignment-status test at all)
  v_old := E'                       and lower(coalesce(j.status, \'\')) not in (\'completed\', \'complete\', \'cancelled\', \'archived\')),\n    \'tasks_open\'';
  v_new := E'                       and lower(coalesce(j.status, \'\')) not in (\'completed\', \'complete\', \'cancelled\', \'archived\')\n                       and lower(coalesce(a.status, \'\')) not in (\'removed\', \'cancelled\', \'completed\', \'ended\')\n                       and (a.end_date is null or a.end_date >= current_date)\n                       and coalesce(j.is_template, false) = false),\n    \'tasks_open\'';
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'get_worker_home: jobs_active clause not found exactly once';
  end if;
  v_def := replace(v_def, v_old, v_new);

  -- upcoming: job rows
  v_old := E'         where j.archived_at is null\n           and coalesce(a.start_date, j.start_date) between current_date and current_date + 21';
  v_new := E'         where j.archived_at is null\n           and lower(coalesce(a.status, \'\')) not in (\'removed\', \'cancelled\', \'completed\', \'ended\')\n           and (a.end_date is null or a.end_date >= current_date)\n           and coalesce(j.is_template, false) = false\n           and coalesce(a.start_date, j.start_date) between current_date and current_date + 21';
  if (length(v_def) - length(replace(v_def, v_old, ''))) / length(v_old) <> 1 then
    raise exception 'get_worker_home: upcoming job clause not found exactly once';
  end if;
  v_def := replace(v_def, v_old, v_new);

  execute v_def;
end
$c$;

-- Grants are kept by CREATE OR REPLACE; restate the intended ones.
revoke all on function public.get_worker_home() from public, anon;
grant execute on function public.get_worker_home() to authenticated;
