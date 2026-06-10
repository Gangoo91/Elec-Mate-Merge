-- ============================================================================
-- College Hub identity unification — Slice 1 of the unification work
-- Spine decision: profiles.id (user_id) is the single student identity.
-- college_students.user_id is the join to the login; assignments + portfolio +
-- OTJ all key off profiles.id already, so this makes the roll consistent with them.
--
-- SAFE / ADDITIVE: no destructive change to existing data. Existing demo rows
-- with NULL user_id are left as-is (they are seed fixtures). NOT NULL on user_id
-- is intentionally DEFERRED to a later slice, after the onboarding + bulk-import
-- paths are rewritten to always set it.
--
-- Rollback is at the bottom of this file.
--
-- ASSUMPTIONS / KNOWN LIMITS (deliberate, in-scope for this slice):
--  * One college per learner: uq_college_students_user_id is global, so a login
--    maps to exactly one roll row. College transfer is NOT modelled here (it
--    would update the existing row's college_id, not insert a second). Fine for
--    fresh enrolments; revisit if provider transfers are needed.
--  * _ch_same_college() gates staff-read policies on a college_id match with NO
--    staff-role check, so the system relies on "profiles.college_id set => staff".
--    This migration upholds that (students never get profiles.college_id). FOLLOW-UP
--    (separate slice): harden _ch_same_college to also require a staff role, so the
--    invariant is enforced by the DB rather than by convention.
--  * Staff invites are intentionally unchanged — they still don't create a
--    college_staff row (pre-existing P2; current_user_is_eqa()/staff roster read
--    college_staff). Out of scope for the identity slice.
-- ============================================================================

-- 1. One login ↔ one college roll row. Partial unique allows the existing
--    NULL demo rows to coexist during the transition.
create unique index if not exists uq_college_students_user_id
  on public.college_students (user_id)
  where user_id is not null;

-- 2. Cover the assignment role-lookup columns the staff dashboards filter on
--    (portfolio / EPA / IQA / assessor queue all .or() over these).
create index if not exists idx_csa_tutor    on public.college_student_assignments (tutor_id);
create index if not exists idx_csa_assessor on public.college_student_assignments (assessor_id);
create index if not exists idx_csa_iqa      on public.college_student_assignments (iqa_id);
create index if not exists idx_csa_student  on public.college_student_assignments (student_id);

-- 3. Spine-correct onboarding. The previous version (a) only wrote an
--    assignment row and never set profiles.college_id or a college_students
--    roll row, and (b) fell back to an ARBITRARY qualification when the learner
--    had not chosen one. Both are fixed here.
create or replace function public.accept_college_invite(p_invite_code text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_invite       record;
  v_user         uuid;
  v_college_name text;
  v_qual         uuid;
  v_email        text;
  v_linked       boolean := false;
begin
  v_user := auth.uid();
  if v_user is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;

  -- trim() the input so a pasted code with stray whitespace still matches
  -- (common onboarding fat-finger). Case is left as-is to preserve code semantics.
  select * into v_invite
  from college_invites
  where invite_code = trim(p_invite_code)
    and is_active = true
    and (expires_at is null or expires_at > now())
    and (max_uses is null or use_count < max_uses);

  if v_invite is null then
    return jsonb_build_object('error', 'Invalid or expired invite code');
  end if;

  select name into v_college_name from colleges where id = v_invite.college_id;

  -- ----- STAFF -----
  if v_invite.invite_type = 'staff' then
    update profiles
       set college_id   = v_invite.college_id,
           college_role = coalesce(v_invite.role_to_assign, 'tutor')
     where id = v_user;

  -- ----- STUDENT -----
  elsif v_invite.invite_type = 'student' then
    -- SECURITY: do NOT set profiles.college_id for students. _ch_same_college()
    -- gates the staff-read RLS policies on grades / attendance / EPA purely on a
    -- college_id match (no staff-role check), so the design relies on the
    -- invariant "profiles.college_id is set => the user is staff". Setting it on
    -- a student would let them read their whole cohort's records. The student's
    -- college link lives in college_students.user_id + college_student_assignments
    -- (both = auth.uid()), which is all the student-self RLS policies need.

    -- The learner's login email. NOTE: profiles has no email column — it lives
    -- on auth.users, which this SECURITY DEFINER function is allowed to read.
    select email into v_email from auth.users where id = v_user;

    -- Resolve the learner's CHOSEN qualification. Fail loud if none —
    -- no more arbitrary "(SELECT id FROM qualifications LIMIT 1)" corruption.
    select q.id into v_qual
      from user_qualification_selections uqs
      join qualifications q on q.id = uqs.qualification_id
     where uqs.user_id = v_user and uqs.is_active = true
     limit 1;

    if v_qual is null then
      return jsonb_build_object(
        'error', 'no_qualification_selected',
        'message', 'Choose your qualification before joining a college.'
      );
    end if;

    -- 1) LINK an existing roll row (e.g. one the college bulk-imported with a
    --    NULL user_id) to this login, matching on email within the college.
    --    This is the bulk-import -> invite reconciliation: it preserves the
    --    admin-entered ULN / cohort / name instead of creating a duplicate.
    --    Picks exactly ONE row so it can never violate uq_college_students_user_id.
    update college_students
       set user_id = v_user
     where id = (
       select cs.id
         from college_students cs
        where cs.user_id is null
          and cs.college_id = v_invite.college_id
          and v_email is not null
          and lower(btrim(cs.email)) = lower(btrim(v_email))  -- tolerate stray whitespace
        order by cs.created_at
        limit 1
     );
    if found then v_linked := true; end if;

    -- 2) If no existing row was linked, create a fresh roll row keyed by the
    --    login (the spine). This is what grades / attendance / EPA / ILP hang
    --    off, and it was never created for invite-joined learners before.
    insert into college_students (user_id, college_id, name, email, status, start_date)
    select v_user,
           v_invite.college_id,
           coalesce(p.full_name, v_email, 'Apprentice'),
           coalesce(v_email, ''),
           'Active',
           current_date
      from profiles p
     where p.id = v_user
       and not exists (select 1 from college_students where user_id = v_user)
    on conflict (user_id) where user_id is not null do nothing;

    -- Ensure an assignment row exists. Role columns (tutor/assessor/iqa) are
    -- left NULL deliberately — they are filled by the staff "Assign" UI
    -- (next slice), not guessed here.
    if not exists (
      select 1 from college_student_assignments
       where student_id = v_user and college_id = v_invite.college_id
    ) then
      insert into college_student_assignments
        (student_id, college_id, college_name, qualification_id, start_date, status)
      values
        (v_user, v_invite.college_id, v_college_name, v_qual, current_date, 'active');
    end if;
  end if;

  update college_invites set use_count = use_count + 1 where id = v_invite.id;

  return jsonb_build_object(
    'success',     true,
    'college_name', v_college_name,
    'invite_type',  v_invite.invite_type,
    'role',         v_invite.role_to_assign,
    -- 'linked' = matched an existing (bulk-imported) roll row; the client can
    -- say "Welcome back" vs "Enrolled". Only meaningful for student invites.
    'linked',       v_linked
  );
end;
$function$;

-- ============================================================================
-- ROLLBACK (run manually if needed):
--   drop index if exists public.uq_college_students_user_id;
--   drop index if exists public.idx_csa_tutor;
--   drop index if exists public.idx_csa_assessor;
--   drop index if exists public.idx_csa_iqa;
--   drop index if exists public.idx_csa_student;
--   -- restore the prior accept_college_invite body from migration history
--   --   (git: previous definition documented in the audit report).
-- The function change is forward-compatible: old client code keeps working
-- because the success payload shape is unchanged.
-- ============================================================================
