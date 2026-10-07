-- ELE-1876 — hours stamped once. Off-the-job time the app already knows about
-- becomes PROPOSED hours the apprentice confirms (or changes, or turns down
-- with a reason) in one list, instead of typing hours they already spent.
--
-- Sources (each can produce at most ONE proposal per day / session):
--   register    — a college register marked Present or Late. Length = the
--                 lesson taught (attendance.lesson_plan_id) or the cohort's
--                 lessons scheduled that day; unknown → the apprentice says.
--   college_day — a day the apprentice marked "College" in their site diary
--                 with no register for that day.
--   diary       — a site diary entry with training time that never reached
--                 college_otj_entries (its save to the hours record failed).
--
-- App learning is NOT a source: measured tracker time already counts in
-- get_otj_summary on its own (Andrew, 6 Oct) and the tutor approves it
-- weekly. Proposing it again would count it twice.
--
-- Confirming writes ONE college_otj_entries row, so get_otj_summary stays the
-- single figure with unchanged definitions:
--   * register, known length, apprentice keeps it at or under the lesson
--     length, register marked by current staff → VERIFIED by construction
--     (tutor_recorded, verified_by = the tutor who marked the register).
--   * anything else → PENDING apprentice_submitted, verified by the tutor in
--     the sign-off inbox exactly as today.
--
-- Proposals are (re)built lazily when the apprentice reads them
-- (get_otj_proposals); the build is idempotent through unique keys.

-- 1. The table -----------------------------------------------------------------
create table if not exists public.otj_proposals (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.profiles(id) on delete cascade,
  college_id         uuid references public.colleges(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete cascade,
  source             text not null check (source in ('register', 'college_day', 'diary')),
  -- register: the date (one register mark per learner per day);
  -- college_day: the date; diary: the diary entry id.
  source_ref         text not null,
  source_id          uuid,          -- attendance id / diary entry id, for links
  activity_date      date not null,
  proposed_minutes   int check (proposed_minutes is null or proposed_minutes between 1 and 1440),
  activity_type      text not null default 'theory',
  title              text not null,
  detail             text,
  attested_by        uuid references public.profiles(id) on delete set null,
  attested_by_name   text,
  status             text not null default 'proposed' check (status in ('proposed', 'confirmed', 'rejected')),
  confirmed_minutes  int check (confirmed_minutes is null or confirmed_minutes between 1 and 1440),
  reject_reason      text,
  otj_entry_id       uuid references public.college_otj_entries(id) on delete set null,
  decided_at         timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, source, source_ref)
);
-- One college-day proposal per day, whichever source found it.
create unique index if not exists otj_proposals_one_college_day
  on public.otj_proposals (user_id, activity_date) where source in ('register', 'college_day');
create index if not exists otj_proposals_user_status on public.otj_proposals (user_id, status, activity_date desc);
create index if not exists otj_proposals_college on public.otj_proposals (college_id, decided_at desc) where status <> 'proposed';
create index if not exists otj_proposals_entry on public.otj_proposals (otj_entry_id) where otj_entry_id is not null;

comment on table public.otj_proposals is
  '[COLLEGE] Proposed off-the-job hours the apprentice confirms (ELE-1876): one row per register mark / diary college day / unsent diary training. Scope: per learner (user_id), college via college_id. Used by: learner hours page "Hours to confirm" + My College Do next (get_otj_proposals, confirm/reject/reopen_otj_proposal), tutor /college/otj "Confirmed by apprentices" (get_college_confirmed_hours). Rule: written ONLY by the definer functions; confirming creates one college_otj_entries row (otj_entry_id) so get_otj_summary stays the one figure; app learning is never proposed (it already counts).';

alter table public.otj_proposals enable row level security;
drop policy if exists "otj_proposals: learner reads own" on public.otj_proposals;
create policy "otj_proposals: learner reads own" on public.otj_proposals
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "otj_proposals: staff read" on public.otj_proposals;
create policy "otj_proposals: staff read" on public.otj_proposals
  for select to authenticated using (public._otj_staff_can_act(user_id));
revoke all on public.otj_proposals from anon;
revoke insert, update, delete on public.otj_proposals from authenticated;
grant select on public.otj_proposals to authenticated;

-- NB: least() ignores NULLs, so lengths are coalesced to 0 first and nullif'd
-- back: an unknown length must stay NULL (the apprentice says), never 24h.

