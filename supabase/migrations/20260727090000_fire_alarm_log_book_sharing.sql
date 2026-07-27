-- ELE-1396: responsible-person access. The premises keeps its own log via a
-- share link; the electrician stays owner and supervisor.
-- (Applied 2026-07-27; full RPC bodies identical to live DB.)

alter table public.fire_alarm_log_books
  add column share_token uuid not null default gen_random_uuid(),
  add column share_enabled boolean not null default false;

create unique index idx_fa_log_books_share_token on public.fire_alarm_log_books (share_token);

-- Read: building basics + recent entries. Verification-grade only, no owner contact data.
create or replace function public.get_fire_log_shared(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  b record;
  result jsonb;
begin
  select id, building_name, building_address, system_category,
         panel_make, panel_location, call_points, weekly_test_day
    into b
    from public.fire_alarm_log_books
   where share_token = p_token and share_enabled and archived_at is null;

  if not found then
    return null;
  end if;

  select jsonb_build_object(
    'building_name', b.building_name,
    'building_address', b.building_address,
    'system_category', b.system_category,
    'panel_make', b.panel_make,
    'panel_location', b.panel_location,
    'call_points', b.call_points,
    'weekly_test_day', b.weekly_test_day,
    'entries', coalesce((
      select jsonb_agg(jsonb_build_object(
        'entry_type', e.entry_type,
        'entry_date', e.entry_date,
        'data', e.data - 'photo',
        'tester_name', e.tester_name,
        'resolved', e.resolved,
        'created_at', e.created_at
      ) order by e.entry_date desc, e.created_at desc)
      from (
        select * from public.fire_alarm_log_entries
        where log_book_id = b.id
        order by entry_date desc, created_at desc
        limit 60
      ) e
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

-- Write: weekly tests, faults and false alarms only. Rate-limited per book.
create or replace function public.add_fire_log_shared_entry(
  p_token uuid,
  p_entry_type text,
  p_entry_date date,
  p_data jsonb,
  p_tester text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  b record;
begin
  if p_entry_type not in ('weekly_test', 'fault', 'false_alarm') then
    raise exception 'entry type not permitted via share link';
  end if;
  if length(coalesce(p_tester, '')) < 2 or length(p_tester) > 120 then
    raise exception 'tester name required';
  end if;
  if pg_column_size(p_data) > 8192 then
    raise exception 'entry too large';
  end if;
  if p_entry_date > current_date or p_entry_date < current_date - 14 then
    raise exception 'entry date must be within the last 14 days';
  end if;

  select id, user_id into b
    from public.fire_alarm_log_books
   where share_token = p_token and share_enabled and archived_at is null;
  if not found then
    raise exception 'log book not found or sharing disabled';
  end if;

  if (select count(*) from public.fire_alarm_log_entries
       where log_book_id = b.id and created_at > now() - interval '1 day') >= 25 then
    raise exception 'daily entry limit reached for this log book';
  end if;

  insert into public.fire_alarm_log_entries
    (log_book_id, user_id, entry_type, entry_date, data, tester_name, resolved)
  values
    (b.id, b.user_id, p_entry_type, p_entry_date, p_data, trim(p_tester),
     case when p_entry_type = 'fault' then false else null end);
end;
$$;

grant execute on function public.get_fire_log_shared(uuid) to anon, authenticated;
grant execute on function public.add_fire_log_shared_entry(uuid, text, date, jsonb, text) to anon, authenticated;
