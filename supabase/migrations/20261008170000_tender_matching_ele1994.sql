-- ELE-1994 — tenders come to the firm instead of the firm going looking.
--  1. The firm saves "what we bid for" once (user_tender_preferences, keyed on
--     the firm owner's id; RLS already lets the firm's managers manage it).
--  2. get_tender_matches(firm): live public tenders that fit the criteria,
--     with how many are new this week, for the Tenders page and Overview.
--  3. A weekly digest (Monday 07:30 UTC) rings the firm's bell + push when new
--     matches have arrived since the last digest.
--  4. Stale-source expiry (daily 08:00 UTC, after the syncs): a "live" row whose
--     deadline has passed is closed; a row its source has not refreshed for 14
--     days is expired (Public Contracts Scotland stopped on 15 Jul and still
--     had 35 "live" rows).
--  5. get_tender_feed_sources(): the sources that actually feed the table, so
--     the copy says "8 sources", not "20+".
--  6. get_tender_prequal(firm): the firm facts a pre-qualification
--     questionnaire asks for (company, registration, insurance, headcount,
--     RIDDOR history, policies). No money: no turnover, rates or bank details.

alter table public.user_tender_preferences
  add column if not exists last_digest_at timestamptz;
comment on column public.user_tender_preferences.last_digest_at is
  'ELE-1994: when the weekly tender-match digest last went to this firm.';

