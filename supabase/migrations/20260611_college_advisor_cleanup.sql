-- ============================================================================
-- College Hub — advisor cleanup (caught by a holistic Supabase advisor pass).
--
-- 1. Drop 4 duplicate indexes: idx_csa_* on college_student_assignments are
--    identical to the pre-existing idx_assignments_* (added blind in the
--    identity-spine migration). The originals remain, so no read perf is lost.
-- 2. Revoke EXECUTE on the trigger functions so they aren't client-callable as
--    RPCs. They no-op outside a trigger (NEW is null), and revoking does NOT stop
--    the triggers firing — the trigger mechanism runs them regardless of the
--    session user's EXECUTE privilege.
--
-- Rollback at the bottom.
-- ============================================================================

drop index if exists public.idx_csa_tutor;
drop index if exists public.idx_csa_assessor;
drop index if exists public.idx_csa_iqa;
drop index if exists public.idx_csa_student;

revoke execute on function public.tg_notify_gateway_passed()       from anon, authenticated, public;
revoke execute on function public.tg_notify_grade_recorded()       from anon, authenticated, public;
revoke execute on function public.tg_notify_ilp_reviewed()         from anon, authenticated, public;
revoke execute on function public.tg_notify_submission_reviewed()  from anon, authenticated, public;
revoke execute on function public.tg_grant_assessor_iqa_flags()    from anon, authenticated, public;
revoke execute on function public.tg_sync_staff_profile()          from anon, authenticated, public;

-- ============================================================================
-- ROLLBACK (the indexes were redundant; re-granting execute is optional):
--   create index if exists public.idx_csa_tutor    on public.college_student_assignments (tutor_id);
--   create index if exists public.idx_csa_assessor on public.college_student_assignments (assessor_id);
--   create index if exists public.idx_csa_iqa      on public.college_student_assignments (iqa_id);
--   create index if exists public.idx_csa_student  on public.college_student_assignments (student_id);
-- ============================================================================
