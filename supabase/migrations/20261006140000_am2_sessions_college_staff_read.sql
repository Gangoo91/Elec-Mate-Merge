-- AM2 plan, Phase 4 (6 Oct 2026): a learner's tutor can see their AM2 practice.
--
-- am2_mock_sessions was readable only by the learner (auth.uid() = user_id),
-- so the new "AM2 practice" section on Student 360 showed nothing to staff.
-- This adds READ access for staff at the learner's own college — the same
-- rule the other Student 360 tables use (is_staff_at_students_college), keyed
-- on the learner's auth user rather than their college_students row, because
-- am2_mock_sessions stores the auth user id. No write access is added.
-- college_students.user_id is unique, so a learner belongs to one college and
-- staff at other colleges see nothing.

create or replace function public.is_staff_for_learner_user(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select exists (
    select 1
    from public.college_students s
    join public.college_staff st on st.college_id = s.college_id
    where s.user_id = _user_id
      and st.user_id = (select auth.uid())
      -- Archived staff lose access (the older is_staff_at_students_college
      -- doesn't check this; worth fixing there too).
      and st.archived_at is null
  );
$$;

revoke all on function public.is_staff_for_learner_user(uuid) from public;
grant execute on function public.is_staff_for_learner_user(uuid) to authenticated;

drop policy if exists "College staff read their learners' AM2 sessions" on public.am2_mock_sessions;
create policy "College staff read their learners' AM2 sessions"
  on public.am2_mock_sessions
  for select
  to authenticated
  using (public.is_staff_for_learner_user(user_id));
