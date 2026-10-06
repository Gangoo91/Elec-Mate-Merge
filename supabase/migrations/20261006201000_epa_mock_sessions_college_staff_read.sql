-- EPA mock sessions: college staff can read their learners' sittings.
-- Applied 6 Oct 2026 with Andrew's approval (EPA readiness rebuild).
-- Staff SELECT was assignment-only, so Student 360's mock list was empty for
-- a tutor at the learner's college who wasn't formally assigned — while AM2
-- practice, AC coverage, sign-offs and the gateway row were all readable.
-- Additive; mirrors am2_mock_sessions (20261006140000).
drop policy if exists "College staff read learner EPA mocks" on public.epa_mock_sessions;
create policy "College staff read learner EPA mocks"
  on public.epa_mock_sessions for select to authenticated
  using (public.is_staff_for_learner_user(user_id));
