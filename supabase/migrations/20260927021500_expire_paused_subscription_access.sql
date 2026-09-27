-- Expire the dated free access granted when a subscription is paused.
--
-- Pausing stops billing immediately, but the customer has already paid for the
-- period they are in. `stripe-subscription-webhook` now grants dated free
-- access to that paid-through date instead of cutting them off on the spot.
-- Something has to end it, because `subscribed` and `free_access_granted` are
-- plain booleans that nothing expires on its own.
--
-- 🔴 The 'Paused sub%' pattern below MUST stay in step with
-- `PAUSE_GRANT_PREFIX` in supabase/functions/stripe-subscription-webhook.
-- If the two drift apart nothing errors — this job simply stops matching, the
-- grants never expire, and paused customers keep the full product free for
-- good. The prefix is short on purpose so it also catches grants written by
-- hand during the 27 Sep 2026 incident ("Paused sub 27 Sep 2026 — …").
--
-- `expire_employer_free_access()` already does this job, but only for rows
-- whose reason starts 'Employer trial:'. Rather than widen that function to
-- every dated grant — which would immediately revoke 22 historical accounts
-- whose trials lapsed between Feb and Aug 2026, a separate decision with real
-- customer impact — this is a sibling scoped to pause grants alone.
--
-- Both functions require `free_access_expires_at is not null`, so permanent
-- grants (lifetime purchases, beta testers, demo accounts) are never touched.

create or replace function public.expire_paused_subscription_access()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare n integer;
begin
  update public.profiles
     set free_access_granted = false,
         updated_at          = now()
   where free_access_granted    = true
     and free_access_expires_at is not null
     and free_access_expires_at < now()
     and free_access_reason like 'Paused sub%';
  get diagnostics n = row_count;
  return n;
end
$function$;

-- Runs just after the employer job so the two never contend.
select cron.schedule(
  'expire-paused-subscription-access',
  '25 3 * * *',
  $$select public.expire_paused_subscription_access();$$
);
