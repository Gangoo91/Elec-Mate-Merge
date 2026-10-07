-- ELE-2000 — Worker timesheets: where the clock-in happened, fix-and-resubmit,
-- one break default.
--
--   * clock_in_/clock_out_ lat, lng, accuracy (metres) + a location status
--     ('captured' | 'denied' | 'unavailable'). The device gives a one-off fix
--     at clock-in and clock-out; a denied permission never blocks clocking in.
--     Once recorded, a worker can't rewrite them (guard trigger).
--   * timesheet_presence now uses the device fix when there is one, so "On
--     site" on the office map is evidence, not the job's pin.
--   * fix_my_timesheet(): the worker edits a pending day, or fixes a REJECTED
--     day and sends it back (status → Pending, reason kept as
--     previous_rejection_reason). Hours are computed server-side. The office
--     bell says "resubmitted".
--   * A worker may delete their own pending entry.
--   * company_profiles.default_break_minutes: one firm-wide break default used
--     by clock-out AND manual entry (was 0 and 30). get_my_time_settings()
--     hands it to the worker.

alter table public.employer_timesheets
  add column if not exists clock_in_lat numeric(9, 6),
  add column if not exists clock_in_lng numeric(9, 6),
  add column if not exists clock_in_accuracy_m numeric(8, 1),
  add column if not exists clock_in_location_status text,
  add column if not exists clock_out_lat numeric(9, 6),
  add column if not exists clock_out_lng numeric(9, 6),
  add column if not exists clock_out_accuracy_m numeric(8, 1),
  add column if not exists clock_out_location_status text,
  add column if not exists resubmitted_at timestamptz,
  add column if not exists previous_rejection_reason text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'employer_timesheets_clock_location_check') then
    alter table public.employer_timesheets add constraint employer_timesheets_clock_location_check check (
      (clock_in_lat is null or clock_in_lat between -90 and 90)
      and (clock_in_lng is null or clock_in_lng between -180 and 180)
      and (clock_out_lat is null or clock_out_lat between -90 and 90)
      and (clock_out_lng is null or clock_out_lng between -180 and 180)
      and (clock_in_accuracy_m is null or clock_in_accuracy_m >= 0)
      and (clock_out_accuracy_m is null or clock_out_accuracy_m >= 0)
      and (clock_in_location_status is null or clock_in_location_status in ('captured', 'denied', 'unavailable'))
      and (clock_out_location_status is null or clock_out_location_status in ('captured', 'denied', 'unavailable'))
    );
  end if;
end $$;

comment on column public.employer_timesheets.clock_in_lat is
  'Device location at clock-in (one fix, ELE-2000). Null with clock_in_location_status denied/unavailable = the phone gave none.';
comment on column public.employer_timesheets.clock_in_location_status is
  'captured | denied | unavailable — null for manual entries and rows before ELE-2000.';
comment on column public.employer_timesheets.previous_rejection_reason is
  'The office''s reason when this day was last rejected, kept when the worker fixes and resubmits it.';

-- ── Guard: what a worker may change on their own row ────────────────────────
create or replace function public.guard_timesheet_worker_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  if auth.uid() is null then
    return new;
  end if;
  select e.employer_id into v_firm from public.employer_employees e where e.id = old.employee_id;
  if v_firm in (select public.my_employer_scope()) then
    return new; -- the office
  end if;
  -- fix_my_timesheet() has validated the change itself.
  if coalesce(current_setting('elecmate.timesheet_fix', true), '') = 'on' then
    return new;
  end if;

  -- The decision is the office's.
  new.approved_by := old.approved_by;
  new.approved_by_id := old.approved_by_id;
  new.approved_at := old.approved_at;
  new.rejection_reason := old.rejection_reason;
  new.previous_rejection_reason := old.previous_rejection_reason;
  new.resubmitted_at := old.resubmitted_at;
  new.employee_id := old.employee_id;

  -- Location evidence is written once.
  if old.clock_in_location_status is not null then
    new.clock_in_lat := old.clock_in_lat;
    new.clock_in_lng := old.clock_in_lng;
    new.clock_in_accuracy_m := old.clock_in_accuracy_m;
    new.clock_in_location_status := old.clock_in_location_status;
  end if;
  if old.clock_out_location_status is not null
     or (old.clock_out is not null and new.clock_out is not distinct from old.clock_out) then
    new.clock_out_lat := old.clock_out_lat;
    new.clock_out_lng := old.clock_out_lng;
    new.clock_out_accuracy_m := old.clock_out_accuracy_m;
    new.clock_out_location_status := old.clock_out_location_status;
  end if;
  return new;
