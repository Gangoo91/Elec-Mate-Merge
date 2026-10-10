-- ELE-1834 follow-up: the training record a passed course writes reads
-- "Study Centre: 18th Edition (BS 7671)" rather than
-- "18th Edition (BS 7671) (Study Centre course)". Nothing else changes.

create or replace function public._course_assignment_on_mock_pass()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  a record;
  v_profile uuid;
  v_qual uuid;
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  if new.user_id is null or not new.passed or new.source <> 'in_app'
     or new.percentage < coalesce(new.pass_mark, 60) then
    return new;
  end if;
  for a in
    select ca.*, r.name as person
      from public.employer_course_assignments ca
      join public.employer_employees r on r.id = ca.employee_id
     where r.user_id = new.user_id
       and coalesce(r.status, 'Active') <> 'Archived'
       and ca.course_key = new.exam_slug
       and ca.status = 'assigned'
       and ca.created_at <= new.created_at
  loop
    begin
      v_qual := null;
      v_profile := public._elec_id_profile_for_roster(a.employee_id);
      if v_profile is not null then
        insert into public.employer_elec_id_qualifications (
          profile_id, qualification_name, qualification_type, category, awarding_body, grade,
          date_achieved, training_type, training_status, verification_level,
          added_by, added_by_employer_id, source_table, source_id)
        values (
          v_profile, 'Study Centre: ' || a.course_title, 'training', 'training',
          'Elec-Mate Study Centre', new.percentage || '%',
          v_today, 'Study Centre course', 'Completed', 'self_declared',
          new.user_id, a.employer_id, 'employer_course_assignments', a.id)
        returning id into v_qual;
      end if;

      update public.employer_course_assignments
         set status = 'completed', completed_at = now(), completion_attempt_id = new.id,
             completion_score = new.percentage, qualification_id = v_qual, updated_at = now()
       where id = a.id;

      perform public.notify_employer_bell(
        a.employer_id, 'course_completed',
        coalesce(nullif(btrim(a.person), ''), 'Someone') || ' finished ' || a.course_title,
        'Passed the final paper with ' || new.percentage || '%'
          || case when v_today > a.due_date then ', after the due date' else ', on time' end
          || '. It''s on their Elec-ID as a Study Centre course',
        jsonb_build_object(
          'route', '/employer?section=elecid&member=' || a.employee_id,
          'employee_id', a.employee_id,
          'assignment_id', a.id));
    exception when others then
      raise warning '[_course_assignment_on_mock_pass] %: %', a.id, sqlerrm;
    end;
  end loop;
  return new;
exception when others then
  raise warning '[_course_assignment_on_mock_pass] %', sqlerrm;
  return new;
end;
$function$;
