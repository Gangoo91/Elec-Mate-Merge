-- Personal follow-up to SEO / lead-magnet leads (Andrew, 29 Sep 2026).
--
-- Anyone who leaves their email on a mock exam, cheatsheet, symbols chart,
-- calculator or exit pop-up already gets the thing they asked for straight
-- away (newsletter-subscribe). Two days later, if they still have no account,
-- they get ONE plain-text email from Andrew: 7 days free, then 25% off the
-- first 6 months (FIRSTGO25 / FIRSTGO25APP). Sent by `lead-personal-followup`.
--
-- One email per address, ever: `lead_followup_sends` is claimed before the
-- send, so a crash mid-run can never double-send.

create table if not exists public.lead_followup_sends (
  email text primary key,
  source text,
  first_captured_at timestamptz,
  status text not null default 'claimed' check (status in ('claimed', 'sent', 'failed')),
  error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

alter table public.lead_followup_sends enable row level security;
-- No policies: service role only.

-- Who is due a follow-up right now.
--   * first captured between p_min_age and p_max_age ago
--   * never before p_not_before — earlier leads already had the 20 Sep campaign
--   * no Elec-Mate account, not unsubscribed, not already followed up
--   * not on an overseas country-code domain (the app is built on UK regs);
--     .uk and generic TLDs pass, as do .co/.io/.me which UK firms use
create or replace function public.lead_followup_candidates(
  p_min_age interval default interval '48 hours',
  p_max_age interval default interval '21 days',
  p_not_before timestamptz default '2026-09-20 17:00:00+00',
  p_limit int default 25
)
returns table (email text, source text, first_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  with l as (
    select
      lower(trim(cl.email)) as email,
      min(cl.created_at) as first_at,
      (array_agg(split_part(cl.source, ':', 1) order by cl.created_at))[1] as source
    from public.captured_leads cl
    where cl.email is not null and cl.email like '%@%'
    group by 1
  )
  select l.email, l.source, l.first_at
  from l
  where l.first_at <= now() - p_min_age
    and l.first_at >= greatest(now() - p_max_age, p_not_before)
    and not exists (select 1 from auth.users u where lower(u.email) = l.email)
    and not exists (select 1 from public.email_suppressions s where lower(s.email) = l.email)
    and not exists (select 1 from public.lead_followup_sends f where f.email = l.email)
    and not (
      l.email ~ '\.[a-z]{2}$'
      and l.email !~ '\.(uk|co|io|me)$'
    )
  order by l.first_at
  limit greatest(p_limit, 0);
$$;

revoke all on function public.lead_followup_candidates(interval, interval, timestamptz, int) from public, anon, authenticated;
grant execute on function public.lead_followup_candidates(interval, interval, timestamptz, int) to service_role;
