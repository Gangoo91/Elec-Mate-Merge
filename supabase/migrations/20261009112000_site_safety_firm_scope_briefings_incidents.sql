-- Site Safety in both hubs, phase 4: briefings and incidents (ELE-2031).
--
-- Andrew, 8 Oct: Site Safety's team_briefings is the one briefing model, and
-- near_miss_reports + accident_records the one incident model, for sole traders
-- and firms alike. They get the same nullable firm as every other Site Safety
-- record (employer_id + employer_job_id, set and checked by
-- safety_set_employer_scope()), so a toolbox talk or an accident report made in
-- the Employer Hub belongs to the firm, and a worker's report reaches the firm
-- only when they file it against a firm job.
--
-- Briefings gain roster sign-off: an attendee entry may carry the roster row
-- (employee_id), and that person can read the briefing and sign it in the app
-- (sign_team_briefing_in_app), producing the same signature entry the public
-- link does. A firm RAMS for a job can be acknowledged in the app by its crew
-- (safety_acknowledgements).
--
-- Additive only: nullable columns, one new table, indexes, functions, triggers
-- that pass untouched rows through, NEW permissive policies. The Employer Hub's
-- own `briefings` and `employer_incidents` tables are not touched.

-- ── Columns ──────────────────────────────────────────────────────────────
do $cols$
declare
  t text;
