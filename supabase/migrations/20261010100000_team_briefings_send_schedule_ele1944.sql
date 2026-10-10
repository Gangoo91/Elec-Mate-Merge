-- Toolbox talks that actually go out (ELE-1944, ELE-1942, ELE-1817).
--
-- Site Safety's team_briefings is the one briefing model for firms (ELE-2031).
-- This adds the three things the office was still doing by hand:
--
--  1. Send to crew. send_team_briefing_to_crew() pushes the talk to everyone it
--     is for (named roster attendees + the job's crew) who is on the app, adds
--     crew who were not on the register yet, and returns the people who are not
--     on the app with their email and phone, so the office can email or text
--     them the signing link.
--  2. Recurring talks on a server schedule. team_briefing_schedules + the daily
--     run_team_briefing_schedules() cron make the next talk on its date (and
--     push it to the crew), so a weekly talk no longer stops when nobody opens
--     the screen.
--  3. The boss is told. A signature through the public link on a FIRM briefing
--     now rings the firm's bell, the same as an in-app signature, and both
--     bells open that exact briefing.
--
-- Additive only: two nullable columns on team_briefings, one new table, new
-- functions, and two in-place body edits (same signatures) that only add a
-- notification for firm briefings. Personal (sole trader) briefings behave
-- exactly as before.

-- ── Notification types ───────────────────────────────────────────────────
insert into public.notification_types (type, category, push, importance) values
  ('briefing_to_sign', 'tasks_projects', true, 2),
  ('policy_to_acknowledge', 'tasks_projects', true, 1),
  ('policy_acknowledged', 'tasks_projects', true, 1)
on conflict (type) do nothing;

-- ── Schedules ────────────────────────────────────────────────────────────
create table if not exists public.team_briefing_schedules (
  id uuid primary key default gen_random_uuid(),
  source_briefing_id uuid not null references public.team_briefings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  employer_id uuid references public.profiles(id) on delete cascade,
  frequency text not null check (frequency in ('weekly', 'fortnightly', 'monthly')),
  next_date date not null,
  notify_crew boolean not null default true,
  active boolean not null default true,
  last_run_at timestamptz,
  last_briefing_id uuid references public.team_briefings(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_briefing_id)
);

comment on table public.team_briefing_schedules is
  '[SITE-SAFETY] A toolbox talk that repeats. The daily cron run_team_briefing_schedules() copies the source briefing (register cleared) onto next_date and, for a firm, pushes it to the crew. Written only by set_team_briefing_schedule(); read by whoever can manage the source briefing.';

create index if not exists team_briefing_schedules_due_idx
  on public.team_briefing_schedules (next_date) where active;
create index if not exists team_briefing_schedules_employer_idx
  on public.team_briefing_schedules (employer_id) where employer_id is not null;

alter table public.team_briefings
  add column if not exists crew_notified_at timestamptz,
  add column if not exists schedule_id uuid references public.team_briefing_schedules(id) on delete set null;

comment on column public.team_briefings.crew_notified_at is
  'When the crew was last sent this briefing (send_team_briefing_to_crew or a schedule run).';
comment on column public.team_briefings.schedule_id is
  'The schedule that made this briefing, if it is a repeat.';

-- Who may manage a briefing: its maker, or a manager of the firm for a
-- firm-made briefing (the same rule as the "edit firm-made" policies).
create or replace function public.team_briefing_can_manage(p_briefing_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and exists (
    select 1 from public.team_briefings tb
     where tb.id = p_briefing_id
       and (
         tb.user_id = auth.uid()
         or (tb.employer_id is not null
             and tb.employer_id in (select public.my_employer_scope())
             and public.safety_is_firm_creator(tb.employer_id, tb.user_id))
       )
  );
$$;

revoke all on function public.team_briefing_can_manage(uuid) from public, anon;
grant execute on function public.team_briefing_can_manage(uuid) to authenticated, service_role;

alter table public.team_briefing_schedules enable row level security;

create policy "Briefing managers read its schedule"
  on public.team_briefing_schedules for select to authenticated
  using (public.team_briefing_can_manage(source_briefing_id));

-- ── Who a firm briefing is for, and pushing it to them ───────────────────
-- Named roster attendees plus the job's current crew, active roster rows only.
-- Internal: no grant. Callers check the firm first.
create or replace function public._team_briefing_push_crew(p_briefing_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tb record;
  r record;
  v_sigs jsonb;
  v_att jsonb;
  v_notified jsonb := '[]'::jsonb;
  v_off jsonb := '[]'::jsonb;
  v_add jsonb := '[]'::jsonb;
  v_signed int := 0;
  v_when text;
begin
  select id, employer_id, employer_job_id, briefing_name, briefing_date, attendees, attendee_signatures
    into v_tb
    from public.team_briefings
   where id = p_briefing_id;
  if v_tb.id is null or v_tb.employer_id is null then
    return jsonb_build_object('notified', '[]'::jsonb, 'off_app', '[]'::jsonb, 'already_signed', 0);
  end if;

  v_sigs := case when jsonb_typeof(v_tb.attendee_signatures) = 'array' then v_tb.attendee_signatures else '[]'::jsonb end;
  v_att := case when jsonb_typeof(v_tb.attendees) = 'array' then v_tb.attendees else '[]'::jsonb end;
  v_when := to_char(v_tb.briefing_date, 'FMDy FMDD Mon');

  for r in
    select e.id, e.name, e.user_id, e.email, e.phone
      from public.employer_employees e
     where e.employer_id = v_tb.employer_id
       and e.status ilike 'active'
       and (
         v_att @> jsonb_build_array(jsonb_build_object('employee_id', e.id::text))
         or (v_tb.employer_job_id is not null and exists (
               select 1 from public.employer_job_assignments a
                where a.job_id = v_tb.employer_job_id
                  and a.employee_id = e.id
                  and coalesce(lower(a.status), 'active') not in ('completed', 'cancelled', 'removed', 'ended')
                  and (a.end_date is null or a.end_date >= least(current_date, v_tb.briefing_date))))
       )
     order by e.name
  loop
    -- Signed already (in the app, or by link under the same name): leave them be.
    if exists (
      select 1 from jsonb_array_elements(v_sigs) s
       where s->>'employee_id' = r.id::text
          or (r.user_id is not null and s->>'user_id' = r.user_id::text)
          or lower(trim(coalesce(s->>'name', ''))) = lower(trim(r.name))
    ) then
      v_signed := v_signed + 1;
      continue;
    end if;

    -- Crew who were not on the register yet go on it, so it shows who is missing.
    if not exists (
      select 1 from jsonb_array_elements(v_att) a
       where a->>'employee_id' = r.id::text
          or (a->>'employee_id' is null and lower(trim(coalesce(a->>'name', ''))) = lower(trim(r.name)))
    ) then
      v_add := v_add || jsonb_build_array(jsonb_build_object('name', r.name, 'employee_id', r.id::text));
    end if;

    if r.user_id is not null then
      perform public.worker_notify(
        r.user_id,
        'briefing_to_sign',
        'Toolbox talk to sign',
        coalesce(nullif(trim(v_tb.briefing_name), ''), 'Toolbox talk') || coalesce(' · ' || v_when, ''),
        jsonb_build_object(
          'route', '/electrician/worker-tools/signoffs?briefing=' || v_tb.id,
          'briefing_id', v_tb.id,
          'employee_id', r.id,
          'ref_id', 'briefing:' || v_tb.id
        )
      );
      v_notified := v_notified || jsonb_build_array(jsonb_build_object('employee_id', r.id, 'name', r.name));
    else
      v_off := v_off || jsonb_build_array(jsonb_build_object(
        'employee_id', r.id,
        'name', r.name,
        'email', nullif(trim(coalesce(r.email, '')), ''),
        'phone', nullif(trim(coalesce(r.phone, '')), '')
      ));
    end if;
  end loop;

  update public.team_briefings
     set attendees = v_att || v_add,
         crew_notified_at = now()
   where id = v_tb.id;

  return jsonb_build_object('notified', v_notified, 'off_app', v_off, 'already_signed', v_signed);
end;
$$;

revoke all on function public._team_briefing_push_crew(uuid) from public, anon, authenticated;

-- The office's "Send to crew".
create or replace function public.send_team_briefing_to_crew(p_briefing_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tb record;
begin
  if auth.uid() is null then
    raise exception 'Sign in to send this briefing' using errcode = '42501';
  end if;
  select id, employer_id, status into v_tb from public.team_briefings where id = p_briefing_id;
  if v_tb.id is null or v_tb.employer_id is null
     or v_tb.employer_id not in (select public.my_employer_scope()) then
    raise exception 'Only a manager at the firm can send this briefing' using errcode = '42501';
  end if;
  if v_tb.status = 'cancelled' then
    raise exception 'This briefing was cancelled, so it cannot be sent.' using errcode = '22023';
  end if;
  return public._team_briefing_push_crew(p_briefing_id);
end;
$$;

revoke all on function public.send_team_briefing_to_crew(uuid) from public, anon;
grant execute on function public.send_team_briefing_to_crew(uuid) to authenticated;

-- ── Set, change or stop a schedule ───────────────────────────────────────
create or replace function public.set_team_briefing_schedule(
  p_briefing_id uuid,
  p_frequency text,
  p_next_date date default null,
  p_notify_crew boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tb record;
  v_row public.team_briefing_schedules;
begin
  if not public.team_briefing_can_manage(p_briefing_id) then
    raise exception 'Only the person who made this briefing, or a manager at the firm, can repeat it'
      using errcode = '42501';
  end if;

  if p_frequency is null then
    delete from public.team_briefing_schedules where source_briefing_id = p_briefing_id;
    return null;
  end if;
  if p_frequency not in ('weekly', 'fortnightly', 'monthly') then
    raise exception 'Repeat weekly, fortnightly or monthly' using errcode = '22023';
  end if;
  if p_next_date is null or p_next_date < current_date then
    raise exception 'Pick a date from today on for the next talk' using errcode = '22023';
  end if;

  select id, employer_id into v_tb from public.team_briefings where id = p_briefing_id;

  insert into public.team_briefing_schedules (
    source_briefing_id, user_id, employer_id, frequency, next_date, notify_crew, active
  ) values (
    p_briefing_id, auth.uid(), v_tb.employer_id, p_frequency, p_next_date,
    coalesce(p_notify_crew, true), true
  )
  on conflict (source_briefing_id) do update
     set frequency = excluded.frequency,
         next_date = excluded.next_date,
         notify_crew = excluded.notify_crew,
         active = true,
         updated_at = now()
  returning * into v_row;

  return to_jsonb(v_row);
end;
$$;

revoke all on function public.set_team_briefing_schedule(uuid, text, date, boolean) from public, anon;
grant execute on function public.set_team_briefing_schedule(uuid, text, date, boolean) to authenticated;

-- ── The daily run ────────────────────────────────────────────────────────
-- Copies each due schedule's source briefing onto its date with the register
-- cleared, moves the schedule on, and (firm, notify on) pushes it to the crew.
-- One schedule failing never stops the rest.
create or replace function public.run_team_briefing_schedules()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  s record;
  v_new uuid;
  v_next date;
  v_made integer := 0;
begin
  for s in
    select * from public.team_briefing_schedules
     where active and next_date <= current_date
     order by next_date
     for update skip locked
  loop
    begin
      v_new := null;
      insert into public.team_briefings (
        user_id, template_id, briefing_name, location, briefing_date, briefing_time,
        attendees, key_points, safety_points, equipment_required, duration_minutes, notes,
        completed, job_name, contractor_company, conductor_name, hazards, safety_warning,
        briefing_description, work_scope, environment_type, team_size, risk_level,
        identified_hazards, custom_hazards, special_considerations, ai_generated, photos,
        created_by_name, briefing_type, status, template_used_id, dynamic_fields,
        attendee_signatures, employer_id, employer_job_id, schedule_id
      )
      select
        tb.user_id, tb.template_id, tb.briefing_name, tb.location, s.next_date, tb.briefing_time,
        case when jsonb_typeof(tb.attendees) = 'array'
             then coalesce((select jsonb_agg(e - 'signature' - 'timestamp' - 'photo')
                              from jsonb_array_elements(tb.attendees) e), '[]'::jsonb)
             else '[]'::jsonb end,
        tb.key_points, tb.safety_points, tb.equipment_required, tb.duration_minutes, tb.notes,
        false, tb.job_name, tb.contractor_company, tb.conductor_name, tb.hazards, tb.safety_warning,
        tb.briefing_description, tb.work_scope, tb.environment_type, tb.team_size, tb.risk_level,
        tb.identified_hazards, tb.custom_hazards, tb.special_considerations, tb.ai_generated, tb.photos,
        tb.created_by_name, tb.briefing_type, 'scheduled', tb.template_used_id, tb.dynamic_fields,
        '[]'::jsonb, tb.employer_id, tb.employer_job_id, s.id
        from public.team_briefings tb
       where tb.id = s.source_briefing_id
      returning id into v_new;

      v_next := s.next_date;
      while v_next <= current_date loop
        v_next := case s.frequency
          when 'weekly' then v_next + 7
          when 'fortnightly' then v_next + 14
          else (v_next + interval '1 month')::date
        end;
      end loop;

      update public.team_briefing_schedules
         set next_date = v_next,
             last_run_at = now(),
             last_briefing_id = coalesce(v_new, last_briefing_id),
             active = v_new is not null,
             updated_at = now()
       where id = s.id;

      if v_new is not null then
        v_made := v_made + 1;
        if s.notify_crew and s.employer_id is not null then
          perform public._team_briefing_push_crew(v_new);
        end if;
      end if;
    exception when others then
      raise warning '[run_team_briefing_schedules] schedule %: %', s.id, sqlerrm;
    end;
  end loop;
  return v_made;
end;
$$;

revoke all on function public.run_team_briefing_schedules() from public, anon, authenticated;

do $cron$
begin
  if exists (select 1 from cron.job where jobname = 'team-briefing-schedules') then
    perform cron.unschedule('team-briefing-schedules');
  end if;
  perform cron.schedule(
    'team-briefing-schedules',
    '10 5 * * *',
    'select public.run_team_briefing_schedules()'
  );
end
$cron$;

-- ── Telling the firm when someone signs ──────────────────────────────────
-- Firm briefings only. Opens the briefing itself.
create or replace function public._team_briefing_signed_notify(p_briefing_id uuid, p_signer text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_tb record;
  v_count int;
begin
  select id, employer_id, briefing_name, attendee_signatures into v_tb
    from public.team_briefings where id = p_briefing_id;
  if v_tb.id is null or v_tb.employer_id is null then
    return;
  end if;
  v_count := case when jsonb_typeof(v_tb.attendee_signatures) = 'array'
                  then jsonb_array_length(v_tb.attendee_signatures) else 0 end;
  perform public.notify_employer_bell(
    v_tb.employer_id,
    'briefing_signed',
    coalesce(nullif(trim(p_signer), ''), 'Someone') || ' signed a toolbox talk',
    coalesce(nullif(trim(v_tb.briefing_name), ''), 'Toolbox talk') || ' · ' || v_count || ' signed so far',
    jsonb_build_object(
      'route', '/employer?section=site-safety&tool=team-briefing&id=' || v_tb.id,
      'briefing_id', v_tb.id,
      'ref_id', 'team_briefing:' || v_tb.id
    )
  );
exception when others then
  raise warning '[_team_briefing_signed_notify] %: %', p_briefing_id, sqlerrm;
end;
$$;

revoke all on function public._team_briefing_signed_notify(uuid, text) from public, anon, authenticated;

-- The public link: add the firm notification after the register is updated.
-- Edits the live definition in place; fails loudly if it has drifted.
do $mig$
declare
  v_def text;
  v_before text;
  v_anchor text := E'    WHERE id = v_briefing_id\n      AND attendees IS NOT NULL\n      AND jsonb_typeof(attendees) = ''array'';\n';
begin
  v_def := pg_get_functiondef('public.sign_briefing_by_token(text,text,text,text,text,text)'::regprocedure);
  if position('_team_briefing_signed_notify' in v_def) > 0 then
    return;
  end if;
  v_before := v_def;
  v_def := replace(
    v_def,
    v_anchor,
    v_anchor || E'\n    BEGIN\n      PERFORM public._team_briefing_signed_notify(v_briefing_id, signer_name);\n    EXCEPTION WHEN others THEN\n      RAISE WARNING ''[sign_briefing_by_token] notify: %'', SQLERRM;\n    END;\n'
  );
  if v_def = v_before then
    raise exception 'sign_briefing_by_token team_briefings anchor not found — definition has changed';
  end if;
  execute v_def;
end
$mig$;

-- In-app signing: the bell opens the briefing itself, not just the list.
do $mig2$
declare
  v_def text;
  v_before text;
begin
  v_def := pg_get_functiondef('public.sign_team_briefing_in_app(uuid,text,jsonb)'::regprocedure);
  if position('tool=team-briefing&id=' in v_def) > 0 then
    return;
  end if;
  v_before := v_def;
  v_def := replace(
    v_def,
    $q$jsonb_build_object('route', '/employer?section=site-safety&tool=team-briefing', 'briefing_id', p_briefing_id)$q$,
    $q$jsonb_build_object('route', '/employer?section=site-safety&tool=team-briefing&id=' || p_briefing_id, 'briefing_id', p_briefing_id, 'ref_id', 'team_briefing:' || p_briefing_id)$q$
  );
  if v_def = v_before then
    raise exception 'sign_team_briefing_in_app route not found — definition has changed';
  end if;
  execute v_def;
end
$mig2$;
