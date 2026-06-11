-- ============================================================================
-- OTJ verification column guard
--
-- Hole (verified live 2026-06-11): the UPDATE policy on college_otj_entries
-- ("Recorder can update OTJ entries", USING recorded_by = auth.uid() OR
-- _ch_same_college, NO WITH CHECK) lets an apprentice update their own entry
-- to verification_status='verified', set verified_at, or inflate
-- duration_minutes after the fact. These are the ESFA-defensible hours.
--
-- Fix: BEFORE UPDATE column guard, mirroring _ilp_goals_learner_field_guard.
--   - service-role contexts (edge fns: ojt-employer-attest; crons) pass
--     through — auth.uid() is NULL there and triggers still fire for the
--     service role, so this branch keeps employer attestation working.
--   - college staff (_ch_same_college) pass through.
--   - the learner can edit their own entry ONLY while it is still pending,
--     and never the verification / attestation / IQA / identity columns.
--
-- Rollback:
--   DROP TRIGGER IF EXISTS trg_otj_learner_field_guard ON public.college_otj_entries;
--   DROP FUNCTION IF EXISTS public._otj_entries_learner_field_guard();
-- ============================================================================

CREATE OR REPLACE FUNCTION public._otj_entries_learner_field_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Service-role / definer contexts (employer attestation edge fn, crons):
  -- RLS is bypassed for them anyway; the guard must not break attestation.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Staff at the entry's college: unrestricted (verification is their job).
  -- OLD.college_id, never NEW: keying on NEW would let a learner who also
  -- holds a staff row at ANY college rewrite college_id in the same UPDATE
  -- and take this branch.
  IF public._ch_same_college(OLD.college_id) THEN
    RETURN NEW;
  END IF;

  -- Learner path: the apprentice editing their own entry.
  IF OLD.student_id = auth.uid() OR OLD.recorded_by = auth.uid() THEN
    -- Sanctioned learner transition: resubmitting a REJECTED entry back to
    -- pending (OJTHub editAndResubmit sets status='pending' + clears the
    -- rationale, nothing else). All other columns stay guarded below.
    IF OLD.verification_status = 'rejected'
       AND NEW.verification_status = 'pending'
       AND NEW.verification_rationale IS NULL THEN
      NULL; -- allowed — fall through to the remaining column guards
    ELSE
      -- A verified / otherwise closed entry is locked for the learner.
      IF OLD.verification_status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'verified OTJ entries are locked';
      END IF;
      IF NEW.verification_status    IS DISTINCT FROM OLD.verification_status    THEN RAISE EXCEPTION 'learner cannot edit: verification_status'; END IF;
      IF NEW.verification_rationale IS DISTINCT FROM OLD.verification_rationale THEN RAISE EXCEPTION 'learner cannot edit: verification_rationale'; END IF;
    END IF;

    -- Verification & attestation columns are never learner-editable.
    IF NEW.verified_by            IS DISTINCT FROM OLD.verified_by            THEN RAISE EXCEPTION 'learner cannot edit: verified_by'; END IF;
    IF NEW.verified_at            IS DISTINCT FROM OLD.verified_at            THEN RAISE EXCEPTION 'learner cannot edit: verified_at'; END IF;
    IF NEW.source_kind            IS DISTINCT FROM OLD.source_kind            THEN RAISE EXCEPTION 'learner cannot edit: source_kind'; END IF;
    IF NEW.source                 IS DISTINCT FROM OLD.source                 THEN RAISE EXCEPTION 'learner cannot edit: source'; END IF;
    IF NEW.attested_by_name       IS DISTINCT FROM OLD.attested_by_name       THEN RAISE EXCEPTION 'learner cannot edit: attested_by_name'; END IF;
    IF NEW.attestation_email      IS DISTINCT FROM OLD.attestation_email      THEN RAISE EXCEPTION 'learner cannot edit: attestation_email'; END IF;
    IF NEW.attestation_comment    IS DISTINCT FROM OLD.attestation_comment    THEN RAISE EXCEPTION 'learner cannot edit: attestation_comment'; END IF;
    IF NEW.iqa_sampled_by         IS DISTINCT FROM OLD.iqa_sampled_by         THEN RAISE EXCEPTION 'learner cannot edit: iqa_sampled_by'; END IF;
    IF NEW.iqa_sampled_at         IS DISTINCT FROM OLD.iqa_sampled_at         THEN RAISE EXCEPTION 'learner cannot edit: iqa_sampled_at'; END IF;
    IF NEW.iqa_verdict            IS DISTINCT FROM OLD.iqa_verdict            THEN RAISE EXCEPTION 'learner cannot edit: iqa_verdict'; END IF;
    IF NEW.iqa_feedback           IS DISTINCT FROM OLD.iqa_feedback           THEN RAISE EXCEPTION 'learner cannot edit: iqa_feedback'; END IF;
    IF NEW.iqa_followup_required  IS DISTINCT FROM OLD.iqa_followup_required  THEN RAISE EXCEPTION 'learner cannot edit: iqa_followup_required'; END IF;

    -- Identity columns are immutable from the learner side.
    IF NEW.student_id  IS DISTINCT FROM OLD.student_id  THEN RAISE EXCEPTION 'learner cannot edit: student_id'; END IF;
    IF NEW.recorded_by IS DISTINCT FROM OLD.recorded_by THEN RAISE EXCEPTION 'learner cannot edit: recorded_by'; END IF;
    IF NEW.college_id  IS DISTINCT FROM OLD.college_id  THEN RAISE EXCEPTION 'learner cannot edit: college_id'; END IF;

    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'not authorised';
END;
$$;

DROP TRIGGER IF EXISTS trg_otj_learner_field_guard ON public.college_otj_entries;
CREATE TRIGGER trg_otj_learner_field_guard
  BEFORE UPDATE ON public.college_otj_entries
  FOR EACH ROW
  EXECUTE FUNCTION public._otj_entries_learner_field_guard();
