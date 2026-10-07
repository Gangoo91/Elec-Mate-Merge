-- White-glove set-up (7 Oct 2026): a platform admin acts for a named college
-- in the College Hub, to add its cohorts, learners, staff and roles.
--
--   college_acting_sessions   one open session per admin: which college, until when
--   admin_start_acting        platform admin opens a session (8 hours), audited
--   admin_stop_acting         closes it, audited
--   get_my_acting_college     the client asks which college it is acting for
--   _ch_same_college          the hub's same-college RLS check now also passes
--                             for a platform admin with an open session for
--                             THAT college (checked with _is_platform_admin()).
--   tg_college_acting_audit   every insert / update / delete an acting admin
--                             makes on the set-up tables is written to
--                             college_activity (the college's own activity log,
--                             so the college sees what Elec-Mate did).

begin;
-- Creating triggers on busy college tables deadlocked once against live traffic.
set local lock_timeout = '8s';

create table if not exists public.college_acting_sessions (
  id          uuid primary key default gen_random_uuid(),
  admin_id    uuid not null references auth.users(id) on delete cascade,
  college_id  uuid not null references public.colleges(id) on delete cascade,
  reason      text,
  started_at  timestamptz not null default now(),
  expires_at  timestamptz not null,
  ended_at    timestamptz
);
create unique index if not exists uq_college_acting_open
  on public.college_acting_sessions (admin_id) where ended_at is null;
create index if not exists idx_college_acting_college on public.college_acting_sessions (college_id, started_at desc);
alter table public.college_acting_sessions enable row level security;
comment on table public.college_acting_sessions is
  '[COLLEGE] White-glove set-up: an Elec-Mate platform admin acting for a named college in the College Hub (cohorts, learners, staff, roles). Scope: one open session per admin, 8 hours. Used by: _ch_same_college (RLS), tg_college_acting_audit, CollegeGuard acting bar, Admin → Colleges → Hub colleges "Open as this college". Rule: opened and closed only through admin_start_acting / admin_stop_acting, which check _is_platform_admin(); every acting write is logged to college_activity; never anon.';

drop policy if exists "Admins read own acting sessions" on public.college_acting_sessions;
create policy "Admins read own acting sessions" on public.college_acting_sessions
  for select to authenticated using (admin_id = (select auth.uid()) and public._is_platform_admin());
revoke all on public.college_acting_sessions from anon;
revoke insert, update, delete, truncate on public.college_acting_sessions from authenticated;

-- Is the caller a platform admin acting for this college right now?
create or replace function public._acting_for_college(p_college uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_college is not null
     and exists (select 1 from public.college_acting_sessions a
                  where a.admin_id = auth.uid() and a.college_id = p_college
                    and a.ended_at is null and a.expires_at > now())
     and public._is_platform_admin();
$$;
revoke all on function public._acting_for_college(uuid) from public, anon;
grant execute on function public._acting_for_college(uuid) to authenticated;

-- Same-college check used by the hub's RLS. Unchanged for everyone else; a
-- platform admin with an open acting session for row_college also passes.
create or replace function public._ch_same_college(row_college uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $function$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.college_id = row_college
      and p.college_role is not null
  ) or public._acting_for_college(row_college);
$function$;

create or replace function public.admin_start_acting(p_college uuid, p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row college_acting_sessions;
  v_name text;
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate can act for a college' using errcode = '42501';
  end if;
  select name into v_name from colleges where id = p_college;
  if v_name is null then
    raise exception 'No such college';
  end if;
  update college_acting_sessions set ended_at = now()
   where admin_id = auth.uid() and ended_at is null;
  insert into college_acting_sessions (admin_id, college_id, reason, expires_at)
  values (auth.uid(), p_college, nullif(btrim(coalesce(p_reason, '')), ''), now() + interval '8 hours')
  returning * into v_row;
  insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), 'elec_mate_acting.start', 'college', p_college,
          jsonb_build_object('acting', true, 'session_id', v_row.id, 'reason', v_row.reason, 'expires_at', v_row.expires_at));
  return jsonb_build_object('college_id', p_college, 'college_name', v_name, 'expires_at', v_row.expires_at);
end;
$$;
revoke all on function public.admin_start_acting(uuid, text) from public, anon;
grant execute on function public.admin_start_acting(uuid, text) to authenticated;

create or replace function public.admin_stop_acting()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row college_acting_sessions;
begin
  if auth.uid() is null then
    return;
  end if;
  for v_row in
    update college_acting_sessions set ended_at = now()
     where admin_id = auth.uid() and ended_at is null
    returning *
  loop
    insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
    values (v_row.college_id, auth.uid(), 'elec_mate_acting.stop', 'college', v_row.college_id,
            jsonb_build_object('acting', true, 'session_id', v_row.id));
  end loop;
end;
$$;
revoke all on function public.admin_stop_acting() from public, anon;
grant execute on function public.admin_stop_acting() to authenticated;

create or replace function public.get_my_acting_college()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select case when public._is_platform_admin() then (
    select jsonb_build_object('college_id', a.college_id, 'college_name', c.name, 'college_code', c.code,
                              'expires_at', a.expires_at, 'started_at', a.started_at)
      from college_acting_sessions a join colleges c on c.id = a.college_id
     where a.admin_id = auth.uid() and a.ended_at is null and a.expires_at > now()
     limit 1) end;
$$;
revoke all on function public.get_my_acting_college() from public, anon;
grant execute on function public.get_my_acting_college() to authenticated;

-- ─── Audit every acting write on the set-up tables ───────────────────────

create or replace function public.tg_college_acting_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_new     jsonb := case when tg_op <> 'DELETE' then to_jsonb(new) end;
  v_old     jsonb := case when tg_op <> 'INSERT' then to_jsonb(old) end;
  v_college uuid := coalesce((v_new->>'college_id')::uuid, (v_old->>'college_id')::uuid);
begin
  if auth.uid() is null or v_college is null then
    return null;
  end if;
  if not exists (select 1 from college_acting_sessions a
                  where a.admin_id = auth.uid() and a.college_id = v_college
                    and a.ended_at is null and a.expires_at > now()) then
    return null;
  end if;
  insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (v_college, auth.uid(), 'elec_mate_acting.' || lower(tg_op), tg_table_name,
          coalesce((v_new->>'id')::uuid, (v_old->>'id')::uuid),
          jsonb_build_object('acting', true, 'before', v_old, 'after', v_new));
  return null;
end;
$$;
revoke all on function public.tg_college_acting_audit() from public, anon, authenticated;

do $$
declare t text;
begin
  foreach t in array array['college_cohorts', 'college_courses', 'college_students', 'college_staff',
                           'college_invites', 'college_access'] loop
    execute format('drop trigger if exists trg_college_acting_audit on public.%I', t);
    execute format('create trigger trg_college_acting_audit after insert or update or delete on public.%I
                    for each row execute function public.tg_college_acting_audit()', t);
  end loop;
end $$;

commit;
