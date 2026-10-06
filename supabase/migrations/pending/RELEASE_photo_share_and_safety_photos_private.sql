-- ════════════════════════════════════════════════════════════════════════
-- HELD: apply ONLY after the app release that contains (Site Safety, 6–7 Oct):
--   * src/pages/public/PhotoSharePage.tsx and src/pages/public/CompletionSignOffPage.tsx
--     reading via the photo-share function
--   * src/components/ui/storage-photo.tsx + src/utils/storagePhoto.ts
--     (every photo-docs / site-visit / safety screen signs its photo links)
-- and once native users are on that build. Applied earlier, the live app
-- breaks: customer share pages go blank and every site photo stops loading.
--
-- Steps A and A2 can go with the release. Step B (bucket private) after the native
-- build is adopted — check that nothing still requests
-- /object/public/safety-photos/ (storage logs) before running it.
-- ════════════════════════════════════════════════════════════════════════

-- ── A. photo_share_links: no anonymous access ─────────────────────────
-- "Anyone can view active share links by token" had NO token condition: any
-- visitor could list every active or signed share, with the customer's
-- signature image, email and IP. "Anyone can submit signature" let any visitor
-- rewrite any column of any active share. The public page now goes through
-- the photo-share edge function (service role, one share by token).
drop policy if exists "Anyone can view active share links by token" on public.photo_share_links;
drop policy if exists "Anyone can submit signature on active links" on public.photo_share_links;
-- Owners keep "Users can manage their own share links".

-- completion_signoffs: same hole ("Public read completion signoffs by token"
-- is USING (true) despite its name; the update policy checks status only).
-- /completion/:token now reads and signs through photo-share (kind
-- 'completion'). Owners keep "Users manage own completion signoffs".
drop policy if exists "Public read completion signoffs by token" on public.completion_signoffs;
drop policy if exists "Public can update completion signoffs for signing" on public.completion_signoffs;

-- ── A2. profiles: subscription fields server-only ─────────────────────
-- Needs the release that ships CheckoutTrial calling confirm-store-purchase
-- (DEPLOYED 7 Oct) instead of writing profiles.subscribed itself. Applied
-- before that release, native buyers would wait for the RevenueCat webhook
-- to unlock. Admins (admin_role) are still allowed, as before.
CREATE OR REPLACE FUNCTION public._profiles_privileged_guard()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
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
       or coalesce(new.subscribed, false)
       or new.subscription_tier is not null
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
  -- Subscription state is set by Stripe / RevenueCat webhooks, check-subscription,
  -- confirm-store-purchase and reconcile jobs only (7 Oct 2026). A user could
  -- PATCH their own profile to subscribed=true and unlock the paid app.
  or new.subscribed             is distinct from old.subscribed
  or new.subscription_tier      is distinct from old.subscription_tier
  or new.subscription_end       is distinct from old.subscription_end
  or new.subscription_source    is distinct from old.subscription_source
  or new.is_trial               is distinct from old.is_trial
  or new.trial_end              is distinct from old.trial_end
  or (new.role = 'admin' and old.role is distinct from 'admin') then
    raise exception 'profile privilege fields can only be changed by Elec-Mate'
      using errcode = '42501';
  end if;
  return new;
end;
$function$;

-- ── B. safety-photos: private ─────────────────────────────────────────
-- Site photos show people's homes, addresses and sometimes faces. Owners
-- read their own folder through the existing policy "Users can view their own
-- safety photos" (checked 7 Oct: all 282 objects sit in their owner's folder,
-- so every photo stays signable); the app and edge functions use signed links.
update storage.buckets set public = false where id = 'safety-photos';
