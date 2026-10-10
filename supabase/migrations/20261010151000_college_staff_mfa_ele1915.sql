-- ELE-1915: staff two-step sign-in (Supabase Auth TOTP) that a college can REQUIRE.
--
--   colleges.require_staff_mfa      the college admin's switch (default off)
--   set_college_require_staff_mfa   college admin / head of department only;
--                                   turning it ON needs the caller to be signed
--                                   in with two steps right now (aal2), which
--                                   proves TOTP works for that college before
--                                   anyone can be locked out by it
--   get_my_mfa_requirement          what the client gate asks: am I staff at a
--                                   college that requires it, and am I at aal2?
--   college_staff_mfa_ok()          true unless the caller is staff at a college
--                                   that requires two steps and this session is
--                                   aal1. Used by RESTRICTIVE policies on the
--                                   most sensitive learner tables, so the rule
--                                   holds server-side, not only in the UI.
--
-- Nothing changes for any college until its admin switches it on (and TOTP
-- enrolment is still disabled at the project level today: Supabase returns 422
-- mfa_totp_enroll_not_enabled, so no admin can reach aal2 to switch it on until
-- Andrew enables TOTP under Authentication -> Multi-Factor).
-- Learners are never affected (college_role is null for learners).

begin;
set local lock_timeout = '8s';

alter table public.colleges
  add column if not exists require_staff_mfa boolean not null default false,
  add column if not exists require_staff_mfa_set_by uuid references auth.users(id) on delete set null,
  add column if not exists require_staff_mfa_set_at timestamptz;

comment on column public.colleges.require_staff_mfa is
  'ELE-1915: when true, staff of this college must sign in with two steps (TOTP, aal2) to open the College Hub and to read or write learner records (restrictive RLS via college_staff_mfa_ok()). Set only through set_college_require_staff_mfa.';

create or replace function public.college_staff_mfa_ok()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() ->> 'aal'), 'aal1') = 'aal2'
      or not exists (
        select 1
          from public.profiles p
          join public.colleges c on c.id = p.college_id
         where p.id = auth.uid()
           and p.college_role is not null
           and c.require_staff_mfa
      );
$$;
revoke all on function public.college_staff_mfa_ok() from public;
grant execute on function public.college_staff_mfa_ok() to anon, authenticated;

create or replace function public.get_my_mfa_requirement()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'required', coalesce(c.require_staff_mfa, false),
    'is_staff', p.college_role is not null,
    'college_id', p.college_id,
    'college_name', c.name,
    'aal', coalesce((auth.jwt() ->> 'aal'), 'aal1'),
    'satisfied', public.college_staff_mfa_ok()
  )
  from public.profiles p
  left join public.colleges c on c.id = p.college_id and p.college_role is not null
  where p.id = auth.uid();
$$;
revoke all on function public.get_my_mfa_requirement() from public, anon;
grant execute on function public.get_my_mfa_requirement() to authenticated;

create or replace function public.set_college_require_staff_mfa(p_college uuid, p_required boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public._is_college_manager(p_college) then
    raise exception 'Only your college admin can change this' using errcode = '42501';
  end if;
  if p_required and coalesce((auth.jwt() ->> 'aal'), 'aal1') <> 'aal2' then
    raise exception 'Set up two-step sign-in for yourself and sign in with it before requiring it for staff'
      using errcode = '42501';
  end if;
  update public.colleges
     set require_staff_mfa = p_required,
         require_staff_mfa_set_by = auth.uid(),
         require_staff_mfa_set_at = now()
   where id = p_college;
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), case when p_required then 'security.staff_mfa_required' else 'security.staff_mfa_optional' end,
          'college', p_college, jsonb_build_object('require_staff_mfa', p_required));
  return jsonb_build_object('college_id', p_college, 'require_staff_mfa', p_required);
end;
$$;
revoke all on function public.set_college_require_staff_mfa(uuid, boolean) from public, anon;
grant execute on function public.set_college_require_staff_mfa(uuid, boolean) to authenticated;

-- Server-side: the most sensitive learner tables refuse staff of a college that
-- requires two steps until this session is aal2. Restrictive, so it only ever
-- narrows what the existing permissive policies allow.
do $$
declare t text;
begin
  foreach t in array array['college_students', 'pastoral_notes', 'college_ilp_goals', 'college_attendance'] loop
    if to_regclass('public.' || t) is not null then
      execute format('drop policy if exists college_staff_mfa_required on public.%I', t);
      execute format('create policy college_staff_mfa_required on public.%I as restrictive for all to authenticated
                        using ((select public.college_staff_mfa_ok())) with check ((select public.college_staff_mfa_ok()))', t);
    end if;
  end loop;
end $$;

commit;
