-- ELE-1895 — Quiz loop: set → taken → result to the tutor → marked → result to
-- the learner, with a push (and a bell row) each way, and college-wide read
-- access for staff.
--
-- 1. notification_types: quiz_set, quiz_submitted, quiz_marked, quiz_ai_marked
--    (category 'apprentice', push on). All four go through notify_user(), so
--    each writes the bell (user_notifications), pushes when the person has a
--    device, and logs push_notification_log.
-- 2. College staff read their college's quizzes, questions, attempts and
--    grades READ-ONLY (the College Quizzes page said "Quiz not found" for any
--    quiz another tutor set). Only the creator, a college admin / head of
--    department, or a platform admin edits.
-- 3. Triggers (server-side, so every publish path is covered: the create
--    sheet, the detail page's Publish toggle, the document importer and the
--    authoring function, plus "Set again"):
--      tutor_quizzes published        → learner(s): quiz_set
--      tutor_quiz_attempts submitted  → quiz creator: quiz_submitted
--      tutor_quiz_attempts re-tallied with every written answer tutor-marked
--                                     → learner: quiz_marked (final result)
-- 4. reissue_tutor_quiz(): "Set this quiz again" to a cohort with a new due
--    date (copies the questions; the publish trigger sends the pushes).
-- 5. get_attempt_review(): adds each written answer's mark + feedback and the
--    attempt's marking state, so the learner sees the tutor's final result.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Notification types
-- ─────────────────────────────────────────────────────────────────────────────
insert into public.notification_types (type, category, push, importance)
values
  ('quiz_set',       'apprentice', true, 1),
  ('quiz_submitted', 'apprentice', true, 1),
  ('quiz_marked',    'apprentice', true, 1),
  ('quiz_ai_marked', 'apprentice', true, 1)
on conflict (type) do update
  set category = excluded.category, push = excluded.push, importance = excluded.importance,
      updated_at = now();

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Which colleges a quiz belongs to, and who may see / manage it
-- ─────────────────────────────────────────────────────────────────────────────
-- A quiz has no college_id. It belongs to the college of its cohort; with no
-- cohort, to the colleges of its assigned learners; failing that, to the
-- colleges where its creator is staff.
create or replace function public._tutor_quiz_colleges(p_quiz uuid)
returns setof uuid
language sql
stable
security definer
set search_path to 'public'
as $function$
  with q as (
    select creator_id, cohort_id, coalesce(assigned_student_ids, '{}'::uuid[]) as assigned
    from public.tutor_quizzes where id = p_quiz
  )
  select c.college_id
    from q join public.college_cohorts c on c.id = q.cohort_id
  union
  select s.college_id
    from q join public.college_students s on s.user_id = any (q.assigned)
   where q.cohort_id is null
  union
  select st.college_id
    from q join public.college_staff st on st.user_id = q.creator_id and st.archived_at is null
   where q.cohort_id is null and cardinality(q.assigned) = 0;
$function$;

