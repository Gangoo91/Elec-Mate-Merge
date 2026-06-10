-- ============================================================================
-- College Hub — Slice 3 security fix: close the staff-invite self-promotion hole.
--
-- The policy "Same-college staff insert invites" let ANY same-college staff
-- (tutor, support, etc.) insert an invite of ANY type/role — including a STAFF
-- invite with role_to_assign='admin'. Since accept_college_invite's staff branch
-- sets profiles.college_role = role_to_assign, a low-privilege staff member could
-- mint an admin invite and redeem it to promote themselves. Pre-existing at the
-- RLS layer (any staff could POST to college_invites directly).
--
-- Fix: same-college staff may only create STUDENT invites. STAFF invites remain
-- creatable only by admin / head_of_department, via the existing
-- "College admins can manage invites" ALL policy.
--
-- Rollback at the bottom.
-- ============================================================================

drop policy if exists "Same-college staff insert invites" on public.college_invites;

create policy "Same-college staff insert student invites"
  on public.college_invites
  for insert to authenticated
  with check (_ch_same_college(college_id) and invite_type = 'student');

-- ============================================================================
-- ROLLBACK:
--   drop policy if exists "Same-college staff insert student invites" on public.college_invites;
--   create policy "Same-college staff insert invites"
--     on public.college_invites for insert to authenticated
--     with check (_ch_same_college(college_id));
-- ============================================================================
