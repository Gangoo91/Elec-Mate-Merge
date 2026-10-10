-- ELE-1994 follow-up: a tender started by a co-admin is saved under their own
-- user id (useCreateTender), so "In your pipeline" must count the firm's
-- admins' tenders too, not only the owner's.
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
         exists (select 1 from public.tenders tt
                  where tt.opportunity_id = d.id
                    and (tt.user_id = p_firm
                         or tt.user_id in (select a.user_id from public.employer_admins a
                                            where a.employer_id = p_firm and a.status = 'active')))
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
