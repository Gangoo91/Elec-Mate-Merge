-- Lifetime buyers keep the Employer Hub (10 Oct 2026).
--
-- lifetime-fulfilment grants subscription_tier 'employer' to everyone who buys
-- through the lifetime payment links (Andrew, 17 Jul: the deal includes the
-- Employer Hub; the £499.99 "Everything" link is sold on it). Two seconds later
-- cancelling their old Stripe subscription fires the subscription webhooks,
-- and one of the ~14 functions that sync subscription_tier from Stripe /
-- RevenueCat writes it back ('electrician_yearly', or NULL). The Employer Hub
-- gate (src/config/employerAccess.ts) reads the tier, so every lifetime buyer
-- lost the hub — Isaac Stafford reported it; Sean Mulcahy paid £499.99 for it.
--
-- One BEFORE UPDATE trigger instead of patching every writer: for a profile
-- with a fulfilled row in lifetime_purchases (written only by the service role;
-- RLS allows admins to read, nobody to write), a tier change away from
-- 'employer…' is held at 'employer'. The June 2026 manual-campaign buyers are
-- not in lifetime_purchases and are left alone — their entitlement is
-- Andrew's call.

create or replace function public.keep_lifetime_employer_tier()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if lower(coalesce(new.subscription_tier, '')) not like 'employer%'
     and exists (
       select 1 from public.lifetime_purchases lp
       where lp.user_id = new.id and lp.status = 'fulfilled'
     ) then
    new.subscription_tier := 'employer';
  end if;
  return new;
end;
$$;

revoke all on function public.keep_lifetime_employer_tier() from public, anon, authenticated;

-- "zz" so it runs after trg_profiles_privileged_guard (triggers fire by name).
drop trigger if exists trg_profiles_zz_keep_lifetime_employer on public.profiles;
create trigger trg_profiles_zz_keep_lifetime_employer
  before update of subscription_tier on public.profiles
  for each row
  when (new.subscription_tier is distinct from old.subscription_tier)
  execute function public.keep_lifetime_employer_tier();

-- Put back the five whose tier was overwritten.
update public.profiles p
set subscription_tier = 'employer'
where exists (
  select 1 from public.lifetime_purchases lp
  where lp.user_id = p.id and lp.status = 'fulfilled'
)
and lower(coalesce(p.subscription_tier, '')) not like 'employer%';