-- 2. Builder (internal) ------------------------------------------------------------
create or replace function public._otj_build_proposals(p_user uuid)
returns void language plpgsql security definer set search_path to 'public' as $$
declare
  cs record;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_from date;
begin
  if p_user is null then return; end if;

  select s.id, s.college_id, s.cohort_id, s.start_date into cs
    from college_students s
   where s.user_id = p_user and s.college_id is not null
     and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by s.created_at desc limit 1;
  if cs.id is null then return; end if;

  -- Only time inside the programme counts; never more than a year back.
  v_from := greatest(coalesce(cs.start_date, v_today - 90), v_today - 365);

  -- Confirmed proposals whose entry was deleted (the apprentice withdrew a
  -- pending entry) go back on the list rather than silently vanishing.
  update otj_proposals set status = 'proposed', confirmed_minutes = null, decided_at = null, updated_at = now()
   where user_id = p_user and status = 'confirmed' and otj_entry_id is null;

  -- Withdraw open proposals whose source no longer holds.
  delete from otj_proposals p
   where p.user_id = p_user and p.status = 'proposed' and (
        (p.source = 'register' and not exists (
            select 1 from college_attendance a
             where a.id = p.source_id and a.student_id = cs.id
               and lower(coalesce(a.status, '')) in ('present', 'late')))
     or (p.source = 'college_day' and (
            not exists (select 1 from site_diary_day_marks m
                         where m.user_id = p_user and m.date = p.activity_date and m.kind = 'college')
            or exists (select 1 from college_attendance a
                        where a.student_id = cs.id and a.date = p.activity_date)))
     or (p.source = 'diary' and not exists (
            select 1 from site_diary_entries d
             where d.id = p.source_id and d.user_id = p_user
               and coalesce(d.training_minutes, 0) > 0 and d.linked_otj_entry_id is null))
   );

  -- Registers: Present / Late. Skipped where a tutor already recorded hours
  -- that day (the college logged the day itself).
  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref, source_id,
                             activity_date, proposed_minutes, activity_type, title, detail,
                             attested_by, attested_by_name)
  select p_user, cs.college_id, cs.id, 'register', a.date::text, a.id, a.date,
         nullif(least(coalesce(lp.duration_minutes, sched.minutes, 0), 1440), 0),
         'theory',
         coalesce(lp.title, sched.titles, 'College session'),
         'Marked ' || initcap(lower(a.status)) || coalesce(' by ' || mk.name, ''),
         mk.user_id, mk.name
    from college_attendance a
    left join college_lesson_plans lp on lp.id = a.lesson_plan_id
    left join lateral (
      select sum(l.duration_minutes)::int as minutes,
             string_agg(l.title, ' · ' order by l.scheduled_start_time nulls last, l.title) as titles
        from college_lesson_plans l
       where a.lesson_plan_id is null and l.cohort_id = coalesce(a.cohort_id, cs.cohort_id)
         and l.scheduled_date = a.date and coalesce(l.duration_minutes, 0) > 0
    ) sched on true
    left join lateral (
      select st.user_id, st.name
        from college_staff st
       where st.college_id = cs.college_id and (st.id = a.recorded_by or st.user_id = a.recorded_by)
       order by (st.archived_at is null) desc
       limit 1
    ) mk on true
   where a.student_id = cs.id
     and lower(coalesce(a.status, '')) in ('present', 'late')
     and a.date between v_from and v_today
     and not exists (select 1 from college_otj_entries e
                      where e.student_id = p_user and e.activity_date = a.date
                        and e.source_kind = 'tutor_recorded' and e.verification_status <> 'rejected')
     and not exists (select 1 from otj_proposals q
                      where q.user_id = p_user and q.activity_date = a.date
                        and q.source in ('register', 'college_day') and q.status <> 'proposed')
  on conflict do nothing;

  -- (A register supersedes an open "college day" proposal for the same date:
  -- the withdraw step above already removed it, so the insert does not clash.)

  -- College days marked in the diary with no register for that day.
  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref,
                             activity_date, proposed_minutes, activity_type, title, detail)
  select p_user, cs.college_id, cs.id, 'college_day', m.date::text, m.date,
         nullif(least(coalesce(sched.minutes, 0), 1440), 0), 'theory',
         coalesce(sched.titles, 'College day'),
         'You marked this day as College in your site diary'
    from site_diary_day_marks m
    left join lateral (
      select sum(l.duration_minutes)::int as minutes,
             string_agg(l.title, ' · ' order by l.scheduled_start_time nulls last, l.title) as titles
        from college_lesson_plans l
       where l.cohort_id = cs.cohort_id and l.scheduled_date = m.date and coalesce(l.duration_minutes, 0) > 0
    ) sched on true
   where m.user_id = p_user and m.kind = 'college'
     and m.date between v_from and v_today
     and not exists (select 1 from college_attendance a where a.student_id = cs.id and a.date = m.date)
     and not exists (select 1 from college_otj_entries e
                      where e.student_id = p_user and e.activity_date = m.date
                        and e.source_kind = 'tutor_recorded' and e.verification_status <> 'rejected')
  on conflict do nothing;

  -- Site diary training that never reached the hours record. 30 minutes'
  -- grace so a save still in flight is not caught mid-way.
  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref, source_id,
                             activity_date, proposed_minutes, activity_type, title, detail)
  select p_user, cs.college_id, cs.id, 'diary', d.id::text, d.id, d.date,
         least(d.training_minutes, 1440),
         case when d.training_type in ('practical', 'shadowing', 'tutorial', 'manufacturer_training',
                                       'workshop', 'mentoring', 'other')
              then d.training_type else 'practical' end,
         'Site diary · ' || coalesce(nullif(trim(d.site_name), ''), 'site day'),
         nullif(left(trim(coalesce(d.what_i_learned, '')), 200), '')
    from site_diary_entries d
   where d.user_id = p_user and coalesce(d.training_minutes, 0) > 0 and d.linked_otj_entry_id is null
     and d.updated_at < now() - interval '30 minutes'
     and d.date between v_from and v_today
  on conflict (user_id, source, source_ref) do update
     set proposed_minutes = excluded.proposed_minutes,
         activity_type = excluded.activity_type,
         title = excluded.title,
         detail = excluded.detail,
         updated_at = now()
   where otj_proposals.status = 'proposed';

  -- Open register / college-day proposals follow lesson-length changes.
  update otj_proposals p
     set proposed_minutes = nullif(least(coalesce(lp.duration_minutes, (
            select sum(l.duration_minutes)::int from college_lesson_plans l
             where a.lesson_plan_id is null and l.cohort_id = coalesce(a.cohort_id, cs.cohort_id)
               and l.scheduled_date = a.date and coalesce(l.duration_minutes, 0) > 0), 0), 1440), 0),
         updated_at = now()
    from college_attendance a
    left join college_lesson_plans lp on lp.id = a.lesson_plan_id
   where p.user_id = p_user and p.status = 'proposed' and p.source = 'register' and a.id = p.source_id
     and p.proposed_minutes is distinct from nullif(least(coalesce(lp.duration_minutes, (
            select sum(l.duration_minutes)::int from college_lesson_plans l
             where a.lesson_plan_id is null and l.cohort_id = coalesce(a.cohort_id, cs.cohort_id)
               and l.scheduled_date = a.date and coalesce(l.duration_minutes, 0) > 0), 0), 1440), 0);
