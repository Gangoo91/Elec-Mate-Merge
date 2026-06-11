-- ============================================================================
-- College Hub — add attendance_present_late to college_student_summaries.
--
-- Consumers (ProgressTrackingSection) define attendance as Present OR Late, so
-- the summary needs that count alongside the strict Present count. Changing a
-- RETURNS TABLE shape requires drop+recreate; safe because nothing consumes the
-- RPC yet. Re-grants execute afterwards.
--
-- Rollback: restore the prior 12-column definition from migration history.
-- ============================================================================

drop function if exists public.college_student_summaries(uuid);

create function public.college_student_summaries(p_college_id uuid)
returns table (
  student_id              uuid,
  user_id                 uuid,
  otj_verified_minutes    bigint,
  otj_pending_minutes     bigint,
  portfolio_total         bigint,
  portfolio_completed     bigint,
  submissions_pending     bigint,
  ac_total                bigint,
  ac_assessed             bigint,
  attendance_present      bigint,
  attendance_present_late bigint,
  attendance_total        bigint,
  risk_level              text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select
    cs.id                              as student_id,
    cs.user_id                         as user_id,
    coalesce(otj.verified_min, 0)      as otj_verified_minutes,
    coalesce(otj.pending_min, 0)       as otj_pending_minutes,
    coalesce(pi.total, 0)              as portfolio_total,
    coalesce(pi.completed, 0)          as portfolio_completed,
    coalesce(sub.pending, 0)           as submissions_pending,
    coalesce(ac.total, 0)              as ac_total,
    coalesce(ac.assessed, 0)           as ac_assessed,
    coalesce(att.present, 0)           as attendance_present,
    coalesce(att.present_late, 0)      as attendance_present_late,
    coalesce(att.total, 0)             as attendance_total,
    risk.level                         as risk_level
  from college_students cs
  left join lateral (
    select
      sum(case when verification_status = 'verified' then coalesce(duration_minutes, 0) else 0 end) as verified_min,
      sum(case when verification_status = 'pending'  then coalesce(duration_minutes, 0) else 0 end) as pending_min
    from college_otj_entries where student_id = cs.user_id
  ) otj on true
  left join lateral (
    select count(*) as total,
           count(*) filter (where status = 'completed') as completed
    from portfolio_items where user_id = cs.user_id
  ) pi on true
  left join lateral (
    select count(*) filter (where status in ('submitted','under_review','resubmitted')) as pending
    from portfolio_submissions where user_id = cs.user_id
  ) sub on true
  left join lateral (
    select count(*) as total,
           count(*) filter (where status = 'assessed') as assessed
    from student_ac_coverage where student_id = cs.id
  ) ac on true
  left join lateral (
    select count(*) as total,
           count(*) filter (where status = 'Present') as present,
           count(*) filter (where status in ('Present','Late')) as present_late
    from college_attendance where student_id = cs.id
  ) att on true
  left join lateral (
    select level from student_risk_scores
     where student_id = cs.id and is_current
     limit 1
  ) risk on true
  where cs.college_id = p_college_id
    and public._ch_same_college(p_college_id);
$function$;

grant execute on function public.college_student_summaries(uuid) to authenticated;

-- ============================================================================
-- ROLLBACK:
--   drop function if exists public.college_student_summaries(uuid);
--   -- recreate the prior 12-column version from migration 20260610_college_student_summaries.
-- ============================================================================
