-- Site diary review round 3 (6 Oct 2026).
--
-- 1. One place that decides who "the learner's tutor" is for a bell: the
--    cohort tutor plus any assigned tutor/assessor — but ONLY people who are
--    current staff at the learner's (newest) college. The question bell used
--    to reach an assigned person with no staff row, who then opened Student
--    360 and saw nothing (college_shared_diary_entries checks staff).
-- 2. The question bell uses it.
-- 3. A learner RESENDING training their tutor sent back (rejected → pending)
--    told nobody: trg_notify_tutor_otj fires on INSERT only. Bell the tutor.
--    Only apprentice-sent rows; never blocks the learner's save.

create or replace function public._learner_tutor_uids(p_learner uuid)
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  with s as (
    select cs.college_id, cs.cohort_id
    from public.college_students cs
    where cs.user_id = p_learner
    order by cs.created_at desc
    limit 1
  ),
  candidates as (
    select st.user_id as uid
    from s
    join public.college_cohorts c on c.id = s.cohort_id
    join public.college_staff st on st.id = c.tutor_id
    union
    select x.uid
    from public.college_student_assignments csa,
         lateral (values (csa.tutor_id), (csa.assessor_id)) as x(uid)
    where csa.student_id = p_learner
  )
  select distinct c.uid
  from candidates c, s
  where c.uid is not null
    and c.uid <> p_learner
    and exists (
      select 1 from public.college_staff st
      where st.user_id = c.uid and st.college_id = s.college_id and st.archived_at is null
    );
$$;

revoke all on function public._learner_tutor_uids(uuid) from public, anon, authenticated;

-- 2 ─────────────────────────────────────────────────────────────────────────
create or replace function public.tg_site_diary_question_notify()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  q text := btrim(coalesce(new.issues_or_questions, ''));
  v_student record;
  v_name text;
  v_uid uuid;
begin
  if not new.share_with_tutor then return new; end if;
  if length(q) <= 2
     or lower(regexp_replace(q, '[.!]+$', '')) in ('none', 'n/a', 'na', 'nope', 'nothing', 'no') then
    return new;
  end if;
  if tg_op = 'UPDATE'
     and old.share_with_tutor
     and old.issues_or_questions is not distinct from new.issues_or_questions then
    return new;
  end if;

  begin
    select s.id, s.name into v_student
    from public.college_students s
    where s.user_id = new.user_id
    order by s.created_at desc
    limit 1;
    if v_student.id is null then return new; end if;
    v_name := coalesce(nullif(split_part(v_student.name, ' ', 1), ''), 'A learner');

    for v_uid in select public._learner_tutor_uids(new.user_id) loop
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (
        v_uid,
        'diary_question',
        v_name || ' asked a question in their site diary',
        left(q, 160),
        '/college?section=student360&studentId=' || v_student.id,
        jsonb_build_object('diary_entry_id', new.id, 'college_student_id', v_student.id)
      );
    end loop;
  exception when others then
    null; -- a bell is never worth failing the learner's save
  end;
  return new;
end;
$$;

-- 3 ─────────────────────────────────────────────────────────────────────────
create or replace function public.tg_otj_resubmit_notify_tutor()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student record;
  v_name text;
  v_hours numeric;
  v_txt text;
  v_uid uuid;
begin
  if coalesce(old.verification_status, '') <> 'rejected'
     or coalesce(new.verification_status, '') <> 'pending'
     or coalesce(new.source_kind, '') <> 'apprentice_submitted' then
    return new;
  end if;

  begin
    select s.id, s.name into v_student
    from public.college_students s
    where s.user_id = new.student_id
    order by s.created_at desc
    limit 1;
    if v_student.id is null then return new; end if;
    v_name := coalesce(nullif(split_part(v_student.name, ' ', 1), ''), 'An apprentice');
    v_hours := round(coalesce(new.duration_minutes, 0) / 60.0, 1);
    v_txt := case when v_hours = trunc(v_hours) then trunc(v_hours)::int::text else v_hours::text end
             || case when v_hours = 1 then ' training hour' else ' training hours' end;

    for v_uid in select public._learner_tutor_uids(new.student_id) loop
      continue when v_uid = new.recorded_by;
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (
        v_uid,
        'otj_resubmitted',
        v_name || ' fixed and resent ' || v_txt,
        coalesce(new.title, 'Off-the-job training') || ' · ' || to_char(new.activity_date, 'FMDD Mon')
          || ' · tap to review',
        '/college?section=student360&studentId=' || v_student.id,
        jsonb_build_object('otj_entry_id', new.id, 'college_student_id', v_student.id)
      );
    end loop;
  exception when others then
    null;
  end;
  return new;
end;
$$;

revoke all on function public.tg_otj_resubmit_notify_tutor() from public, anon, authenticated;

drop trigger if exists trg_otj_resubmit_notify_tutor on public.college_otj_entries;
create trigger trg_otj_resubmit_notify_tutor
  after update of verification_status on public.college_otj_entries
  for each row
  when (old.verification_status = 'rejected' and new.verification_status = 'pending')
  execute function public.tg_otj_resubmit_notify_tutor();
