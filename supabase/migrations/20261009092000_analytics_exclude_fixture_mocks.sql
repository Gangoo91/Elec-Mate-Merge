-- analytics_daily: leave demo-college fixture mock attempts out of the count
-- (9 Oct 2026, ELE-1763). The Northgate demo learners get a seeded mock
-- history (source = 'fixture') so the tutor's mock results screens show
-- something real in a demo; those rows must never inflate the founder's
-- "mock exam attempts" figure. Only that one condition changes; the body is
-- the live definition (pg_get_viewdef, 9 Oct).

create or replace view public.analytics_daily as
 WITH days AS (
         SELECT generate_series(((now() AT TIME ZONE 'Europe/London'::text)::date - 89)::timestamp without time zone, (now() AT TIME ZONE 'Europe/London'::text)::date::timestamp without time zone, '1 day'::interval)::date AS day
        )
 SELECT d.day,
    ( SELECT count(*) AS count
           FROM auth.users u
          WHERE (u.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS accounts_created,
    ( SELECT count(*) AS count
           FROM quotes q
          WHERE q.deleted_at IS NULL AND (q.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS quotes_created,
    ( SELECT count(*) AS count
           FROM quotes q
          WHERE q.deleted_at IS NULL AND (q.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND q.status = 'sent'::text) AS quotes_sent,
    ( SELECT count(*) AS count
           FROM quotes q
          WHERE q.deleted_at IS NULL AND (q.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND q.status = 'approved'::text) AS quotes_approved,
    ( SELECT count(*) AS count
           FROM reports r
          WHERE r.deleted_at IS NULL AND (r.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS certs_created,
    ( SELECT count(*) AS count
           FROM invoices i
          WHERE i.deleted_at IS NULL AND (i.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS invoices_created,
    ( SELECT count(*) AS count
           FROM site_visits s
          WHERE (s.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS site_visits,
    ( SELECT count(*) AS count
           FROM rams_generation_jobs g
          WHERE (g.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS rams_jobs,
    ( SELECT count(*) AS count
           FROM rams_documents rd
          WHERE (rd.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS rams_documents,
    (( SELECT count(*) AS count
           FROM cost_engineer_jobs j
          WHERE (j.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day)) + (( SELECT count(*) AS count
           FROM circuit_design_jobs j
          WHERE (j.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day)) + (( SELECT count(*) AS count
           FROM commissioning_jobs j
          WHERE (j.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day)) + (( SELECT count(*) AS count
           FROM installation_method_jobs j
          WHERE (j.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day)) + (( SELECT count(*) AS count
           FROM maintenance_method_jobs j
          WHERE (j.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day)) + (( SELECT count(*) AS count
           FROM health_safety_jobs j
          WHERE (j.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day)) AS ai_specialist_jobs,
    ( SELECT count(*) AS count
           FROM ai_chat_history a
          WHERE (a.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS ai_chat_messages,
    ( SELECT count(DISTINCT l.user_id) AS count
           FROM learning_activity_log l
          WHERE (l.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS study_learners,
    ( SELECT COALESCE(sum(l.duration_minutes), 0::bigint) AS "coalesce"
           FROM learning_activity_log l
          WHERE (l.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS study_minutes,
    ( SELECT count(*) AS count
           FROM learning_activity_log l
          WHERE (l.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND l.activity_type = 'study_module'::text) AS study_modules,
    ( SELECT count(*) AS count
           FROM learning_activity_log l
          WHERE (l.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND l.activity_type = 'quiz_completed'::text) AS quizzes_completed,
    ( SELECT count(*) AS count
           FROM learning_activity_log l
          WHERE (l.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND l.activity_type = 'flashcard_session'::text) AS flashcard_sessions,
    ( SELECT count(*) AS count
           FROM learning_activity_log l
          WHERE (l.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND l.activity_type = 'video_watched'::text) AS videos_watched,
    ( SELECT count(*) AS count
           FROM course_progress cp
          WHERE (cp.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS course_page_events,
    ( SELECT count(DISTINCT cp.user_id) AS count
           FROM course_progress cp
          WHERE (cp.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS course_page_users,
    ( SELECT count(*) AS count
           FROM seo_mock_attempts m
          WHERE (m.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND m.source IS DISTINCT FROM 'fixture'::text) AS mock_exam_attempts,
    ( SELECT count(*) AS count
           FROM am2_mock_sessions a
          WHERE (a.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS am2_mock_sessions,
    ( SELECT count(*) AS count
           FROM cancel_survey_responses c
          WHERE (c.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS cancel_flows,
    ( SELECT count(*) AS count
           FROM cancel_survey_responses c
          WHERE (c.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day AND c.outcome = 'cancelled'::text) AS cancellations,
    ( SELECT count(DISTINCT x.user_id) AS count
           FROM ( SELECT quotes.user_id,
                    quotes.created_at,
                    quotes.deleted_at
                   FROM quotes
                UNION ALL
                 SELECT reports.user_id,
                    reports.created_at,
                    reports.deleted_at
                   FROM reports) x
          WHERE x.deleted_at IS NULL AND (x.created_at AT TIME ZONE 'Europe/London'::text)::date = d.day) AS active_creators
   FROM days d
  ORDER BY d.day DESC;
