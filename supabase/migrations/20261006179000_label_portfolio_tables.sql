-- Table labels (rule: .claude/rules/database.md — "every new table gets its label").
comment on table public.portfolio_assessment_decisions is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] One assessor decision per criterion (passed / referred / not_yet), append-only; a new decision supersedes the last; IQA verdict is the only editable field. Scope: learner_id = apprentice auth uid; written by anyone _can_assess(learner). Used by: LearnerAssessmentView (Student 360, /assessor, College area), get_portfolio_ac_state. Rule: never update or delete a decision; record a new one via record_ac_decisions().';
comment on table public.portfolio_witness_statements is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Witness statements signed from a token link with no account; evidence snapshot + hashes. Scope: learner_id = apprentice auth uid. Used by: College area (MyAssessmentCard), public /witness/:token. Rule: only sign_witness_statement() completes one; the learner may only withdraw an unsigned request.';
comment on table public.portfolio_assessor_links is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Independent assessors / IQAs / EPA assessors the apprentice invited, with or without a college. Scope: learner_id = apprentice; assessor_user_id once accepted. Used by: MyAssessmentCard, /assessor-invite/:token, /assessor, _can_assess(). Rule: only accept_assessor_invite() activates; the learner can revoke at any time.';
comment on table public.portfolio_submission_items is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Which evidence a submission covers. Scope: submission_id → portfolio_submissions (owner = apprentice). Used by: Submit for assessment, review queue, get_portfolio_ac_state (submitted state).';
comment on table public.calendar_feed_tokens is
  '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] Private iCal feed token per user (moved off profiles 6 Oct 2026, which every signed-in user can read). Scope: user_id. Used by: calendar-get-feed-url, calendar-ical-feed. Rule: service role only, no client policies.';
