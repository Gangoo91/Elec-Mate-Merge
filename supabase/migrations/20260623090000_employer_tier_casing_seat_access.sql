-- Applied live 2026-06-23. Fixes two silent employer-access bugs (idempotent).
-- 1) Legacy profiles carried capitalised 'Employer' (the Stripe webhook only
--    ever writes lowercase) — normalise so exact-match tier checks all work.
-- 2) has_active_worker_seat() exact-matched 'employer', so workers under an
--    ANNUAL employer ('employer_yearly') or a mis-cased one got no free Worker
--    Tools access. Make it case-insensitive + prefix-match.
update public.profiles
   set subscription_tier = 'employer'
 where subscription_tier = 'Employer';

create or replace function public.has_active_worker_seat()
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select exists (
    select 1
    from employer_seats s
    join profiles p on p.id = s.employer_id
    where s.user_id = auth.uid()
      and s.status = 'active'
      and lower(p.subscription_tier) like 'employer%'
  );
$function$;