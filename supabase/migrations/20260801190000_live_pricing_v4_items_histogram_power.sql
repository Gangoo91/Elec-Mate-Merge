-- Live Pricing v4:
-- 1. get_live_pricing_item_benchmarks(): per-line going rates for common items,
--    split materials vs fitted (labour / supply-and-fit) — mixing them mushes
--    £70 socket fronts with £120 fitted prices. Thresholds: n>=8, >=3 users.
-- 2. Benchmarks: national rows gain a price-distribution histogram (8 buckets,
--    P5–P95, tails folded in) for types with 50+ solo quotes.
-- 3. Insights: pricing_power — win rate by price position vs the type median;
--    only emitted while every bucket has n>=30.

create or replace function public.live_pricing_classify_item(p_text text)
returns text
language sql
immutable
as $$
  select case
    when d ~* 'double socket|twin socket|2[ -]?gang socket' then 'Double socket'
    when d ~* 'single socket|1[ -]?gang socket' then 'Single socket'
    when d ~* 'usb socket' then 'USB socket'
    when d ~* 'downlight|down light|spot ?light' then 'Downlight'
    when d ~* 'outside light|outdoor light|external light|security light' then 'Outside light'
    when d ~* 'pendant|light fitting|chandelier' then 'Light fitting'
    when d ~* 'smoke|heat detector' then 'Smoke / heat detector'
    when d ~* 'extractor|\yfan\y' then 'Extractor fan'
    when d ~* 'cooker (switch|point|isolat)' then 'Cooker switch / point'
    when d ~* 'consumer unit|fuse ?board' then 'Consumer unit (board)'
    when d ~* '\yev\y|zappi|ohme|easee|wallbox|hypervolt|charge ?point' then 'EV charge point'
    when d ~* 'eicr' then 'EICR (per property)'
    when d ~* '\ybond' then 'Bonding'
    else null
  end
  from (select coalesce(p_text, '')) s(d)
$$;

create or replace function public.get_live_pricing_item_benchmarks()
returns table (
  item text,
  kind text,
  sample_size integer,
  contributors integer,
  median_price numeric,
  p25_price numeric,
  p75_price numeric
)
language sql
stable
security definer
set search_path = public
as $$
  with lines as (
    select
      q.user_id,
      public.live_pricing_classify_item(i->>'description') as item,
      case when coalesce(i->>'category', '') in ('materials', 'equipment')
        then 'materials' else 'fitted' end as kind,
      (i->>'unitPrice')::numeric as unit_price
    from public.quotes q
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(q.items) = 'array' then q.items else '[]'::jsonb end
    ) i
    where q.deleted_at is null
      and coalesce(q.is_active_version, true)
      and (i->>'unitPrice') ~ '^[0-9]+(\.[0-9]+)?$'
      and (i->>'unitPrice')::numeric between 5 and 5000
  )
  select
    l.item,
    l.kind,
    count(*)::integer as sample_size,
    count(distinct l.user_id)::integer as contributors,
    round(percentile_cont(0.5) within group (order by l.unit_price)) as median_price,
    round(percentile_cont(0.25) within group (order by l.unit_price)) as p25_price,
    round(percentile_cont(0.75) within group (order by l.unit_price)) as p75_price
  from lines l
  where l.item is not null
  group by l.item, l.kind
  having count(*) >= 8 and count(distinct l.user_id) >= 3
  order by l.item, l.kind
$$;

revoke all on function public.get_live_pricing_item_benchmarks() from public, anon;
grant execute on function public.get_live_pricing_item_benchmarks() to authenticated, service_role;

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
  histogram jsonb,
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
      (count(*) filter (where s.pure_scope))::integer as sample_size,
      round(percentile_cont(0.5) within group (order by s.price) filter (where s.pure_scope)) as median_price,
      round(percentile_cont(0.25) within group (order by s.price) filter (where s.pure_scope)) as p25_price,
      round(percentile_cont(0.75) within group (order by s.price) filter (where s.pure_scope)) as p75_price,
      percentile_cont(0.05) within group (order by s.price) filter (where s.pure_scope) as p5_raw,
      percentile_cont(0.95) within group (order by s.price) filter (where s.pure_scope) as p95_raw,
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
  )
  select
    n.job_type,
    'national'::text as scope,
    'UK'::text as region,
    n.sample_size,
    n.median_price,
    n.p25_price,
    n.p75_price,
    n.win_rate,
    n.decided_count,
    n.bundled_count,
    n.bundled_median,
    case when n.sample_size >= 50 and n.p95_raw > n.p5_raw then (
      select jsonb_agg(jsonb_build_object(
        'lo', round(n.p5_raw + (gb.b - 1) * (n.p95_raw - n.p5_raw) / 8.0),
        'hi', round(n.p5_raw + gb.b * (n.p95_raw - n.p5_raw) / 8.0),
        'n', (
          select count(*)
          from src s2
          where s2.job_type = n.job_type and s2.pure_scope
            and greatest(1, least(8,
              width_bucket(s2.price, n.p5_raw, n.p95_raw + 0.01, 8))) = gb.b
        )
      ) order by gb.b)
      from generate_series(1, 8) gb(b)
    ) end as histogram,
    n.latest_activity
  from national n

  union all

  select
    s.job_type,
    'regional'::text,
    s.region,
    count(*)::integer,
    round(percentile_cont(0.5) within group (order by s.price)),
    round(percentile_cont(0.25) within group (order by s.price)),
    round(percentile_cont(0.75) within group (order by s.price)),
    null::numeric,
    (count(*) filter (where s.won is not null))::integer,
    0::integer,
    null::numeric,
    null::jsonb,
    max(s.created_at)::date
  from src s
  where s.region is not null and s.pure_scope
  group by s.job_type, s.region
  having count(*) >= 3 and count(distinct s.user_id) >= 2
$$;

revoke all on function public.get_live_pricing_benchmarks() from public, anon;
grant execute on function public.get_live_pricing_benchmarks() to authenticated, service_role;

-- Insights: add pricing_power (win rate by price position vs type median).
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
    'pricing_power', (
      select case when min(x.n) >= 30 then jsonb_agg(
        jsonb_build_object('bucket', x.bucket, 'n', x.n, 'win_rate', x.win_rate)
        order by x.ord
      ) end
      from (
        select
          case when p.rel < 0.7 then 'Well below the going rate'
               when p.rel < 1.0 then 'A bit below'
               when p.rel < 1.5 then 'A bit above'
               else 'Well above (150%+)' end as bucket,
          case when p.rel < 0.7 then 1 when p.rel < 1.0 then 2
               when p.rel < 1.5 then 3 else 4 end as ord,
          count(*) as n,
          round(avg(case when p.won then 1.0 else 0.0 end), 2) as win_rate
        from (
          select q2.won, q2.price / m.m as rel
          from q q2
          join (
            select job_type, percentile_cont(0.5) within group (order by price) as m
            from q where pure_scope group by job_type
          ) m on m.job_type = q2.job_type
          where q2.pure_scope and q2.won is not null and m.m > 0
        ) p
        group by 1, 2
      ) x
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
