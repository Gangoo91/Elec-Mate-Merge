-- ELE-2049 — AM2 exposure tracker.
--
-- NET's survey of ~1,200 candidates who failed AM2 first time (Electrical
-- Times, 23 Jan 2026): 44% lacked confidence in fault finding, 36% in
-- inspection and testing, and 25% had no regular inspection and testing on
-- site. This records how often each apprentice actually does the three
-- things on site, from what they already capture:
--
--   evidence    portfolio_items          (date = date_completed, else created)
--   diary days  site_diary_entries       (date = the diary date)
--
-- A tag says "this evidence / diary day included safe isolation (or
-- inspection and testing, or fault finding)". The learner or their college
-- staff tag; the app SUGGESTS tags from the words already written (a word
-- match, never a claim until someone taps it). A suggestion can be declined
-- (state 'dismissed') so it does not come back.
--
-- Each college sets N weeks (college_settings.am2_exposure_alert_weeks,
-- default 6). After N weeks with none of an area, the learner's tutors get a
-- bell (am2_exposure_due_alerts, weekly cron) and the employer gets an email
-- carrying their existing no-login link (/employer-view/:token), sent by the
-- college-am2-exposure-alerts edge function. At most one alert per learner
-- per area per N weeks.
--
-- Additive only.

/* ── Setting ─────────────────────────────────────────────────────────── */

alter table public.college_settings
  add column if not exists am2_exposure_alert_weeks integer;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'college_settings_am2_exposure_weeks_check') then
    alter table public.college_settings
      add constraint college_settings_am2_exposure_weeks_check
      check (am2_exposure_alert_weeks is null or am2_exposure_alert_weeks between 2 and 26);
  end if;
end $$;

comment on column public.college_settings.am2_exposure_alert_weeks is
  '[COLLEGE] ELE-2049. Weeks without any safe isolation, inspection and testing or fault finding on site before the tutor and employer are alerted. Null = 6.';

/* ── Tags ────────────────────────────────────────────────────────────── */

create table if not exists public.am2_exposure_tags (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  source_kind text not null check (source_kind in ('evidence', 'diary')),
  source_id uuid not null,
  area text not null check (area in ('safe_isolation', 'inspection_testing', 'fault_finding')),
  state text not null default 'tagged' check (state in ('tagged', 'dismissed')),
  activity_date date not null,
  tagged_by uuid references auth.users(id) on delete set null,
  tagged_role text not null check (tagged_role in ('learner', 'staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_kind, source_id, area)
);

create index if not exists am2_exposure_tags_learner_idx
  on public.am2_exposure_tags (learner_id, area, state, activity_date desc);

comment on table public.am2_exposure_tags is
  '[COLLEGE ↔ APPRENTICE] ELE-2049 AM2 exposure: which evidence items and site diary days included safe isolation, inspection and testing or fault finding. Scope: learner_id = the apprentice''s auth user. Used by: Am2ExposureCard (EPA page, Student 360), /college/am2-exposure, am2_exposure_due_alerts. Rule: written only through set_am2_exposure_tag; ''dismissed'' = a suggestion someone declined.';

alter table public.am2_exposure_tags enable row level security;

drop policy if exists "am2_exposure_tags: learner or their college staff read" on public.am2_exposure_tags;
create policy "am2_exposure_tags: learner or their college staff read"
  on public.am2_exposure_tags for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id) or public.is_staff_for_learner_user(learner_id));

revoke all on public.am2_exposure_tags from anon;
revoke insert, update, delete on public.am2_exposure_tags from authenticated;
grant select on public.am2_exposure_tags to authenticated;

/* ── Alert log ───────────────────────────────────────────────────────── */

create table if not exists public.am2_exposure_alerts (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete set null,
  college_id uuid references public.colleges(id) on delete set null,
  area text not null check (area in ('safe_isolation', 'inspection_testing', 'fault_finding')),
  weeks integer not null,
  last_done date,
  alerted_at timestamptz not null default now(),
  tutors_notified integer not null default 0,
  employer_id uuid references public.college_employers(id) on delete set null,
  employer_emailed_at timestamptz,
  employer_email_error text
);

create index if not exists am2_exposure_alerts_learner_idx
  on public.am2_exposure_alerts (learner_id, area, alerted_at desc);

