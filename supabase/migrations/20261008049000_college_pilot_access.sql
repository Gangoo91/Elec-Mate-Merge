-- College pilot access model (7 Oct 2026, Andrew: "yes on all of them").
--
-- A college comes on board with a 6-week PILOT that Elec-Mate sets up for it,
-- then buys the College Hub as a B2B contract invoiced off Stripe. While the
-- college has access, everyone linked to it gets the app free:
--
--   learners  on its roll (college_students.user_id, status Active / On Break)
--             -> profiles.free_access_reason = 'college:<college_id>'
--   staff     on its staff list (college_staff, not archived)
--             -> profiles.free_access_reason = 'college_staff:<college_id>'
--
-- free_access_expires_at = the end of the 14-day grace after the pilot or
-- contract end, so the grant is dated even if nothing else runs.
--
-- Tables
--   college_access          one row per college: none / pilot / contracted / lapsed + dates
--   college_access_periods  every change Elec-Mate made to a college's access (history)
--   college_access_grants   who was covered by which college, from when to when
--                           (the monthly count of learners with access, for invoicing)
--
-- Rules that must hold
--   * Only rows whose reason starts 'college:' / 'college_staff:' are ever
--     cleared. Paid learners and every other free-access reason are left alone.
--   * A college with no row (or 'none') behaves exactly as before: nothing is
--     granted or removed for it. All existing colleges start as 'none'.
--   * Andrew's own accounts are never written by this code.
--   * Only a platform admin changes access, through admin_set_college_access.
--   * A learner still cannot set their own free_access fields:
--     _profiles_privileged_guard is unchanged and the writes below run as the
--     definer.

begin;

-- ─── Tables ──────────────────────────────────────────────────────────────

create table if not exists public.college_access (
  college_id       uuid primary key references public.colleges(id) on delete cascade,
  access_status    text not null default 'none'
                   check (access_status in ('none', 'pilot', 'contracted', 'lapsed')),
  pilot_started_at date,
  pilot_ends_at    date,
  contract_until   date,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_by       uuid references auth.users(id) on delete set null,
  updated_at       timestamptz not null default now(),
  constraint college_access_pilot_order check (
    pilot_started_at is null or pilot_ends_at is null or pilot_ends_at >= pilot_started_at),
  constraint college_access_pilot_dates check (
    access_status <> 'pilot' or (pilot_started_at is not null and pilot_ends_at is not null)),
  constraint college_access_contract_date check (
    access_status <> 'contracted' or contract_until is not null)
);
alter table public.college_access enable row level security;
comment on table public.college_access is
  '[COLLEGE ↔ BILLING] Whether a College Hub college currently has access, and why: none / pilot (6 weeks by default, editable) / contracted (until a date, invoiced by Elec-Mate off Stripe) / lapsed. Access holds while pilot or contracted and today (London) is on or before the end date + 14 days grace. Scope: one row per college; no row = none. Used by: _college_access_state, _college_access_sync_user (writes learners'' and staff''s profiles.free_access_*), Admin → Colleges → Hub colleges, College Hub pilot banner and ended page. Rule: written only by platform admins through admin_set_college_access (and create_college, which starts a pilot for a set-up-code college); RLS lets platform admins read; never anon.';

