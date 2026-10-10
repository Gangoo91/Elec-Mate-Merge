-- ELE-1994 review fixes: matches must be real electrical work, the digest must
-- never repeat itself, and office managers never see tender values.
--
--  1. Relevance. Every row in the feed is tagged 'electrical', so "All electrical
--     work" matched everything: sexual health services, ambulance contracts,
--     cleaning, vehicle purchases, electricity SUPPLY markets, legal panels.
--     _tender_is_electrical_work() drops clearly non-installation notices (by
--     title and CPV division) and keeps those that name electrical, building
--     services, maintenance or refurbishment work (by text or CPV).
--  2. Work types. Only ~10 live rows carry a specific tag, so ticking "Testing"
--     found one tender. A specific type now also matches on the notice's words.
--  3. Duplicates. The same notice arrives from up to three sources; one row per
--     title now, and "In your pipeline" holds across the copies.
--  4. "New". ProContract re-stamps published_at on every sync, so the same
--     tenders were "new this week" (and in every Monday digest) forever. New now
--     means first seen by us: tender_first_seen, filled by the daily 08:00 job
--     and by the digest itself before it counts.
--  5. Money. get_tender_matches returns no values unless can_see_firm_money.

create table if not exists public.tender_first_seen (
  opportunity_id uuid primary key references public.tender_opportunities(id) on delete cascade,
  first_seen_at timestamptz not null default now()
);
comment on table public.tender_first_seen is
  '[EMPLOYER HUB] When each public tender first appeared in the feed (sources re-stamp published_at). Scope: global, one row per tender_opportunities row. Used by: Tenders matches "new", the Monday tender digest. Rule: written only by _record_tender_first_seen(); no client access.';
alter table public.tender_first_seen enable row level security;
revoke all on public.tender_first_seen from anon, authenticated;

-- Backfill once from what we know; the side table, not tender_opportunities.
insert into public.tender_first_seen (opportunity_id, first_seen_at)
select t.id, least(coalesce(t.published_at, t.fetched_at, now()), coalesce(t.fetched_at, now()), now())
  from public.tender_opportunities t
on conflict (opportunity_id) do nothing;

create or replace function public._record_tender_first_seen()
returns integer
language sql
security definer
set search_path to 'public'
as $$
  with i as (
    insert into public.tender_first_seen (opportunity_id, first_seen_at)
    select t.id, now() from public.tender_opportunities t
     where t.status = 'live'
       and not exists (select 1 from public.tender_first_seen s where s.opportunity_id = t.id)
    on conflict (opportunity_id) do nothing
    returning 1)
  select count(*)::int from i
$$;
revoke all on function public._record_tender_first_seen() from public, anon, authenticated;

-- Is this notice work an electrical contractor would bid for?
create or replace function public._tender_is_electrical_work(p_title text, p_desc text, p_cpv text[])
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  with x as (
    select lower(coalesce(p_title, '')) as ti,
           lower(coalesce(p_title, '') || ' ' || left(coalesce(p_desc, ''), 3000)) as blob,
           coalesce(p_cpv, '{}') as cpv
  )
  select
    -- not installation work at all
    not (
      x.ti ~ '(sexual health|ambulance|cleaning|legal|solicitor|surveyor services|architect|masterplan|feasibility|consultan|advisor|design team|modelling|prisoner|records|peatland|temporary accommodation|sanitaryware|fencing|play area|footpath|lock gates|walkway|balcon|activity plan|certification integration|management tool|software|back office|epc wrapper|portfolio management system|heat-transfer additive|vessel|ferry|catering|insurance|recruitment|agency staff|training services|auditing|preliminary market engagement|\yrcv)'
      or x.ti ~ '\yvehicles?\y(?! charg)'
      or x.ti ~ '(electricity supply|supply of electricity|market for electricity|energy supply|gas supply)'
      or x.ti ~ '(lift (replacement|modernisation|servicing|refurbishment|maintenance)|passenger lift|mobility lift)'
      or exists (select 1 from unnest(x.cpv) cp
                  where left(cp, 2) in ('03','09','15','18','22','30','33','34','37','39','55','60','63','64','65','66','70','72','73','75','77','79','80','85','90','92','98')
                    and left(cp, 5) <> '34928')  -- 34928 = street lighting equipment
    )
    and (
      x.blob ~ '(electric|rewir|lighting|\ylights?\y|illumination|eicr|periodic inspection|condition report|fire alarm|fire detection|pava|emergency light|cctv|door entry|access control|ev charg|charging (point|infrastructure|solution)|evci|solar|\ypv\y|photovoltaic|battery storage|heat pump|\ybms\y|building management system|\ym ?& ?e\y|substation|switchgear|\yhv\y|\ylv\y|cabl|distribution board|consumer unit|\ypat\y|portable appliance|testing|traffic signal|street ?light|smart meter|renewable|decarboni|retrofit|compliance (works|check)|property (safety|maintenance)|responsive repair|repairs? and maintenance|voids|planned (and capital )?works|capital works|refurbish|fit-?out|minor works|building works|modernisation works|hard fm|measured term|heating|ventilation|scada|transformer)'
      or exists (select 1 from unnest(x.cpv) cp
                  where left(cp, 4) in ('4531','4532','4533','4535','4526','4545','4544','4521','4523','4500','4530',
                                        '5070','5071','5061','5042','5023','5111','3162','3152','3153','3171',
                                        '3121','3122','3123','3124','3134','3168','3172','3161','3150','0931','0933',
                                        '4211','4216','4241'))
    )
  from x
