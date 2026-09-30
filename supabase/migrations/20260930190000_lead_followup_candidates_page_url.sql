-- lead_followup_candidates now also returns the page the lead was captured on
-- (captured_leads.page_url, recorded from 30 Sep 2026), so the personal
-- follow-up can open with what the person actually looked at.
--
-- Same eligibility rules as 20260929190000. The return type changes, which
-- Postgres cannot do in place, so drop and recreate — the only caller is the
-- lead-personal-followup edge function.

drop function if exists public.lead_followup_candidates(interval, interval, timestamptz, int);

create function public.lead_followup_candidates(
  p_min_age interval default interval '48 hours',
  p_max_age interval default interval '21 days',
  p_not_before timestamptz default '2026-09-20 17:00:00+00',
  p_limit int default 25
)
returns table (email text, source text, first_at timestamptz, page_url text)
language sql
stable
security definer
set search_path = public
as $$
  with l as (
    select
      lower(trim(cl.email)) as email,
      min(cl.created_at) as first_at,
      (array_agg(split_part(cl.source, ':', 1) order by cl.created_at))[1] as source,
      -- The first page that produced a capture for this address.
      (array_agg(cl.page_url order by cl.created_at) filter (where cl.page_url is not null))[1] as page_url
    from public.captured_leads cl
    where cl.email is not null and cl.email like '%@%'
    group by 1
  )
  select l.email, l.source, l.first_at, l.page_url
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

alter table public.lead_followup_sends add column if not exists page_url text;
