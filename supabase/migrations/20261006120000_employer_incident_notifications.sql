-- ELE-1945 / ELE-1988: a worker's incident or near-miss report notified nobody.
-- employer_incidents had no notify trigger at all, so a safety report from site
-- sat silently until someone happened to open Safety → Incidents.
--
-- INSERT  → the employer (owner + active co-admins) via notify_employer_bell,
--           which writes the hub bell and the central bell + push.
-- UPDATE  → when the status first moves into a closed state ('resolved' /
--           'closed', matching IncidentsSection CLOSED_STATUSES), the worker
--           who reported it is told, with the action taken.
-- Reports the employer logs themselves (no roster reporter) only notify
-- co-admins via the same function; the owner seeing their own report is
-- harmless and matches the snag behaviour.

insert into public.notification_types (type, category, push, importance)
values ('incident', 'tasks_projects', true, 2)
on conflict (type) do nothing;

create or replace function public.notify_incident()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reporter_name text;
  v_reporter_user uuid;
  v_job_title text;
  v_kind text;
  v_route text;
begin
  if NEW.reported_by is not null then
    select e.name, e.user_id
      into v_reporter_name, v_reporter_user
      from public.employer_employees e
     where e.id::text = NEW.reported_by;
  end if;

  if NEW.job_id is not null then
    select j.title into v_job_title from public.employer_jobs j where j.id = NEW.job_id;
  end if;

  v_kind := case when NEW.incident_type ilike '%near%' then 'Near miss' else 'Incident' end;
  v_route := '/employer?section=incidents&incident=' || NEW.id;

  if TG_OP = 'INSERT' then
    perform public.notify_employer_bell(
      NEW.employer_id,
      'incident',
      v_kind || ' reported' || coalesce(' by ' || v_reporter_name, ''),
      coalesce(v_job_title || ': ', '') || left(coalesce(NEW.description, NEW.title, ''), 140),
      jsonb_build_object(
        'route', v_route,
        'incident_id', NEW.id,
        'severity', NEW.severity,
        'job_id', NEW.job_id
      )
    );
    return NEW;
  end if;

  if TG_OP = 'UPDATE'
     and NEW.status in ('resolved', 'closed')
     and coalesce(OLD.status, '') not in ('resolved', 'closed')
     and v_reporter_user is not null then
    perform public.worker_notify(
      v_reporter_user,
      'incident_closed',
      'Your safety report was closed',
      coalesce(nullif(NEW.actions_taken, ''), 'The office has closed your report.'),
      jsonb_build_object(
        'route', '/electrician/worker-tools/reports',
        'incident_id', NEW.id
      )
    );
  end if;

  return NEW;
exception when others then
  -- Never block the report itself because a notification failed.
  raise warning '[notify_incident] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$$;

drop trigger if exists trg_notify_incident on public.employer_incidents;
create trigger trg_notify_incident
  after insert or update of status on public.employer_incidents
  for each row execute function public.notify_incident();
