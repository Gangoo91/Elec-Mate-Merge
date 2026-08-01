-- Live Pricing benchmarks v3: separate "job on its own" from bundled quotes.
-- A quote whose items span 2+ job types (e.g. board change + EICR remedials)
-- inflates the type's price range. Headline stats now come from PURE-scope
-- quotes (items all one type, or unclassifiable generic lines); bundled quotes
-- are reported alongside as context (bundled_count / bundled_median).

drop function if exists public.get_live_pricing_benchmarks();

create function public.get_live_pricing_benchmarks()
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
  bundled_count integer,
  bundled_median numeric,
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
      public.live_pricing_classify_job(q.txt) as job_type,
      q.item_types <= 1 as pure_scope,
      public.live_pricing_region_from_postcode(
        coalesce(
          nullif(trim(q.client_data->>'postcode'), ''),
          public.live_pricing_extract_postcode(q.client_data->>'address'),
          public.live_pricing_extract_postcode(q.job_details->>'location'),
          public.live_pricing_extract_postcode(q.txt)
        )
      ) as region
    from (
      select
        qq.*,
        coalesce(qq.job_details->>'title', '') || ' ' ||
        coalesce(qq.job_details->>'description', '') || ' ' ||
        coalesce((
          select string_agg(i->>'description', ' ')
          from jsonb_array_elements(
            case when jsonb_typeof(qq.items) = 'array' then qq.items else '[]'::jsonb end
          ) i
        ), '') as txt,
        (
          select count(distinct public.live_pricing_classify_job(i->>'description'))
          from jsonb_array_elements(
            case when jsonb_typeof(qq.items) = 'array' then qq.items else '[]'::jsonb end
          ) i
          where public.live_pricing_classify_job(i->>'description') <> 'Other'
        ) as item_types
      from public.quotes qq
    ) q
    where q.deleted_at is null
      and coalesce(q.is_active_version, true)
      and q.total between 20 and 50000
      and lower(coalesce(q.job_details->>'title', ''))
        !~ '^\s*(deposit|balance|part[ -]?payment|stage payment|final payment)'

    union all

    -- Community submissions are one job by design → pure scope.
    select
      s.user_id,
      s.actual_price::numeric,
      null::boolean,
      s.created_at,
      public.live_pricing_classify_job(
        coalesce(s.job_type, '') || ' ' || coalesce(s.job_description, '')
      ),
      true,
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
      (count(*) filter (where s.pure_scope))::integer as sample_size,
      round(percentile_cont(0.5) within group (order by s.price) filter (where s.pure_scope)) as median_price,
      round(percentile_cont(0.25) within group (order by s.price) filter (where s.pure_scope)) as p25_price,
      round(percentile_cont(0.75) within group (order by s.price) filter (where s.pure_scope)) as p75_price,
      case when count(*) filter (where s.pure_scope and s.won is not null) >= 5
        then round(
          avg(case when s.won then 1.0 else 0.0 end) filter (where s.pure_scope and s.won is not null), 2)
      end as win_rate,
      (count(*) filter (where s.pure_scope and s.won is not null))::integer as decided_count,
      (count(*) filter (where not s.pure_scope))::integer as bundled_count,
      case when count(*) filter (where not s.pure_scope) >= 5
        then round(percentile_cont(0.5) within group (order by s.price) filter (where not s.pure_scope))
      end as bundled_median,
      max(s.created_at)::date as latest_activity
    from src s
    group by s.job_type
    having count(*) filter (where s.pure_scope) >= 5
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
      0::integer as bundled_count,
      null::numeric as bundled_median,
      max(s.created_at)::date as latest_activity
    from src s
    where s.region is not null and s.pure_scope
    group by s.job_type, s.region
    having count(*) >= 3 and count(distinct s.user_id) >= 2
  )
  select * from national
  union all
  select * from regional
$$;

revoke all on function public.get_live_pricing_benchmarks() from public, anon;
grant execute on function public.get_live_pricing_benchmarks() to authenticated, service_role;

-- Insights: "most quoted jobs" medians switch to pure-scope so they match the
-- benchmark headline figures; counts remain all quotes of that type.
create or replace function public.get_live_pricing_insights()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with q as (
    select
      b.user_id,
      b.total::numeric as price,
      b.created_at,
      case
        when b.acceptance_status in ('accepted', 'accepted_pending_deposit') then true
        when b.acceptance_status = 'rejected' then false
        else null
      end as won,
      public.live_pricing_classify_job(b.txt) as job_type,
      b.item_types <= 1 as pure_scope,
      public.live_pricing_region_from_postcode(
        coalesce(
          nullif(trim(b.client_data->>'postcode'), ''),
          public.live_pricing_extract_postcode(b.client_data->>'address'),
          public.live_pricing_extract_postcode(b.job_details->>'location'),
          public.live_pricing_extract_postcode(b.txt)
        )
      ) as region,
      b.items
    from (
      select
        qq.*,
        coalesce(qq.job_details->>'title', '') || ' ' ||
        coalesce(qq.job_details->>'description', '') || ' ' ||
        coalesce((
          select string_agg(i->>'description', ' ')
          from jsonb_array_elements(
            case when jsonb_typeof(qq.items) = 'array' then qq.items else '[]'::jsonb end
          ) i
        ), '') as txt,
        (
          select count(distinct public.live_pricing_classify_job(i->>'description'))
          from jsonb_array_elements(
            case when jsonb_typeof(qq.items) = 'array' then qq.items else '[]'::jsonb end
          ) i
          where public.live_pricing_classify_job(i->>'description') <> 'Other'
        ) as item_types
      from public.quotes qq
    ) b
    where b.deleted_at is null
      and coalesce(b.is_active_version, true)
      and b.total between 20 and 50000
      and lower(coalesce(b.job_details->>'title', ''))
        !~ '^\s*(deposit|balance|part[ -]?payment|stage payment|final payment)'
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
          'median', round(percentile_cont(0.5) within group (order by price) filter (where pure_scope)),
          'win_rate', case when count(*) filter (where won is not null) >= 5
            then round(avg(case when won then 1.0 else 0.0 end) filter (where won is not null), 2)
          end
        ) as t
        from q
        where job_type <> 'Other'
        group by job_type
        having count(*) filter (where pure_scope) >= 5
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
