-- ============================================================================
-- P0 — close readable-OTP account-takeover hole on phone_verification_codes.
--
-- The table was granted to anon + authenticated, and a mislabelled
-- "Service role can manage" policy is actually roles={public} USING(true) —
-- so ANY user (even anonymous) could SELECT every user's phone OTP, then verify
-- as that user.
--
-- The table is touched ONLY by edge functions (send-phone-otp, verify-phone-otp,
-- generate-wa-code, wa-onboarding), all of which use the service_role key
-- (bypasses RLS + grants). No client (src/) code reads it. So revoking client
-- grants closes the hole without breaking the OTP flow.
--
-- Rollback (do NOT — re-opens the hole):
--   grant select, insert, update, delete on public.phone_verification_codes
--     to anon, authenticated;
-- ============================================================================

revoke all on public.phone_verification_codes from anon, authenticated;
