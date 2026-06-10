-- ============================================================================
-- College Hub — Slice 2a: let same-college staff manage student assignments.
--
-- Problem: college_student_assignments has only role-scoped SELECT policies and
-- a single "assessors update their own" UPDATE policy. There is NO way for an
-- admin/tutor to ASSIGN a tutor/assessor/IQA to a learner from the client — the
-- role columns the dashboards filter on are unwritable except via the invite
-- SECURITY DEFINER RPC. This adds the missing staff-write policies, gated the
-- same way every other college table is: _ch_same_college(college_id).
--
-- Safe because _ch_same_college() is only true for users whose profiles.college_id
-- matches — i.e. staff (students never get profiles.college_id; see the identity
-- spine migration). So students can't write assignments through these policies.
--
-- Rollback at the bottom.
-- ============================================================================

-- Read: a staff member managing the roll needs to see every assignment in their
-- college, not just rows where they are personally the tutor/assessor/IQA.
create policy "Same-college staff read assignments"
  on public.college_student_assignments
  for select to authenticated
  using (_ch_same_college(college_id));

-- Insert: create an assignment row for a learner in the staff member's college.
create policy "Same-college staff insert assignments"
  on public.college_student_assignments
  for insert to authenticated
  with check (_ch_same_college(college_id));

-- Update: set/replace the tutor/assessor/IQA role columns (and review dates etc.)
-- for a learner in the staff member's college.
create policy "Same-college staff update assignments"
  on public.college_student_assignments
  for update to authenticated
  using (_ch_same_college(college_id))
  with check (_ch_same_college(college_id));

-- ============================================================================
-- ROLLBACK:
--   drop policy if exists "Same-college staff read assignments"   on public.college_student_assignments;
--   drop policy if exists "Same-college staff insert assignments" on public.college_student_assignments;
--   drop policy if exists "Same-college staff update assignments" on public.college_student_assignments;
-- ============================================================================
