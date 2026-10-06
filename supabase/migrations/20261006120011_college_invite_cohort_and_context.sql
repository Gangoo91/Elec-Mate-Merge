-- ============================================================================
-- College Hub — January demo readiness (6 Oct 2026)
--
-- 1. college_invites.cohort_id — a learner join code now enrols into a COHORT,
--    not just a course. Before this, a learner who joined by code landed with
--    cohort_id NULL and so missed every cohort-scoped view (timetable, cohort
--    quizzes, the tutor's "my learners").
-- 2. accept_college_invite — rewritten:
--      * distinct, human error codes (invite_not_found / invite_inactive /
--        invite_expired / invite_full / already_in_other_college) instead of
--        one "Invalid or expired invite code";
--      * refuses a cross-college join cleanly (the old path skipped the roll
--        insert but still wrote an assignment row — split identity);
--      * sets cohort + course on the roll row and on the assignment row, and
--        sets the assignment's tutor from the cohort tutor;
--      * returns cohort / course / qualification / tutor so the client can
--        confirm the link properly.
-- 3. get_my_college_context() — one SECURITY DEFINER read that gives a signed-
--    in user their learner context (college, cohort, course, qualification,
--    tutor) and/or their staff context (college, role, own cohorts). Learners
--    cannot read college_cohorts / college_courses / college_staff under RLS
--    (those need college_role), so without this the apprentice side could
--    never show its own cohort or tutor.
-- ============================================================================

alter table public.college_invites
  add column if not exists cohort_id uuid references public.college_cohorts(id) on delete set null;

create index if not exists idx_college_invites_cohort on public.college_invites(cohort_id);

comment on column public.college_invites.cohort_id is
  'Learner invites: the cohort the redeeming learner is enrolled into. Course is taken from the cohort when course_id is null.';

-- ---------------------------------------------------------------------------
create or replace function public.accept_college_invite(p_invite_code text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_invite          record;
  v_user            uuid;
  v_email           text;
  v_college_name    text;
  v_cohort          uuid;
  v_cohort_name     text;
  v_cohort_course   uuid;
  v_cohort_tutor    uuid;   -- college_staff.id
  v_course          uuid;
  v_course_name     text;
  v_qual            uuid;
  v_qual_title      text;
  v_tutor_user      uuid;   -- profiles.id of the cohort tutor
  v_tutor_name      text;
  v_existing        record;
  v_student_id      uuid;
  v_other_college   text;
  v_linked          boolean := false;
  v_already         boolean := false;
begin
  v_user := auth.uid();
  if v_user is null then
    return jsonb_build_object('error', 'not_authenticated', 'message', 'Sign in first, then open the link again.');
  end if;

  select * into v_invite
    from college_invites
   where invite_code = upper(btrim(p_invite_code));

  if v_invite is null then
    return jsonb_build_object(
      'error',   'invite_not_found',
      'message', 'That code does not match a college invite. Check it with your tutor. A college discount code is a different code and goes in at sign-up.'
    );
  end if;
  if not coalesce(v_invite.is_active, false) then
    return jsonb_build_object('error', 'invite_inactive',
      'message', 'This invite has been switched off by the college. Ask your tutor for a new link.');
  end if;
  if v_invite.expires_at is not null and v_invite.expires_at <= now() then
    return jsonb_build_object('error', 'invite_expired',
      'message', format('This invite expired on %s. Ask your tutor for a new link.', to_char(v_invite.expires_at, 'DD Mon YYYY')));
  end if;
  if v_invite.max_uses is not null and v_invite.use_count >= v_invite.max_uses then
    return jsonb_build_object('error', 'invite_full',
      'message', 'This invite has already been used as many times as it allows. Ask your tutor for a new link.');
  end if;

  select name into v_college_name from colleges where id = v_invite.college_id;
  select email into v_email from auth.users where id = v_user;

  -- ======================================================================
  -- STAFF
  -- ======================================================================
  if v_invite.invite_type = 'staff' then
    if exists (select 1 from college_staff where user_id = v_user and college_id = v_invite.college_id) then
      return jsonb_build_object(
        'success', true, 'college_name', v_college_name, 'invite_type', 'staff',
        'role', v_invite.role_to_assign, 'linked', true, 'already_member', true
      );
    end if;

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
       and not exists (select 1 from college_staff where user_id = v_user and college_id = v_invite.college_id);

    update college_invites set use_count = use_count + 1 where id = v_invite.id;

    return jsonb_build_object(
      'success', true, 'college_name', v_college_name, 'invite_type', 'staff',
      'role', v_invite.role_to_assign, 'linked', v_linked
    );
  end if;

  -- ======================================================================
  -- LEARNER
  -- ======================================================================
  if v_invite.invite_type <> 'student' then
    return jsonb_build_object('error', 'invite_type_unknown', 'message', 'This invite is not a learner invite.');
  end if;

  -- Resolve cohort → course → qualification (never raise here; a legacy
  -- invite with only a course still works).
  v_cohort := v_invite.cohort_id;
  v_course := v_invite.course_id;
  if v_cohort is not null then
    select name, course_id, tutor_id
      into v_cohort_name, v_cohort_course, v_cohort_tutor
      from college_cohorts
     where id = v_cohort and college_id = v_invite.college_id;
    if not found then
      v_cohort := null;
    else
      v_course := coalesce(v_course, v_cohort_course);
    end if;
  end if;
  if v_course is not null then
    select qualification_id, name into v_qual, v_course_name from college_courses where id = v_course;
  end if;
  if v_qual is null then v_qual := v_invite.qualification_id; end if;
  if v_qual is not null then
    select title into v_qual_title from qualifications where id = v_qual;
  end if;
  if v_cohort_tutor is not null then
    select user_id, name into v_tutor_user, v_tutor_name
      from college_staff where id = v_cohort_tutor and archived_at is null;
  end if;

  -- Existing membership anywhere? One account ↔ one college (uq_college_students_user_id).
  select cs.id, cs.college_id, cs.cohort_id, cs.course_id
    into v_existing
    from college_students cs
   where cs.user_id = v_user
   limit 1;

  if found then
    if v_existing.college_id <> v_invite.college_id then
      select name into v_other_college from colleges where id = v_existing.college_id;
      return jsonb_build_object(
        'error', 'already_in_other_college',
        'message', format('Your account is already linked to %s. One account links to one college. If you have moved, ask your new college to contact Elec-Mate.', coalesce(v_other_college, 'another college')),
        'other_college_name', v_other_college
      );
    end if;

    -- Same college: already a member. Fill in a missing cohort / course from
    -- this invite, never overwrite what the college has set.
    update college_students
       set cohort_id = coalesce(cohort_id, v_cohort),
           course_id = coalesce(course_id, v_course)
     where id = v_existing.id;
    v_student_id := v_existing.id;
    v_linked  := true;
    v_already := true;
  else
    if v_qual is null then
      -- Last resort: the learner's own active selection.
      select q.id into v_qual
        from user_qualification_selections uqs
        join qualifications q on q.id = uqs.qualification_id
       where uqs.user_id = v_user and uqs.is_active = true
       limit 1;
    end if;
    if v_qual is null then
      return jsonb_build_object(
        'error', 'no_course_on_invite',
        'message', 'This invite is not linked to a course yet. Ask your college to reissue it.'
      );
    end if;

    -- Pre-loaded roster row with the same email → link it.
    update college_students
       set user_id   = v_user,
           cohort_id = coalesce(cohort_id, v_cohort),
           course_id = coalesce(course_id, v_course)
     where id = (
       select cs.id
         from college_students cs
        where cs.user_id is null
          and cs.college_id = v_invite.college_id
          and v_email is not null
          and lower(btrim(cs.email)) = lower(btrim(v_email))
        order by cs.created_at
        limit 1
     )
     returning id into v_student_id;

    if v_student_id is not null then
      v_linked := true;
    else
      insert into college_students (user_id, college_id, course_id, cohort_id, name, email, status, start_date)
      values (
        v_user,
        v_invite.college_id,
        v_course,
        v_cohort,
        coalesce((select full_name from profiles where id = v_user), v_email, 'Apprentice'),
        coalesce(v_email, ''),
        'Active',
        current_date
      )
      returning id into v_student_id;
    end if;
  end if;

  -- Re-read what the roll row actually holds (a pre-loaded row may carry its
  -- own cohort/course) so the response describes reality.
  select co.name, co.tutor_id, cc.name, cc.qualification_id
    into v_cohort_name, v_cohort_tutor, v_course_name, v_qual
    from college_students cs
    left join college_cohorts co on co.id = cs.cohort_id
    left join college_courses cc on cc.id = cs.course_id
   where cs.id = v_student_id;
  if v_qual is not null then
    select title into v_qual_title from qualifications where id = v_qual;
  end if;
  v_tutor_user := null; v_tutor_name := null;
  if v_cohort_tutor is not null then
    select user_id, name into v_tutor_user, v_tutor_name
      from college_staff where id = v_cohort_tutor and archived_at is null;
  end if;
  select cs.cohort_id into v_cohort from college_students cs where cs.id = v_student_id;

  -- Assignment row (the id space the tutor/assessor dashboards read).
  if not exists (
    select 1 from college_student_assignments
     where student_id = v_user and college_id = v_invite.college_id
  ) then
    insert into college_student_assignments
      (student_id, college_id, college_name, qualification_id, cohort_id, cohort_name, tutor_id, start_date, status)
    values
      (v_user, v_invite.college_id, v_college_name, v_qual,
       case when v_cohort is null then null else v_cohort::text end,
       v_cohort_name, v_tutor_user, current_date, 'active');
  else
    update college_student_assignments
       set cohort_id        = coalesce(cohort_id, case when v_cohort is null then null else v_cohort::text end),
           cohort_name      = coalesce(cohort_name, v_cohort_name),
           tutor_id         = coalesce(tutor_id, v_tutor_user),
           qualification_id = coalesce(qualification_id, v_qual)
     where student_id = v_user and college_id = v_invite.college_id;
  end if;

  if not v_already then
    update college_invites set use_count = use_count + 1 where id = v_invite.id;
  end if;

  return jsonb_build_object(
    'success',             true,
    'college_name',        v_college_name,
    'invite_type',         'student',
    'role',                null,
    'linked',              v_linked,
    'already_member',      v_already,
    'student_id',          v_student_id,
    'cohort_name',         v_cohort_name,
    'course_name',         v_course_name,
    'qualification_title', v_qual_title,
    'tutor_name',          v_tutor_name
  );
end;
$function$;

grant execute on function public.accept_college_invite(text) to authenticated;

-- ---------------------------------------------------------------------------
create or replace function public.get_my_college_context()
 returns jsonb
 language sql
 stable
 security definer
 set search_path to 'public'
as $function$
  with me as (select auth.uid() as uid),
  learner as (
    select
      cs.id                     as student_id,
      cs.college_id,
      cs.cohort_id,
      cs.course_id,
      cs.name                   as student_name,
      cs.status,
      cs.start_date,
      cs.expected_end_date,
      cs.otj_required_hours,
      c.name                    as college_name,
      c.code                    as college_code,
      co.name                   as cohort_name,
      co.start_date             as cohort_start_date,
      co.end_date               as cohort_end_date,
      cc.name                   as course_name,
      cc.code                   as course_code,
      cc.level                  as course_level,
      cc.qualification_id,
      q.code                    as qualification_code,
      q.title                   as qualification_title,
      q.awarding_body,
      coalesce(
        st.name,
        (select s2.name
           from college_student_assignments csa
           join college_staff s2 on s2.user_id = csa.tutor_id
          where csa.student_id = (select uid from me)
            and csa.college_id = cs.college_id
          limit 1)
      )                         as tutor_name,
      coalesce(
        st.user_id,
        (select csa.tutor_id
           from college_student_assignments csa
          where csa.student_id = (select uid from me)
            and csa.college_id = cs.college_id
          limit 1)
      )                         as tutor_user_id,
      (select count(*) from college_students x where x.cohort_id = cs.cohort_id and cs.cohort_id is not null) as cohort_size
    from college_students cs
    join colleges c          on c.id  = cs.college_id
    left join college_cohorts co on co.id = cs.cohort_id
    left join college_courses cc on cc.id = cs.course_id
    left join qualifications q   on q.id  = cc.qualification_id
    left join college_staff st   on st.id = co.tutor_id and st.archived_at is null
    where cs.user_id = (select uid from me)
    limit 1
  ),
  staff as (
    select
      s.id                      as staff_id,
      s.college_id,
      s.role,
      s.name,
      c.name                    as college_name,
      c.code                    as college_code,
      (select coalesce(jsonb_agg(jsonb_build_object(
                 'id', co.id, 'name', co.name,
                 'members', (select count(*) from college_students x where x.cohort_id = co.id)
               ) order by co.name), '[]'::jsonb)
         from college_cohorts co
        where co.tutor_id = s.id)                                   as my_cohorts,
      (select count(*) from college_cohorts co where co.college_id = s.college_id) as cohort_count,
      (select count(*) from college_students x where x.college_id = s.college_id) as learner_count,
      (select count(*) from college_staff x where x.college_id = s.college_id and x.archived_at is null) as staff_count
    from college_staff s
    join colleges c on c.id = s.college_id
    where s.user_id = (select uid from me)
      and s.archived_at is null
    order by s.created_at
    limit 1
  )
  select jsonb_build_object(
    'learner', (select to_jsonb(l) from learner l),
    'staff',   (select to_jsonb(s) from staff s)
  );
$function$;

grant execute on function public.get_my_college_context() to authenticated;
