-- Review findings #13, #17, #18, #19 (6 Oct).
--  #17 a bad due_date in one action threw inside the loop and the outer
--      handler swallowed it, so NO owner was told. Cast per action, safely.
--  #18 two tabs opening the same report both passed the "not yet seen" read
--      and both notified the reporter. Claim it atomically.
--  #19 the worker's action list and Done button trusted owner_employee_id
--      alone; now the owner must be on the incident's firm, and a closed
--      incident's actions drop off the list and can't be ticked.
--  #13 the hub saves the whole corrective_actions array. A save from a sheet
--      opened before the worker tapped Done wiped done_at. Keep it.

create or replace function public.notify_incident_action_owners()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_action jsonb;
  v_owner uuid;
  v_user uuid;
  v_due date;
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

    begin
      v_due := nullif(v_action->>'due_date', '')::date;
    exception when others then
      v_due := null;
    end;

    perform public.worker_notify(
      v_user,
      'incident_action',
      'Safety action for you',
      left(coalesce(v_action->>'action', 'A corrective action'), 140)
        || coalesce(' · due ' || to_char(v_due, 'FMDD Mon'), ''),
      jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', NEW.id)
    );
  end loop;
  return NEW;
exception when others then
  raise warning '[notify_incident_action_owners] %: %', NEW.id, sqlerrm;
  return NEW;
end;
$function$;

create or replace function public.acknowledge_incident(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_row public.employer_incidents%rowtype;
  v_reporter uuid;
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
      raise exception 'Incident not found';
    end if;
    return jsonb_build_object('ok', true, 'already', true, 'acknowledged_at', v_row.acknowledged_at);
  end if;

  if v_row.reported_by ~* '^[0-9a-f-]{36}$' then
    select e.user_id into v_reporter from public.employer_employees e
     where e.id = v_row.reported_by::uuid and e.employer_id = v_row.employer_id;
    if v_reporter is not null and v_reporter <> auth.uid() then
      perform public.worker_notify(
        v_reporter,
        'incident_seen',
        'The office has seen your report',
        left(coalesce(v_row.title, 'Your safety report'), 140),
        jsonb_build_object('route', '/electrician/worker-tools/reports', 'incident_id', p_id)
      );
    end if;
  end if;

  return jsonb_build_object('ok', true, 'already', false);
end;
$function$;

create or replace function public.get_my_incident_actions()
returns table(incident_id uuid, incident_title text, incident_type text, location text, job_title text,
              action_id text, action text, due_date date, done_at timestamptz)
language sql
stable
security definer
set search_path = public
as $function$
  select i.id,
         i.title,
         i.incident_type,
         i.location,
         j.title,
         a->>'id',
         a->>'action',
         case when a->>'due_date' ~ '^\d{4}-\d{2}-\d{2}' then (a->>'due_date')::date end,
         case when a->>'done_at' <> '' then (a->>'done_at')::timestamptz end
    from public.employer_incidents i
    cross join lateral jsonb_array_elements(coalesce(i.corrective_actions, '[]'::jsonb)) a
    join public.employer_employees me
      on me.id::text = a->>'owner_employee_id'
     and me.employer_id = i.employer_id
     and me.user_id = auth.uid()
    left join public.employer_jobs j on j.id = i.job_id
   where lower(coalesce(i.status, '')) <> 'closed'
   order by (a->>'done_at') is not null,
            case when a->>'due_date' ~ '^\d{4}-\d{2}-\d{2}' then (a->>'due_date')::date end nulls last;
$function$;

create or replace function public.complete_my_incident_action(p_incident_id uuid, p_action_id text, p_note text default null)
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
    raise exception 'Action not found';
  end if;
  if lower(coalesce(v_row.status, '')) = 'closed' then
    raise exception 'This report has been closed by the office';
  end if;

  select a into v_action
    from jsonb_array_elements(coalesce(v_row.corrective_actions, '[]'::jsonb)) a
   where a->>'id' = p_action_id
     and exists (select 1 from public.employer_employees me
                  where me.id::text = a->>'owner_employee_id'
                    and me.employer_id = v_row.employer_id
                    and me.user_id = auth.uid());
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

-- #13: a stale whole-array save must not undo a worker's Done.
create or replace function public.incident_actions_keep_done()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if NEW.corrective_actions is null or OLD.corrective_actions is null
     or NEW.corrective_actions = OLD.corrective_actions then
    return NEW;
  end if;
  select coalesce(jsonb_agg(
           -- Kept unless the office deliberately reopened it after it was done.
           case when n->>'done_at' is null and o.done is not null
                 and coalesce(n->>'reopened_at', '') < (o.done->>'done_at')
                then n || jsonb_build_object('done_at', o.done->'done_at', 'done_note', o.done->'done_note')
                else n end
           order by ord), '[]'::jsonb)
    into NEW.corrective_actions
    from jsonb_array_elements(NEW.corrective_actions) with ordinality as x(n, ord)
    left join lateral (
      select oa as done from jsonb_array_elements(OLD.corrective_actions) oa
       where oa->>'id' = n->>'id' and oa->>'done_at' is not null
       limit 1
    ) o on true;
  return NEW;
end;
$$;

drop trigger if exists trg_incident_actions_keep_done on public.employer_incidents;
create trigger trg_incident_actions_keep_done
  before update of corrective_actions on public.employer_incidents
  for each row execute function public.incident_actions_keep_done();