begin
  foreach t in array array['team_briefings', 'near_miss_reports', 'accident_records'] loop
    execute format(
      'alter table public.%I
         add column if not exists employer_id uuid references public.profiles(id) on delete set null,
         add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null',
      t);
    execute format(
      'create index if not exists %I on public.%I (employer_id) where employer_id is not null',
      t || '_employer_id_idx', t);
    execute format(
      'create index if not exists %I on public.%I (employer_job_id) where employer_job_id is not null',
      t || '_employer_job_id_idx', t);
    execute format(
      'comment on column public.%I.employer_id is %L', t,
      'Firm (owner profiles.id) this record belongs to. Null = personal. Set and checked by safety_set_employer_scope().');
    execute format(
      'comment on column public.%I.employer_job_id is %L', t,
      'Firm job (employer_jobs) this record is filed against. Shares it with the firm.');
    execute format('drop trigger if exists trg_safety_employer_scope on public.%I', t);
    execute format(
      'create trigger trg_safety_employer_scope
         before insert or update on public.%I
         for each row execute function public.safety_set_employer_scope()', t);
  end loop;

  -- Incidents can be countersigned (signed off) by the firm.
  foreach t in array array['near_miss_reports', 'accident_records'] loop
    execute format(
      'alter table public.%I
         add column if not exists firm_countersigned_by uuid references public.profiles(id) on delete set null,
         add column if not exists firm_countersigned_name text,
         add column if not exists firm_countersigned_at timestamptz',
      t);
    execute format('drop trigger if exists trg_safety_countersign_guard on public.%I', t);
    execute format(
      'create trigger trg_safety_countersign_guard
         before insert or update on public.%I
         for each row execute function public.safety_guard_countersign()', t);
  end loop;
end
$cols$;

-- ── Countersign and shared-record lookups cover the new tables ───────────
create or replace function public.safety_countersign(
  p_table text,
  p_id uuid,
  p_withdraw boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_employer uuid;
  v_name text;
  v_at timestamptz;
begin
  if v_uid is null then
    raise exception 'Sign in to countersign' using errcode = '42501';
  end if;
  if p_table not in (
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary', 'rams_documents',
    'near_miss_reports', 'accident_records'
  ) then
    raise exception 'That record cannot be countersigned' using errcode = '22023';
  end if;

  execute format('select employer_id from public.%I where id = $1', p_table)
    into v_employer using p_id;
  if v_employer is null or v_employer not in (select public.my_employer_scope()) then
    raise exception 'Only a manager at the firm can countersign this record'
      using errcode = '42501';
  end if;

  select coalesce(nullif(trim(p.full_name), ''), 'Firm manager') into v_name
    from public.profiles p where p.id = v_uid;
  v_at := case when p_withdraw then null else now() end;

  perform set_config('safety.countersign', 'on', true);
  execute format(
    'update public.%I
        set firm_countersigned_by = $1,
            firm_countersigned_name = $2,
            firm_countersigned_at = $3
      where id = $4', p_table)
    using case when p_withdraw then null else v_uid end,
          case when p_withdraw then null else coalesce(v_name, 'Firm manager') end,
          v_at, p_id;
  perform set_config('safety.countersign', 'off', true);

  return jsonb_build_object(
    'countersigned_by', case when p_withdraw then null else v_uid end,
    'countersigned_name', case when p_withdraw then null else coalesce(v_name, 'Firm manager') end,
    'countersigned_at', v_at
  );
end;
$$;

revoke all on function public.safety_countersign(text, uuid, boolean) from public, anon;
grant execute on function public.safety_countersign(text, uuid, boolean) to authenticated;

create or replace function public.safety_shared_record_visible(p_type text, p_id uuid)
returns boolean
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  v_table text;
  v_found boolean;
begin
  v_table := case p_type
    when 'permit' then 'permits_to_work'
    when 'coshh' then 'coshh_assessments'
    when 'isolation' then 'safe_isolation_records'
    when 'safe-isolation' then 'safe_isolation_records'
    when 'fire_watch' then 'fire_watch_records'
    when 'pre_use_check' then 'pre_use_checks'
    when 'inspection' then 'inspection_records'
    when 'observation' then 'safety_observations'
    when 'site_diary' then 'electrician_site_diary'
    when 'rams' then 'rams_documents'
    when 'rams_generated' then 'rams_generation_jobs'
    when 'near_miss' then 'near_miss_reports'
    when 'accident' then 'accident_records'
    when 'briefing' then 'team_briefings'
    else null
  end;
  if v_table is null or p_id is null then
    return false;
  end if;
  execute format(
    'select exists (select 1 from public.%I where id = $1 and employer_id is not null)', v_table)
    into v_found using p_id;
  return coalesce(v_found, false);
end;
$$;

revoke all on function public.safety_shared_record_visible(text, uuid) from public, anon;
grant execute on function public.safety_shared_record_visible(text, uuid) to authenticated, service_role;

-- ── Briefings: who a firm briefing is for ────────────────────────────────
-- An active roster member named on the briefing (attendees[].employee_id), or
-- the crew of the job it is filed against.
create or replace function public.safety_briefing_for_me(
  p_employer_id uuid,
  p_attendees jsonb,
  p_employer_job_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_employer_id is not null and auth.uid() is not null and (
    exists (
      select 1
        from public.employer_employees e
       where e.user_id = auth.uid()
         and e.employer_id = p_employer_id
         and e.status ilike 'active'
         and jsonb_typeof(p_attendees) = 'array'
         and p_attendees @> jsonb_build_array(jsonb_build_object('employee_id', e.id::text))
    )
    or (p_employer_job_id is not null and public.is_assigned_to_job(p_employer_job_id))
  );
$$;

revoke all on function public.safety_briefing_for_me(uuid, jsonb, uuid) from public, anon;
grant execute on function public.safety_briefing_for_me(uuid, jsonb, uuid) to authenticated, service_role;

-- ── Policies (new, permissive) ───────────────────────────────────────────
do $pol$
declare
  t text;
  label text;
begin
  foreach t in array array['team_briefings', 'near_miss_reports', 'accident_records'] loop
    label := replace(t, '_', ' ');
    execute format(
      'create policy %I on public.%I for select to authenticated
         using (employer_id is not null and employer_id in (select public.my_employer_scope()))',
      'Firm managers read firm ' || label, t);
    execute format(
      'create policy %I on public.%I for update to authenticated
         using (employer_id in (select public.my_employer_scope())
                and public.safety_is_firm_creator(employer_id, user_id))
         with check (employer_id in (select public.my_employer_scope())
                     and public.safety_is_firm_creator(employer_id, user_id))',
      'Firm managers edit firm-made ' || label, t);
    execute format(
      'create policy %I on public.%I for delete to authenticated
         using (employer_id in (select public.my_employer_scope())
                and public.safety_is_firm_creator(employer_id, user_id))',
      'Firm managers delete firm-made ' || label, t);
  end loop;
end
$pol$;

-- A firm briefing is readable by the people it is for. Incidents are not
-- shared with the crew: they name the injured person.
create policy "Attendees read firm team briefings"
  on public.team_briefings for select to authenticated
  using (employer_id is not null
         and public.safety_briefing_for_me(employer_id, attendees, employer_job_id));

-- Managers make and see public signing links for the firm's briefings.
create policy "Firm managers read signing links for firm briefings"
  on public.briefing_signing_tokens for select to authenticated
  using (exists (
    select 1 from public.team_briefings tb
     where tb.id = briefing_signing_tokens.briefing_id
       and tb.employer_id in (select public.my_employer_scope())
  ));

create policy "Firm managers create signing links for firm-made briefings"
  on public.briefing_signing_tokens for insert to authenticated
  with check (
    created_by_user_id = auth.uid()
    and exists (
      select 1 from public.team_briefings tb
       where tb.id = briefing_signing_tokens.briefing_id
         and tb.employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(tb.employer_id, tb.user_id)
    )
  );

-- ── Sign a firm briefing in the app ──────────────────────────────────────
-- Writes the same attendee_signatures entry as sign_briefing_by_token (the
-- public link), plus who signed: the user and roster row.
create or replace function public.sign_team_briefing_in_app(
  p_briefing_id uuid,
  p_signature text,
  p_location jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_tb record;
  v_emp record;
  v_now timestamptz := now();
  v_entry jsonb;
begin
  if v_uid is null then
    raise exception 'Sign in to sign this briefing' using errcode = '42501';
  end if;
  if coalesce(p_signature, '') = '' then
    raise exception 'A signature is required' using errcode = '22023';
  end if;

  select id, employer_id, employer_job_id, attendees, attendee_signatures, status, briefing_name, user_id
    into v_tb
    from public.team_briefings
   where id = p_briefing_id;
  if v_tb.id is null or v_tb.employer_id is null
     or not public.safety_briefing_for_me(v_tb.employer_id, v_tb.attendees, v_tb.employer_job_id) then
    raise exception 'This briefing is not addressed to you' using errcode = '42501';
  end if;
  if v_tb.status = 'cancelled' then
    raise exception 'This briefing was cancelled, so it can no longer be signed.' using errcode = '22023';
  end if;

  select e.id, e.name into v_emp
    from public.employer_employees e
   where e.user_id = v_uid and e.employer_id = v_tb.employer_id and e.status ilike 'active'
   order by e.created_at
   limit 1;

  -- Signed already: say so rather than adding a second signature.
  if exists (
    select 1 from jsonb_array_elements(
      case when jsonb_typeof(v_tb.attendee_signatures) = 'array' then v_tb.attendee_signatures else '[]'::jsonb end
    ) s
     where s->>'user_id' = v_uid::text
  ) then
    return jsonb_build_object('success', true, 'already_signed', true);
  end if;

  v_entry := jsonb_build_object(
    'name', coalesce(v_emp.name, 'Team member'),
    'signature', p_signature,
    'signed_at', v_now::text,
    'signed_via', 'in_app',
    'user_id', v_uid,
    'employee_id', v_emp.id,
    'location', p_location
  );

  update public.team_briefings
     set attendee_signatures =
           (case when jsonb_typeof(attendee_signatures) = 'array' then attendee_signatures else '[]'::jsonb end)
           || jsonb_build_array(v_entry),
         attendees = case
           when jsonb_typeof(attendees) = 'array' then (
             select coalesce(jsonb_agg(
               case
                 when (elem->>'employee_id' = v_emp.id::text
                       or (elem->>'employee_id' is null and lower(trim(elem->>'name')) = lower(trim(v_emp.name))))
                      and (elem->>'signature') is null
                 then elem || jsonb_build_object('signature', p_signature, 'timestamp', v_now::text)
                 else elem
               end), '[]'::jsonb)
               from jsonb_array_elements(attendees) elem)
           else attendees
         end,
         updated_at = v_now
   where id = p_briefing_id;

  begin
    perform public.notify_employer_bell(
      v_tb.employer_id,
      'briefing_signed',
      coalesce(v_emp.name, 'A team member') || ' signed a briefing',
      coalesce(v_tb.briefing_name, 'Toolbox talk'),
      jsonb_build_object('route', '/employer?section=site-safety&tool=team-briefing', 'briefing_id', p_briefing_id)
    );
  exception when others then
    raise warning '[sign_team_briefing_in_app] notify: %', sqlerrm;
  end;

  return jsonb_build_object('success', true, 'signed_at', v_now);
end;
$$;

revoke all on function public.sign_team_briefing_in_app(uuid, text, jsonb) from public, anon;
grant execute on function public.sign_team_briefing_in_app(uuid, text, jsonb) to authenticated;

-- ── Acknowledge a firm RAMS in the app ───────────────────────────────────
create table if not exists public.safety_acknowledgements (
  id uuid primary key default gen_random_uuid(),
  record_type text not null check (record_type in ('rams')),
  record_id uuid not null,
  employer_id uuid not null references public.profiles(id) on delete cascade,
  employer_job_id uuid references public.employer_jobs(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  employee_id uuid references public.employer_employees(id) on delete set null,
  signer_name text not null,
  signature text not null,
  signed_at timestamptz not null default now(),
  location jsonb,
  user_agent text,
  unique (record_type, record_id, user_id)
);

comment on table public.safety_acknowledgements is
  '[SITE-SAFETY] A worker''s in-app acknowledgement (read and signed) of a firm safety document, today a RAMS for a job they are on. Scope: firm (employer_id) + the signer. Used by: Worker Tools Sign-offs, Employer Hub Site Safety. Rule: written only by acknowledge_firm_rams(); the signer and the firm''s managers read it.';

create index if not exists safety_acknowledgements_record_idx
  on public.safety_acknowledgements (record_type, record_id);
create index if not exists safety_acknowledgements_employer_idx
  on public.safety_acknowledgements (employer_id);

alter table public.safety_acknowledgements enable row level security;

create policy "Signers read their own acknowledgements"
  on public.safety_acknowledgements for select to authenticated
  using (user_id = auth.uid());

create policy "Firm managers read the firm's acknowledgements"
  on public.safety_acknowledgements for select to authenticated
  using (employer_id in (select public.my_employer_scope()));

create or replace function public.acknowledge_firm_rams(
  p_rams_document_id uuid,
  p_signature text,
  p_location jsonb default null,
  p_user_agent text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_doc record;
  v_emp record;
  v_id uuid;
begin
  if v_uid is null then
    raise exception 'Sign in to sign this RAMS' using errcode = '42501';
  end if;
  if coalesce(p_signature, '') = '' then
    raise exception 'A signature is required' using errcode = '22023';
  end if;

  select id, employer_id, employer_job_id, project_name, user_id
    into v_doc
    from public.rams_documents
   where id = p_rams_document_id;
  if v_doc.id is null or v_doc.employer_id is null or v_doc.employer_job_id is null
     or not public.is_assigned_to_job(v_doc.employer_job_id) then
    raise exception 'This RAMS is not for a job you are on' using errcode = '42501';
  end if;

  select e.id, e.name into v_emp
    from public.employer_employees e
   where e.user_id = v_uid and e.employer_id = v_doc.employer_id and e.status ilike 'active'
   order by e.created_at
   limit 1;

  insert into public.safety_acknowledgements (
    record_type, record_id, employer_id, employer_job_id, user_id, employee_id,
    signer_name, signature, location, user_agent
  ) values (
    'rams', v_doc.id, v_doc.employer_id, v_doc.employer_job_id, v_uid, v_emp.id,
    coalesce(v_emp.name, 'Team member'), p_signature, p_location, left(p_user_agent, 400)
  )
  on conflict (record_type, record_id, user_id) do nothing
  returning id into v_id;

  if v_id is null then
    return jsonb_build_object('success', true, 'already_signed', true);
  end if;

  begin
    perform public.notify_employer_bell(
      v_doc.employer_id,
      'rams_signed',
      coalesce(v_emp.name, 'A team member') || ' signed a RAMS',
      coalesce(v_doc.project_name, 'RAMS'),
      jsonb_build_object('route', '/employer?section=rams', 'rams_document_id', v_doc.id)
    );
  exception when others then
    raise warning '[acknowledge_firm_rams] notify: %', sqlerrm;
  end;

  return jsonb_build_object('success', true, 'id', v_id);
end;
$$;

revoke all on function public.acknowledge_firm_rams(uuid, text, jsonb, text) from public, anon;
grant execute on function public.acknowledge_firm_rams(uuid, text, jsonb, text) to authenticated;

-- ── What a worker has to sign ────────────────────────────────────────────
-- Firm briefings addressed to them (roster or job crew), and the firm's RAMS
-- for jobs they are on, newest first, with whether they have signed.
create or replace function public.get_my_safety_signoffs()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'briefings', coalesce((
      select jsonb_agg(row_to_json(b) order by b.briefing_date desc nulls last)
        from (
          select tb.id, tb.briefing_name, tb.briefing_type, tb.briefing_date, tb.briefing_time,
                 tb.location, tb.risk_level, tb.briefing_description, tb.work_scope,
                 tb.safety_warning, tb.key_points, tb.safety_points, tb.identified_hazards,
                 tb.conductor_name, tb.status, tb.employer_job_id,
                 (select j.title from public.employer_jobs j where j.id = tb.employer_job_id) as job_title,
                 (select nullif(trim(cp.company_name), '') from public.company_profiles cp
                   where cp.user_id = tb.employer_id limit 1) as company_name,
                 (select s->>'signed_at'
                    from jsonb_array_elements(
                      case when jsonb_typeof(tb.attendee_signatures) = 'array'
                           then tb.attendee_signatures else '[]'::jsonb end) s
                   where s->>'user_id' = auth.uid()::text
                   limit 1) as signed_at
            from public.team_briefings tb
           where tb.employer_id is not null
             and coalesce(tb.status, '') <> 'cancelled'
             and tb.briefing_date >= current_date - 60
             and public.safety_briefing_for_me(tb.employer_id, tb.attendees, tb.employer_job_id)
           order by tb.briefing_date desc nulls last
           limit 50
        ) b
    ), '[]'::jsonb),
    'rams', coalesce((
      select jsonb_agg(row_to_json(r) order by r.updated_at desc)
        from (
          select d.id, d.project_name, d.location, d.version, d.status, d.updated_at,
                 d.pdf_url, d.employer_job_id,
                 (select j.title from public.employer_jobs j where j.id = d.employer_job_id) as job_title,
                 (select a.signed_at from public.safety_acknowledgements a
                   where a.record_type = 'rams' and a.record_id = d.id and a.user_id = auth.uid()) as signed_at
            from public.rams_documents d
           where d.employer_id is not null
             and d.employer_job_id is not null
             and public.safety_is_firm_creator(d.employer_id, d.user_id)
             and public.is_assigned_to_job(d.employer_job_id)
           order by d.updated_at desc
           limit 50
        ) r
    ), '[]'::jsonb)
  );
$$;

revoke all on function public.get_my_safety_signoffs() from public, anon;
grant execute on function public.get_my_safety_signoffs() to authenticated;

-- ── A worker's firm-shared incident reaches the firm's bell ──────────────
create or replace function public.safety_notify_firm_incident()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_kind text := case when tg_table_name = 'accident_records' then 'Accident' else 'Near miss' end;
  v_job text;
  v_name text;
  v_text text;
begin
  if new.employer_id is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and old.employer_id is not distinct from new.employer_id then
    return new;
  end if;
  -- The firm's own managers do not need telling about their own report.
  if public.safety_is_firm_creator(new.employer_id, new.user_id) then
    return new;
  end if;
  select j.title into v_job from public.employer_jobs j where j.id = new.employer_job_id;
  select coalesce(nullif(trim(p.full_name), ''), 'A team member') into v_name
    from public.profiles p where p.id = new.user_id;
  -- Each table's field is read inside its own branch: PL/pgSQL resolves every
  -- NEW field in an expression, so a CASE across both tables would fail.
  if tg_table_name = 'accident_records' then
    v_text := new.incident_description;
  else
    v_text := new.description;
  end if;
  perform public.notify_employer_bell(
    new.employer_id,
    'incident',
    v_kind || ' reported by ' || coalesce(v_name, 'a team member'),
    coalesce(v_job || ': ', '') || left(coalesce(v_text, ''), 140),
    jsonb_build_object(
      'route', '/employer?section=site-safety&tool='
               || case when tg_table_name = 'accident_records' then 'accident-book' else 'near-miss' end,
      'record_id', new.id,
      'job_id', new.employer_job_id
    )
  );
  return new;
exception when others then
  raise warning '[safety_notify_firm_incident] %: %', new.id, sqlerrm;
  return new;
end;
$$;

revoke all on function public.safety_notify_firm_incident() from public, anon, authenticated;

drop trigger if exists trg_safety_notify_firm_incident on public.near_miss_reports;
create trigger trg_safety_notify_firm_incident
  after insert or update on public.near_miss_reports
  for each row execute function public.safety_notify_firm_incident();

drop trigger if exists trg_safety_notify_firm_incident on public.accident_records;
create trigger trg_safety_notify_firm_incident
  after insert or update on public.accident_records
  for each row execute function public.safety_notify_firm_incident();

-- ── Public briefing page: a firm briefing shows the firm's name ──────────
-- Edits the live definition in place; fails loudly if it has drifted.
do $mig$
declare
  v_def text;
  v_before text;
begin
  select pg_get_functiondef(p.oid) into v_def
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'get_briefing_by_signing_token';
  if v_def is null then
    raise exception 'get_briefing_by_signing_token not found';
  end if;
  v_before := v_def;
  v_def := replace(
    v_def,
    'from company_profiles cp where cp.user_id = tb.user_id limit 1',
    'from company_profiles cp where cp.user_id = coalesce(tb.employer_id, tb.user_id) limit 1'
  );
  if v_def = v_before then
    raise exception 'team_briefings company clause not found — definition has changed';
  end if;
  execute v_def;
end
$mig$;
