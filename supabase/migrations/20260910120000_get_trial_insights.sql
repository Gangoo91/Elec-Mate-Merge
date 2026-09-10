-- Trial insights for the admin Trials page.
--
-- `get_trial_cohort` already returns one row per trial with its own-window
-- metrics, which is what the list needs. This is the other half: the shapes you
-- can only see across the cohort, and which the page previously had none of.
--
--   curve   day-of-trial return rate, split by outcome. The one finding on this
--           page with a real effect size: converters come back on day 1 at
--           roughly twice the rate of trials that expire, and the gap widens
--           every day after. Roughly four trials in ten never open the app again
--           after the day they signed up (see `returned` — do NOT read that
--           figure off the curve's day-1 point, which answers a different
--           question and comes out much higher).
--   bands   conversion by trial score, in six 15-point bands. Monotonic above
--           band 2 and the top band converts ~8x the bottom, so the score the
--           list sorts by is worth sorting by.
--   weekly  trials started per week and how they ended — the trend line.
--   contact whether a trial was ever emailed. Coverage, not causation: the
--           uncontacted group is mostly recent, so the raw rates are confounded
--           and the UI reports it as reach.
--   ttfv    how many trials ever took a first real action (a tracked feature
--           use, a certificate or a quote), split by outcome.
--   contacts  per-trial last contact, so the worklist can avoid emailing the
--             same person twice in a day.
--
-- One RPC rather than an edge function: it is a read of tables this database
-- already holds, and admin gating is the same `admin_role` check the rest of
-- the admin RPCs use.
create or replace function public.get_trial_insights()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  payload jsonb;
begin
  if not exists (select 1 from profiles where id = auth.uid() and admin_role is not null) then
    raise exception 'not authorized';
  end if;

  with t as (
    select p.id,
           p.created_at as t_start,
           p.trial_end  as t_end,
           -- A live store trial carries subscribed = true for its whole run, so
           -- the flag alone cannot say who converted: the window must have shut.
           case when p.trial_end > now() then 'live'
                when coalesce(p.subscribed, false) then 'converted'
                else 'expired' end as status,
           greatest(1, (date(p.trial_end) - date(p.created_at)) + 1) as len_days,
           -- How much of the window we have actually had the chance to observe.
           -- Without this a trial signed up yesterday counts as a day-6 no-show.
           greatest(1, least((date(p.trial_end) - date(p.created_at)) + 1,
                             (current_date - date(p.created_at)) + 1)) as observed_days
    from profiles p
    where p.trial_end is not null
  ),
  ev as (
    select e.user_id,
           count(distinct date(e.created_at))                          as active_days,
           count(*) filter (where e.event_type = 'session_start')      as sessions,
           count(*) filter (where e.event_type = 'feature_use')        as feature_uses,
           -- 30-second dedup, matching get_trial_cohort, so concurrent tabs do
           -- not multiply the time.
           (count(distinct floor(extract(epoch from e.created_at) / 30))
              filter (where e.event_type = 'session_heartbeat')) * 30  as secs
    from user_events e
    join t on t.id = e.user_id
    where e.created_at >= t.t_start and e.created_at <= t.t_end
    group by 1
  ),
  -- Deleted work is not work. 14 of the 67 in-window certificates are binned,
  -- and each was adding up to 12.5 points to a trial score.
  rp as (
    select r.user_id, count(*) as n from reports r join t on t.id = r.user_id
    where r.created_at between t.t_start and t.t_end and r.deleted_at is null group by 1
  ),
  qt as (
    select q.user_id, count(*) as n from quotes q join t on t.id = q.user_id
    where q.created_at between t.t_start and t.t_end and q.deleted_at is null group by 1
  ),
  -- Same weights as calculateTrialScore in src/hooks/useTrialCohort.ts. Kept in
  -- step deliberately: the bands below are only meaningful if the score they
  -- band is the score the list shows.
  scored as (
    select t.*,
           coalesce(rp.n, 0) + coalesce(qt.n, 0) as produced,
           round(
             least((coalesce(rp.n, 0) + coalesce(qt.n, 0)) * 12.5, 25)
           + least(coalesce(ev.active_days, 0) * 5.5, 22)
           + least((coalesce(ev.secs, 0) / 60.0) * 0.122, 22)
           + least(coalesce(ev.sessions, 0) * 1.1, 11)
           + least(coalesce(ev.feature_uses, 0) * 2, 8)
           )::int as score
    from t
    left join ev on ev.user_id = t.id
    left join rp on rp.user_id = t.id
    left join qt on qt.user_id = t.id
  ),
  weekly as (
    select date_trunc('week', t_start)::date            as week,
           count(*)::int                                as started,
           count(*) filter (where status = 'converted')::int as converted,
           count(*) filter (where status = 'expired')::int   as expired,
           count(*) filter (where status = 'live')::int      as live
    from scored group by 1
  ),
  days as (select generate_series(0, 13) as d),
  active as (
    select s.id, s.status, (date(e.created_at) - date(s.t_start)) as d
    from user_events e
    join scored s on s.id = e.user_id
    where e.created_at >= s.t_start and e.created_at <= s.t_end
    group by 1, 2, 3
  ),
  curve as (
    select days.d,
           count(*) filter (where s.status = 'converted')::int as converted_eligible,
           count(*) filter (where s.status = 'expired')::int   as expired_eligible,
           count(*) filter (where s.status = 'live')::int      as live_eligible,
           count(*) filter (where s.status = 'converted' and a.id is not null)::int as converted_active,
           count(*) filter (where s.status = 'expired'   and a.id is not null)::int as expired_active,
           count(*) filter (where s.status = 'live'      and a.id is not null)::int as live_active
    from days
    join scored s on days.d < s.observed_days
    left join active a on a.id = s.id and a.d = days.d
    group by days.d
  ),
  /*
    "Never came back" is not the same as "not active on day 1".
    Somebody can skip day 1 and return on day 3. Read off the curve's day-1
    point the figure came out at 64%; counted properly, over the trials that
    have actually had a second day to come back on, it is 41%.
  */
  returned as (
    select count(*)::int as n,
           count(*) filter (where not exists (
             select 1 from user_events e
             where e.user_id = s.id
               and e.created_at between s.t_start and s.t_end
               and date(e.created_at) > date(s.t_start)
           ))::int as never_returned
    from scored s
    where s.observed_days >= 2
  ),
  bands as (
    select least(5, floor(score / 15.0))::int                 as band,
           count(*)::int                                      as n,
           count(*) filter (where status <> 'live')::int      as decided,
           count(*) filter (where status = 'converted')::int  as converted,
           count(*) filter (where status = 'live')::int       as live
    from scored group by 1
  ),
  -- "First real action", not "first event". The first user_event fires at
  -- signup itself (a page_view on the account-creation redirect), so timing
  -- against it measured nothing: both medians came out at 0.003 minutes. This
  -- counts the first tracked feature use, certificate or quote inside the
  -- window instead.
  first_ev as (
    select s.id, s.status, s.t_start,
           least(
             (select min(e.created_at) from user_events e
               where e.user_id = s.id and e.event_type = 'feature_use'
                 and e.created_at between s.t_start and s.t_end),
             (select min(r.created_at) from reports r
               where r.user_id = s.id and r.deleted_at is null
                 and r.created_at between s.t_start and s.t_end),
             (select min(q.created_at) from quotes q
               where q.user_id = s.id and q.deleted_at is null
                 and q.created_at between s.t_start and s.t_end)
           ) as first_at
    from scored s
  ),
  ttfv as (
    select
      count(*) filter (where first_at is not null and status = 'converted')::int as acted_converted,
      count(*) filter (where status = 'converted')::int                          as n_converted,
      count(*) filter (where first_at is not null and status = 'expired')::int   as acted_expired,
      count(*) filter (where status = 'expired')::int                            as n_expired,
      count(*) filter (where first_at is not null and status = 'live')::int      as acted_live,
      count(*) filter (where status = 'live')::int                               as n_live,
      percentile_cont(0.5) within group (
        order by extract(epoch from (first_at - t_start)) / 60
      ) filter (where first_at is not null and status <> 'live') as median_min
    from first_ev
  ),
  sent as (select distinct user_id from trial_emails_sent),
  contact as (
    select count(*)::int                                                          as n,
           count(*) filter (where c.user_id is not null)::int                     as contacted,
           count(*) filter (where c.user_id is not null and s.status = 'converted')::int as contacted_converted,
           count(*) filter (where c.user_id is not null and s.status <> 'live')::int     as contacted_decided,
           count(*) filter (where c.user_id is null and s.status = 'converted')::int     as uncontacted_converted,
           count(*) filter (where c.user_id is null and s.status <> 'live')::int         as uncontacted_decided,
           count(*) filter (where s.status = 'live' and c.user_id is not null)::int      as live_contacted,
           count(*) filter (where s.status = 'live')::int                                as live_total
    from scored s left join sent c on c.user_id = s.id
  ),
  produced_split as (
    select (produced > 0)                                     as made,
           count(*) filter (where status <> 'live')::int       as decided,
           count(*) filter (where status = 'converted')::int   as converted
    from scored group by 1
  ),
  contacts as (
    select e.user_id,
           max(e.sent_at)  as last_at,
           count(*)::int   as sends
    from trial_emails_sent e
    join scored s on s.id = e.user_id
    group by 1
  )
  select jsonb_build_object(
    'weekly',       (select coalesce(jsonb_agg(to_jsonb(w) order by w.week), '[]'::jsonb) from weekly w),
    'curve',        (select coalesce(jsonb_agg(to_jsonb(c) order by c.d),   '[]'::jsonb) from curve c),
    'bands',        (select coalesce(jsonb_agg(to_jsonb(b) order by b.band),'[]'::jsonb) from bands b),
    'produced',     (select coalesce(jsonb_agg(to_jsonb(p)),                '[]'::jsonb) from produced_split p),
    'contacts',     (select coalesce(jsonb_agg(to_jsonb(x)),                '[]'::jsonb) from contacts x),
    'contact',      (select to_jsonb(x) from contact x),
    'returned',     (select to_jsonb(x) from returned x),
    'ttfv',         (select to_jsonb(v) from ttfv v),
    'generated_at', now()
  )
  into payload;

  return payload;
end;
$function$;

grant execute on function public.get_trial_insights() to authenticated;
