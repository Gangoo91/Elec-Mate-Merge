-- Follow-up to employer receipts: the employer's own mandatory posts don't
-- need the employer's signature (team signatures are per recipient), so they
-- must not sit in the "To sign" count. New posts self-acknowledge at insert;
-- this aligns history.
-- Rollback: none needed (data-only, derived state).

update public.employer_communications
  set employer_acknowledged_at = created_at
  where requires_acknowledgement and employer_acknowledged_at is null;
