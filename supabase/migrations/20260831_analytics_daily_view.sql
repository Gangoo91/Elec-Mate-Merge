-- Server-side activity rollup — the numbers that are actually true.
--
-- Client-side funnel events under-report product activity by orders of
-- magnitude: browser events only see what the browser does, and most of this
-- product's work happens in autosaves and server-side jobs. Measured over the
-- 30 days to 2026-08-31:
--     study activity  1,631 logged (335 hours) →  0 events (nothing wired)
--     mock exams      3,779 attempts           →  0
--     course pages    3,441 nav rows           →  0
--     AI (all)          309                    →  0 (trackAiChat* never called)
--     certs             375                    →  20 `cert_generated` (PDFs)
--     quotes            358                    →  1  (autosave bypasses it)
--     RAMS               36                    →  0
--     invoices           12                    →  10 — accurate, fires on click
--
-- Client analytics stays for ACQUISITION only; anonymous pre-signup visitors do
-- not exist in this database. Everything after signup is counted here.
--
-- Cert/quote/invoice counts filter `deleted_at is null`; without it the figures
-- overstate, which has misled the investor numbers before.
--
-- No new-subscription column by design: `profiles.subscription_start` is set on
-- 1,739 profiles (every account ever) against 535 actually subscribed, because
-- the Stripe webhook guards on the payload it is building rather than the
-- stored row and rewrites it on every billing event. Use Stripe/RevenueCat.

drop view if exists public.analytics_daily;

create view public.analytics_daily as
with days as (
  select generate_series(
    (current_date - interval '89 days')::date, current_date, interval '1 day'
  )::date as day
)
select
  d.day,

  -- ── Acquisition ──────────────────────────────────────────────
  (select count(*) from auth.users u
     where u.created_at::date = d.day)                                as accounts_created,

  -- ── Trade work ───────────────────────────────────────────────
  (select count(*) from public.quotes q
     where q.deleted_at is null and q.created_at::date = d.day)       as quotes_created,
  (select count(*) from public.quotes q
     where q.deleted_at is null and q.created_at::date = d.day
       and q.status = 'sent')                                         as quotes_sent,
  -- 'approved' is the real accepted state here; 'accepted' is not used.
  (select count(*) from public.quotes q
     where q.deleted_at is null and q.created_at::date = d.day
       and q.status = 'approved')                                     as quotes_approved,
  (select count(*) from public.reports r
     where r.deleted_at is null and r.created_at::date = d.day)       as certs_created,
  (select count(*) from public.invoices i
     where i.deleted_at is null and i.created_at::date = d.day)       as invoices_created,
  (select count(*) from public.site_visits s
     where s.created_at::date = d.day)                                as site_visits,

  -- ── Safety / RAMS ────────────────────────────────────────────
  (select count(*) from public.rams_generation_jobs g
     where g.created_at::date = d.day)                                as rams_jobs,
  (select count(*) from public.rams_documents rd
     where rd.created_at::date = d.day)                               as rams_documents,

  -- ── AI ───────────────────────────────────────────────────────
  -- Specialist agents summed; each has its own job table, and counting them
  -- separately buries the fact that AI is used ~10x a day in total.
  (select
     (select count(*) from public.cost_engineer_jobs j where j.created_at::date = d.day)
   + (select count(*) from public.circuit_design_jobs j where j.created_at::date = d.day)
   + (select count(*) from public.commissioning_jobs j where j.created_at::date = d.day)
   + (select count(*) from public.installation_method_jobs j where j.created_at::date = d.day)
   + (select count(*) from public.maintenance_method_jobs j where j.created_at::date = d.day)
   + (select count(*) from public.health_safety_jobs j where j.created_at::date = d.day)
  )                                                                   as ai_specialist_jobs,
  (select count(*) from public.ai_chat_history a
     where a.created_at::date = d.day)                                as ai_chat_messages,

  -- ── Study Centre ─────────────────────────────────────────────
  -- `learning_activity_log` is the richest signal in the product: typed
  -- activities with real durations. 335 hours from 170 learners in the 30 days
  -- to 2026-08-31, none of it previously visible anywhere.
  (select count(distinct l.user_id) from public.learning_activity_log l
     where l.created_at::date = d.day)                                as study_learners,
  (select coalesce(sum(l.duration_minutes), 0) from public.learning_activity_log l
     where l.created_at::date = d.day)                                as study_minutes,
  (select count(*) from public.learning_activity_log l
     where l.created_at::date = d.day and l.activity_type = 'study_module')
                                                                      as study_modules,
  (select count(*) from public.learning_activity_log l
     where l.created_at::date = d.day and l.activity_type = 'quiz_completed')
                                                                      as quizzes_completed,
  (select count(*) from public.learning_activity_log l
     where l.created_at::date = d.day and l.activity_type = 'flashcard_session')
                                                                      as flashcard_sessions,
  (select count(*) from public.learning_activity_log l
     where l.created_at::date = d.day and l.activity_type = 'video_watched')
                                                                      as videos_watched,
  -- ⚠️ course_progress is a NAVIGATION tracker (50 = arrived on a page,
  -- 100 = left it), NOT completion. Counted as page traffic, never as
  -- "courses completed".
  (select count(*) from public.course_progress cp
     where cp.created_at::date = d.day)                               as course_page_events,
  (select count(distinct cp.user_id) from public.course_progress cp
     where cp.created_at::date = d.day)                               as course_page_users,
  (select count(*) from public.seo_mock_attempts m
     where m.created_at::date = d.day)                                as mock_exam_attempts,
  (select count(*) from public.am2_mock_sessions a
     where a.created_at::date = d.day)                                as am2_mock_sessions,

  -- ── Churn ────────────────────────────────────────────────────
  (select count(*) from public.cancel_survey_responses c
     where c.created_at::date = d.day)                                as cancel_flows,
  (select count(*) from public.cancel_survey_responses c
     where c.created_at::date = d.day and c.outcome = 'cancelled')    as cancellations,

  -- Distinct humans who produced billable work that day — more meaningful than
  -- raw counts, since one person can raise twenty quotes in an afternoon.
  (select count(distinct x.user_id) from (
      select user_id, created_at, deleted_at from public.quotes
      union all
      select user_id, created_at, deleted_at from public.reports
   ) x
   where x.deleted_at is null and x.created_at::date = d.day)         as active_creators

from days d
order by d.day desc;

comment on view public.analytics_daily is
  'Daily product activity from source tables — truth for post-signup metrics, covering trade work, RAMS, AI and the Study Centre. Client events capture ~0% of study, AI and RAMS and 0.3% of quotes. course_page_events is navigation, not completion. Excludes new-subscription counts by design. Admin/service-role only.';

revoke all on public.analytics_daily from public, anon, authenticated;
grant select on public.analytics_daily to service_role;