comment on table public.am2_exposure_alerts is
  '[COLLEGE] ELE-2049. One row per alert sent: learner × area with none on site for N weeks. Scope: per learner. Used by: am2_exposure_due_alerts (at most one per learner per area per N weeks), college-am2-exposure-alerts (employer email result), Am2ExposureCard ("tutor and employer told on …"). Rule: written only by the definer functions and the edge function (service role).';

alter table public.am2_exposure_alerts enable row level security;

drop policy if exists "am2_exposure_alerts: learner or their college staff read" on public.am2_exposure_alerts;
create policy "am2_exposure_alerts: learner or their college staff read"
  on public.am2_exposure_alerts for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id) or public.is_staff_for_learner_user(learner_id));

revoke all on public.am2_exposure_alerts from anon;
revoke insert, update, delete on public.am2_exposure_alerts from authenticated;
grant select on public.am2_exposure_alerts to authenticated;

/* ── Bell type ───────────────────────────────────────────────────────── */

insert into public.notification_types (type, category, push, importance)
values ('am2_exposure_gap', 'college_reviews', true, 1)
on conflict (type) do nothing;

/* ── Helpers ─────────────────────────────────────────────────────────── */

-- Suggested areas from free text. A word match, shown as a suggestion only.
create or replace function public._am2x_suggest(p_text text)
returns text[]
language sql
immutable
set search_path = public
as $$
  with t as (select ' ' || lower(coalesce(p_text, '')) || ' ' as v)
  select array_remove(array[
    case when v ~ '(safe(ly)? isolat|isolat(ed|ion|ing|e) |lock(ed)?[ -]?off|proving unit|prov(e|ed|ing) dead|voltage indicator|gs ?38)'
         then 'safe_isolation' end,
    case when v ~ '(inspection (and|&) test|inspect(ed|ing)? and test|testing|test results|insulation resistance|continuity|r1 ?\+ ?r2|[^a-z]zs[^a-z]|[^a-z]ze[^a-z]|loop impedance|efli|[^a-z]pfc[^a-z]|prospective fault|polarity|rcd test|eicr|[^a-z]eic[^a-z]|minor works|schedule of test|periodic inspection|initial verification|megger|multi ?function tester|[^a-z]mft[^a-z])'
         then 'inspection_testing' end,
    case when v ~ '(fault[ -]?find|fault diagnos|diagnos(e|ed|ing|is) |tripping|nuisance trip|open circuit|short circuit|earth fault|traced (a|the) fault|found (a|the) fault|faulty)'
         then 'fault_finding' end
  ], null)
  from t;
$$;

revoke all on function public._am2x_suggest(text) from public, anon;
grant execute on function public._am2x_suggest(text) to authenticated, service_role;

-- Who may see a learner's exposure.
create or replace function public._am2x_can_view(p_learner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and (auth.uid() = p_learner or public._can_assess(p_learner) or public.is_staff_for_learner_user(p_learner));
$$;

revoke all on function public._am2x_can_view(uuid) from public, anon, authenticated;

-- The college's N (weeks), default 6.
create or replace function public._am2x_weeks(p_college uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select am2_exposure_alert_weeks from public.college_settings where college_id = p_college), 6);
$$;

revoke all on function public._am2x_weeks(uuid) from public, anon, authenticated;

-- When the "N weeks with none" clock starts: the learner's start date, but
-- never before the tracker existed (10 Oct 2026). Nothing could be tagged
-- before then, so without this every learner would be "overdue" on day one.
create or replace function public._am2x_clock_from(p_start date)
returns date
language sql
immutable
set search_path = public
as $$
  select greatest(coalesce(p_start, date '2026-10-10'), date '2026-10-10');
$$;

revoke all on function public._am2x_clock_from(date) from public, anon, authenticated;

/* ── Read: one learner ───────────────────────────────────────────────── */