end;
$$;

revoke all on function public.guard_timesheet_worker_update() from public, anon, authenticated;

drop trigger if exists guard_timesheet_worker_update on public.employer_timesheets;
create trigger guard_timesheet_worker_update
  before update on public.employer_timesheets
  for each row execute function public.guard_timesheet_worker_update();

-- ── Presence from the device fix when there is one ──────────────────────────
create or replace function public.trg_timesheet_presence()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.date is distinct from current_date then
    return new;
  end if;

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
        (employee_id, job_id, lat, lng, accuracy, status, checked_out_at, last_updated, source)
      values (new.employee_id, null, new.clock_out_lat, new.clock_out_lng, new.clock_out_accuracy_m,
              'Off Duty', now(), now(), 'clock');
    end if;
    return new;
  end if;

  -- ELE-2000: the phone's own fix wins over the job's pin.
  if new.clock_out is not null then
    insert into employer_worker_locations
      (employee_id, job_id, lat, lng, accuracy, status, checked_out_at, last_updated, source)
    select new.employee_id, new.job_id,
           coalesce(new.clock_out_lat, j.lat), coalesce(new.clock_out_lng, j.lng),
           case when new.clock_out_lat is not null then new.clock_out_accuracy_m end,
           'Off Duty', now(), now(), 'clock'
    from employer_jobs j
    where j.id = new.job_id;
  elsif new.clock_in is not null then
    insert into employer_worker_locations
      (employee_id, job_id, lat, lng, accuracy, status, checked_in_at, last_updated, source)
    select new.employee_id, new.job_id,
           coalesce(new.clock_in_lat, j.lat), coalesce(new.clock_in_lng, j.lng),
           case when new.clock_in_lat is not null then new.clock_in_accuracy_m end,
           'On Site', now(), now(), 'clock'
    from employer_jobs j
    where j.id = new.job_id;
  end if;

  return new;
end;
$function$;

-- ── Office bell: say "resubmitted" when a rejected day comes back ───────────
create or replace function public.trg_notify_timesheet_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_employer uuid;
  v_worker uuid;
  v_name text;
  v_is_submit boolean;
  v_resubmit boolean;
begin
  v_is_submit := lower(coalesce(new.status, '')) in ('pending', 'submitted')
                 and new.total_hours is not null
                 and (tg_op = 'INSERT'
                      or new.status is distinct from old.status
                      or (old.total_hours is null and new.total_hours is not null));
  if not v_is_submit then
    return new;
  end if;
  v_resubmit := tg_op = 'UPDATE' and lower(coalesce(old.status, '')) = 'rejected';

  select e.employer_id, e.user_id, e.name into v_employer, v_worker, v_name
  from employer_employees e where e.id = new.employee_id;

  if v_worker is not null and v_worker = auth.uid() and v_worker is distinct from v_employer then
    perform notify_employer_bell(
      v_employer, 'timesheet_submitted',
      case when v_resubmit then 'Timesheet resubmitted' else 'Timesheet submitted' end,
      coalesce(v_name, 'A team member') || case when v_resubmit then ' fixed and resubmitted ' else ' submitted ' end ||
        coalesce(new.total_hours::text, '?') || ' hours for ' || to_char(new.date, 'DD Mon'),
      jsonb_build_object('timesheet_id', new.id, 'route', '/employer?section=timesheets&tab=pending')
    );
  end if;
  return new;
exception when others then
  raise warning '[trg_notify_timesheet_submission] %', sqlerrm;
  return new;
end;
$function$;

