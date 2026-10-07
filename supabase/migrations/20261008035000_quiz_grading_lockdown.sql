-- ============================================================================
-- Quiz grading lockdown (stage 2 of server-side grading), adapted 7 Oct 2026
-- from supabase/migrations/pending/20260612_quiz_grading_lockdown.sql.
--
-- Live hole closed here: an assigned learner could read answer keys from
-- tutor_quiz_questions over REST, and write score / completed_at / answers on
-- their own tutor_quiz_attempts row (policy student_own_attempts, cmd ALL).
--
-- The client has used the server-grading RPCs (get_quiz_questions_for_learner,
-- reveal_quiz_answer, submit_quiz_attempt, get_attempt_review) since 12 June.
--
-- Composes with 20261008032000_quiz_loop_notifications.sql:
--   * staff policies (_can_view_tutor_quiz / _can_manage_tutor_quiz) and the
--     creator policies are untouched;
--   * trg_tutor_quiz_attempt_notify (AFTER UPDATE) still fires — the guard
--     below is BEFORE UPDATE and lets submit_quiz_attempt through via the
--     app.quiz_submit GUC; staff re-tallies (auth.uid() <> student) and
--     service-role edge functions (auth.uid() null) are never blocked.
--
-- 1. Learners lose direct SELECT on tutor_quiz_questions.
-- 2. student_own_attempts (ALL) -> explicit SELECT / INSERT / UPDATE.
--    INSERT only for a published quiz the learner is assigned to, with a
--    clean slate (score 0, answers {}, not completed). No DELETE.
-- 3. BEFORE UPDATE column guard: learners cannot change graded fields.
-- 4. Learner INSERT on tutor_quiz_answer_grades dropped (only the removed
--    client fallback used it; submit_quiz_attempt inserts as definer).
-- 5. get_my_quiz_totals(uuid[]) — question count + points for the learner's
--    assigned quizzes, replacing the direct question read in
--    useMyAssignedQuizzes.
--
-- Rollback: see the pending file's rollback block, plus
--   create policy "Learner queues own ungraded answers" ... (see git history)
--   drop function public.get_my_quiz_totals(uuid[]);
--   drop function public._learner_assigned_to_quiz(uuid);
-- ============================================================================

-- Shared assignment rule (same as get_quiz_questions_for_learner /
-- reveal_quiz_answer): published, and assigned directly or via cohort, or the
-- caller created it (owner preview).
create or replace function public._learner_assigned_to_quiz(p_quiz uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select auth.uid() is not null and exists (
    select 1 from public.tutor_quizzes q
     where q.id = p_quiz
       and q.is_published = true
       and (
         auth.uid() = any (coalesce(q.assigned_student_ids, array[]::uuid[]))
         or q.cohort_id in (select cs.cohort_id from public.college_students cs
                             where cs.user_id = auth.uid() and cs.cohort_id is not null)
         or q.creator_id = auth.uid()
       )
  );
$$;
revoke all on function public._learner_assigned_to_quiz(uuid) from public, anon;
grant execute on function public._learner_assigned_to_quiz(uuid) to authenticated;

-- 1. Learners read questions through the sanitised RPC only.
drop policy if exists "Assigned learner can read quiz questions" on public.tutor_quiz_questions;

-- 2. Attempts: replace the blanket learner policy.
drop policy if exists student_own_attempts on public.tutor_quiz_attempts;
drop policy if exists student_read_own_attempts on public.tutor_quiz_attempts;
drop policy if exists student_start_own_attempt on public.tutor_quiz_attempts;
drop policy if exists student_autosave_own_attempt on public.tutor_quiz_attempts;

create policy student_read_own_attempts on public.tutor_quiz_attempts
  for select to authenticated
  using (student_id = auth.uid());

-- score / total_points are NOT NULL; the client inserts score 0 and answers {}.
create policy student_start_own_attempt on public.tutor_quiz_attempts
  for insert to authenticated
  with check (
    student_id = auth.uid()
    and completed_at is null
    and score = 0
    and answers = '{}'::jsonb
    and public._learner_assigned_to_quiz(quiz_id)
  );

-- Kept at policy level so a stray direct PATCH fails loudly in the trigger
-- (not as a silent zero-row update). Every meaningful column is guarded.
create policy student_autosave_own_attempt on public.tutor_quiz_attempts
  for update to authenticated
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

-- 3. Column guard.
create or replace function public._quiz_attempts_learner_guard()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  -- Trusted: service role / crons (no auth.uid()) and the grading RPCs.
  if auth.uid() is null then
    return new;
  end if;
  if current_setting('app.quiz_submit', true) = '1' then
    return new;
  end if;

  if old.student_id = auth.uid() then
    if old.completed_at is not null then
      raise exception 'attempt already submitted';
    end if;
    -- Answers go through reveal_quiz_answer (locks each question once answered).
    if new.answers            is distinct from old.answers            then raise exception 'learner cannot edit: answers (use reveal_quiz_answer)'; end if;
    if new.score              is distinct from old.score              then raise exception 'learner cannot edit: score'; end if;
    if new.total_points       is distinct from old.total_points       then raise exception 'learner cannot edit: total_points'; end if;
    if new.completed_at       is distinct from old.completed_at       then raise exception 'learner cannot edit: completed_at'; end if;
    if new.time_taken_seconds is distinct from old.time_taken_seconds then raise exception 'learner cannot edit: time_taken_seconds'; end if;
    if new.started_at         is distinct from old.started_at         then raise exception 'learner cannot edit: started_at'; end if;
    if new.student_id         is distinct from old.student_id         then raise exception 'learner cannot edit: student_id'; end if;
    if new.quiz_id            is distinct from old.quiz_id            then raise exception 'learner cannot edit: quiz_id'; end if;
    if new.created_at         is distinct from old.created_at         then raise exception 'learner cannot edit: created_at'; end if;
  end if;
  return new; -- staff paths are governed by their own policies / definer fns
end;
$$;
revoke all on function public._quiz_attempts_learner_guard() from public, anon, authenticated;

drop trigger if exists trg_quiz_attempts_learner_guard on public.tutor_quiz_attempts;
create trigger trg_quiz_attempts_learner_guard
  before update on public.tutor_quiz_attempts
  for each row execute function public._quiz_attempts_learner_guard();

-- 4. Learners no longer queue grade rows themselves.
drop policy if exists "Learner queues own ungraded answers" on public.tutor_quiz_answer_grades;

-- 5. Totals for the learner's own quiz list (no answer keys).
create or replace function public.get_my_quiz_totals(p_quiz_ids uuid[])
returns table(quiz_id uuid, question_count integer, total_points integer)
language sql
stable
security definer
set search_path to 'public'
as $$
  select qq.quiz_id,
         count(*)::int as question_count,
         coalesce(sum(coalesce(qq.points, 1)), 0)::int as total_points
    from public.tutor_quiz_questions qq
   where auth.uid() is not null
     and qq.quiz_id = any (coalesce(p_quiz_ids, array[]::uuid[]))
     and public._learner_assigned_to_quiz(qq.quiz_id)
   group by qq.quiz_id;
$$;
revoke all on function public.get_my_quiz_totals(uuid[]) from public, anon;
grant execute on function public.get_my_quiz_totals(uuid[]) to authenticated;

comment on function public.get_my_quiz_totals(uuid[]) is
  'Learner quiz list: question count + total points per quiz, only for published quizzes the caller is assigned to (directly, via cohort, or as creator). No answer keys.';
