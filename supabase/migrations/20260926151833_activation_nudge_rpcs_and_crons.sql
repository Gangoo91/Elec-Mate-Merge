-- Retention/activation nudges: cohort RPCs + daily schedules.
--
-- Applied to the live project 24–26 Sep 2026 in five steps
-- (20260924174746, 20260924175948, 20260924180221, 20260926151756,
-- 20260926151833). Consolidated here because none of them were written into
-- the repo at the time and a live database object with no source in git is
-- the same trap as the sixteen unversioned edge functions recovered on 20 Sep.
-- Idempotent, so replaying it against the live project is a no-op.

-- ─────────────────────────────────────────────────────────────────────────
-- 1. Paying users sitting on a certificate they started and never finished.
--
-- Electricians banded by certificates completed in month one retain at 17%
-- (none) against 73% (five or more) — a 4.3× spread, and a stronger predictor
-- than the three-active-days-in-seven metric the Retention page leads on.
--
-- The `has_work` filter is the part that matters. Of 565 certificates
-- abandoned in the last 180 days, roughly 45% were closed within two minutes
-- of being created (167 of 332 EICRs, 18 of 22 testing-only, 8 of 8 plug-in
-- solar). Those are empty shells, not half-finished jobs, and telling someone
-- their blank form is "half finished" teaches them we cannot see their
-- account. So a row must show a client, an address, or two minutes of work.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.get_unfinished_certificate_users(
  p_min_idle_days integer default 3,
  p_cooldown_days integer default 45,
  p_limit integer default 200
)
returns table(
  user_id uuid, full_name text, role text, email text,
  report_type text, report_id text, client_name text, installation_address text,
  last_touched timestamptz, unfinished_count bigint, subscription_source text
)
language sql
security definer
set search_path to 'public'
as $$
  with paying as (
    select p.id, p.full_name, p.role, u.email, p.subscription_source
    from profiles p join auth.users u on u.id = p.id
    where p.subscribed = true
      and p.role in ('electrician','apprentice')
      and not coalesce(p.free_access_granted, false)
      and not coalesce(p.is_trial, false)   -- trialists get the trial sequence
      and p.subscription_end is not null and p.subscription_end > now()
      and p.subscription_source in ('stripe','app_store','play_store')
      and u.email is not null
  ),
  unfinished as (
    select r.user_id, r.report_type, r.report_id, r.client_name,
           r.installation_address, r.updated_at,
           (coalesce(nullif(btrim(r.client_name), ''), nullif(btrim(r.installation_address), '')) is not null
            or r.updated_at >= r.created_at + interval '2 minutes') as has_work
    from reports r
    where r.status in ('auto-draft','in-progress','draft')
      and r.deleted_at is null
      -- report_id is the STRING key the editor loads by; the row uuid opens a
      -- blank certificate, which from an email looks like deleted work.
      and r.report_id is not null
  ),
  ranked as (
    select u.*,
           row_number() over (partition by u.user_id order by u.updated_at desc) rn,
           count(*) over (partition by u.user_id) n
    from unfinished u
    where u.has_work
  )
  select p.id, p.full_name, p.role, p.email,
         f.report_type, f.report_id, f.client_name, f.installation_address,
         f.updated_at, f.n, p.subscription_source
  from paying p
  join ranked f on f.user_id = p.id and f.rn = 1
  -- Not mid-job: chasing someone about a certificate they are typing into
  -- right now reads as surveillance rather than help.
  where f.updated_at < now() - make_interval(days => p_min_idle_days)
    and not exists (
      select 1 from trial_emails_sent t
      where t.user_id = p.id and t.email_type = 'unfinished_cert'
        and t.sent_at > now() - make_interval(days => p_cooldown_days))
    and not exists (
      select 1 from email_suppressions s where lower(s.email) = lower(p.email))
  order by f.updated_at desc
  limit p_limit
$$;

revoke all on function public.get_unfinished_certificate_users(integer,integer,integer) from anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. People who made an account and never put a card in.
--
-- `reached_checkout` is returned rather than filtered on: someone who opened
-- the card form and bailed is warmer than someone who never got that far, and
-- the email says something different to each. An earlier version required
-- stripe_customer_id IS NULL and so discarded the warmer half.
--
-- p_not_before defaults to just after the 20 Sep Brevo blast, which already
-- reached 318 never-carded accounts with a better offer. Anyone older has been
-- contacted; a second, worse offer days later is spam.
-- ─────────────────────────────────────────────────────────────────────────
create or replace function public.get_abandoned_checkout_users(
  p_min_age_hours integer default 24,
  p_not_before timestamptz default '2026-09-20 17:00:00+00',
  p_limit integer default 200
)
returns table(
  user_id uuid, full_name text, role text, email text, created_at timestamptz,
  reached_checkout boolean
)
language sql
security definer
set search_path to 'public'
as $$
  select p.id, p.full_name, p.role, u.email, p.created_at,
         (p.stripe_customer_id is not null) as reached_checkout
  from profiles p
  join auth.users u on u.id = p.id
  where p.role in ('electrician','apprentice')
    and not coalesce(p.subscribed, false)
    and not coalesce(p.free_access_granted, false)
    and coalesce(p.created_via, '') <> 'admin_bulk'
    and u.email is not null
    and p.created_at < now() - make_interval(hours => p_min_age_hours)
    and p.created_at >= p_not_before
    -- Every route we might already have reached them by.
    and p.incomplete_signup_v11_sent_at is null
    and p.incomplete_signup_sent_at is null
    and not exists (
      select 1 from trial_emails_sent t
      where t.user_id = p.id and t.email_type = 'abandoned_checkout')
    and not exists (
      select 1 from email_suppressions s where lower(s.email) = lower(u.email))
  order by p.created_at desc
  limit p_limit
$$;

revoke all on function public.get_abandoned_checkout_users(integer,timestamptz,integer) from anon, authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. Daily schedules.
--
-- The abandoned-checkout chase used to be a button someone had to remember to
-- press. It stopped being pressed on 30 Aug and nothing noticed for 25 days,
-- because the cron that depended on it kept reporting success while sending
-- nothing to an empty cohort. Anything that only works when a human remembers
-- is a thing that will stop working.
--
-- Small daily batches also give Google Postmaster the steady rate it asks for
-- — it still cannot read our deliverability after ~1,090 emails in 48 hours
-- and explicitly recommends not increasing volume quickly. The limits are a
-- ceiling against a surprise, not a target: both backlogs are cleared, so from
-- here these pick up only a handful of new people a day.
-- ─────────────────────────────────────────────────────────────────────────
select cron.unschedule('abandoned-checkout-nudge-daily')
where exists (select 1 from cron.job where jobname = 'abandoned-checkout-nudge-daily');

select cron.schedule(
  'abandoned-checkout-nudge-daily',
  '10 8 * * *',
  $cron$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/abandoned-checkout-nudge',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)
    ),
    body := '{"send": true, "limit": 25}'::jsonb,
    timeout_milliseconds := 300000
  );
  $cron$
);

select cron.unschedule('unfinished-certificate-nudge-daily')
where exists (select 1 from cron.job where jobname = 'unfinished-certificate-nudge-daily');

select cron.schedule(
  'unfinished-certificate-nudge-daily',
  '30 10 * * *',
  $cron$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/unfinished-certificate-nudge',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)
    ),
    body := '{"send": true, "limit": 25}'::jsonb,
    timeout_milliseconds := 300000
  );
  $cron$
);
