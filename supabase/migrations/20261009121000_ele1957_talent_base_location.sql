-- ELE-1957: real "within 20 miles" matching for the talent pool.
--
-- 1. employer_elec_id_profiles gets a base location (postcode district or
--    town, resolved to a point from public.uk_postcode_outcodes) and a travel
--    radius. District level only: never a street or full postcode.
-- 2. _uk_place_point(text): "S10 1AB" / "S10" / "Keighley" → outcode, lat/lng,
--    label. Coordinates only ever come from uk_postcode_outcodes.
-- 3. my_talent_location(profile) / set_my_talent_location(profile, place,
--    radius): the electrician reads and sets their own base in "Let firms find
--    me". my_talent_location also offers the district of a postcode already on
--    their business profile, for a one-tap fill.
-- 4. vacancy_talent_matches(vacancy) now computes miles server-side between
--    the vacancy and each member's base: "N within 20 miles" plus per-person
--    distance. Where either side has no location it falls back to the old
--    town/district text match. The opt-in rule is unchanged, word for word.
--
-- Additive: new nullable columns, new functions, and a create-or-replace of
-- vacancy_talent_matches with the same signature (new keys only).

-- ---------------------------------------------------------------- columns
alter table public.employer_elec_id_profiles
  add column if not exists base_outcode text,
  add column if not exists base_label text,
  add column if not exists base_lat double precision,
  add column if not exists base_lng double precision,
  add column if not exists travel_radius_miles smallint,
  add column if not exists base_location_set_at timestamptz;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'employer_elec_id_profiles_travel_radius_chk') then
    alter table public.employer_elec_id_profiles
      add constraint employer_elec_id_profiles_travel_radius_chk
      check (travel_radius_miles is null or travel_radius_miles between 1 and 200);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'employer_elec_id_profiles_base_point_chk') then
    alter table public.employer_elec_id_profiles
      add constraint employer_elec_id_profiles_base_point_chk
      check ((base_lat is null and base_lng is null)
          or (base_lat between 49 and 61.5 and base_lng between -9 and 2.5));
  end if;
end $$;

comment on column public.employer_elec_id_profiles.base_outcode is
  'ELE-1957: talent pool base, postcode district only (e.g. S10). Set via set_my_talent_location.';
comment on column public.employer_elec_id_profiles.base_label is
  'ELE-1957: what the electrician typed, tidied (e.g. "Keighley" or "S10 · Sheffield"). Shown to firms as their area when work_area is blank.';
comment on column public.employer_elec_id_profiles.base_lat is
  'ELE-1957: centroid of base_outcode (or of the town''s districts) from uk_postcode_outcodes. Never a home address.';
comment on column public.employer_elec_id_profiles.base_lng is
  'ELE-1957: see base_lat.';
comment on column public.employer_elec_id_profiles.travel_radius_miles is
  'ELE-1957: how far the electrician will travel for work (1 to 200 miles).';

-- ---------------------------------------------------------------- helpers
create or replace function public._miles_between(
  p_lat1 double precision, p_lng1 double precision,
  p_lat2 double precision, p_lng2 double precision
)
returns double precision
language sql
immutable
parallel safe
set search_path = public
as $$
  select case
    when p_lat1 is null or p_lng1 is null or p_lat2 is null or p_lng2 is null then null
    else 3958.7613 * 2 * asin(least(1.0, sqrt(
           power(sin(radians(p_lat2 - p_lat1) / 2), 2)
           + cos(radians(p_lat1)) * cos(radians(p_lat2)) * power(sin(radians(p_lng2 - p_lng1) / 2), 2))))
  end;
$$;

comment on function public._miles_between(double precision, double precision, double precision, double precision) is
  'ELE-1957: great-circle distance in miles (haversine). Internal.';
revoke all on function public._miles_between(double precision, double precision, double precision, double precision)
  from public, anon, authenticated;

