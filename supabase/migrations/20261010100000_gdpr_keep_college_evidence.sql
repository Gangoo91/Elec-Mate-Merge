-- GDPR deletion must not destroy a college's statutory evidence (10 Oct 2026).
--
-- gdpr_purge_user_rows deleted every public row with the learner's user_id,
-- and purge-deleted-accounts then deleted the auth user, cascading through
-- college_otj_entries, otj_hours_statements, epa_gateway_declarations,
-- portfolio_* (decisions, witness statements, signatures, submissions) and
-- more. The 2026/27 apprenticeship funding rules (paras 345-348) require the
-- provider to keep that evidence; the provider is the controller of it and the
-- legal obligation is the lawful basis (UK GDPR art 17(3)(b)).
--
-- Now, for a person with a college_students row: college_/portfolio_/epa_/otj_
-- and gateway/tripartite tables are kept, their profile's personal fields are
-- blanked, and the worker anonymises and bans the login instead of deleting
-- it. Everyone else is purged exactly as before. Nothing was pending purge on
-- 10 Oct, so no evidence had been lost.

create or replace function public.gdpr_user_has_college_record(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$ select exists (select 1 from public.college_students where user_id = p_user_id) $$;

revoke all on function public.gdpr_user_has_college_record(uuid) from public, anon, authenticated;

CREATE OR REPLACE FUNCTION public.gdpr_purge_user_rows(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  fk record;
  t record;
  v_keep boolean := public.gdpr_user_has_college_record(p_user_id);
  v_protected text := '^(college_|portfolio_|epa_|otj_)|gateway|tripartite';
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
    -- A learner on a college roll: the college's records are its statutory
    -- evidence (funding rules 2026/27 paras 345-348) and are kept.
    if v_keep and (select c.relname from pg_class c where c.oid = fk.tbl_oid) ~ v_protected then
      continue;
    end if;
    perform public._gdpr_delete_rows(
      fk.tbl_oid,
      format('%I = %L', fk.col, p_user_id),
      1
    );
  end loop;

  for t in
    select c.table_name
    from information_schema.columns c
    join information_schema.tables tb
      on tb.table_schema = c.table_schema and tb.table_name = c.table_name
    where c.table_schema = 'public'
      and c.column_name = 'user_id'
      and c.data_type = 'uuid'
      and tb.table_type = 'BASE TABLE'
  loop
    if v_keep and t.table_name ~ v_protected then
      continue;
    end if;
    perform public._gdpr_delete_rows(
      format('public.%I', t.table_name)::regclass::oid,
      format('user_id = %L', p_user_id),
      1
    );
  end loop;

  -- Their Elec-Mate account profile is still removed of personal detail; the
  -- login itself is anonymised and locked by purge-deleted-accounts, not
  -- deleted, so the college's records keep their link.
  if v_keep then
    update public.profiles set full_name = 'Deleted account' where id = p_user_id;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='profiles' and column_name='phone') then
      execute format('update public.profiles set phone = null where id = %L', p_user_id);
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='profiles' and column_name='avatar_url') then
      execute format('update public.profiles set avatar_url = null where id = %L', p_user_id);
    end if;
  end if;
end;
$function$;
grant execute on function public.gdpr_user_has_college_record(uuid) to service_role;
