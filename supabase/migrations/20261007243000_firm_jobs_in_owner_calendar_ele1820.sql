-- ELE-1820 (Andrew approved 7 Oct): firm jobs appear on the owner's own
-- Elec-Mate calendar, so their Google/Outlook sync carries them.
--
-- One all-day row per booked job (Confirmed, Scheduled, In Progress, Testing,
-- Complete) with a date, on the firm owner's calendar (employer_jobs.user_id).
-- Kept current by triggers on the job and its crew. When a job loses its date,
-- is cancelled, archived, put on hold or deleted, the copy is removed: a row
-- already pushed to Google/Outlook is marked pending_delete so the sync removes
-- it there too; a local-only row is deleted.
--
-- The copy never reminds anyone (reminder_minutes 0) and never messages the
-- customer (customer_reminder_opt_in stays false). Only rows this mirror made
-- (mirrored_from_job) are ever touched — the owner's own events linked to a
-- job are left alone. Edits made to a copy in Google are overwritten on the
-- next change to the job: the job is the source of truth.

alter table public.calendar_events
  add column if not exists mirrored_from_job uuid;

comment on column public.calendar_events.mirrored_from_job is
  'Set only on rows the firm-job mirror made (ELE-1820). The mirror owns these rows; never set by hand.';

create unique index if not exists calendar_events_firm_job_mirror_uq
  on public.calendar_events (user_id, mirrored_from_job)
  where mirrored_from_job is not null;

create or replace function public.sync_firm_job_calendar(p_job uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  j public.employer_jobs;
  e public.calendar_events;
  v_should boolean;
  v_stage text;
  v_crew text;
  v_title text;
  v_desc text;
  v_start timestamptz;
  v_end timestamptz;
  v_syncs boolean;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id is null then return; end if;

  select * into e from public.calendar_events
   where user_id = j.user_id and mirrored_from_job = j.id;

  v_stage := coalesce(j.board_stage, '');
  v_should := j.start_date is not null
    and j.archived_at is null
    and coalesce(j.is_template, false) = false
    and lower(coalesce(j.status, '')) not in ('cancelled')
    and v_stage in ('Confirmed', 'Scheduled', 'In Progress', 'Testing', 'Complete');

  if not v_should then
    if e.id is not null then
      if e.google_event_id is not null or e.outlook_event_id is not null then
        update public.calendar_events set sync_status = 'pending_delete' where id = e.id
         and sync_status <> 'pending_delete';
      else
        delete from public.calendar_events where id = e.id;
      end if;
    end if;
    return;
  end if;

  select string_agg(distinct split_part(btrim(regexp_replace(coalesce(p.name, ''), '\(.*?\)', '', 'g')), ' ', 1), ', ')
    into v_crew
    from public.employer_job_assignments a
    join public.employer_employees p on p.id = a.employee_id
   where a.job_id = j.id
     and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended');

  v_title := j.title;
  v_desc := concat_ws(E'\n',
    nullif('Client: ' || nullif(btrim(coalesce(j.client, '')), ''), 'Client: '),
    case when v_crew is not null and v_crew <> '' then 'Crew: ' || v_crew else 'Crew: nobody booked yet' end,
    'Stage: ' || case v_stage when 'In Progress' then 'In progress' else v_stage end,
    'From your Employer Hub diary. Change the job there; edits made here are replaced.');
  v_start := (j.start_date::timestamp) at time zone 'Europe/London';
  v_end := ((coalesce(j.end_date, j.start_date)::timestamp) + interval '23 hours 59 minutes 59 seconds')
             at time zone 'Europe/London';

  select exists (select 1 from public.google_calendar_tokens g where g.user_id = j.user_id and g.sync_enabled)
      or exists (select 1 from public.outlook_calendar_tokens o where o.user_id = j.user_id and o.sync_enabled)
    into v_syncs;

  if e.id is null then
    insert into public.calendar_events (
      user_id, title, description, start_at, end_at, all_day, location, job_id,
      event_type, colour, crew, reminder_minutes, customer_reminder_opt_in,
      sync_status, mirrored_from_job, client_id)
    values (
      j.user_id, v_title, v_desc, v_start, v_end, true, nullif(btrim(coalesce(j.location, '')), ''), j.id,
      'job', '#F59E0B', v_crew, 0, false,
      case when v_syncs then 'pending_push' else 'local_only' end, j.id, j.customer_id)
    on conflict do nothing;
  elsif e.title is distinct from v_title
     or e.description is distinct from v_desc
     or e.start_at is distinct from v_start
     or e.end_at is distinct from v_end
     or e.location is distinct from nullif(btrim(coalesce(j.location, '')), '')
     or e.crew is distinct from v_crew
     or e.sync_status = 'pending_delete' then
    update public.calendar_events
       set title = v_title, description = v_desc, start_at = v_start, end_at = v_end,
           location = nullif(btrim(coalesce(j.location, '')), ''), crew = v_crew,
           all_day = true, reminder_minutes = 0, customer_reminder_opt_in = false,
           sync_status = case
             when v_syncs or e.google_event_id is not null or e.outlook_event_id is not null
               then 'pending_push' else 'local_only' end
     where id = e.id;
  end if;
exception when others then
  -- A calendar copy must never stop a job from saving.
  raise warning '[sync_firm_job_calendar] %: %', p_job, sqlerrm;
end;
$$;
revoke all on function public.sync_firm_job_calendar(uuid) from public, anon, authenticated;

create or replace function public.trg_firm_job_calendar()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_table_name = 'employer_jobs' then
    if tg_op = 'DELETE' then
      update public.calendar_events
         set sync_status = 'pending_delete'
       where mirrored_from_job = old.id
         and (google_event_id is not null or outlook_event_id is not null);
      delete from public.calendar_events
       where mirrored_from_job = old.id
         and google_event_id is null and outlook_event_id is null;
      return old;
    end if;
    perform public.sync_firm_job_calendar(new.id);
    return new;
  else
    perform public.sync_firm_job_calendar(coalesce(new.job_id, old.job_id));
    if tg_op = 'UPDATE' and new.job_id is distinct from old.job_id then
      perform public.sync_firm_job_calendar(old.job_id);
    end if;
    return coalesce(new, old);
  end if;
exception when others then
  raise warning '[trg_firm_job_calendar] %', sqlerrm;
  return coalesce(new, old);
end;
$$;
revoke all on function public.trg_firm_job_calendar() from public, anon, authenticated;

drop trigger if exists firm_job_calendar on public.employer_jobs;
create trigger firm_job_calendar
  after insert or update of title, client, location, start_date, end_date, status, board_stage, archived_at, is_template
  on public.employer_jobs
  for each row execute function public.trg_firm_job_calendar();

drop trigger if exists firm_job_calendar_delete on public.employer_jobs;
create trigger firm_job_calendar_delete
  before delete on public.employer_jobs
  for each row execute function public.trg_firm_job_calendar();

drop trigger if exists firm_job_calendar_crew on public.employer_job_assignments;
create trigger firm_job_calendar_crew
  after insert or update of employee_id, status, job_id or delete
  on public.employer_job_assignments
  for each row execute function public.trg_firm_job_calendar();

-- Backfill the jobs that are already booked.
do $$
declare r record;
begin
  for r in select id from public.employer_jobs
            where start_date is not null and archived_at is null
              and board_stage in ('Confirmed', 'Scheduled', 'In Progress', 'Testing', 'Complete')
  loop
    perform public.sync_firm_job_calendar(r.id);
  end loop;
end $$;
