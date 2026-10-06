-- ELE-1945 (Andrew, 6 Oct: "supervisor, apprentice co-ordinator or manager?")
--
-- Who hears about a safety report:
--   owner + co-admins        always (notify_employer_bell, unchanged)
--   the reporter's named supervisor   new: employer_employees.supervisor_employee_id
--   Apprentice Co-ordinators          new team role: told whenever an apprentice
--                                     reports, or is named as the injured person
-- Named beats broadcast: a 30-person firm does not want every supervisor
-- pinged for every near miss, but the apprentice's own supervisor must know.

alter table public.employer_employees
  add column if not exists supervisor_employee_id uuid
    references public.employer_employees(id) on delete set null;

alter table public.employer_employees
  drop constraint if exists employer_employees_supervisor_not_self;
alter table public.employer_employees
  add constraint employer_employees_supervisor_not_self
  check (supervisor_employee_id is null or supervisor_employee_id <> id);

comment on column public.employer_employees.supervisor_employee_id is
  'The person this team member reports to on site (their workplace supervisor). Told about their safety reports. Same firm only (enforced by trg_supervisor_same_firm).';

create or replace function public.employee_supervisor_same_firm()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if NEW.supervisor_employee_id is not null and not exists (
    select 1 from public.employer_employees s
     where s.id = NEW.supervisor_employee_id and s.employer_id = NEW.employer_id
  ) then
    raise exception 'The supervisor must be on the same team';
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_supervisor_same_firm on public.employer_employees;
create trigger trg_supervisor_same_firm
  before insert or update of supervisor_employee_id, employer_id on public.employer_employees
  for each row execute function public.employee_supervisor_same_firm();

-- Tell the people on site, after the firm-level bell. Separate trigger so the
-- existing notify_incident (owner/co-admin bell + close-out to reporter) is untouched.
create or replace function public.notify_incident_supervisors()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reporter public.employer_employees%rowtype;
  v_injured public.employer_employees%rowtype;
  v_apprentice boolean := false;
  v_kind text;
  v_who text;
  v_recipient uuid;
  v_sent uuid[] := array[]::uuid[];
begin
  if NEW.reported_by ~* '^[0-9a-f-]{36}$' then
    select * into v_reporter from public.employer_employees where id = NEW.reported_by::uuid;
  end if;
  if NEW.injured_employee_id is not null then
    select * into v_injured from public.employer_employees where id = NEW.injured_employee_id;
  end if;

  v_apprentice := lower(coalesce(v_reporter.team_role, '')) = 'apprentice'
               or lower(coalesce(v_injured.team_role, '')) = 'apprentice';
  v_kind := case when NEW.incident_type ilike '%near%' then 'Near miss' else 'Incident' end;
  v_who := coalesce(v_reporter.name, 'Someone on your team');

  -- 1. Named supervisors of the reporter and of the injured person.
  for v_recipient in
    select distinct s.user_id
      from public.employer_employees s
     where s.id in (v_reporter.supervisor_employee_id, v_injured.supervisor_employee_id)
       and s.user_id is not null
       and lower(coalesce(s.status, '')) <> 'archived'
  loop
    continue when v_recipient = v_reporter.user_id or v_recipient = auth.uid();
    perform public.worker_notify(
      v_recipient,
      'incident_team',
      v_kind || ' reported by ' || v_who,
      left(coalesce(NEW.title, NEW.description, ''), 140),
      jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)
    );
    v_sent := v_sent || v_recipient;
  end loop;

  -- 2. Apprentice Co-ordinators, when an apprentice is involved.
  if v_apprentice then
    for v_recipient in
      select distinct c.user_id
        from public.employer_employees c
       where c.employer_id = NEW.employer_id
         and c.team_role = 'Apprentice Co-ordinator'
         and c.user_id is not null
         and lower(coalesce(c.status, '')) <> 'archived'
    loop
      continue when v_recipient = any(v_sent) or v_recipient = v_reporter.user_id or v_recipient = auth.uid();
      perform public.worker_notify(
        v_recipient,
        'incident_team',
        v_kind || ' involving an apprentice',
        coalesce(v_who || ': ', '') || left(coalesce(NEW.title, NEW.description, ''), 120),
        jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)
      );
    end loop;
  end if;

  return NEW;
exception when others then
  raise warning '[notify_incident_supervisors] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;

drop trigger if exists trg_notify_incident_supervisors on public.employer_incidents;
create trigger trg_notify_incident_supervisors
  after insert on public.employer_incidents
  for each row execute function public.notify_incident_supervisors();

-- The apprentice's OTJ page lists who can attest their hours. Co-ordinators
-- can; and the apprentice's own named supervisor is listed first.
create or replace function public.get_my_employer_link()
returns jsonb
language sql
stable security definer
set search_path to 'public'
as $function$
  WITH me AS (
    SELECT ee.id, ee.employer_id, ee.team_role, ee.name, ee.claimed_at, ee.created_at, ee.supervisor_employee_id
      FROM public.employer_employees ee
     WHERE ee.user_id = auth.uid()
       AND ee.employer_id IS NOT NULL
       AND lower(coalesce(ee.status, '')) = 'active'
     ORDER BY ee.created_at DESC
     LIMIT 1
  )
  SELECT CASE WHEN me.id IS NULL THEN NULL ELSE jsonb_build_object(
    'employee_id', me.id,
    'employer_id', me.employer_id,
    'company_name', coalesce(cp.company_name, p.full_name, 'Your employer'),
    'team_role', me.team_role,
    'linked_since', coalesce(me.claimed_at, me.created_at),
    'supervisors', coalesce((
      SELECT jsonb_agg(jsonb_build_object('name', s.name, 'team_role', s.team_role, 'is_mine', s.id = me.supervisor_employee_id)
                       ORDER BY (s.id = me.supervisor_employee_id) DESC, s.name)
        FROM public.employer_employees s
       WHERE s.employer_id = me.employer_id
         AND lower(coalesce(s.status, '')) = 'active'
         AND s.id <> me.id
         AND (s.team_role IN ('Supervisor', 'QS', 'Project Manager', 'Apprentice Co-ordinator')
              OR s.id = me.supervisor_employee_id)
    ), '[]'::jsonb),
    'pending_attestations', (
      SELECT count(*) FROM public.college_otj_entries o
       WHERE o.student_id = auth.uid()
         AND o.verification_status = 'pending'
         AND o.source_kind IN ('apprentice_submitted', 'in_app')
    ),
    'employer_attested_hours', coalesce((
      SELECT round(sum(o.duration_minutes) / 60.0)
        FROM public.college_otj_entries o
       WHERE o.student_id = auth.uid() AND o.verification_status = 'verified_by_employer'
    ), 0)
  ) END
  FROM me
  LEFT JOIN public.company_profiles cp ON cp.user_id = me.employer_id
  LEFT JOIN public.profiles p ON p.id = me.employer_id
$function$;
