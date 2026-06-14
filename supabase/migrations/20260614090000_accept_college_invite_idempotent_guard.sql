-- accept_college_invite: idempotency guard.
-- A shared join link (not one-per-student) may be opened more than once by the
-- same user. Without this, each re-open re-ran the redeem and incremented
-- use_count — burning a slot on capped invites. The guard returns success
-- early (already_member=true) if the caller is already a member of the
-- college for the invite type, without re-inserting or incrementing use_count.
-- Applied live 2026-06-14; this file version-controls the live definition.

CREATE OR REPLACE FUNCTION public.accept_college_invite(p_invite_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  select email into v_email from auth.users where id = v_user;

  -- Idempotency guard: a join link is shared (not one-per-student), so the same
  -- user may open it more than once. If they're already a member of this college
  -- for this invite type, confirm success WITHOUT burning a use or re-inserting.
  if v_invite.invite_type = 'staff' then
    if exists (
      select 1 from college_staff
       where user_id = v_user and college_id = v_invite.college_id
    ) then
      return jsonb_build_object(
        'success', true, 'college_name', v_college_name,
        'invite_type', v_invite.invite_type, 'role', v_invite.role_to_assign,
        'linked', true, 'already_member', true
      );
    end if;
  elsif v_invite.invite_type = 'student' then
    if exists (
      select 1 from college_students
       where user_id = v_user and college_id = v_invite.college_id
    ) then
      return jsonb_build_object(
        'success', true, 'college_name', v_college_name,
        'invite_type', v_invite.invite_type, 'role', v_invite.role_to_assign,
        'linked', true, 'already_member', true
      );
    end if;
  end if;

  if v_invite.invite_type = 'staff' then
    update college_staff
       set user_id = v_user
     where id = (
       select id from college_staff
        where user_id is null
          and college_id = v_invite.college_id
          and v_email is not null
          and lower(btrim(email)) = lower(btrim(v_email))
        order by created_at
        limit 1
     );
    if found then v_linked := true; end if;

    insert into college_staff (user_id, college_id, name, email, role, status)
    select v_user,
           v_invite.college_id,
           coalesce(p.full_name, v_email, 'Staff'),
           coalesce(v_email, ''),
           coalesce(v_invite.role_to_assign, 'tutor'),
           'active'
      from profiles p
     where p.id = v_user
       and not exists (
         select 1 from college_staff
          where user_id = v_user and college_id = v_invite.college_id
       );

  elsif v_invite.invite_type = 'student' then
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
