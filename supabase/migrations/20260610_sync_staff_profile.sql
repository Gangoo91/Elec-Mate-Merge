-- ============================================================================
-- College Hub — staff identity: keep profiles.college_id / college_role in sync
-- with the college_staff roster (the staff mirror of the student spine).
--
-- The RLS that gates the whole college hub leans on the invariant
-- "profiles.college_id + college_role set => this user is staff". But staff added
-- to the roster with a login didn't always have their profile's college_role set
-- (1 such row today), which would (a) break the _ch_same_college hardening and
-- (b) leave them mis-recognised. This syncs the profile from the roster row
-- whenever a staff row is created/linked/updated, and revokes on archive.
--
-- Roster role vocabulary (tutor / head_of_department / support / admin) is the
-- same as profiles.college_role, so it copies directly. The roster is the source
-- of truth for a staff member's role.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_sync_staff_profile()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.user_id is null then
    return new;
  end if;

  if new.archived_at is null then
    -- Active staff: mirror college + role onto their login profile.
    update profiles
       set college_id   = new.college_id,
           college_role = new.role
     where id = new.user_id
       and (college_id is distinct from new.college_id
            or college_role is distinct from new.role);
  else
    -- Archived staff: fully revoke college access (clear link + role).
    update profiles
       set college_id   = null,
           college_role = null
     where id = new.user_id
       and (college_id is not null or college_role is not null);
  end if;

  return new;
end;
$function$;

drop trigger if exists trg_sync_staff_profile on public.college_staff;

create trigger trg_sync_staff_profile
  after insert or update of user_id, college_id, role, archived_at
  on public.college_staff
  for each row
  execute function public.tg_sync_staff_profile();

-- One-time backfill: sync existing linked, non-archived staff (fixes the
-- 1 linked-staff-missing-role row, and any drift).
update public.profiles p
   set college_id   = cs.college_id,
       college_role = cs.role
  from public.college_staff cs
 where cs.user_id = p.id
   and cs.archived_at is null
   and (p.college_id is distinct from cs.college_id
        or p.college_role is distinct from cs.role);

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_sync_staff_profile on public.college_staff;
--   drop function if exists public.tg_sync_staff_profile();
-- (Backfilled profile roles stay — they are now correct.)
-- ============================================================================
