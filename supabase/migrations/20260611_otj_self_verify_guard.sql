-- ============================================================================
-- College Hub — close the OTJ self-verification hole (live security finding).
--
-- BUG (verified live): the "Recorder can update OTJ entries" RLS policy has NO
-- WITH CHECK, so a learner (recorded_by = them) could UPDATE their own
-- college_otj_entries row to flip verification_status to 'verified', set
-- verified_by, or inflate duration_minutes after the fact — forging OTJ hours,
-- the core compliance signal the college/EPA/risk engine all trust.
--
-- FIX: a BEFORE UPDATE guard. Privileged actors pass through unchanged:
--   * service-role (employer attestation edge fn / system) — detected by
--     auth.uid() IS NULL (only a role that bypassed RLS reaches here null-uid)
--   * college staff — _ch_same_college(college_id)
-- The learner (the only remaining actor — RLS already limits UPDATE to the
-- recorder) may edit their own entry ONLY while it is still 'pending', and may
-- NEVER change verification / attestation / IQA / identity fields. Legit edits
-- (description, duration, date) on a pending draft are unaffected.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_guard_otj_self_edit()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  -- service-role / system, or college staff: unrestricted
  if auth.uid() is null or public._ch_same_college(new.college_id) then
    return new;
  end if;

  -- otherwise: the learner editing their own entry.
  -- (1) once reviewed (no longer 'pending') the learner can't edit it at all
  if coalesce(old.verification_status, 'pending') is distinct from 'pending' then
    raise exception 'This OTJ entry has been reviewed and can no longer be edited.'
      using errcode = 'check_violation';
  end if;

  -- (2) even while pending, verification / attestation / IQA / identity fields
  --     are off-limits to the learner
  if new.verification_status   is distinct from old.verification_status
     or new.verified_by        is distinct from old.verified_by
     or new.verified_at        is distinct from old.verified_at
     or new.verification_rationale is distinct from old.verification_rationale
     or new.attested_by_name   is distinct from old.attested_by_name
     or new.attestation_email  is distinct from old.attestation_email
     or new.attestation_comment is distinct from old.attestation_comment
     or new.iqa_sampled_by     is distinct from old.iqa_sampled_by
     or new.iqa_sampled_at     is distinct from old.iqa_sampled_at
     or new.iqa_verdict        is distinct from old.iqa_verdict
     or new.iqa_feedback       is distinct from old.iqa_feedback
     or new.iqa_followup_required is distinct from old.iqa_followup_required
     or new.recorded_by        is distinct from old.recorded_by then
    raise exception 'You cannot change verification or review fields on your own OTJ entry.'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$function$;

drop trigger if exists trg_guard_otj_self_edit on public.college_otj_entries;
create trigger trg_guard_otj_self_edit
  before update on public.college_otj_entries
  for each row
  execute function public.tg_guard_otj_self_edit();

revoke execute on function public.tg_guard_otj_self_edit() from anon, authenticated, public;

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_guard_otj_self_edit on public.college_otj_entries;
--   drop function if exists public.tg_guard_otj_self_edit();
-- ============================================================================
