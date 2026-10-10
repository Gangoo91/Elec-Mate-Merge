-- ELE-2072 — leave is matched case-insensitively. The column defaults to
-- 'pending' (lower case) while the app writes 'Pending' / 'Approved', and
-- Mate already compares in lower case; the engine must never miss a leave
-- request because of its casing, or it could suggest someone who is off.
--
-- Additive: replaces the internal _sched_options again (same signature as
-- 20261010231300, revoked from every client role, not called by HEAD or
-- build 49). The only change is lower(l.status) in the two leave checks.

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
  -- ELE-2061: when the firm blocks on right to work, people with no check on
  -- record or an overdue follow-up are never suggested (dispatch_assign's
  -- client gate would stop the booking anyway).
  v_rtw_block boolean;
  v_rtw jsonb;
begin
  select coalesce(s.rtw_enforcement, 'warn') = 'block' into v_rtw_block
    from public.employer_hr_settings s where s.employer_id = p_firm;
  v_rtw_block := coalesce(v_rtw_block, false);
  select coalesce(jsonb_object_agg(st.roster_id::text, st.status), '{}'::jsonb) into v_rtw
    from public._rtw_status(p_firm) st
   where v_rtw_block and st.status in ('missing', 'overdue');
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
       and not (v_rtw ? e.id::text)
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
     where lower(l.status) in ('approved', 'pending')
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
               when v_rtw->>p.id::text = 'missing' then 'No right to work check on record'
               when v_rtw->>p.id::text = 'overdue' then 'Right to work follow-up check overdue'
               when not (v_req <@ public._sched_person_keys(p.id, greatest(p_from, v_today))) then
                 'No ' || (select string_agg(public._sched_req_label(k), ', ')
                             from unnest(v_req) k
                            where not (k = any (public._sched_person_keys(p.id, greatest(p_from, v_today)))))
               when p.is_app and not coalesce(p_crew_has_lead, false) and v_needed = 1 then 'Apprentice, needs someone qualified with them'
               when exists (select 1 from public.employer_leave_requests l
                             where l.employee_id = p.id and lower(l.status) in ('approved', 'pending')
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

revoke all on function public._sched_options(uuid, date, date, text[], numeric, int, double precision, double precision, int, uuid, uuid[], boolean, int) from public, anon, authenticated;
