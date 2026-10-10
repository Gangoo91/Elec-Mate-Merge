-- ELE-1827: "Who's where" — the worker's side.
--
-- Andrew, 8 Oct: a worker sees colleagues on the SAME JOB, TODAY only, and
-- only while those colleagues are clocked in on it. Nobody but the office sees
-- the whole team.
--
-- get_my_job_crew_positions(p_job) is the only worker-scoped read of other
-- people's positions. It:
--   * refuses unless the caller has an active assignment on p_job covering
--     today (UK date), on an active roster row;
--   * lists every OTHER person with an active assignment on the job today
--     (name, initials, firm role, role on the job, finished-my-part time);
--   * says whether each is clocked in on this job (open timesheet on p_job, or
--     an open timesheet with no job, started in the last 16 hours);
--   * returns a position ONLY for someone clocked in, and only if their latest
--     employer_worker_locations row was written since that clock-in, is not an
--     Off Duty / On Leave row, and is under 12 hours old;
--   * never returns phone, email, pay, address or emergency contact.
-- The caller's own clock state and position come back under "me" so the
-- worker sees themselves on the same map. There is no per-worker location
-- consent flag in the schema; the rule "location only between clock-in and
-- clock-out" is enforced by the open-timesheet gate above.

create or replace function public.get_my_job_crew_positions(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_today date := (now() at time zone 'Europe/London')::date;
  v_me uuid;
  v_job record;
  v_result jsonb;
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;

  select e.id into v_me
  from employer_job_assignments a
  join employer_employees e on e.id = a.employee_id
  where a.job_id = p_job
    and e.user_id = v_uid
    and e.status ilike 'active'
    and coalesce(lower(a.status), 'active') not in ('completed', 'cancelled', 'removed', 'ended')
    and (a.start_date is null or a.start_date <= v_today)
    and (a.end_date is null or a.end_date >= v_today)
  order by a.created_at desc
  limit 1;

  if v_me is null or not public.is_assigned_to_job(p_job) then
    raise exception 'Not on this job today' using errcode = '42501';
  end if;

  select j.id, j.title, j.location, j.lat, j.lng
    into v_job
  from employer_jobs j
  where j.id = p_job;

  with crew as (
    select distinct on (e.id)
      e.id as employee_id,
      e.name,
      coalesce(nullif(e.avatar_initials, ''), upper(left(e.name, 2))) as initials,
      e.role,
      a.role_on_job,
      a.finished_at,
      (e.id = v_me) as is_me
    from employer_job_assignments a
    join employer_employees e on e.id = a.employee_id
    where a.job_id = p_job
      and e.status ilike 'active'
      and coalesce(lower(a.status), 'active') not in ('completed', 'cancelled', 'removed', 'ended')
      and (a.start_date is null or a.start_date <= v_today)
      and (a.end_date is null or a.end_date >= v_today)
    order by e.id, a.created_at desc
  ),
  clocked as (
    select c.*,
      (
        select t.clock_in
        from employer_timesheets t
        where t.employee_id = c.employee_id
          and t.clock_in is not null
          and t.clock_out is null
          and t.clock_in > now() - interval '16 hours'
          and (t.job_id = p_job or t.job_id is null)
        order by t.clock_in desc
        limit 1
      ) as clocked_in_at
    from crew c
  ),
  placed as (
    select k.*, pos.lat, pos.lng, pos.last_updated as position_at, pos.status as position_status
    from clocked k
    left join lateral (
      select l.lat, l.lng, l.last_updated, l.status
      from employer_worker_locations l
      where k.clocked_in_at is not null
        and l.employee_id = k.employee_id
      order by l.last_updated desc
      limit 1
    ) pos on true
  ),
  shaped as (
    select p.*,
      (
        p.clocked_in_at is not null
        and p.lat is not null and p.lng is not null
        and coalesce(p.position_status, '') not in ('Off Duty', 'On Leave')
        and p.position_at > now() - interval '12 hours'
        and p.position_at >= p.clocked_in_at - interval '10 minutes'
      ) as show_pos
    from placed p
  )
  select jsonb_build_object(
    'job', jsonb_build_object(
      'id', v_job.id,
      'title', v_job.title,
      'address', v_job.location,
      'lat', v_job.lat,
      'lng', v_job.lng
    ),
    'me', (
      select jsonb_build_object(
        'clocked_in_at', s.clocked_in_at,
        'lat', case when s.show_pos then s.lat end,
        'lng', case when s.show_pos then s.lng end,
        'position_at', case when s.show_pos then s.position_at end
      )
      from shaped s where s.is_me
    ),
    'crew', coalesce((
      select jsonb_agg(jsonb_build_object(
        'employee_id', s.employee_id,
        'name', s.name,
        'initials', s.initials,
        'role', s.role,
        'role_on_job', s.role_on_job,
        'finished_at', s.finished_at,
        'clocked_in_at', s.clocked_in_at,
        'lat', case when s.show_pos then s.lat end,
        'lng', case when s.show_pos then s.lng end,
        'position_at', case when s.show_pos then s.position_at end
      ) order by (s.clocked_in_at is null), s.name)
      from shaped s where not s.is_me
    ), '[]'::jsonb)
  ) into v_result;

  return v_result;
end;
$$;

revoke all on function public.get_my_job_crew_positions(uuid) from public, anon;
grant execute on function public.get_my_job_crew_positions(uuid) to authenticated;

comment on function public.get_my_job_crew_positions(uuid) is
  'ELE-1827: colleagues on the same job today, with a position only while they are clocked in on it (<12h old). Worker-scoped; no contact details.';
