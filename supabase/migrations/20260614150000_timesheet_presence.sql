-- Clock-in derived presence — make "on site" real without background GPS.
--
-- Audit (2026-06-14) found the live worker map (employer_worker_locations →
-- LiveWorkerMap) was effectively dead: 3 rows, nothing written since Jan, and
-- capture was manual-only ("tap Update Status"). The chosen model is to reuse
-- the action workers ALREADY take — the timesheet clock-in — as the presence
-- signal:
--
--   clock in on a job  → worker is "On Site" at that job
--   clock out          → worker is "Off Duty"
--
-- This ties the map + Worker 360 on-site badge into the same timesheet event
-- whose push we wired earlier today (everything-connected).
--
-- Coordinates come from the job (employer_jobs.lat/lng). Those are NULL for
-- every job today (no geocoding yet) so the MAP PIN stays absent until jobs are
-- geocoded — but the STATUS (On Site @ Job, since when) is populated now, which
-- is all the Worker 360 badge + the tracking list need.
--
-- Append-only (the table has no unique key on employee_id; getLatestWorkerLocations
-- dedupes to the newest row per worker), so this also leaves an audit trail.
--
-- Reversible:  drop trigger timesheet_presence on public.employer_timesheets;
--              drop function public.trg_timesheet_presence();

-- employer_worker_locations.lat/lng were NOT NULL, but a clock-in against an
-- un-geocoded job has no coordinates — and inserting null would otherwise abort
-- the worker's clock-in. Presence/status is valid without coords (the map skips
-- null-coord rows), so relax the constraint.
alter table public.employer_worker_locations alter column lat drop not null;
alter table public.employer_worker_locations alter column lng drop not null;

create or replace function public.trg_timesheet_presence()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  -- Presence is a "right now" signal — only a clock-in/out tied to a job, and
  -- only for TODAY's timesheet, so correcting a historic timesheet never moves
  -- the live map.
  if new.job_id is null or new.date is distinct from current_date then
    return new;
  end if;

  -- On UPDATE, only react when a clock value actually changed (not a notes edit).
  if tg_op = 'UPDATE'
     and new.clock_in is not distinct from old.clock_in
     and new.clock_out is not distinct from old.clock_out then
    return new;
  end if;

  if new.clock_out is not null then
    -- Clocked out → off duty (carry the job's coords if it has any).
    insert into employer_worker_locations
      (employee_id, job_id, lat, lng, status, checked_out_at, last_updated)
    select new.employee_id, new.job_id, j.lat, j.lng, 'Off Duty', now(), now()
    from employer_jobs j
    where j.id = new.job_id;
  elsif new.clock_in is not null then
    -- On the clock → On Site at the job.
    insert into employer_worker_locations
      (employee_id, job_id, lat, lng, status, checked_in_at, last_updated)
    select new.employee_id, new.job_id, j.lat, j.lng, 'On Site', now(), now()
    from employer_jobs j
    where j.id = new.job_id;
  end if;

  return new;
end;
$function$;

drop trigger if exists timesheet_presence on public.employer_timesheets;
create trigger timesheet_presence
after insert or update of clock_in, clock_out on public.employer_timesheets
for each row execute function public.trg_timesheet_presence();
