-- ============================================================================
-- College Hub — the course belongs on the INVITE, not the learner.
--
-- In an FE college the college enrols learners onto a specific qualification;
-- the apprentice does not self-pick it. The previous accept_college_invite
-- resolved the qualification from the learner's own user_qualification_selections
-- and failed if they hadn't chosen one — a dead-end for the college flow.
--
-- This adds college_invites.qualification_id (the college sets it when minting a
-- student code) and makes the RPC take the course from the invite. A legacy
-- fallback to the learner's own selection is kept for any invite created before
-- this column existed.
--
-- Rollback at the bottom.
-- ============================================================================

alter table public.college_invites
  add column if not exists qualification_id uuid references public.qualifications(id);

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
    -- SECURITY: do NOT set profiles.college_id for students.
    select email into v_email from auth.users where id = v_user;

    -- Course comes from the INVITE (the college decides what learners enrol on).
    -- Fall back to the learner's active self-selection only for legacy invites
    -- created before invites carried a qualification.
    v_qual := v_invite.qualification_id;
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

    -- Link an existing (bulk-imported) roll row by email, else create one.
    update college_students
       set user_id = v_user
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
--   alter table public.college_invites drop column if exists qualification_id;
--   -- and restore the prior accept_college_invite body from migration history.
-- ============================================================================