create or replace function public._can_view_tutor_quiz(p_quiz uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select auth.uid() is not null and (
       exists (select 1 from public.tutor_quizzes q where q.id = p_quiz and q.creator_id = auth.uid())
    or public._is_platform_admin()
    or exists (
         select 1
           from public._tutor_quiz_colleges(p_quiz) c(college_id)
           join public.college_staff st on st.college_id = c.college_id
          where st.user_id = auth.uid() and st.archived_at is null
       )
  );
$function$;

create or replace function public._can_manage_tutor_quiz(p_quiz uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select auth.uid() is not null and (
       exists (select 1 from public.tutor_quizzes q where q.id = p_quiz and q.creator_id = auth.uid())
    or public._is_platform_admin()
    or exists (
         select 1
           from public._tutor_quiz_colleges(p_quiz) c(college_id)
           join public.college_staff st on st.college_id = c.college_id
          where st.user_id = auth.uid() and st.archived_at is null
            and lower(coalesce(st.role, '')) in ('admin', 'head_of_department')
       )
  );
$function$;

revoke all on function public._tutor_quiz_colleges(uuid) from public, anon;
revoke all on function public._can_view_tutor_quiz(uuid) from public, anon;
revoke all on function public._can_manage_tutor_quiz(uuid) from public, anon;
grant execute on function public._tutor_quiz_colleges(uuid) to authenticated;
grant execute on function public._can_view_tutor_quiz(uuid) to authenticated;
grant execute on function public._can_manage_tutor_quiz(uuid) to authenticated;

-- tutor_quizzes
drop policy if exists "College staff read their college quizzes" on public.tutor_quizzes;
create policy "College staff read their college quizzes" on public.tutor_quizzes
  for select to authenticated
  using (public._can_view_tutor_quiz(id));

drop policy if exists "College admins update their college quizzes" on public.tutor_quizzes;
create policy "College admins update their college quizzes" on public.tutor_quizzes
  for update to authenticated
  using (public._can_manage_tutor_quiz(id))
  with check (public._can_manage_tutor_quiz(id));

drop policy if exists "College admins delete their college quizzes" on public.tutor_quizzes;
create policy "College admins delete their college quizzes" on public.tutor_quizzes
  for delete to authenticated
  using (public._can_manage_tutor_quiz(id));

-- tutor_quiz_questions
drop policy if exists "College staff read their college quiz questions" on public.tutor_quiz_questions;
create policy "College staff read their college quiz questions" on public.tutor_quiz_questions
  for select to authenticated
  using (public._can_view_tutor_quiz(quiz_id));

drop policy if exists "College admins manage their college quiz questions" on public.tutor_quiz_questions;
create policy "College admins manage their college quiz questions" on public.tutor_quiz_questions
  for all to authenticated
  using (public._can_manage_tutor_quiz(quiz_id))
  with check (public._can_manage_tutor_quiz(quiz_id));

-- tutor_quiz_attempts (read-only for staff; learners keep their own policy)
drop policy if exists "College staff read their college quiz attempts" on public.tutor_quiz_attempts;
create policy "College staff read their college quiz attempts" on public.tutor_quiz_attempts
  for select to authenticated
  using (public._can_view_tutor_quiz(quiz_id));

-- tutor_quiz_answer_grades
drop policy if exists "College staff read their college quiz grades" on public.tutor_quiz_answer_grades;
create policy "College staff read their college quiz grades" on public.tutor_quiz_answer_grades
  for select to authenticated
  using (exists (select 1 from public.tutor_quiz_attempts a
                  where a.id = tutor_quiz_answer_grades.attempt_id
                    and public._can_view_tutor_quiz(a.quiz_id)));

drop policy if exists "College admins mark their college quiz grades" on public.tutor_quiz_answer_grades;
create policy "College admins mark their college quiz grades" on public.tutor_quiz_answer_grades
  for update to authenticated
  using (exists (select 1 from public.tutor_quiz_attempts a
                  where a.id = tutor_quiz_answer_grades.attempt_id
                    and public._can_manage_tutor_quiz(a.quiz_id)))
  with check (exists (select 1 from public.tutor_quiz_attempts a
                  where a.id = tutor_quiz_answer_grades.attempt_id
                    and public._can_manage_tutor_quiz(a.quiz_id)));

-- ─────────────────────────────────────────────────────────────────────────────
-- 3a. Quiz published → each learner it is for
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public._tq_kind_label(p_kind text)
returns text language sql immutable set search_path to 'public' as $$
  select case p_kind when 'assessment' then 'assessment' when 'mock_exam' then 'mock exam' else 'quiz' end;
$$;

create or replace function public._tq_due_label(p_due date)
returns text language sql immutable set search_path to 'public' as $$
  select case when p_due is null then null else trim(to_char(p_due, 'Dy FMDD Mon')) end;
$$;

create or replace function public.tg_tutor_quiz_notify_set()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid;
  v_tutor text;
  v_kind text := public._tq_kind_label(new.kind);
  v_due text := public._tq_due_label(new.due_date);
begin
  if new.is_published is not true then return new; end if;
  if tg_op = 'UPDATE' and old.is_published is true then return new; end if;

  begin
    select nullif(split_part(coalesce(p.full_name, ''), ' ', 1), '') into v_tutor
      from public.profiles p where p.id = new.creator_id;

    for v_uid in
      select x.uid from (
        select unnest(coalesce(new.assigned_student_ids, '{}'::uuid[])) as uid
        union
        select cs.user_id
          from public.college_students cs
         where new.cohort_id is not null
           and cs.cohort_id = new.cohort_id
           and cs.user_id is not null
           and lower(coalesce(cs.status, 'active')) not in ('withdrawn', 'completed', 'archived', 'left', 'transferred')
      ) x
      where x.uid is not null and x.uid is distinct from new.creator_id
    loop
      -- One bell row per learner per quiz, even if it is unpublished and
      -- published again.
      if exists (select 1 from public.user_notifications n
                  where n.user_id = v_uid and n.type = 'quiz_set'
                    and n.metadata->>'quiz_id' = new.id::text) then
        continue;
      end if;
      perform public.notify_user(
        v_uid,
        'quiz_set',
        'New ' || v_kind || ': ' || new.title,
        coalesce(v_tutor, 'Your tutor') || ' set this for you'
          || coalesce(', due ' || v_due, '') || '. Tap to start.',
        jsonb_build_object(
          'route', '/apprentice/college/quiz/' || new.id,
          'ref_id', new.id::text,
          'quiz_id', new.id,
          'due_date', new.due_date,
          'kind', 'tutor_quiz_assigned',
          'push_type', 'college'
        )
      );
    end loop;
  exception when others then
    raise warning '[tg_tutor_quiz_notify_set] %: %', new.id, sqlerrm;
  end;
  return new;
end;
$function$;

drop trigger if exists trg_tutor_quiz_notify_set on public.tutor_quizzes;
create trigger trg_tutor_quiz_notify_set
  after insert or update of is_published on public.tutor_quizzes
  for each row execute function public.tg_tutor_quiz_notify_set();

-- ─────────────────────────────────────────────────────────────────────────────
-- 3b. Attempt submitted → the tutor who set it
-- 3c. Every written answer tutor-marked and the attempt re-tallied → learner
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.tg_tutor_quiz_attempt_notify()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  q record;
  v_name text;
  v_pending int;
  v_unmarked int;
  v_pct int;
  v_result text;
  v_uid uuid;
begin
  if new.completed_at is null then return new; end if;

  begin
    select id, title, creator_id, pass_mark, cohort_id, kind into q
      from public.tutor_quizzes where id = new.quiz_id;
    if q.id is null then return new; end if;

    v_pct := case when coalesce(new.total_points, 0) > 0
                  then round(new.score::numeric * 100 / new.total_points)::int end;
    v_result := coalesce(v_pct || '% (' || coalesce(new.score, 0) || ' of ' || new.total_points || ')', 'Score saved')
      || case when v_pct is not null and q.pass_mark is not null
              then case when v_pct >= q.pass_mark then ', passed' else ', below the ' || q.pass_mark || '% pass mark' end
              else '' end;

    select count(*), count(*) filter (where g.tutor_override_score is null)
      into v_pending, v_unmarked
      from public.tutor_quiz_answer_grades g where g.attempt_id = new.id;

    -- 3b. Just submitted.
    if tg_op = 'UPDATE' and old.completed_at is null then
      select coalesce(nullif(cs.name, ''), nullif(p.full_name, ''), 'A learner') into v_name
        from (select 1) one
        left join lateral (select s.name from public.college_students s
                            where s.user_id = new.student_id order by s.created_at desc limit 1) cs on true
        left join public.profiles p on p.id = new.student_id;

      for v_uid in
        select u from (
          select q.creator_id as u
          union
          -- Nobody set it (or the creator left): the learner's own tutors.
          select t from public._learner_tutor_uids(new.student_id) t
           where q.creator_id is null
              or not exists (select 1 from public.college_staff st
                              where st.user_id = q.creator_id and st.archived_at is null)
        ) r where u is not null and u <> new.student_id
      loop
        perform public.notify_user(
          v_uid,
          'quiz_submitted',
          v_name || ' finished ' || q.title,
          case when v_pending > 0
               then v_pending || ' written ' || case when v_pending = 1 then 'answer' else 'answers' end
                    || ' to mark. '
                    || coalesce(new.score, 0) || ' of ' || coalesce(new.total_points, 0) || ' so far.'
               else v_result || '.' end,
          jsonb_build_object(
            'route', '/college/marking?attempt=' || new.id,
            'ref_id', new.id::text,
            'attempt_id', new.id,
            'quiz_id', q.id,
            'needs_marking', v_pending > 0,
            'push_type', 'college'
          )
        );
      end loop;
      return new;
    end if;

    -- 3c. Re-tallied after marking: every written answer has a tutor mark.
    -- One push per final result: a later re-mark that changes the score
    -- sends a fresh one; a re-tally with the same score does not.
    if v_pending > 0 and v_unmarked = 0
       and not exists (select 1 from public.user_notifications n
                        where n.user_id = new.student_id and n.type = 'quiz_marked'
                          and n.metadata->>'attempt_id' = new.id::text
                          and n.metadata->>'score' = coalesce(new.score, 0)::text
                          and n.metadata->>'total_points' = coalesce(new.total_points, 0)::text) then
      perform public.notify_user(
        new.student_id,
        'quiz_marked',
        'Marked: ' || q.title,
        'Your tutor marked your written answers. Final result ' || v_result || '. Tap to see the feedback.',
        jsonb_build_object(
          'route', '/apprentice/college/quiz/' || q.id,
          'ref_id', new.id::text || ':' || coalesce(new.score, 0),
          'attempt_id', new.id,
          'quiz_id', q.id,
          'score', coalesce(new.score, 0)::text,
          'total_points', coalesce(new.total_points, 0)::text,
          'push_type', 'college'
        )
      );
    end if;
  exception when others then
    raise warning '[tg_tutor_quiz_attempt_notify] %: %', new.id, sqlerrm;
  end;
  return new;
end;
$function$;

drop trigger if exists trg_tutor_quiz_attempt_notify on public.tutor_quiz_attempts;
create trigger trg_tutor_quiz_attempt_notify
  after update of completed_at, score, total_points on public.tutor_quiz_attempts
  for each row execute function public.tg_tutor_quiz_attempt_notify();

revoke all on function public.tg_tutor_quiz_notify_set() from public, anon, authenticated;
revoke all on function public.tg_tutor_quiz_attempt_notify() from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Set this quiz again
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.reissue_tutor_quiz(
  p_quiz_id uuid,
  p_cohort_id uuid default null,
  p_due_date date default null
)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  src public.tutor_quizzes;
  v_cohort uuid;
  v_college uuid;
  v_new uuid;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  select * into src from public.tutor_quizzes where id = p_quiz_id;
  if src.id is null or not public._can_view_tutor_quiz(p_quiz_id) then
    raise exception 'quiz not found';
  end if;

  v_cohort := coalesce(p_cohort_id, src.cohort_id);
  if v_cohort is not null then
    select college_id into v_college from public.college_cohorts where id = v_cohort;
    if v_college is null or not exists (
         select 1 from public.college_staff st
          where st.user_id = auth.uid() and st.college_id = v_college and st.archived_at is null) then
      raise exception 'cohort not in your college';
    end if;
  elsif not exists (select 1 from public.college_staff st where st.user_id = auth.uid() and st.archived_at is null) then
    raise exception 'college staff only';
  end if;

  if p_due_date is not null and p_due_date < (now() at time zone 'Europe/London')::date then
    raise exception 'due date is in the past';
  end if;

  -- Insert as a draft, copy the questions, then publish — so the publish
  -- trigger fires once, with the questions in place.
  insert into public.tutor_quizzes (
    creator_id, title, description, topic, difficulty, time_limit_minutes, pass_mark,
    is_published, cohort_id, qualification_code, lesson_plan_id, due_date, is_homework,
    assigned_student_ids, source, ai_signals_used, kind, source_document_id, rubric, instructions
  ) values (
    auth.uid(), src.title, src.description, src.topic, src.difficulty, src.time_limit_minutes, src.pass_mark,
    false, v_cohort, src.qualification_code,
    case when v_cohort is not distinct from src.cohort_id then src.lesson_plan_id end,
    p_due_date, src.is_homework,
    case when v_cohort is null then src.assigned_student_ids else '{}'::uuid[] end,
    src.source, src.ai_signals_used, src.kind, src.source_document_id, src.rubric, src.instructions
  ) returning id into v_new;

  insert into public.tutor_quiz_questions (
    quiz_id, question_text, options, correct_answer_index, explanation, category, difficulty,
    ac_ref, points, sort_order, bs7671_citations, ksb_refs, question_kind, expected_answer, marking_guidance
  )
  select v_new, question_text, options, correct_answer_index, explanation, category, difficulty,
         ac_ref, points, sort_order, bs7671_citations, ksb_refs, question_kind, expected_answer, marking_guidance
    from public.tutor_quiz_questions where quiz_id = p_quiz_id;

  update public.tutor_quizzes set is_published = true, published_at = now() where id = v_new;
  return v_new;
end;
$function$;

revoke all on function public.reissue_tutor_quiz(uuid, uuid, date) from public, anon;
grant execute on function public.reissue_tutor_quiz(uuid, uuid, date) to authenticated;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. get_attempt_review — add marks + feedback for written answers
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.get_attempt_review(p_attempt_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_attempt record;
  q public.tutor_quiz_questions;
  g record;
  v_answers jsonb;
  v_items jsonb := '[]'::jsonb;
  v_n int := 0;
  v_ai int := 0;
  v_tutor int := 0;
  v_marked_at timestamptz;
begin
  select * into v_attempt from public.tutor_quiz_attempts where id = p_attempt_id;
  if v_attempt.id is null or v_attempt.student_id is distinct from auth.uid() then
    raise exception 'attempt not found';
  end if;
  if v_attempt.completed_at is null then
    raise exception 'attempt not yet submitted';
  end if;

  v_answers := case when jsonb_typeof(v_attempt.answers) = 'object'
                    then v_attempt.answers else '{}'::jsonb end;

  for q in
    select * from public.tutor_quiz_questions where quiz_id = v_attempt.quiz_id
  loop
    select ai_score, ai_rationale, tutor_override_score, tutor_override_rationale, tutor_override_at
      into g
      from public.tutor_quiz_answer_grades
     where attempt_id = v_attempt.id and question_id = q.id
     order by created_at desc limit 1;

    if found then
      v_n := v_n + 1;
      if g.ai_score is not null then v_ai := v_ai + 1; end if;
      if g.tutor_override_score is not null then
        v_tutor := v_tutor + 1;
        v_marked_at := greatest(v_marked_at, g.tutor_override_at);
      end if;
    end if;

    v_items := v_items || jsonb_build_object(
      'question_id', q.id,
      'verdict', public._quiz_answer_verdict(q, v_answers -> (q.id::text)),
      'correct_answer_index', q.correct_answer_index,
      'expected_answer', q.expected_answer,
      'explanation', q.explanation,
      'marking_guidance', q.marking_guidance,
      'points', coalesce(q.points, 1),
      'mark', case when found then coalesce(g.tutor_override_score, g.ai_score) end,
      'tutor_marked', case when found then g.tutor_override_score is not null end,
      'feedback', case when found then coalesce(nullif(g.tutor_override_rationale, ''), g.ai_rationale) end
    );
  end loop;

  return jsonb_build_object(
    'score', v_attempt.score,
    'total_points', v_attempt.total_points,
    'completed_at', v_attempt.completed_at,
    'marking', case
      when v_n = 0 then 'auto'
      when v_tutor = v_n then 'marked'
      when v_ai + v_tutor >= v_n then 'awaiting_tutor'
      else 'awaiting_ai' end,
    'written_count', v_n,
    'marked_at', v_marked_at,
    'items', v_items
  );
end;
$function$;

revoke all on function public.get_attempt_review(uuid) from public, anon;
grant execute on function public.get_attempt_review(uuid) to authenticated;
