-- ELE-2072 — smarter scheduling: "Suggest a slot", day route order, and the
-- same engine for Mate and online booking (ELE-2079).
--
-- Additive: new functions only. Nothing HEAD calls is changed.
--
--  _sched_qual_label / _sched_cred_key / _sched_person_keys
--      The ELE-1834 competence rules in SQL, so the server (Mate, the public
--      booking widget) judges credentials the way the client does. They mirror
--      src/utils/competenceMatrix.ts (CANONICAL, ECS_MATCH, governing record =
--      latest expiry, held = training_status empty/Completed/Expired, Study
--      Centre course records never count) and the slug labels in
--      src/data/uk-electrician-constants.ts. The client sheet re-checks every
--      suggestion with checkCrew() as well.
--  _sched_options
--      The engine: for each working day and half-day, who is free (approved or
--      requested leave, existing bookings, tentative online bookings, the
--      firm's working day), holds every required credential valid on that
--      day, and how far they'd travel (from that day's other job, else where
--      they checked in today, else the office). Returns the best options with
--      a plain reason, plus who was ruled out and why.
--  suggest_job_slots (job sheet, diary)   suggest_slots_for_work (Mate, no job)
--  get_diary_routes   day route order per person, straight-line nearest
--                     neighbour; the diary adds real drive times per leg.

