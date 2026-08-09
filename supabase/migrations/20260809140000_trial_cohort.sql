-- The Trials page was scoring a four-month cohort through a 30-day window.
--
-- Every engagement figure on that page came from `user_activity_summary`,
-- which is defined as
--     WHERE user_events.created_at > (now() - '30 days'::interval)
-- while the trial cohort runs from April to August. A trial that ran in May
-- therefore has no rows in that view at all, so its login count, feature count,
-- active days and engagement score are all zero — not because the person did
-- nothing, but because the view cannot see back that far.
--
-- The visible symptom was "Used a feature: 27". The real number across the
-- cohort is 85. Everything downstream inherited the error: the hot/warm/cold
-- banding, the funnel's third stage, and the per-user scores on every expired
-- trial in the list.
--
-- What actually matters for a trial is what the person did DURING THEIR OWN
-- TRIAL, so that is what this measures: each user's window is their signup
-- through their trial_end, and every metric is counted inside it. A trial from
-- April is now measured on exactly the same basis as one from August.

create or replace function public.get_trial_cohort()
returns table (
  user_id uuid,
  email text,
  full_name text,
  trial_start timestamptz,
  trial_end timestamptz,
  status text,
  days_remaining integer,
  subscription_tier text,
  subscription_source text,
  active_days integer,
  sessions integer,
  page_views integer,
  feature_uses integer,
  seconds_tracked integer,
  reports_made integer,
  quotes_made integer,
  last_seen timestamptz
)
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  return query
  with t as (
    select
      p.id,
      p.created_at as t_start,
      p.trial_end  as t_end,
      p.subscribed,
      p.subscription_tier,
      p.subscription_source
    from profiles p
    where p.trial_end is not null
  )
  select
    t.id,
    u.email::text,
    nullif(btrim(p.full_name), ''),
    t.t_start,
    t.t_end,
    -- A live store trial carries subscribed = true for its whole run, so the
    -- flag alone cannot say whether someone converted. The trial has to have
    -- ENDED first; only then does `subscribed` mean they stayed.
    case
      when t.t_end > now() then 'live'
      when coalesce(t.subscribed, false) then 'converted'
      else 'expired'
    end,
    greatest(0, ceil(extract(epoch from (t.t_end - now())) / 86400))::integer,
    t.subscription_tier,
    t.subscription_source,
    coalesce(ev.active_days, 0)::integer,
    coalesce(ev.sessions, 0)::integer,
    coalesce(ev.page_views, 0)::integer,
    coalesce(ev.feature_uses, 0)::integer,
    coalesce(ev.seconds_tracked, 0)::integer,
    coalesce(rp.n, 0)::integer,
    coalesce(qt.n, 0)::integer,
    seen.last_seen
  from t
  join profiles p on p.id = t.id
  left join auth.users u on u.id = t.id

  -- Everything below is bounded by the user's own trial window.
  left join lateral (
    select
      count(distinct date(e.created_at))                                   as active_days,
      count(*) filter (where e.event_type = 'session_start')               as sessions,
      count(*) filter (where e.event_type = 'page_view')                   as page_views,
      count(*) filter (where e.event_type = 'feature_use')                 as feature_uses,
      -- Same 30-second dedup the activity view uses, so concurrent tabs do
      -- not multiply the time.
      (count(distinct floor(extract(epoch from e.created_at) / 30))
         filter (where e.event_type = 'session_heartbeat') * 30)           as seconds_tracked
    from user_events e
    where e.user_id = t.id
      and e.created_at >= t.t_start
      and e.created_at <= t.t_end
  ) ev on true

  left join lateral (
    select count(*) as n from reports r
    where r.user_id = t.id and r.created_at between t.t_start and t.t_end
  ) rp on true

  left join lateral (
    select count(*) as n from quotes q
    where q.user_id = t.id and q.created_at between t.t_start and t.t_end
  ) qt on true

  -- Last seen is deliberately NOT window-bounded: for a live trial you want to
  -- know if they were here today, and for an expired one whether they ever
  -- came back afterwards.
  left join lateral (
    select max(e.created_at) as last_seen from user_events e where e.user_id = t.id
  ) seen on true

  order by t.t_end desc;
end;
$function$;

revoke execute on function public.get_trial_cohort() from anon, public;
grant execute on function public.get_trial_cohort() to authenticated;

comment on function public.get_trial_cohort is
  'Admin-only. One row per trial, with every activity metric counted inside that trial''s own window (signup → trial_end) rather than through user_activity_summary''s rolling 30 days, which cannot see trials older than a month.';
