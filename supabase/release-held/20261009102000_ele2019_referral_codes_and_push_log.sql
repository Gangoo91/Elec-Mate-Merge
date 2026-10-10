-- ELE-2019 — RELEASE-HELD. NOT APPLIED.
--
-- RELEASE-HELD: apply only after the client that resolves referral codes
-- through resolve_referral_code (SignUp, InviteLanding — on the web since
-- 21a50d6f2) and no longer writes push_notification_log from the College
-- batch send (send_college_announcement, ELE-1913) is live on iOS/Android
-- too, i.e. once the native build after 49 (c4b438a06) is the one people run.
-- The web app (HEAD) already needs neither policy.
--
-- 1. referral_codes "Users can view any active code for validation"
--    (is_active = true, any role incl. signed-out): lists all ~2,289 codes and
--    their owners' user ids. iOS build 49's sign-up still reads the table
--    directly while signed out to attribute a ?ref= code; dropping this before
--    that build is retired silently loses referral credit for native sign-ups.
--    Owners keep "Users can view their own referral code".
--
-- 2. push_notification_log "Signed-in users insert push log (release-held removal)"
--    (with check true): any signed-in account can drop a notification into
--    anyone's bell. Signed-out insert was closed live on 9 Oct (20261009100000).
--    Only iOS build 49's College batch send still inserts from the client;
--    every other writer is a service-role function or a SECURITY DEFINER RPC.

begin;

drop policy if exists "Users can view any active code for validation" on public.referral_codes;

drop policy if exists "Signed-in users insert push log (release-held removal)" on public.push_notification_log;

commit;

-- VERIFY: as anon, `select count(*) from referral_codes` = 0 and
-- `select * from resolve_referral_code('<a real code>')` returns its owner;
-- as a signed-in user, inserting into push_notification_log for someone else fails (42501).
