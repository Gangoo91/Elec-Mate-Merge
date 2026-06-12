-- ============================================================================
-- College Hub — derive each learner's OTJ target from their course.
--
-- college_students.otj_required_hours was never set by anything (invite, bulk
-- import, UI), so every learner fell back to an estimated target. OTJ hours are
-- a fixed property of the apprenticeship STANDARD (ST0152 = 1,066h, etc. — see
-- src/data/otjStandards.ts), which is a property of the course the college runs.
--
-- So: the course carries its required OTJ hours (set once by the college, in the
-- course form, by picking the standard), and learners INHERIT it on enrolment.
--   1. college_courses.otj_required_hours — the course's standard hours.
--   2. A BEFORE trigger fills college_students.otj_required_hours from the course
--      when a learner is enrolled and their own value isn't already set. A
--      per-learner override (e.g. RPL / prior credit) is respected — it only
--      fills when null.
--
-- Rollback at the bottom.
-- ============================================================================

alter table public.college_courses
  add column if not exists otj_required_hours numeric;

create or replace function public.tg_set_otj_required_hours()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.course_id is not null and new.otj_required_hours is null then
    select otj_required_hours into new.otj_required_hours
    from college_courses
    where id = new.course_id;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_set_otj_required_hours on public.college_students;
create trigger trg_set_otj_required_hours
  before insert or update of course_id on public.college_students
  for each row
  execute function public.tg_set_otj_required_hours();

revoke execute on function public.tg_set_otj_required_hours() from anon, authenticated, public;

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_set_otj_required_hours on public.college_students;
--   drop function if exists public.tg_set_otj_required_hours();
--   alter table public.college_courses drop column if exists otj_required_hours;
-- ============================================================================
