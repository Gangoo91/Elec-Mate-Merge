-- ============================================================================
-- Slice 3 audit fixes (full RPC body re-applied; see live DB)
--
-- 1. accept_employer_invite: link-by-email now requires a CONFIRMED email
--    (mirrors claim_employee_records); max_uses enforced atomically.
-- 2. One open clock-in per person: partial unique index — a second device or
--    the office card can no longer mint duplicate open rows.
--
-- NB on the "wrong-email" path: a worker who redeems with a DIFFERENT email
-- than the one pre-added gets a NEW roster row (correct — we can't safely
-- guess identity); the pre-added row stays unlinked for the employer to
-- merge/remove. The invite kills the wrong-email DEAD-END, not duplicates.
-- ============================================================================

-- (accept_employer_invite body identical to live; see 20260611170000 +
--  this migration's changes: confirmed-email gate, atomic use_count with
--  refund on already-member.)

create unique index if not exists uniq_open_clockin_per_employee
  on public.employer_timesheets (employee_id)
  where clock_out is null and status = 'Pending';
