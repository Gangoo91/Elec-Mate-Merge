-- ELE-1918: retire the duplicate schemas behind the one criterion model.
--
-- The truth for a criterion is get_portfolio_ac_state (claims, decisions,
-- typed criteria). These tables duplicated parts of it and nothing in the app
-- or in any deployed edge function reads or writes them any more:
--
--   unit_coverage_matrix          4 rows. Only reader was college_portfolio_summaries(), which nothing calls.
--   evidence_ksb_mapping          0 rows. No reader or writer anywhere.
--   college_ac_signoff_proposals  0 rows. Mastery proposals: no producer calls propose_ac_signoff, no
--                                 screen calls decide_ac_signoff (the queue screen was removed).
--   college_conversations         0 rows ever. Learner and tutor messages live in student_message_threads /
--                                 student_messages (ELE-1889); no screen creates a conversation here.
--   portfolio_evidence_files      never created. Its migration file (20260214) was never applied and is removed.
--
-- This migration is non-destructive: it labels the tables, stops app roles
-- writing them and stops the dead functions being called. The DROP lives in a
-- separate file (supabase/release-held/20261010169000_drop_retired_schemas_ele1918_DO_NOT_APPLY.sql) for Andrew to apply later.

comment on table public.unit_coverage_matrix is
  '[LEGACY — DO NOT USE] Per-unit coverage copy. Retired by ELE-1918 on 10 Oct 2026. Criterion state comes from get_portfolio_ac_state. Rule: no new reads or writes; due to be dropped.';
comment on table public.evidence_ksb_mapping is
  '[LEGACY — DO NOT USE] Evidence to KSB mapping, never used. Retired by ELE-1918 on 10 Oct 2026. Typed criteria live in portfolio_item_criteria. Rule: no new reads or writes; due to be dropped.';
comment on table public.college_ac_signoff_proposals is
  '[LEGACY — DO NOT USE] Mastery sign-off proposals with no producer. Retired by ELE-1918 on 10 Oct 2026. Criterion decisions go through record_ac_decisions. Rule: no new reads or writes; due to be dropped.';
comment on table public.college_conversations is
  '[LEGACY — DO NOT USE] Old college chat threads (0 rows). Retired by ELE-1918 on 10 Oct 2026. Learner and tutor messages live in student_message_threads / student_messages. Rule: no new reads or writes; due to be dropped.';

-- App roles can no longer write the retired tables. The service role and the
-- table owner keep full access until the drop.
revoke insert, update, delete on public.unit_coverage_matrix from anon, authenticated;
revoke insert, update, delete on public.evidence_ksb_mapping from anon, authenticated;
revoke insert, update, delete on public.college_ac_signoff_proposals from anon, authenticated;
revoke insert, update, delete on public.college_conversations from anon, authenticated;

-- The dead functions: nothing calls them. Revoked rather than dropped.
revoke execute on function public.propose_ac_signoff(uuid, uuid, text, text, text, uuid, numeric) from public, anon, authenticated;
revoke execute on function public.decide_ac_signoff(uuid, text, text) from public, anon, authenticated;
revoke execute on function public.college_portfolio_summaries() from public, anon, authenticated;

comment on function public.propose_ac_signoff(uuid, uuid, text, text, text, uuid, numeric) is
  '[LEGACY — DO NOT USE] Mastery proposal producer with no caller. Retired by ELE-1918.';
comment on function public.decide_ac_signoff(uuid, text, text) is
  '[LEGACY — DO NOT USE] Mastery proposal decision with no caller. Use record_ac_decisions. Retired by ELE-1918.';
comment on function public.college_portfolio_summaries() is
  '[LEGACY — DO NOT USE] Read unit_coverage_matrix; no caller. Retired by ELE-1918.';
