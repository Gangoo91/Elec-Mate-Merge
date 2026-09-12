-- Deleted certificates and quotes are not work produced.
--
-- Both trial RPCs counted every row in `reports` and `quotes` inside the trial
-- window with no `deleted_at` filter. 14 of the 67 in-window certificates are
-- binned — 21% — and each one was adding up to 12.5 points to a trial score,
-- promoting rows into the "engaged" band, into the rescue queue, and out of the
-- "nothing made yet" figure. 496 reports and 68 quotes are deleted platform-wide,
-- so this only grows.
create or replace function public.get_trial_cohort()
returns table(user_id uuid, email text, full_name text, trial_start timestamp with time zone, trial_end timestamp with time zone, status text, days_remaining integer, subscription_tier text, subscription_source text, active_days integer, sessions integer, page_views integer, feature_uses integer, seconds_tracked integer, reports_made integer, quotes_made integer, last_seen timestamp with time zone)
language plpgsql
stable security definer
set search_path to 'public'
as $function$
begin
  if not exists (select 1 from profiles where id = auth.uid() and admin_role is not null) then
    raise exception 'not authorized';
  end if;

  return query
  with t as (
    select p.id, p.created_at as t_start, p.trial_end as t_end,
           p.subscribed, p.subscription_tier, p.subscription_source,
           nullif(btrim(p.full_name), '') as full_name
    from profiles p where p.trial_end is not null
  ),
  ev as (
    select e.user_id,
           count(distinct date(e.created_at))                          as active_days,
           count(*) filter (where e.event_type = 'session_start')       as sessions,
           count(*) filter (where e.event_type = 'page_view')           as page_views,
           count(*) filter (where e.event_type = 'feature_use')         as feature_uses,
           -- 30-second dedup so concurrent tabs do not multiply the time.
           (count(distinct floor(extract(epoch from e.created_at) / 30))
              filter (where e.event_type = 'session_heartbeat') * 30)   as seconds_tracked
    from user_events e
    join t on t.id = e.user_id
    where e.created_at >= t.t_start and e.created_at <= t.t_end
    group by e.user_id
  ),
  seen as (
    -- Deliberately not window-bounded: for a live trial you want to know if
    -- they were here today, for an expired one whether they came back after.
    select e.user_id, max(e.created_at) as last_seen
    from user_events e join t on t.id = e.user_id
    group by e.user_id
  ),
  rp as (
    select r.user_id, count(*) as n from reports r join t on t.id = r.user_id
    where r.created_at between t.t_start and t.t_end
      and r.deleted_at is null
    group by r.user_id
  ),
  qt as (
    select q.user_id, count(*) as n from quotes q join t on t.id = q.user_id
    where q.created_at between t.t_start and t.t_end
      and q.deleted_at is null
    group by q.user_id
  )
  select
    t.id, u.email::text, t.full_name, t.t_start, t.t_end,
    -- A live store trial carries subscribed = true throughout, so the flag
    -- alone cannot say whether someone converted: the trial must have ended.
    case when t.t_end > now() then 'live'
         when coalesce(t.subscribed, false) then 'converted'
         else 'expired' end,
    greatest(0, ceil(extract(epoch from (t.t_end - now())) / 86400))::integer,
    t.subscription_tier, t.subscription_source,
    coalesce(ev.active_days, 0)::integer,
    coalesce(ev.sessions, 0)::integer,
    coalesce(ev.page_views, 0)::integer,
    coalesce(ev.feature_uses, 0)::integer,
    coalesce(ev.seconds_tracked, 0)::integer,
    coalesce(rp.n, 0)::integer,
    coalesce(qt.n, 0)::integer,
    seen.last_seen
  from t
  left join auth.users u on u.id = t.id
  left join ev   on ev.user_id   = t.id
  left join seen on seen.user_id = t.id
  left join rp   on rp.user_id   = t.id
  left join qt   on qt.user_id   = t.id
  order by t.t_end desc;
end;
$function$;