-- Region spellings differ by source ("North West", "northwest", "Yorkshire and
-- the Humber"); compare on one key.
create or replace function public._tender_region_key(p text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select case k
    when 'yorkshireandthehumber' then 'yorkshire'
    when 'eastofengland' then 'eastengland'
    when 'unitedkingdom' then 'uk'
    else k end
  from (select nullif(regexp_replace(lower(coalesce(p, '')), '[^a-z]', '', 'g'), '') as k) s
$$;

create or replace function public._tender_matches(p_firm uuid)
returns table (
  id uuid, title text, client_name text, value numeric, deadline timestamptz,
  published_at timestamptz, region text, location_text text, source text,
  source_url text, categories text[], miles numeric, tracked boolean
)
language sql
stable
security definer
set search_path to 'public'
as $$
  with p as (
    select pr.*,
           coalesce(pr.base_lat, cp.office_lat::numeric) as blat,
           coalesce(pr.base_lng, cp.office_lng::numeric) as blng,
           (select coalesce(array_agg(public._tender_region_key(r)), '{}') from unnest(coalesce(pr.regions, '{}')) r) as rkeys,
           coalesce(pr.categories, '{}') as cats
      from public.user_tender_preferences pr
      left join public.company_profiles cp on cp.user_id = pr.user_id
     where pr.user_id = p_firm
  ), o as (
    select t.*, public._tender_region_key(t.region) as rkey,
           coalesce(t.value_exact, t.value_high, t.value_low) as v
      from public.tender_opportunities t
     where t.status = 'live'
       and coalesce(t.opportunity_type, 'tender') = 'tender'
       and (t.deadline is null or t.deadline >= now())
  ), d as (
    select o.*, p.rkeys, p.cats, p.min_value, p.max_value, p.search_radius_miles,
           case when o.lat is not null and p.blat is not null then
             round((3958.8 * acos(least(1, greatest(-1,
               cos(radians(p.blat::float8)) * cos(radians(o.lat::float8)) * cos(radians(o.lng::float8) - radians(p.blng::float8))
               + sin(radians(p.blat::float8)) * sin(radians(o.lat::float8))))))::numeric, 0)
           end as mi,
           (p.blat is not null and p.base_postcode is not null) as has_base
      from o cross join p
  )
  select d.id, d.title, d.client_name, d.v, d.deadline, d.published_at, d.region,
         d.location_text, d.source, d.source_url, d.categories, d.mi,
         exists (select 1 from public.tenders tt where tt.opportunity_id = d.id and tt.user_id = p_firm)
    from d
   where
     -- work types: "electrical" (the default) means everything in the feed
     (cardinality(d.cats) = 0 or 'electrical' = any(d.cats) or d.categories && d.cats)
     -- value range; an unpublished value still shows (most sources omit it)
     and (d.v is null or (d.v >= coalesce(d.min_value, 0)
                          and d.v <= coalesce(nullif(d.max_value, 0), 1e12)))
     -- where: within the radius of the base, or in a chosen region; national
     -- or unplaced notices always show
     and (
       (not d.has_base and cardinality(d.rkeys) = 0)
       or (d.has_base and d.mi is not null and d.mi <= coalesce(d.search_radius_miles, 25))
       or (cardinality(d.rkeys) > 0 and d.rkey = any(d.rkeys))
       or d.rkey in ('uk', 'england', 'gb', 'greatbritain')
       or (d.rkey is null and d.lat is null)
     )
$$;
revoke all on function public._tender_matches(uuid) from public, anon, authenticated;

create or replace function public.get_tender_matches(p_firm uuid, p_limit int default 12)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_prefs public.user_tender_preferences;
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  select * into v_prefs from public.user_tender_preferences where user_id = p_firm;
  if v_prefs.user_id is null then
    return jsonb_build_object('has_criteria', false, 'total', 0, 'new_this_week', 0, 'items', '[]'::jsonb);
  end if;
  return (
    with m as (select * from public._tender_matches(p_firm))
    select jsonb_build_object(
      'has_criteria', true,
      'criteria', to_jsonb(v_prefs) - 'user_id',
      'total', (select count(*) from m),
      'new_this_week', (select count(*) from m where m.published_at >= now() - interval '7 days'),
      'new_since_digest', (select count(*) from m where m.published_at > coalesce(v_prefs.last_digest_at, now() - interval '7 days')),
      'items', coalesce((
        select jsonb_agg(to_jsonb(x) order by x.tracked, x.published_at desc nulls last, x.deadline nulls last)
          from (select * from m order by m.tracked, m.published_at desc nulls last, m.deadline nulls last
                 limit greatest(1, least(coalesce(p_limit, 12), 100))) x
      ), '[]'::jsonb)
    )
  );
end;
$$;
revoke all on function public.get_tender_matches(uuid, int) from public, anon;
grant execute on function public.get_tender_matches(uuid, int) to authenticated;

-- The sources that actually feed the table (not the 27 catalogue rows).
create or replace function public.get_tender_feed_sources()
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select coalesce(jsonb_agg(x order by x.live desc), '[]'::jsonb) from (
    select t.source,
           coalesce(max(s.display_name), initcap(replace(t.source, '_', ' '))) as display_name,
           max(s.website_url) as website_url,
           count(*) filter (where t.status = 'live' and (t.deadline is null or t.deadline >= now())
                              and coalesce(t.opportunity_type, 'tender') = 'tender') as live,
           max(t.fetched_at) as last_fetched
      from public.tender_opportunities t
      left join public.tender_sources s on s.name = t.source
     where t.fetched_at > now() - interval '14 days'
     group by t.source
  ) x
$$;
revoke all on function public.get_tender_feed_sources() from public, anon;
grant execute on function public.get_tender_feed_sources() to authenticated;

create or replace function public.expire_stale_tender_opportunities()
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_closed int; v_expired int;
begin
  with c as (
    update public.tender_opportunities set status = 'closed', updated_at = now()
     where status = 'live' and deadline is not null and deadline < now()
    returning 1)
  select count(*) into v_closed from c;
  with e as (
    update public.tender_opportunities set status = 'expired', updated_at = now()
     where status = 'live' and fetched_at < now() - interval '14 days'
    returning 1)
  select count(*) into v_expired from e;
  return jsonb_build_object('closed', v_closed, 'expired', v_expired);
end;
$$;
revoke all on function public.expire_stale_tender_opportunities() from public, anon, authenticated;

insert into public.notification_types (type, category, push, importance)
values ('tender_matches', 'invoices_quotes', true, 1)
on conflict (type) do nothing;

create or replace function public.notify_tender_match_digest()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  r record;
  v_new int;
  v_top text;
  v_sent int := 0;
begin
  for r in
    select pr.user_id, pr.last_digest_at
      from public.user_tender_preferences pr
     where (coalesce(pr.email_alerts, true) or coalesce(pr.push_alerts, true))
       and (pr.last_digest_at is null or pr.last_digest_at < now() - interval '6 days')
  loop
    begin
      select count(*), string_agg(t, '; ') filter (where rn <= 2)
        into v_new, v_top
        from (select m.title as t, row_number() over (order by m.deadline nulls last) rn
                from public._tender_matches(r.user_id) m
               where not m.tracked
                 and m.published_at > coalesce(r.last_digest_at, now() - interval '7 days')) s;
      if v_new > 0 then
        perform public.notify_employer_bell(
          r.user_id, 'tender_matches',
          case when v_new = 1 then '1 new tender matches what you bid for'
               else v_new || ' new tenders match what you bid for' end,
          coalesce(v_top, ''),
          jsonb_build_object('route', '/employer?section=tenders&matches=1', 'count', v_new));
        v_sent := v_sent + 1;
      end if;
      update public.user_tender_preferences set last_digest_at = now() where user_id = r.user_id;
    exception when others then
      raise warning '[notify_tender_match_digest] % failed: %', r.user_id, sqlerrm;
    end;
  end loop;
  return v_sent;
end;
$$;
revoke all on function public.notify_tender_match_digest() from public, anon, authenticated;

create or replace function public.get_tender_prequal(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  cp public.company_profiles;
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  select * into cp from public.company_profiles where user_id = p_firm limit 1;
  return jsonb_build_object(
    'company_name', cp.company_name,
    'address', nullif(concat_ws(', ', nullif(cp.company_address, ''), nullif(cp.company_postcode, '')), ''),
    'phone', cp.company_phone,
    'email', cp.company_email,
    'website', cp.company_website,
    'company_registration', cp.company_registration,
    'vat_number', cp.vat_number,
    'trading_since', cp.lead_page_trading_since,
    'registration_scheme', cp.registration_scheme,
    'registration_number', cp.registration_number,
    'registration_expiry', cp.registration_expiry,
    'insurance_provider', cp.insurance_provider,
    'insurance_coverage', cp.insurance_coverage,
    'insurance_expiry', cp.insurance_expiry,
    'headcount', (select count(*) from public.employer_employees e
                   where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'),
    'apprentices', (select count(*) from public.employer_employees e
                     where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'
                       and (e.team_role ilike '%apprentice%' or e.role ilike '%apprentice%')),
    'riddor_3y', (select count(*) from public.employer_incidents i
                   where i.employer_id = p_firm and i.riddor_reportable is true
                     and coalesce(i.reported_at, i.created_at) > now() - interval '3 years'),
    'incidents_3y', (select count(*) from public.employer_incidents i
                      where i.employer_id = p_firm
                        and coalesce(i.reported_at, i.created_at) > now() - interval '3 years'),
    'policies', coalesce((select jsonb_agg(jsonb_build_object('name', pol.name, 'adopted_at', pol.adopted_at, 'review_date', pol.review_date) order by pol.name)
                            from public.employer_policies pol
                           where pol.user_id = p_firm and lower(coalesce(pol.status, '')) in ('active', 'review due')), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.get_tender_prequal(uuid) from public, anon;
grant execute on function public.get_tender_prequal(uuid) to authenticated;

-- Schedules (idempotent)
do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname in ('expire-stale-tenders-daily', 'tender-match-digest-weekly');
  perform cron.schedule('expire-stale-tenders-daily', '0 8 * * *', 'select public.expire_stale_tender_opportunities()');
  perform cron.schedule('tender-match-digest-weekly', '30 7 * * 1', 'select public.notify_tender_match_digest()');
end $$;

-- Clear the backlog now rather than waiting for 08:00.
select public.expire_stale_tender_opportunities();
