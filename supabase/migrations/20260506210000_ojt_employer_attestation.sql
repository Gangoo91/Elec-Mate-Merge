-- ELE-OJT-EMP / Employer attestation columns on college_otj_entries.
--
-- The apprentice generates an unguessable attestation URL and shares it
-- with their on-site supervisor. The supervisor opens the public page,
-- types their name + email, and the row flips to source_kind=
-- 'employer_attested' / verification_status='verified_by_employer'.
--
-- Captures who attested and when so the audit trail stands up to ESFA /
-- Ofsted / EPAO scrutiny without the apprentice needing to upload a
-- paper signature.

ALTER TABLE public.college_otj_entries
  ADD COLUMN IF NOT EXISTS attested_by_name text,
  ADD COLUMN IF NOT EXISTS attestation_email text;

COMMENT ON COLUMN public.college_otj_entries.attested_by_name IS
  'Snapshot of the supervisor''s name from the public attestation form. Set when source_kind=employer_attested.';

COMMENT ON COLUMN public.college_otj_entries.attestation_email IS
  'Snapshot of the supervisor''s email from the public attestation form. Used for audit trail.';

-- Index on attestation_email for tutor-side audit reports if needed.
CREATE INDEX IF NOT EXISTS idx_college_otj_entries_attestation_email
  ON public.college_otj_entries (attestation_email)
  WHERE attestation_email IS NOT NULL;
