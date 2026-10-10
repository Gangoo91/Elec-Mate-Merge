-- ELE-2079 review fix 4 — the diary's calendar copy of an online booking
-- carries the booking's real window.
--
-- sync_firm_job_calendar (ELE-1820) makes one all-day row per booked firm job.
-- A confirmed online booking for a morning or afternoon on the job's single
-- day now gets that window instead (morning 08:00 to 12:30, afternoon 12:30 to
-- 17:00, Europe/London) and all_day = false, so the confirmation email, the
-- calendar file and the evening-before reminder say when, not "all day".
--
-- Every other job is unchanged: same start/end, all_day stays true, and the
-- change check only adds "all_day differs", which is false for every
-- existing row (all are all_day = true and stay so). Same signature; the
-- body is the live one with the window added.

create or replace function public.sync_firm_job_calendar(p_job uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  j public.employer_jobs; e public.calendar_events; v_should boolean; v_stage text; v_crew text;
  v_title text; v_desc text; v_start timestamptz; v_end timestamptz; v_syncs boolean;
  v_all_day boolean := true; ob record;
begin
  select * into j from public.employer_jobs where id = p_job;
  if j.id is null or j.user_id is null then return; end if;
  select * into e from public.calendar_events where user_id = j.user_id and mirrored_from_job = j.id;
  v_stage := coalesce(j.board_stage, '');
  v_should := j.start_date is not null and j.archived_at is null and coalesce(j.is_template, false) = false
    and lower(coalesce(j.status, '')) not in ('cancelled')
    and v_stage in ('Confirmed', 'Scheduled', 'In Progress', 'Testing', 'Complete');
  if not v_should then
    if e.id is not null then
      if e.google_event_id is not null or e.outlook_event_id is not null then
        update public.calendar_events set sync_status = 'pending_delete' where id = e.id and sync_status <> 'pending_delete';
      else
        delete from public.calendar_events where id = e.id;
      end if;
    end if;
    return;
  end if;
  select string_agg(distinct split_part(btrim(regexp_replace(coalesce(p.name, ''), '\(.*?\)', '', 'g')), ' ', 1), ', ') into v_crew
    from public.employer_job_assignments a join public.employer_employees p on p.id = a.employee_id
   where a.job_id = j.id and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended');
  v_title := j.title;
  v_desc := concat_ws(E'\n',
    nullif('Client: ' || nullif(btrim(coalesce(j.client, '')), ''), 'Client: '),
    case when v_crew is not null and v_crew <> '' then 'Crew: ' || v_crew else 'Crew: nobody booked yet' end,
    'Stage: ' || case v_stage when 'In Progress' then 'In progress' else v_stage end,
    'From your Employer Hub diary. Change the job there; edits made here are replaced.');
  v_start := (j.start_date::timestamp) at time zone 'Europe/London';
  v_end := ((coalesce(j.end_date, j.start_date)::timestamp) + interval '23 hours 59 minutes 59 seconds') at time zone 'Europe/London';

  -- ELE-2079: a confirmed online booking for half a day, on the job's one day.
  select b.half into ob from public.employer_online_bookings b
   where b.job_id = j.id and b.firm_id = j.user_id and b.status = 'confirmed' and b.half in ('am', 'pm')
     and b.day = j.start_date and coalesce(j.end_date, j.start_date) = j.start_date
   order by b.decided_at desc nulls last limit 1;
  if ob.half is not null then
    v_all_day := false;
    v_start := (j.start_date + public._booking_half_start(ob.half)) at time zone 'Europe/London';
    v_end := (j.start_date + public._booking_half_end(ob.half)) at time zone 'Europe/London';
  end if;

  select exists (select 1 from public.google_calendar_tokens g where g.user_id = j.user_id and g.sync_enabled)
      or exists (select 1 from public.outlook_calendar_tokens o where o.user_id = j.user_id and o.sync_enabled) into v_syncs;
  if e.id is null then
    insert into public.calendar_events (user_id, title, description, start_at, end_at, all_day, location, job_id,
      event_type, colour, crew, reminder_minutes, customer_reminder_opt_in, sync_status, mirrored_from_job, client_id)
    values (j.user_id, v_title, v_desc, v_start, v_end, v_all_day, nullif(btrim(coalesce(j.location, '')), ''), j.id,
      'job', '#F59E0B', v_crew, 0, false, case when v_syncs then 'pending_push' else 'local_only' end, j.id, j.customer_id)
    on conflict do nothing;
  elsif e.title is distinct from v_title or e.description is distinct from v_desc or e.start_at is distinct from v_start
     or e.end_at is distinct from v_end or e.location is distinct from nullif(btrim(coalesce(j.location, '')), '')
     or e.crew is distinct from v_crew or e.sync_status = 'pending_delete' or e.all_day is distinct from v_all_day then
    update public.calendar_events
       set title = v_title, description = v_desc, start_at = v_start, end_at = v_end,
           location = nullif(btrim(coalesce(j.location, '')), ''), crew = v_crew,
           all_day = v_all_day, reminder_minutes = 0,
           customer_reminder_sent_at = case when e.start_at is distinct from v_start then null else e.customer_reminder_sent_at end,
           confirmation_sent_at = case when e.start_at is distinct from v_start then null else e.confirmation_sent_at end,
           confirmation_sent_to = case when e.start_at is distinct from v_start then null else e.confirmation_sent_to end,
           customer_reminder_opt_in = case when e.start_at is distinct from v_start then false else e.customer_reminder_opt_in end,
           sync_status = case when v_syncs or e.google_event_id is not null or e.outlook_event_id is not null then 'pending_push' else 'local_only' end
     where id = e.id;
  end if;
exception when others then
  raise warning '[sync_firm_job_calendar] %: %', p_job, sqlerrm;
end; $function$;
