-- ============================================================================
-- College Hub — connect grades + EPA gateway to the apprentice's notifications.
--
-- Same pattern as portfolio feedback: drop a row into push_notification_log
-- (which the apprentice's NotificationProvider reads live) when something they
-- should know happens. No edge function, no client change.
--   * Grade recorded  -> "New grade recorded"  (college_grades.student_id keys on
--     college_students.id, so we resolve the login via the roster)
--   * EPA gateway passed -> "EPA gateway passed" (epa_gateway_checklist.user_id is
--     already the login)
--
-- Rollback at the bottom.
-- ============================================================================

-- ---- Grade recorded --------------------------------------------------------
create or replace function public.tg_notify_grade_recorded()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_user uuid;
begin
  if new.status = 'Graded'
     and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    select user_id into v_user from college_students where id = new.student_id;
    if v_user is not null then
      insert into push_notification_log (user_id, type, reference_id, title, body)
      values (
        v_user,
        'grade',
        new.id::text,
        'New grade recorded',
        'Your assessment' || coalesce(' for ' || nullif(new.unit_name, ''), '') || ' has been graded.'
      );
    end if;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_grade_recorded on public.college_grades;
create trigger trg_notify_grade_recorded
  after insert or update of status
  on public.college_grades
  for each row
  execute function public.tg_notify_grade_recorded();

-- ---- EPA gateway passed ----------------------------------------------------
create or replace function public.tg_notify_gateway_passed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.user_id is not null
     and new.gateway_passed is true
     and (tg_op = 'INSERT' or old.gateway_passed is distinct from new.gateway_passed) then
    insert into push_notification_log (user_id, type, reference_id, title, body)
    values (
      new.user_id,
      'epa',
      new.id::text,
      'EPA gateway passed',
      'You''ve passed the EPA gateway — you''re ready for End-Point Assessment.'
    );
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_gateway_passed on public.epa_gateway_checklist;
create trigger trg_notify_gateway_passed
  after insert or update of gateway_passed
  on public.epa_gateway_checklist
  for each row
  execute function public.tg_notify_gateway_passed();

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_notify_grade_recorded on public.college_grades;
--   drop function if exists public.tg_notify_grade_recorded();
--   drop trigger if exists trg_notify_gateway_passed on public.epa_gateway_checklist;
--   drop function if exists public.tg_notify_gateway_passed();
-- ============================================================================
