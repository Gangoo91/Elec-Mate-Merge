-- Revenue operations the Stripe API cannot answer: the win-back programme and
-- what leavers said on the way out.
--
-- Recovery is decomposed rather than reported as one number. "60 recipients are
-- subscribed today" is correlation and was the only figure available; splitting
-- on whether `subscription_start` falls after the first win-back email gives
-- 31 who came back afterwards, 9 who were already back BEFORE we emailed them
-- (a targeting defect worth seeing), and 20 whose timing cannot be established.
create or replace function public.get_revenue_ops()
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

  with recipients as (
    select user_id, min(sent_at) as first_sent, max(sent_at) as last_sent, count(*)::int as touches
    from winback_queue
    where sent_at is not null
    group by 1
  ),
  outcome as (
    select
      count(*)::int as recipients,
      count(*) filter (where coalesce(p.subscribed, false))::int as now_subscribed,
      count(*) filter (
        where coalesce(p.subscribed, false) and p.subscription_start > r.first_sent
      )::int as recovered_after,
      count(*) filter (
        where coalesce(p.subscribed, false) and p.subscription_start <= r.first_sent
      )::int as already_back_before,
      count(*) filter (
        where coalesce(p.subscribed, false) and p.subscription_start is null
      )::int as timing_unknown
    from recipients r
    join profiles p on p.id = r.user_id
  ),
  queue as (
    select
      count(*) filter (where status = 'sent')::int    as sent_rows,
      count(*) filter (where status = 'pending')::int as pending,
      count(*) filter (where status = 'skipped')::int as skipped,
      count(*) filter (where status = 'failed')::int  as failed,
      count(*) filter (where sent_at is not null)::int as emails_sent,
      count(*) filter (where sent_at > now() - interval '30 days')::int as sent_30d,
      count(distinct user_id)::int as people
    from winback_queue
  ),
  weekly as (
    select date_trunc('week', sent_at)::date as week, count(*)::int as sent
    from winback_queue
    where sent_at is not null and sent_at > now() - interval '12 weeks'
    group by 1
  ),
  -- Why the skipped ones were skipped: the guard rails are doing real work and
  -- nothing surfaced them.
  skips as (
    select
      case
        when skip_reason ilike '%resubscribed%' then 'already back'
        when skip_reason ilike '%suppress%'     then 'email suppressed'
        when skip_reason ilike '%active subscription%' then 'active elsewhere'
        when skip_reason ilike '%blocked%'      then 'blocked'
        else 'other'
      end as reason,
      count(*)::int as n
    from winback_queue
    where status = 'skipped'
    group by 1
  ),
  churn_reasons as (
    select coalesce(nullif(btrim(reason), ''), 'unknown') as reason,
           coalesce(nullif(btrim(subscription_tier), ''), 'unknown') as tier,
           count(*)::int as n
    from cancel_survey_responses
    group by 1, 2
  )
  select jsonb_build_object(
    'winback', jsonb_build_object(
      'queue',   (select to_jsonb(q) from queue q),
      'outcome', (select to_jsonb(o) from outcome o),
      'weekly',  (select coalesce(jsonb_agg(to_jsonb(w) order by w.week), '[]'::jsonb) from weekly w),
      'skips',   (select coalesce(jsonb_agg(to_jsonb(s) order by s.n desc), '[]'::jsonb) from skips s)
    ),
    'churn_reasons', (
      select coalesce(jsonb_agg(to_jsonb(c) order by c.n desc), '[]'::jsonb) from churn_reasons c
    ),
    'generated_at', now()
  )
  into payload;

  return payload;
end;
$function$;

grant execute on function public.get_revenue_ops() to authenticated;
