-- Account purge: also erase rows in tables that store a user_id with NO
-- foreign key to auth.users / profiles.
--
-- Why: gdpr_purge_user_rows only walked foreign keys, and the final
-- auth.admin.deleteUser cascade only reaches tables linked by one. 69 of the
-- 314 public tables with a user_id column have no such link (conversations,
-- eic_schedules, safety_photos, ai_usage_log, …), so their rows outlived the
-- account — contradicting the privacy notice's "permanently erased within 30
-- days" (found 4 Oct 2026).
--
-- Same eligibility guard as before: only accounts whose deletion request is
-- older than 30 days.

create or replace function public.gdpr_purge_user_rows(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  fk record;
  t record;
begin
  if not exists (
    select 1 from public.profiles
    where id = p_user_id
      and deletion_requested_at is not null
      and deletion_requested_at < now() - interval '30 days'
  ) then
    raise exception 'user % is not eligible for purge (no deletion request older than 30 days)', p_user_id;
  end if;

  -- 1. Tables linked by a foreign key that would block the auth delete.
  for fk in
    select
      con.conrelid as tbl_oid,
      (select a.attname from pg_attribute a
        where a.attrelid = con.conrelid and a.attnum = con.conkey[1]) as col
    from pg_constraint con
    join pg_class c on c.oid = con.conrelid
    join pg_namespace n on n.oid = c.relnamespace
    where con.contype = 'f'
      and con.confrelid in ('auth.users'::regclass, 'public.profiles'::regclass)
      and con.confdeltype in ('a', 'r')
      and array_length(con.conkey, 1) = 1
      and n.nspname = 'public'
  loop
    perform public._gdpr_delete_rows(
      fk.tbl_oid,
      format('%I = %L', fk.col, p_user_id),
      1
    );
  end loop;

  -- 2. Every other public table holding the user's id in a uuid user_id
  --    column with no foreign key — nothing would cascade to these.
  for t in
    select c.table_name
    from information_schema.columns c
    join information_schema.tables tb
      on tb.table_schema = c.table_schema and tb.table_name = c.table_name
    where c.table_schema = 'public'
      and c.column_name = 'user_id'
      and c.data_type = 'uuid'
      and tb.table_type = 'BASE TABLE'
      -- includes the person's own security_audit_log rows: Andrew, 4 Oct —
      -- "account deletion should be everything". The purge job writes its
      -- own audit row afterwards with user_id NULL, so it isn't caught here.
  loop
    perform public._gdpr_delete_rows(
      format('public.%I', t.table_name)::regclass::oid,
      format('user_id = %L', p_user_id),
      1
    );
  end loop;
end;
$function$;
