-- ELE-1912: student_ac_coverage reads were the slowest SQL behind the College
-- Hub (mean 211 ms × 214 calls for a cohort read, 49 ms × 1,079 for one
-- learner). The three policies each called a per-row EXISTS function, so a
-- tutor reading the cohort's 10,510 criteria rows ran ~30,000 function calls
-- (520 ms on the demo college). Same rules, set-based: each helper returns the
-- learner ids the caller may see, evaluated ONCE per query as a hashed
-- subplan, and the policies match `student_id in (select …)`.
--
-- Semantics are unchanged:
--   staff read     = is_staff_at_students_college()          (any staff row at the learner's college)
--   staff write    = is_assessing_staff_at_students_college() (live staff, not EQA)
--   student reads  = is_the_student()                        (the learner's own row)
-- The policies are now TO authenticated: every helper already returned false
-- for anon (auth.uid() is null), so anon still sees nothing.

create or replace function public._ac_staff_student_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id
  from public.college_students s
  join public.college_staff st on st.college_id = s.college_id
  where st.user_id = auth.uid();
$$;
comment on function public._ac_staff_student_ids() is
  'ELE-1912: college_students ids at any college where the caller has a staff row — set-based twin of is_staff_at_students_college() for RLS (`student_id in (select …)`).';

create or replace function public._ac_assessing_staff_student_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id
  from public.college_students s
  join public.college_staff st on st.college_id = s.college_id
  where st.user_id = auth.uid()
    and st.archived_at is null
    and coalesce(st.role, '') <> 'eqa';
$$;
comment on function public._ac_assessing_staff_student_ids() is
  'ELE-1912: college_students ids the caller may assess (live staff, not EQA) — set-based twin of is_assessing_staff_at_students_college() for RLS.';

create or replace function public._ac_own_student_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id from public.college_students s where s.user_id = auth.uid();
$$;
comment on function public._ac_own_student_ids() is
  'ELE-1912: the caller''s own college_students ids — set-based twin of is_the_student() for RLS.';

revoke all on function public._ac_staff_student_ids() from public, anon;
revoke all on function public._ac_assessing_staff_student_ids() from public, anon;
revoke all on function public._ac_own_student_ids() from public, anon;
grant execute on function public._ac_staff_student_ids() to authenticated, service_role;
grant execute on function public._ac_assessing_staff_student_ids() to authenticated, service_role;
grant execute on function public._ac_own_student_ids() to authenticated, service_role;

drop policy if exists "ac coverage: staff read" on public.student_ac_coverage;
drop policy if exists "ac coverage: staff write" on public.student_ac_coverage;
drop policy if exists "ac coverage: student reads own" on public.student_ac_coverage;

create policy "ac coverage: staff read" on public.student_ac_coverage
  for select to authenticated
  using (student_id in (select public._ac_staff_student_ids()));

create policy "ac coverage: staff write" on public.student_ac_coverage
  for all to authenticated
  using (student_id in (select public._ac_assessing_staff_student_ids()))
  with check (student_id in (select public._ac_assessing_staff_student_ids()));

create policy "ac coverage: student reads own" on public.student_ac_coverage
  for select to authenticated
  using (student_id in (select public._ac_own_student_ids()));
