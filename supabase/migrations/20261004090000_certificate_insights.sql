-- ELE-1584 / ELE-1587 — anonymous aggregate statistics from issued certificates.
--
-- Every completed EICR carries coded observations; every completed EICR and EIC
-- carries a schedule of tests with measured values. Nothing ever aggregated
-- them. These tables hold counts and distributions only: no report id, no user,
-- no address, no free text. `refresh_certificate_insights()` rebuilds them from
-- scratch (weekly by cron, or on demand); `get_certificate_insights()` serves
-- them read-only to the app, suppressing any cell with fewer than 5 sources.
--
-- Internal accounts (@elec-mate.com) are excluded so test certificates never
-- count. The privacy policy's "Published Industry Statistics" section covers
-- publication of anonymised aggregates.

create table if not exists public.certificate_insight_runs (
  id            bigserial primary key,
  computed_at   timestamptz not null default now(),
  eicr_reports  integer not null,
  eic_reports   integer not null,
  observations  integer not null,
  readings      integer not null
);

create table if not exists public.certificate_insight_defects (
  run_id         bigint not null references public.certificate_insight_runs(id) on delete cascade,
  classification text   not null,   -- C1 | C2 | C3 | FI
  category       text   not null,   -- keyword category of the item/observation
  observations   integer not null,
  reports        integer not null   -- distinct certificates carrying at least one
);

create table if not exists public.certificate_insight_regulations (
  run_id         bigint not null references public.certificate_insight_runs(id) on delete cascade,
  classification text   not null,
  regulation     text   not null,   -- "411.3.3" — the regulation number only
  observations   integer not null,
  reports        integer not null
);

create table if not exists public.certificate_insight_reading_summary (
  run_id      bigint  not null references public.certificate_insight_runs(id) on delete cascade,
  measurement text    not null,   -- ze | zs | r1r2 | ir | rcd_1x | pfc
  earthing    text    not null,   -- TN-C-S | TN-S | TT | ALL
  n           integer not null,
  p10 numeric, p25 numeric, p50 numeric, p75 numeric, p90 numeric,
  lower_bound numeric not null,   -- the sanity filter applied, for the record
  upper_bound numeric not null
);

create table if not exists public.certificate_insight_reading_buckets (
  run_id      bigint  not null references public.certificate_insight_runs(id) on delete cascade,
  measurement text    not null,
  earthing    text    not null,
  bucket_lo   numeric not null,
  bucket_hi   numeric,            -- null = open-ended top bucket
  n           integer not null
);

alter table public.certificate_insight_runs            enable row level security;
alter table public.certificate_insight_defects         enable row level security;
alter table public.certificate_insight_regulations     enable row level security;
alter table public.certificate_insight_reading_summary enable row level security;
alter table public.certificate_insight_reading_buckets enable row level security;
-- No policies: the tables are reached only through get_certificate_insights().

-- ── helpers ───────────────────────────────────────────────────────────────

-- "0.28", ".20", ">200", "0,35 Ω" → a number; "N/A", "LIM", "-" → null.
-- A ">X" reading (instrument ceiling) is taken as X: it is a floor on the true
-- value and the distributions are documented as treating it so.
create or replace function public.cert_insight_num(v text)
returns numeric language sql immutable as $$
  select case
    when v is null then null
    when v !~ '[0-9]' then null                       -- N/A, LIM, N/V, dashes, blank
    when v ~ '[0-9][^0-9.,]+[0-9]' then null           -- two numbers in one cell ("0.3 / 0.5")
    when regexp_replace(replace(v, ',', '.'), '[^0-9.]', '', 'g') ~ '^[0-9]*\.?[0-9]+$'
      then regexp_replace(replace(v, ',', '.'), '[^0-9.]', '', 'g')::numeric
    else null                                           -- "1..08" and other typos
  end;
$$;

create or replace function public.cert_insight_earthing(v text)
returns text language sql immutable as $$
  select case
    when upper(coalesce(v,'')) in ('TN-C-S','TN-C-S (PME)','TNCS','TN-C-S-PNB','TN-C-S (PNB)','PME','PNB') then 'TN-C-S'
    when upper(coalesce(v,'')) in ('TN-S','TNS') then 'TN-S'
    when upper(coalesce(v,'')) in ('TT') then 'TT'
    else null
  end;
$$;

