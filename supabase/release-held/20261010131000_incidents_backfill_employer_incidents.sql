-- ELE-2031 incidents, part 2 of 2 — RELEASE-HELD. NOT APPLIED.
--
-- RELEASE-HELD: apply only once NO live build writes employer_incidents any
-- more, i.e. after the web release of the ELE-2031 client AND a native build
-- newer than iOS 49 (c4b438a06) is the minimum version. Until then HEAD/iOS 49
-- workers and offices still create employer_incidents rows; every reader
-- already reads both sources (20261010130000_incidents_single_model, LIVE), so
-- nothing is lost by waiting. Applying early only means rows created after
-- this ran are not copied (re-running it copies them: it is idempotent).
--
-- What it does:
--   1. Copies each employer_incidents row into the Site Safety model:
--        injury            -> accident_records
--        everything else   -> near_miss_reports (incident_kind keeps the type)
--      linked by legacy_employer_incident_id (unique), so a re-run skips rows
--      already copied. The firm's follow-up (seen, investigation, actions,
--      RIDDOR, close-out) goes into the firm_* columns.
--   2. _firm_incident_rows() stops reading an employer_incidents row once its
--      copy exists, so nothing is counted twice.
-- It does NOT delete or alter employer_incidents (kept as the archive).
--
-- No bells: the copy disables trg_safety_notify_firm_incident for this
-- transaction only (old reports must not ring the office again).
--
-- Prerequisite (LIVE): 20261010130000_incidents_single_model.sql

begin;

alter table public.near_miss_reports disable trigger trg_safety_notify_firm_incident;
alter table public.accident_records disable trigger trg_safety_notify_firm_incident;

-- firm_* columns are written by the copy (the guard lets this through).
select set_config('safety.firm_incident', 'on', true);

with src as (
  select i.*,
         e.user_id as reporter_user,
         coalesce(e.name, nullif(btrim(i.reported_by), ''), 'Not recorded') as reporter_name,
         (coalesce(i.reported_at, i.created_at) at time zone 'Europe/London') as occurred_local,
         case when lower(coalesce(i.status, '')) in ('closed', 'resolved') then 'closed'
              when lower(coalesce(i.status, '')) in ('investigating', 'under_review') then 'investigating'
              else 'open' end as firm_status_norm,
         lower(regexp_replace(coalesce(nullif(btrim(i.incident_type), ''), 'other'), '\s+', '_', 'g')) as kind
    from public.employer_incidents i
    left join public.employer_employees e on e.id::text = i.reported_by
)
insert into public.accident_records (
  user_id, employer_id, employer_job_id, legacy_employer_incident_id,
  injured_name, injured_employee_id, incident_date, incident_time, location,
  injury_type, body_part, severity, injury_description, incident_description,
  witnesses, first_aid_given, first_aid_details, hospital_visit, time_off_work, days_off,
  reported_to, recorded_by, photos, created_at,
  firm_status, firm_acknowledged_at, firm_acknowledged_by, firm_closed_at, firm_closed_by,
  firm_closeout_summary, firm_root_cause, firm_investigation_notes, firm_corrective_actions,
  firm_riddor_category, firm_riddor_reported_at, firm_riddor_reference)
select coalesce(s.reporter_user, s.reported_by_id, s.employer_id), s.employer_id, s.job_id, s.id,
       coalesce(nullif(btrim(s.injured_person), ''), 'Not recorded'), s.injured_employee_id,
       s.occurred_local::date, to_char(s.occurred_local, 'HH24:MI'),
       coalesce(nullif(btrim(s.location), ''), 'Not recorded'),
       'other', 'not-recorded',
       case lower(coalesce(s.severity, '')) when 'critical' then 'major' when 'high' then 'major'
                                            when 'medium' then 'moderate' else 'minor' end,
       s.injuries_sustained, coalesce(nullif(btrim(s.description), ''), s.title),
       s.witnesses, coalesce(s.first_aid_given, false), s.actions_taken, coalesce(s.hospital_visit, false),
       coalesce(s.days_off, 0) > 0, coalesce(s.days_off, 0),
       case when s.supervisor_notified then s.supervisor_name end, s.reporter_name,
       coalesce(to_jsonb(s.photos), '[]'::jsonb), s.created_at,
       s.firm_status_norm, s.acknowledged_at, s.acknowledged_by, s.closed_at, s.closed_by,
       s.closeout_summary, s.root_cause, s.investigation_notes, coalesce(s.corrective_actions, '[]'::jsonb),
       s.riddor_category, s.riddor_reported_at, s.riddor_reference
  from src s
 where s.kind = 'injury'
   and not exists (select 1 from public.accident_records a where a.legacy_employer_incident_id = s.id);

