-- ELE-1911: "Name your safeguarding lead" is a college set-up step.
-- get_college_setup_status gains dsl_named / dsl_linked. Copied from the live
-- definition on 7 Oct; only the two keys are added (older clients ignore them).
begin;

CREATE OR REPLACE FUNCTION public.get_college_setup_status(p_college uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    -- ELE-1911: a named safeguarding lead (DSL or deputy) with a login, so a
    -- concern raised in the app reaches someone.
    'dsl_named', exists (select 1 from college_staff where college_id = v_college and archived_at is null
                          and (is_dsl or is_deputy_dsl)),
    'dsl_linked', exists (select 1 from college_staff where college_id = v_college and archived_at is null
                           and (is_dsl or is_deputy_dsl) and user_id is not null),
    'can_manage', exists (select 1 from college_staff where college_id = v_college and user_id = auth.uid()
                           and archived_at is null and role in ('admin', 'head_of_department'))
                  or public._is_platform_admin()
  ) into v_res;
  return v_res;
end;
$function$;

revoke all on function public.get_college_setup_status(uuid) from public, anon;
grant execute on function public.get_college_setup_status(uuid) to authenticated;

commit;
