-- ELE-1915 (follow-up): two-step sign-in ON BY DEFAULT for safeguarding leads.
--
-- DfE's cyber security standard for schools and colleges asks for MFA on staff
-- cloud accounts. Safeguarding leads (college_staff.is_dsl / is_deputy_dsl)
-- read the most sensitive records, so their two-step requirement defaults on.
--
-- It cannot bite yet: TOTP enrolment is disabled at the Supabase project level
-- (Auth returns 422 mfa_totp_enroll_not_enabled), and requiring a factor nobody
-- can enrol would lock every DSL out of pastoral notes. So the default only
-- takes effect once platform_security_settings.totp_enrolment_enabled is true.
-- Andrew flips that row in the SAME step as enabling TOTP in the dashboard:
--   update public.platform_security_settings set totp_enrolment_enabled = true, updated_at = now();
--
--   platform_security_settings          one row; read by every signed-in user
--   colleges.require_safeguarding_mfa   default true; the college admin can turn
--                                       it off (logged)
--   college_staff_mfa_ok()              now also true-gates DSLs when both are on
--   get_my_mfa_requirement()            reports the effective requirement

begin;
set local lock_timeout = '8s';

create table if not exists public.platform_security_settings (
  id                      boolean primary key default true check (id),
  totp_enrolment_enabled  boolean not null default false,
  updated_at              timestamptz not null default now()
);
insert into public.platform_security_settings (id) values (true) on conflict (id) do nothing;
alter table public.platform_security_settings enable row level security;
drop policy if exists "Signed-in users read platform security settings" on public.platform_security_settings;
create policy "Signed-in users read platform security settings" on public.platform_security_settings
  for select to authenticated using (true);
revoke all on public.platform_security_settings from anon;
revoke insert, update, delete, truncate on public.platform_security_settings from authenticated;
comment on table public.platform_security_settings is
  '[PLATFORM] ELE-1915: platform-wide security switches. totp_enrolment_enabled mirrors the Supabase Auth dashboard setting (Authentication -> Multi-Factor -> TOTP); set it true in the same step as enabling TOTP there, which turns on the safeguarding-lead default. Scope: one row. Used by: college_staff_mfa_ok, get_my_mfa_requirement, College settings. Rule: changed by Elec-Mate only (no client writes).';

alter table public.colleges
  add column if not exists require_safeguarding_mfa boolean not null default true;
comment on column public.colleges.require_safeguarding_mfa is
  'ELE-1915: safeguarding leads (is_dsl / is_deputy_dsl) must sign in with two steps (aal2) to read learner records. Default on; effective once platform_security_settings.totp_enrolment_enabled is true. Set through set_college_require_safeguarding_mfa.';

-- Is two-step sign-in required for the caller (whatever this session's level)?
create or replace function public._college_mfa_required_for_me()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.profiles p
      join public.colleges c on c.id = p.college_id
     where p.id = auth.uid()
       and p.college_role is not null
       and (
         c.require_staff_mfa
         or (
           c.require_safeguarding_mfa
           and coalesce((select s.totp_enrolment_enabled from public.platform_security_settings s limit 1), false)
           and exists (
             select 1 from public.college_staff st
              where st.user_id = p.id and st.college_id = c.id and st.archived_at is null
                and (st.is_dsl or st.is_deputy_dsl)
           )
         )
       )
  );
$$;
revoke all on function public._college_mfa_required_for_me() from public;
grant execute on function public._college_mfa_required_for_me() to anon, authenticated;

create or replace function public.college_staff_mfa_ok()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() ->> 'aal'), 'aal1') = 'aal2'
      or not public._college_mfa_required_for_me();
$$;

create or replace function public.get_my_mfa_requirement()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'required', public._college_mfa_required_for_me(),
    'college_requires_all_staff', coalesce(c.require_staff_mfa, false),
    'college_requires_safeguarding', coalesce(c.require_safeguarding_mfa, false),
    'platform_totp_enabled', coalesce((select s.totp_enrolment_enabled from public.platform_security_settings s limit 1), false),
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

create or replace function public.set_college_require_safeguarding_mfa(p_college uuid, p_required boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public._is_college_manager(p_college) then
    raise exception 'Only your college admin can change this' using errcode = '42501';
  end if;
  update public.colleges set require_safeguarding_mfa = p_required where id = p_college;
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(),
          case when p_required then 'security.safeguarding_mfa_required' else 'security.safeguarding_mfa_optional' end,
          'college', p_college, jsonb_build_object('require_safeguarding_mfa', p_required));
  return jsonb_build_object('college_id', p_college, 'require_safeguarding_mfa', p_required);
end;
$$;
revoke all on function public.set_college_require_safeguarding_mfa(uuid, boolean) from public, anon;
grant execute on function public.set_college_require_safeguarding_mfa(uuid, boolean) to authenticated;

commit;
