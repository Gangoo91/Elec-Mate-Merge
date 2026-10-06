-- ELE-2004: worker status ("My status") — who set it, and tell the worker when
-- the office changes it.
--
-- 1. employer_worker_locations gains set_by / set_by_name / source, stamped by a
--    BEFORE trigger from auth.uid() — never trusted from the client:
--      self   = the worker set it (auth.uid() = the roster row's user_id)
--      office = someone else in the firm set it (Tracking check-in / check-out,
--               archive check-out)
--      clock  = written by trg_timesheet_presence when the worker clocks in/out
--               (detected by trigger depth, so a client can't claim it)
--      system = no signed-in user (service role / cron)
-- 2. An office change sends the worker an in-app notice + push via
--    worker_notify(): "Lisa Smith set you to Office, 10:12".
-- 3. trg_timesheet_presence: clocking out of a shift that had no job now also
--    sets Off Duty (no coordinates). Previously only job shifts moved status, so
--    a worker who clocked out of a no-job shift stayed "On Site" on the map.
--    Everything else in the function is unchanged.
--
-- Reversible: drop the two triggers + functions below, drop the three columns,
-- and restore trg_timesheet_presence from 20260614150000_timesheet_presence.sql.

alter table public.employer_worker_locations
  add column if not exists set_by uuid,
  add column if not exists set_by_name text,
  add column if not exists source text;

comment on column public.employer_worker_locations.set_by is
  'auth.uid() of whoever wrote this status (stamped by trigger, never from the client). Null = system.';
comment on column public.employer_worker_locations.set_by_name is
  'Display name of the office user who set this status; null when the worker set it themselves.';
comment on column public.employer_worker_locations.source is
  'self | office | clock | system — who moved the status (stamped by stamp_worker_location_setter).';

create or replace function public.stamp_worker_location_setter()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_worker uuid;
begin
  select e.user_id into v_worker from public.employer_employees e where e.id = new.employee_id;

  new.set_by := v_uid;
  new.set_by_name := null;

  if pg_trigger_depth() > 1 and tg_op = 'INSERT' and new.source = 'clock' then
    -- Written by trg_timesheet_presence from a clock event.
    null;
  elsif v_uid is null then
    new.source := 'system';
  elsif v_worker is not null and v_uid = v_worker then
    new.source := 'self';
  else
    new.source := 'office';
    select nullif(trim(p.full_name), '') into new.set_by_name
      from public.profiles p where p.id = v_uid;
    new.set_by_name := coalesce(new.set_by_name, 'The office');
  end if;

  return new;
end;
$$;

revoke all on function public.stamp_worker_location_setter() from public, anon;

drop trigger if exists stamp_worker_location_setter on public.employer_worker_locations;
create trigger stamp_worker_location_setter
  before insert or update on public.employer_worker_locations
  for each row execute function public.stamp_worker_location_setter();

create or replace function public.notify_worker_status_override()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker uuid;
begin
  if new.source is distinct from 'office' then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.status is not distinct from old.status then
    return new;
  end if;

  select e.user_id into v_worker from public.employer_employees e where e.id = new.employee_id;
  if v_worker is null then
    return new;
  end if;

  perform public.worker_notify(
    v_worker,
    'status',
    'Your status was changed',
    coalesce(new.set_by_name, 'The office') || ' set you to ' || new.status || ', ' ||
      to_char(coalesce(new.last_updated, now()) at time zone 'Europe/London', 'HH24:MI'),
    jsonb_build_object(
      'route', '/electrician/worker-tools/status',
      'location_id', new.id,
      'status', new.status
    )
  );
  return new;
end;
$$;

revoke all on function public.notify_worker_status_override() from public, anon;

drop trigger if exists notify_worker_status_override on public.employer_worker_locations;
create trigger notify_worker_status_override
  after insert or update of status on public.employer_worker_locations
  for each row execute function public.notify_worker_status_override();

create or replace function public.trg_timesheet_presence()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  -- Presence is a "right now" signal — only today's clock events count, so
  -- correcting/editing a historic timesheet never moves the live map.
  if new.date is distinct from current_date then
    return new;
  end if;

  -- On UPDATE, only react when a clock value actually changed (not e.g. a notes edit).
  if tg_op = 'UPDATE'
     and new.clock_in is not distinct from old.clock_in
     and new.clock_out is not distinct from old.clock_out then
    return new;
  end if;

  if new.job_id is null then
    -- ELE-2004: a no-job shift still ends the working day. Clocking in without a
    -- job says nothing about where the worker is, so that leaves status alone.
    if new.clock_out is not null and coalesce((
         select l.status from employer_worker_locations l
          where l.employee_id = new.employee_id
          order by l.last_updated desc limit 1), '') not in ('Off Duty', 'On Leave') then
      insert into employer_worker_locations
        (employee_id, job_id, lat, lng, status, checked_out_at, last_updated, source)
      values (new.employee_id, null, null, null, 'Off Duty', now(), now(), 'clock');
    end if;
    return new;
  end if;

  if new.clock_out is not null then
    insert into employer_worker_locations
      (employee_id, job_id, lat, lng, status, checked_out_at, last_updated, source)
    select new.employee_id, new.job_id, j.lat, j.lng, 'Off Duty', now(), now(), 'clock'
    from employer_jobs j
    where j.id = new.job_id;
  elsif new.clock_in is not null then
    insert into employer_worker_locations
      (employee_id, job_id, lat, lng, status, checked_in_at, last_updated, source)
    select new.employee_id, new.job_id, j.lat, j.lng, 'On Site', now(), now(), 'clock'
    from employer_jobs j
    where j.id = new.job_id;
  end if;

  return new;
end;
$function$;
