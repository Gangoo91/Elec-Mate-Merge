-- College pilot access, white-glove acting (7 Oct 2026).
--
-- college_can() belongs to the staff roles / permissions work
-- (20261008050000_college_permissions_matrix.sql). This re-creates the LIVE
-- definition verbatim with ONE added clause: a platform admin with an open
-- acting session for that college (_acting_for_college, 20261008049100) gets
-- a college admin's rights there, except safeguarding. If college_can is
-- replaced again later, keep this clause or white-glove set-up stops working.

begin;
set local lock_timeout = '8s';

create or replace function public.college_can(p_action text, p_college uuid, p_student uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_uid uuid := auth.uid();
  s public.college_staff%rowtype;
  v_ro boolean;
begin
  if v_uid is null or p_college is null or p_action is null then
    return false;
  end if;

  -- A learner named must belong to this college (by college_students.id or user id).
  if p_student is not null and not exists (
       select 1 from public.college_students cs
       where cs.college_id = p_college and (cs.id = p_student or cs.user_id = p_student)) then
    return false;
  end if;

  -- White-glove set-up (college pilot access, 7 Oct 2026): an Elec-Mate
  -- platform admin with an open acting session for THIS college sets it up
  -- with a college admin's rights (cohorts, learners, staff, roles), every
  -- write logged by tg_college_acting_audit. Never safeguarding.
  if p_action not like 'safeguarding.%' and public._acting_for_college(p_college) then
    return true;
  end if;

  -- Elec-Mate platform admins keep exactly the rights the old helpers gave
  -- them (read learners, assess, IQA). Never safeguarding, never settings.
  if p_action in ('learners.view_all', 'learners.view_mine', 'assess.decide', 'iqa.verdict')
     and public._is_platform_admin() then
    return true;
  end if;

  select st.* into s
  from public.college_staff st
  where st.college_id = p_college
    and st.user_id = v_uid
    and st.archived_at is null
    and lower(coalesce(st.status, 'active')) <> 'archived'
  order by (st.role in ('admin', 'head_of_department')) desc, st.created_at
  limit 1;

  if not found then
    -- Legacy: a profile marked college admin with no staff row (pre-2026 set-ups).
    if p_action in ('staff.manage', 'staff.grant_roles', 'settings.manage', 'cohorts.manage')
       and exists (select 1 from public.profiles p
                   where p.id = v_uid and p.college_id = p_college and p.college_role = 'admin') then
      return true;
    end if;
    return false;
  end if;

  v_ro := exists (select 1 from public.college_role_capabilities rc
                  where rc.role = s.role and rc.capability = 'read_only');

  -- Safeguarding follows the duty flags, not the role (and the no-lead fallback).
  if p_action in ('safeguarding.read', 'safeguarding.manage') then
    return public._safeguarding_reader_staff_id(p_college) is not null;
  end if;

  -- "Is this learner one of mine?"
  if p_action = 'learners.view_mine' and p_student is not null then
    return exists (
        select 1 from public.college_students cs
        join public.college_cohorts c on c.id = cs.cohort_id
        where cs.college_id = p_college and (cs.id = p_student or cs.user_id = p_student)
          and c.tutor_id = s.id)
      or exists (
        select 1 from public.college_student_assignments a
        join public.college_students cs on cs.user_id = a.student_id or cs.id = a.student_id
        where cs.college_id = p_college and (cs.id = p_student or cs.user_id = p_student)
          and v_uid in (a.tutor_id, a.assessor_id, a.iqa_id));
  end if;

  if exists (select 1 from public.college_role_capabilities rc
             where rc.role = s.role and rc.capability = p_action) then
    return true;
  end if;

  if v_ro then
    return false;
  end if;

  -- Duty flags and qualifications on top of the role.
  if p_action in ('quality.view', 'quality.edit') and coalesce(s.is_quality_nominee, false) then
    return true;
  end if;
  if p_action = 'iqa.sample' and (coalesce(s.is_quality_nominee, false) or s.iqa_qual is not null) then
    return true;
  end if;

  -- Bootstrap: a college with no linked admin / head of department yet lets
  -- its active staff run the basics. Granting roles is never bootstrapped.
  if p_action in ('staff.manage', 'cohorts.manage', 'settings.manage')
     and not exists (select 1 from public.college_staff m
                     where m.college_id = p_college and m.user_id is not null and m.archived_at is null
                       and m.role in ('admin', 'head_of_department')) then
    return true;
  end if;

  return false;
end;
$function$
;

commit;
