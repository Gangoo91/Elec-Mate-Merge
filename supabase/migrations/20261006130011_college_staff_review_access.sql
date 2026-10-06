-- ============================================================================
-- College Hub — tutor review access to a learner's portfolio submissions
-- (6 Oct 2026)
--
-- Verified live: the existing staff SELECT/UPDATE policies on
-- portfolio_submissions either require a college_student_assignments row
-- (assessor_id / tutor_id / iqa_id), or join `profiles student.college_id`,
-- which LEARNERS NEVER HAVE (students deliberately get no profiles.college_id).
-- So an unassigned tutor at the learner's own college could not see or review
-- anything a learner submitted. Same shape for portfolio_comments.
--
-- These policies are additive and scoped through the college roll:
--   staff (college_staff, not archived) at the learner's college
--   (college_students.user_id = submission.user_id).
-- ============================================================================

drop policy if exists "Staff at learner's college read submissions" on public.portfolio_submissions;
create policy "Staff at learner's college read submissions"
  on public.portfolio_submissions
  for select
  to authenticated
  using (
    exists (
      select 1
        from public.college_students cs
        join public.college_staff st on st.college_id = cs.college_id
       where cs.user_id = portfolio_submissions.user_id
         and st.user_id = (select auth.uid())
         and st.archived_at is null
    )
  );

drop policy if exists "Staff at learner's college review submissions" on public.portfolio_submissions;
create policy "Staff at learner's college review submissions"
  on public.portfolio_submissions
  for update
  to authenticated
  using (
    exists (
      select 1
        from public.college_students cs
        join public.college_staff st on st.college_id = cs.college_id
       where cs.user_id = portfolio_submissions.user_id
         and st.user_id = (select auth.uid())
         and st.archived_at is null
    )
  )
  with check (
    exists (
      select 1
        from public.college_students cs
        join public.college_staff st on st.college_id = cs.college_id
       where cs.user_id = portfolio_submissions.user_id
         and st.user_id = (select auth.uid())
         and st.archived_at is null
    )
  );

drop policy if exists "Staff at learner's college view portfolio comments" on public.portfolio_comments;
create policy "Staff at learner's college view portfolio comments"
  on public.portfolio_comments
  for select
  to authenticated
  using (
    exists (
      select 1
        from public.college_students cs
        join public.college_staff st on st.college_id = cs.college_id
       where cs.user_id = portfolio_comments.user_id
         and st.user_id = (select auth.uid())
         and st.archived_at is null
    )
  );

drop policy if exists "Staff at learner's college post portfolio comments" on public.portfolio_comments;
create policy "Staff at learner's college post portfolio comments"
  on public.portfolio_comments
  for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and exists (
      select 1
        from public.college_students cs
        join public.college_staff st on st.college_id = cs.college_id
       where cs.user_id = portfolio_comments.user_id
         and st.user_id = (select auth.uid())
         and st.archived_at is null
    )
  );