-- Only the slugs whose stored code reads differently from its label (the
-- rest resolve the same either way): generated from getAllQualifications().
create or replace function public._sched_qual_label(p text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select coalesce((select v.l from (values
('nvq_level_3','NVQ Level 3 Electrical Installation'),
('pat_testing','PAT Testing Qualification'),
('eal_inspection_testing','EAL Level 3 Certificate in Inspection, Testing & Certification'),
('eal_initial_verification','EAL Level 3 Award in Initial Verification'),
('eal_periodic_testing','EAL Level 3 Award in Periodic Inspection & Testing'),
('ecs_gold','ECS Gold Card (Approved Electrician)'),
('ecs_blue','ECS Blue Card (Electrician)'),
('ecs_yellow','ECS Yellow Card (Apprentice)'),
('ecs_white','ECS White Card (Electrical Labourer)'),
('ecs_green','ECS Green Card (Electrician''s Mate)'),
('ecs_black','ECS Black Card (Manager/Supervisor)'),
('ecs_red','ECS Red Card (Experienced Worker)'),
('first_aid','First Aid at Work'),
('first_aid_emergency','Emergency First Aid at Work'),
('working_at_height','Working at Height'),
('manual_handling','Manual Handling'),
('ev_charging','EV Charging Equipment Installation'),
('eal_ev_charging','EAL Level 3 Award in EV Charging Installation'),
('imi_ev','IMI Level 3 EV Charging Installation'),
('mcs_pv','MCS Solar PV Installation'),
('bess_domestic','Domestic Battery Storage Installation'),
('bess_commercial','Commercial Battery Storage')
  ) as v(s, l) where v.s = p), p);
$$;

create or replace function public._sched_cred_key(p_name text)
returns text
language plpgsql
immutable
set search_path to 'public'
as $$
declare
  n text := public._sched_qual_label(btrim(coalesce(p_name, '')));
begin
  if n = '' then return null; end if;
  if n ~* '\yecs\y' then return 'ecs'; end if;
  if n ~* '18th|bs\s?7671|wiring reg|2382' then return '18th'; end if;
  if n ~* '2391|2394|2395|inspection[[:space:],]*(&|and)?\s*testing|periodic inspection|initial verification' then return '2391'; end if;
  if n ~* '\yam2s?\y|nvq\s*(level\s*)?3|2357|5357' then return 'am2'; end if;
  if n ~* '\ypat\y|2377' then return 'pat'; end if;
  if n ~* 'first aid|\yefaw\y|\yfaw\y' then return 'firstaid'; end if;
  if n ~* 'ipaf|\ymewp\y' then return 'ipaf'; end if;
  if n ~* 'pasma' then return 'pasma'; end if;
  if n ~* 'asbestos' then return 'asbestos'; end if;
  if n ~* 'work(ing)?\s*at\s*height|harness' then return 'height'; end if;
  if n ~* 'manual handling' then return 'manual'; end if;
  if n ~* 'sssts|smsts|site\s*(supervisor|management)\s*safety' then return 'ssts'; end if;
  if n ~* 'fire\s*(safety|marshal|warden|awareness)' then return 'fire'; end if;
  if n ~* '\yev\y|electric vehicle|2921|2919' then return 'ev'; end if;
  if n ~* 'solar|photovoltaic|\ypv\y|2399|battery\s*(energy\s*)?storage|\ybess\y' then return 'solar'; end if;
  return null;
end;
$$;

-- Credential keys a roster member holds valid on p_on (and today).
create or replace function public._sched_person_keys(p_roster uuid, p_on date)
returns text[]
language sql
stable
security definer
set search_path to 'public'
as $$
  with prof as (
    select p.* from public.employer_elec_id_profiles p
     where p.id = public._elec_id_profile_for_roster(p_roster)
  ),
  recs as (
    select public._sched_cred_key(q.qualification_name) as k, q.expiry_date as e
      from public.employer_elec_id_qualifications q
      join prof on q.profile_id = prof.id
     where nullif(btrim(q.qualification_name), '') is not null
       and (q.training_status is null or q.training_status in ('', 'Completed', 'Expired'))
       and coalesce(q.training_type, '') <> 'Study Centre course'
       and coalesce(q.source_table, '') <> 'employer_course_assignments'
    union all
    select 'ecs', prof.ecs_expiry_date from prof
     where prof.ecs_card_type is not null or prof.ecs_expiry_date is not null or prof.ecs_card_number is not null
  ),
  gov as (select k, max(e) as e from recs where k is not null group by k)
  select coalesce(array_agg(k order by k), '{}'::text[]) from gov
   where e is null or e >= greatest(p_on, (now() at time zone 'Europe/London')::date);
$$;

create or replace function public._sched_req_label(p_key text)
returns text
language sql
immutable
set search_path to 'public'
as $$
  select case p_key
    when 'ecs' then 'ECS card' when '18th' then '18th Edition' when '2391' then 'Inspection & Testing'
    when 'ev' then 'EV Charging' when 'solar' then 'Solar PV / Battery' when 'pat' then 'PAT Testing'
    when 'ipaf' then 'IPAF' when 'pasma' then 'PASMA' when 'asbestos' then 'Asbestos Awareness'
    when 'firstaid' then 'First Aid' when 'ssts' then 'SSSTS / SMSTS' when 'am2' then 'AM2 / NVQ L3'
    when 'height' then 'Working at Height' when 'manual' then 'Manual Handling' when 'fire' then 'Fire Safety'
    else p_key end;
$$;

create or replace function public._sched_km(a_lat double precision, a_lng double precision,
                                            b_lat double precision, b_lng double precision)
returns numeric
language sql
immutable
set search_path to 'public'
as $$
  select case when a_lat is null or a_lng is null or b_lat is null or b_lng is null then null else
    round((6371 * acos(least(1, greatest(-1,
      cos(radians(a_lat)) * cos(radians(b_lat)) * cos(radians(b_lng) - radians(a_lng))
      + sin(radians(a_lat)) * sin(radians(b_lat))))))::numeric, 1) end;
$$;

-- Straight line → a cautious drive estimate: 1.3 road factor at 45 km/h, 5 min minimum.
create or replace function public._sched_est_minutes(p_km numeric)
returns int
language sql
immutable
set search_path to 'public'
as $$
  select case when p_km is null then null else greatest(5, round(p_km * 1.3 / 45 * 60))::int end;
$$;

/*
 * The engine. Internal: no auth check, so it is revoked from every client
 * role; the wrappers below check the firm first.
 *
 *  p_hours   hours the visit needs. <= 4.5 books a half-day (am 08:00 / pm
 *            12:30); more books whole days (p_days of them, consecutive
 *            working days).
 *  p_needed  people needed on the visit. Every person suggested holds every
 *            required credential; an apprentice is only suggested alongside
 *            someone who isn't one (or when p_crew_has_lead).
 *  p_exclude roster ids never to suggest (already on the job).
 */
create or replace function public._sched_options(
  p_firm uuid,
  p_from date,
  p_to date,
  p_required text[],
  p_hours numeric,
  p_days int,
  p_lat double precision,
  p_lng double precision,
  p_needed int,
  p_ignore_job uuid,
  p_exclude uuid[],
  p_crew_has_lead boolean,
  p_limit int
)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_wdh numeric;
  v_olat double precision;
  v_olng double precision;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_req text[] := coalesce((select array_agg(distinct x) from unnest(coalesce(p_required, '{}')) x where nullif(x, '') is not null), '{}');
  v_hours numeric;
  v_days int := least(greatest(coalesce(p_days, 1), 1), 10);
  v_needed int := least(greatest(coalesce(p_needed, 1), 1), 6);
  v_limit int := least(greatest(coalesce(p_limit, 3), 1), 20);
  v_half_mode boolean;
  v_options jsonb;
  v_excluded jsonb;
begin
  select coalesce(cp.working_day_hours, 8), cp.office_lat, cp.office_lng
    into v_wdh, v_olat, v_olng
    from public.company_profiles cp where cp.user_id = p_firm
   order by cp.updated_at desc nulls last limit 1;
  v_wdh := coalesce(v_wdh, 8);
  v_hours := least(greatest(coalesce(p_hours, v_wdh), 0.5), v_wdh);
  v_half_mode := v_days = 1 and v_hours <= 4.5;

  create temp table if not exists _sched_slot (
    employee_id uuid, name text, role text, is_app boolean, day date, idx int, half text,
    booked numeric, km numeric, est int, base text, keys text[], score numeric,
    blat double precision, blng double precision
  ) on commit drop;
  truncate _sched_slot;

  with
  days as (
    select d::date as day, (row_number() over (order by d) - 1)::int as idx
      from generate_series(greatest(p_from, v_today), p_to, interval '1 day') d
     where extract(isodow from d) < 6
  ),
  people as (
    select e.id, e.name, coalesce(nullif(e.team_role, ''), e.role) as role,
           (coalesce(e.team_role, '') || ' ' || coalesce(e.role, '')) ~* 'apprentice' as is_app
      from public.employer_employees e
     where e.employer_id = p_firm
       and lower(coalesce(e.status, 'active')) <> 'archived'
       and not (e.id = any (coalesce(p_exclude, '{}')))
  ),
  pd as (
    select p.*, d.day, d.idx, public._sched_person_keys(p.id, d.day) as keys from people p cross join days d
  ),
  lv as (
    select l.employee_id, d.day,
           case when bool_or(coalesce(l.half_day, '') not in ('am', 'pm'))
                  or (bool_or(l.half_day = 'am') and bool_or(l.half_day = 'pm')) then 'day'
                when bool_or(l.half_day = 'am') then 'am' else 'pm' end as off
      from public.employer_leave_requests l
      join days d on d.day between l.start_date and coalesce(l.end_date, l.start_date)
     where l.status in ('Approved', 'Pending')
     group by l.employee_id, d.day
  ),
  bk as (
    select a.employee_id, d.day, coalesce(a.hours_per_day, v_wdh) as h,
           case when a.start_time is not null then a.start_time < time '12:30'
                else true end as am_busy,
           case when a.start_time is not null
                  then a.start_time + make_interval(mins => (coalesce(a.hours_per_day, v_wdh) * 60)::int) > time '12:30'
                       or a.start_time + make_interval(mins => (coalesce(a.hours_per_day, v_wdh) * 60)::int) < a.start_time
                else coalesce(a.hours_per_day, v_wdh) > 4.5 end as pm_busy,
           j.lat::float8 as lat, j.lng::float8 as lng, j.title
      from public.employer_job_assignments a
      join public.employer_jobs j on j.id = a.job_id
      join days d on d.day between a.start_date and coalesce(a.end_date, j.end_date, a.start_date)
     where j.user_id = p_firm and j.archived_at is null and j.status <> 'Cancelled'
       and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
       and (p_ignore_job is null or a.job_id <> p_ignore_job)
    union all
    select b.suggested_employee_id, b.day, (b.minutes / 60.0)::numeric,
           b.half in ('am', 'day'), b.half in ('pm', 'day'), b.lat, b.lng, b.type_label
      from public.employer_online_bookings b
      join days d on d.day = b.day
     where b.firm_id = p_firm and b.status = 'tentative' and b.suggested_employee_id is not null
       and (p_ignore_job is null or b.job_id is distinct from p_ignore_job)
  ),
  load as (
    select employee_id, day, sum(h) as booked, bool_or(am_busy) as am_busy, bool_or(pm_busy) as pm_busy,
           (array_agg(lat order by lat is null) filter (where lat is not null))[1] as blat,
           (array_agg(lng order by lng is null) filter (where lng is not null))[1] as blng,
           (array_agg(title) filter (where lat is not null))[1] as btitle
      from bk group by employee_id, day
  ),
  live as (
    select distinct on (w.employee_id) w.employee_id, w.lat::float8 as lat, w.lng::float8 as lng
      from public.employer_worker_locations w
     where w.lat is not null and coalesce(w.last_updated, w.created_at) > now() - interval '12 hours'
       and w.employee_id in (select id from people)
     order by w.employee_id, coalesce(w.last_updated, w.created_at) desc
  ),
  base as (
    select pd.*, coalesce(ld.booked, 0) as booked, coalesce(ld.am_busy, false) as am_busy,
           coalesce(ld.pm_busy, false) as pm_busy, lv.off,
           coalesce(ld.blat, case when pd.day = v_today then lt.lat end, v_olat) as blat,
           coalesce(ld.blng, case when pd.day = v_today then lt.lng end, v_olng) as blng,
           case when ld.blat is not null then 'from ' || coalesce(ld.btitle, 'their other job')
                when pd.day = v_today and lt.lat is not null then 'from where they checked in'
                when v_olat is not null then 'from the office' end as base
      from pd
      left join load ld on ld.employee_id = pd.id and ld.day = pd.day
      left join lv on lv.employee_id = pd.id and lv.day = pd.day
      left join live lt on lt.employee_id = pd.id
  ),
  halves as (
    select b.*, h.half from base b
    cross join (values ('am'), ('pm'), ('day')) h(half)
  )
  insert into _sched_slot
  select hv.id, hv.name, hv.role, hv.is_app, hv.day, hv.idx, hv.half, hv.booked,
         public._sched_km(hv.blat, hv.blng, p_lat, p_lng),
         public._sched_est_minutes(public._sched_km(hv.blat, hv.blng, p_lat, p_lng)),
         hv.base, hv.keys, 0, hv.blat, hv.blng
    from halves hv
   where v_req <@ hv.keys
     and case hv.half
           when 'am' then v_half_mode and coalesce(hv.off, '') not in ('am', 'day') and not hv.am_busy
           when 'pm' then v_half_mode and coalesce(hv.off, '') not in ('pm', 'day') and not hv.pm_busy
           else not v_half_mode and hv.off is null and hv.booked = 0
         end
     and hv.booked + v_hours + case when hv.off is not null then v_wdh / 2 else 0 end <= v_wdh;

  -- Whole-day visits over several days: keep a start day only when the person
  -- is free on each of the next v_days working days.
  if not v_half_mode and v_days > 1 then
    delete from _sched_slot s
     where (select count(*) from _sched_slot t
             where t.employee_id = s.employee_id and t.idx between s.idx and s.idx + v_days - 1) < v_days;
  end if;

  update _sched_slot s
     set score = s.idx * 45 + coalesce(s.est, 40) + s.booked * 4 + case when s.half = 'pm' then 5 else 0 end
   where true; -- pg_safeupdate rejects an UPDATE with no WHERE on API calls

  if v_needed = 1 then
    select coalesce(jsonb_agg(o order by (o->>'score')::numeric), '[]'::jsonb) into v_options
      from (
        select jsonb_build_object(
                 'day', s.day, 'half', s.half,
                 'start_time', case s.half when 'pm' then '12:30' else '08:00' end,
                 'hours', v_hours, 'days', v_days,
                 'end_day', (select max(t.day) from _sched_slot t where t.employee_id = s.employee_id
                                and t.idx between s.idx and s.idx + v_days - 1),
                 'score', s.score + (s.rn - 1) * 15,
                 'people', jsonb_build_array(jsonb_build_object(
                   'employee_id', s.employee_id, 'name', s.name, 'role', s.role, 'km', s.km,
                   'est_minutes', s.est, 'base', s.base, 'booked_hours', s.booked, 'from_lat', s.blat, 'from_lng', s.blng)),
                 'reason', public._sched_reason(v_req, s.est, s.day, s.half, v_days, s.booked, v_today)) as o
          from (
            select s.*, row_number() over (partition by s.employee_id order by s.score) as rn
              from _sched_slot s
             where (not s.is_app or coalesce(p_crew_has_lead, false))
          ) s
         where s.rn <= 2
         -- A person's second option ranks 15 behind, so the three differ.
         order by s.score + (s.rn - 1) * 15, s.name, s.day
         limit v_limit
      ) x;
  else
    select coalesce(jsonb_agg(o order by (o->>'score')::numeric), '[]'::jsonb) into v_options
      from (
        select jsonb_build_object(
                 'day', g.day, 'half', g.half,
                 'start_time', case g.half when 'pm' then '12:30' else '08:00' end,
                 'hours', v_hours, 'days', v_days, 'score', g.score,
                 'people', g.people,
                 'reason', public._sched_reason(v_req, g.max_est, g.day, g.half, v_days, 0, v_today)
                           || case when v_needed = 2 then '. Both free together' else '. All ' || v_needed || ' free together' end) as o
          from (
            select c.day, c.half, avg(c.score) as score, max(c.est) as max_est,
                   jsonb_agg(jsonb_build_object('employee_id', c.employee_id, 'name', c.name, 'role', c.role,
                             'km', c.km, 'est_minutes', c.est, 'base', c.base, 'booked_hours', c.booked, 'from_lat', c.blat, 'from_lng', c.blng)
                             order by c.is_app, c.score) as people,
                   count(*) as n, bool_or(not c.is_app) as has_lead
              from (
                select s.*, row_number() over (partition by s.day, s.half order by s.is_app, s.score) as rn
                  from _sched_slot s
              ) c
             where c.rn <= v_needed
             group by c.day, c.half
          ) g
         where g.n = v_needed and (g.has_lead or coalesce(p_crew_has_lead, false))
         order by g.score
         limit v_limit
      ) x;
  end if;

  -- Who could never be suggested in the window, and why (people with at least
  -- one usable slot are not listed).
  select coalesce(jsonb_agg(jsonb_build_object('employee_id', e.id, 'name', e.name, 'why', e.why) order by e.name), '[]'::jsonb)
    into v_excluded
    from (
      select p.id, p.name,
             case
               when not (v_req <@ public._sched_person_keys(p.id, greatest(p_from, v_today))) then
                 'No ' || (select string_agg(public._sched_req_label(k), ', ')
                             from unnest(v_req) k
                            where not (k = any (public._sched_person_keys(p.id, greatest(p_from, v_today)))))
               when p.is_app and not coalesce(p_crew_has_lead, false) and v_needed = 1 then 'Apprentice, needs someone qualified with them'
               when exists (select 1 from public.employer_leave_requests l
                             where l.employee_id = p.id and l.status in ('Approved', 'Pending')
                               and l.start_date <= greatest(p_from, v_today) and coalesce(l.end_date, l.start_date) >= p_to) then 'On leave'
               else 'No free time that fits'
             end as why
        from (
          select e.id, e.name,
                 (coalesce(e.team_role, '') || ' ' || coalesce(e.role, '')) ~* 'apprentice' as is_app
            from public.employer_employees e
           where e.employer_id = p_firm and lower(coalesce(e.status, 'active')) <> 'archived'
             and not (e.id = any (coalesce(p_exclude, '{}')))
        ) p
       where not exists (select 1 from _sched_slot s where s.employee_id = p.id
                          and (not s.is_app or coalesce(p_crew_has_lead, false) or v_needed > 1))
    ) e;

  return jsonb_build_object(
    'from', greatest(p_from, v_today), 'to', p_to,
    'required', to_jsonb(v_req),
    'required_labels', (select coalesce(jsonb_agg(public._sched_req_label(k)), '[]'::jsonb) from unnest(v_req) k),
    'hours', v_hours, 'days', v_days, 'needed', v_needed, 'working_day_hours', v_wdh,
    'options', v_options, 'excluded', v_excluded);
end;
$$;

create or replace function public._sched_reason(
  p_req text[], p_est int, p_day date, p_half text, p_days int, p_booked numeric, p_today date)
returns text
language sql
stable
set search_path to 'public'
as $$
  select upper(left(r, 1)) || substr(r, 2) from (select concat_ws(', ',
    case when cardinality(p_req) > 0 then
      'Holds ' || (select string_agg(public._sched_req_label(k), ' and ' order by k) from unnest(p_req) k) end,
    case when p_est is not null then 'about ' || p_est || ' min away' end,
    'free ' ||
      case when p_days > 1 then p_days || ' days from ' else '' end ||
      case when p_day = p_today then 'today'
           when p_day = p_today + 1 then 'tomorrow'
           else trim(to_char(p_day, 'FMDay')) || case when p_day - p_today >= 7 then ' ' || to_char(p_day, 'FMDD Mon') else '' end
      end ||
      case when p_days > 1 then ''
           when p_half = 'am' then ' morning'
           when p_half = 'pm' then ' afternoon'
           else ' all day' end,
    case when p_booked > 0 then
      (case when p_booked = trunc(p_booked) then trunc(p_booked)::int::text else round(p_booked, 1)::text end)
      || 'h already booked that day' end) as r) x;
$$;

/*
 * "Suggest a slot" for a job (job sheet, diary). Firm-scoped via
 * dispatch_job_firm. Reads the job's credentials, hours, crew size and
 * location; never suggests anyone already on it.
 */
create or replace function public.suggest_job_slots(
  p_job uuid, p_from date default null, p_days int default 7, p_limit int default 3)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_firm uuid := public.dispatch_job_firm(p_job);
  j public.employer_jobs;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_wdh numeric;
  v_from date;
  v_hours numeric;
  v_days int := 1;
  v_crew uuid[];
  v_lead boolean;
  v_needed int;
  v_res jsonb;
begin
  select * into j from public.employer_jobs where id = p_job;
  select coalesce((select cp.working_day_hours from public.company_profiles cp where cp.user_id = v_firm
                    order by cp.updated_at desc nulls last limit 1), 8) into v_wdh;
  select coalesce(array_agg(a.employee_id), '{}'),
         coalesce(bool_or(not ((coalesce(e.team_role, '') || ' ' || coalesce(e.role, '')) ~* 'apprentice')), false)
    into v_crew, v_lead
    from public.employer_job_assignments a
    join public.employer_employees e on e.id = a.employee_id
   where a.job_id = p_job and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended');

  v_from := coalesce(p_from, case when j.start_date > v_today then j.start_date end, v_today);
  if j.quoted_hours is not null and j.quoted_hours > 0 then
    v_hours := least(j.quoted_hours, v_wdh);
    v_days := greatest(1, ceil(j.quoted_hours / v_wdh))::int;
  else
    v_hours := v_wdh;
    if j.start_date is not null and j.end_date is not null and j.end_date > j.start_date then
      select count(*) into v_days from generate_series(j.start_date, j.end_date, interval '1 day') d
       where extract(isodow from d) < 6;
    end if;
  end if;
  v_needed := greatest(1, coalesce(j.workers_count, 1) - cardinality(v_crew));

  v_res := public._sched_options(v_firm, v_from, v_from + least(greatest(coalesce(p_days, 7), 1), 21) - 1,
                                 coalesce(j.required_credentials, '{}'), v_hours, least(v_days, 10),
                                 j.lat::float8, j.lng::float8, v_needed, p_job, v_crew, v_lead, p_limit);
  return v_res || jsonb_build_object('job', jsonb_build_object(
    'id', j.id, 'title', j.title, 'location', j.location, 'lat', j.lat, 'lng', j.lng,
    'crew_count', cardinality(v_crew), 'workers_count', j.workers_count,
    'has_location', j.lat is not null));
end;
$$;

/*
 * Mate's "who can do the EICR at Orchard Close this week?" when no job
 * matches: the credentials come from the work, the place from a geocode.
 */
create or replace function public.suggest_slots_for_work(
  p_firm uuid, p_required text[], p_lat double precision, p_lng double precision,
  p_hours numeric default null, p_from date default null, p_to date default null, p_limit int default 3)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_from date := greatest(coalesce(p_from, v_today), v_today);
  v_to date := coalesce(p_to, v_from + 6);
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if v_to < v_from then v_to := v_from; end if;
  if v_to - v_from > 20 then v_to := v_from + 20; end if;
  return public._sched_options(p_firm, v_from, v_to, coalesce(p_required, '{}'), p_hours, 1,
                               p_lat, p_lng, 1, null, '{}', false, p_limit);
end;
$$;

/*
 * Day route order for the diary: for each person and day with two or more
 * jobs that have a location, the order to drive them in (nearest next stop,
 * starting from the office when the firm has set one, else from the first
 * timed job). Straight-line km per leg; the diary asks google-travel-time
 * for the real minutes.
 */
create or replace function public.get_diary_routes(p_firm uuid, p_from date, p_to date)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_olat double precision;
  v_olng double precision;
  v_out jsonb := '[]'::jsonb;
  r record;
  v_left jsonb;
  v_order jsonb;
  v_cur_lat double precision;
  v_cur_lng double precision;
  v_best int;
  v_best_km numeric;
  v_km numeric;
  v_total numeric;
  i int;
  v_timed jsonb;
begin
  if auth.uid() is null or p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 13 then
    raise exception 'Choose a range of up to 2 weeks' using errcode = '22023';
  end if;
  select cp.office_lat, cp.office_lng into v_olat, v_olng
    from public.company_profiles cp where cp.user_id = p_firm order by cp.updated_at desc nulls last limit 1;

  for r in
    select a.employee_id, d::date as day,
           jsonb_agg(jsonb_build_object('assignment_id', a.id, 'job_id', j.id, 'title', j.title,
                     'location', j.location, 'lat', j.lat::float8, 'lng', j.lng::float8,
                     'start_time', to_char(a.start_time, 'HH24:MI'))
                     order by a.start_time nulls last, j.title) as stops
      from public.employer_job_assignments a
      join public.employer_jobs j on j.id = a.job_id
      cross join generate_series(p_from, p_to, interval '1 day') d
     where j.user_id = p_firm and j.archived_at is null and j.status <> 'Cancelled'
       and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
       and d::date between a.start_date and coalesce(a.end_date, j.end_date, a.start_date)
       and j.lat is not null and j.lng is not null
     group by a.employee_id, d::date
    having count(distinct j.id) >= 2
  loop
    v_left := r.stops;
    v_timed := r.stops;
    v_order := '[]'::jsonb;
    v_total := 0;
    if v_olat is not null then
      v_cur_lat := v_olat; v_cur_lng := v_olng;
    else
      v_cur_lat := (v_left->0->>'lat')::float8; v_cur_lng := (v_left->0->>'lng')::float8;
    end if;
    while jsonb_array_length(v_left) > 0 loop
      v_best := 0; v_best_km := null;
      for i in 0 .. jsonb_array_length(v_left) - 1 loop
        v_km := public._sched_km(v_cur_lat, v_cur_lng, (v_left->i->>'lat')::float8, (v_left->i->>'lng')::float8);
        if v_best_km is null or v_km < v_best_km then v_best := i; v_best_km := v_km; end if;
      end loop;
      v_order := v_order || jsonb_build_array((v_left->v_best) || jsonb_build_object(
        'km_from_prev', case when jsonb_array_length(v_order) = 0 and v_olat is null then null else v_best_km end));
      if not (jsonb_array_length(v_order) = 1 and v_olat is null) then v_total := v_total + coalesce(v_best_km, 0); end if;
      v_cur_lat := (v_left->v_best->>'lat')::float8; v_cur_lng := (v_left->v_best->>'lng')::float8;
      v_left := v_left - v_best;
    end loop;
    v_out := v_out || jsonb_build_array(jsonb_build_object(
      'employee_id', r.employee_id, 'day', r.day,
      'from_office', v_olat is not null,
      'stops', v_order,
      'km_total', round(v_total, 1),
      'est_minutes', public._sched_est_minutes(nullif(v_total, 0)),
      'reordered', (select array_agg(x->>'assignment_id') from jsonb_array_elements(v_order) x)
                   is distinct from (select array_agg(x->>'assignment_id') from jsonb_array_elements(v_timed) x)));
  end loop;
  return v_out;
end;
$$;

revoke all on function public._sched_qual_label(text) from public, anon, authenticated;
revoke all on function public._sched_cred_key(text) from public, anon, authenticated;
revoke all on function public._sched_person_keys(uuid, date) from public, anon, authenticated;
revoke all on function public._sched_req_label(text) from public, anon, authenticated;
revoke all on function public._sched_km(double precision, double precision, double precision, double precision) from public, anon, authenticated;
revoke all on function public._sched_est_minutes(numeric) from public, anon, authenticated;
revoke all on function public._sched_reason(text[], int, date, text, int, numeric, date) from public, anon, authenticated;
revoke all on function public._sched_options(uuid, date, date, text[], numeric, int, double precision, double precision, int, uuid, uuid[], boolean, int) from public, anon, authenticated;
revoke all on function public.suggest_job_slots(uuid, date, int, int) from public, anon;
grant execute on function public.suggest_job_slots(uuid, date, int, int) to authenticated;
revoke all on function public.suggest_slots_for_work(uuid, text[], double precision, double precision, numeric, date, date, int) from public, anon;
grant execute on function public.suggest_slots_for_work(uuid, text[], double precision, double precision, numeric, date, date, int) to authenticated;
revoke all on function public.get_diary_routes(uuid, date, date) from public, anon;
grant execute on function public.get_diary_routes(uuid, date, date) to authenticated;
