-- ELE-2031 incidents: Site Safety's near_miss_reports + accident_records are
-- the single incident model for both hubs (Andrew, 8 Oct; "get it all built",
-- 10 Oct). The Employer Hub's employer_incidents table is kept and still
-- written by live builds (web HEAD, iOS 49), so every reader below reads BOTH:
-- the firm's Site Safety records and any employer_incidents rows.
--
-- Additive only:
--   * New nullable columns. The firm's follow-up (seen, investigation, actions,
--     RIDDOR decision, close-out) lives in firm_* columns, never in the
--     worker's own fields: a manager reads and countersigns a worker's record,
--     he does not edit it. firm_* is written only by firm_incident_update()
--     (guard trigger below), the same pattern as the countersignature.
--   * _firm_incident_rows(): one normalised row per incident from all three
--     tables, for definer functions and edge functions (service role only).
--   * get_firm_incidents(): the Employer Hub list (managers of the firm only).
--   * acknowledge_incident / complete_my_incident_action / get_my_incident_actions
--     keep their signatures and still handle employer_incidents exactly as
--     before; they also handle the new records.
--   * safety_notify_firm_incident (the 9 Oct bell) now also emails the office,
--     tells the reporter's supervisor (and the apprentice co-ordinator), skips
--     the firm owner acting on his own firm, and routes to the Incidents page.
--   * get_employer_home / get_employer_safety_brief / get_tender_prequal /
--     get_worker_home / can_read_visual_upload / notification_employee_id are
--     edited IN PLACE (the live text is read and patched; the migration fails
--     loudly if the expected text has changed).
-- employer_incidents itself is not altered and no rows are moved.

-- ── 1. Columns ─────────────────────────────────────────────────────────────

alter table public.near_miss_reports
  add column if not exists incident_kind text,
  add column if not exists firm_status text,
  add column if not exists firm_acknowledged_at timestamptz,
  add column if not exists firm_acknowledged_by uuid references auth.users(id) on delete set null,
  add column if not exists firm_closed_at timestamptz,
  add column if not exists firm_closed_by uuid references auth.users(id) on delete set null,
  add column if not exists firm_closeout_summary text,
  add column if not exists firm_root_cause text,
  add column if not exists firm_investigation_notes text,
  add column if not exists firm_corrective_actions jsonb not null default '[]'::jsonb,
  add column if not exists firm_riddor_category text,
  add column if not exists firm_riddor_reported_at timestamptz,
  add column if not exists firm_riddor_reference text,
  add column if not exists legacy_employer_incident_id uuid;

alter table public.accident_records
  add column if not exists injured_employee_id uuid references public.employer_employees(id) on delete set null,
  add column if not exists firm_status text,
  add column if not exists firm_acknowledged_at timestamptz,
  add column if not exists firm_acknowledged_by uuid references auth.users(id) on delete set null,
  add column if not exists firm_closed_at timestamptz,
  add column if not exists firm_closed_by uuid references auth.users(id) on delete set null,
  add column if not exists firm_closeout_summary text,
  add column if not exists firm_root_cause text,
  add column if not exists firm_investigation_notes text,
  add column if not exists firm_corrective_actions jsonb not null default '[]'::jsonb,
  add column if not exists firm_riddor_category text,
  add column if not exists firm_riddor_reported_at timestamptz,
  add column if not exists firm_riddor_reference text,
  add column if not exists legacy_employer_incident_id uuid;

