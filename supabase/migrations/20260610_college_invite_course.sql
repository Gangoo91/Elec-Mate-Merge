-- ============================================================================
-- College Hub — invites carry the college's own COURSE (curriculum), and the
-- qualification is derived from it.
--
-- The college thinks in its curriculum (college_courses: "Electrotechnical
-- Apprenticeship 2357"), not global qualifications. Previously the only link
-- between a course and a global qualification was a fragile code-string match.
-- This normalises it into a real FK, then lets a student invite carry course_id.
-- On redeem the RPC: resolves the qualification from the course, sets the roll
-- row's course_id (so the learner's course shows + AC coverage auto-seeds), and
-- sets the assignment's qualification_id.
--
-- Rollback at the bottom.
-- ============================================================================

-- 1. Normalise: every college course points at its global qualification.
alter table public.college_courses
  add column if not exists qualification_id uuid references public.qualifications(id);

-- Backfill by the existing code convention (college_courses.code = qualifications.code).
update public.college_courses cc
   set qualification_id = q.id
  from public.qualifications q
 where q.code = cc.code
   and cc.qualification_id is null;

-- 2. Invites carry the college course.
alter table public.college_invites
  add column if not exists course_id uuid references public.college_courses(id);

-- 3. RPC resolves course -> qualification, sets roll.course_id + assignment.qualification_id.
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
  v_course       uuid;
  v_email        text;
  v_linked       boolean := false;
begin
  v_user := auth.uid();
  if v_user is null then
    return jsonb_build_object('error', 'Not authenticated');
  end if;

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

  if v_invite.invite_type = 'staff' then
    update profiles
       set college_id   = v_invite.college_id,
           college_role = coalesce(v_invite.role_to_assign, 'tutor')
     where id = v_user;

  elsif v_invite.invite_type = 'student' then
    select email into v_email from auth.users where id = v_user;

    -- Course (college-native) drives the qualification. Fallbacks: a directly
    -- set invite qualification, then the learner's own selection (legacy).
    v_course := v_invite.course_id;
    if v_course is not null then
      select qualification_id into v_qual from college_courses where id = v_course;
    end if;
    if v_qual is null then
      v_qual := v_invite.qualification_id;
    end if;
    if v_qual is null then
      select q.id into v_qual
        from user_qualification_selections uqs
        join qualifications q on q.id = uqs.qualification_id
       where uqs.user_id = v_user and uqs.is_active = true
       limit 1;
    end if;
    if v_qual is null then
      return jsonb_build_object(
        'error', 'no_course_on_invite',
        'message', 'This invite isn''t linked to a course yet — ask your college to reissue it.'
      );
    end if;

    -- Link an existing (bulk-imported) roll row by email; backfill its course if unset.
    update college_students
       set user_id   = v_user,
           course_id = coalesce(college_students.course_id, v_course)
     where id = (
       select cs.id
         from college_students cs
        where cs.user_id is null
          and cs.college_id = v_invite.college_id
          and v_email is not null
          and lower(btrim(cs.email)) = lower(btrim(v_email))
        order by cs.created_at
        limit 1
     );
    if found then v_linked := true; end if;

    -- Else create a fresh roll row keyed by the login, with the invite's course.
    insert into college_students (user_id, college_id, course_id, name, email, status, start_date)
    select v_user,
           v_invite.college_id,
           v_course,
           coalesce(p.full_name, v_email, 'Apprentice'),
           coalesce(v_email, ''),
           'Active',
           current_date
      from profiles p
     where p.id = v_user
       and not exists (select 1 from college_students where user_id = v_user)
    on conflict (user_id) where user_id is not null do nothing;

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
    'success',      true,
    'college_name', v_college_name,
    'invite_type',  v_invite.invite_type,
    'role',         v_invite.role_to_assign,
    'linked',       v_linked
  );
end;
$function$;

-- ============================================================================
-- ROLLBACK:
--   alter table public.college_invites drop column if exists course_id;
--   alter table public.college_courses drop column if exists qualification_id;
--   -- and restore the prior accept_college_invite body from migration history.
-- ============================================================================
