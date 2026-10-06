-- ELE-1945 / ELE-2002: incidents get an investigation, corrective actions,
-- acknowledgement, close-out, RIDDOR tracking and photos.
--
-- Before this, the office could only flip a status. There was nowhere to
-- record why it happened, what will change, who owns each fix, or whether
-- the HSE had been told — the four things an inspector asks for.

alter table public.employer_incidents
  add column if not exists photos text[],
  add column if not exists root_cause text,
  add column if not exists investigation_notes text,
  add column if not exists corrective_actions jsonb not null default '[]'::jsonb,
  add column if not exists acknowledged_at timestamptz,
  add column if not exists acknowledged_by uuid references auth.users(id) on delete set null,
  add column if not exists closed_at timestamptz,
  add column if not exists closed_by uuid references auth.users(id) on delete set null,
  add column if not exists riddor_category text,
  add column if not exists hospital_visit boolean not null default false,
  add column if not exists days_off integer;

alter table public.employer_incidents
  drop constraint if exists employer_incidents_riddor_category_check;
alter table public.employer_incidents
  add constraint employer_incidents_riddor_category_check
  check (riddor_category is null or riddor_category in (
    'death', 'specified_injury', 'over_7_day', 'non_worker_hospital',
    'dangerous_occurrence', 'occupational_disease', 'not_reportable'
  ));

alter table public.employer_incidents
  drop constraint if exists employer_incidents_corrective_actions_array;
alter table public.employer_incidents
  add constraint employer_incidents_corrective_actions_array
  check (jsonb_typeof(corrective_actions) = 'array');

comment on column public.employer_incidents.photos is
  'Storage paths in the visual-uploads bucket (same as job_issues.photos). Resolve with signed URLs.';
comment on column public.employer_incidents.corrective_actions is
  'Array of {id, action, owner_employee_id, owner_name, due_date (YYYY-MM-DD), done_at}. New owners with an account are notified (trg_incident_action_owners).';
comment on column public.employer_incidents.acknowledged_at is
  'When the office first opened/acknowledged the report. Null = nobody has looked at it yet (Overview shows it first).';
comment on column public.employer_incidents.closed_at is
  'Stamped when status moves to resolved/closed; cleared on reopen.';
comment on column public.employer_incidents.riddor_category is
  'The firm''s RIDDOR decision. Null = not assessed. not_reportable = assessed and not reportable. Deadline: death/specified/dangerous occurrence/non-worker hospital = without delay, F2508 within 10 days; over_7_day = within 15 days.';

-- Stamp close-out and acknowledgement server-side so they cannot drift from status.
create or replace function public.incident_stamp_lifecycle()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if lower(coalesce(NEW.status, '')) in ('resolved', 'closed') then
    if lower(coalesce(OLD.status, '')) not in ('resolved', 'closed') or NEW.closed_at is null then
      NEW.closed_at := coalesce(NEW.closed_at, now());
      NEW.closed_by := coalesce(NEW.closed_by, auth.uid());
    end if;
    -- Closing a report is the strongest possible acknowledgement.
    NEW.acknowledged_at := coalesce(NEW.acknowledged_at, now());
    NEW.acknowledged_by := coalesce(NEW.acknowledged_by, auth.uid());
  else
    NEW.closed_at := null;
    NEW.closed_by := null;
    if lower(coalesce(NEW.status, '')) in ('investigating', 'under_review') then
      NEW.acknowledged_at := coalesce(NEW.acknowledged_at, now());
      NEW.acknowledged_by := coalesce(NEW.acknowledged_by, auth.uid());
    end if;
  end if;
  NEW.updated_at := now();
  return NEW;
end;
$$;

drop trigger if exists trg_incident_stamp_lifecycle on public.employer_incidents;
create trigger trg_incident_stamp_lifecycle
  before update on public.employer_incidents
  for each row execute function public.incident_stamp_lifecycle();

-- Tell a team member when a corrective action is newly put in their name.
create or replace function public.notify_incident_action_owners()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_action jsonb;
  v_owner uuid;
  v_user uuid;
begin
  for v_action in select * from jsonb_array_elements(coalesce(NEW.corrective_actions, '[]'::jsonb))
  loop
    begin
      v_owner := nullif(v_action->>'owner_employee_id', '')::uuid;
    exception when others then
      v_owner := null;
    end;
    continue when v_owner is null;
    continue when v_action->>'done_at' is not null;

    -- Skip actions that already had this owner before the update.
    continue when exists (
      select 1 from jsonb_array_elements(coalesce(OLD.corrective_actions, '[]'::jsonb)) o
       where o->>'id' = v_action->>'id'
         and o->>'owner_employee_id' = v_action->>'owner_employee_id'
    );

    select e.user_id into v_user
      from public.employer_employees e
     where e.id = v_owner and e.employer_id = NEW.employer_id;
    continue when v_user is null;
    continue when v_user = auth.uid();

    perform public.worker_notify(
      v_user,
      'incident_action',
      'Safety action for you',
      left(coalesce(v_action->>'action', 'A corrective action'), 140)
        || coalesce(' · due ' || to_char((v_action->>'due_date')::date, 'FMDD Mon'), ''),
      jsonb_build_object(
        'route', '/electrician/worker-tools/reports',
        'incident_id', NEW.id
      )
    );
  end loop;
  return NEW;
exception when others then
  raise warning '[notify_incident_action_owners] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;

drop trigger if exists trg_incident_action_owners on public.employer_incidents;
create trigger trg_incident_action_owners
  after update of corrective_actions on public.employer_incidents
  for each row
  when (OLD.corrective_actions is distinct from NEW.corrective_actions)
  execute function public.notify_incident_action_owners();

-- Workers can attach photos to their own report at insert time only; the
-- existing insert policy already scopes reported_by. Nothing else changes.

comment on table public.employer_incidents is
  '[EMPLOYER HUB → WORKER TOOLS] Safety reports: incidents and near misses (worker or office), with investigation, corrective actions, close-out and RIDDOR tracking. Scope: employer_id = the firm (owner profiles.id); managers via my_employer_scope(); reported_by = roster id (text). Used by: Employer Hub → Incidents, Overview; Worker Tools → Reports. Rule: trg_notify_incident alerts the firm and tells the reporter on close; closed_at/acknowledged_at are stamped by trigger, never by the client.';
