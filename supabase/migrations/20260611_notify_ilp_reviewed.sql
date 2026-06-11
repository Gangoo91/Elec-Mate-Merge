-- ============================================================================
-- College Hub — notify the apprentice when a tutor reviews their ILP.
--
-- Completes the feedback-notification set (portfolio / grade / EPA / ILP).
-- college_ilps.last_reviewed changes only on a tutor review (learners edit goal
-- comments on college_ilp_goals, not this field), so it's a clean "your tutor
-- reviewed your plan" signal. student_id keys on college_students.id, so we
-- resolve the login via the roster. Same surface as the others: a
-- push_notification_log row the apprentice's NotificationProvider reads live.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_notify_ilp_reviewed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_user uuid;
begin
  if new.last_reviewed is not null
     and (tg_op = 'INSERT' or old.last_reviewed is distinct from new.last_reviewed) then
    select user_id into v_user from college_students where id = new.student_id;
    if v_user is not null then
      insert into push_notification_log (user_id, type, reference_id, title, body)
      values (
        v_user,
        'ilp',
        new.id::text,
        'Learning plan reviewed',
        'Your tutor has reviewed your learning plan — open it to see your updated targets.'
      );
    end if;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_ilp_reviewed on public.college_ilps;
create trigger trg_notify_ilp_reviewed
  after insert or update of last_reviewed
  on public.college_ilps
  for each row
  execute function public.tg_notify_ilp_reviewed();

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_notify_ilp_reviewed on public.college_ilps;
--   drop function if exists public.tg_notify_ilp_reviewed();
-- ============================================================================
