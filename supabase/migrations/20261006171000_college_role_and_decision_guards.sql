-- Foundation fixes (ELE-1914 / ELE-1898), proved 6 Oct with fixture accounts in
-- rolled-back transactions:
--  1. A tutor could UPDATE their own college_staff row to role='admin',
--     is_dsl=true; tg_sync_staff_profile then copied 'admin' to their profile.
--  2. A learner could INSERT a portfolio_submissions row already
--     status='signed_off', grade='Distinction', iqa_outcome='verified'; and
--     while status stayed 'submitted' could write grade/feedback.
--  3. A learner could UPDATE any column of their tripartite review (outcomes,
--     status, other parties' signatures).
-- Direct client writes only (current_user authenticated/anon). Service role and
-- SECURITY DEFINER code are untouched. Platform admins bypass.

create or replace function public._is_platform_admin()
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and admin_role is not null);
$$;

-- Caller manages staff at this college: an active admin / head of department
-- there, or the college has no linked manager yet (so a new college can set up).
create or replace function public._can_manage_college_staff(p_college uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select
    exists (
      select 1 from public.college_staff s
      where s.college_id = p_college and s.user_id = auth.uid() and s.archived_at is null
        and s.role in ('admin', 'head_of_department'))
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.college_id = p_college and p.college_role = 'admin')
    or (
      not exists (
        select 1 from public.college_staff s
        where s.college_id = p_college and s.user_id is not null and s.archived_at is null
          and s.role in ('admin', 'head_of_department'))
      and exists (
        select 1 from public.college_staff s
        where s.college_id = p_college and s.user_id = auth.uid() and s.archived_at is null));
$$;

-- 1. college_staff -----------------------------------------------------------
create or replace function public._college_staff_role_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
declare v_college uuid := coalesce(new.college_id, old.college_id);
begin
  if current_user not in ('authenticated', 'anon') or public._is_platform_admin() then
    return coalesce(new, old);
  end if;
  if public._can_manage_college_staff(v_college) then
    -- managers may not move a row to another college they don't manage
    if tg_op = 'UPDATE' and new.college_id is distinct from old.college_id
       and not public._can_manage_college_staff(new.college_id) then
      raise exception 'cannot move staff to another college' using errcode = '42501';
    end if;
    return coalesce(new, old);
  end if;
  if tg_op <> 'UPDATE' or old.user_id is distinct from auth.uid() then
    raise exception 'only a college admin or head of department can manage staff'
      using errcode = '42501';
  end if;
  if new.role is distinct from old.role
  or new.college_id is distinct from old.college_id
  or new.user_id is distinct from old.user_id
  or new.status is distinct from old.status
  or new.archived_at is distinct from old.archived_at
  or new.archived_by is distinct from old.archived_by
  or new.is_dsl is distinct from old.is_dsl
  or new.is_deputy_dsl is distinct from old.is_deputy_dsl
  or new.is_prevent_lead is distinct from old.is_prevent_lead
  or new.is_h_and_s_lead is distinct from old.is_h_and_s_lead
  or new.is_quality_nominee is distinct from old.is_quality_nominee
  or new.is_mental_health_lead is distinct from old.is_mental_health_lead then
    raise exception 'only a college admin or head of department can change roles or lead duties'
      using errcode = '42501';
  end if;
  return new;
end; $$;

drop trigger if exists trg_college_staff_role_guard on public.college_staff;
create trigger trg_college_staff_role_guard
  before insert or update or delete on public.college_staff
  for each row execute function public._college_staff_role_guard();

