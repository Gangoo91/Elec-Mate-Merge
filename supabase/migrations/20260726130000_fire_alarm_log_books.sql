-- ELE-1396 — Fire Alarm Log Book (BS 5839-1:2025 Clause 48.2 / Annex H)
-- One live log book per building; entries cover all Annex H record types.

create table public.fire_alarm_log_books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  building_name text not null,
  building_address text not null default '',
  system_category text not null default '',
  panel_make text not null default '',
  panel_model text not null default '',
  panel_location text not null default '',
  call_points jsonb not null default '[]',
  weekly_test_day text not null default 'monday',
  weekly_reminder_enabled boolean not null default true,
  service_interval_months int not null default 6,
  service_reminder_enabled boolean not null default true,
  last_service_date date,
  battery_interval_months int,
  last_battery_date date,
  battery_reminder_enabled boolean not null default false,
  responsible_person text not null default '',
  notes text not null default '',
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.fire_alarm_log_entries (
  id uuid primary key default gen_random_uuid(),
  log_book_id uuid not null references public.fire_alarm_log_books(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_type text not null check (entry_type in
    ('weekly_test','fault','false_alarm','service','battery','panel_event','variation')),
  entry_date date not null default current_date,
  data jsonb not null default '{}',
  tester_name text not null default '',
  resolved boolean,
  resolved_date date,
  created_at timestamptz not null default now()
);

create index idx_fa_log_books_user on public.fire_alarm_log_books (user_id) where archived_at is null;
create index idx_fa_log_entries_book on public.fire_alarm_log_entries (log_book_id, entry_date desc);
create index idx_fa_log_entries_open_faults on public.fire_alarm_log_entries (log_book_id)
  where entry_type = 'fault' and resolved is not true;

alter table public.fire_alarm_log_books enable row level security;
alter table public.fire_alarm_log_entries enable row level security;

create policy "fa_log_books_owner" on public.fire_alarm_log_books
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "fa_log_entries_owner" on public.fire_alarm_log_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.fa_log_books_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger fa_log_books_updated_at
  before update on public.fire_alarm_log_books
  for each row execute function public.fa_log_books_touch_updated_at();

-- Daily reminder sweep — same notify_user() pattern as notify_cert_reinspections.
create or replace function public.notify_fire_alarm_log_due()
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare r record;
begin
  -- Weekly call point test: fires on the configured weekday when no test has
  -- been logged in the last 6 days. Deduped by a notification in the last 6 days.
  for r in
    select b.id, b.user_id, b.building_name
    from public.fire_alarm_log_books b
    where b.archived_at is null
      and b.weekly_reminder_enabled
      and lower(b.weekly_test_day) = lower(trim(to_char(current_date, 'day')))
      and not exists (
        select 1 from public.fire_alarm_log_entries e
        where e.log_book_id = b.id and e.entry_type = 'weekly_test'
          and e.entry_date > current_date - 6)
      and not exists (
        select 1 from public.user_notifications n
        where n.user_id = b.user_id and n.type = 'fire_alarm_weekly_test'
          and n.metadata->>'log_book_id' = b.id::text
          and n.created_at > now() - interval '6 days')
  loop
    perform public.notify_user(
      r.user_id, 'fire_alarm_weekly_test',
      'Weekly fire alarm test due',
      r.building_name || ' — test the next call point in rotation and log it.',
      jsonb_build_object('route', '/electrician/inspection-testing/fire-alarm-log-books/' || r.id,
                         'log_book_id', r.id::text));
  end loop;

  -- Service visit due within 14 days (or overdue). Deduped 30 days.
  for r in
    select b.id, b.user_id, b.building_name,
      (b.last_service_date + (b.service_interval_months || ' months')::interval)::date as due
    from public.fire_alarm_log_books b
    where b.archived_at is null
      and b.service_reminder_enabled
      and b.last_service_date is not null
      and (b.last_service_date + (b.service_interval_months || ' months')::interval)::date
          <= current_date + 14
      and not exists (
        select 1 from public.user_notifications n
        where n.user_id = b.user_id and n.type = 'fire_alarm_service_due'
          and n.metadata->>'log_book_id' = b.id::text
          and n.created_at > now() - interval '30 days')
  loop
    perform public.notify_user(
      r.user_id, 'fire_alarm_service_due',
      'Fire alarm service due',
      r.building_name || ' — service visit due ' || to_char(r.due, 'DD Mon YYYY')
        || ' (BS 5839-1 recommends at least six-monthly).',
      jsonb_build_object('route', '/electrician/inspection-testing/fire-alarm-log-books/' || r.id,
                         'log_book_id', r.id::text));
  end loop;

  -- Battery check due. Deduped 30 days.
  for r in
    select b.id, b.user_id, b.building_name,
      (b.last_battery_date + (b.battery_interval_months || ' months')::interval)::date as due
    from public.fire_alarm_log_books b
    where b.archived_at is null
      and b.battery_reminder_enabled
      and b.battery_interval_months is not null
      and b.last_battery_date is not null
      and (b.last_battery_date + (b.battery_interval_months || ' months')::interval)::date
          <= current_date + 14
      and not exists (
        select 1 from public.user_notifications n
        where n.user_id = b.user_id and n.type = 'fire_alarm_battery_due'
          and n.metadata->>'log_book_id' = b.id::text
          and n.created_at > now() - interval '30 days')
  loop
    perform public.notify_user(
      r.user_id, 'fire_alarm_battery_due',
      'Fire alarm battery check due',
      r.building_name || ' — standby batteries due a check/replacement around '
        || to_char(r.due, 'DD Mon YYYY') || '.',
      jsonb_build_object('route', '/electrician/inspection-testing/fire-alarm-log-books/' || r.id,
                         'log_book_id', r.id::text));
  end loop;
end;
$$;

revoke execute on function public.notify_fire_alarm_log_due() from public, anon, authenticated;

select cron.schedule(
  'fire-alarm-log-reminders',
  '10 8 * * *',
  'select public.notify_fire_alarm_log_due()'
);
