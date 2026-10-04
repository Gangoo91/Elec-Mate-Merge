-- refresh_certificate_insights(): project only what the rebuild reads.
--
-- The first version copied every issued certificate's whole `data` jsonb into
-- the working temp table — 166 MB for 710 certificates — and then re-read it
-- on every pass, so a rebuild took 9.5 s. The signed-in role has an 8 s
-- statement timeout, so "Rebuild now" on the admin page could never finish
-- (the Sunday cron, running as postgres, was unaffected). Keeping just the
-- observations array, the schedule of tests, the earthing arrangement and Ze
-- is 2.6 MB and the whole rebuild runs in about a second.
--
-- Logic is otherwise identical to 20261004090000: issued EICR/EIC only, staff
-- accounts excluded, sanity bounds per measurement, percentiles and fixed-edge
-- histograms per earthing system and for all supplies, per-code rows with
-- distinct certificates, nothing published from fewer than five certificates,
-- last eight runs kept.

create or replace function public.refresh_certificate_insights()
returns bigint
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_run bigint;
  v_min int := 5;
begin
  create temp table _ci_reports on commit drop as
    select r.id, r.report_type,
           coalesce(r.data->'defectObservations', r.data->'observations', '[]'::jsonb) as obs,
           coalesce(r.data->'scheduleOfTests', '[]'::jsonb) as sched,
           r.data->>'earthingArrangement' as earthing,
           coalesce(r.data->>'externalZe', r.data->>'Ze', r.data->>'ze') as ze
      from public.reports r
      join auth.users u on u.id = r.user_id
     where r.report_type in ('eicr','eic')
       and r.status = 'completed'
       and r.deleted_at is null
       and coalesce(u.email,'') not ilike '%@elec-mate.com';

  create temp table _ci_obs on commit drop as
    select r.id as report_pk,
           upper(trim(o->>'defectCode')) as classification,
           public.cert_insight_category(o->>'item', o->>'description') as category,
           substring(coalesce(o->>'regulation','') from '\d{3}(?:\.\d+)+') as regulation
      from _ci_reports r,
           jsonb_array_elements(case when jsonb_typeof(r.obs) = 'array' then r.obs else '[]'::jsonb end) o
     where r.report_type = 'eicr'
       and upper(trim(coalesce(o->>'defectCode',''))) in ('C1','C2','C3','FI');

  create temp table _ci_vals on commit drop as
    -- supply-level Ze, one per certificate
    select r.id as report_pk, 'ze'::text as measurement,
           public.cert_insight_earthing(r.earthing) as earthing,
           public.cert_insight_num(r.ze) as value
      from _ci_reports r
    union all
    select r.id, m.measurement, public.cert_insight_earthing(r.earthing),
           public.cert_insight_num(t->>m.key)
      from _ci_reports r,
           jsonb_array_elements(case when jsonb_typeof(r.sched) = 'array' then r.sched else '[]'::jsonb end) t,
           (values ('zs','zs'), ('r1r2','r1r2'), ('ir','insulationLiveEarth'), ('rcd_1x','rcdOneX'), ('pfc','pfc')) as m(measurement, key)
     where coalesce(t->>'isDeviceRow','false') <> 'true';

  -- sanity bounds per measurement (typos, wrong units, placeholder zeros)
  create temp table _ci_bounds on commit drop as
    select * from (values
      ('ze',     0.01::numeric, 200::numeric),
      ('zs',     0.01, 1000),
      ('r1r2',   0.01, 50),
      ('ir',     0.1,  2000),
      ('rcd_1x', 1,    500),
      ('pfc',    0.1,  50)) as b(measurement, lo, hi);

  delete from _ci_vals v
   using _ci_bounds b
   where v.measurement = b.measurement
     and (v.value is null or v.value < b.lo or v.value > b.hi);
  delete from _ci_vals where value is null;

  insert into public.certificate_insight_runs (eicr_reports, eic_reports, observations, readings)
  select count(*) filter (where report_type='eicr'),
         count(*) filter (where report_type='eic'),
         (select count(*) from _ci_obs),
         (select count(*) from _ci_vals)
    from _ci_reports
  returning id into v_run;

  insert into public.certificate_insight_defects (run_id, classification, category, observations, reports)
  select v_run, classification, category, count(*), count(distinct report_pk)
    from _ci_obs
   group by classification, category
  having count(distinct report_pk) >= v_min;

  -- one row per code with DISTINCT certificates, so "% of EICRs with a C2" is
  -- never the sum of per-category counts (a cert with two C2 categories is one cert)
  insert into public.certificate_insight_defects (run_id, classification, category, observations, reports)
  select v_run, classification, 'All', count(*), count(distinct report_pk)
    from _ci_obs group by classification
  having count(distinct report_pk) >= v_min;

  insert into public.certificate_insight_regulations (run_id, classification, regulation, observations, reports)
  select v_run, classification, regulation, count(*), count(distinct report_pk)
    from _ci_obs
   where regulation is not null
   group by classification, regulation
  having count(distinct report_pk) >= v_min;

  -- summary: per earthing system, then ALL
  insert into public.certificate_insight_reading_summary
    (run_id, measurement, earthing, n, p10, p25, p50, p75, p90, lower_bound, upper_bound)
  select v_run, v.measurement, v.earthing, count(*),
         percentile_cont(0.10) within group (order by v.value),
         percentile_cont(0.25) within group (order by v.value),
         percentile_cont(0.50) within group (order by v.value),
         percentile_cont(0.75) within group (order by v.value),
         percentile_cont(0.90) within group (order by v.value),
         b.lo, b.hi
    from _ci_vals v join _ci_bounds b on b.measurement = v.measurement
   where v.earthing is not null
   group by v.measurement, v.earthing, b.lo, b.hi
  having count(distinct v.report_pk) >= v_min;

  insert into public.certificate_insight_reading_summary
    (run_id, measurement, earthing, n, p10, p25, p50, p75, p90, lower_bound, upper_bound)
  select v_run, v.measurement, 'ALL', count(*),
         percentile_cont(0.10) within group (order by v.value),
         percentile_cont(0.25) within group (order by v.value),
         percentile_cont(0.50) within group (order by v.value),
         percentile_cont(0.75) within group (order by v.value),
         percentile_cont(0.90) within group (order by v.value),
         b.lo, b.hi
    from _ci_vals v join _ci_bounds b on b.measurement = v.measurement
   group by v.measurement, b.lo, b.hi
  having count(distinct v.report_pk) >= v_min;

  -- histograms: fixed edges per measurement, per earthing system then ALL
  create temp table _ci_edges on commit drop as
    select * from (values
      ('ze',     array[0,0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.5,0.75,1,2,5,10,20,50,100,200]::numeric[]),
      ('zs',     array[0,0.2,0.4,0.6,0.8,1,1.2,1.5,2,3,5,10,20,50,100,200,500,1000]::numeric[]),
      ('r1r2',   array[0,0.1,0.2,0.3,0.5,0.75,1,1.5,2,3,5,10,20,50]::numeric[]),
      ('ir',     array[0,0.5,1,2,5,10,20,50,100,200,500,1000,2000]::numeric[]),
      ('rcd_1x', array[0,10,15,20,25,30,40,50,75,100,150,200,300,500]::numeric[]),
      ('pfc',    array[0,0.5,1,1.5,2,3,4,6,10,16,25,50]::numeric[])
    ) as e(measurement, edges);

  create temp table _ci_binned on commit drop as
    select v.report_pk, v.measurement, v.earthing,
           e.edges[width_bucket(v.value, e.edges)]     as lo,
           e.edges[width_bucket(v.value, e.edges) + 1] as hi
      from _ci_vals v join _ci_edges e on e.measurement = v.measurement;

  insert into public.certificate_insight_reading_buckets (run_id, measurement, earthing, bucket_lo, bucket_hi, n)
  select v_run, measurement, earthing, lo, hi, count(*)
    from _ci_binned
   where earthing is not null
   group by measurement, earthing, lo, hi
  having count(distinct report_pk) >= v_min;

  insert into public.certificate_insight_reading_buckets (run_id, measurement, earthing, bucket_lo, bucket_hi, n)
  select v_run, measurement, 'ALL', lo, hi, count(*)
    from _ci_binned
   group by measurement, lo, hi
  having count(distinct report_pk) >= v_min;

  -- keep the last 8 runs only
  delete from public.certificate_insight_runs
   where id not in (select id from public.certificate_insight_runs order by computed_at desc limit 8);

  return v_run;
end;
$$;

revoke all on function public.refresh_certificate_insights() from public, anon, authenticated;
