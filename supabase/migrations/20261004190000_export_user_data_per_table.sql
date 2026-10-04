-- ELE-1812 — data export, per table (4 Oct 2026).
--
-- export_user_data() returned everything in one jsonb. For the heaviest real
-- account that is 45 MB, which the edge function then had to parse, turn into
-- CSV and zip inside Supabase's 2 s CPU / 256 MB limits — it couldn't. The
-- function now asks which tables hold rows, then fetches them one at a time.
--
-- Also:
--  * credential filter widened to any column ending in "token" — the old list
--    missed profiles.ical_feed_token (a live calendar-feed credential).
--    Columns like tokens_used are kept.
--  * row cap raised 5,000 → 20,000 and reported, not silent: user_events and
--    report_audit_log both passed 5,000 for real accounts.
--  * list_expired_data_exports() lets the purge worker clear export ZIPs once
--    their 7-day link has expired.

create or replace function public._export_user_tables()
returns setof text
language sql
stable
security definer
set search_path = public
as $$
  select c.table_name::text
  from information_schema.columns c
  join information_schema.tables tb
    on tb.table_schema = c.table_schema and tb.table_name = c.table_name
  where c.table_schema = 'public'
    and c.column_name = 'user_id'
    and c.data_type = 'uuid'
    and tb.table_type = 'BASE TABLE'
  order by 1;
$$;

-- { table_name: row_count } for every table where the user has rows.
create or replace function public.export_user_data_counts(p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  t text;
  n bigint;
  result jsonb := '{}'::jsonb;
begin
  for t in select public._export_user_tables() loop
    execute format('select count(*) from public.%I where user_id = $1', t) into n using p_user;
    if n > 0 then
      result := result || jsonb_build_object(t, n);
    end if;
  end loop;
  return result;
end;
$$;

-- One table's rows, credentials stripped, newest first where possible,
-- capped at 20,000 (the caller compares with the count and says so).
create or replace function public.export_user_table(p_user uuid, p_table text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  rows jsonb;
  has_created boolean;
begin
  if p_table not in (select public._export_user_tables()) then
    raise exception 'not an exportable table: %', p_table;
  end if;
  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = p_table and column_name = 'created_at'
  ) into has_created;

  execute format(
    'select coalesce(jsonb_agg(
       (select coalesce(jsonb_object_agg(k, v), ''{}''::jsonb)
          from jsonb_each(to_jsonb(x)) e(k, v)
         where k !~* %L)
     ), ''[]''::jsonb)
     from (select * from public.%I where user_id = $1 %s limit 20000) x',
    '(encrypted|secret|password|api_key|(^|_)token$)',
    p_table,
    case when has_created then 'order by created_at desc' else '' end
  ) into rows using p_user;
  return rows;
end;
$$;

-- Stored files (photos, documents, signatures) — paths only; the edge
-- function turns them into time-limited links. Same ownership rule as
-- gdpr_list_user_storage. The user's own export ZIPs are left out.
create or replace function public.export_user_files(p_user uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
           'bucket', o.bucket_id, 'path', o.name, 'created_at', o.created_at,
           'size', o.metadata->>'size', 'type', o.metadata->>'mimetype')
           order by o.created_at desc), '[]'::jsonb)
    from storage.objects o
   where (o.owner = p_user or o.name like p_user::text || '/%')
     and o.bucket_id <> 'data-exports';
$$;

-- Export ZIPs whose 7-day link has run out (8 days, to be safe).
create or replace function public.list_expired_data_exports()
returns setof text
language sql
stable
security definer
set search_path = public
as $$
  select o.name from storage.objects o
  where o.bucket_id = 'data-exports' and o.created_at < now() - interval '8 days'
  limit 1000;
$$;

-- Same credential rule for the all-in-one function (kept for anything still
-- calling it).
create or replace function public.export_user_data(p_user uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  t text;
  result jsonb := '{}'::jsonb;
  counts jsonb := public.export_user_data_counts(p_user);
begin
  for t in select jsonb_object_keys(counts) loop
    result := result || jsonb_build_object(t, public.export_user_table(p_user, t));
  end loop;
  if jsonb_array_length(public.export_user_files(p_user)) > 0 then
    result := result || jsonb_build_object('_files', public.export_user_files(p_user));
  end if;
  return result;
end;
$$;

revoke all on function public._export_user_tables() from public, anon, authenticated;
revoke all on function public.export_user_data_counts(uuid) from public, anon, authenticated;
revoke all on function public.export_user_table(uuid, text) from public, anon, authenticated;
revoke all on function public.export_user_files(uuid) from public, anon, authenticated;
revoke all on function public.list_expired_data_exports() from public, anon, authenticated;
revoke all on function public.export_user_data(uuid) from public, anon, authenticated;
grant execute on function public._export_user_tables() to service_role;
grant execute on function public.export_user_data_counts(uuid) to service_role;
grant execute on function public.export_user_table(uuid, text) to service_role;
grant execute on function public.export_user_files(uuid) to service_role;
grant execute on function public.list_expired_data_exports() to service_role;
grant execute on function public.export_user_data(uuid) to service_role;