end; $$;
revoke all on function public._otj_build_proposals(uuid) from public, anon, authenticated;

-- 3. Learner: read (and refresh) -----------------------------------------------------
create or replace function public.get_otj_proposals()
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'not authorised' using errcode = '42501'; end if;
  perform public._otj_build_proposals(u);
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', p.id,
             'source', p.source,
             'activity_date', p.activity_date,
             'proposed_minutes', p.proposed_minutes,
             'confirmed_minutes', p.confirmed_minutes,
             'activity_type', p.activity_type,
             'title', p.title,
             'detail', p.detail,
             'attested_by_name', p.attested_by_name,
             'status', p.status,
             'reject_reason', p.reject_reason,
             'decided_at', p.decided_at,
             'otj_entry_id', p.otj_entry_id,
             'entry_status', e.verification_status,
             -- Other hours already on the record for that day, so a day is
             -- never logged twice by accident.
             'same_day_minutes', (select coalesce(sum(o.duration_minutes), 0)::int
                                    from college_otj_entries o
                                   where o.student_id = u and o.activity_date = p.activity_date
                                     and o.verification_status <> 'rejected'
                                     and o.source_kind <> 'in_app'
                                     and o.id is distinct from p.otj_entry_id))
           order by (p.status = 'proposed') desc, p.activity_date desc, p.created_at desc)
      from otj_proposals p
      left join college_otj_entries e on e.id = p.otj_entry_id
     where p.user_id = u
       and (p.status = 'proposed' or p.decided_at > now() - interval '45 days')
  ), '[]'::jsonb);
