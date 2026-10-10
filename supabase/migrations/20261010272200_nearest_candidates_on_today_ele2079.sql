-- ELE-2079 review (with ELE-1827) — "Who's nearest" uses the same crew rule
-- as "Suggest a slot": an apprentice only goes alongside someone qualified
-- who is on the job that day. get_nearest_candidates gains one field,
-- on_this_job_today; everything else is unchanged. Same signature; not called
-- by HEAD or build 49 (only the uncommitted NearestFreeSheet).

create or replace function public.get_nearest_candidates(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs;
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id not in (select public.my_employer_scope()) then
    raise exception 'Job not found';
  end if;
  return jsonb_build_object(
    'job', jsonb_build_object('id', j.id, 'title', j.title, 'location', j.location, 'lat', j.lat, 'lng', j.lng),
    'people', coalesce((
      select jsonb_agg(x order by x.free desc, x.km nulls last, x.name) from (
        select e.id as employee_id, e.name, e.team_role as role, e.phone,
               loc.lat, loc.lng, loc.last_updated, loc.status as presence,
               (select jj.title from public.employer_jobs jj where jj.id = loc.job_id) as at_job,
               case when loc.lat is not null and j.lat is not null then
                 round((6371 * acos(least(1, greatest(-1,
                   cos(radians(j.lat::float8)) * cos(radians(loc.lat::float8)) * cos(radians(loc.lng::float8) - radians(j.lng::float8))
                   + sin(radians(j.lat::float8)) * sin(radians(loc.lat::float8))))))::numeric, 1)
               end as km,
               exists (select 1 from public.employer_job_assignments a where a.job_id = p_job and a.employee_id = e.id
                         and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')) as on_this_job,
               -- ELE-2079 review: on the job today, the crew an apprentice can go alongside.
               exists (select 1 from public.employer_job_assignments a where a.job_id = p_job and a.employee_id = e.id
                         and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                         and v_today between a.start_date and coalesce(a.end_date, a.start_date)) as on_this_job_today,
               (select string_agg(jj.title, ', ') from public.employer_job_assignments a
                  join public.employer_jobs jj on jj.id = a.job_id
                 where a.employee_id = e.id and a.job_id <> p_job and jj.archived_at is null
                   and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                   and v_today between a.start_date and coalesce(a.end_date, a.start_date)) as booked_on,
               exists (select 1 from public.employer_leave_requests l where l.employee_id = e.id and l.status = 'Approved'
                         and v_today between l.start_date and coalesce(l.end_date, l.start_date)) as on_leave,
               not exists (select 1 from public.employer_job_assignments a
                            join public.employer_jobs jj on jj.id = a.job_id
                           where a.employee_id = e.id and a.job_id <> p_job and jj.archived_at is null
                             and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                             and v_today between a.start_date and coalesce(a.end_date, a.start_date))
               and not exists (select 1 from public.employer_leave_requests l where l.employee_id = e.id and l.status = 'Approved'
                                 and v_today between l.start_date and coalesce(l.end_date, l.start_date)) as free
          from public.employer_employees e
          left join lateral (
            select w.lat, w.lng, w.last_updated, w.status, w.job_id
              from public.employer_worker_locations w
             where w.employee_id = e.id and w.lat is not null
               and coalesce(w.last_updated, w.created_at) > now() - interval '12 hours'
             order by coalesce(w.last_updated, w.created_at) desc limit 1) loc on true
         where e.employer_id = j.user_id and lower(coalesce(e.status, '')) = 'active'
      ) x), '[]'::jsonb));
end;
$function$;
