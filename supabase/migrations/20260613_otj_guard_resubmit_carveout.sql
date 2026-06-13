-- ============================================================================
-- OTJ self-edit guard — resubmit carve-out + identity locks (APPLIED 2026-06-13)
--
-- Supersedes the function body shipped in 20260611_otj_self_verify_guard.sql.
-- That guard closed the self-verify hole but had NO carve-out for the
-- sanctioned rejected->pending resubmit, so OJTHub editAndResubmit raised in
-- production ("This OTJ entry has been reviewed and can no longer be edited").
--
-- This folds the verification-guard draft into the single live guard
-- (tg_guard_otj_self_edit / trigger trg_guard_otj_self_edit — one guard, one
-- owner). Changes vs the 0611 body:
--   * Sanctioned learner transition: rejected -> pending with the rationale
--     cleared (and nothing else) is allowed; remaining column guards still run.
--   * Staff check keyed on OLD.college_id (never NEW) so a learner who also
--     holds a staff row at ANY college can't rewrite college_id mid-UPDATE to
--     take the staff branch.
--   * Identity columns (student_id, college_id) locked from the learner side.
--   * Explicit owner check (OLD.student_id/recorded_by = auth.uid()) with a
--     final "not authorised" for anyone who is neither owner, staff, nor
--     service-role.
-- Service-role contexts (employer-attestation edge fn, crons) still pass
-- through on auth.uid() IS NULL, so attestation keeps working.
--
-- Rollback: CREATE OR REPLACE the function with the 0611 body (no carve-out,
-- staff check on NEW.college_id).
-- ============================================================================

CREATE OR REPLACE FUNCTION public.tg_guard_otj_self_edit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Service-role / definer contexts (employer-attestation edge fn, crons):
  -- auth.uid() is NULL there; the guard must not break attestation.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Staff at the entry's college: unrestricted (verification is their job).
  -- Key on OLD.college_id, never NEW.
  IF public._ch_same_college(OLD.college_id) THEN
    RETURN NEW;
  END IF;

  -- Learner editing their own entry.
  IF OLD.student_id = auth.uid() OR OLD.recorded_by = auth.uid() THEN
    -- Sanctioned transition: resubmitting a REJECTED entry back to pending
    -- (OJTHub editAndResubmit sets status='pending' + clears the rationale).
    IF OLD.verification_status = 'rejected'
       AND NEW.verification_status = 'pending'
       AND NEW.verification_rationale IS NULL THEN
      NULL; -- allowed; remaining column guards below still apply
    ELSE
      IF COALESCE(OLD.verification_status, 'pending') IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'This OTJ entry has been reviewed and can no longer be edited.'
          USING errcode = 'check_violation';
      END IF;
      IF NEW.verification_status    IS DISTINCT FROM OLD.verification_status    THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
      IF NEW.verification_rationale IS DISTINCT FROM OLD.verification_rationale THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    END IF;

    -- Verification / attestation / IQA columns are never learner-editable.
    IF NEW.verified_by           IS DISTINCT FROM OLD.verified_by           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.verified_at           IS DISTINCT FROM OLD.verified_at           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.attested_by_name      IS DISTINCT FROM OLD.attested_by_name      THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.attestation_email     IS DISTINCT FROM OLD.attestation_email     THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.attestation_comment   IS DISTINCT FROM OLD.attestation_comment   THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_sampled_by        IS DISTINCT FROM OLD.iqa_sampled_by        THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_sampled_at        IS DISTINCT FROM OLD.iqa_sampled_at        THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_verdict           IS DISTINCT FROM OLD.iqa_verdict           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_feedback          IS DISTINCT FROM OLD.iqa_feedback          THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.iqa_followup_required IS DISTINCT FROM OLD.iqa_followup_required THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.recorded_by           IS DISTINCT FROM OLD.recorded_by           THEN RAISE EXCEPTION 'You cannot change verification fields on your own OTJ entry.' USING errcode='check_violation'; END IF;

    -- Identity columns immutable from the learner side.
    IF NEW.student_id IS DISTINCT FROM OLD.student_id THEN RAISE EXCEPTION 'You cannot change identity fields on your own OTJ entry.' USING errcode='check_violation'; END IF;
    IF NEW.college_id IS DISTINCT FROM OLD.college_id THEN RAISE EXCEPTION 'You cannot change identity fields on your own OTJ entry.' USING errcode='check_violation'; END IF;

    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'not authorised to edit this OTJ entry' USING errcode = 'check_violation';
END;
$function$;
