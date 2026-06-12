-- ============================================================================
-- College Hub — every enrolled learner gets a current ILP shell automatically.
--
-- Why: the apprentice "My College Plan" and the tutor ILP surface both key off
-- the current ILP (is_current). Until now an ILP only existed once a tutor
-- manually created one, so newly-enrolled learners had an empty plan and tutors
-- had an extra manual step. This guarantees a v1 current ILP from enrolment.
--
-- Model is already versioned (version + is_current); this only ever creates the
-- FIRST shell when none is current — it never touches existing/review versions.
--
-- Connected touch (Andrew's "Student 360 → ILP tailoring"): the shell seeds its
-- accessibility_adjustments from the learner's captured accessibility_notes, so
-- the tutor/AI starts from the profile rather than a blank box.
--
-- No false notification: trg_notify_ilp_reviewed only fires when last_reviewed
-- is set; the shell leaves it null.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_create_ilp_shell()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_qual uuid;
begin
  -- never duplicate a current plan
  if exists (select 1 from college_ilps where student_id = new.id and is_current) then
    return new;
  end if;

  if new.course_id is not null then
    select qualification_id into v_qual from college_courses where id = new.course_id;
  end if;

  insert into college_ilps (
    student_id, college_id, qualification_id,
    version, is_current, status, accessibility_adjustments
  )
  values (
    new.id, new.college_id, v_qual,
    1, true, 'active', nullif(btrim(new.accessibility_notes), '')
  );

  return new;
end;
$function$;

drop trigger if exists trg_create_ilp_shell on public.college_students;
create trigger trg_create_ilp_shell
  after insert on public.college_students
  for each row
  execute function public.tg_create_ilp_shell();

revoke execute on function public.tg_create_ilp_shell() from anon, authenticated, public;

-- Backfill existing learners who have no current ILP.
insert into college_ilps (
  student_id, college_id, qualification_id, version, is_current, status, accessibility_adjustments
)
select s.id, s.college_id, c.qualification_id, 1, true, 'active', nullif(btrim(s.accessibility_notes), '')
from college_students s
left join college_courses c on c.id = s.course_id
where not exists (
  select 1 from college_ilps i where i.student_id = s.id and i.is_current
);

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_create_ilp_shell on public.college_students;
--   drop function if exists public.tg_create_ilp_shell();
--   (backfilled shells: delete from college_ilps where last_reviewed is null
--    and version = 1 and targets is null;  -- if you need to undo the backfill)
-- ============================================================================
