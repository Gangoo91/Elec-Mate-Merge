-- A learner who shares a diary entry with a question is asking their tutor
-- something; until now nothing told the tutor (6 Oct 2026). Bell the cohort
-- tutor and any assigned tutor/assessor, linking to the learner's Student 360
-- where SectionSiteDiary shows the question (via college_shared_diary_entries,
-- which never returns mood). Fires when a shared question appears or changes,
-- not on every edit. Never blocks the learner's save.

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
  r record;
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
    select s.id, s.name, s.cohort_id into v_student
    from public.college_students s
    where s.user_id = new.user_id
    order by s.created_at desc
    limit 1;
    if v_student.id is null then return new; end if;

    v_name := coalesce(nullif(split_part(v_student.name, ' ', 1), ''), 'A learner');

    for r in
      select distinct st.user_id as uid
      from public.college_cohorts c
      join public.college_staff st on st.id = c.tutor_id and st.archived_at is null
      where c.id = v_student.cohort_id and st.user_id is not null
      union
      select distinct x.uid
      from public.college_student_assignments csa,
           lateral (values (csa.tutor_id), (csa.assessor_id)) as x(uid)
      where csa.student_id = new.user_id and x.uid is not null
    loop
      if r.uid = new.user_id then continue; end if;
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (
        r.uid,
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

revoke all on function public.tg_site_diary_question_notify() from public, anon, authenticated;

drop trigger if exists site_diary_question_notify on public.site_diary_entries;
create trigger site_diary_question_notify
  after insert or update of share_with_tutor, issues_or_questions
  on public.site_diary_entries
  for each row
  execute function public.tg_site_diary_question_notify();
