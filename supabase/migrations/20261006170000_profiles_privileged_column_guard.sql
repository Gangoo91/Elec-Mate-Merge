-- Foundation fix (ELE-1914). Any signed-in user could UPDATE their own profile
-- and set college_id / college_role (=> staff of any college via
-- _ch_same_college, read every learner's ILP, attendance, notes), admin_role
-- (=> is_admin() true platform-wide), free access, founder status and more.
-- Proved 6 Oct with the fixture learner inside a rolled-back transaction:
-- 1 learner row visible before, all 10 after; 2 ILP goals -> 38; 1 attendance -> 65.
--
-- Rule: a direct client write (current_user = authenticated/anon) may not change
-- privilege columns unless the caller is already a platform admin. Server code
-- (service_role) and SECURITY DEFINER functions (accept_college_invite,
-- tg_sync_staff_profile, ...) run as another role and are untouched.
-- Subscription/billing-state columns are deliberately NOT in this list yet: the
-- native checkout writes them client-side (CheckoutTrial.tsx); tracked separately.
create or replace function public._profiles_privileged_guard()
returns trigger
language plpgsql
security invoker
set search_path to 'public'
as $$
declare
  v_admin boolean;
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;

  select exists (select 1 from public.profiles where id = auth.uid() and admin_role is not null)
    into v_admin;
  if v_admin then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if new.admin_role is not null
       or new.college_role is not null
       or new.college_id is not null
       or coalesce(new.is_assessor, false)
       or coalesce(new.is_iqa, false)
       or coalesce(new.free_access_granted, false)
       or coalesce(new.is_founder, false)
       or coalesce(new.business_ai_enabled, false)
       or new.role = 'admin' then
      raise exception 'profile privilege fields can only be set by Elec-Mate'
        using errcode = '42501';
    end if;
    return new;
  end if;

  if new.admin_role             is distinct from old.admin_role
  or new.college_role           is distinct from old.college_role
  or new.college_id             is distinct from old.college_id
  or new.is_assessor            is distinct from old.is_assessor
  or new.is_iqa                 is distinct from old.is_iqa
  or new.free_access_granted    is distinct from old.free_access_granted
  or new.free_access_granted_by is distinct from old.free_access_granted_by
  or new.free_access_expires_at is distinct from old.free_access_expires_at
  or new.free_access_reason     is distinct from old.free_access_reason
  or new.is_founder             is distinct from old.is_founder
  or new.founder_at             is distinct from old.founder_at
  or new.employer_seat_cap      is distinct from old.employer_seat_cap
  or new.referral_credits_pence is distinct from old.referral_credits_pence
  or new.total_referrals        is distinct from old.total_referrals
  or new.successful_referrals   is distinct from old.successful_referrals
  or new.college_org            is distinct from old.college_org
  or new.employer_org           is distinct from old.employer_org
  or new.created_via            is distinct from old.created_via
  or new.stripe_customer_id     is distinct from old.stripe_customer_id
  or new.business_ai_enabled    is distinct from old.business_ai_enabled
  or (new.role = 'admin' and old.role is distinct from 'admin') then
    raise exception 'profile privilege fields can only be changed by Elec-Mate'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_privileged_guard on public.profiles;
create trigger trg_profiles_privileged_guard
  before insert or update on public.profiles
  for each row execute function public._profiles_privileged_guard();