-- ── Fix a day (pending edit or rejected → resubmit) ─────────────────────────
create or replace function public.fix_my_timesheet(
  p_id uuid,
  p_job_id uuid,
  p_clock_in timestamptz,
  p_clock_out timestamptz,
  p_break_minutes integer,
  p_notes text default null
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_row record;
  v_span numeric;
  v_hours numeric;
  v_date date;
  v_resubmit boolean;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;

  select t.* into v_row
    from public.employer_timesheets t
   where t.id = p_id
     and t.employee_id in (select public.my_employee_ids())
   for update;
  if v_row.id is null then
    raise exception 'That timesheet is not yours to change' using errcode = '42501';
  end if;
  if v_row.status not in ('Pending', 'Rejected') then
    raise exception 'Only a pending or rejected day can be changed' using errcode = '22023';
  end if;
  if v_row.clock_out is null then
    raise exception 'Clock out first, then fix the day' using errcode = '22023';
  end if;

  if p_clock_in is null or p_clock_out is null or p_clock_out <= p_clock_in then
    raise exception 'The finish time must be after the start time' using errcode = '22023';
  end if;
  v_span := extract(epoch from (p_clock_out - p_clock_in)) / 60.0;
  if v_span > 24 * 60 then
    raise exception 'A day can''t be longer than 24 hours' using errcode = '22023';
  end if;
  if coalesce(p_break_minutes, 0) < 0 or coalesce(p_break_minutes, 0) >= v_span then
    raise exception 'The break must be shorter than the time worked' using errcode = '22023';
  end if;
  v_date := (p_clock_in at time zone 'Europe/London')::date;
  if v_date > (now() at time zone 'Europe/London')::date then
    raise exception 'You can''t log a day in the future' using errcode = '22023';
  end if;
  if p_job_id is not null and p_job_id is distinct from v_row.job_id
     and not public.is_assigned_to_job(p_job_id) then
    raise exception 'You are not on that job' using errcode = '42501';
  end if;
  if length(coalesce(p_notes, '')) > 2000 then
    raise exception 'Keep the note under 2,000 characters' using errcode = '22023';
  end if;

  v_hours := round(((v_span - coalesce(p_break_minutes, 0)) / 60.0)::numeric, 2);
  v_resubmit := v_row.status = 'Rejected';

  perform set_config('elecmate.timesheet_fix', 'on', true);
  update public.employer_timesheets
     set job_id = coalesce(p_job_id, job_id),
         date = v_date,
         clock_in = p_clock_in,
         clock_out = p_clock_out,
         break_minutes = coalesce(p_break_minutes, 0),
         total_hours = v_hours,
         notes = nullif(trim(coalesce(p_notes, '')), ''),
         status = 'Pending',
         previous_rejection_reason = case when v_resubmit then rejection_reason else previous_rejection_reason end,
         rejection_reason = case when v_resubmit then null else rejection_reason end,
         resubmitted_at = case when v_resubmit then now() else resubmitted_at end,
         approved_by = null,
         approved_by_id = null,
         approved_at = null,
         updated_at = now()
   where id = p_id;
  perform set_config('elecmate.timesheet_fix', 'off', true);

  return jsonb_build_object('id', p_id, 'total_hours', v_hours, 'resubmitted', v_resubmit);
end;
$$;

revoke all on function public.fix_my_timesheet(uuid, uuid, timestamptz, timestamptz, integer, text) from public, anon;
grant execute on function public.fix_my_timesheet(uuid, uuid, timestamptz, timestamptz, integer, text) to authenticated;

-- ── Worker deletes their own pending entry ──────────────────────────────────
drop policy if exists "Worker deletes own pending timesheets" on public.employer_timesheets;
create policy "Worker deletes own pending timesheets"
  on public.employer_timesheets
  for delete to authenticated
  using (employee_id in (select public.my_employee_ids()) and status = 'Pending');

-- ── One break default per firm ──────────────────────────────────────────────
alter table public.company_profiles
  add column if not exists default_break_minutes integer not null default 30;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'company_profiles_default_break_minutes_check') then
    alter table public.company_profiles add constraint company_profiles_default_break_minutes_check
      check (default_break_minutes between 0 and 240);
  end if;
end $$;

comment on column public.company_profiles.default_break_minutes is
  'Firm-wide unpaid break pre-filled on worker clock-out and manual entries (ELE-2000). Default 30.';

create or replace function public.get_my_time_settings()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'default_break_minutes', coalesce((
      select cp.default_break_minutes
        from public.employer_employees e
        join public.company_profiles cp on cp.user_id = e.employer_id
       where e.user_id = auth.uid()
         and e.employer_id is not null
         and lower(coalesce(e.status, '')) = 'active'
       order by e.created_at desc
       limit 1), 30)
  );
$$;

revoke all on function public.get_my_time_settings() from public, anon;
grant execute on function public.get_my_time_settings() to authenticated;
