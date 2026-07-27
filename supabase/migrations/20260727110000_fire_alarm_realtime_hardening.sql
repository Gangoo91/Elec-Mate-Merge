-- Realtime on log entries — the electrician sees the responsible person's
-- entries appear live while the building page is open.
alter publication supabase_realtime add table public.fire_alarm_log_entries;

-- Harden the shared write: whitelist data keys per entry type so a link
-- holder can only store the fields the forms collect.
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
  allowed text[];
  clean jsonb := '{}'::jsonb;
  k text;
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

  allowed := case p_entry_type
    when 'weekly_test' then array['call_point','zone','location','result']
    when 'fault' then array['description','zone','cause']
    else array['zone','cause','category','action']
  end;
  for k in select jsonb_object_keys(p_data) loop
    if k = any(allowed) and jsonb_typeof(p_data->k) = 'string'
       and length(p_data->>k) <= 2000 then
      clean := clean || jsonb_build_object(k, p_data->>k);
    end if;
  end loop;

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
    (b.id, b.user_id, p_entry_type, p_entry_date, clean, trim(p_tester),
     case when p_entry_type = 'fault' then false else null end);
end;
$$;

-- Responsible person's email lives on the book — prefills the Annex H email.
alter table public.fire_alarm_log_books
  add column responsible_email text not null default '';
