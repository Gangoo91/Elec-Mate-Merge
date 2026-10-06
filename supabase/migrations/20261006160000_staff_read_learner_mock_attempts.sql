-- ELE-1763: tutors see their learners' own mock exam attempts.
-- Read-only, additive. Only in-app attempts by a signed-in learner who is on
-- the staff member's college roll; the anonymous public-page rows stay hidden.
drop policy if exists "College staff read their learners' in-app mock attempts" on public.seo_mock_attempts;
create policy "College staff read their learners' in-app mock attempts"
  on public.seo_mock_attempts
  for select
  to authenticated
  using (
    source = 'in_app'
    and user_id is not null
    and public.is_staff_for_learner_user(user_id)
  );

create index if not exists seo_mock_attempts_user_created_idx
  on public.seo_mock_attempts (user_id, created_at desc)
  where user_id is not null;