$$;

-- Does the notice fit the work types the firm ticked? "electrical" = any
-- electrical work; a specific type matches its tag or its words.
create or replace function public._tender_fits_types(p_title text, p_desc text, p_tags text[], p_types text[])
returns boolean
language sql
immutable
set search_path to 'public'
as $$
  select cardinality(coalesce(p_types, '{}')) = 0
      or 'electrical' = any(p_types)
      or coalesce(p_tags, '{}') && p_types
      or exists (
        select 1 from unnest(p_types) k
         where lower(coalesce(p_title, '') || ' ' || left(coalesce(p_desc, ''), 3000)) ~ case k
           when 'rewire' then '(rewir)'
           when 'testing' then '(testing|inspection|eicr|condition report|\ypat\y|portable appliance)'
           when 'fire_alarm' then '(fire alarm|fire detection|pava)'
           when 'emergency_lighting' then '(emergency light)'
           when 'ev_charging' then '(ev charg|vehicle charg|charging (point|infrastructure|solution)|evci)'
           when 'consumer_units' then '(consumer unit|distribution board|fuse ?board)'
           when 'data_cabling' then '(data cabl|structured cabl|network cabl|fibre)'
           else '(?!x)x' end)
$$;

revoke all on function public._tender_is_electrical_work(text, text, text[]) from public, anon, authenticated;
revoke all on function public._tender_fits_types(text, text, text[], text[]) from public, anon, authenticated;

