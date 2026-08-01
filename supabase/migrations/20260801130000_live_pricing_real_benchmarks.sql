-- Live Pricing: real benchmarks from user quotes
-- Replaces synthetic regional_job_pricing / enhanced_regional_pricing reads with
-- aggregates computed live from quotes + community_pricing_submissions.
-- Privacy: aggregates only, national rows need n>=5, regional rows n>=3 from >=2 users.

-- Classify free-text job descriptions into the canonical Live Pricing taxonomy.
-- Must stay in sync with JOB_TYPE_META in src/components/live-pricing/lib/jobTaxonomy.ts
create or replace function public.live_pricing_classify_job(p_text text)
returns text
language sql
immutable
as $$
  select case
    when t ~ 'eicr|periodic|condition report' then 'EICR'
    when t ~ 'consumer unit|fuse ?board|board change|cu change|distribution board|db change' then 'Consumer unit change'
    when t ~ '\yev\y|ev charger|car charger|zappi|ohme|easee|wallbox|hypervolt|charge ?point' then 'EV charger install'
    when t ~ 'rewire|re-wire|full house wiring' then 'Rewire'
    when t ~ 'shower' then 'Shower circuit'
    when t ~ 'cooker|hob|oven' then 'Cooker / hob circuit'
    when t ~ 'smoke|heat detector|fire alarm|\yalarm\y' then 'Smoke / fire alarms'
    when t ~ 'outside|outdoor|garden|external' then 'Outdoor / garden'
    when t ~ 'light|lamp|downlight|spotlight|chandelier|pendant' then 'Lighting'
    when t ~ 'socket|spur|double gang|single gang' then 'Sockets'
    when t ~ 'extractor|\yfan\y' then 'Extractor fan'
    when t ~ 'garage|shed|outbuilding' then 'Garage / outbuilding'
    when t ~ 'hot tub' then 'Hot tub supply'
    when t ~ 'immersion|heater|heating|radiator|storage heater' then 'Heating / immersion'
    when t ~ 'solar|\ypv\y|battery' then 'Solar / battery'
    when t ~ 'fault|trip|no power|investigat' then 'Fault finding'
    when t ~ 'test|certificate|\ycert\y|minor works|\yeic\y' then 'Testing & certification'
    else 'Other'
  end
  from (select lower(coalesce(p_text, ''))) s(t)
$$;

-- Map a UK postcode (full or district) to one of 12 regions via its area letters.
-- Border areas are approximations at postcode-area level.
create or replace function public.live_pricing_region_from_postcode(p_postcode text)
returns text
language sql
immutable
as $$
  select case
    when a in ('E','EC','N','NW','SE','SW','W','WC','BR','CR','DA','EN','HA','IG','KT','RM','SM','TW','UB') then 'London'
    when a in ('BN','CT','GU','HP','ME','MK','OX','PO','RG','RH','SL','SO','TN') then 'South East'
    when a in ('BA','BH','BS','DT','EX','GL','PL','SN','SP','TA','TQ','TR') then 'South West'
    when a in ('AL','CB','CM','CO','IP','LU','NR','PE','SG','SS','WD') then 'East of England'
    when a in ('DE','LE','LN','NG','NN') then 'East Midlands'
    when a in ('B','CV','DY','HR','ST','SY','TF','WR','WS','WV') then 'West Midlands'
    when a in ('BB','BL','CA','CH','CW','FY','L','LA','M','OL','PR','SK','WA','WN') then 'North West'
    when a in ('BD','DN','HD','HG','HU','HX','LS','S','WF','YO') then 'Yorkshire & Humber'
    when a in ('DH','DL','NE','SR','TS') then 'North East'
    when a in ('AB','DD','DG','EH','FK','G','HS','IV','KA','KW','KY','ML','PA','PH','TD','ZE') then 'Scotland'
    when a in ('CF','LD','LL','NP','SA') then 'Wales'
    when a = 'BT' then 'Northern Ireland'
    else null
  end
  from (
    select upper((regexp_match(trim(coalesce(p_postcode, '')), '^([A-Za-z]{1,2})[0-9]'))[1])
  ) s(a)
$$;

