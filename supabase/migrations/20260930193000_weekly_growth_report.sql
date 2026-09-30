-- Weekly leads & sign-ups report (Andrew, 30 Sep 2026: "do it and send me it").
--
-- One JSON document per call, covering the 7 days before p_end against the 7
-- before that. Read by the weekly-growth-report edge function, which emails it
-- to founder@ on Monday mornings. Counts only — no personal data leaves here.
--
-- Page-level lead data starts 30 Sep 2026, when captured_leads.page_url began
-- being written; earlier leads have no page.

create or replace function public.weekly_growth_report(p_end timestamptz default now())
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with bounds as (
    select p_end as e, p_end - interval '7 days' as s, p_end - interval '14 days' as ps
  ),
  leads as (
    select lower(trim(cl.email)) as email, split_part(cl.source, ':', 1) as source,
           cl.page_url, cl.created_at
    from captured_leads cl
    -- 'other' rows are written by the sign-up form for every new account —
    -- they are accounts, not leads, and would double-count here.
    where split_part(cl.source, ':', 1) <> 'other'
  ),
  first_lead as (
    select email, min(created_at) as first_at from leads group by 1
  ),
  users as (
    select u.id, lower(u.email) as email, u.created_at, p.subscribed, p.is_trial
    from auth.users u left join profiles p on p.id = u.id
  ),
  metric as (
    select day, stripe_mrr + rc_mrr as mrr, stripe_paying + rc_paying as paying,
           stripe_churned_paid + rc_churned_paid as churned
    from admin_metric_daily
  )
  select jsonb_build_object(
    'period', jsonb_build_object(
      'start', (select s from bounds), 'end', (select e from bounds)),

    'leads', jsonb_build_object(
      'this_week', (select count(*) from leads, bounds where created_at >= s and created_at < e),
      'last_week', (select count(*) from leads, bounds where created_at >= ps and created_at < s),
      'new_people', (select count(*) from first_lead, bounds where first_at >= s and first_at < e),
      'by_source', coalesce((
        select jsonb_agg(jsonb_build_object('source', source, 'this_week', tw, 'last_week', lw) order by tw desc)
        from (
          select source,
                 count(*) filter (where created_at >= s and created_at < e) as tw,
                 count(*) filter (where created_at >= ps and created_at < s) as lw
          from leads, bounds where created_at >= ps and created_at < e
          group by source
        ) x), '[]'::jsonb),
      'top_pages', coalesce((
        select jsonb_agg(jsonb_build_object('page', page_url, 'leads', n) order by n desc)
        from (
          select page_url, count(*) as n
          from leads, bounds
          where created_at >= s and created_at < e and page_url is not null
          group by page_url order by n desc limit 12
        ) x), '[]'::jsonb),
      'with_page', (select count(*) from leads, bounds
                    where created_at >= s and created_at < e and page_url is not null)
    ),

    'signups', jsonb_build_object(
      'this_week', (select count(*) from users, bounds where created_at >= s and created_at < e),
      'last_week', (select count(*) from users, bounds where created_at >= ps and created_at < s),
      -- Accounts whose email had been captured as a lead before they signed up.
      'from_leads', (select count(*)
                     from users u join first_lead f on f.email = u.email, bounds
                     where f.first_at < u.created_at
                       and u.created_at >= s and u.created_at < e)
    ),

    'followup', jsonb_build_object(
      'sent_this_week', (select count(*) from lead_followup_sends, bounds
                         where status = 'sent' and sent_at >= s and sent_at < e),
      'sent_total', (select count(*) from lead_followup_sends where status = 'sent'),
      'failed_total', (select count(*) from lead_followup_sends where status = 'failed'),
      'signed_up', (select count(*) from lead_followup_sends f
                    join users u on u.email = f.email and u.created_at > f.sent_at
                    where f.status = 'sent'),
      'trial_or_paying', (select count(*) from lead_followup_sends f
                          join users u on u.email = f.email and u.created_at > f.sent_at
                          where f.status = 'sent' and (u.subscribed or u.is_trial)),
      'paying', (select count(*) from lead_followup_sends f
                 join users u on u.email = f.email and u.created_at > f.sent_at
                 where f.status = 'sent' and u.subscribed and not coalesce(u.is_trial, false))
    ),

    'revenue', jsonb_build_object(
      'mrr_now', (select mrr from metric order by day desc limit 1),
      'mrr_week_ago', (select mrr from metric, bounds where day <= (e - interval '7 days')::date
                       order by day desc limit 1),
      'paying_now', (select paying from metric order by day desc limit 1),
      'paying_week_ago', (select paying from metric, bounds where day <= (e - interval '7 days')::date
                          order by day desc limit 1),
      'churned_this_week', (select coalesce(sum(churned), 0) from metric, bounds
                            where day > (e - interval '7 days')::date and day <= e::date)
    )
  );
$$;

revoke all on function public.weekly_growth_report(timestamptz) from public, anon, authenticated;
grant execute on function public.weekly_growth_report(timestamptz) to service_role;
