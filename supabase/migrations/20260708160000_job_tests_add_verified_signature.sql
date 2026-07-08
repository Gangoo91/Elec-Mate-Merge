-- Test sign-off recorded only a verifier id + timestamp. Capture an actual
-- signature so a signed-off test result is properly attested.
ALTER TABLE public.job_tests ADD COLUMN IF NOT EXISTS verified_signature text;
