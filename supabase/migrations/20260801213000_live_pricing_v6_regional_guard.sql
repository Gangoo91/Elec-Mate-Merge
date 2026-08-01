-- Live Pricing v6: final regional robustness rule.
-- v5's median-of-user-medians overcorrected: with 2 contributors a single-quote
-- user gets 50% weight (Scotland EICR flipped £80→£390 on one quote). The truth
-- is that 2-contributor cells cannot give a defensible figure at all.
-- Rule now: regional rows are quote-level medians, shown only when the cell has
-- >=3 quotes, >=3 distinct electricians, and no single electrician contributed
-- more than 70% of the quotes. Fewer rows (51→31), every one defensible.

drop function if exists public.get_live_pricing_benchmarks();

create function public.get_live_pricing_benchmarks()
returns table (
  job_type text,
  scope text,
  region text,
  sample_size integer,
  contributors integer,
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
      (count(distinct s.user_id) filter (where s.pure_scope))::integer as contributors,
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
  ),
  regional_cells as (
    select
      s.job_type,
      s.region,
      count(*)::integer as sample_size,
      count(distinct s.user_id)::integer as contributors,
      round(percentile_cont(0.5) within group (order by s.price)) as median_price,
      round(percentile_cont(0.25) within group (order by s.price)) as p25_price,
      round(percentile_cont(0.75) within group (order by s.price)) as p75_price,
      max(s.created_at)::date as latest_activity,
      (
        select max(user_count) from (
          select count(*) as user_count from src s3
          where s3.job_type = s.job_type and s3.region = s.region and s3.pure_scope
          group by s3.user_id
        ) uc
      )::numeric / count(*) as top_share
    from src s
    where s.region is not null and s.pure_scope
    group by s.job_type, s.region
  )
  select
    n.job_type,
    'national'::text as scope,
    'UK'::text as region,
    n.sample_size,
    n.contributors,
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
    rc.job_type,
    'regional'::text,
    rc.region,
    rc.sample_size,
    rc.contributors,
    rc.median_price,
    rc.p25_price,
    rc.p75_price,
    null::numeric,
    0::integer,
    0::integer,
    null::numeric,
    null::jsonb,
    rc.latest_activity
  from regional_cells rc
  where rc.sample_size >= 3 and rc.contributors >= 3 and rc.top_share <= 0.7
$$;

revoke all on function public.get_live_pricing_benchmarks() from public, anon;
grant execute on function public.get_live_pricing_benchmarks() to authenticated, service_role;
