-- ============================================================================
-- College Hub — Phase 2: portfolio dashboard server-side aggregation.
--
-- useCollegePortfolios fans out 4 unbounded .in('user_id', studentIds) queries
-- (portfolio_items, portfolio_submissions, unit_coverage_matrix,
-- epa_gateway_checklist) plus a KSB count, then does .filter().length per
-- student in JavaScript — shipping 10K-35K rows to the browser at 200 learners.
--
-- This returns the SAME counts per assignment, computed server-side via indexed
-- lateral lookups. It mirrors the hook's exact status vocabulary so the
-- displayed numbers are identical (the hook keeps deriving its percentages from
-- these counts). Self-scoped: the caller only sees assignments where they are
-- the tutor / assessor / IQA.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.college_portfolio_summaries()
returns table (
  assignment_id        uuid,
  student_id           uuid,
  qualification_id     uuid,
  total_entries        bigint,
  completed_entries    bigint,
  draft_entries        bigint,
  reviewed_entries     bigint,
  awaiting_review      bigint,
  feedback_given       bigint,
  signed_off           bigint,
  categories_complete  bigint,
  categories_total     bigint,
  ojt_hours_completed  numeric,
  ojt_hours_required   numeric,
  gateway_passed       boolean,
  ksbs_total           bigint
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select
    a.id                                  as assignment_id,
    a.student_id                          as student_id,
    a.qualification_id                    as qualification_id,
    coalesce(pi.total, 0)                 as total_entries,
    coalesce(pi.completed, 0)             as completed_entries,
    coalesce(pi.draft, 0)                 as draft_entries,
    coalesce(pi.reviewed, 0)              as reviewed_entries,
    coalesce(sub.awaiting, 0)             as awaiting_review,
    coalesce(sub.feedback, 0)             as feedback_given,
    coalesce(sub.signed, 0)               as signed_off,
    coalesce(cov.complete, 0)             as categories_complete,
    coalesce(cov.total, 0)                as categories_total,
    coalesce(g.ojt_hours_completed, 0)    as ojt_hours_completed,
    coalesce(g.ojt_hours_required, 400)   as ojt_hours_required,
    coalesce(g.gateway_passed, false)     as gateway_passed,
    coalesce(ksb.total, 0)                as ksbs_total
  from college_student_assignments a
  left join lateral (
    select count(*) as total,
           count(*) filter (where status = 'completed') as completed,
           count(*) filter (where status = 'draft')     as draft,
           count(*) filter (where status = 'reviewed')  as reviewed
    from portfolio_items where user_id = a.student_id
  ) pi on true
  left join lateral (
    select count(*) filter (where status in ('submitted','under_review','resubmitted')) as awaiting,
           count(*) filter (where status = 'feedback_given')                              as feedback,
           count(*) filter (where status in ('signed_off','iqa_sampled','iqa_verified'))  as signed
    from portfolio_submissions where user_id = a.student_id
  ) sub on true
  left join lateral (
    select count(*) filter (where status = 'complete') as complete,
           count(*)                                     as total
    from unit_coverage_matrix where user_id = a.student_id
  ) cov on true
  left join lateral (
    select ojt_hours_completed, ojt_hours_required, gateway_passed
    from epa_gateway_checklist
    where user_id = a.student_id and qualification_id = a.qualification_id
    limit 1
  ) g on true
  left join lateral (
    select count(*) as total
    from apprenticeship_ksbs where qualification_id = a.qualification_id
  ) ksb on true
  where a.status = 'active'
    and (a.tutor_id = auth.uid() or a.assessor_id = auth.uid() or a.iqa_id = auth.uid());
$function$;

grant execute on function public.college_portfolio_summaries() to authenticated;

-- ============================================================================
-- ROLLBACK:
--   drop function if exists public.college_portfolio_summaries();
-- ============================================================================