drop function if exists public._tender_matches(uuid);
create function public._tender_matches(p_firm uuid)
returns table (
  id uuid, title text, client_name text, value numeric, deadline timestamptz,
  published_at timestamptz, first_seen_at timestamptz, is_new boolean, region text,
  location_text text, source text, source_url text, categories text[], miles numeric, tracked boolean
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
  ), mine as (
    -- tenders the firm (owner or any active admin) already tracks
    select tt.opportunity_id from public.tenders tt
     where tt.opportunity_id is not null
       and (tt.user_id = p_firm
            or tt.user_id in (select a.user_id from public.employer_admins a
                               where a.employer_id = p_firm and a.status = 'active'))
  ), o as (
    select t.*, public._tender_region_key(t.region) as rkey,
           coalesce(t.value_exact, t.value_high, t.value_low) as v,
           coalesce(fs.first_seen_at, now()) as seen,
           exists (select 1 from mine where mine.opportunity_id = t.id) as is_mine,
           left(regexp_replace(lower(t.title), '[^a-z0-9]', '', 'g'), 120) as tkey
      from public.tender_opportunities t
      left join public.tender_first_seen fs on fs.opportunity_id = t.id
     where t.status = 'live'
       and coalesce(t.opportunity_type, 'tender') = 'tender'
       and (t.deadline is null or t.deadline >= now())
       and public._tender_is_electrical_work(t.title, t.description, t.cpv_codes)
  ), d as (
    select o.*, p.rkeys, p.cats, p.min_value, p.max_value, p.search_radius_miles,
           case when o.lat is not null and p.blat is not null then
             round((3958.8 * acos(least(1, greatest(-1,
               cos(radians(p.blat::float8)) * cos(radians(o.lat::float8)) * cos(radians(o.lng::float8) - radians(p.blng::float8))
               + sin(radians(p.blat::float8)) * sin(radians(o.lat::float8))))))::numeric, 0)
           end as mi,
           (p.blat is not null and p.base_postcode is not null) as has_base,
           bool_or(o.is_mine) over (partition by o.tkey) as trk,
           min(o.seen) over (partition by o.tkey) as group_seen
      from o cross join p
  ), f as (
    select d.* from d
     where public._tender_fits_types(d.title, d.description, d.categories, d.cats)
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
  )
  -- one row per notice, however many sources carry it: keep the copy with a
  -- value, a place and a deadline
  select distinct on (f.tkey)
         f.id, f.title, f.client_name, f.v, f.deadline, f.published_at, f.group_seen,
         f.group_seen >= now() - interval '7 days', f.region, f.location_text, f.source,
         f.source_url, f.categories, f.mi, f.trk
    from f
   order by f.tkey, (f.v is not null) desc, (f.lat is not null) desc, (f.deadline is not null) desc, f.seen
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
  v_money boolean;
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;
  v_money := public.can_see_firm_money(p_firm);
  select * into v_prefs from public.user_tender_preferences where user_id = p_firm;
  if v_prefs.user_id is null then
    return jsonb_build_object('has_criteria', false, 'can_see_money', v_money, 'total', 0,
                              'new_this_week', 0, 'items', '[]'::jsonb);
  end if;
  return (
    with m as (select * from public._tender_matches(p_firm))
    select jsonb_build_object(
      'has_criteria', true,
      'can_see_money', v_money,
      'criteria', to_jsonb(v_prefs) - 'user_id' - 'last_digest_at',
      'total', (select count(*) from m),
      'new_this_week', (select count(*) from m where m.is_new and not m.tracked),
      'items', coalesce((
        select jsonb_agg(case when v_money then to_jsonb(x) else to_jsonb(x) - 'value' end
                         order by x.tracked, x.is_new desc, x.first_seen_at desc, x.deadline nulls last)
          from (select * from m
                 order by m.tracked, m.is_new desc, m.first_seen_at desc, m.deadline nulls last
                 limit greatest(1, least(coalesce(p_limit, 12), 100))) x
      ), '[]'::jsonb)
    )
  );
end;
$$;
revoke all on function public.get_tender_matches(uuid, int) from public, anon;
grant execute on function public.get_tender_matches(uuid, int) to authenticated;

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
  -- Anything that arrived since 08:00 yesterday gets its first-seen stamp now,
  -- so it counts this week and never again.
  perform public._record_tender_first_seen();
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
                 and m.first_seen_at > coalesce(r.last_digest_at, now() - interval '7 days')) s;
      if v_new > 0 then
        perform public.notify_employer_bell(
          r.user_id, 'tender_matches',
          case when v_new = 1 then '1 new tender fits what you bid for'
               else v_new || ' new tenders fit what you bid for' end,
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

-- The daily 08:00 job (after the syncs) also stamps first-seen.
create or replace function public.expire_stale_tender_opportunities()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v_closed int; v_expired int; v_seen int;
begin
  with c as (
    update public.tender_opportunities set status = 'closed', updated_at = now()
     where status = 'live' and deadline is not null and deadline < now()
    returning 1)
  select count(*) into v_closed from c;
  with e as (
    update public.tender_opportunities set status = 'expired', updated_at = now()
     where status = 'live' and deadline is null and fetched_at < now() - interval '14 days'
    returning 1)
  select count(*) into v_expired from e;
  v_seen := public._record_tender_first_seen();
  return jsonb_build_object('closed', v_closed, 'expired', v_expired, 'first_seen', v_seen);
end;
$function$;
revoke all on function public.expire_stale_tender_opportunities() from public, anon, authenticated;