create or replace function public.get_am2_exposure(p_learner uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  v_self boolean;
  v_cs public.college_students%rowtype;
  v_weeks int;
  v_cutoff date;
  v_areas jsonb;
  v_sources jsonb;
  v_alerts jsonb;
begin
  if not public._am2x_can_view(u) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  v_self := auth.uid() = u;

  select * into v_cs from public.college_students
   where user_id = u
   order by (status = 'Active') desc, updated_at desc nulls last
   limit 1;
  v_weeks := public._am2x_weeks(v_cs.college_id);
  v_cutoff := current_date - (v_weeks * 7);

  with a(area, label, net_tasks, ord) as (
    values ('safe_isolation', 'Safe isolation', 'A1 and C', 1),
           ('inspection_testing', 'Inspection and testing', 'B', 2),
           ('fault_finding', 'Fault finding', 'D', 3)
  ),
  t as (
    select area, count(*) as n,
           count(*) filter (where activity_date >= current_date - 84) as n12,
           max(activity_date) as last_done
      from public.am2_exposure_tags
     where learner_id = u and state = 'tagged'
     group by area
  )
  select jsonb_agg(jsonb_build_object(
           'area', a.area, 'label', a.label, 'net_tasks', a.net_tasks,
           'count', coalesce(t.n, 0), 'count_12w', coalesce(t.n12, 0),
           'last_done', t.last_done,
           'days_since', case when t.last_done is null then null else current_date - t.last_done end,
           'overdue', public._am2x_clock_from(v_cs.start_date) <= v_cutoff
                      and (t.last_done is null or t.last_done < v_cutoff))
         order by a.ord)
    into v_areas
    from a left join t on t.area = a.area;

  -- The learner's recent evidence and diary days (last 120 days, newest
  -- first, at most 40), each with its tags and the suggested areas not yet
  -- tagged or declined. Staff see diary days only when shared with the tutor.
  with src as (
    select 'evidence'::text as kind, p.id, coalesce(nullif(trim(p.title), ''), 'Evidence') as title,
           (coalesce(p.date_completed, p.created_at) at time zone 'Europe/London')::date as d,
           public._am2x_suggest(concat_ws(' ', p.title, p.description, p.reflection_notes, p.category,
             array_to_string(p.skills_demonstrated, ' '), array_to_string(p.tags, ' '))) as sug,
           true as visible
      from public.portfolio_items p
     where p.user_id = u
       and coalesce(p.date_completed, p.created_at) >= now() - interval '120 days'
    union all
    select 'diary', s.id,
           coalesce(nullif(trim(s.site_name), ''), 'Site diary'),
           s.date,
           public._am2x_suggest(concat_ws(' ', array_to_string(s.tasks_completed, ' '),
             array_to_string(s.skills_practised, ' '), s.what_i_learned, s.issues_or_questions)),
           (v_self or coalesce(s.share_with_tutor, false))
      from public.site_diary_entries s
     where s.user_id = u and s.date >= current_date - 120
  ),
  joined as (
    select src.*,
           coalesce((select array_agg(x.area order by x.area) from public.am2_exposure_tags x
                      where x.source_kind = src.kind and x.source_id = src.id and x.state = 'tagged'), '{}') as tagged,
           coalesce((select array_agg(x.area order by x.area) from public.am2_exposure_tags x
                      where x.source_kind = src.kind and x.source_id = src.id and x.state = 'dismissed'), '{}') as dismissed
      from src
     where src.visible
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'kind', kind, 'id', id, 'title', title, 'date', d, 'tagged', to_jsonb(tagged),
           'suggested', to_jsonb(array(select unnest(sug) except select unnest(tagged) except select unnest(dismissed))))
         order by d desc, title), '[]'::jsonb)
    into v_sources
    from (select * from joined order by d desc limit 40) j;

  select coalesce(jsonb_agg(jsonb_build_object('area', area, 'alerted_at', alerted_at,
           'employer_emailed', employer_emailed_at is not null, 'tutors', tutors_notified)
           order by alerted_at desc), '[]'::jsonb)
    into v_alerts
    from (select * from public.am2_exposure_alerts where learner_id = u order by alerted_at desc limit 6) al;

  return jsonb_build_object(
    'learner_id', u,
    'weeks', v_weeks,
    'start_date', v_cs.start_date,
    'areas', v_areas,
    'sources', v_sources,
    'alerts', v_alerts,
    'viewer', case when v_self then 'learner' else 'staff' end);
end;
$$;

revoke all on function public.get_am2_exposure(uuid) from public, anon;
grant execute on function public.get_am2_exposure(uuid) to authenticated;