create or replace function public._uk_place_point(p_text text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_raw text := btrim(regexp_replace(coalesce(p_text, ''), '\s+', ' ', 'g'));
  v_up text;
  v_out text;
  v_key text;
  r record;
begin
  if v_raw = '' or length(v_raw) > 120 then
    return null;
  end if;

  v_up := upper(replace(v_raw, ' ', ''));
  if v_up ~ '^[A-Z]{1,2}[0-9][0-9A-Z]?[0-9][A-Z]{2}$' then
    v_out := left(v_up, length(v_up) - 3);
  elsif v_up ~ '^[A-Z]{1,2}[0-9][0-9A-Z]?$' then
    v_out := v_up;
  end if;

  if v_out is not null then
    select o.outcode, o.latitude, o.longitude, o.admin_districts
      into r
      from public.uk_postcode_outcodes o
     where o.outcode = v_out;
    if found then
      return jsonb_build_object(
        'kind', 'outcode',
        'outcode', r.outcode,
        'lat', r.latitude,
        'lng', r.longitude,
        'label', r.outcode || coalesce(' · ' || r.admin_districts[1], ''));
    end if;
    return null;
  end if;

  -- A town: "Keighley", "Keighley, West Yorkshire". Local authority names win
  -- over parish names ("Newport" is the Welsh city, not a parish elsewhere);
  -- a name that appears in several authorities takes the one with the most
  -- districts, so the point never averages across the country.
  v_key := lower(btrim(split_part(v_raw, ',', 1)));
  if v_key = '' or v_key ~ '^[0-9]' then
    return null;
  end if;

  -- "London" is not a local authority or parish; use the central districts
  -- (EC and WC) so it still resolves.
  with m as (
    select o.outcode, o.latitude, o.longitude, 0 as pri, 'London' as grp
      from public.uk_postcode_outcodes o
     where v_key in ('london', 'central london') and o.outcode ~ '^(EC|WC)[0-9]'
    union all
    select o.outcode, o.latitude, o.longitude, 1 as pri, coalesce(o.admin_districts[1], '') as grp
      from public.uk_postcode_outcodes o
     where exists (select 1 from unnest(o.admin_districts) a where lower(a) = v_key)
    union all
    select o.outcode, o.latitude, o.longitude, 2, coalesce(o.admin_districts[1], '')
      from public.uk_postcode_outcodes o
     where exists (select 1 from unnest(o.places) a where lower(a) = v_key)
  ),
  best as (
    select pri, grp from m group by pri, grp order by pri, count(*) desc, grp limit 1
  ),
  pts as (
    select m.* from m join best b on b.pri = m.pri and b.grp = m.grp
  ),
  c as (
    select avg(latitude) as lat, avg(longitude) as lng from pts
  )
  select (select p.outcode from pts p
           order by public._miles_between(p.latitude, p.longitude, c.lat, c.lng) limit 1) as outcode,
         c.lat, c.lng
    into r
    from c;

  if r.lat is null then
    return null;
  end if;

  return jsonb_build_object(
    'kind', 'town',
    'outcode', r.outcode,
    'lat', round(r.lat::numeric, 6),
    'lng', round(r.lng::numeric, 6),
    'label', initcap(btrim(split_part(v_raw, ',', 1))));
end;
$$;

comment on function public._uk_place_point(text) is
  'ELE-1957: postcode, postcode district or town → {kind, outcode, lat, lng, label} from uk_postcode_outcodes; null if unknown. Internal.';
revoke all on function public._uk_place_point(text) from public, anon, authenticated;

-- ---------------------------------------------------------------- the electrician's own base
create or replace function public.my_talent_location(p_profile_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  p record;
  v_postcode text;
  v_suggest jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select ep.base_outcode, ep.base_label, ep.travel_radius_miles, ep.base_location_set_at,
         ep.available_for_hire, ep.available_for_hire_opted_in_at, ep.opt_out
    into p
    from public.employer_elec_id_profiles ep
    join public.employer_employees e on e.id = ep.employee_id
   where ep.id = p_profile_id
     and e.user_id = auth.uid();
  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;

  -- One-tap suggestion: the district of the postcode on their own business
  -- profile. Only the district is returned, never the full postcode.
  select nullif(btrim(cp.company_postcode), '') into v_postcode
    from public.company_profiles cp
   where cp.user_id = auth.uid()
   limit 1;
  if v_postcode is null then
    select public.uk_postcode_from(cp.company_address) into v_postcode
      from public.company_profiles cp
     where cp.user_id = auth.uid()
     limit 1;
  end if;
  v_suggest := public._uk_place_point(v_postcode);
  if v_suggest is not null and v_suggest->>'outcode' is distinct from p.base_outcode then
    v_suggest := jsonb_build_object('place', v_suggest->>'outcode', 'label', v_suggest->>'label');
  else
    v_suggest := null;
  end if;

  return jsonb_build_object(
    'has_location', p.base_outcode is not null,
    'base_outcode', p.base_outcode,
    'base_label', p.base_label,
    'travel_radius_miles', p.travel_radius_miles,
    'set_at', p.base_location_set_at,
    'listed', coalesce(p.available_for_hire, false) and p.available_for_hire_opted_in_at is not null
              and not coalesce(p.opt_out, false),
    'suggestion', v_suggest);
end;
$$;

comment on function public.my_talent_location(uuid) is
  'ELE-1957: the signed-in electrician''s talent pool base and travel radius, plus a one-tap district from their business postcode.';
revoke all on function public.my_talent_location(uuid) from public, anon;
grant execute on function public.my_talent_location(uuid) to authenticated;

create or replace function public.set_my_talent_location(
  p_profile_id uuid,
  p_place text,
  p_radius_miles integer default null
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_pt jsonb;
  v_ok boolean;
begin
  if auth.uid() is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;

  select true into v_ok
    from public.employer_elec_id_profiles ep
    join public.employer_employees e on e.id = ep.employee_id
   where ep.id = p_profile_id
     and e.user_id = auth.uid();
  if v_ok is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  if p_radius_miles is not null and (p_radius_miles < 1 or p_radius_miles > 200) then
    return jsonb_build_object('error', 'bad_radius');
  end if;

  if btrim(coalesce(p_place, '')) = '' then
    update public.employer_elec_id_profiles
       set base_outcode = null, base_label = null, base_lat = null, base_lng = null,
           travel_radius_miles = p_radius_miles::smallint, base_location_set_at = now(),
           updated_at = now()
     where id = p_profile_id;
    return jsonb_build_object('ok', true, 'has_location', false);
  end if;

  v_pt := public._uk_place_point(p_place);
  if v_pt is null then
    return jsonb_build_object('error', 'place_not_found');
  end if;

  update public.employer_elec_id_profiles
     set base_outcode = v_pt->>'outcode',
         base_label = left(v_pt->>'label', 80),
         base_lat = (v_pt->>'lat')::double precision,
         base_lng = (v_pt->>'lng')::double precision,
         travel_radius_miles = coalesce(p_radius_miles, travel_radius_miles, 20)::smallint,
         base_location_set_at = now(),
         updated_at = now()
   where id = p_profile_id;

  -- The in-app prompt has done its job.
  update public.user_notifications
     set is_read = true, read_at = now()
   where user_id = auth.uid()
     and type = 'talent_location_prompt'
     and is_read = false;

  return jsonb_build_object(
    'ok', true,
    'has_location', true,
    'base_outcode', v_pt->>'outcode',
    'base_label', left(v_pt->>'label', 80),
    'kind', v_pt->>'kind',
    'travel_radius_miles', coalesce(p_radius_miles, 20));
end;
$$;

comment on function public.set_my_talent_location(uuid, text, integer) is
  'ELE-1957: the electrician sets (or clears) their talent pool base (postcode district or town) and travel radius. Own profile only.';
revoke all on function public.set_my_talent_location(uuid, text, integer) from public, anon;
grant execute on function public.set_my_talent_location(uuid, text, integer) to authenticated;

-- ---------------------------------------------------------------- matches, now with miles
create or replace function public.vacancy_talent_matches(p_vacancy_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v public.employer_vacancies%rowtype;
  v_is_app boolean;
  v_is_lab boolean;
  v_loc text;
  v_out text;
  v_terms text[];
  v_pool integer := 0;
  v_matches jsonb;
  v_pt jsonb;
  v_lat double precision;
  v_lng double precision;
  c_radius constant integer := 20;
begin
  if auth.uid() is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select * into v
    from public.employer_vacancies
   where id = p_vacancy_id
     and employer_id in (select public.my_employer_scope());
  if not found then
    return jsonb_build_object('error', 'not_found');
  end if;

  if not public.is_talent_pool_viewer() then
    return jsonb_build_object('error', 'not_employer', 'pool_size', 0, 'match_count', 0,
                              'near_count', 0, 'invited_count', 0, 'matches', '[]'::jsonb);
  end if;

  v_is_app := v.type = 'Apprenticeship' or v.title ilike '%apprentic%';
  v_is_lab := v.title ilike '%labourer%';
  v_loc := lower(btrim(coalesce(v.location, '')));
  v_out := upper(split_part(btrim(coalesce(v.postcode, '')), ' ', 1));
  v_terms := array(
    select lower(btrim(t))
      from unnest(coalesce(v.requirements, '{}') || coalesce(v.nice_to_have, '{}')) t
     where length(btrim(t)) >= 3
  );

  -- Where the job is: the postcode first, then the town in the location.
  v_pt := coalesce(public._uk_place_point(v.postcode), public._uk_place_point(v.location));
  v_lat := (v_pt->>'lat')::double precision;
  v_lng := (v_pt->>'lng')::double precision;

  with pool as (
    select p.id,
           p.job_title,
           coalesce(nullif(btrim(p.work_area), ''), nullif(btrim(p.base_label), '')) as area,
           nullif(btrim(p.work_area), '') as work_area,
           p.ecs_card_type,
           p.verification_tier,
           coalesce(p.is_verified, false) as is_verified,
           p.rate_type,
           p.rate_amount,
           p.travel_radius_miles,
           public._miles_between(v_lat, v_lng, p.base_lat, p.base_lng) as miles,
           public.talent_pool_display_name(coalesce(nullif(btrim(e.name), ''), pr.full_name)) as name,
           lower(coalesce(p.ecs_card_type, '')) as card
      from public.employer_elec_id_profiles p
      join public.employer_employees e on e.id = p.employee_id
      left join public.profiles pr on pr.id = e.user_id
     where coalesce(p.opt_out, false) = false
       and p.available_for_hire = true
       and p.available_for_hire_opted_in_at is not null
       and p.profile_visibility in ('public', 'employers_only')
       and (e.employer_id is null or e.employer_id not in (select public.my_employer_scope()))
       and (e.user_id is null or e.user_id <> auth.uid())
  ),
  classified as (
    select pool.*,
           (card in ('apprentice', 'green', 'trainee_electrician', 'red')
             or coalesce(job_title, '') ilike '%apprentic%') as is_app,
           (card = 'electrical_labourer' or coalesce(job_title, '') ilike '%labourer%') as is_lab
      from pool
  ),
  fit as (
    select c.*,
           case
             when c.miles is not null then c.miles <= c_radius
             else (c.area is not null and (
                     (v_loc <> '' and (lower(c.area) like '%' || v_loc || '%' or v_loc like '%' || lower(c.area) || '%'))
                     or (v_out <> '' and upper(c.area) like v_out || '%')))
           end as near,
           case when c.miles is not null then 'distance'
                when c.area is not null then 'town'
                else 'none' end as near_basis,
           (select count(*)::int
              from public.employer_elec_id_skills s
             where s.profile_id = c.id
               and length(btrim(coalesce(s.skill_name, ''))) >= 3
               and exists (
                 select 1 from unnest(v_terms) t
                  where t like '%' || lower(btrim(s.skill_name)) || '%'
                     or lower(s.skill_name) like '%' || t || '%')) as skill_hits
      from classified c
     where case
             when v_is_app then c.is_app
             when v_is_lab then not c.is_app
             else not c.is_app and not c.is_lab
           end
  ),
  ranked as (
    select f.*,
           exists (select 1 from public.employer_vacancy_invitations i
                    where i.vacancy_id = v.id and i.electrician_profile_id = f.id) as invited,
           exists (select 1 from public.employer_vacancy_applications a
                    where a.vacancy_id = v.id and a.applicant_profile_id = f.id) as applied
      from fit f
  )
  select jsonb_build_object(
           'match_count', count(*),
           'near_count', count(*) filter (where near),
           'within_count', count(*) filter (where miles is not null and miles <= c_radius),
           'located_count', count(*) filter (where miles is not null),
           'invited_count', count(*) filter (where invited),
           'matches', coalesce(jsonb_agg(jsonb_build_object(
              'profile_id', id,
              'name', coalesce(name, 'Electrician'),
              'job_title', job_title,
              'area', area,
              'ecs_card_type', ecs_card_type,
              'verification_tier', coalesce(verification_tier, 'basic'),
              'is_verified', is_verified,
              'rate_type', rate_type,
              'rate_amount', rate_amount,
              'near', coalesce(near, false),
              'near_basis', near_basis,
              'miles', case when miles is null then null else round(miles::numeric, 1) end,
              'travel_radius_miles', travel_radius_miles,
              'will_travel', case when miles is null or travel_radius_miles is null then null
                                  else miles <= travel_radius_miles end,
              'skill_hits', skill_hits,
              'invited', invited,
              'applied', applied)
            order by coalesce(near, false) desc, miles asc nulls last, is_verified desc, skill_hits desc, name), '[]'::jsonb))
    into v_matches
    from (select * from ranked
           order by coalesce(near, false) desc, miles asc nulls last, is_verified desc, skill_hits desc, name
           limit 250) r;

  select count(*) into v_pool
    from public.employer_elec_id_profiles p
    join public.employer_employees e on e.id = p.employee_id
   where coalesce(p.opt_out, false) = false
     and p.available_for_hire = true
     and p.available_for_hire_opted_in_at is not null
     and p.profile_visibility in ('public', 'employers_only')
     and (e.employer_id is null or e.employer_id not in (select public.my_employer_scope()))
     and (e.user_id is null or e.user_id <> auth.uid());

  return v_matches || jsonb_build_object(
    'pool_size', v_pool,
    'vacancy_status', v.status,
    'role', case when v_is_app then 'apprentice' when v_is_lab then 'labourer' else 'electrician' end,
    'has_location', v_loc <> '' or v_out <> '',
    'vacancy_located', v_pt is not null,
    'vacancy_place', v_pt->>'label',
    'radius_miles', c_radius);
end;
$$;

comment on function public.vacancy_talent_matches(uuid) is
  'ELE-1957: opted-in talent pool members who fit a vacancy (role, distance or town, skills), with miles from the job. Sanitised; firm-scoped.';

revoke all on function public.vacancy_talent_matches(uuid) from public, anon;
grant execute on function public.vacancy_talent_matches(uuid) to authenticated;