create table if not exists public.college_access_periods (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references public.colleges(id) on delete cascade,
  action       text not null check (action in ('start_pilot', 'auto_pilot', 'extend_pilot', 'contract', 'lapse', 'set_none', 'notes')),
  access_status text not null check (access_status in ('none', 'pilot', 'contracted', 'lapsed')),
  starts_on    date,
  ends_on      date,
  notes        text,
  created_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_college_access_periods_college on public.college_access_periods (college_id, created_at desc);
alter table public.college_access_periods enable row level security;
comment on table public.college_access_periods is
  '[COLLEGE ↔ BILLING] History of every change Elec-Mate made to a college''s access: pilot started (by hand or automatically from a set-up code), extended, contracted until a date, lapsed, reset. Scope: per college, append-only. Used by: Admin → Colleges → Hub colleges (history), invoicing. Rule: written only inside admin_set_college_access / create_college; platform admins read; never edited.';

create table if not exists public.college_access_grants (
  id              uuid primary key default gen_random_uuid(),
  college_id      uuid not null references public.colleges(id) on delete cascade,
  user_id         uuid not null references auth.users(id) on delete cascade,
  kind            text not null check (kind in ('learner', 'staff')),
  started_at      timestamptz not null default now(),
  ended_at        timestamptz,
  replaced_reason text
);
create unique index if not exists uq_college_access_grants_open
  on public.college_access_grants (college_id, user_id, kind) where ended_at is null;
create index if not exists idx_college_access_grants_user on public.college_access_grants (user_id) where ended_at is null;
create index if not exists idx_college_access_grants_span on public.college_access_grants (college_id, started_at, ended_at);
alter table public.college_access_grants enable row level security;
comment on table public.college_access_grants is
  '[COLLEGE ↔ BILLING] Ledger of who was covered by a college''s access and when: a row opens when a linked learner (roll status Active / On Break) or staff member is covered, and closes when they are not (unlinked, withdrawn, archived, or the college''s access ended). Records coverage even where the person already pays or has another free grant. Scope: per college per person. Used by: the monthly "learners with access" count for invoicing (admin_college_pilot_console). Rule: written only by _college_access_sync_user; platform admins read; replaced_reason keeps an EXPIRED non-college free-access reason that a college grant overwrote.';

drop policy if exists "Platform admins read college access" on public.college_access;
create policy "Platform admins read college access" on public.college_access
  for select to authenticated using (public._is_platform_admin());
drop policy if exists "Platform admins read access periods" on public.college_access_periods;
create policy "Platform admins read access periods" on public.college_access_periods
  for select to authenticated using (public._is_platform_admin());
drop policy if exists "Platform admins read access grants" on public.college_access_grants;
create policy "Platform admins read access grants" on public.college_access_grants
  for select to authenticated using (public._is_platform_admin());

revoke all on public.college_access, public.college_access_periods, public.college_access_grants from anon;
revoke insert, update, delete, truncate on public.college_access, public.college_access_periods, public.college_access_grants from authenticated;

-- ─── The state of one college's access ───────────────────────────────────
-- phase: none | upcoming | active | ending_soon (last 14 days) | grace | ended

create or replace function public._college_access_state(p_college uuid)
returns table (
  access_status text,
  starts_on     date,
  ends_on       date,
  grace_until   date,
  expires_at    timestamptz,
  has_access    boolean,
  phase         text,
  days_left     integer
)
language sql
stable
security definer
set search_path = public
as $$
  with a as (
    select coalesce(ca.access_status, 'none') as st,
           ca.pilot_started_at as ps,
           case coalesce(ca.access_status, 'none')
             when 'pilot' then ca.pilot_ends_at
             when 'contracted' then ca.contract_until
           end as e,
           (now() at time zone 'Europe/London')::date as today
      from (select p_college as id) x
      left join college_access ca on ca.college_id = x.id
  )
  select st,
         case when st = 'pilot' then ps end,
         e,
         e + 14,
         case when e is not null then ((e + 15)::timestamp at time zone 'Europe/London') end,
         st in ('pilot', 'contracted') and e is not null and today <= e + 14
           and (st <> 'pilot' or ps is null or today >= ps),
         case
           when st = 'none' then 'none'
           when st = 'lapsed' or e is null then 'ended'
           when st = 'pilot' and ps is not null and today < ps then 'upcoming'
           when e - today > 14 then 'active'
           when today <= e then 'ending_soon'
           when today <= e + 14 then 'grace'
           else 'ended'
         end,
         case when e is not null then e - today end
    from a;
$$;
revoke all on function public._college_access_state(uuid) from public, anon, authenticated;

-- ─── Who a user should be covered by ─────────────────────────────────────

create or replace function public._college_access_eligible(p_user uuid)
returns table (college_id uuid, kind text, expires_at timestamptz, pri integer)
language sql
stable
security definer
set search_path = public
as $$
  select st.college_id, 'staff'::text, w.expires_at, 0
    from college_staff st
    cross join lateral public._college_access_state(st.college_id) w
   where st.user_id = p_user
     and st.archived_at is null
     and coalesce(st.status, 'Active') <> 'Archived'
     and w.has_access
  union
  select s.college_id, 'learner'::text, w.expires_at, 1
    from college_students s
    cross join lateral public._college_access_state(s.college_id) w
   where s.user_id = p_user
     and s.status in ('Active', 'On Break')
     and w.has_access;
$$;
revoke all on function public._college_access_eligible(uuid) from public, anon, authenticated;

-- Is this free-access reason one the college model owns (and may clear)?
create or replace function public._college_access_reason_managed(p_reason text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(p_reason, '') like 'college:%'
      or coalesce(p_reason, '') like 'college_staff:%'
      -- The old lifetime staff grant ('College staff — <code>'). It becomes
      -- owned by the model only once Elec-Mate has set that college's access.
      or (coalesce(p_reason, '') like 'College staff — %'
          and exists (select 1 from colleges c join college_access ca on ca.college_id = c.id
                       where p_reason = 'College staff — ' || c.code and ca.access_status <> 'none'));
$$;
revoke all on function public._college_access_reason_managed(text) from public, anon, authenticated;

-- Opens ledger rows for every (college, kind) the user is covered by now.
create or replace function public._college_access_ledger_open(p_user uuid, p_replaced text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into college_access_grants (college_id, user_id, kind, replaced_reason)
  select e.college_id, p_user, e.kind, p_replaced
    from public._college_access_eligible(p_user) e
   where not exists (select 1 from college_access_grants g
                      where g.user_id = p_user and g.college_id = e.college_id
                        and g.kind = e.kind and g.ended_at is null);
$$;
revoke all on function public._college_access_ledger_open(uuid, text) from public, anon, authenticated;

-- ─── Sync one user ───────────────────────────────────────────────────────
-- Returns what happened: excluded | no_profile | granted | updated | cleared |
-- unchanged | skipped_paid | skipped_other | not_covered

create or replace function public._college_access_sync_user(p_user uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_p        record;
  v_college  uuid;
  v_kind     text;
  v_exp      timestamptz;
  v_reason   text;
  v_managed  boolean;
  v_replaced text;
begin
  if p_user is null then
    return 'not_covered';
  end if;
  -- Andrew's own accounts are never written here (andrewgangoo91@, founder@).
  if p_user in ('b0113c59-8611-4c5e-8503-1797a75bb64f'::uuid, 'aa69361d-dad9-4841-84e4-25ee41568594'::uuid) then
    return 'excluded';
  end if;

  select e.college_id, e.kind, e.expires_at
    into v_college, v_kind, v_exp
    from public._college_access_eligible(p_user) e
   order by e.pri, e.expires_at desc nulls last
   limit 1;

  select id, free_access_granted, free_access_reason, free_access_expires_at, subscribed
    into v_p
    from profiles where id = p_user
     for update;

  -- Ledger: one open row per (college, kind) the user is covered by now.
  update college_access_grants g
     set ended_at = now()
   where g.user_id = p_user and g.ended_at is null
     and not exists (select 1 from public._college_access_eligible(p_user) e
                      where e.college_id = g.college_id and e.kind = g.kind);

  if v_p.id is null then
    perform public._college_access_ledger_open(p_user, null);
    return 'no_profile';
  end if;

  v_managed := public._college_access_reason_managed(v_p.free_access_reason);

  if v_college is not null then
    v_reason := case v_kind when 'staff' then 'college_staff:' else 'college:' end || v_college::text;
    if not v_managed then
      if coalesce(v_p.subscribed, false) then
        perform public._college_access_ledger_open(p_user, null);
        return 'skipped_paid';
      end if;
      if coalesce(v_p.free_access_granted, false)
         and (v_p.free_access_expires_at is null or v_p.free_access_expires_at > now()) then
        perform public._college_access_ledger_open(p_user, null);
        return 'skipped_other';
      end if;
      -- Taking over an empty or EXPIRED grant: keep the old reason on the ledger.
      v_replaced := v_p.free_access_reason;
    end if;
    perform public._college_access_ledger_open(p_user, v_replaced);
    if v_managed and coalesce(v_p.free_access_granted, false)
       and v_p.free_access_reason = v_reason
       and v_p.free_access_expires_at is not distinct from v_exp then
      return 'unchanged';
    end if;
    perform set_config('college_access.syncing', 'on', true);
    update profiles
       set free_access_granted    = true,
           free_access_reason     = v_reason,
           free_access_expires_at = v_exp,
           free_access_granted_by = null,
           updated_at             = now()
     where id = p_user;
    perform set_config('college_access.syncing', '', true);
    return case when v_managed then 'updated' else 'granted' end;
  end if;

  perform public._college_access_ledger_open(p_user, null);
  if v_managed then
    perform set_config('college_access.syncing', 'on', true);
    update profiles
       set free_access_granted    = false,
           free_access_reason     = null,
           free_access_expires_at = null,
           free_access_granted_by = null,
           updated_at             = now()
     where id = p_user;
    perform set_config('college_access.syncing', '', true);
    return 'cleared';
  end if;
  return 'not_covered';
end;
$$;

revoke all on function public._college_access_sync_user(uuid) from public, anon, authenticated;

-- Everyone the model might need to touch for one college.
create or replace function public._college_access_sync_college(p_college uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_u   uuid;
  v_r   text;
  v_out jsonb := '{}'::jsonb;
  v_code text;
begin
  select code into v_code from colleges where id = p_college;
  for v_u in
    select user_id from college_students where college_id = p_college and user_id is not null
    union
    select user_id from college_staff where college_id = p_college and user_id is not null
    union
    select id from profiles
     where free_access_reason in ('college:' || p_college::text, 'college_staff:' || p_college::text,
                                  'College staff — ' || coalesce(v_code, '§'))
    union
    select user_id from college_access_grants where college_id = p_college and ended_at is null
  loop
    v_r := public._college_access_sync_user(v_u);
    v_out := v_out || jsonb_build_object(v_r, coalesce((v_out->>v_r)::int, 0) + 1);
  end loop;
  return v_out;
end;
$$;
revoke all on function public._college_access_sync_college(uuid) from public, anon, authenticated;

-- ─── Triggers ────────────────────────────────────────────────────────────

create or replace function public.tg_college_access_people_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op in ('UPDATE', 'DELETE') and old.user_id is not null then
    perform public._college_access_sync_user(old.user_id);
  end if;
  if tg_op in ('INSERT', 'UPDATE') and new.user_id is not null
     and (tg_op = 'INSERT' or new.user_id is distinct from old.user_id) then
    perform public._college_access_sync_user(new.user_id);
  end if;
  return null;
end;
$$;
revoke all on function public.tg_college_access_people_sync() from public, anon, authenticated;

drop trigger if exists trg_college_access_roll on public.college_students;
create trigger trg_college_access_roll
  after insert or delete or update of user_id, status, college_id on public.college_students
  for each row execute function public.tg_college_access_people_sync();

drop trigger if exists trg_college_access_staff on public.college_staff;
create trigger trg_college_access_staff
  after insert or delete or update of user_id, college_id, archived_at, status on public.college_staff
  for each row execute function public.tg_college_access_people_sync();

create or replace function public.tg_college_access_changed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public._college_access_sync_college(coalesce(new.college_id, old.college_id));
  return null;
end;
$$;
revoke all on function public.tg_college_access_changed() from public, anon, authenticated;

drop trigger if exists trg_college_access_changed on public.college_access;
create trigger trg_college_access_changed
  after insert or update or delete on public.college_access
  for each row execute function public.tg_college_access_changed();

-- A profile made after its roll row was linked, a paid plan that ended, or an
-- employer seat or other grant that was withdrawn: re-check college cover.
create or replace function public.tg_college_access_profile_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(current_setting('college_access.syncing', true), '') = 'on' then
    return null;
  end if;
  if tg_op = 'UPDATE'
     and new.subscribed is not distinct from old.subscribed
     and new.free_access_granted is not distinct from old.free_access_granted
     and new.free_access_reason is not distinct from old.free_access_reason
     and new.free_access_expires_at is not distinct from old.free_access_expires_at then
    return null;
  end if;
  if exists (select 1 from college_students where user_id = new.id)
     or exists (select 1 from college_staff where user_id = new.id)
     or public._college_access_reason_managed(new.free_access_reason) then
    perform public._college_access_sync_user(new.id);
  end if;
  return null;
end;
$$;
revoke all on function public.tg_college_access_profile_sync() from public, anon, authenticated;

drop trigger if exists trg_college_access_profile on public.profiles;
create trigger trg_college_access_profile
  after insert or update of subscribed, free_access_granted, free_access_reason, free_access_expires_at on public.profiles
  for each row execute function public.tg_college_access_profile_sync();

-- The staff trigger used to give every staff member the whole app free for
-- life. For a college whose access Elec-Mate has set, cover now comes from
-- _college_access_sync_user (trg_college_access_staff) and ends with the
-- college's access. A college still on 'none' keeps the old behaviour, so
-- nothing changes for existing colleges until Andrew sets them.
create or replace function public.tg_sync_staff_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare v_code text;
begin
  if new.user_id is null then
    return new;
  end if;

  if new.archived_at is null then
    select code into v_code from colleges where id = new.college_id;
    update profiles
       set college_id   = new.college_id,
           college_role = new.role
     where id = new.user_id
       and (college_id is distinct from new.college_id
            or college_role is distinct from new.role);
    -- College staff get the whole app free (Andrew, 9 Sep 2026): grant if not already granted.
    -- Only for a college with no access set (pilot / contract cover is the access model's job).
    if not exists (select 1 from college_access ca
                    where ca.college_id = new.college_id and ca.access_status <> 'none') then
      update profiles
         set free_access_granted    = true,
             free_access_reason     = coalesce(free_access_reason, 'College staff — ' || coalesce(v_code, new.college_id::text)),
             free_access_granted_by = coalesce(free_access_granted_by, (select id from auth.users where email = 'founder@elec-mate.com' limit 1)),
             free_access_expires_at = null
       where id = new.user_id
         and free_access_granted is distinct from true;
    end if;
  else
    update profiles
       set college_id   = null,
           college_role = null
     where id = new.user_id
       and (college_id is not null or college_role is not null);
  end if;

  return new;
end;
$function$;

-- ─── Re-sync job ─────────────────────────────────────────────────────────
-- Grace ends at midnight London; the hourly run closes access within the hour
-- even for someone who never opens the app.

create or replace function public.college_access_resync_all()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_c   uuid;
  v_u   uuid;
  v_r   text;
  v_out jsonb := '{}'::jsonb;
begin
  for v_c in select college_id from college_access where access_status <> 'none' loop
    perform public._college_access_sync_college(v_c);
  end loop;
  -- Anyone still holding a college grant whose college has since gone to 'none'.
  for v_u in
    select id from profiles where free_access_reason like 'college:%' or free_access_reason like 'college_staff:%'
    union
    select user_id from college_access_grants where ended_at is null
  loop
    v_r := public._college_access_sync_user(v_u);
    v_out := v_out || jsonb_build_object(v_r, coalesce((v_out->>v_r)::int, 0) + 1);
  end loop;
  return v_out;
end;
$$;
revoke all on function public.college_access_resync_all() from public, anon, authenticated;

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'college-access-resync';
  perform cron.schedule('college-access-resync', '7 * * * *', 'select public.college_access_resync_all();');
end $$;

-- ─── Platform admin: set a college's access ──────────────────────────────

create or replace function public.admin_set_college_access(
  p_college uuid,
  p_action  text,
  p_date    date default null,
  p_notes   text default null,
  p_start   date default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_row   college_access;
  v_start date;
  v_end   date;
  v_sync  jsonb;
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate can change a college''s access' using errcode = '42501';
  end if;
  if not exists (select 1 from colleges where id = p_college) then
    raise exception 'No such college';
  end if;

  insert into college_access (college_id, updated_by) values (p_college, auth.uid())
  on conflict (college_id) do nothing;
  select * into v_row from college_access where college_id = p_college for update;

  if p_action = 'start_pilot' then
    v_start := coalesce(p_start, v_today);
    v_end := coalesce(p_date, v_start + 42);
    if v_end < v_start then
      raise exception 'The pilot cannot end before it starts';
    end if;
    update college_access set access_status = 'pilot', pilot_started_at = v_start, pilot_ends_at = v_end,
           notes = coalesce(p_notes, notes), updated_by = auth.uid(), updated_at = now()
     where college_id = p_college;
  elsif p_action = 'extend_pilot' then
    if p_date is null then
      raise exception 'Give the new pilot end date';
    end if;
    v_start := coalesce(v_row.pilot_started_at, v_today);
    if p_date < v_start then
      raise exception 'The pilot cannot end before it starts (%)', to_char(v_start, 'DD Mon YYYY');
    end if;
    v_end := p_date;
    update college_access set access_status = 'pilot', pilot_started_at = v_start, pilot_ends_at = v_end,
           notes = coalesce(p_notes, notes), updated_by = auth.uid(), updated_at = now()
     where college_id = p_college;
  elsif p_action = 'contract' then
    if p_date is null then
      raise exception 'Give the date the contract runs until';
    end if;
    if p_date < v_today then
      raise exception 'The contract end date is in the past';
    end if;
    v_end := p_date;
    update college_access set access_status = 'contracted', contract_until = v_end,
           notes = coalesce(p_notes, notes), updated_by = auth.uid(), updated_at = now()
     where college_id = p_college;
  elsif p_action = 'lapse' then
    update college_access set access_status = 'lapsed',
           notes = coalesce(p_notes, notes), updated_by = auth.uid(), updated_at = now()
     where college_id = p_college;
  elsif p_action = 'set_none' then
    update college_access set access_status = 'none',
           notes = coalesce(p_notes, notes), updated_by = auth.uid(), updated_at = now()
     where college_id = p_college;
  elsif p_action = 'notes' then
    update college_access set notes = nullif(btrim(coalesce(p_notes, '')), ''), updated_by = auth.uid(), updated_at = now()
     where college_id = p_college;
  else
    raise exception 'Unknown action %', p_action;
  end if;

  select * into v_row from college_access where college_id = p_college;
  insert into college_access_periods (college_id, action, access_status, starts_on, ends_on, notes, created_by)
  values (p_college, p_action, v_row.access_status,
          case when v_row.access_status = 'pilot' then v_row.pilot_started_at end,
          case v_row.access_status when 'pilot' then v_row.pilot_ends_at when 'contracted' then v_row.contract_until end,
          p_notes, auth.uid());

  return jsonb_build_object(
    'college_id', p_college,
    'access_status', v_row.access_status,
    'pilot_started_at', v_row.pilot_started_at,
    'pilot_ends_at', v_row.pilot_ends_at,
    'contract_until', v_row.contract_until,
    'learners_covered', (select count(distinct user_id) from college_access_grants
                          where college_id = p_college and kind = 'learner' and ended_at is null),
    'staff_covered', (select count(distinct user_id) from college_access_grants
                       where college_id = p_college and kind = 'staff' and ended_at is null)
  );
end;
$$;
revoke all on function public.admin_set_college_access(uuid, text, date, text, date) from public, anon;
grant execute on function public.admin_set_college_access(uuid, text, date, text, date) to authenticated;

-- ─── What the signed-in user sees ────────────────────────────────────────

create or replace function public.get_my_college_access()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_uid     uuid := auth.uid();
  v_college uuid;
  v_role    text;
  v_is_lead boolean := false;
  v_roll    text;
  v_reason  text;
  v_s       record;
begin
  if v_uid is null then
    return null;
  end if;
  select st.college_id, st.role in ('admin', 'head_of_department')
    into v_college, v_is_lead
    from college_staff st
   where st.user_id = v_uid and st.archived_at is null
   order by st.created_at limit 1;
  if v_college is not null then
    v_role := 'staff';
  else
    select s.college_id, s.status into v_college, v_roll
      from college_students s
     where s.user_id = v_uid
     order by (s.status in ('Active', 'On Break')) desc, s.created_at desc limit 1;
    if v_college is null then
      return null;
    end if;
    v_role := 'learner';
  end if;

  select * into v_s from public._college_access_state(v_college);
  select free_access_reason into v_reason from profiles where id = v_uid;

  return jsonb_build_object(
    'role', v_role,
    'college_id', v_college,
    'college_name', (select name from colleges where id = v_college),
    'access_status', v_s.access_status,
    'phase', v_s.phase,
    'starts_on', v_s.starts_on,
    'ends_on', v_s.ends_on,
    'grace_until', v_s.grace_until,
    'days_left', v_s.days_left,
    'has_access', v_s.has_access,
    'is_lead', coalesce(v_is_lead, false),
    'roll_status', v_roll,
    'provided_by_college', coalesce(v_reason in ('college:' || v_college::text, 'college_staff:' || v_college::text), false)
  );
end;
$$;
revoke all on function public.get_my_college_access() from public, anon;
grant execute on function public.get_my_college_access() to authenticated;

-- The paywall's college line (20261008046000), now also saying when the
-- college's access has ended, so a learner reads a calm explanation naming
-- their college rather than a bare upsell.
create or replace function public.get_my_college_offer()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_college uuid;
  v_name    text;
  v_cohort  text;
  v_code    text;
  v_s       record;
begin
  if auth.uid() is null then
    return null;
  end if;
  select s.college_id, c.name, co.name
    into v_college, v_name, v_cohort
    from college_students s
    join colleges c on c.id = s.college_id
    left join college_cohorts co on co.id = s.cohort_id
   where s.user_id = auth.uid()
   order by s.created_at
   limit 1;
  if v_college is null then
    -- Staff whose college's access has ended reach the paywall too.
    select st.college_id, c.name into v_college, v_name
      from college_staff st join colleges c on c.id = st.college_id
     where st.user_id = auth.uid() and st.archived_at is null
     order by st.created_at limit 1;
    if v_college is null then
      return null;
    end if;
    select * into v_s from public._college_access_state(v_college);
    if v_s.phase <> 'ended' or v_s.access_status = 'none' then
      return null;
    end if;
    return jsonb_build_object('college_name', v_name, 'cohort_name', null, 'apprentice_offer', null,
                              'is_staff', true, 'access_ended', true, 'access_status', v_s.access_status,
                              'access_ended_on', coalesce(v_s.grace_until, (select updated_at::date from college_access where college_id = v_college)));
  end if;
  select po.code into v_code
    from college_signup_offers so
    join promo_offers po on po.code = so.apprentice_code
   where so.college_id = v_college and po.is_active
     and (po.expires_at is null or po.expires_at > now());
  select * into v_s from public._college_access_state(v_college);
  return jsonb_build_object(
    'college_name', v_name,
    'cohort_name', v_cohort,
    'apprentice_offer', v_code,
    'is_staff', false,
    'access_status', v_s.access_status,
    'has_access', v_s.has_access,
    'access_ended', v_s.access_status <> 'none' and v_s.phase = 'ended',
    'access_ended_on', case when v_s.access_status <> 'none' and v_s.phase = 'ended'
                            then coalesce(v_s.grace_until, (select updated_at::date from college_access where college_id = v_college)) end
  );
end;
$$;
revoke all on function public.get_my_college_offer() from public, anon;
grant execute on function public.get_my_college_offer() to authenticated;

-- ─── create_college: a set-up-code college starts its 6-week pilot ───────

create or replace function public.create_college(
  p_name text,
  p_code text,
  p_awarding_bodies text[] default null,
  p_city text default null,
  p_setup_code text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid     uuid := auth.uid();
  v_admin   boolean := public._is_platform_admin();
  v_check   jsonb;
  v_name    text := btrim(coalesce(p_name, ''));
  v_code    text := upper(regexp_replace(coalesce(p_code, ''), '\s', '', 'g'));
  v_college uuid;
  v_email   text;
  v_full    text;
  v_staff   uuid;
  v_today   date := (now() at time zone 'Europe/London')::date;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  if length(v_name) < 3 or length(v_name) > 120 then
    raise exception 'Give the college''s full name';
  end if;
  if v_code !~ '^[A-Z0-9]{2,12}$' then
    raise exception 'The short code is 2 to 12 letters or numbers, for example KENDAL';
  end if;
  if exists (select 1 from colleges where upper(code) = v_code) then
    raise exception 'The short code % is taken. Try another.', v_code using errcode = '23505';
  end if;

  if not v_admin then
    v_check := public.check_college_setup_code(p_setup_code);
    if not coalesce((v_check->>'valid')::boolean, false) then
      raise exception '%', coalesce(v_check->>'reason', 'A set-up code from Elec-Mate is needed to create a college') using errcode = '42501';
    end if;
  end if;

  insert into colleges (name, code, awarding_bodies, city, is_active)
  values (v_name, v_code,
          (select array_agg(distinct btrim(b)) from unnest(coalesce(p_awarding_bodies, '{}'::text[])) b where btrim(b) <> ''),
          nullif(btrim(coalesce(p_city, '')), ''), true)
  returning id into v_college;

  if not v_admin then
    -- A college made with a set-up code starts its 6-week pilot now (Andrew,
    -- 7 Oct 2026). Set before the first staff row, so the lead's cover is the
    -- pilot's, not the old lifetime staff grant.
    insert into college_access (college_id, access_status, pilot_started_at, pilot_ends_at, notes, updated_by)
    values (v_college, 'pilot', v_today, v_today + 42, 'Started automatically from set-up code ' || upper(btrim(p_setup_code)), v_uid);
    insert into college_access_periods (college_id, action, access_status, starts_on, ends_on, notes, created_by)
    values (v_college, 'auto_pilot', 'pilot', v_today, v_today + 42, 'Set-up code ' || upper(btrim(p_setup_code)), v_uid);

    -- The holder of the code becomes the college's first admin. The staff
    -- trigger (tg_sync_staff_profile) sets profiles.college_id / college_role;
    -- trg_college_access_staff gives the pilot's free access.
    select email into v_email from auth.users where id = v_uid;
    select full_name into v_full from profiles where id = v_uid;
    insert into college_staff (college_id, user_id, name, email, role, status)
    values (v_college, v_uid, coalesce(nullif(btrim(v_full), ''), v_email, 'College admin'), coalesce(v_email, ''), 'admin', 'Active')
    returning id into v_staff;

    update college_setup_codes
       set used_by = v_uid, used_at = now(), college_id = v_college
     where code = upper(btrim(p_setup_code));
  end if;

  return jsonb_build_object('college_id', v_college, 'code', v_code, 'name', v_name, 'staff_id', v_staff);
end;
$$;
revoke all on function public.create_college(text, text, text[], text, text) from public, anon;
grant execute on function public.create_college(text, text, text[], text, text) to authenticated;

commit;
