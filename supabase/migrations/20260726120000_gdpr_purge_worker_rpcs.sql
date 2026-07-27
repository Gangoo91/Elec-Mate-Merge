-- GDPR Art. 17 purge worker support.
-- Deletes every public-schema row that would block removing an auth user,
-- by walking blocking (NO ACTION / RESTRICT) foreign keys recursively.
-- Consumed by the purge-deleted-accounts edge function (daily cron).

create or replace function public._gdpr_delete_rows(
  p_table oid,
  p_predicate text,
  p_depth int
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  child record;
  attempts int := 0;
begin
  if p_depth > 5 then
    raise exception 'gdpr purge recursion too deep at %', p_table::regclass;
  end if;

  loop
    attempts := attempts + 1;
    begin
      execute format('delete from %s where %s', p_table::regclass, p_predicate);
      return;
    exception when foreign_key_violation then
      if attempts >= 3 then
        raise;
      end if;
      -- clear blocking children one level down, then retry
      for child in
        select
          con.conrelid as child_oid,
          (select a.attname from pg_attribute a
            where a.attrelid = con.conrelid and a.attnum = con.conkey[1]) as child_col,
          (select a.attname from pg_attribute a
            where a.attrelid = con.confrelid and a.attnum = con.confkey[1]) as parent_col
        from pg_constraint con
        where con.contype = 'f'
          and con.confrelid = p_table
          and con.confdeltype in ('a', 'r')
          and array_length(con.conkey, 1) = 1
      loop
        perform public._gdpr_delete_rows(
          child.child_oid,
          format('%I in (select %I from %s where %s)',
                 child.child_col, child.parent_col, p_table::regclass, p_predicate),
          p_depth + 1
        );
      end loop;
    end;
  end loop;
end;
$$;

create or replace function public.gdpr_purge_user_rows(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  fk record;
begin
  if not exists (
    select 1 from public.profiles
    where id = p_user_id
      and deletion_requested_at is not null
      and deletion_requested_at < now() - interval '30 days'
  ) then
    raise exception 'user % is not eligible for purge (no deletion request older than 30 days)', p_user_id;
  end if;

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
end;
$$;

create or replace function public.gdpr_list_user_storage(p_user_id uuid)
returns table (bucket_id text, object_name text)
language sql
security definer
set search_path = public
as $$
  select o.bucket_id, o.name
  from storage.objects o
  where o.owner = p_user_id
     or o.name like p_user_id::text || '/%';
$$;

revoke execute on function public._gdpr_delete_rows(oid, text, int) from public, anon, authenticated;
revoke execute on function public.gdpr_purge_user_rows(uuid) from public, anon, authenticated;
revoke execute on function public.gdpr_list_user_storage(uuid) from public, anon, authenticated;
