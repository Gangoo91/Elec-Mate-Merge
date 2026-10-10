-- ELE-2072 — "Suggest a slot" only counts crew who are on the job in the
-- window being searched. Before, someone booked on the job last week still
-- counted: they were left out of the suggestions for the remaining days, and
-- as the "qualified person on the job" they let an apprentice be suggested
-- alone. Now crew whose booking on the job has ended before the search
-- starts are treated as free people like anyone else.
--
-- Additive: replaces suggest_job_slots (same signature; not called by HEAD
-- or build 49, only by the uncommitted SuggestSlotSheet and Mate).

create or replace function public.suggest_job_slots(
  p_job uuid, p_from date default null, p_days int default 7, p_limit int default 3)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := public.dispatch_job_firm(p_job);
  j public.employer_jobs;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_wdh numeric;
  v_from date;
  v_hours numeric;
  v_days int := 1;
  v_crew uuid[];
  v_lead boolean;
  v_needed int;
  v_res jsonb;
begin
  select * into j from public.employer_jobs where id = p_job;
  v_from := coalesce(p_from, case when j.start_date > v_today then j.start_date end, v_today);
  select coalesce((select cp.working_day_hours from public.company_profiles cp where cp.user_id = v_firm
                    order by cp.updated_at desc nulls last limit 1), 8) into v_wdh;
  select coalesce(array_agg(a.employee_id), '{}'),
         coalesce(bool_or(not ((coalesce(e.team_role, '') || ' ' || coalesce(e.role, '')) ~* 'apprentice')), false)
    into v_crew, v_lead
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
   where a.job_id = p_job and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
     and coalesce(a.end_date, j.end_date, a.start_date) >= v_from;

  if j.quoted_hours is not null and j.quoted_hours > 0 then
    v_hours := least(j.quoted_hours, v_wdh);
    v_days := greatest(1, ceil(j.quoted_hours / v_wdh))::int;
  else
    v_hours := v_wdh;
    if j.start_date is not null and j.end_date is not null and j.end_date > j.start_date then
      select count(*) into v_days from generate_series(j.start_date, j.end_date, interval '1 day') d
       where extract(isodow from d) < 6;
    end if;
  end if;
  v_needed := greatest(1, coalesce(j.workers_count, 1) - cardinality(v_crew));

  v_res := public._sched_options(v_firm, v_from, v_from + least(greatest(coalesce(p_days, 7), 1), 21) - 1,
                                 coalesce(j.required_credentials, '{}'), v_hours, least(v_days, 10),
                                 j.lat::float8, j.lng::float8, v_needed, p_job, v_crew, v_lead, p_limit);
  return v_res || jsonb_build_object('job', jsonb_build_object(
    'id', j.id, 'title', j.title, 'location', j.location, 'lat', j.lat, 'lng', j.lng,
    'crew_count', cardinality(v_crew), 'workers_count', j.workers_count,
    'has_location', j.lat is not null));
end;
$$;

revoke all on function public.suggest_job_slots(uuid, date, int, int) from public, anon;
grant execute on function public.suggest_job_slots(uuid, date, int, int) to authenticated;