do $c$
begin
  if not exists (select 1 from pg_constraint where conname = 'near_miss_reports_incident_kind_check') then
    alter table public.near_miss_reports add constraint near_miss_reports_incident_kind_check
      check (incident_kind is null or incident_kind in ('near_miss', 'unsafe_practice', 'faulty_equipment',
        'property_damage', 'environmental', 'security', 'dangerous_occurrence', 'other'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'near_miss_reports_firm_status_check') then
    alter table public.near_miss_reports add constraint near_miss_reports_firm_status_check
      check (firm_status is null or firm_status in ('open', 'investigating', 'closed'));
    alter table public.accident_records add constraint accident_records_firm_status_check
      check (firm_status is null or firm_status in ('open', 'investigating', 'closed'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'near_miss_reports_firm_riddor_check') then
    alter table public.near_miss_reports add constraint near_miss_reports_firm_riddor_check
      check (firm_riddor_category is null or firm_riddor_category in ('death', 'specified_injury',
        'over_7_day', 'non_worker_hospital', 'dangerous_occurrence', 'occupational_disease', 'not_reportable'));
    alter table public.accident_records add constraint accident_records_firm_riddor_check
      check (firm_riddor_category is null or firm_riddor_category in ('death', 'specified_injury',
        'over_7_day', 'non_worker_hospital', 'dangerous_occurrence', 'occupational_disease', 'not_reportable'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'near_miss_reports_firm_actions_array') then
    alter table public.near_miss_reports add constraint near_miss_reports_firm_actions_array
      check (jsonb_typeof(firm_corrective_actions) = 'array');
    alter table public.accident_records add constraint accident_records_firm_actions_array
      check (jsonb_typeof(firm_corrective_actions) = 'array');
  end if;
end
$c$;

create unique index if not exists near_miss_reports_legacy_incident_uidx
  on public.near_miss_reports (legacy_employer_incident_id) where legacy_employer_incident_id is not null;
create unique index if not exists accident_records_legacy_incident_uidx
  on public.accident_records (legacy_employer_incident_id) where legacy_employer_incident_id is not null;
create index if not exists near_miss_reports_employer_idx
  on public.near_miss_reports (employer_id) where employer_id is not null;
create index if not exists accident_records_employer_idx
  on public.accident_records (employer_id) where employer_id is not null;

-- ── 2. Guard: firm_* only through firm_incident_update() ─────────────────

create or replace function public.safety_guard_firm_incident_fields()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- The RPC sets this for its own update; service role (no auth.uid()) is
  -- maintenance (the held backfill) and passes.
  if coalesce(current_setting('safety.firm_incident', true), '') = 'on' or auth.uid() is null then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.firm_status := null;
    new.firm_acknowledged_at := null;
    new.firm_acknowledged_by := null;
    new.firm_closed_at := null;
    new.firm_closed_by := null;
    new.firm_closeout_summary := null;
    new.firm_root_cause := null;
    new.firm_investigation_notes := null;
    new.firm_corrective_actions := '[]'::jsonb;
    new.firm_riddor_category := null;
    new.firm_riddor_reported_at := null;
    new.firm_riddor_reference := null;
    new.legacy_employer_incident_id := null;
  else
    new.firm_status := old.firm_status;
    new.firm_acknowledged_at := old.firm_acknowledged_at;
    new.firm_acknowledged_by := old.firm_acknowledged_by;
    new.firm_closed_at := old.firm_closed_at;
    new.firm_closed_by := old.firm_closed_by;
    new.firm_closeout_summary := old.firm_closeout_summary;
    new.firm_root_cause := old.firm_root_cause;
    new.firm_investigation_notes := old.firm_investigation_notes;
    new.firm_corrective_actions := old.firm_corrective_actions;
    new.firm_riddor_category := old.firm_riddor_category;
    new.firm_riddor_reported_at := old.firm_riddor_reported_at;
    new.firm_riddor_reference := old.firm_riddor_reference;
    new.legacy_employer_incident_id := old.legacy_employer_incident_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_safety_firm_incident_guard on public.near_miss_reports;
create trigger trg_safety_firm_incident_guard
  before insert or update on public.near_miss_reports
  for each row execute function public.safety_guard_firm_incident_fields();
drop trigger if exists trg_safety_firm_incident_guard on public.accident_records;
create trigger trg_safety_firm_incident_guard
  before insert or update on public.accident_records
  for each row execute function public.safety_guard_firm_incident_fields();

-- ── 3. One normalised incident row, from all three tables ───────────────

create or replace function public._firm_incident_rows(p_firm uuid, p_id uuid default null)
returns table (
  source text, id uuid, employer_id uuid, job_id uuid, job_title text,
  incident_type text, title text, description text, location text,
  severity text, status text, reported_at timestamptz, created_at timestamptz, updated_at timestamptz,
  reported_by text, reporter_user_id uuid, reporter_employee_id uuid, reporter_name text, firm_made boolean,
  injured_person text, injured_employee_id uuid, injury_type text, body_part text, injuries_sustained text,
  first_aid_given boolean, hospital_visit boolean, days_off integer,
  witnesses text, actions_taken text, supervisor_notified boolean, supervisor_name text,
  photos jsonb, root_cause text, investigation_notes text, corrective_actions jsonb,
  acknowledged_at timestamptz, acknowledged_by uuid, closed_at timestamptz, closed_by uuid, closeout_summary text,
  riddor_category text, riddor_reportable boolean, riddor_reported_at timestamptz, riddor_reference text,
  record_number text, countersigned_name text, countersigned_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  -- employer_incidents (the Employer Hub's own table; HEAD and iOS 49 write it)
  select 'legacy'::text, i.id, i.employer_id, i.job_id, j.title,
         lower(regexp_replace(coalesce(nullif(btrim(i.incident_type), ''), 'other'), '\s+', '_', 'g')),
         i.title, i.description, i.location,
         lower(coalesce(i.severity, 'low')),
         case when lower(coalesce(i.status, '')) in ('closed', 'resolved') then 'closed'
              when lower(coalesce(i.status, '')) in ('investigating', 'under_review') then 'investigating'
              else 'open' end,
         coalesce(i.reported_at, i.created_at), i.created_at, i.updated_at,
         i.reported_by, coalesce(e.user_id, i.reported_by_id), e.id, coalesce(e.name, i.reported_by),
         e.id is null,
         i.injured_person, i.injured_employee_id, null::text, null::text, i.injuries_sustained,
         i.first_aid_given, i.hospital_visit, i.days_off,
         i.witnesses, i.actions_taken, i.supervisor_notified, i.supervisor_name,
         coalesce(to_jsonb(i.photos), '[]'::jsonb), i.root_cause, i.investigation_notes,
         coalesce(i.corrective_actions, '[]'::jsonb),
         i.acknowledged_at, i.acknowledged_by, i.closed_at, i.closed_by, i.closeout_summary,
         i.riddor_category,
         coalesce(i.riddor_reportable, false)
           or (i.riddor_category is not null and i.riddor_category <> 'not_reportable'),
         i.riddor_reported_at, i.riddor_reference,
         null::text, null::text, null::timestamptz
    from public.employer_incidents i
    left join public.employer_jobs j on j.id = i.job_id
    left join public.employer_employees e on e.id::text = i.reported_by
   where (p_firm is not null or p_id is not null)
     and (p_firm is null or i.employer_id = p_firm)
     and (p_id is null or i.id = p_id)

  union all

  -- near_miss_reports shared with the firm (near misses and no-injury incidents)
  select 'near_miss'::text, n.id, n.employer_id, n.employer_job_id, j.title,
         coalesce(n.incident_kind, 'near_miss'),
         left(regexp_replace(btrim(n.description), '\s+', ' ', 'g'), 80),
         n.description, n.location,
         lower(coalesce(n.severity, 'low')),
         coalesce(n.firm_status, case when n.firm_closed_at is not null then 'closed' else 'open' end),
         ((n.incident_date + n.incident_time) at time zone 'Europe/London'), n.created_at, n.updated_at,
         case when f.fm then nullif(btrim(n.reporter_name), '') else e.id::text end,
         n.user_id, case when f.fm then null else e.id end,
         case when f.fm then coalesce(nullif(btrim(n.reporter_name), ''), p.full_name)
              else coalesce(e.name, p.full_name, nullif(btrim(n.reporter_name), '')) end,
         f.fm,
         null::text, null::uuid, null::text, null::text, null::text,
         false, false, null::integer,
         (select string_agg(coalesce(w ->> 'name', w #>> '{}'), ', ')
            from jsonb_array_elements(case when jsonb_typeof(n.witnesses) = 'array'
                                           then n.witnesses else '[]'::jsonb end) w),
         n.immediate_actions, n.supervisor_notified, n.supervisor_name,
         case when jsonb_typeof(n.photos) = 'array' then n.photos
              else coalesce(to_jsonb(n.photos_attached), '[]'::jsonb) end,
         coalesce(n.firm_root_cause, n.root_cause_analysis), n.firm_investigation_notes,
         n.firm_corrective_actions,
         n.firm_acknowledged_at, n.firm_acknowledged_by, n.firm_closed_at, n.firm_closed_by,
         n.firm_closeout_summary,
         n.firm_riddor_category, coalesce(n.firm_riddor_category <> 'not_reportable', false),
         n.firm_riddor_reported_at, n.firm_riddor_reference,
         n.incident_number, n.firm_countersigned_name, n.firm_countersigned_at
    from public.near_miss_reports n
    cross join lateral (select public.safety_is_firm_creator(n.employer_id, n.user_id) as fm) f
    left join public.employer_jobs j on j.id = n.employer_job_id
    left join public.profiles p on p.id = n.user_id
    left join lateral (
      select x.id, x.name from public.employer_employees x
       where x.user_id = n.user_id and x.employer_id = n.employer_id
       order by (lower(coalesce(x.status, '')) = 'archived'), x.created_at
       limit 1) e on true
   where n.employer_id is not null
     and (p_firm is not null or p_id is not null)
     and (p_firm is null or n.employer_id = p_firm)
     and (p_id is null or n.id = p_id)

  union all

  -- accident_records shared with the firm (injuries)
  select 'accident'::text, a.id, a.employer_id, a.employer_job_id, j.title,
         'injury'::text,
         left(initcap(replace(coalesce(nullif(a.injury_type, ''), 'injury'), '-', ' '))
              || ' · ' || a.injured_name, 80),
         a.incident_description,
         concat_ws(', ', nullif(btrim(a.location), ''), nullif(btrim(a.location_detail), '')),
         case a.severity when 'fatal' then 'critical' when 'major' then 'high'
                         when 'moderate' then 'medium' else 'low' end,
         coalesce(a.firm_status, case when a.firm_closed_at is not null then 'closed' else 'open' end),
         ((a.incident_date + case when a.incident_time ~ '^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'
                                  then a.incident_time::time else time '12:00' end)
            at time zone 'Europe/London'),
         a.created_at, a.updated_at,
         case when f.fm then nullif(btrim(a.recorded_by), '') else e.id::text end,
         a.user_id, case when f.fm then null else e.id end,
         case when f.fm then coalesce(nullif(btrim(a.recorded_by), ''), p.full_name)
              else coalesce(e.name, p.full_name, nullif(btrim(a.recorded_by), '')) end,
         f.fm,
         a.injured_name, a.injured_employee_id, a.injury_type, a.body_part,
         concat_ws('. ',
           initcap(replace(coalesce(nullif(a.injury_type, ''), 'injury'), '-', ' '))
             || coalesce(' to ' || replace(nullif(a.body_part, ''), '-', ' '), ''),
           nullif(btrim(a.injury_description), '')),
         coalesce(a.first_aid_given, false), coalesce(a.hospital_visit, false),
         case when a.time_off_work then a.days_off end,
         a.witnesses, a.first_aid_details, a.reported_to is not null, a.reported_to,
         case when jsonb_typeof(a.photos) = 'array' and jsonb_array_length(a.photos) > 0 then a.photos
              else coalesce(to_jsonb(a.photo_urls), '[]'::jsonb) end,
         coalesce(a.firm_root_cause, a.root_cause), a.firm_investigation_notes,
         a.firm_corrective_actions,
         a.firm_acknowledged_at, a.firm_acknowledged_by, a.firm_closed_at, a.firm_closed_by,
         a.firm_closeout_summary,
         coalesce(a.firm_riddor_category,
                  case when a.is_riddor_reportable then
                    case when a.severity = 'fatal' then 'death'
                         when a.severity = 'major' then 'specified_injury'
                         when a.time_off_work and coalesce(a.days_off, 0) > 7 then 'over_7_day'
                    end
                  end),
         case when a.firm_riddor_category is not null then a.firm_riddor_category <> 'not_reportable'
              else coalesce(a.is_riddor_reportable, false) end,
         coalesce(a.firm_riddor_reported_at,
                  case when a.riddor_reported then
                    coalesce(a.riddor_reported_date::timestamp at time zone 'Europe/London', a.updated_at)
                  end),
         coalesce(a.firm_riddor_reference, a.riddor_reference),
         a.incident_number, a.firm_countersigned_name, a.firm_countersigned_at
    from public.accident_records a
    cross join lateral (select public.safety_is_firm_creator(a.employer_id, a.user_id) as fm) f
    left join public.employer_jobs j on j.id = a.employer_job_id
    left join public.profiles p on p.id = a.user_id
    left join lateral (
      select x.id, x.name from public.employer_employees x
       where x.user_id = a.user_id and x.employer_id = a.employer_id
       order by (lower(coalesce(x.status, '')) = 'archived'), x.created_at
       limit 1) e on true
   where a.employer_id is not null
     and (p_firm is not null or p_id is not null)
     and (p_firm is null or a.employer_id = p_firm)
     and (p_id is null or a.id = p_id);
$$;

revoke all on function public._firm_incident_rows(uuid, uuid) from public, anon, authenticated;
grant execute on function public._firm_incident_rows(uuid, uuid) to service_role;

-- ── 4. The Employer Hub list ─────────────────────────────────────────────

create or replace function public.get_firm_incidents(p_firm uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  return coalesce((
    select jsonb_agg(to_jsonb(r) order by r.reported_at desc)
      from public._firm_incident_rows(p_firm) r), '[]'::jsonb);
end;
$$;

revoke all on function public.get_firm_incidents(uuid) from public, anon;
grant execute on function public.get_firm_incidents(uuid) to authenticated, service_role;

-- ── 5. The firm's follow-up on a Site Safety incident ────────────────────

create or replace function public.firm_incident_update(p_id uuid, p_patch jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_src text;
  v_emp uuid;
  v_user uuid;
  v_job uuid;
  v_title text;
  v_old_status text;
  v_status text;
  v_ack timestamptz;
  v_closed timestamptz;
  v_old_actions jsonb;
  v_actions jsonb;
  v_closeout text;
  v_ack_now boolean := false;
  v_closed_now boolean := false;
  v_reporter_emp uuid;
  v_route text;
  v_action jsonb;
  v_owner uuid;
  v_owner_user uuid;
  v_due date;
begin
  if v_uid is null then
    raise exception 'Sign in first' using errcode = '42501';
  end if;
  p_patch := coalesce(p_patch, '{}'::jsonb);
  if jsonb_typeof(p_patch) <> 'object' then
    raise exception 'Bad request' using errcode = '22023';
  end if;

  select 'near_miss', n.employer_id, n.user_id, n.employer_job_id,
         left(regexp_replace(btrim(n.description), '\s+', ' ', 'g'), 80),
         coalesce(n.firm_status, case when n.firm_closed_at is not null then 'closed' else 'open' end),
         n.firm_acknowledged_at, n.firm_closed_at, n.firm_corrective_actions, n.firm_closeout_summary
    into v_src, v_emp, v_user, v_job, v_title, v_old_status, v_ack, v_closed, v_old_actions, v_closeout
    from public.near_miss_reports n where n.id = p_id
     for update;
  if v_src is null then
    select 'accident', a.employer_id, a.user_id, a.employer_job_id,
           left(initcap(replace(coalesce(nullif(a.injury_type, ''), 'injury'), '-', ' ')) || ' · ' || a.injured_name, 80),
           coalesce(a.firm_status, case when a.firm_closed_at is not null then 'closed' else 'open' end),
           a.firm_acknowledged_at, a.firm_closed_at, a.firm_corrective_actions, a.firm_closeout_summary
      into v_src, v_emp, v_user, v_job, v_title, v_old_status, v_ack, v_closed, v_old_actions, v_closeout
      from public.accident_records a where a.id = p_id
       for update;
  end if;
  if v_src is null or v_emp is null or v_emp not in (select public.my_employer_scope()) then
    raise exception 'Incident not found' using errcode = '42501';
  end if;

  -- Status
  v_status := case when p_patch ? 'status' then lower(coalesce(p_patch ->> 'status', '')) else v_old_status end;
  v_status := case when v_status in ('resolved', 'closed') then 'closed'
                   when v_status in ('investigating', 'under_review') then 'investigating'
                   when v_status in ('open', 'draft', 'submitted', '') then 'open'
                   else v_status end;
  if v_status not in ('open', 'investigating', 'closed') then
    raise exception 'Unknown status %', v_status using errcode = '22023';
  end if;

  -- Seen (explicitly, or implied by working on it)
  if v_ack is null and (coalesce((p_patch ->> 'acknowledge')::boolean, false)
                        or v_status in ('investigating', 'closed')) then
    v_ack := now();
    v_ack_now := true;
  end if;

  if v_status = 'closed' then
    if v_old_status <> 'closed' or v_closed is null then
      v_closed := coalesce(v_closed, now());
      v_closed_now := v_old_status <> 'closed';
    end if;
  else
    v_closed := null;
  end if;

  if p_patch ? 'closeout_summary' then
    v_closeout := nullif(btrim(coalesce(p_patch ->> 'closeout_summary', '')), '');
  end if;

  -- Corrective actions: a Done the owner ticked is kept unless the office
  -- deliberately reopened it (same rule as employer_incidents).
  v_actions := coalesce(v_old_actions, '[]'::jsonb);
  if p_patch ? 'corrective_actions' then
    if jsonb_typeof(p_patch -> 'corrective_actions') <> 'array' then
      raise exception 'corrective_actions must be a list' using errcode = '22023';
    end if;
    select coalesce(jsonb_agg(
             case when n ->> 'done_at' is null and o.done is not null
                   and (n ->> 'reopened_at') is not distinct from (o.done ->> 'reopened_at')
                  then n || jsonb_build_object('done_at', o.done -> 'done_at', 'done_note', o.done -> 'done_note')
                  else n end
             order by ord), '[]'::jsonb)
      into v_actions
      from jsonb_array_elements(p_patch -> 'corrective_actions') with ordinality as x(n, ord)
      left join lateral (
        select oa as done from jsonb_array_elements(coalesce(v_old_actions, '[]'::jsonb)) oa
         where oa ->> 'id' = n ->> 'id' and oa ->> 'done_at' is not null
         limit 1) o on true;
  end if;

  perform set_config('safety.firm_incident', 'on', true);
  if v_src = 'near_miss' then
    update public.near_miss_reports set
      firm_status = v_status,
      firm_acknowledged_at = v_ack,
      firm_acknowledged_by = case when v_ack_now then v_uid else firm_acknowledged_by end,
      firm_closed_at = v_closed,
      firm_closed_by = case when v_status = 'closed' then coalesce(firm_closed_by, v_uid) end,
      firm_closeout_summary = v_closeout,
      firm_root_cause = case when p_patch ? 'root_cause'
                             then nullif(btrim(coalesce(p_patch ->> 'root_cause', '')), '') else firm_root_cause end,
      firm_investigation_notes = case when p_patch ? 'investigation_notes'
                             then nullif(btrim(coalesce(p_patch ->> 'investigation_notes', '')), '') else firm_investigation_notes end,
      firm_corrective_actions = v_actions,
      firm_riddor_category = case when p_patch ? 'riddor_category'
                             then nullif(p_patch ->> 'riddor_category', '') else firm_riddor_category end,
      firm_riddor_reported_at = case when p_patch ? 'riddor_reported_at'
                             then nullif(p_patch ->> 'riddor_reported_at', '')::timestamptz else firm_riddor_reported_at end,
      firm_riddor_reference = case when p_patch ? 'riddor_reference'
                             then nullif(btrim(coalesce(p_patch ->> 'riddor_reference', '')), '') else firm_riddor_reference end
     where id = p_id;
  else
    update public.accident_records set
      firm_status = v_status,
      firm_acknowledged_at = v_ack,
      firm_acknowledged_by = case when v_ack_now then v_uid else firm_acknowledged_by end,
      firm_closed_at = v_closed,
      firm_closed_by = case when v_status = 'closed' then coalesce(firm_closed_by, v_uid) end,
      firm_closeout_summary = v_closeout,
      firm_root_cause = case when p_patch ? 'root_cause'
                             then nullif(btrim(coalesce(p_patch ->> 'root_cause', '')), '') else firm_root_cause end,
      firm_investigation_notes = case when p_patch ? 'investigation_notes'
                             then nullif(btrim(coalesce(p_patch ->> 'investigation_notes', '')), '') else firm_investigation_notes end,
      firm_corrective_actions = v_actions,
      firm_riddor_category = case when p_patch ? 'riddor_category'
                             then nullif(p_patch ->> 'riddor_category', '') else firm_riddor_category end,
      firm_riddor_reported_at = case when p_patch ? 'riddor_reported_at'
                             then nullif(p_patch ->> 'riddor_reported_at', '')::timestamptz else firm_riddor_reported_at end,
      firm_riddor_reference = case when p_patch ? 'riddor_reference'
                             then nullif(btrim(coalesce(p_patch ->> 'riddor_reference', '')), '') else firm_riddor_reference end
     where id = p_id;
  end if;
  perform set_config('safety.firm_incident', 'off', true);

  -- Tell people. Only a worker's own report has a reporter to tell; a record
  -- the firm made itself has none.
  v_route := '/electrician/worker-tools/reports?' || coalesce('job=' || v_job || '&', '') || 'incident=' || p_id;
  if not public.safety_is_firm_creator(v_emp, v_user) and v_user is distinct from v_uid then
    select e.id into v_reporter_emp from public.employer_employees e
     where e.user_id = v_user and e.employer_id = v_emp
       and lower(coalesce(e.status, '')) <> 'archived'
     order by e.created_at limit 1;
    if v_reporter_emp is not null then
      if v_closed_now then
        perform public.worker_notify(v_user, 'incident_closed', 'Your safety report was closed',
          coalesce(v_closeout, 'The office has closed your report.'),
          jsonb_build_object('route', v_route, 'incident_id', p_id, 'employee_id', v_reporter_emp));
      elsif v_ack_now then
        perform public.worker_notify(v_user, 'incident_seen', 'The office has seen your report',
          left(coalesce(v_title, 'Your safety report'), 140),
          jsonb_build_object('route', v_route, 'incident_id', p_id, 'employee_id', v_reporter_emp));
      end if;
    end if;
  end if;

  -- New owners of an action are told once.
  if p_patch ? 'corrective_actions' then
    for v_action in select * from jsonb_array_elements(v_actions)
    loop
      begin
        v_owner := nullif(v_action ->> 'owner_employee_id', '')::uuid;
      exception when others then
        v_owner := null;
      end;
      continue when v_owner is null or v_action ->> 'done_at' is not null;
      continue when exists (
        select 1 from jsonb_array_elements(coalesce(v_old_actions, '[]'::jsonb)) o
         where o ->> 'id' = v_action ->> 'id'
           and o ->> 'owner_employee_id' = v_action ->> 'owner_employee_id');
      select e.user_id into v_owner_user from public.employer_employees e
       where e.id = v_owner and e.employer_id = v_emp
         and lower(coalesce(e.status, '')) <> 'archived';
      continue when v_owner_user is null or v_owner_user = v_uid;
      begin
        v_due := nullif(v_action ->> 'due_date', '')::date;
      exception when others then
        v_due := null;
      end;
      perform public.worker_notify(v_owner_user, 'incident_action', 'Safety action for you',
        left(coalesce(v_action ->> 'action', 'A corrective action'), 140)
          || coalesce(' · due ' || to_char(v_due, 'FMDD Mon'), ''),
        jsonb_build_object('route', v_route, 'incident_id', p_id, 'employee_id', v_owner));
    end loop;
  end if;

  return jsonb_build_object('ok', true, 'status', v_status, 'acknowledged_at', v_ack,
                            'closed_at', v_closed, 'acknowledged_now', v_ack_now);
end;
$$;

revoke all on function public.firm_incident_update(uuid, jsonb) from public, anon;
grant execute on function public.firm_incident_update(uuid, jsonb) to authenticated;

-- ── 6. acknowledge_incident: same signature, also Site Safety records ────

create or replace function public.acknowledge_incident(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_row public.employer_incidents%rowtype;
  v_reporter uuid;
  v_res jsonb;
begin
  update public.employer_incidents
     set acknowledged_at = now(), acknowledged_by = auth.uid()
   where id = p_id
     and acknowledged_at is null
     and employer_id in (select public.my_employer_scope())
  returning * into v_row;

  if not found then
    select * into v_row from public.employer_incidents
     where id = p_id and employer_id in (select public.my_employer_scope());
    if not found then
      -- ELE-2031: a Site Safety near miss or accident shared with the firm.
      if exists (select 1 from public.near_miss_reports where id = p_id)
         or exists (select 1 from public.accident_records where id = p_id) then
        v_res := public.firm_incident_update(p_id, '{"acknowledge": true}'::jsonb);
        return jsonb_build_object('ok', true,
                                  'already', not coalesce((v_res ->> 'acknowledged_now')::boolean, false),
                                  'acknowledged_at', v_res -> 'acknowledged_at');
      end if;
      raise exception 'Incident not found';
    end if;
    return jsonb_build_object('ok', true, 'already', true, 'acknowledged_at', v_row.acknowledged_at);
  end if;

  if v_row.reported_by ~* '^[0-9a-f-]{36}$' then
    select e.user_id into v_reporter from public.employer_employees e
     where e.id = v_row.reported_by::uuid and e.employer_id = v_row.employer_id
       and lower(coalesce(e.status, '')) <> 'archived';
    if v_reporter is not null and v_reporter <> auth.uid() then
      perform public.worker_notify(
        v_reporter,
        'incident_seen',
        'The office has seen your report',
        left(coalesce(v_row.title, 'Your safety report'), 140),
        jsonb_build_object('route', '/electrician/worker-tools/reports?'
                             || coalesce('job=' || v_row.job_id || '&', '') || 'incident=' || p_id,
                           'incident_id', p_id)
      );
    end if;
  end if;

  return jsonb_build_object('ok', true, 'already', false);
end;
$function$;

-- ── 7. A worker's corrective actions: both sources ───────────────────────

create or replace function public.get_my_incident_actions()
returns table(incident_id uuid, incident_title text, incident_type text, location text, job_title text,
              action_id text, action text, due_date date, done_at timestamptz)
language sql
stable
security definer
set search_path = public
as $function$
  select * from (
    select i.id as incident_id,
           i.title as incident_title,
           i.incident_type as incident_type,
           i.location as location,
           j.title as job_title,
           a->>'id' as action_id,
           a->>'action' as action,
           case when a->>'due_date' ~ '^\d{4}-\d{2}-\d{2}' then (a->>'due_date')::date end as due_date,
           case when a->>'done_at' <> '' then (a->>'done_at')::timestamptz end as done_at
      from public.employer_incidents i
      cross join lateral jsonb_array_elements(coalesce(i.corrective_actions, '[]'::jsonb)) a
      join public.employer_employees me
        on me.id::text = a->>'owner_employee_id'
       and me.employer_id = i.employer_id
       and me.user_id = auth.uid()
       and lower(coalesce(me.status, '')) = 'active'  -- ELE-1998: removed workers see nothing
      left join public.employer_jobs j on j.id = i.job_id
     where lower(coalesce(i.status, '')) not in ('closed', 'resolved')
    union all
    -- ELE-2031: Site Safety near misses shared with the firm
    select n.id,
           left(regexp_replace(btrim(n.description), '\s+', ' ', 'g'), 80),
           'Near Miss',
           n.location,
           j.title,
           a->>'id',
           a->>'action',
           case when a->>'due_date' ~ '^\d{4}-\d{2}-\d{2}' then (a->>'due_date')::date end,
           case when a->>'done_at' <> '' then (a->>'done_at')::timestamptz end
      from public.near_miss_reports n
      cross join lateral jsonb_array_elements(n.firm_corrective_actions) a
      join public.employer_employees me
        on me.id::text = a->>'owner_employee_id'
       and me.employer_id = n.employer_id
       and me.user_id = auth.uid()
       and lower(coalesce(me.status, '')) = 'active'
      left join public.employer_jobs j on j.id = n.employer_job_id
     where n.employer_id is not null
       and coalesce(n.firm_status, '') <> 'closed' and n.firm_closed_at is null
    union all
    -- and accidents (the action only, never the injury details)
    select r.id,
           'Accident on site',
           'Injury',
           r.location,
           j.title,
           a->>'id',
           a->>'action',
           case when a->>'due_date' ~ '^\d{4}-\d{2}-\d{2}' then (a->>'due_date')::date end,
           case when a->>'done_at' <> '' then (a->>'done_at')::timestamptz end
      from public.accident_records r
      cross join lateral jsonb_array_elements(r.firm_corrective_actions) a
      join public.employer_employees me
        on me.id::text = a->>'owner_employee_id'
       and me.employer_id = r.employer_id
       and me.user_id = auth.uid()
       and lower(coalesce(me.status, '')) = 'active'
      left join public.employer_jobs j on j.id = r.employer_job_id
     where r.employer_id is not null
       and coalesce(r.firm_status, '') <> 'closed' and r.firm_closed_at is null
  ) x
  order by (x.done_at is not null), x.due_date nulls last;
$function$;

create or replace function public._complete_safety_incident_action(p_id uuid, p_action_id text, p_note text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_src text;
  v_emp uuid;
  v_closed boolean;
  v_actions jsonb;
  v_action jsonb;
  v_name text;
begin
  select 'near_miss', n.employer_id, (n.firm_closed_at is not null or n.firm_status = 'closed'), n.firm_corrective_actions
    into v_src, v_emp, v_closed, v_actions
    from public.near_miss_reports n where n.id = p_id and n.employer_id is not null for update;
  if v_src is null then
    select 'accident', a.employer_id, (a.firm_closed_at is not null or a.firm_status = 'closed'), a.firm_corrective_actions
      into v_src, v_emp, v_closed, v_actions
      from public.accident_records a where a.id = p_id and a.employer_id is not null for update;
  end if;
  if v_src is null then
    raise exception 'Action not found';
  end if;
  if v_closed then
    raise exception 'This report has been closed by the office';
  end if;

  select a into v_action
    from jsonb_array_elements(coalesce(v_actions, '[]'::jsonb)) a
   where a->>'id' = p_action_id
     and exists (select 1 from public.employer_employees me
                  where me.id::text = a->>'owner_employee_id'
                    and me.employer_id = v_emp
                    and me.user_id = auth.uid()
                    and lower(coalesce(me.status, '')) = 'active');
  if v_action is null then
    raise exception 'Action not found';
  end if;
  if v_action->>'done_at' is not null then
    return jsonb_build_object('ok', true, 'already', true);
  end if;

  select coalesce(jsonb_agg(
           case when a->>'id' = p_action_id
                then a || jsonb_build_object('done_at', now(), 'done_note', nullif(trim(coalesce(p_note, '')), ''))
                else a end), '[]'::jsonb)
    into v_actions
    from jsonb_array_elements(v_actions) a;

  perform set_config('safety.firm_incident', 'on', true);
  if v_src = 'near_miss' then
    update public.near_miss_reports set firm_corrective_actions = v_actions where id = p_id;
  else
    update public.accident_records set firm_corrective_actions = v_actions where id = p_id;
  end if;
  perform set_config('safety.firm_incident', 'off', true);

  select e.name into v_name from public.employer_employees e
   where e.id::text = v_action->>'owner_employee_id';

  perform public.notify_employer_bell(
    v_emp,
    'incident_action_done',
    'Safety action done',
    coalesce(v_name, 'A team member') || ': ' || left(coalesce(v_action->>'action', ''), 120),
    jsonb_build_object('route', '/employer?section=incidents&incident=' || p_id, 'incident_id', p_id)
  );

  return jsonb_build_object('ok', true, 'already', false);
end;
$$;

revoke all on function public._complete_safety_incident_action(uuid, text, text) from public, anon, authenticated;

create or replace function public.complete_my_incident_action(p_incident_id uuid, p_action_id text, p_note text default null::text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_row public.employer_incidents%rowtype;
  v_actions jsonb;
  v_action jsonb;
  v_name text;
begin
  select * into v_row from public.employer_incidents where id = p_incident_id for update;
  if not found then
    -- ELE-2031: a Site Safety near miss or accident shared with the firm.
    return public._complete_safety_incident_action(p_incident_id, p_action_id, p_note);
  end if;
  if lower(coalesce(v_row.status, '')) in ('closed', 'resolved') then
    raise exception 'This report has been closed by the office';
  end if;

  select a into v_action
    from jsonb_array_elements(coalesce(v_row.corrective_actions, '[]'::jsonb)) a
   where a->>'id' = p_action_id
     and exists (select 1 from public.employer_employees me
                  where me.id::text = a->>'owner_employee_id'
                    and me.employer_id = v_row.employer_id
                    and me.user_id = auth.uid()
                    and lower(coalesce(me.status, '')) = 'active');  -- ELE-1998
  if v_action is null then
    raise exception 'Action not found';
  end if;
  if v_action->>'done_at' is not null then
    return jsonb_build_object('ok', true, 'already', true);
  end if;

  select coalesce(jsonb_agg(
           case when a->>'id' = p_action_id
                then a || jsonb_build_object('done_at', now(), 'done_note', nullif(trim(coalesce(p_note, '')), ''))
                else a end
         ), '[]'::jsonb)
    into v_actions
    from jsonb_array_elements(v_row.corrective_actions) a;

  update public.employer_incidents set corrective_actions = v_actions where id = p_incident_id;

  select e.name into v_name from public.employer_employees e
   where e.id::text = v_action->>'owner_employee_id';

  perform public.notify_employer_bell(
    v_row.employer_id,
    'incident_action_done',
    'Safety action done',
    coalesce(v_name, 'A team member') || ': ' || left(coalesce(v_action->>'action', ''), 120),
    jsonb_build_object('route', '/employer?section=incidents&incident=' || p_incident_id, 'incident_id', p_incident_id)
  );

  return jsonb_build_object('ok', true, 'already', false);
end;
$function$;

-- ── 8. The bell for a worker's job-linked near miss / accident ───────────

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
  v_rep public.employer_employees%rowtype;
  v_inj public.employer_employees%rowtype;
  v_apprentice boolean := false;
  v_recipient uuid;
  v_sent uuid[] := array[]::uuid[];
  v_worker_route text;
begin
  if new.employer_id is null then
    return new;
  end if;
  if tg_op = 'UPDATE' and old.employer_id is not distinct from new.employer_id then
    return new;
  end if;
  if public.safety_is_firm_creator(new.employer_id, new.user_id) then
    return new;
  end if;
  -- The office does not ring its own bell (as notify_incident).
  if auth.uid() is not null and auth.uid() = new.employer_id then
    return new;
  end if;

  select j.title into v_job from public.employer_jobs j where j.id = new.employer_job_id;
  select * into v_rep from public.employer_employees e
   where e.user_id = new.user_id and e.employer_id = new.employer_id
     and lower(coalesce(e.status, '')) <> 'archived'
   order by e.created_at limit 1;
  select coalesce(nullif(trim(p.full_name), ''), 'A team member') into v_name
    from public.profiles p where p.id = new.user_id;
  v_name := coalesce(v_rep.name, v_name, 'a team member');

  -- Each table's field is read inside its own branch (PL/pgSQL resolves every NEW field in an expression).
  if tg_table_name = 'accident_records' then
    v_text := new.incident_description;
    if new.injured_employee_id is not null then
      select * into v_inj from public.employer_employees e
       where e.id = new.injured_employee_id and e.employer_id = new.employer_id;
    end if;
  else
    v_text := new.description;
    if new.incident_kind is not null and new.incident_kind <> 'near_miss' then
      v_kind := 'Incident';
    end if;
  end if;

  perform public.notify_employer_bell(
    new.employer_id,
    'incident',
    v_kind || ' reported by ' || v_name,
    coalesce(v_job || ': ', '') || left(coalesce(v_text, ''), 140),
    jsonb_strip_nulls(jsonb_build_object(
      'route', '/employer?section=incidents&incident=' || new.id,
      'incident_id', new.id,
      'record_id', new.id,
      'severity', new.severity,
      'job_id', new.employer_job_id,
      'employee_id', v_rep.id
    ))
  );
  perform public.queue_office_email(
    new.employer_id, 'incident', new.id::text,
    jsonb_build_object('incident_id', new.id, 'source', tg_table_name));

  -- The reporter's (and the injured person's) supervisor, and the apprentice
  -- co-ordinator when an apprentice is involved (as notify_incident_supervisors).
  v_worker_route := '/electrician/worker-tools/reports?'
                    || coalesce('job=' || new.employer_job_id || '&', '') || 'incident=' || new.id;
  v_apprentice := lower(coalesce(v_rep.team_role, '')) = 'apprentice'
               or lower(coalesce(v_inj.team_role, '')) = 'apprentice';
  for v_recipient in
    select distinct s.user_id
      from public.employer_employees s
     where s.id in (v_rep.supervisor_employee_id, v_inj.supervisor_employee_id)
       and s.employer_id = new.employer_id
       and s.user_id is not null
       and lower(coalesce(s.status, '')) <> 'archived'
  loop
    continue when v_recipient = new.user_id or v_recipient = auth.uid();
    perform public.worker_notify(v_recipient, 'incident_team',
      v_kind || ' reported by ' || v_name,
      left(coalesce(v_text, ''), 140),
      jsonb_build_object('route', v_worker_route, 'incident_id', new.id));
    v_sent := v_sent || v_recipient;
  end loop;
  if v_apprentice then
    for v_recipient in
      select distinct c.user_id
        from public.employer_employees c
       where c.employer_id = new.employer_id
         and c.team_role = 'Apprentice Co-ordinator'
         and c.user_id is not null
         and lower(coalesce(c.status, '')) <> 'archived'
    loop
      continue when v_recipient = any(v_sent) or v_recipient = new.user_id or v_recipient = auth.uid();
      perform public.worker_notify(v_recipient, 'incident_team',
        v_kind || ' involving an apprentice',
        coalesce(v_name || ': ', '') || left(coalesce(v_text, ''), 120),
        jsonb_build_object('route', v_worker_route, 'incident_id', new.id));
    end loop;
  end if;

  return new;
exception when others then
  raise warning '[safety_notify_firm_incident] %: %', new.id, sqlerrm;
  return new;
end;
$$;

-- ── 9. Live readers edited in place (both sources) ───────────────────────

do $mig$
declare
  v_def text;
  v_before text;
  v_n int;
  v_from constant text := 'from public.employer_incidents i';
  v_union constant text := 'from public._firm_incident_rows(p_firm) i';
begin
  -- get_employer_home: inc_open (open count, unseen, RIDDOR due, actions)
  select pg_get_functiondef('public.get_employer_home(uuid)'::regprocedure) into v_def;
  v_n := (length(v_def) - length(replace(v_def, v_from, ''))) / length(v_from);
  if v_n <> 1 then
    raise exception 'get_employer_home: expected 1 employer_incidents read, found %', v_n;
  end if;
  execute replace(v_def, v_from, v_union);

  -- get_employer_safety_brief (Mate's safety brief): inc + inc_actions
  select pg_get_functiondef('public.get_employer_safety_brief(uuid, text, integer, integer)'::regprocedure) into v_def;
  v_n := (length(v_def) - length(replace(v_def, v_from, ''))) / length(v_from);
  if v_n <> 2 then
    raise exception 'get_employer_safety_brief: expected 2 employer_incidents reads, found %', v_n;
  end if;
  v_before := v_def;
  v_def := replace(v_def, 'select i.*, j.title as job_title,', 'select i.*,');
  if v_def = v_before then
    raise exception 'get_employer_safety_brief: job_title select not found';
  end if;
  execute replace(v_def, v_from, v_union);

  -- get_tender_prequal: riddor_3y + incidents_3y
  select pg_get_functiondef('public.get_tender_prequal(uuid)'::regprocedure) into v_def;
  v_n := (length(v_def) - length(replace(v_def, v_from, ''))) / length(v_from);
  if v_n <> 2 then
    raise exception 'get_tender_prequal: expected 2 employer_incidents reads, found %', v_n;
  end if;
  execute replace(v_def, v_from, v_union);

  -- get_worker_home: reports_open also counts the worker's job-linked
  -- Site Safety reports the office has not closed.
  select pg_get_functiondef('public.get_worker_home()'::regprocedure) into v_def;
  v_before := v_def;
  v_def := replace(v_def,
    $f$and lower(coalesce(x.status, '')) not in ('resolved', 'closed'))$f$,
    $f$and lower(coalesce(x.status, '')) not in ('resolved', 'closed'))
                  + (select count(*) from public.near_miss_reports n, me
                      where n.user_id = auth.uid() and n.employer_id = me.employer_id
                        and n.firm_closed_at is null and coalesce(n.firm_status, '') <> 'closed')
                  + (select count(*) from public.accident_records r, me
                      where r.user_id = auth.uid() and r.employer_id = me.employer_id
                        and r.firm_closed_at is null and coalesce(r.firm_status, '') <> 'closed')$f$);
  if v_def = v_before then
    raise exception 'get_worker_home: reports_open clause not found';
  end if;
  execute v_def;

  -- can_read_visual_upload: photos on a firm's Site Safety incident
  select pg_get_functiondef('public.can_read_visual_upload(text)'::regprocedure) into v_def;
  v_n := (length(v_def) - length(replace(v_def, E'\n  return false;\nend;', ''))) / length(E'\n  return false;\nend;');
  if v_n <> 1 then
    raise exception 'can_read_visual_upload: expected 1 closing return, found %', v_n;
  end if;
  v_def := replace(v_def, E'\n  return false;\nend;', $f$
  -- ELE-2031: photos on a near miss / accident shared with the firm.
  if exists (
    select 1 from public.near_miss_reports n
     where n.employer_id is not null
       and jsonb_typeof(n.photos) = 'array'
       and exists (select 1 from jsonb_array_elements_text(n.photos) p
                    where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, n.employer_id)
       and n.employer_id in (select public.my_employer_scope())
  ) then return true; end if;

  if exists (
    select 1 from public.accident_records a
     where a.employer_id is not null
       and jsonb_typeof(a.photos) = 'array'
       and exists (select 1 from jsonb_array_elements_text(a.photos) p
                    where p = p_name or right(p, length(v_url_tail)) = v_url_tail)
       and public.visual_upload_owner_in_firm(p_name, a.employer_id)
       and a.employer_id in (select public.my_employer_scope())
  ) then return true; end if;

  return false;
end;$f$);
  execute v_def;

  -- notification_employee_id: name the reporter of a Site Safety incident
  select pg_get_functiondef('public.notification_employee_id(jsonb, uuid, text)'::regprocedure) into v_def;
  v_before := v_def;
  v_def := replace(v_def, $f$  k := p_meta->>'entry_id';$f$, $f$  -- ELE-2031: a near miss / accident shared with the firm
  k := coalesce(p_meta->>'incident_id', p_meta->>'record_id');
  if k ~ re then
    select coalesce(a.injured_employee_id, x.id) into v
      from accident_records a
      left join lateral (
        select e.id from employer_employees e
         where e.user_id = a.user_id and e.employer_id = a.employer_id
           and not safety_is_firm_creator(a.employer_id, a.user_id)
         order by (lower(coalesce(e.status, '')) = 'archived'), e.created_at limit 1) x on true
     where a.id = k::uuid and a.employer_id is not null;
    if v is null then
      select e.id into v
        from near_miss_reports n
        join employer_employees e on e.user_id = n.user_id and e.employer_id = n.employer_id
       where n.id = k::uuid and n.employer_id is not null
         and not safety_is_firm_creator(n.employer_id, n.user_id)
       order by (lower(coalesce(e.status, '')) = 'archived'), e.created_at limit 1;
    end if;
    if v is not null then return v; end if;
  end if;

  k := p_meta->>'entry_id';$f$);
  if v_def = v_before then
    raise exception 'notification_employee_id: entry_id block not found';
  end if;
  execute v_def;
end
$mig$;

-- Live updates in both hubs (RLS still decides who receives what).
do $p$
begin
  if not exists (select 1 from pg_publication_tables
                  where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'near_miss_reports') then
    alter publication supabase_realtime add table public.near_miss_reports;
  end if;
  if not exists (select 1 from pg_publication_tables
                  where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'accident_records') then
    alter publication supabase_realtime add table public.accident_records;
  end if;
end
$p$;
