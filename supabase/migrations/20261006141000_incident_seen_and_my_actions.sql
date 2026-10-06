-- ELE-1945 / ELE-2002: close the loop both ways.
--
-- 1. acknowledge_incident(): the office opening a report marks it seen (once)
--    and tells the worker who reported it. Near-miss reporting dies when people
--    think nobody reads them.
-- 2. get_my_incident_actions() / complete_my_incident_action(): a team member
--    given a corrective action can see it and tick it off from Worker Tools.
--    They get the action and where it happened — never the injury details of
--    the incident itself (no new SELECT policy on employer_incidents).

insert into public.notification_types (type, category, push, importance)
values ('incident_action_done', 'tasks_projects', true, 2)
on conflict (type) do nothing;

create or replace function public.acknowledge_incident(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_incidents%rowtype;
  v_reporter uuid;
begin
  select * into v_row from public.employer_incidents
   where id = p_id and employer_id in (select public.my_employer_scope());
  if not found then
    raise exception 'Incident not found';
  end if;

  if v_row.acknowledged_at is not null then
    return jsonb_build_object('ok', true, 'already', true, 'acknowledged_at', v_row.acknowledged_at);
  end if;

  update public.employer_incidents
     set acknowledged_at = now(), acknowledged_by = auth.uid()
   where id = p_id;

  if v_row.reported_by ~* '^[0-9a-f-]{36}$' then
    select e.user_id into v_reporter from public.employer_employees e
     where e.id = v_row.reported_by::uuid;
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
$$;

revoke execute on function public.acknowledge_incident(uuid) from public, anon;
grant execute on function public.acknowledge_incident(uuid) to authenticated;

create or replace function public.get_my_incident_actions()
returns table (
  incident_id uuid,
  incident_title text,
  incident_type text,
  location text,
  job_title text,
  action_id text,
  action text,
  due_date date,
  done_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select i.id,
         i.title,
         i.incident_type,
         i.location,
         j.title,
         a->>'id',
         a->>'action',
         nullif(a->>'due_date', '')::date,
         nullif(a->>'done_at', '')::timestamptz
    from public.employer_incidents i
    cross join lateral jsonb_array_elements(i.corrective_actions) a
    left join public.employer_jobs j on j.id = i.job_id
   where a->>'owner_employee_id' in (select public.my_employee_ids()::text)
   order by (a->>'done_at') is not null, nullif(a->>'due_date', '')::date nulls last;
$$;

revoke execute on function public.get_my_incident_actions() from public, anon;
grant execute on function public.get_my_incident_actions() to authenticated;

create or replace function public.complete_my_incident_action(p_incident_id uuid, p_action_id text, p_note text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
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

  select a into v_action
    from jsonb_array_elements(v_row.corrective_actions) a
   where a->>'id' = p_action_id
     and a->>'owner_employee_id' in (select public.my_employee_ids()::text);
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
$$;

revoke execute on function public.complete_my_incident_action(uuid, text, text) from public, anon;
grant execute on function public.complete_my_incident_action(uuid, text, text) to authenticated;
