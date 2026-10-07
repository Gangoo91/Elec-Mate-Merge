-- ELE-1895: a quiz attempt shows on the learner's "Comments & sign-offs" record.
--
-- The record lists tutor_quiz_attempts (the learner reads their own) with the
-- quiz title and pass mark from tutor_quizzes. A learner could only read a quiz
-- while it was published AND still assigned to them (by id or cohort), so an
-- attempt on a quiz later unpublished, or re-targeted at another cohort, showed
-- as "Quiz completed" with no title. A learner may now always read a quiz they
-- have an attempt on. The check runs in a definer helper because
-- tutor_quiz_attempts' own policies read tutor_quizzes (a direct EXISTS would
-- recurse). tutor_quiz_questions (the answer keys) are untouched.
begin;
set local lock_timeout = '5s';

create or replace function public._learner_attempted_quiz(p_quiz uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and exists (
    select 1 from public.tutor_quiz_attempts a
     where a.quiz_id = p_quiz and a.student_id = auth.uid());
$$;
revoke all on function public._learner_attempted_quiz(uuid) from public, anon;
grant execute on function public._learner_attempted_quiz(uuid) to authenticated;

drop policy if exists "Learner reads a quiz they attempted" on public.tutor_quizzes;
create policy "Learner reads a quiz they attempted" on public.tutor_quizzes
  for select to authenticated
  using (public._learner_attempted_quiz(id));

commit;
