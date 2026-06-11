-- ============================================================================
-- College Hub — fix broken student creation (college_id never set).
--
-- BUG: both AddStudentDialog and BulkAddStudentsSheet insert college_students
-- with college_id = null, and createCollegeStudent does a raw insert. The RLS
-- INSERT policy is `with check (_ch_same_college(college_id))`, and
-- _ch_same_college(null) is false — so EVERY add (single and the 200-learner
-- bulk enrol) is rejected by RLS. A college can't add its learners at all.
-- Latent only because the hub is hidden/unused.
--
-- FIX: a BEFORE INSERT trigger fills college_id from the inserting staff
-- member's own college when it's null. It runs before the RLS WITH CHECK, so the
-- check then sees the staff member's college and passes. Fixes all insert paths
-- at the DB level — no FE redeploy needed. A non-staff caller still gets null
-- (and is correctly rejected by RLS).
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_set_college_student_college_id()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.college_id is null then
    select college_id into new.college_id
    from college_staff
    where user_id = auth.uid()
    limit 1;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_set_college_student_college_id on public.college_students;
create trigger trg_set_college_student_college_id
  before insert on public.college_students
  for each row
  execute function public.tg_set_college_student_college_id();

revoke execute on function public.tg_set_college_student_college_id() from anon, authenticated, public;

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_set_college_student_college_id on public.college_students;
--   drop function if exists public.tg_set_college_student_college_id();
-- ============================================================================