end; $$;
revoke all on function public.get_otj_proposals() from public, anon;
grant execute on function public.get_otj_proposals() to authenticated;

-- 4. Learner: confirm ----------------------------------------------------------------
create or replace function public.confirm_otj_proposal(
  p_id uuid,
  p_minutes int default null,
  p_in_working_hours boolean default null,
  p_outside_hours_compensated boolean default null,
  p_note text default null)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare
  u uuid := auth.uid();
  p record;
  v_minutes int;
  v_day_total int;
  v_name text;
  v_verified boolean := false;
  v_entry uuid;
  v_status text;
  v_hours text;
  v_desc text;
  v_in boolean;
  v_out boolean;
  v_label text;
  v_units text[] := '{}';
  v_photos text[];
begin
  if u is null then raise exception 'not authorised' using errcode = '42501'; end if;

  -- Make sure the source still holds before anything is written.
  perform public._otj_build_proposals(u);

  select * into p from otj_proposals where id = p_id and user_id = u for update;
  if p.id is null then
    return jsonb_build_object('error', 'That one is no longer on your list. Refresh and try again.');
  end if;
  if p.status <> 'proposed' then
    return jsonb_build_object('error', 'You have already answered this one.');
  end if;

  v_minutes := coalesce(p_minutes, p.proposed_minutes);
  if v_minutes is null or v_minutes < 1 or v_minutes > 1440 then
    return jsonb_build_object('error', 'Say how long it was.');
  end if;

  -- College is day release in paid hours; everything else asks (funding rules 79.6).
  v_in := case when p.source = 'register' then coalesce(p_in_working_hours, true) else p_in_working_hours end;
  v_out := coalesce(p_outside_hours_compensated, false);
  if not (coalesce(v_in, false) or v_out) then
    return jsonb_build_object('error', 'Only time in your paid working hours, or paid back by your employer, can count.');
  end if;

  select coalesce(sum(duration_minutes), 0)::int into v_day_total
    from college_otj_entries
   where student_id = u and activity_date = p.activity_date and verification_status <> 'rejected';
  if v_day_total + v_minutes > 1440 then
    return jsonb_build_object('error', 'That would put more than 24 hours on one day.');
  end if;

  select coalesce(nullif(trim(full_name), ''), 'Apprentice') into v_name from profiles where id = u;
  v_hours := regexp_replace(trim(to_char(v_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h';
  v_label := case p.source
    when 'register' then 'From your register'
    when 'college_day' then 'From your site diary (college day)'
    else 'From your site diary' end;
  v_desc := v_label || ' on ' || to_char(p.activity_date, 'FMDy FMDD Mon') || ', ' || v_hours
            || coalesce('. ' || p.detail, '') || '.'
            || case when p.proposed_minutes is not null and v_minutes <> p.proposed_minutes
                    then ' Changed by the apprentice from '
                         || regexp_replace(trim(to_char(p.proposed_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h.'
                    else '' end
            || coalesce(E'\n\n' || nullif(left(trim(coalesce(p_note, '')), 1000), ''), '');

  -- Verified by construction: the tutor's own register, a known lesson
  -- length, the apprentice keeping to it, the marker still current staff.
  v_verified := p.source = 'register'
    and p.proposed_minutes is not null
    and v_minutes <= p.proposed_minutes
    and p.attested_by is not null
    and exists (select 1 from college_staff st
                 where st.user_id = p.attested_by and st.college_id = p.college_id
                   and st.archived_at is null and lower(coalesce(st.status, 'active')) = 'active');

  if v_verified then
    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, source, source_kind, verification_status,
      verified_by, verified_at, verification_rationale, in_working_hours, outside_hours_compensated)
    values (
      p.college_id, u, p.attested_by, p.attested_by_name, p.activity_date, v_minutes,
      p.activity_type, p.title, left(v_desc, 4000), 'college', 'tutor_recorded', 'verified',
      p.attested_by, now(),
      'Register: ' || coalesce(p.detail, 'marked Present') || ' on ' || to_char(p.activity_date, 'FMDD Mon YYYY')
        || '; hours from the lesson length, confirmed by the apprentice.',
      coalesce(v_in, false), v_out)
    returning id, verification_status into v_entry, v_status;
  else
    if p.source = 'diary' then
      select coalesce(de.unit_codes, '{}'), de.photos::text[] into v_units, v_photos
        from site_diary_entries de where de.id = p.source_id and de.user_id = u;
    end if;
    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, unit_codes, evidence_url, evidence_urls,
      source, source_kind, verification_status, in_working_hours, outside_hours_compensated)
    values (
      p.college_id, u, u, v_name, p.activity_date, v_minutes,
      p.activity_type, p.title, left(v_desc, 4000),
      coalesce(v_units, '{}'),
      v_photos[1],
      case when coalesce(array_length(v_photos, 1), 0) > 0 then v_photos end,
      'apprentice', 'apprentice_submitted', 'pending', coalesce(v_in, false), v_out)
    returning id, verification_status into v_entry, v_status;

    if p.source = 'diary' then
      update site_diary_entries set linked_otj_entry_id = v_entry
       where id = p.source_id and user_id = u and linked_otj_entry_id is null;
    end if;
  end if;

  update otj_proposals
     set status = 'confirmed', confirmed_minutes = v_minutes, otj_entry_id = v_entry,
         reject_reason = null, decided_at = now(), updated_at = now()
   where id = p.id;

  return jsonb_build_object('success', true, 'entry_id', v_entry, 'status', v_status,
                            'minutes', v_minutes, 'verified', v_verified);
end; $$;
revoke all on function public.confirm_otj_proposal(uuid, int, boolean, boolean, text) from public, anon;
grant execute on function public.confirm_otj_proposal(uuid, int, boolean, boolean, text) to authenticated;

-- 5. Learner: turn down (with a reason) / put back --------------------------------------
create or replace function public.reject_otj_proposal(p_id uuid, p_reason text)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); v_reason text := nullif(trim(coalesce(p_reason, '')), '');
begin
  if u is null then raise exception 'not authorised' using errcode = '42501'; end if;
  if v_reason is null or length(v_reason) < 3 then
    return jsonb_build_object('error', 'Say why, in a few words.');
  end if;
  update otj_proposals
     set status = 'rejected', reject_reason = left(v_reason, 500), decided_at = now(), updated_at = now()
   where id = p_id and user_id = u and status = 'proposed';
  if not found then
    return jsonb_build_object('error', 'That one is no longer on your list. Refresh and try again.');
  end if;
  return jsonb_build_object('success', true);
end; $$;
revoke all on function public.reject_otj_proposal(uuid, text) from public, anon;
grant execute on function public.reject_otj_proposal(uuid, text) to authenticated;

create or replace function public.reopen_otj_proposal(p_id uuid)
returns jsonb language plpgsql volatile security definer set search_path to 'public' as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'not authorised' using errcode = '42501'; end if;
  update otj_proposals
     set status = 'proposed', reject_reason = null, decided_at = null, updated_at = now()
   where id = p_id and user_id = u and status = 'rejected';
  if not found then
    return jsonb_build_object('error', 'Only hours you turned down can be put back.');
  end if;
  return jsonb_build_object('success', true);
end; $$;
revoke all on function public.reopen_otj_proposal(uuid) from public, anon;
grant execute on function public.reopen_otj_proposal(uuid) to authenticated;

-- 6. Tutor: what apprentices confirmed (or turned down), with the source ----------------
create or replace function public.get_college_confirmed_hours(p_days int default 30, p_user uuid default null)
returns table (
  proposal_id uuid, user_id uuid, college_student_id uuid, learner_name text, cohort_id uuid,
  source text, activity_date date, title text, detail text, proposed_minutes int,
  confirmed_minutes int, status text, reject_reason text, decided_at timestamptz,
  otj_entry_id uuid, entry_status text)
language sql stable security definer set search_path to 'public' as $$
  select p.id, p.user_id, s.id, s.name, s.cohort_id,
         p.source, p.activity_date, p.title, p.detail, p.proposed_minutes,
         p.confirmed_minutes, p.status, p.reject_reason, p.decided_at,
         p.otj_entry_id, e.verification_status
    from otj_proposals p
    join college_students s on s.id = p.college_student_id
    join college_staff st on st.college_id = p.college_id
                         and st.user_id = auth.uid()
                         and st.archived_at is null
                         and lower(coalesce(st.status, 'active')) = 'active'
    left join college_otj_entries e on e.id = p.otj_entry_id
   where auth.uid() is not null
     and p.status <> 'proposed'
     and (p_user is null or p.user_id = p_user)
     and p.decided_at > now() - make_interval(days => least(greatest(coalesce(p_days, 30), 1), 400))
     and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by p.decided_at desc
   limit 500;
$$;
revoke all on function public.get_college_confirmed_hours(int, uuid) from public, anon;
grant execute on function public.get_college_confirmed_hours(int, uuid) to authenticated;