-- 2. portfolio_submissions ---------------------------------------------------
create or replace function public._portfolio_submissions_owner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') or public._is_platform_admin() then
    return new;
  end if;
  -- Only the learner's own writes are constrained; staff writes are governed by RLS.
  if new.user_id is distinct from auth.uid() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    if coalesce(new.status, 'submitted') not in ('draft', 'submitted')
       or new.grade is not null or new.assessor_feedback is not null
       or new.assessor_id is not null or new.signed_off_at is not null or new.signed_off_by is not null
       or new.reviewed_at is not null or new.reviewed_by is not null or new.review_started_at is not null
       or coalesce(new.iqa_sampled, false) or new.iqa_sampled_at is not null or new.iqa_sampled_by is not null
       or new.iqa_verified_at is not null or new.iqa_verified_by is not null
       or new.iqa_feedback is not null or new.iqa_outcome is not null
       or new.strengths_noted is not null or new.areas_for_improvement is not null
       or new.action_required is not null or new.last_feedback_at is not null then
      raise exception 'a new submission starts unassessed' using errcode = '42501';
    end if;
    return new;
  end if;
  if new.status is distinct from old.status and new.status not in ('draft', 'submitted', 'resubmitted') then
    raise exception 'only an assessor can set that status' using errcode = '42501';
  end if;
  -- Resubmitting clears the last grade and feedback; a learner may never set them.
  if (new.grade is distinct from old.grade and new.grade is not null)
  or (new.assessor_feedback is distinct from old.assessor_feedback and new.assessor_feedback is not null)
  or new.assessor_id is distinct from old.assessor_id
  or new.signed_off_at is distinct from old.signed_off_at
  or new.signed_off_by is distinct from old.signed_off_by
  or new.reviewed_at is distinct from old.reviewed_at
  or new.reviewed_by is distinct from old.reviewed_by
  or new.iqa_sampled is distinct from old.iqa_sampled
  or new.iqa_sampled_at is distinct from old.iqa_sampled_at
  or new.iqa_sampled_by is distinct from old.iqa_sampled_by
  or new.iqa_verified_at is distinct from old.iqa_verified_at
  or new.iqa_verified_by is distinct from old.iqa_verified_by
  or new.iqa_feedback is distinct from old.iqa_feedback
  or new.iqa_outcome is distinct from old.iqa_outcome
  or new.strengths_noted is distinct from old.strengths_noted
  or new.areas_for_improvement is distinct from old.areas_for_improvement
  or new.action_required is distinct from old.action_required
  or new.last_feedback_at is distinct from old.last_feedback_at then
    raise exception 'assessment fields can only be set by an assessor' using errcode = '42501';
  end if;
  return new;
end; $$;

drop trigger if exists trg_portfolio_submissions_owner_guard on public.portfolio_submissions;
create trigger trg_portfolio_submissions_owner_guard
  before insert or update on public.portfolio_submissions
  for each row execute function public._portfolio_submissions_owner_guard();

-- 3. college_tripartite_reviews ----------------------------------------------
-- The learner may only add their own signature (student_signed_at / student_name).
create or replace function public._tripartite_learner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
declare
  v_is_learner boolean;
  v_old jsonb := coalesce(old.signatures, '{}'::jsonb);
  v_new jsonb := coalesce(new.signatures, '{}'::jsonb);
begin
  if current_user not in ('authenticated', 'anon') or public._is_platform_admin()
     or public._ch_same_college(old.college_id) then
    return new;
  end if;
  select exists (select 1 from public.college_students s where s.id = old.student_id and s.user_id = auth.uid())
    into v_is_learner;
  if not v_is_learner then
    return new; -- RLS decides
  end if;
  if (to_jsonb(new) - 'signatures' - 'updated_at') is distinct from (to_jsonb(old) - 'signatures' - 'updated_at')
  or (v_new - 'student_signed_at' - 'student_name') is distinct from (v_old - 'student_signed_at' - 'student_name') then
    raise exception 'you can only add your own signature to a review' using errcode = '42501';
  end if;
  return new;
end; $$;

drop trigger if exists trg_tripartite_learner_guard on public.college_tripartite_reviews;
create trigger trg_tripartite_learner_guard
  before update on public.college_tripartite_reviews
  for each row execute function public._tripartite_learner_guard();
