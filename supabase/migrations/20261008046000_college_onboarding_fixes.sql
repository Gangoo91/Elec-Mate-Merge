-- College onboarding walk-through fixes (7 Oct 2026). Read-only helpers and a
-- checklist count; nothing here grants access or touches billing.
--
--   get_my_college_offer      a learner on a college roll: their college's name
--                             and the apprentice discount code Elec-Mate linked
--                             to it, for the paywall ("ZZ College has a discount").
--   get_college_setup_status  a cohort created as "Planning" now ticks the
--                             "Create a cohort" step (it only counted "Active").

begin;

create or replace function public.get_my_college_offer()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_college uuid;
  v_name    text;
  v_cohort  text;
  v_code    text;
begin
  if auth.uid() is null then
    return null;
  end if;
  select s.college_id, c.name, co.name
    into v_college, v_name, v_cohort
    from college_students s
    join colleges c on c.id = s.college_id
    left join college_cohorts co on co.id = s.cohort_id
   where s.user_id = auth.uid()
   order by s.created_at
   limit 1;
  if v_college is null then
    return null;
  end if;
  select po.code into v_code
    from college_signup_offers so
    join promo_offers po on po.code = so.apprentice_code
   where so.college_id = v_college and po.is_active
     and (po.expires_at is null or po.expires_at > now());
  return jsonb_build_object('college_name', v_name, 'cohort_name', v_cohort, 'apprentice_offer', v_code);
end;
$$;
revoke all on function public.get_my_college_offer() from public, anon;
grant execute on function public.get_my_college_offer() to authenticated;

create or replace function public.get_college_setup_status(p_college uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_college uuid := coalesce(p_college,
    (select college_id from college_staff where user_id = auth.uid() and archived_at is null order by created_at limit 1));
  v_c       record;
  v_res     jsonb;
begin
  if v_college is null or not public._review_staff_can(v_college) then
    return null;
  end if;
  select id, name, code, awarding_bodies, city, settings into v_c from colleges where id = v_college;

  select jsonb_build_object(
    'college_id', v_c.id,
    'college_name', v_c.name,
    'college_code', v_c.code,
    'dismissed', coalesce((v_c.settings->>'setup_dismissed')::boolean, false),
    'details_done', coalesce(array_length(v_c.awarding_bodies, 1), 0) > 0,
    'courses', (select count(*) from college_courses where college_id = v_college and lower(coalesce(status, 'active')) = 'active'),
    'cohorts', (select count(*) from college_cohorts where college_id = v_college
                 and lower(coalesce(status, 'active')) not in ('archived', 'completed', 'cancelled')),
    'join_codes', (select count(*) from college_invites
                    where college_id = v_college and invite_type = 'student' and is_active
                      and (expires_at is null or expires_at > now())),
    'staff', (select count(*) from college_staff where college_id = v_college and archived_at is null),
    'staff_linked', (select count(*) from college_staff where college_id = v_college and archived_at is null and user_id is not null),
    'learners', (select count(*) from college_students where college_id = v_college),
    'learners_linked', (select count(*) from college_students where college_id = v_college and user_id is not null),
    'registers', (select count(*) from college_attendance a join college_students s on s.id = a.student_id
                   where s.college_id = v_college),
    'can_manage', exists (select 1 from college_staff where college_id = v_college and user_id = auth.uid()
                           and archived_at is null and role in ('admin', 'head_of_department'))
                  or public._is_platform_admin()
  ) into v_res;
  return v_res;
end;
$$;
revoke all on function public.get_college_setup_status(uuid) from public, anon;
grant execute on function public.get_college_setup_status(uuid) to authenticated;

commit;
