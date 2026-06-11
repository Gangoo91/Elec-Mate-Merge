-- ============================================================================
-- College Hub — Cohort Compare server-side aggregation.
--
-- useCohortComparison fetches college_attendance / college_otj_entries /
-- college_epa_judgements / student_risk_scores with .in(studentIds) (no bound)
-- across the selected cohorts, then rolls up per cohort in JS. This returns the
-- SAME per-cohort metrics server-side, mirroring the hook's exact definitions:
--   * avg_progress over non-null progress_percent
--   * pooled attendance % = (Present+Late) / all marks across the cohort
--   * OTJ total/verified hours (verification_status like 'verified%')
--   * EPA verdict buckets with source precedence tutor > ai > learner; silent
--     learners count as no_verdict; not_yet|refer -> not_yet; unknown -> no_verdict
--   * at_risk = current risk level in (high, critical, amber, medium)
--
-- Id-spaces: attendance/epa/risk key on college_students.id; OTJ keys on
-- college_students.user_id (profiles.id). Authorised via _ch_same_college.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.college_cohort_summaries(p_cohort_ids uuid[])
returns table (
  cohort_id          uuid,
  cohort_name        text,
  apprentice_count   bigint,
  avg_progress_pct   int,
  avg_attendance_pct int,
  otj_total_hours    numeric,
  otj_verified_hours numeric,
  epa_ready          bigint,
  epa_almost         bigint,
  epa_not_yet        bigint,
  epa_no_verdict     bigint,
  at_risk            bigint
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  with cs as (
    select c.id, c.user_id, c.cohort_id, c.progress_percent
    from college_students c
    where c.cohort_id = any(p_cohort_ids)
      and coalesce(c.status, '') not in ('withdrawn', 'completed')
      and public._ch_same_college(c.college_id)
  ),
  base as (
    select cohort_id,
           count(*) as apprentice_count,
           round(avg(progress_percent))::int as avg_progress
    from cs group by cohort_id
  ),
  att as (
    select cs.cohort_id,
           count(a.*) as total,
           count(a.*) filter (where a.status in ('Present','Late')) as present_late
    from cs join college_attendance a on a.student_id = cs.id
    group by cs.cohort_id
  ),
  otj as (
    select cs.cohort_id,
           sum(coalesce(o.duration_minutes, 0)) as total_min,
           sum(case when o.verification_status like 'verified%' then coalesce(o.duration_minutes, 0) else 0 end) as verified_min
    from cs join college_otj_entries o on o.student_id = cs.user_id
    group by cs.cohort_id
  ),
  verdicts as (
    select cs.id, cs.cohort_id,
           coalesce(
             max(j.verdict) filter (where j.source = 'tutor'),
             max(j.verdict) filter (where j.source = 'ai'),
             max(j.verdict) filter (where j.source = 'learner')
           ) as verdict
    from cs
    left join college_epa_judgements j on j.college_student_id = cs.id and j.is_current
    group by cs.id, cs.cohort_id
  ),
  vc as (
    select cohort_id,
           count(*) filter (where verdict = 'ready')                as ready,
           count(*) filter (where verdict = 'almost')               as almost,
           count(*) filter (where verdict in ('not_yet','refer'))   as not_yet,
           count(*) filter (where verdict is null or verdict not in ('ready','almost','not_yet','refer')) as no_verdict
    from verdicts group by cohort_id
  ),
  risk as (
    select cs.cohort_id, count(*) as at_risk
    from cs join student_risk_scores r on r.student_id = cs.id and r.is_current
    where lower(r.level) in ('high','critical','amber','medium')
    group by cs.cohort_id
  )
  select
    ch.id,
    ch.name,
    coalesce(base.apprentice_count, 0),
    base.avg_progress,
    case when att.total > 0 then round(att.present_late::numeric / att.total * 100)::int else null end,
    round((coalesce(otj.total_min, 0) / 60.0)::numeric, 1),
    round((coalesce(otj.verified_min, 0) / 60.0)::numeric, 1),
    coalesce(vc.ready, 0),
    coalesce(vc.almost, 0),
    coalesce(vc.not_yet, 0),
    coalesce(vc.no_verdict, 0),
    coalesce(risk.at_risk, 0)
  from unnest(p_cohort_ids) as want(id)
  join college_cohorts ch on ch.id = want.id and public._ch_same_college(ch.college_id)
  left join base on base.cohort_id = ch.id
  left join att  on att.cohort_id  = ch.id
  left join otj  on otj.cohort_id  = ch.id
  left join vc   on vc.cohort_id   = ch.id
  left join risk on risk.cohort_id = ch.id;
$function$;

grant execute on function public.college_cohort_summaries(uuid[]) to authenticated;

-- ============================================================================
-- ROLLBACK:
--   drop function if exists public.college_cohort_summaries(uuid[]);
-- ============================================================================
