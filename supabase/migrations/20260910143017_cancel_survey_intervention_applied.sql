-- What the retention flow ACTUALLY applied, as opposed to what it offered.
-- `offered_intervention` records the pitch; nothing recorded the outcome's
-- shape, so a save could not be told from a pause and a 40% coupon could not
-- be told from the old £2-off one. Nullable: rows written before this exist.
alter table public.cancel_survey_responses
  add column if not exists intervention_applied jsonb;

comment on column public.cancel_survey_responses.intervention_applied is
  'What was applied when the user stayed: {kind:"discount"|"pause", coupon_id, percent_off, pause_months, resumes_at}. Null when they cancelled or are still pending.';

-- `outcome` gains "paused" alongside pending/stayed/cancelled. There is no
-- check constraint on the column, so this is documentation rather than DDL —
-- recorded here so the vocabulary has one written source.
comment on column public.cancel_survey_responses.outcome is
  'pending | stayed | paused | cancelled. "paused" means billing is voided until resumes_at, not that they left.';
