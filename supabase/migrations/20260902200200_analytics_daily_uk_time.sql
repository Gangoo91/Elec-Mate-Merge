-- analytics_daily cut its days at UTC midnight.
--
-- Every column compared `created_at::date = d.day`, and the server runs in
-- UTC, so in British Summer Time anything that happened between 23:00 and
-- midnight UK was counted against the next day and "today" started an hour
-- late. The admin overview reports "what people did today, 00:00 to 23:59 UK
-- time", so every timestamp is now shifted to Europe/London before it is
-- truncated, and the day series starts from the UK date too. Same columns,
-- same order; only the clock changed.

create or replace view public.analytics_daily as
with days as (
  select generate_series(
    ((now() at time zone 'Europe/London')::date - 89)::timestamp,
    ((now() at time zone 'Europe/London')::date)::timestamp,
    interval '1 day'
  )::date as day
)
select
  d.day,
  (select count(*) from auth.users u where (u.created_at at time zone 'Europe/London')::date = d.day) as accounts_created,
  (select count(*) from quotes q where q.deleted_at is null and (q.created_at at time zone 'Europe/London')::date = d.day) as quotes_created,
  (select count(*) from quotes q where q.deleted_at is null and (q.created_at at time zone 'Europe/London')::date = d.day and q.status = 'sent') as quotes_sent,
  (select count(*) from quotes q where q.deleted_at is null and (q.created_at at time zone 'Europe/London')::date = d.day and q.status = 'approved') as quotes_approved,
  (select count(*) from reports r where r.deleted_at is null and (r.created_at at time zone 'Europe/London')::date = d.day) as certs_created,
  (select count(*) from invoices i where i.deleted_at is null and (i.created_at at time zone 'Europe/London')::date = d.day) as invoices_created,
  (select count(*) from site_visits s where (s.created_at at time zone 'Europe/London')::date = d.day) as site_visits,
  (select count(*) from rams_generation_jobs g where (g.created_at at time zone 'Europe/London')::date = d.day) as rams_jobs,
  (select count(*) from rams_documents rd where (rd.created_at at time zone 'Europe/London')::date = d.day) as rams_documents,
  (
    (select count(*) from cost_engineer_jobs j where (j.created_at at time zone 'Europe/London')::date = d.day)
    + (select count(*) from circuit_design_jobs j where (j.created_at at time zone 'Europe/London')::date = d.day)
    + (select count(*) from commissioning_jobs j where (j.created_at at time zone 'Europe/London')::date = d.day)
    + (select count(*) from installation_method_jobs j where (j.created_at at time zone 'Europe/London')::date = d.day)
    + (select count(*) from maintenance_method_jobs j where (j.created_at at time zone 'Europe/London')::date = d.day)
    + (select count(*) from health_safety_jobs j where (j.created_at at time zone 'Europe/London')::date = d.day)
  ) as ai_specialist_jobs,
  (select count(*) from ai_chat_history a where (a.created_at at time zone 'Europe/London')::date = d.day) as ai_chat_messages,
  (select count(distinct l.user_id) from learning_activity_log l where (l.created_at at time zone 'Europe/London')::date = d.day) as study_learners,
  (select coalesce(sum(l.duration_minutes), 0::bigint) from learning_activity_log l where (l.created_at at time zone 'Europe/London')::date = d.day) as study_minutes,
  (select count(*) from learning_activity_log l where (l.created_at at time zone 'Europe/London')::date = d.day and l.activity_type = 'study_module') as study_modules,
  (select count(*) from learning_activity_log l where (l.created_at at time zone 'Europe/London')::date = d.day and l.activity_type = 'quiz_completed') as quizzes_completed,
  (select count(*) from learning_activity_log l where (l.created_at at time zone 'Europe/London')::date = d.day and l.activity_type = 'flashcard_session') as flashcard_sessions,
  (select count(*) from learning_activity_log l where (l.created_at at time zone 'Europe/London')::date = d.day and l.activity_type = 'video_watched') as videos_watched,
  (select count(*) from course_progress cp where (cp.created_at at time zone 'Europe/London')::date = d.day) as course_page_events,
  (select count(distinct cp.user_id) from course_progress cp where (cp.created_at at time zone 'Europe/London')::date = d.day) as course_page_users,
  (select count(*) from seo_mock_attempts m where (m.created_at at time zone 'Europe/London')::date = d.day) as mock_exam_attempts,
  (select count(*) from am2_mock_sessions a where (a.created_at at time zone 'Europe/London')::date = d.day) as am2_mock_sessions,
  (select count(*) from cancel_survey_responses c where (c.created_at at time zone 'Europe/London')::date = d.day) as cancel_flows,
  (select count(*) from cancel_survey_responses c where (c.created_at at time zone 'Europe/London')::date = d.day and c.outcome = 'cancelled') as cancellations,
  (select count(distinct x.user_id)
     from (select quotes.user_id, quotes.created_at, quotes.deleted_at from quotes
           union all
           select reports.user_id, reports.created_at, reports.deleted_at from reports) x
    where x.deleted_at is null and (x.created_at at time zone 'Europe/London')::date = d.day) as active_creators
from days d
order by d.day desc;