-- Aggregated job price benchmarks. National rows (region = 'UK') require n>=5;
-- regional rows require n>=3 quotes from >=2 distinct users. Never returns raw quotes.
create or replace function public.get_live_pricing_benchmarks()
returns table (
  job_type text,
  scope text,
  region text,
  sample_size integer,
  median_price numeric,
  p25_price numeric,
  p75_price numeric,
  win_rate numeric,
  decided_count integer,
  latest_activity date
)
language sql
stable
security definer
set search_path = public
as $$
  with src as (
    select
      q.user_id,
      q.total::numeric as price,
      case
        when q.acceptance_status in ('accepted', 'accepted_pending_deposit') then true
        when q.acceptance_status = 'rejected' then false
        else null
      end as won,
      q.created_at,
      public.live_pricing_classify_job(
        coalesce(q.job_details->>'title', '') || ' ' ||
        coalesce(q.job_details->>'description', '') || ' ' ||
        coalesce((
          select string_agg(i->>'description', ' ')
          from jsonb_array_elements(
            case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end
          ) i
        ), '')
      ) as job_type,
      public.live_pricing_region_from_postcode(q.client_data->>'postcode') as region
    from public.quotes q
    where q.deleted_at is null
      and coalesce(q.is_active_version, true)
      and q.total between 20 and 50000

    union all

    select
      s.user_id,
      s.actual_price::numeric,
      null::boolean,
      s.created_at,
      public.live_pricing_classify_job(
        coalesce(s.job_type, '') || ' ' || coalesce(s.job_description, '')
      ),
      public.live_pricing_region_from_postcode(s.postcode_district)
    from public.community_pricing_submissions s
    where s.actual_price between 20 and 50000
      and coalesce(s.verification_status, 'pending') <> 'rejected'
  ),
  national as (
    select
      s.job_type,
      'national'::text as scope,
      'UK'::text as region,
      count(*)::integer as sample_size,
      round(percentile_cont(0.5) within group (order by s.price)) as median_price,
      round(percentile_cont(0.25) within group (order by s.price)) as p25_price,
      round(percentile_cont(0.75) within group (order by s.price)) as p75_price,
      case when count(*) filter (where s.won is not null) >= 5
        then round(avg(case when s.won then 1.0 else 0.0 end) filter (where s.won is not null), 2)
      end as win_rate,
      (count(*) filter (where s.won is not null))::integer as decided_count,
      max(s.created_at)::date as latest_activity
    from src s
    group by s.job_type
    having count(*) >= 5
  ),
  regional as (
    select
      s.job_type,
      'regional'::text as scope,
      s.region,
      count(*)::integer as sample_size,
      round(percentile_cont(0.5) within group (order by s.price)) as median_price,
      round(percentile_cont(0.25) within group (order by s.price)) as p25_price,
      round(percentile_cont(0.75) within group (order by s.price)) as p75_price,
      null::numeric as win_rate,
      (count(*) filter (where s.won is not null))::integer as decided_count,
      max(s.created_at)::date as latest_activity
    from src s
    where s.region is not null
    group by s.job_type, s.region
    having count(*) >= 3 and count(distinct s.user_id) >= 2
  )
  select * from national
  union all
  select * from regional
$$;

-- Market-wide insight stats for the Insights tab. Aggregates only.
create or replace function public.get_live_pricing_insights()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with q as (
    select
      q.user_id,
      q.total::numeric as price,
      q.created_at,
      case
        when q.acceptance_status in ('accepted', 'accepted_pending_deposit') then true
        when q.acceptance_status = 'rejected' then false
        else null
      end as won,
      public.live_pricing_classify_job(
        coalesce(q.job_details->>'title', '') || ' ' ||
        coalesce(q.job_details->>'description', '') || ' ' ||
        coalesce((
          select string_agg(i->>'description', ' ')
          from jsonb_array_elements(
            case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end
          ) i
        ), '')
      ) as job_type,
      public.live_pricing_region_from_postcode(q.client_data->>'postcode') as region,
      q.items
    from public.quotes q
    where q.deleted_at is null
      and coalesce(q.is_active_version, true)
      and q.total between 20 and 50000
  ),
  rates as (
    select (i->>'hourlyRate')::numeric as rate
    from q
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end
    ) i
    where (i->>'hourlyRate') ~ '^[0-9]+(\.[0-9]+)?$'
      and (i->>'hourlyRate')::numeric between 15 and 150
  )
  select jsonb_build_object(
    'totals', (
      select jsonb_build_object(
        'quotes', count(*),
        'electricians', count(distinct user_id),
        'total_value', round(sum(price)),
        'quotes_90d', count(*) filter (where created_at > now() - interval '90 days'),
        'won', count(*) filter (where won),
        'decided', count(*) filter (where won is not null)
      ) from q
    ),
    'labour_rate', (
      select jsonb_build_object(
        'n', count(*),
        'median', round(percentile_cont(0.5) within group (order by rate)),
        'p25', round(percentile_cont(0.25) within group (order by rate)),
        'p75', round(percentile_cont(0.75) within group (order by rate))
      ) from rates
    ),
    'top_job_types', (
      select coalesce(jsonb_agg(t order by (t->>'n')::int desc), '[]'::jsonb)
      from (
        select jsonb_build_object(
          'job_type', job_type,
          'n', count(*),
          'median', round(percentile_cont(0.5) within group (order by price)),
          'win_rate', case when count(*) filter (where won is not null) >= 5
            then round(avg(case when won then 1.0 else 0.0 end) filter (where won is not null), 2)
          end
        ) as t
        from q
        where job_type <> 'Other'
        group by job_type
        having count(*) >= 5
        order by count(*) desc
        limit 8
      ) s
    ),
    'monthly_trend', (
      select coalesce(jsonb_agg(m order by m->>'month'), '[]'::jsonb)
      from (
        select jsonb_build_object(
          'month', to_char(date_trunc('month', created_at), 'YYYY-MM'),
          'n', count(*),
          'median', round(percentile_cont(0.5) within group (order by price))
        ) as m
        from q
        where created_at >= date_trunc('month', now()) - interval '5 months'
        group by date_trunc('month', created_at)
      ) s
    ),
    'region_coverage', (
      select coalesce(jsonb_agg(r order by (r->>'n')::int desc), '[]'::jsonb)
      from (
        select jsonb_build_object('region', region, 'n', count(*)) as r
        from q
        where region is not null
        group by region
        having count(*) >= 3
      ) s
    ),
    'generated_at', now()
  )
$$;

revoke all on function public.get_live_pricing_benchmarks() from public, anon;
revoke all on function public.get_live_pricing_insights() from public, anon;
grant execute on function public.get_live_pricing_benchmarks() to authenticated, service_role;
grant execute on function public.get_live_pricing_insights() to authenticated, service_role;
