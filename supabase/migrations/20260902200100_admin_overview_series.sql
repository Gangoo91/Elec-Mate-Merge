-- One call for everything on the admin overview that needs SQL and a clock.
--
-- Signups and active people by day, today's usage, and the 91-day metric
-- snapshots come back together so the page makes one round trip for its
-- history instead of five. Every date here is a UK date: `created_at` is
-- shifted to Europe/London before it is truncated, so "today" runs from
-- 00:00 to 23:59 in the UK, not UTC. (The analytics_daily view was cutting
-- days at UTC midnight, an hour out for half the year — fixed alongside.)

create or replace function public.admin_overview_series()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_from date := (now() at time zone 'Europe/London')::date - 59;
  -- Signups run further back so a 90-day view has a previous 90 days to compare with.
  v_from_signups date := (now() at time zone 'Europe/London')::date - 179;
  v_result jsonb;
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  with days as (
    select generate_series(v_from, v_today, interval '1 day')::date as d
  ),
  signup_days as (
    select generate_series(v_from_signups, v_today, interval '1 day')::date as d
  ),
  signups as (
    select (u.created_at at time zone 'Europe/London')::date as d, count(*) as n
    from auth.users u
    where u.created_at >= (v_from_signups::timestamp at time zone 'Europe/London') - interval '1 day'
    group by 1
  ),
  dau as (
    select (e.created_at at time zone 'Europe/London')::date as d, count(distinct e.user_id) as n
    from user_events e
    where e.created_at >= (v_from::timestamp at time zone 'Europe/London') - interval '1 day'
    group by 1
  ),
  today_bounds as (
    select (v_today::timestamp at time zone 'Europe/London') as t0,
           ((v_today + 1)::timestamp at time zone 'Europe/London') as t1
  ),
  yesterday_bounds as (
    select ((v_today - 1)::timestamp at time zone 'Europe/London') as t0,
           (v_today::timestamp at time zone 'Europe/London') as t1
  ),
  -- Yesterday's full day, same definitions, so today's figures have a comparison.
  yesterday as (
    select
      (select count(*) from reports r, yesterday_bounds b where r.deleted_at is null and r.created_at >= b.t0 and r.created_at < b.t1) as certs,
      (select count(*) from quotes q, yesterday_bounds b where q.deleted_at is null and q.created_at >= b.t0 and q.created_at < b.t1) as quotes,
      (select count(*) from invoices i, yesterday_bounds b where i.deleted_at is null and i.created_at >= b.t0 and i.created_at < b.t1) as invoices,
      (select count(*) from seo_mock_attempts m, yesterday_bounds b where m.created_at >= b.t0 and m.created_at < b.t1) as mock_exams,
      (select count(distinct m.user_id) from seo_mock_attempts m, yesterday_bounds b where m.created_at >= b.t0 and m.created_at < b.t1) as mock_exam_people,
      (select count(*) from ai_chat_history a, yesterday_bounds b where a.created_at >= b.t0 and a.created_at < b.t1) as ai_chats,
      (select count(*) from rams_documents d, yesterday_bounds b where d.created_at >= b.t0 and d.created_at < b.t1) as rams,
      (select count(*) from site_visits s, yesterday_bounds b where s.created_at >= b.t0 and s.created_at < b.t1) as site_visits,
      (select coalesce(sum(l.duration_minutes), 0) from learning_activity_log l, yesterday_bounds b where l.created_at >= b.t0 and l.created_at < b.t1) as study_minutes,
      (select count(distinct l.user_id) from learning_activity_log l, yesterday_bounds b where l.created_at >= b.t0 and l.created_at < b.t1) as learners,
      (select count(distinct e.user_id) from user_events e, yesterday_bounds b where e.created_at >= b.t0 and e.created_at < b.t1) as active_people,
      (select count(*) from auth.users u, yesterday_bounds b where u.created_at >= b.t0 and u.created_at < b.t1) as signups
  ),
  today as (
    select
      (select count(*) from reports r, today_bounds b where r.deleted_at is null and r.created_at >= b.t0 and r.created_at < b.t1) as certs,
      (select count(*) from quotes q, today_bounds b where q.deleted_at is null and q.created_at >= b.t0 and q.created_at < b.t1) as quotes,
      (select count(*) from invoices i, today_bounds b where i.deleted_at is null and i.created_at >= b.t0 and i.created_at < b.t1) as invoices,
      (select count(*) from seo_mock_attempts m, today_bounds b where m.created_at >= b.t0 and m.created_at < b.t1) as mock_exams,
      (select count(distinct m.user_id) from seo_mock_attempts m, today_bounds b where m.created_at >= b.t0 and m.created_at < b.t1) as mock_exam_people,
      (select count(*) from ai_chat_history a, today_bounds b where a.created_at >= b.t0 and a.created_at < b.t1) as ai_chats,
      (select count(*) from rams_documents d, today_bounds b where d.created_at >= b.t0 and d.created_at < b.t1) as rams,
      (select count(*) from site_visits s, today_bounds b where s.created_at >= b.t0 and s.created_at < b.t1) as site_visits,
      (select coalesce(sum(l.duration_minutes), 0) from learning_activity_log l, today_bounds b where l.created_at >= b.t0 and l.created_at < b.t1) as study_minutes,
      (select count(distinct l.user_id) from learning_activity_log l, today_bounds b where l.created_at >= b.t0 and l.created_at < b.t1) as learners,
      (select count(distinct e.user_id) from user_events e, today_bounds b where e.created_at >= b.t0 and e.created_at < b.t1) as active_people,
      (select count(*) from auth.users u, today_bounds b where u.created_at >= b.t0 and u.created_at < b.t1) as signups
  )
  select jsonb_build_object(
    'as_of', to_char(now() at time zone 'Europe/London', 'HH24:MI'),
    'today_date', v_today,
    'signups_daily', (select jsonb_agg(jsonb_build_object('d', signup_days.d, 'n', coalesce(signups.n, 0)) order by signup_days.d)
                      from signup_days left join signups on signups.d = signup_days.d),
    'dau_daily', (select jsonb_agg(jsonb_build_object('d', days.d, 'n', coalesce(dau.n, 0)) order by days.d)
                  from days left join dau on dau.d = days.d),
    'today', (select to_jsonb(today) from today),
    'yesterday', (select to_jsonb(yesterday) from yesterday),
    'metric_daily', (select coalesce(jsonb_agg(to_jsonb(m) order by m.day), '[]'::jsonb)
                     from (select day, stripe_mrr, rc_mrr, stripe_paying, rc_paying, stripe_trialing, rc_trialing,
                                  stripe_churned_paid, rc_churned_paid
                           from admin_metric_daily
                           where day >= v_today - 91 order by day) m)
  ) into v_result;

  return v_result;
end;
$function$;

revoke execute on function public.admin_overview_series() from anon;
grant execute on function public.admin_overview_series() to authenticated;