with src as (
  select i.*,
         e.user_id as reporter_user,
         coalesce(e.name, nullif(btrim(i.reported_by), ''), 'Not recorded') as reporter_name,
         (coalesce(i.reported_at, i.created_at) at time zone 'Europe/London') as occurred_local,
         case when lower(coalesce(i.status, '')) in ('closed', 'resolved') then 'closed'
              when lower(coalesce(i.status, '')) in ('investigating', 'under_review') then 'investigating'
              else 'open' end as firm_status_norm,
         lower(regexp_replace(coalesce(nullif(btrim(i.incident_type), ''), 'other'), '\s+', '_', 'g')) as kind
    from public.employer_incidents i
    left join public.employer_employees e on e.id::text = i.reported_by
)
insert into public.near_miss_reports (
  user_id, employer_id, employer_job_id, legacy_employer_incident_id,
  incident_kind, category, severity, description, location, incident_date, incident_time,
  reporter_name, immediate_actions, witnesses, supervisor_notified, supervisor_name,
  photos, status, created_at,
  firm_status, firm_acknowledged_at, firm_acknowledged_by, firm_closed_at, firm_closed_by,
  firm_closeout_summary, firm_root_cause, firm_investigation_notes, firm_corrective_actions,
  firm_riddor_category, firm_riddor_reported_at, firm_riddor_reference)
select coalesce(s.reporter_user, s.reported_by_id, s.employer_id), s.employer_id, s.job_id, s.id,
       case when s.kind in ('near_miss', 'unsafe_practice', 'faulty_equipment', 'property_damage',
                            'environmental', 'security', 'dangerous_occurrence') then s.kind else 'other' end,
       case s.kind when 'faulty_equipment' then 'tool_equipment'
                   when 'unsafe_practice' then 'worksite_hazard' else 'other' end,
       case lower(coalesce(s.severity, '')) when 'critical' then 'critical' when 'high' then 'high'
                                            when 'medium' then 'medium' else 'low' end,
       coalesce(nullif(btrim(s.description), ''), s.title),
       coalesce(nullif(btrim(s.location), ''), 'Not recorded'),
       s.occurred_local::date, s.occurred_local::time,
       s.reporter_name, s.actions_taken,
       case when nullif(btrim(s.witnesses), '') is not null
            then jsonb_build_array(jsonb_build_object('name', s.witnesses, 'contact', '')) end,
       coalesce(s.supervisor_notified, false), s.supervisor_name,
       coalesce(to_jsonb(s.photos), '[]'::jsonb), 'open', s.created_at,
       s.firm_status_norm, s.acknowledged_at, s.acknowledged_by, s.closed_at, s.closed_by,
       s.closeout_summary, s.root_cause, s.investigation_notes, coalesce(s.corrective_actions, '[]'::jsonb),
       s.riddor_category, s.riddor_reported_at, s.riddor_reference
  from src s
 where s.kind <> 'injury'
   and not exists (select 1 from public.near_miss_reports n where n.legacy_employer_incident_id = s.id);

select set_config('safety.firm_incident', 'off', true);

alter table public.near_miss_reports enable trigger trg_safety_notify_firm_incident;
alter table public.accident_records enable trigger trg_safety_notify_firm_incident;

-- Readers stop counting a legacy row once it has a copy.
do $mig$
declare
  v_def text;
  v_before text;
begin
  select pg_get_functiondef('public._firm_incident_rows(uuid, uuid)'::regprocedure) into v_def;
  v_before := v_def;
  v_def := replace(v_def,
    'and (p_id is null or i.id = p_id)',
    'and (p_id is null or i.id = p_id)
     and not exists (select 1 from public.near_miss_reports c where c.legacy_employer_incident_id = i.id)
     and not exists (select 1 from public.accident_records c where c.legacy_employer_incident_id = i.id)');
  if v_def = v_before then
    raise exception '_firm_incident_rows: legacy branch clause not found';
  end if;
  execute v_def;
end
$mig$;

commit;

-- After the copy, and once no supported build writes employer_incidents, label it:
-- comment on table public.employer_incidents is '[LEGACY — DO NOT USE] Employer Hub incidents before ELE-2031. Scope: firm. Used by: nothing new; copied into near_miss_reports / accident_records (legacy_employer_incident_id). Rule: read-only archive.';
