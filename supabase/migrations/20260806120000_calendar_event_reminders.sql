-- Calendar event reminders — make `reminder_minutes` mean something.
--
-- The create-event sheet has always asked "remind me 5 / 15 / 30 min / 1 hr /
-- 1 day before" and stored the answer on the row. Nothing has ever read it:
-- no cron job, no edge function, and `sync-google-calendar` does not map it
-- either. Every reminder an electrician has set since the calendar shipped has
-- been silently discarded.
--
-- This is deliberately plain SQL on pg_cron rather than another edge function.
-- `notify_user()` (the ELE-226 spine) already writes the bell, applies the type
-- registry and the user's per-category preference, skips users with no device,
-- dedups per day and logs the send — so the dispatcher only has to decide WHEN,
-- and hand over. It also means no pg_net call from cron without auth, which has
-- silently 401'd three times before.

-- ─────────────────────────────────────────────────────────────────────────
-- 1. Remember what has already been sent
-- ─────────────────────────────────────────────────────────────────────────
alter table public.calendar_events
  add column if not exists reminder_sent_at timestamptz;

comment on column public.calendar_events.reminder_sent_at is
  'When the reminder for this event was dispatched. Null = still due. Reset automatically when the start time or the lead time changes.';

-- The dispatcher scans on exactly this shape every five minutes.
create index if not exists calendar_events_reminder_due_idx
  on public.calendar_events (start_at)
  where reminder_minutes > 0 and reminder_sent_at is null;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. Moving an event re-arms its reminder
-- ─────────────────────────────────────────────────────────────────────────
-- Without this, dragging a job from Tuesday to Thursday would keep the "sent"
-- flag from Tuesday and the Thursday reminder would never fire. Enforced in the
-- database so no client can forget it.
create or replace function public.calendar_event_rearm_reminder()
returns trigger
language plpgsql
as $$
begin
  if new.start_at is distinct from old.start_at
     or new.reminder_minutes is distinct from old.reminder_minutes then
    new.reminder_sent_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists calendar_events_rearm_reminder on public.calendar_events;
create trigger calendar_events_rearm_reminder
  before update on public.calendar_events
  for each row
  execute function public.calendar_event_rearm_reminder();

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Register the type
-- ─────────────────────────────────────────────────────────────────────────
-- category `tasks_projects` so the existing preference toggle covers it — a
-- user who has turned that category off does not get diary pings either.
-- importance 2 makes notify_user() pass skipQuietHours: an alarm the user set
-- themselves for a 06:30 start must not be swallowed by the 21:00–07:00 window
-- the way a marketing nudge rightly would be.
insert into public.notification_types (type, category, push, importance)
values ('event_reminder', 'tasks_projects', true, 2)
on conflict (type) do update
  set category = excluded.category,
      push = excluded.push,
      importance = excluded.importance,
      updated_at = now();

-- ─────────────────────────────────────────────────────────────────────────
-- 4. The dispatcher
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.dispatch_calendar_reminders()
returns integer
language plpgsql
security definer
set search_path to 'public', 'extensions'
as $$
declare
  r record;
  v_due timestamptz;
  v_mins_away integer;
  v_title text;
  v_message text;
  v_when text;
  n integer := 0;
begin
  for r in
    select
      e.id, e.user_id, e.title, e.start_at, e.all_day,
      e.location, e.reminder_minutes,
      c.name as customer_name,
      -- An all-day event starts at 00:00, so a 30-minute reminder would land at
      -- half past midnight. Treat 08:00 as the moment an all-day thing actually
      -- begins, which is what "remind me an hour before" means for one.
      --
      -- Truncated in Europe/London, not UTC. An all-day event created in BST is
      -- stored as 23:00 the previous day; `date_trunc('day', ...)` on the raw
      -- UTC value would pick that previous day and fire the reminder a day early
      -- for half the year.
      case when e.all_day
        then (date_trunc('day', e.start_at at time zone 'Europe/London') + interval '8 hours')
               at time zone 'Europe/London'
        else e.start_at
      end as effective_start
    from public.calendar_events e
    left join public.customers c on c.id = e.client_id
    where e.reminder_minutes > 0
      and e.reminder_sent_at is null
    order by e.start_at
    limit 500
  loop
    v_due := r.effective_start - make_interval(mins => r.reminder_minutes);

    -- Not yet due.
    if v_due > now() then
      continue;
    end if;

    -- Due, but long ago: the event has started, or cron was down and this is
    -- stale. Mark it done rather than firing "starts in 30 minutes" about
    -- something that began yesterday.
    if v_due < now() - interval '1 hour' or r.effective_start < now() - interval '5 minutes' then
      update public.calendar_events set reminder_sent_at = now() where id = r.id;
      continue;
    end if;

    v_mins_away := greatest(0, round(extract(epoch from (r.effective_start - now())) / 60))::integer;

    v_title := case
      when v_mins_away >= 1380 then r.title || ' — tomorrow'
      when v_mins_away >= 120  then r.title || ' — in ' || round(v_mins_away / 60.0) || ' hours'
      when v_mins_away >= 45   then r.title || ' — in 1 hour'
      when v_mins_away <= 1    then r.title || ' — starting now'
      else r.title || ' — in ' || v_mins_away || ' min'
    end;

    -- Rendered in Europe/London. `to_char` on a timestamptz formats in UTC,
    -- which through British Summer Time would tell someone their 08:00 start
    -- is at 07:00 — in the one message they are most likely to act on.
    v_when := case
      when r.all_day then 'All day'
      else to_char(r.start_at at time zone 'Europe/London', 'HH24:MI')
    end;

    v_message := v_when
      || coalesce(' · ' || public.notif_person(r.customer_name), '')
      || coalesce(' · ' || r.location, '');

    perform public.notify_user(
      r.user_id,
      'event_reminder',
      v_title,
      v_message,
      jsonb_build_object(
        'ref_id', r.id::text,
        'route', '/electrician/business/calendar',
        'push_type', 'job',
        'event_id', r.id
      )
    );

    update public.calendar_events set reminder_sent_at = now() where id = r.id;
    n := n + 1;
  end loop;

  return n;
end;
$$;

-- Callable by cron (which runs as the table owner), not by end users: it sends
-- notifications on behalf of any user_id it reads.
revoke all on function public.dispatch_calendar_reminders() from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- 5. Do not fire the backlog
-- ─────────────────────────────────────────────────────────────────────────
-- Every event that already exists has a reminder moment in the past. Without
-- this, the first run would decide hundreds of them are "due" at once. The
-- window guard above would catch them, but stamping them is unambiguous.
update public.calendar_events
set reminder_sent_at = now()
where reminder_minutes > 0
  and reminder_sent_at is null
  and (
    case when all_day
      then (date_trunc('day', start_at at time zone 'Europe/London') + interval '8 hours')
             at time zone 'Europe/London'
      else start_at
    end
    - make_interval(mins => reminder_minutes)
  ) <= now();

-- ─────────────────────────────────────────────────────────────────────────
-- 6. Schedule
-- ─────────────────────────────────────────────────────────────────────────
-- Five minutes is the resolution of the promise: a "5 min before" reminder can
-- land up to five minutes late, never early.
select cron.unschedule('calendar-event-reminders')
where exists (select 1 from cron.job where jobname = 'calendar-event-reminders');

select cron.schedule(
  'calendar-event-reminders',
  '*/5 * * * *',
  $$select public.dispatch_calendar_reminders()$$
);
