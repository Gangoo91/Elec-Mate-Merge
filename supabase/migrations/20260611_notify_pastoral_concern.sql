-- ============================================================================
-- College Hub — route pastoral flags/concerns to the right staff (never silent).
--
-- Completes the "concerns reach no one" gap (safeguarding was the critical
-- slice). A 'flag' or 'concern' note routes by its visibility, and CLIMBS if the
-- intended audience is empty, so it can never silently vanish:
--   * visibility='tutors'      -> learner's assigned tutor(s)
--                                 -> else Heads of Department  (covers "or lead",
--                                    a learner with no tutor, or the tutor being
--                                    the author)
--                                 -> else college admins (last resort)
--   * visibility='course_lead' -> Heads of Department -> else admins
--   * visibility='author_only' -> no one (private)
-- The author is never notified of their own note. note/one_to_one/praise/
-- intervention are records, not concerns, so they don't escalate; safeguarding
-- has its own trigger.
--
-- Id-spaces (verified against live FKs):
--   pastoral_notes.student_id              -> college_students.id
--   pastoral_notes.author_id               -> college_staff.id
--   college_student_assignments.student_id -> profiles.id (= college_students.user_id)
--   college_student_assignments.tutor_id   -> profiles.id (the tutor's login, used directly)
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_notify_pastoral_concern()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_author_user uuid;
  v_count int := 0;
begin
  if new.kind not in ('flag', 'concern')
     or new.visibility in ('author_only', 'safeguarding') then
    return new;
  end if;

  select user_id into v_author_user from college_staff where id = new.author_id;

  -- Level 1 — the learner's assigned tutor(s), for 'tutors' visibility
  if new.visibility = 'tutors' then
    insert into push_notification_log (user_id, type, reference_id, title, body)
    select distinct a.tutor_id,
           'pastoral',
           new.id::text,
           'A learner has been flagged',
           'A flag has been raised about a learner you support. Open their record to review.'
    from college_students cs
    join college_student_assignments a on a.student_id = cs.user_id
    where cs.id = new.student_id
      and a.tutor_id is not null
      and a.tutor_id is distinct from v_author_user;
    get diagnostics v_count = row_count;
  end if;

  -- Level 2 — Heads of Department: always for 'course_lead', or as the fallback
  -- for a 'tutors' flag that reached no tutor.
  if new.visibility = 'course_lead' or v_count = 0 then
    insert into push_notification_log (user_id, type, reference_id, title, body)
    select distinct s.user_id,
           'pastoral',
           new.id::text,
           'A concern needs your attention',
           'A concern has been logged about a learner at your college. Open the learner''s record to review.'
    from college_staff s
    where s.college_id = new.college_id
      and s.role = 'head_of_department'
      and s.user_id is not null
      and s.id is distinct from new.author_id;
    get diagnostics v_count = row_count;
  end if;

  -- Level 3 — last resort: no tutor and no HoD reached -> college admins, so a
  -- concern is never silently dropped (mirrors the safeguarding admin fallback).
  if v_count = 0 then
    insert into push_notification_log (user_id, type, reference_id, title, body)
    select distinct s.user_id,
           'pastoral',
           new.id::text,
           'A learner concern needs attention',
           'A flagged concern about a learner has not reached a tutor or course lead. Please review it and check staff roles are assigned.'
    from college_staff s
    where s.college_id = new.college_id
      and s.role = 'admin'
      and s.user_id is not null
      and s.id is distinct from new.author_id;
  end if;

  return new;
end;
$function$;

drop trigger if exists trg_notify_pastoral_concern on public.pastoral_notes;
create trigger trg_notify_pastoral_concern
  after insert on public.pastoral_notes
  for each row
  execute function public.tg_notify_pastoral_concern();

revoke execute on function public.tg_notify_pastoral_concern() from anon, authenticated, public;

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_notify_pastoral_concern on public.pastoral_notes;
--   drop function if exists public.tg_notify_pastoral_concern();
-- ============================================================================