comment on function public.get_am2_exposure(uuid) is
  '[COLLEGE] ELE-2049. One learner''s AM2 exposure: per area (safe isolation, inspection and testing, fault finding) the count, count in 12 weeks, last date and whether it is past the college''s N weeks; the last 120 days of evidence and diary days with tags and suggestions; recent alerts. Learner, their assessors and their college staff.';

/* ── Write: tag, decline or clear ────────────────────────────────────── */

create or replace function public.set_am2_exposure_tag(
  p_source_kind text,
  p_source_id uuid,
  p_area text,
  p_state text default 'tagged'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_learner uuid;
  v_date date;
  v_shared boolean := true;
  v_self boolean;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_area not in ('safe_isolation', 'inspection_testing', 'fault_finding') then
    raise exception 'unknown area' using errcode = '22023';
  end if;
  if p_state not in ('tagged', 'dismissed', 'none') then
    raise exception 'unknown state' using errcode = '22023';
  end if;

  if p_source_kind = 'evidence' then
    select user_id, (coalesce(date_completed, created_at) at time zone 'Europe/London')::date
      into v_learner, v_date
      from public.portfolio_items where id = p_source_id;
  elsif p_source_kind = 'diary' then
    select user_id, date, coalesce(share_with_tutor, false)
      into v_learner, v_date, v_shared
      from public.site_diary_entries where id = p_source_id;
  else
    raise exception 'unknown source' using errcode = '22023';
  end if;
  if v_learner is null then
    raise exception 'not found' using errcode = 'P0002';
  end if;

  v_self := auth.uid() = v_learner;
  if not v_self and not (public._can_assess(v_learner) or public.is_staff_for_learner_user(v_learner)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if not v_self and not v_shared then
    raise exception 'This diary day is not shared with the college' using errcode = '42501';
  end if;

  if p_state = 'none' then
    delete from public.am2_exposure_tags
     where source_kind = p_source_kind and source_id = p_source_id and area = p_area;
  else
    insert into public.am2_exposure_tags
      (learner_id, source_kind, source_id, area, state, activity_date, tagged_by, tagged_role)
    values (v_learner, p_source_kind, p_source_id, p_area, p_state, v_date, auth.uid(),
            case when v_self then 'learner' else 'staff' end)
    on conflict (source_kind, source_id, area) do update
      set state = excluded.state, activity_date = excluded.activity_date,
          tagged_by = excluded.tagged_by, tagged_role = excluded.tagged_role, updated_at = now();
  end if;

  return jsonb_build_object('ok', true, 'learner_id', v_learner);
end;
$$;

revoke all on function public.set_am2_exposure_tag(text, uuid, text, text) from public, anon;
grant execute on function public.set_am2_exposure_tag(text, uuid, text, text) to authenticated;

/* ── Read: a college's learners ──────────────────────────────────────── */

create or replace function public.get_college_am2_exposure(p_college uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_all boolean;
  v_weeks int;
  v_cutoff date;
  v_rows jsonb;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  v_all := public.college_can('learners.view_all', p_college);
  if not v_all and not public.college_can('learners.view_mine', p_college) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  v_weeks := public._am2x_weeks(p_college);
  v_cutoff := current_date - (v_weeks * 7);

  with l as (
    select cs.id, cs.user_id, cs.name, cs.start_date, c.name as cohort, e.company_name as employer
      from public.college_students cs
      left join public.college_cohorts c on c.id = cs.cohort_id
      left join public.college_employers e on e.id = cs.employer_id
     where cs.college_id = p_college
       and cs.user_id is not null
       and coalesce(cs.status, 'Active') = 'Active'
       and (v_all or public.college_can('learners.view_mine', p_college, cs.id))
  ),
  t as (
    select x.learner_id, x.area, count(*) as n, max(x.activity_date) as last_done
      from public.am2_exposure_tags x
     where x.state = 'tagged' and x.learner_id in (select user_id from l)
     group by x.learner_id, x.area
  ),
  per as (
    select l.*, a.area,
           coalesce(t.n, 0) as n, t.last_done,
           public._am2x_clock_from(l.start_date) <= v_cutoff
             and (t.last_done is null or t.last_done < v_cutoff) as overdue
      from l
      cross join (values ('safe_isolation'), ('inspection_testing'), ('fault_finding')) a(area)
      left join t on t.learner_id = l.user_id and t.area = a.area
  )
  select coalesce(jsonb_agg(r order by (r->>'overdue_count')::int desc, r->>'name'), '[]'::jsonb)
    into v_rows
    from (
      select jsonb_build_object(
               'student_id', id, 'user_id', user_id, 'name', name, 'cohort', cohort, 'employer', employer,
               'start_date', start_date,
               'areas', jsonb_object_agg(area, jsonb_build_object('count', n, 'last_done', last_done, 'overdue', overdue)),
               'overdue_count', count(*) filter (where overdue)) as r
        from per
       group by id, user_id, name, cohort, employer, start_date
    ) s;

  return jsonb_build_object(
    'weeks', v_weeks,
    'can_set_weeks', public.college_can('settings.manage', p_college),
    'learners', v_rows);
end;
$$;

revoke all on function public.get_college_am2_exposure(uuid) from public, anon;
grant execute on function public.get_college_am2_exposure(uuid) to authenticated;

/* ── Write: the college's N ──────────────────────────────────────────── */

create or replace function public.set_college_am2_exposure_weeks(p_college uuid, p_weeks integer)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.college_can('settings.manage', p_college) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_weeks is null or p_weeks < 2 or p_weeks > 26 then
    raise exception 'Choose between 2 and 26 weeks' using errcode = '22023';
  end if;
  insert into public.college_settings (college_id, am2_exposure_alert_weeks)
  values (p_college, p_weeks)
  on conflict (college_id) do update set am2_exposure_alert_weeks = excluded.am2_exposure_alert_weeks, updated_at = now();
  return jsonb_build_object('ok', true, 'weeks', p_weeks);
end;
$$;

revoke all on function public.set_college_am2_exposure_weeks(uuid, integer) from public, anon;
grant execute on function public.set_college_am2_exposure_weeks(uuid, integer) to authenticated;

/* ── Alerts (service role, weekly) ───────────────────────────────────── */

-- Finds every active learner with an area past N weeks and no alert for it
-- in the last N weeks; records the alert, rings their tutors' bell, and
-- returns what the edge function needs to email the employer. p_as_of and
-- p_learner exist for testing; p_dry_run returns the list and writes nothing.
create or replace function public.am2_exposure_due_alerts(
  p_as_of date default null,
  p_learner uuid default null,
  p_dry_run boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_today date := coalesce(p_as_of, current_date);
  r record;
  v_out jsonb := '[]'::jsonb;
  v_ids uuid[];
  v_tutor uuid;
  v_n int;
  v_labels text;
  v_route text;
begin
  for r in
    with l as (
      select cs.id as sid, cs.user_id, cs.name, cs.college_id, cs.cohort_id, cs.employer_id, cs.start_date,
             public._am2x_weeks(cs.college_id) as weeks
        from public.college_students cs
       where cs.user_id is not null
         and coalesce(cs.status, 'Active') = 'Active'
         and (p_learner is null or cs.user_id = p_learner)
         -- Only learners whose course leads to an AM2-family assessment.
         and exists (select 1 from public._resolve_qualification(cs.user_id, null) q,
                            public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code)) g
                      where g.route <> 'none')
    ),
    per as (
      select l.*, a.area, a.label, a.ord,
             (select max(x.activity_date) from public.am2_exposure_tags x
               where x.learner_id = l.user_id and x.area = a.area and x.state = 'tagged'
                 and x.activity_date <= v_today) as last_done
        from l
        cross join (values ('safe_isolation', 'safe isolation', 1),
                           ('inspection_testing', 'inspection and testing', 2),
                           ('fault_finding', 'fault finding', 3)) a(area, label, ord)
    )
    select per.sid, per.user_id, per.name, per.college_id, per.cohort_id, per.employer_id, per.weeks,
           array_agg(per.area order by per.ord) as areas,
           array_agg(per.label order by per.ord) as labels,
           array_agg(per.last_done order by per.ord) as last_dones
      from per
     where public._am2x_clock_from(per.start_date) <= v_today - per.weeks * 7
       and (per.last_done is null or per.last_done < v_today - per.weeks * 7)
       and not exists (select 1 from public.am2_exposure_alerts al
                        where al.learner_id = per.user_id and al.area = per.area
                          and al.alerted_at > (v_today - per.weeks * 7)::timestamptz)
     group by per.sid, per.user_id, per.name, per.college_id, per.cohort_id, per.employer_id, per.weeks
  loop
    v_labels := case array_length(r.labels, 1)
                  when 1 then r.labels[1]
                  when 2 then r.labels[1] || ' or ' || r.labels[2]
                  else r.labels[1] || ', ' || r.labels[2] || ' or ' || r.labels[3] end;
    v_ids := '{}';
    v_n := 0;

    if not p_dry_run then
      v_route := '/college?section=student360&studentId=' || r.sid || '#epa';
      for v_tutor in
        select distinct t from (
          select st.user_id as t from public.college_cohorts c
            join public.college_staff st on st.id = c.tutor_id
           where c.id = r.cohort_id and st.user_id is not null and st.archived_at is null
          union
          select a.tutor_id from public.college_student_assignments a
           where (a.student_id = r.user_id or a.student_id = r.sid) and a.tutor_id is not null
        ) q where t is not null
      loop
        perform public.notify_user(v_tutor, 'am2_exposure_gap',
          r.name || ': no ' || v_labels || ' on site in ' || r.weeks || ' weeks',
          'Nothing tagged as ' || v_labels || ' in evidence or the site diary for ' || r.weeks
            || ' weeks. NET''s survey of first-time AM2 fails found fault finding and inspection and testing the weakest areas.',
          jsonb_build_object('route', v_route, 'student_id', r.sid, 'areas', to_jsonb(r.areas)));
        v_n := v_n + 1;
      end loop;

      with ins as (
        insert into public.am2_exposure_alerts
          (learner_id, college_student_id, college_id, area, weeks, last_done, tutors_notified, employer_id, alerted_at)
        select r.user_id, r.sid, r.college_id, a.area, r.weeks, a.last_done, v_n, r.employer_id,
               case when p_as_of is null then now() else p_as_of::timestamptz end
          from unnest(r.areas, r.last_dones) as a(area, last_done)
        returning id
      )
      select array_agg(id) into v_ids from ins;
    end if;

    v_out := v_out || jsonb_build_object(
      'alert_ids', to_jsonb(v_ids),
      'learner_id', r.user_id,
      'student_id', r.sid,
      'learner_name', r.name,
      'college_id', r.college_id,
      'college_name', (select name from public.colleges where id = r.college_id),
      'weeks', r.weeks,
      'areas', to_jsonb(r.areas),
      'labels', v_labels,
      'tutors_notified', v_n,
      'employer', (select jsonb_build_object('id', e.id, 'company_name', e.company_name,
                                             'contact_name', e.contact_name, 'contact_email', e.contact_email,
                                             'opted_out', e.weekly_digest_opt_out_at is not null)
                     from public.college_employers e where e.id = r.employer_id));
  end loop;

  return v_out;
end;
$$;

revoke all on function public.am2_exposure_due_alerts(date, uuid, boolean) from public, anon, authenticated;
grant execute on function public.am2_exposure_due_alerts(date, uuid, boolean) to service_role;

-- The edge function records how the employer email went.
create or replace function public.am2_exposure_mark_emailed(p_ids uuid[], p_error text default null)
returns void
language sql
security definer
set search_path = public
as $$
  update public.am2_exposure_alerts
     set employer_emailed_at = case when p_error is null then now() else null end,
         employer_email_error = p_error
   where id = any (p_ids);
$$;

revoke all on function public.am2_exposure_mark_emailed(uuid[], text) from public, anon, authenticated;
grant execute on function public.am2_exposure_mark_emailed(uuid[], text) to service_role;

/* ── Weekly run (Monday 07:45 UTC) ───────────────────────────────────── */

do $$
begin
  if exists (select 1 from cron.job where jobname = 'college-am2-exposure-alerts-weekly') then
    perform cron.unschedule('college-am2-exposure-alerts-weekly');
  end if;
  perform cron.schedule(
    'college-am2-exposure-alerts-weekly',
    '45 7 * * 1',
    $cron$select net.http_post(
       url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/college-am2-exposure-alerts',
       headers:=jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)),
       body:='{"action":"cron"}'::jsonb,
       timeout_milliseconds:=300000)$cron$);
end $$;