-- Keyword category for an observation. Order matters: the first match wins,
-- so the specific locations come before the generic equipment words.
create or replace function public.cert_insight_category(item text, description text)
returns text language sql immutable as $$
  select case
    when t ~ '(bath|shower room|wet room|zone [0-2]|701)' then 'Bathroom and wet areas'
    when t ~ '(kitchen|cooker|hob|oven)' then 'Kitchen and cooker circuits'
    when t ~ '(outdoor|outside|external|garden|shed|garage|outbuilding|ev charg|car charg)' then 'Outdoor, garage and outbuildings'
    when t ~ '(shower|immersion|water heater)' then 'Showers and water heating'
    when t ~ '(consumer unit|distribution board|fuse ?board|fuseboard|enclosure|busbar|blank|cover|rewireable|bs ?3036|intake|cut-?out|meter tail|tails|main switch|isolat|protective device|fault protection|overcurrent|overload)' then 'Consumer unit and intake'
    when t ~ '(main protective bonding|bonding|earthing conductor|main earth|earth electrode|cpc|circuit protective|earth(ing)? arrangement|supplementary)' then 'Earthing and bonding'
    when t ~ '(rcd|rcbo|30 ?ma|additional protection|residual)' then 'RCD protection'
    when t ~ '(socket|accessor|switch|plate|faceplate|spur|fcu|connection unit)' then 'Sockets, switches and accessories'
    when t ~ '(light|luminaire|lamp|pendant|downlight|ceiling rose|batten)' then 'Lighting'
    when t ~ '(cable|wiring|conductor|flex|junction|joint|sheath|insulation|thermoplastic|pvc|termination|loose|damage)' then 'Cables, wiring and terminations'
    when t ~ '(label|notice|warning|identif|sign|circuit chart|schedule)' then 'Labelling and notices'
    when t ~ '(smoke|heat detector|fire|co alarm|carbon monoxide)' then 'Fire and smoke detection'
    when t ~ '(spd|surge|afdd|arc fault)' then 'SPD and AFDD'
    when t ~ '(zs|loop|impedance|disconnect|polarity|ir |insulation resistance|r1|r2|test)' then 'Test results and disconnection times'
    else 'Other'
  end
  from (select lower(coalesce(item,'') || ' ' || coalesce(description,'')) as t) x;
$$;

-- ── the rebuild ───────────────────────────────────────────────────────────

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
    select r.id, r.report_id, r.report_type, r.data
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
           jsonb_array_elements(coalesce(r.data->'defectObservations', r.data->'observations', '[]'::jsonb)) o
     where r.report_type = 'eicr'
       and upper(trim(coalesce(o->>'defectCode',''))) in ('C1','C2','C3','FI');

  create temp table _ci_vals on commit drop as
    -- supply-level Ze, one per certificate
    select r.id as report_pk, 'ze'::text as measurement,
           public.cert_insight_earthing(r.data->>'earthingArrangement') as earthing,
           public.cert_insight_num(coalesce(r.data->>'externalZe', r.data->>'Ze', r.data->>'ze')) as value
      from _ci_reports r
    union all
    select r.id, m.measurement, public.cert_insight_earthing(r.data->>'earthingArrangement'),
           public.cert_insight_num(t->>m.key)
      from _ci_reports r,
           jsonb_array_elements(coalesce(r.data->'scheduleOfTests','[]'::jsonb)) t,
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

-- ── the read side ─────────────────────────────────────────────────────────

create or replace function public.get_certificate_insights()
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  with run as (
    select * from public.certificate_insight_runs order by computed_at desc limit 1
  )
  select jsonb_build_object(
    'computed_at', run.computed_at,
    'reports', jsonb_build_object('eicr', run.eicr_reports, 'eic', run.eic_reports),
    'observations', run.observations,
    'readings', run.readings,
    'defects_by_code', (
      select coalesce(jsonb_agg(jsonb_build_object('code', classification, 'observations', observations, 'reports', reports) order by classification), '[]'::jsonb)
        from public.certificate_insight_defects where run_id = run.id and category = 'All'),
    'defect_categories', (
      select coalesce(jsonb_agg(jsonb_build_object('code', classification, 'category', category, 'observations', observations, 'reports', reports)
                                order by observations desc), '[]'::jsonb)
        from public.certificate_insight_defects where run_id = run.id and category <> 'All'),
    'regulations', (
      select coalesce(jsonb_agg(jsonb_build_object('code', classification, 'regulation', regulation, 'observations', observations, 'reports', reports)
                                order by observations desc), '[]'::jsonb)
        from (select * from public.certificate_insight_regulations where run_id = run.id order by observations desc limit 40) x),
    'reading_summary', (
      select coalesce(jsonb_agg(jsonb_build_object('measurement', measurement, 'earthing', earthing, 'n', n,
                                'p10', p10, 'p25', p25, 'p50', p50, 'p75', p75, 'p90', p90,
                                'lower_bound', lower_bound, 'upper_bound', upper_bound)
                                order by measurement, earthing), '[]'::jsonb)
        from public.certificate_insight_reading_summary where run_id = run.id),
    'reading_buckets', (
      select coalesce(jsonb_agg(jsonb_build_object('measurement', measurement, 'earthing', earthing, 'lo', bucket_lo, 'hi', bucket_hi, 'n', n)
                                order by measurement, earthing, bucket_lo), '[]'::jsonb)
        from public.certificate_insight_reading_buckets where run_id = run.id)
  )
  from run;
$$;

grant execute on function public.get_certificate_insights() to authenticated;
-- Nothing public reads this yet; grant anon when an SEO page does (privacy policy already covers it).

-- Weekly rebuild, Sunday 02:30, alongside the other weekly refreshes.
select cron.schedule('weekly-certificate-insights-refresh', '30 2 * * 0', $$select public.refresh_certificate_insights()$$)
 where not exists (select 1 from cron.job where jobname = 'weekly-certificate-insights-refresh');
